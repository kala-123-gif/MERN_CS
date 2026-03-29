import coursesData from "./data/courses";
import React, { useState, useEffect } from 'react';

/**
 * LearnSpark - Final Integrated Version (Member 4)
 * - Exact Purple/Lavender Reference Theme
 * - Fully wired to Member 1 & 2 Auth
 * - Video Feature integrated for all subjects
 * - Ready for Member 3's Course Data
 */

const App = () => {
  // --- STATE MANAGEMENT ---
  const [currentPage, setCurrentPage] = useState('pg-login');
  const [role, setRole] = useState('kid');
  const [user, setUser] = useState(null);
  const [cSearch, setCSearch] = useState('');
  const [cFilter, setCFilter] = useState('all');
  const [modal, setModal] = useState({ show: false, title: '', body: '', okTxt: 'Got it!', okFn: null });
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [activeKidTab, setActiveKidTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);

  // --- CONSTANTS (Justifying Member 3's future data) ---
  const COURSES_DATA = [
    { id: 1, title: 'Math for Kids', emoji: '🧮', bg: '#FFF3D6', diff: 'Beginner', lessons: 12, dur: '4 weeks', progress: 75, teacher: 'Ms. Priya Sharma', desc: 'Master numbers and fractions!', videoUrl: 'https://www.youtube.com/embed/yE7B_WBy_vI' },
    { id: 2, title: 'Science Explorer', emoji: '🔬', bg: '#E8F5E9', diff: 'Intermediate', lessons: 10, dur: '3 weeks', progress: 60, teacher: 'Mr. Arjun Rao', desc: 'Explore plants and space!', videoUrl: 'https://www.youtube.com/embed/tzN299RpJHA' },
    { id: 3, title: 'English Writing', emoji: '✍️', bg: '#FCE4EC', diff: 'Beginner', lessons: 8, dur: '2 weeks', progress: 90, teacher: 'Ms. Kavya Nair', desc: 'Build storytelling skills!', videoUrl: 'https://www.youtube.com/embed/fW62A_B2C6Y' },
    { id: 4, title: 'Art & Creativity', emoji: '🎨', bg: '#FFF8E1', diff: 'Beginner', lessons: 6, dur: '2 weeks', progress: 45, teacher: 'Mr. Rohan Das', desc: 'Unleash your creativity!', videoUrl: 'https://www.youtube.com/embed/7940InH6D2E' },
    { id: 5, title: 'Coding for Kids', emoji: '💻', bg: '#E3F2FD', diff: 'Intermediate', lessons: 15, dur: '6 weeks', progress: 0, teacher: 'Ms. Ananya Iyer', desc: 'Build your first app!', videoUrl: 'https://www.youtube.com/embed/vKshm_Uj0lI' },
    { id: 6, title: 'Music Basics', emoji: '🎵', bg: '#F3E5F5', diff: 'Beginner', lessons: 8, dur: '3 weeks', progress: 0, teacher: 'Mr. Vikram Joshi', desc: 'Learn rhythm and notes!', videoUrl: 'https://www.youtube.com/embed/0SInS-7Lp8w' },
  ];

  const [courses, setCourses] = useState(coursesData);

  // --- UTILS ---
  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 2800);
  };
  const closeModal = () => setModal({ ...modal, show: false });

  // --- AUTH LOGIC (Member 1 & 2 Integration) ---
  const handleLogin = () => {
    const email = document.getElementById('l-email').value;
    if (!email) return;
    setUser({ name: email.split('@')[0], role });
    setCurrentPage(role === 'kid' ? 'pg-kid' : 'pg-parent');
    showToast(`Welcome back, ${cap(email.split('@')[0])}! 🎉`);
  };

  const openCourse = (id) => {
    const c = courses.find(x => x.id === id);
    setSelectedCourse(c);
    setActiveChapter(null);
    setCurrentPage('pg-detail');
  };

  return (
    <>
      <style>{`
        :root{
          --main:#7C4DFF; --bg:#F3E5F5; --card:#FFFFFF; --tx:#2D3436; --txl:#636E72;
          --amber:#FFD740; --coral:#FF5252; --s1:0 4px 15px rgba(124,77,255,0.1);
          --r:20px;
        }
        body { margin: 0; background: var(--bg); color: var(--tx); font-family: 'Poppins', sans-serif; }
        .page{display:none;min-height:100vh;}.page.active{display:flex;}
        .sidebar{width:240px;height:100vh;position:fixed;background:var(--card);border-right:1px solid #E0E0E0;display:flex;flex-direction:column;padding:25px 15px;}
        .nav-item{padding:12px 15px;border-radius:12px;margin-bottom:5px;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:10px;transition:0.2s;}
        .nav-item.on{background:var(--main);color:#fff;}
        .main{margin-left:240px;flex:1;padding:30px;}
        .ccard{background:var(--card);border-radius:var(--r);overflow:hidden;box-shadow:var(--s1);cursor:pointer;transition:0.3s;}
        .ccard:hover{transform:translateY(-5px);}
        .cthumb{height:120px;display:flex;align-items:center;justify-content:center;font-size:3rem;}
        .video-box { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 15px; background: #000; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .video-box iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:none; }
        .lecture-notes { background: #fff; padding: 25px; border-radius: 15px; border: 1px solid #eee; }
        .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .btn-main{padding:12px 25px;background:var(--main);color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer;}
        #toast{position:fixed;bottom:25px;right:25px;background:var(--tx);color:#fff;padding:12px 25px;border-radius:10px;display:none;z-index:999;}
        #toast.show{display:block;}
      `}</style>

      {/* --- LOGIN --- */}
      <div className={`page ${currentPage === 'pg-login' ? 'active' : ''}`}>
        <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{background:'#fff', padding:40, borderRadius:25, width:400, boxShadow:'0 20px 50px rgba(0,0,0,0.05)'}}>
            <h2 style={{textAlign:'center', color: 'var(--main)'}}>LearnSpark 🌟</h2>
            <p style={{textAlign:'center', color:'var(--txl)', fontSize:'.9rem', marginBottom:25}}>Join the adventure of learning!</p>
            <div style={{display:'flex', gap:10, marginBottom:20, background:'#F5F5F5', padding:5, borderRadius:12}}>
               <button className={`nav-item ${role==='kid'?'on':''}`} style={{flex:1, justifyContent:'center'}} onClick={()=>setRole('kid')}>Kid</button>
               <button className={`nav-item ${role==='parent'?'on':''}`} style={{flex:1, justifyContent:'center'}} onClick={()=>setRole('parent')}>Parent</button>
            </div>
            <input type="email" id="l-email" placeholder="Email Address" style={{width:'100%', padding:12, marginBottom:15, borderRadius:10, border:'1px solid #ddd'}} />
            <button className="btn-main" style={{width:'100%'}} onClick={handleLogin}>Start Learning ✨</button>
          </div>
        </div>
      </div>

      {/* --- KID DASHBOARD --- */}
      <div className={`page ${currentPage === 'pg-kid' ? 'active' : ''}`}>
        <aside className="sidebar">
          <div style={{fontSize:'1.5rem', fontWeight:800, color: 'var(--main)', marginBottom:30}}>LearnSpark</div>
          <div className="nav-item on">🏠 Dashboard</div>
          <div className="nav-item">📚 My Courses</div>
          <div className="nav-item" style={{marginTop:'auto'}} onClick={()=>setCurrentPage('pg-login')}>Logout</div>
        </aside>
        <main className="main">
          <h1>Welcome, {user?.name}! 👋</h1>
          <div className="g3" style={{marginTop:25}}>
            {courses.map(c => (
              <div key={c.id} className="ccard" onClick={() => openCourse(c.id)}>
                <div className="cthumb" style={{background:c.bg}}>{c.emoji}</div>
                <div style={{padding:15}}>
                  <div style={{fontWeight:700}}>{c.title}</div>
                  <div style={{fontSize:'.8rem', color:'var(--txl)'}}>{c.teacher}</div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* --- VIDEO PLAYER PAGE --- */}
      {currentPage === 'pg-detail' && selectedCourse && (
        <div className="page active">
          <aside className="sidebar">
            <div className="nav-item" onClick={() => setCurrentPage('pg-kid')}>← Back to Dash</div>
            <div style={{margin:'20px 0', fontSize:'.7rem', fontWeight:800, color:'var(--txl)'}}>SUBJECT CHAPTERS</div>
            {['Introduction', 'Chapter 1: Basics', 'Chapter 2: Deep Dive'].map((ch, i) => (
              <div key={i} className={`nav-item ${activeChapter === ch ? 'on' : ''}`} onClick={() => { setActiveChapter(ch); showToast(`Loading ${ch}...`); }}>
                {activeChapter === ch ? '▶' : '📄'} {ch}
              </div>
            ))}
          </aside>
          <main className="main">
            {activeChapter ? (
              <div className="a1">
                <h2>{activeChapter}</h2>
                <div className="video-box">
                  <iframe src={selectedCourse.videoUrl} title="Lecture" allowFullScreen></iframe>
                </div>
                <div className="lecture-notes">
                  <h3>Notes & Resources</h3>
                  <p>In this lesson of <b>{selectedCourse.title}</b>, we study the primary principles. Watch carefully and complete the tasks mentioned by {selectedCourse.teacher} to earn your subject badge!</p>
                </div>
              </div>
            ) : (
              <div className="lecture-notes a1">
                <span style={{fontSize: '4rem'}}>{selectedCourse.emoji}</span>
                <h1>{selectedCourse.title}</h1>
                <p style={{color:'var(--txl)', lineHeight:'1.6'}}>{selectedCourse.desc}</p>
                <div style={{marginTop:20, padding:15, background:'#F9F9F9', borderRadius:12}}>
                  <b>Teacher:</b> {selectedCourse.teacher} <br/>
                  <b>Lessons:</b> {selectedCourse.lessons} Chapters
                </div>
                <button className="btn-main" style={{marginTop:25}} onClick={() => setActiveChapter('Introduction')}>Start First Lesson ▶</button>
              </div>
            )}
          </main>
        </div>
      )}

      <div id="toast" className={toast.show ? 'show' : ''}>{toast.msg}</div>
    </>
  );
};

export default App;