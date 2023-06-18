package com.erp.chartdataservice.service;

import com.erp.chartdataservice.payload.request.BarChartRequestPayload;
import com.erp.chartdataservice.payload.response.BarChartResponsePayload;

import java.util.List;

public interface BarChartService {
    List<BarChartResponsePayload> getAllBarChartData(long userId);

    BarChartResponsePayload insertBarChartData(BarChartRequestPayload barChartRequestPayload);
}
