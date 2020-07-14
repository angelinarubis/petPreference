if ((math.sum(data.response)) > 5) {
    'You prefer dogs to cats';}
   else if ((math.sum(data.response)) < 5) {
     'You prefer cats to dogs';}
     else {'You love your pets equally!:3'}
   }, 

   var debrief_block = {
    type: "html-keyboard-response",
    stimulus: function() {
    
        var dogs = jsPsych.data.get().filter({test_part: 'dogs'});
        var correct_dogs = dogs.filter({correct: '1'});
        var accuracy_dogs = Math.round(correct_dogs.count() / dogs.count() * 100); //
        var rt_dogs = Math.round(correct_dogs.select('rt').mean());

        var cats = jsPsych.data.get().filter({test_part: 'cats'});
        var correct_cats = cats.filter({correct: '0'});
        var accuracy_cats = Math.round(correct_cats.count() / cats.count() * 100);
        var rt_cats = Math.round(correct_cats.select('rt').mean());
    
        return "<p>You liked "+accuracy_dogs+"% of the dogs.</p>"+ "<p>You liked "+accuracy_cats+"% of the cats.</p>"+
        "<p>Your average response time was "+rt_dogs+"ms for dogs and " +rt_cats+ "for cats.</p>"+
        "<p>Press any key to complete the experiment. Thank you!</p>";
    
    }
    };
    
    timeline.push(debrief_block);