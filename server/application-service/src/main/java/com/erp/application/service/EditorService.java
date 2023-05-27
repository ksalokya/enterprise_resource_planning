package com.erp.application.service;

import com.erp.application.payload.request.EditorRequestPayload;
import com.erp.application.payload.response.EditorResponsePayload;

public interface EditorService {
    EditorResponsePayload getEditor(String userName);
    EditorResponsePayload updateEditor(EditorRequestPayload editorRequestPayload);
}
