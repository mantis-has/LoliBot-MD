let linkRegex1 = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})|5chat-whatzapp\.vercel\.app/i;
let linkRegex2 = /whatsapp.com\/channel\/([0-9A-Za-z]{20,24})/i;

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
if (!m.isGroup) return 
if (isAdmin || isOwner || m.fromMe || isROwner) return
let chat = global.db.data.chats[m.chat];
let delet = m.key.participant;
let bang = m.key.id;
const user = `@${m.sender.split`@`[0]}`;
const groupAdmins = participants.filter(p => p.admin);
const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n');
let bot = global.db.data.settings[this.user.jid] || {};
const isGroupLink = linkRegex1.exec(m.text) || linkRegex2.exec(m.text);
const grupo = `https://chat.whatsapp.com`;
if (isAdmin && chat.antiLink && m.text.includes(grupo)) return m.reply(await tr('*El AntiLink Esta activo, eres admin, perdonado por ahora.*'));
if (chat.antiLink && isGroupLink && !isAdmin) {
if (isBotAdmin) {
const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
if (m.text.includes(linkThisGroup)) return !0;
}
conn.sendMessage(m.chat, { text: `*「 ${await tr("ANTILINK DETECTADO")} 」*\n\n${user} ${await tr("Rompiste las reglas del Grupo sera eliminado....")}`, mentions: [m.sender] }, { quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100 });
if (!isBotAdmin) return conn.sendMessage(m.chat, { text: await tr(`*Te salvarte gil, no soy admin no te puedo eliminar*`), mentions: [...groupAdmins.map(v => v.id)] }, { quoted: m });
if (isBotAdmin) {
conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
let responseb = conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
if (responseb[0].status === "404") return;
}} else if (!bot.restrict) {
//return m.reply('*𝙀𝙡 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤 𝙙𝙚𝙡 𝙗𝙤𝙩 𝙣𝙤 𝙩𝙞𝙚𝙣𝙚 𝙖𝙘𝙩𝙞𝙫𝙖𝙙𝙤 𝙚𝙡 𝙧𝙚𝙨𝙩𝙧𝙞𝙘𝙘𝙞𝙤𝙣 (𝙚𝙣𝙖𝙗𝙡𝙚 𝙧𝙚𝙨𝙩𝙧𝙞𝙘𝙩) 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙚 𝙘𝙤𝙣 𝙚𝙡 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙡𝙤𝙨 𝙝𝙖𝙗𝙞𝙡𝙞𝙩𝙚*');
}
return !0;
}
