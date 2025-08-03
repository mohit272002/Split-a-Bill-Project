const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let friends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const tokenBuckets = {};

const RATE_LIMIT = {
  capacity: 5, // Max tokens per bucket
  refillRate: 1, // Tokens added per interval
  refillInterval: 10000, // 10 seconds
};

// Middleware: Token Bucket Rate Limiting
function tokenBucketLimiter(req, res, next) {
  const ip = req.ip;

  const now = Date.now();

  // Initialize bucket if not present
  if (!tokenBuckets[ip]) {
    tokenBuckets[ip] = {
      tokens: RATE_LIMIT.capacity,
      lastRefill: now,
    };
  }

  const bucket = tokenBuckets[ip];

  // Calculate time since last refill
  const timeElapsed = now - bucket.lastRefill;

  // Refill tokens based on elapsed time
  const tokensToAdd = Math.floor(timeElapsed / RATE_LIMIT.refillInterval);
  if (tokensToAdd > 0) {
    bucket.tokens = Math.min(bucket.tokens + tokensToAdd, RATE_LIMIT.capacity);
    bucket.lastRefill = now;
  }

  // Check if there are enough tokens
  if (bucket.tokens > 0) {
    bucket.tokens--;
    next(); // Allow the request
  } else {
    res
      .status(429)
      .json({ error: "Too many requests. Please try again later." });
  }
}

// Apply rate limiter to all routes
app.use(tokenBucketLimiter);

app.get("/api/friends", (req, res) => {
  res.json(friends);
});

app.post("/api/friends", (req, res) => {
  const newFriend = req.body;
  friends.push(newFriend);
  res.status(201).json(newFriend);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Eat-N-Split API!");
});

app.listen(5000, () => console.log("Server running on port 5000"));
