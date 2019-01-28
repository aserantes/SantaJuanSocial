//bootstrap popover init
$(function() {
	$('[data-toggle="popover"]').popover()
})

// // dispose of popovers on clicking anything other than a popover
$('html').on('click', function(e) {
	if (typeof $(e.target).data('original-title') == 'undefined') { $('[data-original-title]').popover('dispose'); }
});




// on click event for all spans childs of class "circle-box" (the colored circles on map), a popover is dinamically created
$('.circle-box span').on('click', function() {
	var lote = $(this).data("lote");
	$(this).popover({
		title: "Lote " + lote,
		html: true,
		animation: true,
		trigger: "focus",
		content: $(".popoverTemplate").html(),
		placement: "auto",
	}).popover('show');
});




var activeLi //this is just a global variable to know the active Event at any moment

$(".left ul li").click(function() { //on click over any event...
	if (activeLi !== undefined) { activeLi.removeClass('active'); } //remove active class of previous event (if any)
	$(this).addClass('active'); //adds active class to clicked event
	activeLi = $(this); //sets the new activeLi in global variable activeLi
	$(".circle-box").removeClass("circle-grey circle-green circle-yellow circle-red"); //remove all circle color classes
	$(".circle-box").addClass("circle-grey"); //reset all circles to grey

	// aquire data from the active event li
	var eventname = $(this).data("name");
	var eventdate = $(this).data("date");
	var eventnotes = $(this).data("notes");

	//make arrays of rsvp
	var invited = $(this).data("invited"); // array of invited houses
	var confirmed = $(this).data("confirmed"); // array of confirmed houses
	var notgoing = $(this).data("notgoing"); // array of notgoing houses
	jQuery.each(invited, function() {
		/* iterate through array of invited*/
		$(".circle-l" + this).removeClass("circle-grey circle-green circle-yellow circle-red") //remove all circle color classes
			.addClass("circle-yellow"); // add yellow circle class 
	});
	jQuery.each(confirmed, function() {
		/* iterate through array of confirmed*/
		$(".circle-l" + this).removeClass("circle-grey circle-green circle-yellow circle-red") //remove all circle color classes
			.addClass("circle-green"); // add green circle class
	});
	jQuery.each(notgoing, function() {
		/* iterate through array of notgoing*/
		$(".circle-l" + this).removeClass("circle-grey circle-green circle-yellow circle-red") //remove all circle color classes
			.addClass("circle-red"); // add red circle class
	});

	//convert arrays to string
	var confirmedStringified = confirmed.join(', ');
	var notgoingStringified = notgoing.join(', ');

	//get quantity of elements in each array
	var confirmedCount = $(confirmed).length;
	var notgoingCount = $(notgoing).length;

	// generate html and insert into right information panel
	$("#infopanel").html(
		"<b>Name: </b>" + eventname + "<br>" +
		"<b>Date: </b>" + eventdate + "<br>" +
		"<b>Notes: </b>" + eventnotes + "<br>" +
		"<b>Attending: </b>" + confirmedCount + "<br>" +
		confirmedStringified + "<br>" +
		"<b>Not Attending: </b>" + notgoingCount + "<br>" +
		notgoingStringified
	);

	//show buttons to edit or delete active event.
	$("#buttonpad").css("visibility", "visible");

	//show information div border.
	$("#infopanel").css("visibility", "visible");
});




//tempus dominus init with options

$(function() {
	$('#datetimepicker').datetimepicker({
		format: "DD/MM/YYYY",
		dayViewHeaderFormat: "DD/MM/YYYY",
		viewMode: "months",
		minDate: "now",
		useCurrent: false
	});
});