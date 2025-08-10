package com.digimart.service;

import com.digimart.dto.*;
import com.digimart.entities.*;

import jakarta.transaction.Transactional;

import com.digimart.Repository.FileMetadataRepository;
import com.digimart.Repository.PurchaseRepository;
import com.digimart.Repository.UserRepository;
import com.digimart.Repository.FileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path fileStorageLocation;
    private final FileMetadataRepository fileMetadataRepository;
    private final UserRepository userRepository;
    private final PurchaseRepository purchaseRepository;
    private final FileRepository fileRepository;

    public FileStorageServiceImpl(@Value("${file.upload-dir}") String uploadDir,
                                  FileMetadataRepository fileMetadataRepository,
                                  UserRepository userRepository,
                                  PurchaseRepository purchaseRepository,
                                  FileRepository fileRepository) throws IOException {
        this.fileMetadataRepository = fileMetadataRepository;
        this.userRepository = userRepository;
        this.purchaseRepository = purchaseRepository;
        this.fileRepository = fileRepository;

        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(this.fileStorageLocation);
    }

    @Override
    @Transactional
    public FileUploadResponseDto uploadFile(FileUploadRequestDto requestDto, String userEmail) throws IOException {
        MultipartFile file = requestDto.getFile();
        String originalName = file.getOriginalFilename();
        String fileType = file.getContentType();
        long size = file.getSize();
        String fileName = UUID.randomUUID() + "_" + originalName;
        double price = requestDto.getPrice();

        // Store on disk
        Path target = this.fileStorageLocation.resolve(fileName);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        // Find uploader
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + userEmail));

        // --- 1) Save to FILES table ---
        FileEntity fileEntity = new FileEntity();
        fileEntity.setTitle(originalName); // using filename as title for now
        fileEntity.setDescription(null);   // no description in DTO
        fileEntity.setFilename(fileName);
        fileEntity.setFileType(fileType);
        fileEntity.setFileSize(size);
        fileEntity.setPrice(price);          // no price in DTO, default to 0
        fileEntity.setUploader(user);

        fileEntity = fileRepository.save(fileEntity); // ID generated here

        // --- 2) Save to FILE_METADATA table ---
        FileMetadata meta = new FileMetadata();
        meta.setFileName(fileName);
        meta.setOriginalFileName(originalName);
        meta.setFileType(fileType);
        meta.setFileSize(size);
        meta.setUploadedBy(user);
        meta.setPrice(price);
        meta.setDownloadUrl("/api/files/" + fileEntity.getId() + "/download");

        fileMetadataRepository.save(meta);

        // --- 3) Return response ---
        return new FileUploadResponseDto(
                meta.getFileName(),
                meta.getDownloadUrl(),
                fileType,
                size,
                meta.getPrice()
                
        );
    }



    @Override
    public FileDownloadResponseDto downloadFile(Long fileId) throws IOException {
        FileEntity file = fileRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        Path path = fileStorageLocation.resolve(file.getFilename()).normalize();
        byte[] data = Files.readAllBytes(path);

        return new FileDownloadResponseDto(data, file.getFileType(), file.getTitle());
    }

    @Override
    public boolean hasAccessToFile(Long fileId, String userEmail) {
        FileMetadata file = fileMetadataRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));

        if (file.getUploadedBy().getEmail().equals(userEmail)) {
            return true;
        }

        return purchaseRepository.existsByBuyerEmailAndFileId(userEmail, fileId);
    }
    
    @Override
    public List<FileListItemDto> listFiles(String currentUserEmail) {
        return fileMetadataRepository.findAll().stream()
            .map(meta -> FileListItemDto.builder()
                .id(meta.getId())
                .originalFilename(meta.getOriginalFileName())
                .uploaderEmail(meta.getUploadedBy() != null ? meta.getUploadedBy().getEmail() : null)
                .size(meta.getFileSize())
                .fileType(meta.getFileType())
                .canDownload(hasAccessToFile(meta.getId(), currentUserEmail))
                .build())
            .collect(Collectors.toList());
    }
}
