/*
* On Document Ready
*/
(function($) { 
	var number = $("#cc-number"),
		expDate = $("#cc-expiration-date"),
		cvv = $("#cc-cvv"),
		paymentButton = $("#submit-payment"),
		ccInputs = $(".cc-input"),
		timerInterval = 1000,
		timer;

	//Set the masks
	//Visa - 13-16, Mastercard - 16-19, American Express - 15 So minimum 13 and maximum 19 with options
	number.inputmask("9999 9999 9999 9[999] [999]", { "placeholder": " " });
	expDate.inputmask("mm/yyyy");
	cvv.inputmask("999[9]",{"placeholder":" "});

	//Focus the first field
	number.focus();

	//On keyup we set a timer after which we trigger the finishTyping function
	ccInputs.keyup(function(e){
		if(e.keyCode != '9' && e.keyCode != '16' ){
			//Detect keyup only if it is not tab or shift key
			clearTimeout( timer );
			timer = setTimeout( finishTyping, timerInterval, $(this).attr('id'), $(this).val() );
		}
	});

	//On keydown we stop the current timer
	ccInputs.keydown(function(){
		clearTimeout(timer);
	});

	//On field focus, we add the active class on the corresponding span in the page subtitle
	ccInputs.focus(function(){
		$("#title-" + $(this).attr('id')).addClass('active');
	});

	//On field blur, we remove the active class from all items
	ccInputs.focus(function(){
		$("h2 span").removeClass('active');
	});

	//Maker sure the submit is not allowed to do anything if disabled
	paymentButton.click(function(event){
		event.preventDefault();

		if($(this).hasClass('disabled')){
			return false;
		}else{
			$("#card-form").submit();
		}
	});

	function finishTyping(id, value) {
		switch(id) {
			case "cc-number":
				console.log('number');
				break;
			case "cc-expiration-date":
				console.log('date');
				break;
			case "cc-cvv":
				break;		
		}
	}

})(jQuery);