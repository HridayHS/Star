const { MessageEmbed } = require('discord.js');
const { serverRegionHR } = require('../../utils');

module.exports = {
	name: 'serverinfo',
	guildOnly: true,
	func: async function (message) {
		const serverCreated = message.guild.createdAt;

		message.channel.send(
			new MessageEmbed()
				.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
				.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 4096 }))
				.setColor('GREEN')
				.addFields(
					{ name: 'Owner', value: message.guild.owner, inline: true },
					{ name: 'Region', value: serverRegionHR(message.guild.region), inline: true },
					{ name: 'Admins', value: message.guild.members.cache.filter(member => !member.user.bot && member.hasPermission('ADMINISTRATOR')).size, inline: true },
					{ name: 'Roles', value: (await message.guild.roles.fetch()).cache.size, inline: true },
					{ name: 'Roles List', value: (await message.guild.roles.fetch()).cache.map(role => role.name).join(', '), inline: false },
				)
				.setFooter('ID: ' + message.guild.id + ' | ' + 'Server Created • ' + `${serverCreated.getDate()}/${serverCreated.getMonth()}/${serverCreated.getFullYear()}`)
		);
	}
};