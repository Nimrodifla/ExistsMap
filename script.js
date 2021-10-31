var EXITS = {}


// define icons

var blockedIcon = L.icon({
    iconUrl: './Icons/blocked.gif',
    iconSize: [100, 100],
    iconAnchor: [50, 100]
});

var ICONS = [blockedIcon]

let mapOptions = {
    center:[32.85857, 35.25957],
    zoom:20
}

var map = new L.map('map', mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

function addExit(num, name, coords, state) // 0 = blocked
{
    EXITS[num] = {name: name, pos: coords, state: state};
}

function initMap()
{
    for (const [key, val] of Object.entries(EXITS))
    {
        L.marker(val.pos, {icon: ICONS[val.state], title: val.name}).addTo(map);
    }
}

addExit(1, "שער הסעות",
[32.85769, 35.26105], 0);

addExit(2, "שער ספרייה",
[32.85813, 35.26036], 0);

addExit(3, 'שער י"ב',
[32.85852, 35.25739], 0);


initMap();