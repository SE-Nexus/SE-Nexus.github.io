const urlParams = new URLSearchParams(window.location.search);
const licenseKey = urlParams.get('key');
const guidRegex = /^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/;
if(!licenseKey)
{
	window.location.replace("/404");
}
else if(licenseKey !== "00000000-0000-0000-0000-000000000000" && guidRegex.test(licenseKey))
{
	addEventListener("load", () => {
		document.querySelector("#license-key").innerHTML = licenseKey.toUpperCase();
	});
}
else
{
	window.location.replace("/checkout/error");
}
