package com.digimart.service;

import com.digimart.dto.*;
import com.digimart.entities.*;
import com.digimart.Repository.FileMetadataRepository;
import com.digimart.Repository.UserRepository;
import com.digimart.service.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final Path fileStorageLocation;
    private final FileMetadataRepository fileMetadataRepository;
    private final UserRepository userRepository;

    public FileStorageServiceImpl(@Value("${file.upload-dir}") String uploadDir,
                                  FileMetadataRepository fileMetadataRepository,
                                  UserRepository userRepository) throws IOException {
        this.fileMetadataRepository = fileMetadataRepository;
        this.userRepository = userRepository;
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(this.fileStorageLocation);
    }

    @Override
    public FileUploadResponseDto uploadFile(FileUploadRequestDto requestDto, String userEmail) throws IOException {
        MultipartFile file = requestDto.getFile();
        String originalName = file.getOriginalFilename();
        String fileType = file.getContentType();
        Long size = file.getSize();
        String fileName = UUID.randomUUID() + "_" + originalName;
        Path target = this.fileStorageLocation.resolve(fileName);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

        User user = userRepository.findByEmail(userEmail).orElseThrow();
        FileMetadata meta = new FileMetadata();
        meta.setFileName(fileName);
        meta.setOriginalFileName(originalName);
        meta.setFileType(fileType);
        meta.setFileSize(size);
        meta.setUploadedBy(user);
        meta.setDownloadUrl("/api/files/download/" + fileName);
        fileMetadataRepository.save(meta);

        return new FileUploadResponseDto(fileName, meta.getDownloadUrl(), fileType, size);
    }

    @Override
    public FileDownloadResponseDto downloadFile(Long fileId) throws IOException {
        FileMetadata file = fileMetadataRepository.findById(fileId).orElseThrow();
        Path path = fileStorageLocation.resolve(file.getFileName()).normalize();
        byte[] data = Files.readAllBytes(path);

        return new FileDownloadResponseDto(data, file.getFileType(), file.getOriginalFileName());
    }
}