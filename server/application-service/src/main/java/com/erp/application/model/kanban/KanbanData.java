package com.erp.application.model.kanban;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KanbanData {
    @JsonProperty("Id")
    private String id;
    @JsonProperty("Status")
    private String status;
    @JsonProperty("Priority")
    private String priority;
    @JsonProperty("Assignee")
    private String assignee;
    @JsonProperty("Summary")
    private String summary;
}
