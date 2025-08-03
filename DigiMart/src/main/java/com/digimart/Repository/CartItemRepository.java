package com.digimart.Repository;



import org.springframework.data.jpa.repository.JpaRepository;
import com.digimart.entities.CartItem;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
