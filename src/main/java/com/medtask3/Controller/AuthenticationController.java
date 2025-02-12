package com.medtask3.Controller;

import com.medtask3.Service.AuthenticationService;
import com.medtask3.entity.Doctor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthenticationController {
    private  final AuthenticationService authenticationService;
    public AuthenticationController (AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }
    @PostMapping("/auth/login")
public ResponseEntity<Map<String, Object>> login(@RequestBody Doctor doctor) {
    try {
        Map<String, Object> login = authenticationService.login(doctor.getEmail(), doctor.getPassword());
        System.out.println(login);
        if (!login.isEmpty()) {
            return ResponseEntity.ok(login);
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body(Map.of("message", "Internal Server Error"));
    }
}

}


