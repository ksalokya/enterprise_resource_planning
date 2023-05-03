package com.erp.application.payload.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SheetResponsePayload {
    @NotEmpty
    @JsonProperty("JSONData")
    private Object jsonData;
    @NotEmpty
    @JsonProperty("ContentType")
    private String contentType;
    @NotEmpty
    @JsonProperty("VersionType")
    private String versionType;
}
