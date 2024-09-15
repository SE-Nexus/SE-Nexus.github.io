let upgradeFinalize = null;
let upgradeSelect = null;
let upgradeForm = null;
let upgradeInput = null;
let upgradeSubmit = null;
const guidRegex = /^[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/;
const domain = "https://api.se-nexus.net";
let upgradeErrorTimeout = null;

const countDownDate = new Date("2024-09-07T01:00Z").getTime();
var countdownInterval;

addEventListener("load", () => 
{
	upgradeFinalize = document.querySelector("#upgrade-final");
	upgradeSelect = document.querySelector("#upgrade-select");
	upgradeForm = document.querySelector("#upgrade-license");
	upgradeInput = document.querySelector("#upgrade-license-input");
	upgradeSubmit = document.querySelector("#upgrade-license-submit");
	upgradeForm.addEventListener("submit", onUpgradeLicense);
	setCheckoutStage(false);

	document.querySelector("#upgrade-cancel").addEventListener("click", onUpgradeCancel);
	document.querySelector("#upgrade-checkout").addEventListener("click", onUpgradeCheckout);
});

function onUpgradeLicense(event)
{
	event.preventDefault();

	setCheckoutStage(false);

	var data = new FormData(upgradeForm);
	var licenseId = data.get("licenseGUID");
	if(licenseId)
	{
		if (guidRegex.test(licenseId))
		{
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
				.catch(err => {
					console.error("Error while trying to get upgrades:", err);
					showError("Unknown error!")
					upgradeInput.value = "";
				});
		}
		else
		{
			showError("Invalid license!");
			upgradeInput.value = "";
		}
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


function showError(msg)
{
	if(upgradeErrorTimeout !== null)
		clearTimeout(upgradeErrorTimeout);
	upgradeSubmit.value = msg;
	upgradeSubmit.classList.add("error");
	upgradeErrorTimeout = setTimeout(() =>
	{
		upgradeSubmit.classList.remove("error");
		upgradeSubmit.value = "Upgrade";
		upgradeErrorTimeout = null;
	}, 3000);
}
