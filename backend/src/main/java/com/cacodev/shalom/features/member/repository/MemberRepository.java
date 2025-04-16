package com.cacodev.shalom.features.member.repository;

import com.cacodev.shalom.features.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {
    Optional<Member> findByMemberId(String memberId);

    Optional<Member> findByEmail(String email);

    List<Member> findByActiveTrue();

    List<Member> findByActiveFalse();

    List<Member> findByDateOfBirth(LocalDate date);

    @Query("SELECT m FROM Member m WHERE m.membershipExpiryDate < CURRENT_DATE")
    List<Member> findExpiredMemberships();

    boolean existsByMemberId(String memberId);

    boolean existsByEmail(String email);

    void deleteByMemberId(String memberId);
}