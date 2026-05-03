document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const usl = parseFloat(document.getElementById('usl').value);
    const lsl = parseFloat(document.getElementById('lsl').value);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const texto = e.target.result;
        
        // Esta línea busca números (incluyendo decimales) en todo el archivo .log
        // Si tus datos están en una columna específica, avísame para filtrar mejor.
        let coincidencias = texto.match(/-?\d+(\.\d+)?/g); 
        
        if (!coincidencias) {
            alert("No se encontraron datos numéricos en el archivo .log");
            return;
        }

        let datos = coincidencias.map(Number).filter(n => !isNaN(n));

        // --- CÁLCULOS ESTADÍSTICOS ---
        const n = datos.length;
        const media = datos.reduce((a, b) => a + b, 0) / n;
        const varianza = datos.reduce((a, b) => a + Math.pow(b - media, 2), 0) / (n - 1);
        const sigma = Math.sqrt(varianza);

        if (sigma === 0) {
            document.getElementById('cpkValue').innerText = "Sigma es 0 (datos constantes)";
            return;
        }

        const cpu = (usl - media) / (3 * sigma);
        const cpl = (media - lsl) / (3 * sigma);
        const cpk = Math.min(cpu, cpl);

        // Mostrar resultado
        const el = document.getElementById('cpkValue');
        el.innerText = cpk.toFixed(4);
        el.style.color = cpk < 1.33 ? "red" : "green";
        
        console.log("Datos procesados:", n); // Para que revises en la consola si leyó bien la cantidad de datos
    };
    reader.readAsText(file);
});
