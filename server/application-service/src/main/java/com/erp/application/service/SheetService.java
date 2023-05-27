package com.erp.application.service;

import com.erp.application.payload.request.SheetRequestPayload;
import com.erp.application.payload.response.SheetResponsePayload;
import com.mongodb.client.result.UpdateResult;

public interface SheetService {
    SheetResponsePayload getSheet(SheetRequestPayload sheetRequestPayload);
    UpdateResult updateSheet(SheetRequestPayload sheetRequestPayload);
}
