// Смена темы
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
}

// Отсчёт до лета (1 июня 2025 года)
const summerDate = new Date('2025-06-01T00:00:00');

function updateCountdown() {
    const now = new Date();
    const timeDiff = summerDate - now;

    if (timeDiff <= 0) {
        document.getElementById('countdown-timer').innerHTML = '<h2>Лето наступило! ☀️</h2>';
        document.getElementById('message').textContent = 'Наслаждайся солнцем и теплом! 🌴';
        document.body.style.background = 'linear-gradient(135deg, #ffeb3b, #ff9800)';
        return;
    }

    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);

    document.getElementById('months').textContent = months;
    document.getElementById('weeks').textContent = weeks;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Обновляем сообщение только при необходимости
    updateMessage(days);
}

// Меняющиеся надписи
const messages = [
    'Ещё чуть-чуть! Лето уже скоро! 🌴',
    'Скоро будем загорать на пляже! 🏖️',
    'Лето зовёт! Не могу дождаться! ☀️',
    'Тёплые деньки совсем близко! 🌞',
    'Готовимся к летним приключениям! 🚴',
    'Солнце, море, лето — скоро! 🌊'
];

function updateMessage(days) {
    const messageElement = document.getElementById('message');
    let currentMessage = localStorage.getItem('currentMessage');

    // Если осталось меньше недели или 1 день, показываем специальные сообщения
    if (days <= 7 && days > 1) {
        currentMessage = 'Осталась всего неделя! Ура! 🎉';
        localStorage.setItem('currentMessage', currentMessage);
        console.log('Осталась неделя, обновили сообщение:', currentMessage);
    } else if (days <= 1) {
        currentMessage = 'Завтра лето! Готовимся! 🏝️';
        localStorage.setItem('currentMessage', currentMessage);
        console.log('Остался 1 день, обновили сообщение:', currentMessage);
    } else if (!currentMessage) {
        // Если нет сохранённого сообщения, выбираем новое
        currentMessage = messages[Math.floor(Math.random() * messages.length)];
        localStorage.setItem('currentMessage', currentMessage);
        console.log('Нет сохранённого сообщения, выбрали новое:', currentMessage);
    }

    messageElement.textContent = currentMessage;
}

// Функция для смены сообщения каждые 15 секунд
function changeMessage() {
    const now = new Date();
    const days = Math.floor((summerDate - now) / (1000 * 60 * 60 * 24));

    if (days <= 7) {
        console.log('Осталось меньше недели, не меняем сообщение');
        return; // Не меняем, если осталось меньше недели
    }

    const newMessage = messages[Math.floor(Math.random() * messages.length)];
    localStorage.setItem('currentMessage', newMessage);
    document.getElementById('message').textContent = newMessage;
    console.log('Сменили сообщение на:', newMessage);
}

// Пасхалка: клик по таймеру
document.getElementById('countdown-timer').addEventListener('click', () => {
    let clicks = localStorage.getItem('timerClicks') || 0;
    clicks++;
    localStorage.setItem('timerClicks', clicks);
    if (clicks >= 5) {
        alert('Ты кликнул на таймер 5 раз! Вот тебе летняя мелодия! 🎶');
        const summerSound = new Audio('https://www.myinstants.com/media/sounds/beach-waves.mp3');
        summerSound.play();
        localStorage.setItem('timerClicks', 0);
        // Добавим летнюю анимацию
        document.body.style.backgroundImage = 'url("https://media.giphy.com/media/3o7TKsQ8J3f3J4UoE0/giphy.gif")';
    }
});

// Обновляем таймер каждую секунду и меняем сообщение каждые 15 секунд
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    // Проверяем и меняем сообщение каждые 15 секунд
    setInterval(() => {
        const now = new Date();
        const days = Math.floor((summerDate - now) / (1000 * 60 * 60 * 24));
        if (days > 7) {
            changeMessage();
        }
    }, 15000);
});
