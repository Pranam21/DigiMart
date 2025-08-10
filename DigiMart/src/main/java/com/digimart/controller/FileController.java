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
    
//    @GetMapping
//    public List<FileResponseDto> getAllFiles() {
//        return fileService.getAllFiles(); // Make sure this returns *all* for now
//    }
    
    @GetMapping
    public ResponseEntity<List<FileListItemDto>> listFiles(@AuthenticationPrincipal UserDetails user) {
        String email = user.getUsername();
        return ResponseEntity.ok(fileStorageService.listFiles(email));
    }
    
    @GetMapping("/show")
    public ResponseEntity<List<FileResponseDto>> showFiles(
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "").trim();
        String email = jwtService.extractUsername(token);
        return ResponseEntity.ok(fileService.getAllFilesForUser(email));
    }
    
    
    @PostMapping("/upload")
    public ResponseEntity<FileUploadResponseDto> uploadFile(@RequestParam("file") MultipartFile file, Double price, 
                                                             @AuthenticationPrincipal UserDetails userDetails) throws IOException {
        FileUploadRequestDto requestDto = new FileUploadRequestDto(file, price);
        FileUploadResponseDto response = fileStorageService.uploadFile(requestDto, userDetails.getUsername());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> download(@PathVariable Long id,
                                             @AuthenticationPrincipal UserDetails user) throws IOException {
        if (!fileStorageService.hasAccessToFile(id, user.getUsername())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        FileDownloadResponseDto dto = fileStorageService.downloadFile(id);
        ByteArrayResource resource = new ByteArrayResource(dto.getFileData());

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(dto.getContentType() != null ? dto.getContentType() : "application/octet-stream"))
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dto.getOriginalFileName() + "\"")
            .contentLength(dto.getFileData().length)
            .body(resource);
    }
    
    


}