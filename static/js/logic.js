// Link for USGS Dataset: All Earthquakes in the Past Week
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Retrieve Data & Draw Circles Depending For Each Earthquake Depending On Intensity
d3.json(link).then(function(response){

    //Fill Array of Arrays & Initialize Circle Color
    for (var i = 0; i < response.features.length; i++) {
    var place = response.features[i].properties.place
    var mag = response.features[i].properties.mag
    var location = [response.features[i].geometry.coordinates[0], response.features[i].geometry.coordinates[i]]
    var depth = [response.features[i].geometry.coordinates[2]
    var circleFill;

	console.log(location);
	
		//Set Circle Fill Color By Depth
		if(depth > 5){
			circleFill = "black"; 
		}
		if(depth >= 5 & depth <5){
			circleFill = "red";
		}
		if(depth >= 3 && depth < 4){
			circleFill = "orange";
		}
		if(depth >= 2 && depth < 3){
			circleFill =  "yellow";
		}
		if(depth >= 1 && depth < 2){
			circleFill = "FFFF99";
		}
		if(depth < 1){
			circleFill = "white";
		}


	//Create Earthquake Circles 
	var earthquake = L.circleMarker(location, {
		color: "pink",
		fillColor: circleFill,
		radius: mag * 10
    });
							

	//Initialize Map
	var myMap = L.map("map", {
    	center: [0 , 0],
    	zoom: 2,
    	layers: [sateliteMap, earthquakes]
	});

	//Regular Map
	var sateliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: "mapbox.satellite",
		accessToken: API_KEY
	});

	//Dark Map
	var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
	});
  
	//Add Layers
	var baseMaps = {
      "Satelite Map": sateliteMap,
      "Dark Map": darkMap
	}

	//Toggle Menu
	L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
	//Legend
	var legend = L.control({position: 'bottomright'});
	legend.addTo(myMap);

	//Add Earthquakes
	earthquake.addTo(myMap);

});