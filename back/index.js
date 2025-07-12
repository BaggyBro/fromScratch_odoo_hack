// index.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json()); 

const authRoutes = require('./routes.js')
app.use('/', authRoutes)

// test-db.js
const prisma_client = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to the database successfully.");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
