// Initialize the globe
const world = Globe()
    (document.getElementById('globeViz'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .lineHoverPrecision(0)
    .polygonAltitude(0.06)
    .polygonCapColor(feat => 'rgba(0, 150, 255, 0.1)')
    .polygonSideColor(() => 'rgba(0, 100, 200, 0.15)')
    .polygonStrokeColor(() => '#00ffff')
    .polygonLabel(({ properties: d }) => `
        <div style="background: rgba(0,0,0,0.8); padding: 5px; border-radius: 3px; border: 1px solid rgba(0,255,255,0.3);">
            <b style="color: #00ffff;">${d.name || d.ADMIN || d.NAME} (${d.iso_a3 || d.ISO_A3 || 'N/A'})</b>
        </div>
    `)
    .onPolygonHover(hoverD => {
        world
            .polygonAltitude(d => d === hoverD ? 0.12 : 0.06)
            .polygonCapColor(d => d === hoverD ? 'rgba(0, 200, 255, 0.4)' : 'rgba(0, 150, 255, 0.1)');

        const infoDiv = document.getElementById('info');
        if (hoverD) {
            const name = hoverD.properties.name || hoverD.properties.ADMIN || hoverD.properties.NAME || 'Unknown';
            infoDiv.innerHTML = `Country: <span style="color: #00ffff">${name}</span>`;
        } else {
            infoDiv.innerText = 'Hover over a country';
        }
    });

// Load country data
// Using a reliable GeoJSON source from Natural Earth via a CDN
fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson')
    .then(res => res.json())
    .then(countries => {
        world.polygonsData(countries.features);
    })
    .catch(err => {
        console.error("Error loading GeoJSON:", err);
    });

// Auto-rotate
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.5;
