const express = require('express');
const router = express.Router();
const llmService = require('../services/llm');
const docsService = require('../services/docs');

// POST /api/generate
router.post('/', async (req, res) => {
  try {
    const { newQuestions, previousApplications, pageLimit } = req.body;

    // Validation
    if (!newQuestions || !previousApplications) {
      return res.status(400).json({ 
        error: 'Missing required fields: newQuestions, previousApplications' 
      });
    }

    // Step 1: Generate content using LLM
    console.log('Generating content with LLM...');
    const generatedContent = await llmService.generateApplication({
      newQuestions,
      previousApplications,
      pageLimit: pageLimit || 5
    });

    // Step 2: Return preview (Google Docs creation will be done separately)
    res.json({
      success: true,
      content: generatedContent,
      message: 'Content generated successfully'
    });

  } catch (error) {
    console.error('Error in generate route:', error);
    res.status(500).json({ 
      error: 'Failed to generate application',
      details: error.message 
    });
  }
});

// POST /api/generate/export
router.post('/export', async (req, res) => {
  try {
    const { content, accessToken } = req.body;

    if (!content || !accessToken) {
      return res.status(400).json({ 
        error: 'Missing required fields: content, accessToken' 
      });
    }

    // Create Google Docs
    console.log('Creating Google Docs...');
    const docUrl = await docsService.createDocument(content, accessToken);

    res.json({
      success: true,
      documentUrl: docUrl,
      message: 'Document created successfully'
    });

  } catch (error) {
    console.error('Error in export route:', error);
    res.status(500).json({ 
      error: 'Failed to export to Google Docs',
      details: error.message 
    });
  }
});

module.exports = router;
