import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import leadRoutes from './routes/leads.js';
import followupRoutes from './routes/followups.js';
import activityRoutes from './routes/activities.js';
import { User } from './models/User.js';
import { Lead } from './models/Lead.js';

dotenv.config();

const PORT = 5099;
const BASE_URL = `http://127.0.0.1:${PORT}/api`;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/followups', followupRoutes);
app.use('/api/activities', activityRoutes);

let server;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    throw new Error(message);
  }
}

async function runTests() {
  console.log('--- STARTING SAMYO CRM AUTH & ISOLATION TEST SUITE ---\n');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✓ Connected to MongoDB Atlas');

  server = app.listen(PORT, () => {
    console.log(`✓ Test Express server running on port ${PORT}\n`);
  });

  const timestamp = Date.now();
  const userAEmail = `test_user_a_${timestamp}@test.com`;
  const userBEmail = `test_user_b_${timestamp}@test.com`;
  const passwordA = 'securePassA123!';
  const passwordB = 'securePassB456!';

  let tokenA, tokenB, userAId, userBId, leadAId, leadBId;

  try {
    // ==========================================
    // TEST CASE A: Registration
    // ==========================================
    console.log('▶ [TEST CASE A] Registration of User A');
    const regResA = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice Wonder',
        email: userAEmail,
        password: passwordA,
        role: 'Sales Representative'
      })
    });
    const regDataA = await regResA.json();
    assert(regResA.status === 201, `Expected status 201, got ${regResA.status}: ${JSON.stringify(regDataA)}`);
    assert(regDataA.token, 'Token must be returned');
    assert(regDataA.user, 'User object must be returned');
    assert(regDataA.user.email === userAEmail, 'User email matches');
    assert(!regDataA.user.password, 'Password must NOT be exposed in response');
    assert(!regDataA.user.passwordHash, 'Password hash must NOT be exposed in response');

    const dbUserA = await User.findOne({ email: userAEmail });
    assert(dbUserA, 'User A document must exist in MongoDB');
    assert(dbUserA.password !== passwordA, 'Password in MongoDB must be hashed');
    assert(dbUserA.password.startsWith('$2'), 'Password hash must be bcrypt');
    userAId = dbUserA._id.toString();
    tokenA = regDataA.token;
    console.log('✓ TEST CASE A PASSED: Registration creates user with hashed password and returns JWT & safe user.\n');

    // ==========================================
    // TEST CASE B: Duplicate Registration
    // ==========================================
    console.log('▶ [TEST CASE B] Duplicate Registration Rejection');
    const dupRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Alice Duplicate',
        email: userAEmail,
        password: 'anotherPassword123'
      })
    });
    assert(dupRes.status === 409 || dupRes.status === 400, `Expected 409/400 for duplicate email, got ${dupRes.status}`);
    console.log('✓ TEST CASE B PASSED: Duplicate registration cleanly rejected.\n');

    // ==========================================
    // TEST CASE C: Correct Login
    // ==========================================
    console.log('▶ [TEST CASE C] Correct Login');
    const loginResA = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userAEmail,
        password: passwordA
      })
    });
    const loginDataA = await loginResA.json();
    assert(loginResA.status === 200, `Expected 200, got ${loginResA.status}`);
    assert(loginDataA.token, 'Token returned on login');
    assert(loginDataA.user.name === 'Alice Wonder', 'Correct user name returned');
    assert(!loginDataA.user.password, 'Password not exposed on login');
    console.log('✓ TEST CASE C PASSED: Valid credentials return JWT and authenticated user info.\n');

    // ==========================================
    // TEST CASE D: Wrong Password & Universal Password Rejection
    // ==========================================
    console.log('▶ [TEST CASE D] Wrong Password and Universal Password Bypass Rejection');
    const wrongPassRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userAEmail,
        password: 'completelyWrongPassword!'
      })
    });
    assert(wrongPassRes.status === 401, `Expected 401 for wrong password, got ${wrongPassRes.status}`);

    const universalPassRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userAEmail,
        password: 'password'
      })
    });
    assert(universalPassRes.status === 401, `Expected 401 for universal 'password' attempt, got ${universalPassRes.status}`);
    console.log('✓ TEST CASE D PASSED: Invalid and universal "password" attempts rejected with 401.\n');

    // ==========================================
    // TEST CASE E: Unknown Email
    // ==========================================
    console.log('▶ [TEST CASE E] Unknown Email Rejection');
    const unknownRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `non_existent_${timestamp}@test.com`,
        password: 'somePassword123'
      })
    });
    assert(unknownRes.status === 401, `Expected 401 for non-existent email, got ${unknownRes.status}`);
    console.log('✓ TEST CASE E PASSED: Unknown email rejected with 401.\n');

    // ==========================================
    // TEST CASE F: Unauthenticated / Invalid Token Rejection
    // ==========================================
    console.log('▶ [TEST CASE F] Route Protection (No Token & Forged Token)');
    const noTokenRes = await fetch(`${BASE_URL}/leads`);
    assert(noTokenRes.status === 401, `Expected 401 when accessing /leads with no token, got ${noTokenRes.status}`);

    const badTokenRes = await fetch(`${BASE_URL}/leads`, {
      headers: { 'Authorization': 'Bearer forged.invalid.token' }
    });
    assert(badTokenRes.status === 401, `Expected 401 with forged token, got ${badTokenRes.status}`);
    console.log('✓ TEST CASE F PASSED: Unauthenticated and invalid token requests return HTTP 401.\n');

    // ==========================================
    // TEST CASE G: /api/auth/me Verification
    // ==========================================
    console.log('▶ [TEST CASE G] Session Validation via /api/auth/me');
    const meResA = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    const meDataA = await meResA.json();
    assert(meResA.status === 200, `Expected 200 from /auth/me, got ${meResA.status}`);
    assert(meDataA.user.id === userAId, 'User ID matches decoded token');
    assert(meDataA.user.email === userAEmail, 'Email matches');
    assert(!meDataA.user.password, 'Password not returned by /auth/me');
    console.log('✓ TEST CASE G PASSED: /api/auth/me successfully verifies JWT and rehydrates user.\n');

    // ==========================================
    // TEST CASE J: Multi-User CRM Data Isolation
    // ==========================================
    console.log('▶ [TEST CASE J] Multi-User CRM Data Isolation (User A vs User B)');

    // 1. Register User B
    const regResB = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Bob Builder',
        email: userBEmail,
        password: passwordB,
        role: 'Fullstack Dev'
      })
    });
    const regDataB = await regResB.json();
    assert(regResB.status === 201, `User B registration failed: ${regResB.status}`);
    tokenB = regDataB.token;
    userBId = regDataB.user.id;

    // 2. User A creates Lead A
    const leadCreateResA = await fetch(`${BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({
        name: 'Lead Alpha (Private to User A)',
        company: 'Alpha Corp',
        priority: 'high',
        status: 'new'
      })
    });
    const leadA = await leadCreateResA.json();
    assert(leadCreateResA.status === 201, `User A lead creation failed: ${leadCreateResA.status}`);
    assert(leadA.ownerId === userAId, 'Lead A ownerId must match User A ID');
    leadAId = leadA._id || leadA.id;

    // 3. User B creates Lead B
    const leadCreateResB = await fetch(`${BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenB}`
      },
      body: JSON.stringify({
        name: 'Lead Beta (Private to User B)',
        company: 'Beta Corp',
        priority: 'medium',
        status: 'new'
      })
    });
    const leadB = await leadCreateResB.json();
    assert(leadCreateResB.status === 201, `User B lead creation failed: ${leadCreateResB.status}`);
    assert(leadB.ownerId === userBId, 'Lead B ownerId must match User B ID');
    leadBId = leadB._id || leadB.id;

    // 4. User A fetches leads -> should see Lead A, NOT Lead B
    const userALeadsRes = await fetch(`${BASE_URL}/leads`, {
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    const userALeads = await userALeadsRes.json();
    assert(userALeads.some(l => (l._id || l.id) === leadAId), 'User A must see Lead A');
    assert(!userALeads.some(l => (l._id || l.id) === leadBId), 'User A must NOT see Lead B');

    // 5. User B fetches leads -> should see Lead B, NOT Lead A
    const userBLeadsRes = await fetch(`${BASE_URL}/leads`, {
      headers: { 'Authorization': `Bearer ${tokenB}` }
    });
    const userBLeads = await userBLeadsRes.json();
    assert(userBLeads.some(l => (l._id || l.id) === leadBId), 'User B must see Lead B');
    assert(!userBLeads.some(l => (l._id || l.id) === leadAId), 'User B must NOT see Lead A');

    // 6. User B tries to GET Lead A by ID -> must return 404
    const userBTamperGet = await fetch(`${BASE_URL}/leads/${leadAId}`, {
      headers: { 'Authorization': `Bearer ${tokenB}` }
    });
    assert(userBTamperGet.status === 404, `User B accessing Lead A by ID must be 404, got ${userBTamperGet.status}`);

    // 7. User B tries to PUT (update) Lead A -> must return 404
    const userBTamperPut = await fetch(`${BASE_URL}/leads/${leadAId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenB}`
      },
      body: JSON.stringify({ name: 'Hacked by User B' })
    });
    assert(userBTamperPut.status === 404, `User B updating Lead A must be 404, got ${userBTamperPut.status}`);

    // 8. User B tries to add a note to Lead A -> must return 404
    const userBTamperNote = await fetch(`${BASE_URL}/leads/${leadAId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenB}`
      },
      body: JSON.stringify({ text: 'Injected note' })
    });
    assert(userBTamperNote.status === 404, `User B adding note to Lead A must be 404, got ${userBTamperNote.status}`);

    // 9. User B tries to DELETE Lead A -> must return 404
    const userBTamperDelete = await fetch(`${BASE_URL}/leads/${leadAId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${tokenB}` }
    });
    assert(userBTamperDelete.status === 404, `User B deleting Lead A must be 404, got ${userBTamperDelete.status}`);

    // 10. User A can successfully update and delete Lead A
    const userAUpdate = await fetch(`${BASE_URL}/leads/${leadAId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenA}`
      },
      body: JSON.stringify({ designation: 'Verified CEO' })
    });
    assert(userAUpdate.status === 200, `User A updating Lead A should be 200, got ${userAUpdate.status}`);

    const userADelete = await fetch(`${BASE_URL}/leads/${leadAId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${tokenA}` }
    });
    assert(userADelete.status === 200, `User A deleting Lead A should be 200, got ${userADelete.status}`);

    console.log('✓ TEST CASE J PASSED: Strict multi-user data isolation enforced. User B cannot see, edit, note, or delete User A leads!\n');

    console.log('🎉 ALL INTEGRATION TESTS PASSED SUCCESSFULLY! 🎉');

  } finally {
    // Clean up test data
    console.log('Cleaning up test data...');
    if (leadAId) await Lead.findByIdAndDelete(leadAId).catch(() => {});
    if (leadBId) await Lead.findByIdAndDelete(leadBId).catch(() => {});
    if (userAId) await User.findByIdAndDelete(userAId).catch(() => {});
    if (userBId) await User.findByIdAndDelete(userBId).catch(() => {});

    await mongoose.disconnect();
    if (server) server.close();
    console.log('Cleaned up and disconnected.');
  }
}

runTests().catch(err => {
  console.error('\n❌ TEST SUITE FAILED:', err);
  process.exit(1);
});
