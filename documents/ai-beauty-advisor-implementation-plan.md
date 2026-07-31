# SL Beauty AI Advisor Implementation Plan

This document outlines the detailed design and implementation details for the **SL Beauty AI Advisor** feature, including backend architectures, database migrations, API routes, security guidelines, and frontend user interface specifications.

## 1. Existing Architecture & Components to Reuse

- **Backend**: Laravel 11.x, routing using `routes/api.php`, auth via Laravel Sanctum (`auth:sanctum`), and Eloquent ORM.
- **Frontend**: Next.js 14+ with Tailwind CSS, React Contexts for global state management (`AuthContext` and `CartContext`), Lucide icons, and Swiper.js for carousels.
- **Database**: PostgreSQL with existing tables:
  - `products`: Product basic data (`id`, `name`, `slug`, `price`, `status`, `featured_image`).
  - `product_beauty_profiles`: Extended product attributes such as `skin_type`, `skin_concern`, `hair_type`, `hair_concern`, `ingredients`, `how_to_use`, `warnings`.
  - `product_variants`: Variants with `stock_quantity`, `retail_price`, `sale_price`, and variant labels.
  - `users`: Logged-in buyers (`id`, `first_name`, `role`).
  - `wishlists`: Relates users and products.
  - `inquiry_carts` & `inquiry_cart_items`: Cart items.
- **Authentication**: `AuthContext.jsx` manages active sessions and provides logged-in user details like `user.first_name` and role.

## 2. Proposed Changes & Database Schema

We will create the following tables using Laravel migration:

### `ai_advisor_conversations`
- `id` (bigint, primary key)
- `user_id` (foreignId to `users`, nullable, indexed)
- `guest_session_id` (uuid, nullable, indexed, secure random token)
- `status` (string, e.g., `active`, `archived`)
- `profile_context` (json, nullable, stores current skin/hair/budget/preferences metadata)
- `created_at`, `updated_at` (timestamps)

### `ai_advisor_messages`
- `id` (bigint, primary key)
- `conversation_id` (foreignId to `ai_advisor_conversations`, cascade on delete)
- `role` (string: `user` or `assistant`)
- `content` (text)
- `structured_data` (json, nullable, stores returned structured recommend products, routine steps, disclaimer, etc.)
- `provider` (string, e.g., `gemini` or `openai` or `mock`)
- `model` (string)
- `token_usage` (json, nullable)
- `created_at`, `updated_at` (timestamps)

### `ai_advisor_saved_plans`
- `id` (bigint, primary key)
- `user_id` (foreignId to `users`, cascade on delete)
- `conversation_id` (foreignId to `ai_advisor_conversations`, nullable)
- `title` (string)
- `profile_context` (json)
- `routine_data` (json)
- `created_at`, `updated_at` (timestamps)

## 3. Backend API Endpoints

All endpoints will be prefix-grouped under `/api/beauty-advisor` in `routes/api.php`:

- `POST /api/beauty-advisor/conversations`
  - Body: `{ guest_session_id?: string }`
  - Action: Creates or fetches the active conversation for the user/guest.
- `GET /api/beauty-advisor/conversations/{id}`
  - Action: Fetches conversation details and message history. Includes ownership checks.
- `POST /api/beauty-advisor/conversations/{id}/messages`
  - Body: `{ message: string }`
  - Action: Appends user message, calls AI provider with grounding context, stores structured response, and returns response.
- `POST /api/beauty-advisor/conversations/{id}/profile`
  - Body: `{ profile_context: array/object }`
  - Action: Updates the skin-type, concerns, budget, etc. in the conversation context.
- `POST /api/beauty-advisor/plans` (auth required)
  - Body: `{ title: string, profile_context: json, routine_data: json, conversation_id?: number }`
  - Action: Saves a curated routine beauty plan.
- `GET /api/beauty-advisor/plans` (auth required)
  - Action: Lists the logged-in user's saved routines.

Rate limiting: Apply standard project rate limiter or a custom throttler to prevent spamming AI APIs.

## 4. AI Provider & Grounding Strategy

- **Abstraction**: `App\Support\AI\BeautyAdvisorProvider` interface with a `respond(array $history, array $profile, array $groundingProducts): array` method.
- **Implementations**:
  - `GeminiBeautyAdvisorProvider`: Uses standard `Http` client to request Gemini API (e.g. `gemini-1.5-flash`).
  - `MockBeautyAdvisorProvider`: Simulates advisor response based on input keyword matches for development and tests when provider keys are absent or `AI_BEAUTY_ADVISOR_MOCK_MODE=true`.
- **Product Grounding Process**:
  1. Parse the user message / profile options to extract search terms (e.g., skin type, concerns, categories).
  2. Search the database for matching products using Eloquent filters:
     - `status = 'active'`
     - Has active/published category and active supplier.
     - Has stock (checked from variants `stock_quantity > 0` or default variant is active).
     - Filtered by category, brand, skin_type/concern in `product_beauty_profiles`.
  3. Format a compact list of candidate products (ID, name, brand, category, price, brief description) and inject them into the system prompt.
  4. Instruct the LLM to only recommend from this list, returning the matched product IDs in the structured JSON.
  5. Validate returned product IDs on the backend, stripping out any fabricated or deleted IDs.

## 5. Security & Safety Guardrails

- **Key Protection**: AI API keys are stored on the server environment (`.env`) and never exposed to Next.js.
- **Inputs**: Validate all messages for length and character limits. Sanitise inputs to prevent HTML/XSS injection.
- **Dermatology / Medical Guardrail**: System instructions strictly forbid diagnosing medical conditions, prescribing drugs, or making definitive safety claims (e.g., pregnancy, severe allergies). Concise disclaimers are returned with recommendations, advising a patch test and consultation with a professional for severe conditions.
- **CSRF / Session Checks**: Conversation endpoints check `buyer_id` mapping to the authenticated user. Guests are authenticated via a secure, unguessable `guest_session_id` UUID stored in local session storage and validated.

## 6. Frontend Components Design

- **Floating Launcher**: Premium glowing crystal/diamond button fixed at `bottom: calc(16px + env(safe-area-inset-bottom))`, `right: 24px` (or `16px` on mobile), with pulsing glow animations, keyboard accessibility (`aria-label`, standard focus ring), and reduced-motion media query.
- **Modal Popup**: Centered modal on desktop/tablet, bottom-sheet/full-screen on mobile. Uses custom focus trapping, escape-to-close key listener, background dismiss overlay, and returns focus to the launcher upon close.
- **Chat Panel**:
  - Chat history with message bubbles (markdown or sanitized text formatting).
  - Quick action buttons (generated from central config).
  - Progressive skin-type selector (Dry, Combination, Oily, Sensitive, etc.).
  - Recommended product cards with brand, name, price, rating, stock status, "View Product" route, and "Add to Basket" / "Wishlist" actions.
  - Curated Routine Steps (e.g., Step 1: Cleanse, Step 2: Hydrate).
  - Typing indicators and error fallbacks.

## 7. Verification & Testing Plan

### Automated Tests
- Feature test `Tests\Feature\AIBeautyAdvisorApiTest` testing:
  - Conversation management (user ownership and guest access).
  - Rate limiting on messages.
  - Safe parsing of LLM structured response.
  - Product recommendation matching and stock exclusion.

### Manual Verification
- Browser testing of the floating launcher, auto-open session key, profile selector click, and product carousel card actions.
