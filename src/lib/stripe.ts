import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_test_DUMMY_KEY_REPLACE_ME';

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
