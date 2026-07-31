# AI Advisor personalisation upgrade plan

## Current architecture and diagnosis

The platform uses Next.js 14/React 18 with Tailwind and `react-hot-toast`, backed by Laravel 11, Sanctum, Eloquent, PostgreSQL, and Gemini. `AIBeautyAdvisorWrapper` owns the launcher and a guarded 1,000 ms homepage-only auto-open. `AIBeautyAdvisorModal` owns chat, voice transcription, New Chat, Clear Chat, Show Matches, and the current two-step skincare shortcut. Laravel stores conversations, messages, profile JSON, and authenticated saved plans. `BeautyAdvisorService` retrieves active database products and validates returned IDs.

The screenshot's unavailable message is emitted only when conversation bootstrap fails. It is therefore caused by failure of `POST /api/beauty-advisor/conversations` (most commonly an unreachable/misconfigured API base URL, CORS/backend/database failure, or missing guest ID), not directly by a Gemini response. A second confirmed configuration defect is that missing keys, provider errors, disabled AI, and unknown providers silently use the mock provider. This hides provider failures and violates `AI_BEAUTY_ADVISOR_MOCK_MODE=false`; the upgrade will make mock mode explicit and return a safe retryable provider error.

## Reused components

- Existing launcher, modal dialog/focus trap, composer, voice typing, New/Clear Chat confirmations, product card/routine, API client, authentication context, cart/wishlist integrations, toast system, Product model/scopes, and advisor tables.
- Existing homepage mount guard and 1,000 ms delay.
- Existing Product/category/image/supplier/beauty-profile relations and database-grounding boundary.

## New focused components and services

- Central `beautyAdvisorTranslations` catalogue for English, Sinhala, and Tamil.
- `AIAdvisorLanguageSelector`, progressive consultation flow/progress, question cards, profile review, plan preview/actions, unavailable/retry state, and saved-plan history.
- Laravel questionnaire/profile validation, plan generation/download, response validation, and explicit provider-unavailable handling, kept behind the existing controller/service boundary.

## Data changes

Extend conversations with language, stage, and prompt version. Extend saved plans with language, plan/profile snapshots, product ID snapshots, estimated total/currency, version/status/generated date. Continue using JSON for the sparse category-specific profile. Sensitive answers remain optional and are omitted unless `consentToSaveSensitiveAnswers` is true. Add focused plan-product rows only if reporting/query needs justify denormalisation.

## API changes

Retain current conversation/message/profile endpoints. Add plan generation, authenticated plan CRUD/download, recommendation refresh, and feedback endpoints under `/api/beauty-advisor`, all with ownership validation and throttling. Guest progress continues to be authorized by the UUID header; authenticated plans are always constrained by `user_id`.

## Questionnaire workflow

Ask one relevant question at a time: goal; category-specific type; concerns; routine/look/occasion; optional sensitivities; budget; preferences; environment where relevant; review. Back, optional Skip, edit, save/finish later, and free text remain available. Skincare branches into skin type, concerns, routine level/preference, budget, preferences and optional sensitivities. Hair, makeup, fragrance, and gifts use only their relevant branches.

## Language strategy

`en`, `si`, and `ta` are validated server-side. The manual selector is authoritative, persisted in conversation profile and locally for guest continuity, and drives UI, speech-recognition locale, questionnaire, errors, and plan output. Product/brand/ingredient names, identifiers, URLs, and prices remain source values. Sinhala/Tamil copy requires human review before production. UTF-8 JSON/PostgreSQL and Unicode-capable system fonts are used; print HTML is the no-heavy-dependency download fallback.

## Product grounding

Query only active products in active categories, prefer active sellers and available stock where reliable, apply category/profile/budget filters, cap candidates, and send only those candidates to Gemini. Require IDs, intersect returned IDs with the candidate set, then reload all display price/stock/image data from the database. An empty match is reported honestly; no fallback may fabricate a product.

## Beauty plan, save, and download

Plans contain title, goal/profile summary, morning/evening/weekly ordered steps, instructions/reasons, real product IDs, alternatives, budget snapshot, safety notes, generated date, language, prompt version, and plan version. Guests retain draft profile/plan locally and are invited to authenticate. Authenticated customers can name, save, update, duplicate, archive/delete, and download owned plans. Download uses a sanitized, print-friendly UTF-8 document with price/availability notice and no private prompts or secrets.

## Security and safety

Keep keys/prompts server-side; validate language/profile/schema/product IDs; enforce user/guest ownership; throttle and timeout provider calls; sanitize rendered text; never fetch arbitrary chat URLs; avoid raw sensitive analytics/logs and raw audio storage. The advisor never diagnoses, prescribes, guarantees results, or gives definitive pregnancy/breastfeeding safety claims. Use contextual patch-test/product-instruction advice and professional referral for severe, persistent, painful, infected, or worsening symptoms.

## Accessibility and responsive requirements

Preserve dialog semantics, focus trap/restoration, Escape close, live regions, labelled controls, keyboard cards, visible focus, 44 px targets, contrast and reduced motion. Use a bounded desktop modal, viewport-contained tablet layout, and near-full-screen mobile layout with sticky header/composer, safe-area padding, wrapping chips, swipeable product cards, and no horizontal overflow.

## Test plan

Cover homepage auto-open/reload/Strict Mode/close and excluded routes; all languages and Unicode persistence/download; progressive branching/back/skip/edit/free text; validated profile values; grounded in-stock active-seller products and empty results; generation/save/update/delete/download ownership; missing key/timeout/invalid JSON/rate-limit/database errors and retry; voice locale/transcript/no-auto-send/permission/close; focus, keyboard, live regions, touch targets; 360, 390, 768, 1024, 1280 and 1440 px layouts. Run migrations, Laravel tests/Pint, frontend lint, production build, and browser verification.
