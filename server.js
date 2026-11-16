const express = require('express');
const path = require('path');
const { getPairingCode, restoreAll } = require('./bot');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/pair', async (req, res) => {
    try {
        const number = String(req.body.number || '').replace(/\D/g, '');
        if (number.length < 10 || number.length > 15) {
            return res.status(400).json({ error: 'സാധുവായ നമ്പർ കൊടുക്കുക. രാജ്യ കോഡ് കൂടെ വേണം.' });
        }
        const code = await getPairingCode(number);
        res.json({ code });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'കോഡ് ഉണ്ടാക്കുന്നതിൽ പരാജയപ്പെട്ടു.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    restoreAll();
});

