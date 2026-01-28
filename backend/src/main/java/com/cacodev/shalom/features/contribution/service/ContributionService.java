package com.cacodev.shalom.features.contribution.service;

import com.cacodev.shalom.exceptions.ResourceNotFound;
import com.cacodev.shalom.features.contribution.domain.Contribution;
import com.cacodev.shalom.features.contribution.domain.ContributionStatus;
import com.cacodev.shalom.features.contribution.dto.ContributionCreateRequest;
import com.cacodev.shalom.features.contribution.dto.ContributionDTO;
import com.cacodev.shalom.features.contribution.dto.ContributionUpdateStatusRequest;
import com.cacodev.shalom.features.contribution.mapper.ContributionMapper;
import com.cacodev.shalom.features.contribution.repository.ContributionRepository;
import com.cacodev.shalom.features.member.domain.Member;
import com.cacodev.shalom.features.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ContributionService {

    private final ContributionRepository contributionRepository;
    private final ContributionMapper mapper;
    private final MemberRepository memberRepository;

    public ContributionService(ContributionRepository contributionRepository, ContributionMapper mapper, MemberRepository memberRepository) {
        this.contributionRepository = contributionRepository;
        this.mapper = mapper;
        this.memberRepository = memberRepository;
    }

    public List<ContributionDTO> findAllContributions() {
        return contributionRepository.findAll().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<ContributionDTO> findContributionByMemberId(UUID memberId) {
        return contributionRepository.findByMemberId(memberId).stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public ContributionDTO findById(UUID id) {
        return contributionRepository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find contribution with ID: '%s'", id))
                );
    }

    @Transactional
    public ContributionDTO save(UUID memberId, ContributionCreateRequest request) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not member with ID: '%s'", memberId))
                );

        Contribution contribution = mapper.toEntity(request);

        contribution.setMember(member);
        contribution.setDate(LocalDateTime.now());
        contribution.setStatus(ContributionStatus.PENDING);

        return mapper.toDTO(contributionRepository.save(contribution));
    }

    @Transactional
    public ContributionDTO updateStatus(UUID id, ContributionUpdateStatusRequest request) {
        var contribution = getContribution(id);

        contribution.setStatus(request.status());

        return mapper.toDTO(contributionRepository.save(contribution));
    }

    public void deleteById(UUID id) {
        if (!contributionRepository.existsById(id)) {
            throw new ResourceNotFound(
                    String.format("Could not find contribution with id: '%s'", id)
            );
        }
        contributionRepository.deleteById(id);
    }

    private Contribution getContribution(UUID id) {
        return contributionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find contribution with ID: '%s'", id))
                );
    }
}