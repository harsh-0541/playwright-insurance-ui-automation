# 🎭 Playwright Insurance UI Automation Framework

> End-to-end test automation framework for insurance domain applications  
> Built with **Playwright + TypeScript** | CI/CD via **GitHub Actions + Jenkins**

---

## 🧱 Framework Architecture
---

## ⚙️ Tech Stack

| Layer | Tool |
|---|---|
| Automation Framework | Playwright |
| Language | TypeScript |
| API Testing | Playwright APIRequestContext |
| Reporting | Allure Reports |
| CI/CD | GitHub Actions + Jenkins |
| Version Control | Git + GitHub |
| Test Management | JIRA |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/playwright-insurance-ui-automation.git

# Navigate to project
cd playwright-insurance-ui-automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run Tests

```bash
# Run all tests
npx playwright test

# Run specific module
npx playwright test tests/policy/

# Run in headed mode (see browser)
npx playwright test --headed

# Run in parallel (4 workers)
npx playwright test --workers=4

# Run specific tag
npx playwright test --grep @smoke
```

### Generate Allure Report

```bash
# Run tests with Allure output
npx playwright test --reporter=allure-playwright

# Generate and open report
allure generate allure-results --clean -o allure-report
allure open allure-report
```

---

## 🔑 Key Framework Features

- ✅ **Page Object Model (POM)** — clean separation of locators and test logic
- ✅ **Parallel Execution** — 40% faster runs with configurable workers
- ✅ **Shadow DOM Handling** — custom utilities for complex UI elements
- ✅ **Network Interception** — mock APIs and validate request/response
- ✅ **API + UI Combined Testing** — end-to-end workflow validation
- ✅ **Database Validation** — SQL queries to verify data integrity post-actions
- ✅ **Allure Reporting** — detailed reports with screenshots and traces
- ✅ **GitHub Actions CI/CD** — automated runs on every push and PR
- ✅ **Cross-browser Testing** — Chromium, Firefox, WebKit
- ✅ **Data-driven Tests** — JSON-based test data management

---

## 🌐 Test Coverage — Insurance Modules

| Module | Coverage |
|---|---|
| Authentication | Login, logout, session management, invalid credentials |
| Policy Management | Create policy, update, renew, cancel |
| Claims Submission | New claim, document upload, status tracking |
| API Validation | Request/response validation, schema checks |
| Database | Post-action data integrity via SQL |

---

---

## 👤 Author

**Parimal Jagtap** — SDET | 4+ Years  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-parimaljagtap-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/parimaljagtap)
## 📊 CI/CD Pipeline
