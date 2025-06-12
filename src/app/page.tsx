// src/app/page.tsx

import Link from 'next/link';
// 1. Import the new function
import { getAllUnits } from '@/lib/data';

export default function HomePage() {
  // 2. Get the list of all production units
  const units = getAllUnits();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav>{/* Your nav links remain the same */}</nav>

      <div className="main">
        <header>
          <h1>Production Dashboard</h1>
        </header>

        <div className="container">
          <section id="units" className="section">
            <h2>Current Units</h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {/* 3. Loop over the units and use BRACKET NOTATION for keys with spaces */}
              {units.map((unit) => (
                <li key={unit["Serial Number"]} style={{ marginBottom: '10px' }}>
                  <Link
                    // 4. The link now uses the serial number for the dynamic route
                    href={`/unit/${unit["Serial Number"]}`}
                    style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
                  >
                    Unit: {unit["Serial Number"]}
                  </Link>
                  {' '}– Current Operation: {unit["Operation"]} – Status: {unit["Operation Status"]}
                </li>
              ))}
            </ul>
          </section>

          {/* ... Other sections if you have them ... */}
        </div>

        <footer>&copy; 2025 Production Inc.</footer>
      </div>
    </div>
  );
}