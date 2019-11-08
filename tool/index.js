

const fs = require('fs');
const lunr = require('lunr');

let stdin = process.stdin;
let stdout = process.stdout;
let buffer = [];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function(data) {
	buffer.push(data);
});

stdin.on('end', function() {
	const documents = JSON.parse(buffer.join(''));
	
	stdout.write(JSON.stringify(lunr(function() {
		this.ref('url');
		this.field('title');
		
		for (const url of Object.keys(documents)) {
			this.add(documents[url]);
		}
	})));
});


