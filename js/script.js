/**
 * ===================================
 * get dom elements
 * ===================================
 */
var colon_container = document.getElementById("colon"),
	mins_container = document.getElementById("mins"),
	secs_container = document.getElementById("secs"),
	start_btn = document.getElementById("start");



/**
 * ===================================
 * attach event listeners
 * ===================================
 */
start_btn.addEventListener("click", function() { start_countdown(work); }, false);


/**
 * ===================================
 * main program execution
 * ===================================
 */

var interval;

var work = {
	mins: 1,
	mins_def : 1,
	state: "work"
};

init();


/**
 * ===================================
 * function definitions
 * ===================================
 */

/**
 * Functions related to updating screen
 */

function init() {
	work.mins = work.mins_def;

	// only display mins
	draw(mins_container, work.mins);

	draw(secs_container, "");
	draw(colon_container, "");
}

function draw(container, value) {
	container.innerText = value;
}


/**
 * Functions related to countdown
 */

// display seconds && start countdown
function start_countdown(obj) {
	--obj.mins;

	draw(mins_container, obj.mins);
	draw(colon_container, ":");
	draw(secs_container, 59);

	// run countdown() after every one second
	interval = setInterval(countdown, 1000);
}

function countdown() {
	var mins = parseInt(mins_container.innerText),
			secs = parseInt(secs_container.innerText);

	--secs;

	if (secs < 0 && mins > 0) {
		--mins;
		secs = 59;

		draw(mins_container, mins);
		draw(secs_container, secs);
		return;
	}

	// check if timer ended
	else if (secs < 0 && mins <= 0) {
		clearInterval(interval);
		init();
		return;
	}

	// only update seconds
	draw(secs_container, secs);
}
