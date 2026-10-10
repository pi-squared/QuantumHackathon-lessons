(function () {
  "use strict";
  var quizzes = document.querySelectorAll("form[data-quiz]");
  Array.prototype.forEach.call(quizzes, function (quiz) {
    quiz.addEventListener("submit", function (event) {
      event.preventDefault();
      var selected = quiz.querySelector("input:checked");
      var feedback = quiz.querySelector(".feedback");
      if (!selected) {
        feedback.textContent = "Choose an answer, then check it.";
        feedback.removeAttribute("data-result");
        return;
      }
      var correct = selected.value === quiz.getAttribute("data-answer");
      feedback.setAttribute("data-result", correct ? "correct" : "incorrect");
      feedback.textContent = (correct ? "Correct. " : "Try again. ") + quiz.getAttribute("data-explanation");
    });
  });
}());
