package com.digimart.service;


import com.digimart.dto.CategoryDto;
import java.util.List;

public interface CategoryService {
    CategoryDto addCategory(CategoryDto dto);
    List<CategoryDto> getAllCategories();
    CategoryDto getCategoryById(Long id);
    void deleteCategory(Long id);
}

