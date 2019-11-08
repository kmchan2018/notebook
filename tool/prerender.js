
const react = require('react');
const server = require('react-dom/server');


require('ts-node').register({
	"transpileOnly": true,
	"compilerOptions": {
		"moduleResolution": "node",
		"module": "CommonJS",
	},
});

if (process.argv.length < 3) {
	console.error('ERROR: script expected');
	process.exitCode = 1;
} else {
	let buffer = [];

	process.stdin.resume();
	process.stdin.setEncoding('utf8');

	process.stdin.on('data', function(data) {
		buffer.push(data);
	});

	process.stdin.on('end', function() {
		const file = process.argv[2];
		const data = JSON.parse(buffer.join(''));
		const component = require('../' + file).default;
		const result = server.renderToString(react.createElement(component, data));
		process.stdout.write(result);
	});
}

