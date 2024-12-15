const { Client, GatewayIntentBits } = require('discord.js');

const sendApxHandler = async (req, res) => {
    try {
        // Check for authorization header
        const botToken = req.headers.authorization;
        if (!botToken) {
            return res.status(401).json({ error: 'Bot token is required' });
        }

        // Validate request body
        const { channelId, serverId, message } = req.body;
        if (!channelId || !serverId || !message) {
            return res.status(400).json({ 
                error: 'Channel ID, Server ID, and message are required' 
            });
        }

        // Validate message structure
        if (typeof message !== 'object') {
            return res.status(400).json({ 
                error: 'Message must be a JSON object' 
            });
        }

        // Create a new Discord client with necessary intents
        const client = new Client({ 
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ] 
        });

        // Login to Discord
        await client.login(botToken);

        // Wait for the client to be ready
        await new Promise((resolve, reject) => {
            client.once('ready', () => resolve());
            client.once('error', (error) => reject(error));
        });

        // Find the guild (server)
        const guild = client.guilds.cache.get(serverId);
        if (!guild) {
            client.destroy();
            return res.status(404).json({ error: 'Server not found' });
        }

        // Find the channel
        const channel = guild.channels.cache.get(channelId);
        if (!channel) {
            client.destroy();
            return res.status(404).json({ error: 'Channel not found' });
        }

        // Send the message
        await channel.send(message);

        // Destroy the client connection
        client.destroy();

        // Respond with success
        res.status(200).json({ 
            message: 'Message sent successfully',
            channelId,
            serverId 
        });

    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ 
            error: 'Failed to send message', 
            details: error.message 
        });
    }
};

module.exports = { sendApxHandler };