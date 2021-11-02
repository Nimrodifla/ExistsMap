var EXITS = {}

function clearExits()
{
    EXITS = {};
}

function voteSubmitted(res)
{
    console.log(res);
    if (res == "200")
    {
        alert("Submitted!");
        location.reload();
    }
    else
        alert("There was an error...");
}

function submitVote()
{
    let gatesDropdown = document.getElementById('exitsDrop').value;
    let statesDropdown = document.getElementById('statesDrop').value;

    if (gatesDropdown != 0 && statesDropdown != -1)
    {
        httpGetAsync("/submition/" + gatesDropdown + "/" + statesDropdown, voteSubmitted);
    }
}

function addExitToDropdown(id)
{
    let dropdown = document.getElementById('exitsDrop');
    dropdown.innerHTML += '<option value="' + id + '">' + EXITS[id].name + '</option>\n';
}

function startLocatingUser()
{
    map.locate({watch: true, enableHighAccuracy: true}) /* This will return map so you can do chaining */
        .on('locationfound', function(e){
            L.marker([e.latitude, e.longitude]).addTo(map);
        })
        .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });
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
        addExitToDropdown(obj['id']);
    }

    initMap();
    //startLocatingUser();

    //console.log(json);
}

function updateExits()
{
    httpGetAsync("/exits", updateExitsCallback);
}

// define icons
const ICON_SIDE = 100;

var blockedIcon = L.icon({
    iconUrl: './Icons/blocked.gif',
    iconSize: [ICON_SIDE, ICON_SIDE],
    iconAnchor: [ICON_SIDE / 2, ICON_SIDE]
});

var openIcon = L.icon({
    iconUrl: './Icons/open.png',
    iconSize: [ICON_SIDE, ICON_SIDE],
    iconAnchor: [ICON_SIDE / 2, ICON_SIDE]
});

var unknownIcon = L.icon({
    iconUrl: './Icons/unknown.png',
    iconSize: [ICON_SIDE, ICON_SIDE],
    iconAnchor: [ICON_SIDE / 2, ICON_SIDE]
});


var ICONS = [blockedIcon, openIcon, unknownIcon];

let mapOptions = {
    center:[32.85805, 35.25939],
    zoom:20
}

var map = new L.map('map', mapOptions);

L.imageOverlay('./Icons/border.png', [[32.85942, 35.25726], [32.85679, 35.26148]]).addTo(map);

let layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

function addExit(num, name, coords, state) // 0 = blocked, 1 = open
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