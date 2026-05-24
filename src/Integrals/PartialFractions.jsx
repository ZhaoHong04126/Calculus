// src/Integrals/PartialFractions.jsx
import React, { useState, useMemo } from 'react';
import { InlineMath, BlockMath } from '../components/Math';
import './ProofBox.css';

// 可摺疊解題過程元件
const SolutionBox = ({ children }) => (
  <details className="proof-box">
    <summary>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '8px', fontSize: '18px' }}>✏️</span>
        查看解題過程
      </div>
      <div>
        <span className="proof-toggle-btn expand-text">展開 ▼</span>
        <span className="proof-toggle-btn collapse-text">收起 ▲</span>
      </div>
    </summary>
    <div className="proof-content">{children}</div>
  </details>
);

// 最大公因數
function gcd(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

// 格式化分數為 LaTeX
function formatFraction(num, den) {
  if (den === 0) return 'NaN';
  if (num === 0) return '0';
  const g = gcd(num, den);
  let n = num / g;
  let d = den / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  if (d === 1) return `${n}`;
  return `\\frac{${n}}{${d}}`;
}

// 格式化 LaTeX 多項式係數 (如 ax + b, x^2 + b 等)
function formatTerm(num, den, variablePart, isFirst = false) {
  if (num === 0) return '';
  const g = gcd(num, den);
  let n = num / g;
  let d = den / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  
  let sign = '';
  if (n < 0) {
    sign = '-';
  } else if (!isFirst) {
    sign = '+';
  }

  const absN = Math.abs(n);
  let coeff = '';
  if (d === 1) {
    if (absN === 1 && variablePart !== '') {
      coeff = '';
    } else {
      coeff = `${absN}`;
    }
  } else {
    coeff = `\\frac{${absN}}{${d}}`;
  }

  return `${sign}${coeff}${variablePart}`;
}

// 格式化分母為 (x - a) 形式 (含括號)
function formatDenItem(val) {
  if (val === 0) return 'x';
  return val > 0 ? `(x - ${val})` : `(x + ${Math.abs(val)})`;
}

// 格式化絕對值或分母項為 x - a 形式 (無括號)
function formatAbsItem(val) {
  if (val === 0) return 'x';
  return val > 0 ? `x - ${val}` : `x + ${Math.abs(val)}`;
}

// 格式化二次方分母為 (x - a)^2 形式
function formatDenSquared(val) {
  if (val === 0) return 'x^2';
  return val > 0 ? `(x - ${val})^2` : `(x + ${Math.abs(val)})^2`;
}

export default function PartialFractions() {
  const [caseType, setCaseType] = useState('distinct_linear');

  // Case 1 計算與步驟生成
  const case1Data = useMemo(() => {
    const p = 5;
    const q = -4;
    const a = 2;
    const b = -1;

    // px + q = A(x - b) + B(x - a)
    // x = a => pa + q = A(a - b) => A = (pa + q) / (a - b)
    // x = b => pb + q = B(b - a) => B = (pb + q) / (b - a)
    const numA = p * a + q;
    const denA = a - b;
    const numB = p * b + q;
    const denB = b - a;

    const fracA = formatFraction(numA, denA);
    const fracB = formatFraction(numB, denB);

    // 積分式 LaTeX
    // \int fracA/(x-a) + fracB/(x-b) dx = A ln|x-a| + B ln|x-b| + C
    const signA = numA / denA < 0 ? '-' : '';

    const absA_tex = formatFraction(Math.abs(numA), Math.abs(denA));
    const absB_tex = formatFraction(Math.abs(numB), Math.abs(denB));

    const termA_tex = absA_tex === '1' ? `\\ln|${formatAbsItem(a)}|` : `${absA_tex} \\ln|${formatAbsItem(a)}|`;
    const termB_tex = absB_tex === '1' ? `\\ln|${formatAbsItem(b)}|` : `${absB_tex} \\ln|${formatAbsItem(b)}|`;

    const termA_val = numA / denA;
    const termB_val = numB / denB;

    let integralResult = '';
    if (termA_val !== 0) {
      integralResult += `${signA === '-' ? '-' : ''}${termA_tex}`;
    }
    if (termB_val !== 0) {
      const bSign = termA_val !== 0 ? (termB_val < 0 ? ' - ' : ' + ') : (termB_val < 0 ? '-' : '');
      integralResult += `${bSign}${termB_tex}`;
    }
    if (integralResult === '') integralResult = '0';
    integralResult += ' + C';

    const denATex = formatDenItem(a);
    const denBTex = formatDenItem(b);
    const numTex = formatTerm(p, 1, 'x', true) + (q >= 0 ? ` + ${q}` : ` - ${Math.abs(q)}`);
    const originalFraction = `\\frac{${numTex || '0'}}{${denATex}${denBTex}}`;

    return {
      hasError: false,
      A: { num: numA, den: denA, tex: fracA },
      B: { num: numB, den: denB, tex: fracB },
      originalFraction,
      integralResult,
      a, b, p, q
    };
  }, []);

  // Case 2 計算與步驟生成
  const case2Data = useMemo(() => {
    const p = 3;
    const q = 5;
    const a = 2;

    // px + q = A(x - a) + B
    // A = p
    // x = a => pa + q = B
    const numA = p;
    const denA = 1;
    const numB = p * a + q;
    const denB = 1;

    const fracA = formatFraction(numA, denA);
    const fracB = formatFraction(numB, denB);

    // \int A/(x-a) + B/(x-a)^2 dx = A ln|x-a| - B/(x-a) + C
    const signA = numA < 0 ? '-' : '';

    const absA_tex = formatFraction(Math.abs(numA), 1);
    const absB_tex = formatFraction(Math.abs(numB), 1);

    const termA_tex = absA_tex === '1' ? `\\ln|${formatAbsItem(a)}|` : `${absA_tex} \\ln|${formatAbsItem(a)}|`;
    const termB_tex = `\\frac{${absB_tex}}{${formatAbsItem(a)}}`;

    let integralResult = '';
    if (numA !== 0) {
      integralResult += `${signA === '-' ? '-' : ''}${termA_tex}`;
    }
    if (numB !== 0) {
      const bSign = numA !== 0 ? (numB < 0 ? ' + ' : ' - ') : (numB < 0 ? '' : '-');
      integralResult += `${bSign}${termB_tex}`;
    }
    if (integralResult === '') integralResult = '0';
    integralResult += ' + C';

    const numTex = formatTerm(p, 1, 'x', true) + (q >= 0 ? ` + ${q}` : ` - ${Math.abs(q)}`);
    const originalFraction = `\\frac{${numTex || '0'}}{${formatDenSquared(a)}}`;

    return {
      A: { num: numA, den: denA, tex: fracA },
      B: { num: numB, den: denB, tex: fracB },
      originalFraction,
      integralResult,
      a, p, q
    };
  }, []);

  // Case 3 計算與步驟生成
  const case3Data = useMemo(() => {
    const p = 1;
    const q = 1;
    const r = 2;
    const a = 1;
    const b = 3;

    // Denominator is (x - a)^2 * (x - b)
    // Formula coefficients:
    // px^2 + qx + r = A1(x-a)(x-b) + A2(x-b) + B1(x-a)^2
    // x = b => B1 = (pb^2 + qb + r) / (b-a)^2
    // x = a => A2 = (pa^2 + qa + r) / (a-b)
    // x^2 coefficient => A1 = p - B1
    const denB1 = (b - a) * (b - a);
    const numB1 = p * b * b + q * b + r;

    const denA2 = a - b;
    const numA2 = p * a * a + q * a + r;

    const denA1 = denB1;
    const numA1 = p * denB1 - numB1;

    const fracA1 = formatFraction(numA1, denA1);
    const fracA2 = formatFraction(numA2, denA2);
    const fracB1 = formatFraction(numB1, denB1);

    // A1 term: A1 ln|x - a|
    const valA1 = numA1 / denA1;
    const signA1 = valA1 < 0 ? '-' : '';
    const absA1_tex = formatFraction(Math.abs(numA1), denA1);
    const termA1_tex = absA1_tex === '1' 
      ? `\\ln|${formatAbsItem(a)}|` 
      : `${absA1_tex} \\ln|${formatAbsItem(a)}|`;

    // A2 term: -A2 / (x - a)
    const valA2 = numA2 / denA2;
    const absA2_tex = formatFraction(Math.abs(numA2), Math.abs(denA2));
    const termA2_tex = `\\frac{${absA2_tex}}{${formatAbsItem(a)}}`;

    // B1 term: B1 ln|x - b|
    const valB1 = numB1 / denB1;
    const absB1_tex = formatFraction(Math.abs(numB1), denB1);
    const termB1_tex = absB1_tex === '1' 
      ? `\\ln|${formatAbsItem(b)}|` 
      : `${absB1_tex} \\ln|${formatAbsItem(b)}|`;

    let integralResult = '';
    if (valA1 !== 0) {
      integralResult += `${signA1 === '-' ? '-' : ''}${termA1_tex}`;
    }
    if (valA2 !== 0) {
      const opSign = integralResult !== '' ? (-valA2 < 0 ? ' - ' : ' + ') : (-valA2 < 0 ? '-' : '');
      integralResult += `${opSign}${termA2_tex}`;
    }
    if (valB1 !== 0) {
      const opSign = integralResult !== '' ? (valB1 < 0 ? ' - ' : ' + ') : (valB1 < 0 ? '-' : '');
      integralResult += `${opSign}${termB1_tex}`;
    }
    if (integralResult === '') integralResult = '0';
    integralResult += ' + C';

    const denATex = formatDenSquared(a);
    const denBTex = formatDenItem(b);
    const numTex = formatTerm(p, 1, 'x^2', true) + formatTerm(q, 1, 'x', p === 0) + (r > 0 ? ` + ${r}` : r < 0 ? ` - ${Math.abs(r)}` : '');
    const originalFraction = `\\frac{${numTex || '0'}}{${denATex}${denBTex}}`;

    return {
      hasError: false,
      A1: { num: numA1, den: denA1, tex: fracA1 },
      A2: { num: numA2, den: denA2, tex: fracA2 },
      B1: { num: numB1, den: denB1, tex: fracB1 },
      originalFraction,
      integralResult,
      a, b, p, q, r
    };
  }, []);

  return (
    <section className="subsection mt-12 pt-8 border-t border-gray-100">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-violet-500 pb-2">
        5. 部分分式積分法 (Partial Fractions)
      </h2>

      <p className="mb-6 text-gray-700 leading-relaxed">
        當我們面對一個由兩個多項式相除所構成的<strong>有理函數 (Rational Function)</strong> 積分時，若無法直接套用代換法或公式，我們通常會使用<strong>部分分式展開法</strong>。這個技巧的核心思想是將一個複雜的有理函數，拆解成數個簡單分式之和，再進行逐項積分。它本質上是<strong>通分加法的逆運算</strong>。
      </p>

      {/* 5.1 核心定理與概念 */}
      <div className="math-box mb-6 p-6 bg-violet-50 rounded-lg shadow-sm border border-violet-100">
        <h3 className="text-xl font-bold mb-3 text-violet-800">
          5.1 有理函數與分解前提
        </h3>

        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
          有理函數形式為 <InlineMath math="f(x) = \frac{P(x)}{Q(x)}" />，其中 <InlineMath math="P(x)" /> 與 <InlineMath math="Q(x)" /> 皆為多項式。
        </p>

        <div className="mb-4 p-4 bg-white/80 rounded-lg border-l-4 border-amber-500 shadow-sm">
          <h4 className="font-bold text-amber-900 mb-1">⚠️ 關鍵第一步：判斷是否為真分式 (Proper Fraction)</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            我們只能對<strong>真分式</strong>（分子最高次數小於分母最高次數，即 <InlineMath math="\deg(P) < \deg(Q)" />）直接進行部分分式分解。
          </p>
          <p className="text-sm text-red-600 mt-2 font-semibold">
            重要：若為假分式 (<InlineMath math="\deg(P) \ge \deg(Q)" />)，必須先使用「多項式除法 (Long Division)」將其化簡為一個多項式與一個真分式的和：
          </p>
          <BlockMath math="\frac{P(x)}{Q(x)} = S(x) + \frac{R(x)}{Q(x)} \quad (\text{其中 } \deg(R) < \deg(Q))" />
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          根據代數基本定理，任何實係數多項式 <InlineMath math="Q(x)" /> 都可以被唯一分解為<strong>一次線性因式</strong> <InlineMath math="(ax+b)" /> 與<strong>不可約的二次因式</strong> <InlineMath math="(ax^2+bx+c)" /> 的乘積。
        </p>
      </div>

      {/* 5.2 四種分解情況對照 */}
      <div className="math-box mb-6 p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-200 mt-8">
        <h3 className="text-xl font-bold mb-4 text-slate-800">
          5.2 部分分式展開的四種經典情況
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          將分母 <InlineMath math="Q(x)" /> 因式分解後，針對不同的因式類型，展開的設法如下表所示：
        </p>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="integral-table">
            <thead>
              <tr>
                <th>分母因式類型</th>
                <th>對應部分分式的設法</th>
                <th>典型積分結果</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold text-gray-800">
                  相異一次因式<br />
                  <InlineMath math="x - a" />
                </td>
                <td>
                  <BlockMath math="\frac{A}{x - a}" />
                </td>
                <td>
                  <InlineMath math="A \ln|x - a| + C" />
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-800">
                  重複一次因式<br />
                  <InlineMath math="(x - a)^k" />
                </td>
                <td>
                  <BlockMath math="\frac{A_1}{x - a} + \frac{A_2}{(x - a)^2} + \cdots + \frac{A_k}{(x - a)^k}" />
                </td>
                <td>
                  一次項產生對數 <InlineMath math="\ln" />，<br />
                  其餘高次方項使用冪次積分公式。
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-800">
                  多組因式<br />
                  <InlineMath math="(ax - b)^m(cx - d)^n" />
                </td>
                <td>
                  <BlockMath math="\frac{A_1}{ax - b} + \cdots + \frac{A_m}{(ax - b)^m} + \frac{B_1}{cx - d} + \cdots + \frac{B_n}{(cx - d)^n}" />
                </td>
                <td>
                  每一組因式分別展開，一次項積分產生對數 <InlineMath math="\ln" />，<br />
                  高次項使用冪次積分公式。
                </td>
              </tr>
              <tr>
                <td className="font-semibold text-gray-800">
                  重複不可約二次因式<br />
                  <InlineMath math="(x^2 + b)^k" />
                </td>
                <td>
                  <BlockMath math="\frac{B_1x + C_1}{x^2 + b} + \frac{B_2x + C_2}{(x^2 + b)^2} + \cdots + \frac{B_kx + C_k}{(x^2 + b)^k}" />
                </td>
                <td>
                  計算較為複雜，通常需使用遞迴公式或三角代換法求解。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5.3 互動式分解沙盒 */}
      <div className="math-box mb-6 p-6 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl shadow-md border border-violet-100 mt-8">
        <h3 className="text-xl font-bold mb-2 text-indigo-900 flex items-center">
          <span style={{ marginRight: '8px', fontSize: '20px' }}>⚡</span>
          部分分式分解步驟示範 (Decomposition Explorer)
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          選擇一種分解類型，即可觀看該類型典型有理函數的部分分式展開步驟與對應的積分結果。
        </p>

        {/* Tab 選擇器 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCaseType('distinct_linear')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              caseType === 'distinct_linear'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            型態一：相異一次因式
          </button>
          <button
            onClick={() => setCaseType('repeated_linear')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              caseType === 'repeated_linear'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            型態二：重複一次因式
          </button>
          <button
                onClick={() => setCaseType('multiple_linear')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  caseType === 'multiple_linear'
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                型態三：多組因式
              </button>
        </div>

        {/* 渲染解算結果 */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(4px)', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4 className="text-md font-bold text-indigo-900 mb-4">📝 步驟解算與積分結果示例</h4>

          {/* Case 1: Distinct Linear */}
          {caseType === 'distinct_linear' && (
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-800">1. 目標積分與有理式：</p>
                <BlockMath math={`\\int ${case1Data.originalFraction} \\, dx`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">2. 設定待定係數展開式：</p>
                <BlockMath math={`${case1Data.originalFraction} = \\frac{A}{${formatAbsItem(case1Data.a)}} + \\frac{B}{${formatAbsItem(case1Data.b)}}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">3. 去分母，建立恆等式：</p>
                <BlockMath math={`${formatTerm(case1Data.p, 1, 'x', true) + (case1Data.q >= 0 ? ` + ${case1Data.q}` : ` - ${Math.abs(case1Data.q)}`)} = A${formatDenItem(case1Data.b)} + B${formatDenItem(case1Data.a)}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">4. 代入特殊點，解係數 <InlineMath math="A, B" />：</p>
                <ul className="list-disc ml-6 space-y-2 mt-2">
                  <li>
                    代入 <InlineMath math={`x = ${case1Data.a}`} /> 消除 <InlineMath math="B" />：
                    <BlockMath math={`${case1Data.p} \\cdot (${case1Data.a}) + (${case1Data.q}) = A(${case1Data.a} - (${case1Data.b})) \\implies ${case1Data.p * case1Data.a + case1Data.q} = A(${case1Data.a - case1Data.b}) \\implies A = ${case1Data.A.tex}`} />
                  </li>
                  <li>
                    代入 <InlineMath math={`x = ${case1Data.b}`} /> 消除 <InlineMath math="A" />：
                    <BlockMath math={`${case1Data.p} \\cdot (${case1Data.b}) + (${case1Data.q}) = B(${case1Data.b} - (${case1Data.a})) \\implies ${case1Data.p * case1Data.b + case1Data.q} = B(${case1Data.b - case1Data.a}) \\implies B = ${case1Data.B.tex}`} />
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">
                <p className="font-bold text-indigo-900 mb-1">5. 最終逐項積分結果：</p>
                <BlockMath math={`\\int \\left( \\frac{${case1Data.A.tex}}{${formatAbsItem(case1Data.a)}} + \\frac{${case1Data.B.tex}}{${formatAbsItem(case1Data.b)}} \\right) dx = ${case1Data.integralResult}`} />
              </div>
            </div>
          )}

          {/* Case 2: Repeated Linear */}
          {caseType === 'repeated_linear' && (
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-800">1. 目標積分與有理式：</p>
                <BlockMath math={`\\int ${case2Data.originalFraction} \\, dx`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">2. 設定待定係數展開式：</p>
                <BlockMath math={`${case2Data.originalFraction} = \\frac{A}{${formatAbsItem(case2Data.a)}} + \\frac{B}{${formatDenSquared(case2Data.a)}}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">3. 去分母，建立恆等式：</p>
                <BlockMath math={`${formatTerm(case2Data.p, 1, 'x', true) + (case2Data.q >= 0 ? ` + ${case2Data.q}` : ` - ${Math.abs(case2Data.q)}`)} = A${formatDenItem(case2Data.a)} + B`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">4. 比較係數，解出 <InlineMath math="A, B" />：</p>
                <ul className="list-disc ml-6 space-y-2 mt-2">
                  <li>
                    比較 <InlineMath math="x" /> 的係數：可得 <InlineMath math={`A = ${case2Data.A.tex}`} />。
                  </li>
                  <li>
                    代入 <InlineMath math={`x = ${case2Data.a}`} /> 解常數項：
                    <BlockMath math={`${case2Data.p} \\cdot (${case2Data.a}) + (${case2Data.q}) = B \\implies B = ${case2Data.B.tex}`} />
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">
                <p className="font-bold text-indigo-900 mb-1">5. 最終逐項積分結果：</p>
                <BlockMath math={`\\int \\left( \\frac{${case2Data.A.tex}}{${formatAbsItem(case2Data.a)}} + \\frac{${case2Data.B.tex}}{${formatDenSquared(case2Data.a)}} \\right) dx = ${case2Data.integralResult}`} />
              </div>
            </div>
          )}

          {/* Case 3: Multiple Linear Factors */}
          {caseType === 'multiple_linear' && (
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-800">1. 目標積分與有理式：</p>
                <BlockMath math={`\\int ${case3Data.originalFraction} \\, dx`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">2. 設定待定係數展開式：</p>
                <BlockMath math={`${case3Data.originalFraction} = \\frac{A_1}{${formatAbsItem(case3Data.a)}} + \\frac{A_2}{${formatDenSquared(case3Data.a)}} + \\frac{B_1}{${formatAbsItem(case3Data.b)}}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">3. 去分母，建立恆等式：</p>
                <BlockMath math={`${formatTerm(case3Data.p, 1, 'x^2', true) + formatTerm(case3Data.q, 1, 'x', case3Data.p === 0) + (case3Data.r > 0 ? ` + ${case3Data.r}` : case3Data.r < 0 ? ` - ${Math.abs(case3Data.r)}` : '')} = A_1${formatDenItem(case3Data.a)}${formatDenItem(case3Data.b)} + A_2${formatDenItem(case3Data.b)} + B_1${formatDenSquared(case3Data.a)}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">4. 代數求解 <InlineMath math="A_1, A_2, B_1" />：</p>
                <ul className="list-disc ml-6 space-y-2 mt-2">
                  <li>
                    代入 <InlineMath math={`x = ${case3Data.b}`} /> 消除 <InlineMath math="A_1, A_2" />：
                    <BlockMath math={`(${case3Data.p})\\cdot ${case3Data.b}^2 + (${case3Data.q})\\cdot ${case3Data.b} + (${case3Data.r}) = B_1(${case3Data.b} - ${case3Data.a})^2 \\implies ${case3Data.p * case3Data.b * case3Data.b + case3Data.q * case3Data.b + case3Data.r} = ${ (case3Data.b - case3Data.a) * (case3Data.b - case3Data.a) } B_1 \\implies B_1 = ${case3Data.B1.tex}`} />
                  </li>
                  <li>
                    代入 <InlineMath math={`x = ${case3Data.a}`} /> 消除 <InlineMath math="A_1, B_1" />：
                    <BlockMath math={`(${case3Data.p})\\cdot ${case3Data.a}^2 + (${case3Data.q})\\cdot ${case3Data.a} + (${case3Data.r}) = A_2(${case3Data.a} - ${case3Data.b}) \\implies ${case3Data.p * case3Data.a * case3Data.a + case3Data.q * case3Data.a + case3Data.r} = ${ case3Data.a - case3Data.b } A_2 \\implies A_2 = ${case3Data.A2.tex}`} />
                  </li>
                  <li>
                    比較 <InlineMath math="x^2" /> 項係數解出 <InlineMath math="A_1" />：
                    <BlockMath math={`p = A_1 + B_1 \\implies A_1 = p - B_1 = ${case3Data.p} - ${case3Data.B1.tex} = ${case3Data.A1.tex}`} />
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">
                <p className="font-bold text-indigo-900 mb-1">5. 最終逐項積分結果：</p>
                <p className="text-xs text-gray-500 mb-2">
                  提示：分別對三個分式進行積分：<InlineMath math="\\int \\frac{A_1}{x-a} dx = A_1 \\ln|x-a|" />，<InlineMath math="\\int \\frac{A_2}{(x-a)^2} dx = -\\frac{A_2}{x-a}" />，<InlineMath math="\\int \\frac{B_1}{x-b} dx = B_1 \\ln|x-b|" />。
                </p>
                <BlockMath math={`\\int \\left( \\frac{${case3Data.A1.tex}}{${formatAbsItem(case3Data.a)}} + \\frac{${case3Data.A2.tex}}{${formatDenSquared(case3Data.a)}} + \\frac{${case3Data.B1.tex}}{${formatAbsItem(case3Data.b)}} \\right) dx = ${case3Data.integralResult}`} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5.4 精選範例與詳細解析 */}
      <div className="example-box mt-8 border-t-4 border-violet-500 shadow-md">
        <h3 className="example-title text-xl font-bold text-violet-900 mb-6 flex items-center">
          <span className="mr-2">📝</span> 5.4 經典範例練習
        </h3>

        <div className="space-y-8">
          {/* 範例 1 */}
          <div className="p-5 bg-violet-50 rounded-lg border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">
              範例 1（相異一次因式）：計算 <InlineMath math="\displaystyle\int \frac{5x - 4}{x^2 - x - 2} \, dx" />
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3">
                <p><strong>Step 1：</strong>檢查分式並分解分母。</p>
                <p>
                  分子次數為 1，分母次數為 2，此為真分式。
                  將分母因式分解得 <InlineMath math="x^2 - x - 2 = (x - 2)(x + 1)" />。
                </p>
                
                <p><strong>Step 2：</strong>設定展開式形式並通分。</p>
                <BlockMath math="\frac{5x - 4}{(x - 2)(x + 1)} = \frac{A}{x - 2} + \frac{B}{x + 1}" />
                <p>兩邊同乘分母得恆等式：</p>
                <BlockMath math="5x - 4 = A(x + 1) + B(x - 2)" />
                
                <p><strong>Step 3：</strong>代入特殊值解係數。</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>令 <InlineMath math="x = 2" />，得 <InlineMath math="5(2) - 4 = A(2 + 1) \implies 6 = 3A \implies A = 2" />。</li>
                  <li>令 <InlineMath math="x = -1" />，得 <InlineMath math="5(-1) - 4 = B(-1 - 2) \implies -9 = -3B \implies B = 3" />。</li>
                </ul>

                <p><strong>Step 4：</strong>帶回原式進行積分。</p>
                <BlockMath math="\int \frac{5x - 4}{x^2 - x - 2} \, dx = \int \left( \frac{2}{x - 2} + \frac{3}{x + 1} \right) dx" />
                <BlockMath math="= 2 \ln|x - 2| + 3 \ln|x + 1| + C" />
              </div>
            </SolutionBox>
          </div>

          {/* 範例 2 */}
          <div className="p-5 bg-violet-50 rounded-lg border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">
              範例 2（重複一次因式）：計算 <InlineMath math="\displaystyle\int \frac{x^2 + 2x + 3}{(x - 1)^3} \, dx" />
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3">
                <p><strong>💡 巧思解析：本題除了設定常規展開式外，採用「變數變換法」會非常迅速！</strong></p>
                <p><strong>Step 1：</strong>令新變數 <InlineMath math="u = x - 1" />，則 <InlineMath math="x = u + 1" />，且微分 <InlineMath math="dx = du" />。</p>
                
                <p><strong>Step 2：</strong>將分子全部換為 <InlineMath math="u" /> 的多項式。</p>
                <BlockMath math="x^2 + 2x + 3 = (u + 1)^2 + 2(u + 1) + 3" />
                <BlockMath math="= (u^2 + 2u + 1) + (2u + 2) + 3 = u^2 + 4u + 6" />

                <p><strong>Step 3：</strong>代回積分式中，進行拆項與逐項積分。</p>
                <BlockMath math="\int \frac{u^2 + 4u + 6}{u^3} \, du = \int \left( \frac{1}{u} + \frac{4}{u^2} + \frac{6}{u^3} \right) du" />
                <BlockMath math="= \int \left( u^{-1} + 4u^{-2} + 6u^{-3} \right) du = \ln|u| - \frac{4}{u} - \frac{3}{u^2} + C" />

                <p><strong>Step 4：</strong>將 <InlineMath math="u = x - 1" /> 回代，寫出最終答案。</p>
                <BlockMath math="= \ln|x - 1| - \frac{4}{x - 1} - \frac{3}{(x - 1)^2} + C" />
                <p className="text-xs text-gray-500">
                  * 註：如果使用常規部分分式設為 <InlineMath math="\frac{A}{x-1} + \frac{B}{(x-1)^2} + \frac{C}{(x-1)^3}" />，通分後解出來的係數同樣是 <InlineMath math="A = 1, B = 4, C = 6" />。
                </p>
              </div>
            </SolutionBox>
          </div>

          {/* 範例 3 */}
          <div className="p-5 bg-violet-50 rounded-lg border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">
              範例 3（不可約二次因式）：計算 <InlineMath math="\displaystyle\int \frac{2x^2 - x + 4}{x^3 + 4x} \, dx" />
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3">
                <p><strong>Step 1：</strong>因式分解分母並設展開式。</p>
                <p>
                  分母 <InlineMath math="x^3 + 4x = x(x^2 + 4)" />。其中 <InlineMath math="x^2 + 4" /> 在實數體上不可約。
                </p>
                <BlockMath math="\frac{2x^2 - x + 4}{x(x^2 + 4)} = \frac{A}{x} + \frac{Bx + C}{x^2 + 4}" />

                <p><strong>Step 2：</strong>同乘分母以解係數。</p>
                <BlockMath math="2x^2 - x + 4 = A(x^2 + 4) + (Bx + C)x" />
                <BlockMath math="2x^2 - x + 4 = (A + B)x^2 + Cx + 4A" />

                <p><strong>Step 3：</strong>比較兩端係數或代值求解。</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>比較常數項：<InlineMath math="4A = 4 \implies A = 1" />。</li>
                  <li>比較一次項：<InlineMath math="C = -1" />。</li>
                  <li>比較二次項：<InlineMath math="A + B = 2 \implies 1 + B = 2 \implies B = 1" />。</li>
                </ul>
                <p>因此展開式為：</p>
                <BlockMath math="\frac{1}{x} + \frac{x - 1}{x^2 + 4}" />

                <p><strong>Step 4：</strong>拆分積分並逐項求值。</p>
                <BlockMath math="\int \left( \frac{1}{x} + \frac{x}{x^2 + 4} - \frac{1}{x^2 + 4} \right) dx" />
                <ul className="list-disc ml-6 space-y-2">
                  <li>第一項：<InlineMath math="\int \frac{1}{x} \, dx = \ln|x|" /></li>
                  <li>
                    第二項（令 <InlineMath math="u = x^2+4" />）：
                    <InlineMath math="\int \frac{x}{x^2 + 4} \, dx = \frac{1}{2} \ln(x^2 + 4)" />
                  </li>
                  <li>
                    第三項（套用 <InlineMath math="\int \frac{1}{x^2+a^2} dx = \frac{1}{a} \arctan(x/a)" /> 公式）：
                    <InlineMath math="\int \frac{1}{x^2 + 4} \, dx = \frac{1}{2} \arctan\left(\frac{x}{2}\right)" />
                  </li>
                </ul>

                <p><strong>Step 5：</strong>組合答案。</p>
                <BlockMath math="= \ln|x| + \frac{1}{2} \ln(x^2 + 4) - \frac{1}{2} \arctan\left(\frac{x}{2}\right) + C" />
              </div>
            </SolutionBox>
          </div>

          {/* 範例 4 */}
          <div className="p-5 bg-violet-50 rounded-lg border border-violet-100">
            <p className="font-bold text-violet-900 mb-2">
              範例 4（假分式化簡）：計算 <InlineMath math="\displaystyle\int \frac{x^3 + x}{x - 1} \, dx" />
            </p>
            <SolutionBox>
              <div className="text-sm text-gray-700 space-y-3">
                <p><strong>Step 1：</strong>判斷次數並進行多項式除法。</p>
                <p>
                  分子次數為 3，分母為 1。因為 <InlineMath math="3 \ge 1" />，此為<strong>假分式</strong>。
                  必須先用多項式長除法：
                </p>
                <BlockMath math="(x^3 + x) \div (x - 1) = x^2 + x + 2 \quad \text{餘數 } 2" />
                <p>故可改寫為：</p>
                <BlockMath math="\frac{x^3 + x}{x - 1} = x^2 + x + 2 + \frac{2}{x - 1}" />

                <p><strong>Step 2：</strong>逐項進行簡單積分。</p>
                <BlockMath math="\int \left( x^2 + x + 2 + \frac{2}{x - 1} \right) dx" />
                <BlockMath math="= \frac{x^3}{3} + \frac{x^2}{2} + 2x + 2 \ln|x - 1| + C" />
              </div>
            </SolutionBox>
          </div>
        </div>
      </div>

      {/* 5.5 常見錯誤 */}
      <div className="mt-8 p-5 bg-red-50 rounded-lg border border-red-200">
        <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center">
          <span className="mr-2">⚠️</span> 5.5 常見陷阱與錯誤
        </h3>
        <ul className="space-y-3 text-sm text-gray-700">
          <li className="flex gap-3">
            <span className="text-red-500 font-bold flex-shrink-0">✗</span>
            <div>
              <p className="font-semibold text-red-900">未做假分式化簡直接分解：</p>
              <p>如果分子的冪次大於或等於分母的冪次，直接設係數展開一定會得到無解或錯誤的解答。請牢記先做<strong>多項式長除法</strong>。</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-red-500 font-bold flex-shrink-0">✗</span>
            <div>
              <p className="font-semibold text-red-900">二次不可約因式的分子設法錯誤：</p>
              <p>對於分母是二次不可約因式（如 <InlineMath math="x^2+a^2" />）的項，分子必須設為一次多項式形式 <InlineMath math="Bx+C" />，如果只設常數 <InlineMath math="B" />，展開結果將不正確。</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="text-red-500 font-bold flex-shrink-0">✗</span>
            <div>
              <p className="font-semibold text-red-900">漏掉反三角函數積分前的常數項：</p>
              <p>
                積分 <InlineMath math="\displaystyle\int \frac{1}{x^2+a^2} dx" /> 時，答案是 <InlineMath math="\frac{1}{a}\arctan(x/a) + C" />，常有學生漏寫前面的係數乘項 <InlineMath math="\frac{1}{a}" />。
              </p>
            </div>
          </li>
        </ul>
      </div>

    </section>
  );
}
