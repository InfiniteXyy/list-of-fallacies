export type TFallacy = {
  type?: 'formal' | 'informal';
  title: string;
  description: string;
  examples?: string[];
  htmlUrl?: string;
};

export async function getFallacyData(): Promise<TFallacy[]> {
  const FallacyData = (await import('~~/assets/fallacies.demo.json')).default;

  return FallacyData as TFallacy[];
}
