package com.digimart.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.digimart.entities.OrderItem;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
