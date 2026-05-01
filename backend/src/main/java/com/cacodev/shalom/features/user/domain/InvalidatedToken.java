package com.cacodev.shalom.features.user.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "INVALIDATED_TOKENS")
public class InvalidatedToken {

    @Id
    @Column(nullable = false, length = 36)
    private String jti;

    @Column(nullable = false)
    private Instant expiresAt;
}

