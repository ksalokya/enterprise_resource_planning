package com.erp.response;

import com.erp.payload.CustomAuthenticationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

public class UnauthorizedAccessResponse {

    public Mono<Void> generateResponse(ObjectMapper objectMapper, ServerWebExchange exchange, String info) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        response.getHeaders().setContentType(MediaType.APPLICATION_JSON);

        CustomAuthenticationException errorResponse = new CustomAuthenticationException(exchange.getRequest().getPath().toString(), "Unauthorized Access to Application", info);

        try {
            byte[] responseBodyBytes = objectMapper.writeValueAsBytes(errorResponse);
            return response.writeWith(Mono.just(response.bufferFactory().wrap(responseBodyBytes)));
        } catch (JsonProcessingException e) {
            return Mono.error(e);
        }
    }
}
