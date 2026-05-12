"""
Payment processing module for Tiannara MindCache API.

Supports multiple payment providers:
- Lemon Squeezy (primary - no business registration required) ⭐ RECOMMENDED
- Stripe (fallback - individual/sole proprietor friendly)
- Paystack (African markets - requires business registration)

Provider selection is controlled by PAYMENT_PROVIDER env variable.
Default: lemon_squeezy (best for unregistered businesses)
"""

import os
import stripe
import requests
from typing import Dict, Optional
from fastapi import HTTPException

# ==================== Payment Provider Configuration ====================

PAYMENT_PROVIDER = os.getenv("PAYMENT_PROVIDER", "lemon_squeezy").lower()

# Stripe configuration
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_your_key_here")

# Lemon Squeezy configuration
LEMON_SQUEEZY_API_KEY = os.getenv("LEMON_SQUEEZY_API_KEY", "")
LEMON_SQUEEZY_STORE_ID = os.getenv("LEMON_SQUEEZY_STORE_ID", "")
LEMON_SQUEEZY_WEBHOOK_SECRET = os.getenv("LEMON_SQUEEZY_WEBHOOK_SECRET", "")
LEMON_SQUEEZY_BASE_URL = "https://api.lemonsqueezy.com/v1"

# ==================== Pricing Plans ====================

PRICING_PLANS = {
    "free": {
        "price_id": None,  # No charge
        "requests_per_month": 100,
        "max_domains": 2,
        "skill_transfer": False
    },
    "starter": {
        "price_id": os.getenv("STARTER_PRICE_ID", "price_starter_123"),
        "requests_per_month": 5000,
        "max_domains": 4,
        "skill_transfer": True,
        "amount_cents": 4900,  # $49/month
        "lemon_squeezy_variant_id": os.getenv("LS_STARTER_VARIANT_ID", ""),
        "stripe_price_id": os.getenv("STRIPE_STARTER_PRICE_ID", "")
    },
    "professional": {
        "price_id": os.getenv("PRO_PRICE_ID", "price_pro_456"),
        "requests_per_month": 50000,
        "max_domains": 10,
        "skill_transfer": True,
        "priority_support": True,
        "amount_cents": 19900,  # $199/month
        "lemon_squeezy_variant_id": os.getenv("LS_PRO_VARIANT_ID", ""),
        "stripe_price_id": os.getenv("STRIPE_PRO_PRICE_ID", "")
    },
    "enterprise": {
        "price_id": os.getenv("ENTERPRISE_PRICE_ID", "price_ent_789"),
        "requests_per_month": -1,  # Unlimited
        "max_domains": -1,  # Unlimited
        "skill_transfer": True,
        "priority_support": True,
        "custom_domains": True,
        "amount_cents": 99900,  # $999/month
        "lemon_squeezy_variant_id": os.getenv("LS_ENTERPRISE_VARIANT_ID", ""),
        "stripe_price_id": os.getenv("STRIPE_ENTERPRISE_PRICE_ID", "")
    }
}

# Consulting package prices
CONSULTING_PACKAGES = {
    "integration": {
        "name": "System Integration Package",
        "amount_cents": 500000,  # $5,000
        "description": "Custom domain development and API integration"
    },
    "optimization": {
        "name": "Performance Optimization Package",
        "amount_cents": 300000,  # $3,000
        "description": "System tuning and performance enhancement"
    },
    "training": {
        "name": "Training & Onboarding Package",
        "amount_cents": 150000,  # $1,500
        "description": "Comprehensive team training session"
    }
}


class PaymentProcessor:
    """Handles all payment-related operations with multi-provider support."""
    
    def __init__(self):
        self.provider = PAYMENT_PROVIDER
        self.stripe = stripe
    
    def create_checkout_session(
        self,
        plan: str,
        success_url: str,
        cancel_url: str,
        customer_email: Optional[str] = None
    ) -> Dict:
        """
        Create a checkout session for subscription using configured provider.
        
        Args:
            plan: Pricing plan name (starter, professional, enterprise)
            success_url: URL to redirect after successful payment
            cancel_url: URL to redirect if payment cancelled
            customer_email: Optional customer email
            
        Returns:
            Dictionary with checkout session ID and URL
        """
        if plan not in PRICING_PLANS:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid plan: {plan}"
            )
        
        # Route to appropriate provider
        if self.provider == "lemon_squeezy":
            return self._create_lemon_squeezy_checkout(plan, success_url, cancel_url, customer_email)
        elif self.provider == "stripe":
            return self._create_stripe_checkout(plan, success_url, cancel_url, customer_email)
        else:
            raise HTTPException(
                status_code=500,
                detail=f"Unsupported payment provider: {self.provider}. Use 'lemon_squeezy' or 'stripe'"
            )
    
    def _create_lemon_squeezy_checkout(
        self,
        plan: str,
        success_url: str,
        cancel_url: str,
        customer_email: Optional[str] = None
    ) -> Dict:
        """Create Lemon Squeezy checkout session."""
        variant_id = PRICING_PLANS[plan].get("lemon_squeezy_variant_id")
        
        if not variant_id:
            raise HTTPException(
                status_code=500,
                detail=f"Lemon Squeezy variant ID not configured for plan: {plan}. Set LS_{plan.upper()}_VARIANT_ID in .env"
            )
        
        if not LEMON_SQUEEZY_API_KEY or not LEMON_SQUEEZY_STORE_ID:
            raise HTTPException(
                status_code=500,
                detail="Lemon Squeezy credentials not configured. Set LEMON_SQUEEZY_API_KEY and LEMON_SQUEEZY_STORE_ID in .env"
            )
        
        try:
            headers = {
                "Authorization": f"Bearer {LEMON_SQUEEZY_API_KEY}",
                "Content-Type": "application/vnd.api+json",
                "Accept": "application/vnd.api+json"
            }
            
            payload = {
                "data": {
                    "type": "checkouts",
                    "attributes": {
                        "checkout_data": {
                            "custom": {
                                "plan": plan,
                                "customer_email": customer_email or ""
                            }
                        },
                        "product_options": {
                            "redirect_url": success_url,
                            "receipt_link_url": success_url
                        },
                        "expires_at": None,
                        "preview": False,
                        "test_mode": os.getenv("LEMON_SQUEEZY_TEST_MODE", "true").lower() == "true"
                    },
                    "relationships": {
                        "store": {
                            "data": {
                                "type": "stores",
                                "id": LEMON_SQUEEZY_STORE_ID
                            }
                        },
                        "variant": {
                            "data": {
                                "type": "variants",
                                "id": variant_id
                            }
                        }
                    }
                }
            }
            
            response = requests.post(
                f"{LEMON_SQUEEZY_BASE_URL}/checkouts",
                headers=headers,
                json=payload
            )
            
            if response.status_code != 201:
                raise HTTPException(
                    status_code=500,
                    detail=f"Lemon Squeezy error: {response.text}"
                )
            
            result = response.json()
            checkout_url = result["data"]["attributes"]["url"]
            checkout_id = result["data"]["id"]
            
            return {
                "session_id": checkout_id,
                "checkout_url": checkout_url,
                "provider": "lemon_squeezy"
            }
        
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Payment processing error: {str(e)}"
            )
    
    def _create_stripe_checkout(
        self,
        plan: str,
        success_url: str,
        cancel_url: str,
        customer_email: Optional[str] = None
    ) -> Dict:
        """Create Stripe checkout session."""
        price_id = PRICING_PLANS[plan].get("stripe_price_id") or PRICING_PLANS[plan]["price_id"]
        
        if not price_id:
            raise HTTPException(
                status_code=500,
                detail=f"Stripe price ID not configured for plan: {plan}"
            )
        
        try:
            session = self.stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[{
                    "price": price_id,
                    "quantity": 1,
                }],
                mode="subscription",
                success_url=success_url,
                cancel_url=cancel_url,
                customer_email=customer_email,
                metadata={
                    "plan": plan,
                    "service": "tiannara_api_subscription"
                }
            )
            
            return {
                "session_id": session.id,
                "checkout_url": session.url,
                "provider": "stripe"
            }
        
        except stripe.error.StripeError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Payment processing error: {str(e)}"
            )
    
    def create_consulting_payment(
        self,
        package: str,
        success_url: str,
        cancel_url: str,
        customer_email: Optional[str] = None,
        custom_amount: Optional[int] = None
    ) -> Dict:
        """
        Create a one-time payment for consulting services.
        
        Uses Stripe for one-time payments (Lemon Squeezy better for subscriptions).
        """
        if package not in CONSULTING_PACKAGES and not custom_amount:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid package: {package}"
            )
        
        amount = custom_amount or CONSULTING_PACKAGES[package]["amount_cents"]
        description = custom_amount and f"Custom consulting engagement" or CONSULTING_PACKAGES[package]["description"]
        
        try:
            session = self.stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[{
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": custom_amount and "Custom Consulting" or CONSULTING_PACKAGES[package]["name"],
                            "description": description
                        },
                        "unit_amount": amount,
                    },
                    "quantity": 1,
                }],
                mode="payment",
                success_url=success_url,
                cancel_url=cancel_url,
                customer_email=customer_email,
                metadata={
                    "package": package,
                    "service": "tiannara_consulting"
                }
            )
            
            return {
                "session_id": session.id,
                "checkout_url": session.url
            }
        
        except stripe.error.StripeError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Payment processing error: {str(e)}"
            )
    
    def handle_webhook(self, payload: bytes, sig_header: str, provider: str = None) -> Dict:
        """
        Handle webhook events from payment provider.
        
        Args:
            payload: Raw request body
            sig_header: Signature header
            provider: Payment provider (auto-detected if not specified)
            
        Returns:
            Processed event data
        """
        provider = provider or self.provider
        
        if provider == "lemon_squeezy":
            return self._handle_lemon_squeezy_webhook(payload, sig_header)
        elif provider == "stripe":
            return self._handle_stripe_webhook(payload, sig_header)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported provider: {provider}")
    
    def _handle_lemon_squeezy_webhook(self, payload: bytes, sig_header: str) -> Dict:
        """Handle Lemon Squeezy webhook events."""
        import hmac
        import hashlib
        import json
        
        # Verify signature
        if LEMON_SQUEEZY_WEBHOOK_SECRET:
            computed_signature = hmac.new(
                LEMON_SQUEEZY_WEBHOOK_SECRET.encode(),
                payload,
                hashlib.sha256
            ).hexdigest()
            
            if not hmac.compare_digest(computed_signature, sig_header):
                raise HTTPException(status_code=400, detail="Invalid signature")
        
        event = json.loads(payload)
        event_type = event.get("meta", {}).get("event_name", "")
        
        # Handle different event types
        if event_type == "subscription_created":
            return self._handle_subscription_created(event)
        elif event_type == "subscription_updated":
            return self._handle_subscription_updated(event)
        elif event_type == "subscription_cancelled":
            return self._handle_subscription_cancelled(event)
        elif event_type == "order_created":
            return self._handle_order_created(event)
        
        return {"status": "ignored", "event_type": event_type}
    
    def _handle_stripe_webhook(self, payload: bytes, sig_header: str) -> Dict:
        """Handle Stripe webhook events."""
        webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "whsec_test_secret")
        
        try:
            event = self.stripe.Webhook.construct_event(
                payload, sig_header, webhook_secret
            )
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid payload")
        except stripe.error.SignatureVerificationError:
            raise HTTPException(status_code=400, detail="Invalid signature")
        
        # Handle specific events
        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            return self._handle_subscription_created(session)
        
        elif event["type"] == "invoice.payment_succeeded":
            invoice = event["data"]["object"]
            return self._handle_payment_succeeded(invoice)
        
        elif event["type"] == "customer.subscription.deleted":
            subscription = event["data"]["object"]
            return self._handle_subscription_cancelled(subscription)
        
        return {"status": "ignored", "event_type": event["type"]}
    
    def _handle_subscription_created(self, event_data: Dict) -> Dict:
        """Handle new subscription creation."""
        # TODO: Update user's subscription status in database
        return {
            "status": "subscription_created",
            "customer_id": event_data.get("customer") or event_data.get("data", {}).get("attributes", {}).get("customer_id"),
            "plan": event_data.get("metadata", {}).get("plan") or event_data.get("data", {}).get("attributes", {}).get("first_subscription_item", {}).get("price_name")
        }
    
    def _handle_payment_succeeded(self, invoice: Dict) -> Dict:
        """Handle successful payment."""
        # TODO: Extend subscription period in database
        return {
            "status": "payment_succeeded",
            "customer_id": invoice.get("customer"),
            "amount_paid": invoice.get("amount_paid")
        }
    
    def _handle_subscription_updated(self, event: Dict) -> Dict:
        """Handle subscription update."""
        return {
            "status": "subscription_updated",
            "customer_id": event.get("data", {}).get("attributes", {}).get("customer_id")
        }
    
    def _handle_subscription_cancelled(self, subscription: Dict) -> Dict:
        """Handle subscription cancellation."""
        # TODO: Downgrade user to free tier in database
        return {
            "status": "subscription_cancelled",
            "customer_id": subscription.get("customer") or subscription.get("data", {}).get("attributes", {}).get("customer_id")
        }
    
    def _handle_order_created(self, event: Dict) -> Dict:
        """Handle order created (one-time payment)."""
        return {
            "status": "order_created",
            "customer_id": event.get("data", {}).get("attributes", {}).get("customer_id"),
            "total": event.get("data", {}).get("attributes", {}).get("total")
        }
    
    def get_plan_details(self, plan: str) -> Dict:
        """Get details for a specific pricing plan."""
        if plan not in PRICING_PLANS:
            raise HTTPException(status_code=404, detail=f"Plan not found: {plan}")
        
        return {
            "plan": plan,
            **PRICING_PLANS[plan]
        }
    
    def list_all_plans(self) -> Dict:
        """List all available pricing plans."""
        return {
            "plans": {
                plan: {
                    k: v for k, v in details.items() 
                    if k not in ["price_id", "stripe_price_id", "lemon_squeezy_variant_id"]  # Don't expose internal IDs
                }
                for plan, details in PRICING_PLANS.items()
            }
        }


# Global instance
payment_processor = PaymentProcessor()
