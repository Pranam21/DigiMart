package com.digimart.entities;

import java.time.LocalDate;

import javax.validation.constraints.Email;

import jakarta.persistence.*;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
		
		@Column(name = "user_name", nullable = false, length = 50)
	    private String username;
		
		@Column(nullable = false, length = 50)
		@Email
	    private String email;
		
		@Column(nullable = false, length = 50)
		
	    private String password; 
		
		@Enumerated(EnumType.STRING)
		@Column(name = "user_role")
	    private Role role;
		
		
	    private LocalDate registrationDate;

	    
	}



