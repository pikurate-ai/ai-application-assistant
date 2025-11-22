import { useState } from 'react'
import './App.css'

function App() {
  const [newQuestions, setNewQuestions] = useState('')
  const [previousApplications, setPreviousApplications] = useState('')
  const [pageLimit, setPageLimit] = useState(5)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newQuestions,
          previousApplications,
          pageLimit: parseInt(pageLimit)
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '생성 실패')
      }

      setResult(data.content)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleExportToDocs = async () => {
    alert('Google Docs 내보내기는 Google OAuth 설정 후 사용 가능합니다.')
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🤖 AI 지원서 자동 작성 도우미</h1>
        <p>기존 지원서를 기반으로 새로운 지원서를 자동으로 생성합니다</p>
      </header>

      <main className="main">
        <div className="input-section">
          <div className="form-group">
            <label htmlFor="newQuestions">
              📝 새로운 지원서 질문 항목
              <span className="required">*</span>
            </label>
            <textarea
              id="newQuestions"
              value={newQuestions}
              onChange={(e) => setNewQuestions(e.target.value)}
              placeholder="예시:&#10;1. 지원 동기를 작성해주세요&#10;2. 본인의 강점을 설명해주세요&#10;3. 입사 후 포부를 작성해주세요"
              rows="8"
            />
          </div>

          <div className="form-group">
            <label htmlFor="previousApplications">
              📄 기존 지원서 데이터
              <span className="required">*</span>
            </label>
            <textarea
              id="previousApplications"
              value={previousApplications}
              onChange={(e) => setPreviousApplications(e.target.value)}
              placeholder="기존에 작성했던 지원서 내용을 여기에 붙여넣으세요.&#10;여러 개의 지원서를 한 번에 입력할 수 있습니다."
              rows="12"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pageLimit">
              📏 전체 분량 제한 (페이지)
            </label>
            <input
              type="number"
              id="pageLimit"
              value={pageLimit}
              onChange={(e) => setPageLimit(e.target.value)}
              min="1"
              max="20"
            />
          </div>

          <button 
            className="generate-btn"
            onClick={handleGenerate}
            disabled={loading || !newQuestions || !previousApplications}
          >
            {loading ? '생성 중...' : '✨ 지원서 생성하기'}
          </button>
        </div>

        {error && (
          <div className="error-box">
            <strong>❌ 오류 발생:</strong> {error}
          </div>
        )}

        {result && (
          <div className="result-section">
            <div className="result-header">
              <h2>📋 생성 결과</h2>
              <button 
                className="export-btn"
                onClick={handleExportToDocs}
              >
                📤 Google Docs로 내보내기
              </button>
            </div>

            <div className="result-summary">
              <p><strong>예상 페이지:</strong> {result.totalPages}페이지</p>
              <p><strong>요약:</strong> {result.summary}</p>
            </div>

            <div className="answers">
              {result.answers?.map((item, index) => (
                <div key={index} className="answer-item">
                  <h3>{index + 1}. {item.question}</h3>
                  <p className="answer-text">{item.answer}</p>
                  <span className="word-count">({item.wordCount} 단어)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Made with ❤️ using OpenAI GPT & Google Docs API</p>
      </footer>
    </div>
  )
}

export default App
