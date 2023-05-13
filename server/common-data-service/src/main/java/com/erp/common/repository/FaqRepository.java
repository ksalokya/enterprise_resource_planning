package com.erp.common.repository;

import com.erp.common.model.faq.FaqModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FaqRepository extends JpaRepository <FaqModel, Integer> {
}
