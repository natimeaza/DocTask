package com.medtask3.Service;

import com.medtask3.entity.Doctor;
import com.medtask3.Dto.DoctorRegisterRequest;
import com.medtask3.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;

   // @Autowired
    public DoctorService(DoctorRepository doctorRepository, PasswordEncoder passwordEncoder) {
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Doctor registerDoctor(DoctorRegisterRequest request) {
        if (doctorRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already in use.");
        }

        Doctor doctor = new Doctor();
        doctor.setUsername(request.getName());
        doctor.setEmail(request.getEmail());
        doctor.setPassword(passwordEncoder.encode(request.getPassword())); // Encode the password

        return doctorRepository.save(doctor);
    }
}