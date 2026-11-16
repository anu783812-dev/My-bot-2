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
      return res.status(400).json({ error: 'ശരിയായ നമ്പർ കൊടുക്കുക. രാജ്യ കോഡ് കൂടി വേണം, ഉദാഹരണം 919876543210' });
    }
    const code = await getPairingCode(number);
    res.json({ code });
  } catch (e) {
    res.status(500).json({ error: 'കോഡ് ഉണ്ടാക്കാൻ പറ്റിയില്ല. കുറച്ച് കഴിഞ്ഞ് വീണ്ടും ശ്രമിക്കുക.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on ' + PORT);
  restoreAll();
});
