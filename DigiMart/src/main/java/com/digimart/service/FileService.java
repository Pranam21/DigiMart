// FileService.java
package com.digimart.service;

import com.digimart.dto.FileDto;
import com.digimart.dto.FileResponseDto;

import java.util.List;

public interface FileService {
    List<FileResponseDto> getAllFiles(); // ✅ must match exactly
}
