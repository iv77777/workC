const consumption = document.querySelector('#consumption');
const gasPrice = document.querySelector('#gas-price');
const WarmingUpTheCar = document.querySelector('#Warming-up-the-car');



const boltBefore = document.querySelector('#bolt-before');
const boltAfter = document.querySelector('#bolt-after');



const cashBefore = document.querySelector('#cash-before');
const cashAfter = document.querySelector('#cash-after');

const idKm = document.querySelector('#idKm');

const privat = document.querySelector('#privat');

const button = document.querySelector('#button');

const earned = document.querySelector('#earned');



// Шлушаем клик по кнопке Рассчитать и при клики запускаем фуекцию miscalculation
button.addEventListener('click', miscalculation);



// Рсчитует заработок
function miscalculation(){

  const bolt = boltAfter.value - boltBefore.value;
  const cash = cashAfter.value - cashBefore.value;

  // -----------------------------------------------------------
   // витрата на газ
  const priceKm = consumption.value * (idKm.value / 100) * gasPrice.value;
  // -----------------------------------------------------------
  
  // Высчитуетм виводит на страницу мой зароботок
  earned.innerHTML = Math.round(bolt + Number(privat.value) + cash - priceKm - WarmingUpTheCar.value);
}

// при фокусе на input убераем placeholder
function validity(){
  // находим все импуты
  const inputs = document.querySelectorAll('input');
  // для каждого инпута
  inputs.forEach(function (input) {
  // при фокусе на input убераем placeholder
  input.onfocus = function () {
     input.placeholder = '';
    };
  });
}
validity();
