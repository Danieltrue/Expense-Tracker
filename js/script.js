const balance = document.getElementById('amount');
const money_minus = document.querySelector('.money-minus > p');
const money_plus = document.querySelector('.money-plus > p');
const history = document.querySelector('.history-list');
const form = document.querySelector('.form-detail form');
const textInput = document.querySelector('.name-input input');
const amountInput = document.querySelector('.number-input input');

const localStorageData = JSON.parse(localStorage.getItem('transaction'));

let transaction = localStorage.getItem('transaction') !== null ? 
localStorageData : [];


function AddCaculationtoDom(transaction) {
    //Make Sign
   const sign = transaction.amount < 0 ? '-' : '+';
    // make List
    const div = document.createElement('div');
    //add class
    div.className = 'transaction-parent';
    //add inner item
    const Btn = document.createElement('button'); 
    Btn.classList.add('delete');
    Btn.setAttribute('onClick', `remove(${transaction.id})`)
    //button item
    Btn.textContent = 'Delete';
    //
    div.appendChild(Btn);
    //create li
    const li = document.createElement('li');
    li.textContent = transaction.text;
    div.appendChild(li);

    //create p 
    const para = document.createElement('p');
    //add class
    para.classList.add('transaction-amount');
    //add class two
    para.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    //add amount data to it
    para.textContent = `${sign} ${Math.abs(transaction.amount).toFixed(2)}`;

    //append to para
    div.appendChild(para);
    //append div to list history
    history.appendChild(div);
}

function updateBalance() {
    const amount = transaction.map((transaction) => transaction.amount);
    //get total
    const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2)
    //get spent
    const spent = (amount.filter((amt) => amt < 0)
                    .reduce((ac, item) => (ac += item),0) * -1).toFixed(2);
    //saved
    const saved = amount.filter((amt) => amt > 0)
                    .reduce((ac, item) => (ac += item), 0).toFixed(2);
    

    //add to ui
    balance.innerHTML = `\u20a6${total}`;
    money_plus.innerHTML = `\u20a6${saved}`;
    money_minus.innerHTML = `-\u20a6${spent}`

}

function addTransaction(e) {
    e.preventDefault();

    if (amountInput.value.trim() === '' || textInput.value.trim() === '') {
        alert('Please add Your Transaction');
    } else {
        const transactions = {
            id: generateID(),
            text: textInput.value,
            amount: parseInt(amountInput.value)
        };

        transaction.push(transactions);

        AddCaculationtoDom(transactions);

        updateBalance();

        updateLocalStorage()

        amountInput.value = '';
        textInput.value = '';
    }
}

function generateID() {
    return Math.floor(Math.random() * 1000000)
}

function updateLocalStorage() {
    localStorage.setItem('transaction',JSON.stringify(transaction))
}

//delete item 
function remove(id) {
    transaction = transaction.filter(trans => trans.id !== id);

    updateLocalStorage()
    
    init();
}

function init() {
    history.innerHTML = '';
    transaction.forEach(AddCaculationtoDom);
    updateBalance()
}

init()

//Event
form.addEventListener('submit',addTransaction)
