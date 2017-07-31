window.chirps = [
	{
		text : 'My bagel has been stuck in the toaster for 6 hours, why won\'t you help?.',
		user : 'HungryDude63',
		hash : '#allbagelsmatter'
	},
	{
		text : '911 says "lack of television" is not an emergency. Mental anguish is an emergency.',
		user : 'Philosophoria',
		hash : '#bagelsmatter'
	}
];



var counter = window.chirps.length;

while (counter > 0) {
    // Pick a random index
    var index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    var temp = window.chirps[counter];
    window.chirps[counter] = window.chirps[index];
    window.chirps[index] = temp;
}