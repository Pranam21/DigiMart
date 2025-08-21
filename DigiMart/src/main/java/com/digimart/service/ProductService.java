package com.digimart.service;


import com.digimart.dto.ProductDto;
import com.digimart.dto.ProductRequestDto;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    ProductDto addProduct(ProductDto productDto);
    List<ProductDto> getAllProducts();
    ProductDto getProductById(Long id);
    void deleteProduct(Long id);
    void attachFileToProduct(Long productId, String fileName);
    ProductDto updateProduct(Long id, ProductRequestDto dto) throws IOException;
}