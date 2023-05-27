package com.erp.application.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KanbanData {
    @JsonProperty("Id")
    private String id;
//    private String Title;
    @JsonProperty("Status")
    private String status;
    @JsonProperty("summary")
    private String summary;
//    private String Type;
    @JsonProperty("Priority")
    private String priority;
//    private String Tags;
//    private String Estimate;
    @JsonProperty("Assignee")
    private String assignee;
//    private String Rank;
//    private String Color;
//    private String Class;
}
