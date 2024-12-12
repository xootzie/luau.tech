const express = ('express');
const router = express.router();
const axios = require('axios');

router.get('/first-message', async (req, res) => {
    console.log('Reached /api/discord/first-message endpoint');
    const { channelId, token } = req.query;
    console.log('Channel ID:', channelId, 'Token:', token ? 'Provided' : 'Not provided');
   
    if (!channelId || !token) {
        console.log('Missing required parameters');
        return res.status(400).json({ error: 'Missing required parameters' });
    }
 
    try {
        console.log('Starting to fetch messages from Discord API');
        let oldestMessageId = null;
        let oldestMessage = null;
 
        while (true) {
            const response = await axios.get(`https://discord.com/api/v10/channels/${channelId}/messages`, {
                headers: {
                    'Authorization': `Bot ${token}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    limit: 100,
                    before: oldestMessageId,
                },
            });
 
            console.log(`Fetched ${response.data.length} messages`);
           
            if (response.data.length === 0) {
                break;
            }
 
            const currentOldest = response.data[response.data.length - 1];
            if (!oldestMessage || new Date(currentOldest.timestamp) < new Date(oldestMessage.timestamp)) {
                oldestMessage = currentOldest;
            }
 
            oldestMessageId = response.data[response.data.length - 1].id;
 
            if (response.data.length < 100) {
                break;
            }
        }
 
        if (oldestMessage) {
            console.log('Oldest message found:', oldestMessage.id);
            res.json({
                success: true,
                message: {
                    id: oldestMessage.id,
                    content: oldestMessage.content,
                    author: {
                        id: oldestMessage.author.id,
                        username: oldestMessage.author.username,
                    },
                    timestamp: oldestMessage.timestamp,
                },
            });
        } else {
            console.log('No messages found in the channel');
            res.status(404).json({ error: 'No messages found in the channel' });
        }
    } catch (error) {
        console.error('Error fetching oldest message from Discord:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch the oldest message',
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;