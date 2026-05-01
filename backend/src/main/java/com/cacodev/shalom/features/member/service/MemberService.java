package com.cacodev.shalom.features.member.service;

import com.cacodev.shalom.exceptions.ResourceAlreadyExistsException;
import com.cacodev.shalom.exceptions.ResourceNotFound;
import com.cacodev.shalom.features.member.domain.Member;
import com.cacodev.shalom.features.member.domain.MemberType;
import com.cacodev.shalom.features.member.dto.MemberCreateRequest;
import com.cacodev.shalom.features.member.dto.MemberDTO;
import com.cacodev.shalom.features.member.dto.MemberUpdatePersonalInfoRequest;
import com.cacodev.shalom.features.member.mapper.MemberMapper;
import com.cacodev.shalom.features.member.repository.MemberRepository;
import com.cacodev.shalom.features.member.repository.MemberTypeRepository;
import com.cacodev.shalom.utils.MemberIdGenerator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final MemberTypeRepository memberTypeRepository;

    public MemberService(MemberRepository memberRepository, MemberMapper memberMapper, MemberTypeRepository memberTypeRepository) {
        this.memberRepository = memberRepository;
        this.memberMapper = memberMapper;
        this.memberTypeRepository = memberTypeRepository;
    }

    public List<MemberDTO> findAllMembers() {
        return memberRepository.findAll().stream()
                .map(memberMapper::memberToMemberDTO)
                .collect(Collectors.toList());
    }

    public List<MemberDTO> findActiveMembers() {
        return memberRepository.findByActiveTrue().stream()
                .map(memberMapper::memberToMemberDTO)
                .collect(Collectors.toList());
    }

    public List<MemberDTO> findInactiveMembers() {
        return memberRepository.findByActiveFalse().stream()
                .map(memberMapper::memberToMemberDTO)
                .collect(Collectors.toList());
    }

    public List<MemberDTO> findExpiredMembership() {
        return memberRepository.findExpiredMemberships().stream()
                .map(memberMapper::memberToMemberDTO)
                .collect(Collectors.toList());
    }

    public List<MemberDTO> findByDateOfBirth(LocalDate dateOfBirth) {
        return memberRepository.findByDateOfBirth(dateOfBirth).stream()
                .map(memberMapper::memberToMemberDTO)
                .collect(Collectors.toList());
    }

    public MemberDTO findById(UUID id) {
        return memberRepository.findById(id)
                .map(memberMapper::memberToMemberDTO)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find member with id: '%s'", id))
                );
    }

    public MemberDTO findByMemberId(String memberId) {
        return memberRepository.findByMemberId(memberId)
                .map(memberMapper::memberToMemberDTO)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find member with member ID: '%s'", memberId))
                );
    }

    @Transactional
    public MemberDTO createMember(MemberCreateRequest request) {

        if (memberRepository.existsByEmail(request.email())) {
            throw new ResourceAlreadyExistsException(
                    String.format("Email address '%s' is already in use.", request.email())
            );
        }

        if (memberRepository.existsByMemberId(generateMemberId())) {
            throw new ResourceAlreadyExistsException("Member ID already in use.");
        }

        MemberType memberType = memberTypeRepository.findById(request.memberTypeId())
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Member Type with ID '%s' does not exist.", request.memberTypeId())
                ));

        Member newMember = memberMapper.toMemberEntity(request);

        newMember.setMemberId(generateMemberId());
        newMember.setActive(false);
        newMember.setMemberType(memberType);
        newMember.setMembershipExpiryDate(LocalDate.now().plusMonths(memberType.getMembershipDurationMonths()));

        memberRepository.save(newMember);

        return memberMapper.memberToMemberDTO(newMember);
    }

    @Transactional
    public MemberDTO updatePersonalInfo(UUID id, MemberUpdatePersonalInfoRequest request) {
        boolean madeUpdatePersonalInfo = false;
        Member member = getMember(id);

        // Only update fields if it is different from what is already in the database
        if (!member.getFirstName().equals(request.firstName())) {
            member.setFirstName(request.firstName());
            madeUpdatePersonalInfo = true;
        }
        if (!member.getMiddleName().equals(request.middleName())) {
            member.setMiddleName(request.middleName());
            madeUpdatePersonalInfo = true;
        }
        if (!member.getLastName().equals(request.lastName())) {
            member.setLastName(request.lastName());
            madeUpdatePersonalInfo = true;
        }
        if (!member.getGender().equals(request.gender())) {
            member.setGender(request.gender());
            madeUpdatePersonalInfo = true;
        }
        if (!member.getEmail().equals(request.email())) {
            member.setEmail(request.email());
            madeUpdatePersonalInfo = true;
        }
        if (!member.getPhoneNumber().equals(request.phoneNumber())) {
            member.setPhoneNumber(request.phoneNumber());
            madeUpdatePersonalInfo = true;
        }

        if (madeUpdatePersonalInfo) {
            memberRepository.save(member);

            return memberMapper.memberToMemberDTO(member);
        }

        return memberMapper.memberToMemberDTO(member);
    }

    public MemberDTO enableDisableMember(UUID id) {
        Member member = getMember(id);
        member.setActive(!member.isActive());
        memberRepository.save(member);
        return memberMapper.memberToMemberDTO(member);
    }

    public MemberDTO findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .map(memberMapper::memberToMemberDTO)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find member with this email: '%s'", email))
                );
    }

    @Transactional
    public void deleteById(UUID id) {
        if (!memberRepository.existsById(id)) {
            throw new ResourceNotFound(
                    String.format("Could not find member with id: '%s'", id)
            );
        }
        memberRepository.deleteById(id);
    }

    @Transactional
    public void deleteByMemberId(String memberId) {
        if (!memberRepository.existsByMemberId(memberId)) {
            throw new ResourceNotFound(
                    String.format("Could not find member with id: '%s'", memberId)
            );
        }
        memberRepository.deleteByMemberId(memberId);
    }

    private Member getMember(UUID id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find member with id: '%s'", id))
                );
    }

    // Generate member ID
    private String generateMemberId() {
        return MemberIdGenerator.generateMemberId();
    }
}