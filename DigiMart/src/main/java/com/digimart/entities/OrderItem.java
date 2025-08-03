package com.digimart.entities;

import javax.validation.constraints.NotNull;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orderItems")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id")
    @NotNull
    private Order orderId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    @NotNull
    private Product productId;

    @Column(name = "purchase_price", nullable = false)
    private Double priceAtPurchase;

    // private String downloadLink;
}
