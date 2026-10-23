const friends = [];
const expenses = [];

let friendNameInput = document.getElementById("friendName");

let addFriendBtn = document.getElementById("addFriendBtn");

let friendList = document.getElementById("friendList");

const dropDown = document.getElementById("payer");

const desc = document.getElementById("expenseDescription");

const amount = document.getElementById("expenseAmount");

const expenseBtn = document.getElementById("addExpenseBtn");

const mssg = document.getElementById("expenseMessage");

const expList = document.getElementById("expenseList");

addFriendBtn.addEventListener('click', () => {
    let friendsName = friendNameInput.value.trim();
    if (friendsName === "") {
        alert("Enter Valid Name");
        return;
    }
    if (friends.includes(friendsName)) {
        alert("Friend already exist");
        return;
    }
    friends.push(friendsName);
    const list = document.createElement("li");

    list.textContent = friendsName;

    friendList.append(list);

    const option = document.createElement("option");
    option.textContent = friendsName;
    option.value = friendsName;

    dropDown.append(option);
    updateSummary();
    updateBalance();
    friendNameInput.value="";
})

expenseBtn.addEventListener("click", () => {
    let description = desc.value.trim();
    let total = Number(amount.value);
    let choice = dropDown.value;

    if (description === "") {
        mssg.textContent = "Enter a description";
        return;
    }

    if (isNaN(total) || total <= 0 || !Number.isFinite(total)) {
        mssg.textContent = "Invalid amount";
        return;
    }

    if (choice === "") {
        mssg.textContent = "Select a payer";
        return;
    }

    mssg.textContent = "";

    let obj = {
        description: description,
        amount: total,
        paidBy: choice
    }
    expenses.push(obj);

    let list = document.createElement("li");
    list.textContent = `Description: ${description}  Amount: ${total}  Paid-By: ${choice}`;

    expList.append(list);

    desc.value = "";
    amount.value = "";
    dropDown.value = "";
    updateSummary();
    updateBalance();
})

let totalExpenses = document.getElementById("totalExpenses");
let totalFriends = document.getElementById("totalFriends");
let equalShare = document.getElementById("equalShare");

let totalPersons = 0;
let equalDiv = 0;

function updateSummary() {
    let totalAmount = 0;
    for (let user of expenses) {
        totalAmount += user.amount;
    }
    totalPersons = friends.length;
    if (totalPersons == 0) {
        equalDiv = 0;
    } else {
        equalDiv = totalAmount / totalPersons;
    }

    totalExpenses.textContent = `₹ ${totalAmount.toFixed(2)}`;
    totalFriends.textContent = totalPersons;
    equalShare.textContent = `₹ ${equalDiv.toFixed(2)}`;
}


function updateBalance() {
    const balanceList = document.getElementById("balanceList");
    balanceList.textContent = "";
    for (let friend of friends) {
        let totalPaid = 0;
        for (let expense of expenses) {
            if (expense.paidBy === friend) {
                totalPaid += expense.amount;
            }
        }
        let balance = totalPaid - equalDiv;

        let div = document.createElement("div");
        div.classList.add('balance-item');

        if(balance>0){
            div.classList.add("positive");
        }else if(balance<0){
            div.classList.add("negative");
        }

        div.textContent = `Friend: ${friend} | Balance: ₹${balance.toFixed(2)}`;
        balanceList.append(div);
    }
}




