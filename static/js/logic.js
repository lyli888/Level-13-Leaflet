
// Link for USGS Dataset: Significant Earthquakes in the Past Month
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Retrieve Data
d3.json(link, function(data) {

    createMap(data.features);

});

function createMap(earthquakes) {

    // Define satelitemap and darkmap layers
    var sateliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
    });
  
    var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
  
    // baseMaps holds our base layers
    var baseMaps = {
      "Satelite Map": sateliteMap,
      "Dark Map": darkMap
    };
  
    // overlapMaps holds earthquake layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create Map; Load Layers
    var myMap = L.map("map", {
      center: [0 , 0],
      zoom: 2,
      layers: [sateliteMap, earthquakes]
    });
  
    // Control Layer 
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
    var legend = L.control({position: 'bottomright'});
      
    // Add Map Legend
    legend.addTo(myMap);
};