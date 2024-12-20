const urlParams = new URLSearchParams(window.location.search);
const licenseKey = urlParams.get('key');
const licenseTier = urlParams.get('tier');
const guidRegex = /^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/;
const domain = "https://api.se-nexus.net";

if(!licenseKey)
{
	window.location.replace("/404");
}
else if(licenseKey !== "00000000-0000-0000-0000-000000000000" && guidRegex.test(licenseKey))
{
	addEventListener("load", () => {
		var key = licenseKey.toUpperCase();
		document.querySelector("#license-key").innerText = key;
		if(licenseTier && licenseTier.length > 1)
			document.querySelector("#license-tier").innerText = licenseTier.charAt(0).toUpperCase() + licenseTier.slice(1).toLowerCase();
		document.querySelector("#controller-download").setAttribute("href", domain + "/download?license=" + key)
	});
}
else
{
	window.location.replace("/checkout/error");
}
