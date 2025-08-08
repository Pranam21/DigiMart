package com.digimart.service;

import com.digimart.Repository.FileRepository;
import com.digimart.dto.FileResponseDto;
import com.digimart.entities.FileEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileServiceImpl implements FileService {

    private final FileRepository fileRepository;

    public FileServiceImpl(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Override
    public List<FileResponseDto> getAllFiles() {
        List<FileEntity> files = fileRepository.findAll();

        return files.stream()
            .map(f -> new FileResponseDto(
                f.getId(),
                f.getTitle(),                       // original file name
                f.getFileType(),
                f.getFileSize(),                        // Long size (bytes)
                // ⬇️ use whichever your entity has:
                (f.getUploader() != null ? f.getUploader().getEmail() : null),
                // if your entity uses uploadedBy instead, use:
                // (f.getUploadedBy() != null ? f.getUploadedBy().getEmail() : null),
                f.getPrice(),
                null,                                // downloadUrl (only set when owned)
                false                                // owned (compute separately if needed)
            ))
            .collect(Collectors.toList());           // use .toList() if you're on Java 16+
    }
}
