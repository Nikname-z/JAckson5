// This function fetches data and builds the HTML
async function loadOperations() {
  const container = document.querySelector('.container');

  try {
    // Fetch the data from the external JSON file
    const response = await fetch('job1SN000opsheet.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const operationsData = await response.json();

    // Loop through the data and generate HTML for each operation
    operationsData.forEach(op => {
      const operationDiv = document.createElement('div');
      operationDiv.className = 'operation';

      operationDiv.innerHTML = `
        <h3>${op.Operation} <span style="font-weight: normal; font-size: 1rem;">-- Hang Time 00:00</span></h3>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Operator</th>
              <th>Notes</th>
              <th>Kickback Count</th>
              <th>Expected Completion</th>
              <th>Time Elapsed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${op.Status}</td>
              <td>${op.Operator}</td>
              <td>${op.Notes}</td>
              <td>${op['Kickback Count']}</td>
              <td>${op['Expected Completion']}</td>
              <td>${op['Time Elapsed']}</td>
            </tr>
          </tbody>
        </table>
      `;
      container.appendChild(operationDiv);
    });

  } catch (error) {
    console.error('Error loading operations data:', error);
    container.innerHTML += '<p style="color: red;">Could not load operations data. Please check the console for more information.  job  </p>';
  }
}

// Run the function after the document has fully loaded
document.addEventListener('DOMContentLoaded', loadOperations);