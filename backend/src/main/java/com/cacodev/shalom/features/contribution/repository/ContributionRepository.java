package com.cacodev.shalom.features.contribution.repository;

import com.cacodev.shalom.features.contribution.domain.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ContributionRepository extends JpaRepository<Contribution, UUID> {
    List<Contribution> findByMemberId(UUID memberId);
}