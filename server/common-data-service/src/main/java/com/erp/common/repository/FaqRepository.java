package com.erp.common.repository;

import com.erp.common.model.faq.FaqModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FaqRepository extends JpaRepository <FaqModel, Integer> {
    Optional<List<FaqModel>> findAllByUserId(long userId);
}
