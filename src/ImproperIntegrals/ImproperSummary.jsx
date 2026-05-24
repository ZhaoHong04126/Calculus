import React from 'react';

export default function ImproperSummary() {
  return (
    <section className="subsection" style={{ marginBottom: '80px' }}>
      <h2 className="section-title">
        10.5 學習心法與總結
      </h2>
      <div className="improper-summary-box">
        <div className="improper-summary-title">💡 瑕積分核心心法</div>
        <div className="improper-summary-text">
          <p style={{ marginBottom: '12px' }}>
            瑕積分並非一種全新的積分運算，而是<strong>「定積分」與「極限」的結合</strong>。
            當我們無法直接跨越無窮大的鴻溝或跨越無限高的懸崖（瑕點）時，我們選擇在安全的地方（有限邊界）先進行定積分計算，然後讓邊界藉由極限緩緩逼近目標。
          </p>
          <p>
            處理任何瑕積分問題時，請先養成兩個習慣：
          </p>
          <ol style={{ paddingLeft: '18px', marginTop: '8px', fontSize: '13px', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '6px' }}><strong>檢查邊界與內部</strong>：確認積分區間是否有無窮大，並檢查被積函數在區間內有沒有分母為 0 或無界的情況（瑕點）。</li>
            <li><strong>拆分區間</strong>：一旦區間內有瑕點，或者兩端都是無窮大，務必先拆分成單一方向極限的定積分，再分別取極限判定斂散性。</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
