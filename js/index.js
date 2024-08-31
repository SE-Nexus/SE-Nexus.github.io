const countDownDate = new Date("2024-09-07T01:00Z").getTime();
var interval;
var countdownElement;
var focusElement;

addEventListener("load", () => 
{
	focusElement = document.getElementById("focus");
	focusElement.innerHTML = "<h1>Coming Soon</h1><h2 id=\"countdown\"></h2>";
	countdownElement = document.getElementById("countdown");
	interval = setInterval(onInterval, 1000);
	onInterval();
});

function onInterval()
{
	var now = new Date().getTime();
	var distance = countDownDate - now;


	if (distance <= 0) 
	{
		clearInterval(interval);
		focusElement.innerHTML = "<a class=\"button\" href=\"/pricing\">Buy Now</a>";
	}
	else 
	{
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		var timer = "";
		if (days > 0)
		{
			timer = "" + days;
			if(days > 1)
				timer += " days";
			else
				timer += " day";
		}
		else
		{
			timer = "";

			if(hours > 0)
			{
				timer += hours + ":";
				if(minutes < 10)
					timer += "0";
				timer += minutes + ":";
				if(seconds < 10)
					timer += "0";
			}
			else if (minutes > 0)
			{
				timer += minutes + ":"
				if(seconds < 10)
					timer += "0";
			}

			timer += seconds;
		}
		countdownElement.innerHTML = timer;
	}
}
