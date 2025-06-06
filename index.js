let LIMIT = 10000;
const CURRENCY = " руб.";
const STATUS_IN_LIMIT = "ВСЁ ХОРОШО";
const STATUS_OUT_OF_LIMIT = "ВСЁ ПЛОХО";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";
const STORAGE_LABEL_LIMIT = "limits";
const STORAGE_LABEL_EXPANSES = "expenses";

const inputNode = document.getElementById("input");
const buttonNode = document.getElementById("butt");
const historyNode = document.getElementById("history")
const sumNode = document.getElementById("sum");
const limitNode = document.getElementById("limit");
const statusNode = document.getElementById("status");
const resetHistoryNode = document.getElementById("resetHistory"); 
const changeLimitNode = document.getElementById("changeLimit");
const inputLimitNode = document.getElementById("popup__input");
const resetLimitNode = document.getElementById("popup__button");
const selectNode = document.getElementById("select");
let expenses = [];
let limit = parseInt(limitNode.innerText);

init(expenses);
initLocalStorageExpenses();



buttonNode.addEventListener("click", function () {

   const expense = getExpanceFromUser();

   if (!expense) {
    return;
   }
   trackExpance(expense);
   saveExpensesScore();

    render(expenses)

});
resetHistoryNode.addEventListener("click", function() {
    expenses = [];
    const sum = calculateExpanses(expenses);
    updateDisplay();
    historyNode.innerText = "";
    init(expenses);
    renderStatus(sum);
});
resetLimitNode.addEventListener("click", function() {
    const resetlimit = parseInt(inputLimitNode.value);
    if (!isNaN(resetlimit)) {
        LIMIT = resetlimit;
        limitNode.innerText = `${LIMIT}`;
        const sum = calculateExpanses(expenses);
        renderStatus(sum);
    }
    localStorage.setItem(STORAGE_LABEL_LIMIT, resetlimit);
});
function saveExpensesScore() {
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_LABEL_EXPANSES, expensesString);
}

function initLimit () {
    const limitFromStarage = parseInt(localStorage.getItem(STORAGE_LABEL_LIMIT));
    if (!limitFromStarage) {
        return;
    }
    limitNode.innerText = limitFromStarage;
    limit = parseInt(limitNode.innerText)
}
initLimit()
function getSelectedCategory () {
        return selectNode.value;
    };
function updateDisplay() {
    const total = expenses.reduce((acc, expense) => acc + expense, 0);
    sumNode.innerText = `${total}`;
}

function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpanses(expenses);
    // expenses = initLocalStorageExpenses(expenses);
}
function initLocalStorageExpenses() {
    const expensesFromStorageString = localStorage.getItem(STORAGE_LABEL_EXPANSES);
    const expensesFromStorage = JSON.parse(expensesFromStorageString);
    if (Array.isArray(expensesFromStorage)) {
        expenses = expensesFromStorage;
    }
    render(expenses);
}

function trackExpance(expense) {
    expenses.push(expense);
}
function getExpanceFromUser() {
    if (inputNode.value === "") {
        return null;
    };
    const select = getSelectedCategory();
    if (select === "Категория") {
        return;
    };
    const expenseNumber = parseInt(inputNode.value);
    if (isNaN(expenseNumber)) {
        return null;
    }
    const expense = {amount: expenseNumber, category: select};
    console.log(expense)
    clearInput();
    return expense;
} 
function clearInput() {
    inputNode.value = "";
}
function calculateExpanses(expenses) {
    let sum = 0;
    expenses.forEach(element =>{
        sum += element.amount;
    });
    return sum;
}
function render(expenses) {
    const sum = calculateExpanses(expenses);
    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}
function renderHistory(expenses) {
    let expensesListHTML = "";

    expenses.forEach(element =>{
        expensesListHTML += `<li>${element.amount} ${CURRENCY} - ${element.category} </li>`;
    });
    historyNode.innerHTML = `<ol>${expensesListHTML}</ol>`;
};
function renderSum(sum) {
    sumNode.innerText = sum;
}
function renderStatus(sum) {
    if (sum <=  LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
        
        statusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${LIMIT - sum} руб)`;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    };
};
