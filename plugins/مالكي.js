let handler = async (m, { conn }) => {
    let message = '📞 هذا هو رقم مطور البوت. يرجى عدم إزعاجه أو سيتم حظرك يا صديقي! 🚫';
    
    const emojis = ['⚡️', '🔥', '💥', '✨', '💫', '🌟', '🎉', '👑', '💖', '🎇', '🎆', '❤️', '🌈', '🌹', '🦋', '😊', '😎', '👍', '🙌', '🤩'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    await conn.sendMessage(m.chat, { react: { text: randomEmoji, key: m.key } });
    await conn.sendMessage(m.chat, { text: message }, { quoted: m });
    
    await conn.sendFile(m.chat, 'https://qu.ax/cQCO.jpg', 'developer.jpg', message, m);
};

handler.customPrefix = /^(مطور|المالك|المطور)$/i;
handler.command = new RegExp;

export default handler;
