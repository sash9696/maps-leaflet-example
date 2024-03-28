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
const filteredDataArray = []; // Array to store filtered data objects

for (const data of transformedData) {
    const filteredData = {}; // Object to store filtered data for each iteration
    for (const key of keysToDisplay) {
        if (data.hasOwnProperty(key)) {
            filteredData[key] = data[key];
        }
    }
    filteredDataArray.push(filteredData); // Push the filtered data object into the array
}

console.log('filteredDataArray',filteredDataArray); // Output the array of filtered data objects


// Loop through each row in chartData starting from index 1 (skipping the header)
const newChartData = chartData.map((data, index) => {
    if (index === 0) {
      // For the header row, add the header for the new column
      return [...data, { type: "string", role: "tooltip", p: { html: true } }];
    } else {
      // For data rows, add the corresponding value from valuesToAdd
    
      return [...data, createCustomTooltipHtml(filteredDataArray[index - 1])];
    }
  });

console.log(newChartData);
function createCustomTooltipHtml(params) {
    console.log('params',params)
    if(!params) return;
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