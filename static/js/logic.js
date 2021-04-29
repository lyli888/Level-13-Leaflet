// Initialize Map Variable
var map = L.map("map", {
    center: [],
    zoom: 2
  });

// Initialize Mapbox Map Tile Layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);


// Link for USGS Dataset: Significant Earthquakes in the Past Month
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Retrieve Data
d3.json(link, function(data) {

    createFeatures(data.features);

});

function createFeatures(earthquakeData) {

    var earthquakes = L.geoJSON(earthquakeData, {
    
   onEachFeature : function (feature, layer) {
  
      layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " +  feature.properties.mag + "</p>")
      },     pointToLayer: function (feature, latlng) {
        return new L.circle(latlng,
          {radius: markerSize(feature.properties.mag),
          fillColor: markerColor(feature.properties.mag),
          fillOpacity: 1,
          stroke: false,
      })
    }
    });
      
// Add Map Legend
legend.addto(Map);