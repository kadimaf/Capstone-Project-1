package com.cacodev.shalom.features.member.repository;

import com.cacodev.shalom.features.member.domain.MemberType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberTypeRepository extends JpaRepository<MemberType, UUID> {
    boolean existsByName(String name);
    Optional<MemberType> findByName(String name);
}
