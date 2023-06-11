package com.erp.chartdataservice.repository;

import com.erp.chartdataservice.model.BarChartModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BarChartRepository extends JpaRepository<BarChartModel, Long> {
    Optional<List<BarChartModel>> findAllByUserId(long userId);
}
