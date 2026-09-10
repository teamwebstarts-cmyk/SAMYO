(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}})();const g={LEADS:"techcrm_leads",FOLLOWUPS:"techcrm_followups",ACTIVITIES:"techcrm_activities",COMPANIES:"techcrm_companies",NOTIFICATIONS:"techcrm_notifications",USER:"techcrm_user",PIPELINE_STAGES:"techcrm_pipeline_stages"},_=[{id:"new",name:"New Leads",color:"#64748B"},{id:"request_sent",name:"Request Sent",color:"#F59E0B"},{id:"connected",name:"Connected",color:"#6366F1"},{id:"qualified",name:"Qualified",color:"#8B5CF6"},{id:"proposal",name:"Proposal Sent",color:"#0284C7"},{id:"won",name:"Won",color:"#16A34A"}],H={name:"Neha Jain",email:"neha.jain@techcrm.io",role:"Web Developer / Outreach Specialist",avatar:"NJ"},V=[{id:"lead-1",name:"Rahul Sharma",company:"ABC Technologies",designation:"Founder & CEO",linkedinUrl:"https://linkedin.com/in/rahul-sharma-abctech",companyWebsite:"https://abctechnologies.io",industry:"SaaS",location:"Jaipur, India",requirements:["Website","Mobile App"],priority:"high",status:"connected",potentialValue:1e5,addedDate:"2026-09-04T09:30:00.000Z",notes:[{id:"n1",text:"Interested in redesigning company website and building MVP mobile app.",createdAt:"2026-09-05T10:15:00.000Z",author:"Neha Jain"}],activities:[{id:"a1",title:"Connected on LinkedIn",time:"10 min ago",date:"2026-09-06T10:45:00.000Z"},{id:"a2",title:"Connection Request Sent",time:"Sep 3",date:"2026-09-03T11:00:00.000Z"},{id:"a3",title:"Lead Added via LinkedIn Prospecting",time:"Sep 2",date:"2026-09-02T09:30:00.000Z"}]},{id:"lead-2",name:"Priya Sharma",company:"ABC Technologies",designation:"CTO",linkedinUrl:"https://linkedin.com/in/priya-sharma-cto",companyWebsite:"https://abctechnologies.io",industry:"SaaS",location:"Jaipur, India",requirements:["AI/ML","Website"],priority:"high",status:"connected",potentialValue:15e4,addedDate:"2026-09-04T10:00:00.000Z",notes:[{id:"n2",text:"Wants to explore integrating AI chatbot into their customer onboarding flow.",createdAt:"2026-09-05T14:20:00.000Z",author:"Neha Jain"}],activities:[{id:"a4",title:"Accepted LinkedIn connection",time:"2 hours ago",date:"2026-09-06T09:00:00.000Z"},{id:"a5",title:"Outreach request sent",time:"Sep 4",date:"2026-09-04T10:15:00.000Z"}]},{id:"lead-3",name:"Aman Verma",company:"XYZ Pvt Ltd",designation:"Founder & CEO",linkedinUrl:"https://linkedin.com/in/aman-verma-xyz",companyWebsite:"https://xyzfintech.in",industry:"FinTech",location:"Bengaluru, India",requirements:["Mobile App","Software"],priority:"medium",status:"proposal",potentialValue:25e4,addedDate:"2026-09-03T14:10:00.000Z",notes:[{id:"n3",text:"Sent formal proposal for custom iOS & Android payment gateway integration app.",createdAt:"2026-09-05T16:00:00.000Z",author:"Neha Jain"}],activities:[{id:"a6",title:"Moved to Proposal Sent",time:"Yesterday",date:"2026-09-05T16:05:00.000Z"},{id:"a7",title:"Scope discovery call completed",time:"Sep 4",date:"2026-09-04T12:00:00.000Z"}]},{id:"lead-4",name:"Karan Mehra",company:"TechCorp Solutions",designation:"VP of Product",linkedinUrl:"https://linkedin.com/in/karan-mehra-techcorp",companyWebsite:"https://techcorp.co",industry:"EdTech",location:"Mumbai, India",requirements:["Website","UI/UX"],priority:"high",status:"qualified",potentialValue:18e4,addedDate:"2026-09-03T11:00:00.000Z",notes:[{id:"n4",text:"Needs modern student learning portal redesign with sleek UI/UX.",createdAt:"2026-09-04T11:30:00.000Z",author:"Neha Jain"}],activities:[{id:"a8",title:"Lead qualified during 20m intro chat",time:"Sep 4",date:"2026-09-04T15:00:00.000Z"}]},{id:"lead-5",name:"Vikram Aditya",company:"Innovate Labs",designation:"Chief Executive Officer",linkedinUrl:"https://linkedin.com/in/vikram-innovate",companyWebsite:"https://innovatelabs.ai",industry:"AI/ML",location:"Gurugram, India",requirements:["AI/ML","Software"],priority:"high",status:"won",potentialValue:32e4,addedDate:"2026-08-28T09:00:00.000Z",notes:[{id:"n5",text:"Contract signed! Starting phase 1 LLM model integration next Monday.",createdAt:"2026-09-05T18:00:00.000Z",author:"Neha Jain"}],activities:[{id:"a9",title:"Contract Signed - Deal Won! 🏆",time:"Sep 5",date:"2026-09-05T17:45:00.000Z"}]},{id:"lead-6",name:"Sneha Patel",company:"CloudScale Systems",designation:"Head of Engineering",linkedinUrl:"https://linkedin.com/in/sneha-cloudscale",companyWebsite:"https://cloudscale.dev",industry:"Cloud Infrastructure",location:"Pune, India",requirements:["Software"],priority:"medium",status:"request_sent",potentialValue:12e4,addedDate:"2026-09-05T08:20:00.000Z",notes:[],activities:[{id:"a10",title:"LinkedIn connection request sent with custom note",time:"Sep 5",date:"2026-09-05T08:25:00.000Z"}]},{id:"lead-7",name:"Rajesh Kothari",company:"Nexa Digital Media",designation:"Managing Director",linkedinUrl:"https://linkedin.com/in/rajesh-nexa",companyWebsite:"https://nexadigital.com",industry:"Digital Media",location:"Delhi NCR, India",requirements:["Website","UI/UX"],priority:"low",status:"new",potentialValue:85e3,addedDate:"2026-09-06T07:15:00.000Z",notes:[],activities:[{id:"a11",title:"Discovered on LinkedIn Sales Navigator",time:"Today",date:"2026-09-06T07:20:00.000Z"}]},{id:"lead-8",name:"Ananya Roy",company:"Healthify App Tech",designation:"Co-Founder & COO",linkedinUrl:"https://linkedin.com/in/ananya-healthify",companyWebsite:"https://healthifyapp.co",industry:"HealthTech",location:"Hyderabad, India",requirements:["Mobile App"],priority:"high",status:"new",potentialValue:21e4,addedDate:"2026-09-06T08:00:00.000Z",notes:[],activities:[{id:"a12",title:"Lead Added to Pipeline",time:"Today",date:"2026-09-06T08:05:00.000Z"}]},{id:"lead-9",name:"Deepak Singhania",company:"RetailHub Commerce",designation:"Founder",linkedinUrl:"https://linkedin.com/in/deepak-retailhub",companyWebsite:"https://retailhub.in",industry:"E-commerce",location:"Ahmedabad, India",requirements:["Website","Software"],priority:"medium",status:"lost",potentialValue:9e4,lostReason:"Budget issue",addedDate:"2026-08-25T11:00:00.000Z",notes:[{id:"n6",text:"Lost due to budget limitations. Re-connect in Q1 2027.",createdAt:"2026-09-02T16:00:00.000Z",author:"Neha Jain"}],activities:[{id:"a13",title:"Marked as Lost (Budget issue)",time:"Sep 2",date:"2026-09-02T16:05:00.000Z"}]}],K=[{id:"f-1",leadId:"lead-1",leadName:"Rahul Sharma",company:"ABC Technologies",task:"Follow up regarding website proposal and timeline estimate",dueDate:"2026-09-06T11:00:00.000Z",dueLabel:"Today, 11:00 AM",category:"today",priority:"overdue",linkedinUrl:"https://linkedin.com/in/rahul-sharma-abctech",completed:!1},{id:"f-2",leadId:"lead-2",leadName:"Priya Sharma",company:"ABC Technologies",task:"Send AI chatbot architecture breakdown & past case study",dueDate:"2026-09-08T15:00:00.000Z",dueLabel:"Sep 8, 3:00 PM",category:"upcoming",priority:"upcoming",linkedinUrl:"https://linkedin.com/in/priya-sharma-cto",completed:!1},{id:"f-3",leadId:"lead-3",leadName:"Aman Verma",company:"XYZ Pvt Ltd",task:"Follow-up message on proposal feedback & budget review",dueDate:"2026-09-10T11:30:00.000Z",dueLabel:"Sep 10, 11:30 AM",category:"upcoming",priority:"upcoming",linkedinUrl:"https://linkedin.com/in/aman-verma-xyz",completed:!1},{id:"f-4",leadId:"lead-4",leadName:"Karan Mehra",company:"TechCorp Solutions",task:"Schedule 30m scoping meeting with tech lead",dueDate:"2026-09-12T14:00:00.000Z",dueLabel:"Sep 12, 2:00 PM",category:"upcoming",priority:"upcoming",linkedinUrl:"https://linkedin.com/in/karan-mehra-techcorp",completed:!1}],Y=[{id:"act-1",text:"Rahul Sharma moved to Connected",time:"10 min ago",type:"connected"},{id:"act-2",text:"Priya Sharma accepted connection",time:"2 hours ago",type:"request_sent"},{id:"act-3",text:"XYZ Technologies moved to Proposal",time:"Yesterday",type:"proposal"},{id:"act-4",text:"Vikram Aditya marked as Deal Won! 🏆",time:"2 days ago",type:"won"},{id:"act-5",text:"Outreach campaign #4 launched: 18 requests sent",time:"3 days ago",type:"new"}],Z=[{id:"n-1",text:"Rahul Sharma accepted your connection request",time:"10 minutes ago",dotColor:"notif-blue",unread:!0},{id:"n-2",text:"Follow-up overdue with Priya Sharma (ABC Tech)",time:"2 hours ago",dotColor:"notif-orange",unread:!0},{id:"n-3",text:"XYZ Technologies proposal viewed on client portal",time:"Yesterday",dotColor:"notif-green",unread:!1},{id:"n-4",text:"New LinkedIn prospect identified: Rajesh Kothari",time:"2 days ago",dotColor:"notif-blue",unread:!1}],l={init(){localStorage.getItem(g.LEADS)||localStorage.setItem(g.LEADS,JSON.stringify(V)),localStorage.getItem(g.FOLLOWUPS)||localStorage.setItem(g.FOLLOWUPS,JSON.stringify(K)),localStorage.getItem(g.ACTIVITIES)||localStorage.setItem(g.ACTIVITIES,JSON.stringify(Y)),localStorage.getItem(g.NOTIFICATIONS)||localStorage.setItem(g.NOTIFICATIONS,JSON.stringify(Z)),localStorage.getItem(g.USER)||localStorage.setItem(g.USER,JSON.stringify(H)),localStorage.getItem(g.PIPELINE_STAGES)||localStorage.setItem(g.PIPELINE_STAGES,JSON.stringify(_))},get(e,t=null){try{const i=localStorage.getItem(e);return i?JSON.parse(i):t}catch(i){return console.error("Storage Read Error:",i),t}},set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(i){console.error("Storage Write Error:",i)}},KEYS:g};l.init();const J="https://samyo-crm-api.onrender.com/api",G="http://localhost:5000/api",X=!!(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168.")),x=X?G:J,y={getHeaders(){const e={"Content-Type":"application/json"},t=localStorage.getItem("techcrm_token");return t&&(e.Authorization=`Bearer ${t}`),e},async get(e){try{const t=await fetch(`${x}${e}`,{method:"GET",headers:this.getHeaders()});if(!t.ok)throw new Error(`HTTP ${t.status}: ${t.statusText}`);return await t.json()}catch(t){throw console.warn(`ApiService.get(${e}) failed:`,t.message),t}},async post(e,t){try{const i=await fetch(`${x}${e}`,{method:"POST",headers:this.getHeaders(),body:JSON.stringify(t)}),n=await i.json();if(!i.ok)throw new Error(n.message||`HTTP ${i.status}`);return n}catch(i){throw console.warn(`ApiService.post(${e}) failed:`,i.message),i}},async put(e,t){try{const i=await fetch(`${x}${e}`,{method:"PUT",headers:this.getHeaders(),body:JSON.stringify(t)}),n=await i.json();if(!i.ok)throw new Error(n.message||`HTTP ${i.status}`);return n}catch(i){throw console.warn(`ApiService.put(${e}) failed:`,i.message),i}},async patch(e,t){try{const i=await fetch(`${x}${e}`,{method:"PATCH",headers:this.getHeaders(),body:JSON.stringify(t)}),n=await i.json();if(!i.ok)throw new Error(n.message||`HTTP ${i.status}`);return n}catch(i){throw console.warn(`ApiService.patch(${e}) failed:`,i.message),i}},async delete(e){try{const t=await fetch(`${x}${e}`,{method:"DELETE",headers:this.getHeaders()}),i=await t.json();if(!t.ok)throw new Error(i.message||`HTTP ${t.status}`);return i}catch(t){throw console.warn(`ApiService.delete(${e}) failed:`,t.message),t}}},w={getCurrentUser(){return l.get(l.KEYS.USER,{name:"Neha Jain",email:"neha.jain@techcrm.io",role:"Web Developer / Outreach Specialist",avatar:"NJ"})},isAuthenticated(){return localStorage.getItem("techcrm_logged_in")!=="false"},async login(e,t){try{const i=await y.post("/auth/login",{email:e,password:t});return i.token&&localStorage.setItem("techcrm_token",i.token),i.user&&l.set(l.KEYS.USER,i.user),localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:i.user||this.getCurrentUser()}}catch(i){return console.warn("Backend login fallback (offline/local):",i.message),localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:this.getCurrentUser()}}},async register(e,t,i,n){try{const a=await y.post("/auth/register",{name:e,email:t,password:i,role:n});return a.token&&localStorage.setItem("techcrm_token",a.token),a.user&&l.set(l.KEYS.USER,a.user),localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:a.user}}catch(a){throw a}},logout(){localStorage.removeItem("techcrm_token"),localStorage.setItem("techcrm_logged_in","false"),window.location.hash="#/login"}},m={async syncWithServer(){try{const e=await y.get("/leads");if(Array.isArray(e)&&e.length>0)return l.set(l.KEYS.LEADS,e),e}catch(e){console.warn("Could not sync with MongoDB server, using local cache:",e.message)}return this.getAll()},getAll(){return l.get(l.KEYS.LEADS,[])},getById(e){return this.getAll().find(i=>i.id===e||i._id===e)||null},async create(e){const t=this.getAll(),i=e.company&&typeof e.company=="string"?e.company.trim():"",a={id:"lead-"+Date.now(),name:e.name&&typeof e.name=="string"?e.name.trim():"Unnamed Lead",company:i,designation:e.designation&&typeof e.designation=="string"?e.designation.trim():"",linkedinUrl:e.linkedinUrl&&typeof e.linkedinUrl=="string"?e.linkedinUrl.trim():"",companyWebsite:e.companyWebsite&&typeof e.companyWebsite=="string"?e.companyWebsite.trim():"",industry:e.industry||"",location:e.location&&typeof e.location=="string"?e.location.trim():"",requirements:Array.isArray(e.requirements)?e.requirements:[],priority:e.priority||"medium",status:"new",potentialValue:Number(e.potentialValue)||0,addedDate:new Date().toISOString(),notes:e.notes?[{id:"n-"+Date.now(),text:e.notes,createdAt:new Date().toISOString(),author:"Neha Jain"}]:[],activities:[{id:"act-"+Date.now(),title:"Lead Added to Pipeline",time:"Just now",date:new Date().toISOString()}]};try{const o=await y.post("/leads",a);o&&(o.id||o._id)&&(a.id=o.id||o._id)}catch(o){console.warn("MongoDB cloud save warning (saving locally):",o.message)}t.unshift(a),l.set(l.KEYS.LEADS,t);const s=a.company?` (${a.company})`:"";return this.recordGlobalActivity(`${a.name}${s} added as New Lead`,"new"),a},update(e,t){const i=this.getAll(),n=i.findIndex(a=>a.id===e||a._id===e);return n===-1?null:(i[n]={...i[n],...t},l.set(l.KEYS.LEADS,i),y.put(`/leads/${e}`,t).catch(a=>{console.warn("MongoDB update warning:",a.message)}),i[n])},updateStatus(e,t,i={}){const n=this.getById(e);if(!n)return null;const a=n.status;if(a===t)return n;const s={new:"New Leads",request_sent:"Request Sent",connected:"Connected",qualified:"Qualified",proposal:"Proposal",won:"Won",lost:"Lost"},o={id:"act-"+Date.now(),title:`Moved from ${s[a]||a} to ${s[t]||t}`,time:"Just now",date:new Date().toISOString()},r={status:t,activities:[o,...n.activities||[]],...i},d=this.update(e,r);return this.recordGlobalActivity(`${n.name} moved to ${s[t]||t}`,t),y.patch(`/leads/${e}/status`,{status:t,...i}).catch(c=>{console.warn("MongoDB status update warning:",c.message)}),d},addNote(e,t){const i=this.getById(e);if(!i||!t.trim())return null;const a=[{id:"note-"+Date.now(),text:t.trim(),createdAt:new Date().toISOString(),author:"Neha Jain"},...i.notes||[]],s=this.update(e,{notes:a});return y.post(`/leads/${e}/notes`,{text:t.trim(),author:"Neha Jain"}).catch(o=>{console.warn("MongoDB note save warning:",o.message)}),s},addActivity(e,t){const i=this.getById(e);if(!i||!t.trim())return null;const a=[{id:"act-"+Date.now(),title:t.trim(),time:"Just now",date:new Date().toISOString()},...i.activities||[]];return this.update(e,{activities:a})},delete(e){const t=this.getAll().filter(i=>i.id!==e&&i._id!==e);return l.set(l.KEYS.LEADS,t),y.delete(`/leads/${e}`).catch(i=>{console.warn("MongoDB delete warning:",i.message)}),!0},recordGlobalActivity(e,t){const i=l.get(l.KEYS.ACTIVITIES,[]);i.unshift({id:"g-act-"+Date.now(),text:e,time:"Just now",type:t}),l.set(l.KEYS.ACTIVITIES,i.slice(0,20))},getStats(){const e=this.getAll(),t={new:0,request_sent:0,connected:0,qualified:0,proposal:0,won:0,lost:0};e.forEach(o=>{t[o.status]!==void 0&&t[o.status]++});const i=e.length,n=t.connected||0,a=t.proposal||0,s=t.won||0;return{totalLeads:i,connections:n,proposals:a,won:s,breakdown:{newLeads:t.new||0,requests:t.request_sent||0,connected:t.connected||0,qualified:t.qualified||0,proposal:t.proposal||0,won:t.won||0,lost:t.lost||0},actualCounts:t}}},q={render(){const e=l.get(l.KEYS.NOTIFICATIONS,[]);return`
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
    `},initListeners(){const e=document.getElementById("btn-mark-all-read");e&&e.addEventListener("click",()=>{const i=l.get(l.KEYS.NOTIFICATIONS,[]).map(s=>({...s,unread:!1}));l.set(l.KEYS.NOTIFICATIONS,i);const n=document.getElementById("notif-badge-count");n&&(n.style.display="none");const a=document.getElementById("notification-panel");a&&a.querySelectorAll(".notification-item").forEach(s=>s.classList.remove("unread"))})}},R={render(){const e=w.getCurrentUser(),i=l.get(l.KEYS.NOTIFICATIONS,[]).filter(n=>n.unread).length;return`
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
            <input type="text" id="global-search-input" class="input" placeholder="Search Leaderboard..." />
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
            ${q.render()}
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
    `},initListeners(){q.initListeners();const e=document.getElementById("notif-toggle-btn"),t=document.getElementById("notification-panel");e&&t&&e.addEventListener("click",o=>{o.stopPropagation(),t.classList.toggle("active");const r=document.getElementById("user-dropdown-menu");r&&r.classList.remove("active")});const i=document.getElementById("user-menu-btn"),n=document.getElementById("user-dropdown-menu");i&&n&&i.addEventListener("click",o=>{o.stopPropagation(),n.classList.toggle("active"),t&&t.classList.remove("active")}),document.addEventListener("click",()=>{t&&t.classList.remove("active"),n&&n.classList.remove("active")});const a=document.getElementById("header-logout-btn");a&&a.addEventListener("click",()=>{w.logout()});const s=document.getElementById("global-search-input");s&&s.addEventListener("keydown",o=>{o.key==="Enter"&&(encodeURIComponent(s.value.trim()),window.location.hash="#/pipeline")})}},Q={render(e="/dashboard"){const t=m.getAll();return`
      <aside class="sidebar">
        <div class="sidebar-header">
          <a href="#/dashboard" class="brand-logo">
            <div class="brand-icon">🚀</div>
            <span class="brand-text">TechCRM</span>
          </a>
        </div>

        <nav class="sidebar-nav">
          ${[{path:"/dashboard",label:"Dashboard",icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>'},{path:"/pipeline",label:"Leaderboard",badge:t.filter(n=>n.status!=="lost"&&n.status!=="won").length,icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'}].map(n=>`
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
    `}},ee={render(e="/dashboard"){return`
      <nav class="mobile-bottom-nav">
        ${[{path:"/dashboard",label:"Dashboard",icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>'},{path:"/pipeline",label:"Leaderboard",icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'}].map(i=>`
          <a href="#${i.path}" class="mobile-nav-item ${e===i.path?"active":""}">
            ${i.icon}
            <span>${i.label}</span>
          </a>
        `).join("")}
      </nav>
    `}},u={show(e,t="success",i=3e3){const n=document.getElementById("toast-container");if(!n)return;const a=document.createElement("div");a.className=`toast toast-${t}`;let s="";t==="success"?s='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':t==="warning"?s='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>':t==="danger"?s='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>':s='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',a.innerHTML=`
      ${s}
      <span>${e}</span>
    `,n.appendChild(a),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateY(10px)",setTimeout(()=>a.remove(),200)},i)}},k={currentLeadId:null,render(){return`
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
    `},open(e){const t=m.getById(e);if(!t)return;this.currentLeadId=e;const i=document.getElementById("lead-drawer"),n=document.getElementById("drawer-backdrop"),a=document.getElementById("drawer-content");if(!i||!n||!a)return;const s=(t.name||"L").split(" ").filter(Boolean).map(r=>r[0]).join("").substring(0,2).toUpperCase()||"L",o=Array.isArray(t.requirements)?t.requirements:[];a.innerHTML=`
      <div class="drawer-profile-banner">
        <div class="drawer-avatar">${s}</div>
        <div class="drawer-profile-text">
          <h2>${t.name}</h2>
          <p>${t.designation||"Prospect"}${t.company?` @ ${t.company}`:""}</p>
        </div>
      </div>

      ${t.linkedinUrl?`
      <div style="margin-bottom: 20px;">
        <a href="${t.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; gap: 8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>
          </svg>
          Open LinkedIn Profile
        </a>
      </div>
      `:""}

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
          <div class="drawer-field-value">${t.company||'<span style="color: var(--text-muted); font-style: italic;">Not specified</span>'} ${t.companyWebsite?`<a href="${t.companyWebsite}" target="_blank" style="font-size: 12px; color: var(--primary); margin-left: 6px;">(${t.companyWebsite.replace(/^https?:\/\//,"")})</a>`:""}</div>
        </div>

        <div class="drawer-field">
          <span class="drawer-field-label">Tech Requirement</span>
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
            ${o.length>0?o.map(r=>`<span class="tag-chip" style="font-size: 12px; padding: 4px 8px;">${r}</span>`).join(""):'<span style="color: var(--text-muted); font-size: 13px; font-style: italic;">None specified</span>'}
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
              ${t.potentialValue?`₹${Number(t.potentialValue).toLocaleString("en-IN")}`:'<span style="color: var(--text-muted); font-size: 13px; font-weight: normal;">Not specified</span>'}
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
    `,n.classList.add("active"),i.classList.add("active"),document.body.style.overflow="hidden",this.bindDrawerActions(e)},close(){const e=document.getElementById("lead-drawer"),t=document.getElementById("drawer-backdrop");e&&e.classList.remove("active"),t&&t.classList.remove("active"),document.body.style.overflow="",this.currentLeadId=null},bindDrawerActions(e){const t=document.getElementById("drawer-status-select");t&&t.addEventListener("change",p=>{const h=p.target.value;m.updateStatus(e,h),u.show(`Lead status updated to ${h.replace("_"," ")}`),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e)});const i=document.getElementById("btn-add-activity-trigger"),n=document.getElementById("add-activity-box"),a=document.getElementById("btn-cancel-activity"),s=document.getElementById("btn-save-activity"),o=document.getElementById("custom-activity-input");i&&n&&i.addEventListener("click",()=>{n.style.display="block",o.focus()}),a&&n&&a.addEventListener("click",()=>{n.style.display="none",o.value=""}),s&&o&&s.addEventListener("click",()=>{const p=o.value.trim();p&&(m.addActivity(e,p),u.show("Activity logged successfully"),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e))});const r=document.getElementById("btn-drawer-add-note"),d=document.getElementById("drawer-new-note");r&&d&&r.addEventListener("click",()=>{const p=d.value.trim();p&&(m.addNote(e,p),u.show("Note added"),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e))});const c=document.getElementById("btn-drawer-delete-lead");c&&c.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:confirm-delete",{detail:{leadId:e}}))})},initGlobalListeners(){const e=document.getElementById("drawer-backdrop"),t=document.getElementById("drawer-close-btn");e&&e.addEventListener("click",()=>this.close()),t&&t.addEventListener("click",()=>this.close()),document.addEventListener("keydown",i=>{i.key==="Escape"&&this.currentLeadId&&this.close()})}},S={render(){return`
      <div id="add-lead-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-header">
            <div>
              <h2 class="modal-title">Add New Lead</h2>
              <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                Only name is mandatory. All other details can be skipped or filled later.
              </p>
            </div>
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
                <label class="form-label" for="lead-designation">Designation <span class="optional">(Optional)</span></label>
                <input type="text" id="lead-designation" class="input" placeholder="e.g. Founder / CEO" />
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-linkedin">LinkedIn Profile URL <span class="optional">(Optional)</span></label>
                <input type="text" id="lead-linkedin" class="input" placeholder="e.g. linkedin.com/in/..." />
              </div>
            </div>

            <div class="drawer-divider" style="margin: 16px 0;"></div>

            <!-- Company Information -->
            <div style="font-size: 13px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;">
              Company Information <span class="optional" style="font-size: 11px; text-transform: none;">(Optional)</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="lead-company">Company Name <span class="optional">(Optional)</span></label>
                <input type="text" id="lead-company" class="input" placeholder="e.g. ABC Technologies" />
              </div>
              <div class="form-group">
                <label class="form-label" for="lead-website">Company Website <span class="optional">(Optional)</span></label>
                <input type="text" id="lead-website" class="input" placeholder="e.g. https://abc.com" />
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label" for="lead-industry">Industry <span class="optional">(Optional)</span></label>
                <select id="lead-industry" class="select">
                  <option value="">Select Industry (Optional)</option>
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
                <label class="form-label" for="lead-location">Location <span class="optional">(Optional)</span></label>
                <input type="text" id="lead-location" class="input" placeholder="e.g. Jaipur, India" />
              </div>
            </div>

            <div class="drawer-divider" style="margin: 16px 0;"></div>

            <!-- Opportunity -->
            <div style="font-size: 13px; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px;">
              Tech Opportunity & Priority <span class="optional" style="font-size: 11px; text-transform: none;">(Optional)</span>
            </div>

            <div class="form-group">
              <label class="form-label">Service Requirements <span class="optional">(Optional)</span></label>
              <div class="tag-selector" id="requirement-tag-selector">
                <span class="tag-option" data-value="Website">🌐 Website</span>
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
                <label class="form-label" for="lead-value">Potential Deal Value (₹) <span class="optional">(Optional)</span></label>
                <input type="number" id="lead-value" class="input" placeholder="e.g. 100000" step="5000" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="lead-notes">Initial Outreach Notes <span class="optional">(Optional)</span></label>
              <textarea id="lead-notes" class="textarea" placeholder="Found on LinkedIn, recently posted about needing a tech partner..."></textarea>
            </div>

            <div class="modal-footer" style="padding: 16px 0 0 0; background: transparent;">
              <button type="button" class="btn btn-secondary modal-close-btn" data-modal="add-lead-modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Add Lead</button>
            </div>
          </form>
        </div>
      </div>
    `},open(){const e=document.getElementById("add-lead-modal");if(e){e.style.display="flex",document.body.style.overflow="hidden";const t=document.getElementById("lead-name");t&&t.focus()}},close(){const e=document.getElementById("add-lead-modal");if(e){e.style.display="none",document.body.style.overflow="";const t=document.getElementById("add-lead-form");t&&t.reset();const i=document.getElementById("requirement-tag-selector");i&&i.querySelectorAll(".tag-option").forEach(a=>a.classList.remove("selected"));const n=document.getElementById("priority-selector");if(n){n.querySelectorAll(".radio-pill").forEach(s=>s.classList.remove("selected"));const a=n.querySelector('.radio-pill[data-value="medium"]');a&&a.classList.add("selected")}}},initListeners(){const e=document.getElementById("add-lead-modal");if(!e)return;e.querySelectorAll(".modal-close-btn").forEach(a=>{a.addEventListener("click",()=>this.close())}),e.addEventListener("click",a=>{a.target===e&&this.close()});const t=document.getElementById("requirement-tag-selector");t&&t.addEventListener("click",a=>{const s=a.target.closest(".tag-option");s&&s.classList.toggle("selected")});const i=document.getElementById("priority-selector");i&&i.addEventListener("click",a=>{const s=a.target.closest(".radio-pill");s&&(i.querySelectorAll(".radio-pill").forEach(o=>o.classList.remove("selected")),s.classList.add("selected"))});const n=document.getElementById("add-lead-form");n&&n.addEventListener("submit",async a=>{var B,C,$,F,T,D,P,N,O;a.preventDefault();const s=document.getElementById("lead-name"),o=s?s.value.trim():"";if(!o){u.show("Please enter the lead full name","error");return}const r=n.querySelector('button[type="submit"]');r&&(r.disabled=!0,r.textContent="Saving to MongoDB...");const d=((B=document.getElementById("lead-designation"))==null?void 0:B.value.trim())||"";let c=((C=document.getElementById("lead-linkedin"))==null?void 0:C.value.trim())||"";c&&!/^https?:\/\//i.test(c)&&(c="https://"+c);const p=(($=document.getElementById("lead-company"))==null?void 0:$.value.trim())||"";let h=((F=document.getElementById("lead-website"))==null?void 0:F.value.trim())||"";h&&!/^https?:\/\//i.test(h)&&(h="https://"+h);const v=((T=document.getElementById("lead-industry"))==null?void 0:T.value)||"",f=((D=document.getElementById("lead-location"))==null?void 0:D.value.trim())||"",A=(P=document.getElementById("lead-value"))==null?void 0:P.value,j=((N=document.getElementById("lead-notes"))==null?void 0:N.value.trim())||"",U=t?Array.from(t.querySelectorAll(".tag-option.selected")).map(b=>b.getAttribute("data-value")):[],W=((O=i==null?void 0:i.querySelector(".radio-pill.selected"))==null?void 0:O.getAttribute("data-value"))||"medium";try{const b=await m.create({name:o,designation:d,linkedinUrl:c,company:p,companyWebsite:h,industry:v,location:f,requirements:U,priority:W,potentialValue:A?Number(A):0,notes:j});this.close(),n.reset(),u.show(`✓ Lead "${b.name}" saved to MongoDB & Pipeline!`),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}catch(b){u.show(`Failed to save lead: ${b.message}`,"error")}finally{r&&(r.disabled=!1,r.textContent="Save Lead to Pipeline")}})}},I={currentLeadId:null,render(){return`
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
    `},open(e){this.currentLeadId=e;const t=document.getElementById("lost-reason-modal");t&&(t.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("lost-reason-modal");e&&(e.style.display="none",document.body.style.overflow="",this.currentLeadId=null)},initListeners(){const e=document.getElementById("lost-reason-modal"),t=document.getElementById("btn-close-lost-modal"),i=document.getElementById("btn-cancel-lost-modal"),n=document.getElementById("lost-reason-form"),a=document.getElementById("other-reason-group");t&&t.addEventListener("click",()=>this.close()),i&&i.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",s=>{s.target===e&&this.close()}),n&&(n.addEventListener("change",s=>{s.target.name==="lost-reason"&&a&&(a.style.display=s.target.value==="Other"?"block":"none")}),n.addEventListener("submit",s=>{var d;if(s.preventDefault(),!this.currentLeadId)return;const o=n.querySelector('input[name="lost-reason"]:checked');let r=o?o.value:"No response";if(r==="Other"){const c=(d=document.getElementById("custom-lost-reason"))==null?void 0:d.value.trim();c&&(r=c)}m.updateStatus(this.currentLeadId,"lost",{lostReason:r}),u.show(`Lead marked as Lost (${r})`,"warning"),this.close(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}))}},te={getAll(){return l.get(l.KEYS.FOLLOWUPS,[])},getByCategory(e="today"){const t=this.getAll();return e==="completed"?t.filter(i=>i.completed):t.filter(i=>!i.completed&&(e==="all"||i.category===e))},create(e){const t=this.getAll(),i={id:"f-"+Date.now(),leadId:e.leadId||"",leadName:e.leadName&&typeof e.leadName=="string"?e.leadName.trim():"Lead",company:e.company&&typeof e.company=="string"?e.company.trim():"",task:e.task&&typeof e.task=="string"?e.task.trim():"",dueDate:e.dueDate||new Date().toISOString(),dueLabel:e.dueLabel||"Upcoming",category:e.category||"upcoming",priority:e.priority||"upcoming",linkedinUrl:e.linkedinUrl||"#",completed:!1};return t.unshift(i),l.set(l.KEYS.FOLLOWUPS,t),i},complete(e){const t=this.getAll(),i=t.find(n=>n.id===e);return i&&(i.completed=!0,l.set(l.KEYS.FOLLOWUPS,t)),i},snooze(e,t=1){const i=this.getAll(),n=i.find(a=>a.id===e);return n&&(n.category="upcoming",n.priority="upcoming",n.dueLabel=`Snoozed (${t}d)`,l.set(l.KEYS.FOLLOWUPS,i)),n},delete(e){const t=this.getAll().filter(i=>i.id!==e);return l.set(l.KEYS.FOLLOWUPS,t),!0}},E={render(){return`
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
                ${m.getAll().map(t=>`<option value="${t.id}" data-name="${t.name}" data-company="${t.company||""}" data-linkedin="${t.linkedinUrl||""}">${t.name}${t.company?` (${t.company})`:""}</option>`).join("")}
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
    `},open(){const e=document.getElementById("schedule-followup-modal");e&&(e.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("schedule-followup-modal");if(e){e.style.display="none",document.body.style.overflow="";const t=document.getElementById("schedule-followup-form");t&&t.reset()}},initListeners(){const e=document.getElementById("schedule-followup-modal"),t=document.getElementById("btn-close-schedule-modal"),i=document.getElementById("btn-cancel-schedule-modal"),n=document.getElementById("schedule-followup-form");t&&t.addEventListener("click",()=>this.close()),i&&i.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",a=>{a.target===e&&this.close()}),n&&n.addEventListener("submit",a=>{a.preventDefault();const s=document.getElementById("followup-lead"),o=s.options[s.selectedIndex],r=s.value,d=o.getAttribute("data-name"),c=o.getAttribute("data-company"),p=o.getAttribute("data-linkedin"),h=document.getElementById("followup-task").value,v=document.getElementById("followup-category").value,f=document.getElementById("followup-priority").value;te.create({leadId:r,leadName:d,company:c,task:h,category:v,priority:f,dueLabel:v==="today"?"Today, 4:00 PM":"Next Week",linkedinUrl:p}),u.show("✓ Follow-up scheduled successfully"),this.close(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))})}},L={currentLeadId:null,render(){return`
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
    `},open(e){const t=m.getById(e);if(!t)return;this.currentLeadId=e;const i=document.getElementById("delete-confirm-modal"),n=document.getElementById("delete-modal-msg");i&&n&&(n.innerHTML=`This will permanently remove <strong>${t.name}</strong> ${t.company?`(${t.company}) `:""}and their activity history.`,i.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("delete-confirm-modal");e&&(e.style.display="none",document.body.style.overflow="",this.currentLeadId=null)},initListeners(){const e=document.getElementById("delete-confirm-modal"),t=document.getElementById("btn-close-delete-modal"),i=document.getElementById("btn-cancel-delete"),n=document.getElementById("btn-confirm-delete");t&&t.addEventListener("click",()=>this.close()),i&&i.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",a=>{a.target===e&&this.close()}),n&&n.addEventListener("click",()=>{if(this.currentLeadId){const a=m.getById(this.currentLeadId),s=a?a.name:"Lead";m.delete(this.currentLeadId),k.close(),this.close(),u.show(`Lead "${s}" permanently deleted`,"danger"),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}})}},ie={render(){return`
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
    `},initListeners(){const e=document.getElementById("login-form"),t=document.getElementById("login-password"),i=document.getElementById("btn-toggle-password");i&&t&&i.addEventListener("click",()=>{const n=t.getAttribute("type")==="password"?"text":"password";t.setAttribute("type",n)}),e&&e.addEventListener("submit",async n=>{var r;n.preventDefault();const a=document.getElementById("login-email").value,s=t?t.value:"password",o=e.querySelector('button[type="submit"]');o&&(o.disabled=!0,o.textContent="Signing In...");try{const c=((r=(await w.login(a,s)).user)==null?void 0:r.name)||"Neha";u.show(`Welcome back, ${c}! 👋`),window.location.hash="#/dashboard"}catch(d){u.show(d.message||"Login failed","error")}finally{o&&(o.disabled=!1,o.textContent="Sign In to TechCRM")}})}},z={render(){const e=m.getStats(),t=l.get(l.KEYS.ACTIVITIES,[]);return`
      <div class="page-container">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Good morning, Neha 👋</h1>
            <p>Here's your LinkedIn outreach progress and team performance overview.</p>
          </div>
          <div style="display: flex; gap: 10px;">
           <button class="btn btn-secondary" onclick="window.location.hash='#/pipeline'">
  View Leaderboard →
</button>

            <button class="btn btn-primary" id="btn-dash-add-lead">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               Add Lead
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
                <h3 class="section-heading" style="font-size: 16px;">Leaderboard Breakdown</h3>
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
                    <div style="height: 100%; width: ${e.totalLeads>0?e.breakdown.newLeads/e.totalLeads*100:0}%; background: #64748B; border-radius: 3px; transition: width 0.3s ease;"></div>
                  </div>
                </div>

                <!-- Requests -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #4F46E5;">Requests Sent</span>
                    <span style="font-weight: 600;">${e.breakdown.requests}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: ${e.totalLeads>0?e.breakdown.requests/e.totalLeads*100:0}%; background: #6366F1; border-radius: 3px; transition: width 0.3s ease;"></div>
                  </div>
                </div>

                <!-- Connected -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #059669;">Connected</span>
                    <span style="font-weight: 600;">${e.breakdown.connected}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: ${e.totalLeads>0?e.breakdown.connected/e.totalLeads*100:0}%; background: #10B981; border-radius: 3px; transition: width 0.3s ease;"></div>
                  </div>
                </div>

                <!-- Qualified -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #6D28D9;">Qualified</span>
                    <span style="font-weight: 600;">${e.breakdown.qualified}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: ${e.totalLeads>0?e.breakdown.qualified/e.totalLeads*100:0}%; background: #8B5CF6; border-radius: 3px; transition: width 0.3s ease;"></div>
                  </div>
                </div>

                <!-- Proposal -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #0369A1;">Proposal Sent</span>
                    <span style="font-weight: 600;">${e.breakdown.proposal}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: ${e.totalLeads>0?e.breakdown.proposal/e.totalLeads*100:0}%; background: #0284C7; border-radius: 3px; transition: width 0.3s ease;"></div>
                  </div>
                </div>

                <!-- Won -->
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 500; margin-bottom: 4px;">
                    <span style="color: #15803D;">Deals Won</span>
                    <span style="font-weight: 600;">${e.breakdown.won}</span>
                  </div>
                  <div style="height: 6px; background: #F1F5F9; border-radius: 3px; overflow: hidden;">
                    <div style="height: 100%; width: ${e.totalLeads>0?e.breakdown.won/e.totalLeads*100:0}%; background: #16A34A; border-radius: 3px; transition: width 0.3s ease;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div style="background: #F8FAFC; padding: 10px; border-radius: 8px; border: 1px solid var(--border-subtle); margin-top: 12px; font-size: 12px; color: var(--text-secondary);">
              🎯 <strong>Overall Win Rate:</strong> ${e.totalLeads>0?Math.round(e.won/e.totalLeads*100):0}% (${e.won} of ${e.totalLeads} Won)
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
    `},initListeners(){const e=document.getElementById("btn-dash-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))})}},ne={getTechIcon(e){switch(e.toLowerCase()){case"website":return"🌐";case"mobile app":case"mobile":return"📱";case"ai/ml":case"ai":return"🤖";case"ui/ux":return"🎨";case"software":return"💻";default:return"⚡"}},formatTimeAgo(e){if(!e)return"Recent";const t=new Date(e),n=new Date-t,a=Math.floor(n/(1e3*60*60*24)),s=Math.floor(n/(1e3*60*60));return a>0?`${a}d ago`:s>0?`${s}h ago`:"Today"},render(e){const t=(e.name||"L").split(" ").filter(Boolean).map(s=>s[0]).join("").substring(0,2).toUpperCase()||"L",i=Array.isArray(e.requirements)?e.requirements:[],n=this.formatTimeAgo(e.addedDate);let a="";return e.priority==="high"?a='<span class="badge badge-priority-high">🔥 High</span>':e.priority==="medium"?a='<span class="badge badge-priority-medium">Medium</span>':a='<span class="badge badge-priority-low">Low</span>',`
      <div class="lead-card" draggable="true" data-id="${e.id}" data-status="${e.status}">
        <div class="lead-card-header">
          <div class="lead-card-avatar">${t}</div>
          <div class="lead-card-name" title="${e.name}">${e.name}</div>
        </div>

        <div class="lead-card-company" title="${e.company||"Direct Outreach"}">${e.company||"—"}</div>
        <div class="lead-card-designation" title="${e.designation||"Prospect"}">${e.designation||"Prospect"}</div>

        <div class="lead-card-tags">
          ${i.slice(0,2).map(s=>`
            <span class="tag-chip">
              <span>${this.getTechIcon(s)}</span>
              <span>${s}</span>
            </span>
          `).join("")}
          ${a}
        </div>

        <div class="lead-card-footer">
          <span>${n}</span>
          ${e.potentialValue?`<span style="font-weight: 600; color: #4F46E5;">₹${(e.potentialValue/1e3).toFixed(0)}k</span>`:""}
        </div>
      </div>
    `}},M={render(e,t=[]){const i=t.filter(n=>n.status===e.id);return`
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
          `:i.map(n=>ne.render(n)).join("")}
        </div>
      </div>
    `}},ae={currentSearch:"",currentPriority:"all",currentRequirement:"all",currentDateRange:"all",draggedLeadId:null,getStages(){return l.get(l.KEYS.PIPELINE_STAGES,[{id:"new",name:"New Leads",visible:!0},{id:"request_sent",name:"Request Sent",visible:!0},{id:"connected",name:"Connected",visible:!0},{id:"qualified",name:"Qualified",visible:!0},{id:"proposal",name:"Proposal",visible:!0},{id:"won",name:"Won",visible:!0}])},matchesDateRange(e){if(this.currentDateRange==="all")return!0;const t=e.addedDate||e.createdAt;if(!t)return!1;const i=new Date(t).getTime(),a=(Date.now()-i)/(1e3*60*60*24);return this.currentDateRange==="7days"?a<=7:this.currentDateRange==="30days"?a<=30:this.currentDateRange==="1year"?a<=365:!0},render(){const e=m.getAll(),i=this.getStages().filter(o=>o.visible!==!1);let n=e.filter(o=>{const r=this.currentSearch.toLowerCase(),d=!r||o.name&&o.name.toLowerCase().includes(r)||o.company&&o.company.toLowerCase().includes(r),c=this.currentPriority==="all"||o.priority===this.currentPriority,p=this.currentRequirement==="all"||Array.isArray(o.requirements)&&o.requirements.some(v=>v.toLowerCase().includes(this.currentRequirement.toLowerCase())),h=this.matchesDateRange(o);return d&&c&&p&&h});const a=e.filter(o=>o.status==="lost").length,s=e.filter(o=>o.status==="won").length;return`
      <div class="page-container">
        <!-- Page Header & Actions -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Leaderboard</h1>
            <p>Jira-style relationship pipeline: Discovery → Connection → Conversation → Proposal → Won</p>
          </div>

          <div style="display: flex; gap: 10px; align-items: center;">
            <!-- Customize Columns Dropdown -->
            <div style="position: relative;">
              <button class="btn btn-secondary" id="btn-toggle-column-menu" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"/>
                </svg>
                Columns ▾
              </button>

              <div id="column-customize-dropdown" style="display: none; position: absolute; right: 0; top: calc(100% + 8px); width: 330px; z-index: 100; background: #ffffff; border: 1px solid var(--border-color); border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.14); padding: 16px;">
                <div style="font-size: 13px; font-weight: 600; color: var(--text-main); margin-bottom: 2px;">Customize Columns</div>
                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">Toggle visibility, reorder (↑/↓) or delete any column</div>

                <!-- Column Checkboxes & Reorder List -->
                <div id="column-checkboxes-container" style="display: flex; flex-direction: column; gap: 6px; max-height: 220px; overflow-y: auto; padding-right: 4px;">
                  <!-- Dynamically rendered items -->
                </div>

                <div style="border-top: 1px solid var(--border-subtle); margin: 14px 0 12px;"></div>

                <!-- Add New Column Form with Position Selector -->
                <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--text-main);">Add New Column</div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <input type="text" id="input-new-column-name" class="input" placeholder="Column name (e.g. In Review)..." style="font-size: 12px; padding: 6px 10px; height: 32px;" />
                  <div style="display: flex; gap: 6px;">
                    <select id="select-new-column-position" class="select" style="font-size: 12px; padding: 4px 8px; height: 32px; flex: 1;">
                      <!-- Dynamically populated positions -->
                    </select>
                    <button id="btn-submit-new-column" class="btn btn-primary" style="font-size: 12px; padding: 0 12px; height: 32px; white-space: nowrap;">+ Add</button>
                  </div>
                </div>
              </div>
            </div>

            <button class="btn btn-primary" id="btn-pipeline-add-lead">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               Add Lead
            </button>
          </div>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: var(--space-20); flex-wrap: wrap;">
          <div style="display: flex; gap: 12px; align-items: center; flex: 1; min-width: 280px; max-width: 450px;">
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

            <!-- Date Range Filter (Last 7 days, Last month, Last year) -->
            <select id="pipeline-filter-date" class="select" style="width: auto; font-size: 13px;">
              <option value="all" ${this.currentDateRange==="all"?"selected":""}>🕒 All Time</option>
              <option value="7days" ${this.currentDateRange==="7days"?"selected":""}>📅 Last 7 Days</option>
              <option value="30days" ${this.currentDateRange==="30days"?"selected":""}>📅 Last Month</option>
              <option value="1year" ${this.currentDateRange==="1year"?"selected":""}>📅 Last Year</option>
            </select>

            <button id="btn-reset-filters" class="btn btn-ghost btn-sm" style="font-size: 12px;">Reset</button>
          </div>
        </div>

        <!-- Kanban Board Area -->
        <div class="kanban-wrapper">
          <div class="kanban-board" id="kanban-board-container">
            ${i.length===0?`
              <div style="padding: 40px; text-align: center; color: var(--text-muted); width: 100%;">
                No columns selected. Click <strong>Columns ▾</strong> above to show columns.
              </div>
            `:i.map(o=>M.render(o,n)).join("")}
          </div>
        </div>

        <!-- Won & Lost Drop Zones Bar -->
        <div class="won-lost-drop-bar">
          <div class="outcome-drop-zone won" data-stage="won" title="Drop here to mark as Won">
            <span style="font-size: 18px;">🏆</span>
            <span>WON STAGE (${s} Deals)</span>
          </div>
          <div class="outcome-drop-zone lost" data-stage="lost" title="Drop here to record Lost reason">
            <span style="font-size: 18px;">🔴</span>
            <span>LOST STAGE (${a} Leads) — Drop to record reason</span>
          </div>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("btn-pipeline-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))});const t=document.getElementById("pipeline-search");t&&t.addEventListener("input",o=>{this.currentSearch=o.target.value.toLowerCase().trim(),this.refreshBoard()});const i=document.getElementById("pipeline-filter-priority");i&&i.addEventListener("change",o=>{this.currentPriority=o.target.value,this.refreshBoard()});const n=document.getElementById("pipeline-filter-tech");n&&n.addEventListener("change",o=>{this.currentRequirement=o.target.value,this.refreshBoard()});const a=document.getElementById("pipeline-filter-date");a&&a.addEventListener("change",o=>{this.currentDateRange=o.target.value,this.refreshBoard()});const s=document.getElementById("btn-reset-filters");s&&s.addEventListener("click",()=>{this.currentSearch="",this.currentPriority="all",this.currentRequirement="all",this.currentDateRange="all";const o=document.getElementById("pipeline-search");o&&(o.value="");const r=document.getElementById("pipeline-filter-priority");r&&(r.value="all");const d=document.getElementById("pipeline-filter-tech");d&&(d.value="all");const c=document.getElementById("pipeline-filter-date");c&&(c.value="all"),this.refreshBoard()}),this.initColumnCustomizer(),this.bindKanbanInteractions()},initColumnCustomizer(){const e=document.getElementById("btn-toggle-column-menu"),t=document.getElementById("column-customize-dropdown"),i=document.getElementById("btn-submit-new-column"),n=document.getElementById("input-new-column-name");if(!e||!t)return;e.addEventListener("click",s=>{s.stopPropagation();const o=t.style.display==="none"||!t.style.display;t.style.display=o?"block":"none",o&&this.renderColumnCheckboxes()}),document.addEventListener("click",s=>{!t.contains(s.target)&&s.target!==e&&(t.style.display="none")}),this.renderColumnCheckboxes();const a=()=>{const s=n.value.trim();if(!s)return;const r={id:"stage_"+Date.now(),name:s,visible:!0},d=this.getStages(),c=document.getElementById("select-new-column-position"),p=c?c.value:"end";if(p==="start")d.unshift(r);else if(p.startsWith("after_")){const h=p.replace("after_",""),v=d.findIndex(f=>f.id===h);v!==-1?d.splice(v+1,0,r):d.push(r)}else d.push(r);l.set(l.KEYS.PIPELINE_STAGES,d),n.value="",this.renderColumnCheckboxes(),this.refreshBoard(),u.show(`✓ Added column "${s}"`)};i&&i.addEventListener("click",a),n&&n.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),a())})},renderColumnCheckboxes(){const e=document.getElementById("column-checkboxes-container");if(!e)return;const t=this.getStages();e.innerHTML=t.map((n,a)=>`
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; border-radius: 6px; font-size: 13px; background: #F8FAFC; border: 1px solid var(--border-subtle);">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; flex: 1; user-select: none; margin-right: 8px; overflow: hidden;">
          <input type="checkbox" class="column-visibility-toggle" data-stage-id="${n.id}" ${n.visible!==!1?"checked":""} style="cursor: pointer;" />
          <span style="color: var(--text-main); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${n.name}</span>
        </label>
        <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0;">
          <button class="btn-move-col-up" data-index="${a}" title="Move left" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--text-secondary);" ${a===0?'disabled style="opacity:0.3; cursor:not-allowed; width: 22px; height: 22px;"':""}>↑</button>
          <button class="btn-move-col-down" data-index="${a}" title="Move right" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--text-secondary);" ${a===t.length-1?'disabled style="opacity:0.3; cursor:not-allowed; width: 22px; height: 22px;"':""}>↓</button>
          <button class="btn-delete-column" data-stage-id="${n.id}" title="Delete column" style="background: #FEE2E2; border: 1px solid #FECACA; border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; color: #DC2626; cursor: pointer; font-size: 12px; font-weight: bold;">✕</button>
        </div>
      </div>
    `).join("");const i=document.getElementById("select-new-column-position");i&&(i.innerHTML=`
        <option value="end">Position: At the end</option>
        <option value="start">Position: At the beginning</option>
        ${t.map(n=>`
          <option value="after_${n.id}">Position: After "${n.name}"</option>
        `).join("")}
      `),e.querySelectorAll(".column-visibility-toggle").forEach(n=>{n.addEventListener("change",a=>{const s=n.getAttribute("data-stage-id"),o=this.getStages(),r=o.find(d=>d.id===s);r&&(r.visible=a.target.checked,l.set(l.KEYS.PIPELINE_STAGES,o),this.refreshBoard())})}),e.querySelectorAll(".btn-move-col-up").forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation();const s=parseInt(n.getAttribute("data-index"),10),o=this.getStages();if(s>0){const r=o[s];o[s]=o[s-1],o[s-1]=r,l.set(l.KEYS.PIPELINE_STAGES,o),this.renderColumnCheckboxes(),this.refreshBoard()}})}),e.querySelectorAll(".btn-move-col-down").forEach(n=>{n.addEventListener("click",a=>{a.stopPropagation();const s=parseInt(n.getAttribute("data-index"),10),o=this.getStages();if(s<o.length-1){const r=o[s];o[s]=o[s+1],o[s+1]=r,l.set(l.KEYS.PIPELINE_STAGES,o),this.renderColumnCheckboxes(),this.refreshBoard()}})}),e.querySelectorAll(".btn-delete-column").forEach(n=>{n.addEventListener("click",a=>{var d;a.stopPropagation();const s=n.getAttribute("data-stage-id");let o=this.getStages();if(o.length<=1){u.show("At least one column is required");return}const r=((d=o.find(c=>c.id===s))==null?void 0:d.name)||"Column";o=o.filter(c=>c.id!==s),l.set(l.KEYS.PIPELINE_STAGES,o),this.renderColumnCheckboxes(),this.refreshBoard(),u.show(`✓ "${r}" removed`)})})},bindKanbanInteractions(){const e=document.getElementById("app");if(!e)return;e.querySelectorAll(".lead-card").forEach(i=>{i.addEventListener("click",()=>{if(i.classList.contains("is-dragging"))return;const n=i.getAttribute("data-id");n&&k.open(n)}),i.addEventListener("dragstart",n=>{this.draggedLeadId=i.getAttribute("data-id"),i.classList.add("is-dragging"),n.dataTransfer.effectAllowed="move",n.dataTransfer.setData("text/plain",this.draggedLeadId)}),i.addEventListener("dragend",()=>{i.classList.remove("is-dragging"),this.draggedLeadId=null,document.querySelectorAll(".drag-over").forEach(n=>n.classList.remove("drag-over"))})}),e.querySelectorAll(".kanban-column, .outcome-drop-zone").forEach(i=>{i.addEventListener("dragover",n=>{n.preventDefault(),n.dataTransfer.dropEffect="move",i.classList.add("drag-over")}),i.addEventListener("dragleave",n=>{i.contains(n.relatedTarget)||i.classList.remove("drag-over")}),i.addEventListener("drop",n=>{n.preventDefault(),i.classList.remove("drag-over");const a=n.dataTransfer.getData("text/plain")||this.draggedLeadId,s=i.getAttribute("data-stage");a&&s&&this.handleLeadDrop(a,s)})})},handleLeadDrop(e,t){const i=m.getById(e);if(!(!i||i.status===t))if(t==="lost")I.open(e);else{m.updateStatus(e,t);const n=t.replace("_"," ");u.show(`✓ Lead "${i.name}" moved to ${n.toUpperCase()}`),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}},refreshBoard(){if(document.querySelector(".kanban-wrapper")){const i=this.getStages().filter(o=>o.visible!==!1),a=m.getAll().filter(o=>{const r=!this.currentSearch||o.name&&o.name.toLowerCase().includes(this.currentSearch)||o.company&&o.company.toLowerCase().includes(this.currentSearch),d=this.currentPriority==="all"||o.priority===this.currentPriority,c=this.currentRequirement==="all"||Array.isArray(o.requirements)&&o.requirements.some(h=>h.toLowerCase().includes(this.currentRequirement.toLowerCase())),p=this.matchesDateRange(o);return r&&d&&c&&p}),s=document.getElementById("kanban-board-container");s&&(s.innerHTML=i.length===0?`
          <div style="padding: 40px; text-align: center; color: var(--text-muted); width: 100%;">
            No columns selected. Click <strong>Columns ▾</strong> above to show columns.
          </div>
        `:i.map(o=>M.render(o,a)).join(""),this.bindKanbanInteractions())}}},oe={currentSection:"pipeline",render(){const e=l.get(l.KEYS.PIPELINE_STAGES,[]),t=[{name:"Neha Jain",role:"Sales / Fullstack Dev",leads:48,status:"Active",avatar:"NJ",isCurrent:!0},{name:"Aman Sharma",role:"Outreach Specialist",leads:37,status:"Active",avatar:"AS",isCurrent:!1},{name:"Priya Verma",role:"Agency Manager",leads:15,status:"Active",avatar:"PV",isCurrent:!1}];return`
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
              ${e.map((i,n)=>`
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #F8FAFC; border: 1px solid var(--border-color); border-radius: 8px;">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="cursor: grab; color: var(--text-muted); font-size: 16px;">☰</span>
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: ${i.color||"#6366F1"};"></span>
                    <span style="font-weight: 600; font-size: 14px; color: var(--text-main);">${i.name}</span>
                  </div>
                  <div style="display: flex; gap: 6px;">
                    <span class="badge" style="background: #EEF2FF; color: #4F46E5;">Stage ${n+1}</span>
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
    `},initListeners(){const e=document.getElementById("tab-sec-pipeline"),t=document.getElementById("tab-sec-team"),i=document.getElementById("tab-sec-general");e&&e.addEventListener("click",()=>{this.currentSection="pipeline",this.reRender()}),t&&t.addEventListener("click",()=>{this.currentSection="team",this.reRender()}),i&&i.addEventListener("click",()=>{this.currentSection="general",this.reRender()});const n=document.getElementById("btn-add-stage"),a=document.getElementById("new-stage-input");n&&a&&n.addEventListener("click",()=>{const r=a.value.trim();if(r){const d=l.get(l.KEYS.PIPELINE_STAGES,[]),c=r.toLowerCase().replace(/\s+/g,"_");d.push({id:c,name:r,color:"#6366F1"}),l.set(l.KEYS.PIPELINE_STAGES,d),u.show(`✓ Added stage "${r}"`),this.reRender(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}});const s=document.getElementById("btn-reset-demo-data");s&&s.addEventListener("click",()=>{localStorage.clear(),l.init(),u.show("Default data successfully restored!"),setTimeout(()=>window.location.reload(),500)});const o=document.getElementById("btn-invite-member");o&&o.addEventListener("click",()=>{u.show("Invitation link copied to clipboard!")})},reRender(){const e=document.getElementById("app");e&&window.location.hash.startsWith("#/settings")&&(e.querySelector(".page-container").outerHTML=this.render(),this.initListeners())}};class se{constructor(){this.appEl=document.getElementById("app"),this.modalRoot=document.getElementById("modal-root"),this.currentRoute="/dashboard",this.routes={"/login":ie,"/dashboard":z,"/pipeline":ae,"/settings":oe},this.init()}init(){l.init(),m.syncWithServer().then(()=>{(this.currentRoute==="/dashboard"||this.currentRoute==="/pipeline")&&this.renderCurrentView()}),this.mountModals(),this.registerGlobalEvents(),window.addEventListener("hashchange",()=>this.handleRoute()),window.location.hash?this.handleRoute():window.location.hash="#/dashboard"}mountModals(){this.modalRoot&&(this.modalRoot.innerHTML=`
        ${k.render()}
        ${S.render()}
        ${I.render()}
        ${E.render()}
        ${L.render()}
      `,k.initGlobalListeners(),S.initListeners(),I.initListeners(),E.initListeners(),L.initListeners())}registerGlobalEvents(){window.addEventListener("techcrm:open-add-lead",()=>{S.open()}),window.addEventListener("techcrm:open-schedule-followup",()=>{E.open()}),window.addEventListener("techcrm:confirm-delete",t=>{var i;(i=t.detail)!=null&&i.leadId&&L.open(t.detail.leadId)}),window.addEventListener("techcrm:data-changed",()=>{this.renderCurrentView()})}getRoutePath(){const t=window.location.hash.slice(1);return t&&t.split("?")[0]||"/dashboard"}handleRoute(){const t=this.getRoutePath();if(t!=="/login"&&!w.isAuthenticated()){window.location.hash="#/login";return}if(t==="/login"&&w.isAuthenticated()){window.location.hash="#/dashboard";return}this.currentRoute=t,this.renderCurrentView()}renderCurrentView(){const t=this.routes[this.currentRoute]||z;if(this.currentRoute==="/login"){this.appEl.innerHTML=t.render(),t.initListeners();return}this.appEl.innerHTML=`
      <div class="app-shell">
        ${Q.render(this.currentRoute)}
        <div class="main-wrapper">
          ${R.render()}
          <main id="main-content-area">
            ${t.render()}
          </main>
        </div>
        ${ee.render(this.currentRoute)}
      </div>
    `,R.initListeners(),t.initListeners&&t.initListeners()}}new se;
