// src/main/java/com/digimart/entities/Purchase.java
package com.digimart.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchases")
@Getter
@Setter
public class Purchase extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")       // FK column name in DB
    private User buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "file_id")        // FK column name in DB
    private FileEntity file;

    @Column(name = "purchased_at")
    private LocalDateTime purchasedAt;
}
