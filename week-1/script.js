const themeCheckBox = document.getElementById("themecheckbox");

themeCheckBox.addEventListener("change", (e) => {
	document.documentElement.classList.toggle("dark", e.target.checked);
});

window.addEventListener("load", (e) => {
	const darkModActive = window.matchMedia(
		"(prefers-color-scheme:dark)"
	).matches;
	themeCheckBox.checked = darkModActive;
	document.documentElement.classList.toggle("dark", darkModActive);
});
