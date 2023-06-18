package com.erp.chartdataservice.repository;

import com.erp.chartdataservice.model.PieChartModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PieChartRepository extends JpaRepository<PieChartModel, Long> {
    Optional<List<PieChartModel>> findAllByUserId(long userId);
}
