package com.cacodev.shalom.seed;

import com.cacodev.shalom.common.base.Gender;
import com.cacodev.shalom.exceptions.ResourceNotFound;
import com.cacodev.shalom.features.member.domain.Member;
import com.cacodev.shalom.features.member.domain.MemberRole;
import com.cacodev.shalom.features.member.domain.MemberType;
import com.cacodev.shalom.features.member.repository.MemberRepository;
import com.cacodev.shalom.features.member.repository.MemberTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final MemberTypeRepository memberTypeRepository;
    private final MemberRepository memberRepository;

    public DataInitializer(MemberTypeRepository memberTypeRepository, MemberRepository memberRepository) {
        this.memberTypeRepository = memberTypeRepository;
        this.memberRepository = memberRepository;
    }


    @Transactional
    @Override
    public void run(String... args) {
        String FOUNDER_MEMBER_TYPE = "FOUNDER MEMBER";
        if (memberTypeRepository.count() == 0) {
            MemberType memberType = new MemberType();

            memberType.setName(FOUNDER_MEMBER_TYPE);
            memberType.setDescription("The founders of the organization with all the privileges.");
            memberType.setMembershipFee(120.0);
            memberType.setHasVotingRights(true);
            memberType.setMemberRole(MemberRole.FOUNDER);
            memberType.setPrivileges("All the privileges. They have veto and voting rights.");

            memberTypeRepository.save(memberType);
            log.info("## ## - Added member type: '{}'", memberType.getName());
        }

        if (memberRepository.count() == 0) {
            MemberType founderType = memberTypeRepository.findByName(FOUNDER_MEMBER_TYPE)
                    .orElseThrow(() -> new ResourceNotFound(
                            String.format("Member type with name '%s' could not be found.", FOUNDER_MEMBER_TYPE)
                    ));

            Member member1 = new Member();
            member1.setMemberId("MBR00001");
            member1.setFirstName("Pemphyle");
            member1.setMiddleName("M.");
            member1.setLastName("Nzuzi");
            member1.setGender(Gender.MALE);
            member1.setEmail("pemphyle@cacodev.com");
            member1.setPhoneNumber("(812) 555-0011");
            member1.setDateOfBirth(LocalDate.parse("1980-01-01"));
            member1.setMemberType(founderType);
            member1.setActive(true);
            member1.setMembershipExpiryDate(LocalDate.parse("2090-12-12"));
            memberRepository.save(member1);
            log.info("## ## - Added member: '{} {}'", member1.getFirstName(), member1.getLastName());

            Member member2 = new Member();
            member2.setMemberId("MBR00002");
            member2.setFirstName("David");
            member2.setMiddleName("B.");
            member2.setLastName("Katembo");
            member2.setGender(Gender.MALE);
            member2.setEmail("david@cacodev.com");
            member2.setPhoneNumber("(812) 555-0022");
            member2.setDateOfBirth(LocalDate.parse("1980-01-01"));
            member2.setMemberType(founderType);
            member2.setActive(true);
            member2.setMembershipExpiryDate(LocalDate.parse("2090-12-12"));
            memberRepository.save(member2);
            log.info("## ## - Added member: '{} {}'", member2.getFirstName(), member2.getLastName());

            Member member3 = new Member();
            member3.setMemberId("MBR00003");
            member3.setFirstName("Fabrice");
            member3.setMiddleName("E.");
            member3.setLastName("Kadima");
            member3.setGender(Gender.MALE);
            member3.setEmail("fabrice@cacodev.com");
            member3.setPhoneNumber("(812) 555-33");
            member3.setDateOfBirth(LocalDate.parse("1980-01-01"));
            member3.setMemberType(founderType);
            member3.setActive(true);
            member3.setMembershipExpiryDate(LocalDate.parse("2090-12-12"));
            memberRepository.save(member3);
            log.info("## ## - Added member: '{} {}'", member3.getFirstName(), member3.getLastName());
        }
    }
}