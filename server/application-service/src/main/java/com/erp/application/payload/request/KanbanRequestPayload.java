package com.erp.application.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KanbanRequestPayload {
    private String email;
    @JsonProperty("Id")
    private String id;
    @JsonProperty("Status")
    private String status;
    @JsonProperty("summary")
    private String summary;
    @JsonProperty("Priority")
    private String priority;
    @JsonProperty("Assignee")
    private String assignee;
}
