package com.erp.common.repository;

import com.erp.common.model.delivery.DeliveryModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DeliveryRepository extends JpaRepository<DeliveryModel, Integer> {
    Optional<List<DeliveryModel>> getAllByUserId(long userId);
}
