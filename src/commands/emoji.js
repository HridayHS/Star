module.exports = {
    name: 'emoji',
    alias: ['e', 'emote', 'emotelink', 'emojilink', 'elink'],
    func: async function (message) {

        const doesMessageContainCustomEmoji = message.content.split(' ')[2].match(/^(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)+$/g);

        if (!doesMessageContainCustomEmoji) {
            message.channel.send('Invalid emoji.');
            return;
        }

        const emoji = {
            info: doesMessageContainCustomEmoji[0].slice(1).slice(0, -1).split(':')
        };

        emoji.id = emoji.info[2];
        emoji.extention = emoji.info.includes('a') ? 'gif' : 'png';
        emoji.url = `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.extention}`;

        message.channel.send(`<${emoji.url}>`, { files: [emoji.url] });
    }
};