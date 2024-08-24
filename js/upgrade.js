const urlParams = new URLSearchParams(window.location.search);
const licenseTier = urlParams.get('tier');
if(!licenseTier || licenseTier.length < 2)
{
	window.location.replace("/404");
}
else
{
	addEventListener("load", () => {
		document.querySelector("#license-tier").innerText = licenseTier.charAt(0).toUpperCase() + licenseTier.slice(1).toLowerCase();
	});
}