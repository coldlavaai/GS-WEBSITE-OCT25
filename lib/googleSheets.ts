import { google } from 'googleapis';

// Google Sheets configuration
const SPREADSHEET_ID = '1uKmU_phI7b6TArPSW7Ks5PV-snggG5KDy5QumIcuRdk';
const SHEET_NAME = 'Sheet1'; // Changed to match actual tab name

/**
 * Append a row to the Google Sheet
 */
export async function appendLeadToSheet(data: {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  postcode: string;
  time_of_request: string;
  notes: string;
}) {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.warn('Google Sheets credentials not configured. Skipping lead submission.');
      return { success: false, error: 'Credentials not configured' };
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const rowData = [
      data.first_name,
      data.last_name,
      data.mobile,
      data.email,
      data.postcode,
      data.time_of_request,
      data.notes,
      'Sophie Web Chat',
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:H`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [rowData] },
    });

    console.log('Lead saved to Google Sheets:', response.data.updates?.updatedRows);
    return { success: true };
  } catch (error) {
    console.error('Error saving lead to Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function appendToSheet(data: {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  message: string;
}) {
  try {
    // Check if credentials are configured
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.warn('⚠️ Google Sheets credentials not configured. Skipping Google Sheets submission.');
      return { success: false, error: 'Credentials not configured' };
    }

    // Create auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Split name into first and last
    const nameParts = data.name.trim().split(' ');
    const firstName = nameParts[0] || data.name;
    const lastName = nameParts.slice(1).join(' ') || '';

    // Format timestamp (UK format: DD/MM/YYYY HH:mm)
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '');

    // Prepare row data
    // Column order matches Google Sheet: First Name, Last Name, Mobile, Email, Postcode, Time of Request, Notes, Source
    const rowData = [
      firstName,           // A: First Name
      lastName,            // B: Last Name
      data.phone,          // C: Mobile
      data.email,          // D: Email
      data.postcode,       // E: Postcode
      timestamp,           // F: Time of request
      data.message || '',  // G: Notes
      'Website Contact Form', // H: Source
    ];

    // Append the row
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:H`, // Adjust range based on your columns
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('✅ Successfully added row to Google Sheets:', response.data.updates?.updatedRows);
    return { success: true, response: response.data };

  } catch (error) {
    console.error('❌ Error appending to Google Sheets:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
