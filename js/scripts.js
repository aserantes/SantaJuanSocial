//required for bootstrap popover initialization
$(function() {
    $('[data-toggle="popover"]').popover()
})

// // dispose of popovers on clicking anything other than a popover
$('html').on('click', function(e) {
    if (typeof $(e.target).data('original-title') == 'undefined') {$('[data-original-title]').popover('dispose');}
});

// on click event for all spans childs of class "circle-box" (the colored circles on map), a popover is dinamically created
$('.circle-box span').on('click', function() {
    var lote = $(this).data("lote");
    $(this).popover({
        title: "Lote " + lote,
        animation: true,
        trigger: "focus",
        content: "placeholder, later I'll just populate this with database query of house number " + lote,
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

    // take name of event
    var evento = $(this).html();

    // populate information data
    $("#infopanel").html("Information placeholder related to the particular <b>Event</b> on mouse click. In this case, the event name is <b>" + evento + "</b>. This is now hardcoded, later when I learn database I will fill this by aquiring the data from a query");

    //make arrays of rsvp
    var invited = $(this).data("invited"); // array of invited houses
    var confirmed = $(this).data("confirmed"); // array of confirmed houses
    var notgoing = $(this).data("notgoing"); // array of notgoing houses
    jQuery.each(invited, function() {
        /* iterate through array */
        $(".circle-l" + this).removeClass("circle-grey circle-green circle-yellow circle-red") //remove all circle color classes
            .addClass("circle-yellow"); // add yellow circle class
    });
    jQuery.each(confirmed, function() {
        /* iterate through array*/
        $(".circle-l" + this).removeClass("circle-grey circle-green circle-yellow circle-red") //remove all circle color classes
            .addClass("circle-green"); // add green circle class
    });
    jQuery.each(notgoing, function() {
        /* iterate through array*/
        $(".circle-l" + this).removeClass("circle-grey circle-green circle-yellow circle-red") //remove all circle color classes
            .addClass("circle-red"); // add red circle class
    });
});