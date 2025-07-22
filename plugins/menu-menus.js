//* Código creado por Félix, no quites créditos *//

import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
import { promises } from 'fs';
import { join } from 'path';

// Creamos un objeto global para almacenar el banner y el nombre por sesión
global.bannerUrls = {}; // Almacenará las URLs de los banners por sesión
global.botNames = {};   // Almacenará los nombres personalizados por sesión

let handler = async (m, { conn, usedPrefix, text, command }) => {
  try {
    // Inicializamos el banner y el nombre por sesión si no existen
    if (!global.bannerUrls[conn.user.jid]) {
      global.bannerUrls[conn.user.jid] = 'https://qu.ax/XkPVZ.jpg'; // URL inicial de la imagen del menú
    }
    if (!global.botNames[conn.user.jid]) {
      global.botNames[conn.user.jid] = 'Bot'; // Nombre inicial del bot
    }

    // Verificar si el usuario es el socket activo
    const isSocketActive = conn.user.jid === m.sender;

    // Comando para cambiar el banner (solo permitido para el socket activo)
    if (command === 'setbanner') {
      if (!isSocketActive) {
        return await m.reply('「🩵」Este comando solo puede ser usado por el socket.', m);
      }
      if (!text) {
        return await m.reply('✘ Por favor, proporciona un enlace válido para la nueva imagen del banner.', m);
      }
      global.bannerUrls[conn.user.jid] = text.trim(); // Actualiza el banner solo para esta sesión
      return await m.reply('「🩵」El banner fue actualizado con éxito...', m);
    }

    // Comando para cambiar el nombre del bot (solo permitido para el socket activo)
    if (command === 'setname') {
      if (!isSocketActive) {
        return await m.reply('「🩵」Este comando solo puede ser usado por el socket.', m);
      }
      if (!text) {
        return await m.reply('「🩵」¿Qué nombre deseas agregar al socket?', m);
      }
      global.botNames[conn.user.jid] = text.trim(); // Actualiza el nombre solo para esta sesión
      return await m.reply('「🩵」El nombre fue actualizado con éxito...', m);
    }

    // Comandos para el menú y "CARGANDO COMANDOS" (pueden ser usados por cualquier usuario)
    if (command === 'menu' || command === 'help' || command === 'menú') {
      // Variables para el contexto del canal
      const dev = 'Félix Manuel';
      const redes = 'https://github.com/Andresv27728/2.0';
      const channelRD = { id: "120363400360651198@newsletter", name: "MAKIMA - FRASES" };
      let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/mqtxvp.jpg');

      // Mensaje de "CARGANDO COMANDOS..." con contexto de canal y respondiendo al mensaje
      await conn.sendMessage(m.chat, {
        text: 'ꪹ͜🕑͡ 𝗖𝗔𝗥𝗚𝗔𝗡𝗗𝗢 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦...𓏲✧੭',
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            newsletterName: channelRD.name,
            serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
            title: 'Animación de carga',
            body: dev,
            thumbnailUrl: perfil,
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        }
      }, { quoted: m });

      // Datos usuario y menú
      let { exp, chocolates, level, role } = global.db.data.users[m.sender];
      let { min, xp, max } = xpRange(level, global.multiplier);
      let nombre = await conn.getName(m.sender);
      let _uptime = process.uptime() * 1000;
      let _muptime;
      if (process.send) {
        process.send('uptime');
        _muptime = await new Promise(resolve => {
          process.once('message', resolve);
          setTimeout(resolve, 1000);
        }) * 1000;
      }
      let muptime = clockString(_muptime);
      let uptime = clockString(_uptime);
      let totalreg = Object.keys(global.db.data.users).length;
      let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
      const emojis = '🩵';
      const error = '❌';

      let botname = global.botNames[conn.user.jid]; // Nombre del bot específico para esta sesión
      let menu = `¡Hola! ${taguser} soy  ${(conn.user.jid == global.conn.user.jid ? '(OficialBot)' : '(Sub-Bot)')} 

╭━━I N F O-B O-T━━
┃Creador: 𓆩‌۫᷼ ִֶָღܾ݉͢ғ꯭ᴇ꯭፝ℓɪ꯭ͨא𓆪
┃Tiempo activo: ${uptime}
┃Baileys: Multi device
┃Moneda actual: ${moneda}
┃Registros: ${totalreg}
╰━━━━━━━━━━━━━

╭━━INFO USUARIO━╮
┃Nombre: ${nombre}
┃Rango: ${role}
┃Nivel: ${level}
┃Coins: ${chocolates}
╰━━━━━━━━━━━━━

➪ 𝗟𝗜𝗦𝗧𝗔 
       ➪  𝗗𝗘 
           ➪ 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦

╭━━ *PRINCIPALES*  ━━━╮
┃.menu18
┃.hornymenu
┃.nwfshorario
┃.cuentaoficial
┃.dashboard
┃.donar
┃.estado
┃.groups
┃.grouplist
┃.grupos
┃.infobot
┃.instalarbot
┃.ping
┃.speed
┃.reporte <teks>
┃.request <teks>
┃.runtime
┃.speedtest
┃.help
╰━━━━━━━━━━━━━


╭━━ *SUB-BOTS*━━━━━╮
┃.bcbot
┃.deletesession
┃.eliminarsesion
┃.setprimary <@tag>
┃.setconfig
┃.listjadibot
┃.bots
┃.stop
┃.serbot
┃.jadibot
┃.code
╰━━━━━━━━━━━━━


╭━ *DESCARGAS*━━━╮
┃.drive <url> 
┃.fb 
┃.facebook 
┃.fbdl 
┃.gitclone <url> 
┃.instagram *<link ig>* 
┃.igstalk 
┃.mediafire 
┃.mediafiredl 
┃.apk 
┃.apkmod 
┃.play
┃.play2
┃.play3
┃.play4
┃.playdoc
┃.ytmp4
┃.ytmp3
┃.playlist
┃.yts
┃.spotify 
┃.thread 
┃.tiktok 
┃.tiktoksearch <texto> 
┃.tiktokstalk 
┃.applemusic 
╰━━━━━━━━━━━━━


╭━━━ *JUEGOS*━━━━━╮
┃.acertijo
┃.pelicula
┃.trivia
┃.ahorcado
┃.consejo
┃.ppt
┃.suitpvp
┃.pvp
┃.slot
┃.apostar
┃.tictactoe
┃.ttt
┃.math
┃.matemáticas
┃.delttt
┃.love
┃.gay2
┃.lesbiana
┃.pajero
┃.pajera
┃.puto
┃.puta
┃.manco
┃.manca
┃.rata
┃.prostituta
┃.prostituto
┃.amigorandom
┃.amistad
┃.regalar
┃.formarpareja
┃.gay
┃.personalidad
┃.pregunta
┃.ship
┃.topgays
┃.top
┃.topputos
┃.toplindos
┃.toppajer@s
┃.topshipost
┃.toppanafresco
┃.topgrasa
┃.topintegrantes
┃.topfamos@s
┃.topsostero
┃.top5parejas
┃.Doxxeo
┃.doxxeo
┃.follar
┃.piropo
┃.chiste
┃.reto
┃.verdad
┃.frases
┃.sopa
┃.buscarpalabras
┃.cf <cantidad>
┃.rt <color> <cantidad>
┃.txt 
┃.brat 
┃.dados
╰━━━━━━━━━━━━━


╭━ *RPG - GACHA*━━━━━╮
┃.addpersonajes
┃.rf-personajes
┃.harem @tag
┃.give @tag nombre_del_personaje
┃.rf-retirar
┃.rf-vender
┃.vote <nombre del personaje>
┃.rf
┃.rw
╰━━━━━━━━━━━━━


╭━━━ *REGISTRO*━━╮
┃.perfil
┃.perfil *@user*
┃.reg
┃.verificar
┃.myns
┃.nserie
┃.unreg
╰━━━━━━━━━━━━━


╭━━━ *GRUPO*━━━━━╮
┃.group open/close
┃.grupo abrir/cerrar
┃.grupo aprobar +number
┃.grouptime *<open/close>* *<número>*
┃.delete *@user*
┃.delwarn *@user*
┃.demote *593xxx*
┃.demote *@usuario*
┃.demote *responder chat*
┃.infogp
┃.hidetag
┃.kick *@user*
┃.linkgroup
┃.listwarn
┃.pin
┃.promote *593xxx*
┃.promote *@usuario*
┃.promote *responder chat*
┃.resetlink
┃.setbye <text>
┃.setdesc
┃.setname
┃.setppgc
┃.setwelcome <text>
┃.simulate <event> @user
┃.staff
┃.tagall <mesaje>
┃.invocar <mesaje>
┃.contador
┃.warn @user
┃.infomenuable <option>
╰━━━━━━━━━━━━━



╭━ *CONFIGURACIÓN*━╮
┃.enable <option>
┃.disable <option>
┃.on <option>
┃.off <option>
╰━━━━━━━━━━━━━


╭━━━  *NSFW* ━━━╮
┃.nsfwloli 
┃.nsfwfoot 
┃.nsfwass
┃.nsfwbdsm 
┃.nsfwcum 
┃.nsfwero 
┃.nsfwfemdom 
┃.nsfwfoot 
┃.nsfwglass 
┃.nsfworgy 
┃.yuri 
┃.yuri2 
┃.yaoi 
┃.yaoi2 
┃.panties 
┃.tetas 
┃.booty 
┃.ecchi 
┃.furro 
┃.hentai 
┃.trapito 
┃.imagenlesbians 
┃.pene 
┃.porno 
┃.randomxxx 
┃.pechos 
┃.hentai 
┃.hentai2 
┃.nsfwloli 
┃.porno 
┃.tetas
┃.china 
┃.boobs 
┃.pack 
┃.pack2 
┃.pack3 
┃.pack4 
┃.videoxxx 
┃.videoxxxlesbi 
┃.girls 
┃.pornolesbiv 
┃.xnxxdl 
┃.xnxxsearch <query> 
╰━━━━━━━━━━━━━


╭━━ *BUSCADORES*  ━━╮
┃.animeinfo
┃.google <pencarian> 
┃.googlef <pencarian> 
┃.lirik <Apa>
┃.letra <Apa>
┃.wikipedia <apa> 
┃.gimage <query> 
┃.imagen <query> 
┃.pinterest <keyword> 
┃.chagpt
┃.ia
┃.openai
┃.gemini
┃.copilot
┃.dalle 
╰━━━━━━━━━━━━━


╭━  *STICKERS* ━╮
┃.attp
┃.emojimix emot1|emot2> 
┃.exif <packname> | <author>
┃.kiss
┃.qc
┃.sticker
┃.wm <packname>|<author>
╰━━━━━━━━━━━━━


╭━ *RPG - ECONOMY*━╮
┃.afk [razón]
┃.balance
┃.dep
┃.retirar
┃.daily
┃.robar
┃.daily
┃.claim
┃.top
┃.levelup
┃.minar
┃.divorce <@tag>
┃.marry @tag
┃.pareja
┃.rob
┃.Buy
┃.Buyall
┃.transfer [tipo] [cantidad] [@tag]
┃.work
┃.trabaja
┃.w
╰━━━━━━━━━━━━━


╭━ *CONVERTIDORES*━╮
┃.toanime
┃.togif
┃.toimg (reply)
┃.tomp3
┃.tourl <reply image>
┃.tovideo
┃.tts <lang> <teks>
╰━━━━━━━━━━━━━

╭━━━ *LOGOS* ━━╮
┃.blackpink *<texto>* 
┃.logos 
╰━━━━━━━━━━━━━


╭━*HERRAMIENTAS*━╮
┃.setlang [código|nombre|número] - Cambia el idioma del bot
┃.tinyurl <link>
┃.acortar <link>
┃.autorespond <text>
┃.clima *<ciudad/país>*
┃.poll
┃.encuesta
┃.fake <text> @user <text2> 
┃.ds
┃.hd 
┃.nowa
┃.npmsearch 
┃.readmore <text1>|<text2> 
┃.ss *<url>* 
┃.ssweb *<url>* 
┃.style *<texto>* 
┃.superinspect
┃.inspect
┃.traducir
┃.translate
┃.quemusica
╰━━━━━━━━━━━━


╭━━ *RANDOM* ━╮
┃.akira 
┃.akiyama 
┃.anna 
┃.asuna 
┃.ayuzawa 
┃.boruto 
┃.chiho 
┃.chitoge 
┃.deidara 
┃.erza 
┃.elaina
┃.eba 
┃.emilia 
┃.hestia 
┃.hinata 
┃.inori 
┃.isuzu 
┃.itachi 
┃.itori 
┃.kaga 
┃.kagura 
┃.kaori 
┃.keneki 
┃.kotori 
┃.kurumi 
┃.madara 
┃.mikasa 
┃.miku 
┃.minato 
┃.naruto 
┃.nezuko 
┃.sagiri 
┃.sasuke 
┃.sakura 
┃.cosplay 
┃.blackpink 
┃.cristianoronaldo 
┃.cr7 
┃.cat 
┃.itzy 
┃.kpopitzy 
┃.kpop 
┃.loli 
┃.lolivid 
┃.lolivideos 
┃.lolívid 
┃.meme 
┃.memes 
┃.meme2 
┃.memes2 
┃.messi 
┃.neko 
┃.ppcp 
┃.ppcouple 
┃.waifu 
┃.wpmontaña 
┃.pubg 
┃.wpgaming 
┃.wpaesthetic 
┃.wprandom 
┃.coffee 
┃.pentol 
┃.caricatura 
┃.ciberespacio 
┃.technology 
┃.doraemon 
┃.hacker 
┃.planeta 
┃.randomprofile 
┃.wpaesthetic2 
┃.wpvehiculo 
┃.wallhp
┃.wpmoto 
╰━━━━━━━━━━━━━


╭━ *EFECTOS - AUDIOS*━╮
┃.bass [vn]
┃.blown [vn]
┃.deep [vn]
┃.earrape [vn]
┃.fast [vn]
┃.fat [vn]
┃.nightcore [vn]
┃.reverse [vn]
┃.robot [vn]
┃.slow [vn]
┃.smooth [vn]
┃.tupai [vn]
╰━━━━━━━━━━━━━


╭━━ *CREADOR*━━━━╮
┃.infomenuable <option>
┃.addprem [@user] <days>
┃.autoadmin
┃.backup
┃.banchat
┃.listban
┃.listablock
┃.banuser
┃.broadcast <teks>
┃.bc <teks>
┃.broadcastgroup <teks>
┃.bcgc <teks>
┃.block
┃.unblock
┃.broadcastchats <teks>
┃.bcchats <teks>
┃.addcmd
┃.delcmd
┃.listcmd
┃.delprem <@user>
┃>
┃=>
┃$
┃.fetch *<url>* 
┃.getplugin <texto>
┃.join [chat.whatsapp.com] [tiempo]
┃.leave
┃.restart
┃.setbotname <teks>
┃.setppbot
┃.setprefix [prefix | none | del prefix]
┃.unbanuser
┃.update
┃.addexp
┃.addlimit
╰━━━━━━━━━━━━━


> © ⍴᥆ᥕᥱrᥱძ ᑲᥡ DEYMOON CLUB`.trim(); // El resto del menú permanece igual

      // Enviar el menú con el banner y nombre específico para esta sesión y respondiendo al mensaje
      await conn.sendMessage(m.chat, {
        image: { url: global.bannerUrls[conn.user.jid] },
        caption: menu,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            newsletterName: channelRD.name,
            serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
            title: '𝐌A͜͡𝑲𝑖𝐌ꪖ  𝐁o͟T͎ 𝙼𝙳',
            body: dev,
            thumbnailUrl: perfil,
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        }
      }, { quoted: m });

      await m.react(emojis);
    }

  } catch (e) {
    await m.reply(`✘ Ocurrió un error cuando la lista de comandos se iba a enviar.\n\n${e}`, m);
    await m.react(error);
  }
};

handler.help = ['menu', 'setbanner', 'setname'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú', 'asistenciabot', 'comandosbot', 'listadecomandos', 'menucompleto', 'setmenubanner', 'semenutname'];
handler.register = true;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

export default handler;