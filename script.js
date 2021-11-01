var EXITS = {}

function clearExits()
{
    EXITS = {};
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.response);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function updateExitsCallback(exits)
{
    clearExits();

    let json = JSON.parse(exits);
    for (let i = 0; i < json.length; i++)
    {
        let obj = json[i];
        addExit(obj['id'], obj['name'], [obj['coordx'], obj['coordy']], obj['state']);
    }

    initMap();

    //console.log(json);
}

function updateExits()
{
    httpGetAsync("/exits", updateExitsCallback);
}

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

L.imageOverlay('./Icons/border.png', [[32.85942, 35.25726], [32.85679, 35.26148]]).addTo(map);

let layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
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

updateExits();

//navigator.permissions.query({name:'geolocation'});

map.locate({watch: true, enableHighAccuracy: true}) /* This will return map so you can do chaining */
        .on('locationfound', function(e){
            L.marker([e.latitude, e.longitude]).addTo(map);
        })
        .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });