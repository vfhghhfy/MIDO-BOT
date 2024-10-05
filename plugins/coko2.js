import fetch from 'node-fetch';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `*هـذا هـو chatgpt اكـتب سـؤالـك وسـيرد عـليك*\nمـثال:\n*.مارو اريـد بعـض النـصائح لـعيش حيـاه سـعيده*\n\n*.مارو كـيف ابـدأ فـي مـجال الـبرمجه*`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    const rwait = '🕒'; // رمز الانتظار
    const done = '✅'; // رمز الانتهاء

    await conn.sendMessage(m.chat, {
      image: { url: 'https://telegra.ph/file/cf3ff642dd9eb7b209e36.jpg' },
      caption: 'ثانيه افكر....⚡'
    }, { quoted: m });
    
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);

    const guru2 = `https://aemt.me/bard?text=${prompt}`;

    let response = await fetch(guru2);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    let result = data.completion;
    if (!result) throw new Error('No completion found in the response.');

    let yourName = '𝐵𝑌:𝙼𝚅𝚁𝙾 𝙱𝙾𝚃'; // قم بتعيين اسمك هنا

    await conn.sendMessage(m.chat, {
      text: result + ' ' + yourName
    }, { quoted: m });

    // تعيين رمز الانتهاء
    // ملاحظة: يجب عليك توفير طريقة لتحديث الحالة إذا كان لديك دالة لهذا الغرض
    // m.react(done);  // تأكد من أن لديك دالة لتحديث حالة الرسالة

  } catch (error) {
    console.error('خطأ:', error);
    throw `*[❗] خطأ، يرجى إدخال نص صحيح*`;
  }
};

handler.help = ['chats'];
handler.tags = ['ذكاء اصناعي'];
handler.command = ['goku', 'غوكو'];

export default handler;
