let activeLeague = 'IPL';
let TEAMS = {};
let MATCHES = [];
let REAL_MATCHES = [];

function rng(a,b){const r=[];for(let i=a;i<=b;i++)r.push(i);return r;}

function isoOffset(dateStr, hour, min, offset) {
  const d = new Date(`${dateStr}T${String(hour).padStart(2,'0')}:${String(min).padStart(2,'0')}:00${offset}`);
  return d.toISOString();
}
function isoIST(d,h,m) { return isoOffset(d,h,m,'+05:30'); }
function isoET(d,h,m,dst=true)  { return isoOffset(d,h,m,dst?'-04:00':'-05:00'); }

// ── IPL teams (shared between current + archive) ──────────────
const IPL_TEAMS = {
  RCB:  { n:'Royal Challengers Bengaluru', e:'🔴' },
  CSK:  { n:'Chennai Super Kings',          e:'🦁' },
  MI:   { n:'Mumbai Indians',               e:'💙' },
  KKR:  { n:'Kolkata Knight Riders',        e:'🟣' },
  SRH:  { n:'Sunrisers Hyderabad',          e:'🌅' },
  DC:   { n:'Delhi Capitals',               e:'🔵' },
  RR:   { n:'Rajasthan Royals',             e:'👑' },
  LSG:  { n:'Lucknow Super Giants',         e:'🦊' },
  GT:   { n:'Gujarat Titans',               e:'⚡' },
  PBKS: { n:'Punjab Kings',                 e:'🏴' },
};

// ── NFL teams ─────────────────────────────────────────────────
const NFL_TEAMS = {
  ARI:{ n:'Arizona Cardinals',      e:'🔴' },
  ATL:{ n:'Atlanta Falcons',        e:'🦅' },
  BAL:{ n:'Baltimore Ravens',       e:'🟣' },
  BUF:{ n:'Buffalo Bills',          e:'🦬' },
  CAR:{ n:'Carolina Panthers',      e:'🐾' },
  CHI:{ n:'Chicago Bears',          e:'🐻' },
  CIN:{ n:'Cincinnati Bengals',     e:'🐯' },
  CLE:{ n:'Cleveland Browns',       e:'🟠' },
  DAL:{ n:'Dallas Cowboys',         e:'⭐' },
  DEN:{ n:'Denver Broncos',         e:'🐴' },
  DET:{ n:'Detroit Lions',          e:'🦁' },
  GB: { n:'Green Bay Packers',      e:'🧀' },
  HOU:{ n:'Houston Texans',         e:'🤠' },
  IND:{ n:'Indianapolis Colts',     e:'🐎' },
  JAX:{ n:'Jacksonville Jaguars',   e:'🐆' },
  KC: { n:'Kansas City Chiefs',     e:'👑' },
  LAC:{ n:'LA Chargers',            e:'💛' },
  LAR:{ n:'LA Rams',                e:'🐏' },
  LV: { n:'Las Vegas Raiders',      e:'☠️' },
  MIA:{ n:'Miami Dolphins',         e:'🐬' },
  MIN:{ n:'Minnesota Vikings',      e:'🪓' },
  NE: { n:'New England Patriots',   e:'⚓' },
  NO: { n:'New Orleans Saints',     e:'⚜️' },
  NYG:{ n:'New York Giants',        e:'🗽' },
  NYJ:{ n:'New York Jets',          e:'✈️' },
  PHI:{ n:'Philadelphia Eagles',    e:'🦅' },
  PIT:{ n:'Pittsburgh Steelers',    e:'⚙️' },
  SF: { n:'San Francisco 49ers',    e:'🌉' },
  SEA:{ n:'Seattle Seahawks',       e:'🌊' },
  TB: { n:'Tampa Bay Buccaneers',   e:'🏴‍☠️' },
  TEN:{ n:'Tennessee Titans',       e:'⚡' },
  WAS:{ n:'Washington Commanders',  e:'🏛️' },
};

// ── IPL 2026 matches ──────────────────────────────────────────
const IPL_2026_MATCHES = [
  {id:1,  t1:'RCB', t2:'SRH', date:'28 Mar', tossTime:isoIST('2026-03-28',19,30), venue:'Bengaluru',      pl:false},
  {id:2,  t1:'MI',  t2:'KKR', date:'29 Mar', tossTime:isoIST('2026-03-29',19,30), venue:'Mumbai',         pl:false},
  {id:3,  t1:'RR',  t2:'CSK', date:'30 Mar', tossTime:isoIST('2026-03-30',19,30), venue:'Guwahati',       pl:false},
  {id:4,  t1:'PBKS',t2:'GT',  date:'31 Mar', tossTime:isoIST('2026-03-31',19,30), venue:'New Chandigarh', pl:false},
  {id:5,  t1:'LSG', t2:'DC',  date:'01 Apr', tossTime:isoIST('2026-04-01',19,30), venue:'Lucknow',        pl:false},
  {id:6,  t1:'KKR', t2:'SRH', date:'02 Apr', tossTime:isoIST('2026-04-02',19,30), venue:'Kolkata',        pl:false},
  {id:7,  t1:'CSK', t2:'PBKS',date:'03 Apr', tossTime:isoIST('2026-04-03',19,30), venue:'Chennai',        pl:false},
  {id:8,  t1:'DC',  t2:'MI',  date:'04 Apr', tossTime:isoIST('2026-04-04',15,30), venue:'Delhi',          pl:false},
  {id:9,  t1:'GT',  t2:'RR',  date:'04 Apr', tossTime:isoIST('2026-04-04',19,30), venue:'Ahmedabad',      pl:false},
  {id:10, t1:'SRH', t2:'LSG', date:'05 Apr', tossTime:isoIST('2026-04-05',15,30), venue:'Hyderabad',      pl:false},
  {id:11, t1:'RCB', t2:'CSK', date:'05 Apr', tossTime:isoIST('2026-04-05',19,30), venue:'Bengaluru',      pl:false},
  {id:12, t1:'KKR', t2:'PBKS',date:'06 Apr', tossTime:isoIST('2026-04-06',19,30), venue:'Kolkata',        pl:false},
  {id:13, t1:'RR',  t2:'MI',  date:'07 Apr', tossTime:isoIST('2026-04-07',19,30), venue:'Guwahati',       pl:false},
  {id:14, t1:'DC',  t2:'GT',  date:'08 Apr', tossTime:isoIST('2026-04-08',19,30), venue:'Delhi',          pl:false},
  {id:15, t1:'KKR', t2:'LSG', date:'09 Apr', tossTime:isoIST('2026-04-09',19,30), venue:'Kolkata',        pl:false},
  {id:16, t1:'RR',  t2:'RCB', date:'10 Apr', tossTime:isoIST('2026-04-10',19,30), venue:'Guwahati',       pl:false},
  {id:17, t1:'PBKS',t2:'SRH', date:'11 Apr', tossTime:isoIST('2026-04-11',15,30), venue:'New Chandigarh', pl:false},
  {id:18, t1:'CSK', t2:'DC',  date:'11 Apr', tossTime:isoIST('2026-04-11',19,30), venue:'Chennai',        pl:false},
  {id:19, t1:'LSG', t2:'GT',  date:'12 Apr', tossTime:isoIST('2026-04-12',15,30), venue:'Lucknow',        pl:false},
  {id:20, t1:'MI',  t2:'RCB', date:'12 Apr', tossTime:isoIST('2026-04-12',19,30), venue:'Mumbai',         pl:false},
  {id:21, t1:'SRH', t2:'RR',  date:'13 Apr', tossTime:isoIST('2026-04-13',19,30), venue:'Hyderabad',      pl:false},
  {id:22, t1:'CSK', t2:'KKR', date:'14 Apr', tossTime:isoIST('2026-04-14',19,30), venue:'Chennai',        pl:false},
  {id:23, t1:'RCB', t2:'LSG', date:'15 Apr', tossTime:isoIST('2026-04-15',19,30), venue:'Bengaluru',      pl:false},
  {id:24, t1:'MI',  t2:'PBKS',date:'16 Apr', tossTime:isoIST('2026-04-16',19,30), venue:'Mumbai',         pl:false},
  {id:25, t1:'GT',  t2:'KKR', date:'17 Apr', tossTime:isoIST('2026-04-17',19,30), venue:'Ahmedabad',      pl:false},
  {id:26, t1:'RCB', t2:'DC',  date:'18 Apr', tossTime:isoIST('2026-04-18',15,30), venue:'Bengaluru',      pl:false},
  {id:27, t1:'SRH', t2:'CSK', date:'18 Apr', tossTime:isoIST('2026-04-18',19,30), venue:'Hyderabad',      pl:false},
  {id:28, t1:'KKR', t2:'RR',  date:'19 Apr', tossTime:isoIST('2026-04-19',15,30), venue:'Kolkata',        pl:false},
  {id:29, t1:'PBKS',t2:'LSG', date:'19 Apr', tossTime:isoIST('2026-04-19',19,30), venue:'New Chandigarh', pl:false},
  {id:30, t1:'GT',  t2:'MI',  date:'20 Apr', tossTime:isoIST('2026-04-20',19,30), venue:'Ahmedabad',      pl:false},
  {id:31, t1:'SRH', t2:'DC',  date:'21 Apr', tossTime:isoIST('2026-04-21',19,30), venue:'Hyderabad',      pl:false},
  {id:32, t1:'LSG', t2:'RR',  date:'22 Apr', tossTime:isoIST('2026-04-22',19,30), venue:'Lucknow',        pl:false},
  {id:33, t1:'MI',  t2:'CSK', date:'23 Apr', tossTime:isoIST('2026-04-23',19,30), venue:'Mumbai',         pl:false},
  {id:34, t1:'RCB', t2:'GT',  date:'24 Apr', tossTime:isoIST('2026-04-24',19,30), venue:'Bengaluru',      pl:false},
  {id:35, t1:'DC',  t2:'PBKS',date:'25 Apr', tossTime:isoIST('2026-04-25',15,30), venue:'Delhi',          pl:false},
  {id:36, t1:'RR',  t2:'SRH', date:'25 Apr', tossTime:isoIST('2026-04-25',19,30), venue:'Jaipur',         pl:false},
  {id:37, t1:'GT',  t2:'CSK', date:'26 Apr', tossTime:isoIST('2026-04-26',15,30), venue:'Ahmedabad',      pl:false},
  {id:38, t1:'LSG', t2:'KKR', date:'26 Apr', tossTime:isoIST('2026-04-26',19,30), venue:'Lucknow',        pl:false},
  {id:39, t1:'DC',  t2:'RCB', date:'27 Apr', tossTime:isoIST('2026-04-27',19,30), venue:'Delhi',          pl:false},
  {id:40, t1:'PBKS',t2:'RR',  date:'28 Apr', tossTime:isoIST('2026-04-28',19,30), venue:'New Chandigarh', pl:false},
  {id:41, t1:'MI',  t2:'SRH', date:'29 Apr', tossTime:isoIST('2026-04-29',19,30), venue:'Mumbai',         pl:false},
  {id:42, t1:'GT',  t2:'RCB', date:'30 Apr', tossTime:isoIST('2026-04-30',19,30), venue:'Ahmedabad',      pl:false},
  {id:43, t1:'RR',  t2:'DC',  date:'01 May', tossTime:isoIST('2026-05-01',19,30), venue:'Jaipur',         pl:false},
  {id:44, t1:'CSK', t2:'MI',  date:'02 May', tossTime:isoIST('2026-05-02',19,30), venue:'Chennai',        pl:false},
  {id:45, t1:'SRH', t2:'KKR', date:'03 May', tossTime:isoIST('2026-05-03',15,30), venue:'Hyderabad',      pl:false},
  {id:46, t1:'GT',  t2:'PBKS',date:'03 May', tossTime:isoIST('2026-05-03',19,30), venue:'Ahmedabad',      pl:false},
  {id:47, t1:'MI',  t2:'LSG', date:'04 May', tossTime:isoIST('2026-05-04',19,30), venue:'Mumbai',         pl:false},
  {id:48, t1:'DC',  t2:'CSK', date:'05 May', tossTime:isoIST('2026-05-05',19,30), venue:'Delhi',          pl:false},
  {id:49, t1:'SRH', t2:'PBKS',date:'06 May', tossTime:isoIST('2026-05-06',19,30), venue:'Hyderabad',      pl:false},
  {id:50, t1:'LSG', t2:'RCB', date:'07 May', tossTime:isoIST('2026-05-07',19,30), venue:'Lucknow',        pl:false},
  {id:51, t1:'DC',  t2:'KKR', date:'08 May', tossTime:isoIST('2026-05-08',19,30), venue:'Delhi',          pl:false},
  {id:52, t1:'RR',  t2:'GT',  date:'09 May', tossTime:isoIST('2026-05-09',19,30), venue:'Jaipur',         pl:false},
  {id:53, t1:'CSK', t2:'LSG', date:'10 May', tossTime:isoIST('2026-05-10',15,30), venue:'Chennai',        pl:false},
  {id:54, t1:'RCB', t2:'MI',  date:'10 May', tossTime:isoIST('2026-05-10',19,30), venue:'Raipur',         pl:false},
  {id:55, t1:'PBKS',t2:'DC',  date:'11 May', tossTime:isoIST('2026-05-11',19,30), venue:'Dharamshala',    pl:false},
  {id:56, t1:'GT',  t2:'SRH', date:'12 May', tossTime:isoIST('2026-05-12',19,30), venue:'Ahmedabad',      pl:false},
  {id:57, t1:'RCB', t2:'KKR', date:'13 May', tossTime:isoIST('2026-05-13',19,30), venue:'Raipur',         pl:false},
  {id:58, t1:'PBKS',t2:'MI',  date:'14 May', tossTime:isoIST('2026-05-14',19,30), venue:'Dharamshala',    pl:false},
  {id:59, t1:'LSG', t2:'CSK', date:'15 May', tossTime:isoIST('2026-05-15',19,30), venue:'Lucknow',        pl:false},
  {id:60, t1:'KKR', t2:'GT',  date:'16 May', tossTime:isoIST('2026-05-16',19,30), venue:'Kolkata',        pl:false},
  {id:61, t1:'PBKS',t2:'RCB', date:'17 May', tossTime:isoIST('2026-05-17',15,30), venue:'Dharamshala',    pl:false},
  {id:62, t1:'DC',  t2:'RR',  date:'17 May', tossTime:isoIST('2026-05-17',19,30), venue:'Delhi',          pl:false},
  {id:63, t1:'CSK', t2:'SRH', date:'18 May', tossTime:isoIST('2026-05-18',19,30), venue:'Chennai',        pl:false},
  {id:64, t1:'RR',  t2:'LSG', date:'19 May', tossTime:isoIST('2026-05-19',19,30), venue:'Jaipur',         pl:false},
  {id:65, t1:'KKR', t2:'MI',  date:'20 May', tossTime:isoIST('2026-05-20',19,30), venue:'Kolkata',        pl:false},
  {id:66, t1:'CSK', t2:'GT',  date:'21 May', tossTime:isoIST('2026-05-21',19,30), venue:'Chennai',        pl:false},
  {id:67, t1:'SRH', t2:'RCB', date:'22 May', tossTime:isoIST('2026-05-22',19,30), venue:'Hyderabad',      pl:false},
  {id:68, t1:'LSG', t2:'PBKS',date:'23 May', tossTime:isoIST('2026-05-23',19,30), venue:'Lucknow',        pl:false},
  {id:69, t1:'MI',  t2:'RR',  date:'24 May', tossTime:isoIST('2026-05-24',15,30), venue:'Mumbai',         pl:false},
  {id:70, t1:'KKR', t2:'DC',  date:'24 May', tossTime:isoIST('2026-05-24',19,30), venue:'Kolkata',        pl:false},
  {id:71, t1:'TBD', t2:'TBD', date:'26 May', tossTime:isoIST('2026-05-26',19,30), venue:'TBD', pl:true, label:'Qualifier 1'},
  {id:72, t1:'TBD', t2:'TBD', date:'27 May', tossTime:isoIST('2026-05-27',19,30), venue:'TBD', pl:true, label:'Eliminator'},
  {id:73, t1:'TBD', t2:'TBD', date:'29 May', tossTime:isoIST('2026-05-29',19,30), venue:'TBD', pl:true, label:'Qualifier 2'},
  {id:74, t1:'TBD', t2:'TBD', date:'31 May', tossTime:isoIST('2026-05-31',19,30), venue:'TBD', pl:true, label:'🏆 FINAL'},
];

// ── NFL 2026 full schedule (all times UTC, DST-aware) ─────────
// Sep–Oct = ET (UTC-4), Nov onwards = EST (UTC-5)
const NFL_2026_MATCHES = [
  // WEEK 1
  {id:1,  t1:'PHI', t2:'GB',  date:'10 Sep', tossTime:isoET('2026-09-11',0,20),  venue:'Philadelphia',   pl:false, network:'NBC'},
  {id:2,  t1:'BUF', t2:'LAC', date:'13 Sep', tossTime:isoET('2026-09-13',17,0),  venue:'Buffalo',        pl:false, network:'CBS'},
  {id:3,  t1:'KC',  t2:'BAL', date:'13 Sep', tossTime:isoET('2026-09-13',17,0),  venue:'Kansas City',    pl:false, network:'CBS'},
  {id:4,  t1:'DAL', t2:'NYG', date:'13 Sep', tossTime:isoET('2026-09-13',20,25), venue:'Dallas',         pl:false, network:'FOX'},
  {id:5,  t1:'SF',  t2:'SEA', date:'13 Sep', tossTime:isoET('2026-09-13',20,25), venue:'San Francisco',  pl:false, network:'FOX'},
  {id:6,  t1:'DET', t2:'MIN', date:'13 Sep', tossTime:isoET('2026-09-14',0,20),  venue:'Detroit',        pl:false, network:'NBC'},
  {id:7,  t1:'MIA', t2:'NE',  date:'14 Sep', tossTime:isoET('2026-09-15',0,15),  venue:'Miami',          pl:false, network:'ESPN'},
  // WEEK 2
  {id:8,  t1:'GB',  t2:'MIN', date:'17 Sep', tossTime:isoET('2026-09-18',0,15),  venue:'Green Bay',      pl:false, network:'TNF'},
  {id:9,  t1:'KC',  t2:'BUF', date:'20 Sep', tossTime:isoET('2026-09-20',17,0),  venue:'Kansas City',    pl:false, network:'CBS'},
  {id:10, t1:'BAL', t2:'CIN', date:'20 Sep', tossTime:isoET('2026-09-20',17,0),  venue:'Baltimore',      pl:false, network:'CBS'},
  {id:11, t1:'PHI', t2:'DAL', date:'20 Sep', tossTime:isoET('2026-09-20',20,25), venue:'Philadelphia',   pl:false, network:'FOX'},
  {id:12, t1:'SF',  t2:'LAR', date:'20 Sep', tossTime:isoET('2026-09-21',0,20),  venue:'San Francisco',  pl:false, network:'NBC'},
  {id:13, t1:'PIT', t2:'HOU', date:'21 Sep', tossTime:isoET('2026-09-22',0,15),  venue:'Pittsburgh',     pl:false, network:'ESPN'},
  // WEEK 3
  {id:14, t1:'DET', t2:'GB',  date:'24 Sep', tossTime:isoET('2026-09-25',0,15),  venue:'Detroit',        pl:false, network:'TNF'},
  {id:15, t1:'KC',  t2:'ATL', date:'27 Sep', tossTime:isoET('2026-09-27',17,0),  venue:'Kansas City',    pl:false, network:'CBS'},
  {id:16, t1:'BUF', t2:'MIA', date:'27 Sep', tossTime:isoET('2026-09-27',17,0),  venue:'Buffalo',        pl:false, network:'CBS'},
  {id:17, t1:'PHI', t2:'WAS', date:'27 Sep', tossTime:isoET('2026-09-27',17,0),  venue:'Philadelphia',   pl:false, network:'FOX'},
  {id:18, t1:'SF',  t2:'ARI', date:'27 Sep', tossTime:isoET('2026-09-27',20,25), venue:'San Francisco',  pl:false, network:'FOX'},
  {id:19, t1:'DAL', t2:'CHI', date:'27 Sep', tossTime:isoET('2026-09-28',0,20),  venue:'Dallas',         pl:false, network:'NBC'},
  {id:20, t1:'LAC', t2:'DEN', date:'28 Sep', tossTime:isoET('2026-09-29',0,15),  venue:'Los Angeles',    pl:false, network:'ESPN'},
  // WEEK 4
  {id:21, t1:'NYG', t2:'DAL', date:'01 Oct', tossTime:isoET('2026-10-02',0,15),  venue:'New York',       pl:false, network:'TNF'},
  {id:22, t1:'KC',  t2:'NO',  date:'04 Oct', tossTime:isoET('2026-10-04',17,0),  venue:'Kansas City',    pl:false, network:'CBS'},
  {id:23, t1:'BAL', t2:'PIT', date:'04 Oct', tossTime:isoET('2026-10-04',17,0),  venue:'Baltimore',      pl:false, network:'CBS'},
  {id:24, t1:'MIN', t2:'DET', date:'04 Oct', tossTime:isoET('2026-10-04',17,0),  venue:'Minnesota',      pl:false, network:'FOX'},
  {id:25, t1:'LAR', t2:'SEA', date:'04 Oct', tossTime:isoET('2026-10-04',20,25), venue:'Los Angeles',    pl:false, network:'FOX'},
  {id:26, t1:'BUF', t2:'KC',  date:'04 Oct', tossTime:isoET('2026-10-05',0,20),  venue:'Buffalo',        pl:false, network:'NBC'},
  {id:27, t1:'PHI', t2:'NYJ', date:'05 Oct', tossTime:isoET('2026-10-06',0,15),  venue:'Philadelphia',   pl:false, network:'ESPN'},
  // WEEK 5
  {id:28, t1:'ATL', t2:'TB',  date:'08 Oct', tossTime:isoET('2026-10-09',0,15),  venue:'Atlanta',        pl:false, network:'TNF'},
  {id:29, t1:'KC',  t2:'LV',  date:'11 Oct', tossTime:isoET('2026-10-11',17,0),  venue:'Kansas City',    pl:false, network:'CBS'},
  {id:30, t1:'SF',  t2:'SEA', date:'11 Oct', tossTime:isoET('2026-10-11',20,25), venue:'San Francisco',  pl:false, network:'FOX'},
  {id:31, t1:'DAL', t2:'PHI', date:'11 Oct', tossTime:isoET('2026-10-12',0,20),  venue:'Dallas',         pl:false, network:'NBC'},
  {id:32, t1:'DET', t2:'BAL', date:'12 Oct', tossTime:isoET('2026-10-13',0,15),  venue:'Detroit',        pl:false, network:'ESPN'},
  // WEEK 6
  {id:33, t1:'GB',  t2:'CHI', date:'15 Oct', tossTime:isoET('2026-10-16',0,15),  venue:'Green Bay',      pl:false, network:'TNF'},
  {id:34, t1:'BUF', t2:'CIN', date:'18 Oct', tossTime:isoET('2026-10-18',17,0),  venue:'Buffalo',        pl:false, network:'CBS'},
  {id:35, t1:'KC',  t2:'DEN', date:'18 Oct', tossTime:isoET('2026-10-18',17,0),  venue:'Kansas City',    pl:false, network:'CBS'},
  {id:36, t1:'MIN', t2:'GB',  date:'18 Oct', tossTime:isoET('2026-10-19',0,20),  venue:'Minnesota',      pl:false, network:'NBC'},
  {id:37, t1:'PHI', t2:'SF',  date:'19 Oct', tossTime:isoET('2026-10-20',0,15),  venue:'Philadelphia',   pl:false, network:'ESPN'},
  // WEEK 7
  {id:38, t1:'NE',  t2:'NYJ', date:'22 Oct', tossTime:isoET('2026-10-23',0,15),  venue:'New England',    pl:false, network:'TNF'},
  {id:39, t1:'KC',  t2:'PIT', date:'25 Oct', tossTime:isoET('2026-10-25',17,0),  venue:'Kansas City',    pl:false, network:'CBS'},
  {id:40, t1:'BAL', t2:'HOU', date:'25 Oct', tossTime:isoET('2026-10-25',17,0),  venue:'Baltimore',      pl:false, network:'CBS'},
  {id:41, t1:'DAL', t2:'SEA', date:'25 Oct', tossTime:isoET('2026-10-25',20,25), venue:'Dallas',         pl:false, network:'FOX'},
  {id:42, t1:'DET', t2:'SF',  date:'25 Oct', tossTime:isoET('2026-10-26',0,20),  venue:'Detroit',        pl:false, network:'NBC'},
  {id:43, t1:'BUF', t2:'BAL', date:'26 Oct', tossTime:isoET('2026-10-27',0,15),  venue:'Buffalo',        pl:false, network:'ESPN'},
  // WEEK 8
  {id:44, t1:'CIN', t2:'CLE', date:'29 Oct', tossTime:isoET('2026-10-30',0,15),  venue:'Cincinnati',     pl:false, network:'TNF'},
  {id:45, t1:'KC',  t2:'TB',  date:'01 Nov', tossTime:isoET('2026-11-01',17,0),  venue:'Kansas City',    pl:false, network:'CBS'},
  {id:46, t1:'PHI', t2:'MIN', date:'01 Nov', tossTime:isoET('2026-11-01',20,25), venue:'Philadelphia',   pl:false, network:'FOX'},
  {id:47, t1:'SF',  t2:'DAL', date:'01 Nov', tossTime:isoET('2026-11-02',0,20),  venue:'San Francisco',  pl:false, network:'NBC'},
  {id:48, t1:'BUF', t2:'NYJ', date:'02 Nov', tossTime:isoET('2026-11-03',0,15),  venue:'Buffalo',        pl:false, network:'ESPN'},
  // WEEK 9 — clocks back Nov 1 → now EST (UTC-5)
  {id:49, t1:'DAL', t2:'GB',  date:'05 Nov', tossTime:isoET('2026-11-06',1,15,false),  venue:'Dallas',        pl:false, network:'TNF'},
  {id:50, t1:'KC',  t2:'BAL', date:'08 Nov', tossTime:isoET('2026-11-08',18,0,false),  venue:'Kansas City',   pl:false, network:'CBS'},
  {id:51, t1:'BUF', t2:'MIA', date:'08 Nov', tossTime:isoET('2026-11-08',18,0,false),  venue:'Buffalo',       pl:false, network:'CBS'},
  {id:52, t1:'SF',  t2:'LAR', date:'08 Nov', tossTime:isoET('2026-11-08',21,25,false),  venue:'San Francisco', pl:false, network:'FOX'},
  {id:53, t1:'DET', t2:'MIN', date:'08 Nov', tossTime:isoET('2026-11-09',1,20,false),  venue:'Detroit',       pl:false, network:'NBC'},
  {id:54, t1:'PHI', t2:'WAS', date:'09 Nov', tossTime:isoET('2026-11-10',1,15,false),  venue:'Philadelphia',  pl:false, network:'ESPN'},
  // WEEK 10
  {id:55, t1:'BAL', t2:'CIN', date:'12 Nov', tossTime:isoET('2026-11-13',1,15,false),  venue:'Baltimore',     pl:false, network:'TNF'},
  {id:56, t1:'KC',  t2:'LAC', date:'15 Nov', tossTime:isoET('2026-11-15',18,0,false),  venue:'Kansas City',   pl:false, network:'CBS'},
  {id:57, t1:'GB',  t2:'DET', date:'15 Nov', tossTime:isoET('2026-11-15',21,25,false),  venue:'Green Bay',     pl:false, network:'FOX'},
  {id:58, t1:'BUF', t2:'PHI', date:'15 Nov', tossTime:isoET('2026-11-16',1,20,false),  venue:'Buffalo',       pl:false, network:'NBC'},
  {id:59, t1:'SF',  t2:'SEA', date:'16 Nov', tossTime:isoET('2026-11-17',1,15,false),  venue:'San Francisco', pl:false, network:'ESPN'},
  // WEEK 11
  {id:60, t1:'ATL', t2:'NO',  date:'19 Nov', tossTime:isoET('2026-11-20',1,15,false),  venue:'Atlanta',       pl:false, network:'TNF'},
  {id:61, t1:'KC',  t2:'BUF', date:'22 Nov', tossTime:isoET('2026-11-22',18,0,false),  venue:'Kansas City',   pl:false, network:'CBS'},
  {id:62, t1:'PHI', t2:'NYG', date:'22 Nov', tossTime:isoET('2026-11-22',18,0,false),  venue:'Philadelphia',  pl:false, network:'FOX'},
  {id:63, t1:'DET', t2:'GB',  date:'22 Nov', tossTime:isoET('2026-11-22',21,25,false),  venue:'Detroit',       pl:false, network:'FOX'},
  {id:64, t1:'DAL', t2:'WAS', date:'22 Nov', tossTime:isoET('2026-11-23',1,20,false),  venue:'Dallas',        pl:false, network:'NBC'},
  {id:65, t1:'MIN', t2:'CHI', date:'23 Nov', tossTime:isoET('2026-11-24',1,15,false),  venue:'Minnesota',     pl:false, network:'ESPN'},
  // WEEK 12 — Thanksgiving
  {id:66, t1:'DET', t2:'CHI', date:'26 Nov', tossTime:isoET('2026-11-26',17,30,false),  venue:'Detroit',       pl:false, network:'CBS',  label:'Thanksgiving Game 1'},
  {id:67, t1:'DAL', t2:'NYG', date:'26 Nov', tossTime:isoET('2026-11-26',21,30,false),  venue:'Dallas',        pl:false, network:'FOX',  label:'Thanksgiving Game 2'},
  {id:68, t1:'KC',  t2:'GB',  date:'26 Nov', tossTime:isoET('2026-11-27',1,20,false),  venue:'Kansas City',   pl:false, network:'NBC',  label:'Thanksgiving Night'},
  {id:69, t1:'BUF', t2:'PHI', date:'29 Nov', tossTime:isoET('2026-11-30',1,20,false),  venue:'Buffalo',       pl:false, network:'NBC'},
  {id:70, t1:'SF',  t2:'MIN', date:'30 Nov', tossTime:isoET('2026-12-01',1,15,false),  venue:'San Francisco', pl:false, network:'ESPN'},
  // WEEK 13
  {id:71, t1:'BAL', t2:'PIT', date:'03 Dec', tossTime:isoET('2026-12-04',1,15,false),  venue:'Baltimore',     pl:false, network:'TNF'},
  {id:72, t1:'KC',  t2:'DET', date:'06 Dec', tossTime:isoET('2026-12-06',18,0,false),  venue:'Kansas City',   pl:false, network:'CBS'},
  {id:73, t1:'BUF', t2:'NE',  date:'06 Dec', tossTime:isoET('2026-12-06',18,0,false),  venue:'Buffalo',       pl:false, network:'CBS'},
  {id:74, t1:'GB',  t2:'MIN', date:'06 Dec', tossTime:isoET('2026-12-06',21,25,false),  venue:'Green Bay',     pl:false, network:'FOX'},
  {id:75, t1:'PHI', t2:'DAL', date:'06 Dec', tossTime:isoET('2026-12-07',1,20,false),  venue:'Philadelphia',  pl:false, network:'NBC'},
  {id:76, t1:'SF',  t2:'LAR', date:'07 Dec', tossTime:isoET('2026-12-08',1,15,false),  venue:'San Francisco', pl:false, network:'ESPN'},
  // WEEK 14
  {id:77, t1:'MIN', t2:'GB',  date:'10 Dec', tossTime:isoET('2026-12-11',1,15,false),  venue:'Minnesota',     pl:false, network:'TNF'},
  {id:78, t1:'KC',  t2:'LV',  date:'13 Dec', tossTime:isoET('2026-12-13',21,25,false),  venue:'Kansas City',   pl:false, network:'CBS'},
  {id:79, t1:'BUF', t2:'BAL', date:'13 Dec', tossTime:isoET('2026-12-14',1,20,false),  venue:'Buffalo',       pl:false, network:'NBC'},
  {id:80, t1:'DAL', t2:'PHI', date:'14 Dec', tossTime:isoET('2026-12-15',1,15,false),  venue:'Dallas',        pl:false, network:'ESPN'},
  // WEEK 15
  {id:81, t1:'ATL', t2:'CAR', date:'17 Dec', tossTime:isoET('2026-12-18',1,15,false),  venue:'Atlanta',       pl:false, network:'TNF'},
  {id:82, t1:'KC',  t2:'DEN', date:'20 Dec', tossTime:isoET('2026-12-20',18,0,false),  venue:'Kansas City',   pl:false, network:'CBS'},
  {id:83, t1:'BUF', t2:'NYJ', date:'20 Dec', tossTime:isoET('2026-12-20',18,0,false),  venue:'Buffalo',       pl:false, network:'CBS'},
  {id:84, t1:'PHI', t2:'MIN', date:'20 Dec', tossTime:isoET('2026-12-21',1,20,false),  venue:'Philadelphia',  pl:false, network:'NBC'},
  {id:85, t1:'SF',  t2:'SEA', date:'21 Dec', tossTime:isoET('2026-12-22',1,15,false),  venue:'San Francisco', pl:false, network:'ESPN'},
  // WEEK 16 — Christmas
  {id:86, t1:'KC',  t2:'PIT', date:'25 Dec', tossTime:isoET('2026-12-25',18,0,false),  venue:'Kansas City',   pl:false, network:'CBS',  label:'Christmas Game 1'},
  {id:87, t1:'DAL', t2:'NYG', date:'25 Dec', tossTime:isoET('2026-12-25',21,30,false),  venue:'Dallas',        pl:false, network:'FOX',  label:'Christmas Game 2'},
  {id:88, t1:'DET', t2:'GB',  date:'25 Dec', tossTime:isoET('2026-12-26',1,20,false),  venue:'Detroit',       pl:false, network:'NBC',  label:'Christmas Night'},
  {id:89, t1:'PHI', t2:'SF',  date:'27 Dec', tossTime:isoET('2026-12-27',21,25,false),  venue:'Philadelphia',  pl:false, network:'FOX'},
  {id:90, t1:'BUF', t2:'MIA', date:'28 Dec', tossTime:isoET('2026-12-29',1,15,false),  venue:'Buffalo',       pl:false, network:'ESPN'},
  // WEEK 17
  {id:91, t1:'DAL', t2:'WAS', date:'01 Jan', tossTime:isoET('2027-01-01',18,0,false),  venue:'Dallas',        pl:false, network:'FOX'},
  {id:92, t1:'KC',  t2:'BAL', date:'03 Jan', tossTime:isoET('2027-01-03',18,0,false),  venue:'Kansas City',   pl:false, network:'CBS'},
  {id:93, t1:'BUF', t2:'PHI', date:'03 Jan', tossTime:isoET('2027-01-03',21,25,false),  venue:'Buffalo',       pl:false, network:'NBC'},
  {id:94, t1:'SF',  t2:'LAR', date:'03 Jan', tossTime:isoET('2027-01-04',1,20,false),  venue:'San Francisco', pl:false, network:'NBC'},
  {id:95, t1:'DET', t2:'MIN', date:'04 Jan', tossTime:isoET('2027-01-05',1,15,false),  venue:'Detroit',       pl:false, network:'ESPN'},
  // WEEK 18 — Final regular season
  {id:96, t1:'KC',  t2:'LV',  date:'10 Jan', tossTime:isoET('2027-01-10',18,0,false),  venue:'Kansas City',   pl:false, network:'CBS'},
  {id:97, t1:'BUF', t2:'NE',  date:'10 Jan', tossTime:isoET('2027-01-10',18,0,false),  venue:'Buffalo',       pl:false, network:'CBS'},
  {id:98, t1:'PHI', t2:'NYG', date:'10 Jan', tossTime:isoET('2027-01-10',21,25,false),  venue:'Philadelphia',  pl:false, network:'FOX'},
  {id:99, t1:'SF',  t2:'SEA', date:'10 Jan', tossTime:isoET('2027-01-10',21,25,false),  venue:'San Francisco', pl:false, network:'FOX'},
  {id:100,t1:'DET', t2:'GB',  date:'10 Jan', tossTime:isoET('2027-01-11',1,20,false),  venue:'Detroit',       pl:false, network:'NBC'},
  // PLAYOFFS
  {id:101,t1:'TBD', t2:'TBD', date:'17 Jan', tossTime:isoET('2027-01-17',18,0,false),  venue:'TBD', pl:true, label:'Wild Card #1'},
  {id:102,t1:'TBD', t2:'TBD', date:'17 Jan', tossTime:isoET('2027-01-17',21,30,false), venue:'TBD', pl:true, label:'Wild Card #2'},
  {id:103,t1:'TBD', t2:'TBD', date:'18 Jan', tossTime:isoET('2027-01-18',18,0,false),  venue:'TBD', pl:true, label:'Wild Card #3'},
  {id:104,t1:'TBD', t2:'TBD', date:'18 Jan', tossTime:isoET('2027-01-18',21,30,false), venue:'TBD', pl:true, label:'Wild Card #4'},
  {id:105,t1:'TBD', t2:'TBD', date:'18 Jan', tossTime:isoET('2027-01-19',1,15,false),  venue:'TBD', pl:true, label:'Wild Card #5'},
  {id:106,t1:'TBD', t2:'TBD', date:'19 Jan', tossTime:isoET('2027-01-20',1,15,false),  venue:'TBD', pl:true, label:'Wild Card #6'},
  {id:107,t1:'TBD', t2:'TBD', date:'24 Jan', tossTime:isoET('2027-01-24',20,0,false),  venue:'TBD', pl:true, label:'Divisional #1'},
  {id:108,t1:'TBD', t2:'TBD', date:'24 Jan', tossTime:isoET('2027-01-24',23,30,false), venue:'TBD', pl:true, label:'Divisional #2'},
  {id:109,t1:'TBD', t2:'TBD', date:'25 Jan', tossTime:isoET('2027-01-25',20,0,false),  venue:'TBD', pl:true, label:'Divisional #3'},
  {id:110,t1:'TBD', t2:'TBD', date:'25 Jan', tossTime:isoET('2027-01-25',23,30,false), venue:'TBD', pl:true, label:'Divisional #4'},
  {id:111,t1:'TBD', t2:'TBD', date:'31 Jan', tossTime:isoET('2027-01-31',20,0,false),  venue:'TBD', pl:true, label:'AFC Championship'},
  {id:112,t1:'TBD', t2:'TBD', date:'01 Feb', tossTime:isoET('2027-02-01',20,0,false),  venue:'TBD', pl:true, label:'NFC Championship'},
  {id:113,t1:'TBD', t2:'TBD', date:'07 Feb', tossTime:isoET('2027-02-07',23,30,false), venue:'New Orleans', pl:true, label:'🏆 SUPER BOWL LXI'},
];

// ── League registry ───────────────────────────────────────────
const LEAGUES = {
  IPL: {
    key: 'IPL',
    displayName: 'IPL 2026',
    icon: '🏏',
    heroBadge: '🏏 TATA IPL 2026 · Season Active · RCB Defending Champions',
    seasonLabel: 'Season 2026',
    totalMatches: 74,
    archived: false,
    hasTie: false,
    phases: [
      { label: 'PHASE 1 · Mar 28 – Apr 20',  ids: rng(1,30)  },
      { label: 'PHASE 2 · Apr 21 – May 10',  ids: rng(31,54) },
      { label: 'PHASE 3 · May 11 – May 24',  ids: rng(55,70) },
      { label: 'PLAYOFFS',                    ids: rng(71,74) },
    ],
    teams: IPL_TEAMS,
    matches: IPL_2026_MATCHES,
  },
  NFL: {
    key: 'NFL',
    displayName: 'NFL 2026',
    icon: '🏈',
    heroBadge: '🏈 NFL 2026 · Season Active · Chiefs Defending Champions',
    seasonLabel: '2026 Season',
    totalMatches: 113,
    archived: false,
    hasTie: true,  // NFL regular season allows ties; +5 pts for correct tie prediction
    phases: [
      { label: 'WEEK 1 · Sep 10',            ids: rng(1,7)   },
      { label: 'WEEK 2 · Sep 17–21',         ids: rng(8,13)  },
      { label: 'WEEK 3 · Sep 24–28',         ids: rng(14,20) },
      { label: 'WEEK 4 · Oct 1–5',           ids: rng(21,27) },
      { label: 'WEEK 5 · Oct 8–12',          ids: rng(28,32) },
      { label: 'WEEK 6 · Oct 15–19',         ids: rng(33,37) },
      { label: 'WEEK 7 · Oct 22–26',         ids: rng(38,43) },
      { label: 'WEEK 8 · Oct 29–Nov 2',      ids: rng(44,48) },
      { label: 'WEEK 9 · Nov 5–9',           ids: rng(49,54) },
      { label: 'WEEK 10 · Nov 12–16',        ids: rng(55,59) },
      { label: 'WEEK 11 · Nov 19–23',        ids: rng(60,65) },
      { label: 'WEEK 12 · Thanksgiving',     ids: rng(66,70) },
      { label: 'WEEK 13 · Dec 3–7',          ids: rng(71,76) },
      { label: 'WEEK 14 · Dec 10–14',        ids: rng(77,80) },
      { label: 'WEEK 15 · Dec 17–21',        ids: rng(81,85) },
      { label: 'WEEK 16 · Christmas',        ids: rng(86,90) },
      { label: 'WEEK 17 · Jan 1–4',          ids: rng(91,95) },
      { label: 'WEEK 18 · Jan 10 (Final)',   ids: rng(96,100)},
      { label: 'WILD CARD WEEKEND',          ids: rng(101,106)},
      { label: 'DIVISIONAL ROUND',           ids: rng(107,110)},
      { label: 'CHAMPIONSHIP SUNDAY',        ids: rng(111,112)},
      { label: '🏆 SUPER BOWL LXI',          ids: [113]       },
    ],
    teams: NFL_TEAMS,
    matches: NFL_2026_MATCHES,
  },
  // ── ARCHIVE ───────────────────────────────────────────────
  // IPL 2026 is now archived (season ended). Users can view
  // their picks and the leaderboard but cannot make new picks.
  IPL_2026_ARCHIVE: {
    key: 'IPL_2026_ARCHIVE',
    displayName: 'IPL 2026 (Archive)',
    icon: '🗄',
    heroBadge: '🗄 IPL 2026 · Season Ended · Read-Only Archive',
    seasonLabel: 'IPL 2026 Archive',
    totalMatches: 74,
    archived: true,   // Locks all picks — read-only
    hasTie: false,
    phases: [
      { label: 'PHASE 1 · Mar 28 – Apr 20',  ids: rng(1,30)  },
      { label: 'PHASE 2 · Apr 21 – May 10',  ids: rng(31,54) },
      { label: 'PHASE 3 · May 11 – May 24',  ids: rng(55,70) },
      { label: 'PLAYOFFS',                    ids: rng(71,74) },
    ],
    teams: IPL_TEAMS,
    matches: IPL_2026_MATCHES,  // Same matches, all locked because archived:true
  },
};

// ── League API ────────────────────────────────────────────────
function setLeague(leagueKey) {
  if (!LEAGUES[leagueKey]) { console.warn('Unknown league', leagueKey); return; }
  activeLeague = leagueKey;
  TEAMS = LEAGUES[leagueKey].teams;
  MATCHES = [...LEAGUES[leagueKey].matches];
  REAL_MATCHES = [...MATCHES];
}
function getLeagueConfig() { return LEAGUES[activeLeague] || LEAGUES.IPL; }
function isArchived() { return !!getLeagueConfig().archived; }
function getTeam(code) { return TEAMS[code] || {}; }
function getMatch(mid) { return MATCHES.find(x => x.id === mid); }

setLeague(activeLeague);

// ── Time helpers ──────────────────────────────────────────────
const LOCK_BUFFER_MS = 0;

function matchLockTime(m) {
  // Archived leagues: all matches are always locked (read-only)
  if (isArchived()) return 0;
  return new Date(m.tossTime).getTime() - LOCK_BUFFER_MS;
}
function isMatchLocked(m) { return Date.now() >= matchLockTime(m); }
function secsUntilLock(m) { return Math.max(0, Math.floor((matchLockTime(m) - Date.now()) / 1000)); }

function matchTimeLabel(m) {
  const toss = new Date(m.tossTime);
  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeStr = toss.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true, timeZone: userTZ,
  });
  const tzLabel = toss.toLocaleTimeString('en-US', {
    timeZoneName: 'short', timeZone: userTZ,
  }).split(' ').pop();
  const label = getLeagueConfig().key === 'NFL' ? 'Kickoff' : 'Toss';
  return `${timeStr} ${tzLabel} (${label})`;
}
