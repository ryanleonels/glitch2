// Made by Reinhardt, and if dev isn't him, not them either
// Chuck your data into the depths of the localStorage variable...
function save() {
	localStorage.setItem('lngi-inc', btoa(JSON.stringify(game)));
}

// Clear the save file
function wipe() {
		if (confirm('Do you really want to wipe this save?')) {
			game = new Game();
      interval = Infinity;
		}
}

// Retrieve your data from the depths of the localStorage variable...
function load() {
	if (localStorage.getItem('lngi-inc') != undefined && localStorage.getItem('lngi-inc') != 'undefined' && localStorage.getItem('lngi-inc') != null) {
		try {
			game = JSON.parse(atob(localStorage.getItem('lngi-inc')));
		} catch(e) {
			console.warn('Outdated save, updating');
			game = JSON.parse(localStorage.getItem('lngi-inc'));
		}
		save();
		return true;
	} else {
		return false;
	}
}