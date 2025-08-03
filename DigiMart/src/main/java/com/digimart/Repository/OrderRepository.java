package com.digimart.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.digimart.entities.Order;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
