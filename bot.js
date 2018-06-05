const Discord = require("discord.js");
var weather = require("weather-js");
const bot = new Discord.Client({autoReconnect: true});
const moment = require('moment');
const economy = require('discord-eco');
const cheerio = require('cheerio'),
      snekfetch = require('snekfetch'),
      querystring = require('querystring');
var talkedRecently = new Set();
//
var fs = require("fs");
var text = fs.readFileSync("./minecraft.txt").toString('utf-8');
var textByLine = text.split("\n")
// blacklist code jos:
let bltext = fs.readFileSync("./blacklist.txt").toString('utf-8');
let blarray = bltext.split("\n")
//
const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));
// spotify
var fs = require("fs");
var text = fs.readFileSync("./spotify.txt").toString('utf-8');
var alt = text.split("\n")
//
var getgeoip = require('ip-geoinfo');
var fs = require("fs");
var requireText = require('require-text');
let c = "#ff0000";
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
let prefix = ">";
bot.on("ready", () => {
	console.log(`Logged in as ${bot.user.tag}, ${bot.user.id}`);
	bot.channels.get("432085606609190912").send("bot loaded up");
	bot.user.setStatus("dnd");
    bot.user.setActivity(`prime users.`, {
	  type: "Listening"
	});
});



bot.on("message", message => {
if(message.author.bot) return;

var giiid = "402499256591712257";
    if(!message.content.startsWith(prefix)) return;
if(blarray.includes(message.author.id)) {
  	message.channel.send(`Hi, **${message.author.tag}**! This bot works only on H-Community`);
  	return;
  };
    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {

// comenzi normale

case "eval":
if(message.author.id != "429199866657243146") return message.channel.send(":octagonal_sign: **Only my developer can access this command.");
try {
  const code = args.join(" ");
  let evaled = eval(code);

  if (typeof evaled !== "string")
    evaled = require("util").inspect(evaled);

  message.channel.send(clean(evaled), {code:"xl"});
} catch (err) {
  message.channel.send(`\`\`\`xl\n${clean(err)}\n\`\`\``);
}
return;

case "minecraft":
if(!message.member.roles.some(r=>["Prime User"].includes(r.name))) return message.channel.send(`${message.author.tag}, you don't have the Prime User role, so you can't use the prime gen.`);
if(talkedRecently.has(message.author.id)) {
message.channel.send(`${message.author.tag}, You need to wait at least 5 minutes to type !minecraft again!`);
  return;
	};
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 300000);
var randomalt = textByLine[Math.floor(Math.random() * textByLine.length)];
var embed = new Discord.RichEmbed()
.setTitle(`Here is ur minecraft alt, sir.`)
.setDescription(randomalt)
.setColor(c)
.setTimestamp()
.setFooter("Thanks for using our Prime GEN!")
message.author.send({embed});
message.reply("check DMs.");
break;

case "spotify":
if(!message.member.roles.some(r=>["Prime User"].includes(r.name))) return message.channel.send(`${message.author.tag}, you don't have the Prime User role, so you can't use the prime gen.`);
if(talkedRecently.has(message.author.id)) {
message.channel.send(`${message.author.tag}, You need to wait at least 5 minutes to type !spotify again!`);
  return;
	};
talkedRecently.add(message.author.id);
setTimeout(() => {
  talkedRecently.delete(message.author.id);
}, 300000);
var salt = alt[Math.floor(Math.random() * textByLine.length)];
var embed = new Discord.RichEmbed()
.setTitle(`Here is ur spotify alt, sir.`)
.setDescription(salt)
.setTimestamp()
.setFooter("Thanks for using our Prime GEN!")
.setColor(c)
message.author.send({embed});
message.reply("check DMs.");
break;
		    
case "serverinfo":
	try {
var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField("» Name:", message.guild.name, true)
      .addField("» Owner:", message.guild.owner.user.username, true)
      .addField("» Server ID:", message.guild.id, true)
      .addField("» Owner ID:", message.guild.owner.id, true)
      .addField("» Members:", message.guild.memberCount, true)
      .addField("» Region:", message.guild.region, true)
      .addField('» Roles:', '' + message.guild.roles.map(r => r.name).join(', ') + '', true)
      .addField(`» Created at:`, `${moment.utc(message.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
      .addField('» Security level:', message.guild.verificationLevel, true)
      .addField("» Channels:", `Text: ${message.guild.channels.filter(ch => ch.type === 'text').size}\nVoice: ${ message.guild.channels.filter(ch => ch.type === "voice").size}`, true)
      .setColor(c)
      .setFooter(moment.utc(message.channel.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss'))
      .setThumbnail(message.guild.iconURL)
      message.channel.send({embed});
	}
	catch(err) {
	message.channel.send("An error occured: ```" + err + "```\nPlease contact the bot developer.");
return;
}
break;

};
});

bot.login(process.env.TOKEN);
