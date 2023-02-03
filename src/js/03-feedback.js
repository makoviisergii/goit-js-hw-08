import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');

form.addEventListener('input', throttle(getForminputData, 1000));
form.addEventListener('submit', onFormsubmit);

const LOCALSTORAGE_KEY = 'feedback-form-state';

const formObj = {};
let saveMessage = {};

updateFormData();

function getForminputData(event) {
  formObj[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formObj));
}

function getSaveMessages() {
  saveMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
}

function onFormsubmit(event) {
  event.preventDefault();
  getSaveMessages();
  if (saveMessage) {
    console.log(saveMessage);
    localStorage.removeItem(LOCALSTORAGE_KEY);
    form.reset();
  }
}

function updateFormData() {
  getSaveMessages();
  if (saveMessage) {
    textarea.value = saveMessage.message;
    input.value = saveMessage.email;
  }
}
