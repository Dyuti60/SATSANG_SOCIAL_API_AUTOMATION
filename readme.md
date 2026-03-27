# 🚀 Social Media API Automation Framework

A scalable, enterprise-grade API automation framework built using **Axios + Jest + Zod + Allure Reporting**.

This framework is designed for:

* ✅ Functional API testing
* ✅ Negative testing
* ✅ Schema validation
* ✅ Bulk data creation
* ✅ Clean and maintainable architecture

---

# 📂 Project Structure

```
├── allure-report/
├── allure-results/
├── logs
│   └── app.log
│   └── error.log
│  
├── node_modules
├── src/
│   ├── api/
│   │   ├── api.client.ts
│   │   ├── api.service.ts
│   │   ├── request.builder.ts
│   │   └── response.validator.ts
│   │
│   ├── context/
│   │   └── test.context.ts
│   │
│   ├── db/
│   │   └── client/
│   │          └── pg.social.client.ts
│   │          └── pg.sso.client.ts
│   │   └── repo/
│   │          └── repo.ts
│   │
│   ├── endpoints/
│   │   └── endpoints.ts
│   │
│   ├── helper/
│   │   └── auth
│   │   └── env
│   │   └── types
│   │
│   ├── hooks/
│   │   └── jest.hooks.ts
│   │ 
│   ├── services/
│   │   └── login.service.ts
│   │   └── registration.service.ts
│   │   └── service.container.ts
│   │   └── user.services.ts
│   │
│   ├── setup/
│   │   └── globalSetup.ts
│   │   └── globalTeardown.ts
│   │
│   ├── testdata/
│   │       ├── factory/
│   │               └── registration.factory.ts
│   │       ├── invalid/
│   │               └── registration.invalid.data.ts
│   │ 
│   ├── utils/
│   │   └── allure.ts
│   │   └── data.generator.ts
│   │   └── logger.ts
│   │   └── pincode.map.ts
│   │
│   ├── workflow/
│   │   └── registration.flow.ts
│   │   └── login.api.flow.ts
│   │   └── flow.container.ts
│   │
│   │
├── tests/
│   ├── auth/
│   │   └── login.api.spec.ts
│   ├── bulkData/
│   │   └── 01_bulk.registration.spec.ts
│   ├── user/
│   │   └── 01_send.request.spec.ts
│
├── .env
├── .env.example
├── jest.config.ts
├── package-lock.json
├── package.json
└── README.md
└── tsconfig.json
```

---

# 🧱 Architecture Overview

### 🔹 1. Factory Layer

Generates test data (valid + invalid)

```ts
RegistrationFactory.registerPayload(overrides)
```

---

### 🔹 2. Service Layer

Handles API calls using Axios

```ts
registrationService.registerUser(payload)
```

---

### 🔹 3. Flow Layer

Manages business workflows

```ts
registrationFlow.registerUserFlow()
```

---

### 🔹 4. Validator Layer

Centralized response validation using:

* Jest assertions
* Zod schemas
* Allure logging

```ts
ResponseValidator.validateSuccess(response, {...})
```

---

# 🧪 Features

## ✅ Positive Testing

* Validate status, message, and response structure

## ❌ Negative Testing

* Invalid payloads
* Missing fields
* Wrong data types

## 🔍 Schema Validation (Zod)

* Strong contract validation
* Type-safe responses

## 📊 Allure Reporting

* Step-by-step logs
* Expected vs actual values
* Full response attachments

## 🔁 Bulk Testing

* Data-driven test execution
* Multiple payload scenarios

---

# ⚙️ Setup

## 1️⃣ Install Dependencies

```bash
npm install
```

---

## 2️⃣ Run Tests

```bash
npm test
npm test:login
npm test:register
npm test:bulk-register

```

---

## 3️⃣ Run Specific Test

```bash
npx jest tests/auth/registration.api.spec.ts
```

---

## 4️⃣ Run Bulk Tests

```bash
npm run test:bulk-register
```

---

# 📊 Allure Report

## Generate Report

```bash
npm run allure:generate
```

## Open Report

```bash
npm run allure:open
```

---

# 🧠 Validation Methods

## ✅ Success Validation

```ts
ResponseValidator.validateSuccess(response, {
  httpStatus: 201,
  statusCode: 200,
  message: "Successfully registered"
});
```

---

## ❌ Error Validation

```ts
ResponseValidator.validateError(response, {
  status: 401,
  error: true,
  message: "Your session has been deactivated"
});
```

---

## 🔍 Schema Validation

```ts
ResponseValidator.validateSchema(response, schema, {
  status: 200,
  pick: 'data'
});
```

---

## 🔹 Field Validation

```ts
ResponseValidator.validateValue(response, 'data.userDetails.username', 'Zena');
```

---

## 🔹 Full Response Validation

```ts
ResponseValidator.validateFullResponse(response, expectedJson);
```

---

# 🧩 Best Practices

* ✅ Keep services thin (no validation logic)
* ✅ Use factories for test data
* ✅ Use flows for business logic
* ✅ Use validators for assertions
* ✅ Use Zod for schema validation
* ✅ Use Allure for reporting

---

# ⚠️ Important Notes

## Axios Config

Ensure this is set to handle error responses:

```ts
axios.create({
  validateStatus: () => true
});
```

---

## Path Format (Windows)

Always use:

```bash
tests/bulkData/file.spec.ts
```

❌ Avoid:

```
tests\\bulkData\\file.spec.ts
```

---

# 🚀 Future Enhancements

* 🔄 Request logging (headers + payload)
* 🔐 Sensitive data masking
* 📦 Schema registry per API
* ⚡ Parallel execution optimization
* 📊 Advanced reporting & analytics

---
## 🚀 Git Workflow for Automation Project

### 🌳 Branch Strategy

* `main` → Stable branch (production-ready test suite)
* `automation` → Integration branch (latest combined work)
* `automation/<feature>` → Feature branches (individual tester work)

---

## 👨‍💻 Tester Workflow (Independent Branching)

Each tester works on their own feature branch to avoid conflicts.

### 🔹 Step 1: Sync with Integration Branch

```bash
git checkout automation
git pull origin automation
```

---

### 🔹 Step 2: Create Your Feature Branch

```bash
git checkout -b automation/<feature-name>
```

**Examples:**

* automation/login-api-tests
* automation/socket-validation
* automation/regression-suite

---

### 🔹 Step 3: Work on Your Changes

* Add API tests (Axios)
* Add flows (login.flow.ts, etc.)
* Update services
* Add test data / fixtures

---

### 🔹 Step 4: Commit Changes

```bash
git add .
git commit -m "Add login API positive and negative scenarios"
```

---

### 🔹 Step 5: Push Your Branch

```bash
git push -u origin automation/<feature-name>
```

---

### 🔹 Step 6: Create Pull Request (PR)

* Base branch → `automation`
* Compare → `automation/<feature-name>`

---

## 🔄 Keeping Your Branch Updated (Important)

If other testers have merged changes into `automation`, your branch may become outdated.

### ✅ Recommended Approach (Rebase Workflow)

#### Step 1: Fetch latest changes

```bash
git fetch origin
```

---

#### Step 2: Stash local changes (if any)

```bash
git stash
```

---

#### Step 3: Rebase your branch onto latest automation

```bash
git checkout automation/<feature-name>
git rebase origin/automation
```

---

#### Step 4: Resolve conflicts (if any)

```bash
git status
```

* Fix conflicts manually
* Then:

```bash
git add .
git rebase --continue
```

---

#### Step 5: Restore stashed changes

```bash
git stash pop
```

---

#### Step 6: Push updated branch

```bash
git push --force-with-lease
```

---

### ⚡ Shortcut (Recommended)

```bash
git rebase origin/automation --autostash
```

---

## 🧪 Integration Phase (`automation` branch)

Once PR is merged into `automation`:

* Run full regression suite
* Validate:

  * API flows
  * Socket workflows
  * Hooks & services
* Fix integration issues if any

---

## 🚀 Release to Stable (`main` branch)

When `automation` is stable:

* Create PR:

  * Base → `main`
  * Compare → `automation`

---

## ⚠️ Hotfix Workflow

If issue found in `main`:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/<issue-name>
```

* Fix issue
* PR → `main`
* Also merge into `automation`

---

## 🔄 Sync `main` Back to `automation`

```bash
git checkout automation
git merge main
git push
```

---

## 🏷 Tagging Releases

```bash
git checkout main
git tag -a v1.0 -m "Stable automation suite"
git push origin v1.0
```

---

## ✅ Best Practices

* One feature = one branch
* Keep commits small and meaningful
* Always sync with `automation` before PR
* Avoid hardcoded data
* Do not commit `.env` files
* Ensure tests are independent
* Keep `main` always stable

---

## ❌ Avoid

* Working directly on `automation`
* Using `git pull` (creates unnecessary merge commits)
* Force pushing without `--force-with-lease`
* Large, unreviewable PRs

---

## 🔥 Summary Workflow

```text
automation/<feature> → automation → main
       (dev)         (integration)   (stable)
```

---


# 👨‍💻 Author

Built with a focus on **scalability, maintainability, and real-world API testing needs**.

---

# ⭐ Final Thoughts

This framework follows **industry best practices** and is designed to grow with your testing needs.

> Clean architecture + strong validation = reliable automation 🔥
