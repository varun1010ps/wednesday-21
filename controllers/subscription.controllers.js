const key = require("../config/key");
const User = require("../models/user.models");
const Sub = require("../models/subscription.models");
const moment = require("moment");
const stripe = require("stripe")(key.stripeSecretkey);

const webhookSecret = "whsec_sWbzSGKUcWo9FgQs0wkl2yzaEwXWIdvR";

const YOUR_DOMAIN = "http://localhost:3000/checkout";

exports.CheckSessions = async (req, res) => {
  const { userId } = req.body;
  const planType = "montly";
  if (planType == "montly") {
    const planId = "price_1JAjCEGFy9bXfzIU6HYm0fyV";
    try {
      const _user = await User.findById(userId);
      if (!_user)
        return res.status(401).json({
          message: "invalid user.",
        });
      const session = await stripe.checkout.sessions.create({
        customer: _user.stripeCustId,
        payment_method_types: ["card"],
        mode: "subscription",
        subscription_data: {
          items: [{ plan: `${planId}` }],
          trial_period_days: 30,
        },
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/canceled`,
      });
      res.redirect(303, session.url);
      console.log(session);
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
  if (planType == "annual") {
    try {
      const _user = await User.findById(userId);
      if (!_user)
        return res.status(401).json({
          message: "invalid user.",
        });
      const session = await stripe.checkout.sessions.create({
        customer: _user.stripeCustId,
        payment_method_types: ["card"],
        mode: "subscription",
        subscription_data: {
          items: [{ plan: `${planId}` }],
          trial_period_days: 30,
        },
        success_url: `${YOUR_DOMAIN}/success`,
        cancel_url: `${YOUR_DOMAIN}/canceled`,
      });
      res.redirect(303, session.url);
      console.log(session);
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
};
exports.billingSessions = async (req, res) => {
  const { userId } = req.body;
  try {
    const _user = await User.findById(userId);
    if (!_user)
      return res.status(401).json({
        message: "invalid user.",
      });
    const session = await stripe.billingPortal.sessions.create({
      customer: _user.stripeCustId,
      return_url: "https://example.com/account",
    });
    res.redirect(session.url);
    console.log(session);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};
exports.annualCheckSessions = async (req, res) => {
  const planId = "price_1JAjVOGFy9bXfzIUq7ySnwy4";
  const { userId } = req.body;
  try {
    const _user = await User.findById(userId);
    if (!_user)
      return res.status(401).json({
        message: "invalid user.",
      });
    const session = await stripe.checkout.sessions.create({
      customer: _user.stripeCustId,
      payment_method_types: ["card"],
      mode: "subscription",
      subscription_data: {
        items: [{ plan: `${planId}` }],
        trial_period_days: 30,
      },
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/canceled`,
    });
    res.redirect(303, session.url);
    console.log(session);
  } catch (e) {
    res.status(400).json({ message: e });
  }
};

exports.createSubscription = async (req, res) => {
  const { userId, paymentMethod, planId } = req.body;
  const _userId = await User.findById(userId);

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:5080",
      cancel_url: "http://localhost:5080",
      payment_method_types: ["card"],

      customer: customer.id,

      mode: "subscription",
      subscription_data: {
        items: [{ plan: `${planId}` }],
        trial_period_days: 30,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: `${planId}` }],
      trial_period_days: 30,
      off_session: true,
      enable_incomplete_payments: false,
      expand: ["latest_invoice.payment_intent"],
    });

    const sub = new Sub({
      userId: _userId._id,
      stipeSubId: subscription.id,
      stipeCustId: customer.id,
      subStart: new Date(subscription["start_date"] * 1000),
      trialEnd: new Date(subscription["trial_end"] * 1000),
      subType: subscription.plan.nickname,
      status: subscription.status,
    });
    const newSub = await sub.save();
    res.status(200).json({
      sub: newSub,
      subscription: subscription,
      session: session,
      customer: customer,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
};

exports.deleteSub = async (req, res) => {
  const { subId } = req.body;
  const _subId = await Sub.findById(subId);
  try {
    const sub = _subId.stipeSubId;
    console.log(_subId);
    console.log(sub);
    const deleted = await stripe.subscriptions.del(sub);
    const updates = {
      subCancel: new Date(deleted.canceled_at * 1000),
      subEnd: new Date(deleted.ended_at * 1000),
      status: deleted.status,
    };
    const options = { new: true };
    const findsub = await Sub.findByIdAndUpdate(_subId.id, updates, options);
    res.status(200).json({
      sub: findsub,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
};

exports.webhook_sub = async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    console.log(signature);
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.jsonStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  console.log(data);
  switch (eventType) {
    case "checkout.session.completed":
      console.log(`🔔  Payment received!`);

      try {
        const email = data.object.customer_details.email;
        console.log(email);
        const _user = await User.findOne({ email });
        if (!_user)
          return res.status(401).json({
            message: "invalid user.",
          });
        console.log(_user._id);
        const subscription = await stripe.subscriptions.retrieve(
          data.object.subscription
        );
        console.log(subscription);
        const sub = new Sub({
          userId: _user._id,
          stipeSubId: subscription.id,
          stipeCustId: data.object.customer,
          subStart: new Date(subscription.start_date * 1000),
          trialEnd: new Date(subscription.trial_end * 1000),
          subType: subscription.plan.nickname,
          status: subscription.status,
        });

        const newSub = await sub.save();
        console.log(newSub);
      } catch (e) {
        res.status(400).json({ message: e });
      }

      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      break;
    case "customer.subscription.trial_will_end":
      console.log(`🔔  teial end`);
      break;
    case "customer.subscription.updated":
      console.log(`🔔  sub updated`);
      break;
    case "customer.subscription.deleted":
      console.log("sub del");
      break;
    case "invoice.paid":
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      break;
    case "invoice.payment_failed":
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      break;
    default:
    // Unhandled event type
  }

  res.status(200).json({ received: true });
};
