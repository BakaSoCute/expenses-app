const expenses = [];
const inputNode = document.getElementById("input");
const buttonNode = document.getElementById("butt");
const historyNode = document.getElementById("history")
const sumNode = document.getElementById("sum");
const limitNode = document.getElementById("limit");
const statusNode = document.getElementById("status");

const LIMIT = 10000;


buttonNode.addEventListener("click", function () {

    if (inputNode.value === "") {
        return;
    }

    const expense = parseInt(inputNode.value);
    inputNode.value = "";

    expenses.push(expense);
    let expensesListHTML = "";

    expenses.forEach(element =>{
        expensesListHTML += `<li>${element} руб.</li>`
    });
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
    
    let sum = 0;
    expenses.forEach(element =>{
        sum += element;
    });
    sumNode.innerText = sum;

    if (sum <=  LIMIT) {
        statusNode.innerText = "всё хорошо";
    } else {
        statusNode.innerText = "всё плохо";
        statusNode.classList.add("status_red");
    }

})