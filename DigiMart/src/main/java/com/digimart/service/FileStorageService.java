package com.digimart.service;

import com.digimart.dto.FileDownloadResponseDto;
import com.digimart.dto.FileListItemDto;
import com.digimart.dto.FileUploadRequestDto;
import com.digimart.dto.FileUploadResponseDto;
import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    FileUploadResponseDto uploadFile(FileUploadRequestDto requestDto, String userEmail) throws IOException;
    FileDownloadResponseDto downloadFile(Long fileId) throws IOException;
	boolean hasAccessToFile(Long fileId, String userEmail);
	
	// FileStorageService.java
	List<FileListItemDto> listFiles(String currentUserEmail);
	
	String storeFile(MultipartFile file) throws IOException;

}