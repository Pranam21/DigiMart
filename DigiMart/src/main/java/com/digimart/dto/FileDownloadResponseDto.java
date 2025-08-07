package com.digimart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FileDownloadResponseDto {
    private byte[] fileData;
    private String contentType;
    private String originalFileName;
}