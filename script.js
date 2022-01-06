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

// ********************<< localStorage >>*****************************************************
let usObject = [{ boltAfter: '', cashAfter: '' }];

class LocalStorageUs {
  // Получает обект з LocalStorage
  getUsObject(keyName) {
    // Получает обект з LocalStorage
    const keyUs = localStorage.getItem(keyName);

    // если есть обект в localStorage
    if (keyUs !== null) {
      //переобразовуем из строки в масив и возвращаем
      return JSON.parse(keyUs);
    }
    // если localStorage пустой то возвращам пустой масив
    return [];
  }

  //добавляет обект в LocalStorage
  putUsObject(keyName) {
    // переобразовуем масив usObject в строку и записываем в usObjectText
    let usObjectText = JSON.stringify(usObject);
    // добавляем usObjectText в localStorage
    localStorage.setItem(keyName, usObjectText)
  }
}

const localStorageUs = new LocalStorageUs();

// ********************<< // localStorage >>*****************************************************

const objectLocalStorage = localStorageUs.getUsObject("keyUsWork");

// если localStorage есть записаные даные то подставляем их на страницу
if (objectLocalStorage.length > 0){
  boltBefore.value = objectLocalStorage[0].boltAfter;
  cashBefore.value = objectLocalStorage[0].cashAfter
}

// Cлушаем клик по кнопке Рассчитать и при клики запускаем фуекцию miscalculation
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


  
  // добавляем значения для localStorage
  usObject[0].boltAfter = boltAfter.value;
  usObject[0].cashAfter = cashAfter.value;

  // добавляем в localStorageUs
  localStorageUs.putUsObject("keyUsWork");
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



const usObjectKm = localStorageUs.getUsObject("usObjectKm");

console.log(usObjectKm);


