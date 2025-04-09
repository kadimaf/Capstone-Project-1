package com.cacodev.shalom.features.member.controller;

import com.cacodev.shalom.features.member.dto.MemberCreateRequest;
import com.cacodev.shalom.features.member.dto.MemberDTO;
import com.cacodev.shalom.features.member.dto.MemberUpdatePersonalInfoRequest;
import com.cacodev.shalom.features.member.service.MemberService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Tag(name = "Members", description = "Operations about Members")
@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public ResponseEntity<List<MemberDTO>> getAllMembers() {
        return ResponseEntity.ok(memberService.findAllMembers());
    }

    @GetMapping("/active")
    public ResponseEntity<List<MemberDTO>> getActiveMembers() {
        return ResponseEntity.ok(memberService.findActiveMembers());
    }

    @GetMapping("/inactive")
    public ResponseEntity<List<MemberDTO>> getInactiveMembers() {
        return ResponseEntity.ok(memberService.findInactiveMembers());
    }

    @GetMapping("/expired")
    public ResponseEntity<List<MemberDTO>> getExpiredMembers() {
        return ResponseEntity.ok(memberService.findExpiredMembership());
    }

    @GetMapping("/date-of-birth/{dob}")
    public ResponseEntity<List<MemberDTO>> getMembersByDateOfBirth(@PathVariable LocalDate dob) {
        return ResponseEntity.ok(memberService.findByDateOfBirth(dob));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberDTO> getMemberById(@PathVariable UUID id) {
        return ResponseEntity.ok(memberService.findById(id));
    }

    @GetMapping("/find-by-member-id/{memberId}")
    public ResponseEntity<MemberDTO> getMembersByMemberId(@PathVariable String memberId) {
        return ResponseEntity.ok(memberService.findByMemberId(memberId));
    }

    @PostMapping
    public ResponseEntity<MemberDTO> createMember(@RequestBody MemberCreateRequest request) {
        return ResponseEntity.ok(memberService.createMember(request));
    }

    @PatchMapping("/{id}/update-personal-information")
    public ResponseEntity<MemberDTO> updatePersonalInformation(@PathVariable UUID id, @RequestBody MemberUpdatePersonalInfoRequest request) {
        return ResponseEntity.ok(memberService.updatePersonalInfo(id, request));
    }

    @PatchMapping("/{id}/toggle-enable")
    public ResponseEntity<MemberDTO> toggleEnableMember(@PathVariable UUID id) {
        return ResponseEntity.ok(memberService.enableDisableMember(id));
    }

    @GetMapping("/find-by-email/{email}")
    public ResponseEntity<MemberDTO> findByEmail(@PathVariable String email) {
        return ResponseEntity.ok(memberService.findMemberByEmail(email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable UUID id) {
        memberService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete-by-member-id/{memberId}")
    public ResponseEntity<Void> deleteByMemberId(@PathVariable String memberId) {
        memberService.deleteByMemberId(memberId);
        return ResponseEntity.noContent().build();
    }
}