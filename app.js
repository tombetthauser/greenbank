var time = 50000;
var tempMinutes = 0;
var tempSeconds = 0;
var minutes = 0;
var seconds = 0;
var helpCounter = 0;
var helpTrigger = 3;
var soundPlaying = false;

var beep = new Audio('beep2.wav');

var input = "";

setInterval(function(){
	time += 1000;
	tempSeconds = Math.round(time/1000);
	tempMinutes = Math.floor(tempSeconds/60);
	minutes = ("0" + tempMinutes).slice(-2);
	seconds = ("0" + tempSeconds).slice(-2);
},1000);

var backgroundSound = new Audio('back.mp3'); 
backgroundSound.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
backgroundSound.play();

initCommand();

$("#commandInput").keypress(function(e) {
    if(e.which == 13) {
    	input = document.getElementById('commandInput').value;
    	if (input === "clear" || input === "c") { clearCommand(); } 
    	else if (input === "help" || input === "h") { helpCommand(); }
    	else if (input === "i" || input === "info") { infoCommand(); }
    	else if (input === "l" || input === "location") { locationCommand(); }
    	else if (input === "a" || input === "advanced") { advancedCommand(); }
    	else if (input === "f" || input === "files") { pictureInfoCommand(); }
    	else if (input === "fs" || input === "fullscreen") { fullScreenCommand(); }
    	else if (input === "p24" || input === "pic24" || input === "picture24") { pictureCommand(24); }
    	else if (input === "p13" || input === "pic13" || input === "picture13") { pictureCommand(13); }
    	// else if (input === "p43" || input === "pic43" || input === "picture43") { pictureCommand(43); }
    	else if (input === "p44" || input === "pic44" || input === "picture44") { pictureCommand(44); }
    	else if (input === "p34" || input === "pic34" || input === "picture34") { pictureCommand(34); }
    	else { elseCommand(); }
    	input = 0;
    	document.getElementById('commandInput').value = "";
    	if (soundPlaying === false) {
    		backgroundSound.play();
    		soundPlaying = true;
    	}
    };
});

function elseCommand(){
	input = input.replace(/ /g,"_");
	$("#addedContent").prepend(
		"@"
		+ minutes + "." + seconds
		+ ":" 
		+ "&lt;" + input + "&gt;"
		+ "entered:invalid<br>"
	);
	helpCounter += 1;
	if (helpCounter === helpTrigger) {
		$("#addedContent").prepend(
				"@"
			+ minutes + "." + seconds
			+ ":" 
			+ "&lt;alert&gt;"
			+ "console_alert:<br>"
			+ "<br>"
			+ "&emsp;&emsp;detected:&lt;unrecognized_commands:"
			+ helpTrigger
			+ "&gt;<br>"
			+ "&emsp;&emsp;user_alert:&lt;use:h/help_command_for_assistance&gt;<br>"
			+ "<br>"
		);
		helpCounter = 0;
	};
	beep.play();
}

function clearCommand(){
	document.getElementById("addedContent").innerHTML = "";
	$("#addedContent").prepend(
			"@"
		+ minutes + "." + seconds
		+ ":" 
		+ "command-record"
		+ "_cleared"
	);
	helpCounter = 0;
	beep.play();
}

function helpCommand(){
	$("#addedContent").prepend(
			"@"
		+ minutes + "." + seconds
		+ ":" 
		+ "&lt;" + input + "&gt;"
		+ "list:basic_commands:"
		+ "<br>"
		+ "<br>"
		+ "&emsp;&emsp;h/help:&lt;list:commands&gt;<br>"
		+ "&emsp;&emsp;c/clear:&lt;clear:command_record&gt;<br>"
		+ "&emsp;&emsp;i/info:&lt;list:user_information&gt;<br>"
		+ "&emsp;&emsp;l/location:&lt;list:user_location&gt;<br>"
		+ "&emsp;&emsp;f/files:&lt;list_files:current_folder&gt;<br>"
		+ "&emsp;&emsp;fs/fullscreen:&lt;enter_fullScreen&gt;<br>"
		+ "&emsp;&emsp;a/advanced:&lt;list:advancedCommands&gt;<br>"
		+ "<br>"
	);
	helpCounter = 0;
	beep.play();
}

function infoCommand(){
	$("#addedContent").prepend(
			"@"
		+ minutes + "." + seconds
		+ ":" 
		+ "&lt;" + input + "&gt;"
		+ "user_information:<br>"
		+ "<br>"
		+ "&emsp;&emsp;name:&lt;not_listed&gt;<br>"
		+ "&emsp;&emsp;age:&lt;not_listed&gt;<br>"
		+ "&emsp;&emsp;gender:&lt;not_listed&gt;<br>"
		+ "&emsp;&emsp;birth-date:&lt;01.31.3018&gt;<br>"
		+ "&emsp;&emsp;birth-territory:&lt;coastal_west:FUS&gt;<br>"
		+ "<br>"
	);
	helpCounter = 0;
	beep.play();
}

function locationCommand(){
	$("#addedContent").prepend(
			"@"
		+ minutes + "." + seconds
		+ ":" 
		+ "&lt;" + input + "&gt;"
		+ "location_information:<br>"
		+ "<br>"
		+ "&emsp;&emsp;terminal_route:&lt;61.176.8951&gt;<br>"
		+ "&emsp;&emsp;sub_region:&lt;new_cambria&gt;<br>"
		+ "&emsp;&emsp;dome_id:&lt;green_bank:3N&gt;<br>"
		+ "&emsp;&emsp;territory:&lt;northwest_territory&gt;<br>"
		+ "&emsp;&emsp;protective_district:&lt;former_US&gt;<br>"
		+ "<br>"
	);
	helpCounter = 0;
	beep.play();
}

function advancedCommand(){
	$("#addedContent").prepend(
			"@"
		+ minutes + "." + seconds
		+ ":" 
		+ "&lt;" + input + "&gt;"
		+ "list:advanced_commands:<br>"
		+ "<br>"
		+ "&emsp;&emsp;error:&lt;current_status:locked&gt;<br>"
		+ "<br>"
	);
	helpCounter = 0;
	beep.play();
}

function initCommand(){
	$("#addedContent").prepend(
		"@"
		+ minutes + "." + seconds
		+ ":" 
		+ "index/app:"
		+ "initiated"
	);
	helpCounter = 0;
}

function pictureCommand(n){
	newImageTab(n);
	$("#addedContent").prepend(
		"@" + minutes + "." + seconds 
		+ "&lt;" + input + "&gt;"
		+ ":image_opened:&lt;greenBank/newCambria/dome3N/01.30.3048/imageGroup03&gt;<br>"
	);
	helpCounter = 0;
}

function newImageTab(n) {
	var win = window.open('image' + n + '.jpg', '_blank');
	win.focus();
}

function pictureInfoCommand(){
	$("#addedContent").prepend(
			"@"
		+ minutes + "." + seconds
		+ ":" 
		+ "&lt;" + input + "&gt;"
		+ "list_files:currentFolder:"
		+ "<br>"
		+ "<br>"
		+ "&emsp;&emsp;file01:&lt;enter:pic24/picture24&gt;<br>"
		+ "&emsp;&emsp;file02:&lt;enter:pic44/picture44&gt;<br>"
		+ "&emsp;&emsp;file03:&lt;enter:pic13/picture13&gt;<br>"
		+ "&emsp;&emsp;file04:&lt;enter:pic34/picture34&gt;<br>"
		// + "&emsp;&emsp;file05:&lt;enter:pic43/picture43&gt;<br>"
		+ "<br>"
	);
	helpCounter = 0;
	beep.play();
}

function fullScreenCommand() {
	var elem = document.getElementById("body");
    req = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen;
    req.call(elem);	
	$("#addedContent").prepend(
		"@" + minutes + "." + seconds 
		+ "&lt;" + input + "&gt;"
		+ ":fullScreen_enter/exit:called<br>"
	);
	helpCounter = 0;
}

function focusInput() {
    document.getElementById("commandInput").focus();
}

// function nameChange (){
// 	document.getElementById("prompt").innerHTML = "/enter_new_username";
// 	$("#commandInput").keypress(function(e) {
// 		// input = document.getElementById('commandInput').value;
// 		if(e.which == 13) {
// 			document.getElementById("user").value = "";
// 			document.getElementById("prompt").innerHTML = "";
// 			$("#addedContent").prepend(
// 				"@" + minutes + "." + seconds + ":" 
// 				+ "username_reset<br>"
// 			);
// 		}
// 	}
// }