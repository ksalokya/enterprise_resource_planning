package com.erp.chartdataservice.repository;

import com.erp.chartdataservice.model.TwoLevelPieModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TwoLevelPieRepository extends JpaRepository<TwoLevelPieModel, Long> {
    Optional<List<TwoLevelPieModel>> findAllByTypeAndUserId(String type, long userId);
}
