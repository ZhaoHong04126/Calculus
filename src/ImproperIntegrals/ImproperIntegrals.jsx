import React from 'react';
import ComingSoon from '../components/ComingSoon';

export default function ImproperIntegrals() {
  return (
    <div className="topic-content">
      <header className="topic-header">
        <h1 className="topic-title">第十章：瑕積分</h1>
        <p className="text-lg mt-2 text-gray-600">
          當積分上限遇到無限、或是函數值衝向極端瑕點，極限工具將帶領我們求得收斂的面積。
        </p>
      </header>

      <ComingSoon chapterName="瑕積分" />
    </div>
  );
}

