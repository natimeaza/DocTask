package com.medtask3.Controller;

import com.medtask3.entity.Appointment;
import com.medtask3.Service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Fetch appointments for a specific date
    @GetMapping("/date")
    public ResponseEntity<List<Appointment>> getAppointmentsByDate(@RequestParam LocalDate date) {
        List<Appointment> appointments = appointmentService.getAppointmentsByDate(date);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    // Fetch today's appointments for a doctor
    @GetMapping("/today")
    public ResponseEntity<List<Appointment>> getTodayAppointments(@RequestParam Long doctorId) {
        List<Appointment> appointments = appointmentService.getTodayAppointments(doctorId);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    // Fetch all appointments for a doctor
    @GetMapping("/all")
    public ResponseEntity<List<Appointment>> getAllAppointments(@RequestParam Long doctorId) {
        List<Appointment> appointments = appointmentService.getAllAppointments(doctorId);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }

    // Add a new appointment
    @PostMapping("/add")
    public ResponseEntity<Appointment> addAppointment(@RequestBody Appointment appointment) {
        Appointment savedAppointment = appointmentService.addAppointment(appointment);
        return new ResponseEntity<>(savedAppointment, HttpStatus.CREATED);
    }

    // Edit an existing appointment by ID
    @PutMapping("/edit/{id}")
    public ResponseEntity<Appointment> editAppointment(@PathVariable Long id, @RequestBody Appointment updatedAppointment) {
        Appointment editedAppointment = appointmentService.editAppointment(id, updatedAppointment);
        return new ResponseEntity<>(editedAppointment, HttpStatus.OK);
    }

    // Delete an appointment by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

