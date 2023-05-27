package com.erp.application.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "sheet")
public class SheetModel {
    private String email;
    @JsonProperty("JSONData")
    private Object jsonData;
    @JsonProperty("ContentType")
    private String contentType;
    @JsonProperty("VersionType")
    private String versionType;
}
