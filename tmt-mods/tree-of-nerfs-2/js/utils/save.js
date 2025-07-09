// ************ Save stuff ************
function save() {
	if (NaNalert) return
	localStorage.setItem(modInfo.id, btoa(unescape(encodeURIComponent(JSON.stringify(player)))));
	localStorage.setItem(modInfo.id+"_options", btoa(unescape(encodeURIComponent(JSON.stringify(options)))));

}
function startPlayerBase() {
	return {
		tab: layoutInfo.startTab,
		navTab: (layoutInfo.showTree ? layoutInfo.startNavTab : "none"),
		time: Date.now(),
		notify: {},
		versionType: modInfo.id,
		version: VERSION.num,
		beta: VERSION.beta,
		timePlayed: 0,
		keepGoing: false,
		hasNaN: false,

		points: modInfo.initialStartPoints,
		subtabs: {},
		lastSafeTab: (readData(layoutInfo.showTree) ? "none" : layoutInfo.startTab)
	};
}
function getStartPlayer() {
	playerdata = startPlayerBase();

	if (addedPlayerData) {
		extradata = addedPlayerData();
		for (thing in extradata)
			playerdata[thing] = extradata[thing];
	}

	playerdata.infoboxes = {};
	for (layer in layers) {
		playerdata[layer] = getStartLayerData(layer);

		if (layers[layer].tabFormat && !Array.isArray(layers[layer].tabFormat)) {
			playerdata.subtabs[layer] = {};
			playerdata.subtabs[layer].mainTabs = Object.keys(layers[layer].tabFormat)[0];
		}
		if (layers[layer].microtabs) {
			if (playerdata.subtabs[layer] == undefined)
				playerdata.subtabs[layer] = {};
			for (item in layers[layer].microtabs)
				playerdata.subtabs[layer][item] = Object.keys(layers[layer].microtabs[item])[0];
		}
		if (layers[layer].infoboxes) {
			if (playerdata.infoboxes[layer] == undefined)
				playerdata.infoboxes[layer] = {};
			for (item in layers[layer].infoboxes)
				playerdata.infoboxes[layer][item] = false;
		}

	}
	return playerdata;
}
function getStartLayerData(layer) {
	layerdata = {};
	if (layers[layer].startData)
		layerdata = layers[layer].startData();

	if (layerdata.unlocked === undefined)
		layerdata.unlocked = true;
	if (layerdata.total === undefined)
		layerdata.total = decimalZero;
	if (layerdata.best === undefined)
		layerdata.best = decimalZero;
	if (layerdata.resetTime === undefined)
		layerdata.resetTime = 0;
	if (layerdata.forceTooltip === undefined)
		layerdata.forceTooltip = false;

	layerdata.buyables = getStartBuyables(layer);
	if (layerdata.noRespecConfirm === undefined) layerdata.noRespecConfirm = false
	if (layerdata.clickables == undefined)
		layerdata.clickables = getStartClickables(layer);
	layerdata.spentOnBuyables = decimalZero;
	layerdata.upgrades = [];
	layerdata.milestones = [];
	layerdata.lastMilestone = null;
	layerdata.achievements = [];
	layerdata.challenges = getStartChallenges(layer);
	layerdata.grid = getStartGrid(layer);
	layerdata.prevTab = ""

	return layerdata;
}
function getStartBuyables(layer) {
	let data = {};
	if (layers[layer].buyables) {
		for (id in layers[layer].buyables)
			if (isPlainObject(layers[layer].buyables[id]))
				data[id] = decimalZero;
	}
	return data;
}
function getStartClickables(layer) {
	let data = {};
	if (layers[layer].clickables) {
		for (id in layers[layer].clickables)
			if (isPlainObject(layers[layer].clickables[id]))
				data[id] = "";
	}
	return data;
}
function getStartChallenges(layer) {
	let data = {};
	if (layers[layer].challenges) {
		for (id in layers[layer].challenges)
			if (isPlainObject(layers[layer].challenges[id]))
				data[id] = 0;
	}
	return data;
}
function getStartGrid(layer) {
	let data = {};
	if (! layers[layer].grid) return data
	if (layers[layer].grid.maxRows === undefined) layers[layer].grid.maxRows=layers[layer].grid.rows
	if (layers[layer].grid.maxCols === undefined) layers[layer].grid.maxCols=layers[layer].grid.cols

	for (let y = 1; y <= layers[layer].grid.maxRows; y++) {
		for (let x = 1; x <= layers[layer].grid.maxCols; x++) {
			data[100*y + x] = layers[layer].grid.getStartData(100*y + x)
		}
	}
	return data;
}

function fixSave() {
	defaultData = getStartPlayer();
	fixData(defaultData, player);

	for (layer in layers) {
		if (player[layer].best !== undefined)
			player[layer].best = new Decimal(player[layer].best);
		if (player[layer].total !== undefined)
			player[layer].total = new Decimal(player[layer].total);

		if (layers[layer].tabFormat && !Array.isArray(layers[layer].tabFormat)) {

			if (!Object.keys(layers[layer].tabFormat).includes(player.subtabs[layer].mainTabs))
				player.subtabs[layer].mainTabs = Object.keys(layers[layer].tabFormat)[0];
		}
		if (layers[layer].microtabs) {
			for (item in layers[layer].microtabs)
				if (!Object.keys(layers[layer].microtabs[item]).includes(player.subtabs[layer][item]))
					player.subtabs[layer][item] = Object.keys(layers[layer].microtabs[item])[0];
		}
	}
}
function fixData(defaultData, newData) {
	for (item in defaultData) {
		if (defaultData[item] == null) {
			if (newData[item] === undefined)
				newData[item] = null;
		}
		else if (Array.isArray(defaultData[item])) {
			if (newData[item] === undefined)
				newData[item] = defaultData[item];

			else
				fixData(defaultData[item], newData[item]);
		}
		else if (defaultData[item] instanceof Decimal) { // Convert to Decimal
			if (newData[item] === undefined)
				newData[item] = defaultData[item];

			else
				newData[item] = new Decimal(newData[item]);
		}
		else if ((!!defaultData[item]) && (typeof defaultData[item] === "object")) {
			if (newData[item] === undefined || (typeof defaultData[item] !== "object"))
				newData[item] = defaultData[item];

			else
				fixData(defaultData[item], newData[item]);
		}
		else {
			if (newData[item] === undefined)
				newData[item] = defaultData[item];
		}
	}
}
function load() {
	let get = localStorage.getItem(modInfo.id);

	if (get === null || get === undefined) {
		player = getStartPlayer();
		options = getStartOptions();
	}
	else {
		player = Object.assign(getStartPlayer(), JSON.parse(decodeURIComponent(escape(atob(get)))));
		fixSave();
		loadOptions();
	}

	if (player.offlineProd) {
		if (player.offTime === undefined)
			player.offTime = { remain: 0 };
		player.offTime.remain += (Date.now() - player.time) / 1000;
	}
	player.time = Date.now();
	versionCheck();
	changeTheme();
	changeTreeQuality();
	updateLayers();
	setupModInfo();

	setupTemp();
	updateTemp();
	updateTemp();
	updateTabFormats()
	loadVue();
}

function loadOptions() {
	let get2 = localStorage.getItem(modInfo.id+"_options");
	if (get2) 
		options = Object.assign(getStartOptions(), JSON.parse(decodeURIComponent(escape(atob(get2)))));
	else 
		options = getStartOptions()
	

}

function setupModInfo() {
	modInfo.changelog = changelog;
	modInfo.winText = winText ? winText : `Congratulations! You have reached the end and beaten this game, but for now...`;

}
function fixNaNs() {
	NaNcheck(player);
}
function NaNcheck(data) {
	for (item in data) {
		if (data[item] == null) {
		}
		else if (Array.isArray(data[item])) {
			NaNcheck(data[item]);
		}
		else if (data[item] !== data[item] || checkDecimalNaN(data[item])) {
			if (!NaNalert) {
				confirm("Invalid value found in player, named '" + item + "'. Please let the creator of this mod know! You can refresh the page, and you will be un-NaNed.")
				clearInterval(interval);
				NaNalert = true;
				return
			}
		}
		else if (data[item] instanceof Decimal) { // Convert to Decimal
		}
		else if ((!!data[item]) && (data[item].constructor === Object)) {
			NaNcheck(data[item]);
		}
	}
}
function exportSave() {
	if (NaNalert) return
	let str = btoa(JSON.stringify(player));

	const el = document.createElement("textarea");
	el.value = str;
	document.body.appendChild(el);
	el.select();
	el.setSelectionRange(0, 99999);
	document.execCommand("copy");
	document.body.removeChild(el);
}
function importSave(imported = undefined, forced = false) {
	if (imported === undefined)
		imported = prompt("Paste your save here");
  //if(imported === "asdfghjkl") imported = "eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTY3MDg4MzQ4MDE1Nywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJzb2Z0Y2FwcGVkXi05NiIsInZlcnNpb24iOiIxLjkuNiIsInRpbWVQbGF5ZWQiOjg2MTkwLjY5Mzk5OTkzMDA0LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJwb2ludHMiOiI1LjQwNDE0NTcxNjg0OTYyNmUyNzY3Njg5MDgyODMiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJhIjp7Im1haW5UYWJzIjoiVGltZXdhbGxzIn0sImIiOnsibWFpblRhYnMiOiJNaWxlc3RvbmVzIn19LCJsYXN0U2FmZVRhYiI6ImFsIiwicG9pbnROZXJmIjoiNy4xOTk3MTE4ODU2NTg2NTllLTc1IiwiYW50aW1hdHRlciI6dHJ1ZSwiY2hhbGxlbmdlVmFyIjowLCJpbmZvYm94ZXMiOnt9LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjg2MTkwLjY5Mzk5OTkzMDA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODYxOTAuNjkzOTk5OTMwMDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjg2MTkwLjY5Mzk5OTkzMDA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODYxOTAuNjkzOTk5OTMwMDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4NjE5MC42OTM5OTk5MzAwNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJwIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzLjQxMzUyNzEwNzA4NzAwMTJlNDg5MTA3ODYiLCJiZXN0IjoiMy40MTM1MjcxMDcwODcwMDEyZTQ4OTEwNzg2IiwidG90YWwiOiIzLjQxMzUyNzEwNzA4NzAwMTJlNDg5MTA3ODYiLCJyZXNldFRpbWUiOjQ4MjYuMTk4OTk5OTk5NjEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsiMTEiLCIxMiIsIjEzIiwiMTQiLCIxNSIsIjIxIiwiMjIiLCIyMyIsIjI0IiwiMjUiXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxLjM2ODc0MzM0NzgwMDkxMjNlMTczMDIwNjk1NDgwIiwiYmVzdCI6IjEuMzY4NzQzMzQ3ODAwOTEyM2UxNzMwMjA2OTU0ODAiLCJ0b3RhbCI6IjEuMzY4NzQzMzQ3ODAwOTEyM2UxNzMwMjA2OTU0ODAiLCJyZXNldFRpbWUiOjQ4MjYuMTk4OTk5OTk5NjEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsyMiwxMiwxMSwxMywxNCwxNSwyNSwyNCwyMywyMV0sIm1pbGVzdG9uZXMiOlsiMCIsIjEiXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MSwiMTIiOjEsIjIxIjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJsIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIzLjMwMzc5MDEyODI4NTk3M2UzNjgzOTE4NjU1IiwiYmVzdCI6IjMuMzAzNzkwMTI4Mjg1OTczZTM2ODM5MTg2NTUiLCJzMSI6bnVsbCwiczIiOm51bGwsInRvdGFsIjoiMy4zMDM3OTAxMjgyODU5NzNlMzY4MzkxODY1NSIsInJlc2V0VGltZSI6NDgyNi4xOTg5OTk5OTk2MTMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTE3NTMzMTAzIiwiMTIiOiIyMzg1Mjg0IiwiMTMiOiI5NTI2NzIifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6MSwiMTIiOjF9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwyNSwyNCwyMywyMiwyMSwzMiwzNSwzNCwzMywzMSw0Miw1Miw0MSw0Myw0NCw0NSw1NSw1NCw1Myw1MSw2Miw2MV0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJhIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI1MzAzIiwiYmVzdCI6IjUzMDMiLCJ0aW1ld2FsbCI6IjcuMjczNjA0ODc2MjMxNzY3ZTIwNjEyIiwidG90YWwiOiI1MzAzIiwicmVzZXRUaW1lIjo0ODI2LjE5ODk5OTk5OTYxMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMjEsMjIsMjMsMjQsMzEsMzIsMzMsMzQsMzUsMzZdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6eyIxMSI6MX0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiZGkiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjMuNzI5ODU5NDI0ODk0MTY0NmUxNjAwOTU4IiwiYmVzdCI6IjAiLCJ2ZWxvY2l0eSI6IjIuNjI3Mjc2MjA4OTI1NjI4ZTM5NDQxNyIsImFjYyI6IjMuMDI4ODI3OTU1ODc1MDQzN2UyODQ1MTAiLCJqZXJrIjoiNy45MzU2MTI2NTg2NTc5ODhlMTkyMzc3Iiwic25hcCI6IjguNDcxMDY2MDY2ODMxNGUxMDAyNzAiLCJjcmFja2xlIjoiNTAiLCJ0b3RhbCI6IjAiLCJyZXNldFRpbWUiOjQ4MjYuMTk4OTk5OTk5NjEzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjExNjY1NzgiLCIxMiI6IjEwODEiLCIxMyI6IjIwMDExOCIsIjIxIjoiNDQ4IiwiMjIiOiIyMSJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMzIsMzMsMTQsMTMsMTIsMTEsMTUsMjEsMjIsMjMsMjQsMzFdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYWQiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjguMDgzMjc3NzE2NDM1NjhlNzk4ODMiLCJiZXN0IjoiNy43MzY2OTg4MDYyNjA5ODNlNzk4ODMiLCJkMSI6IjEuNDM5NTQzNDMxMTgxODUyN2U1MTkyNiIsImQyIjoiNi44Nzk3MjMxMDgyODc0NjJlMzcyOTYiLCJkMyI6IjcuOTU5MzM5NTI0ODU1NTM2ZTMxNzgxIiwiZDQiOiI5LjQxNDUwNDEwNjM1NTA5M2UyNjk2MCIsImQ1IjoiMS40NjI0MTE0NjM2MjkwNDYyZTIyNDg3IiwiZDYiOiIxLjAxMzQ1MDAzNjEyNDQ0MzZlMTAwNjAiLCJkNyI6IjEuMTE2MDY2MDE1MjM0MDQ5OGU2NTUzIiwiZDgiOiI3LjQ0MTQwNzY3MjMyMjY0MWUzMTI5IiwiZDkiOiIzOTc1IiwidG90YWwiOiIwIiwicmVzZXRUaW1lIjo0ODI2LjE5ODk5OTk5OTYxMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIyNjUzNjYiLCIxMiI6Ijc5ODgyIiwiMTMiOiIzOTkzOCIsIjIxIjoiMjY2MjIiLCIyMiI6IjE5OTYzIiwiMjMiOiIxNTk2NCIsIjMxIjoiNzk4MCIsIjMyIjoiNjY0NyIsIjMzIjoiMzk3NSJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMjEsMjIsMTIsMTQsMTMsMjMsMjQsMjUsMTUsMzIsMzMsMzEsMzQsMzVdLCJtaWxlc3RvbmVzIjpbIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiMTAiLCI5Il0sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImMiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODYxOTAuNjkzOTk5OTMwMDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MSwiMjEiOjEsIjIyIjoxLCIzMSI6MSwiMzIiOjEsIjQxIjoxLCI0MiI6MX0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiZCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMS45NTY2MDA1MTQ5NTI5MTNlMzExIiwicHJvZ3Jlc3MiOiIwIiwicmVxIjoiMWUtMTAiLCJsYXllcnMiOiIwIiwibWF4IjoiMSIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4NjE5MC42OTM5OTk5MzAwNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIxMDI1In0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwxNiwyMSwyMiwyMywyNCwyNSwyNiwzMSwzMiwzMywzNCwzNSwzNiw0MSw0Miw0Myw0NCw0NSw0Nl0sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJjaCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsImRvbmUiOjUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4NjE5MC42OTM5OTk5MzAwNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjAiLCIxIiwiMiIsIjMiLCI0Il0sImxhc3RNaWxlc3RvbmUiOiI0IiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwieHl6Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI1LjE1ODUyNjc3Nzg0OTQwN2UzODgiLCJkb25lIjpmYWxzZSwieCI6IjEuNTA1NTk2Nzg3ODY5NzY1MWU0NSIsInkiOiI1LjAwOTA5MjQ2NzA4MjU0MmUxMDgiLCJ6IjoiMS4yNDk1NDkxNTMwMTg1MzUyZTg1IiwiZ3BzIjoiMi43OTk1MzEyMjgxMzc4NDczZTM4NSIsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4NjE5MC42OTM5OTk5MzAwNCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiI1NyJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjEsMjIsMjMsMjQsMjUsMzEsMzIsMzMsMzQsMzVdLCJtaWxlc3RvbmVzIjpbIjAiLCIxIl0sImxhc3RNaWxlc3RvbmUiOiIxIiwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwibWwiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEyODciLCJkb25lIjpmYWxzZSwibGF5ZXJzIjoiNy41MDQxMzE0MDEyOTU0NTNlMzg2IiwidHJlZXMiOiIxNjY4LjA5ODU4NDY0MDAxNjUiLCJtZXRhdHJlZXMiOiI1LjcwMzk4ODY1NzY3NjUwOTUiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODYxOTAuNjkzOTk5OTMwMDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMTI4NyIsIjEyIjoiODM1OCIsIjEzIjoiMzU0NSIsIjIxIjoiMSJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMTUsMjEsMjIsMjMsMjQsMzEsMzIsMzMsNDEsNDIsNTFdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwic3MiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6ImVlNDU1Ni43OTA1MDc3OTU2Nzc1IiwiZG9uZSI6ZmFsc2UsInRvdGFsIjoiZWU0NTU2Ljc5MDUwNzc5NTY3NzUiLCJiZXN0IjoiZWU0NTU2Ljc5MDUwNzc5NTY3NzUiLCJyZXNldFRpbWUiOjg2MTkwLjY5Mzk5OTkzMDA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6eyIxMSI6IjcxIiwiMTIiOiIzMTY0IiwiMTMiOiI4In0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwiYWIiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEuOTEzNTgwNzM2NDc3NzY0NmUyMDkiLCJkb25lIjpmYWxzZSwiY29vbGRvd24iOjAsImF1dG8iOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0OTI1LjY0MTk5OTk5OTYwNSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnsiMTEiOiIyLjY3NDc0NDI1NTUwNjA4ODdlNjkiLCIxMiI6IjEuMjQxNTA2MzA2OTEyNjcxN2U2OSIsIjEzIjoiNjEiLCIxNCI6IjAifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6eyIxMSI6IiIsIjEyIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sInciOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEwMDAiLCJkb25lIjpmYWxzZSwiYyI6MSwibGFzdENsaWNrVGltZSI6MC4zOTk5OTk5OTk5OTk5OTk5NywibWF4IjoiMC40OTg3MzU2Njk4NTE5NTA0IiwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjg2MTkwLjY5Mzk5OTkzMDA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMjEiOiIiLCIyMiI6IiIsIjIzIjoiIiwiMzEiOiIiLCIzMiI6IiIsIjMzIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1XSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImIiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjE1IiwiYmVzdCI6IjE1IiwiZW5lcmd5IjoiNDAiLCJib29zdDEiOmZhbHNlLCJ0b3RhbCI6IjE1IiwicmVzZXRUaW1lIjo0ODI2LjE5ODk5OTk5OTYxMywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoyLCIxMiI6MSwiMTMiOjEsIjIxIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOlsiMCIsIjEiLCIyIiwiMyIsIjQiLCI1IiwiNiIsIjciLCI4IiwiOSIsIjEwIl0sImxhc3RNaWxlc3RvbmUiOiIxMCIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjN9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImFsIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI2Iiwic2NhbGluZyI6IjAiLCJhYnAiOiIwIiwidG90YWwiOiI5IiwiYmVzdCI6IjYiLCJyZXNldFRpbWUiOjg2MTkwLjY5Mzk5OTkzMDA0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMV0sIm1pbGVzdG9uZXMiOlsiMCIsIjEiXSwibGFzdE1pbGVzdG9uZSI6IjEiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYW4iOnsidW5sb2NrZWQiOmZhbHNlLCJwb2ludHMiOiIwIiwicHJvZ3Jlc3NCYXJzIjp7ImJhcjEiOiIxIn0sImJ1ZmZQb3dlciI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODYxOTAuNjkzOTk5OTMwMDQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7IjExIjoiMCIsIjEyIjoiMCIsIjEzIjoiMCJ9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ"
	try {
		tempPlr = Object.assign(getStartPlayer(), JSON.parse(atob(imported)));
		if (tempPlr.versionType != modInfo.id && !forced && !confirm("This save appears to be for a different mod! Are you sure you want to import?")) // Wrong save (use "Forced" to force it to accept.)
			return;
		player = tempPlr;
		player.versionType = modInfo.id;
		fixSave();
		versionCheck();
		save();
		window.location.reload();
	} catch (e) {
		return;
	}
}
function versionCheck() {
	let setVersion = true;

	if (player.versionType === undefined || player.version === undefined) {
		player.versionType = modInfo.id;
		player.version = 0;
	}

	if (setVersion) {
		if (player.versionType == modInfo.id && VERSION.num > player.version) {
			player.keepGoing = false;
			if (fixOldSave)
				fixOldSave(player.version);
		}
		player.versionType = getStartPlayer().versionType;
		player.version = VERSION.num;
		player.beta = VERSION.beta;
	}
}
var saveInterval = setInterval(function () {
	if (player === undefined)
		return;
	if (gameEnded && !player.keepGoing)
		return;
	if (options.autosave)
		save();
}, 5000);
