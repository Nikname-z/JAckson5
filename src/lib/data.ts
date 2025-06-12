// lib/data.ts

// 1. Define a new TypeScript interface that matches your data keys.
//    Note that keys with spaces must be in quotes.
export interface ProductionUnit {
  "Serial Number": string;
  "Operation": string;
  "Operation Status": "In Progress" | "Pending" | "Not Started";
  "Last Operator": string;
  "Unit Status": "Active" | "Paused" | "Closed";
  "Kickback Count": string;
  "Expected Completion": string;
}

// 2. This is your actual data.
const units: ProductionUnit[] = [
  {
    "Serial Number": "SN001",
    "Operation": "Frame Assembly",
    "Operation Status": "In Progress",
    "Last Operator": "Alice",
    "Unit Status": "Active",
    "Kickback Count": "0",
    "Expected Completion": "June 7, 2025"
  },
  {
    "Serial Number": "SN002",
    "Operation": "Wiring",
    "Operation Status": "Pending",
    "Last Operator": "—",
    "Unit Status": "Paused",
    "Kickback Count": "0",
    "Expected Completion": "June 8, 2025"
  },
  {
    "Serial Number": "SN003",
    "Operation": "Quality Check",
    "Operation Status": "Not Started",
    "Last Operator": "—",
    "Unit Status": "Closed",
    "Kickback Count": "0",
    "Expected Completion": "June 10, 2025"
  }
];

// 3. Update our functions to work with the new data.
export const getAllUnits = () => {
  return units;
}

// The function now finds a unit by its "Serial Number".
export const getUnitBySerialNumber = (serialNumber: string): ProductionUnit | undefined => {
  return units.find(unit => unit["Serial Number"] === serialNumber);
}