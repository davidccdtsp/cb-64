/**
 * Evaluador de las fórmulas de coste de las fichas (docs/costes/metodologia.md §8).
 * Gramática: + - * / paréntesis, números, variables y las funciones max(...), min(...) y ceil(x).
 * No usa eval: una fórmula solo puede leer las variables que se le pasan.
 */
const FUNCTIONS: Record<string, (...args: number[]) => number> = {
  max: (...a) => Math.max(...a),
  min: (...a) => Math.min(...a),
  ceil: (x) => Math.ceil(x),
};

type Token = { type: 'num'; value: number } | { type: 'id'; value: string } | { type: 'op'; value: string };

function tokenize(formula: string): Token[] {
  const tokens: Token[] = [];
  const re = /\s*(?:(\d+(?:\.\d+)?)|([A-Za-z_][A-Za-z0-9_]*)|([-+*/(),]))/y;
  let pos = 0;
  while (pos < formula.length) {
    re.lastIndex = pos;
    const m = re.exec(formula);
    if (!m) {
      if (formula.slice(pos).trim() === '') break;
      throw new Error(`carácter inesperado en la posición ${pos} de «${formula}»`);
    }
    tokens.push(m[1] ? { type: 'num', value: Number(m[1]) } : m[2] ? { type: 'id', value: m[2] } : { type: 'op', value: m[3] });
    pos = re.lastIndex;
  }
  return tokens;
}

export function evaluate(formula: string, vars: Record<string, number>): number {
  const tokens = tokenize(formula);
  let i = 0;
  const peek = () => tokens[i];
  const eat = (op: string) => {
    const t = tokens[i];
    if (t?.type !== 'op' || t.value !== op) throw new Error(`se esperaba «${op}» en «${formula}»`);
    i++;
  };
  const isOp = (op: string) => peek()?.type === 'op' && peek()!.value === op;

  function expr(): number {
    let v = term();
    while (isOp('+') || isOp('-')) v = tokens[i++].value === '+' ? v + term() : v - term();
    return v;
  }
  function term(): number {
    let v = factor();
    while (isOp('*') || isOp('/')) v = tokens[i++].value === '*' ? v * factor() : v / factor();
    return v;
  }
  function factor(): number {
    const t = tokens[i++];
    if (!t) throw new Error(`fórmula incompleta: «${formula}»`);
    if (t.type === 'num') return t.value;
    if (t.type === 'op' && t.value === '-') return -factor();
    if (t.type === 'op' && t.value === '(') {
      const v = expr();
      eat(')');
      return v;
    }
    if (t.type === 'id') {
      if (isOp('(')) {
        const fn = FUNCTIONS[t.value];
        if (!fn) throw new Error(`función desconocida «${t.value}»`);
        i++;
        const args = [expr()];
        while (isOp(',')) {
          i++;
          args.push(expr());
        }
        eat(')');
        return fn(...args);
      }
      const v = vars[t.value];
      if (v === undefined) throw new Error(`variable desconocida «${t.value}»`);
      return v;
    }
    throw new Error(`símbolo inesperado «${t.value}» en «${formula}»`);
  }

  const result = expr();
  if (i < tokens.length) throw new Error(`sobran símbolos en «${formula}»`);
  return result;
}
