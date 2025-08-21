package com.digimart.service;



import com.digimart.dto.ProductDto;
import com.digimart.dto.ProductRequestDto;
import com.digimart.entities.Category;
import com.digimart.entities.Product;
import com.digimart.entities.User;
import com.digimart.Repository.*;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private  FileStorageService fileStorageService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ProductDto addProduct(ProductDto dto) {
        Product product = modelMapper.map(dto, Product.class);

        // Set category & seller from IDs
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        User seller = userRepository.findById(dto.getSellerId())
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        product.setCategoryId(category);
        product.setSellerId(seller);

        Product saved = productRepository.save(product);
        return modelMapper.map(saved, ProductDto.class);
    }

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> modelMapper.map(product, ProductDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return modelMapper.map(product, ProductDto.class);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
    
    public void attachFileToProduct(Long productId, String fileName) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(fileName);
        productRepository.save(product);
    }
    
    public ProductDto updateProduct(Long id, ProductRequestDto dto) throws IOException {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setCategoryId(categoryRepository.findById(dto.getCategoryId())
            .orElseThrow(() -> new RuntimeException("Category not found")));

        if (dto.getFile() != null && !dto.getFile().isEmpty()) {
            String fileUrl = fileStorageService.storeFile(dto.getFile());
            product.setFileUrl(fileUrl);
        }

        return modelMapper.map(productRepository.save(product), ProductDto.class);
    }
    
    
    
}
