$(document).ready(function(){

	$("#Causes").on('click', function(event){
		event.preventDefault();
		$('.causes').slideToggle();
	});


	$("#Locations").on('click', function(event){
		event.preventDefault();
		$('.locations').slideToggle();
	});


	$('h3').on('mouseenter', showCauses);

	$('.causes > li').on('click', function(event){
		event.preventDefault();

		$('.causes >li').css({'color':'black'});
		$(this).css({'color':'red'});


		$(this).addClass('highlighted');
	});

	$('.locations > li').on('click', function(event){
		event.preventDefault();

		$('.locations >li').css({'color':'black'});
		$(this).css({'color':'red'});


		$(this).addClass('highlighted');
	});


function showCauses(){
			$('body').find('.causes').slideToggle();

}

});