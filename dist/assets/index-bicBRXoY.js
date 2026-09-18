(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const I={LEADS:"techcrm_leads",FOLLOWUPS:"techcrm_followups",ACTIVITIES:"techcrm_activities",COMPANIES:"techcrm_companies",NOTIFICATIONS:"techcrm_notifications",USER:"techcrm_user",PIPELINE_STAGES:"techcrm_pipeline_stages"},te=[{id:"new",name:"New Leads",color:"#64748B"},{id:"request_sent",name:"Request Sent",color:"#F59E0B"},{id:"connected",name:"Connected",color:"#6366F1"},{id:"followup_scheduled",name:"Follow-up Scheduled",color:"#0EA5E9"},{id:"qualified",name:"Qualified",color:"#8B5CF6"},{id:"proposal",name:"Proposal Sent",color:"#0284C7"},{id:"won",name:"Won",color:"#16A34A"}],c={init(){localStorage.getItem("techcrm_token")||(localStorage.removeItem(I.USER),localStorage.removeItem("techcrm_logged_in"));const e=this.get(I.LEADS);Array.isArray(e)&&e.length>0&&e[0].id==="lead-1"&&localStorage.removeItem(I.LEADS);const t=this.get(I.FOLLOWUPS);Array.isArray(t)&&t.length>0&&t[0].id==="f-1"&&localStorage.removeItem(I.FOLLOWUPS),localStorage.getItem(I.PIPELINE_STAGES)||localStorage.setItem(I.PIPELINE_STAGES,JSON.stringify(te))},clearUserData(){localStorage.removeItem(I.USER),localStorage.removeItem(I.LEADS),localStorage.removeItem(I.FOLLOWUPS),localStorage.removeItem(I.ACTIVITIES),localStorage.removeItem(I.NOTIFICATIONS),localStorage.removeItem("techcrm_token"),localStorage.removeItem("techcrm_logged_in")},get(e,t=null){try{const n=localStorage.getItem(e);return n?JSON.parse(n):t}catch(n){return console.error("Storage Read Error:",n),t}},set(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(n){console.error("Storage Write Error:",n)}},KEYS:I};c.init();const ne="https://samyo-crm-api.onrender.com/api",ie="http://localhost:5000/api",ae=!!(typeof window<"u"&&(window.location.hostname==="localhost"||window.location.hostname==="127.0.0.1"||window.location.hostname.startsWith("192.168."))),se=()=>typeof window>"u"?ie:ae?window.location.port==="3000"?"/api":`http://${window.location.hostname}:5000/api`:ne,$=se();async function B(e){const t=await e.text();let n=null;if(t)try{n=JSON.parse(t)}catch{n=null}if(!e.ok){const a=n&&(n.message||n.error)||`HTTP ${e.status}: Server not reachable or endpoint not found`,s=new Error(a);throw s.status=e.status,s.data=n,s}return n}const f={baseUrl:$,async checkHealth(){try{return{ok:!0,data:await this.get("/health")}}catch(e){return{ok:!1,error:e.message}}},getHeaders(){const e={"Content-Type":"application/json"},t=localStorage.getItem("techcrm_token");return t&&(e.Authorization=`Bearer ${t}`),e},async get(e){try{const t=await fetch(`${$}${e}`,{method:"GET",headers:this.getHeaders()});return await B(t)}catch(t){throw console.warn(`ApiService.get(${e}) failed:`,t.message),t}},async post(e,t){try{const n=await fetch(`${$}${e}`,{method:"POST",headers:this.getHeaders(),body:JSON.stringify(t)});return await B(n)}catch(n){throw console.warn(`ApiService.post(${e}) failed:`,n.message),n}},async put(e,t){try{const n=await fetch(`${$}${e}`,{method:"PUT",headers:this.getHeaders(),body:JSON.stringify(t)});return await B(n)}catch(n){throw console.warn(`ApiService.put(${e}) failed:`,n.message),n}},async patch(e,t){try{const n=await fetch(`${$}${e}`,{method:"PATCH",headers:this.getHeaders(),body:JSON.stringify(t)});return await B(n)}catch(n){throw console.warn(`ApiService.patch(${e}) failed:`,n.message),n}},async delete(e){try{const t=await fetch(`${$}${e}`,{method:"DELETE",headers:this.getHeaders()});return await B(t)}catch(t){throw console.warn(`ApiService.delete(${e}) failed:`,t.message),t}}},h={getCurrentUser(){return c.get(c.KEYS.USER,null)},getToken(){return localStorage.getItem("techcrm_token")},isAdmin(){return!!this.getCurrentUser()},isSystemAdmin(){const e=this.getCurrentUser();return!!(e!=null&&e.isAdmin||(e==null?void 0:e.accessRole)==="admin")},isViewer(){return!1},getRoleBadgeText(){const e=this.getCurrentUser();return(e==null?void 0:e.role)||"Team Member"},isAuthenticated(){return!!this.getToken()},async validateSession(){if(!this.getToken())return this.clearSession(),null;try{const t=await f.get("/auth/me");return t&&t.user?(c.set(c.KEYS.USER,t.user),localStorage.setItem("techcrm_logged_in","true"),t.user):(this.clearSession(),null)}catch(t){return console.warn("Session validation failed:",t.message),this.clearSession(),null}},async login(e,t){const n=await f.post("/auth/login",{email:e,password:t});return n.token&&localStorage.setItem("techcrm_token",n.token),n.user&&c.set(c.KEYS.USER,n.user),localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:n.user}},async register(e,t,n,a){const s=await f.post("/auth/register",{name:e,email:t,password:n,role:a});return s.token&&localStorage.setItem("techcrm_token",s.token),s.user&&c.set(c.KEYS.USER,s.user),localStorage.setItem("techcrm_logged_in","true"),{success:!0,user:s.user}},clearSession(){c.clearUserData()},logout(){this.clearSession(),window.location.hash="#/login",window.location.reload()}};let y=[],T=!1;const b={resetCache(){y=[],T=!1},async fetchFromMongoDB(){try{const e=await f.get("/leads?scope=team");Array.isArray(e)&&(y=e.map(t=>({...t,id:t._id||t.id})),T=!0,c.set(c.KEYS.LEADS,y));try{const t=await f.get("/activities");Array.isArray(t)&&t.length>0&&c.set(c.KEYS.ACTIVITIES,t)}catch{}return y}catch(e){console.warn("Could not sync with MongoDB server, using cached data:",e.message)}return this.getAll()},async fetchTeamLeads(e={}){try{const t=e.memberId?`/leads?memberId=${e.memberId}`:"/leads?scope=team",n=await f.get(t);if(Array.isArray(n))return n.map(a=>({...a,id:a._id||a.id}))}catch(t){console.warn("Could not fetch team leads:",t.message)}return this.getAll()},async reassignLead(e,t){try{const n=await f.patch(`/leads/${e}/assign`,{newOwnerId:t});if(n){const a=y.findIndex(s=>s.id===e||s._id===e);return a!==-1&&(y[a]={...n,id:n._id||n.id},c.set(c.KEYS.LEADS,y)),n}}catch(n){throw console.warn("Reassign lead error:",n.message),n}},async syncWithServer(){return this.fetchFromMongoDB()},getAll(){return y.length>0||T||(y=c.get(c.KEYS.LEADS,[]).map(t=>({...t,id:t._id||t.id}))),y},getById(e){return this.getAll().find(n=>n.id===e||n._id===e)||null},async create(e){var r;const n=(e.company&&typeof e.company=="string"?e.company.trim():"")||"Individual",a={name:e.name&&typeof e.name=="string"?e.name.trim():"Unnamed Lead",company:n,designation:e.designation&&typeof e.designation=="string"?e.designation.trim():"",linkedinUrl:e.linkedinUrl&&typeof e.linkedinUrl=="string"?e.linkedinUrl.trim():"",companyWebsite:e.companyWebsite&&typeof e.companyWebsite=="string"?e.companyWebsite.trim():"",industry:e.industry||"",location:e.location&&typeof e.location=="string"?e.location.trim():"",requirements:Array.isArray(e.requirements)?e.requirements:[],priority:e.priority||"medium",status:e.status||"new",potentialValue:Number(e.potentialValue)||0,notes:e.notes?[{text:e.notes,createdAt:new Date().toISOString(),author:((r=h.getCurrentUser())==null?void 0:r.name)||"Me"}]:[],ownerId:e.ownerId||void 0};let s;try{s=await f.post("/leads",a)}catch(l){throw console.error("MongoDB cloud save failed:",l.message),new Error(`MongoDB save failed: ${l.message}`)}const i={...s,id:s._id||s.id};y.unshift(i),c.set(c.KEYS.LEADS,y);const o=i.company&&i.company!=="Individual"?` (${i.company})`:"";return this.recordGlobalActivity(`${i.name}${o} added as New Lead`,"new"),i},async update(e,t){let n;try{n=await f.put(`/leads/${e}`,t)}catch(s){console.warn("MongoDB update warning:",s.message)}const a=y.findIndex(s=>s.id===e||s._id===e);return a!==-1?(y[a]={...y[a],...n||t,id:(n==null?void 0:n._id)||(n==null?void 0:n.id)||e},c.set(c.KEYS.LEADS,y),y[a]):n||null},async updateStatus(e,t,n={}){const a=this.getById(e);if(!a)return null;const s=a.status;if(s===t)return a;const i={new:"New Leads",request_sent:"Request Sent",connected:"Connected",followup_scheduled:"Follow-up Scheduled",qualified:"Qualified",proposal:"Proposal",won:"Won",lost:"Lost"},o={id:"act-"+Date.now(),title:`Moved from ${i[s]||s} to ${i[t]||t}`,time:"Just now",date:new Date().toISOString()};a.status=t,a.activities=[o,...a.activities||[]],n.lostReason!==void 0&&(a.lostReason=n.lostReason),c.set(c.KEYS.LEADS,y),this.recordGlobalActivity(`${a.name} moved to ${i[t]||t}`,t);try{const r=await f.patch(`/leads/${e}/status`,{status:t,...n});if(r){const l=y.findIndex(d=>d.id===e||d._id===e);l!==-1&&(y[l]={...r,id:r._id||r.id},c.set(c.KEYS.LEADS,y))}}catch(r){console.warn("MongoDB status update warning:",r.message)}return a},async addNote(e,t){var s;const n=this.getById(e);if(!n||!t.trim())return null;const a=((s=h.getCurrentUser())==null?void 0:s.name)||"Me";try{const i=await f.post(`/leads/${e}/notes`,{text:t.trim(),author:a});if(i){const o=y.findIndex(r=>r.id===e||r._id===e);if(o!==-1)return y[o]={...i,id:i._id||i.id},c.set(c.KEYS.LEADS,y),y[o]}}catch(i){console.warn("MongoDB note save error:",i.message);const o={id:"note-"+Date.now(),text:t.trim(),createdAt:new Date().toISOString(),author:a};n.notes=[o,...n.notes||[]],c.set(c.KEYS.LEADS,y)}return n},async addActivity(e,t){const n=this.getById(e);if(!n||!t.trim())return null;const a={id:"act-"+Date.now(),title:t.trim(),time:"Just now",date:new Date().toISOString()};n.activities=[a,...n.activities||[]],c.set(c.KEYS.LEADS,y);try{await f.post(`/leads/${e}/activities`,{title:t.trim()})}catch(s){console.warn("Could not persist activity to MongoDB:",s.message)}return n},async delete(e){try{await f.delete(`/leads/${e}`)}catch(t){console.warn("MongoDB delete warning:",t.message)}return y=y.filter(t=>t.id!==e&&t._id!==e),c.set(c.KEYS.LEADS,y),!0},recordGlobalActivity(e,t){f.post("/activities",{text:e,type:t,time:"Just now"}).catch(()=>{});const n=c.get(c.KEYS.ACTIVITIES,[]);n.unshift({id:"g-act-"+Date.now(),text:e,time:"Just now",type:t}),c.set(c.KEYS.ACTIVITIES,n.slice(0,20))},getStats(){const e=this.getAll(),t={new:0,request_sent:0,connected:0,followup_scheduled:0,qualified:0,proposal:0,won:0,lost:0};e.forEach(o=>{t[o.status]!==void 0&&t[o.status]++});const n=e.length,a=t.connected||0,s=t.proposal||0,i=t.won||0;return{totalLeads:n,connections:a,proposals:s,won:i,breakdown:{newLeads:t.new||0,requests:t.request_sent||0,connected:t.connected||0,followup_scheduled:t.followup_scheduled||0,qualified:t.qualified||0,proposal:t.proposal||0,won:t.won||0,lost:t.lost||0},actualCounts:t}}};let x=[],D=!1;const ee={resetCache(){x=[],D=!1},async fetchFromMongoDB(){try{const e=await f.get("/followups");if(Array.isArray(e))return x=e.map(t=>({...t,id:t._id||t.id})),D=!0,c.set(c.KEYS.FOLLOWUPS,x),x}catch(e){console.warn("Could not sync followups with MongoDB server, using cached:",e.message)}return this.getAll()},getAll(){return x.length>0||D||(x=c.get(c.KEYS.FOLLOWUPS,[]).map(t=>({...t,id:t._id||t.id}))),x},getByCategory(e="today"){const t=this.getAll();return e==="completed"?t.filter(n=>n.completed):t.filter(n=>!n.completed&&(e==="all"||n.category===e))},async create(e){const t={leadId:e.leadId||"",leadName:e.leadName&&typeof e.leadName=="string"?e.leadName.trim():"Lead",company:e.company&&typeof e.company=="string"?e.company.trim():"",task:e.task&&typeof e.task=="string"?e.task.trim():"",dueDate:e.dueDate||new Date().toISOString(),dueLabel:e.dueLabel||"Upcoming",category:e.category||"upcoming",priority:e.priority||"upcoming",linkedinUrl:e.linkedinUrl||"#"};let n;try{n=await f.post("/followups",t)}catch(s){console.warn("MongoDB followup create error, saving locally:",s.message),n={...t,id:"f-"+Date.now(),completed:!1}}const a={...n,id:n._id||n.id};return x.unshift(a),c.set(c.KEYS.FOLLOWUPS,x),a},async complete(e){const t=x.find(n=>n.id===e||n._id===e);t&&(t.completed=!0,c.set(c.KEYS.FOLLOWUPS,x));try{await f.patch(`/followups/${e}/complete`)}catch(n){console.warn("MongoDB followup complete error:",n.message)}return t},async snooze(e,t=1){const n=x.find(a=>a.id===e||a._id===e);n&&(n.category="upcoming",n.priority="upcoming",n.dueLabel=`Snoozed (${t}d)`,c.set(c.KEYS.FOLLOWUPS,x));try{await f.patch(`/followups/${e}/snooze`,{days:t})}catch(a){console.warn("MongoDB followup snooze error:",a.message)}return n},async delete(e){x=x.filter(t=>t.id!==e&&t._id!==e),c.set(c.KEYS.FOLLOWUPS,x);try{await f.delete(`/followups/${e}`)}catch(t){console.warn("MongoDB followup delete error:",t.message)}return!0}},K={render(){const e=c.get(c.KEYS.NOTIFICATIONS,[]);return`
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
    `},initListeners(){const e=document.getElementById("btn-mark-all-read");e&&e.addEventListener("click",()=>{const n=c.get(c.KEYS.NOTIFICATIONS,[]).map(i=>({...i,unread:!1}));c.set(c.KEYS.NOTIFICATIONS,n);const a=document.getElementById("notif-badge-count");a&&(a.style.display="none");const s=document.getElementById("notification-panel");s&&s.querySelectorAll(".notification-item").forEach(i=>i.classList.remove("unread"))})}},oe={dashboard:'<rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect>',leads:'<line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>',settings:'<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>',user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>',search:'<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>',bell:'<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>',plus:'<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>',close:'<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>',trash:'<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>',columns:'<path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>',chevronDown:'<polyline points="6 9 12 15 18 9"></polyline>',chevronLeft:'<polyline points="15 18 9 12 15 6"></polyline>',chevronRight:'<polyline points="9 18 15 12 9 6"></polyline>',calendar:'<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',check:'<polyline points="20 6 9 17 4 12"></polyline>',alertTriangle:'<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>',alertCircle:'<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>',info:'<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',crown:'<polygon points="2 4 5 20 19 20 22 4 15 12 12 5 9 12 2 4"></polygon>',flame:'<path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.38 0 2.5-1.12 2.5-2.5 0-.84-.42-1.61-1.07-2.07C11.75 11.9 11 10.74 11 9.5c0-1.8 1.4-3.3 2-4.5 2 2.33 4 5.5 4 9 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2.97 1.94-6.31 3.5-8.5.5 2 0 4.5 0 4.5s2 1.5 0 4z"></path>',globe:'<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',smartphone:'<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>',cpu:'<rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>',palette:'<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67-.08-.1-.13-.23-.13-.37 0-.28.22-.5.5-.5H16c3.31 0 6-2.69 6-6 0-4.96-4.49-9-10-9z"></path>',code:'<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',linkedin:'<path fill="#0A66C2" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z"/>'};function u(e,{size:t=18,strokeWidth:n=2,className:a="",style:s="",color:i="currentColor"}={}){const o=oe[e];if(!o)return"";const r=e==="linkedin",l="none",d=r?"none":i,m=r?"0":n,p=s?` style="${s}"`:"",v=a?` class="${a}"`:"";return`<svg width="${t}" height="${t}" viewBox="0 0 24 24" fill="${l}" stroke="${d}" stroke-width="${m}" stroke-linecap="round" stroke-linejoin="round"${v}${p}>${o}</svg>`}const G={render(){const e=h.getCurrentUser()||{name:"User",role:"Team Member",avatar:"U",email:""},n=c.get(c.KEYS.NOTIFICATIONS,[]).filter(a=>a.unread).length;return`
      <header class="top-header">
        <div class="header-left">
          <div class="header-brand-mobile">
            <span>🚀</span> TechCRM
          </div>
          <div class="search-input-wrapper" style="width: 100%;">
            ${u("search",{size:16})}
            <input type="text" id="global-search-input" class="input" placeholder="Search Lead Board..." />
          </div>
        </div>

        <div class="header-right">
          <!-- Role Pill -->
          <div class="user-role-pill" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; font-size: 11.5px; font-weight: 600; background: #EEF2FF; border: 1px solid #C7D2FE; color: #4338CA;" title="Account Role">
            ${u("user",{size:13,color:"#4338CA"})}
            <span>${e.role?e.role.split("/")[0].trim():"Team Member"}</span>
          </div>

          <!-- Notification Bell -->
          <div style="position: relative;">
            <button id="notif-toggle-btn" class="header-icon-btn" title="Notifications" aria-label="Notifications">
              ${u("bell",{size:18})}
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
              ${u("chevronDown",{size:14,style:"color: var(--text-secondary);"})}
            </button>

            <div id="user-dropdown-menu" class="dropdown-menu">
              <div style="padding: 8px 12px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 4px;">
                <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">${e.name}</div>
                <div style="font-size: 11px; color: var(--text-muted);">${e.email||""}</div>
                <div style="margin-top: 4px; font-size: 11px; font-weight: 600; color: #4F46E5;">${e.role||"Team Member"}</div>
              </div>
              <a href="#/settings" class="dropdown-item">
                ${u("user",{size:15})}
                My Profile
              </a>
              <a href="#/settings" class="dropdown-item">
                ${u("settings",{size:15})}
                Preferences
              </a>
              <div class="dropdown-divider"></div>
              <button id="header-logout-btn" class="dropdown-item danger" style="width: 100%; background: none; border: none; font: inherit;">
                ${u("logout",{size:15})}
                Log out
              </button>
            </div>
          </div>
        </div>
      </header>
    `},initListeners(){K.initListeners();const e=document.getElementById("notif-toggle-btn"),t=document.getElementById("notification-panel");e&&t&&e.addEventListener("click",o=>{o.stopPropagation(),t.classList.toggle("active");const r=document.getElementById("user-dropdown-menu");r&&r.classList.remove("active")});const n=document.getElementById("user-menu-btn"),a=document.getElementById("user-dropdown-menu");n&&a&&n.addEventListener("click",o=>{o.stopPropagation(),a.classList.toggle("active"),t&&t.classList.remove("active")}),document.addEventListener("click",()=>{t&&t.classList.remove("active"),a&&a.classList.remove("active")});const s=document.getElementById("header-logout-btn");s&&s.addEventListener("click",()=>{h.logout()});const i=document.getElementById("global-search-input");i&&i.addEventListener("keydown",o=>{o.key==="Enter"&&(encodeURIComponent(i.value.trim()),window.location.hash="#/pipeline")})}},Q={render(e="/dashboard"){const t=b.getAll(),n=[{path:"/dashboard",label:"Dashboard",icon:u("dashboard",{size:18})},{path:"/pipeline",label:"Lead Board",badge:t.filter(a=>a.status!=="lost"&&a.status!=="won").length,icon:u("leads",{size:18})},{path:"/team",label:"Team",icon:u("user",{size:18})}];return`
      <aside class="sidebar">
                <div class="sidebar-header" style="display: flex; align-items: center; justify-content: space-between; position: relative;">
          <a href="#/dashboard" class="brand-logo">
            <div class="brand-icon">🚀</div>
            <span class="brand-text">TechCRM</span>
          </a>
          <button id="btn-toggle-sidebar" class="sidebar-toggle-btn" title="Toggle Sidebar">
            ${u("chevronLeft",{size:14})}
          </button>
        </div>


        <nav class="sidebar-nav">
          ${n.map(a=>`
            <a href="#${a.path}" class="nav-link ${e===a.path?"active":""}" title="${a.label}">
              ${a.icon}
              <span class="nav-link-text">${a.label}</span>
              ${a.badge!==void 0&&a.badge>0?`<span class="nav-link-badge">${a.badge}</span>`:""}
            </a>
          `).join("")}

          <div class="sidebar-divider"></div>

          <a href="#/settings" class="nav-link ${e==="/settings"?"active":""}" title="Settings">
            ${u("settings",{size:18})}
            <span class="nav-link-text">Settings</span>
          </a>
        </nav>
      </aside>
    `},initListeners(){const e=document.getElementById("btn-toggle-sidebar");e&&e.addEventListener("click",()=>{document.body.classList.toggle("sidebar-collapsed");const t=document.body.classList.contains("sidebar-collapsed");localStorage.setItem("techcrm_sidebar_collapsed",t?"true":"false")})}},re={render(e="/dashboard"){return`
      <nav class="mobile-bottom-nav">
        ${[{path:"/dashboard",label:"Dashboard",icon:u("dashboard",{size:20})},{path:"/pipeline",label:"Lead Board",icon:u("leads",{size:20})},{path:"/team",label:"Team",icon:u("user",{size:20})}].map(n=>`
          <a href="#${n.path}" class="mobile-nav-item ${e===n.path?"active":""}">
            ${n.icon}
            <span>${n.label}</span>
          </a>
        `).join("")}
      </nav>
    `}},g={show(e,t="success",n=3e3){const a=document.getElementById("toast-container");if(!a)return;const s=document.createElement("div");s.className=`toast toast-${t}`;let i="";t==="success"?i=u("check",{size:18,strokeWidth:2.5}):t==="warning"?i=u("alertTriangle",{size:18,strokeWidth:2.5}):t==="danger"?i=u("alertCircle",{size:18,strokeWidth:2.5}):i=u("info",{size:18,strokeWidth:2.5}),s.innerHTML=`
      ${i}
      <span>${e}</span>
    `,a.appendChild(s),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateY(10px)",setTimeout(()=>s.remove(),200)},n)}},C={currentLeadId:null,formatExactDateTime(e){if(!e)return"Just now";const t=new Date(e);if(isNaN(t.getTime()))return"Recently";const n=t.toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}),a=t.toLocaleTimeString("en-IN",{hour:"numeric",minute:"2-digit",hour12:!0});return`${n} at ${a}`},render(){return`
      <div id="drawer-backdrop" class="drawer-backdrop"></div>
      <aside id="lead-drawer" class="drawer" aria-label="Lead Details">
        <div class="drawer-header">
          <span class="drawer-title">Lead Details</span>
          <button id="drawer-close-btn" class="btn btn-ghost btn-icon" aria-label="Close drawer">
            ${u("close",{size:20})}
          </button>
        </div>

        <div id="drawer-content" class="drawer-body">
          <!-- Populated dynamically via open(leadId) -->
        </div>
      </aside>
    `},open(e){const t=b.getById(e);if(!t)return;const n=h.getCurrentUser(),a=n?String(n.id||n._id):null,s=h.isAdmin(),i=t.ownerId,o=i?String(i._id||i.id||i):null,r=t.creatorId,l=r?String(r._id||r.id||r):o,d=s||a&&(a===o||a===l),m=t.addedDate||t.createdAt,p=this.formatExactDateTime(m),v=(r==null?void 0:r.name)||(a&&l===a?"You":"Team Member"),L=(i==null?void 0:i.name)||(a&&o===a?"You":"Unassigned");this.currentLeadId=e;const w=document.getElementById("lead-drawer"),E=document.getElementById("drawer-backdrop"),S=document.getElementById("drawer-content");if(!w||!E||!S)return;const A=(t.name||"L").split(" ").filter(Boolean).map(F=>F[0]).join("").substring(0,2).toUpperCase()||"L",z=Array.isArray(t.requirements)?t.requirements:[];S.innerHTML=`
      <div class="drawer-profile-banner">
        <div class="drawer-avatar">${A}</div>
        <div class="drawer-profile-text">
          <h2>${t.name}</h2>
          <p>${t.designation||"Prospect"}${t.company?` @ ${t.company}`:""}</p>
        </div>
      </div>

      <!-- Date, Time & Ownership Tracking Box -->
      <div style="margin-bottom: 20px; padding: 12px 14px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; display: flex; flex-direction: column; gap: 8px;">
        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px;">
          <span style="color: #64748B; display: inline-flex; align-items: center; gap: 5px;">
            🕒 <strong>Added on:</strong> ${p}
          </span>
          <span style="color: #475569; display: inline-flex; align-items: center; gap: 4px;">
            ✍️ <strong>Added by:</strong> <span style="font-weight: 600; color: #1E293B;">${v}</span>
          </span>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px dashed #E2E8F0; padding-top: 8px; font-size: 12px;">
          <span style="color: #64748B; display: inline-flex; align-items: center; gap: 5px;">
            👤 <strong>Assigned to:</strong> <span style="color: #4F46E5; font-weight: 600;">${L}</span>
          </span>
          <span class="badge" style="font-size: 11px; padding: 2px 8px; font-weight: 600; ${d?"background: #EEF2FF; color: #4F46E5; border: 1px solid #C7D2FE;":"background: #F1F5F9; color: #64748B; border: 1px solid #CBD5E1;"}">
            ${d?"✓ Can Edit":"🔒 View Only"}
          </span>
        </div>
      </div>

      ${t.linkedinUrl?`
      <div style="margin-bottom: 20px;">
        <a href="${t.linkedinUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%; justify-content: center; gap: 8px;">
          ${u("linkedin",{size:16})}
          Open LinkedIn Profile
        </a>
      </div>
      `:""}

      <div class="drawer-field-grid">
        <div class="drawer-field">
          <span class="drawer-field-label">Stage / Status ${d?"":"(Locked - View Only)"}</span>
          <select id="drawer-status-select" class="select" style="font-weight: 500; ${d?"":"background: #F1F5F9; cursor: not-allowed; color: #64748B;"}" ${d?"":'disabled title="Only creator and assignee can change stage"'}>
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
            ${z.length>0?z.map(F=>`<span class="tag-chip" style="font-size: 12px; padding: 4px 8px;">${F}</span>`).join(""):'<span style="color: var(--text-muted); font-size: 13px; font-style: italic;">None specified</span>'}
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
          ${d?`
            <button id="btn-add-activity-trigger" class="btn btn-ghost btn-sm" style="font-size: 11px;">+ Add Activity</button>
          `:`
            <span class="badge" style="background: #F1F5F9; color: #64748B; font-size: 10.5px;">Read-Only</span>
          `}
        </div>

        <!-- Inline Add Activity Form -->
        ${d?`
        <div id="add-activity-box" style="display: none; margin-bottom: 12px; background: #F8FAFC; padding: 10px; border-radius: 8px; border: 1px solid var(--border-color);">
          <input type="text" id="custom-activity-input" class="input" placeholder="e.g. Discussed proposal on call" style="margin-bottom: 8px;" />
          <div style="display: flex; justify-content: flex-end; gap: 8px;">
            <button id="btn-cancel-activity" class="btn btn-ghost btn-sm">Cancel</button>
            <button id="btn-save-activity" class="btn btn-primary btn-sm">Log Activity</button>
          </div>
        </div>
        `:""}

        <div class="timeline">
          ${(t.activities||[]).map(F=>`
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-title">${F.title}</div>
              <div class="timeline-time">${F.time||"Recently"}</div>
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
          `:t.notes.map(F=>`
            <div class="note-item">
              <div>${F.text}</div>
              <div class="note-meta">${F.author||"Team Member"} • ${new Date(F.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
            </div>
          `).join("")}
        </div>

        <!-- Add Note Box -->
        ${d?`
        <div style="margin-top: 10px;">
          <textarea id="drawer-new-note" class="textarea" placeholder="Add a note or call update..." style="min-height: 60px;"></textarea>
          <button id="btn-drawer-add-note" class="btn btn-secondary btn-sm" style="margin-top: 8px; width: 100%;">+ Add Note</button>
        </div>
        `:`
        <div style="font-size: 12px; color: var(--text-muted); font-style: italic; margin-top: 10px; padding: 8px; background: #F8FAFC; border-radius: 6px; text-align: center;">
          🔒 Adding notes is restricted to creator and assignee
        </div>
        `}
      </div>

      <div class="drawer-divider"></div>

      <!-- Bottom Actions -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
        ${d?`
        <button id="btn-drawer-delete-lead" class="btn btn-ghost btn-sm" style="color: var(--danger);">
          ${u("trash",{size:14})}
          Delete Lead
        </button>
        <button id="btn-drawer-schedule-followup" class="btn btn-secondary btn-sm">Schedule Follow-up</button>
        `:`
        <span style="font-size: 12px; color: var(--text-muted); font-style: italic;">Viewing as Team Member (Read-Only)</span>
        `}
      </div>
    `,E.classList.add("active"),w.classList.add("active"),document.body.style.overflow="hidden",this.bindDrawerActions(e)},close(){const e=document.getElementById("lead-drawer"),t=document.getElementById("drawer-backdrop");e&&e.classList.remove("active"),t&&t.classList.remove("active"),document.body.style.overflow="",this.currentLeadId=null},bindDrawerActions(e){const t=document.getElementById("drawer-status-select");t&&t.addEventListener("change",async p=>{const v=p.target.value;try{await b.updateStatus(e,v),g.show(`✓ Status updated to ${v.replace("_"," ")} in MongoDB`),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e)}catch(L){g.show(L.message||"Failed to update status","error")}});const n=document.getElementById("btn-add-activity-trigger"),a=document.getElementById("add-activity-box"),s=document.getElementById("btn-cancel-activity"),i=document.getElementById("btn-save-activity"),o=document.getElementById("custom-activity-input");n&&a&&n.addEventListener("click",()=>{a.style.display="block",o.focus()}),s&&a&&s.addEventListener("click",()=>{a.style.display="none",o.value=""}),i&&o&&i.addEventListener("click",async()=>{const p=o.value.trim();if(p)try{await b.addActivity(e,p),g.show("Activity logged successfully"),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e)}catch(v){g.show(v.message||"Failed to add activity","error")}});const r=document.getElementById("btn-drawer-add-note"),l=document.getElementById("drawer-new-note");r&&l&&r.addEventListener("click",async()=>{const p=l.value.trim();if(p){r.disabled=!0;try{await b.addNote(e,p),g.show("✓ Note saved to MongoDB"),window.dispatchEvent(new CustomEvent("techcrm:data-changed")),this.open(e)}catch(v){g.show(v.message||"Failed to save note","error")}finally{r.disabled=!1}}});const d=document.getElementById("btn-drawer-schedule-followup");d&&d.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-schedule-followup"))});const m=document.getElementById("btn-drawer-delete-lead");m&&m.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:confirm-delete",{detail:{leadId:e}}))})},initGlobalListeners(){const e=document.getElementById("drawer-backdrop"),t=document.getElementById("drawer-close-btn");e&&e.addEventListener("click",()=>this.close()),t&&t.addEventListener("click",()=>this.close()),document.addEventListener("keydown",n=>{n.key==="Escape"&&this.currentLeadId&&this.close()})}},M={render(){return`
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
              ${u("close",{size:20})}
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
              <label class="form-label" for="lead-assignee">Assign Lead To <span class="optional">(Creator & Assignee both get edit rights)</span></label>
              <select id="lead-assignee" class="select">
                <option value="">Assign to Me (Default)</option>
              </select>
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
    `},async open(){const e=document.getElementById("add-lead-modal");if(e){e.style.display="flex",document.body.style.overflow="hidden";const t=document.getElementById("lead-name");t&&t.focus();const n=document.getElementById("lead-assignee");if(n){const a=h.getCurrentUser(),s=a?a.id||a._id:null;try{const i=await h.getTeamMembers();Array.isArray(i)&&i.length>0?n.innerHTML=i.map(o=>{const r=o._id||o.id,l=String(r)===String(s);return`<option value="${r}" ${l?"selected":""}>${o.name} (${o.role||"Member"})${l?" — (Me)":""}</option>`}).join(""):n.innerHTML=`<option value="${s}">Me (${(a==null?void 0:a.name)||"Current User"})</option>`}catch{n.innerHTML=`<option value="${s}">Me (${(a==null?void 0:a.name)||"Current User"})</option>`}}}},close(){const e=document.getElementById("add-lead-modal");if(e){e.style.display="none",document.body.style.overflow="";const t=document.getElementById("add-lead-form");t&&t.reset();const n=document.getElementById("requirement-tag-selector");n&&n.querySelectorAll(".tag-option").forEach(s=>s.classList.remove("selected"));const a=document.getElementById("priority-selector");if(a){a.querySelectorAll(".radio-pill").forEach(i=>i.classList.remove("selected"));const s=a.querySelector('.radio-pill[data-value="medium"]');s&&s.classList.add("selected")}}},initListeners(){const e=document.getElementById("add-lead-modal");if(!e)return;e.querySelectorAll(".modal-close-btn").forEach(s=>{s.addEventListener("click",()=>this.close())}),e.addEventListener("click",s=>{s.target===e&&this.close()});const t=document.getElementById("requirement-tag-selector");t&&t.addEventListener("click",s=>{const i=s.target.closest(".tag-option");i&&i.classList.toggle("selected")});const n=document.getElementById("priority-selector");n&&n.addEventListener("click",s=>{const i=s.target.closest(".radio-pill");i&&(n.querySelectorAll(".radio-pill").forEach(o=>o.classList.remove("selected")),i.classList.add("selected"))});const a=document.getElementById("add-lead-form");a&&a.addEventListener("submit",async s=>{var F,q,N,U,O,j,W,H,Y,V;if(s.preventDefault(),!h.isAuthenticated()){g.show("Please log in to create leads","warning"),this.close(),window.location.hash="#/login";return}const i=document.getElementById("lead-name"),o=i?i.value.trim():"";if(!o){g.show("Please enter the lead full name","error");return}const r=a.querySelector('button[type="submit"]');r&&(r.disabled=!0,r.textContent="Saving to MongoDB...");const l=((F=document.getElementById("lead-designation"))==null?void 0:F.value.trim())||"";let d=((q=document.getElementById("lead-linkedin"))==null?void 0:q.value.trim())||"";d&&!/^https?:\/\//i.test(d)&&(d="https://"+d);const m=((N=document.getElementById("lead-company"))==null?void 0:N.value.trim())||"";let p=((U=document.getElementById("lead-website"))==null?void 0:U.value.trim())||"";p&&!/^https?:\/\//i.test(p)&&(p="https://"+p);const v=((O=document.getElementById("lead-industry"))==null?void 0:O.value)||"",L=((j=document.getElementById("lead-location"))==null?void 0:j.value.trim())||"",w=(W=document.getElementById("lead-value"))==null?void 0:W.value,E=((H=document.getElementById("lead-notes"))==null?void 0:H.value.trim())||"",S=((Y=document.getElementById("lead-assignee"))==null?void 0:Y.value)||void 0,A=t?Array.from(t.querySelectorAll(".tag-option.selected")).map(k=>k.getAttribute("data-value")):[],z=((V=n==null?void 0:n.querySelector(".radio-pill.selected"))==null?void 0:V.getAttribute("data-value"))||"medium";try{const k=await b.create({name:o,designation:l,linkedinUrl:d,company:m,companyWebsite:p,industry:v,location:L,requirements:A,priority:z,potentialValue:w?Number(w):0,notes:E,ownerId:S});this.close(),a.reset(),g.show(`✓ Lead "${k.name}" saved to MongoDB & Pipeline!`),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}catch(k){g.show(`Failed to save lead: ${k.message}`,"error")}finally{r&&(r.disabled=!1,r.textContent="Save Lead to Pipeline")}})}},_={currentLeadId:null,render(){return`
      <div id="lost-reason-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title" style="color: var(--danger);">Mark Lead as Lost</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-lost-modal">
              ${u("close",{size:20})}
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
    `},open(e){this.currentLeadId=e;const t=document.getElementById("lost-reason-modal");t&&(t.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("lost-reason-modal");e&&(e.style.display="none",document.body.style.overflow="",this.currentLeadId=null)},initListeners(){const e=document.getElementById("lost-reason-modal"),t=document.getElementById("btn-close-lost-modal"),n=document.getElementById("btn-cancel-lost-modal"),a=document.getElementById("lost-reason-form"),s=document.getElementById("other-reason-group");t&&t.addEventListener("click",()=>this.close()),n&&n.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",i=>{i.target===e&&this.close()}),a&&(a.addEventListener("change",i=>{i.target.name==="lost-reason"&&s&&(s.style.display=i.target.value==="Other"?"block":"none")}),a.addEventListener("submit",async i=>{var l;if(i.preventDefault(),!h.isAuthenticated()){g.show("Please log in to update lead status","warning"),this.close();return}if(!this.currentLeadId)return;const o=a.querySelector('input[name="lost-reason"]:checked');let r=o?o.value:"No response";if(r==="Other"){const d=(l=document.getElementById("custom-lost-reason"))==null?void 0:l.value.trim();d&&(r=d)}await b.updateStatus(this.currentLeadId,"lost",{lostReason:r}),g.show(`✓ Lead marked as Lost (${r}) in MongoDB`,"warning"),this.close(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}))}},P={render(){const e=b.getAll();return`
      <div id="schedule-followup-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title">Schedule Follow-up</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-schedule-modal">
              ${u("close",{size:20})}
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
    `},open(){const e=document.getElementById("schedule-followup-modal");e&&(e.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("schedule-followup-modal");if(e){e.style.display="none",document.body.style.overflow="";const t=document.getElementById("schedule-followup-form");t&&t.reset()}},initListeners(){const e=document.getElementById("schedule-followup-modal"),t=document.getElementById("btn-close-schedule-modal"),n=document.getElementById("btn-cancel-schedule-modal"),a=document.getElementById("schedule-followup-form");t&&t.addEventListener("click",()=>this.close()),n&&n.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",s=>{s.target===e&&this.close()}),a&&a.addEventListener("submit",async s=>{var w,E,S;if(s.preventDefault(),!h.isAuthenticated()){g.show("Please log in to schedule tasks","warning"),this.close();return}const i=document.getElementById("followup-lead"),o=i==null?void 0:i.options[i.selectedIndex],r=(i==null?void 0:i.value)||"",l=o?o.getAttribute("data-name"):"Lead",d=o?o.getAttribute("data-company"):"",m=o?o.getAttribute("data-linkedin"):"",p=((w=document.getElementById("followup-task"))==null?void 0:w.value)||"",v=((E=document.getElementById("followup-category"))==null?void 0:E.value)||"upcoming",L=((S=document.getElementById("followup-priority"))==null?void 0:S.value)||"upcoming";try{await ee.create({leadId:r,leadName:l,company:d,task:p,category:v,priority:L,dueLabel:v==="today"?"Today, 4:00 PM":"Next Week",linkedinUrl:m}),g.show("✓ Follow-up saved to MongoDB & scheduled!"),this.close(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}catch(A){g.show(`Failed to save follow-up: ${A.message}`,"error")}})}},R={currentLeadId:null,render(){return`
      <div id="delete-confirm-modal" class="modal-overlay" style="display: none;">
        <div class="modal-dialog modal-dialog-sm">
          <div class="modal-header">
            <h2 class="modal-title" style="color: var(--danger);">Delete Lead?</h2>
            <button type="button" class="btn btn-ghost btn-icon" id="btn-close-delete-modal">
              ${u("close",{size:20})}
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
    `},open(e){const t=b.getById(e);if(!t)return;this.currentLeadId=e;const n=document.getElementById("delete-confirm-modal"),a=document.getElementById("delete-modal-msg");n&&a&&(a.innerHTML=`This will permanently remove <strong>${t.name}</strong> ${t.company?`(${t.company}) `:""}and their activity history.`,n.style.display="flex",document.body.style.overflow="hidden")},close(){const e=document.getElementById("delete-confirm-modal");e&&(e.style.display="none",document.body.style.overflow="",this.currentLeadId=null)},initListeners(){const e=document.getElementById("delete-confirm-modal"),t=document.getElementById("btn-close-delete-modal"),n=document.getElementById("btn-cancel-delete"),a=document.getElementById("btn-confirm-delete");t&&t.addEventListener("click",()=>this.close()),n&&n.addEventListener("click",()=>this.close()),e&&e.addEventListener("click",s=>{s.target===e&&this.close()}),a&&a.addEventListener("click",async()=>{if(!h.isAuthenticated()){g.show("Please log in to manage leads","warning"),this.close();return}if(this.currentLeadId){const s=b.getById(this.currentLeadId),i=s?s.name:"Lead";a.disabled=!0;try{await b.delete(this.currentLeadId),C.close(),this.close(),g.show(`✓ Lead "${i}" deleted from MongoDB`,"danger"),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}finally{a.disabled=!1}}})}},le={activeTab:"signin",render(){return`
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
    `},switchTab(e){this.activeTab=e;const t=document.getElementById("signin-container"),n=document.getElementById("signup-container"),a=document.getElementById("tab-btn-signin"),s=document.getElementById("tab-btn-signup");e==="signin"?(t&&(t.style.display="block"),n&&(n.style.display="none"),a&&(a.style.background="#FFFFFF",a.style.color="var(--primary)",a.style.boxShadow="0 2px 4px rgba(0,0,0,0.06)"),s&&(s.style.background="transparent",s.style.color="var(--text-secondary)",s.style.boxShadow="none")):(t&&(t.style.display="none"),n&&(n.style.display="block"),s&&(s.style.background="#FFFFFF",s.style.color="var(--primary)",s.style.boxShadow="0 2px 4px rgba(0,0,0,0.06)"),a&&(a.style.background="transparent",a.style.color="var(--text-secondary)",a.style.boxShadow="none"))},initListeners(){const e=document.getElementById("tab-btn-signin"),t=document.getElementById("tab-btn-signup");e&&e.addEventListener("click",()=>this.switchTab("signin")),t&&t.addEventListener("click",()=>this.switchTab("signup")),document.querySelectorAll(".btn-toggle-pwd").forEach(s=>{s.addEventListener("click",()=>{const i=s.getAttribute("data-target"),o=document.getElementById(i);if(o){const r=o.getAttribute("type")==="password";o.setAttribute("type",r?"text":"password")}})});const n=document.getElementById("signin-form");n&&n.addEventListener("submit",async s=>{var l,d,m;s.preventDefault();const i=(l=document.getElementById("signin-email"))==null?void 0:l.value.trim(),o=(d=document.getElementById("signin-password"))==null?void 0:d.value,r=n.querySelector('button[type="submit"]');if(!i||!o){g.show("Please enter your email and password","error");return}r&&(r.disabled=!0,r.textContent="Signing in...");try{const p=await h.login(i,o);g.show(`Welcome back, ${((m=p.user)==null?void 0:m.name)||"User"}!`),window.location.hash="#/dashboard",window.location.reload()}catch(p){g.show(p.message||"Login failed","error")}finally{r&&(r.disabled=!1,r.textContent="Sign In to TechCRM")}});const a=document.getElementById("signup-form");a&&a.addEventListener("submit",async s=>{var m,p,v,L,w;s.preventDefault();const i=(m=document.getElementById("signup-name"))==null?void 0:m.value.trim(),o=(p=document.getElementById("signup-email"))==null?void 0:p.value.trim(),r=(v=document.getElementById("signup-password"))==null?void 0:v.value,l=((L=document.getElementById("signup-role"))==null?void 0:L.value.trim())||"Team Member",d=a.querySelector('button[type="submit"]');if(!i||!o||!r){g.show("Name, email and password are required","error");return}if(r.length<6){g.show("Password must be at least 6 characters long","error");return}d&&(d.disabled=!0,d.textContent="Creating account...");try{const E=await h.register(i,o,r,l);g.show(`Account created! Welcome, ${(w=E.user)==null?void 0:w.name}!`),window.location.hash="#/dashboard",window.location.reload()}catch(E){g.show(E.message||"Registration failed","error")}finally{d&&(d.disabled=!1,d.textContent="Create Account & Enter CRM")}})}},J={render(){const e=b.getStats(),t=c.get(c.KEYS.ACTIVITIES,[]),n=h.getCurrentUser();return h.isAdmin(),`
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
              ${u("plus",{size:16})}
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
            ${t.slice(0,5).map(a=>`
              <div style="height: 60px; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; border-radius: 8px; background: #F8FAFC; border: 1px solid var(--border-subtle); transition: background var(--transition-fast);">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="width: 8px; height: 8px; border-radius: 50%; background: ${a.type==="won"?"#16A34A":a.type==="proposal"?"#0284C7":"#6366F1"};"></span>
                  <span style="font-size: 13.5px; font-weight: 500; color: var(--text-main);">${a.text}</span>
                </div>
                <span style="font-size: 12px; color: var(--text-muted);">${a.time}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("btn-dash-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))})}},de={getTechIcon(e){switch(e.toLowerCase()){case"website":return u("globe",{size:12});case"mobile app":case"mobile":return u("smartphone",{size:12});case"ai/ml":case"ai":return u("cpu",{size:12});case"ui/ux":return u("palette",{size:12});case"software":return u("code",{size:12});default:return u("zap",{size:12})}},formatDateTime(e){if(!e)return"Just now";const t=new Date(e);if(isNaN(t.getTime()))return"Recently";const n=t.toLocaleDateString("en-IN",{day:"numeric",month:"short"}),a=t.toLocaleTimeString("en-IN",{hour:"numeric",minute:"2-digit",hour12:!0});return`${n}, ${a}`},render(e){const t=(e.name||"L").split(" ").filter(Boolean).map(S=>S[0]).join("").substring(0,2).toUpperCase()||"L",n=Array.isArray(e.requirements)?e.requirements:[],a=h.getCurrentUser(),s=a?String(a.id||a._id):null,i=h.isAdmin(),o=e.ownerId,r=o?String(o._id||o.id||o):null,l=e.creatorId,d=l?String(l._id||l.id||l):r,m=i||s&&(s===r||s===d),p=e.addedDate||e.createdAt,v=this.formatDateTime(p),L=(o==null?void 0:o.name)||(s&&r===s?"You":"Assigned"),w=(l==null?void 0:l.name)||(s&&d===s?"You":"");let E="";return e.priority==="high"?E=`<span class="badge badge-priority-high" style="display: inline-flex; align-items: center; gap: 4px;">${u("flame",{size:12,color:"#DC2626"})} High</span>`:e.priority==="medium"?E='<span class="badge badge-priority-medium">Medium</span>':E='<span class="badge badge-priority-low">Low</span>',`
      <div 
        class="lead-card ${m?"":"lead-card-readonly"}" 
        draggable="${m?"true":"false"}" 
        data-id="${e.id||e._id}" 
        data-status="${e.status}"
        title="${m?"Drag to move stage, click to open":"View Only (Only creator & assignee can edit/move)"}"
        style="${m?"":"border-left: 3px solid #CBD5E1; opacity: 0.95;"}"
      >
        <div class="lead-card-header" style="display: flex; align-items: flex-start; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
            <div class="lead-card-avatar">${t}</div>
            <div class="lead-card-name" title="${e.name}">${e.name}</div>
          </div>
          ${m?"":`
            <span class="badge" style="font-size: 10px; padding: 2px 6px; background: #F1F5F9; color: #64748B; border: 1px solid #E2E8F0; display: inline-flex; align-items: center; gap: 3px;" title="View only mode">
              🔒 View
            </span>
          `}
        </div>

        <div class="lead-card-company" title="${e.company||"Direct Outreach"}">${e.company||"—"}</div>
        <div class="lead-card-designation" title="${e.designation||"Prospect"}">${e.designation||"Prospect"}</div>

        <div class="lead-card-tags">
          ${n.slice(0,2).map(S=>`
            <span class="tag-chip">
              <span>${this.getTechIcon(S)}</span>
              <span>${S}</span>
            </span>
          `).join("")}
          ${E}
        </div>

        <!-- Date, Time and Owner Tracking -->
        <div class="lead-card-meta-track" style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #E2E8F0; display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
          <span title="Added: ${v}${w?` by ${w}`:""}" style="display: inline-flex; align-items: center; gap: 3px;">
            🕒 ${v}
          </span>
          <span style="font-weight: 500; color: #475569; display: inline-flex; align-items: center; gap: 3px;" title="Assigned to ${L}">
            👤 ${L}
          </span>
        </div>

        <div class="lead-card-footer" style="margin-top: 6px;">
          ${w?`<span style="font-size: 10.5px; color: #94A3B8;">By ${w}</span>`:"<span></span>"}
          ${e.potentialValue?`<span style="font-weight: 600; color: #4F46E5;">₹${(e.potentialValue/1e3).toFixed(0)}k</span>`:""}
        </div>
      </div>
    `}},X={render(e,t=[]){const n=t.filter(a=>a.status===e.id);return`
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
          `:n.map(a=>de.render(a)).join("")}
        </div>
      </div>
    `}},ce={currentSearch:"",currentPriority:"all",currentRequirement:"all",currentDateRange:"all",draggedLeadId:null,getStages(){return c.get(c.KEYS.PIPELINE_STAGES,[{id:"new",name:"New Leads",visible:!0},{id:"request_sent",name:"Request Sent",visible:!0},{id:"connected",name:"Connected",visible:!0},{id:"followup_scheduled",name:"Follow-up Scheduled",visible:!0},{id:"qualified",name:"Qualified",visible:!0},{id:"proposal",name:"Proposal",visible:!0},{id:"won",name:"Won",visible:!0}])},matchesDateRange(e){if(this.currentDateRange==="all")return!0;const t=e.addedDate||e.createdAt;if(!t)return!1;const n=new Date(t).getTime(),s=(Date.now()-n)/(1e3*60*60*24);return this.currentDateRange==="7days"?s<=7:this.currentDateRange==="30days"?s<=30:this.currentDateRange==="1year"?s<=365:!0},render(){const e=b.getAll(),t=this.getStages();h.isAdmin();const n=t.filter(s=>s.visible!==!1);let a=e.filter(s=>{const i=this.currentSearch.toLowerCase(),o=!i||s.name&&s.name.toLowerCase().includes(i)||s.company&&s.company.toLowerCase().includes(i),r=this.currentPriority==="all"||s.priority===this.currentPriority,l=this.currentRequirement==="all"||Array.isArray(s.requirements)&&s.requirements.some(m=>m.toLowerCase().includes(this.currentRequirement.toLowerCase())),d=this.matchesDateRange(s);return o&&r&&l&&d});return`
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
                  ${u("columns",{size:15})}
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
                ${u("plus",{size:16})}
                Add Lead
              </button>
          </div>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: var(--space-20); flex-wrap: wrap;">
          <div style="display: flex; gap: 12px; align-items: center; flex: 1; min-width: 280px; max-width: 450px;">
            <div class="search-input-wrapper" style="width: 100%;">
              ${u("search",{size:15})}
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
            `:n.map(s=>X.render(s,a)).join("")}
          </div>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("btn-pipeline-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))});const t=document.getElementById("pipeline-search");t&&t.addEventListener("input",o=>{this.currentSearch=o.target.value.toLowerCase().trim(),this.refreshBoard()});const n=document.getElementById("pipeline-filter-priority");n&&n.addEventListener("change",o=>{this.currentPriority=o.target.value,this.refreshBoard()});const a=document.getElementById("pipeline-filter-tech");a&&a.addEventListener("change",o=>{this.currentRequirement=o.target.value,this.refreshBoard()});const s=document.getElementById("pipeline-filter-date");s&&s.addEventListener("change",o=>{this.currentDateRange=o.target.value,this.refreshBoard()});const i=document.getElementById("btn-reset-filters");i&&i.addEventListener("click",()=>{this.currentSearch="",this.currentPriority="all",this.currentRequirement="all",this.currentDateRange="all";const o=document.getElementById("pipeline-search");o&&(o.value="");const r=document.getElementById("pipeline-filter-priority");r&&(r.value="all");const l=document.getElementById("pipeline-filter-tech");l&&(l.value="all");const d=document.getElementById("pipeline-filter-date");d&&(d.value="all"),this.refreshBoard()}),this.initColumnCustomizer(),this.bindKanbanInteractions()},initColumnCustomizer(){const e=document.getElementById("btn-toggle-column-menu"),t=document.getElementById("column-customize-dropdown"),n=document.getElementById("btn-submit-new-column"),a=document.getElementById("input-new-column-name");if(!e||!t)return;e.addEventListener("click",i=>{i.stopPropagation();const o=t.style.display==="none"||!t.style.display;t.style.display=o?"block":"none",o&&this.renderColumnCheckboxes()}),document.addEventListener("click",i=>{!t.contains(i.target)&&i.target!==e&&(t.style.display="none")}),this.renderColumnCheckboxes();const s=()=>{const i=a.value.trim();if(!i)return;const r={id:"stage_"+Date.now(),name:i,visible:!0},l=this.getStages();l.push(r),c.set(c.KEYS.PIPELINE_STAGES,l),a.value="",this.renderColumnCheckboxes(),this.refreshBoard(),g.show(`✓ Added column "${i}"`)};n&&n.addEventListener("click",s),a&&a.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),s())})},renderColumnCheckboxes(){const e=document.getElementById("column-checkboxes-container");if(!e)return;const t=this.getStages(),n=["new","request_sent","connected","followup_scheduled","qualified","proposal","won"];e.innerHTML=t.map((i,o)=>{const r=n.includes(i.id);return`
        <div class="col-drag-item" draggable="true" data-index="${o}" style="display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; border-radius: 6px; font-size: 13px; background: #F8FAFC; border: 1px solid var(--border-subtle); cursor: grab; user-select: none; transition: background 0.15s ease;">
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
            <button class="btn-move-col-up" data-index="${o}" title="Move up" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--text-secondary);" ${o===0?'disabled style="opacity:0.3; cursor:not-allowed; width: 22px; height: 22px;"':""}>↑</button>
            <button class="btn-move-col-down" data-index="${o}" title="Move down" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 11px; color: var(--text-secondary);" ${o===t.length-1?'disabled style="opacity:0.3; cursor:not-allowed; width: 22px; height: 22px;"':""}>↓</button>
            
            <!-- Delete Button: SIRF custom added columns ke liye dikhega, default columns ke liye nahi -->
            ${r?"":`
              <button class="btn-delete-column" data-stage-id="${i.id}" title="Delete column" style="background: #FEE2E2; border: 1px solid #FECACA; border-radius: 4px; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; color: #DC2626; cursor: pointer; font-size: 12px; font-weight: bold;">✕</button>
            `}
          </div>
        </div>
      `}).join("");let a=null;const s=e.querySelectorAll(".col-drag-item");s.forEach(i=>{i.addEventListener("dragstart",o=>{a=parseInt(i.getAttribute("data-index"),10),o.dataTransfer.effectAllowed="move",i.style.opacity="0.4"}),i.addEventListener("dragend",()=>{i.style.opacity="1",s.forEach(o=>{o.style.borderTop="1px solid var(--border-subtle)",o.style.background="#F8FAFC"})}),i.addEventListener("dragover",o=>{o.preventDefault(),o.dataTransfer.dropEffect="move",i.style.background="#EEF2FF"}),i.addEventListener("dragleave",()=>{i.style.background="#F8FAFC"}),i.addEventListener("drop",o=>{o.preventDefault(),i.style.background="#F8FAFC";const r=parseInt(i.getAttribute("data-index"),10);if(a!==null&&a!==r){const l=this.getStages(),[d]=l.splice(a,1);l.splice(r,0,d),c.set(c.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard(),g.show(`✓ Column moved to position ${r+1}`)}})}),e.querySelectorAll(".column-visibility-toggle").forEach(i=>{i.addEventListener("change",o=>{const r=i.getAttribute("data-stage-id"),l=this.getStages(),d=l.find(m=>m.id===r);d&&(d.visible=o.target.checked,c.set(c.KEYS.PIPELINE_STAGES,l),this.refreshBoard())})}),e.querySelectorAll(".btn-move-col-up").forEach(i=>{i.addEventListener("click",o=>{o.stopPropagation();const r=parseInt(i.getAttribute("data-index"),10),l=this.getStages();if(r>0){const d=l[r];l[r]=l[r-1],l[r-1]=d,c.set(c.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard()}})}),e.querySelectorAll(".btn-move-col-down").forEach(i=>{i.addEventListener("click",o=>{o.stopPropagation();const r=parseInt(i.getAttribute("data-index"),10),l=this.getStages();if(r<l.length-1){const d=l[r];l[r]=l[r+1],l[r+1]=d,c.set(c.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard()}})}),e.querySelectorAll(".btn-delete-column").forEach(i=>{i.addEventListener("click",o=>{var m;o.stopPropagation();const r=i.getAttribute("data-stage-id");let l=this.getStages();if(n.includes(r)){g.show("Default columns cannot be deleted","warning");return}const d=((m=l.find(p=>p.id===r))==null?void 0:m.name)||"Column";l=l.filter(p=>p.id!==r),c.set(c.KEYS.PIPELINE_STAGES,l),this.renderColumnCheckboxes(),this.refreshBoard(),g.show(`✓ "${d}" removed`)})})},bindKanbanInteractions(){const e=document.getElementById("app");if(!e)return;h.isAdmin(),e.querySelectorAll(".lead-card").forEach(n=>{n.addEventListener("click",()=>{if(n.classList.contains("is-dragging"))return;const a=n.getAttribute("data-id");a&&C.open(a)}),n.addEventListener("dragstart",a=>{if(n.getAttribute("draggable")==="false"){a.preventDefault(),g.show("View Only: Only the creator or assigned member can move this lead","warning");return}this.draggedLeadId=n.getAttribute("data-id"),n.classList.add("is-dragging"),a.dataTransfer.effectAllowed="move",a.dataTransfer.setData("text/plain",this.draggedLeadId)}),n.addEventListener("dragend",()=>{n.classList.remove("is-dragging"),this.draggedLeadId=null,document.querySelectorAll(".drag-over").forEach(a=>a.classList.remove("drag-over"))})}),e.querySelectorAll(".kanban-column").forEach(n=>{n.addEventListener("dragover",a=>{a.preventDefault(),a.dataTransfer.dropEffect="move",n.classList.add("drag-over")}),n.addEventListener("dragleave",a=>{n.contains(a.relatedTarget)||n.classList.remove("drag-over")}),n.addEventListener("drop",a=>{a.preventDefault(),n.classList.remove("drag-over");const s=a.dataTransfer.getData("text/plain")||this.draggedLeadId,i=n.getAttribute("data-stage");s&&i&&this.handleLeadDrop(s,i)})})},async handleLeadDrop(e,t){const n=b.getById(e);if(!n||n.status===t)return;const a=h.getCurrentUser(),s=a?String(a.id||a._id):null,i=h.isAdmin(),o=n.ownerId,r=o?String(o._id||o.id||o):null,l=n.creatorId,d=l?String(l._id||l.id||l):r;if(!(i||s&&(s===r||s===d))){g.show("Permission denied: Only the lead creator or assignee can move this lead","error"),this.refreshBoard();return}if(t==="lost")_.open(e);else try{await b.updateStatus(e,t);const p=t.replace("_"," ");g.show(`✓ Lead "${n.name}" moved to ${p.toUpperCase()}`),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}catch(p){g.show(p.message||"Failed to move lead","error"),this.refreshBoard()}},refreshBoard(){if(document.querySelector(".kanban-wrapper")){const n=this.getStages().filter(o=>o.visible!==!1),s=b.getAll().filter(o=>{const r=!this.currentSearch||o.name&&o.name.toLowerCase().includes(this.currentSearch)||o.company&&o.company.toLowerCase().includes(this.currentSearch),l=this.currentPriority==="all"||o.priority===this.currentPriority,d=this.currentRequirement==="all"||Array.isArray(o.requirements)&&o.requirements.some(p=>p.toLowerCase().includes(this.currentRequirement.toLowerCase())),m=this.matchesDateRange(o);return r&&l&&d&&m}),i=document.getElementById("kanban-board-container");i&&(i.innerHTML=n.length===0?`
          <div style="padding: 40px; text-align: center; color: var(--text-muted); width: 100%;">
            No columns selected. Click <strong>Columns ▾</strong> above to show columns.
          </div>
        `:n.map(o=>X.render(o,s)).join(""),this.bindKanbanInteractions())}}},Z={teamMembers:[],allTeamLeads:[],selectedMemberId:"all",searchQuery:"",statusFilter:"all",priorityFilter:"all",isLoading:!1,async fetchData(){this.isLoading=!0;try{const e=await f.get("/auth/users");e&&Array.isArray(e.users)&&(this.teamMembers=e.users);const t=await b.fetchTeamLeads({scope:"team"});Array.isArray(t)&&(this.allTeamLeads=t)}catch(e){console.warn("Error loading team data:",e.message)}finally{this.isLoading=!1}},getStageBadge(e){const n={new:{label:"New Lead",bg:"#F1F5F9",color:"#475569",border:"#E2E8F0"},request_sent:{label:"Request Sent",bg:"#FEF3C7",color:"#D97706",border:"#FDE68A"},connected:{label:"Connected",bg:"#DCFCE7",color:"#15803D",border:"#BBF7D0"},followup_scheduled:{label:"Follow-up Scheduled",bg:"#E0F2FE",color:"#0284C7",border:"#BAE6FD"},qualified:{label:"Qualified",bg:"#F3E8FF",color:"#7E22CE",border:"#E9D5FF"},proposal:{label:"Proposal Sent",bg:"#E0E7FF",color:"#4338CA",border:"#C7D2FE"},won:{label:"Won Deal 🏆",bg:"#DCFCE7",color:"#166534",border:"#86EFAC"},lost:{label:"Lost",bg:"#FEE2E2",color:"#991B1B",border:"#FECACA"}}[e]||{label:(e||"New").replace("_"," "),bg:"#F1F5F9",color:"#475569",border:"#E2E8F0"};return`<span class="badge" style="background: ${n.bg}; color: ${n.color}; border: 1px solid ${n.border}; font-weight: 600; padding: 4px 10px; font-size: 11.5px; border-radius: 6px;">${n.label}</span>`},getPriorityBadge(e){return e==="high"?`<span class="badge badge-priority-high" style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; font-size: 11px;">${u("flame",{size:11,color:"#DC2626"})} High</span>`:e==="medium"?'<span class="badge badge-priority-medium" style="padding: 3px 8px; font-size: 11px;">Medium</span>':'<span class="badge badge-priority-low" style="padding: 3px 8px; font-size: 11px;">Low</span>'},render(){const e=h.getCurrentUser()||{id:"",email:""},t=e.id||e._id,n=this.allTeamLeads.length,a=this.allTeamLeads.filter(i=>{var o,r,l;if(this.selectedMemberId!=="all"&&(typeof i.ownerId=="object"?((o=i.ownerId)==null?void 0:o._id)||((r=i.ownerId)==null?void 0:r.id):i.ownerId)!==this.selectedMemberId||this.statusFilter!=="all"&&i.status!==this.statusFilter||this.priorityFilter!=="all"&&i.priority!==this.priorityFilter)return!1;if(this.searchQuery){const d=this.searchQuery.toLowerCase(),m=i.name&&i.name.toLowerCase().includes(d),p=i.company&&i.company.toLowerCase().includes(d),v=typeof i.ownerId=="object"?(l=i.ownerId)==null?void 0:l.name:"",L=v&&v.toLowerCase().includes(d);return m||p||L}return!0}),s=this.selectedMemberId==="all"?null:this.teamMembers.find(i=>(i.id||i._id)===this.selectedMemberId);return`
      <div class="page-container">
        <!-- Header -->
        <div class="page-header">
          <div class="page-title-group">
            <h1>Team & Lead Management</h1>
            <p>Collaborative pipeline overview, member workloads, and real-time status tracking</p>
          </div>
          <div style="display: flex; gap: 10px; align-items: center;">
            <button class="btn btn-secondary" id="btn-refresh-team" style="display: inline-flex; align-items: center; gap: 6px;">
              🔄 Refresh
            </button>
            <button class="btn btn-primary" id="btn-team-add-lead">
              ${u("plus",{size:16})}
              Add Lead
            </button>
          </div>
        </div>

        <!-- Team Members Selection Pills -->
        <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); padding: 16px 20px; box-shadow: var(--shadow-sm); margin-bottom: 20px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="font-size: 13px; font-weight: 700; color: var(--text-main); text-transform: uppercase; letter-spacing: 0.03em;">
              Filter by Team Member
            </div>
            <span style="font-size: 12px; color: var(--text-muted);">Click a member to view their leads</span>
          </div>

          <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px; flex-wrap: wrap;">
            <!-- All Team Pill -->
            <button class="btn btn-member-pill ${this.selectedMemberId==="all"?"active":""}" data-member-id="all" style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 20px; border: 1px solid ${this.selectedMemberId==="all"?"var(--primary)":"var(--border-color)"}; background: ${this.selectedMemberId==="all"?"#EEF2FF":"#FFFFFF"}; color: ${this.selectedMemberId==="all"?"var(--primary)":"var(--text-main)"}; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s ease;">
              <span>🌐 All Team</span>
              <span class="badge" style="background: ${this.selectedMemberId==="all"?"#C7D2FE":"#F1F5F9"}; color: ${this.selectedMemberId==="all"?"#3730A3":"#64748B"}; font-size: 11px;">${n}</span>
            </button>

            <!-- Individual Member Pills -->
            ${this.teamMembers.map(i=>{const o=this.selectedMemberId===(i.id||i._id),r=(i.id||i._id)===t||i.email&&e.email&&i.email.toLowerCase()===e.email.toLowerCase(),l=i.leadsCount??this.allTeamLeads.filter(d=>{var p,v;return(typeof d.ownerId=="object"?((p=d.ownerId)==null?void 0:p._id)||((v=d.ownerId)==null?void 0:v.id):d.ownerId)===(i.id||i._id)}).length;return`
                <button class="btn btn-member-pill ${o?"active":""}" data-member-id="${i.id||i._id}" style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 20px; border: 1px solid ${o?"var(--primary)":"var(--border-color)"}; background: ${o?"#EEF2FF":"#FFFFFF"}; color: ${o?"var(--primary)":"var(--text-main)"}; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s ease;">
                  <div class="avatar" style="width: 22px; height: 22px; font-size: 10px; font-weight: 700;">${i.avatar||"U"}</div>
                  <span>${i.name}</span>
                  ${r?'<span style="font-size: 10px; font-weight: 700; color: #4F46E5; background: #E0E7FF; padding: 1px 6px; border-radius: 10px;">You</span>':""}
                  <span class="badge" style="background: ${o?"#C7D2FE":"#F1F5F9"}; color: ${o?"#3730A3":"#64748B"}; font-size: 11px;">${l}</span>
                </button>
              `}).join("")}
          </div>
        </div>

        <!-- Leads Filter & Table Card -->
        <div class="card" style="background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--radius-card); box-shadow: var(--shadow-sm); overflow: hidden;">
          <!-- Search & Filter Controls -->
          <div style="padding: 16px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div style="display: flex; gap: 10px; align-items: center; flex: 1; min-width: 240px; max-width: 400px;">
              <div class="search-input-wrapper" style="width: 100%;">
                ${u("search",{size:15})}
                <input type="text" id="team-lead-search" class="input" placeholder="Search leads by name, company, or assignee..." value="${this.searchQuery}" />
              </div>
            </div>

            <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
              <!-- Status Filter -->
              <select id="team-filter-status" class="select" style="width: auto; font-size: 13px;">
                <option value="all" ${this.statusFilter==="all"?"selected":""}>All Stages</option>
                <option value="new" ${this.statusFilter==="new"?"selected":""}>New Leads</option>
                <option value="request_sent" ${this.statusFilter==="request_sent"?"selected":""}>Request Sent</option>
                <option value="connected" ${this.statusFilter==="connected"?"selected":""}>Connected</option>
                <option value="followup_scheduled" ${this.statusFilter==="followup_scheduled"?"selected":""}>Follow-up Scheduled</option>
                <option value="qualified" ${this.statusFilter==="qualified"?"selected":""}>Qualified</option>
                <option value="proposal" ${this.statusFilter==="proposal"?"selected":""}>Proposal Sent</option>
                <option value="won" ${this.statusFilter==="won"?"selected":""}>Won Deals 🏆</option>
                <option value="lost" ${this.statusFilter==="lost"?"selected":""}>Lost</option>
              </select>

              <!-- Priority Filter -->
              <select id="team-filter-priority" class="select" style="width: auto; font-size: 13px;">
                <option value="all" ${this.priorityFilter==="all"?"selected":""}>All Priorities</option>
                <option value="high" ${this.priorityFilter==="high"?"selected":""}>🔥 High Priority</option>
                <option value="medium" ${this.priorityFilter==="medium"?"selected":""}>Medium Priority</option>
                <option value="low" ${this.priorityFilter==="low"?"selected":""}>Low Priority</option>
              </select>

              <button class="btn btn-ghost btn-sm" id="btn-reset-team-filter" style="font-size: 12px;">Reset</button>
            </div>
          </div>

          <!-- Active Filter Banner (if filtering by specific member) -->
          ${s?`
            <div style="background: #F8FAFC; border-bottom: 1px solid var(--border-subtle); padding: 10px 20px; font-size: 12.5px; color: var(--text-secondary); display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span>Viewing leads assigned to:</span>
                <strong>${s.name}</strong>
                <span class="badge" style="background: #EEF2FF; color: #4F46E5;">${s.role||"Member"}</span>
              </div>
              <button id="btn-clear-member-filter" style="background: none; border: none; color: var(--primary); font-size: 12px; cursor: pointer; font-weight: 600;">Clear filter ✕</button>
            </div>
          `:""}

          <!-- Leads Table -->
          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
              <thead>
                <tr style="background: #F8FAFC; border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 12px; text-transform: uppercase;">
                  <th style="padding: 12px 20px;">Lead & Company</th>
                  <th style="padding: 12px 20px;">Assigned To</th>
                  <th style="padding: 12px 20px;">Pipeline Stage / Status</th>
                  <th style="padding: 12px 20px;">Priority</th>
                  <th style="padding: 12px 20px;">Potential Value</th>
                  <th style="padding: 12px 20px; text-align: right;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${a.length===0?`
                  <tr>
                    <td colspan="6" style="padding: 40px 20px; text-align: center; color: var(--text-muted);">
                      <div style="font-size: 24px; margin-bottom: 8px;">🔍</div>
                      <div style="font-weight: 600; font-size: 14px; color: var(--text-main);">No leads found</div>
                      <div style="font-size: 12.5px; margin-top: 4px;">Try adjusting your member or search filters</div>
                    </td>
                  </tr>
                `:a.map(i=>{const o=typeof i.ownerId=="object"&&i.ownerId?i.ownerId:null,r=o?o.name:"Unassigned",l=o?o.avatar||o.name.charAt(0).toUpperCase():"U",d=o&&(o._id===t||o.id===t);return`
                    <tr style="height: 60px; border-bottom: 1px solid var(--border-subtle); transition: background 0.15s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='#FFFFFF'">
                      <!-- Lead & Company -->
                      <td style="padding: 12px 20px;">
                        <div style="font-weight: 600; color: var(--text-main);">${i.name}</div>
                        <div style="font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 6px; margin-top: 2px;">
                          <span>${i.company||"Direct Outreach"}</span>
                          ${i.linkedinUrl?`
                            <a href="${i.linkedinUrl}" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" style="color: #0A66C2; display: inline-flex; align-items: center;">
                              ${u("linkedin",{size:12})}
                            </a>
                          `:""}
                        </div>
                      </td>

                      <!-- Assigned To -->
                      <td style="padding: 12px 20px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <div class="avatar" style="width: 26px; height: 26px; font-size: 11px; font-weight: 700;">${l}</div>
                          <div>
                            <span style="font-weight: 500; color: var(--text-main); font-size: 13px;">${r}</span>
                            ${d?'<span style="font-size: 10px; font-weight: 700; color: #4F46E5; background: #EEF2FF; padding: 1px 5px; border-radius: 8px; margin-left: 4px;">You</span>':""}
                          </div>
                        </div>
                      </td>

                      <!-- Status Badge / Quick Switcher -->
                      <td style="padding: 12px 20px;">
                        <div style="display: inline-flex; align-items: center; gap: 6px;">
                          ${this.getStageBadge(i.status)}
                          <select class="select team-lead-status-select" data-lead-id="${i.id}" style="width: auto; padding: 3px 8px; height: 26px; font-size: 11.5px; border-radius: 4px; border-color: var(--border-color); background: #F8FAFC;">
                            <option value="new" ${i.status==="new"?"selected":""}>New</option>
                            <option value="request_sent" ${i.status==="request_sent"?"selected":""}>Request Sent</option>
                            <option value="connected" ${i.status==="connected"?"selected":""}>Connected</option>
                            <option value="followup_scheduled" ${i.status==="followup_scheduled"?"selected":""}>Follow-up</option>
                            <option value="qualified" ${i.status==="qualified"?"selected":""}>Qualified</option>
                            <option value="proposal" ${i.status==="proposal"?"selected":""}>Proposal</option>
                            <option value="won" ${i.status==="won"?"selected":""}>Won 🏆</option>
                            <option value="lost" ${i.status==="lost"?"selected":""}>Lost</option>
                          </select>
                        </div>
                      </td>

                      <!-- Priority -->
                      <td style="padding: 12px 20px;">
                        ${this.getPriorityBadge(i.priority)}
                      </td>

                      <!-- Deal Value -->
                      <td style="padding: 12px 20px; font-weight: 600; color: #4F46E5;">
                        ${i.potentialValue?`₹${Number(i.potentialValue).toLocaleString("en-IN")}`:'<span style="color: var(--text-muted); font-size: 12px; font-weight: normal;">—</span>'}
                      </td>

                      <!-- Action -->
                      <td style="padding: 12px 20px; text-align: right;">
                        <button class="btn btn-secondary btn-sm btn-view-lead" data-lead-id="${i.id}" style="font-size: 12px; padding: 4px 12px; border-radius: 6px;">
                          View Details →
                        </button>
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `},initListeners(){const e=document.getElementById("btn-team-add-lead");e&&e.addEventListener("click",()=>{window.dispatchEvent(new CustomEvent("techcrm:open-add-lead"))});const t=document.getElementById("btn-refresh-team");t&&t.addEventListener("click",async()=>{t.disabled=!0,t.textContent="Refreshing...",await this.fetchData(),g.show("✓ Team pipeline data synced with MongoDB"),this.reRender()}),document.querySelectorAll(".btn-member-pill").forEach(r=>{r.addEventListener("click",()=>{this.selectedMemberId=r.getAttribute("data-member-id"),this.reRender()})});const n=document.getElementById("btn-clear-member-filter");n&&n.addEventListener("click",()=>{this.selectedMemberId="all",this.reRender()});const a=document.getElementById("team-lead-search");a&&a.addEventListener("input",r=>{this.searchQuery=r.target.value.trim(),this.reRender()});const s=document.getElementById("team-filter-status");s&&s.addEventListener("change",r=>{this.statusFilter=r.target.value,this.reRender()});const i=document.getElementById("team-filter-priority");i&&i.addEventListener("change",r=>{this.priorityFilter=r.target.value,this.reRender()});const o=document.getElementById("btn-reset-team-filter");o&&o.addEventListener("click",()=>{this.searchQuery="",this.statusFilter="all",this.priorityFilter="all",this.selectedMemberId="all",this.reRender()}),document.querySelectorAll(".team-lead-status-select").forEach(r=>{r.addEventListener("change",async l=>{const d=r.getAttribute("data-lead-id"),m=l.target.value;try{r.disabled=!0,await b.updateStatus(d,m),g.show(`✓ Lead stage moved to ${m.replace("_"," ").toUpperCase()}`),await this.fetchData(),this.reRender(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}catch(p){g.show(`Failed to update status: ${p.message}`,"error"),r.disabled=!1}})}),document.querySelectorAll(".btn-view-lead").forEach(r=>{r.addEventListener("click",()=>{const l=r.getAttribute("data-lead-id");l&&C.open(l)})})},reRender(){const e=document.getElementById("app");if(e&&window.location.hash.startsWith("#/team")){const t=e.querySelector("#main-content-area");t&&(t.innerHTML=this.render(),this.initListeners())}}},pe={currentSection:"profile",teamUsers:[],isLoadingUsers:!1,async fetchTeamMembers(){this.isLoadingUsers=!0;try{const e=await f.get("/auth/users");e&&e.users&&(this.teamUsers=e.users)}catch(e){console.warn("Could not fetch team users:",e.message)}finally{this.isLoadingUsers=!1}},render(){const e=h.getCurrentUser()||{name:"User",email:"",role:"Team Member",avatar:"U"},t=h.isSystemAdmin(),n=this.teamUsers.length>0?this.teamUsers:[{id:e.id||"me",name:e.name,email:e.email,role:e.role||"Team Member",leadsCount:"Mine",isAdmin:t,avatar:e.avatar||"U"}];return`
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
                ${n.map(a=>{const s=a.email&&e.email&&a.email.toLowerCase()===e.email.toLowerCase();return`
                    <tr style="height: 60px; border-bottom: 1px solid var(--border-subtle);">
                      <td style="padding: 12px 20px;">
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <div class="avatar" style="width: 34px; height: 34px; font-size: 12px; font-weight: 600;">${a.avatar||"U"}</div>
                          <div>
                            <span style="font-weight: 600; color: var(--text-main);">${a.name}</span>
                            <div style="font-size: 11.5px; color: var(--text-muted);">${a.email||""}</div>
                          </div>
                        </div>
                      </td>
                      <td style="padding: 12px 20px;">
                        ${a.isAdmin?`<span class="badge" style="background: #EEF2FF; color: #4338CA; border: 1px solid #C7D2FE; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">${u("crown",{size:12,color:"#4338CA"})} Admin</span>`:'<span class="badge" style="background: #F1F5F9; color: #64748B; font-weight: 500;">Team Member</span>'}
                        <div style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">${a.role||"Member"}</div>
                      </td>
                      <td style="padding: 12px 20px; font-weight: 600; color: var(--text-main);">${a.leadsCount??0}</td>
                      <td style="padding: 12px 20px; text-align: right;">
                        ${s?'<span class="badge" style="background: #EEF2FF; color: #4F46E5;">You</span>':t?a.isAdmin?`<button class="btn btn-secondary btn-sm btn-toggle-role" data-user-id="${a.id}" data-make-admin="false" style="color: #DC2626; border-color: #FECACA; font-size: 12px; padding: 4px 10px;" title="Revoke Admin Access">Revoke Admin</button>`:`<button class="btn btn-primary btn-sm btn-toggle-role" data-user-id="${a.id}" data-make-admin="true" style="font-size: 12px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 4px;" title="Promote user to Admin">${u("crown",{size:12,color:"#ffffff"})} Make Admin</button>`:'<span style="color: var(--text-muted); font-size: 12px;">—</span>'}
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `:""}
      </div>
    `},initListeners(){const e=document.getElementById("tab-sec-profile"),t=document.getElementById("tab-sec-team");e&&e.addEventListener("click",()=>{this.currentSection="profile",this.reRender()}),t&&t.addEventListener("click",async()=>{this.currentSection="team",await this.fetchTeamMembers(),this.reRender()}),document.querySelectorAll(".btn-toggle-role").forEach(a=>{a.addEventListener("click",async s=>{const i=s.currentTarget.getAttribute("data-user-id"),o=s.currentTarget.getAttribute("data-make-admin")==="true";try{a.disabled=!0;const r=await f.patch(`/auth/users/${i}/role`,{isAdmin:o});g.show(r.message||(o?"✓ User promoted to Admin":"✓ Admin rights revoked")),await this.fetchTeamMembers(),this.reRender()}catch(r){g.show(`❌ Error: ${r.message}`,"error"),a.disabled=!1}})});const n=document.getElementById("btn-invite-member");n&&n.addEventListener("click",()=>{g.show("Invitation link copied to clipboard!")})},reRender(){const e=document.getElementById("app");if(e&&window.location.hash.startsWith("#/settings")){const t=e.querySelector(".page-container");t&&(t.outerHTML=this.render(),this.initListeners())}}};class ue{constructor(){this.appEl=document.getElementById("app"),this.modalRoot=document.getElementById("modal-root"),this.currentRoute="/dashboard",this.routes={"/login":le,"/dashboard":J,"/pipeline":ce,"/team":Z,"/settings":pe},this.init()}async init(){c.init(),localStorage.getItem("techcrm_sidebar_collapsed")==="true"&&document.body.classList.add("sidebar-collapsed"),this.mountModals(),this.registerGlobalEvents(),window.addEventListener("hashchange",()=>this.handleRoute()),window.location.hash?await this.handleRoute():window.location.hash="#/dashboard"}mountModals(){this.modalRoot&&(this.modalRoot.innerHTML=`
        ${C.render()}
        ${M.render()}
        ${_.render()}
        ${P.render()}
        ${R.render()}
      `,C.initGlobalListeners(),M.initListeners(),_.initListeners(),P.initListeners(),R.initListeners())}registerGlobalEvents(){window.addEventListener("techcrm:open-add-lead",()=>{if(!h.isAuthenticated()){window.location.hash="#/login";return}M.open()}),window.addEventListener("techcrm:open-schedule-followup",()=>{if(!h.isAuthenticated()){window.location.hash="#/login";return}P.open()}),window.addEventListener("techcrm:confirm-delete",t=>{var n;if(!h.isAuthenticated()){window.location.hash="#/login";return}(n=t.detail)!=null&&n.leadId&&R.open(t.detail.leadId)}),window.addEventListener("techcrm:data-changed",()=>{this.renderCurrentView()})}getRoutePath(){const t=window.location.hash.slice(1);return t&&t.split("?")[0]||"/dashboard"}async handleRoute(){const t=this.getRoutePath();if(h.getToken())try{if(!await h.validateSession()&&t!=="/login"){window.location.hash="#/login";return}}catch{if(h.clearSession(),t!=="/login"){window.location.hash="#/login";return}}if(t!=="/login"&&!h.isAuthenticated()){window.location.hash="#/login";return}if(t==="/login"&&h.isAuthenticated()){window.location.hash="#/dashboard";return}if(this.currentRoute=t,t==="/team")try{await Z.fetchData()}catch(n){console.warn("Team data preload error:",n)}h.isAuthenticated()&&t!=="/login"&&Promise.all([b.fetchFromMongoDB(),ee.fetchFromMongoDB()]).then(()=>{this.renderCurrentView(),window.dispatchEvent(new CustomEvent("techcrm:data-changed"))}).catch(n=>{console.warn("Error fetching CRM data:",n.message)}),this.renderCurrentView()}renderCurrentView(){const t=this.routes[this.currentRoute]||J;if(this.currentRoute==="/login"){this.appEl.innerHTML=t.render(),t.initListeners();return}this.appEl.innerHTML=`
      <div class="app-shell">
        ${Q.render(this.currentRoute)}
        <div class="main-wrapper">
          ${G.render()}
          <main id="main-content-area">
            ${t.render()}
          </main>
        </div>
        ${re.render(this.currentRoute)}
      </div>
    `,G.initListeners(),Q.initListeners(),t.initListeners&&t.initListeners()}}new ue;
