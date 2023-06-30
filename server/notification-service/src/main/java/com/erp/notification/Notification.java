package com.erp.notification;

import com.erp.notification.payload.UserInfoEvent;
import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import io.micrometer.tracing.Tracer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.KafkaListener;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class Notification {
    private final ObservationRegistry observationRegistry;
    private final Tracer tracer;

    public static void main(String[] args) {
        SpringApplication.run(Notification.class, args);
    }

    @KafkaListener(topics = "notificationTopic")
    public void handleNotification(UserInfoEvent userInfoEvent) {
        Observation.createNotStarted("on-message", this.observationRegistry).observe(() -> {
            log.info("Got message <{}>", userInfoEvent);
            log.info("TraceId- {}, Received Notification for User - {}", this.tracer.currentSpan().context().traceId(),
                    userInfoEvent.getUsername());
        });
        // send out an email notification
    }
}