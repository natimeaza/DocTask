package com.medtask3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

   
@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class})

public class MedTaskApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedTaskApplication.class, args);

		System.out.println("Program is running...");


	}

}
