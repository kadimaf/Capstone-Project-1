package com.cacodev.shalom.features.event.controller;

import com.cacodev.shalom.features.event.dto.*;
import com.cacodev.shalom.features.event.service.EventService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Events", description = "Operations about Events")
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        return ResponseEntity.ok(eventService.findAllEvents());
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable UUID eventId) {
        return ResponseEntity.ok(eventService.findEventById(eventId));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<EventDTO> createEvent(@RequestBody EventCreateRequest request) {
        return ResponseEntity.ok(eventService.createEvent(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{eventId}/update-status")
    public ResponseEntity<EventDTO> updateEventStatus(@PathVariable UUID eventId, @RequestBody EventUpdateStatusRequest request) {
        return ResponseEntity.ok(eventService.updateStatus(eventId, request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{eventId}/update-description")
    public ResponseEntity<EventDTO> updateEventStatus(@PathVariable UUID eventId, @RequestBody EventUpdateDescriptionRequest request) {
        return ResponseEntity.ok(eventService.updateDescription(eventId, request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{eventId}/participants")
    public ResponseEntity<EventDTO> addParticipant(@PathVariable UUID eventId, @RequestBody EventAddParticipantRequest request) {
        return ResponseEntity.ok(eventService.addParticipant(eventId, request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{eventId}")
    public ResponseEntity<EventDTO> deleteEvent(@PathVariable UUID eventId) {
        eventService.deleteEvent(eventId);

        return ResponseEntity.noContent().build();
    }
}