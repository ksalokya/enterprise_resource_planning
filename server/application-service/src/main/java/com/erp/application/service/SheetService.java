package com.erp.application.service;

import com.erp.application.payload.request.SheetRequestPayload;
import com.erp.application.payload.response.SheetResponsePayload;

public interface SheetService {
    SheetResponsePayload getSheet(SheetRequestPayload sheetRequestPayload);
    SheetResponsePayload updateSheet(SheetRequestPayload sheetRequestPayload);
}
