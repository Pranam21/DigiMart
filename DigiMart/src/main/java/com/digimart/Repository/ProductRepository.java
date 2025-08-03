package com.digimart.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.digimart.entities.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
