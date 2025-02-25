const path = require('path');

const cooldowns = new Map();
const messageCooldowns = new Map();

const emojis = ["👍", "💀"];

// when a thumbsup is a message
async function handlePouce(message) {
    if (message.author.bot) {return}; // to ignore bot reactions


    if (emojis.some(emoji => message.content.includes(emoji))) { // if the message contains a thumbsup
        const cooldownTime = 10 * 1000; // 10 seconds cooldown
        const userId = message.author.id;

        // check the user
        if (messageCooldowns.has(userId)) {
            const timeLeft = Date.now() - messageCooldowns.get(userId);
            if (timeLeft < cooldownTime) {
                return; // Ignore if still on cooldown
            }
        }

        // Check if the message contains any of the target emojis
        const emoji = emojis.find(emoji => message.content.includes(emoji));
        if (emoji) {
            // Update cooldown
            messageCooldowns.set(userId, Date.now());

            try {
                let filePath;
                if (emoji === '💀') {
                    filePath = path.join(__dirname, 'images', 'dead.png');
                    await message.channel.send({
                        content: `Bruh`,
                        files: [filePath],
                    });
                } else if (emoji === '👍') {
                    filePath = path.join(__dirname, 'images', 'pouce.png');
                    await message.channel.send({
                        content: `Comme ça`,
                        files: [filePath],
                    });
                }
            } catch (error) {
                console.error("Failed to send the message", error);
            }
        }
    };

}

// when a thumbsup is a reaction
async function handleReactionPouce(reaction, user) {
    if (user.bot) {return}; // to ignore bot reactions
    
    // Ensure the reaction is fully fetched
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Failed to fetch reaction:', error);
            return;
        }
    }

    // Get the emoji's name
    const emoji = reaction.emoji.name;

    if (emojis.includes(emoji)) {

        const cooldownTime = 10 * 1000; // 10 seconds cooldown
        const userId = user.id;

        // check user
        if (cooldowns.has(userId)) {
            const timeLeft = Date.now() - cooldowns.get(userId);
            if (timeLeft < cooldownTime) {
                return; // Ignore if still on cooldown
            }
        }

        // Update cooldown
        cooldowns.set(userId, Date.now());

        // get the right channel where the reaction is sent
        const channel = reaction.message.channel;
        try {
            let filePath;
            if (emoji === '💀') {
                filePath = path.join(__dirname, 'images', 'dead.png');
                await channel.send({
                    content: `Bruh`,
                    files: [filePath],
                });
            } else if (emoji === '👍') {
                filePath = path.join(__dirname, 'images', 'pouce.png');
                await channel.send({
                    content: `Comme ça`,
                    files: [filePath],
                });
            }
        } catch (error) {
            console.error("Failed to send the message", error);
        }

            
    };
}

    


module.exports = {
    handlePouce,
    handleReactionPouce
};