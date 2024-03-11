import { validateIp } from './helpers';
const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

ipInput.addEventListener('keypress', handleKey);
btn.addEventListener('click', getData);

function getData() {
	if (validateIp(ipInput.value)) {
		fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=72050c5b0fbd48bd82e0f7889d35579f&ip_address=${ipInput.value}`)
			.then((response) => response.json())
			.then(setInfo);
	}
}

function handleKey(e) {
	if (e.key === 'Enter') {
		getData();
	}
}

function setInfo({ ip_address: ip, country, city, timezone: { gmt_offset: timezone }, connection: { isp_name } }) {
	ipInfo.innerText = ip;
	locationInfo.innerText = country + ', ' + city;
	timezoneInfo.innerHTML = timezone;
	ispInfo.innerText = isp_name;
}
