// pad(n: int, width: int, z: int
// n: number we are padding
// width: maximum width we are padding to
// z: character we are padding with 
function pad(n, width, z = 0)
{
	// Convert input number to a string
	n = n + '';
	
	// Return the padded number as a string
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// load_table(void): void
// Renders the table rows for each type to the screen
function load_types()
{
	// Dereference the table object
	let table = document.getElementById('table-coverage');
	
	// Current row in the table we are working with
	// Used to designate the id given to each row
	let i = 0;
	
	// Iterate over each type
	for (const type in types)
	{
		// Generate the row for the new type
		let row = "<tr id='row-" + i + "'><td><img src='img/type/sm/" + type + ".png'></img></td>" + 
			"<td id='" + i + "-0'> 0 </td>" + 
			"<td id='" + i + "-1'> 0 </td>" +
			"<td id='" + i + "-2'> 0 </td>" +
			"<td id='" + i + "-3'> 0 </td>" +
			"<td id='" + i + "-4'> 0 </td>" +
			"<td id='" + i + "-5'> 0 </td>" +
			"<td id='" + i + "-rating'> No Rating </td>" +
			"</tr>";
			
		// Add the new row to the table
		table.innerHTML += row;
		
		// Increment the current row
		i++;
	}
}

// add_pokemon(void): void
// Adds a new pokemon selection tab to the window
function add_pokemon()
{
	// Dereference the table object
	let table = document.getElementById('table-pkmn');
	
	// Dereference the pokemon_count object, 
	// and increment it after assignment
	let id = document.pokemon_count++;
	
	// Create the data row
	let data = document.createElement('tr');
	
	// Set the data row id
	data.id = 'pkmn-' + id + '-info';
	
	// Set the data row content
	data.innerHTML = "<td><img id='pkmn-" + id + "-sprite' src='img/box/Egg.png'></img></td>" + 
		"<td><div>"+
			"<input id='pkmn-species-" + id + "' class='form-control' type=text name='pkmn-species-" + id + "' placeholder='Species' onChange='update(" + id + ")'>" +
			"<input id='pkmn-ability-" + id + "' class='form-control mt-2' type=text name='pkmn-ability-" + id + "' placeholder='Ability' onChange='update(" + id + ")'>" +
		"</div></td>"; 
		
	// Add the data row to the form
	table.appendChild(data);
		
	// Create the moves selection row
	let move = document.createElement('tr');
	
	// Set the move row id
	move.id = 'pkmn-' + id + '-move';
	
	// Set the move row content
	move.innerHTML = "<td><div class=''>" + 
		"<td><input id='pkmn-move1-" + id + "' class='form-control' type=text name='pkmn-move1-" + id + "' placeholder='Move 1' onChange='update(" + id + ")'>" +
		"<input id='pkmn-move2-" + id + "' class='form-control' type=text name='pkmn-move2-" + id + "' placeholder='Move 2' onChange='update(" + id + ")'>" +
		"<input id='pkmn-move3-" + id + "' class='form-control' type=text name='pkmn-move3-" + id + "' placeholder='Move 3' onChange='update(" + id + ")'>" +
		"<input id='pkmn-move4-" + id + "' class='form-control' type=text name='pkmn-move4-" + id + "' placeholder='Move 4' onChange='update(" + id + ")'>" +
		"</div></td>";
	
	// Add the move row to the form
	table.appendChild(move);
		
	// Create the control row
	let ctrl = document.createElement('tr');
	
	// Set the control row id
	ctrl.id = 'pkmn-' + id + '-ctrl';
	
	// Set the control row content
	ctrl.innerHTML = "<td colspan=2><div class='row'>" + 
		"<button id='pkmn-rmov-" + id + "' class='col btn btn-danger ml-3 mr-1 mt-1' onClick='rmv_pokemon(" + id + ")'>Remove Pokemon</button>" + 
		"<button id='pkmn-hide-" + id + "' class='col btn btn-warning mr-3 ml-1 mt-1' onClick='toggle_moves(" + id + ")'>Show Moves</button>" + 
		"</div></td>";
		
	// Add the control row to the form
	table.appendChild(ctrl);
	
	// Hide the moves from the form to save space by default
	toggle_moves(id);
	
	// Add the autocomplete functions to the form
	
	// Species Autocomplete
	$('#pkmn-species-' + id).autocomplete({
		nameProperty: 'name',
		valueProperty: 'value',
		dataSource: document.pokedex_lookup,
		filterOn:'input'
	});
	
	// Ability Autocomplete
	$('#pkmn-ability-' + id).autocomplete({
		nameProperty: 'name',
		valueProperty: 'value',
		dataSource: document.abilities_lookup,
		filterOn:'input'
	});
	
	// Moves Autocomplete
	for(let i=1; i <= 4; i++)
	{
		$('#pkmn-move' + i + '-' + id).autocomplete({
			nameProperty: 'name',
			valueProperty: 'value',
			dataSource: document.moves_lookup,
			filterOn:'input'
		});
	}
}

// rmv_pokemon(id: int): void
// Removes the pokemon selection tab from the window
function rmv_pokemon(id)
{
	// Remove the related elements from the form
	document.getElementById('pkmn-' + id + '-info').remove();
	document.getElementById('pkmn-' + id + '-move').remove();
	document.getElementById('pkmn-' + id + '-ctrl').remove();
	
	// Update the table
	update();
}

// hide_moves(id: int): void
// Hides the selected pokemon tab from the form to save space
function hide_moves(id)
{
	// Hide the moves display of the pokemon
	document.getElementById('pkmn-' + id + '-move').style.display = 'none';
	
	// Update the hide-moves button to be a show-moves button
	let toggle = document.getElementById('pkmn-hide-' + id);

	// Set the display text on the button
	toggle.innerHTML = 'Show Moves';
}

// hide_moves(id: int): void
// Shows the selected pokemon tab on the form
function show_moves(id)
{
	// Hide the moves display of the pokemon
	document.getElementById('pkmn-' + id + '-move').style.display = 'table-row';
	
	// Update the hide-moves button to be a show-moves button
	let toggle = document.getElementById('pkmn-hide-' + id);

	// Set the display text on the button
	toggle.innerHTML = 'Hide Moves';
}

// toggle_moves(id: int): void
// Depending on the current style 
function toggle_moves(id)
{
	// Dereference the move control tab
	let elem = document.getElementById('pkmn-' + id + '-move');
	
	// If the element is currently hidden
	if (elem.style.display == 'none')
	{
		// Run the display routine
		show_moves(id);
	}
	else // Element is currently displayed
	{
		// Run the hide routine
		hide_moves(id);
	}
}

// verify_sprite(img: element): void
// Given an (image) element, verify
// that the image has been rendered
// successfully.
function verify_sprite(img)
{
    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.
    if (img.naturalWidth === 0) {
        return false;
    }

    // No other way of checking: assume it’s ok.
    return true;
}

// get_sprite(id: int): void
// Given a pokemon id, (attempt to) 
// update the sprite displayed in 
// the sprite box for the given pokemon.
function set_sprite(id)
{
	// Search for a pokemon object with the same name as the search criteria
	lookup = name_lookup(document.getElementById('pkmn-species-' + id).value,pokedex);

	// Dereference the sprite object for the pokemon
	let sprite = document.getElementById("pkmn-" + id + "-sprite");

	// If the search was successful
	if (lookup)
	{
		// Dereference the pokemon's number
		// We will need this to find the sprite
		
		// If it is not 3 digits, pad it with
		// zeros until it is and convert it into
		// a string
		let num = pad(lookup.num,3,0);
		
		// Switch on the different formes
		switch(lookup.forme)
		{
			// Gigantamax
			case 'Gmax': num += 'Gi'; break;
			
			// Therian
			case 'Therian': num += 'T'; break;
		}
		
		// Generate the filename
		let filename = "img/box/" + num + ".png";

		// Set the sprite source to the generated image name
		sprite.src = filename;
		
		// If the sprite is verified successfully
		if (verify_sprite(sprite))
		{
			// Script has worked as expected, return true
			return true
		}
		else
		{
			// No need to do anything
		}
	}
	else
	{
		// No need to do anything
	}
	
	// If we make it here, sprite has not been configured
	
	// Set it to the default egg sprite
	sprite.src="img/box/Egg.png";
	
	// False indicates sprite was not set properly
	return false;
}

// function get_combo_coverage(types: list): object
// Given a list object containing two or less types,
// calculates the weaknesses and resistances of the 
// type or type combination.
// 0: immune, 1: 4x resist, 2: resist, 3: neutral, 4: weak, 5: 4x weak
function get_coverage(types)
{
	// Generate a map for the combo coverage
	
	// Rows 0-6 are used
	// Row 7 is there for padding
	
	let map = get_map(document.typeCount,6);
	
	// Iterate over the types in the combo
	for (let type of types)
	{
		// Dereference the type id from the types map
		let t_index = document.typeMap[type];
				
		// Dereference the type info from the types data
		let target = document.types[type];
				
		// Iterate over other types
		for (source in target.damageTaken)
		{
			// Dereference the source index from the types map
			let s_index = document.typeMap[source];
					
			// If the current source is not a type
			if (s_index == undefined)
			{
				// Cancels out other effects (status conditions, etc.)
			}
			else // The current source is a type
			{
				// 0: normal
				// 1: weak
				// 2: resist
				// 3: immune
						
				// Dereference the type of damage taken from the target
				damage = target.damageTaken[source];
						
				// Switch case on damage taken
				switch(damage)
				{
					
					// Normal Damage
					case 0:
					
						// Increment the neutral index
						map[s_index][3]++;
						
					break;
					
					// Hits for weakness
					case 1:

						// Increment the weak index
						map[s_index][4]++;

					break;
					
					// Hits for resistance
					case 2:
						
						// Increment the resist index
						map[s_index][2]++;
						
					break;
					
					// Is immune
					case 3:

						// Increment the immune index
						map[s_index][0]++;

					break;
				}
			}
		}
	}
	
	// Iterate over the rows in the map
	for(let x=0; x<map.length; x++)
	{
		// Dereference the row
		let row = map[x];
		
		// If there are any immunities, zero out the rest of the fields
		if (row[0] > 0)
		{
			// Set it to one
			row[0] = 1;
			
			// Zero out weak, resist, neutral
			row[2] = row[3] = row[4] = 0;
		}
		// If there are two weaknesses, zero the weaknesses field and make it a 4x weakness
		else if (row[2] == 2)
		{
			// Set 4x resist to 1
			row[1] = 1;
			
			// Set 2x resist to 0
			row[2] = 0;
		}
		
		// If there are two resistances, zero the resistance field and make it a 4x resistance
		else if (row[4] == 2)
		{
			// Set 4x resist to 1
			row[5] = 1;
			
			// Set 2x resist to 0
			row[4] = 0;
		}
		
		// If there is two neutral types, OR
		// If there is one weakness and one resistance, zero out weakness and resistance and make it neutral
		else if (row[3] == 2 || row[2] == row[4])
		{
			// Set neutral to 1
			row[3] = 1;
			
			// Set weak and resist to 0
			row[2] = row[4] = 0;
		}
		
		// Otherwise, the type either singularly is weak or resists, set neutral to 0
		else 
		{
			// Set neutral to 0
			row[3] = 0;
		}
	}

	// Return the map to the handling process
	return map;
}

// function get_table_defensive(types: list): list[]
// Given a list of types, returns the defensive values
// Which should be inserted into the display table.
function get_table_defensive(types)
{
	// X Value: Number of different types
	// Y Value: Number of columns (Excl. Type Logo)
	let map = get_map(document.typeCount, 6);
	
	// Iterate over the list of types provided
	for (combo of types)
	{
		// Generate the map 
		let combo_map = get_coverage(combo);
		
		// Add the two maps together
		map = add_map(map,combo_map);
	}
	
	console.log(map);
	
	// Return the generated map to the calling process
	return map;
}

// function get_table_offensive(types: list): list[]
// Given a list of types, returns the offensive values
// Which should be inserted into the display table.
function get_table_offensive(types)
{
	// X Value: Number of different types
	// Y Value: Number of columns (Excl. Type Logo)
	let map = get_map(document.typeCount, 7);
	
	// Return the generated map to the calling process
	return map;
}

function evaluate_row(row)
{
	// ROW INDEXES:
	// 0: immunities
	// 1: 4x resists
	// 2: 2x resists
	// 3: neutrals
	// 4: 2x weaks
	// 5: 4x weaks
	// 6: rating
	
	// This will serve as
	// a mathematical rating
	// for how good your coverage
	// for the given type is.
	
	// Weights:
	// 4x resists and immunities add 2, regular resists add 1
	// 4x weaks remove 2, regular weaks remove 1
	// neutral hits neither add nor remove anything 
	
	// Return the calculated rating
	return 0 + (row[0] * 2) + (row[1] * 2) + row[2] - row[4] - (row[5] * 2);
}

// Given a map (list[]) object generated by the offensive
// or defensive table generation functions, inserts the 
// values into the display table on the page.
function populate_table(map)
{
	// iterate over map 'x'
	for(let i=0; i<map.length; i++)
	{
		// Iterate over map 'y'
		for(let j=0; j<map[i].length; j++)
		{
			// Dereference the row on the table
			document.getElementById(i + '-' + j).innerHTML = map[i][j];
		}
		
		// Get a mathematical rating of the row
		let rating = evaluate_row(map[i]);
		
		// Dereference the row we are looking at
		let elem_row = document.getElementById('row-' + i);
		
		// Dereference row element containing the rating
		let elem_rating = document.getElementById(i + '-rating');
	
		// If the rating is greater than or equal to two
		// Meaning that, we have 2 or more resistances than weaknesses
		if (rating >= 2)
		{
			// Very good coverage
			elem_rating.innerHTML = 'Very Good';
			
			// Row background dark green
			elem_row.style["background-color"] = '#ccffcc';
		}
		
		// If we have one more resistance than weaknesses
		else if (rating > 0)
		{
			// Good coverage
			elem_rating.innerHTML = 'Good';
			
			// Row background light green			
			elem_row.style["background-color"] = '#e6ffe6';
		}
		
		// If we have the same number of weaknesses and resistances
		else if (rating == 0)
		{
			// Even coverage
			elem_rating.innerHTML = 'Even';
			
			// Row background white
			elem_row.style["background-color"] = '#ffffff';
		}
		
		// If we have 2 or more weaknesses than resistances
		else if (rating <= -2)
		{
			// Very poor coverage
			elem_rating.innerHTML = 'Very Poor';
			
			// Row background dark red
			elem_row.style["background-color"] = '#ffcccc';
		}
		
		// If we have one more weakness than resistances
		else if (rating < 0)
		{
			// Poor Coverage
			elem_rating.innerHTML = 'Poor';
			
			// Row background light red
			elem_row.style["background-color"] = '#ffe6e6';
		}
		
		// Unknown Rating
		else
		{
			// No coverage
			elem_rating.innerHTML = 'Not Calculated';
			
			// Row background white
			elem_row.style["background-color"] = '#ffffff';
		}
	}
}

// update(id: int): void
// Given a pokemon id (which can be null),
// refreshes the calculations in the spreadsheet
// to reflect the updated Pokemon.

// If an ID is supplied, that Pokemon's sprite
// will be checked for an update (as it is new
// or has been modified) while the update is performed.
function update(id = null)
{
	// If the given id is null or undefined
	if(id == null || id == undefined)
	{
		// No need to update sprites
	}
	else
	{
		// Attempt to update sprite
		set_sprite(id);
	}
	
	// Array of all of the types
	// which are on the team so far
	// (Duplicates allowed)
	document.types_list = [];
	
	// Iterate over all of the elements which start with 'game-timer-'
	$("*[id*='pkmn-species-']").each(function(index, element){

		// Check to see if the value matches a Pokemon name
		let lookup = name_lookup(element.value,document.pokedex);
		
		// If a non-null value is returned
		if (lookup)
		{
			// Dereference the types
			let types = lookup.types;
			
			// Add the type combination to the list of types
			document.types_list.push(types);
		}
	});
	
	// If we are looking at the
	// defensive table
	if (document.active == 0)
	{
		// Generate the defensive coverage table
		document.defense = get_table_defensive(document.types_list);
		
		// Populate the displayed table using the defensive data
		populate_table(document.defense);
	}
	else // We are looking at the offensive table
	{
		// Generate the offensive coverage table
		document.offense = get_table_offensive(document.types_list);
		
		// Populate the displayed table using the offensive data
		populate_table(document.offense);
	}
}

// Code that runs once the page has loaded
$(document).ready(function(){
	
	// Initialise the document variables
	
	// Variable recording the unique id of
	// each pokemon added to the form - this
	// is required to reference the values of
	// each pokemon object uniquely
	document.pokemon_count = 0;
	
	// --- Data Files --- //
	
	// Pokedex document reference
	document.pokedex = pokedex;
	
	// Build the pokedex lookup array
	document.pokedex_lookup = autocomplete(pokedex);

	// Abilities document reference
	document.abilities = abilities;

	// Build the abilities lookup array
	document.abilities_lookup = autocomplete(abilities);
	
	// Moves document reference
	document.moves = moves;
	
	// Build the moves lookup array
	document.moves_lookup = autocomplete(moves);
	
	// Not strictly required, but makes sense as a reference
	document.types = types;
	
	// Reference of the number of types in the game
	document.typeCount = Object.keys(document.types).length;
	
	// Reference of the table index associated with each type
	document.typeMap = kv_map(document.types);

	// --- Program Variables --- //
	
	// 2D Array for building the defensive calculations table
	// Empty / undefined by default, is built during update
	document.defense = null
	
	// 2D Array for building the offensive calculations table
	// Empty / undefined by default, is built during update
	document.offense = null
	
	// Specifies which table is active
	// 0: Defense, 1: Offense
	document.active = 0;
	
	// --- Run Startup Scripts --- //
	
	// Load the type rows into the page
	load_types();
	
	// Add a default pokemon object to the form
	add_pokemon();
});