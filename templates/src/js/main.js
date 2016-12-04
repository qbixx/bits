// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
// Place any jQuery/helper plugins in here.
$(document).ready(function () {
    // Accordion
  $('.c-accordion__toggle').on('click', function(event){
  	event.preventDefault();
  	// create accordion variables
  	var accordion = $(this);
  	var accordionContent = accordion.next('.c-accordion__content');
  	var accordionToggleIcon = $(this).children('.toggle-icon');

  	// toggle accordion link open class
  	accordion.toggleClass("is-active");
  	// toggle accordion content
  	accordionContent.slideToggle(150);
  });
});
