import { getActressBySlug, getTagBySlug } from './catalog';

export type Article = {
  slug: string;
  title: string;
  image_url: string;
  actresses: string[];
  actress_slugs: string[];
  tags: string[];
  description: string;
};

export type ArticleChip = {
  name: string;
  href: string;
  kind: 'tag' | 'actress';
};

const articles: Article[] = [
  {
    slug: 'anal-lick-lesbian-1',
    title: 'アナル舐めレズビアン アンナと花子全面監修 乙葉ななせ 湊莉久',
    image_url: 'https://pics.dmm.co.jp/digital/video/3wanz00212/3wanz00212pl.jpg',
    actresses: ['乙葉ななせ', '湊莉久'],
    actress_slugs: ['otoha-nanase', 'minato-riku'],
    tags: ['anal', 'lez', 'anal-lick'],
    description:
      'ワンズファクトリー×アンナと花子の強力コラボ第2弾！！アン花で大好評だった『アナル舐めレズビアン』が復活！！乙女の舌が恥ずかしい穴を舐めまわす…未体験の快感にイキまくる仲良し同士の女の子。柔肌が絡み合う禁断のエクスタシー…チュパチュパ吸いつく唇と舐め回す唾液舌…乙女たちの喘ぎ声がアナルからも響き渡る！！',
  },
  {
    slug: 'anal-lick-lesbian-2',
    title: 'アナル舐めレズビアン つぼみ 琥珀うた',
    image_url: 'https://pics.dmm.co.jp/digital/video/annd00124/annd00124pl.jpg',
    actresses: ['つぼみ', '琥珀うた'],
    actress_slugs: ['tsubomi', 'kohaku-uta'],
    tags: ['anal', 'lez', 'anal-lick'],
    description:
      'つぼみと琥珀がケツ穴ベロ舐めエクスタシー！健康的な小麦色した琥珀のケツの肛門が、つぼみのベロでにゅるにゅるレロレロしゃくりあげられる様に圧迫されて、肛門ひくひくケツ穴オルガ！真っ白つるつるつぼみのケツの肛門も、マングリアヌスで琥珀にグリグリじゅぽじゅぽ吸肛お掃除されちゃって、肛門ぷるぷるケツ穴オルガ！',
  },
  {
    slug: 'anal-certification-world',
    title: '肛門認証が当たり前になった世界',
    image_url: 'https://pics.dmm.co.jp/digital/video/1rctd00107/1rctd00107pl.jpg',
    actresses: ['今井ゆあ', '水嶋アリス', 'さくらはる', '有馬優羽', '伊東あずさ'],
    actress_slugs: ['imai-yua', 'mizushima-alice', 'sakura-haru', 'arima-yuu', 'ito-azusa'],
    tags: ['anal'],
    description: '紹介文準備中',
  },
  {
    slug: 'waki-work-intro-page',
    title: '腋作品紹介ページ',
    image_url: 'https://pics.dmm.co.jp/digital/video/agmx00159/agmx00159pl.jpg',
    actresses: ['一条みお', '田所百合', '奥菜みさき', '優木なお', '綾瀬こころ', '百永さりな'],
    actress_slugs: ['ichijo-mio', 'tadokoro-yuri', 'okina-misaki', 'yuuki-nao', 'ayase-kokoro', 'momonaga-sarina'],
    tags: ['waki'],
    description: '紹介文準備中',
  },
];

export function getAllArticles() {
  return [...articles];
}

export function getLatestArticles(limit = 4) {
  return articles.slice(0, limit);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleDisplayChips(article: Article) {
  return [
    ...article.tags.map((slug) => {
      const tag = getTagBySlug(slug);
      if (tag) {
        return {
          name: tag.name,
          href: `/tags/${tag.slug}/`,
          kind: 'tag' as const,
        };
      }

      const actress = getActressBySlug(slug);
      return actress
        ? {
            name: actress.name,
            href: `/actress/${actress.slug}/`,
            kind: 'actress' as const,
          }
        : null;
    }),
    ...article.actress_slugs
      .map((slug) => getActressBySlug(slug))
      .filter((actress): actress is NonNullable<typeof actress> => Boolean(actress))
      .map((actress) => ({
        name: actress.name,
        href: `/actress/${actress.slug}/`,
        kind: 'actress' as const,
      })),
  ].filter((chip): chip is ArticleChip => Boolean(chip));
}

export function getRelatedArticles(target: Article, limit = 3) {
  return [...articles]
    .filter((article) => article.slug !== target.slug)
    .map((article) => ({
      article,
      score: sharedScore(target, article),
    }))
    .sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title, 'ja'))
    .slice(0, limit)
    .map((entry) => entry.article);
}

function sharedScore(target: Article, candidate: Article) {
  const sharedActress = candidate.actress_slugs.some((slug) => target.actress_slugs.includes(slug)) ? 2 : 0;
  const sharedTag = candidate.tags.some((slug) => target.tags.includes(slug)) ? 1 : 0;
  return sharedActress + sharedTag;
}
