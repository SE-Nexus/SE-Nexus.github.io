var mobileButton = document.querySelector("nav .menu-btn");
// Close the mobile menu when the content is clicked
document.querySelector("main").addEventListener("click", (e) => {
	mobileButton.checked = false;
});
