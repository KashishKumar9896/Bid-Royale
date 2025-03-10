// Function to start the countdown
function startCountdown(id, endTime) {
    const timerElement = document.getElementById(id);
    let countdown = setInterval(function() {
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
