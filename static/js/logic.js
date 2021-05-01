// Link for USGS Dataset: All Earthquakes in the Past Week
var geolink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Retrieve Data & Execute Script
d3.json(geolink).then(function(response){

	console.log(data);

    //Organize Objects From JSON Response Into Variables
    for (var i = 0; i < response.features.length; i++) {
    var place = response.features[i].properties.place
    var mag = response.features[i].properties.mag
    var location = [response.features[i].geometry.coordinates[0], response.features[i].geometry.coordinates[1]]
    var depth = [response.features[i].geometry.coordinates[2]]
	}

		//Set Circle Fill Color By Depth (Range 0-300)
		if(depth > 250){
			var circleFill = "black"; 
		}
		if(depth >= 150 & depth < 250){
			var circleFill = "gray";
		}
		if(depth >= 100 && depth < 150){
			var circleFill = "red";
		}
		if(depth >= 5 && depth < 100){
			var circleFill =  "orange";
		}
		if(depth >= 0 && depth < 5){
			var circleFill = "yellow";
		}
		if(depth < 0){
			var circleFill = "green";
		}

	//Create Earthquake Circles 
	var earthquakes = L.circleMarker(location, {
		color: "black",
		fillColor: circleFill,
		opacity: 0.5,
		//Account for earthquakes with magnitude=0
		radius: ((mag + 1) ** 2) 
    	});

	//Regular Map
	var sateliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		tileSize: 500,
		maxZoom: 18,
		zoomOffset: -1,
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

	//Regular & Dark Map Combined
	var baseMaps = {
  	"Satelite Map": sateliteMap,
  	"Dark Map": darkMap
	}

	//Put It All Together Into 1 Map With Layers
	var myMap = L.map("map", {
		//Philadelphia Coordinates
		center: [39.9526, 75.1652],
		zoom: 2,
		layers: [baseMaps, earthquakes]
	});

	//Add Toggle Menu
	L.control.layers(baseMaps, overlayMaps, {
  		collapsed: false
	}).addTo(myMap);

	//Add Legend
	var legend = L.control({position: 'bottomright'});
	legend.addTo(myMap);

});

//TODO Add PoUp Markers
