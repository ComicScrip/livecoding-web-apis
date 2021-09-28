const status = document.getElementById('geoloc-status');
// eslint-disable-next-line
const L = L;

function onGeolocSuccess(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  status.innerHTML = `lat : ${lat}, lng : ${lng}`;
  const map = L.map('mapid').setView([lat, lng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.marker([lat, lng]).addTo(map).bindPopup('IM HERE :O').openPopup();
}

function onGeolocError(error) {
  console.error(error);
}

document.getElementById('geoloc-button').addEventListener('click', function () {
  if (!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(onGeolocSuccess, onGeolocError, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  }
});
