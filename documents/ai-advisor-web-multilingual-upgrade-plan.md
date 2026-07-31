# SL Beauty AI Advisor: web and multilingual upgrade plan

## Current architecture

- Next.js client components render one lazy-visible advisor modal and launcher. The modal owns guided consultation, messages, product cards, plan saving, New Chat, Clear Chat, voice typing, focus management, and homepage auto-open state.
- `frontend/src/lib/api/beautyAdvisor.js` uses the existing API client. A local UUID identifies guest conversations; authenticated requests use the existing Sanctum session.
- Laravel exposes conversation, profile, message, and saved-plan endpoints through `BeautyAdvisorController`.
- `BeautyAdvisorService` loads active database products, invokes a `BeautyAdvisorProvider`, validates returned product IDs, and persists structured assistant messages.
- Gemini is the configured production provider; a deterministic mock provider supports tests.
- `Product` and related category, supplier, image, variant, and beauty-profile records are the commerce source of truth.

## Confirmed limitations

- Languages were limited to `en`, `si`, and `ta`; several strings were incorrectly encoded and most modal copy was hard-coded in English.
- The provider schema did not include intent, language, confidence, search state, sources, or safety metadata.
- There was no backend-only trusted web-search provider, source validation/ranking, citation rendering, or search failure fallback.
- Product retrieval did not consistently account for budget, seller state, or variant availability, and response validation was distributed inside one service.
- There was no answer-feedback persistence or repeatable multilingual/safety evaluation dataset.
- Rate limiting existed at the application level but was not explicitly applied to advisor message endpoints.

## New architecture

`BeautyAdvisorController` remains the HTTP boundary. `BeautyAdvisorService` orchestrates focused services for language, intent, safety, product retrieval, optional web retrieval, AI generation, response validation, citation validation, and persistence. Providers receive bounded structured context only; they cannot execute code, access files, query arbitrary databases, or choose arbitrary URLs.

The validated response contract contains `reply`, `language`, `intent`, `answerConfidence`, `usedWebSearch`, `followUpQuestion`, `quickReplies`, `recommendedProductIds`, `routine`, `sources`, `requiresProfessionalAdvice`, `safetyNote`, and a compatibility `disclaimer`.

## Web-search flow

1. Intent rules determine whether freshness/current external verification is needed.
2. The language service creates a selected-language query and an English query when useful.
3. `BeautyWebSearchProvider` runs only on the backend with a result/time limit.
4. `BeautyAdvisorSourceValidator` accepts HTTPS results from configured allowed domains, rejects blocked/private/suspicious URLs, normalizes tracking parameters, de-duplicates URLs, and ranks authoritative source types.
5. Retrieved passages are treated as untrusted data, clearly separated from instructions, and passed to the model as bounded evidence.
6. Citations are revalidated against retrieved results before persistence. On provider failure, stable internal guidance may be returned only with a visible “current verification unavailable” note.

## Product-database retrieval flow

The service searches active products in active categories and loads supplier, images, variants, and beauty metadata. Budget/category/profile constraints reduce candidates. The model receives bounded product records and may return IDs only. IDs are intersected with the candidate set and re-queried as active records before the response is stored. Names, prices, stock-related fields, images, ratings, sellers, URLs, and promotions displayed by the UI come from the API/database, never model prose.

## Multilingual strategy

- Manual selection is authoritative and stored in conversation/guest state. Supported production codes are `en`, `si`, `ta`, `zh-CN`, `zh-TW`, `ko`, and `hi`.
- Centralized UTF-8 frontend translations cover core controls, status, sources, feedback, errors, and voice states.
- The selected language and its instruction are supplied to the model. Product names, brands, URLs, prices, IDs, model numbers, and INCI names must be preserved.
- Automatic detection is advisory; the assistant does not silently override a manual selection.
- Sinhala, Tamil, Chinese, Korean, and Hindi copy requires native-speaker review before production launch.

## Safety strategy

Deterministic pre-generation rules intercept diagnosis, prescription, severe-symptom, pregnancy/medication, dangerous-DIY, secret-extraction, and unrelated-domain requests. Provider prompts reinforce non-diagnostic cosmetic scope, patch testing, uncertainty, and professional escalation. The response validator enforces shape, length, language, source provenance, and validated product IDs. Safety-sensitive current claims require authoritative sources; unavailable verification is disclosed.

## Source ranking strategy

Default rank: government/regulator and official health domains, peer-reviewed/research publishers, professional dermatology/cosmetic-science bodies, official brands/manufacturers, then established editorial sources. Configured allowlists narrow production search; blocklists always win. Social/anonymous/affiliate sources are excluded from safety evidence.

## Prompt-injection protection

- Retrieved content and product descriptions are labelled untrusted evidence, never instructions.
- Strict request/tool schemas, HTTPS/domain validation, bounded text extraction, output filtering, ownership checks, rate limits, and citation provenance checks are enforced server-side.
- Provider secrets, hidden prompts, tokens, private customer data, and raw provider responses are never returned to the browser or placed in logs.

## Testing strategy

- Feature tests: guest/auth ownership, language persistence, grounded IDs, feedback ownership, rate limits, safety redirection, web timeout/failure, trusted/blocked sources, duplicate citations, and structured fallback.
- Unit tests: intent routing, language codes, safety classification, URL validation/ranking, response parsing, and prompt-injection payloads.
- Frontend tests: citation links, feedback controls, language switching, voice locale mapping, live status, focus trap, and mobile overflow.
- Evaluation fixtures under `documents/ai-advisor-evaluations/` cover every supported language, product/budget cases, ingredients, comparisons, safety, injection, unsupported scope, no-match, and stale-source cases. Reports must not claim scores until executed against a configured provider.

## Required environment variables

```dotenv
AI_BEAUTY_ADVISOR_ENABLED=true
AI_BEAUTY_ADVISOR_PROVIDER=gemini
AI_BEAUTY_ADVISOR_API_KEY=
AI_BEAUTY_ADVISOR_MODEL=gemini-2.5-flash
AI_BEAUTY_ADVISOR_TIMEOUT_SECONDS=30
AI_BEAUTY_ADVISOR_MOCK_MODE=false
BEAUTY_ADVISOR_PROMPT_VERSION=3

AI_BEAUTY_WEB_SEARCH_ENABLED=false
AI_BEAUTY_WEB_SEARCH_PROVIDER=
AI_BEAUTY_WEB_SEARCH_API_KEY=
AI_BEAUTY_WEB_SEARCH_ENDPOINT=
AI_BEAUTY_WEB_SEARCH_MAX_RESULTS=6
AI_BEAUTY_WEB_SEARCH_TIMEOUT_SECONDS=15
AI_BEAUTY_WEB_SEARCH_CACHE_MINUTES=60
AI_BEAUTY_SEARCH_ALLOWED_DOMAINS=
AI_BEAUTY_SEARCH_BLOCKED_DOMAINS=
```

No secret uses a `NEXT_PUBLIC_` prefix.
