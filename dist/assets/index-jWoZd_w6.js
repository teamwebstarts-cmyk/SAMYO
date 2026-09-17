(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const w={LEADS:"techcrm_leads",FOLLOWUPS:"techcrm_followups",ACTIVITIES:"techcrm_activities",COMPANIES:"techcrm_companies",NOTIFICATIONS:"techcrm_notifications",USER:"techcrm_user",PIPELINE_STAGES:"techcrm_pipeline_stages"},Q=[{id:"new",name:"New Leads",color:"#64748B"},{id:"request_sent",name:"Request Sent",color:"#F59E0B"},{id:"connected",name:"Connected",color:"#6366F1"},{id:"qualified",name:"Qualified",color:"#8B5CF6"},{id:"proposal",name:"Proposal Sent",color:"#0284C7"},{id:"won",name:"Won",color:"#16A34A"}],X={name:"Neha Jain",email:"neha.jain@techcrm.io",role:"Web Developer / Outreach Specialist",avatar:"NJ"},Z=[{id:"act-1",text:"Rahul Sharma moved to Connected",time:"10 min ago",type:"connected"},{id:"act-2",text:"Priya Sharma accepted connection",time:"2 hours ago",type:"request_sent"},{id:"act-3",text:"XYZ Technologies moved to Proposal",time:"Yesterday",type:"proposal"},{id:"act-4",text:"Vikram Aditya marked as Deal Won! 🏆",time:"2 days ago",type:"won"},{id:"act-5",text:"Outreach campaign #4 launched: 18 requests sent",time:"3 days ago",type:"new"}],ee=[{id:"n-1",text:"Rahul Sharma accepted your connection request",time:"10 minutes ago",dotColor:"notif-blue",unread:!0},{id:"n-2",text:"Follow-up overdue with Priya Sharma (ABC Tech)",time:"2 hours ago",dotColor:"notif-orange",unread:!0},{id:"n-3",text:"XYZ Technologies proposal viewed on client portal",time:"Yesterday",dotColor:"notif-green",unread:!1},{id:"n-4",text:"New LinkedIn prospect identified: Rajesh Kothari",time:"2 days ago",dotColor:"notif-blue",unread:!1}],d={init(){const e=this.get(w.LEADS);Array.isArray(e)&&e.length>0&&e[0].id==="lead-1"&&localStorage.removeItem(w.LEADS);const t=this.get(w.FOLLOWUPS);Array.isArray(t)&&t.length>0&&t[0].id==="f-1"&&localStorage.removeItem(w.FOLLOWUPS),localStorage.getItem(w.ACTIVITIES)||localStorage.setItem(w.ACTIVITIES,JSON.stringify(Z)),localStorage.getItem(w.NOTIFICATIONS)||localStorage.setItem(w.NOTIFICATIONS,JSON.stringify(ee)),localStorage.getItem(w.USER)||localStorage.setItem(w.USER,JSON.stringify(X)),localStorage.getItem(w.PIPELINE_STAGES)||localStorage.setItem(w.PIPELINE_STAGES,JSON.stringify(Q))},get(e,t=null){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch(n){return console.error("Storage Read Error:",n),t}},set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Storage Write Error:",n)}},KEYS:w};d.init();const te="https://samyo-crm-api.onrender.com/api",ne="http://localhost:5000/api",ie=!!(typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."))),oe=()=>typeof window>"u"?ne:ie?window.location.port==="3000"?"/api":`http://${window.location.hostname}:5000/api`:te,S=oe();async function F(e){const t=await e.text();let n=null;if(t)try{n=JSON.parse(t)}catch{n=null}if(!e.ok){const i=n&&(n.message||n.error)||`HTTP ${e.status}: Server not reachable or endpoint not found`;throw new Error(i)}return n}const b={baseUrl:S,async checkHealth(){try{return{ok:!0,data:await this.get("/health")}}catch(e){return{ok:!1,error:e.message}}},getHeaders(){const e={"Content-Type":"application/json"},t=localStorage.getItem("techcrm_token");return t&&(e.Authorization=`Bearer ${t}`),e},async get(e){try{const t=await fetch(`${S}${e}`,{method:"GET",headers:this.getHeaders()});return await F(t)}catch(t){throw console.warn(`ApiService.get(${e}) failed:`,t.message),t}},async post(e,t){try{const n=await fetch(`${S}${e}`,{method:"POST",headers:this.getHeaders(),body:JSON.stringify(t)});return await F(n)}catch(n){throw console.warn(`ApiService.post(${e}) failed:`,n.message),n}},async put(e,t){try{const n=await fetch(`${S}${e}`,{method:"PUT",headers:this.getHeaders(),body:JSON.stringify(t)});return await F(n)}catch(n){throw console.warn(`ApiService.put(${e}) failed:`,n.message),n}},async patch(e,t){try{const n=await fetch(`${S}${e}`,{method:"PATCH",headers:this.getHeaders(),body:JSON.stringify(t)});return await F(n)}catch(n){throw console.warn(`ApiService.patch(${e}) failed:`,n.message),n}},async delete(e){try{const t=await fetch(`${S}${e}`,{method:"DELETE",headers:this.getHeaders()});return await F(t)}catch(t){throw console.warn(`ApiService.delete(${e}) failed:`,t.message),t}}},h={getCurrentUser(){return d.get(d.KEYS.USER,null)},isAdmin(){const e=this.getCurrentUser();return e?!!(e.isAdmin===!0||e.accessRole==="admin"||e.email&&e.email.toLowerCase()==="neha.jain@techcrm.io"):!1},isViewer(){return!this.isAdmin()},getRoleBadgeText(){return this.isAdmin()?"Admin (Full Access)":"Viewer (Read Only)"},isAuthenticated(){const e=localStorage.getItem("techcrm_token"),t=localStorage.getItem("techcrm_logged_in")==="true";return!!(e&&t)},async login(e,t){try{const n=await b.post("/auth/login",{email:e,password:t});return n.token&&localStorage.setItem("techcrm_token",n.token),n.user&&d.set(d.KEYS.USER,n.user),localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:n.user}}catch(n){if(e.toLowerCase()==="neha.jain@techcrm.io"&&t==="password"){const o={name:"Neha Jain",email:"neha.jain@techcrm.io",role:"Web Developer / Outreach Specialist",isAdmin:!0,accessRole:"admin",avatar:"NJ"};return localStorage.setItem("techcrm_token","demo-offline-token-"+Date.now()),d.set(d.KEYS.USER,o),localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:o,isOfflineDemo:!0}}throw n}},async register(e,t,n,i){const o=await b.post("/auth/register",{name:e,email:t,password:n,role:i});return o.token&&localStorage.setItem("techcrm_token",o.token),o.user&&d.set(d.KEYS.USER,o.user),localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:o.user}},logout(){localStorage.removeItem("techcrm_token"),localStorage.setItem("techcrm_logged_in","false"),localStorage.removeItem(d.KEYS.USER),window.location.hash="#/login",window.location.reload()}};let g=[],U=!1;const v={async fetchFromMongoDB(){try{const e=await b.get("/leads");Array.isArray(e)&&(g=e.map(t=>({...t,id:t._id||t.id})),U=!0,d.set(d.KEYS.LEADS,g));try{const t=await b.get("/activities");Array.isArray(t)&&t.length>0&&d.set(d.KEYS.ACTIVITIES,t)}catch{}return g}catch(e){console.warn("Could not sync with MongoDB server, using cached data:",e.message)}return this.getAll()},async syncWithServer(){return this.fetchFromMongoDB()},getAll(){return g.length>0||U||(g=d.get(d.KEYS.LEADS,[]).map(t=>({...t,id:t._id||t.id}))),g},getById(e){return this.getAll().find(n=>n.id===e||n._id===e)||null},async create(e){const n=(e.company&&typeof e.company=="string"?e.company.trim():"")||"Individual",i={name:e.name&&typeof e.name=="string"?e.name.trim():"Unnamed Lead",company:n,designation:e.designation&&typeof e.designation=="string"?e.designation.trim():"",linkedinUrl:e.linkedinUrl&&typeof e.linkedinUrl=="string"?e.linkedinUrl.trim():"",companyWebsite:e.companyWebsite&&typeof e.companyWebsite=="string"?e.companyWebsite.trim():"",industry:e.industry||"",location:e.location&&typeof e.location=="string"?e.location.trim():"",requirements:Array.isArray(e.requirements)?e.requirements:[],priority:e.priority||"medium",status:e.status||"new",potentialValue:Number(e.potentialValue)||0,notes:e.notes?[{text:e.notes,createdAt:new Date().toISOString(),author:"Neha Jain"}]:[]};let o;try{o=await b.post("/leads",i)}catch(r){throw console.error("MongoDB cloud save failed:",r.message),new Error(`MongoDB save failed: ${r.message}`)}const a={...o,id:o._id||o.id};g.unshift(a),d.set(d.KEYS.LEADS,g);const s=a.company&&a.company!=="Individual"?` (${a.company})`:"";return this.recordGlobalActivity(`${a.name}${s} added as New Lead`,"new"),a},async update(e,t){let n;try{n=await b.put(`/leads/${e}`,t)}catch(o){console.warn("MongoDB update warning:",o.message)}const i=g.findIndex(o=>o.id===e||o._id===e);return i!==-1?(g[i]={...g[i],...n||t,id:(n==null?void 0:n._id)||(n==null?void 0:n.id)||e},d.set(d.KEYS.LEADS,g),g[i]):n||null},async updateStatus(e,t,n={}){const i=this.getById(e);if(!i)return null;const o=i.status;if(o===t)return i;const a={new:"New Leads",request_sent:"Request Sent",connected:"Connected",qualified:"Qualified",proposal:"Proposal",won:"Won",lost:"Lost"},s={id:"act-"+Date.now(),title:`Moved from ${a[o]||o} to ${a[t]||t}`,time:"Just now",date:new Date().toISOString()};i.status=t,i.activities=[s,...i.activities||[]],n.lostReason!==void 0&&(i.lostReason=n.lostReason),d.set(d.KEYS.LEADS,g),this.recordGlobalActivity(`${i.name} moved to ${a[t]||t}`,t);try{const r=await b.patch(`/leads/${e}/status`,{status:t,...n});if(r){const l=g.findIndex(c=>c.id===e||c._id===e);l!==-1&&(g[l]={...r,id:r._id||r.id},d.set(d.KEYS.LEADS,g))}}catch(r){console.warn("MongoDB status update warning:",r.message)}return i},async addNote(e,t){const n=this.getById(e);if(!n||!t.trim())return null;try{const i=await b.post(`/leads/${e}/notes`,{text:t.trim(),author:"Neha Jain"});if(i){const o=g.findIndex(a=>a.id===e||a._id===e);if(o!==-1)return g[o]={...i,id:i._id||i.id},d.set(d.KEYS.LEADS,g),g[o]}}catch(i){console.warn("MongoDB note save error:",i.message);const o={id:"note-"+Date.now(),text:t.trim(),createdAt:new Date().toISOString(),author:"Neha Jain"};n.notes=[o,...n.notes||[]],d.set(d.KEYS.LEADS,g)}return n},addActivity(e,t){const n=this.getById(e);if(!n||!t.trim())return null;const i={id:"act-"+Date.now(),title:t.trim(),time:"Just now",date:new Date().toISOString()};return n.activities=[i,...n.activities||[]],d.set(d.KEYS.LEADS,g),n},async delete(e){try{await b.delete(`/leads/${e}`)}catch(t){console.warn("MongoDB delete warning:",t.message)}return g=g.filter(t=>t.id!==e&&t._id!==e),d.set(d.KEYS.LEADS,g),!0},recordGlobalActivity(e,t){b.post("/activities",{text:e,type:t,time:"Just now"}).catch(()=>{});const n=d.get(d.KEYS.ACTIVITIES,[]);n.unshift({id:"g-act-"+Date.now(),text:e,time:"Just now",type:t}),d.set(d.KEYS.ACTIVITIES,n.slice(0,20))},getStats(){const e=this.getAll(),t={new:0,request_sent:0,connected:0,qualified:0,proposal:0,won:0,lost:0};e.forEach(s=>{t[s.status]!==void 0&&t[s.status]++});const n=e.length,i=t.connected||0,o=t.proposal||0,a=t.won||0;return{totalLeads:n,connections:i,proposals:o,won:a,breakdown:{newLeads:t.new||0,requests:t.request_sent||0,connected:t.connected||0,qualified:t.qualified||0,proposal:t.proposal||0,won:t.won||0,lost:t.lost||0},actualCounts:t}}};let f=[],V=!1;const J={async fetchFromMongoDB(){try{const e=await b.get("/followups");if(Array.isArray(e))return f=e.map(t=>({...t,id:t._id||t.id})),V=!0,d.set(d.KEYS.FOLLOWUPS,f),f}catch(e){console.warn("Could not sync followups with MongoDB server, using cached:",e.message)}return this.getAll()},getAll(){return f.length>0||V||(f=d.get(d.KEYS.FOLLOWUPS,[]).map(t=>({...t,id:t._id||t.id}))),f},getByCategory(e="today"){const t=this.getAll();return e==="completed"?t.filter(n=>n.completed):t.filter(n=>!n.completed&&(e==="all"||n.category===e))},async create(e){const t={leadId:e.leadId||"",leadName:e.leadName&&typeof e.leadName=="string"?e.leadName.trim():"Lead",company:e.company&&typeof e.company=="string"?e.company.trim():"",task:e.task&&typeof e.task=="string"?e.task.trim():"",dueDate:e.dueDate||new Date().toISOString(),dueLabel:e.dueLabel||"Upcoming",category:e.category||"upcoming",priority:e.priority||"upcoming",linkedinUrl:e.linkedinUrl||"#"};let n;try{n=await b.post("/followups",t)}catch(o){console.warn("MongoDB followup create error, saving locally:",o.message),n={...t,id:"f-"+Date.now(),completed:!1}}const i={...n,id:n._id||n.id};return f.unshift(i),d.set(d.KEYS.FOLLOWUPS,f),i},async complete(e){const t=f.find(n=>n.id===e||n._id===e);t&&(t.completed=!0,d.set(d.KEYS.FOLLOWUPS,f));try{await b.patch(`/followups/${e}/complete`)}catch(n){console.warn("MongoDB followup complete error:",n.message)}return t},async snooze(e,t=1){const n=f.find(i=>i.id===e||i._id===e);n&&(n.category="upcoming",n.priority="upcoming",n.dueLabel=`Snoozed (${t}d)`,d.set(d.KEYS.FOLLOWUPS,f));try{await b.patch(`/followups/${e}/snooze`,{days:t})}catch(i){console.warn("MongoDB followup snooze error:",i.message)}return n},async delete(e){f=f.filter(t=>t.id!==e&&t._id!==e),d.set(d.KEYS.FOLLOWUPS,f);try{await b.delete(`/followups/${e}`)}catch(t){console.warn("MongoDB followup delete error:",t.message)}return!0}},Y={render(){const e=d.get(d.KEYS.NOTIFICATIONS,[]);return`
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
    `},initListeners(){const e=document.getElementById("btn-mark-all-read");e&&e.addEventListener("click",()=>{const n=d.get(d.KEYS.NOTIFICATIONS,[]).map(a=>({...a,unread:!1}));d.set(d.KEYS.NOTIFICATIONS,n);const i=document.getElementById("notif-badge-count");i&&(i.style.display="none");const o=document.getElementById("notification-panel");o&&o.querySelectorAll(".notification-item").forEach(a=>a.classList.remove("unread"))})}},W={render(){const e=h.getCurrentUser()||{name:"User",role:"Viewer",avatar:"U",email:""},t=h.isAdmin(),i=d.get(d.KEYS.NOTIFICATIONS,[]).filter(o=>o.unread).length;return`
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
            <input type="text" id="global-search-input" class="input" placeholder="Search Lead Board..." />
          </div>
        </div>

        <div class="header-right">
          <!-- Role Badge (Admin vs Viewer) -->
          <div class="user-role-pill" style="display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 600; ${t?"background: #EEF2FF; border: 1px solid #C7D2FE; color: #4338CA;":"background: #FEF9C3; border: 1px solid #FEF08A; color: #854D0E;"}" title="${t?"You have Full Administrator Privileges":"You are viewing in Read-Only mode"}">
            <span>${t?"👑":"👁️"}</span>
            <span>${t?"Admin":"Viewer (Read Only)"}</span>
          </div>

          <!-- MongoDB Atlas Live Connection Status -->
          <div id="mongo-connection-badge" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 20px; font-size: 11.5px; font-weight: 600; color: #15803D; cursor: default;" title="Connected to MongoDB Atlas Database">
            <span id="mongo-status-dot" style="width: 7px; height: 7px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 6px #22C55E; display: inline-block;"></span>
            <span id="mongo-status-text">MongoDB Atlas</span>
          </div>

          <!-- Notification Bell -->
          <div style="position: relative;">
            <button id="notif-toggle-btn" class="header-icon-btn" title="Notifications" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              ${i>0?`<span id="notif-badge-count" class="badge-count">${i}</span>`:""}
            </button>
            ${Y.render()}
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
                <div style="font-size: 11px; color: var(--text-muted);">${e.email||""}</div>
                <div style="margin-top: 4px; font-size: 11px; font-weight: 600; color: ${t?"#4F46E5":"#854D0E"};">${t?"👑 Administrator (Full Access)":"👁️ Viewer (Read Only)"}</div>
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
    `},initListeners(){Y.initListeners();const e=document.getElementById("notif-toggle-btn"),t=document.getElementById("notification-panel");e&&t&&e.addEventListener("click",r=>{r.stopPropagation(),t.classList.toggle("active");const l=document.getElementById("user-dropdown-menu");l&&l.classList.remove("active")});const n=document.getElementById("user-menu-btn"),i=document.getElementById("user-dropdown-menu");n&&i&&n.addEventListener("click",r=>{r.stopPropagation(),i.classList.toggle("active"),t&&t.classList.remove("active")}),document.addEventListener("click",()=>{t&&t.classList.remove("active"),i&&i.classList.remove("active")});const o=document.getElementById("header-logout-btn");o&&o.addEventListener("click",()=>{h.logout()});const a=async()=>{var u,y,x,E;const r=document.getElementById("mongo-connection-badge"),l=document.getElementById("mongo-status-dot"),c=document.getElementById("mongo-status-text");if(!r||!l||!c)return;const m=await b.checkHealth();m.ok&&((y=(u=m.data)==null?void 0:u.database)!=null&&y.includes("Connected"))?(r.style.background="#F0FDF4",r.style.borderColor="#BBF7D0",r.style.color="#15803D",l.style.background="#22C55E",l.style.boxShadow="0 0 6px #22C55E",c.textContent="MongoDB Atlas",r.title=`Connected to MongoDB Atlas Cloud Database (${((E=(x=m.data)==null?void 0:x.counts)==null?void 0:E.leads)??0} leads stored)`):(r.style.background="#FEF2F2",r.style.borderColor="#FECACA",r.style.color="#B91C1C",l.style.background="#EF4444",l.style.boxShadow="none",c.textContent="MongoDB Offline",r.title="Cannot reach MongoDB Atlas backend server")};a(),window.addEventListener("techcrm:data-changed",a);const s=document.getElementById("global-search-input");s&&s.addEventListener("keydown",r=>{r.key==="Enter"&&(encodeURIComponent(s.value.trim()),window.location.hash="#/pipeline")})}},H={render(e="/dashboard"){const t=v.getAll();return`
      <aside class="sidebar">
                <div class="sidebar-header" style="display: flex; align-items: center; justify-content: space-between; position: relative;">
          <a href="#/dashboard" class="brand-logo">
            <div class="brand-icon">🚀</div>
            <span class="brand-text">TechCRM</span>
          </a>
          <button id="btn-toggle-sidebar" class="sidebar-toggle-btn" title="Toggle Sidebar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>


        <nav class="sidebar-nav">
          ${[{path:"/dashboard",label:"Dashboard",icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>'},{path:"/pipeline",label:"Lead Board",badge:t.filter(i=>i.status!=="lost"&&i.status!=="won").length,icon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'}].map(i=>`
            <a href="#${i.path}" class="nav-link ${e===i.path?"active":""}" title="${i.label}">
              ${i.icon}
              <span class="nav-link-text">${i.label}</span>
              ${i.badge!==void 0&&i.badge>0?`<span class="nav-link-badge">${i.badge}</span>`:""}
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
    `},initListeners(){const e=document.getElementById("btn-toggle-sidebar");e&&e.addEventListener("click",()=>{document.body.classList.toggle("sidebar-collapsed");const t=document.body.classList.contains("sidebar-collapsed");localStorage.setItem("techcrm_sidebar_collapsed",t?"true":"false")})}},ae={render(e="/dashboard"){return`
      <nav class="mobile-bottom-nav">
        ${[{path:"/dashboard",label:"Dashboard",icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>'},{path:"/pipeline",label:"Lead Board",icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>'}].map(n=>`
          <a href="#${n.path}" class="mobile-nav-item ${e===n.path?"active":""}">
            ${n.icon}
            <span>${n.label}</span>
          </a>
        `).join("")}
      </nav>
    `}},p={show(e,t="success",n=3e3){const i=document.getElementById("toast-container");if(!i)return;const o=document.createElement("div");o.className=`toast toast-${t}`;let a="";t==="success"?a='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>':t==="warning"?a='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>':t==="danger"?a='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>':a='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>',o.innerHTML=`
      ${a}
      <span>${e}</span>
    `,i.appendChild(o),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateY(10px)",setTimeout(()=>o.remove(),200)},n)}},B={currentLeadId:null,render(){return`
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
    `},open(e){const t=v.getById(e);if(!t)return;const n=h.isAdmin();this.currentLeadId=e;const i=document.getElementById("lead-drawer"),o=document.getElementById("drawer-backdrop"),a=document.getElementById("drawer-content");if(!i||!o||!a)return;const s=(t.name||"L").split(" ").filter(Boolean).map(l=>l[0]).join("").substring(0,2).toUpperCase()||"L",r=Array.isArray(t.requirements)?t.requirements:[];a.innerHTML=`
      ${n?"":`
      <div style="background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12.5px; color: #92400E; display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 16px;">👁️</span>
        <span><strong>Viewer (Read-Only) Mode:</strong> Editing, notes, activity logs, and status updates are restricted to Administrator.</span>
      </div>
      `}

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
          <span class="drawer-field-label">Status ${n?"":"(Locked)"}</span>
          <select id="drawer-status-select" class="select" style="font-weight: 500; ${n?"":"background: #F1F5F9; cursor: not-allowed; color: #64748B;"}" ${n?"":'disabled title="Read-only for viewers"'}>
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
            ${r.length>0?r.map(l=>`<span class="tag-chip" style="font-size: 12px; padding: 4px 8px;">${l}</span>`).join(""):'<span style="color: var(--text-muted); font-size: 13px; font-style: italic;">None specified</span>'}
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
          ${n?`
            <button id="btn-add-activity-trigger" class="btn btn-ghost btn-sm" style="font-size: 11px;">+ Add Activity</button>
          `:`
            <span class="badge" style="background: #F1F5F9; color: #64748B; font-size: 10.5px;">Read-Only</span>
          `}
        </div>

        <!-- Inline Add Activity Form -->
        ${n?`
        <div id="add-activity-box" style="display: none; margin-bottom: 12px; background: #F8FAFC; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
          <input type="text" id="custom-activity-input" class="input" placeholder="e.g. Discussed proposal on call" style="margin-bottom: 8px;" />
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button id="btn-cancel-activity" class="btn btn-ghost btn-sm">Cancel</button>
            <button id="btn-save-activity" class="btn btn-primary btn-sm">Log Activity</button>
          </div>
        </div>
        `:""}

        <div class="timeline">
          ${(t.activities||[]).map(l=>`
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-title">${l.title}</div>
              <div class="timeline-time">${l.time||"Recently"}</div>
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
          `:t.notes.map(l=>`
            <div class="note-item">
              <div>${l.text}</div>
              <div class="note-meta">${l.author||"Neha"} • ${new Date(l.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
            </div>
          `).join("")}
        </div>

        <!-- Add Note Box -->
        ${n?`
        <div style="margin-top: 10px;">
          <textarea id="drawer-new-note" class="textarea" placeholder="Add a note or call update..." style="min-height: 60px;"></textarea>
          <button id="btn-drawer-add-note" class="btn btn-secondary btn-sm" style="margin-top: 8px; width: 100%;">+ Add Note</button>
        </div>
        `:`
        <div style="font-size: 12px; color: var(--text-muted); font-style: italic; margin-top: 10px; padding: 8px; background: #F8FAFC; border-radius: 6px; text-align: center;">
          🔒 Adding notes is restricted to Administrator
        </div>
        `}
      </div>

      <div class="drawer-divider"></div>

      <!-- Bottom Actions -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
        ${n?`
        <button id="btn-drawer-delete-lead" class="btn btn-ghost btn-sm" style="color: var(--danger);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          Delete Lead
        </button>
        <button id="btn-drawer-schedule-followup" class="btn btn-secondary btn-sm">Schedule Follow-up</button>
        `:`
        <span style="font-size: 12px; color: var(--text-muted); font-style: italic;">Viewing as Guest/Viewer</span>
        `}
      </div>
    `,o.classList.add("active"),i.classList.add("active"),document.body.style.overflow="hidden",this.bindDrawerActions(e)},close(){const e=document.getElementById("lead-drawer"),t=document.getElementById("drawer-backdrop");e&&e.classList.remove("active"),t&&t.classList.remove("active"),document.body.style.overflow="",this.currentLeadId=null},bindDrawerActions(e){if(!h.isAdmin())return;const t=document.getElementById("drawer-status-select");t&&t.addEventListener("change",async u=>{const y=u.target.value;await v.updateStatus(e,y),p.show(`✓ Status updated to ${y.replace("_"," ")} in MongoDB`),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e)});const n=document.getElementById("btn-add-activity-trigger"),i=document.getElementById("add-activity-box"),o=document.getElementById("btn-cancel-activity"),a=document.getElementById("btn-save-activity"),s=document.getElementById("custom-activity-input");n&&i&&n.addEventListener("click",()=>{i.style.display="block",s.focus()}),o&&i&&o.addEventListener("click",()=>{i.style.display="none",s.value=""}),a&&s&&a.addEventListener("click",async()=>{const u=s.value.trim();u&&(await v.addActivity(e,u),p.show("Activity logged successfully"),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e))});const r=document.getElementById("btn-drawer-add-note"),l=document.getElementById("drawer-new-note");r&&l&&r.addEventListener("click",async()=>{const u=l.value.trim();if(u){r.disabled=!0;try{await v.addNote(e,u),p.show("✓ Note saved to MongoDB"),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e)}finally{r.disabled=!1}}});const c=document.getElementById("btn-drawer-schedule-followup");c&&c.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-schedule-followup"))});const m=document.getElementById("btn-drawer-delete-lead");m&&m.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:confirm-delete",{detail:{leadId:e}}))})},initGlobalListeners(){const e=document.getElementById("drawer-backdrop"),t=document.getElementById("drawer-close-btn");e&&e.addEventListener("click",()=>this.close()),t&&t.addEventListener("click",()=>this.close()),document.addEventListener("keydown",n=>{n.key==="Escape"&&this.currentLeadId&&this.close()})}},C={render(){return`
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
    `},open(){const e=document.getElementById("add-lead-modal");if(e){e.style.display="flex",document.body.style.overflow="hidden";const t=document.getElementById("lead-name");t&&t.focus()}},close(){const e=document.getElementById("add-lead-modal");if(e){e.style.display="none",document.body.style.overflow="";const t=document.getElementById("add-lead-form");t&&t.reset();const n=document.getElementById("requirement-tag-selector");n&&n.querySelectorAll(".tag-option").forEach(o=>o.classList.remove("selected"));const i=document.getElementById("priority-selector");if(i){i.querySelectorAll(".radio-pill").forEach(a=>a.classList.remove("selected"));const o=i.querySelector('.radio-pill[data-value="medium"]');o&&o.classList.add("selected")}}},initListeners(){const e=document.getElementById("add-lead-modal");if(!e)return;e.querySelectorAll(".modal-close-btn").forEach(o=>{o.addEventListener("click",()=>this.close())}),e.addEventListener("click",o=>{o.target===e&&this.close()});const t=document.getElementById("requirement-tag-selector");t&&t.addEventListener("click",o=>{const a=o.target.closest(".tag-option");a&&a.classList.toggle("selected")});const n=document.getElementById("priority-selector");n&&n.addEventListener("click",o=>{const a=o.target.closest(".radio-pill");a&&(n.querySelectorAll(".radio-pill").forEach(s=>s.classList.remove("selected")),a.classList.add("selected"))});const i=document.getElementById("add-lead-form");i&&i.addEventListener("submit",async o=>{var P,z,R,O,N,M,q,_,j;if(o.preventDefault(),!h.isAdmin()){p.show("Action restricted: Only administrators can create leads","warning"),this.close();return}const a=document.getElementById("lead-name"),s=a?a.value.trim():"";if(!s){p.show("Please enter the lead full name","error");return}const r=i.querySelector('button[type="submit"]');r&&(r.disabled=!0,r.textContent="Saving to MongoDB...");const l=((P=document.getElementById("lead-designation"))==null?void 0:P.value.trim())||"";let c=((z=document.getElementById("lead-linkedin"))==null?void 0:z.value.trim())||"";c&&!/^https?:\/\//i.test(c)&&(c="https://"+c);const m=((R=document.getElementById("lead-company"))==null?void 0:R.value.trim())||"";let u=((O=document.getElementById("lead-website"))==null?void 0:O.value.trim())||"";u&&!/^https?:\/\//i.test(u)&&(u="https://"+u);const y=((N=document.getElementById("lead-industry"))==null?void 0:N.value)||"",x=((M=document.getElementById("lead-location"))==null?void 0:M.value.trim())||"",E=(q=document.getElementById("lead-value"))==null?void 0:q.value,L=((_=document.getElementById("lead-notes"))==null?void 0:_.value.trim())||"",k=t?Array.from(t.querySelectorAll(".tag-option.selected")).map(A=>A.getAttribute("data-value")):[],I=((j=n==null?void 0:n.querySelector(".radio-pill.selected"))==null?void 0:j.getAttribute("data-value"))||"medium";try{const A=await v.create({name:s,designation:l,linkedinUrl:c,company:m,companyWebsite:u,industry:y,location:x,requirements:k,priority:I,potentialValue:E?Number(E):0,notes:L});this.close(),i.reset(),p.show(`✓ Lead "${A.name}" saved to MongoDB & Pipeline!`),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}catch(A){p.show(`Failed to save lead: ${A.message}`,"error")}finally{r&&(r.disabled=!1,r.textContent="Save Lead to Pipeline")}})}},T={currentLeadId:null,render(){return`
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
    `},open(e){this.currentLeadId=e;const t=document.getElementById("lost-reason-modal");t&&(t.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("lost-reason-modal");e&&(e.style.display="none",document.body.style.overflow="",this.currentLeadId=null)},initListeners(){const e=document.getElementById("lost-reason-modal"),t=document.getElementById("btn-close-lost-modal"),n=document.getElementById("btn-cancel-lost-modal"),i=document.getElementById("lost-reason-form"),o=document.getElementById("other-reason-group");t&&t.addEventListener("click",()=>this.close()),n&&n.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",a=>{a.target===e&&this.close()}),i&&(i.addEventListener("change",a=>{a.target.name==="lost-reason"&&o&&(o.style.display=a.target.value==="Other"?"block":"none")}),i.addEventListener("submit",async a=>{var l;if(a.preventDefault(),!h.isAdmin()){p.show("Action restricted: Only administrators can update lead status","warning"),this.close();return}if(!this.currentLeadId)return;const s=i.querySelector('input[name="lost-reason"]:checked');let r=s?s.value:"No response";if(r==="Other"){const c=(l=document.getElementById("custom-lost-reason"))==null?void 0:l.value.trim();c&&(r=c)}await v.updateStatus(this.currentLeadId,"lost",{lostReason:r}),p.show(`✓ Lead marked as Lost (${r}) in MongoDB`,"warning"),this.close(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}))}},$={render(){return`
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
                ${v.getAll().map(t=>`<option value="${t.id}" data-name="${t.name}" data-company="${t.company||""}" data-linkedin="${t.linkedinUrl||""}">${t.name}${t.company?` (${t.company})`:""}</option>`).join("")}
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
    `},open(){const e=document.getElementById("schedule-followup-modal");e&&(e.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("schedule-followup-modal");if(e){e.style.display="none",document.body.style.overflow="";const t=document.getElementById("schedule-followup-form");t&&t.reset()}},initListeners(){const e=document.getElementById("schedule-followup-modal"),t=document.getElementById("btn-close-schedule-modal"),n=document.getElementById("btn-cancel-schedule-modal"),i=document.getElementById("schedule-followup-form");t&&t.addEventListener("click",()=>this.close()),n&&n.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",o=>{o.target===e&&this.close()}),i&&i.addEventListener("submit",async o=>{var E,L,k;if(o.preventDefault(),!h.isAdmin()){p.show("Action restricted: Only administrators can schedule tasks","warning"),this.close();return}const a=document.getElementById("followup-lead"),s=a==null?void 0:a.options[a.selectedIndex],r=(a==null?void 0:a.value)||"",l=s?s.getAttribute("data-name"):"Lead",c=s?s.getAttribute("data-company"):"",m=s?s.getAttribute("data-linkedin"):"",u=((E=document.getElementById("followup-task"))==null?void 0:E.value)||"",y=((L=document.getElementById("followup-category"))==null?void 0:L.value)||"upcoming",x=((k=document.getElementById("followup-priority"))==null?void 0:k.value)||"upcoming";try{await J.create({leadId:r,leadName:l,company:c,task:u,category:y,priority:x,dueLabel:y==="today"?"Today, 4:00 PM":"Next Week",linkedinUrl:m}),p.show("✓ Follow-up saved to MongoDB & scheduled!"),this.close(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}catch(I){p.show(`Failed to save follow-up: ${I.message}`,"error")}})}},D={currentLeadId:null,render(){return`
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
    `},open(e){const t=v.getById(e);if(!t)return;this.currentLeadId=e;const n=document.getElementById("delete-confirm-modal"),i=document.getElementById("delete-modal-msg");n&&i&&(i.innerHTML=`This will permanently remove <strong>${t.name}</strong> ${t.company?`(${t.company}) `:""}and their activity history.`,n.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("delete-confirm-modal");e&&(e.style.display="none",document.body.style.overflow="",this.currentLeadId=null)},initListeners(){const e=document.getElementById("delete-confirm-modal"),t=document.getElementById("btn-close-delete-modal"),n=document.getElementById("btn-cancel-delete"),i=document.getElementById("btn-confirm-delete");t&&t.addEventListener("click",()=>this.close()),n&&n.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",o=>{o.target===e&&this.close()}),i&&i.addEventListener("click",async()=>{if(!h.isAdmin()){p.show("Action restricted: Only administrators can delete leads","warning"),this.close();return}if(this.currentLeadId){const o=v.getById(this.currentLeadId),a=o?o.name:"Lead";i.disabled=!0;try{await v.delete(this.currentLeadId),B.close(),this.close(),p.show(`✓ Lead "${a}" deleted from MongoDB`,"danger"),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}finally{i.disabled=!1}}})}},se={activeTab:"signin",render(){return`
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%); padding: 24px;">
        <div style="width: 100%; max-width: 440px; background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 16px; padding: 36px; box-shadow: 0 20px 40px -15px rgba(0,0,0,0.08);">
          
          <!-- Logo & Header -->
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #6366F1, #4F46E5); display: inline-flex; align-items: center; justify-content: center; font-size: 26px; box-shadow: 0 8px 16px rgba(99, 102, 241, 0.25); margin-bottom: 12px;">
              🚀
            </div>
            <h1 style="font-size: 24px; font-weight: 700; color: var(--text-main); margin-bottom: 4px; letter-spacing: -0.02em;">TechCRM</h1>
            <p style="font-size: 13.5px; color: var(--text-secondary);">LinkedIn Outreach & Pipeline System</p>
          </div>

          <!-- Auth Mode Tabs -->
          <div style="display: flex; background: #F1F5F9; padding: 4px; border-radius: 10px; margin-bottom: 24px;">
            <button type="button" id="tab-btn-signin" class="btn btn-ghost" style="flex: 1; padding: 8px 12px; font-size: 13.5px; font-weight: 600; border-radius: 7px; transition: all 0.2s ease; ${this.activeTab==="signin"?"background: #FFFFFF; color: var(--primary); box-shadow: 0 2px 4px rgba(0,0,0,0.06);":"color: var(--text-secondary);"}">
              Sign In
            </button>
            <button type="button" id="tab-btn-signup" class="btn btn-ghost" style="flex: 1; padding: 8px 12px; font-size: 13.5px; font-weight: 600; border-radius: 7px; transition: all 0.2s ease; ${this.activeTab==="signup"?"background: #FFFFFF; color: var(--primary); box-shadow: 0 2px 4px rgba(0,0,0,0.06);":"color: var(--text-secondary);"}">
              Create Account
            </button>
          </div>

          <!-- SIGN IN FORM -->
          <div id="signin-container" style="display: ${this.activeTab==="signin"?"block":"none"};">
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 16px; font-weight: 600; color: var(--text-main);">Welcome back</h2>
              <p style="font-size: 13px; color: var(--text-secondary);">Sign in to access your outreach pipeline</p>
            </div>

            <form id="signin-form">
              <div class="form-group">
                <label class="form-label" for="signin-email">Email Address <span style="color: #EF4444;">*</span></label>
                <input type="email" id="signin-email" class="input" placeholder="e.g. neha.jain@techcrm.io" required />
              </div>

              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="form-label" for="signin-password" style="margin-bottom: 0;">Password <span style="color: #EF4444;">*</span></label>
                </div>
                <div style="position: relative;">
                  <input type="password" id="signin-password" class="input" placeholder="Enter your password" required />
                  <button type="button" class="btn-toggle-pwd" data-target="signin-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; font-size: 14px;">
                    👁
                  </button>
                </div>
              </div>

              <!-- Quick Demo Autofill -->
              <div style="margin-bottom: 20px; font-size: 12px; color: #475569; background: #EEF2FF; padding: 12px; border-radius: 8px; border: 1px solid #C7D2FE; display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div style="font-weight: 600; color: #4338CA;">👑 Admin Demo Account:</div>
                  <div style="font-size: 11px; color: #6366F1; margin-top: 2px;">neha.jain@techcrm.io / password</div>
                </div>
                <button type="button" id="btn-fill-admin-demo" class="btn btn-sm" style="background: #4F46E5; color: white; border: none; padding: 4px 10px; font-size: 11.5px; border-radius: 6px;">
                  Autofill
                </button>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 11px; font-size: 14px; font-weight: 600; justify-content: center; border-radius: 8px;">
                Sign In to TechCRM
              </button>
            </form>
          </div>

          <!-- SIGN UP FORM -->
          <div id="signup-container" style="display: ${this.activeTab==="signup"?"block":"none"};">
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 16px; font-weight: 600; color: var(--text-main);">Create New Account</h2>
              <p style="font-size: 13px; color: var(--text-secondary);">Join the team to view CRM analytics and progress</p>
            </div>

            <form id="signup-form">
              <div class="form-group">
                <label class="form-label" for="signup-name">Full Name <span style="color: #EF4444;">*</span></label>
                <input type="text" id="signup-name" class="input" placeholder="e.g. Rohit Mehra" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="signup-email">Email Address <span style="color: #EF4444;">*</span></label>
                <input type="email" id="signup-email" class="input" placeholder="e.g. rohit@company.com" required />
              </div>

              <div class="form-group">
                <label class="form-label" for="signup-password">Password <span style="color: #EF4444;">*</span></label>
                <div style="position: relative;">
                  <input type="password" id="signup-password" class="input" placeholder="At least 6 characters" minlength="6" required />
                  <button type="button" class="btn-toggle-pwd" data-target="signup-password" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; font-size: 14px;">
                    👁
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="signup-role">Role / Department <span class="optional">(Optional)</span></label>
                <input type="text" id="signup-role" class="input" placeholder="e.g. Business Analyst / Guest Reviewer" />
              </div>

              <!-- Permission Notice -->
              <div style="margin-bottom: 20px; font-size: 12px; color: #854D0E; background: #FEF9C3; padding: 12px; border-radius: 8px; border: 1px solid #FEF08A; line-height: 1.4;">
                🔒 <strong>Access Level:</strong> New registrations receive <strong>Viewer (Read-Only)</strong> access. You will be able to view all leads, pipeline stages, and outreach stats without edit privileges.
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 11px; font-size: 14px; font-weight: 600; justify-content: center; border-radius: 8px;">
                Create Account & Enter CRM
              </button>
            </form>
          </div>

        </div>
      </div>
    `},switchTab(e){this.activeTab=e;const t=document.getElementById("signin-container"),n=document.getElementById("signup-container"),i=document.getElementById("tab-btn-signin"),o=document.getElementById("tab-btn-signup");e==="signin"?(t&&(t.style.display="block"),n&&(n.style.display="none"),i&&(i.style.background="#FFFFFF",i.style.color="var(--primary)",i.style.boxShadow="0 2px 4px rgba(0,0,0,0.06)"),o&&(o.style.background="transparent",o.style.color="var(--text-secondary)",o.style.boxShadow="none")):(t&&(t.style.display="none"),n&&(n.style.display="block"),o&&(o.style.background="#FFFFFF",o.style.color="var(--primary)",o.style.boxShadow="0 2px 4px rgba(0,0,0,0.06)"),i&&(i.style.background="transparent",i.style.color="var(--text-secondary)",i.style.boxShadow="none"))},initListeners(){const e=document.getElementById("tab-btn-signin"),t=document.getElementById("tab-btn-signup");e&&e.addEventListener("click",()=>this.switchTab("signin")),t&&t.addEventListener("click",()=>this.switchTab("signup")),document.querySelectorAll(".btn-toggle-pwd").forEach(a=>{a.addEventListener("click",()=>{const s=a.getAttribute("data-target"),r=document.getElementById(s);if(r){const l=r.getAttribute("type")==="password";r.setAttribute("type",l?"text":"password")}})});const n=document.getElementById("btn-fill-admin-demo");n&&n.addEventListener("click",()=>{const a=document.getElementById("signin-email"),s=document.getElementById("signin-password");a&&(a.value="neha.jain@techcrm.io"),s&&(s.value="password"),p.show("👑 Admin demo credentials filled!")});const i=document.getElementById("signin-form");i&&i.addEventListener("submit",async a=>{var c,m,u;a.preventDefault();const s=(c=document.getElementById("signin-email"))==null?void 0:c.value.trim(),r=(m=document.getElementById("signin-password"))==null?void 0:m.value,l=i.querySelector('button[type="submit"]');if(!s||!r){p.show("Please enter your email and password","error");return}l&&(l.disabled=!0,l.textContent="Signing in...");try{const y=await h.login(s,r),x=h.isAdmin()?"Admin 👑":"Viewer 👁️";p.show(`Welcome back, ${((u=y.user)==null?void 0:u.name)||"User"}! (${x})`),window.location.hash="#/dashboard",window.location.reload()}catch(y){p.show(y.message||"Login failed","error")}finally{l&&(l.disabled=!1,l.textContent="Sign In to TechCRM")}});const o=document.getElementById("signup-form");o&&o.addEventListener("submit",async a=>{var u,y,x,E,L;a.preventDefault();const s=(u=document.getElementById("signup-name"))==null?void 0:u.value.trim(),r=(y=document.getElementById("signup-email"))==null?void 0:y.value.trim(),l=(x=document.getElementById("signup-password"))==null?void 0:x.value,c=((E=document.getElementById("signup-role"))==null?void 0:E.value.trim())||"Team Member",m=o.querySelector('button[type="submit"]');if(!s||!r||!l){p.show("Name, email and password are required","error");return}if(l.length<6){p.show("Password must be at least 6 characters long","error");return}m&&(m.disabled=!0,m.textContent="Creating account...");try{const k=await h.register(s,r,l,c),I=h.isAdmin()?"Admin 👑":"Viewer 👁️ (Read Only)";p.show(`Account created! Welcome, ${(L=k.user)==null?void 0:L.name}! (${I})`),window.location.hash="#/dashboard",window.location.reload()}catch(k){p.show(k.message||"Registration failed","error")}finally{m&&(m.disabled=!1,m.textContent="Create Account & Enter CRM")}})}},K={render(){const e=v.getStats(),t=d.get(d.KEYS.ACTIVITIES,[]),n=h.getCurrentUser(),i=h.isAdmin();return`
      <div class="page-container">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Good morning, ${n!=null&&n.name?n.name.split(" ")[0]:"User"} 👋</h1>
            <p>Here's your LinkedIn outreach progress and team performance overview.</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn btn-secondary" onclick="window.location.hash='#/pipeline'">
              View Lead Board →
            </button>

            ${i?`
              <button class="btn btn-primary" id="btn-dash-add-lead">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Lead
              </button>
            `:`
              <span style="font-size: 12px; color: #854D0E; background: #FEF9C3; border: 1px solid #FEF08A; padding: 6px 12px; border-radius: 8px; font-weight: 600;">
                👁️ Read-Only Mode
              </span>
            `}
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
                <h3 class="section-heading" style="font-size: 16px;">Lead Board Breakdown</h3>
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
            ${t.slice(0,5).map(o=>`
              <div style="height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-radius: 8px; background: #F8FAFC; border: 1px solid var(--border-subtle); transition: background var(--transition-fast);">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: ${o.type==="won"?"#16A34A":o.type==="proposal"?"#0284C7":"#6366F1"};"></span>
                  <span style="font-size: 13.5px; font-weight: 500; color: var(--text-main);">${o.text}</span>
                </div>
                <span style="font-size: 12px; color: var(--text-muted);">${o.time}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("btn-dash-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))})}},re={getTechIcon(e){switch(e.toLowerCase()){case"website":return"🌐";case"mobile app":case"mobile":return"📱";case"ai/ml":case"ai":return"🤖";case"ui/ux":return"🎨";case"software":return"💻";default:return"⚡"}},formatTimeAgo(e){if(!e)return"Recent";const t=new Date(e),i=new Date-t,o=Math.floor(i/(1e3*60*60*24)),a=Math.floor(i/(1e3*60*60));return o>0?`${o}d ago`:a>0?`${a}h ago`:"Today"},render(e){const t=(e.name||"L").split(" ").filter(Boolean).map(s=>s[0]).join("").substring(0,2).toUpperCase()||"L",n=Array.isArray(e.requirements)?e.requirements:[],i=this.formatTimeAgo(e.addedDate),o=h.isAdmin();let a="";return e.priority==="high"?a='<span class="badge badge-priority-high">🔥 High</span>':e.priority==="medium"?a='<span class="badge badge-priority-medium">Medium</span>':a='<span class="badge badge-priority-low">Low</span>',`
      <div class="lead-card" draggable="${o?"true":"false"}" data-id="${e.id}" data-status="${e.status}" style="${o?"":"cursor: pointer;"}">
        <div class="lead-card-header">
          <div class="lead-card-avatar">${t}</div>
          <div class="lead-card-name" title="${e.name}">${e.name}</div>
        </div>

        <div class="lead-card-company" title="${e.company||"Direct Outreach"}">${e.company||"—"}</div>
        <div class="lead-card-designation" title="${e.designation||"Prospect"}">${e.designation||"Prospect"}</div>

        <div class="lead-card-tags">
          ${n.slice(0,2).map(s=>`
            <span class="tag-chip">
              <span>${this.getTechIcon(s)}</span>
              <span>${s}</span>
            </span>
          `).join("")}
          ${a}
        </div>

        <div class="lead-card-footer">
          <span>${i}</span>
          ${e.potentialValue?`<span style="font-weight: 600; color: #4F46E5;">₹${(e.potentialValue/1e3).toFixed(0)}k</span>`:""}
        </div>
      </div>
    `}},G={render(e,t=[]){const n=t.filter(i=>i.status===e.id);return`
      <div class="kanban-column" data-stage="${e.id}">
        <div class="kanban-col-header">
          <div class="kanban-col-title-group">
            <span class="kanban-col-title">${e.name}</span>
          </div>
          <span class="kanban-col-count">${n.length}</span>
        </div>

        <div class="kanban-col-cards" data-stage="${e.id}">
          ${n.length===0?`
            <div style="padding: 24px 8px; text-align: center; color: var(--text-muted); font-size: 12px; border: 1px dashed var(--border-color); border-radius: 8px;">
              Drop leads here
            </div>
          `:n.map(i=>re.render(i)).join("")}
        </div>
      </div>
    `}},le={currentSearch:"",currentPriority:"all",currentRequirement:"all",currentDateRange:"all",draggedLeadId:null,getStages(){return d.get(d.KEYS.PIPELINE_STAGES,[{id:"new",name:"New Leads",visible:!0},{id:"request_sent",name:"Request Sent",visible:!0},{id:"connected",name:"Connected",visible:!0},{id:"qualified",name:"Qualified",visible:!0},{id:"proposal",name:"Proposal",visible:!0},{id:"won",name:"Won",visible:!0}])},matchesDateRange(e){if(this.currentDateRange==="all")return!0;const t=e.addedDate||e.createdAt;if(!t)return!1;const n=new Date(t).getTime(),o=(Date.now()-n)/(1e3*60*60*24);return this.currentDateRange==="7days"?o<=7:this.currentDateRange==="30days"?o<=30:this.currentDateRange==="1year"?o<=365:!0},render(){const e=v.getAll(),t=this.getStages(),n=h.isAdmin(),i=t.filter(r=>r.visible!==!1);let o=e.filter(r=>{const l=this.currentSearch.toLowerCase(),c=!l||r.name&&r.name.toLowerCase().includes(l)||r.company&&r.company.toLowerCase().includes(l),m=this.currentPriority==="all"||r.priority===this.currentPriority,u=this.currentRequirement==="all"||Array.isArray(r.requirements)&&r.requirements.some(x=>x.toLowerCase().includes(this.currentRequirement.toLowerCase())),y=this.matchesDateRange(r);return c&&m&&u&&y});const a=e.filter(r=>r.status==="lost").length,s=e.filter(r=>r.status==="won").length;return`
      <div class="page-container">
        <!-- Page Header & Actions -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Lead Board</h1>
            <p>Discovery → Connection → Conversation → Proposal → Won</p>
          </div>

          <div style="display: flex; gap: 10px; align-items: center;">
            ${n?`
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

                  <!-- Add New Column Form -->
                  <div style="font-size: 12px; font-weight: 600; margin-bottom: 8px; color: var(--text-main);">Add New Column</div>
                  <div style="display: flex; gap: 8px;">
                    <input type="text" id="input-new-column-name" class="input" placeholder="Column name (e.g. In Review)..." style="font-size: 12px; padding: 6px 10px; height: 32px; flex: 1;" />
                    <button id="btn-submit-new-column" class="btn btn-primary" style="font-size: 12px; padding: 0 14px; height: 32px; white-space: nowrap;">+ Add</button>
                  </div>
                </div>
              </div>

              <button class="btn btn-primary" id="btn-pipeline-add-lead">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Lead
              </button>
            `:`
              <span style="font-size: 12px; color: #854D0E; background: #FEF9C3; border: 1px solid #FEF08A; padding: 6px 12px; border-radius: 8px; font-weight: 600;">
                👁️ View Only
              </span>
            `}
          </div>
        </div>

        ${n?"":`
          <!-- Read-Only Banner for Viewers -->
          <div style="background: #FEF9C3; border: 1px solid #FEF08A; border-radius: 10px; padding: 12px 18px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: #854D0E;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 18px;">👁️</span>
              <span><strong>Viewer (Read-Only) Mode:</strong> You can view all live leads, stages, and metrics. Modifying leads, drag-and-drop, and column editing are restricted to Admin.</span>
            </div>
            <span style="font-size: 11px; font-weight: 700; background: #FEF08A; color: #713F12; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap;">Read Only</span>
          </div>
        `}

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
            `:i.map(r=>G.render(r,o)).join("")}
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
    `},initListeners(){const e=document.getElementById("btn-pipeline-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))});const t=document.getElementById("pipeline-search");t&&t.addEventListener("input",s=>{this.currentSearch=s.target.value.toLowerCase().trim(),this.refreshBoard()});const n=document.getElementById("pipeline-filter-priority");n&&n.addEventListener("change",s=>{this.currentPriority=s.target.value,this.refreshBoard()});const i=document.getElementById("pipeline-filter-tech");i&&i.addEventListener("change",s=>{this.currentRequirement=s.target.value,this.refreshBoard()});const o=document.getElementById("pipeline-filter-date");o&&o.addEventListener("change",s=>{this.currentDateRange=s.target.value,this.refreshBoard()});const a=document.getElementById("btn-reset-filters");a&&a.addEventListener("click",()=>{this.currentSearch="",this.currentPriority="all",this.currentRequirement="all",this.currentDateRange="all";const s=document.getElementById("pipeline-search");s&&(s.value="");const r=document.getElementById("pipeline-filter-priority");r&&(r.value="all");const l=document.getElementById("pipeline-filter-tech");l&&(l.value="all");const c=document.getElementById("pipeline-filter-date");c&&(c.value="all"),this.refreshBoard()}),this.initColumnCustomizer(),this.bindKanbanInteractions()},initColumnCustomizer(){const e=document.getElementById("btn-toggle-column-menu"),t=document.getElementById("column-customize-dropdown"),n=document.getElementById("btn-submit-new-column"),i=document.getElementById("input-new-column-name");if(!e||!t)return;e.addEventListener("click",a=>{a.stopPropagation();const s=t.style.display==="none"||!t.style.display;t.style.display=s?"block":"none",s&&this.renderColumnCheckboxes()}),document.addEventListener("click",a=>{!t.contains(a.target)&&a.target!==e&&(t.style.display="none")}),this.renderColumnCheckboxes();const o=()=>{const a=i.value.trim();if(!a)return;const r={id:"stage_"+Date.now(),name:a,visible:!0},l=this.getStages();l.push(r),d.set(d.KEYS.PIPELINE_STAGES,l),i.value="",this.renderColumnCheckboxes(),this.refreshBoard(),p.show(`✓ Added column "${a}"`)};n&&n.addEventListener("click",o),i&&i.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),o())})},renderColumnCheckboxes(){const e=document.getElementById("column-checkboxes-container");if(!e)return;const t=this.getStages(),n=["new","request_sent","connected","qualified","proposal","won"];e.innerHTML=t.map((a,s)=>{const r=n.includes(a.id);return`
        <div class="col-drag-item" draggable="true" data-index="${s}" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; border-radius: 6px; font-size: 13px; background: #F8FAFC; border: 1px solid var(--border-subtle); cursor: grab; user-select: none; transition: background 0.15s ease;">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; overflow: hidden;">
            <!-- Drag & Drop Handle Icon -->
            <span title="Drag to reorder" style="color: var(--text-muted); font-size: 14px; cursor: grab; padding: 0 2px;">⠿</span>
            
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; flex: 1; margin: 0; overflow: hidden;">
              <input type="checkbox" class="column-visibility-toggle" data-stage-id="${a.id}" ${a.visible!==!1?"checked":""} style="cursor: pointer;" />
              <span style="color: var(--text-main); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${a.name}
              </span>
            </label>
          </div>

          <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0;">
            <!-- Move Up / Down Buttons (Alternative to Drag) -->
            <button class="btn-move-col-up" data-index="${s}" title="Move up" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--text-secondary);" ${s===0?'disabled style="opacity:0.3; cursor:not-allowed; width: 22px; height: 22px;"':""}>↑</button>
            <button class="btn-move-col-down" data-index="${s}" title="Move down" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--text-secondary);" ${s===t.length-1?'disabled style="opacity:0.3; cursor:not-allowed; width: 22px; height: 22px;"':""}>↓</button>
            
            <!-- Delete Button: SIRF custom added columns ke liye dikhega, default columns ke liye nahi -->
            ${r?"":`
              <button class="btn-delete-column" data-stage-id="${a.id}" title="Delete column" style="background: #FEE2E2; border: 1px solid #FECACA; border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; color: #DC2626; cursor: pointer; font-size: 12px; font-weight: bold;">✕</button>
            `}
          </div>
        </div>
      `}).join("");let i=null;const o=e.querySelectorAll(".col-drag-item");o.forEach(a=>{a.addEventListener("dragstart",s=>{i=parseInt(a.getAttribute("data-index"),10),s.dataTransfer.effectAllowed="move",a.style.opacity="0.4"}),a.addEventListener("dragend",()=>{a.style.opacity="1",o.forEach(s=>{s.style.borderTop="1px solid var(--border-subtle)",s.style.background="#F8FAFC"})}),a.addEventListener("dragover",s=>{s.preventDefault(),s.dataTransfer.dropEffect="move",a.style.background="#EEF2FF"}),a.addEventListener("dragleave",()=>{a.style.background="#F8FAFC"}),a.addEventListener("drop",s=>{s.preventDefault(),a.style.background="#F8FAFC";const r=parseInt(a.getAttribute("data-index"),10);if(i!==null&&i!==r){const l=this.getStages(),[c]=l.splice(i,1);l.splice(r,0,c),d.set(d.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard(),p.show(`✓ Column moved to position ${r+1}`)}})}),e.querySelectorAll(".column-visibility-toggle").forEach(a=>{a.addEventListener("change",s=>{const r=a.getAttribute("data-stage-id"),l=this.getStages(),c=l.find(m=>m.id===r);c&&(c.visible=s.target.checked,d.set(d.KEYS.PIPELINE_STAGES,l),this.refreshBoard())})}),e.querySelectorAll(".btn-move-col-up").forEach(a=>{a.addEventListener("click",s=>{s.stopPropagation();const r=parseInt(a.getAttribute("data-index"),10),l=this.getStages();if(r>0){const c=l[r];l[r]=l[r-1],l[r-1]=c,d.set(d.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard()}})}),e.querySelectorAll(".btn-move-col-down").forEach(a=>{a.addEventListener("click",s=>{s.stopPropagation();const r=parseInt(a.getAttribute("data-index"),10),l=this.getStages();if(r<l.length-1){const c=l[r];l[r]=l[r+1],l[r+1]=c,d.set(d.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard()}})}),e.querySelectorAll(".btn-delete-column").forEach(a=>{a.addEventListener("click",s=>{var m;s.stopPropagation();const r=a.getAttribute("data-stage-id");let l=this.getStages();if(n.includes(r)){p.show("Default columns cannot be deleted","warning");return}const c=((m=l.find(u=>u.id===r))==null?void 0:m.name)||"Column";l=l.filter(u=>u.id!==r),d.set(d.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard(),p.show(`✓ "${c}" removed`)})})},bindKanbanInteractions(){const e=document.getElementById("app");if(!e)return;const t=h.isAdmin();e.querySelectorAll(".lead-card").forEach(n=>{n.addEventListener("click",()=>{if(n.classList.contains("is-dragging"))return;const i=n.getAttribute("data-id");i&&B.open(i)}),t?(n.addEventListener("dragstart",i=>{this.draggedLeadId=n.getAttribute("data-id"),n.classList.add("is-dragging"),i.dataTransfer.effectAllowed="move",i.dataTransfer.setData("text/plain",this.draggedLeadId)}),n.addEventListener("dragend",()=>{n.classList.remove("is-dragging"),this.draggedLeadId=null,document.querySelectorAll(".drag-over").forEach(i=>i.classList.remove("drag-over"))})):n.addEventListener("dragstart",i=>i.preventDefault())}),t&&e.querySelectorAll(".kanban-column, .outcome-drop-zone").forEach(i=>{i.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="move",i.classList.add("drag-over")}),i.addEventListener("dragleave",o=>{i.contains(o.relatedTarget)||i.classList.remove("drag-over")}),i.addEventListener("drop",o=>{o.preventDefault(),i.classList.remove("drag-over");const a=o.dataTransfer.getData("text/plain")||this.draggedLeadId,s=i.getAttribute("data-stage");a&&s&&this.handleLeadDrop(a,s)})})},async handleLeadDrop(e,t){if(!h.isAdmin()){p.show("Access Denied: Only Admin can move leads to another stage","error");return}const n=v.getById(e);if(!(!n||n.status===t))if(t==="lost")T.open(e);else{await v.updateStatus(e,t);const i=t.replace("_"," ");p.show(`✓ Lead "${n.name}" moved to ${i.toUpperCase()}`),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}},refreshBoard(){if(document.querySelector(".kanban-wrapper")){const n=this.getStages().filter(s=>s.visible!==!1),o=v.getAll().filter(s=>{const r=!this.currentSearch||s.name&&s.name.toLowerCase().includes(this.currentSearch)||s.company&&s.company.toLowerCase().includes(this.currentSearch),l=this.currentPriority==="all"||s.priority===this.currentPriority,c=this.currentRequirement==="all"||Array.isArray(s.requirements)&&s.requirements.some(u=>u.toLowerCase().includes(this.currentRequirement.toLowerCase())),m=this.matchesDateRange(s);return r&&l&&c&&m}),a=document.getElementById("kanban-board-container");a&&(a.innerHTML=n.length===0?`
          <div style="padding: 40px; text-align: center; color: var(--text-muted); width: 100%;">
            No columns selected. Click <strong>Columns ▾</strong> above to show columns.
          </div>
        `:n.map(s=>G.render(s,o)).join(""),this.bindKanbanInteractions())}}},de={currentSection:"pipeline",render(){const e=h.isAdmin(),t=d.get(d.KEYS.PIPELINE_STAGES,[]),n=[{name:"Neha Jain",role:"Sales / Fullstack Dev",leads:48,status:"Active",avatar:"NJ",isCurrent:!0},{name:"Aman Sharma",role:"Outreach Specialist",leads:37,status:"Active",avatar:"AS",isCurrent:!1},{name:"Priya Verma",role:"Agency Manager",leads:15,status:"Active",avatar:"PV",isCurrent:!1}];return`
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Settings & Preferences</h1>
            <p>Configure pipeline stages, team members, outreach parameters and roles</p>
          </div>
          ${e?"":`
            <div style="background: #FFFBEB; border: 1px solid #FCD34D; border-radius: 8px; padding: 6px 12px; font-size: 12.5px; color: #92400E; display: flex; align-items: center; gap: 6px;">
              <span>👁️</span>
              <span><strong>Viewer Access:</strong> Configuration editing is restricted to Admin.</span>
            </div>
          `}
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
              ${t.map((i,o)=>`
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
            ${e?`
            <div style="display: flex; gap: 10px; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
              <input type="text" id="new-stage-input" class="input" placeholder="e.g. Contract In Review" style="flex: 1;" />
              <button class="btn btn-secondary" id="btn-add-stage">+ Add Stage</button>
            </div>
            `:`
            <div style="font-size: 13px; color: var(--text-muted); font-style: italic; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
              🔒 Modifying pipeline stages is restricted to Administrator.
            </div>
            `}
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
              ${e?`
                <button class="btn btn-primary btn-sm" id="btn-invite-member">+ Invite Member</button>
              `:`
                <span class="badge" style="background: #F1F5F9; color: #64748B;">View Only</span>
              `}
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
                ${n.map(i=>`
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
              ${e?`
                <button id="btn-reset-demo-data" class="btn btn-secondary btn-sm" style="color: var(--danger);">
                  Restore Factory Demo Data
                </button>
              `:`
                <span style="font-size: 13px; color: var(--text-muted); font-style: italic;">🔒 Data reset operations are restricted to Administrator.</span>
              `}
            </div>
          </div>
        `:""}
      </div>
    `},initListeners(){const e=document.getElementById("tab-sec-pipeline"),t=document.getElementById("tab-sec-team"),n=document.getElementById("tab-sec-general");if(e&&e.addEventListener("click",()=>{this.currentSection="pipeline",this.reRender()}),t&&t.addEventListener("click",()=>{this.currentSection="team",this.reRender()}),n&&n.addEventListener("click",()=>{this.currentSection="general",this.reRender()}),!h.isAdmin())return;const i=document.getElementById("btn-add-stage"),o=document.getElementById("new-stage-input");i&&o&&i.addEventListener("click",()=>{const r=o.value.trim();if(r){const l=d.get(d.KEYS.PIPELINE_STAGES,[]),c=r.toLowerCase().replace(/\s+/g,"_");l.push({id:c,name:r,color:"#6366F1"}),d.set(d.KEYS.PIPELINE_STAGES,l),p.show(`✓ Added stage "${r}"`),this.reRender(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}});const a=document.getElementById("btn-reset-demo-data");a&&a.addEventListener("click",()=>{localStorage.clear(),d.init(),p.show("Default data successfully restored!"),setTimeout(()=>window.location.reload(),500)});const s=document.getElementById("btn-invite-member");s&&s.addEventListener("click",()=>{p.show("Invitation link copied to clipboard!")})},reRender(){const e=document.getElementById("app");e&&window.location.hash.startsWith("#/settings")&&(e.querySelector(".page-container").outerHTML=this.render(),this.initListeners())}};class ce{constructor(){this.appEl=document.getElementById("app"),this.modalRoot=document.getElementById("modal-root"),this.currentRoute="/dashboard",this.routes={"/login":se,"/dashboard":K,"/pipeline":le,"/settings":de},this.init()}init(){d.init(),localStorage.getItem("techcrm_sidebar_collapsed")==="true"&&document.body.classList.add("sidebar-collapsed"),Promise.all([v.fetchFromMongoDB(),J.fetchFromMongoDB()]).then(()=>{this.renderCurrentView(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}),this.mountModals(),this.registerGlobalEvents(),window.addEventListener("hashchange",()=>this.handleRoute()),window.location.hash?this.handleRoute():window.location.hash="#/dashboard"}mountModals(){this.modalRoot&&(this.modalRoot.innerHTML=`
        ${B.render()}
        ${C.render()}
        ${T.render()}
        ${$.render()}
        ${D.render()}
      `,B.initGlobalListeners(),C.initListeners(),T.initListeners(),$.initListeners(),D.initListeners())}registerGlobalEvents(){window.addEventListener("techcrm:open-add-lead",()=>{if(!h.isAdmin()){p.show("Action restricted: Only administrators can create leads","warning");return}C.open()}),window.addEventListener("techcrm:open-schedule-followup",()=>{if(!h.isAdmin()){p.show("Action restricted: Only administrators can schedule tasks","warning");return}$.open()}),window.addEventListener("techcrm:confirm-delete",t=>{var n;if(!h.isAdmin()){p.show("Action restricted: Only administrators can delete records","warning");return}(n=t.detail)!=null&&n.leadId&&D.open(t.detail.leadId)}),window.addEventListener("techcrm:data-changed",()=>{this.renderCurrentView()})}getRoutePath(){const t=window.location.hash.slice(1);return t&&t.split("?")[0]||"/dashboard"}handleRoute(){const t=this.getRoutePath();if(t!=="/login"&&!h.isAuthenticated()){window.location.hash="#/login";return}if(t==="/login"&&h.isAuthenticated()){window.location.hash="#/dashboard";return}this.currentRoute=t,this.renderCurrentView()}renderCurrentView(){const t=this.routes[this.currentRoute]||K;if(this.currentRoute==="/login"){this.appEl.innerHTML=t.render(),t.initListeners();return}this.appEl.innerHTML=`
      <div class="app-shell">
        ${H.render(this.currentRoute)}
        <div class="main-wrapper">
          ${W.render()}
          <main id="main-content-area">
            ${t.render()}
          </main>
        </div>
        ${ae.render(this.currentRoute)}
      </div>
    `,W.initListeners(),H.initListeners(),t.initListeners&&t.initListeners()}}new ce;
