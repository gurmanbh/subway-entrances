(function(){

	/*

	url,name,line
	http://www.mta.info/nyct/service/,Smith St & Bergen St At Ne Corner (To Manhattan And Queens Only),F-G
	http://www.mta.info/nyct/service/,Court St & Montague St At Sw Corner,2-3-4-5-N-R
	http://www.mta.info/nyct/service/,Court St & Montague St At Sw Corner,2-3-4-5-N-R

	*/

	// An alternative to usind d3 would be to convert our csv to json and use jQuery's $.getJSON function.

	d3.csv('data/DOITT_SUBWAY_ENTRANCE_01_13SEPT2010.csv', function(error, subwayStations){
		// console.log(error, subwayData);

	// loop that cleans our data
		subwayStations.forEach(function(subwayStation){
			var delimiter = '(';
			var subway_station_name_parts = subwayStation.name.split(delimiter);
			var subway_direction = subway_station_name_parts[1];


			if (subway_direction){
				subway_direction = subway_direction.replace(/\)/g, '');
				subwayStation.direction = subway_direction;
			}

			// replace the name with name minus direction

			subwayStation.name = subway_station_name_parts[0].trim();

		 	// Make a new column that is our line column but as an array of lines
		 	
		 	subwayStation.linelist = subwayStation.line.split('-');

		 	// $('#canvas').append("<div class = 'row'>"+subwayStation.name + ', '+subwayStation.direction + ' ' + subwayStation.linelist.join(' - ')+'</div>');

			
		});

		var filtered_entrances = subwayStations.filter (function(subwayStation){
			return ((_.contains(subwayStation.linelist, '2')) && (
				_.contains(subwayStation.linelist, '3'))) || ((_.contains(subwayStation.linelist, 'A')) && (_.contains(subwayStation.linelist, 'C')));
			// return subwayStation.lineList.indexOf('2') != -1;
		});

		filtered_entrances.forEach(function(subwayStation){
			$('#canvas').append("<div class = 'row'>" + "<h1>"+ subwayStation.name +'</h1>' + '<p>'
				+subwayStation.linelist.join(' - ')+'</p>'+'</div>');
			// $('#canvas').append("<div class = 'row'>" + "<h1>"+ subwayStation.name +'</h1>' + '<p>'+ 
			// 	for (i=0, i<subwayStation.linelist.length, i++)

			// 	+'</p>'+'</div>');
			
		});

		console.log(subwayStations.length);
		console.log (filtered_entrances.length);

	});


}).call(this);