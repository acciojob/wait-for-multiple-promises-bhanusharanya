//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');

    // Add a loading row
    const loadingRow = document.createElement('tr');
    const loadingCell = document.createElement('td');
    loadingCell.colSpan = 2;
    loadingCell.innerText = 'Loading...';
    loadingRow.appendChild(loadingCell);
    output.appendChild(loadingRow);

    // Function to create a promise that resolves after a random time between 1 and 3 seconds
    function createRandomPromise(index) {
        return new Promise((resolve) => {
            const delay = Math.random() * 2000 + 1000; // Random time between 1000ms and 3000ms
            setTimeout(() => resolve({ index, time: delay / 1000 }), delay);
        });
    }

    // Create three promises
    const promises = [1, 2, 3].map(i => createRandomPromise(i));

    const startTime = performance.now();

    // Wait for all promises to resolve
    Promise.all(promises)
        .then(results => {
            const endTime = performance.now();
            const totalTime = (endTime - startTime) / 1000;

            // Clear the loading row
            output.innerHTML = '';

            // Populate the table with the results
            results.forEach(result => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                const timeCell = document.createElement('td');
                nameCell.innerText = `Promise ${result.index}`;
                timeCell.innerText = result.time.toFixed(3);
                row.appendChild(nameCell);
                row.appendChild(timeCell);
                output.appendChild(row);
            });

            // Add the total time row
            const totalRow = document.createElement('tr');
            const totalNameCell = document.createElement('td');
            const totalTimeCell = document.createElement('td');
            totalNameCell.innerText = 'Total';
            totalTimeCell.innerText = totalTime.toFixed(3);
            totalRow.appendChild(totalNameCell);
            totalRow.appendChild(totalTimeCell);
            output.appendChild(totalRow);
        })
        .catch(error => {
            console.error('Error:', error);
            output.innerHTML = `<tr><td colspan="2">${error}</td></tr>`;
        });
});
