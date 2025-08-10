package com.digimart.service;

import com.digimart.Repository.FileMetadataRepository;
import com.digimart.Repository.FileRepository;
import com.digimart.Repository.PurchaseRepository;
import com.digimart.dto.FileResponseDto;
import com.digimart.entities.FileEntity;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {
    private final FileMetadataRepository fileMetadataRepository;
    private final PurchaseRepository purchaseRepository;

    @Override
    public List<FileResponseDto> getAllFiles() {
        return fileMetadataRepository.findAll().stream()
            .<FileResponseDto>map(m -> FileResponseDto.builder()
                .id(m.getId())
                .title(m.getOriginalFileName())          // or m.getTitle() if you have one
                .uploadedBy(m.getUploadedBy() != null ? m.getUploadedBy().getEmail() : null)
                .fileType(m.getFileType())
                .size(m.getFileSize())
                .downloadUrl("/api/files/download/" + m.getId())
                                    // if column exists; else null
                .owned(false)                            // unknown without user context
                .build())
            .toList();
    }

    @Override
    public List<FileResponseDto> getAllFilesForUser(String email) {
        return fileMetadataRepository.findAll().stream()
            .<FileResponseDto>map(m -> {
                boolean isOwner = m.getUploadedBy() != null && email.equals(m.getUploadedBy().getEmail());
                boolean hasPurchased = purchaseRepository.existsByBuyerEmailAndFileId(email, m.getId());
                return FileResponseDto.builder()
                    .id(m.getId())
                    .title(m.getOriginalFileName())      // or product/title field
                    .uploadedBy(m.getUploadedBy() != null ? m.getUploadedBy().getEmail() : null)
                    .fileType(m.getFileType())
                    .size(m.getFileSize())
                    .price(m.getPrice())
                    .downloadUrl("/api/files/download/" + m.getId())
                                     // if available
                    .owned(isOwner || hasPurchased)
                    .build();
            })
            .toList();
    }
}
