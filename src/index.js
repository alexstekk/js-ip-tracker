const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

ipInput.addEventListener('keypress', handleKey);
btn.addEventListener('click', getData);

function getData() {
	//validate
	fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=72050c5b0fbd48bd82e0f7889d35579f&ip_address=${ipInput.value}`)
		.then((response) => response.json())
		.then(console.log);
}

function handleKey(e) {
	if (e.key === 'Enter') {
		getData();
	}
}
