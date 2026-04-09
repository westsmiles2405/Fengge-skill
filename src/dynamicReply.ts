import * as vscode from 'vscode';
import {
  getComfort,
  getSolemnComfort,
  getEncourageLine,
  getWorkLine,
  getTimeBasedGreeting,
  getMonologue,
  getFieldNote,
  getNickname,
} from './persona';

const SAD = ['难过', '崩溃', '烦', '累', '焦虑', '不想干'];
const DEEP = ['离世', '去世', '想死', '活不下去', '自杀'];
const WORK = ['代码', 'bug', '报错', '上线', '重构', '开发', '测试', '需求'];
const ENCOURAGE = ['加油', '鼓励', '打气', '坚持'];
const HELLO = ['你好', '在吗', 'hi', 'hello'];
const MONO = ['独白', '说两句', '看法'];
const NOTE = ['笔记', '观察', '复盘'];
const NAME = ['绰号', '昵称', '起名'];

export const CODE_ANALYSIS_KEYWORDS = ['分析代码', '诊断', '检查代码', '有没有错'];

type Intent = 'deep' | 'sad' | 'work' | 'encourage' | 'hello' | 'mono' | 'note' | 'name' | 'unknown';

function intent(text: string): Intent {
  const t = text.toLowerCase();
  if (MONO.some((k) => t.includes(k))) return 'mono';
  if (NOTE.some((k) => t.includes(k))) return 'note';
  if (NAME.some((k) => t.includes(k))) return 'name';
  if (DEEP.some((k) => t.includes(k))) return 'deep';
  if (SAD.some((k) => t.includes(k))) return 'sad';
  if (ENCOURAGE.some((k) => t.includes(k))) return 'encourage';
  if (WORK.some((k) => t.includes(k))) return 'work';
  if (HELLO.some((k) => t.includes(k))) return 'hello';
  return 'unknown';
}

export function generateResponse(userMessage: string): string {
  switch (intent(userMessage)) {
    case 'deep': return getSolemnComfort();
    case 'sad': return getComfort();
    case 'work': return getWorkLine();
    case 'encourage': return getEncourageLine();
    case 'hello': return getTimeBasedGreeting();
    case 'mono': return getMonologue();
    case 'note': return getFieldNote();
    case 'name': return getNickname();
    default:
      return ['给我一个具体问题。', '先说现状，再说目标。', '我在，继续。'][Math.floor(Math.random() * 3)];
  }
}

export function analyzeCodeProblems(): string {
  const diagnostics = vscode.languages.getDiagnostics();
  let errors = 0;
  let warnings = 0;
  const top: string[] = [];

  for (const [uri, diags] of diagnostics) {
    for (const d of diags) {
      if (d.severity === vscode.DiagnosticSeverity.Error) {
        errors++;
        if (top.length < 5) {
          top.push(`🧭 [${uri.path.split('/').pop()}:${d.range.start.line + 1}] ${d.message}`);
        }
      } else if (d.severity === vscode.DiagnosticSeverity.Warning) {
        warnings++;
      }
    }
  }

  if (errors === 0 && warnings === 0) {
    return '当前没有错误和警告，状态良好。';
  }

  const head = errors > 0
    ? `发现 ${errors} 个错误，${warnings} 个警告。先清错误。`
    : `无错误，但有 ${warnings} 个警告。`;

  const detail = top.length > 0 ? `\n\n${top.join('\n')}` : '';
  return `${head}${detail}`;
}
