document.addEventListener('DOMContentLoaded', () => {
    const colorInput = document.getElementById('colorInput');
    const colorDisplay = document.getElementById('colorDisplay');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    const hslValue = document.getElementById('hslValue');
    const copyButtons = document.querySelectorAll('.copy-button');
    const msgDiv = document.querySelector('.alert-msg');

    // for colordisplay box
    const updateColorDisplays = (color) => {    
        colorDisplay.style.backgroundColor = color;
        hexValue.textContent = color;
        const { r, g, b } = hexToRgb(color);
        rgbValue.textContent = `rgb(${r}, ${g}, ${b})`;
        const { h, s, l } = rgbToHsl(r, g, b);
        hslValue.textContent = `hsl(${h}, ${s}%, ${l}%)`;
    };


    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    };


    const rgbToHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };


    colorInput.addEventListener('input', function () {
        updateColorDisplays(this.value);
    });

    copyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const format = this.dataset.format;
            let valueToCopy;

            switch (format) {
                case 'hex':
                    valueToCopy = hexValue.textContent;
                    break;
                case 'rgb':
                    valueToCopy = rgbValue.textContent;
                    break;
                case 'hsl':
                    valueToCopy = hslValue.textContent;
                    break;
            }

            navigator.clipboard.writeText(valueToCopy).then(() => {
                msgDiv.style.display = 'block';
                setTimeout(function () { msgDiv.style.display = 'none'; }, 1000);
            });
        });
    });

    updateColorDisplays(colorInput.value);
});
