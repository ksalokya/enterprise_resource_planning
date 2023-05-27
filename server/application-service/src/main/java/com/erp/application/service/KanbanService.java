package com.erp.application.service;

import com.erp.application.payload.request.KanbanRequestPayload;
import com.erp.application.payload.response.KanbanResponsePayload;

import java.util.List;

public interface KanbanService {
    List<KanbanResponsePayload> getKanbans(String email);
}
