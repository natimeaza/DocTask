package com.medtask3.Service;

import com.medtask3.entity.Doctor;
import com.medtask3.repository.DoctorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(DoctorRepository doctorRepository, PasswordEncoder passwordEncoder) {
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Map<String, Object> login(String email, String password) {
        Optional<Doctor> doctorOptional = doctorRepository.findByEmail(email);
        if (doctorOptional.isPresent()) {
            Doctor doctor = doctorOptional.get();
           
            if (passwordEncoder.matches(password, doctor.getPassword())) {
                Map<String, Object> loggedDoctor = new HashMap<>();
                loggedDoctor.put("name", doctor.getUsername());
                loggedDoctor.put("id", doctor.getId());
                return loggedDoctor;
            }
        }
        return null; 
    }
}