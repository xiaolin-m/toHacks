module.exports = {
    name: 'mood',
    aliases: ['m'],
    category: 'Music',
    utilisation: '{prefix}mood',
    execute(client, message, args) {

        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} You are not in the same voice channel!`);

        if (!args[0]) 
        {
            message.channel.send(`Please select your mood by reacting to this message.\nHappy:  ☀️   Sad:  🌦   Angry:  😡   Chill:  🍄`).then(msg => {
                msg.react("☀️") // happy
                msg.react("🌦") // sad
                msg.react("😡") // angry
                msg.react("🍄") // chill

                const filter = (reaction, user) => {
                    return ['☀️', '🌦', '😡', '🍄'].includes(reaction.emoji.name) && user.id === message.author.id && !user.bot;
                };
                const collector = msg.createReactionCollector(filter, { time: 60000 })
                collector.on('collect', r => {
                    if (r.emoji.name === '☀️'){
                        message.channel.send("You selected happy ☀️")
                        client.player.play(message, args[0] = "https://www.youtube.com/watch?v=LjhCEhWiKXk&list=PL1VuYyZcPYIJTP3W_x0jq9olXviPQlOe1", { firstResult: true });
                    }
                    else if (r.emoji.name === '🌦'){
                        message.channel.send("You selected sad 🌧")
                        client.player.play(message, args[0] = "https://www.youtube.com/watch?v=CveANi17YfU&list=PL3-sRm8xAzY-w9GS19pLXMyFRTuJcuUjy", { firstResult: true });
                    }
                    else if (r.emoji.name === '😡'){
                        message.channel.send("You selected angry 😡")
                        client.player.play(message, args[0] = "https://www.youtube.com/playlist?list=PL7v1FHGMOadBhCjuh_ljEEhqrQKCBsoIn", { firstResult: true });
                    }
                    else if (r.emoji.name === '🍄'){
                        message.channel.send("You selected chill 🍄")
                        client.player.play(message, args[0] = "https://www.youtube.com/playlist?list=PLgzTt0k8mXzEpH7-dOCHqRZOsakqXmzmG", { firstResult: true });                        
                    }

                })
        
            })
        
        };

}
};