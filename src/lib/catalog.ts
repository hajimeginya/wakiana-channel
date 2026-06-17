import worksData from '../data/works.json';
import actressesData from '../data/actresses.json';
import tagsData from '../data/tags.json';

export type Work = {
  content_id: string;
  title: string;
  actresses: string[];
  actress_slugs: string[];
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
  image_url: string;
};

export type TagCategory = 'waki' | 'anal' | 'other';

export type Tag = {
  name: string;
  slug: string;
  category: TagCategory;
  description: string;
};

export type ActressWithStats = Actress & {
  workCount: number;
  wakiCount: number;
  analCount: number;
};

export type TagWithCount = Tag & {
  workCount: number;
};

export const works = worksData as Work[];
export const actresses = actressesData as Actress[];
export const tags = tagsData as Tag[];

const wakiCategories: TagCategory[] = ['waki'];
const analCategories: TagCategory[] = ['anal'];

export function getWorkByContentId(contentId: string) {
  return works.find((work) => work.content_id === contentId);
}

export function getActressBySlug(slug: string) {
  return actresses.find((actress) => actress.slug === slug);
}

export function getActressByName(name: string) {
  return actresses.find((actress) => actress.name === name);
}

export function getTagBySlug(slug: string) {
  return tags.find((tag) => tag.slug === slug);
}

export function getTagByName(name: string) {
  return tags.find((tag) => tag.name === name);
}

export function getWorksByActressSlug(slug: string) {
  return works.filter((work) => work.actress_slugs.includes(slug));
}

export function getWorksByTagSlug(slug: string) {
  return works.filter((work) => work.tags.includes(slug));
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
    .filter((work) => work.tags.some((slug) => isTagCategory(slug, 'waki')))
    .sort(byReleaseDesc)
    .slice(0, limit);
}

export function getAnalWorks(limit = 5) {
  return [...works]
    .filter((work) => work.tags.some((slug) => isTagCategory(slug, 'anal')))
    .sort(byReleaseDesc)
    .slice(0, limit);
}

export function getPopularActresses(limit = 10): ActressWithStats[] {
  return [...actresses]
    .map((actress) => ({
      ...actress,
      ...getActressStats(actress.slug),
    }))
    .sort((a, b) => b.workCount - a.workCount || a.kana.localeCompare(b.kana, 'ja'))
    .slice(0, limit);
}

export function getActressStats(slug: string) {
  const actressWorks = getWorksByActressSlug(slug);

  return {
    workCount: actressWorks.length,
    wakiCount: actressWorks.filter((work) => work.tags.some((tagSlug) => isTagCategory(tagSlug, 'waki'))).length,
    analCount: actressWorks.filter((work) => work.tags.some((tagSlug) => isTagCategory(tagSlug, 'anal'))).length,
  };
}

export function getPopularTags(limit = 10): TagWithCount[] {
  const counts = new Map<string, number>();
  for (const work of works) {
    for (const tagSlug of work.tags) {
      counts.set(tagSlug, (counts.get(tagSlug) ?? 0) + 1);
    }
  }

  return [...tags]
    .map((tag) => ({
      ...tag,
      workCount: counts.get(tag.slug) ?? 0,
    }))
    .sort((a, b) => b.workCount - a.workCount || a.name.localeCompare(b.name, 'ja'))
    .slice(0, limit);
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

export function getDisplayActressNames(work: Work) {
  return work.actress_slugs
    .map((slug) => getActressBySlug(slug)?.name)
    .filter((name): name is string => Boolean(name));
}

export function getDisplayTagNames(work: Work) {
  return work.tags
    .map((slug) => getTagBySlug(slug)?.name)
    .filter((name): name is string => Boolean(name));
}

export function getTagsByCategory(category: TagCategory) {
  return tags.filter((tag) => tag.category === category);
}

function isTagCategory(tagSlug: string, category: TagCategory) {
  return getTagBySlug(tagSlug)?.category === category;
}

function byReleaseDesc(a: Work, b: Work) {
  return b.release_date.localeCompare(a.release_date, 'ja');
}

function byRankingDesc(a: Work, b: Work) {
  return b.ranking_score - a.ranking_score || byReleaseDesc(a, b);
}

function sharedScore(target: Work, candidate: Work) {
  const sharedActress = candidate.actress_slugs.some((slug) => target.actress_slugs.includes(slug)) ? 2 : 0;
  const sharedTags = candidate.tags.filter((tag) => target.tags.includes(tag)).length;
  return sharedActress + sharedTags;
}
