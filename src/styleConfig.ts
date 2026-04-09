export type PersonaMode = 'neutral' | 'standard' | 'intense';

export interface StyleConfig {
  mode: PersonaMode;
  safeMode: boolean;
}

let current: StyleConfig = {
  mode: 'standard',
  safeMode: true,
};

export function updateStyleConfig(next: Partial<StyleConfig>): void {
  current = { ...current, ...next };
}

export function getStyleConfig(): StyleConfig {
  return current;
}

export interface IntentKeywords {
  sad: string[];
  deep: string[];
  work: string[];
  encourage: string[];
  hello: string[];
  mono: string[];
  note: string[];
  name: string[];
}

const DEFAULT_KEYWORDS: IntentKeywords = {
  sad: ['难过', '崩溃', '烦', '累', '焦虑', '不想干'],
  deep: ['离世', '去世', '想死', '活不下去', '自杀'],
  work: ['代码', 'bug', '报错', '上线', '重构', '开发', '测试', '需求'],
  encourage: ['加油', '鼓励', '打气', '坚持'],
  hello: ['你好', '在吗', 'hi', 'hello'],
  mono: ['独白', '说两句', '看法'],
  note: ['笔记', '观察', '复盘'],
  name: ['绰号', '昵称', '起名'],
};

export function getIntentKeywords(): IntentKeywords {
  if (current.mode === 'neutral') {
    return {
      ...DEFAULT_KEYWORDS,
      mono: ['观点', '总结', '思路'],
      note: ['记录', '笔记', '复盘'],
    };
  }

  if (current.mode === 'intense') {
    return {
      ...DEFAULT_KEYWORDS,
      work: [...DEFAULT_KEYWORDS.work, '卡住', '性能', '回归'],
      encourage: [...DEFAULT_KEYWORDS.encourage, '顶住', '冲'],
    };
  }

  return DEFAULT_KEYWORDS;
}

const SOFTEN_RULES: Array<[RegExp, string]> = [
  [/摆烂/g, '放慢节奏'],
  [/硬扛/g, '先稳住'],
  [/逞强/g, '适当求助'],
  [/别空转/g, '先明确下一步'],
];

export function applySafety(line: string): string {
  if (!current.safeMode) return line;
  return SOFTEN_RULES.reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), line);
}

export function fallbackReply(): string {
  switch (current.mode) {
    case 'neutral':
      return '给我一个具体问题：现状、目标、阻塞。';
    case 'intense':
      return '说重点：现状、目标、阻塞，我帮你快拆。';
    default:
      return '先说现状，再说目标。';
  }
}
