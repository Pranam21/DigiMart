// src/main/java/com/digimart/controller/PurchaseController.java
package com.digimart.controller;

import com.digimart.dto.FileResponseDto;
import com.digimart.security.JwtService;

import com.digimart.service.PurchaseService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/purchase")
@CrossOrigin(origins = "http://localhost:5173")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/{fileId}")
    public ResponseEntity<String> purchase(@PathVariable Long fileId,
                                           @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractUsername(token);

        purchaseService.purchaseFile(fileId, email);

        return ResponseEntity.ok("Purchase successful");
    }
    
 // PurchaseController.java

    @GetMapping("/my-files")
    public ResponseEntity<List<FileResponseDto>> getMyPurchasedFiles(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractUsername(token);

        List<FileResponseDto> files = purchaseService.getPurchasedFiles(email);
        return ResponseEntity.ok(files);
    }

}
