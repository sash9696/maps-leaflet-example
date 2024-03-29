const transformedData = [
    {
        city: "NYC",
        country: "USA",
        customername: "Land of Toys Inc.",
        dealsize: "Small",
        postalcode: 10022,
        productcode: "S10_1678",
        sales: 2871,
        state: "NY",
        territory: "NA",
    },
    {
        city: "Reims",
        country: "France",
        customername: "Reims Collectables",
        dealsize: "Small",
        postalcode: 51100,
        productcode: "S10_1678",
        sales: 2765.9,
        state: "",
        territory: "EMEA",
    },
];
const chartData = [
    ['customername', 'sales'],
    ['Land of Toys Inc.', 2871],
];

console.log(chartData);

const keysToDisplay = ["city", "sales"];
const seriesValue = 'sales';
const filteredDataArray = []; // Array to store filtered data objects

// Function to check if the header matches the seriesValue
const isSeriesColumn = (header) => header === seriesValue;

// Loop through each row in chartData starting from index 1 (skipping the header)
const newChartData = chartData.map((dataRow, index) => {
    if (index === 0) {
        // For the header row, find the index of the seriesValue column
        const seriesColumnIndex = dataRow.findIndex(isSeriesColumn);
        if (seriesColumnIndex !== -1) {
            // Add the tooltip column after the seriesValue column in the header row
            dataRow.splice(seriesColumnIndex + 1, 0, { type: "string", role: "tooltip", p: { html: true } });
        }
        return dataRow;
    } else {
        const rowData = transformedData[index - 1]; // Get corresponding data from transformedData
        const filteredData = {};
        // Add only the required keys to filteredData
        for (const key of keysToDisplay) {
            filteredData[key] = rowData[key];
        }
        // Generate tooltip HTML
        const tooltipHtml = createCustomTooltipHtml(filteredData);
        // Append tooltip data to the row
        return [...dataRow, tooltipHtml];
    }
});

console.log(newChartData);

function createCustomTooltipHtml(params) {
    if (!params) return;
    // Initialize HTML variable to store table structure
    let html = `<div style="font-size: small; font-weight: bold; background-color: grey; color: white;  padding: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); z-index: 10;">
        <table>`;

    // Iterate over each key-value pair in params
    for (const [key, value] of Object.entries(params)) {
        // Append a row for each key-value pair
        html += `
            <tr>
                <td>${key}</td>
                <td>${value}</td>
            </tr>`;
    }

    // Close table and div tags
    html += `
        </table>
    </div>`;

    // Return the generated HTML
    return html;
}
