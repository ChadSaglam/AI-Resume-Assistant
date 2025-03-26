import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      // Set viewport and user agent to mimic a regular browser
      await page.setViewport({ width: 1280, height: 800 });
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      // Navigate to the page and wait for content to load
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait for key elements to load (based on your selectors)
      await Promise.race([
        page.waitForSelector('[data-cy="vacancy-title"]', { timeout: 5000 }).catch(() => null),
        page.waitForSelector('[data-cy="company-link"]', { timeout: 5000 }).catch(() => null),
      ]);
      
      // Add a small delay to ensure dynamic content is loaded
      await new Promise(r => setTimeout(r, 2000));
      
      // Get the page content
      const content = await page.content();
      
      // Parse HTML with Cheerio
      const $ = cheerio.load(content);
      
      // Extract data using the provided selectors
      const jobTitle = $('[data-cy="vacancy-title"]').text().trim();
      
      const companyName = $('[data-cy="company-link"] span').text().trim();
      
      // For address, extract the text but remove the icon
      const companyAddressRaw = $('[data-cy="info-location-link"]').clone();
      companyAddressRaw.find('span.icon').remove();
      const companyAddress = companyAddressRaw.text().trim();
      
      // For job description, get the HTML content
      const jobDescriptionHtml = $('[data-cy="vacancy-description"]').html() || '';
      
      // Clean up the HTML and convert to plain text (preserving structure)
      const jobDescription = jobDescriptionHtml
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<li[^>]*>/gi, '• ')
        .replace(/<\/li>/gi, '\n')
        .replace(/<h2[^>]*>/gi, '\n\n')
        .replace(/<\/h2>/gi, ':\n')
        .replace(/<span[^>]*>|<\/span>/gi, '')
        .replace(/<[^>]*>/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .replace(/&nbsp;/g, ' ')
        .trim();
      
      // Extract hiring manager info
      const hiringManagerName = $('[data-cy="vacancy-contact-name"]').text().trim();
      const hiringManagerRole = $('[data-cy="vacancy-contact-role"]').text().trim();
      const hiringManagerPhone = $('[data-cy="vacancy-contact-link"]').text().trim();
      
      const hiringManager = {
        name: hiringManagerName,
        role: hiringManagerRole,
        phone: hiringManagerPhone,
      };
      
      await browser.close();
      
      // Return the extracted data
      return NextResponse.json({
        jobTitle,
        companyName,
        companyAddress,
        jobDescription,
        hiringManager,
        success: true
      });
      
    } catch (error) {
      await browser.close();
      throw error;
    }
    
  } catch (error) {
    console.error("Error scraping job data:", error);
    return NextResponse.json(
      { error: `Failed to scrape job data: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}