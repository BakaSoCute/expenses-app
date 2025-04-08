let LIMIT = 10000;
const CURRENCY = " руб.";
const STATUS_IN_LIMIT = "ВСЁ ХОРОШО";
const STATUS_OUT_OF_LIMIT = "ВСЁ ПЛОХО";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_red";

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

init(expenses);



buttonNode.addEventListener("click", function () {

   const expense = getExpanceFromUser();

   if (!expense) {
    return;
   }
   trackExpance(expense);

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
    const resetlimit = inputLimitNode.value;
    const sum = calculateExpanses(expenses);
    init(expenses);
    renderStatus(sum);
    limitNode.innerText = `${resetlimit}`;
    LIMIT = `${resetlimit}`;
});
function updateDisplay() {
    const total = expenses.reduce((acc, expense) => acc + expense, 0);
    sumNode.innerText = `${total}`;
}

function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpanses(expenses);
}
function trackExpance(expense) {
    expenses.push(expense);
}
function getExpanceFromUser() {
    if (inputNode.value === "") {
        return null;
    };
    const expense = parseInt(inputNode.value);
    clearInput();
    return expense;
}
function clearInput() {
    inputNode.value = "";
}
function calculateExpanses(expenses) {
    let sum = 0;
    expenses.forEach(element =>{
        sum += element;
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
    const select = selectNode.value

    expenses.forEach(element =>{
        expensesListHTML += `<li>${select},${element},${CURRENCY}</li>`;
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
        statusNode.innerText = STATUS_OUT_OF_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME);
    }
}