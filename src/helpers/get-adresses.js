export async function getAdresses(ip = '8.8.8.8') {
	const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=72050c5b0fbd48bd82e0f7889d35579f&ip_address=${ip}`);
	return await response.json();
}
