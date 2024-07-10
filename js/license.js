const urlParams = new URLSearchParams(window.location.search);
const licenseKey = urlParams.get('key');

addEventListener("load", init)

function init(event)
{
	const guidRegex = /^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/;
	if(licenseKey && licenseKey !== "00000000-0000-0000-0000-000000000000" && guidRegex.test(licenseKey))
	{
		document.querySelector("#license-title").innerHTML = "Thank you for your purchase!";
		document.querySelector("#license-key").innerHTML = licenseKey.toUpperCase();
	}
	else
	{
		document.querySelector("#license-title").innerHTML = "An error occurred, please contact support";
	}
}
