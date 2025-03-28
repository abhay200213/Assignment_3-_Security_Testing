// Appscan
document.getElementById("donation-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page.

    console.log("Form submitted!"); // Debugging line to check if form is submitted

    // Collect form data
    const charityName = document.getElementById("charity-name").value.trim();
    const donationAmount = parseFloat(document.getElementById("donation-amount").value);
    const dateOfDonation = document.getElementById("donation-date").value;
    const donorComment = document.getElementById("donor-comment").value.trim();

    // Validate form inputs
    if (!charityName || isNaN(donationAmount) || donationAmount <= 0 || !dateOfDonation || !donorComment) {
        alert("Please fill out all required fields with valid information.");
        return;
    }

    // Temporary data object
    const donationData = {
        charityName,
        donationAmount,
        dateOfDonation,
        donorComment
    };

    console.log("Donation Recorded:", donationData);

    // Clear form
    event.target.reset();

    // Add donation to the table and localStorage
    addDonation(donationData);
});

// Get references to table and total donation elements
const donationTableBody = document.querySelector('#donationTable tbody');
const totalDonatedElement = document.getElementById('totalDonated');

// Save donations to localStorage
function saveDonationsToLocalStorage(donations) {
    console.log("Saving donations to localStorage:", donations); // Debugging line
    localStorage.setItem('donations', JSON.stringify(donations));
}

// Load donations from localStorage
function loadDonationsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('donations')) || [];
}

// Update the table and summary
function updateTableAndSummary() {
    const donations = loadDonationsFromLocalStorage();
    console.log("Loaded donations from localStorage:", donations); // Debugging line
    donationTableBody.innerHTML = ''; // Clear existing rows
    let totalAmount = 0;

    donations.forEach((donation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${donation.charityName}</td>
            <td>${donation.donationAmount}</td>
            <td>${donation.dateOfDonation}</td>
            <td>${donation.donorComment}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;
        donationTableBody.appendChild(row);
        totalAmount += parseFloat(donation.donationAmount);
    });

    totalDonatedElement.textContent = totalAmount.toFixed(2);
}

// Add donation to the table and localStorage
function addDonation(donation) {
    const donations = loadDonationsFromLocalStorage();
    donations.push(donation);
    saveDonationsToLocalStorage(donations);
    updateTableAndSummary();
}

// Handle deletion of a donation
function deleteDonation(index) {
    let donations = loadDonationsFromLocalStorage();
    donations.splice(index, 1);
    saveDonationsToLocalStorage(donations);
    updateTableAndSummary();
}

// Event listener for delete buttons
donationTableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.dataset.index;
        deleteDonation(index);
    }
});

// Initialize the table on page load
document.addEventListener('DOMContentLoaded', updateTableAndSummary);
