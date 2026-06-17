export type WorkItem = {
  slug: string;
  title: string;
  actress: string;
  tags: string[];
  art: string;
  description: string;
  detailSummary: string;
};

export const works: WorkItem[] = [
  {
    slug: 'midnight-window',
    title: '真夜中の脇見せデビュー',
    actress: '朝霧 りこ',
    tags: ['脇フェチ', '新人', '制服'],
    art: '/covers/cover-01.svg',
    description: '脇の見え方を中心に楽しめる、初登場感の強い一本。',
    detailSummary:
      '制服の袖まわりと素肌の見え方を丁寧に切り取った、脇フェチ向けの新着サンプル作品です。',
  },
  {
    slug: 'side-line-heat',
    title: '横顔と脇の熱帯夜',
    actress: '三峰 みお',
    tags: ['脇フェチ', '人気作', '密着'],
    art: '/covers/cover-02.svg',
    description: '密着感のある画作りで、横からの抜け感を楽しめる作品。',
    detailSummary:
      '横向きの構図と密着シーンが多く、脇のラインが自然に目に入る人気サンプルです。',
  },
  {
    slug: 'armpit-gallery',
    title: '脇ギャラリー完全版',
    actress: '白河 すず',
    tags: ['脇フェチ', 'コスプレ', 'コレクション'],
    art: '/covers/cover-03.svg',
    description: '衣装差分で脇の表情を見比べられるコレクション系。',
    detailSummary:
      '衣装の切り替わりを通して、脇の見え方を比較しやすい構成のサンプル作品です。',
  },
  {
    slug: 'anal-close-up',
    title: 'やわらか接写アナル観察',
    actress: '羽田 えま',
    tags: ['アナル作品', '接写', '定番'],
    art: '/covers/cover-04.svg',
    description: '接写中心で、アナル作品を探しやすい構成。',
    detailSummary:
      'クローズアップを軸にした、アナル作品の雰囲気が分かりやすいサンプルです。',
  },
  {
    slug: 'ranking-lounge',
    title: '週刊ランキング・ラウンジ',
    actress: '結城 みな',
    tags: ['ランキング', '話題作', '編集部'],
    art: '/covers/cover-05.svg',
    description: '今週の人気を拾いやすい、ランキング向けの一本。',
    detailSummary:
      'ランキング面から拾うことを前提にした、人気の流れを追いやすいサンプル作品です。',
  },
  {
    slug: 'wet-side-story',
    title: '濡れ袖のサイドストーリー',
    actress: '桐谷 さくら',
    tags: ['脇フェチ', 'ドラマ', '長尺'],
    art: '/covers/cover-06.svg',
    description: 'ドラマ重視で、脇の余韻が残る長尺作品。',
    detailSummary:
      '物語を追いながら脇の露出シーンを拾える、ドラマ性のあるサンプルです。',
  },
  {
    slug: 'backstage-gap',
    title: '楽屋裏のアナル発見録',
    actress: '夏川 ほの',
    tags: ['アナル作品', '裏側', 'フェチ'],
    art: '/covers/cover-01.svg',
    description: '裏側の空気感を前面に出した、アナル作品サンプル。',
    detailSummary:
      '楽屋裏のような空気感で、アナル作品を探すときの入口になりやすい構成です。',
  },
  {
    slug: 'fresh-first-look',
    title: '新着ファーストルック',
    actress: '西園 ルナ',
    tags: ['新着', '制服', '人気上昇'],
    art: '/covers/cover-02.svg',
    description: '新着作品を素早く確認するためのサンプルカード。',
    detailSummary:
      'まずは新着から見たい人向けの、発見しやすさを重視したサンプル作品です。',
  },
  {
    slug: 'fan-search-guide',
    title: '女優名で探すガイド',
    actress: '青井 まどか',
    tags: ['女優一覧', '検索', '定番'],
    art: '/covers/cover-03.svg',
    description: '女優起点で作品をたどるための案内カード。',
    detailSummary:
      '女優から作品を探す導線の見本になる、一覧向けのサンプルです。',
  },
  {
    slug: 'tag-match-view',
    title: 'タグで刺さる一作',
    actress: '橘 りん',
    tags: ['タグ', '脇フェチ', 'アナル作品'],
    art: '/covers/cover-04.svg',
    description: 'タグ横断で探せる、検索性を意識したサンプル。',
    detailSummary:
      'タグ検索の入口として置きやすい、キーワード優先のサンプル作品です。',
  },
];

export const newWorks = works.slice(0, 5);
export const popularWorks = [works[4], works[1], works[8], works[7], works[9]];
export const armpitWorks = [works[0], works[1], works[2], works[5], works[9]];
export const analWorks = [works[3], works[4], works[6], works[8], works[9]];

export const featuredActresses = [
  { name: '朝霧 りこ', note: '脇フェチ新着で注目' },
  { name: '三峰 みお', note: '人気作で存在感が強い' },
  { name: '白河 すず', note: 'コレクション系が見やすい' },
  { name: '羽田 えま', note: 'アナル作品の定番枠' },
  { name: '結城 みな', note: 'ランキング常連の入口' },
];

export const majorTags = [
  '脇フェチ',
  'アナル作品',
  'ランキング',
  '新着',
  '人気作',
  '女優一覧',
  '制服',
  '密着',
  'コスプレ',
  '編集部おすすめ',
];

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}
