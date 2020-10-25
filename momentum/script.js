// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  changeBg = document.querySelector('.bg'),
  city = document.querySelector('.city'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption'),
  btn = document.querySelector('.btn');

let picNum = 0;

function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    month_num = today.getMonth(),
    day = today.getDate(),
    weekDay = today.getDay(),
    week = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

  date_time = week[weekDay] + ", " + day + " " + month[month_num];

  document.getElementById("doc_time").innerHTML = date_time;
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;

  if (min === 0 && sec === 0) setBgGreet();

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setBgGreet() {
  let today = new Date();
  let hour = today.getHours();
  picNum = today.getHours();

  if (hour >= 6 && hour < 12) {
    background(Math.floor(Math.random() * Math.floor(6)) + 6);
    greeting.textContent = 'Good Morning, ';
  } else if (hour >= 12 && hour < 18) {
    background(Math.floor(Math.random() * Math.floor(6)) + 12);
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour >= 18 && hour < 24) {
    background(Math.floor(Math.random() * Math.floor(6)) + 18);
    greeting.textContent = 'Good Evening, ';
  } else {
    background(Math.floor(Math.random() * Math.floor(6)));
    greeting.textContent = 'Good Night, ';
  }
}


changeBg.addEventListener('click', () => {
  changeBg.disabled = true;
  setTimeout(function () { changeBg.disabled = false }, 1000);
  picNum < 23 ? background(picNum += 1) : background(picNum = 0);
});

function background(newBg) {
  const image = new Image();
  image.src = `./assets/images/${newBg}.jpg`;

  image.onload = function () {

    document.body.style.backgroundImage = "url('./assets/images/" + newBg + ".jpg')";
  };
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.value = '[Enter Name]';
  } else {
    name.value = localStorage.getItem('name');
  }
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.value = '[Enter Focus]';
  } else {
    focus.value = localStorage.getItem('focus');
  }
}

function getCity() {
  if (localStorage.getItem('city') === null) {
    city.value = 'Минск';
  } else {
    city.value = localStorage.getItem('city');
  }
}

showTime();
setBgGreet();
getName();
getFocus();
getCity();

name.addEventListener('click', function () {
  if (!this.value.trim()) {
    this.value = localStorage.getItem('name');
    this.placeholder = this.value;
  }
  localStorage.setItem('name', this.value);
  this.placeholder = this.value;
  this.value = '';
});

name.addEventListener('blur', function () {
  this.placeholder = '';

  if (!this.value.trim()) {
    this.value = localStorage.getItem('name');
  } else {
    localStorage.setItem('name', this.value);
  }
});

name.addEventListener('keypress', function (e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      this.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
});

focus.addEventListener('click', function () {
  if (!this.value.trim()) {
    this.value = localStorage.getItem('focus');
    this.placeholder = this.value;
  }
  localStorage.setItem('focus', this.value);
  this.placeholder = this.value;
  this.value = '';
});

focus.addEventListener('blur', function () {
  this.placeholder = '';

  if (!this.value.trim()) {
    this.value = localStorage.getItem('focus');
  } else {
    localStorage.setItem('name', this.value);
  }
});

focus.addEventListener('keypress', function (e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      this.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
});


async function getQuote() {
  btn.disabled = true;
  setTimeout(function () { btn.disabled = false }, 1000);
  const url = `https://quote-garden.herokuapp.com/api/v2/quotes/random`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quote.quoteText;
  figcaption.textContent = data.quote.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=9f6362c93e0fc066f93134dfce25eeaf&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod != 200) {
    city.value = '';
    city.placeholder = 'Неверный ввод, ещё раз';
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C ${data.weather[0].description}`;
    weatherDescription.textContent = ` Скорость ветра: ${data.wind.speed} м/с` + ` Влажность воздуха: ${data.main.humidity} %`;
    localStorage.setItem('city', city.value);
  }
}

getWeather();

city.addEventListener('click', function () {
  if (!this.value.trim()) {
    this.value = localStorage.getItem('city');
    this.placeholder = 'Ведите город';
  }
  localStorage.setItem('city', this.value);
  this.placeholder = 'Ведите город';
  this.value = '';
});

city.addEventListener('blur', function () {
  this.placeholder = '';

  if (!this.value.trim()) {
    this.value = localStorage.getItem('city');
  } else {
    getWeather();
  }
});

city.addEventListener('keypress', function (e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      getWeather();
      this.blur();
    }
  } else {
    localStorage.setItem('city', e.target.innerText);
  }
});
