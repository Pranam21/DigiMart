package com.digimart.Repository;

import com.digimart.entities.Purchase;
import com.digimart.entities.User;
import com.digimart.entities.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    
    Optional<Purchase> findByBuyerAndFile(User buyer, FileEntity file);

    boolean existsByBuyerAndFile(User buyer, FileEntity file);

    List<Purchase> findAllByBuyer(User buyer);

	boolean existsByBuyerEmailAndFileId(String userEmail, Long fileId);

	List<Purchase> findByBuyer(User user);
}
