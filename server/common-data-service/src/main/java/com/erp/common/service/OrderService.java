package com.erp.common.service;

import com.erp.common.payload.request.OrderRequestPayload;
import com.erp.common.payload.response.OrderResponsePayload;

import java.util.List;

public interface OrderService {
    List<OrderResponsePayload> getAllOrders(long userId);

    OrderResponsePayload insertOrder(OrderRequestPayload orderRequestPayload);

    void updateOrder(long id, OrderRequestPayload orderRequestPayload);

    void deleteOrder(long id, long userId);
}
