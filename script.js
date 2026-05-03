document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const usl = parseFloat(document.getElementById('usl').value);
    const lsl = parseFloat(document.getElementById('lsl').value);

    const reader = new FileReader();
    reader.onload = function(e) {
        const lineas = e.target.result.split(/\r?\n/);
        let datos = lineas.map(l => parseFloat(l.trim())).filter(n => !isNaN(n));

        if (datos.length < 2) return alert("Datos insuficientes");

        const media = datos.reduce((a, b) => a + b, 0) / datos.length;
        const varianza = datos.reduce((a, b) => a + Math.pow(b - media, 2), 0) / (datos.length - 1);
        const sigma = Math.sqrt(varianza);

        const cpk = Math.min((usl - media)/(3*sigma), (media - lsl)/(3*sigma));
        document.getElementById('cpkValue').innerText = cpk.toFixed(4);
    };
    reader.readAsText(file);
});
