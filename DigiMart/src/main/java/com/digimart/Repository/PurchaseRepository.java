package com.digimart.Repository;

import com.digimart.entities.Purchase;
import com.digimart.entities.User;
import com.digimart.entities.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    
    Optional<Purchase> findByBuyerAndFile(User buyer, FileEntity file);

    boolean existsByBuyerAndFile(User buyer, FileEntity file);

    List<Purchase> findAllByBuyer(User buyer);

	//boolean existsByBuyerEmailAndFileId(String userEmail, Long fileId);

	List<Purchase> findByBuyer(User user);
	
	// Option B: explicit JPQL (avoids name pitfalls)
    @Query("select (count(p) > 0) from Purchase p where p.buyer.email = :email and p.file.id = :fileId")
    boolean existsByBuyerEmailAndFileId(@Param("email") String email, @Param("fileId") Long fileId);
}
