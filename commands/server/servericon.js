const { imgDominantColor } = require('../../utils');

module.exports = {
	name: 'servericon',
	alias: ['si'],
	guildOnly: true,
	func: async function (message) {
		const server = message.guild;

		if (!server.available) {
			message.channel.send(`Server not accessible at the moment.`);
			return;
		}

		if (!server.icon) {
			message.channel.send(`Server icon not found.`);
			return;
		}

		const iconDominantColor = await imgDominantColor(server.iconURL({ format: 'png' }));

		message.channel.send({
			embeds: [{
				color: iconDominantColor.value,
				author: {
					name: server.name,
					iconURL: server.iconURL({ dynamic: true }),
				},
				image: {
					url: server.iconURL({ format: 'png', dynamic: true, size: 4096 })
				}
			}]
		});
	}
};