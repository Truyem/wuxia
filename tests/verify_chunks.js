
// Mocking the environment for testing the logic
const parseWorkerUrls = (urlInput) => {
    if (!urlInput) return [];
    const urls = Array.isArray(urlInput)
        ? urlInput.map(u => String(u).trim())
        : String(urlInput).split(',').map(u => u.trim());

    return urls
        .filter(Boolean)
        .map(u => u.endsWith('/') ? u.slice(0, -1) : u);
};

const getChunkedEnvVarsMock = (baseName, mockEnv) => {
    const results = [];
    let i = 1;
    while (true) {
        const value = mockEnv[`${baseName}_${i}`];
        if (!value) break;
        results.push(...parseWorkerUrls(value));
        i++;
    }
    if (results.length === 0) {
        const fallback = mockEnv[baseName];
        if (fallback) return parseWorkerUrls(fallback);
    }
    return results;
};

// Test Cases
const mockEnv = {
    VITE_TEXT_GEN_WORKER_URLS_1: "url1.com, url2.com",
    VITE_TEXT_GEN_WORKER_URLS_2: "url3.com",
    VITE_IMAGE_GEN_WORKER_URLS_1: "img1.com",
    VITE_OTHER_VAR: "fallback.com"
};

console.log("Testing Text Gen Chunks:");
const textGenChunks = getChunkedEnvVarsMock('VITE_TEXT_GEN_WORKER_URLS', mockEnv);
console.log(textGenChunks);
if (textGenChunks.length === 3 && textGenChunks.includes("url1.com") && textGenChunks.includes("url3.com")) {
    console.log("✅ Text Gen Chunks OK");
} else {
    console.error("❌ Text Gen Chunks Failed");
    process.exit(1);
}

console.log("\nTesting Image Gen Chunks:");
const imgGenChunks = getChunkedEnvVarsMock('VITE_IMAGE_GEN_WORKER_URLS', mockEnv);
console.log(imgGenChunks);
if (imgGenChunks.length === 1 && imgGenChunks[0] === "img1.com") {
    console.log("✅ Image Gen Chunks OK");
} else {
    console.error("❌ Image Gen Chunks Failed");
    process.exit(1);
}

console.log("\nTesting Fallback:");
const fallback = getChunkedEnvVarsMock('VITE_OTHER_VAR', mockEnv);
console.log(fallback);
if (fallback.length === 1 && fallback[0] === "fallback.com") {
    console.log("✅ Fallback OK");
} else {
    console.error("❌ Fallback Failed");
    process.exit(1);
}

console.log("\nAll logic tests passed!");
