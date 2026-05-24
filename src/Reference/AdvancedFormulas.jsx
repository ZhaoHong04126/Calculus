import React from 'react';
import { InlineMath, BlockMath } from '../components/Math';

export default function AdvancedFormulas() {
  return (
    <section className="subsection mt-8">
      <h2 className="section-title text-2xl font-bold mb-4 border-b-2 border-rose-500 pb-2">9.5 進階公式</h2>

      <div className="math-box p-6 bg-rose-50 rounded-lg shadow-sm border border-rose-200 mb-8">
        <h3 className="text-xl font-bold mb-3 text-rose-800">一、三角函數積分形式 (Trigonometric Integral Forms)</h3>
        <p className="text-sm text-gray-600 mb-4">適用於高次冪三角函數的積分，通常使用遞迴公式 (Reduction Formulas) 或代換法：</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded shadow-sm border border-rose-200">
            <thead className="bg-rose-100 text-rose-900">
              <tr>
                <th className="py-2 px-4 border border-rose-200 font-bold w-1/3">積分類型</th>
                <th className="py-2 px-4 border border-rose-200 font-bold">遞迴公式 / 策略</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {/* 正弦函數次幂積分 */}
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold align-top">
                  <InlineMath math="\int \sin^n x \,dx" /><br />
                </td>
                <td className="py-3 px-4 border border-rose-200">
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border border-rose-100 shadow-sm">
                      <div className="text-sm space-y-2">
                        <div>(1) <InlineMath math="\int \sin x \,dx = - \cos x + C" /></div>
                        <div>(2) <InlineMath math="\int \sin^2 x \,dx =  \frac{1}{2}x - \frac{1}{4}\sin 2x + C" /></div>
                        <div>(3) <InlineMath math="\int \sin^3 x \,dx = \frac{1}{3} \cos ^3 x \, -\cos x + C" /></div>
                        <div>(4) <InlineMath math="\int \sin^4 x \,dx = \frac{3}{8} x \, - \frac{1}{4} \sin 2x \, + \frac{1}{32} \sin 4x + C" /></div>
                        <div>(5) <InlineMath math="\int \sin^n x \,dx = \frac{1}{n} [- \sin^{n-1} x \cos x + (n-1) \int \sin^{n-2} x \,dx] + C" /></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {/* 餘弦函數次幂積分 */}
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold align-top">
                  <InlineMath math="\int \cos^n x \,dx" />
                </td>
                <td className="py-3 px-4 border border-rose-200">
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border border-rose-100 shadow-sm">
                      <div className="text-sm space-y-2">
                        <div>(1) <InlineMath math="\int \cos x \,dx = \sin x + C" /></div>
                        <div>(2) <InlineMath math="\int \cos^2 x \,dx = \frac{1}{2}x + \frac{1}{4}\sin 2x + C" /></div>
                        <div>(3) <InlineMath math="\int \cos^3 x \,dx = \sin x - \frac{1}{3}\sin^3 x + C" /></div>
                        <div>(4) <InlineMath math="\int \cos^4 x \,dx = \frac{1}{8}(3x + 2\sin 2x + \frac{1}{4}\sin 4x) + C" /></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {/* 正餘弦函數乘積次幂積分 */}
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold align-top">
                  <InlineMath math="\int \sin^m x \cos^n x \,dx" />
                </td>
                <td className="py-3 px-4 border border-rose-200">
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border border-rose-100 shadow-sm text-sm space-y-4">
                      <div className="flex items-start">
                        <div className="font-semibold text-rose-800 w-7 shrink-0">(1)</div>
                        <div className="flex-1">
                          <div className="font-semibold text-rose-800 mb-1"><InlineMath math="m" /> 與 <InlineMath math="n" /> 至少有一個為正奇數，其他為任何數。</div>
                          <div className="space-y-1 text-gray-700">
                            <div className="font-medium text-gray-500">解題工具</div>
                            <div>(a) <InlineMath math="\sin^2 x + \cos^2 x = 1" /></div>
                            <div>(b) 代換積分法。</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="font-semibold text-rose-800 w-7 shrink-0">(2)</div>
                        <div className="flex-1">
                          <div className="font-semibold text-rose-800 mb-1"><InlineMath math="m" /> 與 <InlineMath math="n" /> 均為正偶數 (降次)</div>
                          <div className="space-y-1 text-gray-700">
                            <div className="font-medium text-gray-500">解題工具</div>
                            <div>(a) <InlineMath math="\sin^2 x = \frac{1 - \cos 2x}{2}" /></div>
                            <div>(b) <InlineMath math="\cos^2 x = \frac{1 + \cos 2x}{2}" /></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {/* 正切函數次幂積分 */}
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold">
                  <InlineMath math="\int \tan^n x \,dx" />
                </td>
                <td className="py-3 px-4 border border-rose-200">
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border border-rose-100 shadow-sm">
                      <div className="text-sm space-y-2">
                        <div>(1) <InlineMath math="\int \tan x \,dx = \ln |\sec x| + C = -\ln |\cos x| + C" /></div>
                        <div>(2) <InlineMath math="\int \tan^2 x \,dx = tan x - x + C" /></div>
                        <div>(3) <InlineMath math="\int \tan^3 x \,dx = \frac{1}{2}\tan^2 x - \ln |\sec x| + C" /></div>
                        <div>(4) <InlineMath math="\int \tan^4 x \,dx = \frac{1}{3}\tan^3 x - \tan x + x + C" /></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {/* 正割函數次幂積分 */}
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold">
                  <InlineMath math="\int \sec^n x \,dx" />
                </td>
                <td className="py-3 px-4 border border-rose-200">
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border border-rose-100 shadow-sm">
                      <div className="text-sm space-y-2">
                        <div>(1) <InlineMath math="\int \sec x \,dx = \ln |\sec x + \tan x| + C" /></div>
                        <div>(2) <InlineMath math="\int \sec^2 x \,dx = \tan x + C" /></div>
                        <div>(3) <InlineMath math="\int \sec^3 x \,dx = \frac{1}{2}\sec x \tan x + \frac{1}{2}\ln |\sec x + \tan x| + C" /></div>
                        <div>(4) <InlineMath math="\int \sec^4 x \,dx = \frac{1}{3}\tan^3 x + \tan x + C" /></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              {/* 正切與正割乘積次幂積分 */}
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold align-top">
                  <InlineMath math="\int \tan^m x \sec^n x \,dx" />
                </td>
                <td className="py-3 px-4 border border-rose-200">
                  <div className="space-y-4">
                    <div className="bg-white p-3 rounded border border-rose-100 shadow-sm text-sm space-y-4">
                      <div className="flex items-start">
                        <div className="font-semibold text-rose-800 w-7 shrink-0">(1)</div>
                        <div className="flex-1">
                          <div className="font-semibold text-rose-800 mb-1"><InlineMath math="m" /> 為正奇數，<InlineMath math="n" /> 為任何數。</div>
                          <div className="space-y-1 text-gray-700">
                            <div className="font-medium text-gray-500">解題工具</div>
                            <div>(a) <InlineMath math="\tan^2 x = \sec^2 x - 1" /></div>
                            <div>(b) 代換積分法 <InlineMath math="d \sec x = \sec x \cdot \tan x \,dx" /> 。</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="font-semibold text-rose-800 w-7 shrink-0">(2)</div>
                        <div className="flex-1">
                          <div className="font-semibold text-rose-800 mb-1"><InlineMath math="n" /> 為正偶數，<InlineMath math="m" /> 為任何數。</div>
                          <div className="space-y-1 text-gray-700">
                            <div className="font-medium text-gray-500">解題工具</div>
                            <div>(a) <InlineMath math="\sec^2 x = 1 + \tan^2 x" /></div>
                            <div>(b) 代換積分法 <InlineMath math="d \tan x = \sec^2 x \,dx" /> 。</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="math-box p-6 bg-rose-50 rounded-lg shadow-sm border border-rose-200 mb-8">
        <h3 className="text-xl font-bold mb-3 text-rose-800">二、三角函數積化和差形式 (Product-to-Sum Trigonometric Forms)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded shadow-sm border border-rose-200">
            <thead className="bg-rose-100 text-rose-900">
              <tr>
                <th className="py-2 px-4 border border-rose-200 font-bold w-1/3">積分類型</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold align-top">
                  <InlineMath math="\int [\sin(mx) \cos(nx)] \,dx = \frac{1}{2} [- \frac{1}{m+n} \cos((m+n)x) - \frac{1}{m-n} \cos((m-n)x)] + C" />
                </td>
              </tr>
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold align-top">
                  <InlineMath math="\int [\cos(mx) \sin(nx)] \,dx = \frac{1}{2} [- \frac{1}{m+n} \cos((m+n)x) + \frac{1}{m-n} \cos((m-n)x)] + C" />
                </td>
              </tr>
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold align-top">
                  <InlineMath math="\int \cos (mx) \cos (nx) \,dx = \frac{1}{2} [\frac{1}{m+n} \sin((m+n)x) + \frac{1}{m-n} \sin((m-n)x)] + C" />
                </td>
              </tr>
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold align-top">
                  <InlineMath math="\int \sin (mx) \sin (nx) \,dx = \frac{1}{2} [\frac{1}{m+n} \sin((m+n)x) + \frac{1}{m-n} \sin((m-n)x)] + C" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="math-box p-6 bg-rose-50 rounded-lg shadow-sm border border-rose-200 mb-8">
        <h3 className="text-xl font-bold mb-3 text-rose-800">三、三角變換法 (Trigonometric Substitution)</h3>
        <p className="text-sm text-gray-600 mb-4">適用於含有根式 <InlineMath math="\sqrt{a^2-x^2}" />、<InlineMath math="\sqrt{a^2+x^2}" /> 或 <InlineMath math="\sqrt{x^2-a^2}" /> 的積分：</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded shadow-sm border border-rose-200">
            <thead className="bg-rose-100 text-rose-900">
              <tr>
                <th className="py-2 px-4 border border-rose-200 font-bold w-1/4">根式類型</th>
                <th className="py-2 px-4 border border-rose-200 font-bold w-1/4">三角代換設法</th>
                <th className="py-2 px-4 border border-rose-200 font-bold w-1/4">微分關係式 dx</th>
                <th className="py-2 px-4 border border-rose-200 font-bold">簡化結果</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold"><InlineMath math="\sqrt{a^2 - x^2}" /></td>
                <td className="py-3 px-4 border border-rose-200"><InlineMath math="x = a \sin\theta" /></td>
                <td className="py-3 px-4 border border-rose-200"><InlineMath math="dx = a \cos\theta \, d\theta" /></td>
                <td className="py-3 px-4 border border-rose-200"><InlineMath math="\sqrt{a^2 - x^2} = a \cos\theta" /></td>
              </tr>
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold"><InlineMath math="\sqrt{a^2 + x^2}" /></td>
                <td className="py-3 px-4 border border-rose-200"><InlineMath math="x = a \tan\theta" /></td>
                <td className="py-3 px-4 border border-rose-200"><InlineMath math="dx = a \sec^2\theta \, d\theta" /></td>
                <td className="py-3 px-4 border border-rose-200"><InlineMath math="\sqrt{a^2 + x^2} = a \sec\theta" /></td>
              </tr>
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold"><InlineMath math="\sqrt{x^2 - a^2}" /></td>
                <td className="py-3 px-4 border border-rose-200"><InlineMath math="x = a \sec\theta" /></td>
                <td className="py-3 px-4 border border-rose-200"><InlineMath math="dx = a \sec\theta \tan\theta \, d\theta" /></td>
                <td className="py-3 px-4 border border-rose-200"><InlineMath math="\sqrt{x^2 - a^2} = a \tan\theta" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="math-box p-6 bg-rose-50 rounded-lg shadow-sm border border-rose-200 mb-8">
        <h3 className="text-xl font-bold mb-3 text-rose-800">四、部分分式 (Partial Fractions)</h3>
        <p className="text-sm text-gray-600 mb-4">有理函數 <InlineMath math="\frac{P(x)}{Q(x)}" /> 在 <InlineMath math="\deg(P) < \deg(Q)" /> 時，依分母因式進行分解的設法：</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white rounded shadow-sm border border-rose-200">
            <thead className="bg-rose-100 text-rose-900">
              <tr>
                <th className="py-2 px-4 border border-rose-200 font-bold w-1/4">分母因式類型</th>
                <th className="py-2 px-4 border border-rose-200 font-bold w-1/2">部分分式展開設法</th>
                <th className="py-2 px-4 border border-rose-200 font-bold">積分型態說明</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold"><InlineMath math="x - a" /> (相異一次因式)</td>
                <td className="py-3 px-4 border border-rose-200"><BlockMath math="\frac{A}{x - a}" /></td>
                <td className="py-3 px-4 border border-rose-200">產生對數：<InlineMath math="A \ln|x-a| + C" /></td>
              </tr>
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold"><InlineMath math="(x - a)^k" /> (重複一次因式)</td>
                <td className="py-3 px-4 border border-rose-200"><BlockMath math="\frac{A_1}{x - a} + \frac{A_2}{(x - a)^2} + \cdots + \frac{A_k}{(x - a)^k}" /></td>
                <td className="py-3 px-4 border border-rose-200">一次項產生 <InlineMath math="\ln" />，其餘高次項使用冪次積分。</td>
              </tr>
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold"><InlineMath math="(ax - b)^m(cx - d)^n" /> (多組因式)</td>
                <td className="py-3 px-4 border border-rose-200"><BlockMath math="\frac{A_1}{ax - b} + \cdots + \frac{A_m}{(ax - b)^m} + \frac{B_1}{cx - d} + \cdots + \frac{B_n}{(cx - d)^n}" /></td>
                <td className="py-3 px-4 border border-rose-200">每組一次因式單獨展開，各項分別求積分。</td>
              </tr>
              <tr className="hover:bg-rose-50/50 transition-colors">
                <td className="py-3 px-4 border border-rose-200 font-semibold"><InlineMath math="(x^2 + b)^k \quad (b > 0)" /> (重複不可約二次因式)</td>
                <td className="py-3 px-4 border border-rose-200"><BlockMath math="\frac{B_1x + C_1}{x^2 + b} + \frac{B_2x + C_2}{(x^2 + b)^2} + \cdots + \frac{B_kx + C_k}{(x^2 + b)^k}" /></td>
                <td className="py-3 px-4 border border-rose-200">使用遞迴公式、變數變換或三角代換法求解。</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
