package com.medtask3.Controller;

import com.medtask3.Service.DoctorService;
import com.medtask3.entity.Doctor;
import com.medtask3.Dto.DoctorRegisterRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

  

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping("/SignUp")
    public ResponseEntity<String> registerDoctor(@Valid @RequestBody DoctorRegisterRequest request) {
        Doctor doctor = doctorService.registerDoctor(request);
        return ResponseEntity.ok("Doctor registered successfully: " + doctor.getUsername());
    }
}
