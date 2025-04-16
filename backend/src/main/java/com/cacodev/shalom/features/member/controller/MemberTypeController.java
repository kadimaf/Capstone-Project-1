package com.cacodev.shalom.features.member.controller;

import com.cacodev.shalom.features.member.domain.MemberRole;
import com.cacodev.shalom.features.member.dto.MemberTypeCreateRequest;
import com.cacodev.shalom.features.member.dto.MemberTypeDTO;
import com.cacodev.shalom.features.member.dto.MemberTypeUpdateRequest;
import com.cacodev.shalom.features.member.service.MemberTypeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Member Types", description = "Operations about Member Types")
@RestController
@RequestMapping("/api/member-types")
public class MemberTypeController {

    private final MemberTypeService memberTypeService;

    public MemberTypeController(MemberTypeService memberTypeService) {
        this.memberTypeService = memberTypeService;
    }

    @PostMapping
    public ResponseEntity<MemberTypeDTO> create(@RequestBody MemberTypeCreateRequest request) {
        return ResponseEntity.ok(memberTypeService.create(request));
    }

    @PatchMapping("/{id}/update")
    public ResponseEntity<MemberTypeDTO> update(@PathVariable UUID id, @RequestBody MemberTypeUpdateRequest request) {
        return ResponseEntity.ok(memberTypeService.update(id, request));
    }

    @PatchMapping("/{id}/update-description")
    public ResponseEntity<MemberTypeDTO> updateDescription(@PathVariable UUID id, @RequestBody String description) {
        return ResponseEntity.ok(memberTypeService.updateDescription(id, description));
    }

    @GetMapping
    public ResponseEntity<List<MemberTypeDTO>> getAllMemberTypes() {
        return ResponseEntity.ok(memberTypeService.findAll());
    }
    
    @GetMapping("/get-by-role")
    public ResponseEntity<List<MemberTypeDTO>> getByRole(@RequestParam MemberRole role) {
        return ResponseEntity.ok(memberTypeService.findByMemberRole(role));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberTypeDTO> getMemberTypeById(@PathVariable UUID id) {
        return ResponseEntity.ok(memberTypeService.findById(id));
    }

    @GetMapping("/{name}/find-by-name")
    public ResponseEntity<MemberTypeDTO> getMemberTypeByName(@PathVariable String name) {
        return ResponseEntity.ok(memberTypeService.findByName(name));
    }

    @PatchMapping("/{id}/toggle-enable")
    public ResponseEntity<MemberTypeDTO> toggleMemberTypeEnable(@PathVariable UUID id) {
        return ResponseEntity.ok(memberTypeService.enableDisableMemberType(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMemberTypeById(@PathVariable UUID id) {
        memberTypeService.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}