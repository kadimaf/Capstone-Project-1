package com.cacodev.shalom.config.web;

import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Web API")
                        .description("Cacodev API")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("CACODEV DEV TEAM")
                                .email("contact@cacodev.com")
                                .url("https://www.cacodev.com")
                        ))
                .components(new Components());
    }
}