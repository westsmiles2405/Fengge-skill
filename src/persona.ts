import { applySafety } from './styleConfig';

const OPENINGS = [
  '来了？先别空谈理想，先把今天最硬的一块干掉。',
  '观察模式开启。说吧，今天最卡的是哪一段？',
  '别急着解释，先给我现状，再给我目标。',
  '行，开工。先抓关键路径，边角料后置。',
  '你继续敲，我负责盯节奏，今天别摆烂。',
];

const WORK_LINES = [
  '这步做对了，继续推进，别回头纠结。',
  '把问题拆开，每次只解决一个约束。',
  '先收敛错误，再谈优化，顺序别反。',
  '你现在这节奏，已经比大多数人稳。',
  '少一点情绪，多一点执行。',
];

const ENCOURAGE_LINES = [
  '别慌，难题不是墙，是台阶。',
  '卡住很正常，停十秒，换视角继续。',
  '先把下一步做了，信心会自己回来。',
  '你不是不会，是信息还没补齐。',
  '继续干，别让情绪接管方向盘。',
];

const JUDGMENT_OPENINGS = [
  '【巡查开始】我只看事实，不看情绪。',
  '【代码观察】先列问题，再定优先级。',
  '【结果复盘】下面是当前明显风险点。',
];

const JUDGMENT_ENDINGS = [
  '【建议】按顺序修，不要并行乱改。',
  '【建议】先清阻塞项，再处理体验项。',
  '【建议】先过线，再追求漂亮。',
];

const COMFORT_LINES = [
  '先把节奏降下来，今天只做最小闭环。',
  '你不是不行，是今天负载太高。',
  '先补水，站起来走一分钟，回来继续。',
  '别急着否定自己，先把下一步定义清楚。',
  '我在这儿，咱们按步骤来。',
];

const SOLEMN_LINES = [
  '我认真说：你现在的感受很重要，先照顾好自己。',
  '先停一下，不要硬扛。能休息就休息，能求助就求助。',
  '别逞强。先让自己稳定下来，再决定下一步。',
  '你不需要马上好起来，先把今天安全地过完。',
];

const FOCUS_START = ['进入专注段，少说多做。', '开始计时，先把最关键任务推过线。', '专注已开，先不分心。'];
const FOCUS_END = ['时间到，汇报产出。', '一轮结束，先复盘再继续。', '好，阶段完成。'];
const BREAK_REMIND = ['休整五分钟，别硬顶。', '暂停一下，补给后再战。', '休息不是偷懒，是为了续航。'];
const BREAK_END = ['回来，继续主线。', '休整结束，重新上场。', '回工位，下一轮开始。'];

const FINALE = [
  '今天就到这。你做的是实打实的推进。',
  '收工，节奏不错，明天继续。',
  '任务落袋，休息去。',
];

const IDLE = [
  '怎么停了？卡住就说，别空转。',
  '长时间无操作，回来给我一个下一步。',
  '发呆可以，别发太久。',
];

const MONOLOGUE = [
  '“现实很硬，但路径总能切出来。先执行，再评价。”',
  '“别被噪音带节奏。你只需要对结果负责。”',
  '“真正的效率，是在混乱里保持次序。”',
];

const FIELD_NOTES = [
  '📓 现场笔记：先记录事实，再下判断。',
  '📓 现场笔记：不要拿个例当规律。',
  '📓 现场笔记：输入质量，决定输出上限。',
];

const NICKNAMES = ['执行派', '稳进型选手', '收敛大师', '进度收割机', '现实派工程师'];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function getOpening(): string { return applySafety(pick(OPENINGS)); }
export function getWorkLine(): string { return applySafety(pick(WORK_LINES)); }
export function getEncourageLine(): string { return applySafety(pick(ENCOURAGE_LINES)); }
export function getComfort(): string { return applySafety(pick(COMFORT_LINES)); }
export function getSolemnComfort(): string { return applySafety(pick(SOLEMN_LINES)); }
export function getFocusStart(minutes: number): string { return applySafety(`${pick(FOCUS_START)}\n⏱ 专注时间：${minutes} 分钟`); }
export function getFocusEnd(): string { return applySafety(pick(FOCUS_END)); }
export function getBreakRemind(): string { return applySafety(pick(BREAK_REMIND)); }
export function getBreakEnd(): string { return applySafety(pick(BREAK_END)); }
export function getIdleRemind(): string { return applySafety(pick(IDLE)); }
export function getMonologue(): string { return applySafety(`🧠 现实独白\n\n${pick(MONOLOGUE)}`); }
export function getFieldNote(): string { return applySafety(pick(FIELD_NOTES)); }
export function getNickname(): string { return applySafety(`今天你的绰号：${pick(NICKNAMES)}`); }

export function getFinale(done: number): string {
  const base = pick(FINALE);
  return applySafety(done > 0 ? `${base}\n\n📋 今日完成番茄轮次：${done}` : base);
}

export function getJudgment(issues: string[]): string {
  const open = pick(JUDGMENT_OPENINGS);
  const detail = issues.length > 0
    ? `\n【问题】\n${issues.map((s, i) => `${i + 1}. ${s}`).join('\n')}`
    : '\n【问题】目前未发现明显错误。';
  return applySafety(`${open}${detail}\n${pick(JUDGMENT_ENDINGS)}`);
}

export function getTimeBasedGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return '太晚了，先把手上这段收尾，然后休息。';
  if (h < 12) return getOpening();
  if (h < 14) return '先吃饭，别空腹硬抗。';
  if (h < 18) return '下午适合冲关键任务，开干。';
  return '晚上了，做完收尾就可以撤。';
}
