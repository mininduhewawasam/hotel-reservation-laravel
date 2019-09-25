/* Enhanced Navigation */

jQuery(document).ready(function($){
  // media query event handler
  if (matchMedia) {
    var mq = window.matchMedia("(max-width: 50em)");
    mq.addListener(WidthChange);
    WidthChange(mq);
  }

  // media query change
  function WidthChange(mq) {
    if (mq.matches) {
      $(".callus").before('<div class="jstoggle jstoggle--nav__list" data-toggle="nav__list">Menu</div>');
      $(".callus").before('<div id="call_button" class="jstoggle jstoggle--callus" data-toggle="callus">Call</div>');
      $(".callus").hide();
      $(".nav__list").hide();

      $(".jstoggle").on("click", function(){
        $(this).toggleClass("jstoggle-close");
        $('.'+$(this).data("toggle")).slideToggle("fast");
      });

      $(".dropdown__trigger").parents(".nav__item--dropdown").append('<span class="jstoggle-expand"></span>');
      $(".jstoggle-expand").on("click", function(){
        if ($(this).parents(".nav__item--dropdown").hasClass("dropdown--active")){
          $(this).siblings(".dropdown__trigger").siblings(".dropdown__menu").slideToggle("fast");
          $(".nav__item--dropdown").removeClass("dropdown--active");
        } else {
          $(".dropdown__menu").hide();
          $(".nav__item--dropdown").removeClass("dropdown--active");
          $(this).parents(".nav__item--dropdown").addClass("dropdown--active");
          $(this).siblings(".dropdown__menu").slideToggle("fast");
        }
      });

    } else {
      $(".jstoggle").remove();
      $(".jstoggle-expand").remove();
      //$(".callus").show();
      $(".callus").css('display', 'inline-block');
      $(".nav__list").show();
      $(".nav__item--dropdown").removeClass("dropdown--active");
      $(".dropdown__menu").removeAttr("style");
    }
  }

/* Responsive video iframes */
  $(".content").fitVids();

/* Control visual outline for keyboard navigation with regards to radio button containers */
	
	// Add class to container when radio input has focus
	$('input:radio').focus( function(){
		$(this).parents('.question__option').addClass('question__option--focus');
	});
	
	// remove class from container when radio input loses focus
	$('input:radio').focusout( function(){
		$(this).parents('.question__option').removeClass('question__option--focus');
	});


/* Highlight selected option */

	// Check to see if any radio inputs are checked by deafult
	$('input:radio').each(function() {
		// if radios is checked, add selected class to parent element
		if($(this).is(':checked')) { 
			$(this).parents('.question__option').addClass('question__option--selected');
			$(this).parents('.payment__option').addClass('payment__option--selected');
		}
	});
	
	// When the selected status of a radio input changes
	$('input:radio').change(function(){

		// Remove the 'selected' style from all containers of the radio input in the same group
		$('input:radio[name='+$(this).attr('name')+']').parents('.question__option').removeClass('question__option--selected');
		$('input:radio[name='+$(this).attr('name')+']').parents('.payment__option').removeClass('payment__option--selected');

		// Add the 'selected' style to the container of the selected radio input
		$(this).parents('.question__option').addClass('question__option--selected');
		$(this).parents('.payment__option').addClass('payment__option--selected');
	});


/* Highlight focussed custom select field */

	// Add class to container when select has focus
	$('select').focus( function(){
		$(this).parent('.customselect').addClass('customselect--focus');
	});

	// Remove class from container when select loses focus
	$('select').focusout( function(){
		$(this).parent('.customselect').removeClass('customselect--focus');
	});


/* Display dependant questions */

	$('input[name=fld_numberofclaims]').change(function(){

		var claims = $( 'input[name=fld_numberofclaims]:checked' ).val();

		if (claims > 0) {
			$('#numberofclaims_subset .subset__container').hide();
			$('#numberofclaims_subset .subset__container').slice(0,claims).show();
			$('#numberofclaims_subset').slideDown();
		} else {
			$('#numberofclaims_subset .subset__container').slideUp();
			$('#numberofclaims_subset').slideUp();
		}

	});


	$('input[name=fld_numberofconvictions]').change(function(){

		var convs = $( 'input[name=fld_numberofconvictions]:checked' ).val();

		if (convs > 0) {
			$('#numberofconvictions_subset .subset__container').hide();
			$('#numberofconvictions_subset .subset__container').slice(0,convs).show();
			$('#numberofconvictions_subset').slideDown();
		} else {
			$('#numberofconvictions_subset .subset__container').slideUp();
			$('#numberofconvictions_subset').slideUp();
		}

	});


/* Allow image inside a label to be clicked */

	$("label img").on("click", function() {
		$("#" + $(this).parents("label").attr("for")).click();
	});


/* Change cover icon color when selected */

	$(".question__option--cover input[type=radio]").on("change", function() {

		$.each( $(".icon__cover"), function() {
			if ($(this).attr("src").indexOf("_on") >= 0){
				$(this).attr("src", $(this).attr("src").split('_on').join('') );
			}
		});

		$(".icon__cover").attr("src").split('_on').join('');

		var coveroption = $(this).attr("id");
		var currenticon = $("#" + coveroption + " ~ .icon__cover").attr("src");

		var res = currenticon.split(".");
		var newimage = res[0].concat("_on.",res[1]);

		$("#" + coveroption + " ~ .icon__cover").attr("src",newimage);

    });


/* Occupation associated fields */

	$("#fld_jobstatus").on("change",function(){
		if ($(this).val() != "Employed" && $(this).val() != "Self Employed" && $(this).val() != "Voluntary Work"){
			$(".dependant-jobstatus").slideUp();
		} else {
			$(".dependant-jobstatus").slideDown();
		}
	});


/* Enhanced auto address completion */

	// Hide the optional fields for address input
	$(".findaddress .question--optional").hide();

	// Create the "Find address" button
	$(".question__postcode label").append('<button class="btn btn--findaddress" onclick="return false;">Find address</button>');

	// Function to enable "Find address" button if required fields have content
	function addressfinderinput() {
		var empty = false;
		$('.input--findaddress').each(function() {
			if ($(this).val() == '') {
				empty = true;
			}
		});

		if (empty) {
			$('.btn--findaddress').attr('disabled', 'disabled'); 
		} else {
			$('.btn--findaddress').removeAttr('disabled');
		}
	}

	$('.input--findaddress').keyup(function() {
		addressfinderinput();
	});

	addressfinderinput();


/* Validation for form inputs */

	//$.validate();


/* Forgiving date input and validation */

  function formatDate(e,d,s){
    function padDigits(d){
      if(d.length < 2){d = '0'+d;}
      return d;
    }  
    function buildYear(d){
      if(d.length < 3){
        if(d < 20){d = '20'+d;} else {d = '19'+d;}
      }
      return d;
    }
    function uncertainLogic(d,s){
      if(d.substr(1,2) > 12){
        //can't be a month
        return padDigits(d.substr(0,2))+s+padDigits(d.substr(2,1));
      } 
      else if(d.substr(0,2) > 31){
        //can't be a day
        return padDigits(d.substr(0,1))+s+padDigits(d.substr(1,2));
      } else {
        //can't be sure, request clarification
        return 0;
      }
    }
    function requestClarification(d){
      if(d.length > 5){yLen = 4;}else{yLen = 2;}
      var opt1 = padDigits(d.substr(0,2))+s+padDigits(d.substr(2,1))+s+buildYear(d.substr(3,yLen));
      var opt2 = padDigits(d.substr(0,1))+s+padDigits(d.substr(1,2))+s+buildYear(d.substr(3,yLen));
      $('#'+e).parent(".inputwrapper").append('<div class="date-feedback bubble bubble--info bubble--arrowleft"><p>I\'m not sure what this date is, did you mean <a href="#" class="clarifylink">'+opt1+'</a> or <a href="#" class="clarifylink">'+opt2+'</a>?</p></div>');
    }
    
    //remove all non-numerical characters from the input
    d = d.replace(/\D/g,'');
    
    // declare some vars for easy calulations
    var dLength = d.length,
        dOut = 'impossible',
        dUncertain;
    
    //check the length of the date and act accordingly
    switch(dLength){
      case 8:
        dOut = d.substr(0,2)+s+d.substr(2,2)+s+d.substr(4,4);
        break;
      case 7:
        //run first 3 digits through logic
        dUncertain = uncertainLogic(d.substr(0,3),s);
        if(dUncertain !== 0){
          dOut = dUncertain+s+buildYear(d.substr(3,4));
        } else {
          requestClarification(d);                           
        }
        break;
      case 6:      
        if(d.substr(2,4) > 1300){
          dOut = padDigits(d.substr(0,1))+s+padDigits(d.substr(1,1))+s+buildYear(d.substr(4,4));
        } else {
          dOut = padDigits(d.substr(0,2))+s+padDigits(d.substr(2,2))+s+buildYear(d.substr(4,2));
        }  
        break;
      case 5:
        //run first 3 digits through logic
        dUncertain = uncertainLogic(d.substr(0,3),s);
        if(dUncertain !== 0){
          dOut = dUncertain+s+buildYear(d.substr(3,4));
        } else {
          requestClarification(d);                           
        }
        break;
      case 4:
        dOut = padDigits(d.substr(0,1))+s+padDigits(d.substr(1,1))+s+buildYear(d.substr(2,2));  
        break;
    }
    if(dOut !== 'impossible'){
      $('#'+e).val(dOut);  
    }
  }


/* Occupation Auto-complete */

	$(".autocomplete").chosen({
		no_results_text: "No results found matching: ",
		width: "100%"
	});


/* Datepicker */

	var now = new Date();
	var future = new Date();
	future.setDate(now.getDate()+ 30);
	var pastfive = new Date();
	pastfive.setDate(now.getDate() - (365*5));

    var coverpicker = new Pikaday(
    {
        field: $('.datepicker'),
        minDate: now,
        maxDate: future,
        format: "DD/MM/YYYY",
        position: 'bottom right'
    });
/*
    var claimpicker = new Pikaday(
    {
        field: document.getElementById('fld_claim1_date'),
        minDate: now,
        maxDate: pastfive,
        format: "DD/MM/YYYY",
        position: 'bottom right'
    });

*/
});
