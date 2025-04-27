package com.cacodev.shalom.features.event.mapper;

import com.cacodev.shalom.features.event.domain.Event;
import com.cacodev.shalom.features.event.dto.EventCreateRequest;
import com.cacodev.shalom.features.event.dto.EventDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EventMapper {

    @Mapping(source = "organizer.id", target = "organizerId")
    @Mapping(source = "organizer.memberId", target = "memberId")
    EventDTO toDTO(Event event);

    @Mapping(target = "id", ignore = true)
    Event toEntity(EventCreateRequest request);
}