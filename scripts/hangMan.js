
		var can_play = true;
		var words = new Array("SOURCECODE", "SNAP", "ARTICLE", "PRINCE", "UNDO", 
			"BLOG", "TUTORIALS", "PROGRAMMING", "CODES", "ACHIVE", "REFRESH", "PRETTY");
		
		var to_guess = "";
		var display_word = "";
		var used_letters = "";
		var wrong_guesses = 0;

		var soundEfx; // Sound Efx
        var soundLoad; //Game Over sound efx
		
		function selectLetter(l)
		{
			//check if the user can play or not;
		  if (can_play == false) {
		    return;
		   }
		
		   if (used_letters.indexOf(l) != -1) {
		    return;
		   }
		
		   //adding used letter to the related txtbox
		   used_letters += l;
		   document.game.usedLetters.value = used_letters;
		   document.game[l].value=" ";
		
		  if (to_guess.indexOf(l) != -1) {
		  	soundEfx.src = "sounds/hm_click.mp3";
             soundEfx.play();
		     // correct letter guess
		     var pos = 0;//check index of word from first letter
		     temp_mask = display_word;
		
		     while (to_guess.indexOf(l, pos) != -1) {
		         pos = to_guess.indexOf(l, pos);
		         end = pos + 1;
		
		         start_text = temp_mask.substring(0, pos);
		         end_text = temp_mask.substring(end, temp_mask.length);
		
		         temp_mask = start_text + l + end_text;
		         pos = end;
		     }//end while
		
		     display_word = temp_mask;
		     document.game.displayWord.value = display_word;
		
		     if (display_word.indexOf("-") == -1) {
		     // won
		     soundEfx.src = "sounds/hm_win.wav";
             soundEfx.play().then(function () {
             	alert("Well done, you have won! The word is: " + to_guess);		   
             });
             can_play = false;
		     }
		   }
		  else {
		     // incortect letter guess
		     wrong_guesses += 1;
		     soundEfx.src = "sounds/hm_wrongletter.wav";
		     soundEfx.play().then(function () {
		     	eval("document.hm.src=\"images/hangman" + wrong_guesses + ".gif\"");
		     });
		     
		     if (wrong_guesses == 7) {
		     // lost
		     soundEfx.src = "sounds/hm_over.wav";
		     soundEfx.play().then(function () {
		     	alert("Sorry, you have lost! Your word was: " + to_guess );
		     });		     
		     can_play = false;
		     }
		   }//end else
		   
		}//end function selectLetter()
		
		function reset() {
			soundEfx = document.getElementById("soundEfx");
			for(i=0; i<26; i++){
		  	document.game[i].value = document.game[i].name;
		  }
		  selectWord();
		  document.game.usedLetters.value = "";
		  used_letters = "";
		  wrong_guesses = 0;
		  document.hm.src="images/hangman0.gif";


		}//end function reset()
		
		function selectWord() {
		  can_play = true;
		  random_number = Math.round(Math.random() * (words.length - 1));
		  to_guess = words[random_number];
		  //document.game.theWord.value = to_guess;
		
		  // display masked word
		  //call function createMask and sending the length of the selected word to show the number of letters to user
		  masked_word = createMask(to_guess);
		  //put the character "-" for each letter of the words to show the number of the words charachter
		  document.game.displayWord.value = masked_word;
		  display_word = masked_word;
		}//end function selectWord()
		
		function createMask(m) {
		  var mask = "";
		  word_lenght = m.length;
		
		  for (i = 0; i < word_lenght; i ++) {
		    mask += "-";
		  }
		  return mask;
		}//end function createMask()
