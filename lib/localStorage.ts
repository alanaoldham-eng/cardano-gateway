import type { Badge, Campaign, ClaimRecord, UserProfile } from "@/lib/types";

export const STORAGE_KEYS = {
  profile: "tellus-gateway.profile",
  claims: "tellus-gateway.claims",
  badges: "tellus-gateway.badges",
  customCampaigns: "tellus-gateway.customCampaigns",
  sponsorLessonSeen: "tellus-gateway.sponsorLessonSeen"
} as const;

export function canUseLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseLocalStorage()) return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function createId(prefix: string): string {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`;
  return `${prefix}-${random}`;
}

export function getProfile(): UserProfile | null {
  return readJson<UserProfile | null>(STORAGE_KEYS.profile, null);
}

export function saveProfile(profile: UserProfile): void {
  writeJson(STORAGE_KEYS.profile, profile);
}

export function getClaims(): ClaimRecord[] {
  return readJson<ClaimRecord[]>(STORAGE_KEYS.claims, []);
}

export function saveClaim(claim: ClaimRecord): void {
  const claims = getClaims();
  const existingIndex = claims.findIndex(
    (candidate) => candidate.campaignSlug === claim.campaignSlug && candidate.email.toLowerCase() === claim.email.toLowerCase()
  );

  if (existingIndex >= 0) {
    claims[existingIndex] = claim;
  } else {
    claims.push(claim);
  }

  writeJson(STORAGE_KEYS.claims, claims);
}

export function getBadges(): Badge[] {
  return readJson<Badge[]>(STORAGE_KEYS.badges, []);
}

export function saveBadge(badge: Badge): void {
  const badges = getBadges();
  const existingIndex = badges.findIndex((candidate) => candidate.campaignSlug === badge.campaignSlug);

  if (existingIndex >= 0) {
    badges[existingIndex] = badge;
  } else {
    badges.push(badge);
  }

  writeJson(STORAGE_KEYS.badges, badges);
}

export function getCustomCampaigns(): Campaign[] {
  return readJson<Campaign[]>(STORAGE_KEYS.customCampaigns, []);
}

export function saveCustomCampaign(campaign: Campaign): void {
  const campaigns = getCustomCampaigns();
  const existingIndex = campaigns.findIndex((candidate) => candidate.slug === campaign.slug);

  if (existingIndex >= 0) {
    campaigns[existingIndex] = campaign;
  } else {
    campaigns.unshift(campaign);
  }

  writeJson(STORAGE_KEYS.customCampaigns, campaigns);
}

export function markSponsorLessonSeen(): void {
  if (!canUseLocalStorage()) return;
  window.localStorage.setItem(STORAGE_KEYS.sponsorLessonSeen, "true");
}

export function hasSeenSponsorLesson(): boolean {
  if (!canUseLocalStorage()) return false;
  return window.localStorage.getItem(STORAGE_KEYS.sponsorLessonSeen) === "true";
}
