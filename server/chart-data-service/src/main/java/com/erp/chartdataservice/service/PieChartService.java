package com.erp.chartdataservice.service;

import com.erp.chartdataservice.payload.request.PieChartRequestPayload;
import com.erp.chartdataservice.payload.response.PieChartResponsePayload;

import java.util.List;

public interface PieChartService {
    List<PieChartResponsePayload> getAllPieChartData(long userId);

    PieChartResponsePayload insertPieChartData(PieChartRequestPayload PieChartRequestPayload);
}
