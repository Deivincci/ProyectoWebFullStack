// Archivo: particles-config.js

document.addEventListener('DOMContentLoaded', () => {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "size": {
                "value": 3,
                "random": true
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            },
            "line_linked": {
                "enable": false
            }
        }
    });
});
