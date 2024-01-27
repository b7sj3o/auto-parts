const token ='6406654898:AAH01hMh8y8CqJP55D6XtLUYOan7DQh-KeU';
const chatID = '-682769820';
let baseUrl = window.location.href;
baseUrl.slice(-1) === '/' ? baseUrl = baseUrl.slice(0, -1): null;

const url = `${baseUrl}/thanks/thanks.html`;

const popupForm = document.getElementById('popup__form');
const closeBtn = document.querySelector('.popup__form__close');
let style = document.createElement('style');

function showForm() {
    popupForm.style.display = 'flex';
    popupForm.style.pointerEvents = 'all';
    
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';
    document.body.style.userSelect = 'none';    

    style.innerText = `body::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: ${document.body.scrollHeight}px; background-color: rgba(0,0,0,0.8); z-index: 190; }`;
    document.body.appendChild(style)
}

closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    popupForm.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.body.style.pointerEvents = 'all';
    document.body.style.userSelect = 'all';  
    document.body.removeChild(style)

})



const firstForm = document.getElementById('first_form');
const firstFormBtn = document.getElementById('form_btn1');

firstForm.addEventListener('submit', function(e) {
    e.preventDefault()
    firstFormBtn.disabled = true;

    const name = firstForm.elements['name'].value
    const phone = firstForm.elements['phone'].value
    const repairType = firstForm.elements['carname'].value


    const message = `Ім'я: ${name}%0AНомер телефону: ${phone}%0AВид ремонту: ${repairType}`;

    const bot = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${message}`

    const api = new XMLHttpRequest();

    api.open('GET', bot, true);
    api.send();

    setTimeout(function() {
        firstFormBtn.disabled = false;
        window.location.href = url;
    }, 100);
    
})

const _popupForm = document.getElementById('popup_form');
const popupFormBtn = document.getElementById('popup__form__button');

_popupForm.addEventListener('submit', function(e) {
    e.preventDefault()
    popupFormBtn.disabled = true;

    const name = _popupForm.elements['name'].value
    const phone = _popupForm.elements['phone'].value

    const message = `Ім'я: ${name}%0AНомер телефону: ${phone}`;

    const bot = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${message}`

    const api = new XMLHttpRequest();

    api.open('GET', bot, true);
    api.send();

    setTimeout(function() {
        _popupForm.disabled = false;
        window.location.href = url;
    }, 100);
    
})

const secondForm = document.getElementById('second_form');
const secondFormBtn = document.getElementById('form_btn2');

secondForm.addEventListener('submit', function(e) {
    e.preventDefault()
    secondFormBtn.disabled = true;

    const name = secondForm.elements['name'].value
    const phone = secondForm.elements['phone'].value
    const repairType = secondForm.elements['carname'].value


    const message = `Ім'я: ${name}%0AНомер телефону: ${phone}%0AВид ремонту: ${repairType}`;

    const bot = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatID}&text=${message}`

    const api = new XMLHttpRequest();

    api.open('GET', bot, true);
    api.send();

    setTimeout(function() {
        secondFormBtn.disabled = false;
        window.location.href = url;
    }, 100);
    
})

