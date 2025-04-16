package com.cacodev.shalom.common;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorDTO {
    private int statusCode;
    private String error;
    private String message;
}