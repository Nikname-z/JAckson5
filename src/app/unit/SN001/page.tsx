// src/app/unit/[serialNumber]/page.tsx

import { getUnitBySerialNumber } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 1. The 'params' object key now matches our folder name: `serialNumber`
export default function UnitDetailPage({ params }: { params: { serialNumber: string } }) {
  // 2. We call our new function with the serial number from the URL
  const unit = getUnitBySerialNumber(params.serialNumber);

  if (!unit) {
    notFound();
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav>{/* Your nav component */}</nav>

      <div className="main">
        <header>
          {/* 3. Use bracket notation to display all data */}
          <h1>Unit Details: {unit["Serial Number"]}</h1>
        </header>

        <div className="container">
          <Link href="/">&larr; Back to Dashboard</Link>

          <section className="section" style={{ marginTop: '20px' }}>
            <h2>Live Status</h2>
            <p><strong>Current Operation:</strong> {unit["Operation"]}</p>
            <p><strong>Operation Status:</strong> {unit["Operation Status"]}</p>
            <p><strong>Last Operator:</strong> {unit["Last Operator"]}</p>
            <p><strong>Overall Unit Status:</strong> {unit["Unit Status"]}</p>
            <p><strong>Kickback Count:</strong> {unit["Kickback Count"]}</p>
            <p><strong>Expected Completion:</strong> {unit["Expected Completion"]}</p>
          </section>
        </div>
        <footer>{/* ... your footer ... */}</footer>
      </div>
    </div>
  );
}