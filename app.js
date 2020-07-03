var express = require("express");
var Sentry = require("@sentry/node");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var dotenv = require("dotenv");
var passport = require("passport");
var Auth0Strategy = require("passport-auth0");
var flash = require("connect-flash");
var AWS = require("aws-sdk");
var userInViews = require("./lib/middleware/userInViews");
var authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

dotenv.config();
Sentry.init({
  dsn:
    "https://e7746484c4964a5ea536eea5f605f5d4@o406461.ingest.sentry.io/5273967"
});

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/callback"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(cookieParser());

// config express-session
var sess = {
  secret: "sarthak",
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get("env") === "production") {
  // If you are using a hosting provider which uses a proxy (eg. Heroku),
  // comment in the following app.set configuration command
  //
  // Trust first proxy, to prevent "Unable to verify authorization request state."
  // errors with passport-auth0.
  // Ref: https://github.com/auth0/passport-auth0/issues/70#issuecomment-480771614
  // Ref: https://www.npmjs.com/package/express-session#cookiesecure
  app.set("trust proxy", 1);

  sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use(flash());

// Handle auth failure error messages
app.use(function(req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash("error", req.query.error);
  }
  if (req && req.query && req.query.error_description) {
    req.flash("error_description", req.query.error_description);
  }
  next();
});

app.use(userInViews());
app.use("/", authRouter);
app.use("/", indexRouter);
app.use("/", usersRouter);

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.errorHandler());

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
  res.end(res.sentry + "\n");
});

// Error handlers

// Development error handler
// Will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
    res.end(res.sentry + "\n");
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
  res.end(res.sentry + "\n");
});

const { resolve } = require('path');
const bodyParser = require('body-parser');

if (
  !process.env.STRIPE_SECRET_KEY ||
  !process.env.STRIPE_PUBLISHABLE_KEY ||
  !process.env.BASIC ||
  !process.env.PREMIUM ||
  !process.env.STATIC_DIR
) {
  console.log(
    'The .env file is not configured. Follow the instructions in the readme to configure the .env file. https://github.com/stripe-samples/subscription-use-cases'
  );
  console.log('');
  process.env.STRIPE_SECRET_KEY
    ? ''
    : console.log('Add STRIPE_SECRET_KEY to your .env file.');

  process.env.STRIPE_PUBLISHABLE_KEY
    ? ''
    : console.log('Add STRIPE_PUBLISHABLE_KEY to your .env file.');

  process.env.BASIC
    ? ''
    : console.log(
        'Add BASIC priceID to your .env file. See repo readme for setup instructions.'
      );

  process.env.STRIPE_SECRET_KEY
    ? ''
    : console.log(
        'Add PREMIUM priceID to your .env file. See repo readme for setup instructions.'
      );

  process.env.STATIC_DIR
    ? ''
    : console.log(
        'Add STATIC_DIR to your .env file. Check .env.example in the root folder for an example'
      );

  process.exit();
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.static(process.env.STATIC_DIR));
// Use JSON parser for all non-webhook routes.
app.use((req, res, next) => {
  if (req.originalUrl === '/stripe-webhook') {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

app.get('/config', async (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post('/create-customer', async (req, res) => {
  // Create a new customer object
  const customer = await stripe.customers.create({
    email: req.body.email,
  });

  // save the customer.id as stripeCustomerId
  // in your database.

  res.send({ customer });
});

app.post('/create-subscription', async (req, res) => {
  // Set the default payment method on the customer
  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
  } catch (error) {
    return res.status('402').send({ error: { message: error.message } });
  }

  let updateCustomerDefaultPaymentMethod = await stripe.customers.update(
    req.body.customerId,
    {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    }
  );

  // Create the subscription
  const subscription = await stripe.subscriptions.create({
    customer: req.body.customerId,
    items: [{ price: process.env[req.body.priceId] }],
    expand: ['latest_invoice.payment_intent'],
  });

  res.send(subscription);
});

app.post('/retry-invoice', async (req, res) => {
  // Set the default payment method on the customer

  try {
    await stripe.paymentMethods.attach(req.body.paymentMethodId, {
      customer: req.body.customerId,
    });
    await stripe.customers.update(req.body.customerId, {
      invoice_settings: {
        default_payment_method: req.body.paymentMethodId,
      },
    });
  } catch (error) {
    // in case card_decline error
    return res
      .status('402')
      .send({ result: { error: { message: error.message } } });
  }

  const invoice = await stripe.invoices.retrieve(req.body.invoiceId, {
    expand: ['payment_intent'],
  });
  res.send(invoice);
});

app.post('/retrieve-upcoming-invoice', async (req, res) => {
  const subscription = await stripe.subscriptions.retrieve(
    req.body.subscriptionId
  );

  const invoice = await stripe.invoices.retrieveUpcoming({
    subscription_prorate: true,
    customer: req.body.customerId,
    subscription: req.body.subscriptionId,
    subscription_items: [
      {
        id: subscription.items.data[0].id,
        deleted: true,
      },
      {
        price: process.env[req.body.newPriceId],
        deleted: false,
      },
    ],
  });
  res.send(invoice);
});

app.post('/cancel-subscription', async (req, res) => {
  // Delete the subscription
  const deletedSubscription = await stripe.subscriptions.del(
    req.body.subscriptionId
  );
  res.send(deletedSubscription);
});

app.post('/update-subscription', async (req, res) => {
  const subscription = await stripe.subscriptions.retrieve(
    req.body.subscriptionId
  );
  const updatedSubscription = await stripe.subscriptions.update(
    req.body.subscriptionId,
    {
      cancel_at_period_end: false,
      items: [
        {
          id: subscription.items.data[0].id,
          price: process.env[req.body.newPriceId],
        },
      ],
    }
  );

  res.send(updatedSubscription);
});

app.post('/retrieve-customer-payment-method', async (req, res) => {
  const paymentMethod = await stripe.paymentMethods.retrieve(
    req.body.paymentMethodId
  );

  res.send(paymentMethod);
});
// Webhook handler for asynchronous events.
app.post(
  '/stripe-webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(
        `⚠️  Check the env file and enter the correct webhook secret.`
      );
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    const dataObject = event.data.object;

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    switch (event.type) {
      case 'invoice.paid':
        // Used to provision services after the trial has ended.
        // The status of the invoice will show up as paid. Store the status in your
        // database to reference when a user accesses your service to avoid hitting rate limits.
        break;
      case 'invoice.payment_failed':
        // If the payment fails or the customer does not have a valid payment method,
        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        break;
      case 'invoice.finalized':
        // If you want to manually send out invoices to your customers
        // or store them locally to reference to avoid hitting Stripe rate limits.
        break;
      case 'customer.subscription.deleted':
        if (event.request != null) {
          // handle a subscription cancelled by your request
          // from above.
        } else {
          // handle subscription cancelled automatically based
          // upon your subscription settings.
        }
        break;
      case 'customer.subscription.trial_will_end':
        // Send notification to your user that the trial will end
        break;
      default:
      // Unexpected event type
    }
    res.sendStatus(200);
  }
);

module.exports = app;
