import translate from '@vitalets/google-translate-api'
const defaultLang = 'ar'
const tld = 'cn'

let handler = async (m, { args, usedPrefix, command, emoji }) => {
    let err = `
╮ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╭ـ
˼🤖˹┆ الـاسـم┆⌟𝑀𝐼𝐷𝛩⌜
˼🤖˹┆ مثال┆⌟ .ترجم hello pro⌜
╯ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╰ـ
> ˼👻˹ مــلـاحـــظـــة ⇅ ↶
╮ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╭ـ
> تابع قناة البوت يا برو 👽👇🏻
https://whatsapp.com/channel/0029VaoNSIY72WU0I4sbeX0G
╯ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╰ـ
> 𝑀𝐼𝐷𝛩﹝⚡﹞𝐁𝐎𝐓 © 𝐁𝐘 𝑀𝛩𝐻𝐴𝑀𝑀𝐸𝐷 𝐴𝐷𝐸𝐿`.trim()

    let lang = args[0]
    let text = args.slice(1).join(' ')
    if ((args[0] || '').length !== 2) {
        lang = defaultLang
        text = args.join(' ')
    }
    if (!text && m.quoted && m.quoted.text) text = m.quoted.text

    try {
        let result = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null)
        const emojiList = ['😄', '😎', '🤖', '🎉', '💫']
        const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)]
        m.reply(`${result.text} ${randomEmoji}`)
    } catch (e) {
        throw err
    }
}
handler.help = ['trad <leng> <text>']
handler.tags = ['tools']
handler.command = ['tl', 'ترجم']

export default handler
