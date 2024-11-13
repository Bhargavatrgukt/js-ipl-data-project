const fs = require('fs');




// Function to convert CSV to a list of objects using fs.readFile()
function convertCsvToListOfObjects(csvFilePath) {
  try {
    // Read the CSV file synchronously
    const data = fs.readFileSync(csvFilePath, 'utf8');

    // Split the file content into rows
    const rows = data.split('\n');
    
    // Extract the headers (first row)
    const headers = rows[0].split(',').map(header => header.trim());

    // Parse the remaining rows and convert them into objects
    const result = rows.slice(1).map(row => {
      const values = row.split(',').map(value => value.trim());
      let obj = {};

      // Create an object for each row
      headers.forEach((header, index) => {
        obj[header] = values[index] || ''; // Assign value to object key
      });

      return obj;
    });
   

    // Filter out any empty rows (if any)
    const filteredResult = result.filter(row => Object.keys(row).length > 0);

    return filteredResult;
  } catch (err) {
    console.error('Error reading the file:', err);
  }
}




module.exports=convertCsvToListOfObjects;


