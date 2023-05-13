package com.erp.common.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FaqResponsePayload {
    private int id;
    private String question;
    private String answer;
}
