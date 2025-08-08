package com.digimart.service;

import com.digimart.dto.FileDownloadResponseDto;
import com.digimart.dto.FileUploadRequestDto;
import com.digimart.dto.FileUploadResponseDto;
import java.io.IOException;

public interface FileStorageService {
    FileUploadResponseDto uploadFile(FileUploadRequestDto requestDto, String userEmail) throws IOException;
    FileDownloadResponseDto downloadFile(Long fileId) throws IOException;
	boolean hasAccessToFile(Long fileId, String userEmail);
}