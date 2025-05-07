// scripts/teachable-machine-setup.ts
import * as fs from "fs";
import * as path from "path";
import fetch from "node-fetch";

/**
 * This script helps you prepare your Teachable Machine model for use in the Next.js application.
 * Run this after exporting your model from Teachable Machine.
 */

// Configuration
const MODEL_URL = "YOUR_TEACHABLE_MACHINE_MODEL_URL";
const OUTPUT_DIR = path.join(
  process.cwd(),
  "public/models/filler-detection-model"
);

async function downloadModel() {
  console.log("Downloading Teachable Machine model files...");

  try {
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Files to download from Teachable Machine export
    const filesToDownload = [
      { name: "model.json", url: `${MODEL_URL}/model.json` },
      { name: "metadata.json", url: `${MODEL_URL}/metadata.json` },
      // Note: There will be weight files with names like 'group1-shard1of1.bin'
      // We'll extract these from the model.json
    ];

    // Download main files
    for (const file of filesToDownload) {
      console.log(`Downloading ${file.name}...`);
      const response = await fetch(file.url);

      if (!response.ok) {
        throw new Error(
          `Failed to download ${file.name}: ${response.statusText}`
        );
      }

      const content = await response.text();
      fs.writeFileSync(path.join(OUTPUT_DIR, file.name), content);
      console.log(`Downloaded ${file.name}`);

      // If this is the model.json, parse it to find weights files
      if (file.name === "model.json") {
        const modelData = JSON.parse(content);
        const weightFiles = modelData.weightsManifest?.[0]?.paths || [];

        // Download each weight file
        for (const weightFile of weightFiles) {
          console.log(`Downloading weight file: ${weightFile}...`);
          const weightResponse = await fetch(`${MODEL_URL}/${weightFile}`);

          if (!weightResponse.ok) {
            throw new Error(
              `Failed to download ${weightFile}: ${weightResponse.statusText}`
            );
          }

          const buffer = await weightResponse.buffer();
          fs.writeFileSync(path.join(OUTPUT_DIR, weightFile), buffer);
          console.log(`Downloaded ${weightFile}`);
        }
      }
    }

    console.log("Model files downloaded successfully!");
    console.log(`Files saved to: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error("Error downloading model:", error);
  }
}

// Create a custom metadata.json file if you need to modify the class labels
function createCustomMetadata() {
  console.log("Creating custom metadata file...");

  // Example metadata structure - update with your model's actual classes
  const metadata = {
    tfjsVersion: "1.3.1",
    tmVersion: "2.4.6",
    packageVersion: "0.8.4-alpha2",
    packageName: "@teachablemachine/audio",
    timeStamp: new Date().toISOString(),
    userMetadata: {},
    modelName: "filler-word-detection",
    labels: ["background", "umm", "uhh", "like", "you know"],
    classes: ["background", "umm", "uhh", "like", "you know"],
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "metadata.json"),
    JSON.stringify(metadata, null, 2)
  );

  console.log("Custom metadata.json created successfully");
}

// Run the script
async function run() {
  console.log("Teachable Machine model setup script started");

  // Uncomment the function you want to use
  await downloadModel();
  createCustomMetadata();

  console.log("Setup complete!");
}

run().catch(console.error);

// README - HOW TO EXPORT AND USE YOUR TEACHABLE MACHINE MODEL:
/*
1. Create your audio model in Teachable Machine (https://teachablemachine.withgoogle.com/train/audio)
   - Create at least these classes: background, umm, uhh, like, "you know" (or other filler words)
   - Upload sample audio clips for each class or record them directly
   - Train your model thoroughly with varied samples

2. Export your model:
   - Click "Export Model" > "Tensorflow.js" 
   - Choose "Upload my model" to get a shareable link
   - Copy the provided URL (it will look something like "https://teachablemachine.withgoogle.com/models/XXXXXXXXXXXX/")

3. Use this script:
   - Replace YOUR_TEACHABLE_MACHINE_MODEL_URL with your model URL
   - Run the script with "ts-node teachable-machine-setup.ts"
   - This will download all necessary model files to the public/models directory

4. Integration tips:
   - Make sure the class names in the metadata match what your React component expects
   - Test with varied audio samples to ensure detection accuracy
   - You may need to adjust the CONFIDENCE_THRESHOLD in the React component
*/
