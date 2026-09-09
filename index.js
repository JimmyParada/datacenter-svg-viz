const dscc = require('@google/dscc');

// Pegas el contenido del código XML de tu archivo SVG aquí dentro
const svgDataCenter = `
<svg id="datacenter-svg" viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
  <!-- Aquí va el código completo de tu SVG -->
  <g id="racks">
    <rect id="AD03" x="120" y="450" width="30" height="15" fill="#dddddd" stroke="#333" />
    <rect id="AD04" x="120" y="430" width="30" height="15" fill="#dddddd" stroke="#333" />
    <rect id="AJ04" x="250" y="430" width="30" height="15" fill="#dddddd" stroke="#333" />
    <rect id="BF19" x="500" y="180" width="30" height="15" fill="#dddddd" stroke="#333" />
    <!-- resto de tus rectángulos de racks -->
  </g>
</svg>
`;

function drawViz(data) {
  let container = document.getElementById('container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'container';
    container.innerHTML = svgDataCenter;
    document.body.appendChild(container);
  }

  // 1. Resetear el estado visual de todos los racks en el plano
  const allRacks = container.querySelectorAll('rect[id]');
  allRacks.forEach(rack => {
    rack.style.fill = '#dddddd';      // Color base (Gris)
    rack.style.stroke = '#333333';
    rack.style.strokeWidth = '1px';
  });

  // 2. Leer qué rack(s) están filtrados en Looker Studio actualmente
  const rows = data.tables.DEFAULT;
  if (!rows || rows.length === 0) return;

  rows.forEach(row => {
    const selectedRackId = row.rackId[0]; // Lee la dimensión
    const element = container.querySelector(`#${selectedRackId}`);

    // 3. Resaltar el rack filtrado
    if (element) {
      element.style.fill = '#FFD700';        // Color de resalte (Amarillo brillante / Oro)
      element.style.stroke = '#FF0000';      // Borde rojo
      element.style.strokeWidth = '3px';
    }
  });
}

// Suscribirse a los datos y eventos de filtrado de Looker Studio
dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });