package com.digimart.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // allow all routes
                .allowedOrigins("http://localhost:5173") // allow frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // allow methods
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
