package com.digimart.entities;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
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
		
		
		@Email
		@Column(nullable = false, length = 50)
	    private String email;
		
		@Column(nullable = false, length = 255)
		private String password; 
		
		@Enumerated(EnumType.STRING)
		@Column(name = "user_role")
	    private Role roles;
		
		
	    private LocalDate registrationDate;

	    
	    
	    
	    
//	    //helpers
//	    public Set<Role> getRoles() { return roles; }
//	    
//	    public void setRoles(Set<Role> roles) { this.roles = roles; }
	    
	    
	}



