document.addEventListener('DOMContentLoaded', () => {
    const comunidadBtn = document.getElementById('comunidad-btn');
    const soBtn = document.getElementById('so-btn');
    const pythonBtn = document.getElementById('python-btn');

    // URLs asociadas a los botones
    const urls = {
        comunidad: 'https://esco60.42web.io/mybb/index.php',
        so: 'https://foro.elchapuzasinformatico.com',
        python: 'https://webdigestpro.com/login/'
    };

    const buttons = [
        { element: comunidadBtn, url: urls.comunidad },
        { element: soBtn, url: urls.so },
        { element: pythonBtn, url: urls.python }
    ];

    buttons.forEach(button => {
        // Redirección en la misma pestaña
        button.element.addEventListener('click', () => {
            if (button.url) {
                window.location.href = button.url;
            }
        });

        // Abrir en una nueva pestaña al hacer clic con la rueda del ratón
        button.element.addEventListener('mousedown', (event) => {
            if (event.button === 1) {
                event.preventDefault();
                if (button.url) {
                    window.open(button.url, '_blank');
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let isDragging = false;
    let lastMouseX = 0;
    let rotationY = 0;
    let inertia = 0;

    const videoUrls = [
        "https://www.youtube.com/embed/dOUyin_myaM",
        "https://www.youtube.com/embed/UPDjjuz1Hkw",
        "https://www.youtube.com/embed/A9Hbo5J1kII",
        "https://www.youtube.com/embed/IZgOEC0NIbw",
        "https://www.youtube.com/embed/_YEZMzfWlK4",
        "https://www.youtube.com/embed/WlEnZZ-eV5E"
    ];

    const carrusel = document.getElementById('carrusel');

    if (!carrusel) {
        console.error('El elemento #carrusel no existe en el DOM.');
        return;
    }

    const elementos = [];
    videoUrls.forEach((url, index) => {
        const elemento = document.createElement('div');
        elemento.classList.add('elemento-carrusel');

        const iframe = document.createElement('iframe');
        iframe.src = `${url}?autoplay=0&controls=1`; // Sin autoplay, solo controles
        iframe.style.pointerEvents = 'none';

        elemento.appendChild(iframe);

        const angle = (360 / videoUrls.length) * index;
        const zDistance = 500;

        elemento.style.transform = `rotateY(${angle}deg) translateZ(${zDistance}px)`;
        elemento.style.zIndex = 100 - index;

        carrusel.appendChild(elemento);
        elementos.push({ iframe, elemento, url, isPlaying: false }); // Nueva propiedad 'isPlaying'

        let timer;

        // Clic de ratón para iniciar video o arrastrar
        elemento.addEventListener('mousedown', (e) => {
            timer = setTimeout(() => {
                isDragging = true;
            }, 500);
        });

        // Cuando el ratón se suelta
        elemento.addEventListener('mouseup', (e) => {
            clearTimeout(timer);
            if (!isDragging) {
                // Lógica para controlar la reproducción/pausa
                const video = elementos[index];
                if (video.isPlaying) {
                    // Pausar el video si está en reproducción
                    iframe.src = `${url}?autoplay=0&controls=1`; // Parar el video
                    video.isPlaying = false; // Cambiar el estado de reproducción
                } else {
                    // Reproducir el video si está pausado
                    iframe.src = `${url}?autoplay=1&controls=1`; // Iniciar el video
                    video.isPlaying = true; // Cambiar el estado de reproducción
                }
                iframe.style.pointerEvents = 'auto';
            }

            isDragging = false;
        });

        elemento.addEventListener('click', (e) => {
            if (!isDragging) {
                const video = elementos[index];
                if (video.isPlaying) {
                    iframe.src = `${url}?autoplay=0&controls=1`; // Parar el video
                    video.isPlaying = false;
                } else {
                    iframe.src = `${url}?autoplay=1&controls=1`; // Iniciar el video
                    video.isPlaying = true;
                }
                iframe.style.pointerEvents = 'auto';
            }
        });
    });

    function rotateCarrusel(delta) {
        rotationY += delta;
        carrusel.style.transform = `rotateY(${rotationY}deg)`;
        updateInteractiveVideo();
    }

    function updateInteractiveVideo() {
        let frontIndex = Math.round(rotationY / (360 / videoUrls.length)) % videoUrls.length;
        if (frontIndex < 0) frontIndex += videoUrls.length;

        elementos.forEach((elemento) => {
            elemento.iframe.style.pointerEvents = 'none';
        });

        const frontElement = elementos[frontIndex];
        if (frontElement) {
            frontElement.iframe.style.pointerEvents = 'auto';
        }
    }

    carrusel.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastMouseX;
        lastMouseX = e.clientX;
        rotateCarrusel(deltaX * 0.1);
        inertia = deltaX * 0.1;
    });

    const elementosCarrusel = document.querySelectorAll('.elemento-carrusel');
    elementosCarrusel.forEach((elemento) => {
        elemento.addEventListener('pointerdown', (e) => {
            isDragging = true;
            lastMouseX = e.clientX;
            inertia = 0;
            elemento.style.cursor = 'grabbing';
        });
    });

    document.addEventListener('pointerup', () => {
        isDragging = false;
        elementosCarrusel.forEach((elemento) => {
            elemento.style.cursor = 'grab';
        });
    });

    function applyInertia() {
        if (!isDragging && Math.abs(inertia) > 0.1) {
            rotateCarrusel(inertia);
            inertia *= 0.95;
        }
        requestAnimationFrame(applyInertia);
    }
    applyInertia();
});
