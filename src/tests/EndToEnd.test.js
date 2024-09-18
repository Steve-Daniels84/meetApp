import puppeteer from "puppeteer";

describe('show/hide an event details', () => {

    test('An event element is collapsed by default', async () => {
        jest.setTimeout(30000);
        const browser = await puppeteer.launch({
            headless: true // Make sure to set this to false for a visible browser window
          });
    
        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');
    
        await page.waitForSelector('#event');
    
        const eventDetails = await page.$('#event .details');
        expect(eventDetails).toBeNull();
        browser.close();
      });

});