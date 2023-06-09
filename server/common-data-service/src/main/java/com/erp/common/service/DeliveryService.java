package com.erp.common.service;

import com.erp.common.payload.request.DeliveryRequestPayload;
import com.erp.common.payload.response.DeliveryResponsePayload;

import java.util.List;

public interface DeliveryService {
    DeliveryResponsePayload createDeliveryData(DeliveryRequestPayload deliveryRequestPayload);

    List<DeliveryResponsePayload> getDeliveryData(long userId);
}
