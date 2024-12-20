// Initialize the map and set view to a default location (centered on the world)
const map = L.map('map').setView([20, 0], 2);

// Add satellite map layer from Mapbox
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGV2ZHV0dDAzIiwiYSI6ImNtM3k0YmUxdDFmb3cybHNjMGh5dGFoMXIifQ.ilgwEjlw8e8FhQMWgD9ndw', {
    attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

let userMarker, driverMarker;

// Custom car icon
const carIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/481/481200.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Function to find and display user's location
function findUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            if (userMarker) map.removeLayer(userMarker);

            userMarker = L.marker([userLat, userLng]).addTo(map)
                .bindPopup("You are here").openPopup();

            map.setView([userLat, userLng], 14);
        }, error => {
            alert(`Geolocation error: ${error.message}`);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to simulate driver location near the user
function simulateDriverLocation() {
    if (!userMarker) {
        alert("Find your location first!");
        return;
    }

    const userLocation = userMarker.getLatLng();
    const driverLat = userLocation.lat + (Math.random() * 0.02 - 0.01);
    const driverLng = userLocation.lng + (Math.random() * 0.02 - 0.01);

    if (driverMarker) map.removeLayer(driverMarker);

    driverMarker = L.marker([driverLat, driverLng], { icon: carIcon }).addTo(map)
        .bindPopup("Driver is nearby").openPopup();
}

// Simulated alcohol test result
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const alcoholLevel = Math.floor(Math.random() * 300);
        const alcoholMessage = document.getElementById('alcohol-message');

        if (alcoholLevel > 150) {
            alcoholMessage.innerText = "Warning: High Alcohol Level!";
            alcoholMessage.style.color = "red";
        } else {
            alcoholMessage.innerText = "Alcohol Level Normal. Ride can proceed.";
            alcoholMessage.style.color = "green";
        }
    }, 2000); // Simulate delay for test result
});
