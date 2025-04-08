package com.cacodev.shalom.features.member.service;

import com.cacodev.shalom.exceptions.ResourceAlreadyExistsException;
import com.cacodev.shalom.exceptions.ResourceNotFound;
import com.cacodev.shalom.features.member.domain.MemberType;
import com.cacodev.shalom.features.member.dto.MemberTypeCreateRequest;
import com.cacodev.shalom.features.member.dto.MemberTypeDTO;
import com.cacodev.shalom.features.member.dto.MemberTypeUpdateRequest;
import com.cacodev.shalom.features.member.mapper.MemberTypeMapper;
import com.cacodev.shalom.features.member.repository.MemberTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MemberTypeService {

    private final MemberTypeRepository memberTypeRepository;
    private final MemberTypeMapper mapper;

    @Autowired
    public MemberTypeService(MemberTypeRepository memberTypeRepository,
                             @Qualifier("memberTypeMapperImpl") MemberTypeMapper mapper) {
        this.memberTypeRepository = memberTypeRepository;
        this.mapper = mapper;
    }

    public MemberTypeDTO create(MemberTypeCreateRequest request) {
        MemberType memberType = mapper.toEntity(request);

        memberType.setActive(false);

        memberType.setName(memberType.getName().toUpperCase());

        if (memberTypeRepository.existsByName(request.name())) {
            throw new ResourceAlreadyExistsException(
                    String.format("Member type '%s' already exists.", request.name())
            );
        }

        MemberType createdType = memberTypeRepository.save(memberType);

        return mapper.toDTO(createdType);
    }

    public MemberTypeDTO update(UUID id, MemberTypeUpdateRequest request) {
        boolean isFieldUpdated = false;

        MemberType memberType = getMemberType(id);

        if (request.getMembershipFee() != memberType.getMembershipFee()) {
            memberType.setMembershipFee(request.getMembershipFee());
            isFieldUpdated = true;
        }

        if (request.getMembershipDurationMonths() != memberType.getMembershipDurationMonths()) {
            memberType.setMembershipDurationMonths(request.getMembershipDurationMonths());
            isFieldUpdated = true;
        }

        if (request.isHasVotingRights() != memberType.isHasVotingRights()) {
            memberType.setHasVotingRights(request.isHasVotingRights());
            isFieldUpdated = true;
        }

        if (request.getPrivileges() != null && !request.getPrivileges().equals(memberType.getPrivileges())) {
            memberType.setPrivileges(request.getPrivileges());
            isFieldUpdated = true;
        }

        if (isFieldUpdated) {
            memberTypeRepository.save(memberType);
        }

        return mapper.toDTO(memberType);
    }

    public MemberTypeDTO updateDescription(UUID id, String description) {
        MemberType memberType = getMemberType(id);

        if (memberType.getDescription().equals(description)) {
            // If current description = new description, don't update
            return mapper.toDTO(memberType);
        }

        memberType.setDescription(description);

        memberTypeRepository.save(memberType);

        return mapper.toDTO(memberType);
    }

    public List<MemberTypeDTO> findAll() {
        return memberTypeRepository.findAll().stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
    }

    public MemberTypeDTO findById(UUID id) {
        return memberTypeRepository.findById(id)
                .map(mapper::toDTO)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find member type with id: %s", id))
                );
    }

    public MemberTypeDTO findByName(String name) {
        String typeName = name.toUpperCase();

        return memberTypeRepository.findByName(typeName)
                .map(mapper::toDTO)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find member type with name: '%s'", name))
                );
    }

    public MemberTypeDTO enableDisableMemberType(UUID id) {
        MemberType memberType = getMemberType(id);

        memberType.setActive(!memberType.isActive());

        memberTypeRepository.save(memberType);

        return mapper.toDTO(memberType);
    }

    public void deleteById(UUID id) {
        if (!memberTypeRepository.existsById(id)) {
            throw new ResourceNotFound(
                    String.format("Could not find member type with id: %s", id)
            );
        }

        memberTypeRepository.deleteById(id);
    }

    private MemberType getMemberType(UUID id) {
        return memberTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Member type with ID '%s' could not be found.", id)
                ));
    }
}