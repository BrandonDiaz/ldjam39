window.levels = [
	{
		name: 'Dimsburg',
		height: 3,
		width: 5,
		x: -370,
		y: 120,
		tips: [
			'First thing\'s first, your job is to route power from the generator to the residents of each town.',
			'The numbers above each home show their current and required amounts of power.',
			'The number displayed above the generator is the amount of power available in this sector.',
			'You can redistribute power using the tools displayed at the bottom of your screen.',
			'Try selecting the power lines. It\'s the only one, so it shouldn\'t be too hard.'
		],
		tools: [
			{
				type: 'cables',
				count: 7
			}
		],
		entities: [
			{
				type: 'tree-single',
				x: 2,
				y: 1
			},
			{
				type: 'house',
				x: 0,
				y: 0,
				input: 6
			},
			{
				type: 'house',
				x: 3,
				y: 0,
				input: 6
			},
			{
				type: 'generator',
				x: 4,
				y: 2,
				output: 12
			}
		]
	},
	{
		name: 'Nocturnia',
		height: 8,
		width: 8,
		x: -145,
		y: 180,
		tips: [
			'Another simple one, lets get these folks up and running.',
			'I\'m sure they understand that we\'re out here doing our best!',
			'Oh.. wait, no. They aren\'t understanding that at all.'
		],
		tools: [
			{
				type: 'cables',
				count: 17
			}
		],
		entities: [
			{
				type: 'tree-single',
				x: 4,
				y: 1
			},
			{
				type: 'tree-single',
				x: 0,
				y: 6
			},
			{
				type: 'tree-tiered',
				x: 1,
				y: 1
			},
			{
				type: 'tree-tiered',
				x: 6,
				y: 5
			},
			{
				type: 'house',
				x: 3,
				y: 5,
				input: 4
			},
			{
				type: 'house',
				x: 2,
				y: 7,
				input: 4
			},
			{
				type: 'house',
				x: 3,
				y: 0,
				input: 4
			},
			{
				type: 'generator',
				x: 4,
				y: 2,
				output: 12
			}
		]
	},
	{
		name: 'Darkington',
		height: 6,
		width: 8,
		x: -255,
		y: 275,
		tips: [
			'These homes have more efficient wiring, requiring less power than others.',
			'Luckily for us, there are a few resistor towers nearby.',
			'Go ahead and select it from your tool bar. I\'ll wait.',
			'Because I have to.'
		],
		tools: [
			{
				type: 'cables',
				count: 11
			},
			{
				type: 'resistor',
				count: 1
			}
		],
		entities: [
			{
				type: 'tree-single',
				x: 1,
				y: 2
			},
			{
				type: 'tree-tiered',
				x: 2,
				y: 1
			},
			{
				type: 'tree-single',
				x: 2,
				y: 4
			},
			{
				type: 'tree-single',
				x: 4,
				y: 1
			},
			{
				type: 'tree-tiered',
				x: 5,
				y: 0
			},
			{
				type: 'tree-single',
				x: 5,
				y: 5
			},
			{
				type: 'tree-tiered',
				x: 0,
				y: 4
			},
			{
				type: 'tree-tiered',
				x: 5,
				y: 3
			},
			{
				type: 'house',
				x: 2,
				y: 0,
				input: 8
			},
			{
				type: 'house',
				x: 1,
				y: 5,
				input: 2
			},
			{
				type: 'house',
				x: 6,
				y: 3,
				input: 2
			},
			{
				type: 'house',
				x: 6,
				y: 1,
				input: 8
			},
			{
				type: 'generator',
				x: 3,
				y: 2,
				output: 24
			}
		]
	},
	{
		name: 'Shadowsgrad',
		height: 7,
		width: 8,
		x: 0,
		y: 345,
		tips: [
			'You\'ll need to use more than one resistor on this one.',
			'Sometimes it helps to run your power lines first, then swap in resistors.'
		],
		tools: [
			{
				type: 'cables',
				count: 22
			},
			{
				type: 'resistor',
				count: 3
			}
		],
		entities: [
			{
				type: 'tree-single',
				x: 0,
				y: 6
			},
			{
				type: 'tree-single',
				x: 1,
				y: 3
			},
			{
				type: 'tree-single',
				x: 4,
				y: 3
			},
			{
				type: 'tree-single',
				x: 7,
				y: 6
			},
			{
				type: 'tree-tiered',
				x: 2,
				y: 1
			},
			{
				type: 'tree-tiered',
				x: 2,
				y: 5
			},
			{
				type: 'tree-tiered',
				x: 6,
				y: 4
			},
			{
				type: 'house',
				x: 2,
				y: 6,
				input: 20
			},
			{
				type: 'house',
				x: 3,
				y: 5,
				input: 6
			},
			{
				type: 'house',
				x: 3,
				y: 0,
				input: 6
			},
			{
				type: 'house',
				x: 6,
				y: 0,
				input: 1
			},
			{
				type: 'house',
				x: 7,
				y: 4,
				input: 1
			},
			{
				type: 'generator',
				x: 1,
				y: 2,
				output: 48
			}
		]
	},
	{
		name: 'Murkshire',
		height: 6,
		width: 9,
		x: 130,
		y: 425,
		tips: [
			'This town appears to be very.. sticky.',
			'Most of the nearby hardware is corroded and useless.'
		],
		tools: [
			{
				type: 'cables',
				count: 9
			},
			{
				type: 'resistor',
				count: 5
			}
		],
		entities: [
			{
				type: 'tree-single',
				x: 2,
				y: 3
			},
			{
				type: 'tree-single',
				x: 6,
				y: 4
			},
			{
				type: 'tree-single',
				x: 7,
				y: 0
			},
			{
				type: 'tree-tiered',
				x: 1,
				y: 1
			},
			{
				type: 'tree-tiered',
				x: 7,
				y: 3
			},
			{
				type: 'tree-tiered',
				x: 8,
				y: 5
			},
			{
				type: 'house',
				x: 4,
				y: 0,
				input: 14
			},
			{
				type: 'house',
				x: 7,
				y: 2,
				input: 18
			},
			{
				type: 'house',
				x: 2,
				y: 0,
				input: 18
			},
			{
				type: 'house',
				x: 4,
				y: 4,
				input: 1
			},
			{
				type: 'house',
				x: 4,
				y: 5,
				input: 1
			},
			{
				type: 'house',
				x: 0,
				y: 3,
				input: 7
			},
			{
				type: 'generator',
				x: 4,
				y: 2,
				output: 80
			}
		]
	},
	{
		name: 'Gloomville',
		height: 6,
		width: 9,
		x: -70,
		y: 495,
		tips: [
			'This town has a secondary generator pulling from a nearby substation.',
			'Connecting multiple power sources to a home will merge the power totals.'
		],
		tools: [
			{
				type: 'cables',
				count: 19
			},
			{
				type: 'resistor',
				count: 3
			}
		],
		entities: [
			{
				type: 'tree-single',
				x: 2,
				y: 1
			},
			{
				type: 'tree-single',
				x: 5,
				y: 3
			},
			{
				type: 'tree-single',
				x: 8,
				y: 1
			},
			{
				type: 'tree-single',
				x: 4,
				y: 5
			},
			{
				type: 'tree-tiered',
				x: 0,
				y: 1
			},
			{
				type: 'tree-tiered',
				x: 3,
				y: 2
			},
			{
				type: 'tree-tiered',
				x: 1,
				y: 4
			},
			{
				type: 'house',
				x: 7,
				y: 1,
				input: 6
			},
			{
				type: 'house',
				x: 3,
				y: 1,
				input: 6
			},
			{
				type: 'house',
				x: 3,
				y: 3,
				input: 14
			},
			{
				type: 'house',
				x: 0,
				y: 5,
				input: 6
			},
			{
				type: 'house',
				x: 6,
				y: 5,
				input: 2
			},
			{
				type: 'house',
				x: 8,
				y: 4,
				input: 2
			},
			{
				type: 'generator',
				x: 2,
				y: 2,
				output: 32
			},
			{
				type: 'generator',
				x: 6,
				y: 2,
				output: 16
			}
		]
	},
	{
		name: 'Fogsborough',
		height: 7,
		width: 10,
		x: -280,
		y: 575,
		tips: [
			'The power distribution here looks chaotic..',
			'It\'s like the city planner ran out of time and ideas.',
			'I\'m sure you can figure it out with trial and error!'
		],
		tools: [
			{
				type: 'cables',
				count: 36
			},
			{
				type: 'resistor',
				count: 3
			}
		],
		entities: [
			{
				type: 'tree-single',
				x: 5,
				y: 0
			},
			{
				type: 'tree-single',
				x: 5,
				y: 4
			},
			{
				type: 'tree-single',
				x: 5,
				y: 6
			},
			{
				type: 'tree-single',
				x: 6,
				y: 5
			},
			{
				type: 'tree-tiered',
				x: 2,
				y: 2
			},
			{
				type: 'tree-tiered',
				x: 3,
				y: 5
			},
			{
				type: 'tree-tiered',
				x: 7,
				y: 4
			},
			{
				type: 'house',
				x: 1,
				y: 1,
				input: 22
			},
			{
				type: 'house',
				x: 8,
				y: 1,
				input: 10
			},
			{
				type: 'house',
				x: 3,
				y: 4,
				input: 6
			},
			{
				type: 'house',
				x: 0,
				y: 6,
				input: 12
			},
			{
				type: 'house',
				x: 5,
				y: 5,
				input: 2
			},
			{
				type: 'house',
				x: 7,
				y: 5,
				input: 3
			},
			{
				type: 'house',
				x: 9,
				y: 4,
				input: 3
			},
			{
				type: 'generator',
				x: 1,
				y: 3,
				output: 24
			},
			{
				type: 'generator',
				x: 4,
				y: 3,
				output: 16
			},
			{
				type: 'generator',
				x: 8,
				y: 3,
				output: 32
			}
		]
	},
];