package com.erp.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtService {
    @Autowired
    private Environment env;

    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(env.getProperty("ERP_SECRET_AUTH_KEY"));
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
