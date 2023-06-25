package com.erp.common.config;

import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationHandler;
import io.micrometer.tracing.TraceContext;
import io.micrometer.tracing.handler.TracingObservationHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Objects;

public class SimpleLoggingHandler implements ObservationHandler<Observation.Context> {

    private static final Logger log = LoggerFactory.getLogger(SimpleLoggingHandler.class);

    @Override
    public boolean supportsContext(Observation.Context context) {
        return true;
    }

    @Override
    public void onStart(Observation.Context context) {
        log.info("Starting " + context.getName());
        context.put("time", System.currentTimeMillis());
    }

    @Override
    public void onScopeOpened(Observation.Context context) {
        log.info("Scope opened  " + context.getName());
    }

    @Override
    public void onScopeClosed(Observation.Context context) {
    }

    @Override
    public void onStop(Observation.Context context) {
    }

    @Override
    public void onError(Observation.Context context) {
    }
}

//@Component
//public class SimpleLoggingHandler implements ObservationHandler<Observation.Context> {
//
//    private static final Logger log = LoggerFactory.getLogger(SimpleLoggingHandler.class);
//
//    @Override
//    public boolean supportsContext(Observation.Context context) {
//        return true;
//    }
//
//    @Override
//    public void onStart(Observation.Context context) {
//    }
//
//    @Override
//    public void onError(Observation.Context context) {
//    }
//
//    @Override
//    public void onEvent(Observation.Event event, Observation.Context context) {
//    }
//
//    @Override
//    public void onScopeOpened(Observation.Context context) {
//    }
//
//    @Override
//    public void onScopeClosed(Observation.Context context) {
//        TracingObservationHandler.TracingContext tracingContext = context.get(TracingObservationHandler.TracingContext.class);
//        TraceContext traceContext = Objects.requireNonNull(tracingContext).getSpan().context();
//        log.info("traceId :- {} and spanId:- {}", traceContext.traceId(), traceContext.spanId());
//    }
//
//    @Override
//    public void onStop(Observation.Context context) {
//    }
//}

//@Component
//public class SimpleLoggingHandler implements ObservationHandler<Observation.Context> {
//
//    private static final Logger log = LoggerFactory.getLogger(SimpleLoggingHandler.class);
//
//    @Override
//    public boolean supportsContext(Observation.Context context) {
//        return true;
//    }
//
//    @Override
//    public void onStart(Observation.Context context) {
//        log.info("Starting context {} ", context);
//    }
//
//    @Override
//    public void onError(Observation.Context context) {
//        log.info("Error for context {} ", context);
//    }
//
//    @Override
//    public void onEvent(Observation.Event event, Observation.Context context) {
//        log.info("Event for context {} and event [ {} ]", context, event);
//    }
//
//    @Override
//    public void onScopeOpened(Observation.Context context) {
//        log.info("Scope opened for context {} ", context);
//
//    }
//
//    @Override
//    public void onScopeClosed(Observation.Context context) {
//        log.info("Scope closed for context {}", context);
//    }
//
//    @Override
//    public void onStop(Observation.Context context) {
//        log.info("Stopping context {} ", context);
//    }
//}