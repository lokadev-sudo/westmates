/* Westmates — clickable simulation of the Westmates app.
   Student concept for 6LEAD001W (University of Westminster). All people, events and numbers are sample data.
   Everything is stored only on this device (localStorage). */
(function () {
  'use strict';

  // ---------- Icons (inline stroke SVG) ----------
  const I = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
    mates: '<circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15 15c2.8 0 5 2.2 5 5"/>',
    events: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    star: '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z"/>',
    me: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>',
    back: '<path d="M15 18l-6-6 6-6"/>',
    next: '<path d="M9 6l6 6-6 6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    walk: '<path d="M5 20l4-16M15 4l4 16M3 12h18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    send: '<path d="M4 12l16-8-6 16-2.5-6.5z"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>',
    share: '<path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5.5A1.5 1.5 0 004 12.5v7A1.5 1.5 0 005.5 21h13a1.5 1.5 0 001.5-1.5v-7a1.5 1.5 0 00-1.5-1.5H18"/>',
    addbox: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8.5v7M8.5 12h7"/>',
    dots: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
    moon: '<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/>',
    vibrate: '<rect x="8" y="4" width="8" height="16" rx="2"/><path d="M4.5 9v6M19.5 9v6M2 10.5v3M22 10.5v3"/>',
    kebab: '<circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>',
    menu: '<path d="M5 7h14M5 12h14M5 17h9"/>',
    film: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7.5 5v14M16.5 5v14M3 9.7h4.5M3 14.3h4.5M16.5 9.7H21M16.5 14.3H21"/>',
    food: '<path d="M3 12h18a9 9 0 01-18 0z"/><path d="M9 8.5c0-1.6 1.2-2 1.2-3.5M13.8 8.5c0-1.6 1.2-2 1.2-3.5"/>',
    museum: '<path d="M3 9l9-5 9 5z"/><path d="M5.5 11.5v6M10 11.5v6M14 11.5v6M18.5 11.5v6M3 20.5h18"/>',
    firework: '<path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4M5.3 5.3l2.8 2.8M15.9 15.9l2.8 2.8M5.3 18.7l2.8-2.8M15.9 8.1l2.8-2.8"/><circle cx="12" cy="12" r="1.6"/>',
    dumpling: '<path d="M2.5 14.5c0-4.4 4.3-7.5 9.5-7.5s9.5 3.1 9.5 7.5c0 1.9-1.6 3-3.5 3h-12c-1.9 0-3.5-1.1-3.5-3z"/><path d="M8 8l1.2 3.5M12 7v4M16 8l-1.2 3.5"/>',
    tea: '<path d="M4 9.5h13V14a5 5 0 01-5 5H9a5 5 0 01-5-5z"/><path d="M17 11.5h1.5a2.5 2.5 0 010 5H17"/><path d="M8.5 3c0 1.6 1.2 1.6 1.2 3.5M12.5 3c0 1.6 1.2 1.6 1.2 3.5"/>',
    social: '<path d="M3.5 4.5h11a2 2 0 012 2V12a2 2 0 01-2 2H9l-4 3.5V14H3.5a2 2 0 01-2-2V6.5a2 2 0 012-2z"/><path d="M19 8.5h1.5a2 2 0 012 2V16a2 2 0 01-2 2H19v3l-3.5-3H12"/>',
    tree: '<path d="M12 21.5v-5"/><path d="M12 2.5L6.5 10h3l-4.5 6.5h14L14.5 10h3z"/>',
    coffee: '<path d="M4 8h13v5.5a5.5 5.5 0 01-5.5 5.5h-2A5.5 5.5 0 014 13.5z"/><path d="M17 10h1.5a2.5 2.5 0 010 5H17M3 21.5h16M9 2.5c0 1.5 1 1.5 1 3M13 2.5c0 1.5 1 1.5 1 3"/>',
    ticket: '<path d="M3 7.5a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0121 7.5V10a2 2 0 000 4v2.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 16.5V14a2 2 0 000-4z"/><path d="M14.5 6v2M14.5 11v2M14.5 16v2"/>',
    medal: '<circle cx="12" cy="15" r="5.5"/><path d="M8.3 11L5.5 2.5h4.2l2.3 5 2.3-5h4.2L15.7 11"/><path d="M12 12.5l.8 1.6 1.7.2-1.3 1.2.3 1.7-1.5-.8-1.5.8.3-1.7-1.3-1.2 1.7-.2z"/>',
    smile: '<circle cx="12" cy="12" r="9.5"/><path d="M8 14a4.6 4.6 0 008 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    breathe: '<path d="M3 9h11.5a3 3 0 10-3-3"/><path d="M3 13.5h15a3 3 0 11-3 3"/><path d="M3 18h6"/>',
    camera: '<path d="M4 7.5h3l2-3h6l2 3h3a1.5 1.5 0 011.5 1.5v9.5a1.5 1.5 0 01-1.5 1.5H4a1.5 1.5 0 01-1.5-1.5V9A1.5 1.5 0 014 7.5z"/><circle cx="12" cy="13.5" r="3.5"/>',
    music: '<path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    gym: '<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',
    ball: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7.5l4 2.9-1.5 4.6h-5L8 10.4z"/><path d="M12 2.5v5M16 10.4l5-1.6M14.5 15l3 4.2M9.5 15l-3 4.2M8 10.4L3 8.8"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 016.5 3H20v15.5H6.5A2.5 2.5 0 004 21z"/><path d="M4 21V5.5M8.5 7.5h7"/>',
    dice: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8.5 8.5h.01M15.5 15.5h.01M15.5 8.5h.01M8.5 15.5h.01M12 12h.01" stroke-width="3"/>',
    clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 7v5l3.2 2"/>',
    gift: '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13.5h18M12 9v12"/><path d="M12 9c-1.6-3.8-6-4.2-6-1.6C6 8.6 8 9 12 9zM12 9c1.6-3.8 6-4.2 6-1.6C18 8.6 16 9 12 9z"/>',
    sparkle: '<path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6-5.6-1.9 5.6-1.9z"/><path d="M19 16v4M17 18h4"/>',
    lamp: '<path d="M4 14c0 2.8 3.6 5 8 5s8-2.2 8-5z"/><path d="M12 14c-2-2-2-4.5 0-7.5 2 3 2 5.5 0 7.5z"/>',
    crescent: '<path d="M16 3.5A8.5 8.5 0 1020.5 15 7 7 0 0116 3.5z"/>',
    face0: '<circle cx="12" cy="12" r="9.5"/><path d="M8 16.5a4.6 4.6 0 018 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    face1: '<circle cx="12" cy="12" r="9.5"/><path d="M8.5 15.8c2-1.2 5-1.2 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    face2: '<circle cx="12" cy="12" r="9.5"/><path d="M8.5 15h7"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    face3: '<circle cx="12" cy="12" r="9.5"/><path d="M8.5 14.2c2 1.4 5 1.4 7 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    face4: '<circle cx="12" cy="12" r="9.5"/><path d="M7.5 13.5a4.8 4.8 0 009 0z"/><path d="M9 9.5h.01M15 9.5h.01"/>'
  };
  // Visual kinds: an icon and a colour family for each type of event, challenge, interest and reward.
  const KIND = {
    walk: ['tree', 'park'], film: ['film', 'plum'], food: ['food', 'lantern'], museum: ['museum', 'thames'],
    fireworks: ['firework', 'night'], dumplings: ['dumpling', 'rose'], wellbeing: ['tea', 'park'], social: ['social', 'thames'],
    music: ['music', 'plum'], sport: ['ball', 'park'], study: ['book', 'thames'], games: ['dice', 'rose'], photo: ['camera', 'plum']
  };
  const guessKind = (t) => {
    t = String(t).toLowerCase();
    const rules = [['walk', /walk|park|hike|run/], ['film', /film|movie|cinema/], ['food', /cook|food|dinner|lunch|brunch|eat|jollof|bake/],
      ['museum', /museum|gallery|exhibit/], ['fireworks', /firework|new year|party/], ['dumplings', /dumpling|lunar/], ['wellbeing', /wellbeing|tea|yoga|breath|mindful/],
      ['music', /music|gig|concert|karaoke/], ['sport', /football|gym|sport|match/], ['study', /study|revis|library|exam/], ['games', /game|quiz/], ['photo', /photo|camera/]];
    const hit = rules.find(([, re]) => re.test(t));
    return hit ? hit[0] : 'social';
  };
  const kindOf = (e) => KIND[e.kind] ? e.kind : guessKind(e.title);
  const tile = (iconName, tone, size = 'md') => `<span class="tile ${size} t-${tone}" aria-hidden="true">${icon(iconName, size === 'lg' ? 44 : size === 'sm' ? 20 : 26, 'currentColor', size === 'lg' ? 1.8 : 2)}</span>`;
  const eventTile = (e, size) => { const [ic, tone] = KIND[kindOf(e)]; return tile(ic, tone, size); };
  const INTEREST_ICON = { Walks: 'tree', Films: 'film', Cooking: 'food', 'Board games': 'dice', Gym: 'gym', Museums: 'museum', Music: 'music', 'Study buddy': 'book', Football: 'ball', Photography: 'camera' };
  const BREAK_ICON = { 'Christmas & New Year': 'tree', 'Lunar New Year': 'dumpling', Eid: 'crescent', Diwali: 'lamp', Easter: 'sparkle', 'Reading week': 'book' };
  const chipIcon = (map, label) => map[label] ? icon(map[label], 18, 'currentColor', 2) : '';
  // "Sat 26 Dec · 11am" -> date block; anything else falls back to a calendar icon.
  function dateParts(when) {
    const m = String(when).match(/^\s*([A-Za-z]{3})\w*\s+(\d{1,2})\s+([A-Za-z]{3})\w*\s*(?:·\s*(.+))?$/);
    if (m) return { d: m[2], mo: m[3].toUpperCase(), t: (m[4] || '').trim() };
    const y = String(when).match(/^\s*([A-Za-z]{3})\w*\s+\d{4}\s*(?:·\s*(.+))?$/);
    if (y) return { d: '', mo: y[1].toUpperCase(), t: (y[2] || '').trim() };
    return null;
  }
  const dateBlock = (e) => {
    const p = dateParts(e.when);
    if (!p) return `<span class="ev-date" aria-hidden="true"><span class="mo">&nbsp;</span><span class="d">${icon('events', 20)}</span></span>`;
    return `<span class="ev-date" aria-hidden="true"><span class="mo">${esc(p.mo)}</span><span class="d">${esc(p.d || '?')}</span><span class="t">${esc(p.t)}</span></span>`;
  };
  const facesFor = (e, n = 3) => { const k = allEvents().indexOf(e); return Array.from({ length: n }, (_, i) => MATES[(Math.max(0, k) * 2 + i) % MATES.length]); };
  const icon = (name, size = 22, color = 'currentColor', sw = 2) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name]}</svg>`;
  const lanternMark = (h = 24) =>
    `<svg width="${h * 0.75}" height="${h}" viewBox="0 0 18 24" aria-hidden="true"><rect x="5" y="0" width="8" height="4" rx="2" fill="var(--lantern)"/><rect x="1" y="5" width="16" height="16" rx="8" fill="var(--lantern)"/><rect x="6" y="21" width="6" height="3" rx="1.5" fill="var(--lantern)"/></svg>`;
  const lights = () =>
    `<svg class="lights" width="150" height="120" viewBox="0 0 150 120" aria-hidden="true">${[[20,100,8],[60,100,4],[100,92,8],[40,72,4],[84,64,4],[124,56,4],[64,36,8],[108,20,4],[140,96,4]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--lantern)"/>`).join('')}</svg>`;

  // ---------- Sample data ----------
  const BREAKS = ['Christmas & New Year', 'Lunar New Year', 'Eid', 'Diwali', 'Easter', 'Reading week'];
  const INTERESTS = ['Walks', 'Films', 'Cooking', 'Board games', 'Gym', 'Museums', 'Music', 'Study buddy', 'Football', 'Photography'];
  const AV = ['#fbe9cc', '#dce6f2', '#dcebe2', '#f3dfe6', '#e6e1f3', '#fbe9cc', '#dce6f2', '#dcebe2'];

  const MATES = [
    { id: 'mei', name: 'Mei', course: '2nd year · Business Management', from: 'Shanghai', staying: true, interests: ['Walks', 'Films', 'Photography'], reply: "Hi! Yes, I'm here all break. Fancy the Boxing Day walk?" },
    { id: 'omar', name: 'Omar', course: '1st year · Computer Science', from: 'Cairo', staying: true, interests: ['Board games', 'Cooking', 'Football'], reply: "Hey! I'm staying too. Board games at some point?" },
    { id: 'priya', name: 'Priya', course: 'Final year · Psychology', from: 'Leicester', staying: true, interests: ['Museums', 'Walks', 'Music'], reply: "Hi Alex! The museums are free, we should go one day." },
    { id: 'lukas', name: 'Lukas', course: 'Postgrad · Data Science', from: 'Vilnius', staying: true, interests: ['Gym', 'Study buddy', 'Films'], reply: "Hello! I've got a deadline in January, study buddy?" },
    { id: 'amara', name: 'Amara', course: '2nd year · Law', from: 'Lagos', staying: true, interests: ['Cooking', 'Music', 'Walks'], reply: "Hiya! I'm cooking jollof for whoever's around, come by." },
    { id: 'tom', name: 'Tom', course: '1st year · Architecture', from: 'Norwich', staying: false, interests: ['Photography', 'Films', 'Walks'], reply: "Hey! I'm home for the break but around in term." },
    { id: 'sofia', name: 'Sofia', course: '3rd year · Fashion', from: 'Madrid', staying: true, interests: ['Photography', 'Museums', 'Gym'], reply: "Hi! Always up for a gallery and a coffee." },
    { id: 'kenji', name: 'Kenji', course: '2nd year · Film', from: 'Osaka', staying: false, interests: ['Films', 'Music', 'Board games'], reply: "Hey, film night is my thing. See you in term!" }
  ];

  const SEED_EVENTS = [
    { id: 'wellbeing-wed', kind: 'wellbeing', title: 'Wellbeing Wednesday', cat: 'su', holiday: false, when: 'Wed 18 Nov · 1pm', where: 'Marylebone campus', host: "Students' Union", going: 23, desc: 'A relaxed drop-in run by the SU wellbeing team. Tea, colouring, a chat if you want one.' },
    { id: 'intl-social', kind: 'social', title: "International students' social", cat: 'su', holiday: false, when: 'Fri 20 Nov · 6pm', where: 'Regent Street campus', host: "SU International Community Organiser", going: 41, desc: 'Meet students from all over the world. Food, music and games.' },
    { id: 'film-night', kind: 'film', title: 'Film night, bring snacks', cat: 'student', holiday: false, when: 'Sat 21 Nov · 7pm', where: 'Marylebone halls common room', host: 'Kenji', going: 6, desc: 'We pick the film together on the night. Bring snacks if you like.' },
    { id: 'boxing-walk', kind: 'walk', title: "Boxing Day walk: Regent's Park", cat: 'student', holiday: true, when: 'Sat 26 Dec · 11am', where: 'Outside Marylebone campus', host: 'Mei', going: 8, desc: 'About an hour, easy pace, hot drinks after. Everyone welcome.' },
    { id: 'jollof', kind: 'food', title: 'Cook-up: jollof and friends', cat: 'student', holiday: true, when: 'Sun 27 Dec · 5pm', where: 'Amara’s halls kitchen', host: 'Amara', going: 5, desc: 'Bring a dish from home or just bring yourself.' },
    { id: 'museum', kind: 'museum', title: 'Free museums day', cat: 'student', holiday: true, when: 'Tue 29 Dec · 12pm', where: 'British Museum entrance', host: 'Priya', going: 7, desc: 'Free entry. We’ll do two galleries and lunch.' },
    { id: 'nye', kind: 'fireworks', title: "New Year's Eve: watch the fireworks together", cat: 'su', holiday: true, when: 'Thu 31 Dec · 9pm', where: 'Meet at Regent Street campus', host: "Students' Union", going: 19, desc: 'Watch party with SU staff, then walk down together. Wrap up warm.' },
    { id: 'lny', kind: 'dumplings', title: 'Lunar New Year dumpling night', cat: 'su', holiday: true, when: 'Feb 2027 · TBC', where: 'Cavendish campus', host: 'SU International Community Organiser', going: 12, desc: 'Make dumplings, learn a few traditions, meet people staying for the festival.' }
  ];

  const CHALLENGES = [
    { id: 'walk', ic: 'tree', tone: 'park', label: "Walk to Regent's Park with a mate", pts: 20 },
    { id: 'cook', ic: 'food', tone: 'lantern', label: 'Cook something from home and share it', pts: 15 },
    { id: 'hi', ic: 'smile', tone: 'rose', label: 'Say hi to a new mate', pts: 10 },
    { id: 'breathe', ic: 'breathe', tone: 'thames', label: 'Try a 10-minute breathing session', pts: 5 },
    { id: 'event', ic: 'events', tone: 'plum', label: 'Join an event', pts: 10 }
  ];

  const REWARDS = [
    { id: 'coffee', ic: 'coffee', tone: 'lantern', title: 'Coffee on campus', cost: 300, note: 'At a partner campus café' },
    { id: 'award', ic: 'medal', tone: 'thames', title: 'Westminster Award points', cost: 500, note: 'Counts towards your Westminster Award' },
    { id: 'cinema', ic: 'ticket', tone: 'plum', title: 'SU cinema ticket', cost: 400, note: 'Student film night' }
  ];

  const LONELY = ['Often or always', 'Some of the time', 'Occasionally', 'Hardly ever', 'Never'];

  // ---------- State ----------
  const KEY = 'westmates-demo-v1';
  const APP_VERSION = '20';   // shown at the bottom of the Me page
  const today = () => new Date().toISOString().slice(0, 10);
  const fresh = () => ({
    name: 'Alex',
    points: 230,
    history: [{ text: 'Welcome bonus', pts: 230 }],
    holiday: { on: false, breaks: ['Christmas & New Year'], interests: ['Walks', 'Films'] },
    joined: [],
    myEvents: [],
    chats: {},
    done: { day: today(), ids: [] },
    redeemed: [],
    checkins: {},
    seenIntro: false
  });
  let S = load();
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = Object.assign(fresh(), JSON.parse(raw));
        if (!s.done || s.done.day !== today()) s.done = { day: today(), ids: [] };
        return s;
      }
    } catch (e) { /* storage blocked: run in memory */ }
    return fresh();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }
  function addPoints(pts, text) { S.points = Math.max(0, S.points + pts); S.history.unshift({ text, pts }); save(); }

  // ---------- Helpers ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (sel) => document.querySelector(sel);
  const mateById = (id) => MATES.find((m) => m.id === id);
  const allEvents = () => S.myEvents.concat(SEED_EVENTS);
  const eventById = (id) => allEvents().find((e) => e.id === id);
  const shared = (m) => m.interests.filter((i) => S.holiday.interests.includes(i));
  const avatar = (m, cls = '') => `<span class="avatar ${cls}" style="background:${AV[MATES.indexOf(m) % AV.length] || '#fbe9cc'}" aria-hidden="true">${esc(m.name.charAt(0))}</span>`;
  const catLabel = (e) => e.cat === 'su' ? '<span class="label blue">SU &amp; uni</span>' : '<span class="label amber">By a student</span>';
  let toastTimer, lastToast = 0;
  function toast(msg) {
    lastToast = Date.now();
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
  }
  const back = (href, label, onNight) => `<a class="back" href="${href}" style="${onNight ? 'color:var(--on-night)' : ''}">${icon('back', 18)}${esc(label)}</a>`;
  const coffeeGoal = () => { const left = Math.max(0, 300 - S.points); return left ? `${left} pts to a coffee on campus` : 'Coffee unlocked. Treat yourself'; };

  // ---------- Screens ----------
  function home() {
    const hm = S.holiday.on;
    const upcoming = allEvents().filter((e) => hm ? e.holiday : !e.holiday).slice(0, 3);
    const doneCount = S.done.ids.length;
    return `
    <header class="band">
      <div class="row between">
        <div class="wordmark">${lanternMark(24)}<span>Westmates</span></div>
        <a class="pill-badge" href="#/challenges" aria-label="${S.points} points">${icon('star', 14, 'currentColor', 2.4)}${S.points} pts</a>
      </div>
      <p class="small muted" style="margin:0">Hi ${esc(S.name)}</p>
      <h1 class="h1">${hm ? 'Your break in London' : "What's on this week"}</h1>
    </header>
    <div class="content">
      ${hm ? `
      <section class="card warm holiday-card">
        <span class="holiday-art" aria-hidden="true">${lanternMark(42)}</span>
        <span class="label amber">Holiday mode is on</span>
        <span class="stack" style="margin:4px 0 2px">${MATES.filter((m) => m.staying).slice(0, 5).map((m) => avatar(m, 'sm')).join('')}</span>
        <span class="card-title">${MATES.filter((m) => m.staying).length} mates are staying in London too.</span>
        <span class="small muted">Breaks: ${esc(S.holiday.breaks.join(', '))}</span>
        <div class="row" style="margin-top:6px"><a class="btn primary sm" href="#/mates">See your mates</a><a class="btn secondary sm" href="#/holiday">Edit</a></div>
      </section>` : `
      <section class="card warm holiday-card">
        <span class="holiday-art" aria-hidden="true">${lanternMark(42)}</span>
        <span class="label amber">Holiday mode</span>
        <span class="card-title" style="font-size:18px;line-height:24px">Campus closes for the winter break soon.</span>
        <span class="small muted">Staying in London? Find mates who are staying too.</span>
        <a class="btn primary" href="#/holiday" style="align-self:flex-start;margin-top:6px">Set up holiday mode</a>
      </section>`}
      ${(() => { const nextC = CHALLENGES.find((c) => !S.done.ids.includes(c.id)); return `<a class="card ev" href="#/challenges">
        ${nextC ? tile(nextC.ic, nextC.tone) : tile('check', 'park')}
        <span class="ev-info">
          <span class="label green">Today's challenge · ${doneCount}/${CHALLENGES.length} done</span>
          <span class="card-title">${nextC ? esc(nextC.label) : 'All done today. Nice one!'}</span>
          <span class="dots" aria-hidden="true">${CHALLENGES.map((c) => `<i class="${S.done.ids.includes(c.id) ? 'on' : ''}"></i>`).join('')}</span>
        </span>
        ${nextC ? `<span class="pts-badge">+${nextC.pts}</span>` : ''}
      </a>`; })()}
      <div class="row between"><h2 class="h2">${hm ? 'Holiday events' : 'From the SU, the uni and students'}</h2><a class="small" href="#/events" style="font-weight:600">All</a></div>
      ${upcoming.map(eventCard).join('')}
      <a class="card blue ev" href="#/checkin">
        <span class="faces-row" aria-hidden="true">${[0, 2, 4].map((n) => icon('face' + n, 26, 'var(--thames)', 1.8)).join('')}</span>
        <span class="ev-info">
          <span class="label blue">1-minute check-in</span>
          <span class="card-title">How are you doing this week?</span>
          <span class="small muted">Anonymous. Helps show whether Westmates works.</span>
        </span>
      </a>
    </div>`;
  }

  function eventCard(e) {
    const going = e.going + (S.joined.includes(e.id) ? 1 : 0);
    const p = dateParts(e.when);
    return `<a class="card ev" href="#/event/${e.id}">
      ${eventTile(e)}
      <span class="ev-info">
        <span class="row" style="gap:8px">${catLabel(e)}${S.joined.includes(e.id) ? '<span class="label green">· Going</span>' : ''}</span>
        <span class="card-title">${esc(e.title)}</span>
        <span class="ev-meta">${going ? `<span class="stack">${facesFor(e, Math.min(3, going)).map((m) => avatar(m, 'xs')).join('')}</span>` : ''}<span class="tiny muted">${going} going${p ? '' : ' · ' + esc(e.when)}</span></span>
      </span>
      ${dateBlock(e)}
    </a>`;
  }

  function holiday() {
    const chip = (label, list) => `<button type="button" class="chip" data-act="toggle-${list}" data-val="${esc(label)}" aria-pressed="${S.holiday[list].includes(label)}">${chipIcon(list === 'breaks' ? BREAK_ICON : INTEREST_ICON, label)}${esc(label)}</button>`;
    return `
    <header class="band">
      ${back('#/home', 'Home', true)}
      ${lights()}
      <span class="label amber">Holiday mode</span>
      <h1 class="h1 big" style="max-width:280px">Staying in London this break?</h1>
      <p class="small muted" style="margin:0;max-width:300px">You won't be the only one. Tell us a little and we'll find mates who are staying too.</p>
    </header>
    <div class="content">
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 class="h2" style="font-size:16px">Which break is it for you?</h2>
        <div class="chips">${BREAKS.map((b) => chip(b, 'breaks')).join('')}</div>
      </section>
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 class="h2" style="font-size:16px">What are you up for?</h2>
        <div class="chips">${INTERESTS.map((i) => chip(i, 'interests')).join('')}</div>
      </section>
      <p class="tiny muted" style="margin:0">Only verified Westminster students can see you. You choose who to meet, and you can switch holiday mode off at any time.</p>
      <button type="button" class="btn primary block" data-act="holiday-on">Yes, I'm staying. Find my mates</button>
      ${S.holiday.on ? '<button type="button" class="btn secondary block" data-act="holiday-off">Switch holiday mode off</button>' : '<a class="btn secondary block" href="#/home">Not this time</a>'}
    </div>`;
  }

  function mates() {
    const list = MATES.filter((m) => !S.holiday.on || m.staying)
      .map((m) => ({ m, s: shared(m) }))
      .sort((a, b) => b.s.length - a.s.length);
    return `
    <header class="plain-head">
      <h1 class="h1">${S.holiday.on ? 'Your holiday mates' : 'Mates'}</h1>
      <p class="small muted" style="margin:0">${S.holiday.on ? 'Students staying in London this break, matched on what you’re up for.' : 'Students you might get on with. Switch on holiday mode to see who’s staying over the break.'}</p>
    </header>
    <div class="content" style="padding-top:8px">
      ${!S.holiday.on ? '<a class="btn primary" href="#/holiday">Set up holiday mode</a>' : ''}
      ${list.map(({ m, s }) => `
      <a class="card mate" href="#/mate/${m.id}">
        ${avatar(m)}
        <span class="info">
          <span class="card-title">${esc(m.name)}${m.staying ? ` <span class="staying" title="Staying in London">${lanternMark(14)}</span>` : ''}</span>
          <span class="small muted">${esc(m.course)}</span>
          <span class="mini-chips">${m.interests.map((i) => `<span class="mini ${s.includes(i) ? 'on' : ''}">${chipIcon(INTEREST_ICON, i)}${esc(i)}</span>`).join('')}</span>
        </span>
        ${icon('next', 20)}
      </a>`).join('')}
      <a class="card warm" href="#/event/boxing-walk">
        <span class="label amber">Prefer a group?</span>
        <span class="card-title">Boxing Day walk: Regent's Park</span>
        <span class="small muted">One-to-one not your thing? Join a group instead.</span>
      </a>
      <p class="tiny muted" style="margin:0">Verified @westminster.ac.uk students only. Moderated by the Students' Union. Report or block anyone from their profile.</p>
    </div>`;
  }

  function mate(id) {
    const m = mateById(id); if (!m) return notFound();
    const s = shared(m);
    return `
    <header class="plain-head">${back('#/mates', 'Mates')}</header>
    <div class="content" style="padding-top:0;align-items:center;text-align:center">
      <span style="transform:scale(1.5);margin:12px 0 6px">${avatar(m)}</span>
      <h1 class="h1">${esc(m.name)}</h1>
      <p class="small muted" style="margin:-6px 0 0">${esc(m.course)} · from ${esc(m.from)}</p>
      ${m.staying ? '<span class="tag amber">Staying in London this break</span>' : '<span class="tag line muted">Home for the break</span>'}
      <div class="chips" style="justify-content:center">${m.interests.map((i) => `<span class="chip" aria-pressed="${s.includes(i)}" style="cursor:default">${chipIcon(INTEREST_ICON, i)}${esc(i)}</span>`).join('')}</div>
      <a class="btn primary block" href="#/chat/${m.id}">${S.chats[m.id] ? 'Open chat' : 'Say hi'}</a>
      <div class="row" style="gap:20px">
        <button type="button" class="link-btn red" data-act="report" data-val="${esc(m.name)}">Report</button>
        <button type="button" class="link-btn" data-act="block" data-val="${esc(m.name)}">Block</button>
      </div>
    </div>`;
  }

  function chat(id) {
    const m = mateById(id); if (!m) return notFound();
    const msgs = S.chats[id] || [];
    return `
    <header class="plain-head" style="flex-direction:row;align-items:center;gap:12px;border-bottom:1px solid var(--hairline);padding-bottom:12px">
      <a class="back" href="#/mate/${m.id}" aria-label="Back to ${esc(m.name)}">${icon('back', 20)}</a>
      ${avatar(m, 'sm')}
      <div><div class="card-title">${esc(m.name)}</div><div class="tiny muted">${m.staying ? 'Staying in London' : 'Home for the break'}</div></div>
    </header>
    <div class="chat" id="chat">
      ${msgs.length ? '' : `<p class="small muted" style="text-align:center;margin:24px 0">Say hi to ${esc(m.name)}. Keep it friendly. Messages are moderated by the SU.</p>
      <div class="chips" style="justify-content:center">${['Hi! Are you staying over the break?', 'Fancy a walk sometime?', 'Hey! Want to join the film night?'].map((q) => `<button type="button" class="chip" data-act="quick" data-val="${esc(q)}">${esc(q)}</button>`).join('')}</div>`}
      ${msgs.map((x) => `<div class="msg ${x.from}">${esc(x.text)}</div>`).join('')}
    </div>
    <form class="composer" data-form="chat" data-id="${m.id}">
      <label for="msg" class="hidden">Message</label>
      <input id="msg" class="input" name="msg" autocomplete="off" placeholder="Message ${esc(m.name)}" maxlength="300">
      <button class="btn primary" style="padding:0 16px" aria-label="Send">${icon('send', 20)}</button>
    </form>`;
  }

  function events() {
    const f = (location.hash.split('?f=')[1] || 'all');
    const filters = [['all', 'All'], ['holiday', 'Holiday'], ['su', 'SU & uni'], ['student', 'By students'], ['going', 'Going']];
    const list = allEvents().filter((e) => f === 'all' || (f === 'holiday' && e.holiday) || (f === 'going' && S.joined.includes(e.id)) || e.cat === f);
    return `
    <header class="plain-head">
      <div class="row between"><h1 class="h1">Events</h1><a class="btn primary sm" href="#/new-event">${icon('plus', 18)}Create</a></div>
      <div class="seg" role="group" aria-label="Filter events">${filters.map(([k, l]) => `<a class="chip" href="#/events?f=${k}" aria-pressed="${f === k}" style="text-decoration:none;color:inherit">${l}</a>`).join('')}</div>
    </header>
    <div class="content" style="padding-top:8px">
      ${list.length ? list.map(eventCard).join('') : '<p class="small muted">Nothing here yet. Create one?</p>'}
    </div>`;
  }

  function event(id) {
    const e = eventById(id); if (!e) return notFound();
    const j = S.joined.includes(e.id);
    const mine = e.id.startsWith('my-');
    const going = e.going + (j ? 1 : 0);
    const faces = facesFor(e);
    return `
    <header class="band">
      ${back('#/events', 'Events', true)}
      <span class="ev-hero">${eventTile(e, 'lg')}</span>
      <div class="row" style="flex-wrap:wrap;padding-right:96px">${e.holiday ? '<span class="tag amber">Holiday</span>' : ''}<span class="tag line">${e.cat === 'su' ? 'SU &amp; uni' : 'By a student'}</span></div>
      <h1 class="h1 big" style="padding-right:84px">${esc(e.title)}</h1>
      <p class="small muted" style="margin:0">Hosted by ${esc(e.host)}</p>
    </header>
    <div class="content">
      <div class="list">
        <div class="li">${icon('events', 20, 'var(--thames)')}<span>${esc(e.when)}</span></div>
        <div class="li">${icon('pin', 20, 'var(--thames)')}<span>${esc(e.where)}</span></div>
        <div class="li">${icon(KIND[kindOf(e)][0], 20, 'var(--thames)')}<span>${esc(e.desc)}</span></div>
      </div>
      ${mine ? `<div class="card warm"><span class="label amber">You're hosting</span><span class="card-title">+15 pts added for posting it.</span><span class="small muted">Mates who are staying will see it in Events. Keep the first meet-up in a public place.</span></div>`
      : `<div class="row"><span class="stack">${faces.map((m) => avatar(m, 'sm')).join('')}</span><strong>${j ? `You and ${going - 1} others are going` : `${going} going`}</strong></div>`}
      ${mine ? '' : j ? `<button type="button" class="btn outline-green block" data-act="leave" data-val="${e.id}">${icon('check', 20)}You're going · tap to leave</button>
             <p class="small green" style="margin:0;text-align:center;font-weight:600">+10 pts added. Check in on the day for +20 more.</p>`
          : `<button type="button" class="btn primary block" data-act="join" data-val="${e.id}">Join <span class="btn-pts">+10 pts</span></button>`}
      <div class="row between" style="margin-top:4px">
        <button type="button" class="link-btn red" data-act="report" data-val="${esc(e.title)}">Report event</button>
        <a class="link-btn" href="#/support">Need help now?</a>
      </div>
    </div>`;
  }

  function newEvent() {
    return `
    <header class="plain-head">${back('#/events', 'Events')}<h1 class="h1">Create an event</h1>
      <p class="small muted" style="margin:0">Anyone can host. Keep it in a public place for the first meet-up.</p></header>
    <form class="content" data-form="event" style="padding-top:8px">
      <div class="field"><label for="ev-title">What's the plan?</label><input id="ev-title" name="title" class="input" required maxlength="60" placeholder="e.g. Coffee and a walk"></div>
      <div class="field"><label for="ev-when">When?</label><input id="ev-when" name="when" class="input" required maxlength="40" placeholder="e.g. Sun 3 Jan · 2pm"></div>
      <div class="field"><label for="ev-where">Where?</label><input id="ev-where" name="where" class="input" required maxlength="60" placeholder="e.g. Outside Regent Street campus"></div>
      <div class="field"><label for="ev-desc">Anything else?</label><textarea id="ev-desc" name="desc" class="input" rows="3" maxlength="200" placeholder="Optional"></textarea></div>
      <label class="row small" style="min-height:44px;cursor:pointer"><input type="checkbox" name="holiday" ${S.holiday.on ? 'checked' : ''} style="width:22px;height:22px"> It's during a break (holiday event)</label>
      <button class="btn primary block">Post event <span class="btn-pts">+15 pts</span></button>
    </form>`;
  }

  function challenges() {
    const pct = Math.min(100, Math.round((S.points / 300) * 100));
    return `
    <header class="band">
      <span class="label amber">Your points</span>
      <div class="row" style="gap:18px">
        <span class="ring" role="img" aria-label="${esc(coffeeGoal())}">
          <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true"><circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="9"/>
          <circle cx="48" cy="48" r="40" fill="none" stroke="var(--lantern)" stroke-width="9" stroke-linecap="round" stroke-dasharray="${(2 * Math.PI * 40).toFixed(1)}" stroke-dashoffset="${(2 * Math.PI * 40 * (1 - pct / 100)).toFixed(1)}" transform="rotate(-90 48 48)"/></svg>
          <span class="ring-ic">${icon('coffee', 30, 'var(--lantern)', 2)}</span>
        </span>
        <div><div class="row" style="align-items:baseline;gap:6px"><span style="font:600 44px/48px var(--font-display);letter-spacing:-.02em">${S.points}</span><span class="small muted">pts</span></div>
        <p class="small muted" style="margin:2px 0 0;max-width:180px">${esc(coffeeGoal())}</p></div>
      </div>
    </header>
    <div class="content">
      <h2 class="h2">Today's challenges</h2>
      ${CHALLENGES.map((c) => {
        const on = S.done.ids.includes(c.id);
        return `<button type="button" class="task" data-act="task" data-val="${c.id}" aria-pressed="${on}">
          ${tile(c.ic, c.tone, 'sm')}
          <span class="t-label" style="flex:1">${esc(c.label)}</span>
          <span class="tick">${on ? icon('check', 16, '#fff', 3) : ''}</span>
          <span class="green task-pts">+${c.pts}</span></button>`;
      }).join('')}
      <div class="row between"><h2 class="h2">Rewards</h2><a class="small" href="#/rewards" style="font-weight:600">See all</a></div>
      <div class="grid2">${REWARDS.slice(0, 2).map((r) => `<a class="card reward ${r.id === 'coffee' ? 'warm' : ''}" href="#/rewards">${tile(r.ic, r.tone)}<span class="card-title" style="font-size:15px">${esc(r.title)}</span><span class="small amber" style="font-weight:600">${r.cost} pts</span></a>`).join('')}</div>
      <p class="small muted" style="margin:0">Points are a thank-you. The best bit is the people.</p>
    </div>`;
  }

  function rewards() {
    return `
    <header class="plain-head">${back('#/challenges', 'Challenges')}<h1 class="h1">Rewards</h1>
      <p class="small muted" style="margin:0">You have <strong>${S.points} pts</strong>.</p></header>
    <div class="content" style="padding-top:8px">
      ${REWARDS.map((r) => {
        const got = S.redeemed.filter((x) => x.id === r.id);
        return `<div class="card">
          <div class="row" style="gap:12px">${tile(r.ic, r.tone)}<span class="card-title">${esc(r.title)}</span></div>
          <span class="small muted">${esc(r.note)}</span>
          <div class="row between" style="margin-top:6px"><span class="amber" style="font-weight:600">${r.cost} pts</span>
          <button type="button" class="btn ${S.points >= r.cost ? 'primary' : 'secondary'} sm" data-act="redeem" data-val="${r.id}" ${S.points >= r.cost ? '' : 'disabled'}>${S.points >= r.cost ? 'Redeem' : `${r.cost - S.points} pts to go`}</button></div>
          ${got.map((g) => `<span class="small green" style="font-weight:600">Code: ${esc(g.code)} (show this at the counter)</span>`).join('')}
        </div>`;
      }).join('')}
      <h2 class="h2">History</h2>
      <div class="list">${S.history.slice(0, 12).map((h) => `<div class="li" style="justify-content:space-between"><span class="small">${esc(h.text)}</span><span class="small ${h.pts >= 0 ? 'green' : 'red'}" style="font-weight:600">${h.pts >= 0 ? '+' : ''}${h.pts}</span></div>`).join('')}</div>
    </div>`;
  }

  let ci = { phase: 'before', lonely: null, sat: null };
  function checkin() {
    const b = S.checkins.before, a = S.checkins.after;
    if (b && a && ci.phase !== 'redo') return checkinResult(b, a);
    ci.phase = b ? 'after' : 'before';
    return `
    <header class="plain-head">${back('#/home', 'Home')}
      <span class="label blue">${ci.phase === 'before' ? 'Before the break' : 'After the break'} · 1 minute</span>
      <h1 class="h1">Quick check-in</h1>
      <p class="small muted" style="margin:0">Anonymous. We ask the same two questions before and after the break to see if Westmates really helps.</p></header>
    <div class="content">
      <fieldset style="border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:8px">
        <legend class="h2" style="font-size:16px;margin-bottom:8px">How often do you feel lonely?</legend>
        ${LONELY.map((o, i) => `<button type="button" class="opt" data-act="ci-lonely" data-val="${i}" aria-pressed="${ci.lonely === i}">${icon('face' + i, 24, 'currentColor', 1.8)}<span>${o}</span></button>`).join('')}
      </fieldset>
      <fieldset style="border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:8px">
        <legend class="h2" style="font-size:16px;margin-bottom:8px">Overall, how satisfied are you with your life nowadays?</legend>
        <div class="scale">${Array.from({ length: 11 }, (_, n) => `<button type="button" data-act="ci-sat" data-val="${n}" aria-pressed="${ci.sat === n}" aria-label="${n} out of 10">${n}</button>`).join('')}</div>
        <div class="row between tiny muted"><span class="row" style="gap:4px">${icon('face0', 18, 'currentColor', 1.8)}Not at all</span><span class="row" style="gap:4px">Completely${icon('face4', 18, 'currentColor', 1.8)}</span></div>
      </fieldset>
      <button type="button" class="btn primary block" data-act="ci-send" ${ci.lonely === null || ci.sat === null ? 'disabled' : ''}>Send check-in <span class="btn-pts">+5 pts</span></button>
      ${b && !a ? '<p class="tiny muted" style="margin:0;text-align:center">Demo tip: this is the after-the-break check-in. Send it to see your change.</p>' : ''}
      <a class="card" href="#/support"><span class="card-title" style="font-size:15px">Struggling right now?</span><span class="small muted">See support that's open 24/7, all break.</span></a>
    </div>`;
  }
  function checkinResult(b, a) {
    const dl = b.lonely === a.lonely ? 'about the same' : (a.lonely > b.lonely ? 'less often' : 'more often');
    const ds = a.sat - b.sat;
    return `
    <header class="plain-head">${back('#/home', 'Home')}<h1 class="h1">Your before and after</h1>
      <p class="small muted" style="margin:0">Only you see this. The SU only sees anonymous totals.</p></header>
    <div class="content" style="padding-top:8px">
      <div class="card green"><span class="label green">Loneliness</span><span class="card-title">You feel lonely ${dl} than before the break.</span>
        <span class="small">Before: ${LONELY[b.lonely]} · After: ${LONELY[a.lonely]}</span></div>
      <div class="card blue"><span class="label blue">Life satisfaction</span><span class="card-title">${b.sat} → ${a.sat} out of 10 (${ds >= 0 ? '+' : ''}${ds})</span></div>
      <button type="button" class="btn secondary block" data-act="ci-redo">Do the check-in again</button>
    </div>`;
  }

  function me() {
    return `
    <header class="band">
      <div class="row" style="gap:14px"><span class="avatar" style="background:var(--lantern)">${esc(S.name.charAt(0) || 'A')}</span>
      <div><h1 class="h1">${esc(S.name)}</h1><p class="small muted" style="margin:0">${S.points} pts · holiday mode ${S.holiday.on ? 'on' : 'off'}</p></div></div>
    </header>
    <div class="content">
      <form class="field" data-form="name"><label for="nm">Your first name</label>
        <div class="row"><input id="nm" name="name" class="input" value="${esc(S.name)}" maxlength="20"><button class="btn secondary sm">Save</button></div></form>
      <div class="list">
        <a class="li" href="#/holiday" style="color:inherit;text-decoration:none">${icon('star', 20)}<span style="flex:1">Holiday mode</span><span class="small ${S.holiday.on ? 'green' : 'muted'}" style="font-weight:600">${S.holiday.on ? 'On' : 'Off'}</span></a>
        <a class="li" href="#/rewards" style="color:inherit;text-decoration:none">${icon('heart', 20)}<span style="flex:1">Points and rewards</span>${icon('next', 18)}</a>
        <a class="li" href="#/checkin" style="color:inherit;text-decoration:none">${icon('chart', 20)}<span style="flex:1">Wellbeing check-in</span>${icon('next', 18)}</a>
        <a class="li" href="#/support" style="color:inherit;text-decoration:none">${icon('shield', 20)}<span style="flex:1">Safety and support</span>${icon('next', 18)}</a>
        <a class="li" href="#/dashboard" style="color:inherit;text-decoration:none">${icon('chart', 20, 'var(--thames)')}<span style="flex:1">SU impact dashboard (demo)</span>${icon('next', 18)}</a>
        <button type="button" class="li li-btn" data-act="theme" aria-pressed="${S.theme === 'dark'}">${icon('moon', 20)}<span style="flex:1;text-align:left">Dark mode</span><span class="small ${S.theme === 'dark' ? 'green' : 'muted'}" style="font-weight:600">${S.theme === 'dark' ? 'On' : 'Off'}</span></button>
        <button type="button" class="li li-btn" data-act="haptics" aria-pressed="${S.haptics !== false}">${icon('vibrate', 20)}<span style="flex:1;text-align:left">Vibration on taps</span><span class="small ${S.haptics !== false ? 'green' : 'muted'}" style="font-weight:600">${S.haptics !== false ? 'On' : 'Off'}</span></button>
      </div>
      ${standalone ? '' : `<div id="install" class="card warm install">${icon('download', 22)}<span style="flex:1"><span class="card-title" style="font-size:15px;display:block">Add Westmates to your home screen</span><span class="small muted" id="install-text">${installText()}</span></span>
        <button type="button" class="btn primary sm ${deferredPrompt ? '' : 'hidden'}" data-act="install">Install</button></div>`}
      <button type="button" class="btn danger block" data-act="reset">Reset demo</button>
      <p class="tiny muted demo-note">Westmates is a student concept for module 6LEAD001W, not an official University of Westminster app. People, events and numbers are sample data, saved only on this device. App version ${APP_VERSION}.</p>
    </div>`;
  }

  function support() {
    return `
    <header class="plain-head">${back('#/me', 'Me')}<h1 class="h1">Safety and support</h1></header>
    <div class="content" style="padding-top:8px">
      <div class="card warm"><span class="label amber">Need help now?</span>
        <span class="card-title">The university's 24/7 mental health helpline (Spectrum.Life) is free and open all break.</span>
        <a class="btn primary" href="tel:08000318227" style="align-self:flex-start;margin-top:6px">${icon('phone', 18)}Call 0800 031 8227</a>
        <span class="small muted">Calling from outside the UK: <a href="tel:+35315180277">+353 1 518 0277</a></span>
        <span class="small muted">Urgent but not life-threatening: call NHS 111 and choose the mental health option. In an emergency call 999.</span></div>
      <div class="list">
        <div class="li">${icon('shield', 20)}<span class="small">Campus emergency team, 24/7: <a href="tel:02035064558">0203 506 4558</a> from a mobile, or 5555 from a campus landline.</span></div>
      </div>
      <div class="list">
        <div class="li">${icon('shield', 20)}<span class="small">Only verified @westminster.ac.uk students can join.</span></div>
        <div class="li">${icon('flag', 20)}<span class="small">Report or block anyone from their profile or event page. SU moderators review every report.</span></div>
        <div class="li">${icon('pin', 20)}<span class="small">Meet in public places first, and tell a friend where you're going.</span></div>
        <div class="li">${icon('heart', 20)}<span class="small">During term, the SU runs Wellbeing Wednesdays and the WhatsApp Wellbeing Channel.</span></div>
      </div>
    </div>`;
  }

  function dashboard() {
    const myJoins = S.joined.length, myChats = Object.keys(S.chats).length;
    return `
    <header class="band">${back('#/me', 'Me', true)}<span class="label amber">SU view · demo</span>
      <h1 class="h1">Westmates impact</h1><p class="small muted" style="margin:0">Christmas break pilot. The KPIs the SU would track.</p></header>
    <div class="content">
      <p class="tiny muted" style="margin:0">Sample figures for the demo, not real data. Your own taps on this phone are added live.</p>
      <h2 class="h2">1 · Uptake</h2>
      <div class="kpi"><span class="label muted">Students staying who signed up</span><span class="num">${312 + (S.holiday.on ? 1 : 0)} <span class="small muted" style="font-family:var(--font-sans)">of 1,040 (sample)</span></span>
        <div class="bar light" style="margin-top:6px"><div style="width:30%"></div></div></div>
      <h2 class="h2">2 · Activity over the break</h2>
      <div class="grid2">
        <div class="kpi"><span class="label muted">Events run</span><span class="num">${46 + S.myEvents.length}</span></div>
        <div class="kpi"><span class="label muted">Event sign-ups</span><span class="num">${528 + myJoins}</span></div>
        <div class="kpi"><span class="label muted">Buddy chats started</span><span class="num">${204 + myChats}</span></div>
        <div class="kpi"><span class="label muted">Challenges done</span><span class="num">${1310 + S.done.ids.length}</span></div>
      </div>
      <h2 class="h2">3 · Impact: lonely "often or always"</h2>
      <div class="kpi">
        <div class="bars">
          <div class="col"><div style="height:102px;background:var(--ink-muted)"></div><span class="small">Before 34%</span></div>
          <div class="col"><div style="height:63px;background:var(--park)"></div><span class="small">After 21%</span></div>
        </div>
        <span class="small muted">Same ONS-style question asked before and after the break (sample).</span>
      </div>
    </div>`;
  }

  function notFound() {
    return `<div class="content"><h1 class="h1">Not found</h1><a class="btn primary" href="#/home">Go home</a></div>`;
  }

  // ---------- Install prompt ----------
  let deferredPrompt = null, justInstalled = false;
  const UA = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/i.test(UA);
  const inAppBrowser = /FBAN|FBAV|Instagram|Line\/|Snapchat|musical_ly|Bytedance|TikTok|LinkedInApp|Twitter/i.test(UA);
  const iosOtherBrowser = isIOS && /CriOS|FxiOS|EdgiOS|OPiOS/i.test(UA);
  const standalone = window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches || window.navigator.standalone === true;
  // Opened as a normal web page: show the install guide instead of the app.
  // Add ?browser to the link to skip the guide (for laptops and testing); it lasts for that browser tab.
  function browserBypass() {
    const asked = new URLSearchParams(location.search).has('browser');
    try { if (asked) sessionStorage.setItem('wm-browser', '1'); return sessionStorage.getItem('wm-browser') === '1'; } catch (e) { return asked; }
  }
  const GATED = !standalone && !browserBypass();
  let gatePlat = isIOS ? 'ios' : isAndroid ? 'android' : 'desktop';
  const chipIc = (name) => `<span class="ic-chip">${icon(name, 18, 'currentColor', 2)}</span>`;
  const step = (n, html) => `<li><span class="gate-num">${n}</span><span>${html}</span></li>`;
  function gateSteps(p) {
    if (p === 'ios' && inAppBrowser) return `<p class="gate-note">This page is open inside another app, which can't add Westmates to your home screen.</p>
      <ol class="gate-steps">${step(1, `Tap ${chipIc('dots')} or ${chipIc('share')} and choose <b>Open in Safari</b> (or <b>Open in browser</b>).`)}
      ${step(2, `In Safari, follow the iPhone steps on this page.`)}</ol>`;
    if (p === 'ios') return `<ol class="gate-steps">
      ${step(1, iosOtherBrowser ? `Tap Share ${chipIc('share')} (in Chrome it's in the address bar).` : `In Safari, tap Share ${chipIc('share')}. On iOS 26, first tap ${chipIc('menu')} or ${chipIc('dots')} next to the address, then Share.`)}
      ${step(2, `Tap <b>Add to Home Screen</b> ${chipIc('addbox')}. You may need to scroll down or tap <b>View More</b>.`)}
      ${step(3, `Keep <b>Open as Web App</b> switched on, tap <b>Add</b>, then open Westmates from your home screen.`)}</ol>
      ${iosOtherBrowser ? '<p class="gate-note">Not there? Open this page in Safari and try again.</p>' : ''}`;
    if (p === 'android') {
      if (justInstalled) return `<p class="gate-done">${icon('check', 20)} Installed. Open Westmates from your home screen or app list.</p>`;
      const btn = deferredPrompt ? `<button type="button" class="btn primary block" data-act="install">${icon('download', 20)} Install Westmates</button><p class="gate-note">Or do it from the menu:</p>` : '';
      return `${btn}<ol class="gate-steps">
      ${step(1, `In Chrome, tap the menu ${chipIc('kebab')} at the top right.`)}
      ${step(2, `Tap <b>Install app</b> or <b>Add to Home screen</b>.`)}
      ${step(3, `Tap <b>Install</b>, then open Westmates from your home screen.`)}</ol>`;
    }
    return `<div class="gate-qr"><img src="qr.png" width="168" height="168" alt="QR code for the Westmates link"></div>
      <p class="gate-note" style="text-align:center">Westmates is made for phones. Scan this with your phone's camera, then add it to your home screen.</p>`;
  }
  function gateView() {
    const tab = (k, l) => `<button type="button" class="chip" data-act="gate-plat" data-val="${k}" aria-pressed="${gatePlat === k}">${l}</button>`;
    return `<section class="gate">
      <div class="gate-top">${lights()}
        <img class="gate-icon" src="icon-192.png" width="84" height="84" alt="Westmates app icon">
        <h1 class="gate-title">Westmates</h1>
        <p class="gate-tag">Never spend the break alone.</p>
      </div>
      <div class="gate-card">
        <h2 class="h2" style="margin:0">Add Westmates to your home screen</h2>
        <p class="small muted" style="margin:6px 0 0">It opens full screen like an app and works offline.</p>
        <div class="gate-body">${gateSteps(gatePlat)}</div>
        <div class="gate-switch" role="group" aria-label="Show steps for">${tab('ios', 'iPhone')}${tab('android', 'Android')}${tab('desktop', 'Laptop')}</div>
      </div>
      ${gatePlat === 'desktop' ? '<a class="gate-skip" href="?browser#/home">Or open the demo in this browser</a>' : ''}
      <p class="gate-foot">A student concept for module 6LEAD001W, not an official University of Westminster app.</p>
    </section>`;
  }
  function renderGate() {
    document.body.classList.add('gated');
    $('#view').innerHTML = gateView();
    document.documentElement.style.setProperty('--status-fill', 'transparent');
    const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', '#141414');
  }
  window.addEventListener('appinstalled', () => { justInstalled = true; deferredPrompt = null; if (GATED) renderGate(); });
  function installText() {
    if (standalone) return "It's installed. Open it from your home screen.";
    if (deferredPrompt) return 'Tap Install to add it like an app.';
    if (isIOS) return 'In Safari, tap Share, then "Add to Home Screen".';
    return 'In your browser menu, choose "Install app" or "Add to Home screen".';
  }
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; if (GATED) renderGate(); else if (route().name === 'me') render(); });

  // ---------- Router ----------
  const TABS = [['home', 'Home', 'home'], ['mates', 'Mates', 'mates'], ['events', 'Events', 'events'], ['challenges', 'Challenges', 'star'], ['me', 'Me', 'me']];
  const TAB_OF = { home: 'home', holiday: 'home', checkin: 'home', mates: 'mates', mate: 'mates', chat: 'mates', events: 'events', event: 'events', 'new-event': 'events', challenges: 'challenges', rewards: 'challenges', me: 'me', support: 'me', dashboard: 'me' };
  function route() {
    const h = (location.hash || '#/home').replace(/^#\//, '').split('?')[0];
    const [name, id] = h.split('/');
    return { name: name || 'home', id };
  }
  const SCREENS = { home, holiday, mates, mate, chat, events, event, 'new-event': newEvent, challenges, rewards, checkin, me, support, dashboard };
  let lastName = '';
  const REDUCED = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Menu bar: links are built once, and a glass "lens" glides to the active tab (with a slight stretch, like iOS).
  let lensX = null;
  function renderTabs(tab) {
    const nav = $('#tabs');
    if (!nav.querySelector('.tab-lens')) {
      nav.innerHTML = '<span class="tab-lens" aria-hidden="true"></span>' +
        TABS.map(([k, l, ic]) => `<a href="#/${k}" data-tab="${k}">${icon(ic, 22)}<span>${l}</span></a>`).join('');
    }
    let active = null;
    nav.querySelectorAll('a').forEach((a) => {
      if (a.dataset.tab === tab) { a.setAttribute('aria-current', 'page'); active = a; } else a.removeAttribute('aria-current');
    });
    moveLens(active, false);
  }
  function moveLens(a, instant) {
    const lens = document.querySelector('#tabs .tab-lens');
    if (!a || !lens) return;
    const x = a.offsetLeft, y = a.offsetTop;
    lens.style.width = a.offsetWidth + 'px'; lens.style.height = a.offsetHeight + 'px'; lens.style.top = y + 'px';
    if (lensX !== null && Math.abs(lensX - x) > 1 && !instant && !REDUCED() && lens.animate) {
      const mid = (lensX + x) / 2;
      lens.animate([
        { transform: `translateX(${lensX}px) scale(1, 1)` },
        { transform: `translateX(${mid}px) scale(1.22, .9)`, offset: 0.45 },
        { transform: `translateX(${x}px) scale(1, 1)` }
      ], { duration: 460, easing: 'cubic-bezier(.3,.8,.25,1)' });
    }
    lens.style.transform = `translateX(${x}px)`;
    lensX = x;
  }
  window.addEventListener('resize', () => moveLens(document.querySelector('#tabs a[aria-current]'), true));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => moveLens(document.querySelector('#tabs a[aria-current]'), true));
  // Light theme for everyone by default; dark is a choice on the Me page.
  function applyTheme() { document.documentElement.dataset.theme = S.theme === 'dark' ? 'dark' : 'light'; }
  function render() {
    applyTheme();
    if (GATED) return renderGate();
    const r = route();
    const fn = SCREENS[r.name] || notFound;
    $('#view').innerHTML = fn(r.id);
    const tab = TAB_OF[r.name] || 'home';
    renderTabs(tab);
    document.title = 'Westmates';
    if (r.name !== lastName) {
      window.scrollTo(0, 0); $('#view').focus({ preventScroll: true });
      if (lastName && !REDUCED()) { const v = $('#view'); v.classList.remove('enter'); void v.offsetWidth; v.classList.add('enter'); }
    }
    lastName = r.name;
    if (r.name === 'chat') { const c = $('#chat'); if (c) window.scrollTo(0, document.body.scrollHeight); }
    paintStatusBar();
    syncHx();
  }
  // Colour the strip behind the phone's status bar (and the browser theme colour) to match the top of the screen.
  function paintStatusBar() {
    const first = $('#view').firstElementChild;
    let bg = first ? getComputedStyle(first).backgroundColor : '';
    if (!bg || bg === 'transparent' || /rgba\(.*,\s*0\)$/.test(bg)) bg = getComputedStyle($('#app')).backgroundColor;
    document.documentElement.style.setProperty('--status-fill', bg);
    // On phones the page background also follows the top of the screen: iOS tints its haze behind the clock
    // from it, so the haze now matches each screen instead of showing a light fade over a dark header.
    if (window.innerWidth <= 520) { document.documentElement.style.backgroundColor = bg; document.body.style.backgroundColor = bg; }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', bg);
  }
  window.addEventListener('hashchange', () => {
    const t = $('#toast'); if (t && Date.now() - lastToast > 600) t.classList.remove('show');
    render();
  });

  // ---------- Actions ----------
  function sendChat(id, text) {
    const m = mateById(id); if (!m || !text.trim()) return;
    const first = !S.chats[id];
    S.chats[id] = (S.chats[id] || []).concat({ from: 'me', text: text.trim() });
    save(); render();
    if (first) {
      if (!S.done.ids.includes('hi')) { S.done.ids.push('hi'); addPoints(10, 'Challenge: said hi to a new mate'); toast('+10 pts for saying hi'); }
      setTimeout(() => { S.chats[id].push({ from: 'them', text: m.reply }); save(); if (route().name === 'chat' && route().id === id) render(); }, 1300);
    }
  }

  // ---------- Haptics ----------
  // Android: the Vibration API (moderate strength). iPhone: websites can't vibrate. The only haptic a web page can get is
  // the system tick of a native switch, and since iOS 26.5 only when a finger taps the switch itself (a click from
  // code is silent). So on iPhones every tappable control gets an invisible switch laid over it (syncHx): the tap
  // toggles the switch, iOS plays its tick, and we then carry out what the control normally does. Off switch on the Me page.
  const HX_SEL = '#app a[href], #app button, .btn, .chip, [data-act]';
  function syncHx() {
    if (!isIOS) return;
    const on = S.haptics !== false;
    document.querySelectorAll(HX_SEL).forEach((el) => {
      if (el.closest('.hx')) return;
      const has = el.querySelector(':scope > .hx');
      if (on && !has && !el.disabled) { el.classList.add('has-hx'); el.insertAdjacentHTML('beforeend', '<label class="hx" aria-hidden="true"><input type="checkbox" switch tabindex="-1"></label>'); }
      else if ((!on || el.disabled) && has) has.remove();
    });
  }
  document.addEventListener('click', (ev) => {   // registered first, capture phase
    const t = ev.target;
    if (!t.closest) return;
    const hx = t.closest('.hx'); if (!hx) return;
    // A tap on the overlay lands on the see-through label (the switch is hidden, so it never grabs the finger and
    // scrolling works as normal; a swipe never becomes a click). The label passes the tap to its switch, which
    // toggles natively: that plays the tick. Both clicks stop here, and the real control underneath gets the tap once.
    ev.stopPropagation();
    // Wait a moment so the switch finishes toggling (and ticking) before the action redraws the screen and removes it.
    if (t.matches('.hx input')) { const host = hx.parentElement; setTimeout(() => host.click(), 0); }
  }, true);
  const VIBES = { tap: 15, success: [15, 60, 25], warn: [35, 70, 35] };
  function haptic(kind = 'tap') {
    if (S.haptics === false) return;
    try {
      if (typeof navigator.vibrate === 'function' && !isIOS) navigator.vibrate(VIBES[kind] || 15);
    } catch (e) { /* no haptics on this device */ }
  }
  const HAPTIC_KIND = { 'holiday-on': 'success', join: 'success', 'ci-send': 'success', report: 'warn', block: 'warn', reset: 'warn' };
  document.addEventListener('click', (ev) => {   // runs before the action below (capture phase)
    if (!ev.isTrusted) return;
    const t = ev.target.closest('.tabs a, [data-act], button, .btn, .chip'); if (!t || t.disabled) return;
    if (t.matches('.tabs a') && t.getAttribute('aria-current') === 'page') return;
    const act = t.dataset.act, val = t.dataset.val;
    let kind = HAPTIC_KIND[act] || 'tap';
    if (act === 'task') kind = S.done.ids.includes(val) ? 'tap' : 'success';
    if (act === 'redeem') { const r = REWARDS.find((x) => x.id === val); kind = r && S.points >= r.cost ? 'success' : 'warn'; }
    if (act === 'holiday-on' && !S.holiday.breaks.length) kind = 'warn';
    if (t.type === 'submit' && t.closest('[data-form="event"]')) kind = 'success';
    haptic(kind);
  }, true);

  document.addEventListener('click', (ev) => {
    const el = ev.target.closest('[data-act]'); if (!el) return;
    const act = el.dataset.act, val = el.dataset.val;
    if (act === 'toggle-breaks' || act === 'toggle-interests') {
      const list = act.split('-')[1];
      const arr = S.holiday[list];
      S.holiday[list] = arr.includes(val) ? arr.filter((x) => x !== val) : arr.concat(val);
      save(); el.setAttribute('aria-pressed', S.holiday[list].includes(val));
    } else if (act === 'holiday-on') {
      if (!S.holiday.breaks.length) { toast('Pick at least one break'); return; }
      const wasOn = S.holiday.on; S.holiday.on = true;
      if (!wasOn) { addPoints(20, 'Switched on holiday mode'); toast('Holiday mode on · +20 pts'); } else { save(); toast('Saved'); }
      location.hash = '#/mates';
    } else if (act === 'holiday-off') {
      S.holiday.on = false; save(); toast('Holiday mode off'); location.hash = '#/home';
    } else if (act === 'join') {
      if (!S.joined.includes(val)) { S.joined.push(val); addPoints(10, 'Joined: ' + (eventById(val) || {}).title);
        if (!S.done.ids.includes('event')) { S.done.ids.push('event'); save(); }
        toast("You're going · +10 pts"); }
      render();
    } else if (act === 'leave') {
      S.joined = S.joined.filter((x) => x !== val); save(); toast("You've left the event"); render();
    } else if (act === 'task') {
      const c = CHALLENGES.find((x) => x.id === val);
      if (S.done.ids.includes(val)) { S.done.ids = S.done.ids.filter((x) => x !== val); addPoints(-c.pts, 'Undone: ' + c.label); }
      else { S.done.ids.push(val); addPoints(c.pts, 'Challenge: ' + c.label); toast('+' + c.pts + ' pts'); }
      render();
    } else if (act === 'redeem') {
      const r = REWARDS.find((x) => x.id === val);
      if (S.points < r.cost) return;
      const code = 'WM-' + Math.random().toString(36).slice(2, 6).toUpperCase();
      S.redeemed.push({ id: r.id, code }); addPoints(-r.cost, 'Redeemed: ' + r.title); toast('Redeemed: ' + r.title); render();
    } else if (act === 'quick') {
      sendChat(route().id, val);
    } else if (act === 'report') {
      toast('Thanks. SU moderators will review this.');
    } else if (act === 'block') {
      toast(val + ' is blocked (demo)');
    } else if (act === 'ci-lonely') { ci.lonely = +val; render();
    } else if (act === 'ci-sat') { ci.sat = +val; render();
    } else if (act === 'ci-send') {
      const phase = S.checkins.before && !S.checkins.after ? 'after' : 'before';
      if (phase === 'before') S.checkins = { before: { lonely: ci.lonely, sat: ci.sat } };
      else S.checkins.after = { lonely: ci.lonely, sat: ci.sat };
      ci = { phase: '', lonely: null, sat: null };
      addPoints(5, 'Wellbeing check-in'); toast('Thanks · +5 pts');
      render();
    } else if (act === 'ci-redo') {
      S.checkins = {}; ci = { phase: 'before', lonely: null, sat: null }; save(); render();
    } else if (act === 'theme') {
      S.theme = S.theme === 'dark' ? 'light' : 'dark'; save(); render();
    } else if (act === 'haptics') {
      S.haptics = S.haptics === false; save(); render(); if (S.haptics) haptic('tap');
    } else if (act === 'gate-plat') {
      gatePlat = el.dataset.val; renderGate();
    } else if (act === 'install' && deferredPrompt) {
      deferredPrompt.prompt(); deferredPrompt.userChoice.then((c) => { if (c && c.outcome === 'accepted') justInstalled = true; }).finally(() => { deferredPrompt = null; render(); });
    } else if (act === 'reset') {
      if (confirmReset()) { S = fresh(); save(); ci = { phase: 'before', lonely: null, sat: null }; toast('Demo reset'); location.hash = '#/home'; render(); }
    }
  });
  let resetArmed = 0;
  function confirmReset() { // two taps instead of a browser dialog
    if (Date.now() - resetArmed < 3000) return true;
    resetArmed = Date.now(); toast('Tap Reset again to confirm'); return false;
  }

  document.addEventListener('submit', (ev) => {
    const f = ev.target.closest('[data-form]'); if (!f) return;
    ev.preventDefault();
    const d = new FormData(f);
    if (f.dataset.form === 'chat') { const v = d.get('msg'); sendChat(f.dataset.id, v || ''); const i = $('#msg'); if (i) i.focus(); }
    else if (f.dataset.form === 'event') {
      const e = { id: 'my-' + Date.now().toString(36), title: d.get('title'), when: d.get('when'), where: d.get('where'), desc: d.get('desc') || 'Hosted by a Westmates student.',
        cat: 'student', holiday: d.get('holiday') === 'on', host: S.name + ' (you)', going: 0 }; e.kind = guessKind(e.title + ' ' + e.desc);
      S.myEvents.unshift(e); S.joined.push(e.id); addPoints(15, 'Created: ' + e.title); toast('Event posted · +15 pts');
      location.hash = '#/event/' + e.id;
    } else if (f.dataset.form === 'name') {
      S.name = (d.get('name') || 'Alex').trim().slice(0, 20) || 'Alex'; save(); toast('Saved'); render();
    }
  });

  // ---------- Hosting badge ----------
  // Free Netlify hosting adds a 'Powered by Netlify' badge at the bottom of the screen.
  // Make room for it under the tab bar so it never covers the tabs.
  function fitBadge() {
    const f = document.getElementById('nl-badge-frame');
    const shown = f && getComputedStyle(f).display !== 'none' && getComputedStyle(f).visibility !== 'hidden';
    // reserve the badge's full height (at least 64px, its normal size) whenever it is on the page
    const onNetlify = /\.netlify\.app$/.test(location.hostname);
    const hgt = shown ? Math.max(64, Math.ceil(f.getBoundingClientRect().height)) : (onNetlify && !f ? 64 : 0);
    document.documentElement.style.setProperty('--badge', hgt + 'px');
  }
  new MutationObserver(fitBadge).observe(document.body, { childList: true });
  window.addEventListener('resize', fitBadge);
  [300, 1000, 2000, 4000].forEach((ms) => setTimeout(fitBadge, ms));

  // No pinch-zoom inside the app (iOS gesture events), like a native app.
  ['gesturestart', 'gesturechange'].forEach((t) => document.addEventListener(t, (e) => e.preventDefault(), { passive: false }));

  // ---------- Start ----------
  if (!location.hash) location.replace('#/home');
  render();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => {}));
    // When a newer version takes over, reload once so it shows straight away (not on the first ever install).
    const hadController = !!navigator.serviceWorker.controller; let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController && !reloading) { reloading = true; location.reload(); } });
    // Check for a new version whenever the app comes back to the screen.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') navigator.serviceWorker.getRegistration().then((r) => r && r.update()).catch(() => {});
    });
  }
})();
