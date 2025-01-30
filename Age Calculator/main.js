document.addEventListener("DOMContentLoaded", function () {
    // Populate Days
    let daySelect = document.getElementById("day");
    for (let i = 1; i <= 31; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    // Populate Months
    let monthSelect = document.getElementById("month");
    let months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    for (let i = 0; i < months.length; i++) {
        let option = document.createElement("option");
        option.value = i + 1;
        option.textContent = months[i];
        monthSelect.appendChild(option);
    }

    // Populate Years
    let yearSelect = document.getElementById("year");
    let currentYear = new Date().getFullYear();
    for (let i = currentYear - 100; i <= currentYear; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    // Select default values
    daySelect.value = 1;
    monthSelect.value = 1;
    yearSelect.value = currentYear - 20;  // Default to 20 years ago

    // Add Event Listener for Age Calculation
    document.getElementById("calculateAge").addEventListener("click", function () {
        let day = parseInt(daySelect.value);
        let month = parseInt(monthSelect.value);
        let year = parseInt(yearSelect.value);

        if (!day || !month || !year) {
            alert("Please select a valid date, month, and year!");
            return;
        }

        let birthDate = new Date(year, month - 1, day);
        let currentDate = new Date();

        if (birthDate > currentDate) {
            alert("Invalid Date! Birthdate cannot be in the future.");
            return;
        }

        let ageInMilliseconds = currentDate - birthDate;
        let ageInSeconds = Math.floor(ageInMilliseconds / 1000);
        let ageInMinutes = Math.floor(ageInSeconds / 60);
        let ageInHours = Math.floor(ageInMinutes / 60);
        let ageInDays = Math.floor(ageInHours / 24);
        let ageInMonths = Math.floor(ageInDays / 30.44);
        let ageInYears = Math.floor(ageInDays / 365.25);

        document.getElementById("age").value = ageInYears + " years";
        document.getElementById("months").value = ageInMonths;
        document.getElementById("days").value = ageInDays;
        document.getElementById("hours").value = ageInHours;
        document.getElementById("minutes").value = ageInMinutes;
        document.getElementById("seconds").value = ageInSeconds;

        // Next Birthday Calculation
        let nextBirthday = new Date(currentDate.getFullYear(), month - 1, day);
        if (nextBirthday < currentDate) {
            nextBirthday.setFullYear(currentDate.getFullYear() + 1);
        }
        let daysUntilNextBirthday = Math.ceil((nextBirthday - currentDate) / (1000 * 60 * 60 * 24));
        document.getElementById("nextBirthday").value = daysUntilNextBirthday + " days";
    });
});
