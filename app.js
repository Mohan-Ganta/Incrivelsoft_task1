const fs = require('fs').promises;
const EventEmitter = require('events');

// Create an instance of EventEmitter
const eventEmitter = new EventEmitter();

// Function to read data from a JSON file
function readData() {
  return fs.readFile('config.json').then(data => JSON.parse(data).data);
}


// Event listener for the 'dataReceived' event
eventEmitter.on('dataReceived', (data) => {
  console.log('Data received:', data);
});

// Event listener for the 'error' event
eventEmitter.on('error', (error) => {
  console.error('Error:', error.message);
});

// Main function that initiates the process
async function main() {
  try {
    console.log('Reading data...');
    // Using async/await to handle promises
    const data = await readData();
    console.log('Data read successfully.');

    // Emitting the 'dataReceived' event
    eventEmitter.emit('dataReceived', data);
  } catch (error) {
    console.error('Error:', error.message);
    // Emitting the 'error' event
    eventEmitter.emit('error', error);
  }
}

// Calling the main function
main();
