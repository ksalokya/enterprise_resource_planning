package com.erp.filter;

import com.erp.response.UnauthorizedAccessResponse;
import com.erp.service.JwtService;
import com.erp.validator.RouteValidator;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.Objects;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {
    @Autowired
    private RouteValidator validator;

    @Autowired
    private RestTemplate template;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ObjectMapper objectMapper;


    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(AuthenticationFilter.Config config) {
        return ((exchange, chain) -> {
            if (validator.isSecured.test(exchange.getRequest())) {
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    return new UnauthorizedAccessResponse().generateResponse(objectMapper, exchange, "Missing Authorization Header");
                }

                String authorizationHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

                if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                    authorizationHeader = authorizationHeader.substring(7);
                }

                try {
                    // Call to auth-service
                    // template.getForObject("http://auth-service//validate?token" + authorizationHeader, String.class);
                    jwtService.validateToken(authorizationHeader);
                } catch (Exception e) {
                    return new UnauthorizedAccessResponse().generateResponse(objectMapper, exchange, "Invalid Token");
                }
            }

            return chain.filter(exchange);
        });
    }

    public static class Config {}
}
