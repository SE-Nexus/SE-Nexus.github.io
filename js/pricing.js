let upgradeFinalize = null;
let upgradeSelect = null;
let upgradeForm = null;
const guidRegex = /^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/;
const domain = "https://api.se-nexus.net";

const countDownDate = new Date("2024-09-07T01:00Z").getTime();
var countdownInterval;

addEventListener("load", () => 
{
	countdownInterval = setInterval(onInterval, 1000);
	onInterval();

	upgradeFinalize = document.querySelector("#upgrade-final");
	upgradeSelect = document.querySelector("#upgrade-select");
	upgradeForm = document.querySelector("#upgrade-license");
	upgradeForm.addEventListener("submit", onUpgradeLicense);
	setCheckoutStage(false);

	document.querySelector("#upgrade-cancel").addEventListener("click", onUpgradeCancel);
	document.querySelector("#upgrade-checkout").addEventListener("click", onUpgradeCheckout);
});

function onInterval()
{
	var now = new Date().getTime();
	if(now > countDownDate)
	{
		var children = document.querySelector(".main-content").children;
		for (var i = 0; i < children.length; i++) {
			children[i].classList.remove("hidden");
		}
		clearInterval(countdownInterval);
	}
}

function onUpgradeLicense(event)
{
	event.preventDefault();

	setCheckoutStage(false);

	var data = new FormData(upgradeForm);
	var licenseId = data.get("licenseGUID");
	if(licenseId && guidRegex.test(licenseId))
	{
		console.log(data);
		setUpgradeOptions(null);
	
		fetch(domain + "/upgradeoptions", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				license: licenseId
			})
		})
			.then(res => res.json())
			.then(obj => setUpgradeOptions(obj.upgrades))
	}

}

function setUpgradeOptions(upgrades)
{
	console.log(upgrades);
	upgradeSelect.innerHTML = "";
	if(upgrades && upgrades.length > 0)
	{
		setCheckoutStage(true);
		for (let i = 0; i < upgrades.length; i++) {
			const element = upgrades[i].toString();
			var upgradeOption = document.createElement("option");
			upgradeOption.setAttribute("value", element);
			upgradeOption.innerText = element;
			upgradeSelect.appendChild(upgradeOption);
		}
	}
	else
	{
		setCheckoutStage(false);
	}
}

function setCheckoutStage(isCheckout)
{
	if(isCheckout)
	{
		upgradeForm.classList.add("hidden");
		upgradeFinalize.classList.remove("hidden");
	}
	else
	{
		upgradeForm.classList.remove("hidden");
		upgradeFinalize.classList.add("hidden");
	}
}

function onUpgradeCheckout()
{
	var data = new FormData(upgradeForm);
	var licenseId = data.get("licenseGUID");
	var licenseTier = upgradeSelect.value;
	if(licenseId && guidRegex.test(licenseId) && licenseTier)
	{
		window.location.href = domain + "/stripe/licenseupgrade?licenseId=" + licenseId + "&tier=" + licenseTier;
	}
}

function onUpgradeCancel()
{
	setCheckoutStage(false);
}

