const puppeteer = require('puppeteer');
const path = require('path');

async function runProfiling() {
    const browser = await puppeteer.launch({
        args: ['--remote-debugging-port=9222'], // Enable debugging port
        headless: false
    });

    const page = await browser.newPage();

    // Loading app
    const filePath = path.join(__dirname, 'index.html');
    const fileUrl = `file://${filePath}`;
    await page.goto(fileUrl);

    // Start profiling
    await page.tracing.start({ path: 'profiling/profile.json' });

    // Place to perform some actions on web

    // Stop profiling
    await page.tracing.stop();

    // Close the browser
    await browser.close();
}

runProfiling();
