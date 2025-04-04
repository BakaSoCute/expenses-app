const expenses = [];
const inputNode = document.getElementById("input");
const buttonNode = document.getElementById("butt");

buttonNode.addEventListener("click", function () {

    const expense = inputNode.value;
    expenses.push(expense);
    console.log(expenses);
})