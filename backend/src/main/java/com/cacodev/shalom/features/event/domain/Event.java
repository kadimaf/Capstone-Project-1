package com.cacodev.shalom.features.event.domain;

import com.cacodev.shalom.common.base.BaseEntity;
import com.cacodev.shalom.features.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "EVENTS")
@Entity
public class Event extends BaseEntity {

    private String title;

    @ManyToOne
    private Member organizer;

    private String description;

    private LocalDateTime dateTime;

    private String location;

    @Enumerated(EnumType.STRING)
    private EventStatus status;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Member> participants = new HashSet<>();

    private String comments;
}