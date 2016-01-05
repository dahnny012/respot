var Reader = require("line-by-line");
var fs = require("fs");
var reader = new Reader("gre.txt");

var numLines = 4103;
var maxLines = 4103;

reader.on('error', function (err) {
    // 'err' contains error object
});

reader.on('line', function (line) {
	fillData(line);
	numLines--;
	if(numLines === 0)
	{
		buffer = JSON.stringify(buffer);
		fs.writeFileSync("gre.js", "var gre = " + buffer);
		process.exit(1);
	}
});

reader.on('end', function () {
    // All lines are read, file is closed now.
});



function fillData(line)
{
	buffer.push(line);
}