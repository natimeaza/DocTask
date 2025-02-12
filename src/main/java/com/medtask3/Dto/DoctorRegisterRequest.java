package com.medtask3.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class DoctorRegisterRequest {
    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public String getEmail(){
        return email;
    }

    public String getName(){
        return name;
    }
    public String getPassword(){
        return password;
    }
}
