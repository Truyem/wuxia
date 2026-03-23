
import { DEFAULT_TEXT_GEN_WORKER_URLS, DEFAULT_IMAGE_GEN_WORKER_URLS } from '../utils/apiConfig';

console.log("--- Verifying Environment Redesign ---");
console.log("Text Gen Worker URLs Count:", DEFAULT_TEXT_GEN_WORKER_URLS.length);
console.log("Image Gen Worker URLs Count:", DEFAULT_IMAGE_GEN_WORKER_URLS.length);

if (DEFAULT_TEXT_GEN_WORKER_URLS.length > 100 && DEFAULT_IMAGE_GEN_WORKER_URLS.length > 100) {
    console.log("Success: URLs are correctly loaded from workerUrls.ts!");
} else {
    console.error("Failure: URLs were not loaded correctly.");
    process.exit(1);
}
