const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const copyBtn = document.getElementById('copyBtn');
const validationMessage = document.getElementById('validationMessage');
const emptyState = document.getElementById('emptyState');

const encryptionMap = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

function encrypt(text) {
    return text.replace(/[aeiou]/g, char => encryptionMap[char]);
}

function decrypt(text) {
    return Object.entries(encryptionMap).reduce((acc, [key, value]) => 
        acc.replace(new RegExp(value, 'g'), key), text);
}

function isValidInput(text) {
    return /^[a-z\s]*$/.test(text);
}

function showError(message) {
    validationMessage.textContent = message;
    validationMessage.classList.add('error');
    setTimeout(() => {
        validationMessage.classList.remove('error');
        validationMessage.textContent = 'Solo letras minúsculas y sin acentos';
    }, 3000);
}

function updateUI(text) {
    if (text) {
        emptyState.style.display = 'none';
        outputText.style.display = 'block';
        copyBtn.style.display = 'block';
        outputText.classList.add('fade-in');
        copyBtn.classList.add('slide-in');
    } else {
        emptyState.style.display = 'flex';
        outputText.style.display = 'none';
        copyBtn.style.display = 'none';
        emptyState.classList.add('fade-in');
    }
}

function animateButton(button) {
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 200);
}

encryptBtn.addEventListener('click', () => {
    animateButton(encryptBtn);
    const text = inputText.value.trim();
    if (!text) {
        showError('Por favor, ingrese algún texto');
        return;
    }
    if (isValidInput(text)) {
        outputText.value = encrypt(text);
        updateUI(outputText.value);
    } else {
        showError('Solo se permiten letras minúsculas y espacios');
    }
});

decryptBtn.addEventListener('click', () => {
    animateButton(decryptBtn);
    const text = inputText.value.trim();
    if (!text) {
        showError('Por favor, ingrese algún texto');
        return;
    }
    if (isValidInput(text)) {
        outputText.value = decrypt(text);
        updateUI(outputText.value);
    } else {
        showError('Solo se permiten letras minúsculas y espacios');
    }
});

copyBtn.addEventListener('click', async () => {
    animateButton(copyBtn);
    try {
        await navigator.clipboard.writeText(outputText.value);
        copyBtn.textContent = '¡Copiado!';
        setTimeout(() => {
            copyBtn.textContent = 'Copiar';
        }, 2000);
    } catch (err) {
        console.error('Error al copiar: ', err);
    }
});

inputText.addEventListener('input', () => {
    validationMessage.classList.toggle('error', !isValidInput(inputText.value));
    updateUI(inputText.value.trim());
});

// Animaciones adicionales
function addHoverEffect(element) {
    element.addEventListener('mouseover', () => {
        element.style.transform = 'scale(1.05)';
    });
    element.addEventListener('mouseout', () => {
        element.style.transform = 'scale(1)';
    });
}

addHoverEffect(encryptBtn);
addHoverEffect(decryptBtn);
addHoverEffect(copyBtn);

// Efecto de escritura para el placeholder
function typingEffect(element, text, speed) {
    let i = 0;
    element.placeholder = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.placeholder += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Inicialización
updateUI('');
typingEffect(inputText, 'Ingrese el texto aquí', 100);

// Animación de fondo
function animateBackground() {
    const colors = ['#F3F5FC', '#E9ECF8', '#D8DFE8', '#AAB2D5'];
    let currentIndex = 0;

    setInterval(() => {
        document.body.style.backgroundColor = colors[currentIndex];
        currentIndex = (currentIndex + 1) % colors.length;
    }, 5000);
}

animateBackground();

// Efecto de partículas en el fondo
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.animationDuration = Math.random() * 2 + 1 + 's';
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 3000);
}

setInterval(createParticle, 300);