package com.erp.common.service.implementation;

import com.erp.common.model.delivery.DeliveryModel;
import com.erp.common.model.order.OrderModel;
import com.erp.common.payload.request.OrderRequestPayload;
import com.erp.common.payload.response.OrderResponsePayload;
import com.erp.common.repository.OrderRepository;
import com.erp.common.service.OrderService;
import jakarta.persistence.criteria.Order;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class OrderServiceImplementation implements OrderService {
    Logger logger = LoggerFactory.getLogger(OrderServiceImplementation.class);

    @Autowired
    private OrderRepository orderRepository;

    @Bean
    public ModelMapper orderModelMapper() {
        return new ModelMapper();
    }
    @Override
    public List<OrderResponsePayload> getAllOrders(long userId) {
        logger.info("getAllOrders method invoked with user id :: " + userId);
        // TODO :: Handle Exception
        List<OrderModel> orderModels = orderRepository.findAllByUserId(userId)
                .orElseThrow();
        return mapToDtoList(orderModels);
    }

    @Override
    public OrderResponsePayload insertOrder(OrderRequestPayload orderRequestPayload) {
        logger.info("insertOrder method invoked with payload :: " + orderRequestPayload);
        OrderModel orderModel = mapToEntity(orderRequestPayload);
        OrderModel insertedOrderModel = orderRepository.save(orderModel);
        return mapToDto(insertedOrderModel);
    }

    @Override
    public void updateOrder(long id, OrderRequestPayload orderRequestPayload) {
        logger.info("updateOrder method invoked with payload :: " + orderRequestPayload);
        orderRepository.saveByIdAndUserId(id, orderRequestPayload.getUserId(),
                orderRequestPayload.getProduct(), orderRequestPayload.getImg(),
                orderRequestPayload.getCustomerName(), orderRequestPayload.getDate(),
                orderRequestPayload.getAmount(), orderRequestPayload.getMethod(),
                orderRequestPayload.getStatus());
    }

    @Override
    public void deleteOrder(long id, long userId) {
        logger.info("updateOrder method invoked with id and userId :: " + id + " " + userId);
        orderRepository.removeByIdAndUserId(id, userId);
    }

    private OrderModel mapToEntity(OrderRequestPayload OrderRequestPayload) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return modelMapper.map(OrderRequestPayload, OrderModel.class);
    }

    private OrderResponsePayload mapToDto(OrderModel OrderModel) {
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(OrderModel, OrderResponsePayload.class);
    }

    private List<OrderResponsePayload> mapToDtoList(List<OrderModel> OrderModel) {
        ModelMapper modelMapper = new ModelMapper();
        return Arrays.asList(modelMapper.map(OrderModel, OrderResponsePayload[].class));
    }
}
