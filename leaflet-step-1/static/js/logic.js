// Creating map object
var myMap = L.map("map", {
    center: [40.7, -73.95],
    zoom: 5
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
            color = "#bcff05";
        }else if (depth < 50) {
            color = "#ff8205";
        }else if (depth < 70) {
            color = "#ff3305";
        }else if (depth < 90) {
            color = "#ff0505";
        }else{ color = "#82ff05";}
    
        return color;
    }

//     // setting radius from magnitude
    // function getRadius(magnitude) {
    //     if (magnitude === 0) {
    //         return 1;
    //     }
    //     return magnitude * 20000;
    // }

//     // creating GEOjson layer
    L.geoJson(data, {
        //create circle marker
        pointToLayer: function(features, coordinates) {
            return L.circleMarker(coordinates, {
                color: "#000",
                weight: 1,
                fillColor: getColor(features.geometry.coordinates[2]),
                fillOpacity:0.8,
                radius: features.properties.mag *5
            }).bindPopup("Place:" + features.properties.place + "<br>Location:" + features.geometry.coordinates + "<br>Magnitude:" + features.properties.mag);
        }
    }).addTo(myMap);

})
// LEGEND






// d3.json(url, data=> {
//     console.log(data);
//     var features = [];
//     data.features.forEach(element=> {
//         features.push({
//             "location": element.geometry.coordinates,
//             "place": element.properties.place,
//             "magnitude": element.properties.mag
//         });
//     });
// console.log(features);
// }).addTo(myMap);





// Creating function 
// d3.json(url, function(data) {
//     function collectionInfo(features) {
//         return {
//             fillOpacity: 0.75,
//             color: "black",
//             fillColor: getColor(features.geometry.coordinates[2]),
//             radius: getRadius(features.properties.mag),
//             stroke: true,
//             weight: 0.25
//         };
//     }

//     // setting color from depth
//     function getColor(depth) {
//         switch (true) {
//             case depth > 90:
//                 return "#ff0505";
//             case depth > 70:
//                 return "#ff3305";
//             case depth > 50:
//                 return "#ff8205";
//             case depth > 30:
//                 return "#ffda05";
//             case depth > 10:
//                 return "#bcff05";
//             default:
//                 return "#82ff05";
//         }
//     }

//     // setting radius from magnitude
//     function getRadius(magnitude) {
//         if (magnitude === 0) {
//             return 1;
//         }
//         return magnitude * 4;
//     }

//     // creating GEOjson layer
//     L.geoJson(data, {
//         //create circle marker
//         pointToLayer: function(features, coordinates) {
//             return L.circleMarker(coordinates);
//         },

//         style: collectionInfo,

//         // popup for each marker
//         onEachFeature: function(features, layer) {
//             layer.bindPopup("Place:" + features.properties.place + <br> "Location:" + features.geometry.coordinates </br> + <br> "Magnitude:" + features.properties.mag </br>)
//         }
//     }).addTo(myMap);

// });