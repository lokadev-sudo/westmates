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
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>'
  };
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
    { id: 'wellbeing-wed', title: 'Wellbeing Wednesday', cat: 'su', holiday: false, when: 'Wed 18 Nov · 1pm', where: 'Marylebone campus', host: "Students' Union", going: 23, desc: 'A relaxed drop-in run by the SU wellbeing team. Tea, colouring, a chat if you want one.' },
    { id: 'intl-social', title: "International students' social", cat: 'su', holiday: false, when: 'Fri 20 Nov · 6pm', where: 'Regent Street campus', host: "SU International Community Organiser", going: 41, desc: 'Meet students from all over the world. Food, music and games.' },
    { id: 'film-night', title: 'Film night, bring snacks', cat: 'student', holiday: false, when: 'Sat 21 Nov · 7pm', where: 'Marylebone halls common room', host: 'Kenji', going: 6, desc: 'We pick the film together on the night. Bring snacks if you like.' },
    { id: 'boxing-walk', title: "Boxing Day walk: Regent's Park", cat: 'student', holiday: true, when: 'Sat 26 Dec · 11am', where: 'Outside Marylebone campus', host: 'Mei', going: 8, desc: 'About an hour, easy pace, hot drinks after. Everyone welcome.' },
    { id: 'jollof', title: 'Cook-up: jollof and friends', cat: 'student', holiday: true, when: 'Sun 27 Dec · 5pm', where: 'Amara’s halls kitchen', host: 'Amara', going: 5, desc: 'Bring a dish from home or just bring yourself.' },
    { id: 'museum', title: 'Free museums day', cat: 'student', holiday: true, when: 'Tue 29 Dec · 12pm', where: 'British Museum entrance', host: 'Priya', going: 7, desc: 'Free entry. We’ll do two galleries and lunch.' },
    { id: 'nye', title: "New Year's Eve: watch the fireworks together", cat: 'su', holiday: true, when: 'Thu 31 Dec · 9pm', where: 'Meet at Regent Street campus', host: "Students' Union", going: 19, desc: 'Watch party with SU staff, then walk down together. Wrap up warm.' },
    { id: 'lny', title: 'Lunar New Year dumpling night', cat: 'su', holiday: true, when: 'Feb 2027 · TBC', where: 'Cavendish campus', host: 'SU International Community Organiser', going: 12, desc: 'Make dumplings, learn a few traditions, meet people staying for the festival.' }
  ];

  const CHALLENGES = [
    { id: 'walk', label: "Walk to Regent's Park with a mate", pts: 20 },
    { id: 'cook', label: 'Cook something from home and share it', pts: 15 },
    { id: 'hi', label: 'Say hi to a new mate', pts: 10 },
    { id: 'breathe', label: 'Try a 10-minute breathing session', pts: 5 },
    { id: 'event', label: 'Join an event', pts: 10 }
  ];

  const REWARDS = [
    { id: 'coffee', title: 'Coffee on campus', cost: 300, note: 'At a partner campus café' },
    { id: 'award', title: 'Westminster Award points', cost: 500, note: 'Counts towards your Westminster Award' },
    { id: 'cinema', title: 'SU cinema ticket', cost: 400, note: 'Student film night' }
  ];

  const LONELY = ['Often or always', 'Some of the time', 'Occasionally', 'Hardly ever', 'Never'];

  // ---------- State ----------
  const KEY = 'westmates-demo-v1';
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
        <a class="pill-badge" href="#/challenges" aria-label="${S.points} points">${S.points} pts</a>
      </div>
      <p class="small muted" style="margin:0">Hi ${esc(S.name)}</p>
      <h1 class="h1">${hm ? 'Your break in London' : "What's on this week"}</h1>
    </header>
    <div class="content">
      ${hm ? `
      <section class="card warm">
        <span class="label amber">Holiday mode is on</span>
        <span class="card-title">${MATES.filter((m) => m.staying).length} mates are staying in London too.</span>
        <span class="small muted">Breaks: ${esc(S.holiday.breaks.join(', '))}</span>
        <div class="row" style="margin-top:6px"><a class="btn primary sm" href="#/mates">See your mates</a><a class="btn secondary sm" href="#/holiday">Edit</a></div>
      </section>` : `
      <section class="card warm">
        <span class="label amber">Holiday mode</span>
        <span class="card-title" style="font-size:18px;line-height:24px">Campus closes for the winter break soon.</span>
        <span class="small muted">Staying in London? Find mates who are staying too.</span>
        <a class="btn primary" href="#/holiday" style="align-self:flex-start;margin-top:6px">Set up holiday mode</a>
      </section>`}
      <a class="card" href="#/challenges">
        <span class="label green">Today's challenges · ${doneCount}/${CHALLENGES.length} done</span>
        <span class="card-title">${doneCount < CHALLENGES.length ? esc(CHALLENGES.find((c) => !S.done.ids.includes(c.id)).label) : 'All done today. Nice one!'}</span>
        <span class="small muted">${esc(coffeeGoal())}</span>
      </a>
      <div class="row between"><h2 class="h2">${hm ? 'Holiday events' : 'From the SU, the uni and students'}</h2><a class="small" href="#/events" style="font-weight:600">All</a></div>
      ${upcoming.map(eventCard).join('')}
      <a class="card blue" href="#/checkin">
        <span class="label blue">1-minute check-in</span>
        <span class="card-title">How are you doing this week?</span>
        <span class="small muted">Anonymous. Helps show whether Westmates works.</span>
      </a>
    </div>`;
  }

  function eventCard(e) {
    const going = e.going + (S.joined.includes(e.id) ? 1 : 0);
    return `<a class="card" href="#/event/${e.id}">
      <div class="row between">${catLabel(e)}${S.joined.includes(e.id) ? '<span class="label green">Going</span>' : ''}</div>
      <span class="card-title">${esc(e.title)}</span>
      <span class="small muted">${esc(e.when)} · ${going} going</span>
    </a>`;
  }

  function holiday() {
    const chip = (label, list) => `<button type="button" class="chip" data-act="toggle-${list}" data-val="${esc(label)}" aria-pressed="${S.holiday[list].includes(label)}">${esc(label)}</button>`;
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
          <span class="card-title">${esc(m.name)}${m.staying ? ' <span class="label amber" style="margin-left:4px">Staying</span>' : ''}</span>
          <span class="small muted">${esc(m.course)}</span>
          <span class="small green" style="font-weight:600">${s.length ? 'Both into ' + esc(s.join(', ').toLowerCase()) : 'New interests to try'}</span>
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
      <div class="chips" style="justify-content:center">${m.interests.map((i) => `<span class="chip" aria-pressed="${s.includes(i)}" style="cursor:default">${esc(i)}</span>`).join('')}</div>
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
    const faces = MATES.slice(0, 3);
    return `
    <header class="band">
      ${back('#/events', 'Events', true)}
      <div class="row" style="flex-wrap:wrap">${e.holiday ? '<span class="tag amber">Holiday</span>' : ''}<span class="tag line">${e.cat === 'su' ? 'SU &amp; uni' : 'By a student'}</span></div>
      <h1 class="h1 big">${esc(e.title)}</h1>
      <p class="small muted" style="margin:0">Hosted by ${esc(e.host)}</p>
    </header>
    <div class="content">
      <div class="list">
        <div class="li">${icon('events', 20, 'var(--thames)')}<span>${esc(e.when)}</span></div>
        <div class="li">${icon('pin', 20, 'var(--thames)')}<span>${esc(e.where)}</span></div>
        <div class="li">${icon('walk', 20, 'var(--thames)')}<span>${esc(e.desc)}</span></div>
      </div>
      ${mine ? `<div class="card warm"><span class="label amber">You're hosting</span><span class="card-title">+15 pts added for posting it.</span><span class="small muted">Mates who are staying will see it in Events. Keep the first meet-up in a public place.</span></div>`
      : `<div class="row"><span class="stack">${faces.map((m) => avatar(m, 'sm')).join('')}</span><strong>${j ? `You and ${going - 1} others are going` : `${going} going`}</strong></div>`}
      ${mine ? '' : j ? `<button type="button" class="btn outline-green block" data-act="leave" data-val="${e.id}">${icon('check', 20)}You're going · tap to leave</button>
             <p class="small green" style="margin:0;text-align:center;font-weight:600">+10 pts added. Check in on the day for +20 more.</p>`
          : `<button type="button" class="btn primary block" data-act="join" data-val="${e.id}">Join · +10 pts</button>`}
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
      <button class="btn primary block">Post event · +15 pts</button>
    </form>`;
  }

  function challenges() {
    const pct = Math.min(100, Math.round((S.points / 300) * 100));
    return `
    <header class="band">
      <span class="label amber">Your points</span>
      <div class="row" style="align-items:baseline"><span style="font:600 44px/48px var(--font-display);letter-spacing:-.02em">${S.points}</span><span class="small muted">pts</span></div>
      <div class="bar" role="img" aria-label="${esc(coffeeGoal())}"><div style="width:${pct}%"></div></div>
      <p class="small muted" style="margin:0">${esc(coffeeGoal())}</p>
    </header>
    <div class="content">
      <h2 class="h2">Today's challenges</h2>
      ${CHALLENGES.map((c) => {
        const on = S.done.ids.includes(c.id);
        return `<button type="button" class="task" data-act="task" data-val="${c.id}" aria-pressed="${on}">
          <span class="tick">${on ? icon('check', 16, '#fff', 3) : ''}</span>
          <span class="t-label" style="flex:1">${esc(c.label)}</span>
          <span class="green" style="font-weight:600;font-size:14px">+${c.pts}</span></button>`;
      }).join('')}
      <div class="row between"><h2 class="h2">Rewards</h2><a class="small" href="#/rewards" style="font-weight:600">See all</a></div>
      <div class="grid2">${REWARDS.slice(0, 2).map((r) => `<a class="card ${r.id === 'coffee' ? 'warm' : ''}" href="#/rewards"><span class="card-title" style="font-size:15px">${esc(r.title)}</span><span class="small amber" style="font-weight:600">${r.cost} pts</span></a>`).join('')}</div>
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
          <span class="card-title">${esc(r.title)}</span>
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
        ${LONELY.map((o, i) => `<button type="button" class="opt" data-act="ci-lonely" data-val="${i}" aria-pressed="${ci.lonely === i}">${o}</button>`).join('')}
      </fieldset>
      <fieldset style="border:0;margin:0;padding:0;display:flex;flex-direction:column;gap:8px">
        <legend class="h2" style="font-size:16px;margin-bottom:8px">Overall, how satisfied are you with your life nowadays?</legend>
        <div class="scale">${Array.from({ length: 11 }, (_, n) => `<button type="button" data-act="ci-sat" data-val="${n}" aria-pressed="${ci.sat === n}" aria-label="${n} out of 10">${n}</button>`).join('')}</div>
        <div class="row between tiny muted"><span>Not at all</span><span>Completely</span></div>
      </fieldset>
      <button type="button" class="btn primary block" data-act="ci-send" ${ci.lonely === null || ci.sat === null ? 'disabled' : ''}>Send check-in · +5 pts</button>
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
      </div>
      <div id="install" class="card warm install">${icon('download', 22)}<span style="flex:1"><span class="card-title" style="font-size:15px;display:block">Add Westmates to your home screen</span><span class="small muted" id="install-text">${installText()}</span></span>
        <button type="button" class="btn primary sm ${deferredPrompt ? '' : 'hidden'}" data-act="install">Install</button></div>
      <button type="button" class="btn danger block" data-act="reset">Reset demo</button>
      <p class="tiny muted demo-note">Westmates is a student concept for module 6LEAD001W, not an official University of Westminster app. People, events and numbers are sample data, saved only on this device.</p>
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
  let deferredPrompt = null;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  function installText() {
    if (standalone) return "It's installed. Open it from your home screen.";
    if (deferredPrompt) return 'Tap Install to add it like an app.';
    if (isIOS) return 'In Safari, tap Share, then "Add to Home Screen".';
    return 'In your browser menu, choose "Install app" or "Add to Home screen".';
  }
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; if (route().name === 'me') render(); });

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
  function render() {
    const r = route();
    const fn = SCREENS[r.name] || notFound;
    $('#view').innerHTML = fn(r.id);
    const tab = TAB_OF[r.name] || 'home';
    $('#tabs').innerHTML = TABS.map(([k, l, ic]) => `<a href="#/${k}" ${tab === k ? 'aria-current="page"' : ''}>${icon(ic, 22)}${l}</a>`).join('');
    document.title = 'Westmates';
    if (r.name !== lastName) { window.scrollTo(0, 0); $('#view').focus({ preventScroll: true }); }
    lastName = r.name;
    if (r.name === 'chat') { const c = $('#chat'); if (c) window.scrollTo(0, document.body.scrollHeight); }
    paintStatusBar();
  }
  // Colour the strip behind the phone's status bar (and the browser theme colour) to match the top of the screen.
  function paintStatusBar() {
    const first = $('#view').firstElementChild;
    let bg = first ? getComputedStyle(first).backgroundColor : '';
    if (!bg || bg === 'transparent' || /rgba\(.*,\s*0\)$/.test(bg)) bg = getComputedStyle($('#app')).backgroundColor;
    document.documentElement.style.setProperty('--status-fill', bg);
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
    } else if (act === 'install' && deferredPrompt) {
      deferredPrompt.prompt(); deferredPrompt.userChoice.finally(() => { deferredPrompt = null; render(); });
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
        cat: 'student', holiday: d.get('holiday') === 'on', host: S.name + ' (you)', going: 0 };
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

  // ---------- Start ----------
  if (!location.hash) location.replace('#/home');
  render();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
