/**
 * ─────────────────────────────────────────────────────────────
 *  PolyLingo API Service Layer
 *  All HTTP calls live here. Components / contexts import
 *  named functions — never write fetch() directly in a component.
 * ─────────────────────────────────────────────────────────────
 *
 *  HOW TO USE:
 *  1. Copy .env.example → .env.local
 *  2. Set VITE_API_BASE_URL to your backend URL
 *  3. Replace every "👉 INSERT API URL" comment with real paths
 *  4. Remove the mock implementations below once your backend is ready
 */

// ─── Base URL ────────────────────────────────────────────────
// 👉 INSERT API URL HERE — set in .env.local
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// ─── Shared fetch helper ──────────────────────────────────────
/**
 * Wraps every API call:
 *  - Attaches Authorization header automatically
 *  - Throws a friendly Error on non-2xx responses
 *  - Returns parsed JSON
 */
async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('polylingo_token');

  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    // Try to parse the error body; fall back to status text
    let message = `Request failed: ${response.status} ${response.statusText}`;
    try {
      const body = await response.json();
      message = body.message || body.error || message;
    } catch (_) { /* ignore */ }
    throw new Error(message);
  }

  // 204 No Content — nothing to parse
  if (response.status === 204) return null;
  return response.json();
}

// ═══════════════════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════════════════

/**
 * Login with email + password.
 * 👉 INSERT API URL HERE: POST /api/auth/login
 * Expected response: { user: {...}, token: "jwt-string" }
 */
export async function loginUser({ email, password }) {
  // ─── MOCK (delete when backend is ready) ───────────────────
  await delay(600);
  if (!email.includes('@') || password.length < 4) {
    throw new Error('Invalid email or password');
  }
  return buildMockUser(email);
  // ─── END MOCK ──────────────────────────────────────────────

  // ─── REAL IMPLEMENTATION (uncomment when backend is ready) ──
  // const data = await apiFetch('/api/auth/login', {
  //   method: 'POST',
  //   body: JSON.stringify({ email, password }),
  // });
  // localStorage.setItem('polylingo_token', data.token);
  // return data.user;
}

/**
 * Register a new account.
 * 👉 INSERT API URL HERE: POST /api/auth/register
 * Expected response: { user: {...}, token: "jwt-string" }
 */
export async function registerUser({ name, email, age, password, preferredLanguage }) {
  // ─── MOCK (delete when backend is ready) ───────────────────
  await delay(700);
  if (!name || !email || !password || !preferredLanguage) {
    throw new Error('All fields are required');
  }
  if (!email.includes('@')) throw new Error('Please enter a valid email address');
  if (password.length < 6) throw new Error('Password must be at least 6 characters');
  const existing = JSON.parse(localStorage.getItem('polylingo_accounts') || '{}');
  if (existing[email.toLowerCase()]) {
    throw new Error('An account with this email already exists');
  }
  return buildMockUser(email, { name, age: parseInt(age) || null, preferredLanguage });
  // ─── END MOCK ──────────────────────────────────────────────

  // ─── REAL IMPLEMENTATION (uncomment when backend is ready) ──
  // const data = await apiFetch('/api/auth/register', {
  //   method: 'POST',
  //   body: JSON.stringify({ name, email, age, password, preferredLanguage }),
  // });
  // localStorage.setItem('polylingo_token', data.token);
  // return data.user;
}

/**
 * Fetch the currently logged-in user's profile.
 * 👉 INSERT API URL HERE: GET /api/auth/me
 * Expected response: { user: {...} }
 */
export async function fetchCurrentUser() {
  // ─── MOCK (delete when backend is ready) ───────────────────
  const stored = localStorage.getItem('polylingo_auth_user');
  if (!stored) return null;
  return JSON.parse(stored);
  // ─── END MOCK ──────────────────────────────────────────────

  // ─── REAL IMPLEMENTATION (uncomment when backend is ready) ──
  // const data = await apiFetch('/api/auth/me');
  // return data.user;
}

// ═══════════════════════════════════════════════════════════════
//  USER / PROFILE
// ═══════════════════════════════════════════════════════════════

/**
 * Update user profile fields.
 * 👉 INSERT API URL HERE: PATCH /api/user/profile
 * Expected response: { user: {...} }
 */
export async function updateUserProfile(updates) {
  // ─── MOCK (delete when backend is ready) ───────────────────
  await delay(400);
  const stored = JSON.parse(localStorage.getItem('polylingo_auth_user') || '{}');
  const updated = { ...stored, ...updates };
  localStorage.setItem('polylingo_auth_user', JSON.stringify(updated));
  return updated;
  // ─── END MOCK ──────────────────────────────────────────────

  // ─── REAL IMPLEMENTATION (uncomment when backend is ready) ──
  // const data = await apiFetch('/api/user/profile', {
  //   method: 'PATCH',
  //   body: JSON.stringify(updates),
  // });
  // return data.user;
}

/**
 * Get weekly activity data for the dashboard chart.
 * 👉 INSERT API URL HERE: GET /api/user/activity/weekly
 * Expected response: [{ day: "Mon", minutes: 25 }, ...]
 */
export async function fetchWeeklyActivity() {
  // ─── MOCK (delete when backend is ready) ───────────────────
  await delay(300);
  return null; // DashboardPage falls back to buildWeekData() when this returns null
  // ─── END MOCK ──────────────────────────────────────────────

  // ─── REAL IMPLEMENTATION (uncomment when backend is ready) ──
  // return apiFetch('/api/user/activity/weekly');
}

// ═══════════════════════════════════════════════════════════════
//  ASSESSMENT
// ═══════════════════════════════════════════════════════════════

/**
 * Save completed assessment results.
 * 👉 INSERT API URL HERE: POST /api/assessment/results
 * Expected request body: { level, overall, scores, preferredLanguage }
 */
export async function saveAssessmentResults(results) {
  // ─── MOCK (delete when backend is ready) ───────────────────
  await delay(300);
  return { success: true };
  // ─── END MOCK ──────────────────────────────────────────────

  // ─── REAL IMPLEMENTATION (uncomment when backend is ready) ──
  // return apiFetch('/api/assessment/results', {
  //   method: 'POST',
  //   body: JSON.stringify(results),
  // });
}

/**
 * Submit pronunciation audio for AI scoring.
 * 👉 INSERT API URL HERE: POST /api/assessment/pronunciation
 *
 * This sends a FormData (binary audio file), NOT JSON.
 * Expected response: { score: 8.2, feedback: "..." }
 *
 * ⚠️  Currently in PronunciationStep.jsx the score is faked with Math.random().
 *     Replace that with a call to this function.
 */
export async function scorePronunciation(audioBlob, languageCode) {
  const token = localStorage.getItem('polylingo_token');
  const formData = new FormData();
  formData.append('audio', audioBlob, 'recording.webm');
  formData.append('language', languageCode);

  // ─── MOCK (delete when backend is ready) ───────────────────
  await delay(1200); // simulate network round-trip
  return { score: Math.min(10, Math.max(6, Math.floor(Math.random() * 3) + 7)) };
  // ─── END MOCK ──────────────────────────────────────────────

  // ─── REAL IMPLEMENTATION (uncomment when backend is ready) ──
  // 👉 INSERT API URL HERE
  // const response = await fetch(`${BASE_URL}/api/assessment/pronunciation`, {
  //   method: 'POST',
  //   headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  //   body: formData, // Don't set Content-Type — browser sets multipart boundary automatically
  // });
  // if (!response.ok) throw new Error('Pronunciation scoring failed');
  // return response.json(); // { score: number, feedback: string }
}

/**
 * Send a speaking message and get an AI reply.
 * 👉 INSERT API URL HERE: POST /api/assessment/speaking/reply
 *
 * ⚠️  Currently SpeakingStep.jsx uses a local AI_REPLIES array (random picks).
 *     Replace that with calls to this function.
 *
 * Expected request: { message: string, history: [...], language: string }
 * Expected response: { reply: string, fluencyScore: number }
 */
export async function getSpeakingReply({ message, history, language }) {
  // ─── MOCK (delete when backend is ready) ───────────────────
  const MOCK_REPLIES = [
    "Interesting! Could you tell me more about that?",
    "Great point! How did that experience affect you?",
    "That's a thoughtful response. What would you do differently?",
    "I like how you expressed that. Can you elaborate a bit more?",
    "Well said! What do you think about the broader context of that?",
  ];
  await delay(800);
  return {
    reply: MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)],
    fluencyScore: null, // real backend returns a score after the session ends
  };
  // ─── END MOCK ──────────────────────────────────────────────

  // ─── REAL IMPLEMENTATION (uncomment when backend is ready) ──
  // return apiFetch('/api/assessment/speaking/reply', {
  //   method: 'POST',
  //   body: JSON.stringify({ message, history, language }),
  // });
}

// ═══════════════════════════════════════════════════════════════
//  COMMUNITY
// ═══════════════════════════════════════════════════════════════

/**
 * Fetch community posts (feed).
 * 👉 INSERT API URL HERE: GET /api/community/posts?page=1&limit=20
 */
export async function fetchCommunityPosts({ page = 1, limit = 20 } = {}) {
  // ─── MOCK (delete when backend is ready) ───────────────────
  return null; // CommunityPage will use its local communityData.js instead
  // ─── END MOCK ──────────────────────────────────────────────

  // return apiFetch(`/api/community/posts?page=${page}&limit=${limit}`);
}

/**
 * Create a new community post.
 * 👉 INSERT API URL HERE: POST /api/community/posts
 */
export async function createPost({ content, language }) {
  // ─── MOCK (delete when backend is ready) ───────────────────
  await delay(500);
  return { id: Date.now(), content, language, likes: 0, comments: [] };
  // ─── END MOCK ──────────────────────────────────────────────

  // return apiFetch('/api/community/posts', {
  //   method: 'POST',
  //   body: JSON.stringify({ content, language }),
  // });
}

/**
 * Like / unlike a post.
 * 👉 INSERT API URL HERE: POST /api/community/posts/:id/like
 */
export async function togglePostLike(postId) {
  // ─── MOCK (delete when backend is ready) ───────────────────
  await delay(200);
  return { liked: true };
  // ─── END MOCK ──────────────────────────────────────────────

  // return apiFetch(`/api/community/posts/${postId}/like`, { method: 'POST' });
}

/**
 * Send a direct message to a language partner.
 * 👉 INSERT API URL HERE: POST /api/community/dm
 */
export async function sendDirectMessage({ toUserId, content }) {
  // ─── MOCK (delete when backend is ready) ───────────────────
  await delay(400);
  return { id: Date.now(), toUserId, content, sentAt: new Date().toISOString() };
  // ─── END MOCK ──────────────────────────────────────────────

  // return apiFetch('/api/community/dm', {
  //   method: 'POST',
  //   body: JSON.stringify({ toUserId, content }),
  // });
}

// ═══════════════════════════════════════════════════════════════
//  PRACTICE
// ═══════════════════════════════════════════════════════════════

/**
 * Log a completed practice session.
 * 👉 INSERT API URL HERE: POST /api/practice/session
 * Expected body: { type, language, durationMinutes, score }
 */
export async function logPracticeSession({ type, language, durationMinutes, score }) {
  // ─── MOCK (delete when backend is ready) ───────────────────
  await delay(300);
  return { success: true, xpEarned: Math.round(score * 10) };
  // ─── END MOCK ──────────────────────────────────────────────

  // return apiFetch('/api/practice/session', {
  //   method: 'POST',
  //   body: JSON.stringify({ type, language, durationMinutes, score }),
  // });
}

// ═══════════════════════════════════════════════════════════════
//  PRIVATE HELPERS
// ═══════════════════════════════════════════════════════════════

/** Simple delay utility used by mock functions */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Builds a mock user object — REMOVE when real auth is wired up */
function buildMockUser(email, overrides = {}) {
  return {
    email,
    name: overrides.name || email.split('@')[0],
    age: overrides.age || null,
    preferredLanguage: overrides.preferredLanguage || null,
    authenticated: true,
    assessmentCompleted: false,
    joinedAt: new Date().toISOString(),
    streak: 0,
    totalMinutes: 0,
    achievements: 0,
  };
}
