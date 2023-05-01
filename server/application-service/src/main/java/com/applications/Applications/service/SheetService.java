package com.applications.Applications.service;

import com.applications.Applications.payload.request.SheetRequestPayload;
import com.applications.Applications.payload.response.SheetResponsePayload;

public interface SheetService {
    SheetResponsePayload getSheet(SheetRequestPayload sheetRequestPayload);
    SheetResponsePayload updateSheet(SheetRequestPayload sheetRequestPayload);
}
