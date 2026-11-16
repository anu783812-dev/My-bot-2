const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');

const sessions = {};
const LINK_REGEX = /(https?:\/\/[^\s]+)/;

function getText(msg) {
    const m = msg.message || {};
    return (
        m.conversation ||
        (m.extendedTextMessage && m.extendedTextMessage.text) ||
        (m.imageMessage && m.imageMessage.caption) ||
        (m.videoMessage && m.videoMessage.caption) ||
        ''
    );
}

function autoReply(text) {
    const t = text.toLowerCase().trim();
    if (/^(hi|hello|hey|hai)/.test(t)) {
        return 'Hi! I am an auto-bot. How can I help you?';
    }
    return null;
}

module.exports = { getText, autoReply };
