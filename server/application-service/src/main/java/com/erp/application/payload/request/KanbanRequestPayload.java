package com.erp.application.payload.request;

import com.erp.application.model.kanban.KanbanData;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
@Data
public class KanbanRequestPayload {
    @JsonProperty("value")
    private KanbanData kanbanData;
    private String table;
    private String action;
}
