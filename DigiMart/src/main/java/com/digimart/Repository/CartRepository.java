package com.digimart.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.digimart.entities.Cart;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
}

