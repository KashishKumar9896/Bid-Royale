// Function to start the countdown
function startCountdown(id, endTime) {
    const timerElement = document.getElementById(id);
    let countdown = setInterval(function () {
        const now = new Date().getTime();
        const distance = endTime - now;

        // Calculate hours, minutes, seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        timerElement.innerHTML = hours + ":" + minutes + ":" + seconds;

        // If the countdown is over
        if (distance < 0) {
            clearInterval(countdown);
            timerElement.innerHTML = "EXPIRED";
        }
    }, 1000);
}

// Example for both items
const now = new Date().getTime();
const endTime1 = now + 3600000;  // 1 hour from now
const endTime2 = now + 7200000;  // 2 hours from now

startCountdown("countdown-timer-1", endTime1);
startCountdown("countdown-timer-2", endTime2);


// Get the username from the URL
const params = new URLSearchParams(window.location.search);
const user = params.get('user');

if (user) {
    // Display just the username in the span
    document.getElementById('username').textContent = user;
    // Hide the login link with class 'login'
    document.querySelector('.login').style.display = 'none';
} else {
    // Maybe clear the username section and show login if no user is present
    document.getElementById('username').textContent = '';
    document.querySelector('.login').style.display = 'inline'; // Show login link if no user is logged in
}



document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.querySelector(".dark");
    const body = document.body;

    // Check if dark mode was previously enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});
