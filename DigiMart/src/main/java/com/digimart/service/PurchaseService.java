package com.digimart.service;

import java.util.List;

import com.digimart.dto.FileResponseDto;

public interface PurchaseService {
	    void purchaseFile(Long fileId, String userEmail);

		List<FileResponseDto> getPurchasedFiles(String email);

		
	    
	}

