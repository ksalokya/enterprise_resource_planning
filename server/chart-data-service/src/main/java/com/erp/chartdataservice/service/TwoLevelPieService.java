package com.erp.chartdataservice.service;

import com.erp.chartdataservice.payload.request.TwoLevelPieRequestPayload;
import com.erp.chartdataservice.payload.response.twolevelpie.TwoLevelPieChartData;
import com.erp.chartdataservice.payload.response.twolevelpie.TwoLevelPieResponsePayload;

public interface TwoLevelPieService {
    TwoLevelPieResponsePayload getAllTwoLevelPieData(long userId);

    TwoLevelPieChartData insertTwoLevelPieData(TwoLevelPieRequestPayload twoLevelPieRequestPayload);
}
