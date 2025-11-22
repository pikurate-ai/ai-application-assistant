const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate application content using LLM
 */
async function generateApplication({ newQuestions, previousApplications, pageLimit }) {
  try {
    const systemPrompt = `당신은 지원서 작성 전문가입니다. 
사용자의 기존 지원서 데이터를 분석하여 새로운 지원서 양식에 맞는 최적의 답변을 생성합니다.

핵심 원칙:
1. 각 질문의 의도를 정확히 파악하세요
2. 기존 지원서에서 가장 관련성 높은 내용을 추출하세요
3. 중복된 내용이 들어가지 않도록 하세요
4. 전체 분량 제한(${pageLimit}페이지)을 고려하여 각 항목의 길이를 조절하세요
5. 자연스럽고 일관성 있는 문장으로 다듬으세요
6. 한국어로 작성하세요`;

    const userPrompt = `
## 새로운 지원서 질문 항목들:
${newQuestions}

## 기존 지원서 데이터:
${previousApplications}

## 분량 제한:
${pageLimit}페이지 이내

위 정보를 바탕으로 새로운 지원서에 대한 답변을 생성해주세요.
각 질문에 대해 JSON 형식으로 응답해주세요:

{
  "answers": [
    {
      "question": "질문 내용",
      "answer": "생성된 답변",
      "wordCount": 단어수
    }
  ],
  "totalPages": 예상_페이지수,
  "summary": "전체 내용 요약"
}`;

    console.log('Calling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // 비용 효율적인 모델
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: 'json_object' }
    });

    const responseContent = completion.choices[0].message.content;
    console.log('OpenAI response received');
    
    return JSON.parse(responseContent);

  } catch (error) {
    console.error('LLM Service Error:', error);
    throw new Error(`LLM generation failed: ${error.message}`);
  }
}

module.exports = {
  generateApplication
};
