/*
Name: 			Pages / Locked Screen - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version: 	1.3.0
*/

(function($) {

	'use strict';

	//alert('yo');
	var $document,
		idleTime;

	$document = $(document);

	$(function() {
		//$.idleTimer( 1200000 ); // ms
		$.idleTimer( 600000 ); // Where 1 minutes = 60000 ms and 1000ms = 1 sec

		$document.on( 'idle.idleTimer', function() {
			// if you don't want the modal
			// you can make a redirect here
			var base_url = $('#base_url').val();
			//alert(base_url);
			window.location.href = base_url + 'auth/index/lockscreen';
			//LockScreen.show();
		});
	});

}).apply( this, [ jQuery ]);