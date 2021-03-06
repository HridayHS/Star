const { serverRegionHR } = require('../../utils');

module.exports = {
	name: 'serverinfo',
	guildOnly: true,
	func: async function (message) {
		const serverCreated = message.guild.createdAt;
		const serverMembers = await message.guild.members.fetch({ force: true });
		const serverRoles = await message.guild.roles.fetch(null, true, true);

		message.channel.send({
			embed: {
				author: {
					name: message.guild.name,
					icon_url: message.guild.iconURL({ dynamic: true })
				},
				thumbnail: { url: message.guild.iconURL({ format: 'png', dynamic: true, size: 4096 }) },
				color: 'GREEN',
				fields: [
					{ name: 'Owner', value: message.guild.owner, inline: true },
					{ name: 'Region', value: serverRegionHR(message.guild.region), inline: true },
					{ name: 'Admins', value: serverMembers.filter(member => !member.user.bot && member.hasPermission('ADMINISTRATOR')).size, inline: true },
					{ name: 'Roles', value: serverRoles.cache.size, inline: true },
					{ name: 'Roles List', value: serverRoles.cache.map(role => role.name).join(', '), inline: false }
				],
				footer: {
					text: 'ID: ' + message.guild.id + ' | ' + 'Server Created • ' + `${serverCreated.getDate()}/${serverCreated.getMonth()}/${serverCreated.getFullYear()}`
				}
			}
		});
	}
};