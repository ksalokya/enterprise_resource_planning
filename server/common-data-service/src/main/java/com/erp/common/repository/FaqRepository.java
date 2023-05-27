package com.erp.common.repository;

import com.erp.common.model.faq.FaqModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FaqRepository extends JpaRepository<FaqModel, Integer> {
    Optional<List<FaqModel>> findAllByUserId(long userId);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("update FaqModel f set f.question = :question, f.answer = :answer where f.id = :id and f.userId = :userId")
    void saveByIdAndUserId(@Param("id") long id, @Param("userId") long userId,
                               @Param("question") String question, @Param("answer") String answer);

    @Transactional
    void removeByIdAndUserId(long faqId, long userId);
}
