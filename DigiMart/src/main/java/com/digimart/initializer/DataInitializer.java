package com.digimart.initializer;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;



@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private com.digimart.Repository.UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
   
    @Override
    public void run(String... args) {
        // Save the area first
      
        if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
            com.digimart.entities.User admin = new com.digimart.entities.User();
            admin.setUsername("Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123"));   
            admin.setRoles(com.digimart.entities.Role.ADMIN);
            admin.setRegistrationDate(LocalDate.parse("2025-06-12"));
            userRepository.save(admin);
            System.out.println("Admin user seeded successfully.");
        } else {
            System.out.println("Admin user already exists.");
        }
    }



}
