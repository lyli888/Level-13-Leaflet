// Initialize Map
var map = L.map("map", {
    center: [],
    zoom: 2
  });


// Link for USGS Dataset: Significant Earthquakes in the Past Month
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(link, function(data) {



});

legend.addto(Map);