package com.digimart.entities;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment extends BaseEntity {
	//private Long paymentId;
   
	@OneToOne
	@JoinColumn(name = "order_id")
	@NotNull
	private Order orderId;
	
	@Column(name = "payment_date", nullable = false)
    private LocalDate paymentDate;
	
	@Column(nullable = false)
    private Double amount;
	
    @Column(name = "payment_method", nullable = false)
	private String paymentMethod; // e.g., "Stripe", "PayPal"
    
    
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
	private Status paymentStatus; // e.g., "success", "failed"
    
    @Column
    private String transactionReference;

}
