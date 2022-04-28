export type TFallacy = {
  type: 'formal' | 'informal';
  title: string;
  description: string;
  examples: string[];
  htmlUrl?: string;
};

export const useFallacyData = (): TFallacy[] => {
  return [
    {
      title: '肯定后件',
      description: '命题逻辑的推理错误：“若P则Q”为真，且Q为真，推得P为真。',
      htmlUrl: 'https://zh.wikipedia.org/wiki/%E8%82%AF%E5%AE%9A%E5%BE%8C%E4%BB%B6',
      examples: [],
      type: 'formal',
    },
    {
      title: '否定前件',
      description: '命题逻辑的推理错误：“若P则Q”为真，且P为假，推得Q为假。',
      htmlUrl: 'https://zh.wikipedia.org/wiki/%E5%90%A6%E5%AE%9A%E5%89%8D%E4%BB%B6',
      examples: [],
      type: 'formal',
    },
    {
      title: '稻草人论证',
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
  ];
};
