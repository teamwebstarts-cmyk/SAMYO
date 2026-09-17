const BASE_URL = 'http://127.0.0.1:5000/api';

async function runRBACTests() {
  console.log('--- Starting TechCRM RBAC & Auth Verification Suite ---');

  // 1. Register a test viewer user
  const uniqueEmail = `viewer_${Date.now()}@example.com`;
  console.log(`\n1. Registering new viewer user: ${uniqueEmail}`);
  const regRes = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Rohan Sharma',
      email: uniqueEmail,
      password: 'viewerPassword123'
    })
  });
  const regData = await regRes.json();
  console.log(`Status: ${regRes.status}`);
  console.log('User Role:', regData.user?.accessRole, '| isAdmin:', regData.user?.isAdmin);
  if (regRes.status !== 201 || regData.user?.isAdmin !== false || regData.user?.accessRole !== 'viewer') {
    throw new Error('Registration failed to create viewer user with restricted permissions');
  }
  const viewerToken = regData.token;

  // 2. Test Viewer Read Access: GET /api/leads
  console.log('\n2. Testing Viewer Read Access: GET /api/leads');
  const getLeadsRes = await fetch(`${BASE_URL}/leads`, {
    headers: { 'Authorization': `Bearer ${viewerToken}` }
  });
  const leads = await getLeadsRes.json();
  console.log(`Status: ${getLeadsRes.status}, Total leads retrieved: ${leads.length}`);
  if (getLeadsRes.status !== 200 || !Array.isArray(leads)) {
    throw new Error('Viewer failed to read leads');
  }

  // 3. Test Viewer Write Restriction: POST /api/leads (Should return 403 Forbidden)
  console.log('\n3. Testing Viewer Write Restriction: POST /api/leads');
  const createLeadRes = await fetch(`${BASE_URL}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${viewerToken}`
    },
    body: JSON.stringify({
      name: 'Unauthorized Viewer Lead',
      company: 'Test Co'
    })
  });
  const createLeadData = await createLeadRes.json();
  console.log(`Status: ${createLeadRes.status}, Message:`, createLeadData.message);
  if (createLeadRes.status !== 403) {
    throw new Error(`Expected 403 Forbidden for viewer write attempt, but got ${createLeadRes.status}`);
  }

  // 3b. Test Viewer Update Restriction: PUT /api/leads/:id (Should return 403 Forbidden)
  if (leads.length > 0) {
    const targetLeadId = leads[0]._id;
    console.log(`\n3b. Testing Viewer Edit Restriction: PUT /api/leads/${targetLeadId}`);
    const putRes = await fetch(`${BASE_URL}/leads/${targetLeadId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${viewerToken}`
      },
      body: JSON.stringify({ name: 'Hacked Name' })
    });
    console.log(`Status: ${putRes.status}`);
    if (putRes.status !== 403) throw new Error('Viewer was able to call PUT /api/leads/:id');

    // 3c. Test Viewer Status Update Restriction: PATCH /api/leads/:id/status
    console.log(`\n3c. Testing Viewer Stage Move Restriction: PATCH /api/leads/${targetLeadId}/status`);
    const patchRes = await fetch(`${BASE_URL}/leads/${targetLeadId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${viewerToken}`
      },
      body: JSON.stringify({ status: 'won' })
    });
    console.log(`Status: ${patchRes.status}`);
    if (patchRes.status !== 403) throw new Error('Viewer was able to call PATCH /api/leads/:id/status');

    // 3d. Test Viewer Add Note Restriction: POST /api/leads/:id/notes
    console.log(`\n3d. Testing Viewer Note Creation Restriction: POST /api/leads/${targetLeadId}/notes`);
    const noteRes = await fetch(`${BASE_URL}/leads/${targetLeadId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${viewerToken}`
      },
      body: JSON.stringify({ text: 'Unauthorized note' })
    });
    console.log(`Status: ${noteRes.status}`);
    if (noteRes.status !== 403) throw new Error('Viewer was able to call POST /api/leads/:id/notes');

    // 3e. Test Viewer Delete Restriction: DELETE /api/leads/:id
    console.log(`\n3e. Testing Viewer Lead Deletion Restriction: DELETE /api/leads/${targetLeadId}`);
    const deleteRes = await fetch(`${BASE_URL}/leads/${targetLeadId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${viewerToken}` }
    });
    console.log(`Status: ${deleteRes.status}`);
    if (deleteRes.status !== 403) throw new Error('Viewer was able to call DELETE /api/leads/:id');
  }

  // 4. Test Viewer Followup Restriction: POST /api/followups (Should return 403 Forbidden)
  console.log('\n4. Testing Viewer Followup Restriction: POST /api/followups');
  const createFollowupRes = await fetch(`${BASE_URL}/followups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${viewerToken}`
    },
    body: JSON.stringify({
      leadName: 'Test Lead',
      task: 'Unauthorized Followup'
    })
  });
  const createFollowupData = await createFollowupRes.json();
  console.log(`Status: ${createFollowupRes.status}, Message:`, createFollowupData.message);
  if (createFollowupRes.status !== 403) {
    throw new Error(`Expected 403 Forbidden for viewer followup attempt, but got ${createFollowupRes.status}`);
  }

  // 5. Test Admin Login: neha.jain@techcrm.io
  console.log('\n5. Logging in as Administrator (neha.jain@techcrm.io)');
  const adminLoginRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'neha.jain@techcrm.io',
      password: 'password'
    })
  });
  const adminData = await adminLoginRes.json();
  console.log(`Status: ${adminLoginRes.status}`);
  console.log('Admin Role:', adminData.user?.accessRole, '| isAdmin:', adminData.user?.isAdmin);
  if (adminLoginRes.status !== 200 || adminData.user?.isAdmin !== true) {
    throw new Error('Admin login failed or user is not admin');
  }
  const adminToken = adminData.token;

  // 6. Test Admin Write Access: POST /api/leads
  console.log('\n6. Testing Admin Write Access: POST /api/leads');
  const adminCreateRes = await fetch(`${BASE_URL}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`
    },
    body: JSON.stringify({
      name: 'Admin RBAC Verification Lead',
      company: 'Enterprise Systems Ltd',
      status: 'new',
      priority: 'high',
      potentialValue: 180000
    })
  });
  const adminCreatedLead = await adminCreateRes.json();
  console.log(`Status: ${adminCreateRes.status}, Lead ID:`, adminCreatedLead._id);
  if (adminCreateRes.status !== 201 || !adminCreatedLead._id) {
    throw new Error('Admin failed to create lead');
  }

  // 7. Test Admin Cleanup: DELETE /api/leads/:id
  console.log(`\n7. Cleaning up test lead: DELETE /api/leads/${adminCreatedLead._id}`);
  const adminDeleteRes = await fetch(`${BASE_URL}/leads/${adminCreatedLead._id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  console.log(`Status: ${adminDeleteRes.status}`);
  if (adminDeleteRes.status !== 200) {
    throw new Error('Admin failed to delete lead');
  }

  console.log('\n=========================================');
  console.log('🎉 ALL RBAC & AUTHENTICATION TESTS PASSED!');
  console.log('=========================================');
}

runRBACTests().catch(err => {
  console.error('\n❌ Test failed:', err.message);
  process.exit(1);
});
