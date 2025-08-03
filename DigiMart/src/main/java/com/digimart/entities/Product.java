package com.digimart.entities;

import javax.validation.constraints.NotNull;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {
		//private Long productId;
	   
		@Column(name = "product_name", length = 50, nullable = false)
		private String name;
		
		@Column(length = 100)
	    private String description;
		
		@ManyToOne
		@JoinColumn(name = "category_id")
		@NotNull
	    private Category categoryId;
		
		@Column(nullable = false)
	    private Double price;
		
		@ManyToOne
		@JoinColumn(name = "seller_id")
		@NotNull
	    private User sellerId;
		
		@Column(name = "file_url")
	    private String fileUrl; // Location of the digital good
	    //private String thumbnailUrl;
	    //private String status; // e.g., "active", "pending"
	    @Column
		private String uploadDate;
}
