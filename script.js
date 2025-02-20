const form = document.getElementById('form');
const footer = document.getElementById('footer');
const footerMessage = document.getElementById('action-call');
const submitBtn = document.getElementById('button');

let isValid = false;

function validateForm() {
    isValid = form.checkValidity();

    if(!isValid) {
        footerMessage.textContent = 'Fill all the required fields';
        footerMessage.style.color = 'red';
        footer.style.borderColor = 'red';
        return;  
    }
    
    if (isValid) {
        footerMessage.textContent = 'Message Sent Sucessfuly';
        footerMessage.style.color = 'green';
        footer.style.borderColor = 'green';
        return;
    }
}

function storeFormData() {
    const user = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value,
        message: form.message.value
    }
    console.log(user);
}


function processFormData(event) {
    event.preventDefault();
    validateForm();
    if (isValid) {
        storeFormData();
    }
}

// Event listeners
form.addEventListener('submit', processFormData);