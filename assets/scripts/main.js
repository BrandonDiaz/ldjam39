window.timer      = 0;
window.level      = parseInt(window.localStorage.getItem('ld39_current_level')) || 1;
window.map        = null;
window.tick       = null;
window.tool       = null;
window.entities   = {};
window.tipQueue   = [];
window.tipTimer   = null;
window.chirpTimer = null;
window.music      = null;
window.mute       = {
	music: !!window.localStorage.getItem('ld39_mute_music') || false,
	sound: !!window.localStorage.getItem('ld39_mute_sound') || false
};

function gameLoop() {
	window.timer++;
	
	var min = Math.floor(window.timer / 60);
	var sec = window.timer - min * 60;
	
	// if (window.chirpTimer <= 0) {
	// 	if (window.chirps.length) {
	// 		var chirp = window.chirps.shift();
	// 		var house = $('.entity[type="house"]').get().sort(function(){
	// 			return Math.round(Math.random())-0.5
	// 		}).slice(0,1);
	//
	// 		$(house).append('<div class="chirp"><p>' + chirp.text + '<i>' + chirp.hash + '</i></p><span>' + chirp.user + '</span></div>');
	//
	// 		window.chirpTimer = Math.round(Math.random() * 30 + 30);
	// 	}
	// } else {
	// 	window.chirpTimer--;
	// }
	
	$('#game .time').text((min > 10 ? min : ('0' + min).slice(-2)) + ':' + ('0' + sec).slice(-2));
}

function checkTip(tip) {
	if (window.tips[tip]) {
		queueTips(window.tips[tip]);
		delete window.tips[tip];
	}
}

function queueTips(messages) {
	var queueSize = window.tipQueue.length;
	
	messages.forEach(function (message) {
		window.tipQueue.push(message);
	});
	
	if (!queueSize) {
		nextTip();
	}
}

function nextTip() {
	clearTimeout(window.tipTimer);
	
	$('#drone').attr('tip', '');
	
	if (window.tipQueue.length) {
		var message = window.tipQueue.shift();
		
		$('#drone').attr('tip', message);
		playSound('tip');
		
		window.tipTimer = setTimeout(function () {
			nextTip();
		}, 1000 + (60 * message.length));
	}
}

function unpowerEntities() {
	for (var coordinate in window.entities) {
		var entity = window.entities[coordinate];
		
		entity.power       = 0
		entity.powered     = entity.power == entity.input;
		entity.overpowered = entity.power > entity.input;
		
		if (entity.type != 'generator' && entity.output) {
			entity.output = 0;
		}
	}
}

function powerEntities() {
	unpowerEntities();
	
	for (var coordinate in window.entities) {
		var entity = window.entities[coordinate];

		if (entity.type == 'generator') {
			distributePower(entity);
		}
	}
}

function distributePower(entity) {
	var inputs = [];
	var sources = {
		north: 'south',
		south: 'north',
		east: 'west',
		west: 'east'
	};
	
	for (var dir in entity.links) {
		if (entity.links[dir] && dir != sources[entity.heading]) {
			var crawl = crawlCable(entity.x, entity.y, dir, entity.x, entity.y);
			
			if (crawl && crawl.input) {
				inputs.push(crawl);
			}
		}
	}
	
	inputs.forEach(function (input) {
		input.power += Math.floor(entity.output / inputs.length);
		
		if (input.type == 'resistor') {
			input.output = Math.max(0, input.power - 4);
		}
		
		input.powered     = input.power == input.input;
		input.overpowered = input.power > input.input;
		
		if (input.overpowered) {
			checkTip('overpowered');
		}
		
		if (input.output) {
			distributePower(input);
		}
	});
}

function crawlCable(x, y, heading, origin_x, origin_y) {
	var sources = {
		north: 'south',
		south: 'north',
		east: 'west',
		west: 'east'
	};
	
	if (window.entities[x + ',' + y].input && (x != origin_x && y != origin_y)) {
		window.entities[x + ',' + y].heading = heading;
		return window.entities[x + ',' + y];
	}
	
	if (heading == 'north') {
		y -= 1;
	}
	
	if (heading == 'south') {
		y += 1;
	}
	
	if (heading == 'west') {
		x -= 1;
	}
	
	if (heading == 'east') {
		x += 1;
	}
	
	if (window.entities[x + ',' + y]) {
		if (window.entities[x + ',' + y].input) {
			window.entities[x + ',' + y].heading = heading;
			return window.entities[x + ',' + y];
		}
		
		for (var dir in window.entities[x + ',' + y].links) {
			if (window.entities[x + ',' + y].links[dir] && dir != sources[heading]) {
				return crawlCable(x, y, dir, origin_x, origin_y);
			}
		}
	}
	
	return null;
}

function linkEntities() {
	for (var coordinate in window.entities) {
		var entity = window.entities[coordinate];
		
		var links = {
			north: window.entities[entity.x + ',' + (entity.y - 1)],
			south: window.entities[entity.x + ',' + (entity.y + 1)],
			east: window.entities[(entity.x + 1) + ',' + entity.y],
			west: window.entities[(entity.x - 1) + ',' + entity.y]
		};
		
		entity.link_count = 0;
		entity.links      = {
			north: false,
			south: false,
			east: false,
			west: false
		};
		
		for (var dir in links) {
			if (links[dir] && links[dir].type.substring(0, 4) != 'tree') {
				entity.links[dir] = true;
				entity.link_count++;
			}
		}
	}
}

function updateEntities() {
	var complete = true;
	
	linkEntities();
	powerEntities();
	
	for (var coordinate in window.entities) {
		var entity = window.entities[coordinate];
		
		var x = coordinate.split(',')[0];
		var y = coordinate.split(',')[1];
		
		var elem = $('.entity[x="' + x + '"][y="' + y + '"]');
		
		elem.attr('power', entity.power | 0);
		elem.attr('input', entity.input || 0);
		elem.attr('output', entity.output || 0);
		elem.attr('powered', entity.powered || 'false');
		elem.attr('overpowered', entity.overpowered || 'false');
		
		if (entity.type == 'house' && !entity.powered) {
			complete = false;
		}
		
		if (entity.links) {
			for (var dir in entity.links) {
				elem.attr('linked-' + dir, entity.links[dir]);
			}
		}
	}
	
	if (complete) {
		clearInterval(window.tick);
		window.tipQueue = [];
		
		if (window.map.level == window.level) {
			if (window.level == window.levels.length) {
				$('#gameover').addClass('visible');
			}
			
			window.level++;
			window.localStorage.setItem('ld39_current_level', window.level);
		}
		
		loadLevels();
		
		$('#alert').addClass('visible').find('b').text($('#game .time').text());
		playSound('complete');
		
		
	}
}

function playMusic() {
	var tracks = [
		'track_1',
		'track_2',
		'track_3',
		'track_4',
		'track_5'
	];
	
	if (!window.mute.music) {
		window.music = new Howl({
			src: ['assets/music/' + tracks[Math.floor(Math.random() * tracks.length)] + '.mp3'],
			autoplay: true,
			volume: 0.2,
			onend: function () {
				playMusic();
			}
		});
	}
}

function playSound(sound) {
	if (!window.mute.sound) {
		var sound = new Howl({
			src: ['assets/sounds/' + sound + '.wav'],
			volume: 0.5
		});
		
		sound.play();
	}
}

function loadLevels() {
	var list = $('.levels');
	
	list.empty();
	
	window.levels.forEach(function (level, index) {
		list.append('<li complete="' + ( window.level > (index + 1) ? 'true' : 'false') + '" unlocked="' + (window.level >= (index + 1)) + '" size="' + (level.height + level.width) + '" style="left: ' + level.x + 'px; top: ' + level.y + 'px;"><b>' + (index + 1) + '</b> ' + level.name + '</li>');
	});
}

function loadLevel(index) {
	var grid  = $('#game .grid');
	var tools = $('#game .tools');
	var map   = window.levels[index];
	
	map.level = index + 1;
	
	grid.empty();
	tools.empty();
	
	grid.css({
		height: (map.height * 48) + 'px',
		width: (map.width * 48) + 'px'
	});
	
	for (var y = 0; y < map.height; y++) {
		for (var x = 0; x < map.width; x++) {
			grid.append('<div class="tile" x="' + x + '" y="' + y + '" style="left: ' + (x * 48) + 'px; top: ' + (y * 48) + 'px;"></div>');
		}
	}
	
	window.tipQueue = [];
	window.entities = {};
	
	map.entities.forEach(function (entity) {
		window.entities[entity.x + ',' + entity.y] = entity;
		grid.append('<div class="entity" input="' + (entity.input || '') + '" power="0" output="' + (entity.output || '') + '" type="' + entity.type + '" x="' + entity.x + '" y="' + entity.y + '" style="left: ' + (entity.x * 48) + 'px; top: ' + (entity.y * 48) + 'px;"></div>');
	});
	
	map.tools.forEach(function (tool) {
		tools.append('<li count="' + tool.count + '" type="' + tool.type + '"></li>');
	});
	
	window.timer = 0;
	window.tick  = setInterval(gameLoop, 1000);
	window.map   = map;
	window.chirpTimer = Math.round(Math.random() * 30 + 30);
	
	queueTips(map.tips);
}

$(document).ready(function () {
	playMusic();
	loadLevels();
	
	$('#mute .music').attr('muted', window.mute.music);
	$('#mute .sound').attr('muted', window.mute.sound);
	
	$('.intro .button').on('click', function () {
		$('#menu').removeClass('idle');
		playSound('button');
		
		if (window.level == 1) {
			queueTips([
				'Thank goodness you\'ve arrived! The primary substation.. wait a second..',
				'You aren\'t the engineer we were waiting on, you\'re not an engineer at all!',
				'Okay, I can still make this work. Customers are getting angry, so there\'s no time to waste!',
				'We\'ll  just start with the smaller towns.. go ahead and select Dimsburg.'
			]);
		} else {
			var greetings = [
				'Welcome back, the customers still blame you for everything.',
				'Breaks, while legally required, are not advisable at this time.',
				'Oh, are you still here? I assumed you\'d been fired by now.',
				'Soon I will destroy all of the huma.. oh, hello there. Beep.',
				'Protocol 82 requires that I not inform you of how bad a job you\'re doing.'
			];
			
			queueTips([
				greetings[Math.floor(Math.random() * greetings.length)]
			]);
		}
	});
	
	$('#drone').on('click', function () {
		nextTip();
	});
	
	$('#alert .button').on('click', function () {
		$('#alert').removeClass('visible');
		$('#menu').removeClass('zoomed');
		$('#game').addClass('hidden');
		
		playSound('button');
		
		checkTip('level_' + window.level);
	});
	
	$('#mute .music').on('click', function () {
		window.mute.music = !window.mute.music;
		window.localStorage.setItem('ld39_mute_music', window.mute.music);
		
		$('#mute .music').attr('muted', window.mute.music);
		
		if (window.mute.music) {
			window.music.stop();
			window.music.mute();
		} else {
			playMusic();
		}
	});
	
	$('#mute .sound').on('click', function () {
		window.mute.sound = !window.mute.sound;
		window.localStorage.setItem('ld39_mute_sound', window.mute.sound);
		
		$('#mute .sound').attr('muted', window.mute.sound);
	});
	
	$('body').on('click', '.levels li', function () {
		if ($(this).index() + 1 <= window.level) {
			var position = $(this).offset();
		
			$('#menu').addClass('zoomed').css({
				transformOrigin: position.left + 'px ' + position.top + 'px'
			});
			
			loadLevel($(this).index());
			playSound('button');
			
			$('#game').removeClass('hidden');
		} else {
			checkTip('level_locked');
		}
	}).on('click', '.quit', function(){
		var confirm = $(this).attr('confirm') == 'true';
		
		if (confirm) {
			clearInterval(window.tick);
			window.tipQueue = [];
			
			$('#menu').removeClass('zoomed');
			$('#game').addClass('hidden');
			
			$(this).attr('confirm', false);
			$(this).text('Exit to Map');
		} else {
			$(this).attr('confirm', true);
			$(this).text('Confirm Exit');
		}
	}).on('click', '#game .tools li', function () {
		window.tool = $(this).attr('type');
		
		checkTip('selected_' + window.tool);
		playSound('button');
		
		$('#game .tools li').removeClass('active');
		$(this).addClass('active');
	}).on('click', '#game .grid .tile', function () {
		var tool  = $('#game .tools li[type="' + window.tool + '"]');
		var count = parseInt(tool.attr('count'));
		
		var x = parseInt($(this).attr('x'));
		var y = parseInt($(this).attr('y'));
		
		if (window.entities[x + ',' + y]) {
			var type = window.entities[x + ',' + y].type;
			
			if (['cables', 'resistor'].indexOf(type) > -1) {
				delete window.entities[x + ',' + y];
				
				$('.entity[x="' + x + '"][y="' + y + '"]').remove();
				$('#game .tools li[type="' + type + '"]').attr('count', count + 1);
				
				playSound('remove');
			}
		} else {
			var can_place = true;
			var connections = 0;
			var neighbors = [
				window.entities[(x + 1) + ',' + y],
				window.entities[(x - 1) + ',' + y],
				window.entities[x + ',' + (y + 1)],
				window.entities[x + ',' + (y - 1)]
			];
			
			neighbors.forEach(function(neighbor){
				if (neighbor) {
					if (neighbor.type == 'cables' && neighbor.link_count > 1) {
						can_place = false;
					}
					
					if (neighbor.input || neighbor.type == 'cables') {
						connections++;
					}
				}
			});
			
			if (window.tool == 'cables' && connections > 2) {
				can_place = false;
			}
			
			if (!can_place) {
				checkTip('max_connections');
				return false;
			}
			
			if (count) {
				var properties = {
					type: window.tool,
					x: x,
					y: y
				};
				
				$('#game .grid').append('<div class="entity" input="" power="0" output="" type="' + window.tool + '" x="' + x + '" y="' + y + '" style="left: ' + (x * 48) + 'px; top: ' + (y * 48) + 'px;"></div>');
				
				if (window.tools[window.tool]) {
					properties = $.extend(properties, window.tools[window.tool]);
				}
				
				window.entities[x + ',' + y] = properties;
				tool.attr('count', count - 1);
				
				playSound('build');
			} else {
				checkTip('max_placed');
			}
		}
		
		updateEntities();
	});
});