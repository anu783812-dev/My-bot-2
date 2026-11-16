const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');

const sessions = {};
const LINK_REGEX = /(https?:\/\/|www\.|chat\.whatsapp\.com|wa\.me|t\.me\/|\b[a-z0-9-]+\.(com|in|net|org|io|xyz|me|co|link|ly)\b)/i;

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
  if (/^(hi|hello|hey|hai|ഹായ്|ഹലോ)/.test(t)) {
    return 'ഹായ്! ഞാൻ ഒരു ഓട്ടോ ബോട്ട് ആണ്. നിങ്ങൾക്ക് എ
