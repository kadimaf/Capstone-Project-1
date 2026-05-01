package com.cacodev.shalom.features.user.controller;

import com.cacodev.shalom.features.user.dto.UserDTO;
import com.cacodev.shalom.features.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Users", description = "User management (admin)")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Get all users (admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @Operation(summary = "Get user by ID (admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @Operation(summary = "Enable or disable a user (admin only)")
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/toggle-enable")
    public ResponseEntity<UserDTO> toggleEnable(@PathVariable UUID id) {
        return ResponseEntity.ok(userService.toggleEnable(id));
    }
}

