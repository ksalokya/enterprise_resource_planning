package com.erp.chartdataservice.service;

import com.erp.chartdataservice.payload.request.MixedStackRequestPayload;
import com.erp.chartdataservice.payload.response.MixedStackResponsePayload;

import java.util.List;

public interface MixedStackService {
    List<MixedStackResponsePayload> getAllMixedStackData(long userId);

    MixedStackResponsePayload insertMixedStackData(MixedStackRequestPayload mixedStackRequestPayload);
}