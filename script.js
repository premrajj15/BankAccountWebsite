'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Premraj Padakanti',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-10-26T12:01:20.894Z',
    '2023-10-30T18:49:59.371Z',
    '2023-10-30T14:43:26.374Z',
    '2023-11-30T16:33:06.386Z',
    '2023-11-30T14:18:46.235Z',
    '2023-12-01T06:04:23.907Z',
    '2023-12-02T09:48:16.867Z',
    '2023-12-02T13:15:33.035Z',
  ],
  currency: 'EUR',
  locale: 'en-UK', // de-DE
};

const account2 = {
  owner: 'Uma Rani',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2023-10-26T12:01:20.894Z',
    '2023-10-30T18:49:59.371Z',
    '2023-10-30T14:43:26.374Z',
    '2023-11-30T16:33:06.386Z',
    '2023-11-30T14:18:46.235Z',
    '2023-12-01T06:04:23.907Z',
    '2023-12-02T09:48:16.867Z',
    '2023-12-02T13:15:33.035Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Nava Neetha',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2023-10-26T12:01:20.894Z',
    '2023-10-30T18:49:59.371Z',
    '2023-10-30T14:43:26.374Z',
    '2023-11-30T16:33:06.386Z',
    '2023-11-30T14:18:46.235Z',
    '2023-12-01T06:04:23.907Z',
    '2023-12-02T09:48:16.867Z',
    '2023-12-02T13:15:33.035Z',
  ],
  currency: 'EGP',
  locale: 'ar-EG',
};

const account4 = {
  owner: 'Suresh Jangili',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2023-10-26T12:01:20.894Z',
    '2023-10-30T18:49:59.371Z',
    '2023-10-30T14:43:26.374Z',
    '2023-11-30T16:33:06.386Z',
    '2023-11-30T14:18:46.235Z',
    '2023-12-01T06:04:23.907Z',
    '2023-12-02T09:48:16.867Z',
    '2023-12-02T13:15:33.035Z',
  ],
  currency: 'INR',
  locale: 'hi-IN', // de-DE
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementDate = function (date, locale) {
  const calcDisplayPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDisplayPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'today';
  if (daysPassed === 1) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  // console.log(acc);

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  console.log(acc);

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //create date and time

    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date, acc.locale);

    //this is for all curriencies dynamically changed with this code

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    /* 
this is only for containermovements
const formattedMov = new Intl.NumberFormat(acc.locale, {
      style: 'currency',
      currency: acc.currency,
    }).format(mov);
*/
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  //this is for all curriencies dynamically changed with this code

  //const formattedMov = formatCur(acc.balance, acc.locale, acc.currency);

  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;

  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

// const out = function (movements) {
//   const outcomes = movements
//     .filter(mov => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumOut.textContent = `${Math.abs(outcomes)}€`;
// };
// out(account1.movements);
//-------with functiional programming-------
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);

const updateUI = function (acc) {
  //display movements

  displayMovements(acc);
  //display balance

  calcDisplayBalance(acc);

  //display summary

  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
//////////////////////////////////////////////////////
//Event handler
let currentAccount, timer;
// //fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  //prevent form from submtting
  e.preventDefault();
  // console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and welcome message
    // console.log('login');
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //experimenting API

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      weekday: 'long',
    };

    const locale = navigator.language;
    console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );
    // create current date and time

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    //clear input fields

    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    //update ui

    updateUI(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiveracc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiveracc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    receiveracc &&
    currentAccount.balance >= amount &&
    receiveracc?.username !== currentAccount.username
  ) {
    //doing the transfer

    currentAccount.movements.push(-amount);
    receiveracc.movements.push(amount);

    // add transfer date

    currentAccount.movementsDates.push(new Date().toISOString());
    receiveracc.movementsDates.push(new Date().toISOString());

    //update ui

    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

//Request Loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //add movement

      currentAccount.movements.push(amount);

      // add transfer date

      currentAccount.movementsDates.push(new Date().toISOString());

      //update ui
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    //delete account
    accounts.splice(index, 1);

    //hide ui

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  // console.log('hi');

  sorted = !sorted;
});
// this is one way --------------------

// const user = 'Steven Thomas Williams'; //stw
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(function (name) {
//     return name[0];
//   })
//   .join('');
// console.log(username);

//----------this is another way with gloal variables------

// const user = 'Steven Thomas Williams'; //stw
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(name => name[0])
//   .join('');
// console.log(username);
// console.log(Date.now());
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// const dis = (d1, d2) => d2 - d1;
// const s1 = dis(new Date(2037, 3, 14), new Date(2037, 3, 24));
// console.log(s1);
// const num = 3884764.84;
// const opt = {
//   style: 'currency',
//   unit: 'celsius',
//   currency: 'EUR',
// };
// console.log('us:  ', new Intl.NumberFormat('en-US', opt).format(num));
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language, opt).format(num)
// );
// const air = 'Tap Air Portugal';
// console.log(air.slice(1));
// console.log(air.slice(1, air.indexOf(' ')));
