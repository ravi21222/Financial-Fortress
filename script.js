const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = []

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random() * 1000000)
    };

    addData(newUser);

}

function addData(user) {
    data.push(user);
    updateDOM();
}

function formatMoney(money) {
    return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function updateDOM() {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    data.forEach(user => {
        const newUser = document.createElement('div');
        newUser.classList.add('person');
        newUser.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`
        main.appendChild(newUser);
    })
}

function doubleMoney() {
    data.map(user => {
        user.money = user.money * 2;
        return user;
    })
    updateDOM();
}

function sortByRichest() {
    data.sort((a, b) => {
        return b.money - a.money;
    })
    updateDOM();
}

function showMillionaires() {
    data = data.filter( user => {
        return user.money >= 1000000;
    } )
    updateDOM();
}

function calculateWealth() {
    const totalWealth = data.reduce((acc, user) => (acc += user.money), 0);
    const element = document.createElement('div');
    element.innerHTML = `<h3><strong>Total Wealth:</strong> ${formatMoney(totalWealth)}</h3>`;
    main.appendChild(element);
}

// Event Listeners 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);



