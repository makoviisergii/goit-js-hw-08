import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');

form.addEventListener('input', throttle(getForminputData, 1000));
form.addEventListener('submit', onFormSubmit);

const LOCALSTORAGE_KEY = 'feedback-form-state';

let formObj = {};

let saveMessage = {};

updateFormData();

formObj = saveMessage;

function getForminputData(event) {
  formObj[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formObj));
  updateFormData();
}

function updateFormData() {
  saveMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  if (saveMessage.message) {
    textarea.value = saveMessage.message;
  }
  if (saveMessage.email) {
    input.value = saveMessage.email;
  }
}
function onFormSubmit(event) {
  event.preventDefault();
  console.log(saveMessage.email && saveMessage.message);
  if (saveMessage.email && saveMessage.message) {
    console.log(saveMessage);
    localStorage.removeItem(LOCALSTORAGE_KEY);
    form.reset();
    saveMessage = {};
    formObj = {};
    return;
  }
  alert('Please fill in all the fields!');
}
