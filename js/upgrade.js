const urlParams = new URLSearchParams(window.location.search);
const licenseTier = urlParams.get('tier');
if(!licenseTier)
{
	window.location.replace("/404");
}
else
{
	addEventListener("load", () => {
		document.querySelector("#license-tier").innerHTML = licenseTier.toUpperCase();
	});
}