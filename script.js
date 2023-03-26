(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let ampm = " AM";

            if (h < 10) {
                h = "0" + h;
            }

            if (h > 12) {
                h = h - 12;
                ampm = " PM";
            }

            if (h == "00") {
                h = 12;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }


            c.innerHTML = h + ":" + m + ":" + s + ampm;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let summa = 0.0;

    let e = document.getElementById("delivery");
    e.innerHTML = summa + " &euro;";


    function estimateDelivery(event) {
        event.preventDefault();

        summa = 0.0;
        let fname = document.getElementById("fname");
        let  lname = document.getElementById("lname");
        let linn = document.getElementById("linn");

        if (fname.value === "") {
            alert("Palun sisestage nimi");
            fname.focus();
            return;
        }

        if (lname.value === "") {
            alert("Palun sisestage perekonnanimi");
            lname.focus();
            return;
        }

        for (const n of "0123456789") {
            if (fname.value.includes(n)) {
                alert("Eesnimi ei saa sisaldada numbreid!");
                fname.focus();
                return;
            }

            if (lname.value.includes(n)) {
                alert("Perekonnanimi ei saa sisaldada numbreid!");
                lname.focus();
                return;
            }
        }

        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");
            linn.focus();
            return;

        } else if (linn.value === "tln") {
            summa = summa + 0;

        } else if (linn.value === "trt") {
            summa = summa + 2.5;

        } else if (linn.value === "nrv") {
            summa = summa + 2.5;

        } else if (linn.value === "prn") {
            summa = summa + 3;

        }

        if (document.getElementById("v1").checked == true) {
            summa = summa + 5;
        }
        
        if (document.getElementById("v2").checked == true){
            summa = summa + 1;
        }

        if (document.getElementById("kiir").checked == true){
            summa = summa + 4;
        }

        e.innerHTML = summa + " &euro;";
        console.log("Tarne hind on arvutatud" + summa);
    }

})();

// map

let mapAPIKey = "Akxkf3zEl8N0bLGF1fedXeJZftO5WKT3JM3fLzrTtCQB2FHN585nF0eM9eRGEh0T";

let map;
let infobox;

function GetMap() {
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        58.77573426484009, 25.74735278882496
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: false
    });

    let point1 = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    infobox.setMap(map);

    let pushpin = new Microsoft.Maps.Pushpin(point1, {
        title: 'Tartu Ülikool'
    });
    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Ülikooli 18, 50090 Tartu'
    }

    let point2 = new Microsoft.Maps.Location(
        59.41982902222407, 24.65991615811689
    );

    let pushpin2 = new Microsoft.Maps.Pushpin(point2, {
        title: 'Tallinna loomaaed'
    });
    pushpin2.metadata = {
        title: 'Tallinna loomaaed',
        description: 'Paldiski maantee 145, Ehitajate tee 150, 13522 Tallinn'
    }

    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);

    map.entities.push(pushpin);
    map.entities.push(pushpin2);
}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE