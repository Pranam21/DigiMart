package com.digimart;



import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;



@SpringBootApplication
public class DigiMartApplication {
    public static void main(String[] args) {
        SpringApplication.run(DigiMartApplication.class, args);
    }

    //ModelMapper Bean available for Autowiring everywhere
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
