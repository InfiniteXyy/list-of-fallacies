export type TFallacy = {
  type?: 'formal' | 'informal';
  title: string;
  description: string;
  examples?: string[];
  htmlUrl?: string;
};

export async function getFallacyData(): Promise<TFallacy[]> {
  const FallacyData = (await import('~~/assets/fallacies.demo.json')).default;

  return [
    {
      title: '稻草人论证 Demo',
      description: '攻击对方并未提出的论点。',
      htmlUrl: 'https://zh.wikipedia.org/wiki/%E7%A8%BB%E8%8D%89%E4%BA%BA%E8%AB%96%E8%AD%89',
      examples: [
        `甲：“我认为孩童不应该往大街上乱跑。”
      乙：“把小孩关起来，不让他们呼吸新鲜空气，那真是太愚蠢了。”`,
        `甲：你支持性交易合法化吗？
      乙：支持啊。
      甲：你果然买春过！`,
      ],
      type: 'informal',
    },
    ...(FallacyData as TFallacy[]),
  ];
}
