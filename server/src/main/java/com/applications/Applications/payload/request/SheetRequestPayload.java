package com.applications.Applications.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SheetRequestPayload {
    @NotEmpty
    @JsonProperty("Email")
    private String email;

    @NotEmpty
    @JsonProperty("Name")
    private String sheetName;

    @JsonProperty("JSONData")
    private Object jsonData;

    @JsonProperty("ContentType")
    private String contentType;

    @JsonProperty("VersionType")
    private String versionType;
}
