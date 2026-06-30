let activeLeague = 'IPL';
let TEAMS = {};
let MATCHES = [];
let REAL_MATCHES = [];

function rng(a,b){const r=[];for(let i=a;i<=b;i++)r.push(i);return r;}
function isoOffset(dateStr, hour, min, offset) {
  const d = new Date(`${dateStr}T${String(hour).padStart(2,'0')}:${String(min).padStart(2,'0')}:00${offset}`);
  return d.toISOString();
}
function isoIST(dateStr, hour, min) { return isoOffset(dateStr, hour, min, '+05:30'); }
function isoET(dateStr, hour, min)  { return isoOffset(dateStr, hour, min, '-04:00'); }

const LEAGUES = {
  IPL: {
    key: 'IPL',
    displayName: 'IPL 2026',
    heroBadge: '🔥 TATA IPL 2026 · Season Active · RCB Defending Champions',
    seasonLabel: 'Season 2026',
    totalMatches: 74,
    phases: [
      { label: 'PHASE 1 · Mar 28 – Apr 9',  ids: rng(1,20) },
      { label: 'PHASE 2 · Apr 10 – Apr 27', ids: rng(21,50) },
      { label: 'PHASE 3 · Apr 28 – May 18', ids: rng(51,74) },
    ],
    teams: {
      RCB: { n:'Royal Challengers Bengaluru', e:'🔴' },
      CSK: { n:'Chennai Super Kings',          e:'🦁' },
      MI:  { n:'Mumbai Indians',               e:'💙' },
      KKR: { n:'Kolkata Knight Riders',        e:'🟣' },
      SRH: { n:'Sunrisers Hyderabad',          e:'🌅' },
      DC:  { n:'Delhi Capitals',               e:'🔵' },
      RR:  { n:'Rajasthan Royals',             e:'👑' },
      LSG: { n:'Lucknow Super Giants',         e:'🦊' },
      GT:  { n:'Gujarat Titans',               e:'⚡' },
      PBKS:{ n:'Punjab Kings',                 e:'🏴' },
    },
    matches: [
      {id:1,  t1:'RCB', t2:'SRH', date:'28 Mar', tossTime:isoIST('2026-03-28',19,30), venue:'Bengaluru',       pl:false},
      {id:2,  t1:'MI',  t2:'KKR', date:'29 Mar', tossTime:isoIST('2026-03-29',19,30), venue:'Mumbai',          pl:false},
      {id:3,  t1:'RR',  t2:'CSK', date:'30 Mar', tossTime:isoIST('2026-03-30',19,30), venue:'Guwahati',        pl:false},
      {id:4,  t1:'PBKS',t2:'GT',  date:'31 Mar', tossTime:isoIST('2026-03-31',19,30), venue:'New Chandigarh',  pl:false},
      {id:5,  t1:'LSG', t2:'DC',  date:'01 Apr', tossTime:isoIST('2026-04-01',19,30), venue:'Lucknow',         pl:false},
      {id:6,  t1:'KKR', t2:'SRH', date:'02 Apr', tossTime:isoIST('2026-04-02',19,30), venue:'Kolkata',         pl:false},
      {id:7,  t1:'CSK', t2:'PBKS',date:'03 Apr', tossTime:isoIST('2026-04-03',19,30), venue:'Chennai',         pl:false},
      {id:8,  t1:'DC',  t2:'MI',  date:'04 Apr', tossTime:isoIST('2026-04-04',15,30), venue:'Delhi',           pl:false},
      {id:9,  t1:'GT',  t2:'RR',  date:'04 Apr', tossTime:isoIST('2026-04-04',19,30), venue:'Ahmedabad',       pl:false},
      {id:10, t1:'SRH', t2:'LSG', date:'05 Apr', tossTime:isoIST('2026-04-05',15,30), venue:'Hyderabad',       pl:false},
      {id:11, t1:'RCB', t2:'CSK', date:'05 Apr', tossTime:isoIST('2026-04-05',19,30), venue:'Bengaluru',       pl:false},
      {id:12, t1:'KKR', t2:'PBKS',date:'06 Apr', tossTime:isoIST('2026-04-06',19,30), venue:'Kolkata',         pl:false},
      {id:13, t1:'RR',  t2:'MI',  date:'07 Apr', tossTime:isoIST('2026-04-07',19,30), venue:'Guwahati',        pl:false},
      {id:14, t1:'DC',  t2:'GT',  date:'08 Apr', tossTime:isoIST('2026-04-08',19,30), venue:'Delhi',           pl:false},
      {id:15, t1:'KKR', t2:'LSG', date:'09 Apr', tossTime:isoIST('2026-04-09',19,30), venue:'Kolkata',         pl:false},
      {id:16, t1:'RR',  t2:'RCB', date:'10 Apr', tossTime:isoIST('2026-04-10',19,30), venue:'Guwahati',        pl:false},
      {id:17, t1:'PBKS',t2:'SRH', date:'11 Apr', tossTime:isoIST('2026-04-11',15,30), venue:'New Chandigarh',  pl:false},
      {id:18, t1:'CSK', t2:'DC',  date:'11 Apr', tossTime:isoIST('2026-04-11',19,30), venue:'Chennai',         pl:false},
      {id:19, t1:'LSG', t2:'GT',  date:'12 Apr', tossTime:isoIST('2026-04-12',15,30), venue:'Lucknow',         pl:false},
      {id:20, t1:'MI',  t2:'RCB', date:'12 Apr', tossTime:isoIST('2026-04-12',19,30), venue:'Mumbai',          pl:false},
      {id:21, t1:'SRH', t2:'RR',  date:'13 Apr', tossTime:isoIST('2026-04-13',19,30), venue:'Hyderabad',       pl:false},
      {id:22, t1:'CSK', t2:'KKR', date:'14 Apr', tossTime:isoIST('2026-04-14',19,30), venue:'Chennai',         pl:false},
      {id:23, t1:'RCB', t2:'LSG', date:'15 Apr', tossTime:isoIST('2026-04-15',19,30), venue:'Bengaluru',       pl:false},
      {id:24, t1:'MI',  t2:'PBKS',date:'16 Apr', tossTime:isoIST('2026-04-16',19,30), venue:'Mumbai',          pl:false},
      {id:25, t1:'GT',  t2:'KKR', date:'17 Apr', tossTime:isoIST('2026-04-17',19,30), venue:'Ahmedabad',       pl:false},
      {id:26, t1:'RCB', t2:'DC',  date:'18 Apr', tossTime:isoIST('2026-04-18',15,30), venue:'Bengaluru',       pl:false},
      {id:27, t1:'SRH', t2:'CSK', date:'18 Apr', tossTime:isoIST('2026-04-18',19,30), venue:'Hyderabad',       pl:false},
      {id:28, t1:'KKR', t2:'RR',  date:'19 Apr', tossTime:isoIST('2026-04-19',15,30), venue:'Kolkata',         pl:false},
      {id:29, t1:'PBKS',t2:'LSG', date:'19 Apr', tossTime:isoIST('2026-04-19',19,30), venue:'New Chandigarh',  pl:false},
      {id:30, t1:'GT',  t2:'MI',  date:'20 Apr', tossTime:isoIST('2026-04-20',19,30), venue:'Ahmedabad',       pl:false},
      {id:31, t1:'SRH', t2:'DC',  date:'21 Apr', tossTime:isoIST('2026-04-21',19,30), venue:'Hyderabad',       pl:false},
      {id:32, t1:'LSG', t2:'RR',  date:'22 Apr', tossTime:isoIST('2026-04-22',19,30), venue:'Lucknow',         pl:false},
      {id:33, t1:'MI',  t2:'CSK', date:'23 Apr', tossTime:isoIST('2026-04-23',19,30), venue:'Mumbai',          pl:false},
      {id:34, t1:'RCB', t2:'GT',  date:'24 Apr', tossTime:isoIST('2026-04-24',19,30), venue:'Bengaluru',       pl:false},
      {id:35, t1:'DC',  t2:'PBKS',date:'25 Apr', tossTime:isoIST('2026-04-25',15,30), venue:'Delhi',           pl:false},
      {id:36, t1:'RR',  t2:'SRH', date:'25 Apr', tossTime:isoIST('2026-04-25',19,30), venue:'Jaipur',          pl:false},
      {id:37, t1:'GT',  t2:'CSK', date:'26 Apr', tossTime:isoIST('2026-04-26',15,30), venue:'Ahmedabad',       pl:false},
      {id:38, t1:'LSG', t2:'KKR', date:'26 Apr', tossTime:isoIST('2026-04-26',19,30), venue:'Lucknow',         pl:false},
      {id:39, t1:'DC',  t2:'RCB', date:'27 Apr', tossTime:isoIST('2026-04-27',19,30), venue:'Delhi',           pl:false},
      {id:40, t1:'PBKS',t2:'RR',  date:'28 Apr', tossTime:isoIST('2026-04-28',19,30), venue:'New Chandigarh',  pl:false},
      {id:41, t1:'MI',  t2:'SRH', date:'29 Apr', tossTime:isoIST('2026-04-29',19,30), venue:'Mumbai',          pl:false},
      {id:42, t1:'GT',  t2:'RCB', date:'30 Apr', tossTime:isoIST('2026-04-30',19,30), venue:'Ahmedabad',       pl:false},
      {id:43, t1:'RR',  t2:'DC',  date:'01 May', tossTime:isoIST('2026-05-01',19,30), venue:'Jaipur',          pl:false},
      {id:44, t1:'CSK', t2:'MI',  date:'02 May', tossTime:isoIST('2026-05-02',19,30), venue:'Chennai',         pl:false},
      {id:45, t1:'SRH', t2:'KKR', date:'03 May', tossTime:isoIST('2026-05-03',15,30), venue:'Hyderabad',       pl:false},
      {id:46, t1:'GT',  t2:'PBKS',date:'03 May', tossTime:isoIST('2026-05-03',19,30), venue:'Ahmedabad',       pl:false},
      {id:47, t1:'MI',  t2:'LSG', date:'04 May', tossTime:isoIST('2026-05-04',19,30), venue:'Mumbai',          pl:false},
      {id:48, t1:'DC',  t2:'CSK', date:'05 May', tossTime:isoIST('2026-05-05',19,30), venue:'Delhi',           pl:false},
      {id:49, t1:'SRH', t2:'PBKS',date:'06 May', tossTime:isoIST('2026-05-06',19,30), venue:'Hyderabad',       pl:false},
      {id:50, t1:'LSG', t2:'RCB', date:'07 May', tossTime:isoIST('2026-05-07',19,30), venue:'Lucknow',         pl:false},
      {id:51, t1:'DC',  t2:'KKR', date:'08 May', tossTime:isoIST('2026-05-08',19,30), venue:'Delhi',           pl:false},
      {id:52, t1:'RR',  t2:'GT',  date:'09 May', tossTime:isoIST('2026-05-09',19,30), venue:'Jaipur',          pl:false},
      {id:53, t1:'CSK', t2:'LSG', date:'10 May', tossTime:isoIST('2026-05-10',15,30), venue:'Chennai',         pl:false},
      {id:54, t1:'RCB', t2:'MI',  date:'10 May', tossTime:isoIST('2026-05-10',19,30), venue:'Raipur',          pl:false},
      {id:55, t1:'PBKS',t2:'DC',  date:'11 May', tossTime:isoIST('2026-05-11',19,30), venue:'Dharamshala',     pl:false},
      {id:56, t1:'GT',  t2:'SRH', date:'12 May', tossTime:isoIST('2026-05-12',19,30), venue:'Ahmedabad',       pl:false},
      {id:57, t1:'RCB', t2:'KKR', date:'13 May', tossTime:isoIST('2026-05-13',19,30), venue:'Raipur',          pl:false},
      {id:58, t1:'PBKS',t2:'MI',  date:'14 May', tossTime:isoIST('2026-05-14',19,30), venue:'Dharamshala',     pl:false},
      {id:59, t1:'LSG', t2:'CSK', date:'15 May', tossTime:isoIST('2026-05-15',19,30), venue:'Lucknow',         pl:false},
      {id:60, t1:'KKR', t2:'GT',  date:'16 May', tossTime:isoIST('2026-05-16',19,30), venue:'Kolkata',         pl:false},
      {id:61, t1:'PBKS',t2:'RCB', date:'17 May', tossTime:isoIST('2026-05-17',15,30), venue:'Dharamshala',     pl:false},
      {id:62, t1:'DC',  t2:'RR',  date:'17 May', tossTime:isoIST('2026-05-17',19,30), venue:'Delhi',           pl:false},
      {id:63, t1:'CSK', t2:'SRH', date:'18 May', tossTime:isoIST('2026-05-18',19,30), venue:'Chennai',         pl:false},
      {id:64, t1:'RR',  t2:'LSG', date:'19 May', tossTime:isoIST('2026-05-19',19,30), venue:'Jaipur',          pl:false},
      {id:65, t1:'KKR', t2:'MI',  date:'20 May', tossTime:isoIST('2026-05-20',19,30), venue:'Kolkata',         pl:false},
      {id:66, t1:'CSK', t2:'GT',  date:'21 May', tossTime:isoIST('2026-05-21',19,30), venue:'Chennai',         pl:false},
      {id:67, t1:'SRH', t2:'RCB', date:'22 May', tossTime:isoIST('2026-05-22',19,30), venue:'Hyderabad',       pl:false},
      {id:68, t1:'LSG', t2:'PBKS',date:'23 May', tossTime:isoIST('2026-05-23',19,30), venue:'Lucknow',         pl:false},
      {id:69, t1:'MI',  t2:'RR',  date:'24 May', tossTime:isoIST('2026-05-24',15,30), venue:'Mumbai',          pl:false},
      {id:70, t1:'KKR', t2:'DC',  date:'24 May', tossTime:isoIST('2026-05-24',19,30), venue:'Kolkata',         pl:false},
      {id:71, t1:'TBD', t2:'TBD', date:'26 May', tossTime:isoIST('2026-05-26',19,30), venue:'TBD', pl:true, label:'Qualifier 1'},
      {id:72, t1:'TBD', t2:'TBD', date:'27 May', tossTime:isoIST('2026-05-27',19,30), venue:'TBD', pl:true, label:'Eliminator'},
      {id:73, t1:'TBD', t2:'TBD', date:'29 May', tossTime:isoIST('2026-05-29',19,30), venue:'TBD', pl:true, label:'Qualifier 2'},
      {id:74, t1:'TBD', t2:'TBD', date:'31 May', tossTime:isoIST('2026-05-31',19,30), venue:'TBD', pl:true, label:'🏆 FINAL'},
    ],
  },
  NFL: {
    key: 'NFL',
    displayName: 'NFL 2026',
    heroBadge: '🏈 NFL 2026 · Season Active · Chiefs Defending Champions',
    seasonLabel: '2026 Season',
    totalMatches: 20,
    phases: [
      { label: 'REGULAR SEASON · Week 1–8', ids: rng(1,8) },
      { label: 'REGULAR SEASON · Week 9–16', ids: rng(9,16) },
      { label: 'PLAYOFFS', ids: rng(17,20) },
    ],
    teams: {
      ARI: { n: 'Arizona Cardinals',      e:'🦂' },
      ATL: { n: 'Atlanta Falcons',        e:'🦅' },
      BAL: { n: 'Baltimore Ravens',       e:'🟣' },
      BUF: { n: 'Buffalo Bills',          e:'🐃' },
      CAR: { n: 'Carolina Panthers',      e:'🐾' },
      CHI: { n: 'Chicago Bears',          e:'🐻' },
      CIN: { n: 'Cincinnati Bengals',     e:'🐯' },
      CLE: { n: 'Cleveland Browns',       e:'🟠' },
      DAL: { n: 'Dallas Cowboys',         e:'🤠' },
      DEN: { n: 'Denver Broncos',         e:'⛰️' },
      DET: { n: 'Detroit Lions',          e:'🦁' },
      GB:  { n: 'Green Bay Packers',      e:'🧀' },
      HOU: { n: 'Houston Texans',        e:'🤠' },
      IND: { n: 'Indianapolis Colts',     e:'🐎' },
      JAX: { n: 'Jacksonville Jaguars',   e:'🐆' },
      KC:  { n: 'Kansas City Chiefs',     e:'🛡️' },
      LAC: { n: 'Los Angeles Chargers',   e:'⚡' },
      LAR: { n: 'Los Angeles Rams',       e:'🐏' },
      MIA: { n: 'Miami Dolphins',         e:'🐬' },
      MIN: { n: 'Minnesota Vikings',      e:'🛡️' },
      NE:  { n: 'New England Patriots',   e:'🦈' },
      NO:  { n: 'New Orleans Saints',     e:'⚜️' },
      NYG: { n: 'New York Giants',        e:'🗽' },
      NYJ: { n: 'New York Jets',          e:'🌿' },
      PHI: { n: 'Philadelphia Eagles',    e:'🦅' },
      PIT: { n: 'Pittsburgh Steelers',    e:'⚫' },
      SF:  { n: 'San Francisco 49ers',    e:'🟥' },
      SEA: { n: 'Seattle Seahawks',       e:'🌊' },
      TB:  { n: 'Tampa Bay Buccaneers',   e:'🏴‍☠️' },
      TEN: { n: 'Tennessee Titans',      e:'🎯' },
      WAS: { n: 'Washington Commanders',  e:'🪖' },
      LV:  { n: 'Las Vegas Raiders',      e:'🎰' },
    },
    matches: [
      {id:1,  t1:'KC',  t2:'BUF', date:'06 Sep', tossTime:isoET('2026-09-06',20,15), venue:'Kansas City', pl:false},
      {id:2,  t1:'MIA', t2:'NYJ', date:'07 Sep', tossTime:isoET('2026-09-07',16,25), venue:'Miami',       pl:false},
      {id:3,  t1:'DAL', t2:'PHI', date:'13 Sep', tossTime:isoET('2026-09-13',16,25), venue:'Dallas',      pl:false},
      {id:4,  t1:'SF',  t2:'LAR', date:'13 Sep', tossTime:isoET('2026-09-13',16,25), venue:'San Francisco',pl:false},
      {id:5,  t1:'BAL', t2:'CIN', date:'13 Sep', tossTime:isoET('2026-09-13',20,20), venue:'Baltimore',   pl:false},
      {id:6,  t1:'TEN', t2:'IND', date:'14 Sep', tossTime:isoET('2026-09-14',13,00), venue:'Nashville',   pl:false},
      {id:7,  t1:'LV',  t2:'DEN', date:'14 Sep', tossTime:isoET('2026-09-14',16,05), venue:'Las Vegas',   pl:false},
      {id:8,  t1:'NO',  t2:'TB',  date:'14 Sep', tossTime:isoET('2026-09-14',20,15), venue:'New Orleans', pl:false},
      {id:9,  t1:'PIT', t2:'CLE', date:'20 Sep', tossTime:isoET('2026-09-20',13,00), venue:'Pittsburgh',  pl:false},
      {id:10, t1:'CHI', t2:'DET', date:'20 Sep', tossTime:isoET('2026-09-20',13,00), venue:'Chicago',     pl:false},
      {id:11, t1:'SEA', t2:'LAC', date:'20 Sep', tossTime:isoET('2026-09-20',16,05), venue:'Seattle',     pl:false},
      {id:12, t1:'CAR', t2:'ATL', date:'20 Sep', tossTime:isoET('2026-09-20',16,25), venue:'Carolina',    pl:false},
      {id:13, t1:'GB',  t2:'MIN', date:'20 Sep', tossTime:isoET('2026-09-20',20,20), venue:'Green Bay',   pl:false},
      {id:14, t1:'HOU', t2:'JAX', date:'21 Sep', tossTime:isoET('2026-09-21',13,00), venue:'Houston',     pl:false},
      {id:15, t1:'NYG', t2:'WAS', date:'21 Sep', tossTime:isoET('2026-09-21',16,05), venue:'New York',    pl:false},
      {id:16, t1:'NE',  t2:'KC',  date:'21 Sep', tossTime:isoET('2026-09-21',20,20), venue:'Foxborough',   pl:false},
      {id:17, t1:'TBD', t2:'TBD', date:'10 Jan', tossTime:isoET('2027-01-10',20,15), venue:'TBD', pl:true, label:'Wild Card 1'},
      {id:18, t1:'TBD', t2:'TBD', date:'11 Jan', tossTime:isoET('2027-01-11',20,15), venue:'TBD', pl:true, label:'Wild Card 2'},
      {id:19, t1:'TBD', t2:'TBD', date:'17 Jan', tossTime:isoET('2027-01-17',20,15), venue:'TBD', pl:true, label:'Divisional'},
      {id:20, t1:'TBD', t2:'TBD', date:'31 Jan', tossTime:isoET('2027-01-31',18,30), venue:'TBD', pl:true, label:'🏆 Championship'},
    ],
  },
};

function setLeague(leagueKey) {
  if (!LEAGUES[leagueKey]) {
    console.warn(`Unknown league ${leagueKey}`);
    return;
  }
  activeLeague = leagueKey;
  TEAMS = LEAGUES[leagueKey].teams;
  MATCHES = [...LEAGUES[leagueKey].matches];
  REAL_MATCHES = [...MATCHES];
}
function getLeagueConfig() { return LEAGUES[activeLeague] || LEAGUES.IPL; }
function getTeam(code) { return TEAMS[code] || {}; }
function getMatch(mid) { return MATCHES.find(x => x.id === mid); }

setLeague(activeLeague);

const LOCK_BUFFER_MS = 0; // Lock at match start time

function matchLockTime(m) { return new Date(m.tossTime).getTime() - LOCK_BUFFER_MS; }
function isMatchLocked(m) { return Date.now() >= matchLockTime(m); }
function secsUntilLock(m) { return Math.max(0, Math.floor((matchLockTime(m) - Date.now()) / 1000)); }

function matchTimeLabel(m) {
  const toss = new Date(m.tossTime);
  const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timeStr = toss.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true, timeZone: userTZ
  });
  const tzLabel = toss.toLocaleTimeString('en-US', {
    timeZoneName: 'short', timeZone: userTZ
  }).split(' ').pop();
  return timeStr + ' ' + tzLabel + ' (Start)';
}
