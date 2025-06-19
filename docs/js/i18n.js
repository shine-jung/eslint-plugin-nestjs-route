// Internationalization (i18n) functionality
const translations = {
  en: {
    // Navigation
    langToggle: "Korean",

    // Hero section
    heroTitle: "ESLint Rules for NestJS Route Management",
    heroSubtitle:
      "Ensure proper route ordering and prevent duplicates in your NestJS controllers.",
    tryPlayground: "Try Playground",
    getStarted: "Get Started",

    // Features
    featuresTitle: "Features",
    featureOrderTitle: "Route Order",
    featureOrderDesc:
      "Ensures static routes are placed before parameterized routes to prevent unexpected routing bugs.",
    featureDuplicateTitle: "No Duplicates",
    featureDuplicateDesc:
      "Prevents duplicate route definitions within the same controller to avoid routing conflicts.",

    // Playground
    playgroundTitle: "Playground",
    playgroundSubtitle:
      "Try the ESLint rules with your NestJS controller code:",
    exampleBtn: [
      "Example 1: Route Order",
      "Example 2: Duplicates",
      "Example 3: Valid",
    ],
    localeLabel: "Language:",
    lintBtnText: "Lint Code",
    resultsTitle: "Results:",

    // Installation
    installationTitle: "Installation",
    installSubtitle: "Install via npm:",
    configSubtitle: "ESLint Configuration:",

    // Rules
    rulesTitle: "Rules",
    orderDesc:
      "Ensures static routes are placed before parameterized routes in NestJS controllers.",
    duplicatesDesc:
      "Prevents duplicate route definitions within the same controller.",
    correctLabel: "✅ Correct:",
    incorrectLabel: "❌ Incorrect:",

    // Footer
    footerDesc: "ESLint rules for NestJS route management",
  },
  ko: {
    // Navigation
    langToggle: "English",

    // Hero section
    heroTitle: "NestJS 라우트 관리를 위한 ESLint 규칙",
    heroSubtitle:
      "NestJS 컨트롤러에서 올바른 라우트 순서를 보장하고 중복을 방지합니다.",
    tryPlayground: "플레이그라운드 체험",
    getStarted: "시작하기",

    // Features
    featuresTitle: "기능",
    featureOrderTitle: "라우트 순서",
    featureOrderDesc:
      "예상치 못한 라우팅 버그를 방지하기 위해 고정 라우트가 파라미터 라우트보다 앞에 위치하도록 보장합니다.",
    featureDuplicateTitle: "중복 방지",
    featureDuplicateDesc:
      "라우팅 충돌을 방지하기 위해 동일한 컨트롤러 내에서 중복된 라우트 정의를 방지합니다.",

    // Playground
    playgroundTitle: "플레이그라운드",
    playgroundSubtitle: "NestJS 컨트롤러 코드로 ESLint 규칙을 테스트해보세요:",
    exampleBtn: ["예제 1: 라우트 순서", "예제 2: 중복", "예제 3: 올바른 예시"],
    localeLabel: "언어:",
    lintBtnText: "코드 검사",
    resultsTitle: "결과:",

    // Installation
    installationTitle: "설치",
    installSubtitle: "npm으로 설치:",
    configSubtitle: "ESLint 설정:",

    // Rules
    rulesTitle: "규칙",
    orderDesc:
      "NestJS 컨트롤러에서 고정 라우트가 파라미터 라우트보다 앞에 위치하도록 보장합니다.",
    duplicatesDesc: "동일한 컨트롤러 내에서 중복된 라우트 정의를 방지합니다.",
    correctLabel: "✅ 올바른 예시:",
    incorrectLabel: "❌ 잘못된 예시:",

    // Footer
    footerDesc: "NestJS 라우트 관리를 위한 ESLint 규칙",
  },
};

let currentLanguage = "en";

// Initialize i18n
document.addEventListener("DOMContentLoaded", function () {
  const langToggle = document.getElementById("langToggle");
  langToggle.addEventListener("click", toggleLanguage);

  // Set initial language based on browser language
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith("ko")) {
    currentLanguage = "ko";
    updateContent();
  }
});

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "ko" : "en";
  updateContent();
}

function updateContent() {
  const t = translations[currentLanguage];

  // Update navigation
  document.getElementById("langToggle").textContent = t.langToggle;

  // Update hero section
  document.getElementById("hero-title").textContent = t.heroTitle;
  document.getElementById("hero-subtitle").textContent = t.heroSubtitle;
  document.getElementById("try-playground").textContent = t.tryPlayground;
  document.getElementById("get-started").textContent = t.getStarted;

  // Update features
  document.getElementById("features-title").textContent = t.featuresTitle;
  document.getElementById("feature-order-title").textContent =
    t.featureOrderTitle;
  document.getElementById("feature-order-desc").textContent =
    t.featureOrderDesc;
  document.getElementById("feature-duplicate-title").textContent =
    t.featureDuplicateTitle;
  document.getElementById("feature-duplicate-desc").textContent =
    t.featureDuplicateDesc;

  // Update playground
  document.getElementById("playground-title").textContent = t.playgroundTitle;
  document.getElementById("playground-subtitle").textContent =
    t.playgroundSubtitle;

  // Update example buttons
  const exampleButtons = document.querySelectorAll(".example-btn");
  exampleButtons.forEach((btn, index) => {
    if (t.exampleBtn[index]) {
      btn.textContent = t.exampleBtn[index];
    }
  });

  document.getElementById("locale-label").textContent = t.localeLabel;
  document.getElementById("lint-btn-text").textContent = t.lintBtnText;

  const resultsTitle = document.getElementById("results-title");
  if (resultsTitle) {
    resultsTitle.textContent = t.resultsTitle;
  }

  // Update installation
  document.getElementById("installation-title").textContent =
    t.installationTitle;
  document.getElementById("install-subtitle").textContent = t.installSubtitle;
  document.getElementById("config-subtitle").textContent = t.configSubtitle;

  // Update rules
  document.getElementById("rules-title").textContent = t.rulesTitle;
  document.getElementById("order-desc").textContent = t.orderDesc;
  document.getElementById("duplicates-desc").textContent = t.duplicatesDesc;
  document.getElementById("correct-label").textContent = t.correctLabel;
  document.getElementById("incorrect-label").textContent = t.incorrectLabel;
  document.getElementById("correct-label2").textContent = t.correctLabel;
  document.getElementById("incorrect-label2").textContent = t.incorrectLabel;

  // Update footer
  document.getElementById("footer-desc").textContent = t.footerDesc;

  // Update HTML lang attribute
  document.documentElement.lang = currentLanguage;
}
