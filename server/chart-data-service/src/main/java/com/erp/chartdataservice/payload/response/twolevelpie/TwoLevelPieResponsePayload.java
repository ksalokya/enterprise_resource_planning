package com.erp.chartdataservice.payload.response.twolevelpie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TwoLevelPieResponsePayload {
    private List<TwoLevelPieChartData> group;
    private List<TwoLevelPieChartData> data;
}