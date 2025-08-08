// src/main/java/com/digimart/service/impl/PurchaseServiceImpl.java
package com.digimart.service;

import com.digimart.entities.FileEntity;
import com.digimart.entities.Purchase;
import com.digimart.entities.User;
import com.digimart.Repository.FileRepository;
import com.digimart.Repository.PurchaseRepository;
import com.digimart.Repository.UserRepository;
import com.digimart.dto.FileResponseDto;
import com.digimart.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PurchaseServiceImpl implements PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void purchaseFile(Long fileId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        boolean alreadyPurchased = purchaseRepository.existsByBuyerAndFile(user, file);
        if (alreadyPurchased) {
            throw new RuntimeException("File already purchased");
        }

        Purchase purchase = new Purchase();
        purchase.setBuyer(user);
        purchase.setFile(file);
        purchase.setPurchaseTime(LocalDateTime.now());

        purchaseRepository.save(purchase);
    }
    
    @Override
    public List<FileResponseDto> getPurchasedFiles(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<Purchase> purchases = purchaseRepository.findByBuyer(user);

        return purchases.stream()
                .map(purchase -> {
                    FileEntity file = purchase.getFile();
                    return new FileResponseDto(
                            file.getId(),
                            file.getTitle(),
                            file.getFileType(),
                            file.getFileSize(),
                            file.getUploader().getEmail(),
                            file.getPrice(),
                            "/api/files/download/" + file.getId(),
                            true // owned
                    );
                })
                .toList();
    }

}
