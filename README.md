# AI 기반 지원서 자동 작성 도우미 (AI Application Assistant)

## 프로젝트 개요
사용자가 새로운 지원서 양식과 기존 지원서 데이터를 입력하면, LLM을 활용하여 새 양식에 맞춘 최적의 답변을 자동 생성하고 Google Docs로 출력하는 웹 서비스 MVP

## 핵심 기능
- 새로운 지원서 질문 항목 및 분량 제한 입력
- 기존 지원서 텍스트 데이터 입력
- LLM 기반 질문 의도 파악 및 내용 생성
- 중복 방지 및 분량 자동 조절
- Google Docs 문서로 결과 출력

## 기술 스택 (무료 티어 기반)

### 프론트엔드
- **Framework**: React (Vite)
- **호스팅**: GitHub Pages
- **UI**: Tailwind CSS 또는 Material-UI

### 백엔드
- **Runtime**: Node.js (Express.js)
- **호스팅**: Google Cloud Run (무료 티어: 월 200만 요청, 360,000 GB-초)
- **대안**: Vercel Functions (무료 티어: 월 100GB-시간)

### 데이터베이스
- **옵션 1**: Firebase Firestore (무료 티어: 1GB 저장공간, 50K 읽기/20K 쓰기 일일)
- **옵션 2**: MongoDB Atlas (무료 티어: 512MB)
- **MVP용**: 로컬 스토리지 + 세션 기반 (DB 없이 시작)

### API & 통합
- **LLM**: OpenAI GPT API (종량제)
- **문서 생성**: Google Docs API (무료)
- **인증**: Google OAuth 2.0

### 배포 & CI/CD
- **코드 저장소**: GitHub
- **CI/CD**: GitHub Actions (무료 티어: 월 2,000분)
- **환경 변수 관리**: GitHub Secrets

## 아키텍처

```
[사용자 브라우저]
    ↓
[React 프론트엔드 - GitHub Pages]
    ↓ (API 호출)
[백엔드 API - Cloud Run/Vercel]
    ↓
    ├─→ [OpenAI GPT API] (내용 생성)
    ├─→ [Google Docs API] (문서 생성)
    └─→ [Firestore] (선택: 히스토리 저장)
```

## 프로젝트 구조

```
ai-application-assistant/
├── frontend/              # React 프론트엔드
│   ├── src/
│   │   ├── components/   # UI 컴포넌트
│   │   ├── services/     # API 호출 로직
│   │   └── App.jsx
│   └── package.json
├── backend/              # Node.js 백엔드
│   ├── src/
│   │   ├── routes/       # API 라우트
│   │   ├── services/     # 비즈니스 로직
│   │   │   ├── llm.js    # OpenAI 연동
│   │   │   └── docs.js   # Google Docs 연동
│   │   └── server.js
│   └── package.json
├── docs/                 # 문서
│   ├── PRD.md           # 제품 요구사항 문서
│   ├── API.md           # API 명세
│   └── ARCHITECTURE.md  # 상세 아키텍처
└── README.md
```

## 개발 로드맵

### Phase 1: 환경 설정 ✅
- [x] GitHub 레포지토리 생성
- [x] 프로젝트 구조 생성
- [ ] Google Cloud Project 설정
- [ ] Google Docs API 활성화
- [x] OpenAI API 키 발급

### Phase 2: 백엔드 개발 ✅
- [x] Express 서버 기본 구조
- [x] OpenAI API 연동
- [x] Google Docs API 연동 (기본 구조)
- [x] 프롬프트 엔지니어링 (의도 파악, 내용 생성, 분량 조절)

### Phase 3: 프론트엔드 개발 ✅
- [x] React 앱 기본 구조
- [x] 입력 폼 UI (지원서 양식, 기존 데이터)
- [x] 결과 표시 UI
- [ ] Google OAuth 로그인 (Phase 4로 이동)

### Phase 4: 통합 & 배포
- [ ] 프론트엔드-백엔드 연동
- [ ] GitHub Pages 배포 설정
- [ ] Cloud Run 배포 설정
- [ ] CI/CD 파이프라인 구성

### Phase 5: 테스트 & 최적화
- [ ] 기능 테스트
- [ ] 비용 최적화
- [ ] 사용자 피드백 반영

## 시작하기

### 필수 준비사항
1. Google Cloud Platform 계정
2. OpenAI API 계정
3. GitHub 계정
4. Node.js 18+ 설치

### 초기 설정 명령어
```bash
# 프로젝트 구조 생성
npm init -y

# 프론트엔드 생성
npm create vite@latest frontend -- --template react
cd frontend && npm install && cd ..

# 백엔드 생성
mkdir -p backend/src/{routes,services}
cd backend && npm init -y
npm install express cors dotenv openai googleapis
npm install -D nodemon
cd ..

# 문서 폴더 생성
mkdir -p docs
```

## 환경 변수
```env
# .env.example
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=your_redirect_uri
PORT=3000
```

## 라이선스
MIT

## 현재 진행 상황

**백엔드:** ✅ 완료 및 실행 중 (http://localhost:3000)  
**프론트엔드:** ✅ 완료 및 실행 중 (http://localhost:5173)  
**Google Docs 연동:** ⚠️ OAuth 설정 필요

## 빠른 시작

### 1. 백엔드 실행
```bash
cd backend
npm run dev
```

### 2. 프론트엔드 실행
```bash
cd frontend
npm run dev
```

### 3. 브라우저 접속
http://localhost:5173

## 작성 일시
- 생성: 2025-11-22
- 최종 업데이트: 2025-11-22
- MVP 코어 기능 완료: 2025-11-22
