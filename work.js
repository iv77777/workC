// значения заработанных денег
const earnedValueJs = document.querySelector('#earned__value_js');
// грн в поле заработал
const earnedPositionJs = document.querySelector('#earnedPosition_js');
// получаем все поля после работы
const inputSaveAfterWork = document.querySelectorAll('.input-save__after-work_js');
// получаем все инпуты до работы
const inputBeforeWork = document.querySelectorAll('.input__before-work_js');
let indexErray = inputBeforeWork.length -1;


//ключ расхода топлива localStorage 
const keyNameFuel = 'keyNameFuel';
//ключ сохранньных полей после работы localStorage 
const keyAfterWork = "keyAfterWork";

// <<<<<<<<<<< functions >>>>>>>>>>>>>>>>>>>>>>>
// Проверает чы обект пустой
function isEmpty(obj) {
  for (let key in obj) {
    // если тело цикла начнет выполняться - значит в объекте есть свойства
    return false;
  }
  return true;
}
// делает фиксированим елемент 
function earnedFixed(staticElement, fixedElement) {
  // ростояния от верха страницы до "елемента"
  let topDocumentheightElement = staticElement.getBoundingClientRect().top;
  // высота окна браузера
  let clientHeight = document.documentElement.clientHeight;
  // высота елемента которы йбудем фиксировать
  let heightElement = fixedElement.offsetHeight;

  if (topDocumentheightElement > clientHeight - heightElement) {
    fixedElement.classList.add('active');
  } else {
    fixedElement.classList.remove('active');
  }
}
// получает данные с localStorage по ключу keyName
function getLocalStorage(keyName){
  // Получает обект з LocalStorage
  const objectLocalStorage = localStorage.getItem(keyName);
  if (objectLocalStorage !== null){
    //переобразовуем из строки в обект и возвращаем
    return JSON.parse(objectLocalStorage);
  }
  // если localStorage пустой то возвращам 
  return {};
}
//добавляет обект objectValue в LocalStorage по ключу keyName 
function putLocalStorage(keyName, objectValue) {
  // переобразовуем масив value в строку и записываем в valueText
  let objectValueText = JSON.stringify(objectValue);
  // добавляем valueText в localStorage
  localStorage.setItem(keyName, objectValueText);
}
// Меняет поле инпута inputName на value
function putValueInput(inputName, value){
  inputName.value = value;
}
//в елемента objectNameInnerHtml  Меняет  innerHTML  на valueInnerHTML
function putInnerHtml(objectNameInnerHtml, valueInnerHTML){
  objectNameInnerHtml.innerHTML = valueInnerHTML;
}
// иметирует польот значения до иконки
function  addValue(resultAfterWork) {
    // клонируем результат на html странице
    const resultKmHtmlFly = resultAfterWork.cloneNode(true);
    //resultKmHtmlFlyTop присваюваем позицею с верху
    const resultKmHtmlFlyTop = resultAfterWork.getBoundingClientRect().top;
    //resultKmHtmlFlyLeft присваюваем позицею с лева
    const resultKmHtmlFlyLeft = resultAfterWork.getBoundingClientRect().left + 10;
    
    // добавляем клону классы _flyValue
    resultKmHtmlFly.setAttribute('class', '_flyValue');

    // задаем позицею значению на странице
    resultKmHtmlFly.style.cssText = `
      left:${resultKmHtmlFlyLeft}px;
      top:${resultKmHtmlFlyTop}px;
    `;

    // Выводим етот документ в самый конец боди
    document.body.append(resultKmHtmlFly);

    const buttonStorageInner = document.querySelector('#button-storage__inner_js');

    // получаем коорденаты папки
    const folderjsFlyLeft = buttonStorageInner.getBoundingClientRect().left + 6;
    const folderjsFlyTop = buttonStorageInner.getBoundingClientRect().top + 8;

    // задаем клону позицею куда перемиститца на странице
    resultKmHtmlFly.style.cssText = `
      left:${folderjsFlyLeft}px;
      top:${folderjsFlyTop}px;
      opasity:0;
      font-size:0px;
      height: 15px;
      max-width: 20px;
    `;

    // когда клон долитит до папки 
      resultKmHtmlFly.addEventListener('transitionend', function () {
        resultKmHtmlFly.remove();
      });
}
// иметирует польот значения до иконки
function ReversValue(resultAfterWork, value) {
  // клонируем результат на html странице
  const resultKmHtmlFly = resultAfterWork.cloneNode(true);
  // // добавляем клону классы _flyValueRevers
  resultKmHtmlFly.setAttribute('class', '_flyValueRevers');

  resultKmHtmlFly.value = value;

  // Выводим етот документ в самый конец боди
  document.body.append(resultKmHtmlFly);

  // находим отправную точку на стпанице
  const buttonStorageInner = document.querySelector('#button-storage__inner_js');

  // получаем коорденаты отправнои точки
  const folderjsFlyLeft = buttonStorageInner.getBoundingClientRect().left + 6;
  const folderjsFlyTop = buttonStorageInner.getBoundingClientRect().top + 8;

  // ставим клон на отправную точку
  // меняем стили елемента (через root переменною)
  resultKmHtmlFly.style.setProperty('--top', folderjsFlyTop + 'px');
  resultKmHtmlFly.style.setProperty('--left', folderjsFlyLeft + 'px');


  // получаем коорденаты куда перемистить клона
  // resultKmHtmlFlyTop присваюваем позицею с лева
  const resultKmHtmlFlyLeft = resultAfterWork.getBoundingClientRect().left;
  //resultKmHtmlFlyLeft присваюваем позицею с верху
  const resultKmHtmlFlyTop = resultAfterWork.getBoundingClientRect().top;
  
  // задаем новою позицею клону
  resultKmHtmlFly.style.cssText = `
    left:${resultKmHtmlFlyLeft}px;
    top:${resultKmHtmlFlyTop}px;
    height: 40px;
    max-width: 120px;
    font-size: 30px;
    transition: all .5s;
  `;

  //Удаляем клон когда долитит на новою позицкю
  resultKmHtmlFly.addEventListener('transitionend', function () {
    resultKmHtmlFly.remove();
    resultAfterWork.value = value;
  });
}
// <<<<<<<< // functions >>>>>>>>>>>>>>>>>>>>>>>


//<<<<<<<<<<<<<< При запуске странице >>>>>>>>>>>>>>>>>>>
// получает данные с localStorage по ключу keyNameFuel
const getLocalStorageFuel = getLocalStorage(keyNameFuel);
// получает данные с localStorage по ключу keyAfterWork
const getLocalStorageAfterWork = getLocalStorage(keyAfterWork);

// << подставляем значения по топливу с localStorage >>
// Перечисление всех свойств объекта getLocalStorageFuel
for (const property in getLocalStorageFuel) {

  // получаем елемент у которого id равно етому свойству
  const spanIdName = document.querySelector(`#${property}`);
  // получаем елемент у которого класс равен етому свойству
  const inputClassName = document.querySelector(`.${property}`);

  // меняем innerHTML в етого елемента на значения из обекта getLocalStorageFuel по ключу property
  spanIdName.innerHTML = getLocalStorageFuel[property];
   // меняем value в етого елемента на значения из обекта getLocalStorageFuel по ключу property
  inputClassName.value = getLocalStorageFuel[property];
}
// << // подставляем значения по топливу с localStorage >>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
inputBeforeWork.forEach(item => {
  // берем названия поля
  const itemName = item.parentNode.previousElementSibling.innerHTML;

  let itemValueLocalStorageAfterWork = '';

  // если LocalStorage не пустой
  if (!isEmpty(getLocalStorageAfterWork)) {
    getLocalStorageAfterWork.forEach(localStorageAfterWork => {
      if (localStorageAfterWork.valueName == itemName) {
        itemValueLocalStorageAfterWork = localStorageAfterWork.value;
      }
    });
  }

  // Формируем HTML
  popupValuesItem = `
        <div class="popup-values__item">
          <span>${itemName}</span>
          <input class="input popupAfterWork" data-name="${itemName}" value="${itemValueLocalStorageAfterWork}" type="tel" placeholder="0">
        </div>
      `;
  // Получаем попапа
  const popupValues = document.querySelector('#popup-values_js');
  // рендерим в конец попапа сформированый HTML
  popupValues.insertAdjacentHTML('beforeend', popupValuesItem);
  // >>>>>>>>>>>>>>>>

});
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


function sfeqfqf() {

    // берем названия поля
  const itemName = inputBeforeWork[indexErray].parentNode.previousElementSibling.innerHTML;

    let ValueAfter = '';

    // если LocalStorage не пустой
    if (!isEmpty(getLocalStorageAfterWork)) {
      getLocalStorageAfterWork.forEach(localStorageItem => {
        if (localStorageItem.valueName == itemName) {
          ValueAfter = localStorageItem.value;
        }
      });
    }

  // if (indexErray < inputBeforeWork.length) {
  if (indexErray > -1) {
    if (ValueAfter > 0){
      setTimeout(() =>{
        // inputBeforeWork[indexErray].value = ValueAfter;
        a(inputBeforeWork[indexErray], ValueAfter);
        indexErray--;
        if (indexErray > -1) {
         sfeqfqf();
        }
      }, 200);
    }else{
      indexErray--;
      if (indexErray > -1) {
        sfeqfqf();
      }
    }
  }
}
sfeqfqf();

// << //Рендерим поля после работы в попап и заполняем их с localStorage если он не пустой>>

// <<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function a(element, value) {
    if (value > 0) {
      ReversValue(element, value);
      }
}
// польотт значений из папкы
// let i = 0;
// function a(element, value) {
//     // 
//   console.log(value > 0);

//   if (inputBeforeWork.length > i) {
//     if (value > 0) {
//       ReversValue(element, value);
//         i++;
//         // setTimeout(a, 500);
//         // 
//     } else {
//         i++;
//         // a(element);
//       }
//   }
// }
// <<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>
// if (!isEmpty(getLocalStorageAfterWork)) {
//   // инпуты до роботы которым сохраняем значения в localStorage
//   const saveRevers = document.querySelectorAll('.saveRevers_js');
//   // польотт значений из папкы
//   let i = 0;
//   function a() {
//     if (saveRevers.length > i) {
//       // 
//       if (saveRevers[i].value > 0){
//         ReversValue(saveRevers[i]);
//         i++;
//         setTimeout(a, 500);
//       // 
//      }else{
//        i++;
//        a();
//      }

//    }
//   }
//   setTimeout(a, 500);
// } 
// <<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// делает фиксированим елемент в котором выводим зароботок при запуске странице
earnedFixed(earnedPositionJs, earnedValueJs);
//<<<<<<<<<<<<<< //При запуске странице >>>>>>>>>>>>>>>>>>>



//<<<<<<<<<<<<<< При клике на странице >>>>>>>>>>>>>>>>>>>
// << при клики на html странице >>
document.addEventListener('click', (e) => {
  // через 200 мили секунд
  setTimeout(() => {
    // делает фиксированим елемент в котором выводим зароботок
    earnedFixed(earnedPositionJs, earnedValueJs)
  }, 200);

  // при клик на input с значениями топлива 
  if(e.target.dataset.fuel){
    // Находим елемент на странице у которого id = e.target.dataset.fuel
    const buttonNameInnerHtml = document.querySelector(`#${e.target.dataset.fuel}`);
   
    // при событии oninput (срабатывает каждый раз при изменении значения inputa).
    e.target.oninput = function () {
      //в елемента buttonNameInnerHtml  Меняет  innerHTML  на e.target.value
      putInnerHtml(buttonNameInnerHtml, e.target.value)
    };
    // при событии onchange (срабатывает по окончании изменения элемента).
    e.target.onchange = async function () {
      // получаем сохраненный обек с LocalStorage
      const objectValueKm = await getLocalStorage(keyNameFuel);
    
      // миняем или добавляем значения обекта objectValueKm
      objectValueKm[e.target.dataset.fuel] = e.target.value;
      // записываем измененный обект в LocalStorage
      putLocalStorage(keyNameFuel, objectValueKm);
    };
  }

  // при клик на кнопку рассчитать
  if(e.target.id === "buttonCalculate_js"){
    
    // <<Выщитуем расход на топливо >>
    const consumption = document.querySelector('.consumption_js').value;
    const gasPrice = document.querySelector('.gasPrice_js').value;
    const warmingUpTheCar = Number(document.querySelector('.warmingUpTheCar_js').value);

    const traveledKm = document.querySelector('#traveledKm_js').value;

    // рассчитуем расход на топливо
    const fuelConsumption = (consumption * gasPrice * (traveledKm / 100)) + warmingUpTheCar;

    // << //Выщитуем расход на топливо >>


    // << разница полей до работи и посде работы >>
    // получаем все инпуты после работы
    const inputAfterWork = document.querySelectorAll('.input__after-work_js');
    // получаем все инпуты до работы
    const inputBeforeWork = document.querySelectorAll('.input__before-work_js');

    // сума значений после работы
    let afterWork = 0;
    // сума значений до работы
    let beforeWork = 0;
    
    inputAfterWork.forEach(afterWorkItem =>{
      const afterWorkValue = Number(afterWorkItem.value)
      afterWork = afterWork + afterWorkValue;
    });
    inputBeforeWork.forEach(beforeWorkItem =>{
      const beforeWorkValue = Number(beforeWorkItem.value)
      beforeWork = beforeWork + beforeWorkValue;
    });

    // после работи минус до работы
    const afterMinusbefore = afterWork - beforeWork;
    // << разница полей до работи и посде работы >>

    // << рассчот зароботка >>
    const earned = Math.round(afterMinusbefore - fuelConsumption);
    // << //рассчот зароботка >>

    // << Выводим зароботок на страницу >>
    const earnedValueHtml = document.querySelector('#earned__value_js');
    earnedValueHtml.innerHTML = earned;
    // << //Выводим зароботок на страницу >>

    // создаем масив значений для localStorage
    const arrayAfterWork = [];
    inputSaveAfterWork.forEach(SaveAfterWork => {
      // берем его названия
      const valueName = SaveAfterWork.parentNode.previousElementSibling.innerHTML;
      const objectAfter = {
        value: SaveAfterWork.value,
        valueName: valueName,
      };
      arrayAfterWork.push(objectAfter);
    });

    // записуем масив в localStorage
    putLocalStorage(keyAfterWork, arrayAfterWork);

    // добавляем значения после работы в попап
    const popupAfterWork = document.querySelectorAll('.popupAfterWork');
    popupAfterWork.forEach(itemPopupAfterWork =>{
      arrayAfterWork.forEach(itemAfter =>{
        if (itemAfter.valueName == itemPopupAfterWork.dataset.name) {
          itemPopupAfterWork.value = itemAfter.value;
        }
      });
    });


    
    // польотт значений в папку
    let i = 0;
    function a() {
      if (i < inputSaveAfterWork.length) {

        if (inputSaveAfterWork[i].value > 0){
          addValue(inputSaveAfterWork[i]);
          i++
          setTimeout(a, 200);
        }else{
          i++
          a();
        }
        
      }else{
        setTimeout(() =>{
          const buttonCalculate = document.querySelector('#buttonCalculate_js');
          buttonCalculate.classList.remove('_fly');
        }, 600)
      }
    }
    
    // запускаем функцию польота значений если у кнопки нету класса _fly
    if (!e.target.classList.contains("_fly")){
      const buttonCalculate = document.querySelector('#buttonCalculate_js');
      buttonCalculate.classList.add('_fly');
      a();
    }
    
  }

  // показуем попап
  //если у родитиля есть класс .button-storage__inner то
  if (e.target.closest('.button-storage__inner')){
    const popupFon = document.querySelector('#popup-fon_js');
    const popupFakeBdoy = document.querySelector('#popup_fake-body_js');
    const popupValues = document.querySelector('#popup-values_js');

    // затемняем фон
    popupFon.classList.add('_activ');
    // показуем подложку
    popupFakeBdoy.classList.add('_open');
    // Устанавлюваем максимальную высоту подложкы равно высоты попапа
    popupFakeBdoy.style.maxHeight = popupValues.offsetHeight + "px";
  

    // через 600 мс показуем попап
    setTimeout(() => {
      popupValues.classList.add('_open');
    }, 500);
  }

  // закриваем попап
  // если у елемента есть класс popup-body__button-close 
  if (e.target.className == "popup__button-close"){
    const popupFon = document.querySelector('#popup-fon_js');
    const popupFakeBdoy = document.querySelector('#popup_fake-body_js');
    const popupValues = document.querySelector('#popup-values_js');

    // убераем фон
    popupFon.classList.remove('_activ');
    // скрываем попап 
    popupValues.classList.remove('_open');
    // скрываем подложку
    popupFakeBdoy.classList.remove('_open');
  }
  
});
// << //при клики на html странице >>

//<< Через попап изменяем или добавляем значения в LocalStorage >>
const popupAfterWor = document.querySelectorAll('.popupAfterWork');
// проходимся по всем полям попапа
popupAfterWor.forEach(itemPopupAfterWor => {
  // устанавлюваем собития на изменения полей в попапе
  itemPopupAfterWor.onchange = function () {
    // при изминения поля в попапе
    // получаем данные с LocalStorage по ключу keyAfterWork
    let objectAfterWork = getLocalStorage(keyAfterWork);
    // если получаные даные с LocalStorage не пустой обект тогда ето масив с даннымы
    if (!isEmpty(objectAfterWork)) {
      // проходимся по масиву
      objectAfterWork.forEach(itemAfterWork => {
        // и если в обекта значения ключа valueName === itemPopupAfterWor.dataset.name
        if (itemAfterWork.valueName == itemPopupAfterWor.dataset.name) {
          // тогда в етого обекта меняем поле value на значения инпута которого изминяли
          itemAfterWork.value = itemPopupAfterWor.value;
        }
      });
    } else {
      // переобразовуем пустой обект в пустой масив
      objectAfterWork = [];
      // проходимся по всем полям попапа
      popupAfterWor.forEach(itemPopupAfterWor => {
        // создаем обект с значенияп поля и его названиям
        const objectAfter = {
          value: itemPopupAfterWor.value,
          valueName: itemPopupAfterWor.dataset.name,
        };
        //созданый обект пушем в масив objectAfterWork
        objectAfterWork.push(objectAfter);
      });
    }
    // записуем в LocalStorage созданый масив objectAfterWork
    putLocalStorage(keyAfterWork, objectAfterWork);
  }
});
//<< //Через попап изменяем или добавляем значения в LocalStorage >>
//<<<<<<<<<<<<< //При клике на странице >>>>>>>>>>>>>>>>>>>



// при прокрутке странице 
window.addEventListener('scroll', () => {
  // делает фиксированим елемент в котором выводим зароботок
  earnedFixed(earnedPositionJs, earnedValueJs);
});

