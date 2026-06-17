import worksData from '../data/works.json';
import actressesData from '../data/actresses.json';
import tagsData from '../data/tags.json';

export type Work = {
  content_id: string;
  title: string;
  actresses: string[];
  tags: string[];
  package_image_url: string;
  sample_image_urls: string[];
  release_date: string;
  maker: string;
  label: string;
  description: string;
  affiliate_url: string;
  ranking_score: number;
};

export type Actress = {
  slug: string;
  name: string;
  kana: string;
  group: string;
};

export type Tag = {
  slug: string;
  label: string;
  description: string;
};

export const works = worksData as Work[];
export const actresses = actressesData as Actress[];
export const tags = tagsData as Tag[];

const wakiTagLabels = new Set(['脇', '脇舐め', '脇接写', 'ワキ汗']);
const analTagLabels = new Set(['アナル', 'アナル解禁', 'アナル舐め', 'アナルVR']);

export function getWorkByContentId(contentId: string) {
  return works.find((work) => work.content_id === contentId);
}

export function getTagBySlug(slug: string) {
  return tags.find((tag) => tag.slug === slug);
}

export function getTagByLabel(label: string) {
  return tags.find((tag) => tag.label === label);
}

export function getActressBySlug(slug: string) {
  return actresses.find((actress) => actress.slug === slug);
}

export function getActressByName(name: string) {
  return actresses.find((actress) => actress.name === name);
}

export function getWorksByActressSlug(slug: string) {
  const actress = getActressBySlug(slug);
  if (!actress) {
    return [];
  }

  return works.filter((work) => work.actresses.includes(actress.name));
}

export function getWorksByTagSlug(slug: string) {
  const tag = getTagBySlug(slug);
  if (!tag) {
    return [];
  }

  return works.filter((work) => work.tags.includes(tag.label));
}

export function getNewWorks(limit = 5) {
  return [...works].sort(byReleaseDesc).slice(0, limit);
}

export function getWeeklyRankingWorks(limit = 10) {
  return [...works].sort(byRankingDesc).slice(0, limit);
}

export function getPopularWorks(limit = 5) {
  return getWeeklyRankingWorks(limit);
}

export function getWakiWorks(limit = 5) {
  return [...works]
    .filter((work) => work.tags.some((tag) => wakiTagLabels.has(tag)))
    .sort(byReleaseDesc)
    .slice(0, limit);
}

export function getAnalWorks(limit = 5) {
  return [...works]
    .filter((work) => work.tags.some((tag) => analTagLabels.has(tag)))
    .sort(byReleaseDesc)
    .slice(0, limit);
}

export function getPopularActresses(limit = 5) {
  return [...actresses]
    .map((actress) => ({
      ...actress,
      workCount: getWorksByActressSlug(actress.slug).length,
      wakiCount: getWorksByActressSlug(actress.slug).filter((work) =>
        work.tags.some((tag) => wakiTagLabels.has(tag))
      ).length,
      analCount: getWorksByActressSlug(actress.slug).filter((work) =>
        work.tags.some((tag) => analTagLabels.has(tag))
      ).length,
    }))
    .sort((a, b) => b.workCount - a.workCount || a.kana.localeCompare(b.kana, 'ja'))
    .slice(0, limit);
}

export function getActressStats(slug: string) {
  const actressWorks = getWorksByActressSlug(slug);

  return {
    workCount: actressWorks.length,
    wakiCount: actressWorks.filter((work) => work.tags.some((tag) => wakiTagLabels.has(tag))).length,
    analCount: actressWorks.filter((work) => work.tags.some((tag) => analTagLabels.has(tag))).length,
  };
}

export function getRelatedWorks(target: Work, limit = 4) {
  return [...works]
    .filter((work) => work.content_id !== target.content_id)
    .map((work) => ({
      work,
      score: sharedScore(target, work),
    }))
    .sort((a, b) => b.score - a.score || b.work.ranking_score - a.work.ranking_score)
    .slice(0, limit)
    .map((entry) => entry.work);
}

export function groupActressesByKana() {
  const groups = ['あ行', 'か行', 'さ行', 'た行', 'な行', 'は行', 'ま行', 'や行', 'ら行', 'わ行'];

  return groups
    .map((group) => ({
      group,
      actresses: [...actresses]
        .filter((actress) => actress.group === group)
        .sort((a, b) => a.kana.localeCompare(b.kana, 'ja')),
    }))
    .filter((entry) => entry.actresses.length > 0);
}

function byReleaseDesc(a: Work, b: Work) {
  return b.release_date.localeCompare(a.release_date, 'ja');
}

function byRankingDesc(a: Work, b: Work) {
  return b.ranking_score - a.ranking_score || byReleaseDesc(a, b);
}

function sharedScore(target: Work, candidate: Work) {
  const sharedActress = candidate.actresses.some((name) => target.actresses.includes(name)) ? 2 : 0;
  const sharedTags = candidate.tags.filter((tag) => target.tags.includes(tag)).length;
  return sharedActress + sharedTags;
}
