import fetch from 'node-fetch';

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  try {
    if (!text) throw 'uhm.. what do you want to say?';

    const emojis = ['🤖', '😎', '🔥', '💯', '🚀', '🎉', '👌', '👏', '👍', '💡', '🔍', '💥', '⚡', '😃', '💪', '🙌', '🧠', '🤔', '😄', '📚', '🎯', '🌟', '✨', '🔮', '🦾'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    await m.react(randomEmoji);

    const prompt = encodeURIComponent(text);
    let userid = conn.getName(m.sender) || "default";
    let apiurl = `https://api.guruapi.tech/ai/gpt4?username=${userid}&query=hii${prompt}`;

    const result = await fetch(apiurl);
    const response = await result.json();

    if (!response.msg) throw 'No result found';

    const replyText = response.msg;
    await conn.sendButton(
      m.chat, 
      replyText, 
      author, 
      'https://qu.ax/XRHtJ.jpg',  
      [['الــمــطـور', `.المطور`]], 
      null, 
      [['قــنـاة الــبــوت', `https://whatsapp.com/channel/0029VaoNSIY72WU0I4sbeX0G`]], 
      m
    );
  } catch (error) {
    console.error(error);
    m.reply('*مرحبا ضع سؤالك يا اخي 🤡*');
  }
};

handler.help = ['gpt4 <text>'];
handler.tags = ['tools'];
handler.command = /^(بوت)$/i;

export default handler;
