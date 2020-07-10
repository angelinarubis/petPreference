
    /* create timeline */
    let timeline = []; 

    /* define welcome message trial */
    let welcome = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">Welcome to the experiment! Press any key to begin.</p>'
    };
    timeline.push(welcome);

    /* define instructions trial */
    let instructions_1 = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">At the begning of each trial, you will see an image of a pet.</p>' +
        '<p style="color:white;">If you believe the pet is <strong>very cute</strong>, please press the <strong>1</strong> key on your keyboard.</p>' +
        '<p style="color:white;">If you believe the pet is <strong>ok/not as cute</strong>, please press the <strong>0</strong> key on your keyboard.</p>' +
        '<p style="color:white;">Press either response keys to continue.</p>',
      choices: ['1', '0'],
    };
    timeline.push(instructions_1);

    let instructions_2 = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">This experiment will take approximately 8 minutes with a break in between.</p>' +
          '<p style="color:white;">Press the space bar when you are ready to begin the experiment.</p>',
      choices: [32],
    };
    timeline.push(instructions_2);

    /* START TRAINING TRIAL FOR PARTICIPANTS */

    const cats = ['26.3', '24.3', '21.3', '22.3', '23.3', '25.3', '27.3', '28.3', '29.3', '30.3']
    const dogs = ['1', '2', '3','4','5','6','7','8','9','10']

    //the for loop must iterate over the constant original and append to a string
    //which is pushed to original_stimuli array

    let cats_stimuli = [];
    //for loop
    for (let i=0; i<cats.length; i++) {
      cats_stimuli.push('stimuli/cats/my_bitmap'+ cats[i] + '.jpg');

    }
    
    let dogs_stimuli = []; 
    for (let i=0; i<dogs.length; i++) {
    dogs_stimuli.push('stimuli/dogs/dog_'+ dogs[i] + '.jpg');
    }
    //let full_stim = cats_stimuli.concat(dogs_stimuli);

    let animal_stim = [
      {stimulus: cats_stimuli[0], data: {test_part: 'cats', correct_response: '1'}},
      {stimulus: cats_stimuli[1], data: {test_part: 'cats', correct_response: '1'}},
      {stimulus: cats_stimuli[2], data: {test_part: 'cats', correct_response: '1'}},
      {stimulus: cats_stimuli[3], data: {test_part: 'cats', correct_response: '1'}},
      {stimulus: cats_stimuli[4], data: {test_part: 'cats', correct_response: '1'}},
      {stimulus: cats_stimuli[5], data: {test_part: 'cats', correct_response: '1'}},
      {stimulus: cats_stimuli[6], data: {test_part: 'cats', correct_response: '1'}},
      {stimulus: cats_stimuli[7], data: {test_part: 'cats', correct_response: '1'}},
      {stimulus: cats_stimuli[8], data: {test_part: 'cats', correct_response: '1'}},
      {stimulus: cats_stimuli[9], data: {test_part: 'cats', correct_response: '1'}},
      {stimulus: dogs_stimuli[0], data: {test_part: 'dogs', correct_response: '1'}},
      {stimulus: dogs_stimuli[1], data: {test_part: 'dogs', correct_response: '1'}},
      {stimulus: dogs_stimuli[2], data: {test_part: 'dogs', correct_response: '1'}},
      {stimulus: dogs_stimuli[3], data: {test_part: 'dogs', correct_response: '1'}},
      {stimulus: dogs_stimuli[4], data: {test_part: 'dogs', correct_response: '1'}},
      {stimulus: dogs_stimuli[5], data: {test_part: 'dogs', correct_response: '1'}},
      {stimulus: dogs_stimuli[6], data: {test_part: 'dogs', correct_response: '1'}},
      {stimulus: dogs_stimuli[7], data: {test_part: 'dogs', correct_response: '1'}},
      {stimulus: dogs_stimuli[8], data: {test_part: 'dogs', correct_response: '1'}},
      {stimulus: dogs_stimuli[9], data: {test_part: 'dogs', correct_response: '1'}},
    ]
    animal_stim_shuffle = jsPsych.randomization.repeat(animal_stim, 1);
    //let full_stim_shuffle = jsPsych.randomization.repeat(full_stim, 1); //shuffled array no repeats

    let fixation = {
      type: 'html-keyboard-response',
      stimulus: '<div style="color:white; font-size:60px;">+</div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: 1000,
      data: {test_part: 'fixation'}
    }

   

    let animals = {
      type: "image-keyboard-response",
      stimulus: jsPsych.timelineVariable('stimulus'), //train_stimuli_array, //jsPsych.timelineVariable('stimulus'),
      choices: ['1', '0'],
      trial_duration: 5000,
      stimulus_height: 225,
      stimulus_width: 225,
      data: jsPsych.timelineVariable('data'),
      on_finish: function(data){
        data.response = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
        data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
        
      }
    }

      

    let procedure = {
      timeline: [fixation, animals],
      timeline_variables: animal_stim_shuffle, //THIS IS THE STIMULI ANGELINA
      // randomize_order: true
    }

    
    timeline.push(procedure);
    

    /* END EXPERIMENT FOR PARTICIPANTS */

    

    // COMPLETION MESSAGE: Completed Classification Phase
    // let link = "https://survey.az1.qualtrics.com/SE/?SID=SV_9uARDX1aXEXq1pP&Q_JFE=0&workerId="
    var debrief_block = {
      type: "html-keyboard-response",
      stimulus: function() {
          var preference;
          var dogs = jsPsych.data.get().filter({test_part: 'dogs'});
          var correct_dogs = dogs.filter({correct: '1'});
          var accuracy_dogs = Math.round(correct_dogs.count() / dogs.count() * 100); //
          var rt_dogs = Math.round(dogs.select('rt').mean());

  
          var cats = jsPsych.data.get().filter({test_part: 'cats'});
          var correct_cats = cats.filter({correct: '1'});
          var accuracy_cats = Math.round(correct_cats.count() / cats.count() * 100);
          var rt_cats = Math.round(cats.select('rt').mean());

          if (accuracy_dogs > accuracy_cats) {
            preference = 'You like dogs more than cats.'
          } else if (accuracy_dogs < accuracy_cats) {
            preference = "You like cats more than dogs."
          } else {
            preference = 'You love your animals equally!:3 '
          }

          return "<p>" +preference + "</p>" + "<p> You liked "+accuracy_dogs+"% of the dogs.</p>"+ "<p>You liked "+accuracy_cats+"% of the cats.</p>"+
          "<p>Your average response time was "+rt_dogs+"ms for dogs and " +rt_cats+ "for cats.</p>"+
          "<p>Press any key to complete the experiment. Thank you!</p>";
      
      }
      };
      
      timeline.push(debrief_block);


    /* END PHASE II OF TASK: CLASSIFICATION and ANTICIPATION PHASE */

function saveData(name, data){
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'index.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filename: name, filedata: data}));
}

//let this_seed = new Date().getTime();
    //Math.seedrandom(this_seed);

    //let randNum = Math.random() * 1000
    //let randNumRounded = Math.floor(randNum+1)
    // function getParamFromURL(name)
    // {
    //   name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
    //   let regexS = "[\?&]"+name+"=([^&#]*)";
    //   let regex = new RegExp( regexS );
    //   let results = regex.exec( window.location.href );
    //   if( results == null )
    //     return "";
    //   else
    //     return results[1];
    // }
    let workerID = prompt( 'enter subID' );

    /* start the experiment */
    function startExperiment(){
      jsPsych.init({
        preload_images: [cats_stimuli, dogs_stimuli],
        timeline: timeline,
        show_progress_bar: true,
        on_finish: function(){ saveData("mooney-faces_" + workerID, jsPsych.data.get().csv()); }
        //on_finish: function(){
          //jsPsych.data.get().filter([{test_part: 'test'},{test_part: 'prediction'},{test_part: 'c2_test'}]).localSave("csv", `test-self-deception-data.csv`);
            //jsPsych.data.displayData(); 
        //}
        
      });
    }
 