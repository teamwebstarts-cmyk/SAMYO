import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Lead } from './models/Lead.js';
import { Followup } from './models/Followup.js';
import { Activity } from './models/Activity.js';

dotenv.config();

async function checkDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas!\n');

    // 1. Leads
    const leads = await Lead.find().sort({ createdAt: -1 });
    console.log(`📌 LEADS COLLECTION (${leads.length} records):`);
    if (leads.length === 0) {
      console.log('   (No leads in database)');
    } else {
      console.table(leads.map(l => ({
        ID: l._id.toString(),
        Name: l.name,
        Company: l.company,
        Status: l.status,
        Priority: l.priority,
        Value: `₹${l.potentialValue || 0}`
      })));
    }

    // 2. Follow-ups
    const followups = await Followup.find().sort({ dueDate: 1 });
    console.log(`\n⏰ FOLLOWUPS COLLECTION (${followups.length} records):`);
    if (followups.length === 0) {
      console.log('   (No followups in database)');
    } else {
      console.table(followups.map(f => ({
        ID: f._id.toString(),
        Lead: f.leadName,
        Task: f.task,
        Due: f.dueLabel || f.dueDate,
        Completed: f.completed ? '✅' : '⏳'
      })));
    }

    // 3. Activities
    const activities = await Activity.find().sort({ createdAt: -1 }).limit(5);
    console.log(`\n⚡ RECENT ACTIVITIES (${activities.length} records):`);
    if (activities.length === 0) {
      console.log('   (No activities logged)');
    } else {
      activities.forEach(a => console.log(`   • [${a.type.toUpperCase()}] ${a.text} (${a.time})`));
    }

  } catch (error) {
    console.error('❌ Error checking MongoDB:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from database.');
    process.exit(0);
  }
}

checkDatabase();
