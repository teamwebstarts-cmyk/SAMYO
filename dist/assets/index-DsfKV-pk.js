(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const w={LEADS:"techcrm_leads",FOLLOWUPS:"techcrm_followups",ACTIVITIES:"techcrm_activities",COMPANIES:"techcrm_companies",NOTIFICATIONS:"techcrm_notifications",USER:"techcrm_user",PIPELINE_STAGES:"techcrm_pipeline_stages"},X=[{id:"new",name:"New Leads",color:"#64748B"},{id:"request_sent",name:"Request Sent",color:"#F59E0B"},{id:"connected",name:"Connected",color:"#6366F1"},{id:"followup_scheduled",name:"Follow-up Scheduled",color:"#0EA5E9"},{id:"qualified",name:"Qualified",color:"#8B5CF6"},{id:"proposal",name:"Proposal Sent",color:"#0284C7"},{id:"won",name:"Won",color:"#16A34A"}],d={init(){localStorage.getItem("techcrm_token")||(localStorage.removeItem(w.USER),localStorage.removeItem("techcrm_logged_in"));const e=this.get(w.LEADS);Array.isArray(e)&&e.length>0&&e[0].id==="lead-1"&&localStorage.removeItem(w.LEADS);const t=this.get(w.FOLLOWUPS);Array.isArray(t)&&t.length>0&&t[0].id==="f-1"&&localStorage.removeItem(w.FOLLOWUPS),localStorage.getItem(w.PIPELINE_STAGES)||localStorage.setItem(w.PIPELINE_STAGES,JSON.stringify(X))},clearUserData(){localStorage.removeItem(w.USER),localStorage.removeItem(w.LEADS),localStorage.removeItem(w.FOLLOWUPS),localStorage.removeItem(w.ACTIVITIES),localStorage.removeItem(w.NOTIFICATIONS),localStorage.removeItem("techcrm_token"),localStorage.removeItem("techcrm_logged_in")},get(e,t=null){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch(n){return console.error("Storage Read Error:",n),t}},set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Storage Write Error:",n)}},KEYS:w};d.init();const Z="https://samyo-crm-api.onrender.com/api",ee="http://localhost:5000/api",te=!!(typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."))),ne=()=>typeof window>"u"?ee:te?window.location.port==="3000"?"/api":`http://${window.location.hostname}:5000/api`:Z,I=ne();async function k(e){const t=await e.text();let n=null;if(t)try{n=JSON.parse(t)}catch{n=null}if(!e.ok){const o=n&&(n.message||n.error)||`HTTP ${e.status}: Server not reachable or endpoint not found`,a=new Error(o);throw a.status=e.status,a.data=n,a}return n}const v={baseUrl:I,async checkHealth(){try{return{ok:!0,data:await this.get("/health")}}catch(e){return{ok:!1,error:e.message}}},getHeaders(){const e={"Content-Type":"application/json"},t=localStorage.getItem("techcrm_token");return t&&(e.Authorization=`Bearer ${t}`),e},async get(e){try{const t=await fetch(`${I}${e}`,{method:"GET",headers:this.getHeaders()});return await k(t)}catch(t){throw console.warn(`ApiService.get(${e}) failed:`,t.message),t}},async post(e,t){try{const n=await fetch(`${I}${e}`,{method:"POST",headers:this.getHeaders(),body:JSON.stringify(t)});return await k(n)}catch(n){throw console.warn(`ApiService.post(${e}) failed:`,n.message),n}},async put(e,t){try{const n=await fetch(`${I}${e}`,{method:"PUT",headers:this.getHeaders(),body:JSON.stringify(t)});return await k(n)}catch(n){throw console.warn(`ApiService.put(${e}) failed:`,n.message),n}},async patch(e,t){try{const n=await fetch(`${I}${e}`,{method:"PATCH",headers:this.getHeaders(),body:JSON.stringify(t)});return await k(n)}catch(n){throw console.warn(`ApiService.patch(${e}) failed:`,n.message),n}},async delete(e){try{const t=await fetch(`${I}${e}`,{method:"DELETE",headers:this.getHeaders()});return await k(t)}catch(t){throw console.warn(`ApiService.delete(${e}) failed:`,t.message),t}}},y={getCurrentUser(){return d.get(d.KEYS.USER,null)},getToken(){return localStorage.getItem("techcrm_token")},isAdmin(){return!!this.getCurrentUser()},isSystemAdmin(){const e=this.getCurrentUser();return!!(e!=null&&e.isAdmin||(e==null?void 0:e.accessRole)==="admin")},isViewer(){return!1},getRoleBadgeText(){const e=this.getCurrentUser();return(e==null?void 0:e.role)||"Team Member"},isAuthenticated(){return!!this.getToken()},async validateSession(){if(!this.getToken())return this.clearSession(),null;try{const t=await v.get("/auth/me");return t&&t.user?(d.set(d.KEYS.USER,t.user),localStorage.setItem("techcrm_logged_in","true"),t.user):(this.clearSession(),null)}catch(t){return console.warn("Session validation failed:",t.message),this.clearSession(),null}},async login(e,t){const n=await v.post("/auth/login",{email:e,password:t});return n.token&&localStorage.setItem("techcrm_token",n.token),n.user&&d.set(d.KEYS.USER,n.user),localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:n.user}},async register(e,t,n,o){const a=await v.post("/auth/register",{name:e,email:t,password:n,role:o});return a.token&&localStorage.setItem("techcrm_token",a.token),a.user&&d.set(d.KEYS.USER,a.user),localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:a.user}},clearSession(){d.clearUserData()},logout(){this.clearSession(),window.location.hash="#/login",window.location.reload()}};let g=[],C=!1;const x={resetCache(){g=[],C=!1},async fetchFromMongoDB(){try{const e=await v.get("/leads");Array.isArray(e)&&(g=e.map(t=>({...t,id:t._id||t.id})),C=!0,d.set(d.KEYS.LEADS,g));try{const t=await v.get("/activities");Array.isArray(t)&&t.length>0&&d.set(d.KEYS.ACTIVITIES,t)}catch{}return g}catch(e){console.warn("Could not sync with MongoDB server, using cached data:",e.message)}return this.getAll()},async syncWithServer(){return this.fetchFromMongoDB()},getAll(){return g.length>0||C||(g=d.get(d.KEYS.LEADS,[]).map(t=>({...t,id:t._id||t.id}))),g},getById(e){return this.getAll().find(n=>n.id===e||n._id===e)||null},async create(e){var r;const n=(e.company&&typeof e.company=="string"?e.company.trim():"")||"Individual",o={name:e.name&&typeof e.name=="string"?e.name.trim():"Unnamed Lead",company:n,designation:e.designation&&typeof e.designation=="string"?e.designation.trim():"",linkedinUrl:e.linkedinUrl&&typeof e.linkedinUrl=="string"?e.linkedinUrl.trim():"",companyWebsite:e.companyWebsite&&typeof e.companyWebsite=="string"?e.companyWebsite.trim():"",industry:e.industry||"",location:e.location&&typeof e.location=="string"?e.location.trim():"",requirements:Array.isArray(e.requirements)?e.requirements:[],priority:e.priority||"medium",status:e.status||"new",potentialValue:Number(e.potentialValue)||0,notes:e.notes?[{text:e.notes,createdAt:new Date().toISOString(),author:((r=y.getCurrentUser())==null?void 0:r.name)||"Me"}]:[]};let a;try{a=await v.post("/leads",o)}catch(l){throw console.error("MongoDB cloud save failed:",l.message),new Error(`MongoDB save failed: ${l.message}`)}const i={...a,id:a._id||a.id};g.unshift(i),d.set(d.KEYS.LEADS,g);const s=i.company&&i.company!=="Individual"?` (${i.company})`:"";return this.recordGlobalActivity(`${i.name}${s} added as New Lead`,"new"),i},async update(e,t){let n;try{n=await v.put(`/leads/${e}`,t)}catch(a){console.warn("MongoDB update warning:",a.message)}const o=g.findIndex(a=>a.id===e||a._id===e);return o!==-1?(g[o]={...g[o],...n||t,id:(n==null?void 0:n._id)||(n==null?void 0:n.id)||e},d.set(d.KEYS.LEADS,g),g[o]):n||null},async updateStatus(e,t,n={}){const o=this.getById(e);if(!o)return null;const a=o.status;if(a===t)return o;const i={new:"New Leads",request_sent:"Request Sent",connected:"Connected",followup_scheduled:"Follow-up Scheduled",qualified:"Qualified",proposal:"Proposal",won:"Won",lost:"Lost"},s={id:"act-"+Date.now(),title:`Moved from ${i[a]||a} to ${i[t]||t}`,time:"Just now",date:new Date().toISOString()};o.status=t,o.activities=[s,...o.activities||[]],n.lostReason!==void 0&&(o.lostReason=n.lostReason),d.set(d.KEYS.LEADS,g),this.recordGlobalActivity(`${o.name} moved to ${i[t]||t}`,t);try{const r=await v.patch(`/leads/${e}/status`,{status:t,...n});if(r){const l=g.findIndex(c=>c.id===e||c._id===e);l!==-1&&(g[l]={...r,id:r._id||r.id},d.set(d.KEYS.LEADS,g))}}catch(r){console.warn("MongoDB status update warning:",r.message)}return o},async addNote(e,t){var a;const n=this.getById(e);if(!n||!t.trim())return null;const o=((a=y.getCurrentUser())==null?void 0:a.name)||"Me";try{const i=await v.post(`/leads/${e}/notes`,{text:t.trim(),author:o});if(i){const s=g.findIndex(r=>r.id===e||r._id===e);if(s!==-1)return g[s]={...i,id:i._id||i.id},d.set(d.KEYS.LEADS,g),g[s]}}catch(i){console.warn("MongoDB note save error:",i.message);const s={id:"note-"+Date.now(),text:t.trim(),createdAt:new Date().toISOString(),author:o};n.notes=[s,...n.notes||[]],d.set(d.KEYS.LEADS,g)}return n},addActivity(e,t){const n=this.getById(e);if(!n||!t.trim())return null;const o={id:"act-"+Date.now(),title:t.trim(),time:"Just now",date:new Date().toISOString()};return n.activities=[o,...n.activities||[]],d.set(d.KEYS.LEADS,g),n},async delete(e){try{await v.delete(`/leads/${e}`)}catch(t){console.warn("MongoDB delete warning:",t.message)}return g=g.filter(t=>t.id!==e&&t._id!==e),d.set(d.KEYS.LEADS,g),!0},recordGlobalActivity(e,t){v.post("/activities",{text:e,type:t,time:"Just now"}).catch(()=>{});const n=d.get(d.KEYS.ACTIVITIES,[]);n.unshift({id:"g-act-"+Date.now(),text:e,time:"Just now",type:t}),d.set(d.KEYS.ACTIVITIES,n.slice(0,20))},getStats(){const e=this.getAll(),t={new:0,request_sent:0,connected:0,qualified:0,proposal:0,won:0,lost:0};e.forEach(s=>{t[s.status]!==void 0&&t[s.status]++});const n=e.length,o=t.connected||0,a=t.proposal||0,i=t.won||0;return{totalLeads:n,connections:o,proposals:a,won:i,breakdown:{newLeads:t.new||0,requests:t.request_sent||0,connected:t.connected||0,qualified:t.qualified||0,proposal:t.proposal||0,won:t.won||0,lost:t.lost||0},actualCounts:t}}};let b=[],D=!1;const Q={resetCache(){b=[],D=!1},async fetchFromMongoDB(){try{const e=await v.get("/followups");if(Array.isArray(e))return b=e.map(t=>({...t,id:t._id||t.id})),D=!0,d.set(d.KEYS.FOLLOWUPS,b),b}catch(e){console.warn("Could not sync followups with MongoDB server, using cached:",e.message)}return this.getAll()},getAll(){return b.length>0||D||(b=d.get(d.KEYS.FOLLOWUPS,[]).map(t=>({...t,id:t._id||t.id}))),b},getByCategory(e="today"){const t=this.getAll();return e==="completed"?t.filter(n=>n.completed):t.filter(n=>!n.completed&&(e==="all"||n.category===e))},async create(e){const t={leadId:e.leadId||"",leadName:e.leadName&&typeof e.leadName=="string"?e.leadName.trim():"Lead",company:e.company&&typeof e.company=="string"?e.company.trim():"",task:e.task&&typeof e.task=="string"?e.task.trim():"",dueDate:e.dueDate||new Date().toISOString(),dueLabel:e.dueLabel||"Upcoming",category:e.category||"upcoming",priority:e.priority||"upcoming",linkedinUrl:e.linkedinUrl||"#"};let n;try{n=await v.post("/followups",t)}catch(a){console.warn("MongoDB followup create error, saving locally:",a.message),n={...t,id:"f-"+Date.now(),completed:!1}}const o={...n,id:n._id||n.id};return b.unshift(o),d.set(d.KEYS.FOLLOWUPS,b),o},async complete(e){const t=b.find(n=>n.id===e||n._id===e);t&&(t.completed=!0,d.set(d.KEYS.FOLLOWUPS,b));try{await v.patch(`/followups/${e}/complete`)}catch(n){console.warn("MongoDB followup complete error:",n.message)}return t},async snooze(e,t=1){const n=b.find(o=>o.id===e||o._id===e);n&&(n.category="upcoming",n.priority="upcoming",n.dueLabel=`Snoozed (${t}d)`,d.set(d.KEYS.FOLLOWUPS,b));try{await v.patch(`/followups/${e}/snooze`,{days:t})}catch(o){console.warn("MongoDB followup snooze error:",o.message)}return n},async delete(e){b=b.filter(t=>t.id!==e&&t._id!==e),d.set(d.KEYS.FOLLOWUPS,b);try{await v.delete(`/followups/${e}`)}catch(t){console.warn("MongoDB followup delete error:",t.message)}return!0}},K={render(){const e=d.get(d.KEYS.NOTIFICATIONS,[]);return`
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
    `},initListeners(){const e=document.getElementById("btn-mark-all-read");e&&e.addEventListener("click",()=>{const n=d.get(d.KEYS.NOTIFICATIONS,[]).map(i=>({...i,unread:!1}));d.set(d.KEYS.NOTIFICATIONS,n);const o=document.getElementById("notif-badge-count");o&&(o.style.display="none");const a=document.getElementById("notification-panel");a&&a.querySelectorAll(".notification-item").forEach(i=>i.classList.remove("unread"))})}},oe={dashboard:'<rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect>',leads:'<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>',settings:'<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>',search:'<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',plus:'<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>',close:'<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',trash:'<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',columns:'<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>',chevronDown:'<polyline points="6 9 12 15 18 9"></polyline>',chevronLeft:'<polyline points="15 18 9 12 15 6"></polyline>',chevronRight:'<polyline points="9 18 15 12 9 6"></polyline>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',check:'<polyline points="20 6 9 17 4 12"></polyline>',alertTriangle:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',alertCircle:'<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',info:'<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',crown:'<polygon points="2 4 5 20 19 20 22 4 15 12 12 5 9 12 2 4"></polygon>',flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-.84-.42-1.61-1.07-2.07C11.75 11.9 11 10.74 11 9.5c0-1.8 1.4-3.3 2-4.5 2 2.33 4 5.5 4 9 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.97 1.94-6.31 3.5-8.5.5 2 0 4.5 0 4.5s2 1.5 0 4z"></path>',globe:'<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',smartphone:'<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',cpu:'<rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>',palette:'<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.23-.13-.37 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"></path>',code:'<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',linkedin:'<path fill="#0A66C2" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>'};function p(e,{size:t=18,strokeWidth:n=2,className:o="",style:a="",color:i="currentColor"}={}){const s=oe[e];if(!s)return"";const r=e==="linkedin",l="none",c=r?"none":i,h=r?"0":n,u=a?` style="${a}"`:"",f=o?` class="${o}"`:"";return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="${l}" stroke="${c}" stroke-width="${h}" stroke-linecap="round" stroke-linejoin="round"${f}${u}>${s}</svg>`}const Y={render(){const e=y.getCurrentUser()||{name:"User",role:"Team Member",avatar:"U",email:""},n=d.get(d.KEYS.NOTIFICATIONS,[]).filter(o=>o.unread).length;return`
      <header class="top-header">
        <div class="header-left">
          <div class="header-brand-mobile">
            <span>🚀</span> TechCRM
          </div>
          <div class="search-input-wrapper" style="width: 100%;">
            ${p("search",{size:16})}
            <input type="text" id="global-search-input" class="input" placeholder="Search Lead Board..." />
          </div>
        </div>

        <div class="header-right">
          <!-- Role Pill -->
          <div class="user-role-pill" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 600; background: #EEF2FF; border: 1px solid #C7D2FE; color: #4338CA;" title="Account Role">
            ${p("user",{size:13,color:"#4338CA"})}
            <span>${e.role?e.role.split("/")[0].trim():"Team Member"}</span>
          </div>

          <!-- MongoDB Atlas Live Connection Status -->
          <div id="mongo-connection-badge" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 20px; font-size: 11.5px; font-weight: 600; color: #15803D; cursor: default;" title="Connected to MongoDB Atlas Database">
            <span id="mongo-status-dot" style="width: 7px; height: 7px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 6px #22C55E; display: inline-block;"></span>
            <span id="mongo-status-text">MongoDB Atlas</span>
          </div>

          <!-- Notification Bell -->
          <div style="position: relative;">
            <button id="notif-toggle-btn" class="header-icon-btn" title="Notifications" aria-label="Notifications">
              ${p("bell",{size:18})}
              ${n>0?`<span id="notif-badge-count" class="badge-count">${n}</span>`:""}
            </button>
            ${K.render()}
          </div>

          <!-- User Menu -->
          <div style="position: relative;">
            <button id="user-menu-btn" class="user-profile-btn" aria-haspopup="true">
              <div class="avatar">${e.avatar||(e.name?e.name.charAt(0).toUpperCase():"U")}</div>
              <div class="user-profile-info">
                <div class="user-profile-name">${e.name}</div>
                <div class="user-profile-role">${(e.role||"Team Member").split("/")[0].trim()}</div>
              </div>
              ${p("chevronDown",{size:14,style:"color: var(--text-secondary);"})}
            </button>

            <div id="user-dropdown-menu" class="dropdown-menu">
              <div style="padding: 8px 12px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 4px;">
                <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">${e.name}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${e.email||""}</div>
                <div style="margin-top: 4px; font-size: 11px; font-weight: 600; color: #4F46E5;">${e.role||"Team Member"}</div>
              </div>
              <a href="#/settings" class="dropdown-item">
                ${p("user",{size:15})}
                My Profile
              </a>
              <a href="#/settings" class="dropdown-item">
                ${p("settings",{size:15})}
                Preferences
              </a>
              <div class="dropdown-divider"></div>
              <button id="header-logout-btn" class="dropdown-item danger" style="width: 100%; background: none; border: none; font: inherit;">
                ${p("logout",{size:15})}
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>
    `},initListeners(){K.initListeners();const e=document.getElementById("notif-toggle-btn"),t=document.getElementById("notification-panel");e&&t&&e.addEventListener("click",r=>{r.stopPropagation(),t.classList.toggle("active");const l=document.getElementById("user-dropdown-menu");l&&l.classList.remove("active")});const n=document.getElementById("user-menu-btn"),o=document.getElementById("user-dropdown-menu");n&&o&&n.addEventListener("click",r=>{r.stopPropagation(),o.classList.toggle("active"),t&&t.classList.remove("active")}),document.addEventListener("click",()=>{t&&t.classList.remove("active"),o&&o.classList.remove("active")});const a=document.getElementById("header-logout-btn");a&&a.addEventListener("click",()=>{y.logout()});const i=async()=>{var u,f,L,E;const r=document.getElementById("mongo-connection-badge"),l=document.getElementById("mongo-status-dot"),c=document.getElementById("mongo-status-text");if(!r||!l||!c)return;const h=await v.checkHealth();h.ok&&((f=(u=h.data)==null?void 0:u.database)!=null&&f.includes("Connected"))?(r.style.background="#F0FDF4",r.style.borderColor="#BBF7D0",r.style.color="#15803D",l.style.background="#22C55E",l.style.boxShadow="0 0 6px #22C55E",c.textContent="MongoDB Atlas",r.title=`Connected to MongoDB Atlas Cloud Database (${((E=(L=h.data)==null?void 0:L.counts)==null?void 0:E.leads)??0} leads stored)`):(r.style.background="#FEF2F2",r.style.borderColor="#FECACA",r.style.color="#B91C1C",l.style.background="#EF4444",l.style.boxShadow="none",c.textContent="MongoDB Offline",r.title="Cannot reach MongoDB Atlas backend server")};i(),window.addEventListener("techcrm:data-changed",i);const s=document.getElementById("global-search-input");s&&s.addEventListener("keydown",r=>{r.key==="Enter"&&(encodeURIComponent(s.value.trim()),window.location.hash="#/pipeline")})}},V={render(e="/dashboard"){const t=x.getAll(),n=[{path:"/dashboard",label:"Dashboard",icon:p("dashboard",{size:18})},{path:"/pipeline",label:"Lead Board",badge:t.filter(o=>o.status!=="lost"&&o.status!=="won").length,icon:p("leads",{size:18})}];return`
      <aside class="sidebar">
                <div class="sidebar-header" style="display: flex; align-items: center; justify-content: space-between; position: relative;">
          <a href="#/dashboard" class="brand-logo">
            <div class="brand-icon">🚀</div>
            <span class="brand-text">TechCRM</span>
          </a>
          <button id="btn-toggle-sidebar" class="sidebar-toggle-btn" title="Toggle Sidebar">
            ${p("chevronLeft",{size:14})}
          </button>
        </div>


        <nav class="sidebar-nav">
          ${n.map(o=>`
            <a href="#${o.path}" class="nav-link ${e===o.path?"active":""}" title="${o.label}">
              ${o.icon}
              <span class="nav-link-text">${o.label}</span>
              ${o.badge!==void 0&&o.badge>0?`<span class="nav-link-badge">${o.badge}</span>`:""}
            </a>
          `).join("")}

          <div class="sidebar-divider"></div>

          <a href="#/settings" class="nav-link ${e==="/settings"?"active":""}" title="Settings">
            ${p("settings",{size:18})}
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
    `},initListeners(){const e=document.getElementById("btn-toggle-sidebar");e&&e.addEventListener("click",()=>{document.body.classList.toggle("sidebar-collapsed");const t=document.body.classList.contains("sidebar-collapsed");localStorage.setItem("techcrm_sidebar_collapsed",t?"true":"false")})}},ie={render(e="/dashboard"){return`
      <nav class="mobile-bottom-nav">
        ${[{path:"/dashboard",label:"Dashboard",icon:p("dashboard",{size:20})},{path:"/pipeline",label:"Lead Board",icon:p("leads",{size:20})}].map(n=>`
          <a href="#${n.path}" class="mobile-nav-item ${e===n.path?"active":""}">
            ${n.icon}
            <span>${n.label}</span>
          </a>
        `).join("")}
      </nav>
    `}},m={show(e,t="success",n=3e3){const o=document.getElementById("toast-container");if(!o)return;const a=document.createElement("div");a.className=`toast toast-${t}`;let i="";t==="success"?i=p("check",{size:18,strokeWidth:2.5}):t==="warning"?i=p("alertTriangle",{size:18,strokeWidth:2.5}):t==="danger"?i=p("alertCircle",{size:18,strokeWidth:2.5}):i=p("info",{size:18,strokeWidth:2.5}),a.innerHTML=`
      ${i}
      <span>${e}</span>
    `,o.appendChild(a),setTimeout(()=>{a.style.opacity="0",a.style.transform="translateY(10px)",setTimeout(()=>a.remove(),200)},n)}},F={currentLeadId:null,render(){return`
      <div id="drawer-backdrop" class="drawer-backdrop"></div>
      <aside id="lead-drawer" class="drawer" aria-label="Lead Details">
        <div class="drawer-header">
          <span class="drawer-title">Lead Details</span>
          <button id="drawer-close-btn" class="btn btn-ghost btn-icon" aria-label="Close drawer">
            ${p("close",{size:20})}
          </button>
        </div>

        <div id="drawer-content" class="drawer-body">
          <!-- Populated dynamically via open(leadId) -->
        </div>
      </aside>
    `},open(e){const t=x.getById(e);if(!t)return;const n=y.isAdmin();this.currentLeadId=e;const o=document.getElementById("lead-drawer"),a=document.getElementById("drawer-backdrop"),i=document.getElementById("drawer-content");if(!o||!a||!i)return;const s=(t.name||"L").split(" ").filter(Boolean).map(l=>l[0]).join("").substring(0,2).toUpperCase()||"L",r=Array.isArray(t.requirements)?t.requirements:[];i.innerHTML=`
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
          ${p("linkedin",{size:16})}
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
            <option value="followup_scheduled" ${t.status==="followup_scheduled"?"selected":""}>Follow-up Scheduled</option>
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
          ${p("trash",{size:14})}
          Delete Lead
        </button>
        <button id="btn-drawer-schedule-followup" class="btn btn-secondary btn-sm">Schedule Follow-up</button>
        `:`
        <span style="font-size: 12px; color: var(--text-muted); font-style: italic;">Viewing as Guest/Viewer</span>
        `}
      </div>
    `,a.classList.add("active"),o.classList.add("active"),document.body.style.overflow="hidden",this.bindDrawerActions(e)},close(){const e=document.getElementById("lead-drawer"),t=document.getElementById("drawer-backdrop");e&&e.classList.remove("active"),t&&t.classList.remove("active"),document.body.style.overflow="",this.currentLeadId=null},bindDrawerActions(e){const t=document.getElementById("drawer-status-select");t&&t.addEventListener("change",async u=>{const f=u.target.value;await x.updateStatus(e,f),m.show(`✓ Status updated to ${f.replace("_"," ")} in MongoDB`),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e)});const n=document.getElementById("btn-add-activity-trigger"),o=document.getElementById("add-activity-box"),a=document.getElementById("btn-cancel-activity"),i=document.getElementById("btn-save-activity"),s=document.getElementById("custom-activity-input");n&&o&&n.addEventListener("click",()=>{o.style.display="block",s.focus()}),a&&o&&a.addEventListener("click",()=>{o.style.display="none",s.value=""}),i&&s&&i.addEventListener("click",async()=>{const u=s.value.trim();u&&(await x.addActivity(e,u),m.show("Activity logged successfully"),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e))});const r=document.getElementById("btn-drawer-add-note"),l=document.getElementById("drawer-new-note");r&&l&&r.addEventListener("click",async()=>{const u=l.value.trim();if(u){r.disabled=!0;try{await x.addNote(e,u),m.show("✓ Note saved to MongoDB"),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e)}finally{r.disabled=!1}}});const c=document.getElementById("btn-drawer-schedule-followup");c&&c.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-schedule-followup"))});const h=document.getElementById("btn-drawer-delete-lead");h&&h.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:confirm-delete",{detail:{leadId:e}}))})},initGlobalListeners(){const e=document.getElementById("drawer-backdrop"),t=document.getElementById("drawer-close-btn");e&&e.addEventListener("click",()=>this.close()),t&&t.addEventListener("click",()=>this.close()),document.addEventListener("keydown",n=>{n.key==="Escape"&&this.currentLeadId&&this.close()})}},z={render(){return`
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
              ${p("close",{size:20})}
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
    `},open(){const e=document.getElementById("add-lead-modal");if(e){e.style.display="flex",document.body.style.overflow="hidden";const t=document.getElementById("lead-name");t&&t.focus()}},close(){const e=document.getElementById("add-lead-modal");if(e){e.style.display="none",document.body.style.overflow="";const t=document.getElementById("add-lead-form");t&&t.reset();const n=document.getElementById("requirement-tag-selector");n&&n.querySelectorAll(".tag-option").forEach(a=>a.classList.remove("selected"));const o=document.getElementById("priority-selector");if(o){o.querySelectorAll(".radio-pill").forEach(i=>i.classList.remove("selected"));const a=o.querySelector('.radio-pill[data-value="medium"]');a&&a.classList.add("selected")}}},initListeners(){const e=document.getElementById("add-lead-modal");if(!e)return;e.querySelectorAll(".modal-close-btn").forEach(a=>{a.addEventListener("click",()=>this.close())}),e.addEventListener("click",a=>{a.target===e&&this.close()});const t=document.getElementById("requirement-tag-selector");t&&t.addEventListener("click",a=>{const i=a.target.closest(".tag-option");i&&i.classList.toggle("selected")});const n=document.getElementById("priority-selector");n&&n.addEventListener("click",a=>{const i=a.target.closest(".radio-pill");i&&(n.querySelectorAll(".radio-pill").forEach(s=>s.classList.remove("selected")),i.classList.add("selected"))});const o=document.getElementById("add-lead-form");o&&o.addEventListener("submit",async a=>{var R,q,O,N,U,_,W,j,H;if(a.preventDefault(),!y.isAuthenticated()){m.show("Please log in to create leads","warning"),this.close(),window.location.hash="#/login";return}const i=document.getElementById("lead-name"),s=i?i.value.trim():"";if(!s){m.show("Please enter the lead full name","error");return}const r=o.querySelector('button[type="submit"]');r&&(r.disabled=!0,r.textContent="Saving to MongoDB...");const l=((R=document.getElementById("lead-designation"))==null?void 0:R.value.trim())||"";let c=((q=document.getElementById("lead-linkedin"))==null?void 0:q.value.trim())||"";c&&!/^https?:\/\//i.test(c)&&(c="https://"+c);const h=((O=document.getElementById("lead-company"))==null?void 0:O.value.trim())||"";let u=((N=document.getElementById("lead-website"))==null?void 0:N.value.trim())||"";u&&!/^https?:\/\//i.test(u)&&(u="https://"+u);const f=((U=document.getElementById("lead-industry"))==null?void 0:U.value)||"",L=((_=document.getElementById("lead-location"))==null?void 0:_.value.trim())||"",E=(W=document.getElementById("lead-value"))==null?void 0:W.value,S=((j=document.getElementById("lead-notes"))==null?void 0:j.value.trim())||"",$=t?Array.from(t.querySelectorAll(".tag-option.selected")).map(A=>A.getAttribute("data-value")):[],B=((H=n==null?void 0:n.querySelector(".radio-pill.selected"))==null?void 0:H.getAttribute("data-value"))||"medium";try{const A=await x.create({name:s,designation:l,linkedinUrl:c,company:h,companyWebsite:u,industry:f,location:L,requirements:$,priority:B,potentialValue:E?Number(E):0,notes:S});this.close(),o.reset(),m.show(`✓ Lead "${A.name}" saved to MongoDB & Pipeline!`),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}catch(A){m.show(`Failed to save lead: ${A.message}`,"error")}finally{r&&(r.disabled=!1,r.textContent="Save Lead to Pipeline")}})}},P={currentLeadId:null,render(){return`
      <div id="lost-reason-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title" style="color: var(--danger);">Mark Lead as Lost</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-lost-modal">
              ${p("close",{size:20})}
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
    `},open(e){this.currentLeadId=e;const t=document.getElementById("lost-reason-modal");t&&(t.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("lost-reason-modal");e&&(e.style.display="none",document.body.style.overflow="",this.currentLeadId=null)},initListeners(){const e=document.getElementById("lost-reason-modal"),t=document.getElementById("btn-close-lost-modal"),n=document.getElementById("btn-cancel-lost-modal"),o=document.getElementById("lost-reason-form"),a=document.getElementById("other-reason-group");t&&t.addEventListener("click",()=>this.close()),n&&n.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",i=>{i.target===e&&this.close()}),o&&(o.addEventListener("change",i=>{i.target.name==="lost-reason"&&a&&(a.style.display=i.target.value==="Other"?"block":"none")}),o.addEventListener("submit",async i=>{var l;if(i.preventDefault(),!y.isAuthenticated()){m.show("Please log in to update lead status","warning"),this.close();return}if(!this.currentLeadId)return;const s=o.querySelector('input[name="lost-reason"]:checked');let r=s?s.value:"No response";if(r==="Other"){const c=(l=document.getElementById("custom-lost-reason"))==null?void 0:l.value.trim();c&&(r=c)}await x.updateStatus(this.currentLeadId,"lost",{lostReason:r}),m.show(`✓ Lead marked as Lost (${r}) in MongoDB`,"warning"),this.close(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}))}},T={render(){const e=x.getAll();return`
      <div id="schedule-followup-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title">Schedule Follow-up</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-schedule-modal">
              ${p("close",{size:20})}
            </button>
          </div>

          <form id="schedule-followup-form" class="modal-body">
            <div class="form-group">
              <label class="form-label" for="followup-lead">Select Lead <span class="required">*</span></label>
              <select id="followup-lead" class="select" required>
                ${e.map(t=>`<option value="${t.id}" data-name="${t.name}" data-company="${t.company||""}" data-linkedin="${t.linkedinUrl||""}">${t.name}${t.company?` (${t.company})`:""}</option>`).join("")}
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
    `},open(){const e=document.getElementById("schedule-followup-modal");e&&(e.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("schedule-followup-modal");if(e){e.style.display="none",document.body.style.overflow="";const t=document.getElementById("schedule-followup-form");t&&t.reset()}},initListeners(){const e=document.getElementById("schedule-followup-modal"),t=document.getElementById("btn-close-schedule-modal"),n=document.getElementById("btn-cancel-schedule-modal"),o=document.getElementById("schedule-followup-form");t&&t.addEventListener("click",()=>this.close()),n&&n.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",a=>{a.target===e&&this.close()}),o&&o.addEventListener("submit",async a=>{var E,S,$;if(a.preventDefault(),!y.isAuthenticated()){m.show("Please log in to schedule tasks","warning"),this.close();return}const i=document.getElementById("followup-lead"),s=i==null?void 0:i.options[i.selectedIndex],r=(i==null?void 0:i.value)||"",l=s?s.getAttribute("data-name"):"Lead",c=s?s.getAttribute("data-company"):"",h=s?s.getAttribute("data-linkedin"):"",u=((E=document.getElementById("followup-task"))==null?void 0:E.value)||"",f=((S=document.getElementById("followup-category"))==null?void 0:S.value)||"upcoming",L=(($=document.getElementById("followup-priority"))==null?void 0:$.value)||"upcoming";try{await Q.create({leadId:r,leadName:l,company:c,task:u,category:f,priority:L,dueLabel:f==="today"?"Today, 4:00 PM":"Next Week",linkedinUrl:h}),m.show("✓ Follow-up saved to MongoDB & scheduled!"),this.close(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}catch(B){m.show(`Failed to save follow-up: ${B.message}`,"error")}})}},M={currentLeadId:null,render(){return`
      <div id="delete-confirm-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title" style="color: var(--danger);">Delete Lead?</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-delete-modal">
              ${p("close",{size:20})}
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
    `},open(e){const t=x.getById(e);if(!t)return;this.currentLeadId=e;const n=document.getElementById("delete-confirm-modal"),o=document.getElementById("delete-modal-msg");n&&o&&(o.innerHTML=`This will permanently remove <strong>${t.name}</strong> ${t.company?`(${t.company}) `:""}and their activity history.`,n.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("delete-confirm-modal");e&&(e.style.display="none",document.body.style.overflow="",this.currentLeadId=null)},initListeners(){const e=document.getElementById("delete-confirm-modal"),t=document.getElementById("btn-close-delete-modal"),n=document.getElementById("btn-cancel-delete"),o=document.getElementById("btn-confirm-delete");t&&t.addEventListener("click",()=>this.close()),n&&n.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",a=>{a.target===e&&this.close()}),o&&o.addEventListener("click",async()=>{if(!y.isAuthenticated()){m.show("Please log in to manage leads","warning"),this.close();return}if(this.currentLeadId){const a=x.getById(this.currentLeadId),i=a?a.name:"Lead";o.disabled=!0;try{await x.delete(this.currentLeadId),F.close(),this.close(),m.show(`✓ Lead "${i}" deleted from MongoDB`,"danger"),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}finally{o.disabled=!1}}})}},ae={activeTab:"signin",render(){return`
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

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 11px; font-size: 14px; font-weight: 600; justify-content: center; border-radius: 8px; margin-top: 10px;">
                Sign In to TechCRM
              </button>
            </form>
          </div>

          <!-- SIGN UP FORM -->
          <div id="signup-container" style="display: ${this.activeTab==="signup"?"block":"none"};">
            <div style="margin-bottom: 18px;">
              <h2 style="font-size: 16px; font-weight: 600; color: var(--text-main);">Create New Account</h2>
              <p style="font-size: 13px; color: var(--text-secondary);">Join the team to manage your outreach pipeline</p>
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
                <label class="form-label" for="signup-role">Role / Title <span class="optional">(Optional)</span></label>
                <input type="text" id="signup-role" class="input" placeholder="e.g. Outreach Specialist / Web Developer" />
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 11px; font-size: 14px; font-weight: 600; justify-content: center; border-radius: 8px; margin-top: 10px;">
                Create Account & Enter CRM
              </button>
            </form>
          </div>

        </div>
      </div>
    `},switchTab(e){this.activeTab=e;const t=document.getElementById("signin-container"),n=document.getElementById("signup-container"),o=document.getElementById("tab-btn-signin"),a=document.getElementById("tab-btn-signup");e==="signin"?(t&&(t.style.display="block"),n&&(n.style.display="none"),o&&(o.style.background="#FFFFFF",o.style.color="var(--primary)",o.style.boxShadow="0 2px 4px rgba(0,0,0,0.06)"),a&&(a.style.background="transparent",a.style.color="var(--text-secondary)",a.style.boxShadow="none")):(t&&(t.style.display="none"),n&&(n.style.display="block"),a&&(a.style.background="#FFFFFF",a.style.color="var(--primary)",a.style.boxShadow="0 2px 4px rgba(0,0,0,0.06)"),o&&(o.style.background="transparent",o.style.color="var(--text-secondary)",o.style.boxShadow="none"))},initListeners(){const e=document.getElementById("tab-btn-signin"),t=document.getElementById("tab-btn-signup");e&&e.addEventListener("click",()=>this.switchTab("signin")),t&&t.addEventListener("click",()=>this.switchTab("signup")),document.querySelectorAll(".btn-toggle-pwd").forEach(a=>{a.addEventListener("click",()=>{const i=a.getAttribute("data-target"),s=document.getElementById(i);if(s){const r=s.getAttribute("type")==="password";s.setAttribute("type",r?"text":"password")}})});const n=document.getElementById("signin-form");n&&n.addEventListener("submit",async a=>{var l,c,h;a.preventDefault();const i=(l=document.getElementById("signin-email"))==null?void 0:l.value.trim(),s=(c=document.getElementById("signin-password"))==null?void 0:c.value,r=n.querySelector('button[type="submit"]');if(!i||!s){m.show("Please enter your email and password","error");return}r&&(r.disabled=!0,r.textContent="Signing in...");try{const u=await y.login(i,s);m.show(`Welcome back, ${((h=u.user)==null?void 0:h.name)||"User"}!`),window.location.hash="#/dashboard",window.location.reload()}catch(u){m.show(u.message||"Login failed","error")}finally{r&&(r.disabled=!1,r.textContent="Sign In to TechCRM")}});const o=document.getElementById("signup-form");o&&o.addEventListener("submit",async a=>{var h,u,f,L,E;a.preventDefault();const i=(h=document.getElementById("signup-name"))==null?void 0:h.value.trim(),s=(u=document.getElementById("signup-email"))==null?void 0:u.value.trim(),r=(f=document.getElementById("signup-password"))==null?void 0:f.value,l=((L=document.getElementById("signup-role"))==null?void 0:L.value.trim())||"Team Member",c=o.querySelector('button[type="submit"]');if(!i||!s||!r){m.show("Name, email and password are required","error");return}if(r.length<6){m.show("Password must be at least 6 characters long","error");return}c&&(c.disabled=!0,c.textContent="Creating account...");try{const S=await y.register(i,s,r,l);m.show(`Account created! Welcome, ${(E=S.user)==null?void 0:E.name}!`),window.location.hash="#/dashboard",window.location.reload()}catch(S){m.show(S.message||"Registration failed","error")}finally{c&&(c.disabled=!1,c.textContent="Create Account & Enter CRM")}})}},G={render(){const e=x.getStats(),t=d.get(d.KEYS.ACTIVITIES,[]),n=y.getCurrentUser();return y.isAdmin(),`
      <div class="page-container">
        <!-- Top Banner / Greeting -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Good morning, ${n!=null&&n.name?n.name.split(" ")[0]:"User"} 👋</h1>
            <p>Here's your LinkedIn outreach progress and team performance overview.</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn btn-secondary" onclick="window.location.hash='#/pipeline'">
              View Lead Board →
            </button>

            <button class="btn btn-primary" id="btn-dash-add-lead">
              ${p("plus",{size:16})}
              Add Lead
            </button>
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
    `},initListeners(){const e=document.getElementById("btn-dash-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))})}},se={getTechIcon(e){switch(e.toLowerCase()){case"website":return p("globe",{size:12});case"mobile app":case"mobile":return p("smartphone",{size:12});case"ai/ml":case"ai":return p("cpu",{size:12});case"ui/ux":return p("palette",{size:12});case"software":return p("code",{size:12});default:return p("zap",{size:12})}},formatTimeAgo(e){if(!e)return"Recent";const t=new Date(e),o=new Date-t,a=Math.floor(o/(1e3*60*60*24)),i=Math.floor(o/(1e3*60*60));return a>0?`${a}d ago`:i>0?`${i}h ago`:"Today"},render(e){const t=(e.name||"L").split(" ").filter(Boolean).map(i=>i[0]).join("").substring(0,2).toUpperCase()||"L",n=Array.isArray(e.requirements)?e.requirements:[],o=this.formatTimeAgo(e.addedDate);y.isAdmin();let a="";return e.priority==="high"?a=`<span class="badge badge-priority-high" style="display: inline-flex; align-items: center; gap: 4px;">${p("flame",{size:12,color:"#DC2626"})} High</span>`:e.priority==="medium"?a='<span class="badge badge-priority-medium">Medium</span>':a='<span class="badge badge-priority-low">Low</span>',`
      <div class="lead-card" draggable="true" data-id="${e.id}" data-status="${e.status}">
        <div class="lead-card-header">
          <div class="lead-card-avatar">${t}</div>
          <div class="lead-card-name" title="${e.name}">${e.name}</div>
        </div>

        <div class="lead-card-company" title="${e.company||"Direct Outreach"}">${e.company||"—"}</div>
        <div class="lead-card-designation" title="${e.designation||"Prospect"}">${e.designation||"Prospect"}</div>

        <div class="lead-card-tags">
          ${n.slice(0,2).map(i=>`
            <span class="tag-chip">
              <span>${this.getTechIcon(i)}</span>
              <span>${i}</span>
            </span>
          `).join("")}
          ${a}
        </div>

        <div class="lead-card-footer">
          <span>${o}</span>
          ${e.potentialValue?`<span style="font-weight: 600; color: #4F46E5;">₹${(e.potentialValue/1e3).toFixed(0)}k</span>`:""}
        </div>
      </div>
    `}},J={render(e,t=[]){const n=t.filter(o=>o.status===e.id);return`
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
          `:n.map(o=>se.render(o)).join("")}
        </div>
      </div>
    `}},re={currentSearch:"",currentPriority:"all",currentRequirement:"all",currentDateRange:"all",draggedLeadId:null,getStages(){return d.get(d.KEYS.PIPELINE_STAGES,[{id:"new",name:"New Leads",visible:!0},{id:"request_sent",name:"Request Sent",visible:!0},{id:"connected",name:"Connected",visible:!0},{id:"followup_scheduled",name:"Follow-up Scheduled",visible:!0},{id:"qualified",name:"Qualified",visible:!0},{id:"proposal",name:"Proposal",visible:!0},{id:"won",name:"Won",visible:!0}])},matchesDateRange(e){if(this.currentDateRange==="all")return!0;const t=e.addedDate||e.createdAt;if(!t)return!1;const n=new Date(t).getTime(),a=(Date.now()-n)/(1e3*60*60*24);return this.currentDateRange==="7days"?a<=7:this.currentDateRange==="30days"?a<=30:this.currentDateRange==="1year"?a<=365:!0},render(){const e=x.getAll(),t=this.getStages();y.isAdmin();const n=t.filter(s=>s.visible!==!1);let o=e.filter(s=>{const r=this.currentSearch.toLowerCase(),l=!r||s.name&&s.name.toLowerCase().includes(r)||s.company&&s.company.toLowerCase().includes(r),c=this.currentPriority==="all"||s.priority===this.currentPriority,h=this.currentRequirement==="all"||Array.isArray(s.requirements)&&s.requirements.some(f=>f.toLowerCase().includes(this.currentRequirement.toLowerCase())),u=this.matchesDateRange(s);return l&&c&&h&&u});const a=e.filter(s=>s.status==="lost").length,i=e.filter(s=>s.status==="won").length;return`
      <div class="page-container">
        <!-- Page Header & Actions -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Lead Board</h1>
            <p>Discovery → Connection → Conversation → Proposal → Won</p>
          </div>

          <div style="display: flex; gap: 10px; align-items: center;">
              <!-- Customize Columns Dropdown -->
              <div style="position: relative;">
                <button class="btn btn-secondary" id="btn-toggle-column-menu" style="display: inline-flex; align-items: center; gap: 6px; font-size: 13px;">
                  ${p("columns",{size:15})}
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
                ${p("plus",{size:16})}
                Add Lead
              </button>
          </div>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: var(--space-20); flex-wrap: wrap;">
          <div style="display: flex; gap: 12px; align-items: center; flex: 1; min-width: 280px; max-width: 450px;">
            <div class="search-input-wrapper" style="width: 100%;">
              ${p("search",{size:15})}
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
            ${n.length===0?`
              <div style="padding: 40px; text-align: center; color: var(--text-muted); width: 100%;">
                No columns selected. Click <strong>Columns ▾</strong> above to show columns.
              </div>
            `:n.map(s=>J.render(s,o)).join("")}
          </div>
        </div>

        <!-- Won & Lost Drop Zones Bar -->
        <div class="won-lost-drop-bar">
          <div class="outcome-drop-zone won" data-stage="won" title="Drop here to mark as Won">
            <span style="font-size: 18px;">🏆</span>
            <span>WON STAGE (${i} Deals)</span>
          </div>
          <div class="outcome-drop-zone lost" data-stage="lost" title="Drop here to record Lost reason">
            <span style="font-size: 18px;">🔴</span>
            <span>LOST STAGE (${a} Leads) — Drop to record reason</span>
          </div>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("btn-pipeline-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))});const t=document.getElementById("pipeline-search");t&&t.addEventListener("input",s=>{this.currentSearch=s.target.value.toLowerCase().trim(),this.refreshBoard()});const n=document.getElementById("pipeline-filter-priority");n&&n.addEventListener("change",s=>{this.currentPriority=s.target.value,this.refreshBoard()});const o=document.getElementById("pipeline-filter-tech");o&&o.addEventListener("change",s=>{this.currentRequirement=s.target.value,this.refreshBoard()});const a=document.getElementById("pipeline-filter-date");a&&a.addEventListener("change",s=>{this.currentDateRange=s.target.value,this.refreshBoard()});const i=document.getElementById("btn-reset-filters");i&&i.addEventListener("click",()=>{this.currentSearch="",this.currentPriority="all",this.currentRequirement="all",this.currentDateRange="all";const s=document.getElementById("pipeline-search");s&&(s.value="");const r=document.getElementById("pipeline-filter-priority");r&&(r.value="all");const l=document.getElementById("pipeline-filter-tech");l&&(l.value="all");const c=document.getElementById("pipeline-filter-date");c&&(c.value="all"),this.refreshBoard()}),this.initColumnCustomizer(),this.bindKanbanInteractions()},initColumnCustomizer(){const e=document.getElementById("btn-toggle-column-menu"),t=document.getElementById("column-customize-dropdown"),n=document.getElementById("btn-submit-new-column"),o=document.getElementById("input-new-column-name");if(!e||!t)return;e.addEventListener("click",i=>{i.stopPropagation();const s=t.style.display==="none"||!t.style.display;t.style.display=s?"block":"none",s&&this.renderColumnCheckboxes()}),document.addEventListener("click",i=>{!t.contains(i.target)&&i.target!==e&&(t.style.display="none")}),this.renderColumnCheckboxes();const a=()=>{const i=o.value.trim();if(!i)return;const r={id:"stage_"+Date.now(),name:i,visible:!0},l=this.getStages();l.push(r),d.set(d.KEYS.PIPELINE_STAGES,l),o.value="",this.renderColumnCheckboxes(),this.refreshBoard(),m.show(`✓ Added column "${i}"`)};n&&n.addEventListener("click",a),o&&o.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),a())})},renderColumnCheckboxes(){const e=document.getElementById("column-checkboxes-container");if(!e)return;const t=this.getStages(),n=["new","request_sent","connected","followup_scheduled","qualified","proposal","won"];e.innerHTML=t.map((i,s)=>{const r=n.includes(i.id);return`
        <div class="col-drag-item" draggable="true" data-index="${s}" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; border-radius: 6px; font-size: 13px; background: #F8FAFC; border: 1px solid var(--border-subtle); cursor: grab; user-select: none; transition: background 0.15s ease;">
          <div style="display: flex; align-items: center; gap: 8px; flex: 1; overflow: hidden;">
            <!-- Drag & Drop Handle Icon -->
            <span title="Drag to reorder" style="color: var(--text-muted); font-size: 14px; cursor: grab; padding: 0 2px;">⠿</span>
            
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; flex: 1; margin: 0; overflow: hidden;">
              <input type="checkbox" class="column-visibility-toggle" data-stage-id="${i.id}" ${i.visible!==!1?"checked":""} style="cursor: pointer;" />
              <span style="color: var(--text-main); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${i.name}
              </span>
            </label>
          </div>

          <div style="display: flex; align-items: center; gap: 4px; flex-shrink: 0;">
            <!-- Move Up / Down Buttons (Alternative to Drag) -->
            <button class="btn-move-col-up" data-index="${s}" title="Move up" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--text-secondary);" ${s===0?'disabled style="opacity:0.3; cursor:not-allowed; width: 22px; height: 22px;"':""}>↑</button>
            <button class="btn-move-col-down" data-index="${s}" title="Move down" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--text-secondary);" ${s===t.length-1?'disabled style="opacity:0.3; cursor:not-allowed; width: 22px; height: 22px;"':""}>↓</button>
            
            <!-- Delete Button: SIRF custom added columns ke liye dikhega, default columns ke liye nahi -->
            ${r?"":`
              <button class="btn-delete-column" data-stage-id="${i.id}" title="Delete column" style="background: #FEE2E2; border: 1px solid #FECACA; border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; color: #DC2626; cursor: pointer; font-size: 12px; font-weight: bold;">✕</button>
            `}
          </div>
        </div>
      `}).join("");let o=null;const a=e.querySelectorAll(".col-drag-item");a.forEach(i=>{i.addEventListener("dragstart",s=>{o=parseInt(i.getAttribute("data-index"),10),s.dataTransfer.effectAllowed="move",i.style.opacity="0.4"}),i.addEventListener("dragend",()=>{i.style.opacity="1",a.forEach(s=>{s.style.borderTop="1px solid var(--border-subtle)",s.style.background="#F8FAFC"})}),i.addEventListener("dragover",s=>{s.preventDefault(),s.dataTransfer.dropEffect="move",i.style.background="#EEF2FF"}),i.addEventListener("dragleave",()=>{i.style.background="#F8FAFC"}),i.addEventListener("drop",s=>{s.preventDefault(),i.style.background="#F8FAFC";const r=parseInt(i.getAttribute("data-index"),10);if(o!==null&&o!==r){const l=this.getStages(),[c]=l.splice(o,1);l.splice(r,0,c),d.set(d.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard(),m.show(`✓ Column moved to position ${r+1}`)}})}),e.querySelectorAll(".column-visibility-toggle").forEach(i=>{i.addEventListener("change",s=>{const r=i.getAttribute("data-stage-id"),l=this.getStages(),c=l.find(h=>h.id===r);c&&(c.visible=s.target.checked,d.set(d.KEYS.PIPELINE_STAGES,l),this.refreshBoard())})}),e.querySelectorAll(".btn-move-col-up").forEach(i=>{i.addEventListener("click",s=>{s.stopPropagation();const r=parseInt(i.getAttribute("data-index"),10),l=this.getStages();if(r>0){const c=l[r];l[r]=l[r-1],l[r-1]=c,d.set(d.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard()}})}),e.querySelectorAll(".btn-move-col-down").forEach(i=>{i.addEventListener("click",s=>{s.stopPropagation();const r=parseInt(i.getAttribute("data-index"),10),l=this.getStages();if(r<l.length-1){const c=l[r];l[r]=l[r+1],l[r+1]=c,d.set(d.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard()}})}),e.querySelectorAll(".btn-delete-column").forEach(i=>{i.addEventListener("click",s=>{var h;s.stopPropagation();const r=i.getAttribute("data-stage-id");let l=this.getStages();if(n.includes(r)){m.show("Default columns cannot be deleted","warning");return}const c=((h=l.find(u=>u.id===r))==null?void 0:h.name)||"Column";l=l.filter(u=>u.id!==r),d.set(d.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard(),m.show(`✓ "${c}" removed`)})})},bindKanbanInteractions(){const e=document.getElementById("app");if(!e)return;y.isAdmin(),e.querySelectorAll(".lead-card").forEach(n=>{n.addEventListener("click",()=>{if(n.classList.contains("is-dragging"))return;const o=n.getAttribute("data-id");o&&F.open(o)}),n.addEventListener("dragstart",o=>{this.draggedLeadId=n.getAttribute("data-id"),n.classList.add("is-dragging"),o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",this.draggedLeadId)}),n.addEventListener("dragend",()=>{n.classList.remove("is-dragging"),this.draggedLeadId=null,document.querySelectorAll(".drag-over").forEach(o=>o.classList.remove("drag-over"))})}),e.querySelectorAll(".kanban-column, .outcome-drop-zone").forEach(n=>{n.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="move",n.classList.add("drag-over")}),n.addEventListener("dragleave",o=>{n.contains(o.relatedTarget)||n.classList.remove("drag-over")}),n.addEventListener("drop",o=>{o.preventDefault(),n.classList.remove("drag-over");const a=o.dataTransfer.getData("text/plain")||this.draggedLeadId,i=n.getAttribute("data-stage");a&&i&&this.handleLeadDrop(a,i)})})},async handleLeadDrop(e,t){const n=x.getById(e);if(!(!n||n.status===t))if(t==="lost")P.open(e);else{await x.updateStatus(e,t);const o=t.replace("_"," ");m.show(`✓ Lead "${n.name}" moved to ${o.toUpperCase()}`),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}},refreshBoard(){if(document.querySelector(".kanban-wrapper")){const n=this.getStages().filter(s=>s.visible!==!1),a=x.getAll().filter(s=>{const r=!this.currentSearch||s.name&&s.name.toLowerCase().includes(this.currentSearch)||s.company&&s.company.toLowerCase().includes(this.currentSearch),l=this.currentPriority==="all"||s.priority===this.currentPriority,c=this.currentRequirement==="all"||Array.isArray(s.requirements)&&s.requirements.some(u=>u.toLowerCase().includes(this.currentRequirement.toLowerCase())),h=this.matchesDateRange(s);return r&&l&&c&&h}),i=document.getElementById("kanban-board-container");i&&(i.innerHTML=n.length===0?`
          <div style="padding: 40px; text-align: center; color: var(--text-muted); width: 100%;">
            No columns selected. Click <strong>Columns ▾</strong> above to show columns.
          </div>
        `:n.map(s=>J.render(s,a)).join(""),this.bindKanbanInteractions())}}},le={currentSection:"profile",teamUsers:[],isLoadingUsers:!1,async fetchTeamMembers(){this.isLoadingUsers=!0;try{const e=await v.get("/auth/users");e&&e.users&&(this.teamUsers=e.users)}catch(e){console.warn("Could not fetch team users:",e.message)}finally{this.isLoadingUsers=!1}},render(){const e=y.getCurrentUser()||{name:"User",email:"",role:"Team Member",avatar:"U"},t=y.isSystemAdmin(),n=this.teamUsers.length>0?this.teamUsers:[{id:e.id||"me",name:e.name,email:e.email,role:e.role||"Team Member",leadsCount:"Mine",isAdmin:t,avatar:e.avatar||"U"}];return`
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Settings & Profile</h1>
            <p>Manage your account profile and team preferences</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); margin-bottom: var(--space-24);">
          <button class="btn btn-ghost ${this.currentSection==="profile"?"active":""}" id="tab-sec-profile" style="border-bottom: 2px solid ${this.currentSection==="profile"?"var(--primary)":"transparent"}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentSection==="profile"?"var(--primary)":"var(--text-secondary)"};">
            My Profile
          </button>
          <button class="btn btn-ghost ${this.currentSection==="team"?"active":""}" id="tab-sec-team" style="border-bottom: 2px solid ${this.currentSection==="team"?"var(--primary)":"transparent"}; border-radius: 0; padding: 10px 16px; font-weight: 600; color: ${this.currentSection==="team"?"var(--primary)":"var(--text-secondary)"};">
            Team & Roles
          </button>
        </div>

        <!-- My Profile Section -->
        ${this.currentSection==="profile"?`
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 24px; max-width: 600px; box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
              <div class="avatar" style="width: 56px; height: 56px; font-size: 20px; font-weight: 700;">${e.avatar||"U"}</div>
              <div>
                <h2 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">${e.name}</h2>
                <div style="font-size: 13px; color: var(--text-secondary);">${e.email}</div>
                <span class="badge" style="margin-top: 6px; background: #EEF2FF; color: #4F46E5;">${e.role||"Team Member"}</span>
              </div>
            </div>

            <div style="border-top: 1px solid var(--border-subtle); padding-top: 16px; display: flex; flex-direction: column; gap: 14px;">
              <div>
                <label class="form-label" style="font-size: 12px; text-transform: uppercase; color: var(--text-muted);">Full Name</label>
                <div style="font-size: 14px; font-weight: 500; color: var(--text-main);">${e.name}</div>
              </div>
              <div>
                <label class="form-label" style="font-size: 12px; text-transform: uppercase; color: var(--text-muted);">Email Address</label>
                <div style="font-size: 14px; font-weight: 500; color: var(--text-main);">${e.email}</div>
              </div>
              <div>
                <label class="form-label" style="font-size: 12px; text-transform: uppercase; color: var(--text-muted);">Assigned Role</label>
                <div style="font-size: 14px; font-weight: 500; color: var(--text-main);">${e.role||"Team Member"}</div>
              </div>
            </div>
          </div>
        `:""}

        <!-- Team & Roles Section -->
        ${this.currentSection==="team"?`
          <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); overflow: hidden; max-width: 850px; box-shadow: var(--shadow-sm);">
            <div style="padding: 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
              <div>
                <h3 style="font-size: 16px; font-weight: 600;">Team Members & Roles</h3>
                <p style="font-size: 13px; color: var(--text-secondary);">Manage registered users, access seats, and admin privileges</p>
              </div>
              <button class="btn btn-primary btn-sm" id="btn-invite-member">+ Invite Member</button>
            </div>

            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
              <thead>
                <tr style="background: #F8FAFC; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">
                  <th style="padding: 12px 20px;">User</th>
                  <th style="padding: 12px 20px;">Role & Access</th>
                  <th style="padding: 12px 20px;">Leads Assigned</th>
                  <th style="padding: 12px 20px; text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${n.map(o=>{const a=o.email&&e.email&&o.email.toLowerCase()===e.email.toLowerCase();return`
                    <tr style="height: 60px; border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 12px 20px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <div class="avatar" style="width: 34px; height: 34px; font-size: 12px; font-weight: 600;">${o.avatar||"U"}</div>
                          <div>
                            <span style="font-weight: 600; color: var(--text-main);">${o.name}</span>
                            <div style="font-size: 11.5px; color: var(--text-muted);">${o.email||""}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding: 12px 20px;">
                        ${o.isAdmin?`<span class="badge" style="background: #EEF2FF; color: #4338CA; border: 1px solid #C7D2FE; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">${p("crown",{size:12,color:"#4338CA"})} Admin</span>`:'<span class="badge" style="background: #F1F5F9; color: #64748B; font-weight: 500;">Team Member</span>'}
                        <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">${o.role||"Member"}</div>
                      </td>
                      <td style="padding: 12px 20px; font-weight: 600; color: var(--text-main);">${o.leadsCount??0}</td>
                      <td style="padding: 12px 20px; text-align: right;">
                        ${a?'<span class="badge" style="background: #EEF2FF; color: #4F46E5;">You</span>':t?o.isAdmin?`<button class="btn btn-secondary btn-sm btn-toggle-role" data-user-id="${o.id}" data-make-admin="false" style="color: #DC2626; border-color: #FECACA; font-size: 12px; padding: 4px 10px;" title="Revoke Admin Access">Revoke Admin</button>`:`<button class="btn btn-primary btn-sm btn-toggle-role" data-user-id="${o.id}" data-make-admin="true" style="font-size: 12px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 4px;" title="Promote user to Admin">${p("crown",{size:12,color:"#ffffff"})} Make Admin</button>`:'<span style="color: var(--text-muted); font-size: 12px;">—</span>'}
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:""}
      </div>
    `},initListeners(){const e=document.getElementById("tab-sec-profile"),t=document.getElementById("tab-sec-team");e&&e.addEventListener("click",()=>{this.currentSection="profile",this.reRender()}),t&&t.addEventListener("click",async()=>{this.currentSection="team",await this.fetchTeamMembers(),this.reRender()}),document.querySelectorAll(".btn-toggle-role").forEach(o=>{o.addEventListener("click",async a=>{const i=a.currentTarget.getAttribute("data-user-id"),s=a.currentTarget.getAttribute("data-make-admin")==="true";try{o.disabled=!0;const r=await v.patch(`/auth/users/${i}/role`,{isAdmin:s});m.show(r.message||(s?"✓ User promoted to Admin":"✓ Admin rights revoked")),await this.fetchTeamMembers(),this.reRender()}catch(r){m.show(`❌ Error: ${r.message}`,"error"),o.disabled=!1}})});const n=document.getElementById("btn-invite-member");n&&n.addEventListener("click",()=>{m.show("Invitation link copied to clipboard!")})},reRender(){const e=document.getElementById("app");if(e&&window.location.hash.startsWith("#/settings")){const t=e.querySelector(".page-container");t&&(t.outerHTML=this.render(),this.initListeners())}}};class de{constructor(){this.appEl=document.getElementById("app"),this.modalRoot=document.getElementById("modal-root"),this.currentRoute="/dashboard",this.routes={"/login":ae,"/dashboard":G,"/pipeline":re,"/settings":le},this.init()}async init(){d.init(),localStorage.getItem("techcrm_sidebar_collapsed")==="true"&&document.body.classList.add("sidebar-collapsed"),this.mountModals(),this.registerGlobalEvents(),window.addEventListener("hashchange",()=>this.handleRoute()),window.location.hash?await this.handleRoute():window.location.hash="#/dashboard"}mountModals(){this.modalRoot&&(this.modalRoot.innerHTML=`
        ${F.render()}
        ${z.render()}
        ${P.render()}
        ${T.render()}
        ${M.render()}
      `,F.initGlobalListeners(),z.initListeners(),P.initListeners(),T.initListeners(),M.initListeners())}registerGlobalEvents(){window.addEventListener("techcrm:open-add-lead",()=>{if(!y.isAuthenticated()){window.location.hash="#/login";return}z.open()}),window.addEventListener("techcrm:open-schedule-followup",()=>{if(!y.isAuthenticated()){window.location.hash="#/login";return}T.open()}),window.addEventListener("techcrm:confirm-delete",t=>{var n;if(!y.isAuthenticated()){window.location.hash="#/login";return}(n=t.detail)!=null&&n.leadId&&M.open(t.detail.leadId)}),window.addEventListener("techcrm:data-changed",()=>{this.renderCurrentView()})}getRoutePath(){const t=window.location.hash.slice(1);return t&&t.split("?")[0]||"/dashboard"}async handleRoute(){const t=this.getRoutePath();if(y.getToken())try{if(!await y.validateSession()&&t!=="/login"){window.location.hash="#/login";return}}catch{if(y.clearSession(),t!=="/login"){window.location.hash="#/login";return}}if(t!=="/login"&&!y.isAuthenticated()){window.location.hash="#/login";return}if(t==="/login"&&y.isAuthenticated()){window.location.hash="#/dashboard";return}this.currentRoute=t,y.isAuthenticated()&&t!=="/login"&&Promise.all([x.fetchFromMongoDB(),Q.fetchFromMongoDB()]).then(()=>{this.renderCurrentView(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}).catch(n=>{console.warn("Error fetching CRM data:",n.message)}),this.renderCurrentView()}renderCurrentView(){const t=this.routes[this.currentRoute]||G;if(this.currentRoute==="/login"){this.appEl.innerHTML=t.render(),t.initListeners();return}this.appEl.innerHTML=`
      <div class="app-shell">
        ${V.render(this.currentRoute)}
        <div class="main-wrapper">
          ${Y.render()}
          <main id="main-content-area">
            ${t.render()}
          </main>
        </div>
        ${ie.render(this.currentRoute)}
      </div>
    `,Y.initListeners(),V.initListeners(),t.initListeners&&t.initListeners()}}new de;
