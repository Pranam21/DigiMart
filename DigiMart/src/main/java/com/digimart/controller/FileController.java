package com.digimart.controller;

import com.digimart.dto.*;
import com.digimart.security.JwtService;
import com.digimart.service.FileService;
import com.digimart.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;
    
    @Autowired  
    private FileService fileService;
    
    @Autowired
    private JwtService jwtService;
    
    @GetMapping("/files/show")
    public ResponseEntity<List<FileResponseDto>> getAllFiles() {
        List<FileResponseDto> files = fileService.getAllFiles();
        return ResponseEntity.ok(files);
    }
    
    
    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponseDto> uploadFile(@RequestParam("file") MultipartFile file,
                                                             @AuthenticationPrincipal UserDetails userDetails) throws IOException {
        FileUploadRequestDto requestDto = new FileUploadRequestDto(file);
        FileUploadResponseDto response = fileStorageService.uploadFile(requestDto, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable Long fileId,
                                               @RequestHeader("Authorization") String authHeader) throws IOException {
        String token = authHeader.replace("Bearer ", "");
        String userEmail = jwtService.extractUsername(token);

        if (!fileStorageService.hasAccessToFile(fileId, userEmail)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        FileDownloadResponseDto dto = fileStorageService.downloadFile(fileId);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(dto.getContentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dto.getOriginalFileName() + "\"")
                .body(dto.getFileData());
    }


}