package com.erp.application.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KanbanResponsePayload {
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
