package com.erp.common.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaTemplate;

@Configuration(proxyBeanMethods = false)
@RequiredArgsConstructor
public class KakfaConfig {
    private final KafkaTemplate kafkaTemplate;

    @PostConstruct
    void setup() {
        this.kafkaTemplate.setObservationEnabled(true);
    }
}
