const express = require('express');
const path = require('path');
const { getPairingCode } = require('./bot');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/pair', async (req, res) => {
    try {
        const number = String(req.body.number || '').replace(/\D/g, '');
        if (number.length < 10 || number.length > 15) {
            return res.status(400).json({ error: 'Invalid number. Please provide a valid phone number including the country code.' });
        }
        const code = await getPairingCode(number);
        res.json({ code });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Failed to generate pairing code.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
