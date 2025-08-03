package com.digimart.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.digimart.entities.Payment;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
