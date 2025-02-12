package com.medtask3.repository;

import com.medtask3.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // Custom query method to find a doctor by username
    Doctor findByUsername(String username);
    Optional<Doctor> findByEmail(String email);
}
