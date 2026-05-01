package com.cacodev.shalom.features.user.service;

import com.cacodev.shalom.features.user.domain.InvalidatedToken;
import com.cacodev.shalom.features.user.repository.InvalidatedTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class TokenBlacklistService {

    private static final Logger log = LoggerFactory.getLogger(TokenBlacklistService.class);

    private final InvalidatedTokenRepository invalidatedTokenRepository;

    public TokenBlacklistService(InvalidatedTokenRepository invalidatedTokenRepository) {
        this.invalidatedTokenRepository = invalidatedTokenRepository;
    }

    @Transactional
    public void blacklist(String jti, Instant expiresAt) {
        if (!invalidatedTokenRepository.existsByJti(jti)) {
            invalidatedTokenRepository.save(new InvalidatedToken(jti, expiresAt));
        }
    }

    public boolean isBlacklisted(String jti) {
        return invalidatedTokenRepository.existsByJti(jti);
    }

    /**
     * Purge expired blacklisted tokens every hour.
     * Once a token's natural expiry has passed, it can never be used again anyway.
     */
    @Scheduled(fixedRate = 3600000)
    @Transactional
    public void purgeExpiredTokens() {
        int deleted = invalidatedTokenRepository.deleteExpiredTokens(Instant.now());
        if (deleted > 0) {
            log.info("Purged {} expired blacklisted token(s).", deleted);
        }
    }
}

