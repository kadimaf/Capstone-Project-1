package com.cacodev.shalom.features.contribution.controller;

import com.cacodev.shalom.features.contribution.dto.ContributionCreateRequest;
import com.cacodev.shalom.features.contribution.dto.ContributionDTO;
import com.cacodev.shalom.features.contribution.dto.ContributionUpdateStatusRequest;
import com.cacodev.shalom.features.contribution.service.ContributionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Contributions", description = "Operations about Contributions")
@RestController
@RequestMapping("/api/contributions")
public class ContributionController {

    private final ContributionService contributionService;

    public ContributionController(ContributionService contributionService) {
        this.contributionService = contributionService;
    }

    @GetMapping
    public ResponseEntity<List<ContributionDTO>> getAllContributions() {
        return ResponseEntity.ok(contributionService.findAllContributions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContributionDTO> getContributionById(@PathVariable UUID id) {
        return ResponseEntity.ok(contributionService.findById(id));
    }

    @GetMapping("by-member/{id}")
    public ResponseEntity<List<ContributionDTO>> getContributionsByMemberId(@PathVariable UUID id) {
        return ResponseEntity.ok(contributionService.findContributionByMemberId(id));
    }

    @PostMapping
    public ResponseEntity<ContributionDTO> saveContribution(UUID memberId, @RequestBody ContributionCreateRequest request) {
        return ResponseEntity.ok(contributionService.save(memberId, request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ContributionDTO> updateStatus(@PathVariable UUID id, @RequestBody ContributionUpdateStatusRequest request) {
        return ResponseEntity.ok(contributionService.updateStatus(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContribution(@PathVariable UUID id) {
        contributionService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}