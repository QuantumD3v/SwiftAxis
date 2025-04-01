function updateClock() {
    const now = new Date();
    
    // Convert time to Bangkok timezone (UTC+7)
    const bangkokTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Bangkok"}));

    const hours = bangkokTime.getHours().toString().padStart(2, '0');
    const minutes = bangkokTime.getMinutes().toString().padStart(2, '0');
    const seconds = bangkokTime.getSeconds().toString().padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Update the clock on the webpage
    document.getElementById('clock').textContent = timeString;

    // Print real-time clock to the console
    console.log(timeString);

    // Update date
    const dateString = bangkokTime.toLocaleDateString("en-GB", { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('date').textContent = dateString;
}

// Update clock every 10 milliseconds
setInterval(updateClock, 10);
updateClock();
