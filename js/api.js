// api.js
const apiUrl = "http://localhost:5190/api";

// Base fetch function to handle common API interactions
async function fetchData(endpoint, method = "GET", body = null) {
    const options = {
        method,
        headers: { "Content-Type": "application/json" },
        ...(body && { body: JSON.stringify(body) }) // Only include body if present
    };

    try {
        const response = await fetch(`${apiUrl}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
}

async function fetchPatients() {
    return fetchData("/patient");
}

async function fetchDoctors() {
    return fetchData("/doctor");
}

async function postAppointment(appointment) {
    return fetchData("/appointment", "POST", appointment);
}

async function postPrescription(prescription) {
    return fetchData("/prescriptions", "POST", prescription);
}

async function fetchPatientAppointments(patientId) {
    return fetchData(`/patient/${patientId}/appointments`);
}
