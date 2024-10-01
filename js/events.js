document.addEventListener("DOMContentLoaded", function () {
    const appointmentForm = document.getElementById("appointment-form");
    const prescriptionForm = document.getElementById("prescription-form");

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            showLoadingIndicator();

            const patientId = document.getElementById("patient-select").value;
            const doctorId = document.getElementById("doctor-select").value;
            const appointmentDate = document.getElementById("appointment-date").value;

            const appointment = {
                patientId: parseInt(patientId),
                doctorId: parseInt(doctorId),
                date: appointmentDate
            };

            try {
                await postAppointment(appointment);
                alert("Appointment added successfully");
                appointmentForm.reset(); // Clear form fields
                await loadInitialData(); // Refresh the table after adding
            } catch (error) {
                showErrorMessage("Failed to add appointment: " + (error.message || "Unknown error"));
            } finally {
                hideLoadingIndicator();
            }
        });
    }

    if (prescriptionForm) {
        prescriptionForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            showLoadingIndicator();

            const appointmentId = document.getElementById("appointment-select").value;
            const medication = document.getElementById("medication").value;
            const dosage = document.getElementById("dosage").value;

            const prescription = {
                appointmentId: parseInt(appointmentId),
                medication: medication,
                dosage: dosage
            };

            try {
                await postPrescription(prescription);
                alert("Prescription added successfully");
                prescriptionForm.reset(); // Clear form fields
                await loadPatientAppointments(appointmentId); // Refresh the appointments after adding
            } catch (error) {
                showErrorMessage("Failed to add prescription: " + (error.message || "Unknown error"));
            } finally {
                hideLoadingIndicator();
            }
        });
    }
});
