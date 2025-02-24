const form = document.getElementById('form');
const footer = document.getElementById('footer');
const footerMessage = document.getElementById('action-call');
const submitBtn = document.getElementById('button');

let isValid = false;

function validateForm() {
    const inputs = form.querySelectorAll("input, textarea");
    isValid = form.checkValidity();
    
    inputs.forEach(input => {
        if (input.validity.valid) {
            input.style.borderColor = 'green';
        } else {
            input.style.borderColor = 'red';
        }
    });

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

async function processFormData(event) {
    event.preventDefault();
    validateForm();
    if (isValid) {

        let formData = {
            name: this.name.value,
            phone: this.phone.value,
            email: this.email.value,
            message: this.message.value
        };
        try {
            let response = await fetch("http://localhost:3000/submit-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            let result = await response.json();
            alert(result.message)
            // Just to show that server is recieving your data on backend and sends it back for console.log
            console.log(result.messages[0]);
        }catch (error) {
            console.log("Error from submitting form", error);
            alert("✅ Your message has been sent successfully! This is for demonstration purposes to showcase that in real world scenario with server running you would recieve response from backend but since the server is not hosted you would normally get error message");
        }
    }
}

// Event listeners
form.addEventListener('submit', processFormData);