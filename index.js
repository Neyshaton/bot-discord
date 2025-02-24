const {Client, GatewayIntentBits} = require("discord.js");
const {token} = require("./config.json");

const client = new Client({intents: [GatewayIntentBits.Guilds]});


// Return true if the day is friday, saturday or sunday
function targetDay() {
    const today = new Date();
    const day = today.getDay(); // number of the day
    console.log(day)
    return day == 5 || day == 6 || day == 0; // Friday (5) | Saturday(6) | Sunday (7)
}

// Schedule message at 6 pm
function calculaMessage() {
    setInterval(() => {
        const now =  new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        // If it's 6pm and it's one of the due day then send a message otherwise send an error
        if (hours == 18 && minutes == 0 && targetDay()) {
            const channel = client.channels.cache.get("1343611933353312296");
            if (channel) {
                const lescalculafriends = ['545253837468860416', '300308940183306240', '464965461960949760', '1152217380601217056', '762705527532290048', '1186986731627626576', '433349056153124864'] // In order : Cyprien, Kenz, Giorgi, Chloe, Lily, Olga, Marine
                const mentions = lescalculafriends.map(id => `<@${id}>`).join(' '); // it makes the looking cool, thanks to chat
                channel.send(`Vous, ${mentions}, faites votre test d'entrée en calcula`);
            } else {
                console.error('Channel not found');
            }
    
        }
    }, 60*100);
}

client.once('ready', () => {
    console.log(`Bot Online !`);
    calculaMessage();
});
client.login(token);
