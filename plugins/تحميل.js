import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  if (!text) return conn.reply(m.chat, `*يُرجى إدخال اسم الأنمي المطلوب.*`, m);
  
  try {
    const animeName = encodeURIComponent(text);
    const response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${animeName}&page=1`);
    const data = await response.json();
    
    if (data.results.length === 0) {
      return conn.reply(m.chat, `*عذراً، لم يتم العثور على الأنمي المطلوب.*`, m);
    }
    
    const anime = data.results[0];
    const animeId = anime.mal_id;
    
    const episodesResponse = await fetch(`https://graphql.anilist.co`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query($id: Int) {
            Media(id: $id, type: ANIME) {
              title {
                romaji
                english
              }
              streamingEpisodes {
                title
                url
              }
            }
          }
        `,
        variables: {
          id: animeId
        }
      })
    });

    const episodesData = await episodesResponse.json();
    const episodes = episodesData.data.Media.streamingEpisodes;
    
    let msg = `
*${anime.title}*
التقييم: ${anime.score}
الحالة: ${anime.airing ? 'مستمر' : 'مكتمل'}
الحلقات: ${anime.episodes}
التصنيف: ${anime.genres.map(genre => genre.name).join(', ')}
الرابط: ${anime.url}
`;

    if (episodes.length > 0) {
      msg += '\n\n*حلقات مدبلجة:*';
      episodes.forEach((episode, index) => {
        msg += `\n${index + 1}. ${episode.title} - [تحميل](${episode.url})`;
      });
    }
    
    conn.reply(m.chat, msg, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `*حدث خطأ أثناء جلب المعلومات. يرجى المحاولة مرة أخرى لاحقًا.*`, m);
  }
};

handler.command = /^(anime1|تحميل-انمي)$/i;

export default handler;
