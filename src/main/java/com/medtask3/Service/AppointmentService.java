package com.medtask3.Service;

import com.medtask3.entity.Appointment;
import com.medtask3.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getTodayAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorIdAndDate(doctorId, LocalDate.now());
    }

    public List<Appointment> getAllAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    public Appointment addAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment editAppointment(Long id, Appointment updatedAppointment) {
        Optional<Appointment> existingAppointmentOpt = appointmentRepository.findById(id);

        if (existingAppointmentOpt.isPresent()) {
            Appointment existingAppointment = existingAppointmentOpt.get();

            
            existingAppointment.setPatientName(updatedAppointment.getPatientName());
            existingAppointment.setDoctor(updatedAppointment.getDoctor());
            existingAppointment.setDate(updatedAppointment.getDate());
            existingAppointment.setDescription(updatedAppointment.getDescription());
            existingAppointment.setPhone(updatedAppointment.getPhone());
            existingAppointment.setTime(updatedAppointment.getTime());

            return appointmentRepository.save(existingAppointment); 
        } else {
            throw new RuntimeException("Appointment not found with ID: " + id);
        }
    }

    public void deleteAppointment(Long id) {
        Optional<Appointment> existingAppointment = appointmentRepository.findById(id);

        if (existingAppointment.isPresent()) {
            appointmentRepository.delete(existingAppointment.get());
        } else {
            throw new RuntimeException("Appointment not found with ID: " + id);
        }
    }

    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByDate(date);
    }
}
