package com.erp.common.repository;

import com.erp.common.model.faq.FaqModel;
import com.erp.common.model.order.OrderModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderModel, Long> {
    Optional<List<OrderModel>> findAllByUserId(long userId);

    @Transactional
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("update OrderModel o set o.product = :product, o.img = :img, o.customerName = :customerName, o.date = :date," +
            "o.amount = :amount, o.method = :method, o.status = :status where o.id = :id and o.userId = :userId")
    void saveByIdAndUserId(@Param("id") long id, @Param("userId") long userId,
                           @Param("product") String product, @Param("img") String img,
                           @Param("customerName") String customerName, @Param("date") String date,
                           @Param("amount") long amount, @Param("method") String method,
                           @Param("status") String status);

    @Transactional
    void removeByIdAndUserId(long faqId, long userId);
}
