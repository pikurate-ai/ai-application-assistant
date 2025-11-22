const { google } = require('googleapis');

/**
 * Create a Google Docs document
 */
async function createDocument(content, accessToken) {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const docs = google.docs({ version: 'v1', auth });
    const drive = google.drive({ version: 'v3', auth });

    // Create new document
    const createResponse = await docs.documents.create({
      requestBody: {
        title: `정부지원과제 신청서 - ${new Date().toLocaleDateString('ko-KR')}`
      }
    });

    const documentId = createResponse.data.documentId;
    console.log(`Document created: ${documentId}`);

    // Build requests to insert content
    const requests = [];
    let index = 1; // Start after title

    content.answers.forEach((item, i) => {
      // Insert question as heading
      requests.push({
        insertText: {
          location: { index },
          text: `${i + 1}. ${item.question}\n`
        }
      });
      index += `${i + 1}. ${item.question}\n`.length;

      // Insert answer
      requests.push({
        insertText: {
          location: { index },
          text: `${item.answer}\n\n`
        }
      });
      index += `${item.answer}\n\n`.length;
    });

    // Update document with content
    if (requests.length > 0) {
      await docs.documents.batchUpdate({
        documentId,
        requestBody: { requests }
      });
    }

    // Get document URL
    const docUrl = `https://docs.google.com/document/d/${documentId}/edit`;
    console.log(`Document URL: ${docUrl}`);

    return docUrl;

  } catch (error) {
    console.error('Google Docs Service Error:', error);
    throw new Error(`Failed to create Google Docs: ${error.message}`);
  }
}

module.exports = {
  createDocument
};
