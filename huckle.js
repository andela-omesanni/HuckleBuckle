// JavaScript Document
$(document).ready(function() { 
	    //Actions button for start a new game					   
		$("#new").click(function(){
             window.location ="index.html";
        });				   
		
		var startCounter = 0,   computerGuess = Math.round(Math.random()*100), currGuess, prevDist,
			                    distance, guessedRight = false;
									 
	   	$("#main").on('submit', function(event){
			   event.preventDefault();
			   currGuess = $.trim($("input#guess").val()); //get current guess value
			   
								
			   //validate input
			   if (!$.isNumeric(currGuess) || currGuess < 0 || currGuess > 100) {
				   alert("Please enter a valid number from 0 to 100");
			   }
			   else {
				   //check if user guessed right the last time round. If that's the case computer picks a new number
				   if (guessedRight) {
					   computerGuess = Math.round(Math.random()*100);
					   guessedRight = false;
				   }
				   
				   compareGuess(computerGuess, currGuess);   //computer user & computer guesses
				   
			   }
			   
			   
			   function compareGuess(comptr, user) {
				   distance = Math.abs(comptr - user); //calculates absolute distance between user  & computer
				    
				   //check if user is starting game for the first time
			       if (startCounter === 0) {
					   startCounter = 1;   //will not be first time playing the game on next guess
					   if (user === comptr)
					     changeClasses("right");  //guessed right on first try
					   else
					      changeClasses("hot");
				   } 
				   else {
					    //current distance is greater than previous distance and both values don't match
				        if (distance >  prevDist && user != comptr) {
						      changeClasses("cold");
						}
						//current distance is lesser than previous distance and both values don't match
						else if (distance < prevDist && user != comptr) {
							changeClasses("hot");
						}
						//current distance is equal to previous distance and both values don't match
						else if (distance === prevDist && user!=comptr) {
							changeClasses("cold");
						}
						//computer and user values match
						else { 
							changeClasses("right");
							guessedRight = true; 
							startCounter = 0; //reset counter to automatically begin a new game
					    }
				   }
				   $("input#guess").val(''); //clear input field after user has guessed
				   prevDist = distance;  //current distance from computer's guess now becomes the previous one
				   
				   //toggles classes hot, cold and right
				   function changeClasses(classes) {
					  $("#response").css("width", 100).hide();
					  if (classes === "right")
						$("#response").removeClass().addClass("right").text("You guessed right").animate({opacity:'show', width: '70%'}, 'slow');
					  else 
					   $("#response").removeClass().addClass(classes).text("You are " +  classes).animate({opacity:'show', width: '70%'}, 'slow');
				   }
			   }
								  
		});

});