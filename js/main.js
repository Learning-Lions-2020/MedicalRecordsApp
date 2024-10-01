async function loadInitialData() {
    try {
        const patients = await fetchPatients();
        populatePatientsTable(patients);
        populatePatientDropdown(patients);

        await loadAvailableDoctors(); // Call to load available doctors
    } catch (error) {
        console.error("Failed to load initial data:", error);
        showErrorMessage("An error occurred while loading data. Please try again.");
    }
}

async function loadAvailableDoctors() {
    try {
        const doctors = await fetchDoctors(); // Fetch doctors from the API
        populateDoctorsDropdown(doctors); // Populate the dropdown
    } catch (error) {
        console.error("Failed to load doctors:", error);
        showErrorMessage("An error occurred while loading doctors. Please try again.");
    }
}

function populatePatientsTable(patients) {
    const tableBody = document.getElementById("patient-table-body");
    tableBody.innerHTML = '';

    patients.forEach(patient => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${patient.name}</td>
            <td>${new Date(patient.dateOfBirth).toLocaleDateString()}</td>
            <td>${patient.address}</td>
            <td><button onclick="loadPatientAppointments(${patient.id})">View Appointments</button></td>
            <td><button onclick="confirmDeletePatient(${patient.id})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function populatePatientDropdown(patients) {
    const patientSelect = document.getElementById("patient-select");
    patientSelect.innerHTML = '';

    patients.forEach(patient => {
        const option = document.createElement("option");
        option.value = patient.id;
        option.textContent = patient.name;
        patientSelect.appendChild(option);
    });
}

function populateDoctorsDropdown(doctors) {
    const doctorSelect = document.getElementById("doctor-select");
    doctorSelect.innerHTML = '';

    doctors.forEach(doctor => {
        const option = document.createElement("option");
        option.value = doctor.id;
        option.textContent = doctor.name;
        doctorSelect.appendChild(option);
    });
}

async function loadPatientAppointments(patientId) {
    try {
        const appointments = await fetchPatientAppointments(patientId);
        populatePatientAppointments(appointments);
    } catch (error) {
        console.error(`Failed to load appointments for patient ${patientId}:`, error);
        showErrorMessage("An error occurred while loading appointments. Please try again.");
    }
}

document.addEventListener("DOMContentLoaded", loadInitialData);
