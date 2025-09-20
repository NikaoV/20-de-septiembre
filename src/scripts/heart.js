const heartContainer = document.getElementById('heart');

// Frase para formar el corazón
const phrase = "TE AMO";
const letters = [];
for (let i = 0; i < 30; i++) { // Repite la frase para llenar el corazón
    letters.push(...phrase.split(''));
}

// Fórmula paramétrica para dibujar un corazón
function heartPosition(t, size, offsetX, offsetY) {
    const x = size * 16 * Math.pow(Math.sin(t), 3) + offsetX;
    const y = -size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) + offsetY;
    return { x, y };
}

// Animación para formar el corazón con letras
function animateHeart(letters) {
    heartContainer.innerHTML = '';
    const size = 10;
    const offsetX = 150;
    const offsetY = 120;
    let i = 0;
    const total = letters.length;
    function step() {
        if (i < total) {
            const t = Math.PI * 2 * (i / total);
            const pos = heartPosition(t, size, offsetX, offsetY);

            const span = document.createElement('span');
            span.textContent = letters[i];
            span.className = 'heart-word';
            span.style.left = `${pos.x}px`;
            span.style.top = `300px`;
            span.style.opacity = '0';
            heartContainer.appendChild(span);
            setTimeout(() => {
                span.style.transition = 'top 0.7s, opacity 0.7s';
                span.style.top = `${pos.y}px`;
                span.style.opacity = '1';
            }, 50);
            i++;
            setTimeout(step, 100);
        } else {
            setTimeout(() => {
                // Mostrar el texto debajo del corazón
                document.getElementById('encantas-text').classList.remove('hidden');
                // Mostrar fotos después de un breve delay
                setTimeout(() => {
                    document.querySelector('.photos-container').classList.remove('hidden');
                }, 1000);
            }, 400);
        }
    }
    step();
}


// Animación de la frase "TE AMO NOMBRE" letra por letra saliendo del corazón
function animatePhrase(fullPhrase) {
    const centerX = 150;
    const centerY = 120;
    const letterSpacing = 22;
    const phraseWidth = fullPhrase.length * letterSpacing;
    const startX = centerX - phraseWidth / 2 + letterSpacing / 2;
    for (let i = 0; i < fullPhrase.length; i++) {
        setTimeout(() => {
            const letter = document.createElement('span');
            letter.textContent = fullPhrase[i];
            letter.className = 'heart-word te-amo-nombre';
            letter.style.left = `${centerX}px`;
            letter.style.top = `-3rem`;
            letter.style.opacity = '0';
            heartContainer.appendChild(letter);
            setTimeout(() => {
                letter.style.transition = 'top 1s, opacity 1s, left 1s';
                letter.style.top = `-3rem`;
                letter.style.left = `${startX + i * letterSpacing}px`;
                letter.style.opacity = '1';
            }, 50);
            // Mostrar fotos al terminar la última letra
            if (i === fullPhrase.length - 1) {
                setTimeout(() => {
                    document.querySelector('.photos-container').classList.remove('hidden');
                }, 1000);
            }
        }, i * 200);
    }
}

// Iniciar animación al cargar la página
window.onload = () => {
    setTimeout(() => animateHeart(letters), 1000);
};