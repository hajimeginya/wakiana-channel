export type ArticleTag = {
  name: string;
  slug: string;
};

export type Article = {
  slug: string;
  title: string;
  image_url: string;
  tags: ArticleTag[];
  description: string;
};

const articles: Article[] = [
  {
    slug: 'anal-lick-lesbian-1',
    title: 'アナル舐めレズビアン アンナと花子全面監修 乙葉ななせ 湊莉久',
    image_url: 'https://pics.dmm.co.jp/digital/video/3wanz00212/3wanz00212pl.jpg',
    tags: [
      { name: 'アナル', slug: 'anal' },
      { name: 'レズ', slug: 'lez' },
      { name: 'アナル舐め', slug: 'anal-lick' },
    ],
    description:
      'ワンズファクトリー×アンナと花子の強力コラボ第2弾！！アン花で大好評だった『アナル舐めレズビアン』が復活！！乙女の舌が恥ずかしい穴を舐めまわす…未体験の快感にイキまくる仲良し同士の女の子。柔肌が絡み合う禁断のエクスタシー…チュパチュパ吸いつく唇と舐め回す唾液舌…乙女たちの喘ぎ声がアナルからも響き渡る！！',
  },
  {
    slug: 'anal-lick-lesbian-2',
    title: 'アナル舐めレズビアン つぼみ 琥珀うた',
    image_url: 'https://pics.dmm.co.jp/digital/video/annd00124/annd00124pl.jpg',
    tags: [
      { name: 'アナル', slug: 'anal' },
      { name: 'レズ', slug: 'lez' },
      { name: 'アナル舐め', slug: 'anal-lick' },
    ],
    description:
      'つぼみと琥珀がケツ穴ベロ舐めエクスタシー！健康的な小麦色した琥珀のケツの肛門が、つぼみのベロでにゅるにゅるレロレロしゃくりあげられる様に圧迫されて、肛門ひくひくケツ穴オルガ！真っ白つるつるつぼみのケツの肛門も、マングリアヌスで琥珀にグリグリじゅぽじゅぽ吸肛お掃除されちゃって、肛門ぷるぷるケツ穴オルガ！',
  },
];

export function getAllArticles() {
  return [...articles];
}

export function getLatestArticles(limit = 2) {
  return articles.slice(0, limit);
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
