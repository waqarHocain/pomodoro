/**
 * ===================================
 * get dom elements
 * ===================================
 */
var colon_container = document.getElementById("colon"),
	mins_container = document.getElementById("mins"),
	secs_container = document.getElementById("secs"),
	start_btn = document.getElementById("start"),
	state_container	= document.getElementById("state");



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

// used for setInterval()
var interval;

// used for keeping track of currently running timer
var clock = {};


var work = {
	mins: 2,
	mins_def : 1,
	state: "work"
};

var brk = {
	mins: 1,
	mins_def: 1,
	state: "break"
};

init();


/**
 * ===================================
 * function definitions
 * ===================================
 */


function init() {
	work.mins = work.mins_def;

	// only display mins
	draw(mins_container,two_padded(work.mins));

	draw(secs_container, "");
	draw(colon_container, "");
}

/**
 * Helper functions
 */

function draw(container, value) {
	container.innerText = value;
}

function two_padded(num) {
	return num > 9 ? num : "0" + num;
}


/**
 * Functions related to countdown
 */

// display seconds && start countdown
function start_countdown(obj) {
	clock = obj;
	clock.mins = clock.mins_def;
	--clock.mins;

	draw(mins_container, two_padded(clock.mins));
	draw(secs_container, 59);

	draw(colon_container, ":");
	draw(state_container, clock.state);

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

		draw(mins_container, two_padded(mins));
		draw(secs_container, two_padded(secs));
		return;
	}

	// check if timer ended
	else if (secs < 0 && mins <= 0) {
		clearInterval(interval);

		switch_seg();
		return;
	}

	// only update seconds
	draw(secs_container, two_padded(secs));
}

function switch_seg() {
	if (clock.state === work.state) {
		start_countdown(brk);
		return;
	}
	else {
		start_countdown(work);
	}
}