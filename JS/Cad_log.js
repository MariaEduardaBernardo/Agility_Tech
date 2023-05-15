const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

/* SENHA */
function isStrongPassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:";'<>?,./]).{8,}$/;
    return regex.test(password);
    }

    const passwordInput = document.querySelector('#password');
    const submitButton = document.querySelector('#submit');
    const messageElement = document.querySelector('#password-message');

    passwordInput.addEventListener('input', (event) => {
    const password = event.target.value;
    const isStrong = isStrongPassword(password);
    messageElement.textContent = isStrong ? 'Senha forte' : 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial';
    submitButton.disabled = !isStrong;
    });
