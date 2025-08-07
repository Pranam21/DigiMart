package com.digimart.service;


import com.digimart.dto.ProductDto;
import java.util.List;

public interface ProductService {
    ProductDto addProduct(ProductDto productDto);
    List<ProductDto> getAllProducts();
    ProductDto getProductById(Long id);
    void deleteProduct(Long id);
    void attachFileToProduct(Long productId, String fileName);
}