async function loadOperations() {
  const container = document.querySelector('.container');
  const pageTitle = document.getElementById('tracker-title');

  const params = new URLSearchParams(window.location.search);
  const serialNumber = params.get('serial');
  const jobTitle = params.get('job');

  // --- NEW LOGIC FOR THE BACK LINK ---
  // 1. Find the back link element by its new ID
  //const backLink = document.getElementById('back-to-job-link');

  // // 2. Update the link's text to be specific to the job, if a job title exists
  // if (jobTitle && backLink) {
  //   backLink.innerHTML = `← Back to ${jobTitle}`;
  // }

  const backLink = document.getElementById('back-to-job-link');

  // 2. Update the link's text to be specific to the job, if a job title exists
  if (jobTitle && backLink) {
    backLink.innerHTML = `← Back to ${jobTitle}`;
  }

  // --- END OF NEW LOGIC ---

  if (!serialNumber) {
    pageTitle.textContent = 'Error - No Unit Specified';
    container.innerHTML += '<p style="color: red;">No serial number was provided in the URL. Please go back to the projects list and select a unit.</p>';
    return;
  }
  
  let titleText = `${serialNumber} - Operation Tracker`;
  if (jobTitle) {
    titleText = `${jobTitle} | ${serialNumber} - Operation Tracker`;
  }
  pageTitle.textContent = titleText;

  let folderName = 'data';
  if (jobTitle) {
    folderName = jobTitle.replace(/\s/g, '');
  }
  const dataUrl = `${folderName}/${serialNumber}.json`;

  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`Could not find data file at ${dataUrl}. Status: ${response.status}`);
    }
    const operationsData = await response.json();

    operationsData.forEach(op => {
      // ... (The rest of the table-building logic is the same)
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
    container.innerHTML += `<p style="color: red;">Could not load operations data. Please ensure the folder and file exist at the expected path.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadOperations);