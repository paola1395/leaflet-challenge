// Creating map object
var myMap = L.map("map", {
    center: [-9.21, 49.53],
    zoom: 3
  });

// Streetmap base layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store API endpoint
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Create the createMap function
d3.json(url, data=> {
    console.log(data);

     // setting color from depth
    function getColor(depth) {
        if (depth < 10) {
            color = "#bcff05";
        }else if (depth < 30) {
            color = "#ffff05";
        }else if (depth < 50) {
            color = "#ff8205";
        }else if (depth < 70) {
            color = "#ff3305";
        }else if (depth < 90) {
            color = "#ff0505";
        }else{ color = "#54ff05";}
    
        return color;
    }

//     // creating GEOjson layer
    L.geoJson(data, {
        //create circle marker
        pointToLayer: function(features, coordinates) {
            return L.circleMarker(coordinates, {
                color: "#000",
                weight: 1,
                fillColor: getColor(features.geometry.coordinates[2]),
                fillOpacity:0.8,
                radius: features.properties.mag *4
            }).bindPopup("Place: " + features.properties.place + "<br>Location: " + features.geometry.coordinates + "<br>Magnitude: " + features.properties.mag);
        }
    }).addTo(myMap);

    // LEGEND



    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var depths = [-10, 10, 30, 50, 70, 90];
        var labels = [];

            // Setting color for legend
        function chooseColor (d) {
            return d > 90 ? "#ff0505" : 
                d > 70 ? "#ff3305" :
                d > 50 ? "#ff8205" :
                d > 30 ? "#ffff05" :
                d > 10 ? "#bcff05" :
                "#54ff05";
        }

        // loop to create colored label for each depth
        for  (var i = 0; i < depths.length; i++) {
            div.innerHTML +=
            '<i style="background:' + labels.join("") + chooseColor(depths[i] + 1) + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');

        }

        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);
})