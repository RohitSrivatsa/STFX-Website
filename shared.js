/* Shared sample data + helpers for options B–E. Replace RAW with real faculty data. */
const AREAS = [
  {id:'climate', name:'Climate & Environment'}, {id:'ocean', name:'Coastal & Ocean Science'},
  {id:'health', name:'Health & Wellbeing'}, {id:'data', name:'Data, AI & Computing'},
  {id:'community', name:'Indigenous & Community Studies'}, {id:'economy', name:'Business & Economy'},
  {id:'culture', name:'Culture, Language & Heritage'}, {id:'education', name:'Education & Learning'},
];
const DEPTS = {
  'Biology':['BIOL','Science'], 'Chemistry':['CHEM','Science'], 'Computer Science':['CSCI','Science'],
  'Earth Sciences':['ESCI','Science'], 'Mathematics & Statistics':['MATH','Science'], 'Physics':['PHYS','Science'],
  'Human Nutrition':['HNU','Science'], 'Nursing':['NURS','Science'],
  'History':['HIST','Arts'], 'English':['ENGL','Arts'], 'Political Science':['PSCI','Arts'], 'Psychology':['PSYC','Arts'],
  'Anthropology':['ANTH','Arts'], 'Celtic Studies':['CELT','Arts'],
  'Business Administration':['BSAD','Business'], 'Economics':['ECON','Business'],
  'Education':['EDUC','Education'],
};
const COURSE_TITLES = {
  BIOL:['Ecology','Marine Biology','Genetics','Field Methods'], CHEM:['Organic Chemistry','Environmental Chemistry','Analytical Methods'],
  CSCI:['Intro to Programming','Machine Learning','Data Structures','Human–Computer Interaction'],
  ESCI:['Coastal Geomorphology','Climate Systems','Geology of Atlantic Canada'], MATH:['Statistics I','Applied Modelling','Linear Algebra'],
  PHYS:['Quantum Mechanics','Climate Physics','Mechanics'], HNU:['Community Nutrition','Food Systems'], NURS:['Rural Health Practice','Mental Health Nursing'],
  HIST:['Atlantic Canada History','The Modern World','Oral History'], ENGL:['Canadian Literature','Creative Writing','Digital Storytelling'],
  PSCI:['Canadian Politics','Public Policy','Global Governance'], PSYC:['Health Psychology','Developmental Psychology','Research Methods'],
  ANTH:['Indigenous Peoples of Canada','Ethnographic Methods'], CELT:['Scottish Gaelic I','Celtic Folklore'],
  BSAD:['Entrepreneurship','Marketing Analytics','Organizational Behaviour'], ECON:['Microeconomics','Fisheries Economics','Development Economics'],
  EDUC:['Inclusive Classrooms','Curriculum Design','Educational Technology'],
};
// [first, last, rank, dept, areas, keywords, yearJoined, publications, mediaReady]
const RAW = [
 ['Amara','Okafor','Professor','Biology',['ocean','climate'],['marine ecology','kelp forests','coastal ecosystems','biodiversity'],2009,64,1],
 ['Liam','MacNeil','Associate Professor','Earth Sciences',['ocean','climate'],['coastal erosion','sea-level rise','geomorphology'],2014,38,1],
 ['Sophie','Chiasson','Assistant Professor','Psychology',['health','education'],['mental health','adolescence','resilience'],2021,17,1],
 ['Daniel','Whitecap','Associate Professor','Anthropology',['community','culture'],['Indigenous knowledge','land-based learning','oral tradition'],2016,29,1],
 ['Priya','Raman','Professor','Computer Science',['data'],['machine learning','computer vision','ethical AI'],2010,82,1],
 ['Ewan','MacKinnon','Professor','Celtic Studies',['culture'],['Scottish Gaelic','folklore','language revitalization'],2004,45,0],
 ['Hannah','Boudreau','Assistant Professor','Nursing',['health','community'],['rural health','palliative care','health equity'],2022,11,1],
 ['Marcus','Whitford','Associate Professor','Economics',['economy','ocean'],['fisheries economics','resource management','labour markets'],2015,33,1],
 ['Leah','Doucette','Professor','Education',['education','community'],['inclusive education','teacher development','literacy'],2008,51,0],
 ['Tomás','Alvarez','Assistant Professor','Physics',['climate','data'],['atmospheric physics','climate modelling','remote sensing'],2020,19,0],
 ['Noah','Fraser','Associate Professor','History',['culture','community'],['Atlantic Canada','oral history','migration'],2013,27,1],
 ['Isla','Campbell','Professor','English',['culture','education'],['Canadian literature','poetry','digital humanities'],2006,40,0],
 ['Ravi','Menon','Associate Professor','Business Administration',['economy','data'],['entrepreneurship','innovation','marketing analytics'],2017,24,1],
 ['Claire','Gillis','Assistant Professor','Human Nutrition',['health','community'],['food security','community nutrition','public health'],2021,14,1],
 ['Owen','Chisholm','Professor','Chemistry',['climate'],['green chemistry','catalysis','environmental toxins'],2007,71,0],
 ['Mei','Lin','Assistant Professor','Mathematics & Statistics',['data','health'],['biostatistics','epidemiological modelling','Bayesian methods'],2023,9,0],
 ['Fatima','Haddad','Associate Professor','Political Science',['community','economy'],['public policy','immigration','rural governance'],2016,22,1],
 ['Jacob','Landry','Assistant Professor','Biology',['ocean','climate'],['aquaculture','fish genetics','ocean warming'],2022,13,0],
 ['Aisling','Murphy','Professor','Psychology',['health'],['neuroscience','sleep','cognitive ageing'],2005,58,1],
 ['Kwame','Mensah','Associate Professor','Computer Science',['data','education'],['human–computer interaction','accessibility','educational technology'],2018,21,0],
 ['Nadia','Petrova','Assistant Professor','Earth Sciences',['climate'],['glaciology','paleoclimate','geochemistry'],2024,6,0],
 ['Sean','MacDonald','Professor','Business Administration',['economy','community'],['co-operatives','social enterprise','community development'],2003,49,1],
 ['Elena','Rossi','Associate Professor','Education',['education','data'],['STEM education','assessment','online learning'],2019,18,0],
 ['Grace','Pictou','Assistant Professor','Nursing',['health','community'],['Indigenous health','maternal health','community care'],2023,7,1],
];
const FACULTIES = ['Arts','Science','Business','Education'];
const areaName = id => AREAS.find(a=>a.id===id).name;
const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TONES = [['#0C2340','#1d4373'],['#13315a','#2a5a8f'],['#1b2b40','#3b5574'],['#0e2a4a','#c08700']];

const EXPERTS = RAW.map((r,i)=>{
  const [first,last,rank,dept,areas,keywords,joined,pubs,media] = r;
  const [code,faculty] = DEPTS[dept];
  const t = COURSE_TITLES[code];
  const courses = [0,1].map(k=>({code:`${code} ${(k+1)*100+10+(i*7+k*13)%80}`, title:t[(i+k)%t.length]}));
  const e = {id:norm(`${first}-${last}`).replace(/[^a-z-]/g,''), first,last,name:`Dr. ${first} ${last}`,rank,dept,code,faculty,
    areas,keywords,joined,pubs,media:!!media,courses,tone:TONES[i%TONES.length],
    email:norm(first[0]+last).replace(/[^a-z]/g,'')+'@example.ca'};
  e.hay = norm([e.name,rank,dept,faculty,areas.map(areaName).join(' '),keywords.join(' '),
    courses.map(c=>`${c.code} ${c.code.replace(' ','')} ${c.title}`).join(' ')].join(' '));
  return e;
});

/* state: {q, faculty, dept, course, area, sort} */
function tokens(q){ return norm(q||'').split(/\s+/).filter(Boolean); }
function filterExperts(s){
  const toks = tokens(s.q);
  return EXPERTS.filter(e=>
    toks.every(t=>e.hay.includes(t)) &&
    (!s.faculty || e.faculty===s.faculty) &&
    (!s.dept || e.dept===s.dept) &&
    (!s.course || e.courses.some(c=>c.code===s.course)) &&
    (!s.area || e.areas.includes(s.area)));
}
function relevance(e,q){
  let n=0; for(const t of tokens(q)){ if(norm(e.name).includes(t)) n+=10; if(e.keywords.some(k=>norm(k).includes(t))) n+=5; if(norm(e.dept).includes(t)) n+=3; }
  return n;
}
function sortExperts(list,sort,q){
  const f = {
    relevance:(a,b)=>relevance(b,q)-relevance(a,q)||a.last.localeCompare(b.last),
    'az':(a,b)=>a.last.localeCompare(b.last), 'za':(a,b)=>b.last.localeCompare(a.last),
    'dept':(a,b)=>a.dept.localeCompare(b.dept)||a.last.localeCompare(b.last),
    'newest':(a,b)=>b.joined-a.joined, 'pubs':(a,b)=>b.pubs-a.pubs,
  }[sort||'az'];
  return [...list].sort(f);
}
function hl(text,q){
  const toks = tokens(q); let out = esc(text); if(!toks.length) return out;
  return out.replace(new RegExp('('+toks.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','gi'),'<mark>$1</mark>');
}
const SIL = `<svg viewBox="0 0 100 90" aria-hidden="true" style="width:62%;display:block"><circle cx="50" cy="32" r="20" fill="rgba(255,255,255,.85)"/><path d="M8 90c2-24 20-36 42-36s40 12 42 36z" fill="rgba(255,255,255,.85)"/></svg>`;
function photo(e,style=''){
  return `<div class="photo" style="background:radial-gradient(circle at 30% 20%,${e.tone[1]},${e.tone[0]} 70%);display:grid;place-items:end center;overflow:hidden;${style}" role="img" aria-label="Photo placeholder">${SIL}</div>`;
}
const SORTS = [['relevance','Best match'],['az','Last name A–Z'],['za','Last name Z–A'],['dept','Department'],['newest','Newest faculty'],['pubs','Most publications']];

/* <select> option builders */
function opts(list,sel,all){ return `<option value="">${all}</option>`+list.map(([v,l])=>`<option value="${esc(v)}" ${v===sel?'selected':''}>${esc(l)}</option>`).join(''); }
const facultyOpts = s => opts(FACULTIES.map(f=>[f,'Faculty of '+f]),s.faculty,'All faculties');
const deptOpts = s => opts(Object.keys(DEPTS).filter(d=>!s.faculty||DEPTS[d][1]===s.faculty).sort().map(d=>[d,d]),s.dept,'All departments');
function courseOpts(s){
  const seen={}; EXPERTS.filter(e=>(!s.dept||e.dept===s.dept)&&(!s.faculty||e.faculty===s.faculty)).forEach(e=>e.courses.forEach(c=>seen[c.code]=c.title));
  return opts(Object.entries(seen).sort().map(([c,t])=>[c,`${c} — ${t}`]),s.course,'Any course');
}
const areaOpts = s => opts(AREAS.map(a=>[a.id,a.name]),s.area,'All research areas');
const sortOpts = s => SORTS.map(([v,l])=>`<option value="${v}" ${v===s.sort?'selected':''}>${l}</option>`).join('');
const profileUrl = (e,from) => `profile.html?id=${e.id}&from=${encodeURIComponent(from)}`;

/* Wire standard controls: ids q, faculty, dept, course, area, sort (any may be absent) */
function bindControls(S,render){
  const $=id=>document.getElementById(id);
  const fill=()=>{ if($('faculty'))$('faculty').innerHTML=facultyOpts(S); if($('dept'))$('dept').innerHTML=deptOpts(S);
    if($('course'))$('course').innerHTML=courseOpts(S); if($('area'))$('area').innerHTML=areaOpts(S); if($('sort'))$('sort').innerHTML=sortOpts(S); };
  let t; if($('q')) $('q').addEventListener('input',e=>{clearTimeout(t);t=setTimeout(()=>{S.q=e.target.value.trim();render()},120)});
  const on=(id,fn)=>$(id)&&$(id).addEventListener('change',e=>{fn(e.target.value);fill();render()});
  on('faculty',v=>{S.faculty=v;S.dept='';S.course=''}); on('dept',v=>{S.dept=v;S.course=''});
  on('course',v=>S.course=v); on('area',v=>S.area=v); on('sort',v=>S.sort=v);
  S.reset=()=>{Object.assign(S,{q:'',faculty:'',dept:'',course:'',area:'',sort:S.defaultSort||'az'}); if($('q'))$('q').value=''; fill(); render();};
  S.fill=fill; fill();
}
