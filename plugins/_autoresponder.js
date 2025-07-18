import axios from 'axios';
import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api';
import { sticker } from '../lib/sticker.js';
import { perplexity } from '../lib/scraper.js';

//let handler = m => m;
//handler.all = async function (m, {conn}) {
export async function before(m, { conn }) {
let user = global.db.data.users[m.sender]
let chat = global.db.data.chats[m.chat];
let setting = global.db.data.settings[this.user.jid]
let prefixRegex = new RegExp('^[' + setting.prefix.replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') + ']');

//if (prefixRegex.test(m.text)) return true;
if (m.mentionedJid.includes(this.user.jid)) {
//if (m.mentionedJid.includes(this.user.jid) || (m.quoted && m.quoted.sender === this.user.jid)) {
if (chat.simi) return;
if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') ||  m.text.includes('menu') ||  m.text.includes('estado') || m.text.includes('bots') ||  m.text.includes('serbot') || m.text.includes('jadibot') || m.text.includes('Video') || m.text.includes('Audio') || m.text.includes('audio') || m.text.includes('Bot') || m.text.includes('bot') || m.text.includes('Exp') || m.text.includes('diamante') || m.text.includes('lolicoins') || m.text.includes('Diamante') || m.text.includes('Lolicoins')) return !0
if (["120363402078116190@newsletter", "120363420059734524@newsletter"].includes(m.chat)) return;
await this.sendPresenceUpdate('composing', m.chat);

async function luminsesi(q, username, logic) {
try {
const response = await axios.post("https://luminai.my.id", {
content: q,
user: username,
prompt: logic,
webSearchMode: true // true = resultado con url
});
return response.data.result;
} catch (error) {
console.error(error);
}}

async function perplexityIA(q, logic) {
      try {
        let response = await perplexity.chat([
          { role: 'system', content: logic || syms1 },
          { role: 'user', content: q }
        ], 'sonar-pro');
        if (response.status) {
          return response.result.response;
        } else {
          throw new Error(`Error en Perplexity: ${response.result.error}`);
        }
      } catch (error) {
        console.error('Error en Perplexity:', error);
        return null;
      }
    }

let query = m.text;
let username = `${m.pushName}`;
let txtDefault = await fetch('https://raw.githubusercontent.com/elrebelde21/LoliBot-MD/main/src/text-chatgpt.txt').then(v => v.text());
//await fetch('https://raw.githubusercontent.com/Skidy89/chat-gpt-jailbreak/main/Text.txt').then(v => v.text());
let syms1 = chat.sAutorespond ? chat.sAutorespond : txtDefault

if (!chat.autorespond) return 
if (m.fromMe) return
let result
if (!result || result.trim().length === 0) {
result = await perplexityIA(query, syms1);
}
    
if (!result || result.trim().length === 0) {
result = await luminsesi(query, username, syms1);
result = result.replace(/Maaf, terjadi kesalahan saat memproses permintaan Anda/g, '').trim();
result = result.replace(/Generated by BLACKBOX\.AI.*?https:\/\/www\.blackbox\.ai/g, '').trim();
result = result.replace(/and for API requests replace https:\/\/www\.blackbox\.ai with https:\/\/api\.blackbox\.ai/g, '').trim();
}

if (result && result.trim().length > 0) {
await this.reply(m.chat, result, m);
await this.readMessages([m.key])
} else {
let gpt = await fetch(`${apis}/ia/gptprompt?text=${m.text}?&prompt=${syms1}`) 
let res = await gpt.json()
await this.reply(m.chat, res.data, m)
}}
return true;
}

//export default handler;