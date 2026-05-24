import React from 'react';
import SectionNav from '../components/SectionNav';
import ImproperDefinition from './ImproperDefinition';
import ImproperInteractive from './ImproperInteractive';
import ImproperComparison from './ImproperComparison';
import ImproperErrors from './ImproperErrors';
import ImproperSummary from './ImproperSummary';
import './ImproperIntegrals.css';

export default function ImproperIntegrals() {
  const sections = [
    { id: 'definition', title: '瑕積分的定義與分類' },
    { id: 'visualization', title: '互動式視覺化探索' },
    { id: 'comparison', title: '審斂法：比較審斂法' },
    { id: 'errors', title: '常見錯誤與陷阱' },
    { id: 'summary', title: '學習心法與總結' },
  ];

  return (
    <div className="topic-content">
      <header className="topic-header">
        <h1 className="topic-title">第十章：瑕積分</h1>
        <p className="topic-subtitle" style={{ fontSize: '16px', color: '#64748b', marginTop: '8px' }}>
          當積分上限遇到無限、或是函數值衝向極端瑕點，極限工具將帶領我們求得收斂的面積。
        </p>
      </header>

      <SectionNav sections={sections} />

      <div id="definition"><ImproperDefinition /></div>
      <div id="visualization"><ImproperInteractive /></div>
      <div id="comparison"><ImproperComparison /></div>
      <div id="errors"><ImproperErrors /></div>
      <div id="summary"><ImproperSummary /></div>
    </div>
  );
}
