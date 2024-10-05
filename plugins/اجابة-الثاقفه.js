
import similarity from 'similarity';

const threshold = 0.72;

let handler = m => m;

handler.before = async function (m) {
  let id = m.chat;
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/^سـؤال/i.test(m.quoted.text)) return !0;

  this.tekateki = this.tekateki ? this.tekateki : {};

  if (!(id in this.tekateki)) return m.reply(' لقد انتهى السؤال ⏳الثقافي اذا تريد سؤال اخر قول\n*.ثقافة*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n𝚖𝚟𝚛𝚘 𝚋𝚘𝚝');

  if (m.quoted.id == this.tekateki[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.tekateki[id][1]));

    if (m.text.toLowerCase() == json.response.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tekateki[id][2];
global.db.data.users[m.sender].limit += 1;
      m.reply(`❃ الجواب صحيح يالمثقف انت ✅ ❃
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
*لقد ربحت*\n+${this.tekateki[id][2]} Exp\n+1 💎
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
${gt}`); // Mostrar los diamantes ganados

      clearTimeout(this.tekateki[id][3]);
      delete this.tekateki[id];
    } else if (similarity(m.text.toLowerCase(), json.response.toLowerCase().trim()) >= threshold) {
      m.reply(`* قريب من الاجابة حاول تعدل الاملاء  !*
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
${gt}`);
    } else {
      m.reply('*❌ الاجابة خطأ يرجى تأكد من الاجابة !*\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n𝑮𝒐𝒌𝒖 𝙱𝙾𝚃');
    }
  }

  return !0;
};

handler.exp = 0;

export default handler;
