import fs from "fs";
import axios from "axios"



// Function to download a file using axios
async function downloadFile(url, outputPath) {
  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}

// Usage example
const fileUrl = 'https://0x0.st/XzK_.pdf';
const outputFilePath = 'downloaded_file.pdf';


export { downloadFile };

