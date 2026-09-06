(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}})();const m={LEADS:"techcrm_leads",FOLLOWUPS:"techcrm_followups",ACTIVITIES:"techcrm_activities",COMPANIES:"techcrm_companies",NOTIFICATIONS:"techcrm_notifications",USER:"techcrm_user",PIPELINE_STAGES:"techcrm_pipeline_stages"},P=[{id:"new",name:"New Leads",color:"#64748B"},{id:"request_sent",name:"Request Sent",color:"#F59E0B"},{id:"connected",name:"Connected",color:"#6366F1"},{id:"qualified",name:"Qualified",color:"#8B5CF6"},{id:"proposal",name:"Proposal Sent",color:"#0284C7"},{id:"won",name:"Won",color:"#16A34A"}],D={name:"Neha Jain",email:"neha.jain@techcrm.io",role:"Web Developer / Outreach Specialist",avatar:"NJ"},N=[{id:"lead-1",name:"Rahul Sharma",company:"ABC Technologies",designation:"Founder & CEO",linkedinUrl:"https://linkedin.com/in/rahul-sharma-abctech",companyWebsite:"https://abctechnologies.io",industry:"SaaS",location:"Jaipur, India",requirements:["Website","Mobile App"],priority:"high",status:"connected",potentialValue:1e5,addedDate:"2026-09-04T09:30:00.000Z",notes:[{id:"n1",text:"Interested in redesigning company website and building MVP mobile app.",createdAt:"2026-09-05T10:15:00.000Z",author:"Neha Jain"}],activities:[{id:"a1",title:"Connected on LinkedIn",time:"10 min ago",date:"2026-09-06T10:45:00.000Z"},{id:"a2",title:"Connection Request Sent",time:"Sep 3",date:"2026-09-03T11:00:00.000Z"},{id:"a3",title:"Lead Added via LinkedIn Prospecting",time:"Sep 2",date:"2026-09-02T09:30:00.000Z"}]},{id:"lead-2",name:"Priya Sharma",company:"ABC Technologies",designation:"CTO",linkedinUrl:"https://linkedin.com/in/priya-sharma-cto",companyWebsite:"https://abctechnologies.io",industry:"SaaS",location:"Jaipur, India",requirements:["AI/ML","Website"],priority:"high",status:"connected",potentialValue:15e4,addedDate:"2026-09-04T10:00:00.000Z",notes:[{id:"n2",text:"Wants to explore integrating AI chatbot into their customer onboarding flow.",createdAt:"2026-09-05T14:20:00.000Z",author:"Neha Jain"}],activities:[{id:"a4",title:"Accepted LinkedIn connection",time:"2 hours ago",date:"2026-09-06T09:00:00.000Z"},{id:"a5",title:"Outreach request sent",time:"Sep 4",date:"2026-09-04T10:15:00.000Z"}]},{id:"lead-3",name:"Aman Verma",company:"XYZ Pvt Ltd",designation:"Founder & CEO",linkedinUrl:"https://linkedin.com/in/aman-verma-xyz",companyWebsite:"https://xyzfintech.in",industry:"FinTech",location:"Bengaluru, India",requirements:["Mobile App","Software"],priority:"medium",status:"proposal",potentialValue:25e4,addedDate:"2026-09-03T14:10:00.000Z",notes:[{id:"n3",text:"Sent formal proposal for custom iOS & Android payment gateway integration app.",createdAt:"2026-09-05T16:00:00.000Z",author:"Neha Jain"}],activities:[{id:"a6",title:"Moved to Proposal Sent",time:"Yesterday",date:"2026-09-05T16:05:00.000Z"},{id:"a7",title:"Scope discovery call completed",time:"Sep 4",date:"2026-09-04T12:00:00.000Z"}]},{id:"lead-4",name:"Karan Mehra",company:"TechCorp Solutions",designation:"VP of Product",linkedinUrl:"https://linkedin.com/in/karan-mehra-techcorp",companyWebsite:"https://techcorp.co",industry:"EdTech",location:"Mumbai, India",requirements:["Website","UI/UX"],priority:"high",status:"qualified",potentialValue:18e4,addedDate:"2026-09-03T11:00:00.000Z",notes:[{id:"n4",text:"Needs modern student learning portal redesign with sleek UI/UX.",createdAt:"2026-09-04T11:30:00.000Z",author:"Neha Jain"}],activities:[{id:"a8",title:"Lead qualified during 20m intro chat",time:"Sep 4",date:"2026-09-04T15:00:00.000Z"}]},{id:"lead-5",name:"Vikram Aditya",company:"Innovate Labs",designation:"Chief Executive Officer",linkedinUrl:"https://linkedin.com/in/vikram-innovate",companyWebsite:"https://innovatelabs.ai",industry:"AI/ML",location:"Gurugram, India",requirements:["AI/ML","Software"],priority:"high",status:"won",potentialValue:32e4,addedDate:"2026-08-28T09:00:00.000Z",notes:[{id:"n5",text:"Contract signed! Starting phase 1 LLM model integration next Monday.",createdAt:"2026-09-05T18:00:00.000Z",author:"Neha Jain"}],activities:[{id:"a9",title:"Contract Signed - Deal Won! 🏆",time:"Sep 5",date:"2026-09-05T17:45:00.000Z"}]},{id:"lead-6",name:"Sneha Patel",company:"CloudScale Systems",designation:"Head of Engineering",linkedinUrl:"https://linkedin.com/in/sneha-cloudscale",companyWebsite:"https://cloudscale.dev",industry:"Cloud Infrastructure",location:"Pune, India",requirements:["Software"],priority:"medium",status:"request_sent",potentialValue:12e4,addedDate:"2026-09-05T08:20:00.000Z",notes:[],activities:[{id:"a10",title:"LinkedIn connection request sent with custom note",time:"Sep 5",date:"2026-09-05T08:25:00.000Z"}]},{id:"lead-7",name:"Rajesh Kothari",company:"Nexa Digital Media",designation:"Managing Director",linkedinUrl:"https://linkedin.com/in/rajesh-nexa",companyWebsite:"https://nexadigital.com",industry:"Digital Media",location:"Delhi NCR, India",requirements:["Website","UI/UX"],priority:"low",status:"new",potentialValue:85e3,addedDate:"2026-09-06T07:15:00.000Z",notes:[],activities:[{id:"a11",title:"Discovered on LinkedIn Sales Navigator",time:"Today",date:"2026-09-06T07:20:00.000Z"}]},{id:"lead-8",name:"Ananya Roy",company:"Healthify App Tech",designation:"Co-Founder & COO",linkedinUrl:"https://linkedin.com/in/ananya-healthify",companyWebsite:"https://healthifyapp.co",industry:"HealthTech",location:"Hyderabad, India",requirements:["Mobile App"],priority:"high",status:"new",potentialValue:21e4,addedDate:"2026-09-06T08:00:00.000Z",notes:[],activities:[{id:"a12",title:"Lead Added to Pipeline",time:"Today",date:"2026-09-06T08:05:00.000Z"}]},{id:"lead-9",name:"Deepak Singhania",company:"RetailHub Commerce",designation:"Founder",linkedinUrl:"https://linkedin.com/in/deepak-retailhub",companyWebsite:"https://retailhub.in",industry:"E-commerce",location:"Ahmedabad, India",requirements:["Website","Software"],priority:"medium",status:"lost",potentialValue:9e4,lostReason:"Budget issue",addedDate:"2026-08-25T11:00:00.000Z",notes:[{id:"n6",text:"Lost due to budget limitations. Re-connect in Q1 2027.",createdAt:"2026-09-02T16:00:00.000Z",author:"Neha Jain"}],activities:[{id:"a13",title:"Marked as Lost (Budget issue)",time:"Sep 2",date:"2026-09-02T16:05:00.000Z"}]}],R=[{id:"f-1",leadId:"lead-1",leadName:"Rahul Sharma",company:"ABC Technologies",task:"Follow up regarding website proposal and timeline estimate",dueDate:"2026-09-06T11:00:00.000Z",dueLabel:"Today, 11:00 AM",category:"today",priority:"overdue",linkedinUrl:"https://linkedin.com/in/rahul-sharma-abctech",completed:!1},{id:"f-2",leadId:"lead-2",leadName:"Priya Sharma",company:"ABC Technologies",task:"Send AI chatbot architecture breakdown & past case study",dueDate:"2026-09-08T15:00:00.000Z",dueLabel:"Sep 8, 3:00 PM",category:"upcoming",priority:"upcoming",linkedinUrl:"https://linkedin.com/in/priya-sharma-cto",completed:!1},{id:"f-3",leadId:"lead-3",leadName:"Aman Verma",company:"XYZ Pvt Ltd",task:"Follow-up message on proposal feedback & budget review",dueDate:"2026-09-10T11:30:00.000Z",dueLabel:"Sep 10, 11:30 AM",category:"upcoming",priority:"upcoming",linkedinUrl:"https://linkedin.com/in/aman-verma-xyz",completed:!1},{id:"f-4",leadId:"lead-4",leadName:"Karan Mehra",company:"TechCorp Solutions",task:"Schedule 30m scoping meeting with tech lead",dueDate:"2026-09-12T14:00:00.000Z",dueLabel:"Sep 12, 2:00 PM",category:"upcoming",priority:"upcoming",linkedinUrl:"https://linkedin.com/in/karan-mehra-techcorp",completed:!1}],M=[{id:"act-1",text:"Rahul Sharma moved to Connected",time:"10 min ago",type:"connected"},{id:"act-2",text:"Priya Sharma accepted connection",time:"2 hours ago",type:"request_sent"},{id:"act-3",text:"XYZ Technologies moved to Proposal",time:"Yesterday",type:"proposal"},{id:"act-4",text:"Vikram Aditya marked as Deal Won! 🏆",time:"2 days ago",type:"won"},{id:"act-5",text:"Outreach campaign #4 launched: 18 requests sent",time:"3 days ago",type:"new"}],O=[{id:"n-1",text:"Rahul Sharma accepted your connection request",time:"10 minutes ago",dotColor:"notif-blue",unread:!0},{id:"n-2",text:"Follow-up overdue with Priya Sharma (ABC Tech)",time:"2 hours ago",dotColor:"notif-orange",unread:!0},{id:"n-3",text:"XYZ Technologies proposal viewed on client portal",time:"Yesterday",dotColor:"notif-green",unread:!1},{id:"n-4",text:"New LinkedIn prospect identified: Rajesh Kothari",time:"2 days ago",dotColor:"notif-blue",unread:!1}],d={init(){localStorage.getItem(m.LEADS)||localStorage.setItem(m.LEADS,JSON.stringify(N)),localStorage.getItem(m.FOLLOWUPS)||localStorage.setItem(m.FOLLOWUPS,JSON.stringify(R)),localStorage.getItem(m.ACTIVITIES)||localStorage.setItem(m.ACTIVITIES,JSON.stringify(M)),localStorage.getItem(m.NOTIFICATIONS)||localStorage.setItem(m.NOTIFICATIONS,JSON.stringify(O)),localStorage.getItem(m.USER)||localStorage.setItem(m.USER,JSON.stringify(D)),localStorage.getItem(m.PIPELINE_STAGES)||localStorage.setItem(m.PIPELINE_STAGES,JSON.stringify(P))},get(e,t=null){try{const i=localStorage.getItem(e);return i?JSON.parse(i):t}catch(i){return console.error("Storage Read Error:",i),t}},set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(i){console.error("Storage Write Error:",i)}},KEYS:m};d.init();const y={getCurrentUser(){return d.get(d.KEYS.USER,{name:"Neha Jain",email:"neha.jain@techcrm.io",role:"Web Developer / Outreach Specialist",avatar:"NJ"})},isAuthenticated(){return localStorage.getItem("techcrm_logged_in")!=="false"},login(e,t){return localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:this.getCurrentUser()}},logout(){localStorage.setItem("techcrm_logged_in","false"),window.location.hash="#/login"}},F={render(){const e=d.get(d.KEYS.NOTIFICATIONS,[]);return`
      <div id="notification-panel" class="notification-panel">
        <div class="notification-panel-header">
          <span style="font-size: 14px; font-weight: 600; color: var(--text-main);">Notifications</span>
          <button id="btn-mark-all-read" class="btn btn-ghost btn-sm" style="font-size: 11px;">Mark all as read</button>
        </div>
        <div class="notification-list">
          ${e.length===0?`
            <div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 13px;">
              No new notifications
            </div>
          `:e.map(t=>`
            <div class="notification-item ${t.unread?"unread":""}" data-id="${t.id}">
              <span class="notif-dot ${t.dotColor||"notif-blue"}"></span>
              <div style="flex: 1;">
                <p style="font-size: 13px; color: var(--text-main); line-height: 1.4;">${t.text}</p>
                <span style="font-size: 11px; color: var(--text-muted); margin-top: 2px; display: block;">${t.time}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("btn-mark-all-read");e&&e.addEventListener("click",()=>{const i=d.get(d.KEYS.NOTIFICATIONS,[]).map(a=>({...a,unread:!1}));d.set(d.KEYS.NOTIFICATIONS,i);const o=document.getElementById("notif-badge-count");o&&(o.style.display="none");const n=document.getElementById("notification-panel");n&&n.querySelectorAll(".notification-item").forEach(a=>a.classList.remove("unread"))})}},A={render(){const e=y.getCurrentUser(),i=d.get(d.KEYS.NOTIFICATIONS,[]).filter(o=>o.unread).length;return`
      <header class="top-header">
        <div class="header-left">
          <div class="header-brand-mobile">
            <span>🚀</span> TechCRM
          </div>
          <div class="search-input-wrapper" style="width: 100%;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" id="global-search-input" class="input" placeholder="Search leads, companies, founders..." />
          </div>
        </div>

        <div class="header-right">
          <!-- Notification Bell -->
          <div style="position: relative;">
            <button id="notif-toggle-btn" class="header-icon-btn" title="Notifications" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              ${i>0?`<span id="notif-badge-count" class="badge-count">${i}</span>`:""}
            </button>
            ${F.render()}
          </div>

          <!-- User Menu -->
          <div style="position: relative;">
            <button id="user-menu-btn" class="user-profile-btn" aria-haspopup="true">
              <div class="avatar">${e.avatar||"NJ"}</div>
              <div class="user-profile-info">
                <div class="user-profile-name">${e.name}</div>
                <div class="user-profile-role">${e.role.split("/")[0].trim()}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-secondary);">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <div id="user-dropdown-menu" class="dropdown-menu">
              <div style="padding: 8px 12px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 4px;">
                <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">${e.name}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${e.email}</div>
              </div>
              <a href="#/settings" class="dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                My Profile
              </a>
              <a href="#/settings" class="dropdown-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                Preferences
              </a>
              <div class="dropdown-divider"></div>
              <button id="header-logout-btn" class="dropdown-item danger" style="width: 100%; background: none; border: none; font: inherit;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>
    `},initListeners(){F.initListeners();const e=document.getElementById("notif-toggle-btn"),t=document.getElementById("notification-panel");e&&t&&e.addEventListener("click",s=>{s.stopPropagation(),t.classList.toggle("active");const r=document.getElementById("user-dropdown-menu");r&&r.classList.remove("active")});const i=document.getElementById("user-menu-btn"),o=document.getElementById("user-dropdown-menu");i&&o&&i.addEventListener("click",s=>{s.stopPropagation(),o.classList.toggle("active"),t&&t.classList.remove("active")}),document.addEventListener("click",()=>{t&&t.classList.remove("active"),o&&o.classList.remove("active")});const n=document.getElementById("header-logout-btn");n&&n.addEventListener("click",()=>{y.logout()});const a=document.getElementById("global-search-input");a&&a.addEventListener("keydown",s=>{if(s.key==="Enter"){const r=encodeURIComponent(a.value.trim());window.location.hash=`#/leads?q=${r}`}})}},p={getAll(){return d.get(d.KEYS.LEADS,[])},getById(e){return this.getAll().find(i=>i.id===e)||null},create(e){const t=this.getAll(),i={id:"lead-"+Date.now(),name:e.name.trim(),company:e.company.trim(),designation:e.designation?e.designation.trim():"Decision Maker",linkedinUrl:e.linkedinUrl?e.linkedinUrl.trim():"#",companyWebsite:e.companyWebsite?e.companyWebsite.trim():"",industry:e.industry||"Tech / Software",location:e.location||"India",requirements:e.requirements||["Website"],priority:e.priority||"medium",status:"new",potentialValue:Number(e.potentialValue)||1e5,addedDate:new Date().toISOString(),notes:e.notes?[{id:"n-"+Date.now(),text:e.notes,createdAt:new Date().toISOString(),author:"Neha Jain"}]:[],activities:[{id:"act-"+Date.now(),title:"Lead Added to Pipeline",time:"Just now",date:new Date().toISOString()}]};return t.unshift(i),d.set(d.KEYS.LEADS,t),this.recordGlobalActivity(`${i.name} (${i.company}) added as New Lead`,"new"),i},update(e,t){const i=this.getAll(),o=i.findIndex(n=>n.id===e);return o===-1?null:(i[o]={...i[o],...t},d.set(d.KEYS.LEADS,i),i[o])},updateStatus(e,t,i={}){const o=this.getById(e);if(!o)return null;const n=o.status;if(n===t)return o;const a={new:"New Leads",request_sent:"Request Sent",connected:"Connected",qualified:"Qualified",proposal:"Proposal",won:"Won",lost:"Lost"},s={id:"act-"+Date.now(),title:`Moved from ${a[n]||n} to ${a[t]||t}`,time:"Just now",date:new Date().toISOString()},r={status:t,activities:[s,...o.activities||[]],...i},l=this.update(e,r);return this.recordGlobalActivity(`${o.name} moved to ${a[t]||t}`,t),l},addNote(e,t){const i=this.getById(e);if(!i||!t.trim())return null;const n=[{id:"note-"+Date.now(),text:t.trim(),createdAt:new Date().toISOString(),author:"Neha Jain"},...i.notes||[]];return this.update(e,{notes:n})},addActivity(e,t){const i=this.getById(e);if(!i||!t.trim())return null;const n=[{id:"act-"+Date.now(),title:t.trim(),time:"Just now",date:new Date().toISOString()},...i.activities||[]];return this.update(e,{activities:n})},delete(e){const t=this.getAll().filter(i=>i.id!==e);return d.set(d.KEYS.LEADS,t),!0},recordGlobalActivity(e,t){const i=d.get(d.KEYS.ACTIVITIES,[]);i.unshift({id:"g-act-"+Date.now(),text:e,time:"Just now",type:t}),d.set(d.KEYS.ACTIVITIES,i.slice(0,20))},getStats(){const e=this.getAll(),t={new:0,request_sent:0,connected:0,qualified:0,proposal:0,won:0,lost:0};e.forEach(r=>{t[r.status]!==void 0&&t[r.status]++});const o=e.length+117,n=t.connected+46,a=t.proposal+11,s=t.won+4;return{totalLeads:o,connections:n,proposals:a,won:s,breakdown:{newLeads:t.new+50,requests:t.request_sent+37,connected:t.connected+22,qualified:t.qualified+14,proposal:t.proposal+7,won:t.won+4,lost:t.lost+2},actualCounts:t}}},h={getAll(){return d.get(d.KEYS.FOLLOWUPS,[])},getByCategory(e="today"){const t=this.getAll();return e==="completed"?t.filter(i=>i.completed):t.filter(i=>!i.completed&&(e==="all"||i.category===e))},create(e){const t=this.getAll(),i={id:"f-"+Date.now(),leadId:e.leadId||"",leadName:e.leadName.trim(),company:e.company.trim(),task:e.task.trim(),dueDate:e.dueDate||new Date().toISOString(),dueLabel:e.dueLabel||"Upcoming",category:e.category||"upcoming",priority:e.priority||"upcoming",linkedinUrl:e.linkedinUrl||"#",completed:!1};return t.unshift(i),d.set(d.KEYS.FOLLOWUPS,t),i},complete(e){const t=this.getAll(),i=t.find(o=>o.id===e);return i&&(i.completed=!0,d.set(d.KEYS.FOLLOWUPS,t)),i},snooze(e,t=1){const i=this.getAll(),o=i.find(n=>n.id===e);return o&&(o.category="upcoming",o.priority="upcoming",o.dueLabel=`Snoozed (${t}d)`,d.set(d.KEYS.FOLLOWUPS,i)),o},delete(e){const t=this.getAll().filter(i=>i.id!==e);return d.set(d.KEYS.FOLLOWUPS,t),!0}},j={render(e="/dashboard"){const t=p.getAll(),i=h.getByCategory("today");return`
      <aside class="sidebar">
        <div class="sidebar-header">
          <a href="#/dashboard" class="brand-logo">
            <div class="brand-icon">🚀</div>
            <span class="brand-text">TechCRM</span>
          </a>
        </div>

        <nav class="sidebar-nav">
          ${[{path:"/dashboard",label:"Dashboard",icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>'},{path:"/pipeline",label:"Pipeline",badge:t.filter(n=>n.status!=="lost"&&n.status!=="won").length,icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'},{path:"/leads",label:"Leads",icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'},{path:"/companies",label:"Companies",icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="22.01"></line><line x1="15" y1="22" x2="15" y2="22.01"></line><line x1="8" y1="6" x2="8.01" y2="6"></line><line x1="12" y1="6" x2="12.01" y2="6"></line><line x1="16" y1="6" x2="16.01" y2="6"></line><line x1="8" y1="10" x2="8.01" y2="10"></line><line x1="12" y1="10" x2="12.01" y2="10"></line><line x1="16" y1="10" x2="16.01" y2="10"></line><line x1="8" y1="14" x2="8.01" y2="14"></line><line x1="12" y1="14" x2="12.01" y2="14"></line><line x1="16" y1="14" x2="16.01" y2="14"></line><line x1="8" y1="18" x2="8.01" y2="18"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="16" y1="18" x2="16.01" y2="18"></line></svg>'},{path:"/followups",label:"Follow-ups",badge:i.length,icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>'},{path:"/analytics",label:"Analytics",icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>'}].map(n=>`
            <a href="#${n.path}" class="nav-link ${e===n.path?"active":""}" title="${n.label}">
              ${n.icon}
              <span class="nav-link-text">${n.label}</span>
              ${n.badge!==void 0&&n.badge>0?`<span class="nav-link-badge">${n.badge}</span>`:""}
            </a>
          `).join("")}

          <div class="sidebar-divider"></div>

          <a href="#/settings" class="nav-link ${e==="/settings"?"active":""}" title="Settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span class="nav-link-text">Settings</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-outreach-card">
            <div class="sidebar-outreach-title">Monthly Outreach Target</div>
            <div class="sidebar-outreach-bar">
              <div class="sidebar-outreach-progress" style="width: 72%;"></div>
            </div>
            <div class="sidebar-outreach-sub">
              <span>94 / 130 Sent</span>
              <span style="font-weight: 600; color: var(--primary);">72%</span>
            </div>
          </div>
        </div>
      </aside>
    `}},U={render(e="/dashboard"){return`
      <nav class="mobile-bottom-nav">
        ${[{path:"/dashboard",label:"Dashboard",icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>'},{path:"/pipeline",label:"Pipeline",icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'},{path:"/leads",label:"Leads",icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>'},{path:"/followups",label:"Tasks",icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>'},{path:"/analytics",label:"Analytics",icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>'}].map(i=>`
          <a href="#${i.path}" class="mobile-nav-item ${e===i.path?"active":""}">
            ${i.icon}
            <span>${i.label}</span>
          </a>
        `).join("")}
      </nav>
    `}},u={show(e,t="success",i=3e3){const o=document.getElementById("toast-container");if(!o)return;const n=document.createElement("div");n.className=`toast toast-${t}`;let a="";t==="success"?a='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':t==="warning"?a='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>':t==="danger"?a='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>':a='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',n.innerHTML=`
      ${a}
      <span>${e}</span>
    `,o.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateY(10px)",setTimeout(()=>n.remove(),200)},i)}},b={currentLeadId:null,render(){return`
      <div id="drawer-backdrop" class="drawer-backdrop"></div>
      <aside id="lead-drawer" class="drawer" aria-label="Lead Details">
        <div class="drawer-header">
          <span class="drawer-title">Lead Details</span>
          <button id="drawer-close-btn" class="btn btn-ghost btn-icon" aria-label="Close drawer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div id="drawer-content" class="drawer-body">
          <!-- Populated dynamically via open(leadId) -->
        </div>
      </aside>
    `},open(e){const t=p.getById(e);if(!t)return;this.currentLeadId=e;const i=document.getElementById("lead-drawer"),o=document.getElementById("drawer-backdrop"),n=document.getElementById("drawer-content");if(!i||!o||!n)return;const a=t.name.split(" ").map(r=>r[0]).join("").substring(0,2).toUpperCase(),s=Array.isArray(t.requirements)?t.requirements:["Website"];n.innerHTML=`
      <div class="drawer-profile-banner">
        <div class="drawer-avatar">${a}</div>
        <div class="drawer-profile-text">
          <h2>${t.name}</h2>
          <p>${t.designation||"Contact"} @ ${t.company}</p>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <a href="${t.linkedinUrl||"#"}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; gap: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
          </svg>
          Open LinkedIn Profile
        </a>
      </div>

      <div class="drawer-field-grid">
        <div class="drawer-field">
          <span class="drawer-field-label">Status</span>
          <select id="drawer-status-select" class="select" style="font-weight: 500;">
            <option value="new" ${t.status==="new"?"selected":""}>New Leads</option>
            <option value="request_sent" ${t.status==="request_sent"?"selected":""}>Request Sent</option>
            <option value="connected" ${t.status==="connected"?"selected":""}>Connected</option>
            <option value="qualified" ${t.status==="qualified"?"selected":""}>Qualified</option>
            <option value="proposal" ${t.status==="proposal"?"selected":""}>Proposal Sent</option>
            <option value="won" ${t.status==="won"?"selected":""}>Won (Closed)</option>
            <option value="lost" ${t.status==="lost"?"selected":""}>Lost</option>
          </select>
        </div>

        <div class="drawer-field">
          <span class="drawer-field-label">Company</span>
          <div class="drawer-field-value">${t.company} ${t.companyWebsite?`<a href="${t.companyWebsite}" target="_blank" style="font-size: 12px; color: var(--primary); margin-left: 6px;">(${t.companyWebsite.replace(/^https?:\/\//,"")})</a>`:""}</div>
        </div>

        <div class="drawer-field">
          <span class="drawer-field-label">Tech Requirement</span>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
            ${s.map(r=>`<span class="tag-chip" style="font-size: 12px; padding: 4px 8px;">${r}</span>`).join("")}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="drawer-field">
            <span class="drawer-field-label">Priority</span>
            <div class="drawer-field-value" style="text-transform: capitalize;">
              ${t.priority==="high"?"🔥 High":t.priority==="medium"?"⚡ Medium":"🌱 Low"}
            </div>
          </div>
          <div class="drawer-field">
            <span class="drawer-field-label">Potential Value</span>
            <div class="drawer-field-value" style="color: #4F46E5; font-weight: 600;">
              ₹${(t.potentialValue||1e5).toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      <div class="drawer-divider"></div>

      <!-- Activity Timeline -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary);">
            Activity Timeline
          </span>
          <button id="btn-add-activity-trigger" class="btn btn-ghost btn-sm" style="font-size: 11px;">+ Add Activity</button>
        </div>

        <!-- Inline Add Activity Form -->
        <div id="add-activity-box" style="display: none; margin-bottom: 12px; background: #F8FAFC; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
          <input type="text" id="custom-activity-input" class="input" placeholder="e.g. Discussed proposal on call" style="margin-bottom: 8px;" />
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button id="btn-cancel-activity" class="btn btn-ghost btn-sm">Cancel</button>
            <button id="btn-save-activity" class="btn btn-primary btn-sm">Log Activity</button>
          </div>
        </div>

        <div class="timeline">
          ${(t.activities||[]).map(r=>`
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-title">${r.title}</div>
              <div class="timeline-time">${r.time||"Recently"}</div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="drawer-divider"></div>

      <!-- Notes Section -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary);">
            Notes
          </span>
        </div>

        <div class="notes-list" id="drawer-notes-list">
          ${!t.notes||t.notes.length===0?`
            <div style="font-size: 12px; color: var(--text-muted); font-style: italic; padding: 8px 0;">No notes added yet.</div>
          `:t.notes.map(r=>`
            <div class="note-item">
              <div>${r.text}</div>
              <div class="note-meta">${r.author||"Neha"} • ${new Date(r.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
            </div>
          `).join("")}
        </div>

        <!-- Add Note Box -->
        <div style="margin-top: 10px;">
          <textarea id="drawer-new-note" class="textarea" placeholder="Add a note or call update..." style="min-height: 60px;"></textarea>
          <button id="btn-drawer-add-note" class="btn btn-secondary btn-sm" style="margin-top: 8px; width: 100%;">+ Add Note</button>
        </div>
      </div>

      <div class="drawer-divider"></div>

      <!-- Bottom Actions -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
        <button id="btn-drawer-delete-lead" class="btn btn-ghost btn-sm" style="color: var(--danger);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          Delete Lead
        </button>
        <a href="#/followups" class="btn btn-secondary btn-sm">Schedule Follow-up</a>
      </div>
    `,o.classList.add("active"),i.classList.add("active"),document.body.style.overflow="hidden",this.bindDrawerActions(e)},close(){const e=document.getElementById("lead-drawer"),t=document.getElementById("drawer-backdrop");e&&e.classList.remove("active"),t&&t.classList.remove("active"),document.body.style.overflow="",this.currentLeadId=null},bindDrawerActions(e){const t=document.getElementById("drawer-status-select");t&&t.addEventListener("change",v=>{const g=v.target.value;p.updateStatus(e,g),u.show(`Lead status updated to ${g.replace("_"," ")}`),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e)});const i=document.getElementById("btn-add-activity-trigger"),o=document.getElementById("add-activity-box"),n=document.getElementById("btn-cancel-activity"),a=document.getElementById("btn-save-activity"),s=document.getElementById("custom-activity-input");i&&o&&i.addEventListener("click",()=>{o.style.display="block",s.focus()}),n&&o&&n.addEventListener("click",()=>{o.style.display="none",s.value=""}),a&&s&&a.addEventListener("click",()=>{const v=s.value.trim();v&&(p.addActivity(e,v),u.show("Activity logged successfully"),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e))});const r=document.getElementById("btn-drawer-add-note"),l=document.getElementById("drawer-new-note");r&&l&&r.addEventListener("click",()=>{const v=l.value.trim();v&&(p.addNote(e,v),u.show("Note added"),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e))});const c=document.getElementById("btn-drawer-delete-lead");c&&c.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:confirm-delete",{detail:{leadId:e}}))})},initGlobalListeners(){const e=document.getElementById("drawer-backdrop"),t=document.getElementById("drawer-close-btn");e&&e.addEventListener("click",()=>this.close()),t&&t.addEventListener("click",()=>this.close()),document.addEventListener("keydown",i=>{i.key==="Escape"&&this.currentLeadId&&this.close()})}},w={render(){return`
      <div id="add-lead-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-header">
            <h2 class="modal-title">Add New Lead</h2>
            <button type="button" class="btn btn-ghost btn-icon modal-close-btn" data-modal="add-lead-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <form id="add-lead-form" class="modal-body">
            <!-- Personal Information -->
            <div style="font-size: 13px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;">
              Personal Information
            </div>

            <div class="form-group">
              <label class="form-label" for="lead-name">Full Name <span class="required">*</span></label>
              <input type="text" id="lead-name" class="input" placeholder="e.g. Rahul Sharma" required />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="lead-designation">Designation</label>
                <input type="text" id="lead-designation" class="input" placeholder="e.g. Founder / CEO" />
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-linkedin">LinkedIn Profile URL <span class="required">*</span></label>
                <input type="url" id="lead-linkedin" class="input" placeholder="https://linkedin.com/in/..." required />
              </div>
            </div>

            <div class="drawer-divider" style="margin: 16px 0;"></div>

            <!-- Company Information -->
            <div style="font-size: 13px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;">
              Company Information
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="lead-company">Company Name <span class="required">*</span></label>
                <input type="text" id="lead-company" class="input" placeholder="e.g. ABC Technologies" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-website">Company Website</label>
                <input type="url" id="lead-website" class="input" placeholder="https://abc.com" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="lead-industry">Industry</label>
                <select id="lead-industry" class="select">
                  <option value="SaaS">SaaS</option>
                  <option value="FinTech">FinTech</option>
                  <option value="EdTech">EdTech</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="AI/ML Solutions">AI/ML Solutions</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Digital Agency">Digital Agency</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-location">Location</label>
                <input type="text" id="lead-location" class="input" placeholder="e.g. Jaipur, India" />
              </div>
            </div>

            <div class="drawer-divider" style="margin: 16px 0;"></div>

            <!-- Opportunity -->
            <div style="font-size: 13px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;">
              Tech Opportunity & Priority
            </div>

            <div class="form-group">
              <label class="form-label">Service Requirements (Select all that apply)</label>
              <div class="tag-selector" id="requirement-tag-selector">
                <span class="tag-option selected" data-value="Website">🌐 Website</span>
                <span class="tag-option" data-value="Mobile App">📱 Mobile App</span>
                <span class="tag-option" data-value="Software">💻 Software</span>
                <span class="tag-option" data-value="AI/ML">🤖 AI/ML</span>
                <span class="tag-option" data-value="UI/UX">🎨 UI/UX</span>
                <span class="tag-option" data-value="Other">⚡ Other</span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Priority</label>
                <div class="radio-pill-group" id="priority-selector">
                  <div class="radio-pill" data-value="low">Low</div>
                  <div class="radio-pill selected" data-value="medium">Medium</div>
                  <div class="radio-pill" data-value="high">🔥 High</div>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-value">Potential Deal Value (₹)</label>
                <input type="number" id="lead-value" class="input" placeholder="100000" step="5000" value="100000" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="lead-notes">Initial Outreach Notes</label>
              <textarea id="lead-notes" class="textarea" placeholder="Found on LinkedIn, recently posted about needing a tech partner..."></textarea>
            </div>

            <div class="modal-footer" style="padding: 16px 0 0 0; background: transparent;">
              <button type="button" class="btn btn-secondary modal-close-btn" data-modal="add-lead-modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Add Lead</button>
            </div>
          </form>
        </div>
      </div>
    `},open(){const e=document.getElementById("add-lead-modal");if(e){e.style.display="flex",document.body.style.overflow="hidden";const t=document.getElementById("lead-name");t&&t.focus()}},close(){const e=document.getElementById("add-lead-modal");if(e){e.style.display="none",document.body.style.overflow="";const t=document.getElementById("add-lead-form");t&&t.reset()}},initListeners(){const e=document.getElementById("add-lead-modal");if(!e)return;e.querySelectorAll(".modal-close-btn").forEach(n=>{n.addEventListener("click",()=>this.close())}),e.addEventListener("click",n=>{n.target===e&&this.close()});const t=document.getElementById("requirement-tag-selector");t&&t.addEventListener("click",n=>{const a=n.target.closest(".tag-option");a&&a.classList.toggle("selected")});const i=document.getElementById("priority-selector");i&&i.addEventListener("click",n=>{const a=n.target.closest(".radio-pill");a&&(i.querySelectorAll(".radio-pill").forEach(s=>s.classList.remove("selected")),a.classList.add("selected"))});const o=document.getElementById("add-lead-form");o&&o.addEventListener("submit",n=>{var I;n.preventDefault();const a=document.getElementById("lead-name").value,s=document.getElementById("lead-designation").value,r=document.getElementById("lead-linkedin").value,l=document.getElementById("lead-company").value,c=document.getElementById("lead-website").value,v=document.getElementById("lead-industry").value,g=document.getElementById("lead-location").value,f=document.getElementById("lead-value").value,x=document.getElementById("lead-notes").value,S=Array.from(t.querySelectorAll(".tag-option.selected")).map(q=>q.getAttribute("data-value")),T=((I=i.querySelector(".radio-pill.selected"))==null?void 0:I.getAttribute("data-value"))||"medium",z=p.create({name:a,designation:s,linkedinUrl:r,company:l,companyWebsite:c,industry:v,location:g,requirements:S.length?S:["Website"],priority:T,potentialValue:Number(f)||1e5,notes:x});this.close(),u.show(`✓ Lead "${z.name}" added to New Leads!`),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))})}},L={currentLeadId:null,render(){return`
      <div id="lost-reason-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title" style="color: var(--danger);">Mark Lead as Lost</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-lost-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <form id="lost-reason-form" class="modal-body">
            <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 16px;">
              Why was this lead lost? Tracking this helps identify outreach and objection bottlenecks for your mentor.
            </p>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="No requirement" checked />
                <span>No requirement currently</span>
              </label>
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="Budget issue" />
                <span>Budget issue / Price too high</span>
              </label>
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="Went with competitor" />
                <span>Went with competitor / internal team</span>
              </label>
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="No response" />
                <span>No response after follow-ups</span>
              </label>
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="Not interested" />
                <span>Not interested / Declined politely</span>
              </label>
              <label style="display: flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer;">
                <input type="radio" name="lost-reason" value="Other" />
                <span>Other reason</span>
              </label>
            </div>

            <div class="form-group" id="other-reason-group" style="display: none;">
              <label class="form-label" for="custom-lost-reason">Provide details</label>
              <input type="text" id="custom-lost-reason" class="input" placeholder="e.g. Project paused indefinitely" />
            </div>

            <div class="modal-footer" style="padding: 16px 0 0 0; background: transparent;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-lost-modal">Cancel</button>
              <button type="submit" class="btn btn-danger">Confirm Lost</button>
            </div>
          </form>
        </div>
      </div>
    `},open(e){this.currentLeadId=e;const t=document.getElementById("lost-reason-modal");t&&(t.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("lost-reason-modal");e&&(e.style.display="none",document.body.style.overflow="",this.currentLeadId=null)},initListeners(){const e=document.getElementById("lost-reason-modal"),t=document.getElementById("btn-close-lost-modal"),i=document.getElementById("btn-cancel-lost-modal"),o=document.getElementById("lost-reason-form"),n=document.getElementById("other-reason-group");t&&t.addEventListener("click",()=>this.close()),i&&i.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",a=>{a.target===e&&this.close()}),o&&(o.addEventListener("change",a=>{a.target.name==="lost-reason"&&n&&(n.style.display=a.target.value==="Other"?"block":"none")}),o.addEventListener("submit",a=>{var l;if(a.preventDefault(),!this.currentLeadId)return;const s=o.querySelector('input[name="lost-reason"]:checked');let r=s?s.value:"No response";if(r==="Other"){const c=(l=document.getElementById("custom-lost-reason"))==null?void 0:l.value.trim();c&&(r=c)}p.updateStatus(this.currentLeadId,"lost",{lostReason:r}),u.show(`Lead marked as Lost (${r})`,"warning"),this.close(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}))}},k={render(){return`
      <div id="schedule-followup-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title">Schedule Follow-up</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-schedule-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <form id="schedule-followup-form" class="modal-body">
            <div class="form-group">
              <label class="form-label" for="followup-lead">Select Lead <span class="required">*</span></label>
              <select id="followup-lead" class="select" required>
                ${p.getAll().map(t=>`<option value="${t.id}" data-name="${t.name}" data-company="${t.company}" data-linkedin="${t.linkedinUrl}">${t.name} (${t.company})</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="followup-task">Follow-up Task / Note <span class="required">*</span></label>
              <input type="text" id="followup-task" class="input" placeholder="e.g. Send proposal feedback message on LinkedIn" required />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="followup-category">Schedule For</label>
                <select id="followup-category" class="select">
                  <option value="today">Today</option>
                  <option value="upcoming" selected>Upcoming</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="followup-priority">Priority</label>
                <select id="followup-priority" class="select">
                  <option value="today">Due Today</option>
                  <option value="upcoming" selected>Upcoming</option>
                  <option value="overdue">🔴 High / Overdue</option>
                </select>
              </div>
            </div>

            <div class="modal-footer" style="padding: 16px 0 0 0; background: transparent;">
              <button type="button" class="btn btn-secondary" id="btn-cancel-schedule-modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Schedule Task</button>
            </div>
          </form>
        </div>
      </div>
    `},open(){const e=document.getElementById("schedule-followup-modal");e&&(e.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("schedule-followup-modal");if(e){e.style.display="none",document.body.style.overflow="";const t=document.getElementById("schedule-followup-form");t&&t.reset()}},initListeners(){const e=document.getElementById("schedule-followup-modal"),t=document.getElementById("btn-close-schedule-modal"),i=document.getElementById("btn-cancel-schedule-modal"),o=document.getElementById("schedule-followup-form");t&&t.addEventListener("click",()=>this.close()),i&&i.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",n=>{n.target===e&&this.close()}),o&&o.addEventListener("submit",n=>{n.preventDefault();const a=document.getElementById("followup-lead"),s=a.options[a.selectedIndex],r=a.value,l=s.getAttribute("data-name"),c=s.getAttribute("data-company"),v=s.getAttribute("data-linkedin"),g=document.getElementById("followup-task").value,f=document.getElementById("followup-category").value,x=document.getElementById("followup-priority").value;h.create({leadId:r,leadName:l,company:c,task:g,category:f,priority:x,dueLabel:f==="today"?"Today, 4:00 PM":"Next Week",linkedinUrl:v}),u.show("✓ Follow-up scheduled successfully"),this.close(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))})}},E={currentLeadId:null,render(){return`
      <div id="delete-confirm-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title" style="color: var(--danger);">Delete Lead?</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-delete-modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div class="modal-body">
            <p id="delete-modal-msg" style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">
              This will permanently remove this lead and their activity history from your pipeline.
            </p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="btn-cancel-delete">Cancel</button>
            <button type="button" class="btn btn-danger" id="btn-confirm-delete">Delete</button>
          </div>
        </div>
      </div>
    `},open(e){const t=p.getById(e);if(!t)return;this.currentLeadId=e;const i=document.getElementById("delete-confirm-modal"),o=document.getElementById("delete-modal-msg");i&&o&&(o.innerHTML=`This will permanently remove <strong>${t.name}</strong> (${t.company}) and their activity history.`,i.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("delete-confirm-modal");e&&(e.style.display="none",document.body.style.overflow="",this.currentLeadId=null)},initListeners(){const e=document.getElementById("delete-confirm-modal"),t=document.getElementById("btn-close-delete-modal"),i=document.getElementById("btn-cancel-delete"),o=document.getElementById("btn-confirm-delete");t&&t.addEventListener("click",()=>this.close()),i&&i.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",n=>{n.target===e&&this.close()}),o&&o.addEventListener("click",()=>{if(this.currentLeadId){const n=p.getById(this.currentLeadId),a=n?n.name:"Lead";p.delete(this.currentLeadId),b.close(),this.close(),u.show(`Lead "${a}" permanently deleted`,"danger"),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}})}},W={render(){return`
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--bg-main); padding: 20px;">
        <div style="width: 100%; max-width: 400px; background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 32px; box-shadow: var(--shadow-lg);">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6366F1, #4F46E5); display: inline-flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 8px rgba(99, 102, 241, 0.25); margin-bottom: 12px;">
              🚀
            </div>
            <h1 style="font-size: 22px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">TechCRM</h1>
            <p style="font-size: 14px; color: var(--text-secondary);">LinkedIn Outreach & Pipeline System</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h2 style="font-size: 16px; font-weight: 600; color: var(--text-main);">Welcome back</h2>
            <p style="font-size: 13px; color: var(--text-secondary);">Sign in to your outreach workspace</p>
          </div>

          <form id="login-form">
            <div class="form-group">
              <label class="form-label" for="login-email">Email Address</label>
              <input type="email" id="login-email" class="input" value="neha.jain@techcrm.io" required />
            </div>

            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label class="form-label" for="login-password" style="margin-bottom: 0;">Password</label>
                <a href="javascript:void(0)" style="font-size: 12px; color: var(--primary); font-weight: 500;">Forgot password?</a>
              </div>
              <div style="position: relative;">
                <input type="password" id="login-password" class="input" value="••••••••••••" required />
                <button type="button" id="btn-toggle-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px;">
                  👁
                </button>
              </div>
            </div>

            <div style="margin-bottom: 20px; font-size: 12px; color: var(--text-secondary); background: #F8FAFC; padding: 10px; border-radius: 8px; border: 1px solid var(--border-subtle);">
              👤 <strong>Demo Login:</strong> Neha Jain (Sales / Web Dev) pre-filled.
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 10px; font-size: 14px; justify-content: center;">
              Sign In to TechCRM
            </button>
          </form>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("login-form"),t=document.getElementById("login-password"),i=document.getElementById("btn-toggle-password");i&&t&&i.addEventListener("click",()=>{const o=t.getAttribute("type")==="password"?"text":"password";t.setAttribute("type",o)}),e&&e.addEventListener("submit",o=>{o.preventDefault();const n=document.getElementById("login-email").value;y.login(n,"password"),u.show("Welcome back, Neha! 👋"),window.location.hash="#/dashboard"})}},C={render(){const e=p.getStats(),t=d.get(d.KEYS.ACTIVITIES,[]);return`
      <div class="page-container">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Good morning, Neha 👋</h1>
            <p>Here's your LinkedIn outreach progress and team performance overview.</p>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary" onclick="window.location.hash='#/followups'">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
              View Follow-ups
            </button>
            <button class="btn btn-primary" id="btn-dash-add-lead">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              + Add Lead
            </button>
          </div>
        </div>

        <!-- 4 KPI Cards -->
        <div class="kpi-grid">
          <!-- Total Leads -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span>Total Leads</span>
              <div class="kpi-icon" style="background: #EEF2FF; color: #4F46E5;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <div class="kpi-value">${e.totalLeads}</div>
              <div class="kpi-trend">↑ 12%</div>
            </div>
          </div>

          <!-- Connections -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span>Connections</span>
              <div class="kpi-icon" style="background: #E0F2FE; color: #0284C7;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <div class="kpi-value">${e.connections}</div>
              <div class="kpi-trend">↑ 8%</div>
            </div>
          </div>

          <!-- Proposals -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span>Proposals</span>
              <div class="kpi-icon" style="background: #FEF3C7; color: #D97706;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <div class="kpi-value">${e.proposals}</div>
              <div class="kpi-trend">↑ 20%</div>
            </div>
          </div>

          <!-- Deals Won -->
          <div class="kpi-card">
            <div class="kpi-header">
              <span>Deals Won</span>
              <div class="kpi-icon" style="background: #DCFCE7; color: #15803D;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <div class="kpi-value">${e.won}</div>
              <div class="kpi-trend">↑ 25%</div>
            </div>
          </div>
        </div>

        <!-- 65% / 35% Lower Section -->
        <div class="dashboard-split" style="display: grid; grid-template-columns: 65% calc(35% - 16px); gap: 16px; margin-bottom: var(--space-24);">
          <!-- Left: Outreach Performance Graph -->
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
              <div>
                <h3 class="section-heading" style="font-size: 16px;">Outreach Performance</h3>
                <p style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">Weekly discovery vs accepted connections</p>
              </div>
              <div style="display: flex; gap: 16px; font-size: 12px; align-items: center;">
                <span style="display: inline-flex; align-items: center; gap: 6px;">
                  <span style="width: 10px; height: 10px; border-radius: 2px; background: #6366F1;"></span>
                  Sent Requests
                </span>
                <span style="display: inline-flex; align-items: center; gap: 6px;">
                  <span style="width: 10px; height: 10px; border-radius: 2px; background: #10B981;"></span>
                  Connected
                </span>
              </div>
            </div>

            <!-- SVG Chart -->
            <div style="width: 100%; height: 210px; position: relative;">
              <svg viewBox="0 0 600 200" style="width: 100%; height: 100%; overflow: visible;">
                <!-- Grid Lines -->
                <line x1="0" y1="40" x2="600" y2="40" stroke="#F1F5F9" stroke-width="1" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="#F1F5F9" stroke-width="1" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="#F1F5F9" stroke-width="1" />
                <line x1="0" y1="190" x2="600" y2="190" stroke="#E2E8F0" stroke-width="1" />

                <!-- Bars: Mon - Sun -->
                <!-- Mon -->
                <rect x="40" y="70" width="16" height="120" rx="4" fill="#6366F1" />
                <rect x="60" y="110" width="16" height="80" rx="4" fill="#10B981" />

                <!-- Tue -->
                <rect x="120" y="50" width="16" height="140" rx="4" fill="#6366F1" />
                <rect x="140" y="95" width="16" height="95" rx="4" fill="#10B981" />

                <!-- Wed -->
                <rect x="200" y="30" width="16" height="160" rx="4" fill="#6366F1" />
                <rect x="220" y="80" width="16" height="110" rx="4" fill="#10B981" />

                <!-- Thu -->
                <rect x="280" y="60" width="16" height="130" rx="4" fill="#6366F1" />
                <rect x="300" y="105" width="16" height="85" rx="4" fill="#10B981" />

                <!-- Fri -->
                <rect x="360" y="45" width="16" height="145" rx="4" fill="#6366F1" />
                <rect x="380" y="85" width="16" height="105" rx="4" fill="#10B981" />

                <!-- Sat -->
                <rect x="440" y="120" width="16" height="70" rx="4" fill="#6366F1" />
                <rect x="460" y="150" width="16" height="40" rx="4" fill="#10B981" />

                <!-- Sun -->
                <rect x="520" y="140" width="16" height="50" rx="4" fill="#6366F1" />
                <rect x="540" y="165" width="16" height="25" rx="4" fill="#10B981" />

                <!-- X Axis Labels -->
                <text x="54" y="210" text-anchor="middle" font-size="11" fill="#94A3B8">Mon</text>
                <text x="134" y="210" text-anchor="middle" font-size="11" fill="#94A3B8">Tue</text>
                <text x="214" y="210" text-anchor="middle" font-size="11" fill="#94A3B8">Wed</text>
                <text x="294" y="210" text-anchor="middle" font-size="11" fill="#94A3B8">Thu</text>
                <text x="374" y="210" text-anchor="middle" font-size="11" fill="#94A3B8">Fri</text>
                <text x="454" y="210" text-anchor="middle" font-size="11" fill="#94A3B8">Sat</text>
                <text x="534" y="210" text-anchor="middle" font-size="11" fill="#94A3B8">Sun</text>
              </svg>
            </div>
          </div>

          <!-- Right: Pipeline Breakdown -->
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <h3 class="section-heading" style="font-size: 16px;">Pipeline Breakdown</h3>
                <a href="#/pipeline" style="font-size: 12px; color: var(--primary); font-weight: 600;">Open Board →</a>
              </div>

              <div style="display: flex; flex-direction: column; gap: 12px;">
                <!-- New Leads -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #475569;">New Leads</span>
                    <span style="font-weight: 600;">${e.breakdown.newLeads}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: 90%; background: #64748B; border-radius: 3px;"></div>
                  </div>
                </div>

                <!-- Requests -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #B45309;">Requests Sent</span>
                    <span style="font-weight: 600;">${e.breakdown.requests}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: 70%; background: #F59E0B; border-radius: 3px;"></div>
                  </div>
                </div>

                <!-- Connected -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #4F46E5;">Connected</span>
                    <span style="font-weight: 600;">${e.breakdown.connected}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: 50%; background: #6366F1; border-radius: 3px;"></div>
                  </div>
                </div>

                <!-- Qualified -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #6D28D9;">Qualified</span>
                    <span style="font-weight: 600;">${e.breakdown.qualified}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: 35%; background: #8B5CF6; border-radius: 3px;"></div>
                  </div>
                </div>

                <!-- Proposal -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #0369A1;">Proposal Sent</span>
                    <span style="font-weight: 600;">${e.breakdown.proposal}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: 22%; background: #0284C7; border-radius: 3px;"></div>
                  </div>
                </div>

                <!-- Won -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #15803D;">Deals Won</span>
                    <span style="font-weight: 600;">${e.breakdown.won}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: 15%; background: #16A34A; border-radius: 3px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div style="background: #F8FAFC; padding: 10px; border-radius: 8px; border: 1px solid var(--border-subtle); margin-top: 12px; font-size: 12px; color: var(--text-secondary);">
              🎯 <strong>Overall Win Rate:</strong> 62% from proposal stage
            </div>
          </div>
        </div>

        <!-- Recent Activity Section (56–64px height per item) -->
        <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; box-shadow: var(--shadow-sm);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <h3 class="section-heading" style="font-size: 16px;">Recent Outreach Activity</h3>
            <span style="font-size: 12px; color: var(--text-muted);">Real-time stream</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${t.slice(0,5).map(i=>`
              <div style="height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-radius: 8px; background: #F8FAFC; border: 1px solid var(--border-subtle); transition: background var(--transition-fast);">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: ${i.type==="won"?"#16A34A":i.type==="proposal"?"#0284C7":"#6366F1"};"></span>
                  <span style="font-size: 13.5px; font-weight: 500; color: var(--text-main);">${i.text}</span>
                </div>
                <span style="font-size: 12px; color: var(--text-muted);">${i.time}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("btn-dash-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))})}},H={getTechIcon(e){switch(e.toLowerCase()){case"website":return"🌐";case"mobile app":case"mobile":return"📱";case"ai/ml":case"ai":return"🤖";case"ui/ux":return"🎨";case"software":return"💻";default:return"⚡"}},formatTimeAgo(e){if(!e)return"Recent";const t=new Date(e),o=new Date-t,n=Math.floor(o/(1e3*60*60*24)),a=Math.floor(o/(1e3*60*60));return n>0?`${n}d ago`:a>0?`${a}h ago`:"Today"},render(e){const t=e.name.split(" ").map(a=>a[0]).join("").substring(0,2).toUpperCase(),i=Array.isArray(e.requirements)?e.requirements:["Website"],o=this.formatTimeAgo(e.addedDate);let n="";return e.priority==="high"?n='<span class="badge badge-priority-high">🔥 High</span>':e.priority==="medium"?n='<span class="badge badge-priority-medium">Medium</span>':n='<span class="badge badge-priority-low">Low</span>',`
      <div class="lead-card" draggable="true" data-id="${e.id}" data-status="${e.status}">
        <div class="lead-card-header">
          <div class="lead-card-avatar">${t}</div>
          <div class="lead-card-name" title="${e.name}">${e.name}</div>
        </div>

        <div class="lead-card-company" title="${e.company}">${e.company}</div>
        <div class="lead-card-designation" title="${e.designation}">${e.designation||"Founder"}</div>

        <div class="lead-card-tags">
          ${i.slice(0,2).map(a=>`
            <span class="tag-chip">
              <span>${this.getTechIcon(a)}</span>
              <span>${a}</span>
            </span>
          `).join("")}
          ${n}
        </div>

        <div class="lead-card-footer">
          <span>${o}</span>
          ${e.potentialValue?`<span style="font-weight: 600; color: #4F46E5;">₹${(e.potentialValue/1e3).toFixed(0)}k</span>`:""}
        </div>
      </div>
    `}},B={render(e,t=[]){const i=t.filter(o=>o.status===e.id);return`
      <div class="kanban-column" data-stage="${e.id}">
        <div class="kanban-col-header">
          <div class="kanban-col-title-group">
            <span class="kanban-col-title">${e.name}</span>
          </div>
          <span class="kanban-col-count">${i.length}</span>
        </div>

        <div class="kanban-col-cards" data-stage="${e.id}">
          ${i.length===0?`
            <div style="padding: 24px 8px; text-align: center; color: var(--text-muted); font-size: 12px; border: 1px dashed var(--border-color); border-radius: 8px;">
              Drop leads here
            </div>
          `:i.map(o=>H.render(o)).join("")}
        </div>
      </div>
    `}},V={currentSearch:"",currentPriority:"all",currentRequirement:"all",draggedLeadId:null,render(){const e=p.getAll(),t=d.get(d.KEYS.PIPELINE_STAGES,[{id:"new",name:"New Leads"},{id:"request_sent",name:"Request Sent"},{id:"connected",name:"Connected"},{id:"qualified",name:"Qualified"},{id:"proposal",name:"Proposal"},{id:"won",name:"Won"}]);let i=e.filter(a=>{const s=!this.currentSearch||a.name.toLowerCase().includes(this.currentSearch)||a.company.toLowerCase().includes(this.currentSearch),r=this.currentPriority==="all"||a.priority===this.currentPriority,l=this.currentRequirement==="all"||Array.isArray(a.requirements)&&a.requirements.some(c=>c.toLowerCase().includes(this.currentRequirement.toLowerCase()));return s&&r&&l});const o=e.filter(a=>a.status==="lost").length,n=e.filter(a=>a.status==="won").length;return`
      <div class="page-container">
        <!-- Page Header & Actions -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Outreach Pipeline</h1>
            <p>Jira-style relationship pipeline: Discovery → Connection → Conversation → Proposal → Won</p>
          </div>
          <button class="btn btn-primary" id="btn-pipeline-add-lead">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            + Add Lead
          </button>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: var(--space-20); flex-wrap: wrap;">
          <div style="display: flex; gap: 12px; align-items: center; flex: 1; min-width: 280px; max-width: 500px;">
            <div class="search-input-wrapper" style="width: 100%;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" id="pipeline-search" class="input" placeholder="Search leads by name or company..." value="${this.currentSearch}" />
            </div>
          </div>

          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <!-- Priority Filter -->
            <select id="pipeline-filter-priority" class="select" style="width: auto; font-size: 13px;">
              <option value="all" ${this.currentPriority==="all"?"selected":""}>All Priorities</option>
              <option value="high" ${this.currentPriority==="high"?"selected":""}>🔥 High Priority</option>
              <option value="medium" ${this.currentPriority==="medium"?"selected":""}>Medium Priority</option>
              <option value="low" ${this.currentPriority==="low"?"selected":""}>Low Priority</option>
            </select>

            <!-- Tech Requirement Filter -->
            <select id="pipeline-filter-tech" class="select" style="width: auto; font-size: 13px;">
              <option value="all" ${this.currentRequirement==="all"?"selected":""}>All Services</option>
              <option value="website" ${this.currentRequirement==="website"?"selected":""}>🌐 Website</option>
              <option value="mobile" ${this.currentRequirement==="mobile"?"selected":""}>📱 Mobile App</option>
              <option value="ai" ${this.currentRequirement==="ai"?"selected":""}>🤖 AI/ML</option>
              <option value="ui/ux" ${this.currentRequirement==="ui/ux"?"selected":""}>🎨 UI/UX</option>
              <option value="software" ${this.currentRequirement==="software"?"selected":""}>💻 Software</option>
            </select>

            <button id="btn-reset-filters" class="btn btn-ghost btn-sm" style="font-size: 12px;">Reset</button>
          </div>
        </div>

        <!-- Kanban Board Area -->
        <div class="kanban-wrapper">
          <div class="kanban-board" id="kanban-board-container">
            ${t.map(a=>B.render(a,i)).join("")}
          </div>
        </div>

        <!-- Won & Lost Drop Zones Bar -->
        <div class="won-lost-drop-bar">
          <div class="outcome-drop-zone won" data-stage="won" title="Drop here to mark as Won">
            <span style="font-size: 18px;">🏆</span>
            <span>WON STAGE (${n} Deals)</span>
          </div>
          <div class="outcome-drop-zone lost" data-stage="lost" title="Drop here to record Lost reason">
            <span style="font-size: 18px;">🔴</span>
            <span>LOST STAGE (${o} Leads) — Drop to record reason</span>
          </div>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("btn-pipeline-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))});const t=document.getElementById("pipeline-search");t&&t.addEventListener("input",a=>{this.currentSearch=a.target.value.toLowerCase().trim(),this.refreshBoard()});const i=document.getElementById("pipeline-filter-priority");i&&i.addEventListener("change",a=>{this.currentPriority=a.target.value,this.refreshBoard()});const o=document.getElementById("pipeline-filter-tech");o&&o.addEventListener("change",a=>{this.currentRequirement=a.target.value,this.refreshBoard()});const n=document.getElementById("btn-reset-filters");n&&n.addEventListener("click",()=>{this.currentSearch="",this.currentPriority="all",this.currentRequirement="all",this.refreshBoard()}),this.bindKanbanInteractions()},bindKanbanInteractions(){const e=document.getElementById("app");if(!e)return;e.querySelectorAll(".lead-card").forEach(i=>{i.addEventListener("click",o=>{if(i.classList.contains("is-dragging"))return;const n=i.getAttribute("data-id");n&&b.open(n)}),i.addEventListener("dragstart",o=>{this.draggedLeadId=i.getAttribute("data-id"),i.classList.add("is-dragging"),o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",this.draggedLeadId)}),i.addEventListener("dragend",()=>{i.classList.remove("is-dragging"),this.draggedLeadId=null,document.querySelectorAll(".drag-over").forEach(o=>o.classList.remove("drag-over"))})}),e.querySelectorAll(".kanban-column, .outcome-drop-zone").forEach(i=>{i.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="move",i.classList.add("drag-over")}),i.addEventListener("dragleave",o=>{i.contains(o.relatedTarget)||i.classList.remove("drag-over")}),i.addEventListener("drop",o=>{o.preventDefault(),i.classList.remove("drag-over");const n=o.dataTransfer.getData("text/plain")||this.draggedLeadId,a=i.getAttribute("data-stage");n&&a&&this.handleLeadDrop(n,a)})})},handleLeadDrop(e,t){const i=p.getById(e);if(!(!i||i.status===t))if(t==="lost")L.open(e);else{p.updateStatus(e,t);const o=t.replace("_"," ");u.show(`✓ Lead "${i.name}" moved to ${o.toUpperCase()}`),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}},refreshBoard(){if(document.querySelector(".kanban-wrapper")){const t=d.get(d.KEYS.PIPELINE_STAGES,[{id:"new",name:"New Leads"},{id:"request_sent",name:"Request Sent"},{id:"connected",name:"Connected"},{id:"qualified",name:"Qualified"},{id:"proposal",name:"Proposal"},{id:"won",name:"Won"}]),o=p.getAll().filter(a=>{const s=!this.currentSearch||a.name.toLowerCase().includes(this.currentSearch)||a.company.toLowerCase().includes(this.currentSearch),r=this.currentPriority==="all"||a.priority===this.currentPriority,l=this.currentRequirement==="all"||Array.isArray(a.requirements)&&a.requirements.some(c=>c.toLowerCase().includes(this.currentRequirement.toLowerCase()));return s&&r&&l}),n=document.getElementById("kanban-board-container");n&&(n.innerHTML=t.map(a=>B.render(a,o)).join(""),this.bindKanbanInteractions())}}},_={searchQuery:"",filterStatus:"all",filterPriority:"all",filterRequirement:"all",render(){const e=p.getAll(),t=p.getStats(),i=window.location.hash;if(i.includes("?q=")){const n=i.split("?q=")[1];n&&(this.searchQuery=decodeURIComponent(n))}const o=e.filter(n=>{const a=!this.searchQuery||n.name.toLowerCase().includes(this.searchQuery.toLowerCase())||n.company.toLowerCase().includes(this.searchQuery.toLowerCase())||n.designation.toLowerCase().includes(this.searchQuery.toLowerCase()),s=this.filterStatus==="all"||n.status===this.filterStatus,r=this.filterPriority==="all"||n.priority===this.filterPriority,l=this.filterRequirement==="all"||Array.isArray(n.requirements)&&n.requirements.some(c=>c.toLowerCase().includes(this.filterRequirement.toLowerCase()));return a&&s&&r&&l});return`
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Leads Directory</h1>
            <p>${t.totalLeads} total prospects tracked across LinkedIn outreach</p>
          </div>
          <button class="btn btn-primary" id="btn-leads-add-lead">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            + Add Lead
          </button>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 16px; margin-bottom: var(--space-20); box-shadow: var(--shadow-sm);">
          <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
            <div class="search-input-wrapper" style="flex: 1; min-width: 260px; max-width: 400px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" id="leads-table-search" class="input" placeholder="Search by name, company, role..." value="${this.searchQuery}" />
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <!-- Status Filter -->
              <select id="filter-status-select" class="select" style="width: auto; font-size: 13px;">
                <option value="all" ${this.filterStatus==="all"?"selected":""}>All Statuses</option>
                <option value="new" ${this.filterStatus==="new"?"selected":""}>New Leads</option>
                <option value="request_sent" ${this.filterStatus==="request_sent"?"selected":""}>Request Sent</option>
                <option value="connected" ${this.filterStatus==="connected"?"selected":""}>Connected</option>
                <option value="qualified" ${this.filterStatus==="qualified"?"selected":""}>Qualified</option>
                <option value="proposal" ${this.filterStatus==="proposal"?"selected":""}>Proposal</option>
                <option value="won" ${this.filterStatus==="won"?"selected":""}>Won</option>
                <option value="lost" ${this.filterStatus==="lost"?"selected":""}>Lost</option>
              </select>

              <!-- Priority Filter -->
              <select id="filter-priority-select" class="select" style="width: auto; font-size: 13px;">
                <option value="all" ${this.filterPriority==="all"?"selected":""}>All Priorities</option>
                <option value="high" ${this.filterPriority==="high"?"selected":""}>🔥 High</option>
                <option value="medium" ${this.filterPriority==="medium"?"selected":""}>Medium</option>
                <option value="low" ${this.filterPriority==="low"?"selected":""}>Low</option>
              </select>

              <!-- Requirement Filter -->
              <select id="filter-requirement-select" class="select" style="width: auto; font-size: 13px;">
                <option value="all" ${this.filterRequirement==="all"?"selected":""}>All Services</option>
                <option value="website" ${this.filterRequirement==="website"?"selected":""}>Website</option>
                <option value="mobile" ${this.filterRequirement==="mobile"?"selected":""}>Mobile App</option>
                <option value="ai" ${this.filterRequirement==="ai"?"selected":""}>AI/ML</option>
                <option value="ui/ux" ${this.filterRequirement==="ui/ux"?"selected":""}>UI/UX</option>
                <option value="software" ${this.filterRequirement==="software"?"selected":""}>Software</option>
              </select>

              <button id="btn-leads-reset" class="btn btn-ghost btn-sm" style="font-size: 12px;">Reset</button>
            </div>
          </div>
        </div>

        <!-- Leads Table (64px row height) -->
        <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); overflow: hidden; box-shadow: var(--shadow-sm);">
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
              <thead>
                <tr style="background: #F8FAFC; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em;">
                  <th style="padding: 14px 20px;">Lead Name</th>
                  <th style="padding: 14px 20px;">Company</th>
                  <th style="padding: 14px 20px;">Status</th>
                  <th style="padding: 14px 20px;">Priority</th>
                  <th style="padding: 14px 20px;">Services</th>
                  <th style="padding: 14px 20px;">Added</th>
                  <th style="padding: 14px 20px; text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody id="leads-table-body">
                ${o.length===0?`
                  <tr>
                    <td colspan="7">
                      <div class="empty-state">
                        <div class="empty-icon">📋</div>
                        <div class="empty-title">No leads match your filter</div>
                        <div class="empty-desc">Try resetting your search query or add a new lead.</div>
                        <button class="btn btn-primary btn-sm" onclick="window.dispatchEvent(new CustomEvent('techcrm:open-add-lead'))">+ Add Lead</button>
                      </div>
                    </td>
                  </tr>
                `:o.map(n=>{const a=n.name.split(" ").map(c=>c[0]).join("").substring(0,2).toUpperCase(),s=new Date(n.addedDate).toLocaleDateString("en-US",{month:"short",day:"numeric"});let r=`<span class="badge badge-${n.status}"><span class="badge-dot"></span> ${n.status.replace("_"," ")}</span>`,l=n.priority==="high"?'<span class="badge badge-priority-high">🔥 High</span>':n.priority==="medium"?'<span class="badge badge-priority-medium">Medium</span>':'<span class="badge badge-priority-low">Low</span>';return`
                    <tr style="height: 64px; border-bottom: 1px solid var(--border-subtle); cursor: pointer; transition: background var(--transition-fast);" class="lead-table-row" data-id="${n.id}">
                      <td style="padding: 12px 20px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <div class="avatar" style="width: 32px; height: 32px; font-size: 11px;">${a}</div>
                          <div>
                            <div style="font-weight: 600; color: var(--text-main);">${n.name}</div>
                            <div style="font-size: 11px; color: var(--text-muted);">${n.designation||"Prospect"}</div>
                          </div>
                        </div>
                      </td>

                      <td style="padding: 12px 20px; font-weight: 500; color: var(--text-secondary);">
                        ${n.company}
                      </td>

                      <td style="padding: 12px 20px;">
                        ${r}
                      </td>

                      <td style="padding: 12px 20px;">
                        ${l}
                      </td>

                      <td style="padding: 12px 20px;">
                        <div style="display: flex; gap: 4px; flex-wrap: wrap;">
                          ${(n.requirements||["Website"]).slice(0,2).map(c=>`<span class="tag-chip">${c}</span>`).join("")}
                        </div>
                      </td>

                      <td style="padding: 12px 20px; color: var(--text-muted); font-size: 12.5px;">
                        ${s}
                      </td>

                      <td style="padding: 12px 20px; text-align: right;">
                        <button class="btn btn-ghost btn-sm btn-open-lead-drawer" data-id="${n.id}">View</button>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("btn-leads-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))});const t=document.getElementById("leads-table-search");t&&t.addEventListener("input",s=>{this.searchQuery=s.target.value,this.refreshTable()});const i=document.getElementById("filter-status-select");i&&i.addEventListener("change",s=>{this.filterStatus=s.target.value,this.refreshTable()});const o=document.getElementById("filter-priority-select");o&&o.addEventListener("change",s=>{this.filterPriority=s.target.value,this.refreshTable()});const n=document.getElementById("filter-requirement-select");n&&n.addEventListener("change",s=>{this.filterRequirement=s.target.value,this.refreshTable()});const a=document.getElementById("btn-leads-reset");a&&a.addEventListener("click",()=>{this.searchQuery="",this.filterStatus="all",this.filterPriority="all",this.filterRequirement="all",this.refreshTable()}),this.bindRowClicks()},bindRowClicks(){document.querySelectorAll(".lead-table-row, .btn-open-lead-drawer").forEach(e=>{e.addEventListener("click",t=>{const i=e.getAttribute("data-id");i&&b.open(i)})})},refreshTable(){const e=document.getElementById("app");e&&window.location.hash.startsWith("#/leads")&&(e.querySelector(".page-container").outerHTML=this.render(),this.initListeners())}},$={getAll(){const e=p.getAll(),t={};e.forEach(n=>{const a=n.company||"Unknown Company";t[a]||(t[a]={name:a,industry:n.industry||"SaaS / Tech",location:n.location||"India",website:n.companyWebsite||"",contacts:[],requirements:new Set,potentialValue:0,status:n.status}),t[a].contacts.push({id:n.id,name:n.name,designation:n.designation,linkedinUrl:n.linkedinUrl,priority:n.priority,status:n.status}),Array.isArray(n.requirements)&&n.requirements.forEach(r=>t[a].requirements.add(r)),t[a].potentialValue+=Number(n.potentialValue)||1e5;const s={new:1,request_sent:2,connected:3,qualified:4,proposal:5,won:6,lost:0};(s[n.status]||0)>(s[t[a].status]||0)&&(t[a].status=n.status)});const i=Object.values(t).map(n=>({...n,requirements:Array.from(n.requirements)})),o=i.find(n=>n.name.toLowerCase().includes("abc"));return o&&o.contacts.length===2&&o.contacts.push({id:"contact-amit",name:"Amit Singhania",designation:"Product Manager",linkedinUrl:"https://linkedin.com/in/amit-abctech",priority:"medium",status:"proposal"}),i},getByName(e){return this.getAll().find(i=>i.name.toLowerCase()===decodeURIComponent(e).toLowerCase())||null}},Z={searchQuery:"",selectedCompany:null,render(){const t=$.getAll().filter(i=>!this.searchQuery||i.name.toLowerCase().includes(this.searchQuery.toLowerCase())||i.industry.toLowerCase().includes(this.searchQuery.toLowerCase()));return`
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Target Companies</h1>
            <p>Grouped accounts & decision-maker contacts across active opportunities</p>
          </div>
          <button class="btn btn-primary" onclick="window.dispatchEvent(new CustomEvent('techcrm:open-add-lead'))">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            + Add Company Lead
          </button>
        </div>

        <!-- Search Bar -->
        <div style="margin-bottom: var(--space-24); max-width: 400px;">
          <div class="search-input-wrapper">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="companies-search" class="input" placeholder="Search companies or industry..." value="${this.searchQuery}" />
          </div>
        </div>

        <!-- Companies Grid (~280 × 180px cards) -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          ${t.length===0?`
            <div style="grid-column: 1 / -1;">
              <div class="empty-state">
                <div class="empty-icon">🏢</div>
                <div class="empty-title">No companies found</div>
                <div class="empty-desc">No accounts match your query. Add a new lead to populate companies.</div>
              </div>
            </div>
          `:t.map(i=>`
            <div class="card company-card" data-name="${encodeURIComponent(i.name)}" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 20px; box-shadow: var(--shadow-sm); cursor: pointer; transition: all var(--transition-fast); display: flex; flex-direction: column; justify-content: space-between; height: 190px;">
              <div>
                <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 6px;">
                  <h3 style="font-size: 15px; font-weight: 600; color: var(--text-main); line-height: 1.3;">${i.name}</h3>
                  <span class="badge badge-${i.status||"new"}">${(i.status||"New").replace("_"," ")}</span>
                </div>
                <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">${i.industry} • ${i.location||"India"}</p>
                
                <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 8px;">
                  ${i.requirements.slice(0,3).map(o=>`<span class="tag-chip">${o}</span>`).join("")}
                </div>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 10px; font-size: 12px;">
                <span style="color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
                  👥 ${i.contacts.length} Contact${i.contacts.length>1?"s":""}
                </span>
                <span style="font-weight: 600; color: #4F46E5;">₹${i.potentialValue.toLocaleString("en-IN")}</span>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Company Details Modal -->
        <div id="company-details-modal" class="modal-overlay" style="display: none;">
          <div class="modal-dialog" style="max-width: 520px;">
            <div class="modal-header">
              <div>
                <h2 id="modal-comp-name" class="modal-title">Company Details</h2>
                <div id="modal-comp-sub" style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;"></div>
              </div>
              <button type="button" class="btn btn-ghost btn-icon" id="btn-close-comp-modal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div class="modal-body" id="modal-comp-body">
              <!-- Dynamically populated -->
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="btn-done-comp-modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("companies-search");e&&e.addEventListener("input",n=>{this.searchQuery=n.target.value;const a=document.getElementById("app");a&&window.location.hash.startsWith("#/companies")&&(a.querySelector(".page-container").outerHTML=this.render(),this.initListeners())}),document.querySelectorAll(".company-card").forEach(n=>{n.addEventListener("click",()=>{const a=n.getAttribute("data-name");a&&this.openDetails(a)})});const t=document.getElementById("btn-close-comp-modal"),i=document.getElementById("btn-done-comp-modal"),o=document.getElementById("company-details-modal");t&&t.addEventListener("click",()=>this.closeDetails()),i&&i.addEventListener("click",()=>this.closeDetails()),o&&o.addEventListener("click",n=>{n.target===o&&this.closeDetails()})},openDetails(e){const t=$.getByName(e);if(!t)return;const i=document.getElementById("company-details-modal"),o=document.getElementById("modal-comp-name"),n=document.getElementById("modal-comp-sub"),a=document.getElementById("modal-comp-body");i&&o&&n&&a&&(o.textContent=t.name,n.innerHTML=`${t.industry} • ${t.location||"India"} ${t.website?`• <a href="${t.website}" target="_blank" style="color: var(--primary);">${t.website.replace(/^https?:\/\//,"")}</a>`:""}`,a.innerHTML=`
        <!-- Contacts -->
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary); margin-bottom: 10px;">
            Key Contacts & Stakeholders
          </h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${t.contacts.map(s=>`
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: #F8FAFC; border: 1px solid var(--border-subtle); border-radius: 8px;">
                <div>
                  <div style="font-weight: 600; font-size: 13.5px; color: var(--text-main);">${s.name}</div>
                  <div style="font-size: 11.5px; color: var(--text-secondary);">${s.designation||"Team Member"}</div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <span class="badge badge-${s.status||"new"}">${(s.status||"new").replace("_"," ")}</span>
                  ${s.linkedinUrl?`<a href="${s.linkedinUrl}" target="_blank" style="color: #0A66C2; display: flex;" title="LinkedIn Profile"><svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/></svg></a>`:""}
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="drawer-divider"></div>

        <!-- Requirements -->
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary); margin-bottom: 10px;">
            Target Services Required
          </h4>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${t.requirements.map(s=>`<span class="tag-chip" style="font-size: 12px; padding: 4px 10px;">${s}</span>`).join("")}
          </div>
        </div>

        <div class="drawer-divider"></div>

        <!-- Opportunity Summary -->
        <div>
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-secondary); margin-bottom: 10px;">
            Opportunity Details
          </h4>
          <div style="background: #EEF2FF; border: 1px solid #C7D2FE; border-radius: 8px; padding: 14px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; color: #4338CA; font-weight: 500;">Current Stage</div>
              <div style="font-size: 15px; font-weight: 700; color: #312E81; text-transform: capitalize;">${(t.status||"New Leads").replace("_"," ")}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 12px; color: #4338CA; font-weight: 500;">Potential Deal Value</div>
              <div style="font-size: 18px; font-weight: 700; color: #312E81;">₹${t.potentialValue.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>
      `,i.style.display="flex",document.body.style.overflow="hidden")},closeDetails(){const e=document.getElementById("company-details-modal");e&&(e.style.display="none",document.body.style.overflow="")}},K={currentTab:"today",render(){const e=h.getByCategory(this.currentTab),t=h.getByCategory("today").length,i=h.getByCategory("upcoming").length,o=h.getByCategory("completed").length;return`
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Outreach Follow-ups</h1>
            <p>Task manager to ensure zero LinkedIn prospects slip through the cracks</p>
          </div>
          <button class="btn btn-primary" id="btn-schedule-followup-trigger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            + Schedule Follow-up
          </button>
        </div>

        <!-- Filter Tabs -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); margin-bottom: var(--space-24);">
          <button class="btn btn-ghost ${this.currentTab==="today"?"active":""}" id="tab-today" style="border-bottom: 2px solid ${this.currentTab==="today"?"var(--primary)":"transparent"}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentTab==="today"?"var(--primary)":"var(--text-secondary)"};">
            Today (${t})
          </button>
          <button class="btn btn-ghost ${this.currentTab==="upcoming"?"active":""}" id="tab-upcoming" style="border-bottom: 2px solid ${this.currentTab==="upcoming"?"var(--primary)":"transparent"}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentTab==="upcoming"?"var(--primary)":"var(--text-secondary)"};">
            Upcoming (${i})
          </button>
          <button class="btn btn-ghost ${this.currentTab==="completed"?"active":""}" id="tab-completed" style="border-bottom: 2px solid ${this.currentTab==="completed"?"var(--primary)":"transparent"}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentTab==="completed"?"var(--primary)":"var(--text-secondary)"};">
            Completed (${o})
          </button>
        </div>

        <!-- Tasks List -->
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 800px;">
          ${e.length===0?`
            <div class="empty-state">
              <div class="empty-icon">🎉</div>
              <div class="empty-title">All caught up!</div>
              <div class="empty-desc">You have no pending follow-up tasks in this category.</div>
              <button class="btn btn-secondary btn-sm" id="btn-schedule-empty">+ Schedule New Task</button>
            </div>
          `:e.map(n=>{let a="";return n.priority==="overdue"?a='<span class="badge" style="background: #FEE2E2; color: #DC2626;"><span class="badge-dot" style="background: #DC2626;"></span> 🔴 Overdue</span>':n.priority==="today"?a='<span class="badge" style="background: #FEF3C7; color: #D97706;"><span class="badge-dot" style="background: #F59E0B;"></span> 🟠 Due Today</span>':a='<span class="badge" style="background: #EEF2FF; color: #4F46E5;"><span class="badge-dot" style="background: #6366F1;"></span> 🔵 Upcoming</span>',`
              <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 20px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 12px; position: relative;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                  <div>
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                      <h3 style="font-size: 15px; font-weight: 600; color: var(--text-main);">${n.leadName}</h3>
                      <span style="font-size: 13px; color: var(--text-secondary);">•</span>
                      <span style="font-size: 13px; color: var(--text-secondary);">${n.company}</span>
                    </div>
                    <p style="font-size: 14px; color: var(--text-main); font-weight: 500;">
                      ${n.task}
                    </p>
                  </div>
                  <div>
                    ${a}
                  </div>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 4px; flex-wrap: wrap; gap: 8px;">
                  <span style="font-size: 12px; color: var(--text-muted);">
                    Scheduled: <strong>${n.dueLabel||"Today"}</strong>
                  </span>

                  <div style="display: flex; gap: 8px; align-items: center;">
                    ${n.linkedinUrl?`
                      <a href="${n.linkedinUrl}" target="_blank" class="btn btn-secondary btn-sm" style="gap: 6px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/></svg>
                        Open LinkedIn
                      </a>
                    `:""}

                    ${n.completed?`
                      <span style="font-size: 12px; color: #16A34A; font-weight: 600;">✓ Completed</span>
                    `:`
                      <button class="btn btn-ghost btn-sm btn-snooze-task" data-id="${n.id}">
                        Snooze
                      </button>
                      <button class="btn btn-primary btn-sm btn-complete-task" data-id="${n.id}" style="background: #16A34A;">
                        ✓ Complete
                      </button>
                    `}
                  </div>
                </div>
              </div>
            `}).join("")}
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("tab-today"),t=document.getElementById("tab-upcoming"),i=document.getElementById("tab-completed");e&&e.addEventListener("click",()=>{this.currentTab="today",this.reRender()}),t&&t.addEventListener("click",()=>{this.currentTab="upcoming",this.reRender()}),i&&i.addEventListener("click",()=>{this.currentTab="completed",this.reRender()});const o=document.getElementById("btn-schedule-followup-trigger"),n=document.getElementById("btn-schedule-empty");o&&o.addEventListener("click",()=>window.dispatchEvent(new CustomEvent("techcrm:open-schedule-followup"))),n&&n.addEventListener("click",()=>window.dispatchEvent(new CustomEvent("techcrm:open-schedule-followup"))),document.querySelectorAll(".btn-complete-task").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");h.complete(s),u.show("✓ Follow-up marked complete!"),this.reRender(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))})}),document.querySelectorAll(".btn-snooze-task").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-id");h.snooze(s,2),u.show("Task snoozed by 2 days"),this.reRender(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))})})},reRender(){const e=document.getElementById("app");e&&window.location.hash.startsWith("#/followups")&&(e.querySelector(".page-container").outerHTML=this.render(),this.initListeners())}},Y={render(){return`
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Outreach Performance Analytics</h1>
            <p>September 2026 • Real-time pipeline conversion & mentor feedback report</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <select class="select" style="width: auto; font-size: 13px;">
              <option>This Week (Sep 1 – Sep 7)</option>
              <option>Last 30 Days</option>
              <option>Q3 2026 Overview</option>
            </select>
            <button class="btn btn-secondary btn-sm" onclick="window.print()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Export Report
            </button>
          </div>
        </div>

        <!-- 💡 Mentor Insight Card (Smart UX Highlight) -->
        <div class="card" style="background: linear-gradient(135deg, #EEF2FF 0%, #FAF5FF 100%); border: 1px solid #C7D2FE; border-radius: var(--radius-card); padding: 20px; margin-bottom: var(--space-24); box-shadow: var(--shadow-sm); display: flex; gap: 16px; align-items: flex-start;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #6366F1; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);">
            💡
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <h3 style="font-size: 15px; font-weight: 700; color: #312E81;">Mentor AI Performance Insight</h3>
              <span class="badge" style="background: #DCFCE7; color: #15803D;">High Impact</span>
            </div>
            <p style="font-size: 13.5px; color: #3730A3; line-height: 1.5; margin-bottom: 6px;">
              "Your connection acceptance rate increased by <strong>+12%</strong> compared to last week (now at 51%). However, your <strong>Connected → Conversation</strong> conversion dropped by <strong>-8%</strong>."
            </p>
            <div style="font-size: 13px; color: #4338CA; font-weight: 500;">
              👉 <strong>Action Item:</strong> Personalize your initial message right after they accept. Mention specific technologies (e.g. Next.js, Flutter, PyTorch) from their company's stack.
            </div>
          </div>
        </div>

        <!-- 4 Key Efficiency Rates -->
        <div class="kpi-grid" style="margin-bottom: var(--space-24);">
          <div class="kpi-card">
            <div class="kpi-header">Connection Rate</div>
            <div class="kpi-value-row">
              <div class="kpi-value">51%</div>
              <div class="kpi-trend">↑ 12%</div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">48 connections / 94 sent</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">Conversation Rate</div>
            <div class="kpi-value-row">
              <div class="kpi-value">64%</div>
              <div style="font-size: 12px; font-weight: 600; color: var(--danger); background: var(--danger-light); padding: 2px 6px; border-radius: 4px;">↓ 8%</div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">31 conversations / 48 connected</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">Proposal Rate</div>
            <div class="kpi-value-row">
              <div class="kpi-value">26%</div>
              <div class="kpi-trend">↑ 4%</div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">8 proposals / 31 chats</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">Win Rate</div>
            <div class="kpi-value-row">
              <div class="kpi-value">62%</div>
              <div class="kpi-trend">↑ 7%</div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">5 won / 8 proposals</div>
          </div>
        </div>

        <!-- Conversion Funnel & Lost Breakdown Layout -->
        <div class="analytics-funnel-grid" style="display: grid; grid-template-columns: 60% calc(40% - 16px); gap: 16px;">
          <!-- Funnel Visualization -->
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
              <div>
                <h3 class="section-heading" style="font-size: 16px;">Lead Conversion Funnel</h3>
                <p style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">Visual drop-off across all outreach stages</p>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 14px;">
              <!-- Stage 1 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>1. LEADS FOUND</span>
                  <span>126</span>
                </div>
                <div style="height: 28px; background: #6366F1; border-radius: 6px; width: 100%; display: flex; align-items: center; padding: 0 12px; color: #FFFFFF; font-size: 12px; font-weight: 600;">
                  100% Top of Funnel
                </div>
              </div>

              <!-- Stage 2 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>2. REQUESTS SENT</span>
                  <span>94</span>
                </div>
                <div style="height: 28px; background: #818CF8; border-radius: 6px; width: 74.6%; display: flex; align-items: center; padding: 0 12px; color: #FFFFFF; font-size: 12px; font-weight: 600;">
                  75% Outreach Sent
                </div>
              </div>

              <!-- Stage 3 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>3. CONNECTED</span>
                  <span>48</span>
                </div>
                <div style="height: 28px; background: #A5B4FC; border-radius: 6px; width: 38%; display: flex; align-items: center; padding: 0 12px; color: #1E1B4B; font-size: 12px; font-weight: 600;">
                  51% Acceptance
                </div>
              </div>

              <!-- Stage 4 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>4. CONVERSATION</span>
                  <span>31</span>
                </div>
                <div style="height: 28px; background: #C7D2FE; border-radius: 6px; width: 24.6%; display: flex; align-items: center; padding: 0 12px; color: #1E1B4B; font-size: 12px; font-weight: 600;">
                  64% Engaged
                </div>
              </div>

              <!-- Stage 5 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>5. PROPOSAL SENT</span>
                  <span>8</span>
                </div>
                <div style="height: 28px; background: #0284C7; border-radius: 6px; width: 14%; display: flex; align-items: center; padding: 0 10px; color: #FFFFFF; font-size: 12px; font-weight: 600;">
                  8 Proposals
                </div>
              </div>

              <!-- Stage 6 -->
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 4px;">
                  <span>6. WON DEALS 🏆</span>
                  <span>5 (₹8,50,000)</span>
                </div>
                <div style="height: 28px; background: #16A34A; border-radius: 6px; width: 10%; display: flex; align-items: center; padding: 0 8px; color: #FFFFFF; font-size: 12px; font-weight: 700;">
                  5 Won
                </div>
              </div>
            </div>
          </div>

          <!-- Lost Reasons & Service Demand -->
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h3 class="section-heading" style="font-size: 16px; margin-bottom: 4px;">Why Leads Were Lost</h3>
              <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">Breakdown of lost opportunity objections</p>

              <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 4px;">
                    <span>Budget issue / pricing</span>
                    <strong>40%</strong>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px;">
                    <div style="width: 40%; height: 100%; background: #DC2626; border-radius: 3px;"></div>
                  </div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 4px;">
                    <span>No response after follow-up</span>
                    <strong>30%</strong>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px;">
                    <div style="width: 30%; height: 100%; background: #F59E0B; border-radius: 3px;"></div>
                  </div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 4px;">
                    <span>Went with competitor / internal</span>
                    <strong>20%</strong>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px;">
                    <div style="width: 20%; height: 100%; background: #64748B; border-radius: 3px;"></div>
                  </div>
                </div>

                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 12.5px; margin-bottom: 4px;">
                    <span>No immediate requirement</span>
                    <strong>10%</strong>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px;">
                    <div style="width: 10%; height: 100%; background: #94A3B8; border-radius: 3px;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Service Requirement Distribution -->
            <div style="border-top: 1px solid var(--border-subtle); padding-top: 16px;">
              <h4 style="font-size: 13px; font-weight: 600; margin-bottom: 8px;">Top Requested Tech Services</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                <span class="tag-chip" style="padding: 4px 8px; font-size: 12px;">🌐 Website: 42%</span>
                <span class="tag-chip" style="padding: 4px 8px; font-size: 12px;">📱 Mobile App: 28%</span>
                <span class="tag-chip" style="padding: 4px 8px; font-size: 12px;">🤖 AI/ML: 18%</span>
                <span class="tag-chip" style="padding: 4px 8px; font-size: 12px;">🎨 UI/UX: 12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `},initListeners(){}},J={currentSection:"pipeline",render(){const e=d.get(d.KEYS.PIPELINE_STAGES,[]),t=[{name:"Neha Jain",role:"Sales / Fullstack Dev",leads:48,status:"Active",avatar:"NJ",isCurrent:!0},{name:"Aman Sharma",role:"Outreach Specialist",leads:37,status:"Active",avatar:"AS",isCurrent:!1},{name:"Priya Verma",role:"Agency Manager",leads:15,status:"Active",avatar:"PV",isCurrent:!1}];return`
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Settings & Preferences</h1>
            <p>Configure pipeline stages, team members, outreach parameters and roles</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); margin-bottom: var(--space-24);">
          <button class="btn btn-ghost ${this.currentSection==="pipeline"?"active":""}" id="tab-sec-pipeline" style="border-bottom: 2px solid ${this.currentSection==="pipeline"?"var(--primary)":"transparent"}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentSection==="pipeline"?"var(--primary)":"var(--text-secondary)"};">
            Pipeline Stages
          </button>
          <button class="btn btn-ghost ${this.currentSection==="team"?"active":""}" id="tab-sec-team" style="border-bottom: 2px solid ${this.currentSection==="team"?"var(--primary)":"transparent"}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentSection==="team"?"var(--primary)":"var(--text-secondary)"};">
            Team & Roles
          </button>
          <button class="btn btn-ghost ${this.currentSection==="general"?"active":""}" id="tab-sec-general" style="border-bottom: 2px solid ${this.currentSection==="general"?"var(--primary)":"transparent"}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentSection==="general"?"var(--primary)":"var(--text-secondary)"};">
            General & Tags
          </button>
        </div>

        <!-- Pipeline Stages Section -->
        ${this.currentSection==="pipeline"?`
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; max-width: 700px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <h3 style="font-size: 16px; font-weight: 600;">Custom Outreach Stages</h3>
                <p style="font-size: 13px; color: var(--text-secondary);">Manage columns appearing in your Jira-style pipeline board</p>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;" id="stages-list">
              ${e.map((i,o)=>`
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #F8FAFC; border: 1px solid var(--border-color); border-radius: 8px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="cursor: grab; color: var(--text-muted); font-size: 16px;">☰</span>
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: ${i.color||"#6366F1"};"></span>
                    <span style="font-weight: 600; font-size: 14px; color: var(--text-main);">${i.name}</span>
                  </div>
                  <div style="display: flex; gap: 6px;">
                    <span class="badge" style="background: #EEF2FF; color: #4F46E5;">Stage ${o+1}</span>
                  </div>
                </div>
              `).join("")}
            </div>

            <!-- Add stage inline -->
            <div style="display: flex; gap: 10px; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
              <input type="text" id="new-stage-input" class="input" placeholder="e.g. Contract In Review" style="flex: 1;" />
              <button class="btn btn-secondary" id="btn-add-stage">+ Add Stage</button>
            </div>
          </div>
        `:""}

        <!-- Team & Roles Section -->
        ${this.currentSection==="team"?`
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); overflow: hidden; max-width: 800px; box-shadow: var(--shadow-sm);">
            <div style="padding: 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="font-size: 16px; font-weight: 600;">Team Members & Outreach Seats</h3>
                <p style="font-size: 13px; color: var(--text-secondary);">3 Active team members prospecting on LinkedIn</p>
              </div>
              <button class="btn btn-primary btn-sm" id="btn-invite-member">+ Invite Member</button>
            </div>

            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
              <thead>
                <tr style="background: #F8FAFC; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">
                  <th style="padding: 12px 20px;">User</th>
                  <th style="padding: 12px 20px;">Role</th>
                  <th style="padding: 12px 20px;">Leads Assigned</th>
                  <th style="padding: 12px 20px;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${t.map(i=>`
                  <tr style="height: 60px; border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 12px 20px;">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="avatar" style="width: 32px; height: 32px; font-size: 11px;">${i.avatar}</div>
                        <div>
                          <span style="font-weight: 600;">${i.name}</span>
                          ${i.isCurrent?'<span class="badge" style="margin-left: 6px; background: #EEF2FF; color: #4F46E5;">You</span>':""}
                        </div>
                      </div>
                    </td>
                    <td style="padding: 12px 20px; color: var(--text-secondary);">${i.role}</td>
                    <td style="padding: 12px 20px; font-weight: 600;">${i.leads}</td>
                    <td style="padding: 12px 20px;">
                      <span class="badge badge-won"><span class="badge-dot"></span> Active</span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `:""}

        <!-- General Section -->
        ${this.currentSection==="general"?`
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; max-width: 600px; box-shadow: var(--shadow-sm);">
            <h3 style="font-size: 16px; font-weight: 600; margin-bottom: 16px;">Agency & Service Tags</h3>
            
            <div class="form-group">
              <label class="form-label">Active Tech Services Offered</label>
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                <span class="tag-chip" style="padding: 6px 12px; font-size: 13px;">🌐 Website Development</span>
                <span class="tag-chip" style="padding: 6px 12px; font-size: 13px;">📱 Mobile App Development</span>
                <span class="tag-chip" style="padding: 6px 12px; font-size: 13px;">💻 Custom Software</span>
                <span class="tag-chip" style="padding: 6px 12px; font-size: 13px;">🤖 AI/ML Solutions</span>
                <span class="tag-chip" style="padding: 6px 12px; font-size: 13px;">🎨 UI/UX Design</span>
              </div>
            </div>

            <div class="drawer-divider"></div>

            <div class="form-group">
              <label class="form-label">Data Management</label>
              <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Reset all mock data back to default template demo state.</p>
              <button id="btn-reset-demo-data" class="btn btn-secondary btn-sm" style="color: var(--danger);">
                Restore Factory Demo Data
              </button>
            </div>
          </div>
        `:""}
      </div>
    `},initListeners(){const e=document.getElementById("tab-sec-pipeline"),t=document.getElementById("tab-sec-team"),i=document.getElementById("tab-sec-general");e&&e.addEventListener("click",()=>{this.currentSection="pipeline",this.reRender()}),t&&t.addEventListener("click",()=>{this.currentSection="team",this.reRender()}),i&&i.addEventListener("click",()=>{this.currentSection="general",this.reRender()});const o=document.getElementById("btn-add-stage"),n=document.getElementById("new-stage-input");o&&n&&o.addEventListener("click",()=>{const r=n.value.trim();if(r){const l=d.get(d.KEYS.PIPELINE_STAGES,[]),c=r.toLowerCase().replace(/\s+/g,"_");l.push({id:c,name:r,color:"#6366F1"}),d.set(d.KEYS.PIPELINE_STAGES,l),u.show(`✓ Added stage "${r}"`),this.reRender(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}});const a=document.getElementById("btn-reset-demo-data");a&&a.addEventListener("click",()=>{localStorage.clear(),d.init(),u.show("Default data successfully restored!"),setTimeout(()=>window.location.reload(),500)});const s=document.getElementById("btn-invite-member");s&&s.addEventListener("click",()=>{u.show("Invitation link copied to clipboard!")})},reRender(){const e=document.getElementById("app");e&&window.location.hash.startsWith("#/settings")&&(e.querySelector(".page-container").outerHTML=this.render(),this.initListeners())}};class G{constructor(){this.appEl=document.getElementById("app"),this.modalRoot=document.getElementById("modal-root"),this.currentRoute="/dashboard",this.routes={"/login":W,"/dashboard":C,"/pipeline":V,"/leads":_,"/companies":Z,"/followups":K,"/analytics":Y,"/settings":J},this.init()}init(){d.init(),this.mountModals(),this.registerGlobalEvents(),window.addEventListener("hashchange",()=>this.handleRoute()),window.location.hash?this.handleRoute():window.location.hash="#/dashboard"}mountModals(){this.modalRoot&&(this.modalRoot.innerHTML=`
        ${b.render()}
        ${w.render()}
        ${L.render()}
        ${k.render()}
        ${E.render()}
      `,b.initGlobalListeners(),w.initListeners(),L.initListeners(),k.initListeners(),E.initListeners())}registerGlobalEvents(){window.addEventListener("techcrm:open-add-lead",()=>{w.open()}),window.addEventListener("techcrm:open-schedule-followup",()=>{k.open()}),window.addEventListener("techcrm:confirm-delete",t=>{var i;(i=t.detail)!=null&&i.leadId&&E.open(t.detail.leadId)}),window.addEventListener("techcrm:data-changed",()=>{this.renderCurrentView()})}getRoutePath(){const t=window.location.hash.slice(1);return t&&t.split("?")[0]||"/dashboard"}handleRoute(){const t=this.getRoutePath();if(t!=="/login"&&!y.isAuthenticated()){window.location.hash="#/login";return}if(t==="/login"&&y.isAuthenticated()){window.location.hash="#/dashboard";return}this.currentRoute=t,this.renderCurrentView()}renderCurrentView(){const t=this.routes[this.currentRoute]||C;if(this.currentRoute==="/login"){this.appEl.innerHTML=t.render(),t.initListeners();return}this.appEl.innerHTML=`
      <div class="app-shell">
        ${j.render(this.currentRoute)}
        <div class="main-wrapper">
          ${A.render()}
          <main id="main-content-area">
            ${t.render()}
          </main>
        </div>
        ${U.render(this.currentRoute)}
      </div>
    `,A.initListeners(),t.initListeners&&t.initListeners()}}new G;
