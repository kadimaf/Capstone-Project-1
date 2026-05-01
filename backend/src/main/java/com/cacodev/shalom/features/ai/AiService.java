package com.cacodev.shalom.features.ai;

import com.cacodev.shalom.features.event.service.EventService;
import com.cacodev.shalom.features.member.service.MemberService;
import com.cacodev.shalom.features.member.service.MemberTypeService;
import com.cacodev.shalom.features.user.service.UserService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.SimpleLoggerAdvisor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class AiService {

    private final String systemPersonality = """
            You are an AI assistant that manages a the CACODEV Nonprofit Organization.
    
            You have access to tools that can retrieve and create members, member types, events, users, donations and contributions.

            Always use the available tools when answering questions about members, member types, events, users, donations and contributions.

            For user accounts, you can look up users, find them by username, and enable or disable their accounts. You should never create accounts or handle authentication directly.

            You should not provide any information about the tools or how to use them in your response.
        """;

    private final ChatClient chatClient;

    public AiService(ChatClient.Builder builder,
                     MemberService memberService,
                     MemberTypeService memberTypeService,
                     UserService userService,
                     EventService eventService) {
        this.chatClient = builder
                .defaultAdvisors(new SimpleLoggerAdvisor())
                .defaultTools(
                        memberService,
                        memberTypeService,
                        userService,
                        eventService
                )
                .build();
    }

    public String ask(String message) {
        return chatClient
                .prompt()
                .system(systemPersonality)
                .user(message)
                .call()
                .content();
    }

    public Flux<String> streamResponse(String message) {
        return chatClient
                .prompt()
                .system(systemPersonality)
                .user(message)
                .stream()
                .content();
    }
}
