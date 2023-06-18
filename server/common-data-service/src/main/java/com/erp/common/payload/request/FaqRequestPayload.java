package com.erp.common.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FaqRequestPayload {
    private String question;
    private String answer;
    private long userId;
}
