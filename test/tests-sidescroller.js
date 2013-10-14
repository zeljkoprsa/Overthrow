/*
 Overthrow unit tests - using qUnit
 */

window.onload = function(){

	var scroller, testElem, overkill = 10000;

	module( "disabled nav", {
		setup: function(){
      testElem = document.querySelector( "#testelem" );
			scroller = testElem.querySelector( ".overthrow.sidescroll" );
			scroller.scrollLeft = 0;
			overthrow.sidescroller( [testElem], {fixedItemWidth: true} );
		}
	});

	function nextDisabled(){
		return testElem.querySelectorAll(".sidescroll-next.disabled");
	}

	function prevDisabled(){
		return testElem.querySelectorAll(".sidescroll-prev.disabled");
	}

	test( "only nav prev should be disabled initially", function() {
		var next, prev;

		prev = prevDisabled();
		equal( prev.length, 1 );

		next = nextDisabled();
		equal( next.length, 0 );
	});

	asyncTest( "nav next should be disabled after scroll", function() {
		var next;

		next = nextDisabled();
		equal( next.length, 0 );

		scroller.scrollLeft = overkill;

		setTimeout(function() {
			next = nextDisabled();

			equal( next.length, 1 );
			start();
		}, 500);
	});

	asyncTest( "both should be active in center", function() {
		var next, prev;

		next = nextDisabled();
		prev = prevDisabled();

		// check the default state
		equal( next.length, 0 );
		equal( prev.length, 1 );

		// move into the scrolling region
		scroller.scrollLeft = 10;

		setTimeout(function() {
			prev = prevDisabled();
			next = nextDisabled();

			// both buttons should be "clickable"
			equal( prev.length, 0 );
			equal( next.length, 0 );
			start();
		}, 500);
	});

  var newSlide, currentSlides;

	module( "append method", {
		setup: function(){
			testElem = document.querySelector( "#testelem" );
			scroller = testElem.querySelector( ".overthrow.sidescroll" );
			scroller.scrollLeft = 0;
			overthrow.sidescroller( [testElem], {fixedItemWidth: true} );

			var img = document.createElement( "img");

			newSlide = document.createElement( "li" );
			currentSlides = testElem.querySelectorAll( "li" );

			img.src = "../examples/sidescroller/img/monkey.jpg";
			newSlide.appendChild( img );
		}
	});

	test( "adds elements to the scrolling region", function(){
		overthrow.sidescroller( [testElem], "append", newSlide );

		equal( currentSlides.length + 1, testElem.querySelectorAll( "li" ).length );
	});

	// TODO these set timeouts are getting scarry now :(
	asyncTest( "disabled next nav is enabled when new element is appended", function() {
		next = nextDisabled();
		equal( next.length, 0 );

		scroller.scrollLeft = overkill;

		setTimeout(function() {
			next = nextDisabled();

			equal( next.length, 1 );

			overthrow.sidescroller( [testElem], "append", newSlide );

			setTimeout(function() {
				next = nextDisabled();
				equal( next.length, 0 );

				start();
			}, 500);
		}, 500);
	});
};
