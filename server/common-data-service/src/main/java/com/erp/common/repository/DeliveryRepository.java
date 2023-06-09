package com.erp.common.repository;

import com.erp.common.model.delivery.DeliveryModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DeliveryRepository extends JpaRepository<DeliveryModel, Long> {
    Optional<List<DeliveryModel>> getAllByUserId(long userId);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("update DeliveryModel d set d.code = :code, d.value = :value, d.name = :name, d.population = :population, d.density = :density where d.id = :id and d.userId = :userId")
    void saveByIdAndUserId(@Param("id") long id, @Param("userId") long userId,
                           @Param("code") String code, @Param("value") long value,
                           @Param("name") String name, @Param("population") long population,
                           @Param("density") long density);

    @Transactional
    void removeByIdAndUserId(long id, long userId);
}
