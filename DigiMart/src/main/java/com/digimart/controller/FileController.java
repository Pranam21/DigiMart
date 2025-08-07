package com.digimart.controller;

import com.digimart.dto.*;
import com.digimart.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponseDto> uploadFile(@RequestParam("file") MultipartFile file,
                                                             @AuthenticationPrincipal UserDetails userDetails) throws IOException {
        FileUploadRequestDto requestDto = new FileUploadRequestDto(file);
        FileUploadResponseDto response = fileStorageService.uploadFile(requestDto, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long fileId) throws IOException {
        FileDownloadResponseDto dto = fileStorageService.downloadFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dto.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dto.getOriginalFileName() + "\"")
                .body(dto.getFileData());
    }
}