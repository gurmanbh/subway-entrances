(function(){
	var subwaylinestatus = {
		"A":'inactive',
		"C":'inactive',
		"E":'inactive',
		"B":'inactive',
		"D":'inactive',
		"F":'inactive',
		"M":'inactive',
		"G":'inactive',
		"L":'inactive',
		"J":'inactive',
		"Z":'inactive',
		"N":'inactive',
		"R":'inactive',
		"Q":'inactive',
		"1":'inactive',
		"2":'inactive',
		"3":'inactive',
		"4":'inactive',
		"5":'inactive',
		"6":'inactive',
		"7":'inactive',
		"S":'inactive',
		'totalActive':0
	}

	var selected_lines = [];
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

		//click listener for the buttons

		$('.button').on('click',function(){
			var which_button = $(this).attr('data-which');
			if ($(this).hasClass('active')){
				$(this).removeClass('active');
				subwaylinestatus.totalActive--;
				subwaylinestatus[which_button]='inactive';
			}
			else {
				$(this).addClass('active');
				subwaylinestatus.totalActive++; 
				subwaylinestatus[which_button]='active';
			}

		});		

		//define function for cooking filtered list

		$('#bakebutton').on('click',function(){
			selected_lines=[];

			//create a list of selected lines

			for (var check in subwaylinestatus){
				if (subwaylinestatus [check]=='active'){
					selected_lines.push(check);
				}
			}

			cook();



		});

		function cook(){

			$('#canvas').html('')

			var filtered_entrances=subwayStations.filter (function(subwayStation){
					return _.contains(subwayStation.linelist, selected_lines[0]);
				});

			for (var i=1; i < selected_lines.length; i++){
				filtered_entrances = filtered_entrances.filter (function(subwayStation){
					return _.contains(subwayStation.linelist, selected_lines[i]);
				});
			}

			if (filtered_entrances.length==0){
				$('#canvas').html('<div class = "none"> A station of that calibre does not exist in New York City. </div>');
			}

			filtered_entrances.forEach(function(subwayStation){
			$('#canvas').append("<div class = 'row'>" + "<h1>"+ subwayStation.name +'</h1>' + '<p>'
				+subwayStation.linelist.join(' - ')+'</p>'+'</div>');
			// $('#canvas').append("<div class = 'row'>" + "<h1>"+ subwayStation.name +'</h1>' + '<p>'+ 
			// 	for (i=0, i<subwayStation.linelist.length, i++)

			// 	+'</p>'+'</div>');
			
		});

		// console.log(subwayStations.length);
		// console.log (filtered_entrances.length);

		}


	});


}).call(this);