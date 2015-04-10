	debounce_.debounce(function, wait, [immediate])

Creates and returns a new debounced version of the passed function which will postpone its execution 
until after wait milliseconds have elapsed since the last time it was invoked. Useful for implementing 
behavior that should only happen after the input has stopped arriving. For example: rendering a preview 
of a Markdown comment, recalculating a layout after the window has stopped being resized, and so on.

Pass true for the immediate argument to cause debounce to trigger the function on the leading instead of 
the trailing edge of the wait interval. Useful in circumstances like preventing accidental double-clicks 
on a "submit" button from firing a second time.

	var lazyLayout = _.debounce(calculateLayout, 300);
	$(window).resize(lazyLayout);


Returns a function, that, as long as it continues to be invoked, will not be triggered. 
The function will be called after it stops being called for N milliseconds. 
If immediate is passed, trigger the function on the leading edge, instead of the trailing.

	_.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
  };

Debounce: Think of it as "grouping multiple events in one". Imagine that you go home, enter in the elevator, doors are closing... and suddenly your neighbor appears in the hall and tries to jump on the elevator. Be polite! and open the doors for him: you are debouncing the elevator departure. Consider that the same situation can happen again with a third person, and so on... probably delaying the departure several minutes.


Use it to discard a number of fast-pace events until the flow slows down. Examples:

When typing fast in a textarea that will be processed: you don't want to start to process the text until user stops typing.
When saving data to the server via AJAX: You don't want to spam your server with dozens of calls per second.

##Avoiding Server Load

[Don't fire that event any more than you have to!](http://benalman.com/code/projects/jquery-throttle-debounce/examples/debounce/)
[Using Underscore.js's debounce() to filter double-clicks](http://eng.wealthfront.com/2012/12/using-underscorejss-debounce-to-filter.html)


##Debouncing != Throttling

Whenever I bring up the concept of debouncing, developers try to cast it as just a means of throttling. But that’s not true at all. Throttling is the reduction in rate of a repeating event. Throttling is good for reducing mousemove events to a lesser, manageable rate, for instance.

Debouncing is quite more precise. Debouncing ensures that exactly one signal is sent for an event that may be happening several times — or even several hundreds of times over an extended period. As long as the events are occurring fast enough to happen at least once in every detection period, the signal will not be sent!

Let’s relate this back to our keyboard-oriented user and our huge set of form fields. Throttling here would certainly help. We could reduce the number of XHR requests to a lower rate than the computer’s key repeat rate for sure! However, we’d still be fetching from the back-end more times than necessary, and the occasional re-rendering of the fetched data could temporarily freeze up the browser, deteriorating the user experience.

Debouncing on the other hand could better detect when the user stopped leaning on the keyboard and had arrived at their destination. It’s certainly not perfect. The user still may overshoot their destination, hesitate, and back-track, causing enough delay for the debounce detection period to expire. However, our tests showed that debouncing did a much better job of reducing XHR requests than throttling.

Source: http://unscriptable.com/2009/03/20/debouncing-javascript-methods/