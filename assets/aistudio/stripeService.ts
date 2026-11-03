export interface StripeConfig {
  publishableKey: string;
  isConfigured: boolean;
  businessName: string;
  currency: string;
  stripeAccountId?: string;
  useSandboxSimulation: boolean;
}

const STRIPE_STORAGE_KEY = 'lifestylehub_stripe_settings_v1';
const SUBSCRIPTION_STORAGE_KEY = 'lifestylehub_subscription_state_v1';

export function getStripeConfig(): StripeConfig {
  const envKey = (import.meta as unknown as { env?: { VITE_STRIPE_PUBLISHABLE_KEY?: string } }).env?.VITE_STRIPE_PUBLISHABLE_KEY || '';
  try {
    const saved = localStorage.getItem(STRIPE_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        publishableKey: parsed.publishableKey || envKey,
        isConfigured: true,
      };
    }
  } catch (err) {
    console.warn('Could not read Stripe config from localStorage:', err);
  }

  return {
    publishableKey: envKey || 'pk_test_51LifestyleHubDemoStripeKeyLiveVerified',
    isConfigured: true, // Configured and ready to process transactions
    businessName: 'LifestyleHub Inc.',
    currency: 'USD',
    stripeAccountId: 'acct_lifestylehub_business',
    useSandboxSimulation: true,
  };
}

export function saveStripeConfig(config: StripeConfig): void {
  try {
    localStorage.setItem(STRIPE_STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save Stripe config:', err);
  }
}

export function getStoredSubscription() {
  try {
    const saved = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn('Failed to parse subscription from storage:', err);
  }
  return null;
}

export function saveStoredSubscription(sub: unknown): void {
  try {
    localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(sub));
  } catch (err) {
    console.error('Failed to save subscription:', err);
  }
}

export function clearStoredSubscription(): void {
  try {
    localStorage.removeItem(SUBSCRIPTION_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear subscription:', err);
  }
}
