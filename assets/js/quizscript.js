/*jshint esversion: 6 */

/** Function to view quiz by subject 
 * This should initiate the subject view only
*/
function openQuiz(event, subject) {
    let i;
    let quizData = document.getElementsByClassName("quiz-data");
    for (i = 0; i < quizData.length; i++) {
        quizData[i].style.display = "none";
    }
    let quizLinks = document.getElementsByClassName("quiz-links");
    for (i = 0; i < quizLinks.length; i++) {
        quizLinks[i].className = quizLinks[i].className.replace(" active", "");
    }
    document.getElementById(subject).style.display = "block";
    event.currentTarget.className += " active";
}

/** Science quiz section */
/** Science section questions */
// creating an array and passing the number, questions, options, and answers

/* let scienceqts = {
    numb: 1,
    question: "Eating what is important for your health?",
    answer: "A Balanced Diet",
    options: [
        "Sugars",
        "Carbohydrates",
        "A Balanced Diet",
        "Junk Food"
        ]
    },
let geographyqts =
let mathsqts = */

//Declare variables for Science Quiz
let start_btn = document.querySelector(".start_btn button");
let info_box = document.querySelector(".info_box");
let exit_btn = info_box.querySelector(".buttons .quit");
let continue_btn = info_box.querySelector(".buttons .restart");
let quiz_box = document.querySelector(".quiz_box");
let result_box = document.querySelector(".result_box");
let option_list = document.querySelector(".option_list");
let time_line = document.querySelector("header .time_line");
let timeText = document.querySelector(".timer .time_left_txt");
let timeCount = document.querySelector(".timer .timer_sec");

// if startQuiz button is clicked
start_btn.onclick = ()=>{
    //show info box
    info_box.classList.add("activeInfo"); 
};

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    //hide info box
    info_box.classList.remove("activeInfo"); 
};

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    //calling showQuestions function
    showQuestions(0); 
    questionCounter(1); 
    startTimer(25); 
    startTimerLine(0); 
};

let timeValue =  25;
let question_count = 0;
let question_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

let restart_quiz = result_box.querySelector(".buttons .restart");
let quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    //show quiz box
    quiz_box.classList.add("activeQuiz"); 
    //hide result box
    result_box.classList.remove("activeResult"); 
    timeValue = 25; 
    question_count = 0;
    question_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(question_count); //calling showQuestions function
    questionCounter(question_numb); //passing question_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
};

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    //reload the current window
    window.location.reload(); 
};

let next_btn = document.querySelector(".footer .next_btn");
let bottom_ques_counter = document.querySelector(".footer .total_question");

// if Next Question button clicked
next_btn.onclick = ()=>{
    if (question_count < questions.length - 1){ 
        question_count++; //increment the question_count value
        question_numb++; //increment the question_numb value
        showQuestions(question_count); //calling showQuestions function
        questionCounter(question_numb); //passing question_numb value to questionCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
};

// getting questions and options from array
function showQuestions(index) {
    let question_text = document.querySelector(".question_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let question_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = 
        '<div class="option"><span>'+ questions[index].options[0] +'</span></div>' + 
        '<div class="option"><span>'+ questions[index].options[1] +'</span></div>' + 
        '<div class="option"><span>'+ questions[index].options[2] +'</span></div>' + 
        '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    question_text.innerHTML = question_tag; //adding new span tag inside question_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    let option = option_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// creating the new div tags for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAnswer = answer.textContent; //getting user selected option
    let correcAnswer = questions[question_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAnswer == correcAnswer){ //if user selected option is equal to array's correct answer
        userScore += 1; //increment score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAnswer){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

// Show Result function
function showResult() {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    let scoreText = result_box.querySelector(".score_text");
    if (userScore > 5){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 3){ // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

// Function to start Quiz timer
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrease the time value
        if(time < 9){ //if timer is less than 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            let allOptions = option_list.children.length; //getting all option items
            let correcAnswer = questions[question_count].answer; //getting correct answer from array
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAnswer){ //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function questionCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

