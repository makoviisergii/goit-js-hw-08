import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');

const LOCALSTORAGE_KEY = 'feedback-form-state';

let formObj = {
  message: '',
  email: '',
};

let saveMessage = {
  message: '',
  email: '',
};
if (!localStorage.length) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formObj));
  saveMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
}

form.addEventListener('input', throttle(getForminputData, 1000));
form.addEventListener('submit', onFormSubmit);

updateFormData(saveMessage);

formObj = saveMessage;

function getForminputData(event) {
  formObj[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formObj));
  updateFormData();
}

function updateFormData(saveMessage) {
  saveMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  console.log(saveMessage.message);
  if (saveMessage.message !== '') {
    textarea.value = saveMessage.message;
  }
  if (saveMessage.email !== '') {
    input.value = saveMessage.email;
  }
}
function onFormSubmit(event) {
  event.preventDefault();
  if (saveMessage.email && saveMessage.message !== '') {
    console.log(saveMessage);
    localStorage.removeItem(LOCALSTORAGE_KEY);
    form.reset();
    saveMessage = {
      message: '',
      email: '',
    };
    formObj = {
      message: '',
      email: '',
    };
    return;
  }
  alert('Please fill in all the fields!');
}
