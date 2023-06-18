package com.erp.chartdataservice.repository;

import com.erp.chartdataservice.model.MixedStackModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MixedStackRepository extends JpaRepository<MixedStackModel, Long> {
    Optional<List<MixedStackModel>> findAllByUserId(long userId);

}
