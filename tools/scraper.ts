/* eslint-disable no-console */
import { load } from 'cheerio';
import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

import { TFallacy } from '~~/composables/useFallacyData';

const BASE_URL = 'https://zh.wikipedia.org';

async function fetchHtml(url: string): Promise<string> {
  const result = await fetch(`${url}`, { headers: { 'accept-language': 'zh-CN' } });
  const htmlContent = await result.text();
  return htmlContent;
}

async function fetchFallacyList(url: string): Promise<TFallacy[]> {
  const $ = load(await fetchHtml(url));
  return $('.wikitable tr')
    .toArray()
    .map((tr) => {
      const $tr = $(tr);
      const link = $tr.find('td:first-of-type a');
      return {
        htmlUrl: link.attr('href') ? `${BASE_URL}${decodeURIComponent(link.attr('href')!)}` : undefined,
        title: $tr.find('td:first-of-type')?.text().trim(),
        description: $tr.find('td:last-of-type')?.text().trim(),
        examples: [],
      };
    })
    .filter((i) => i.title);
}

async function fetchFallacyExamples(url: string) {
  const $ = load(await fetchHtml(url));
  return $('blockquote')
    .toArray()
    .map((example) => $(example).text().trim())
    .filter(Boolean);
}

async function main() {
  const data = await fetchFallacyList(`${BASE_URL}/wiki/谬误列表`);

  for (const fallacy of data) {
    // FIXME: support concurrently download
    if (!fallacy.htmlUrl) continue;
    console.log('loading: ' + fallacy.title + ' examples...');
    const examples = await fetchFallacyExamples(fallacy.htmlUrl);
    fallacy.examples = examples;
  }

  writeFileSync('./output.json', JSON.stringify(data, null, 2));
}

main();
