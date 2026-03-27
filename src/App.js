import React, { useState, useEffect } from 'react';

/**
 * LearnSpark - React Implementation
 * This file contains the entire application logic, styles, and templates
 * to match the requested output exactly.
 */

const LearnSpark = () => {
  // --- STATE MANAGEMENT ---
  const [currentPage, setCurrentPage] = useState('pg-login');
  const [role, setRole] = useState('kid');
  const [user, setUser] = useState(null);
  const [cSearch, setCSearch] = useState('');
  const [cFilter, setCFilter] = useState('all');
  const [modal, setModal] = useState({ show: false, title: '', body: '', okTxt: 'Got it!', okFn: null });
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [activeKidTab, setActiveKidTab] = useState('dashboard');
  const [activeParTab, setActiveParTab] = useState('dashboard');

  // --- CONSTANTS ---
  const COURSES_DATA = [
    { id: 1, title: 'Math for Kids', emoji: '🧮', bg: '#FFF3D6', diff: 'Beginner', lessons: 12, dur: '4 weeks', progress: 75, teacher: 'Ms. Priya Sharma', desc: 'Master numbers, fractions, and problem-solving through fun activities!' },
    { id: 2, title: 'Science Explorer', emoji: '🔬', bg: '#E8F5E9', diff: 'Intermediate', lessons: 10, dur: '3 weeks', progress: 60, teacher: 'Mr. Arjun Rao', desc: 'Explore plants, animals, space, and experiments!' },
    { id: 3, title: 'English Writing', emoji: '✍️', bg: '#FCE4EC', diff: 'Beginner', lessons: 8, dur: '2 weeks', progress: 90, teacher: 'Ms. Kavya Nair', desc: 'Build storytelling, grammar, and creative writing skills!' },
    { id: 4, title: 'Art & Creativity', emoji: '🎨', bg: '#FFF8E1', diff: 'Beginner', lessons: 6, dur: '2 weeks', progress: 45, teacher: 'Mr. Rohan Das', desc: 'Unleash your creativity with painting, drawing, and crafts!' },
    { id: 5, title: 'Coding for Kids', emoji: '💻', bg: '#E3F2FD', diff: 'Intermediate', lessons: 15, dur: '6 weeks', progress: 0, teacher: 'Ms. Ananya Iyer', desc: 'Learn programming basics and build your first app!' },
    { id: 6, title: 'Music Basics', emoji: '🎵', bg: '#F3E5F5', diff: 'Beginner', lessons: 8, dur: '3 weeks', progress: 0, teacher: 'Mr. Vikram Joshi', desc: 'Learn rhythm, notes, and play simple melodies!' },
  ];

  const [courses, setCourses] = useState(COURSES_DATA);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // --- UTILS ---
  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 2800);
  };

  const showModal = (title, body, okTxt = 'Got it!', okFn = null) => {
    setModal({ show: true, title, body, okTxt, okFn });
  };

  const closeModal = () => setModal({ ...modal, show: false });

  // --- AUTH LOGIC ---
  const handleLogin = (e) => {
    const email = document.getElementById('l-email').value;
    if (!email) {
      document.getElementById('l-err').classList.add('show');
      document.getElementById('l-err').textContent = "Please fill in all fields.";
      return;
    }
    const userData = { name: email.split('@')[0], role, email };
    setUser(userData);
    setCurrentPage(role === 'kid' ? 'pg-kid' : 'pg-parent');
    showToast(`Welcome back, ${cap(userData.name)}! 🎉`);
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('pg-login');
    showToast('Logged out. See you soon! 👋');
  };

  const confirmLogout = () => {
    showModal('🚪 Log Out', 'Are you sure you want to log out?', 'Yes, Log Out', () => {
      closeModal();
      logout();
    });
  };

  // --- CALENDAR GENERATOR ---
  const renderCalendar = () => {
    const now = new Date();
    const yr = 2025; // Matching your code's specific year
    const mo = 2; // March (0-indexed)
    const fd = new Date(yr, mo, 1).getDay();
    const dim = new Date(yr, mo + 1, 0).getDate();
    const evDays = [5, 10, 14, 18, 19, 20, 25];

    let cells = [];
    for (let i = 0; i < fd; i++) cells.push(<div key={`empty-${i}`} className="cday empty"></div>);
    for (let d = 1; d <= dim; d++) {
      const isToday = d === 18; // Mocking "today" as the 18th for UI consistency
      const hasEv = evDays.includes(d);
      cells.push(
        <div 
          key={d} 
          className={`cday ${isToday ? 'today' : ''} ${hasEv ? 'has-ev' : ''}`}
          onClick={() => showToast(`📅 March ${d} — ${hasEv ? 'Class scheduled!' : 'No class today.'}`)}
        >
          {d}
        </div>
      );
    }
    return cells;
  };

  // --- COURSE HELPERS ---
  const enrollCourse = (id) => {
    const c = courses.find(x => x.id === id);
    showModal(`🚀 Enroll in ${c.title}`, `Teacher: ${c.teacher}\nLessons: ${c.lessons}\nDuration: ${c.dur}\n\nReady to start?`, 'Enroll Now!', () => {
      setCourses(prev => prev.map(item => item.id === id ? { ...item, progress: 5 } : item));
      closeModal();
      showToast(`🎉 Enrolled in ${c.title}!`);
    });
  };

  const openCourse = (id) => {
    const c = courses.find(x => x.id === id);
    setSelectedCourse(c);
    setCurrentPage('pg-detail');
  };

  // --- SUB-COMPONENTS ---
  const CourseGrid = ({ type }) => {
    const filtered = courses.filter(c => {
      const ms = !cSearch || c.title.toLowerCase().includes(cSearch.toLowerCase());
      const mt = cFilter === 'all' || 
                 (cFilter === 'progress' && c.progress > 0 && c.progress < 100) || 
                 (cFilter === 'done' && c.progress === 100) || 
                 (cFilter === 'new' && c.progress === 0);
      return ms && mt;
    });

    if (filtered.length === 0) return <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--txl)' }}>No courses found 🔍</div>;

    return filtered.map(c => (
      <div key={c.id} className="ccard" onClick={() => openCourse(c.id)}>
        <div className="cthumb" style={{ background: c.bg }}>
          <span>{c.emoji}</span>
          <span className="cdiff" style={{ background: c.diff === 'Beginner' ? '#2E7D32' : c.diff === 'Intermediate' ? '#7B1FA2' : '#B71C1C' }}>{c.diff}</span>
        </div>
        <div className="cbody">
          <div className="ctname">{c.title}</div>
          <div className="cmeta"><span>📖 {c.lessons} lessons</span><span>⏱️ {c.dur}</span></div>
          <div className="cmeta"><span>👩‍🏫 {c.teacher}</span></div>
          {c.progress > 0 ? (
            <>
              <div className="cprow"><span>Progress</span><span>{c.progress}%</span></div>
              <div className="pb"><div className="pf pf-a" style={{ width: `${c.progress}%` }}></div></div>
            </>
          ) : (
            <button className="start-btn" onClick={(e) => { e.stopPropagation(); enrollCourse(c.id); }}>🚀 Start Course</button>
          )}
        </div>
      </div>
    ));
  };

  return (
    <>
      <style>{`
        :root{
          --cream:#FFF8ED;--ap:#FFF3D6;--al:#FFE499;--amber:#F5C842;--ad:#E6A800;--adk:#B07D00;
          --br:#7A5C1E;--brl:#C8A84B;--tx:#2C1A00;--txm:#7A5C1E;--txl:#B8975A;
          --wh:#FFFFFF;--card:#FFFDF5;--bd:#F0DC9A;--bdl:#FAF0CC;
          --coral:#FF5722;--green:#4CAF50;--blue:#3B82F6;--pink:#EC4899;
          --s1:0 2px 10px rgba(180,140,0,.10);
          --s2:0 6px 28px rgba(180,140,0,.16);
          --s3:0 10px 40px rgba(180,140,0,.22);
          --r:16px;--rs:10px;
        }
        body { margin: 0; background: var(--cream); color: var(--tx); font-family: 'Poppins', sans-serif; }
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%{transform:scale(.88);opacity:0}65%{transform:scale(1.03)}100%{transform:scale(1);opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .a1{animation:fadeUp .4s .05s both}.a2{animation:fadeUp .4s .12s both}
        .a3{animation:fadeUp .4s .20s both}.a4{animation:fadeUp .4s .28s both}
        .page{display:none;min-height:100vh;}.page.active{display:flex;}
        
        /* AUTH styles duplicated for React context */
        .auth-bg{flex:1;display:flex;align-items:center;justify-content:center;
          background:radial-gradient(ellipse at 25% 60%,#FFE08A 0%,#FFF8ED 55%,#FFD580 100%);
          position:relative;overflow:hidden;padding:20px;}
        .deco{position:absolute;border-radius:50%;pointer-events:none;}
        .d1{width:300px;height:300px;background:rgba(245,200,66,.2);top:-80px;left:-60px;animation:float 7s ease-in-out infinite;}
        .d2{width:180px;height:180px;background:rgba(255,87,34,.12);bottom:-30px;right:8%;animation:float 9s ease-in-out infinite reverse;}
        .d3{width:120px;height:120px;background:rgba(245,200,66,.25);top:35%;right:4%;animation:float 6s ease-in-out infinite 1.5s;}
        .auth-card{background:var(--wh);border-radius:24px;padding:38px 36px;width:100%;max-width:410px;
          box-shadow:var(--s3);border:1.5px solid var(--bdl);position:relative;z-index:2;animation:pop .45s ease both;}
        .brand{display:flex;align-items:center;gap:9px;justify-content:center;margin-bottom:24px;}
        .bmark{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,var(--amber),var(--ad));
          display:flex;align-items:center;justify-content:center;font-size:19px;box-shadow:0 4px 12px rgba(230,168,0,.38);animation:float 3.5s ease-in-out infinite;}
        .bname{font-family:'Lilita One',sans-serif;font-size:1.5rem;color:var(--tx);}
        .bname span{color:var(--ad);}
        .auth-title{font-family:'Lilita One',sans-serif;font-size:1.55rem;color:var(--tx);text-align:center;margin-bottom:4px;}
        .auth-sub{color:var(--txl);text-align:center;font-size:.86rem;margin-bottom:22px;}
        .role-row{display:flex;gap:6px;background:var(--ap);border-radius:11px;padding:4px;margin-bottom:20px;}
        .rbtn{flex:1;border:none;border-radius:8px;padding:8px 4px;font-family:'Poppins',sans-serif;font-size:.78rem;font-weight:600;cursor:pointer;transition:all .2s;background:transparent;color:var(--txm);}
        .rbtn.on{background:var(--wh);color:var(--br);box-shadow:var(--s1);}
        .fg{margin-bottom:13px;}
        .fg label{display:block;font-size:.8rem;font-weight:600;color:var(--tx);margin-bottom:5px;}
        .fg input{width:100%;padding:10px 13px;border:1.5px solid var(--bd);border-radius:var(--rs);font-family:'Poppins',sans-serif;font-size:.88rem;outline:none;background:var(--ap);color:var(--tx);transition:all .2s;}
        .fg input:focus{border-color:var(--ad);background:var(--wh);box-shadow:0 0 0 3px rgba(230,168,0,.13);}
        .btn-main{width:100%;padding:12px;border:none;border-radius:var(--rs);cursor:pointer;background:linear-gradient(135deg,var(--amber),var(--ad));color:var(--br);font-family:'Poppins',sans-serif;font-size:.92rem;font-weight:700;box-shadow:0 4px 16px rgba(230,168,0,.38);transition:all .2s;margin-top:4px;}
        .err{background:#FEE2E2;color:#B91C1C;border-radius:9px;padding:9px 12px;font-size:.8rem;font-weight:600;margin-bottom:11px;display:none;}
        .err.show{display:block;animation:fadeUp .3s ease;}
        .auth-foot{text-align:center;margin-top:16px;color:var(--txl);font-size:.83rem;}
        .auth-foot a{color:var(--ad);font-weight:700;cursor:pointer;}

        /* DASH LAYOUT */
        .dash{flex-direction:row;}
        .sidebar{width:215px;height:100vh;position:fixed;top:0;left:0;background:var(--wh);border-right:1.5px solid var(--bdl);display:flex;flex-direction:column;padding:22px 13px;z-index:100;box-shadow:2px 0 14px rgba(180,140,0,.07);}
        .sb-brand{display:flex;align-items:center;gap:8px;padding:0 5px;margin-bottom:20px;}
        .sb-bmark{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--amber),var(--ad));display:flex;align-items:center;justify-content:center;font-size:16px;}
        .sb-bname{font-family:'Lilita One',sans-serif;font-size:1.18rem;color:var(--tx);}
        .sb-bname span{color:var(--ad);}
        .sb-user{background:linear-gradient(135deg,var(--ap),#FFF3C0);border-radius:12px;padding:11px;display:flex;align-items:center;gap:9px;margin-bottom:20px;border:1.5px solid var(--bd);}
        .av{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:var(--wh);flex-shrink:0;border:2px solid var(--wh);background:linear-gradient(135deg,var(--ad),var(--brl));}
        .sb-uname{font-weight:700;font-size:.82rem;color:var(--tx);}
        .sb-urole{font-size:.67rem;font-weight:600;color:var(--ad);background:rgba(230,168,0,.14);border-radius:20px;padding:1px 7px;display:inline-block;margin-top:2px;}
        .sb-lbl{font-size:.65rem;font-weight:700;color:var(--txl);letter-spacing:.09em;text-transform:uppercase;padding:0 9px;margin:6px 0 5px;}
        .nav-item{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:var(--rs);cursor:pointer;transition:all .2s;color:var(--txm);font-weight:600;font-size:.83rem;margin-bottom:2px;}
        .nav-item:hover{background:var(--ap);color:var(--br);}
        .nav-item.on{background:linear-gradient(135deg,var(--al),var(--ap));color:var(--br);box-shadow:var(--s1);}
        .nav-item .ni{font-size:1rem;width:20px;text-align:center;}
        .nav-item .nb{margin-left:auto;background:var(--coral);color:var(--wh);border-radius:20px;padding:1px 6px;font-size:.65rem;font-weight:700;}
        .sb-bottom{margin-top:auto;}
        .logout-btn{width:100%;display:flex;align-items:center;gap:8px;padding:9px 11px;border:none;background:none;cursor:pointer;color:var(--txm);font-family:'Poppins',sans-serif;font-weight:600;font-size:.83rem;border-radius:var(--rs);transition:all .2s;}
        .logout-btn:hover{background:#FEE2E2;color:#B91C1C;}
        .main{margin-left:215px;flex:1;min-height:100vh;padding:24px 28px;background:var(--cream);}

        /* TOPBAR */
        .topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;}
        .topbar h1{font-family:'Lilita One',sans-serif;font-size:1.65rem;color:var(--tx);}
        .topbar h1 span{color:var(--ad);}
        .tbr{display:flex;align-items:center;gap:11px;}
        .searchbar{display:flex;align-items:center;gap:7px;background:var(--wh);border:1.5px solid var(--bd);border-radius:40px;padding:8px 15px;min-width:190px;}
        .searchbar input{border:none;outline:none;font-family:'Poppins',sans-serif;font-size:.83rem;background:transparent;color:var(--tx);width:100%;}
        .iBtn{width:36px;height:36px;border-radius:50%;background:var(--wh);border:1.5px solid var(--bd);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.95rem;transition:all .2s;position:relative;}
        .iBtn:hover{background:var(--ap);border-color:var(--ad);}
        .ndot{position:absolute;top:5px;right:6px;width:7px;height:7px;background:var(--coral);border-radius:50%;border:1.5px solid var(--wh);}

        /* GRID & CARDS */
        .g2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .mb{margin-bottom:18px;}
        .card{background:var(--card);border-radius:var(--r);padding:18px;box-shadow:var(--s1);border:1.5px solid var(--bdl);transition:all .22s;}
        .ctitle{font-weight:700;font-size:.88rem;color:var(--tx);margin-bottom:13px;display:flex;align-items:center;gap:7px;}
        .see-more{color:var(--ad);font-size:.75rem;font-weight:600;cursor:pointer;margin-left:auto;}

        /* STATS */
        .sc{border-radius:var(--r);padding:18px 20px;display:flex;flex-direction:column;gap:5px;position:relative;overflow:hidden;transition:all .22s;}
        .sc:hover{transform:translateY(-3px);box-shadow:var(--s3);}
        .s-a{background:linear-gradient(135deg,#D68000,#F5C842);}
        .s-c{background:linear-gradient(135deg,#BF360C,#FF7043);}
        .s-g{background:linear-gradient(135deg,#1B5E20,#66BB6A);}
        .s-b{background:linear-gradient(135deg,#0D47A1,#42A5F5);}
        .s-icon{font-size:1.5rem;}.s-val{font-family:'Lilita One',sans-serif;font-size:1.75rem;color:#fff;line-height:1.1;}
        .s-lbl{font-size:.75rem;font-weight:600;color:rgba(255,255,255,.82);}

        /* DONUTS */
        .dcard{background:linear-gradient(160deg,#4A3400,#7A5C1E);border-radius:var(--r);padding:16px;display:flex;flex-direction:column;align-items:center;gap:5px;transition:all .22s;cursor:default;}
        .d-title{font-size:.75rem;font-weight:600;color:rgba(255,255,255,.72);text-align:center;}
        .d-val{font-family:'Lilita One',sans-serif;font-size:1rem;color:#fff;}
        svg.donut{transform:rotate(-90deg);}
        .dc-bg{fill:none;stroke:rgba(255,255,255,.13);stroke-width:9;}
        .dc{fill:none;stroke-width:9;stroke-linecap:round;transition:stroke-dashoffset 1.3s cubic-bezier(.4,0,.2,1);}

        /* CALENDAR */
        .cal-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px;}
        .cal-month{font-weight:700;font-size:.85rem;color:var(--tx);}
        .cnav{width:24px;height:24px;border-radius:50%;border:1.5px solid var(--bd);background:var(--wh);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.75rem;}
        .cgrid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;}
        .cday-name{font-size:.62rem;font-weight:700;color:var(--txl);padding:3px 0;}
        .cday{font-size:.72rem;font-weight:600;color:var(--txm);padding:5px 2px;border-radius:6px;cursor:pointer;position:relative;}
        .cday.today{background:linear-gradient(135deg,var(--amber),var(--ad));color:#fff;font-weight:700;}
        .cday.has-ev::after{content:'';position:absolute;bottom:1px;left:50%;transform:translateX(-50%);width:4px;height:4px;background:var(--coral);border-radius:50%;}
        .cday.empty{cursor:default;color:transparent;}

        /* PROGRESS BARS */
        .pb-wrap{margin:8px 0;}
        .pb-row{display:flex;justify-content:space-between;font-size:.75rem;font-weight:600;color:var(--txm);margin-bottom:4px;}
        .pb{height:8px;background:var(--al);border-radius:20px;overflow:hidden;}
        .pf{height:100%;border-radius:20px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
        .pf-a{background:linear-gradient(90deg,var(--ad),var(--amber));}
        .pf-c{background:linear-gradient(90deg,#BF360C,#FF7043);}
        .pf-g{background:linear-gradient(90deg,#1B5E20,#66BB6A);}
        .pf-b{background:linear-gradient(90deg,#0D47A1,#42A5F5);}

        /* COURSE CARDS */
        .ccard{background:var(--card);border-radius:var(--r);overflow:hidden;border:1.5px solid var(--bdl);box-shadow:var(--s1);transition:all .22s;cursor:pointer;}
        .ccard:hover{transform:translateY(-4px);box-shadow:var(--s3);}
        .cthumb{height:105px;display:flex;align-items:center;justify-content:center;font-size:2.8rem;position:relative;}
        .cdiff{position:absolute;top:8px;right:8px;font-size:.65rem;font-weight:700;padding:2px 8px;border-radius:20px;color:#fff;}
        .cbody{padding:13px;}
        .ctname{font-weight:700;font-size:.85rem;color:var(--tx);margin-bottom:4px;}
        .cmeta{display:flex;gap:8px;font-size:.7rem;color:var(--txl);font-weight:600;margin-bottom:8px;}
        .cprow{display:flex;justify-content:space-between;font-size:.7rem;font-weight:600;color:var(--txm);margin-bottom:3px;}
        .start-btn{width:100%;padding:7px;background:linear-gradient(135deg,var(--amber),var(--ad));border:none;border-radius:8px;color:var(--br);font-family:'Poppins',sans-serif;font-weight:700;cursor:pointer;font-size:.78rem;}

        /* MISC */
        .mbanner{background:linear-gradient(135deg,#7A5C1E 0%,#C8A84B 60%,#F5C842 100%);border-radius:var(--r);padding:22px 26px;color:#fff;display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;position:relative;overflow:hidden;}
        .mascot-emoji{font-size:3.8rem;animation:float 3s ease-in-out infinite;}
        .bbtns{display:flex;gap:9px;margin-top:13px;flex-wrap:wrap;}
        .bbtn{padding:7px 16px;border-radius:40px;border:1.5px solid rgba(255,255,255,.4);background:rgba(255,255,255,.15);color:#fff;font-weight:600;font-size:.78rem;cursor:pointer;}
        .trow{display:flex;align-items:center;gap:9px;padding:8px 9px;border-radius:var(--rs);cursor:pointer;transition:all .2s;}
        .trow:hover{background:var(--ap);}
        .tav{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;}
        .t-msgbtn{margin-left:auto;width:26px;height:26px;border-radius:50%;background:var(--al);border:none;cursor:pointer;font-size:.75rem;}
        .evrow{display:flex;align-items:flex-start;gap:10px;padding:9px 10px;border-radius:var(--rs);cursor:pointer;transition:all .2s;margin-bottom:6px;border:1.5px solid var(--bdl);}
        .evdate{font-family:'Lilita One',sans-serif;font-size:1.4rem;color:var(--ad);min-width:26px;}
        .ev-title{font-weight:700;font-size:.8rem;color:var(--tx);}
        .ev-time{font-size:.7rem;color:var(--txl);}
        .tabs{display:flex;gap:7px;margin-bottom:20px;}
        .tabBtn{padding:7px 18px;border-radius:40px;border:1.5px solid var(--bd);background:var(--wh);color:var(--txm);font-weight:600;font-size:.8rem;cursor:pointer;}
        .tabBtn.on{background:var(--ad);color:#fff;border-color:var(--ad);}
        .dtable{width:100%;border-collapse:collapse;}
        .dtable th{text-align:left;font-size:.72rem;font-weight:700;color:var(--txl);text-transform:uppercase;padding:9px 12px;border-bottom:2px solid var(--bd);}
        .dtable td{padding:11px 12px;border-bottom:1px solid var(--ap);font-size:.82rem;color:var(--tx);}
        .stag{padding:2px 9px;border-radius:20px;font-size:.7rem;font-weight:700;}
        .stag.active{background:#DCFCE7;color:#166534;}
        .stag.done{background:#EDE9FE;color:#5B21B6;}

        /* MODAL & TOAST */
        .moverlay{position:fixed;inset:0;background:rgba(44,26,0,.45);z-index:200;display:none;align-items:center;justify-content:center;backdrop-filter:blur(3px);}
        .moverlay.show{display:flex;animation:fadeUp .3s ease;}
        .modal{background:var(--wh);border-radius:var(--r);padding:28px;max-width:400px;width:90%;box-shadow:var(--s3);}
        .mbtns{display:flex;gap:10px;justify-content:flex-end;}
        .mbtn{padding:8px 18px;border-radius:var(--rs);border:none;cursor:pointer;font-weight:700;font-size:.83rem;}
        .mbtn-c{background:var(--ap);color:var(--txm);}
        .mbtn-ok{background:linear-gradient(135deg,var(--amber),var(--ad));color:var(--br);}
        #toast{position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--br);color:#fff;padding:12px 20px;border-radius:12px;font-weight:600;font-size:.87rem;box-shadow:var(--s3);display:none;}
        #toast.show{display:block;animation:fadeUp .35s ease;}

        @media(max-width:900px){.sidebar{width:190px;}.main{margin-left:190px;padding:18px;}.g4{grid-template-columns:1fr 1fr;}}
        @media(max-width:650px){.sidebar{display:none;}.main{margin-left:0;padding:14px;}.g2,.g3,.g4{grid-template-columns:1fr;}}
      `}</style>

      {/* --- LOGIN PAGE --- */}
      <div className={`page ${currentPage === 'pg-login' ? 'active' : ''}`} id="pg-login">
        <div className="auth-bg">
          <div className="deco d1"></div><div className="deco d2"></div><div className="deco d3"></div>
          <div className="auth-card">
            <div className="brand"><div className="bmark">🌟</div><div className="bname">Learn<span>Spark</span></div></div>
            <div className="auth-title">Welcome Back! 👋</div>
            <div className="auth-sub">Sign in to continue your learning journey</div>
            <div className="role-row">
              <button className={`rbtn ${role === 'kid' ? 'on' : ''}`} onClick={() => setRole('kid')}>🧒 Kid</button>
              <button className={`rbtn ${role === 'parent' ? 'on' : ''}`} onClick={() => setRole('parent')}>👨‍👩‍👧 Parent</button>
              <button className={`rbtn ${role === 'teacher' ? 'on' : ''}`} onClick={() => setRole('teacher')}>👨‍🏫 Teacher</button>
            </div>
            <div className="err" id="l-err"></div>
            <div className="fg"><label>Email Address</label><input type="email" id="l-email" placeholder="you@example.com" /></div>
            <div className="fg"><label>Password</label><input type="password" id="l-pass" placeholder="••••••••" /></div>
            <button className="btn-main" id="loginBtn" onClick={handleLogin}>Sign In ✨</button>
            <div className="auth-foot">Don't have an account? <a onClick={() => setCurrentPage('pg-register')}>Register here</a></div>
          </div>
        </div>
      </div>

      {/* --- KID DASHBOARD --- */}
      <div className={`page dash ${currentPage === 'pg-kid' ? 'active' : ''}`} id="pg-kid">
        <aside className="sidebar">
          <div className="sb-brand"><div className="sb-bmark">🌟</div><div className="sb-bname">Learn<span>Spark</span></div></div>
          <div className="sb-user">
            <div className="av">{user?.name[0].toUpperCase() || 'S'}</div>
            <div><div className="sb-uname">{cap(user?.name) || 'Student'}</div><div className="sb-urole">Kid</div></div>
          </div>
          <div className="sb-lbl">Menu</div>
          <div className={`nav-item ${activeKidTab === 'dashboard' ? 'on' : ''}`} onClick={() => setActiveKidTab('dashboard')}><span className="ni">🏠</span>Dashboard</div>
          <div className={`nav-item ${activeKidTab === 'classes' ? 'on' : ''}`} onClick={() => setActiveKidTab('classes')}><span className="ni">📚</span>My Classes<span className="nb">4</span></div>
          <div className={`nav-item ${activeKidTab === 'grades' ? 'on' : ''}`} onClick={() => setActiveKidTab('grades')}><span className="ni">📊</span>My Grades</div>
          <div className={`nav-item ${activeKidTab === 'schedule' ? 'on' : ''}`} onClick={() => setActiveKidTab('schedule')}><span className="ni">📅</span>Schedule</div>
          <div className={`nav-item ${activeKidTab === 'badges' ? 'on' : ''}`} onClick={() => setActiveKidTab('badges')}><span className="ni">🏆</span>Badges</div>
          <div className="sb-bottom"><button className="logout-btn" onClick={confirmLogout}>🚪 Log Out</button></div>
        </aside>
        <main className="main">
          {activeKidTab === 'dashboard' && (
            <div className="tc on">
              <div className="topbar a1">
                <h1>Hello, <span>{cap(user?.name) || 'Student'}</span>! 👋</h1>
                <div className="tbr">
                  <div className="searchbar"><span>🔍</span><input placeholder="Search courses..." onChange={(e) => setCSearch(e.target.value)} /></div>
                  <div className="iBtn" onClick={() => showToast('🔔 2 new notifications!')}><span>🔔</span><div className="ndot"></div></div>
                </div>
              </div>
              <div className="mbanner a2">
                <div>
                  <h2>Ready to Learn Today? 🚀</h2>
                  <p>You're on a <strong>5-day streak</strong>! Keep going, superstar! ⚡</p>
                  <div className="bbtns">
                    <button className="bbtn" onClick={() => setActiveKidTab('classes')}>▶ Continue Learning</button>
                    <button className="bbtn" onClick={() => setActiveKidTab('badges')}>🏆 View Badges</button>
                  </div>
                </div>
                <div className="mascot-emoji">🦁</div>
              </div>
              <div className="g4 mb a3">
                <div className="sc s-a"><div className="s-icon">📚</div><div className="s-val">4</div><div className="s-lbl">Active Courses</div></div>
                <div className="sc s-c"><div className="s-icon">🏆</div><div className="s-val">12</div><div className="s-lbl">Badges Earned</div></div>
                <div className="sc s-g"><div className="s-icon">⚡</div><div className="s-val">5</div><div className="s-lbl">Day Streak</div></div>
                <div className="sc s-b"><div className="s-icon">⭐</div><div className="s-val">1,240</div><div className="s-lbl">XP Points</div></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '16px', marginBottom: '18px' }} className="a4">
                <div className="card">
                  <div className="ctitle">👩‍🏫 Linked Teachers</div>
                  <div className="trow">
                    <div className="tav" style={{ background: 'linear-gradient(135deg,#7B1FA2,#CE93D8)' }}>P</div>
                    <div><div className="t-name">Ms. Priya Sharma</div><div className="t-sub">Math · Teacher</div></div>
                    <button className="t-msgbtn" onClick={() => showToast('💬 Message sent to Ms. Priya!')}>💬</button>
                  </div>
                </div>
                <div className="card">
                  <div className="ctitle">📅 Upcoming Events</div>
                  <div className="evrow">
                    <div className="evdate">18</div>
                    <div><div className="ev-title">Math for Kids</div><div className="ev-time">09:00 AM · Ms. Priya</div></div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="dcard">
                    <div className="d-title">Attendance</div>
                    <svg className="donut" width="68" height="68" viewBox="0 0 68 68">
                      <circle className="dc-bg" cx="34" cy="34" r="26" />
                      <circle className="dc" cx="34" cy="34" r="26" stroke="#F5C842" strokeDasharray="163.4" strokeDashoffset="41" />
                    </svg>
                    <div className="d-val">75%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeKidTab === 'classes' && (
            <div className="tc on">
              <div className="topbar"><h1>📚 My <span>Classes</span></h1></div>
              <div className="tabs">
                <button className={`tabBtn ${cFilter === 'all' ? 'on' : ''}`} onClick={() => setCFilter('all')}>All</button>
                <button className={`tabBtn ${cFilter === 'progress' ? 'on' : ''}`} onClick={() => setCFilter('progress')}>In Progress</button>
                <button className={`tabBtn ${cFilter === 'done' ? 'on' : ''}`} onClick={() => setCFilter('done')}>Completed</button>
              </div>
              <div className="g3"><CourseGrid type="kid" /></div>
            </div>
          )}
          {activeKidTab === 'schedule' && (
            <div className="tc on">
               <div className="topbar"><h1>📅 My <span>Schedule</span></h1></div>
               <div className="g2">
                  <div className="card">
                    <div className="ctitle">🗓️ March 2025</div>
                    <div id="kid-cal">{renderCalendar()}</div>
                  </div>
               </div>
            </div>
          )}
        </main>
      </div>

      {/* --- COURSE DETAIL --- */}
      {currentPage === 'pg-detail' && selectedCourse && (
        <div className="page dash active">
          <aside className="sidebar">
            <div className="sb-brand"><div className="sb-bmark">🌟</div><div className="sb-bname">Learn<span>Spark</span></div></div>
            <div className="nav-item" onClick={() => setCurrentPage(role === 'kid' ? 'pg-kid' : 'pg-parent')} style={{ marginBottom: '10px' }}><span className="ni">←</span>Back</div>
            <div className="sb-lbl">Chapters</div>
            {['Introduction', 'Chapter 1: Basics', 'Chapter 2: Practice', 'Chapter 3: Advanced', '📝 Quiz'].map((ch, i) => (
              <div key={i} className={`nav-item ${i === 0 ? 'on' : ''}`} onClick={() => showToast(`📖 ${ch}`)}>
                 <span className="ni">{ch.includes('Quiz') ? '📝' : '📄'}</span>{ch}
              </div>
            ))}
          </aside>
          <main className="main">
            <div className="topbar a1"><h1>{selectedCourse.emoji} <span>{selectedCourse.title}</span></h1></div>
            <div className="card a2 mb">
               <div style={{ display: 'flex', gap: '18px' }}>
                  <div style={{ width: '82px', height: '82px', borderRadius: '16px', background: selectedCourse.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem' }}>{selectedCourse.emoji}</div>
                  <div>
                    <h2>{selectedCourse.title}</h2>
                    <p>{selectedCourse.desc}</p>
                    <button className="btn-main" style={{ width: 'auto' }} onClick={() => showToast('🚀 Starting lesson...')}>▶ Continue Learning</button>
                  </div>
               </div>
            </div>
          </main>
        </div>
      )}

      {/* --- MODAL --- */}
      <div className={`moverlay ${modal.show ? 'show' : ''}`} onClick={(e) => e.target.className.includes('moverlay') && closeModal()}>
        <div className="modal">
          <h3>{modal.title}</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{modal.body}</p>
          <div className="mbtns">
            <button className="mbtn mbtn-c" onClick={closeModal}>Close</button>
            <button className="mbtn mbtn-ok" onClick={modal.okFn || closeModal}>{modal.okTxt}</button>
          </div>
        </div>
      </div>

      {/* --- TOAST --- */}
      <div id="toast" className={toast.show ? 'show' : ''}>{toast.msg}</div>
    </>
  );
};

export default LearnSpark;