// src/main/java/com/digimart/repository/FileRepository.java
package com.digimart.Repository;

import com.digimart.entities.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<FileEntity, Long> {
}
