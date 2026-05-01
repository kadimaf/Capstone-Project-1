package com.cacodev.shalom.features.user.repository;

import com.cacodev.shalom.features.user.domain.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;

@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String> {

    boolean existsByJti(String jti);

    @Modifying
    @Query("DELETE FROM InvalidatedToken t WHERE t.expiresAt < :now")
    int deleteExpiredTokens(Instant now);
}

