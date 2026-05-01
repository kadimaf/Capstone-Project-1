package com.cacodev.shalom.features.event.service;

import com.cacodev.shalom.exceptions.ResourceNotFound;
import com.cacodev.shalom.features.event.domain.Event;
import com.cacodev.shalom.features.event.domain.EventStatus;
import com.cacodev.shalom.features.event.dto.*;
import com.cacodev.shalom.features.event.mapper.EventMapper;
import com.cacodev.shalom.features.event.repository.EventRepository;
import com.cacodev.shalom.features.member.domain.Member;
import com.cacodev.shalom.features.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final MemberRepository memberRepository;

    public EventService(EventRepository eventRepository, EventMapper eventMapper, MemberRepository memberRepository) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
        this.memberRepository = memberRepository;
    }

    public List<EventDTO> findAllEvents() {
        return eventRepository.findAll().stream()
                .map(eventMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public EventDTO createEvent(EventCreateRequest request) {
        Member organizer = memberRepository.findById(request.organizerId())
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find event with ID: '%s'", request.organizerId()))
                );

        Event event = eventMapper.toEntity(request);

        event.setOrganizer(organizer);
        event.setStatus(EventStatus.SCHEDULED);

        eventRepository.save(event);

        System.out.println(event);

        return eventMapper.toDTO(eventMapper.toEntity(request));
    }

    public EventDTO findEventById(UUID id) {
        return eventRepository.findById(id)
                .map(eventMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find event with ID: '%s'", id))
                );
    }

    @Transactional
    public EventDTO updateStatus(UUID id, EventUpdateStatusRequest request) {
        Event event = getEvent(id);
        event.setStatus(request.status());
        event.setComments(request.comments());

        return eventMapper.toDTO(eventRepository.save(event));
    }

    @Transactional
    public EventDTO updateDescription(UUID id, EventUpdateDescriptionRequest request) {
        Event event = getEvent(id);
        event.setDescription(request.description());
        return eventMapper.toDTO(eventRepository.save(event));
    }

    @Transactional
    public EventDTO addParticipant(UUID eventId, EventAddParticipantRequest request) {
        Event event = getEvent(eventId);

        Member member = memberRepository.findById(request.participantId())
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find member with ID: '%s'", request.participantId()))
                );

        event.getParticipants().add(member);

        return eventMapper.toDTO(eventRepository.save(event));
    }

    @Transactional
    public void deleteEvent(UUID id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFound(
                    String.format("Could not find event with ID: '%s'", id)
            );
        }
        eventRepository.deleteById(id);
    }

    private Event getEvent(UUID id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound(
                        String.format("Could not find event with ID: '%s'", id))
                );
    }
}