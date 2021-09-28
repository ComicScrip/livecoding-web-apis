const statusElement = document.getElementById('geoloc-status');

function onGeolocSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  statusElement.innerHTML = `lat : ${lat}, lng : ${lng}`;
  // eslint-disable-next-line
  const map = L.map('mapid').setView([lat, lng], 13);
  // eslint-disable-next-line
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  // eslint-disable-next-line
  L.marker([lat, lng]).addTo(map).bindPopup('IM HERE :O').openPopup();
}

function onGeolocError(error) {
  console.error(error);
}

document.getElementById('geoloc-button').addEventListener('click', function () {
  if (!navigator.geolocation) {
    statusElement.textContent = 'Geolocation is not supported by your browser';
  } else {
    statusElement.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(onGeolocSuccess, onGeolocError, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  }
});
