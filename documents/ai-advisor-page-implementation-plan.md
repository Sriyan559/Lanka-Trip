# Dedicated AI Advisor page implementation plan

## Current architecture

The root layout mounts one compact `AIBeautyAdvisorWrapper`. It owns the existing modal and floating launcher. Both the modal and the new full-page experience use `frontend/src/lib/api/beautyAdvisor.js`, the existing guest UUID, Sanctum authentication, cart/wishlist contexts, and Laravel `/api/beauty-advisor/*` endpoints. Laravel persists `AiAdvisorConversation`, `AiAdvisorMessage`, `AiAdvisorSavedPlan`, and answer feedback; Gemini is accessed only through the backend provider abstraction. Product IDs are validated against active database products. Optional trusted search, citation, intent, language, response-validation, and safety services already exist server-side.

## Page architecture

- Canonical route: `/ai-advisor`, with non-indexing metadata and a canonical URL.
- Server page supplies metadata and renders a client workspace.
- The workspace has a responsive sidebar/drawer, compact status bar, welcome/conversation states, shared database-backed product cards, source links, routines, feedback, large composer, voice typing, language selection, New Chat, Clear Chat, and plan saving.
- The existing popup remains available on other routes. Its floating launcher is hidden on `/ai-advisor`, preventing duplicate interfaces.

## Header navigation

The existing glowing `HeaderAIAdvisorButton` becomes a Next.js `Link` to `/ai-advisor`. It retains its asset, animation, tooltip, dimensions, mobile visibility, accessibility name, and active-route styling. It no longer dispatches the modal-open event.

## Backend and database

No second services or tables are required. The page reuses the existing controller, conversation/message/profile/feedback/plan endpoints, grounded product endpoint, Gemini provider, safety rules, search provider, and applied feedback migration. Dhivehi (`dv`) is added to the centralized supported-language list and provider language context.

## Conversation and plan flow

Guests use the existing local UUID and temporary server conversation. Authenticated customers use owned conversations and may persist/download plans. New Chat archives the current chat and creates another; Clear Chat uses confirmation and removes current messages/profile only. Recommendations contain validated IDs and final product details are retrieved from the product API.

## Multilingual and RTL

Central translations and speech mappings support `en`, `si`, `ta`, `zh-CN`, `zh-TW`, `hi`, `ko`, and `dv`. Manual selection remains authoritative. Dhivehi message/workspace content uses `lang="dv"` and `dir="rtl"`; product names, URLs, IDs, prices, and INCI names retain their original direction/content. Non-English copy requires human review.

## Web search, accuracy, and security

Current-information intent is routed by the backend to the configured search provider. Source URLs are HTTPS/domain validated and matched against retrieved provenance before rendering. Web/product text is untrusted data. The browser never receives provider keys. Ownership, message limits, rate limits, structured response validation, product-ID verification, and safe external links remain enforced.

## Medical safety

Deterministic rules intercept diagnosis, prescription, severe symptoms, pregnancy/medication claims, secret extraction, and selected out-of-scope requests before provider invocation. Provider instructions prohibit diagnosis, guarantees, fabricated product data, prompt disclosure, and arbitrary tool access.

## Accessibility and responsiveness

Semantic `aside`/`main` regions, labelled controls, live statuses, visible focus rings, 44px touch targets, keyboard composer behavior, reduced-motion support, safe-area spacing, and RTL attributes are required. Desktop uses a 260px sidebar; tablet/mobile use a drawer and one/two-column feature grids with no horizontal overflow.

## Testing

Run advisor feature tests, migration status, frontend lint, Next production build/type validation, and browser checks when the in-app browser is available. Verify header routing, active state, drawer, Unicode/RTL, message send/retry, product grounding, sources, routine rendering, feedback, plans, voice mapping, and safety interception.

## Environment variables

The page adds no public secrets. It reuses `AI_BEAUTY_ADVISOR_*`, `BEAUTY_ADVISOR_PROMPT_VERSION`, `AI_BEAUTY_WEB_SEARCH_*`, and `AI_BEAUTY_SEARCH_ALLOWED_DOMAINS` / `AI_BEAUTY_SEARCH_BLOCKED_DOMAINS` documented in the backend environment examples.
