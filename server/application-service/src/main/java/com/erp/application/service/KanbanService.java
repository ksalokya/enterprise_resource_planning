package com.erp.application.service;

import com.erp.application.payload.request.KanbanRequestPayload;
import com.erp.application.payload.response.KanbanResponsePayload;

import java.util.List;

public interface KanbanService {
    List<KanbanResponsePayload> getKanbans(String email);

    void insertKanban(String email, KanbanRequestPayload kanbanRequestPayload);

    KanbanResponsePayload updateKanban(String email, KanbanRequestPayload kanbanRequestPayload);

    void deleteKanban(String email, KanbanRequestPayload kanbanRequestPayload);
}
