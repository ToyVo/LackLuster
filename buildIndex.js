/**
 * This script will copy the index.html file into the public folder
 * and then add script lines according to the build mode.  Of the
 * environment variable __DEV__ is true then it will add development
 * options, otherwise, it adds production options.
 */

// Node and NPM libraries
const fs = require('fs');
const linenumber = require('linenumber');
const insertLine = require('insert-line');

// A few helper functions
function makeScriptStringCode (code, lib) {
	return `    <script>${code}</script>`;
}

function makeScriptStringLib (lib) {
	return `    <script src="${lib}"></script>`;
}

function getMatchLineNumber (matchString) {
	let matches = linenumber('./public/index.html', matchString);
	return (matches.length > 0 ? matches[0].line : -1);
}

// Lists of libraries and plugins to inject
let mainLib = {
	line: 'LIBS GO HERE',
	items: [
		{ type: 'prod', lib: 'https://cdn.jsdelivr.net/npm/phaser@3.16.1/dist/phaser.min.js' },
		{ type: 'dev', lib: 'https://cdn.jsdelivr.net/npm/phaser@3.16.1/dist/phaser.js' }
	]
};

let plugins = {
	line: 'PLUGINS GO HERE',
	items: [
		{ type: 'proddev', lib: 'https://cdn.jsdelivr.net/npm/phaser-plugin-update@1.0.1/dist/UpdatePlugin.js' },
		{ type: 'dev', lib: 'https://cdn.jsdelivr.net/npm/phaser-plugin-debug-draw@1.0.2/dist/PhaserDebugDrawPlugin.js' }
	]
};

// Extra lines of code to establish the development mode
let devLines = {
	line: 'DEV GOES HERE',
	items: [
		{ type: 'prod', code: 'var __DEV__ = false;' },
		{ type: 'dev', code: 'var __DEV__ = true;' }
	]
};

// Copy the un-edited index file to the public directory
fs.copyFileSync('./index.html', './public/index.html');

// Determine the build type from environment variables
let buildType = 'prod';

// Check command line arguments for specified build type
if (process.argv.length > 2) {
	if (process.argv[2].toLowerCase() === 'dev' || process.argv[2].toLowerCase() === 'prod') {
		buildType = process.argv[2].toLowerCase();
	} else {
		console.log(`Unrecognized build type ${process.argv[2].toLowerCase()}, defaulting to prod`);
	}
}

// Inject all the library lines for this build type
let mainLibLineNum = getMatchLineNumber(mainLib.line);
if (mainLibLineNum > 0) {
	console.log(`Found ${mainLib.line} at ${mainLibLineNum + 1}`);
	mainLib.items.forEach((libItem) => {
		if (libItem.type.indexOf(buildType) >= 0) {
			let libLine = makeScriptStringLib(libItem.lib);
			insertLine('./public/index.html').contentSync(libLine).at(mainLibLineNum + 1);
		}
	});
} else {
	console.error(`${mainLib.line} not found!`);
}

// Inject all the plugins for this build type
let pluginsLineNum = getMatchLineNumber(plugins.line);
if (pluginsLineNum > 0) {
	console.log(`Found ${plugins.line} at ${pluginsLineNum + 1}`);
	plugins.items.forEach((pluginItem) => {
		if (pluginItem.type.indexOf(buildType) >= 0) {
			let libLine = makeScriptStringLib(pluginItem.lib);
			insertLine('./public/index.html').contentSync(libLine).at(pluginsLineNum + 1);
		}
	});
} else {
	console.error(`${plugins.line} not found!`);
}

// Inject all the dev lines of code for this build type
let devLineNum = getMatchLineNumber(devLines.line);
if (devLineNum > 0) {
	console.log(`Found ${devLines.line} at ${devLineNum + 1}`);
	devLines.items.forEach((devItem) => {
		if (devItem.type.indexOf(buildType) >= 0) {
			let devLine = makeScriptStringCode(devItem.code);
			insertLine('./public/index.html').contentSync(devLine).at(devLineNum + 1);
		}
	});
} else {
	console.error(`${devLines.line} not found!`);
}
