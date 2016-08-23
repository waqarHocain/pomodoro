/**
 * ===================================
 * get dom elements
 * ===================================
 */
	var start_btn = document.getElementById("start"),
			reset_btn = document.getElementById("reset"),
			inc_work_btn = document.getElementById("inc_work"),
			dec_work_btn = document.getElementById("dec_work"),
			inc_brk_btn = document.getElementById("inc_brk"),
			dec_brk_btn = document.getElementById("dec_brk"),
			detail_work_container = document.getElementById("detail_work"),
			detail_brk_container = document.getElementById("detail_brk"),
			time_container = document.getElementById("time"),
			state_container	= document.getElementById("state");



/**
 * ===================================
 * attach event listeners
 * ===================================
 */
start_btn.addEventListener("click", function(event) { start_countdown(event); }, false);

reset_btn.addEventListener("click", reset, false);

inc_work_btn.addEventListener("click", inc_work, false);
dec_work_btn.addEventListener("click", dec_work, false);

inc_brk_btn.addEventListener("click", inc_brk, false);
dec_brk_btn.addEventListener("click", dec_brk, false);

/**
 * ===================================
 * main program execution
 * ===================================
 */

// used for setInterval()
var interval;

// used for keeping track of currently running timer
var clock = {
	state : "unset"
};


var work = {
	mins: 2,
	mins_def : 1,
	state: "work",
	running: false
};

var brk = {
	mins: 1,
	mins_def: 1,
	state: "break",
	running: false
};

init();


/**
 * ===================================
 * function definitions
 * ===================================
 */


function init() {
	work.mins = work.mins_def;
	brk.mins = brk.mins_def;

	start_btn.innerText = "Start";

	draw(time_container,two_padded(work.mins));

	draw(detail_work_container, two_padded(work.mins));
	draw(detail_brk_container, two_padded(brk.mins));

}


function inc_work() {
	inc(work);
	if (clock.state === "unset") {
		draw(time_container, two_padded(work.mins_def));
		draw(detail_work_container, two_padded(work.mins_def));
	}
}

function dec_work() {
	dec(work);
	if (clock.state === "unset") {
		draw(time_container, two_padded(work.mins_def));
		draw(detail_work_container, two_padded(work.mins_def));
	}
}

function inc_brk() {
	inc(brk);

	draw(detail_brk_container, two_padded(brk.mins_def));
}

function dec_brk() {
	dec(brk);

	draw(detail_brk_container, two_padded(brk.mins_def));
}

function reset() {
	clock.state = "unset";
	clearInterval(interval);
	init();

	// hide the reset button
	reset_btn.style.opacity = 0;
	reset_btn.style.visiblity = "hidden";
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

function inc(obj) {
	if (clock.state !== "unset") {
		return;
	}

	++obj.mins_def;
}

function dec(obj) {
	if (clock.state !== "unset") {
		return;
	}

	if (obj.mins_def <= 1) {
		return;
	}

	--obj.mins_def;
}

/**
 * Functions related to countdown
 */

// starts || pause countdown
function start_countdown(event) {
	// if the user wants to pause timer
	event = event || "";

	if (event.type === "click") {

		// disable button in break mode
		if (clock.state === brk.state) {
			start_btn.disable = true;
			return;
		}
		
		// if the timer is not already running
		if (start_btn.innerText.toLowerCase() === 'pause') {
			switch_btn_text();
			clearInterval(interval);
			return;
		}

		switch_btn_text();
	}

	if (clock.state === "unset") {
		switch_state();
	}

	// if the timer was not previously paused
	if (time_container.innerText.indexOf(":") === -1) {
		var mins = parseInt(time_container.innerText);
		draw(time_container, two_padded(--mins) + ":59");

		// show the reset button
		reset_btn.style.opacity = 1;
		reset_btn.style.visibility = "visible";
	}

	// run countdown() after every one second
	interval = setInterval(countdown, 1000);
}

function countdown() {
	var mins = parseInt(time_container.innerText.substr(0, time_container.innerText.indexOf(":"))),
			secs = parseInt(time_container.innerText.substr(time_container.innerText.indexOf(":") + 1));

	--secs;

	if (secs < 0 && mins > 0) {
		--mins;
		secs = 59;

		draw(time_container, two_padded(mins) + ":" + two_padded(secs));
		return;
	}

	// check if timer ended
	else if (secs < 0 && mins <= 0) {
		clearInterval(interval);

		switch_seg();
		return;
	}

	// only update seconds
	draw(time_container, two_padded(mins) + ":" + two_padded(secs));
}

function switch_seg() {
	if (clock.state === work.state) {
		clearInterval(interval);
		draw(time_container, two_padded(brk.mins_def));
		switch_state();
		setTimeout(start_countdown, 1000);
		return;
	}
	else {
		clearInterval(interval);
		draw(time_container, two_padded(work.mins_def));
		switch_state();
		setTimeout(start_countdown, 1000);
		return;
	}
}

function switch_btn_text() {
	if (start_btn.innerText.toLowerCase() === "start") {
		start_btn.innerText = "Pause";
	}
	else {
		start_btn.innerText = "Start";
	}
}

function switch_state() {
	if (clock.state === "unset") {
		clock.state = "work";
		state_container.innerText = work.state.toUpperCase();
	}
	else if (clock.state === work.state) {
		clock.state = brk.state;
		state_container.innerText = brk.state.toUpperCase();
	}
	else if (clock.state === brk.state) {
		clock.state = work.state;
		state_container.innerText = work.state.toUpperCase();
	}
}