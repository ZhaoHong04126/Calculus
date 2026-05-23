// src/Techniques/Techniques.jsx
import USubstitution from '../Integrals/USubstitution';
import IntegrationByParts from '../Integrals/IntegrationByParts';
import TrigIntegrals from '../Integrals/TrigIntegrals';
import TrigSubstitution from '../Integrals/TrigSubstitution';
import SectionNav from '../components/SectionNav';
import '../Integrals/Integrals.css';

export default function Techniques() {
  const sections = [
    { id: 'substitution', title: '變數變換法' },
    { id: 'parts', title: '分部積分法' },
    { id: 'trig-integrals', title: '三角函數的積分' },
    { id: 'trig-sub', title: '三角變換法' },
  ];

  return (
    <div className="topic-content">
      <header className="topic-header">
        <h1 className="topic-title">第七章：積分技巧</h1>
        <p className="text-lg mt-2 text-gray-600">
          掌握變數變換、分部積分等核心技巧，化簡複雜積分求解。
        </p>
      </header>

      <SectionNav sections={sections} />

      <div id="substitution">
        <USubstitution />
      </div>

      <div id="parts">
        <IntegrationByParts />
      </div>

      <div id="trig-integrals">
        <TrigIntegrals />
      </div>

      <div id="trig-sub">
        <TrigSubstitution />
      </div>
    </div>
  );
}
