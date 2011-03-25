var util = require('../../util');
var game = null;
var channels = {}; 
var farklep = {
	listeners: {
		'message': parseLine
	}
}

module.exports = farklep;

function parseLine(from, to, msg){
	if(msg[0] === '!'){
		var sp = util.split(msg, ' ', 2)
		, info = {
			from: from,
			to: to,
			msg: msg,
			cmdstr: sp[0].substr(1),
			rest: sp[1]
			, bot: farklep.bot
		};

		farklerun(info);


	}	
}

function farklerun(info) {
	var cmd = farklecommands[info.cmdstr];
	if(cmd){
		cmd(info, info.bot);
	}
}

var farklecommands = {
	roll: function(info){
		blah = [0,0,0,0,0,0].map(rolldie);
		console.log("Roll function run!!!1111" + blah);
		info.bot.say(info.to, info.from + ' rolled: ' + blah);
	}
	,
	new: function(info){
		if (game === null){
			game = {};
		} else {
			info.bot.say(info.to, "Omg nubbie there is already a game!11");
			}
	},
	join: function(info){
			if (game !== null){
				game.players = game.players || [];
				game.players.push(info.from);
			}
	}
};
function rolldie(){
	return Math.floor((Math.random() * 6) + 1);
}
