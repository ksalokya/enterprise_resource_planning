package com.erp.application.service;

import com.erp.application.payload.request.EditorRequestPayload;
import com.erp.application.payload.response.EditorResponsePayload;
import com.mongodb.client.result.UpdateResult;

public interface EditorService {
    EditorResponsePayload getEditor(String userName);
    UpdateResult updateEditor(EditorRequestPayload editorRequestPayload);
}
