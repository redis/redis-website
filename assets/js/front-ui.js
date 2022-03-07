(function($) {

	'use strict';

	function commandReference() {
		var $groups = $( "#commands nav a" )
		$groups.click( function () {
			window.location.hash = this.getAttribute( "href" ).substring( 1 )
			filterCommandReference()
			return false
		} )
		var filter = document.querySelector( '.command-reference-filter' );
		filter.addEventListener( 'change', function ( e ) {
			window.location.hash = e.target.value;
		} );
		window.onhashchange = function () {
			filterCommandReference();
		}
	}

	function filterCommandReference() {
		var $commands = $('div.command-card');
		var group = window.location.hash.substring( 1 )
		if ( group.length == 0 ) {
			$commands.css('display', 'flex');
		} else {
			$commands.find( "div.card[data-group='" + group + "']" ).closest('.command-card').css('display', 'flex');
			$commands.find( "div.card[data-group!='" + group + "']" ).closest('.command-card').hide()
		}
		var $groups = $( "#commands nav a" )
		$groups.removeClass( "current" )
		$groups.filter( "[href='#" + group + "']" ).addClass( "current" )
		document.querySelector( '.command-reference-filter' ).value = group;
	}

	function searchCommandReference() {
		var $commands = $('div.command-card');
		$('.js-command-reference-search').bind('input', function(ev) {
			window.location.hash = '';
			if (ev.keyCode === 13) {
				var name = $commands.filter(':visible')[0].getAttribute('data-name');
				window.location = '/commands/' + name.replace(/ /g, '-');
				return;
			}
			var val = $(this).val().toLowerCase().replace(/[^a-z0-9 ]/g, '');
			if (val === '') {
				$commands.css('display', 'flex');
			} else {
				$commands.hide()
				$('div.card[data-name*="' + val + '"]').closest('.command-card').css('display', 'flex');
			}
		})
	}

	$(document).ready(function() {
		searchCommandReference();
		commandReference();
	} );
}(jQuery));