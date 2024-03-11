import { validateIp, addTileLayer, getAdresses, addOffset } from './helpers';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from './images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');
const mapContainer = document.querySelector('.map');
const map = L.map(mapContainer);

const markerIcon = L.icon({
	iconUrl: icon,
	iconAnchor: [23, 56],
});
const mapMarker = L.marker([0, 0], { icon: markerIcon }).addTo(map);

ipInput.addEventListener('keypress', handleKey);
btn.addEventListener('click', getData);

function getData() {
	if (validateIp(ipInput.value)) {
		getAdresses(ipInput.value).then(setInfo);
	}
}

function handleKey(e) {
	if (e.key === 'Enter') {
		getData();
	}
}

function setInfo(mapData) {
	const {
		longitude: lng,
		latitude: lat,
		ip_address: ip,
		country,
		city,
		timezone: { gmt_offset: timezone },
		connection: { isp_name },
	} = mapData;
	ipInfo.innerText = ip;
	locationInfo.innerText = country + ', ' + city;
	timezoneInfo.innerHTML = `${timezone > 0 ? '+' : ''}${timezone}`;
	ispInfo.innerText = isp_name;
	map.setView([lat, lng], 13);
	addTileLayer(map);
	mapMarker.setLatLng([lat, lng]);
	if (matchMedia('(max-width: 1024px)').matches) {
		addOffset(map);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	fetch('https://api.ipify.org?format=json')
		.then((response) => response.json())
		.then((data) => {
			getAdresses(data.ip).then(setInfo);
		})
		.catch((error) => {
			console.log('Error:', error);
		});
});
