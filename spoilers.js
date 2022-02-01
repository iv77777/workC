"use strict"
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Для родитиля спойлеров пишем атрибут data-spollers
// Для заголовка спойлера пишем фтрибут data-spoller

// Если нужно что бы в блоке открывался только один спойлер добавляем атрибут
// data-one-spoller

// Если нужно включить/выключить работу спойлеров на разных размерах экранов
// пишем параметры ширины и типа брейкпоинта.
// data-spollers="800,max" - спойлеры будут работать только на экранах менше или равно 800px
// data-spollers="650,min" - спойлеры будут работать только на экранах больше или равно 650px
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// в переменною "spollersArray" получаем колэкцию из всех обектов в которых есть дата атрибут [data-spollers]
const spollersArray = document.querySelectorAll('[data-spollers]');

// если "spollersArray" не пустой 
if (spollersArray.length > 0) {
	//В переменною "spollersRegular" Получаем все спойлера в которых нету медиа запроссов (console.log(spollersRegular);)
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Если есть такие спойлера то запускаем функцию initSpollers(spollersRegular); в которою передаем масив с етими спойлерами
	if (spollersRegular.length > 0) {
		// запускаем функцию initSpollers (Иницилизирует ети спойлери)
		initSpollers(spollersRegular);
	}

	//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

	//В переменною "spollersMedia" Получаем все спойлера в которых есть медиа запроссы ( console.log(spollersMedia); = [div.block.block_2, div.block.block_3] итд.)
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Если есть такие спойлера (c медиа запросами) то
	if (spollersMedia.length > 0) {
		// в массиве "breakpointsArray" будут созданные обекты для каждого спойлера в которых есть медиа запроссы  [{value: "650", type: "min", item: div.block.block_2}, {value: "800", type: "max", item: div.block.block_3} итд.]
		const breakpointsArray = [];
		// у каждого етого спойлера [div.block.block_2, div.block.block_3]
		spollersMedia.forEach(item => {
			//из html < data-spollers="650,min"> получаем строку с параметрами < 650,min >
			const params = item.dataset.spollers;
			//в обект "breakpoint" будем ложить брекпоинт, значения и сам елемент (спойлер) {value: "650", type: "min", item: div.block.block_2} 
			const breakpoint = {};
			// раздиляем строку параметра на масив  ["650", "min"]
			const paramsArrey = params.split(",");
			// из масива "paramsArrey" ложим значения по индексу [0] (в данном случаи "650") в обект "breakpoint" <value: "650">
			breakpoint.value = paramsArrey[0];
			// из масива "paramsArrey" ложим значения по индексу [1] (в данном случаи "min") в обект "breakpoint" < type: "min"> если не указан то поумолчанию будт < type: "max">
			breakpoint.type = paramsArrey[1] ? paramsArrey[1].trim() : "max";
			// в обект "breakpoint" добавляем етот елемент (спойлер) < item: div.block.block_2 >
			breakpoint.item = item;
			// в массив "breakpointsArray" додаем созданний обект "breakpoint" для етот спойлера
			breakpointsArray.push(breakpoint);

		});

		// формируем строки медиа запроссов ["{min-width:650px),650,min", "{min-width:650px),650,min", "{max-width:800px),800,max"]
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width:" + item.value + "px)," + item.value + ',' + item.type;
		});
		// убераем повторы медиа запроссов ["{min-width:650px),650,min", "{max-width:800px),800,max"]
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			// 
			return self.indexOf(item) === index;
		});

		// робота з кажним брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			// розбиваем на ["(min-width:650px)", "650", "min"] итд.
			const paramsArrey = breakpoint.split(",");
			// кладьом 650
			const mediaBreakpoint = paramsArrey[1];
			// кладьом min
			const mediaType = paramsArrey[2];
			// бедет слушать ширину екрана например (min-width:650px) 
			const matchMedia = window.matchMedia(paramsArrey[0]);

			// сортируем обекти с нужным условиям (одинаковые вмести)
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});

			// При сробатовании matchMedia запускаем функию initSpollers(spollersArray, matchMedia); в которою передаем параметры
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			// запускаем функцию initSpollers сразу при загрузке страницы
			initSpollers(spollersArray, matchMedia);

		});

	}

	// Иницилизация
	function initSpollers(spollersArray, matchMedia = false) {

		spollersArray.forEach(spollersBlock => {
			// если matchMedia дает true тогда присваюваем spollersBlock.item а если  false spollersBlock;
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;

			// если сработал брейкпоинт или он не бил задан спойлкру тогда
			if (matchMedia.matches || !matchMedia) {
				// оболочке спойлера присваеватсь класс '_init'
				spollersBlock.classList.add('_init');
				// запускаем функцию initSpollerBody
				initSpollerBody(spollersBlock);
				// при клики на spollersBlock вызываем функцию
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				// отбераем у spollersBlock класс '_init'
				spollersBlock.classList.remove('_init');
				// запускаем функцию initSpollerBody
				initSpollerBody(spollersBlock, false);
				// убераем события клик 
				spollersBlock.removeEventListener("click", setSpollerAction);
			}

		});
	}
	// Робота с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		// получаем все заголовки спойлеров внутри блока spollersBlock
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		// если есть заголовки 
		if (spollerTitles.length > 0) {
			// то для каждого заголовка
			spollerTitles.forEach(spollerTitle => {
				// если под етим заголовком сойлер скрыт то
				if (hideSpollerBody) {
					// у етого заголовка убераем атрибут таб-индекс (ето включает возможность переходить по етим заголовкам нажатиям на клавишу таб)
					spollerTitle.removeAttribute('tabindex');
					// если у етого заголовка нету класса '_active'
					if (!spollerTitle.classList.contains('_active')) {
						// тогда скриваем контентною часть
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					// если под данным заголовком спойлер открыт то
					// добавляем таб индекс -1 
					spollerTitle.setAttribute('tabindex', '-1');
					// разкрываем спойлеры если они били скрыти
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	// Выполняется когда кликаем на заголовок спойлера
	function setSpollerAction(e) {
		// в "el" получаем нажатый обект
		const el = e.target;
		// если у етого обекта или у его родитиля есть 'data-spoller' то
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			// получаем сам заголовок (кнопку) спойлура
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			// Находим ближайшого родитиля з атрибутом [data-spollers]
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			// если у етого родитиля есть атрибут 'data-one-spoller' то oneSpoller будет = true, если нет то false
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			// если у данного родитиля нету обекта з классом _slide то
			if (!spollersBlock.querySelectorAll('_slide').length) {
				// если у родитиля есть дата-атрибут 'data-one-spoller' и в заголовке спойлера нету класса '_active' то
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					// запускаем функцию hideSpollerBody которая скривает все спойлеры
					hideSpollerBody(spollersBlock);
				}
				// будет скривать или показувать слайды
				_slideToggle(spollerTitle.nextElementSibling, 150);
			}
			// отминяет события по умолчанию
			e.preventDefault();
		}
	}
	// скривает все спойлеры
	function hideSpollerBody(spollersBlock) {
		// получаю открытый спойлер внутри родитильського обекта (spollersBlock)
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		// если есть такой обект то
		if (spollerActiveTitle) {
			// скрываем все елементы
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}

// функция которая скривает анимировано елемент
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.previousElementSibling.classList.remove('_active');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
// функция которая анимировано показует елемент
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		target.previousElementSibling.classList.add('_active');
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';//+
		target.style.transitionDuration = duration + 'ms';//+
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
// функция которая анимировано показует елемент или скрывает
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}









