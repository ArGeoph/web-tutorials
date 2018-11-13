let quizContainer;
let quizzes = []; //array will store all questions 
let submitButton, resetButton; 

//Method called when page is fully loaded to initialize app
const initialize = () => {
    quizContainer = document.getElementById("quiz1Container");

    //load all questions from .json file
    loadQuiz().then(() => renderQuiz());
};


//Asyncronous method to load all questions for the quiz
const loadQuiz = async () => {
    try {
        const response = await fetch("quizzes/quiz1.json");

        if (response.ok) {
            const responseJson = await response.json();
            quizzes = responseJson.quiz;
        }
    }
    catch(networkError) {
        console.log(networkError);
    }
};

//Asynchronous method to render quizzes content
const renderQuiz = async () => {
    let outputCode = "";
    console.log(quizzes);

    if (quizzes.length === 0) {
        outputCode = "<h2>Quizzes cannot be loaded at the moment. Please, check your Internet connection, or visit the page later";
    }

    else {
        outputCode += "<h2>Quiz 1, HTML5</h2><form action='#' id='quiz'>";

        quizzes.forEach((quiz, index) => { 
            outputCode += `<div class="quizContainer" id="quizQuestion${index}"><h3>Question ${index + 1}</h3>` + 
            `<p class="quizQuestion">${quiz.quizQuestion}</p>` +
            `<div class="optionsContainer">`;
            quiz.options.forEach(option => outputCode += `<p><input type="radio" name="quizQuestion${index + 1}Answer" value="${option}" />${option}</p>`);
            outputCode += "</div></div>";
        });

        outputCode += '<div class="buttonsContainer">' + 
        '<input type="button" id="quizSubmitButton" class="mainPageButton" value="Submit answers" />' + 
        '<input type="reset" id="quizResetButton" class="mainPageButton" value="Reset quiz" />' + 
        '</div></form>';
    }

    quizContainer.innerHTML = outputCode;

    //Add event listeners to buttons 
    submitButton = document.getElementById("quizSubmitButton");  
    submitButton.addEventListener('click', evaluateQuiz, false);

};

//Method used to check the answers quiz 
const evaluateQuiz = () => {
    let questions = document.getElementsByClassName("optionsContainer");
    let numberOfQuestions = questions.length;
    let wrongAnswerNumber = 0;
    let score = 0;
    let options;
    let formObject = document.createElement("form");

    formObject.setAttribute("id", "quiz");    

    if (window.confirm("Are your sure to complete the quiz and send the answers for the evaluation?")) { //Ask user if ther really want to complete the quiz
        
        //Iterate throuhg all options to clear selection
        for (let questionIndex = 0; questionIndex < questions.length; questionIndex++)  {//Iterate through all questions
            options = questions[questionIndex].children;

            for (let optionIndex = 0; optionIndex < options.length; optionIndex++) { //Iterate through all options of the given question

                if (options[optionIndex].firstChild.value === quizzes[questionIndex].correctAnswer) {//find correct answer                    

                    if(options[optionIndex].firstChild.checked) {//check if user selected the same answer
                        break; //we can go to the next question now
                    }
                    else { //if user selected different answer or didn't select answer at all
                        options[optionIndex].setAttribute("class", "correctAnswer"); //Mark correct answer it 
                        options[optionIndex].innerHTML += "<label><b>Correct answer</b></label>"

                        //Iterate through al options to find user answer 
                        for (let k = 0; k < options.length; k++) {
                            if(options[k].firstChild.checked) {
                                options[k].setAttribute("class", "wrongAnswer"); //if user selected answer mark it    
                                options[k].innerHTML += "<label><b>Your answer</b></label>"
                            }
                        }
                       
                        wrongAnswerNumber++; 
                        formObject.innerHTML += questions[questionIndex].parentElement.innerHTML; //Add wrong question to output
                    }
                }                 
            }
        }

        quizContainer.removeChild(document.getElementById("quiz"));
        score = Math.round(((numberOfQuestions - wrongAnswerNumber)/numberOfQuestions)*100); //Calculate score

        let headingH3 = document.createElement("h3");
        let headingH2 = document.createElement("h2")

        if (wrongAnswerNumber > 0) { //If there's any wrong answers 
            headingH2.appendChild(document.createTextNode(`The number of incorrect answers ${wrongAnswerNumber} out of ${numberOfQuestions}. Your score is ${score}%`));
            quizContainer.appendChild(headingH2);
            headingH3.appendChild(document.createTextNode("The list of incorrect answers"));
            quizContainer.appendChild(headingH3);

            quizContainer.appendChild(formObject);        }
        else {
            headingH2.appendChild(document.createTextNode(`Congratulations! You answered all ${numberOfQuestions} questions correctly! Your score is 100%`));
            quizContainer.appendChild(headingH2);
        }

        //Add pass quiz again button
        quizContainer.innerHTML += '<div class="buttonsContainer">' + 
        '<a href="quiz1.html"><button class="mainPageButton">Repeat quiz</button></a>' + 
        '</div>';
    }
    else {
        return;
    }

};



    //     <form id="quiz1">
//     <div class="quizContainer" id="quiz1Question1">
//         <h3>Question 1</h3>
//         <p class="quizQuestion"> Which HTML element is used to put image on a webpage?</p>
//         <div class="optionsContainer">
//             <p><input type="radio" name="quiz1Question1Answer" value="p">&lt;p&gt;</p>
//             <p><input type="radio" name="quiz1Question1Answer" value="a">&lt;a&gt;</p>
//             <p><input type="radio" name="quiz1Question1Answer" value="image">&lt;image&gt;</p>
//             <p><input type="radio" name="quiz1Question1Answer" value="img">&lt;img&gt;</p>
//             <p><input type="radio" name="quiz1Question1Answer" value="div">&lt;div&gt;</p>
//         </div>
//     </div>

//     <div class="quizContainer" id="quiz1Question2">
//             <h3>Question 1</h3>
//             <p class="quizQuestion"> Which HTML element is used to put image on a webpage?</p>
//             <div class="optionsContainer">
//                 <p><input type="radio" name="quiz1Question1Answer" value="p">&lt;p&gt;</p>
//                 <p><input type="radio" name="quiz1Question1Answer" value="a">&lt;a&gt;</p>
//                 <p><input type="radio" name="quiz1Question1Answer" value="image">&lt;image&gt;</p>
//                 <p><input type="radio" name="quiz1Question1Answer" value="img">&lt;img&gt;</p>
//                 <p><input type="radio" name="quiz1Question1Answer" value="div">&lt;div&gt;</p>
//             </div>
//     </div>                

// <div class="buttonsContainer">
//     <button id="quiz1SubmitButton" class="mainPageButton">Submit answers</button>
//     <button id="quiz1SubmitButton" class="mainPageButton">Reset quiz</button>
// </div>  
// </form>   



window.addEventListener("load", initialize, false); 