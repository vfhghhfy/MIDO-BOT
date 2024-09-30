let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
    let message = '*مــنــور يـا قــلــب ميدو لــي الـاوامــر اكــتــب (.اوامر) ⚡️*';
    
    const emojis = ['⚡️', '🔥', '💥', '✨', '💫', '🌟', '🎉', '👑', '💖', '🎇', '🎆', '❤️', '🌈', '🌹', '🦋'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    await conn.sendMessage(m.chat, { react: { text: randomEmoji, key: m.key } });
    conn.sendFile(m.chat, 'https://qu.ax/HAJX.jpg', 'image.jpg', message, m);
};

handler.customPrefix = /^ميدو$/i;
handler.command = new RegExp;

export default handler;
