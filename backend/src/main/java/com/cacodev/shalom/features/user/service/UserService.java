package com.cacodev.shalom.features.user.service;

import com.cacodev.shalom.config.security.JwtService;
import com.cacodev.shalom.exceptions.ResourceAlreadyExistsException;
import com.cacodev.shalom.exceptions.ResourceNotFound;
import com.cacodev.shalom.features.member.domain.Member;
import com.cacodev.shalom.features.member.repository.MemberRepository;
import com.cacodev.shalom.features.user.Role;
import com.cacodev.shalom.features.user.User;
import com.cacodev.shalom.features.user.dto.*;
import com.cacodev.shalom.features.user.mapper.UserMapper;
import com.cacodev.shalom.features.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final MemberRepository memberRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final TokenBlacklistService tokenBlacklistService;

    public UserService(UserRepository userRepository,
                       MemberRepository memberRepository,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager,
                       TokenBlacklistService tokenBlacklistService) {
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.tokenBlacklistService = tokenBlacklistService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        log.info("Registration attempt for username: '{}'", request.username());

        if (userRepository.existsByUsername(request.username())) {
            log.warn("Registration failed — username '{}' already taken", request.username());
            throw new ResourceAlreadyExistsException(
                    String.format("Username '%s' is already taken.", request.username())
            );
        }

        if (userRepository.existsByEmail(request.email())) {
            log.warn("Registration failed — email '{}' already in use", request.email());
            throw new ResourceAlreadyExistsException(
                    String.format("Email '%s' is already in use.", request.email())
            );
        }

        Member member = memberRepository.findById(request.memberId())
                .orElseThrow(() -> {
                    log.warn("Registration failed — member '{}' not found", request.memberId());
                    return new ResourceNotFound(
                            String.format("Member with ID '%s' not found.", request.memberId())
                    );
                });

        if (userRepository.existsByMemberId(member.getId())) {
            log.warn("Registration failed — member '{} {}' already has an account", member.getFirstName(), member.getLastName());
            throw new ResourceAlreadyExistsException(
                    String.format("Member '%s %s' already has an account.",
                            member.getFirstName(), member.getLastName())
            );
        }

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(Role.USER);
        user.setMember(member);
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);

        userRepository.save(user);
        log.info("User '{}' registered successfully for member '{} {}'", user.getUsername(), member.getFirstName(), member.getLastName());

        Map<String, Object> claims = Map.of("role", user.getRole().name());
        String accessToken = jwtService.generateAccessToken(claims, user);
        String refreshToken = jwtService.generateRefreshToken(user);

        return new AuthResponse(accessToken, refreshToken, userMapper.toDTO(user));
    }

    public AuthResponse login(LoginRequest request) {
        log.info("Login attempt for username: '{}'", request.username());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password())
            );
        } catch (AuthenticationException e) {
            log.warn("Login failed — invalid credentials for username: '{}'", request.username());
            throw new BadCredentialsException("Invalid username or password.");
        }

        User user = userRepository.findByUsernameWithMember(request.username())
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("User '%s' not found.", request.username())
                ));

        Map<String, Object> claims = Map.of("role", user.getRole().name());
        String accessToken = jwtService.generateAccessToken(claims, user);
        String refreshToken = jwtService.generateRefreshToken(user);

        log.info("User '{}' logged in successfully", request.username());
        return new AuthResponse(accessToken, refreshToken, userMapper.toDTO(user));
    }

    public AuthResponse refreshToken(String refreshToken) {
        String username = jwtService.extractUsername(refreshToken);
        log.info("Token refresh attempt for username: '{}'", username);

        User user = userRepository.findByUsernameWithMember(username)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("User '%s' not found.", username)
                ));

        if (!jwtService.isTokenValid(refreshToken, user)) {
            log.warn("Token refresh failed — invalid or expired refresh token for user: '{}'", username);
            throw new BadCredentialsException("Invalid or expired refresh token.");
        }

        Map<String, Object> claims = Map.of("role", user.getRole().name());
        String newAccessToken = jwtService.generateAccessToken(claims, user);

        log.info("Access token refreshed successfully for user: '{}'", username);
        return new AuthResponse(newAccessToken, refreshToken, userMapper.toDTO(user));
    }

    @Transactional
    public void logout(String accessToken, String refreshToken) {
        log.info("Logout requested — blacklisting tokens");
        blacklistToken(accessToken);
        blacklistToken(refreshToken);
        log.info("Tokens blacklisted successfully");
    }

    private void blacklistToken(String token) {
        try {
            String jti = jwtService.extractJti(token);
            java.time.Instant expiresAt = jwtService.extractExpiration(token).toInstant();
            tokenBlacklistService.blacklist(jti, expiresAt);
        } catch (Exception e) {
            log.debug("Could not blacklist token — possibly expired or malformed: {}", e.getMessage());
        }
    }

    @Tool(name = "findUserById", description = "Get a user account by its ID")
    public UserDTO findById(UUID id) {
        log.debug("Fetching user by id: '{}'", id);
        return userRepository.findByIdWithMember(id)
                .map(userMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find user with id: '%s'", id))
                );
    }

    @Tool(name = "findUserByUsername", description = "Get a user account by its username")
    public UserDTO findByUsername(String username) {
        log.debug("Fetching user by username: '{}'", username);
        return userRepository.findByUsernameWithMember(username)
                .map(userMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find user with username: '%s'", username))
                );
    }

    @Tool(name = "findAllUsers", description = "Get all user accounts in the system")
    public List<UserDTO> findAll() {
        log.debug("Fetching all users");
        return userRepository.findAllWithMember().stream()
                .map(userMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Tool(name = "toggleEnableUser", description = "Enable or disable a user account. If the user is currently enabled, it will be disabled. If disabled, it will be enabled.")
    @Transactional
    public UserDTO toggleEnable(UUID id) {
        User user = userRepository.findByIdWithMember(id)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find user with id: '%s'", id))
                );
        user.setEnabled(!user.isEnabled());
        userRepository.save(user);
        log.info("User '{}' is now {}", user.getUsername(), user.isEnabled() ? "enabled" : "disabled");
        return userMapper.toDTO(user);
    }
}
