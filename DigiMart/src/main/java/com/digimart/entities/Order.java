package com.digimart.entities;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order extends BaseEntity {
	// private Long orderId;
	
		@ManyToOne
		@JoinColumn(name = "customer_id")
		@NotNull
	    private User customerId;
		
		@Column(name = "order_date", nullable = false)
	    private LocalDate orderDate;
		
		@Column(name = "total")
	    private Double totalAmount;
		
		@Enumerated(EnumType.STRING)
		@Column(name = "order_status")
	    private Status orderStatus; 
		
		@Enumerated(EnumType.STRING)
		@Column(name = "payment_status")
	    private Status paymentStatus; 

}
