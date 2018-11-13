let quizContainer;
let quizzes = []; //array will store all questions 
let submitButton, resetButton; 

//Method called when page is fully loaded to initialize app
const initialize = () => {
    quizContainer = document.getElementById("quiz1Container");
    submitButton = document.getElementById("quizSubmitButton");
    resetButton = document.getElementById("quizResetButton");

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
        outputCode += "<h2>Quiz 1, HTML5</h2><form id='quiz'>";

        quizzes.forEach((quiz, index) => { 
            outputCode += `<div class="quizContainer" id="quizQuestion${index}"><h3>Question ${index + 1}</h3>` + 
            `<p class="quizQuestion">${quiz.quizQuestion}</p>` +
            `<div class="optionsContainer">`;
            quiz.options.forEach(option => outputCode += `<p><input type="radio" name="quizQuestion${index + 1}Answer" value="${option}">${option}</p>`);
            outputCode += "</div></div>";
        });

        outputCode += '<div class="buttonsContainer">' + 
        '<button id="quizSubmitButton" class="mainPageButton">Submit answers</button>' + 
        '<input type="reset" id="quizResetButton" class="mainPageButton" value="Reset quiz">' + 
        '</div></form>';
    }

    quizContainer.innerHTML = outputCode;

    //Add event listeners to buttons 
    submitButton = document.getElementById("quizSubmitButton");    
    submitButton.addEventListener('click', evaluateQuiz, false);

};

//Method used to reset quiz 
const evaluateQuiz = () => {

    if (window.confirm("Are sure to send your answers?")) {
        let questions = document.getElementsByClassName("optionsContainer");

        //Iterate throuhg all options to clear selection
        for(let i = 0; i < questions.length; i++) {
            console.log(i);
            for (let k = 0; k < questions[i].length; k++) {
                console.log(k);
                questions[i][k].checked = false;
            }
        }
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