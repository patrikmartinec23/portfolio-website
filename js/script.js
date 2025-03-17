function runTypingEffect() {
    const text = 'I am Patrik Martinec.';
    const typingElement = document.getElementById('typing-text');
    const typingDelay = 100;

    typeText(text, typingElement, typingDelay);
}

let isAnimating = false;
let hasScrolledDown = false;

function typeText(text, typingElement, delay) {
    if (isAnimating) return;

    isAnimating = true;

    typingElement.textContent = '';

    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            typingElement.textContent += text.charAt(i);

            if (i === text.length - 1) {
                setTimeout(() => {
                    isAnimating = false;
                }, delay);
            }
        }, delay * i);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    runTypingEffect();

    const progressBarInner = document.querySelector('#progress-bar');
    const typingElement = document.getElementById('typing-text');
    const viewportHeight = window.innerHeight;

    document
        .getElementById('download-button')
        .addEventListener('click', function () {
            const link = document.createElement('a');
            link.href =
                'https://drive.google.com/file/d/1wcvC24CiWKJQjjxinX_-PQATLIIuYhOV/view?usp=sharing';
            link.download = 'PatrikMartinec_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

    window.addEventListener('scroll', () => {
        const h = document.documentElement;

        let st = h.scrollTop || document.body.scrollTop;
        let sh = h.scrollHeight || document.body.scrollHeight;

        let percent = (st / (sh - h.clientHeight)) * 100;

        progressBarInner.style.width = percent + '%';

        if (window.scrollY > viewportHeight) {
            hasScrolledDown = true;
        }

        if (hasScrolledDown && window.scrollY < 50) {
            typeText('I am Patrik Martinec.', typingElement, 100);
            hasScrolledDown = false;
        }
    });
});
