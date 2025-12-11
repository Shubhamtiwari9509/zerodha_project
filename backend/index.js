require('dotenv').config();
const express = require("express");
const { holding } = require("./model/holdingsModel");
const { position } = require("./model/positionModel");
const { order } = require("./model/orderModel");
const { default: mongoose } = require('mongoose');
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./schemas/user");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
const url = process.env.MONGO_URL;

const FRONTEND_URL = process.env.FRONTEND_URL;
const DASHBOARD_URL = process.env.DASHBOARD_URL;
const BACKEND_URL = process.env.BACKEND_URL;

//  CORS setup with env URLs
app.use(cors({
  origin: [FRONTEND_URL, DASHBOARD_URL],
  credentials: true
}));

app.use(bodyParser.json());

//  Session config (dev vs prod)
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
  maxAge: 7 * 24 * 60 * 60 * 1000, 
  sameSite: 'lax',                   
  secure: true                
}
}));

//  Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  Routes
app.get("/signup", (req, res) => {
  res.redirect(`${FRONTEND_URL}/signup`);
});

app.post("/signup", async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    const newUser = new User({ email, username });
    await User.register(newUser, password);
    req.login(newUser, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: 'Signup & login successful!', user: newUser });
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/login", (req, res) => {
  res.redirect(`${FRONTEND_URL}/login`);
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

app.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});

//  Example data routes
app.get("/allholdings", async (req, res) => {
  let holdings = await holding.find({});
  res.json(holdings);
});

app.get("/allpositions", async (req, res) => {
  let allpositions = await position.find({});
  res.json(allpositions);
});

app.post("/newOrder", async (req, res) => {
  const newOrder = new order({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  await newOrder.save();
  res.send("order saved!");
});

//  Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  mongoose.connect(url);
  console.log("DB connected!");
});