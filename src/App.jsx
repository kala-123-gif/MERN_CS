import { useState, useEffect, useCallback } from "react";

// ─── CSS ───────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Lilita+One&display=swap');
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
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Poppins',sans-serif;background:var(--cream);color:var(--tx);min-height:100vh;overflow-x:hidden;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes pop{0%{transform:scale(.88);opacity:0}65%{transform:scale(1.03)}100%{transform:scale(1);opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes spin{to{transform:rotate(360deg)}}
.a1{animation:fadeUp .4s .05s both}.a2{animation:fadeUp .4s .12s both}
.a3{animation:fadeUp .4s .20s both}.a4{animation:fadeUp .4s .28s both}

/* AUTH */
.auth-bg{min-height:100vh;display:flex;align-items:center;justify-content:center;
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
  display:flex;align-items:center;justify-content:center;font-size:19px;
  box-shadow:0 4px 12px rgba(230,168,0,.38);animation:float 3.5s ease-in-out infinite;}
.bname{font-family:'Lilita One',sans-serif;font-size:1.5rem;color:var(--tx);}
.bname span{color:var(--ad);}
.auth-title{font-family:'Lilita One',sans-serif;font-size:1.55rem;color:var(--tx);text-align:center;margin-bottom:4px;}
.auth-sub{color:var(--txl);text-align:center;font-size:.86rem;margin-bottom:22px;}
.role-row{display:flex;gap:6px;background:var(--ap);border-radius:11px;padding:4px;margin-bottom:20px;}
.rbtn{flex:1;border:none;border-radius:8px;padding:8px 4px;font-family:'Poppins',sans-serif;
  font-size:.78rem;font-weight:600;cursor:pointer;transition:all .2s;background:transparent;color:var(--txm);}
.rbtn.on{background:var(--wh);color:var(--br);box-shadow:var(--s1);}
.fg{margin-bottom:13px;}
.fg label{display:block;font-size:.8rem;font-weight:600;color:var(--tx);margin-bottom:5px;}
.fg input{width:100%;padding:10px 13px;border:1.5px solid var(--bd);border-radius:var(--rs);
  font-family:'Poppins',sans-serif;font-size:.88rem;outline:none;
  background:var(--ap);color:var(--tx);transition:all .2s;}
.fg input:focus{border-color:var(--ad);background:var(--wh);box-shadow:0 0 0 3px rgba(230,168,0,.13);}
.btn-main{width:100%;padding:12px;border:none;border-radius:var(--rs);cursor:pointer;
  background:linear-gradient(135deg,var(--amber),var(--ad));color:var(--br);
  font-family:'Poppins',sans-serif;font-size:.92rem;font-weight:700;
  box-shadow:0 4px 16px rgba(230,168,0,.38);transition:all .2s;margin-top:4px;}
.btn-main:hover{transform:translateY(-2px);box-shadow:0 6px 22px rgba(230,168,0,.48);}
.btn-main:disabled{opacity:.7;cursor:not-allowed;transform:none;}
.err{background:#FEE2E2;color:#B91C1C;border-radius:9px;padding:9px 12px;font-size:.8rem;font-weight:600;margin-bottom:11px;}
.suc{background:#DCFCE7;color:#166534;border-radius:9px;padding:9px 12px;font-size:.8rem;font-weight:600;margin-bottom:11px;}
.auth-foot{text-align:center;margin-top:16px;color:var(--txl);font-size:.83rem;}
.auth-foot a{color:var(--ad);font-weight:700;cursor:pointer;}
.spinner{width:15px;height:15px;border:2.5px solid rgba(100,60,0,.3);border-top-color:var(--br);
  border-radius:50%;animation:spin .7s linear infinite;display:inline-block;vertical-align:middle;margin-right:6px;}

/* DASH LAYOUT */
.sidebar{width:215px;height:100vh;position:fixed;top:0;left:0;background:var(--wh);
  border-right:1.5px solid var(--bdl);display:flex;flex-direction:column;padding:22px 13px;
  z-index:100;box-shadow:2px 0 14px rgba(180,140,0,.07);}
.sb-brand{display:flex;align-items:center;gap:8px;padding:0 5px;margin-bottom:20px;}
.sb-bmark{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,var(--amber),var(--ad));
  display:flex;align-items:center;justify-content:center;font-size:16px;}
.sb-bname{font-family:'Lilita One',sans-serif;font-size:1.18rem;color:var(--tx);}
.sb-bname span{color:var(--ad);}
.sb-user{background:linear-gradient(135deg,var(--ap),#FFF3C0);border-radius:12px;padding:11px;
  display:flex;align-items:center;gap:9px;margin-bottom:20px;border:1.5px solid var(--bd);}
.av{border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-weight:700;color:var(--wh);flex-shrink:0;border:2px solid var(--wh);}
.sb-uname{font-weight:700;font-size:.82rem;color:var(--tx);}
.sb-urole{font-size:.67rem;font-weight:600;color:var(--ad);background:rgba(230,168,0,.14);
  border-radius:20px;padding:1px 7px;display:inline-block;margin-top:2px;}
.sb-lbl{font-size:.65rem;font-weight:700;color:var(--txl);letter-spacing:.09em;
  text-transform:uppercase;padding:0 9px;margin:6px 0 5px;}
.nav-item{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:var(--rs);
  cursor:pointer;transition:all .2s;color:var(--txm);font-weight:600;font-size:.83rem;margin-bottom:2px;}
.nav-item:hover{background:var(--ap);color:var(--br);}
.nav-item.on{background:linear-gradient(135deg,var(--al),var(--ap));color:var(--br);box-shadow:var(--s1);}
.nav-item .ni{font-size:1rem;width:20px;text-align:center;}
.nav-item .nb{margin-left:auto;background:var(--coral);color:var(--wh);border-radius:20px;
  padding:1px 6px;font-size:.65rem;font-weight:700;}
.sb-bottom{margin-top:auto;}
.logout-btn{width:100%;display:flex;align-items:center;gap:8px;padding:9px 11px;border:none;
  background:none;cursor:pointer;color:var(--txm);font-family:'Poppins',sans-serif;
  font-weight:600;font-size:.83rem;border-radius:var(--rs);transition:all .2s;}
.logout-btn:hover{background:#FEE2E2;color:#B91C1C;}
.main{margin-left:215px;flex:1;min-height:100vh;padding:24px 28px;background:var(--cream);}

/* TOPBAR */
.topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;}
.topbar h1{font-family:'Lilita One',sans-serif;font-size:1.65rem;color:var(--tx);}
.topbar h1 span{color:var(--ad);}
.tbr{display:flex;align-items:center;gap:11px;}
.searchbar{display:flex;align-items:center;gap:7px;background:var(--wh);border:1.5px solid var(--bd);
  border-radius:40px;padding:8px 15px;min-width:190px;}
.searchbar input{border:none;outline:none;font-family:'Poppins',sans-serif;font-size:.83rem;
  background:transparent;color:var(--tx);width:100%;}
.iBtn{width:36px;height:36px;border-radius:50%;background:var(--wh);border:1.5px solid var(--bd);
  display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:.95rem;
  transition:all .2s;position:relative;}
.iBtn:hover{background:var(--ap);border-color:var(--ad);}
.ndot{position:absolute;top:5px;right:6px;width:7px;height:7px;background:var(--coral);
  border-radius:50%;border:1.5px solid var(--wh);}

/* GRID */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.mb{margin-bottom:18px;}

/* CARDS */
.card{background:var(--card);border-radius:var(--r);padding:18px;box-shadow:var(--s1);
  border:1.5px solid var(--bdl);transition:all .22s;}
.card:hover{box-shadow:var(--s2);}
.ctitle{font-weight:700;font-size:.88rem;color:var(--tx);margin-bottom:13px;
  display:flex;align-items:center;gap:7px;}
.see-more{color:var(--ad);font-size:.75rem;font-weight:600;cursor:pointer;margin-left:auto;}
.see-more:hover{color:var(--adk);}

/* STAT */
.sc{border-radius:var(--r);padding:18px 20px;display:flex;flex-direction:column;gap:5px;
  position:relative;overflow:hidden;transition:all .22s;}
.sc::after{content:'';position:absolute;top:-15px;right:-15px;width:65px;height:65px;
  border-radius:50%;background:rgba(255,255,255,.15);}
.sc:hover{transform:translateY(-3px);box-shadow:var(--s3);}
.s-a{background:linear-gradient(135deg,#D68000,#F5C842);}
.s-c{background:linear-gradient(135deg,#BF360C,#FF7043);}
.s-g{background:linear-gradient(135deg,#1B5E20,#66BB6A);}
.s-b{background:linear-gradient(135deg,#0D47A1,#42A5F5);}
.s-icon{font-size:1.5rem;}.s-val{font-family:'Lilita One',sans-serif;font-size:1.75rem;color:#fff;line-height:1.1;}
.s-lbl{font-size:.75rem;font-weight:600;color:rgba(255,255,255,.82);}

/* PROGRESS */
.pb-wrap{margin:8px 0;}
.pb-row{display:flex;justify-content:space-between;font-size:.75rem;font-weight:600;color:var(--txm);margin-bottom:4px;}
.pb{height:8px;background:var(--al);border-radius:20px;overflow:hidden;}
.pf{height:100%;border-radius:20px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
.pf-a{background:linear-gradient(90deg,var(--ad),var(--amber));}
.pf-c{background:linear-gradient(90deg,#BF360C,#FF7043);}
.pf-g{background:linear-gradient(90deg,#1B5E20,#66BB6A);}
.pf-b{background:linear-gradient(90deg,#0D47A1,#42A5F5);}

/* DONUT */
.dcard{background:linear-gradient(160deg,#4A3400,#7A5C1E);border-radius:var(--r);padding:16px;
  display:flex;flex-direction:column;align-items:center;gap:5px;transition:all .22s;cursor:default;}
.dcard:hover{transform:translateY(-3px);box-shadow:var(--s3);}
.d-title{font-size:.75rem;font-weight:600;color:rgba(255,255,255,.72);text-align:center;}
.d-val{font-family:'Lilita One',sans-serif;font-size:1rem;color:#fff;}
svg.donut{transform:rotate(-90deg);}
.dc-bg{fill:none;stroke:rgba(255,255,255,.13);stroke-width:9;}
.dc{fill:none;stroke-width:9;stroke-linecap:round;transition:stroke-dashoffset 1.3s cubic-bezier(.4,0,.2,1);}

/* LIST ROWS */
.trow{display:flex;align-items:center;gap:9px;padding:8px 9px;border-radius:var(--rs);cursor:pointer;transition:all .2s;}
.trow:hover{background:var(--ap);}
.tav{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;}
.t-name{font-weight:700;font-size:.8rem;color:var(--tx);}
.t-sub{font-size:.7rem;color:var(--txl);}
.t-msgbtn{margin-left:auto;width:26px;height:26px;border-radius:50%;background:var(--al);border:none;cursor:pointer;font-size:.75rem;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.t-msgbtn:hover{background:var(--amber);transform:scale(1.15);}
.srow{display:flex;align-items:center;gap:10px;padding:8px 9px;border-radius:var(--rs);cursor:pointer;transition:all .2s;}
.srow:hover{background:var(--ap);}
.sdot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
.stime{font-size:.72rem;font-weight:700;color:var(--txl);width:52px;}
.stitle{font-weight:700;font-size:.82rem;color:var(--tx);}
.ssub{font-size:.72rem;color:var(--txl);}

/* CALENDAR */
.cal-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px;}
.cal-month{font-weight:700;font-size:.85rem;color:var(--tx);}
.cnav{width:24px;height:24px;border-radius:50%;border:1.5px solid var(--bd);background:var(--wh);
  cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.75rem;transition:all .2s;}
.cnav:hover{background:var(--al);border-color:var(--ad);}
.cgrid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;}
.cday-name{font-size:.62rem;font-weight:700;color:var(--txl);padding:3px 0;}
.cday{font-size:.72rem;font-weight:600;color:var(--txm);padding:5px 2px;border-radius:6px;cursor:pointer;transition:all .15s;position:relative;}
.cday:hover{background:var(--al);color:var(--br);}
.cday.today{background:linear-gradient(135deg,var(--amber),var(--ad));color:#fff;font-weight:700;}
.cday.has-ev::after{content:'';position:absolute;bottom:1px;left:50%;transform:translateX(-50%);width:4px;height:4px;background:var(--coral);border-radius:50%;}

/* EVENT ROWS */
.evrow{display:flex;align-items:flex-start;gap:10px;padding:9px 10px;border-radius:var(--rs);
  cursor:pointer;transition:all .2s;margin-bottom:6px;border:1.5px solid var(--bdl);}
.evrow:hover{background:var(--ap);border-color:var(--bd);}
.evdate{font-family:'Lilita One',sans-serif;font-size:1.4rem;color:var(--ad);min-width:26px;line-height:1.1;}
.ev-title{font-weight:700;font-size:.8rem;color:var(--tx);}
.ev-time{font-size:.7rem;color:var(--txl);}

/* COURSE CARDS */
.ccard{background:var(--card);border-radius:var(--r);overflow:hidden;border:1.5px solid var(--bdl);
  box-shadow:var(--s1);transition:all .22s;cursor:pointer;}
.ccard:hover{transform:translateY(-4px);box-shadow:var(--s3);}
.cthumb{height:105px;display:flex;align-items:center;justify-content:center;font-size:2.8rem;position:relative;}
.cdiff{position:absolute;top:8px;right:8px;font-size:.65rem;font-weight:700;padding:2px 8px;border-radius:20px;color:#fff;}
.cbody{padding:13px;}
.ctname{font-weight:700;font-size:.85rem;color:var(--tx);margin-bottom:4px;}
.cmeta{display:flex;gap:8px;font-size:.7rem;color:var(--txl);font-weight:600;margin-bottom:8px;}
.cprow{display:flex;justify-content:space-between;font-size:.7rem;font-weight:600;color:var(--txm);margin-bottom:3px;}
.start-btn{width:100%;padding:7px;background:linear-gradient(135deg,var(--amber),var(--ad));border:none;
  border-radius:8px;color:var(--br);font-family:'Poppins',sans-serif;font-weight:700;
  cursor:pointer;font-size:.78rem;transition:all .2s;}
.start-btn:hover{transform:scale(1.02);box-shadow:0 3px 10px rgba(230,168,0,.35);}

/* BADGES */
.badge-grid{display:flex;gap:8px;flex-wrap:wrap;}
.badge-item{display:flex;flex-direction:column;align-items:center;gap:3px;background:var(--ap);
  border-radius:11px;padding:9px 12px;border:1.5px solid var(--bd);transition:all .2s;cursor:pointer;}
.badge-item:hover{border-color:var(--ad);transform:scale(1.06);}
.badge-item.earned{border-color:var(--amber);background:#FFFBEB;}
.badge-item.locked{opacity:.4;filter:grayscale(1);}
.badge-icon{font-size:1.5rem;}.badge-name{font-size:.67rem;font-weight:700;color:var(--txm);text-align:center;}
.badge-item.earned .badge-name{color:var(--br);}

/* TABLE */
.dtable{width:100%;border-collapse:collapse;}
.dtable th{text-align:left;font-size:.72rem;font-weight:700;color:var(--txl);text-transform:uppercase;
  letter-spacing:.07em;padding:9px 12px;border-bottom:2px solid var(--bd);}
.dtable td{padding:11px 12px;border-bottom:1px solid var(--ap);font-size:.82rem;color:var(--tx);font-weight:500;cursor:pointer;}
.dtable tr:hover td{background:var(--ap);}
.stag{padding:2px 9px;border-radius:20px;font-size:.7rem;font-weight:700;}
.stag.active{background:#DCFCE7;color:#166534;}
.stag.done{background:#EDE9FE;color:#5B21B6;}

/* TABS */
.tabs{display:flex;gap:7px;margin-bottom:20px;}
.tabBtn{padding:7px 18px;border-radius:40px;border:1.5px solid var(--bd);background:var(--wh);
  color:var(--txm);font-family:'Poppins',sans-serif;font-weight:600;font-size:.8rem;cursor:pointer;transition:all .2s;}
.tabBtn.on{background:var(--ad);color:#fff;border-color:var(--ad);}
.tabBtn:hover:not(.on){border-color:var(--ad);color:var(--br);}

/* MASCOT BANNER */
.mbanner{background:linear-gradient(135deg,#7A5C1E 0%,#C8A84B 60%,#F5C842 100%);
  border-radius:var(--r);padding:22px 26px;color:#fff;display:flex;align-items:center;
  justify-content:space-between;margin-bottom:20px;position:relative;overflow:hidden;}
.mbanner::after{content:'';position:absolute;top:-30px;right:-30px;width:160px;height:160px;
  background:rgba(255,255,255,.07);border-radius:50%;}
.mbanner h2{font-family:'Lilita One',sans-serif;font-size:1.5rem;margin-bottom:5px;}
.mbanner p{font-size:.83rem;opacity:.85;line-height:1.6;}
.mascot-emoji{font-size:3.8rem;animation:float 3s ease-in-out infinite;position:relative;z-index:1;}
.bbtns{display:flex;gap:9px;margin-top:13px;flex-wrap:wrap;}
.bbtn{padding:7px 16px;border-radius:40px;border:1.5px solid rgba(255,255,255,.4);
  background:rgba(255,255,255,.15);color:#fff;font-family:'Poppins',sans-serif;
  font-weight:600;font-size:.78rem;cursor:pointer;transition:all .2s;}
.bbtn:hover{background:rgba(255,255,255,.28);border-color:rgba(255,255,255,.7);}

/* TAGS */
.tag{display:inline-flex;align-items:center;gap:3px;padding:2px 9px;border-radius:20px;font-size:.7rem;font-weight:700;}
.t-a{background:var(--al);color:var(--br);}
.t-c{background:#FBE9E7;color:#BF360C;}
.t-g{background:#DCFCE7;color:#166534;}
.t-b{background:#DBEAFE;color:#1D4ED8;}

/* TOAST */
.toast{position:fixed;bottom:24px;right:24px;z-index:9999;background:var(--br);color:#fff;
  padding:12px 20px;border-radius:12px;font-weight:600;font-size:.87rem;box-shadow:var(--s3);animation:fadeUp .35s ease;}

/* MODAL */
.moverlay{position:fixed;inset:0;background:rgba(44,26,0,.45);z-index:200;
  display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px);animation:fadeUp .3s ease;}
.modal{background:var(--wh);border-radius:var(--r);padding:28px;max-width:400px;width:90%;box-shadow:var(--s3);}
.modal h3{font-family:'Lilita One',sans-serif;font-size:1.15rem;color:var(--tx);margin-bottom:8px;}
.modal p{font-size:.83rem;color:var(--txm);line-height:1.7;margin-bottom:18px;white-space:pre-line;}
.mbtns{display:flex;gap:10px;justify-content:flex-end;}
.mbtn{padding:8px 18px;border-radius:var(--rs);border:none;cursor:pointer;font-family:'Poppins',sans-serif;font-weight:700;font-size:.83rem;transition:all .2s;}
.mbtn-c{background:var(--ap);color:var(--txm);}.mbtn-c:hover{background:var(--al);}
.mbtn-ok{background:linear-gradient(135deg,var(--amber),var(--ad));color:var(--br);box-shadow:0 3px 10px rgba(230,168,0,.3);}
.mbtn-ok:hover{transform:translateY(-1px);}

@media(max-width:900px){.sidebar{width:190px;}.main{margin-left:190px;padding:18px;}.g4{grid-template-columns:1fr 1fr;}}
@media(max-width:650px){.sidebar{display:none;}.main{margin-left:0;padding:14px;}.g2,.g3,.g4{grid-template-columns:1fr;}}
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const COURSES_DATA = [
  {id:1,title:'Math for Kids',emoji:'🧮',bg:'#FFF3D6',diff:'Beginner',lessons:12,dur:'4 weeks',progress:75,teacher:'Ms. Priya Sharma',desc:'Master numbers, fractions, and problem-solving through fun activities!'},
  {id:2,title:'Science Explorer',emoji:'🔬',bg:'#E8F5E9',diff:'Intermediate',lessons:10,dur:'3 weeks',progress:60,teacher:'Mr. Arjun Rao',desc:'Explore plants, animals, space, and experiments!'},
  {id:3,title:'English Writing',emoji:'✍️',bg:'#FCE4EC',diff:'Beginner',lessons:8,dur:'2 weeks',progress:90,teacher:'Ms. Kavya Nair',desc:'Build storytelling, grammar, and creative writing skills!'},
  {id:4,title:'Art & Creativity',emoji:'🎨',bg:'#FFF8E1',diff:'Beginner',lessons:6,dur:'2 weeks',progress:45,teacher:'Mr. Rohan Das',desc:'Unleash your creativity with painting, drawing, and crafts!'},
  {id:5,title:'Coding for Kids',emoji:'💻',bg:'#E3F2FD',diff:'Intermediate',lessons:15,dur:'6 weeks',progress:0,teacher:'Ms. Ananya Iyer',desc:'Learn programming basics and build your first app!'},
  {id:6,title:'Music Basics',emoji:'🎵',bg:'#F3E5F5',diff:'Beginner',lessons:8,dur:'3 weeks',progress:0,teacher:'Mr. Vikram Joshi',desc:'Learn rhythm, notes, and play simple melodies!'},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function cap(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

// ─── SUBCOMPONENTS ───────────────────────────────────────────────────────────

function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="toast">{msg}</div>;
}

function Modal({ title, body, okTxt, okFn, onClose }) {
  return (
    <div className="moverlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="mbtns">
          <button className="mbtn mbtn-c" onClick={onClose}>Close</button>
          <button className="mbtn mbtn-ok" onClick={okFn || onClose}>{okTxt || 'Got it!'}</button>
        </div>
      </div>
    </div>
  );
}

function Calendar({ showToast }) {
  const now = new Date();
  const yr = now.getFullYear(), mo = now.getMonth(), td = now.getDate();
  const fd = new Date(yr, mo, 1).getDay();
  const dim = new Date(yr, mo + 1, 0).getDate();
  const mns = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const evDays = [5,10,14,18,19,20,25];
  const days = [];
  for (let i = 0; i < fd; i++) days.push(<div key={`e${i}`} style={{padding:'5px 2px'}}></div>);
  for (let d = 1; d <= dim; d++) {
    const cls = ['cday', d === td ? 'today' : '', evDays.includes(d) ? 'has-ev' : ''].join(' ').trim();
    days.push(
      <div key={d} className={cls}
        onClick={() => showToast(`📅 ${mns[mo]} ${d} — ${evDays.includes(d) ? 'Class scheduled!' : 'No class today.'}`)}>
        {d}
      </div>
    );
  }
  return (
    <div>
      <div className="cal-hdr">
        <button className="cnav" onClick={() => showToast('📅 Previous month')}>‹</button>
        <span className="cal-month">{mns[mo]} {yr}</span>
        <button className="cnav" onClick={() => showToast('📅 Next month')}>›</button>
      </div>
      <div className="cgrid">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="cday-name">{d}</div>)}
        {days}
      </div>
    </div>
  );
}

function CourseCard({ course, onOpen, onEnroll }) {
  const diffColor = course.diff === 'Beginner' ? '#2E7D32' : course.diff === 'Intermediate' ? '#7B1FA2' : '#B71C1C';
  return (
    <div className="ccard" onClick={() => onOpen(course._id)}>
      <div className="cthumb" style={{ background: course.bg }}>
        <span>{course.emoji}</span>
        <span className="cdiff" style={{ background: diffColor }}>{course.diff}</span>
      </div>
      <div className="cbody">
        <div className="ctname">{course.title}</div>
        <div className="cmeta"><span>📖 {course.lessons} lessons</span><span>⏱️ {course.dur}</span></div>
        <div className="cmeta"><span>👩‍🏫 {course.teacher}</span></div>
        {course.progress > 0 ? (
          <>
            <div className="cprow"><span>Progress</span><span>{course.progress}%</span></div>
            <div className="pb"><div className="pf pf-a" style={{ width: `${course.progress}%` }}></div></div>
          </>
        ) : (
          <button className="start-btn" onClick={e => { e.stopPropagation(); onEnroll(course._id); }}>🚀 Start Course</button>
        )}
      </div>
    </div>
  );
}

// ─── COURSE DETAIL PAGE ──────────────────────────────────────────────────────
function CourseDetail({ courseId, courses, onBack, showToast, showModal }) {
  const [activeChapter, setActiveChapter] = useState(0);
  const c = courses.find(x => x._id === courseId);
  if (!c) return null;
  const chs = ['Introduction','Chapter 1: Basics','Chapter 2: Practice','Chapter 3: Advanced','📝 Quiz','Final Review'];
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="sidebar">
        <div className="sb-brand"><div className="sb-bmark">🌟</div><div className="sb-bname">Learn<span>Spark</span></div></div>
        <div className="nav-item" onClick={onBack} style={{ marginBottom: '10px' }}><span className="ni">←</span>Back</div>
        <div className="sb-lbl">Chapters</div>
        {chs.map((ch, i) => (
          <div key={i} className={`nav-item${activeChapter === i ? ' on' : ''}`} style={{ fontSize: '.78rem' }}
            onClick={() => { setActiveChapter(i); showToast(`📖 ${ch}`); }}>
            <span className="ni">{i === 4 ? '📝' : '📄'}</span>{ch}
            {i < Math.floor(c.progress / 20) && <span style={{ marginLeft: 'auto', color: '#66BB6A', fontSize: '.75rem' }}>✓</span>}
          </div>
        ))}
        <div className="sb-bottom"><button className="logout-btn" onClick={() => showModal('🚪 Log Out','Are you sure you want to log out?','Yes, Log Out', onBack)}>🚪 Log Out</button></div>
      </aside>
      <main className="main">
        <div className="topbar a1">
          <h1>{c.emoji} <span>{c.title}</span></h1>
          <div className="tbr"><div className="iBtn" onClick={onBack} title="Close">✕</div></div>
        </div>
        <div className="card a2 mb">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '18px', flexWrap: 'wrap' }}>
            <div style={{ width: '82px', height: '82px', borderRadius: '16px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', flexShrink: 0 }}>{c.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Lilita One',sans-serif", fontSize: '1.35rem', color: 'var(--tx)', marginBottom: '7px' }}>{c.title}</div>
              <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <span className="tag t-a">📖 {c.lessons} Lessons</span>
                <span className="tag t-g">⏱️ {c.dur}</span>
                <span className="tag t-b">👩‍🏫 {c.teacher}</span>
              </div>
              <p style={{ fontSize: '.82rem', color: 'var(--txm)', lineHeight: '1.65', marginBottom: '12px' }}>{c.desc}</p>
              {c.progress > 0 && (
                <div className="pb-wrap" style={{ maxWidth: '260px' }}>
                  <div className="pb-row"><span>Your Progress</span><span>{c.progress}%</span></div>
                  <div className="pb"><div className="pf pf-a" style={{ width: `${c.progress}%` }}></div></div>
                </div>
              )}
            </div>
            <button style={{ padding: '10px 22px', background: 'linear-gradient(135deg,var(--amber),var(--ad))', border: 'none', borderRadius: 'var(--rs)', color: 'var(--br)', fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '.85rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(230,168,0,.35)', whiteSpace: 'nowrap' }}
              onClick={() => showToast(`${c.progress > 0 ? '▶ Resuming' : '🚀 Starting'} ${c.title}!`)}>
              {c.progress > 0 ? '▶ Continue' : '🚀 Start Course'}
            </button>
          </div>
        </div>
        <div className="g2 a3">
          <div className="card">
            <div className="ctitle">📋 What You'll Learn</div>
            {[['Core concepts & fundamentals','var(--ad)'],['Hands-on exercises & quizzes','var(--green)'],['Real-world applications','var(--coral)'],['Final project & certification','var(--blue)']].map(([t,c],i) => (
              <div key={i} className="srow" onClick={() => showToast(`📖 ${t}`)}>
                <div className="sdot" style={{ background: c }}></div>
                <div><div className="stitle">{t}</div></div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="ctitle">🏆 Rewards You'll Earn</div>
            <div className="badge-grid">
              <div className="badge-item earned" onClick={() => showModal(`${c.emoji} ${c.title.split(' ')[0]} Badge`, 'Complete all lessons to earn this badge!')}><div className="badge-icon">{c.emoji}</div><div className="badge-name">{c.title.split(' ')[0]}</div></div>
              <div className="badge-item earned" onClick={() => showModal('⭐ XP Points','Earn +500 XP upon course completion!')}><div className="badge-icon">⭐</div><div className="badge-name">+500 XP</div></div>
              <div className={`badge-item ${c.progress === 100 ? 'earned' : 'locked'}`} onClick={() => showModal('🏆 Champion Badge','Complete this course to unlock the Champion badge!')}><div className="badge-icon">🏆</div><div className="badge-name">Champion</div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ─── KID DASHBOARD ───────────────────────────────────────────────────────────
function KidDashboard({ user, onLogout, showToast, showModal }) {
  const [tab, setTab] = useState('dashboard');
  const [courseFilter, setCourseFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState([]);
  const [detailId, setDetailId] = useState(null);
  const name = cap(user?.name || 'Friend');

  const filteredCourses = courses.filter(c => {
    const ms = !search || c.title.toLowerCase().includes(search.toLowerCase());
    const mt = courseFilter === 'all' || (courseFilter === 'progress' && c.progress > 0 && c.progress < 100) || (courseFilter === 'done' && c.progress === 100) || (courseFilter === 'new' && c.progress === 0);
    return ms && mt;
  });

  useEffect(() => {
    const token = localStorage.getItem('ls_token');

    fetch('http://localhost:5000/api/courses', {
      headers: {
        'x-auth-token': token
      }
    })
      .then(res => res.json())
      .then(async (coursesData) => {
        const progressRes = await fetch('http://localhost:5000/api/progress/me', {
          headers: {
            'x-auth-token': token
          }
        });

        const progress = await progressRes.json();

        const merged = coursesData.map(course => {
          const p = progress.find(
            x => x.course._id === course._id
          );

          return {
            ...course,
            progress: p ? p.progress : 0
          };
        });

        setCourses(merged);
      })
      .catch(err => console.log(err));
  }, []);

  const openCourse = (id) => setDetailId(id);
  const enrollCourse = async (id) => {
    const token = localStorage.getItem('ls_token');

    await fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
      method: 'POST',
      headers: {
        'x-auth-token': token
      }
    });

    setCourses(prev =>
      prev.map(c => c._id === id ? { ...c, progress: 5 } : c)
    );
  };

  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('ls_token');

    fetch('http://localhost:5000/api/progress/me', {
      headers: {
        'x-auth-token': token
      }
    })
      .then(res => res.json())
      .then(data => setProgressData(data))
      .catch(err => console.log(err));
  }, []);
  if (detailId) return <CourseDetail courseId={detailId} courses={courses} onBack={() => setDetailId(null)} showToast={showToast} showModal={showModal} />;

  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'classes', icon: '📚', label: 'My Classes', badge: 4 },
    { id: 'grades', icon: '📊', label: 'My Grades' },
    { id: 'schedule', icon: '📅', label: 'Schedule' },
    { id: 'badges', icon: '🏆', label: 'Badges' },
    { id: 'messages', icon: '💬', label: 'Messages', badge: 2 },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="sidebar">
        <div className="sb-brand"><div className="sb-bmark">🌟</div><div className="sb-bname">Learn<span>Spark</span></div></div>
        <div className="sb-user">
          <div className="av" style={{ width: '38px', height: '38px', fontSize: '15px', background: 'linear-gradient(135deg,var(--ad),var(--brl))' }}>{name[0]}</div>
          <div><div className="sb-uname">{name}</div><div className="sb-urole">Kid</div></div>
        </div>
        <div className="sb-lbl">Menu</div>
        {navItems.map(n => (
          <div key={n.id} className={`nav-item${tab === n.id ? ' on' : ''}`} onClick={() => setTab(n.id)}>
            <span className="ni">{n.icon}</span>{n.label}
            {n.badge && <span className="nb">{n.badge}</span>}
          </div>
        ))}
        <div className="sb-bottom"><button className="logout-btn" onClick={() => showModal('🚪 Log Out','Are you sure you want to log out?','Yes, Log Out', onLogout)}>🚪 Log Out</button></div>
      </aside>
      <main className="main">

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            <div className="topbar a1">
              <h1>Hello, <span>{name}</span>! 👋</h1>
              <div className="tbr">
                <div className="searchbar"><span>🔍</span><input placeholder="Search courses..." onChange={e => setSearch(e.target.value)} /></div>
                <div className="iBtn" onClick={() => showToast('🔔 2 new notifications!')}><span>🔔</span><div className="ndot"></div></div>
                <div className="iBtn" onClick={() => setTab('messages')}><span>💬</span></div>
                <div className="iBtn" onClick={() => showModal('⚙️ Settings','Profile settings & preferences.\n\nFeature coming soon!')}><span>⚙️</span></div>
              </div>
            </div>
            <div className="mbanner a2">
              <div>
                <h2>Ready to Learn Today? 🚀</h2>
                <p>You're on a <strong>5-day streak</strong>! Keep going, superstar! ⚡</p>
                <div className="bbtns">
                  <button className="bbtn" onClick={() => setTab('classes')}>▶ Continue Learning</button>
                  <button className="bbtn" onClick={() => setTab('badges')}>🏆 View Badges</button>
                  <button className="bbtn" onClick={() => setTab('grades')}>📊 My Grades</button>
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
                <div className="ctitle">👩‍🏫 Linked Teachers <span className="see-more" onClick={() => setTab('messages')}>See more →</span></div>
                {[
                  { init: 'P', name: 'Ms. Priya Sharma', sub: 'Math · Teacher', grad: 'linear-gradient(135deg,#7B1FA2,#CE93D8)', modal: '💬 Ms. Priya Sharma', body: 'Subject: Math for Kids\nMessage: You are doing great in fractions!\nContact: priya.sharma@learnspark.com', toast: '💬 Message sent to Ms. Priya!' },
                  { init: 'A', name: 'Mr. Arjun Rao', sub: 'Science · Teacher', grad: 'linear-gradient(135deg,#1565C0,#64B5F6)', modal: '💬 Mr. Arjun Rao', body: 'Subject: Science Explorer\nMessage: Please submit your project by Friday!\nContact: arjun.rao@learnspark.com', toast: '💬 Message sent to Mr. Arjun!' },
                  { init: 'K', name: 'Ms. Kavya Nair', sub: 'English · Teacher', grad: 'linear-gradient(135deg,#BF360C,#FF8A65)', modal: '💬 Ms. Kavya Nair', body: 'Subject: English Writing\nMessage: Your story this week was excellent!\nContact: kavya.nair@learnspark.com', toast: '💬 Message sent to Ms. Kavya!' },
                ].map(t => (
                  <div key={t.init} className="trow" onClick={() => showModal(t.modal, t.body)}>
                    <div className="tav" style={{ background: t.grad }}>{t.init}</div>
                    <div><div className="t-name">{t.name}</div><div className="t-sub">{t.sub}</div></div>
                    <button className="t-msgbtn" onClick={e => { e.stopPropagation(); showToast(t.toast); }}>💬</button>
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="ctitle">📅 Upcoming Events <span className="see-more" onClick={() => setTab('schedule')}>See more →</span></div>
                {[
                  { d: 18, title: '🧮 Math for Kids', time: '09:00 AM · Ms. Priya', modal: '🧮 Math for Kids', body: 'Date: 18 March · 09:00 AM\nTeacher: Ms. Priya Sharma\nTopic: Chapter 5 – Fractions\nRoom: Online (Zoom)' },
                  { d: 19, title: '🔬 Science Explorer', time: '11:00 AM · Mr. Arjun', modal: '🔬 Science Explorer', body: 'Date: 19 March · 11:00 AM\nTeacher: Mr. Arjun Rao\nTopic: Plants & Photosynthesis\nRoom: Online (Zoom)' },
                  { d: 20, title: '✍️ English Writing', time: '02:00 PM · Ms. Kavya', modal: '✍️ English Writing', body: 'Date: 20 March · 02:00 PM\nTeacher: Ms. Kavya Nair\nTopic: My Adventure Story\nRoom: Online (Zoom)' },
                ].map(ev => (
                  <div key={ev.d} className="evrow" onClick={() => showModal(ev.modal, ev.body)}>
                    <div className="evdate">{ev.d}</div>
                    <div><div className="ev-title">{ev.title}</div><div className="ev-time">{ev.time}</div></div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { title: 'Attendance', pct: 75, stroke: '#F5C842', offset: 41, body: 'Your attendance this month: 75%\nClasses attended: 15/20\nKeep it up! Target: 90%' },
                  { title: 'Homework', pct: 90, stroke: '#66BB6A', offset: 16, body: 'Homework completion: 90%\nSubmitted: 9/10 assignments\nGreat work! Keep it up!' },
                  { title: 'Rating', pct: 75, stroke: '#FF7043', offset: 41, body: 'Overall rating: 75%\nAverage quiz score: 78/100\nTarget: 85% — you are almost there!' },
                ].map(d => (
                  <div key={d.title} className="dcard" onClick={() => showModal(`📊 ${d.title}`, d.body)}>
                    <div className="d-title">{d.title}</div>
                    <svg className="donut" width="68" height="68" viewBox="0 0 68 68">
                      <circle className="dc-bg" cx="34" cy="34" r="26" />
                      <circle className="dc" cx="34" cy="34" r="26" stroke={d.stroke} strokeDasharray="163.4" strokeDashoffset={d.offset} />
                    </svg>
                    <div className="d-val">{d.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="g2 a4">
              <div className="card">
                <div className="ctitle">📈 My Progress</div>
                {[['Math for Kids','75%','pf-a',75],['Science Explorer','60%','pf-b',60],['English Writing','90%','pf-g',90],['Art & Creativity','45%','pf-c',45]].map(([name,pct,cls,w]) => (
                  <div key={name} className="pb-wrap">
                    <div className="pb-row"><span>{name}</span><span>{pct}</span></div>
                    <div className="pb"><div className={`pf ${cls}`} style={{ width: `${w}%` }}></div></div>
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="ctitle">🎨 My Projects <span className="see-more" onClick={() => showToast('📁 Opening all projects...')}>See more →</span></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div onClick={() => showModal('🤖 Robot Design','Subject: Science\nStatus: In Progress\nDue: 22 March 2025\nAssigned by: Mr. Arjun Rao')}
                    style={{ borderRadius: '11px', overflow: 'hidden', cursor: 'pointer', border: '1.5px solid var(--bd)', transition: 'all .2s' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                    <div style={{ height: '68px', background: 'linear-gradient(135deg,#FFE08A,#F5C842)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🤖</div>
                    <div style={{ padding: '6px 9px', fontSize: '.72rem', fontWeight: 700, color: 'var(--tx)' }}>Robot Design</div>
                    <div style={{ padding: '0 9px 7px', fontSize: '.67rem', color: 'var(--txl)' }}>Due: 22 March</div>
                  </div>
                  <div onClick={() => showModal('🌿 Plant Life','Subject: Science\nStatus: Completed ✅\nScore: 88/100\nGraded by: Mr. Arjun Rao')}
                    style={{ borderRadius: '11px', overflow: 'hidden', cursor: 'pointer', border: '1.5px solid var(--bd)', transition: 'all .2s' }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                    <div style={{ height: '68px', background: 'linear-gradient(135deg,#C8E6C9,#66BB6A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🌿</div>
                    <div style={{ padding: '6px 9px', fontSize: '.72rem', fontWeight: 700, color: 'var(--tx)' }}>Plant Life</div>
                    <div style={{ padding: '0 9px 7px', fontSize: '.67rem', color: '#166534', fontWeight: 700 }}>✅ Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CLASSES */}
        {tab === 'classes' && (
          <div>
            <div className="topbar">
              <h1>📚 My <span>Classes</span></h1>
              <div className="tbr"><div className="searchbar"><span>🔍</span><input placeholder="Search..." onChange={e => setSearch(e.target.value)} /></div></div>
            </div>
            <div className="tabs">
              {[['all','All'],['progress','In Progress'],['done','Completed'],['new','New']].map(([v,l]) => (
                <button key={v} className={`tabBtn${courseFilter === v ? ' on' : ''}`} onClick={() => setCourseFilter(v)}>{l}</button>
              ))}
            </div>
            <div className="g3">
              {filteredCourses.length ? filteredCourses.map(c => (
                <CourseCard key={c._id} course={c} onOpen={openCourse} onEnroll={enrollCourse} />
              )) : <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--txl)' }}>No courses found 🔍</div>}
            </div>
          </div>
        )}

        {/* GRADES */}
        {tab === 'grades' && (
          <div>
            <div className="topbar"><h1>📊 My <span>Grades</span></h1></div>
            <div className="card">
              <table className="dtable">
                <thead><tr><th>Course</th><th>Assignments</th><th>Score</th><th>Grade</th><th>Status</th></tr></thead>
                <tbody>
                  {[
                    { emoji: '🧮', name: 'Math for Kids', asgn: '8/10', score: '85/100', grade: 'A', status: 'active', modal: '🧮 Math for Kids', body: 'Score: 85/100  |  Grade: A\nAssignments: 8 of 10 done\nTeacher: Ms. Priya Sharma\nNext quiz: 22 March 2025' },
                    { emoji: '🔬', name: 'Science Explorer', asgn: '6/10', score: '72/100', grade: 'B+', status: 'active', modal: '🔬 Science Explorer', body: 'Score: 72/100  |  Grade: B+\nAssignments: 6 of 10 done\nTeacher: Mr. Arjun Rao\nProject due: 22 March 2025' },
                    { emoji: '✍️', name: 'English Writing', asgn: '10/10', score: '95/100', grade: 'A+', status: 'done', modal: '✍️ English Writing', body: 'Score: 95/100  |  Grade: A+\nAssignments: 10 of 10 done\nTeacher: Ms. Kavya Nair\nStatus: Completed ✅' },
                    { emoji: '🎨', name: 'Art & Creativity', asgn: '5/8', score: '68/100', grade: 'B', status: 'active', modal: '🎨 Art & Creativity', body: 'Score: 68/100  |  Grade: B\nAssignments: 5 of 8 done\nTeacher: Mr. Rohan Das\nNext class: Thursday 4PM' },
                  ].map(r => (
                    <tr key={r.name} onClick={() => showModal(r.modal, r.body)}>
                      <td>{r.emoji} {r.name}</td><td>{r.asgn}</td><td>{r.score}</td>
                      <td><strong>{r.grade}</strong></td>
                      <td><span className={`stag ${r.status}`}>{r.status === 'active' ? 'In Progress' : 'Completed'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SCHEDULE */}
        {tab === 'schedule' && (
          <div>
            <div className="topbar"><h1>📅 My <span>Schedule</span></h1></div>
            <div className="g2">
              <div className="card">
                <div className="ctitle">📆 This Week</div>
                {[
                  { color: '#F5C842', time: 'Mon 9AM', title: 'Math for Kids', sub: 'Chapter 5 – Fractions', modal: '🧮 Math for Kids', body: 'Monday · 09:00 AM\nTopic: Chapter 5 – Fractions\nTeacher: Ms. Priya Sharma\nPlatform: Zoom (link in email)' },
                  { color: '#42A5F5', time: 'Tue 11AM', title: 'Science Explorer', sub: 'Plants & Photosynthesis', modal: '🔬 Science Explorer', body: 'Tuesday · 11:00 AM\nTopic: Plants & Photosynthesis\nTeacher: Mr. Arjun Rao\nBring: Notebook & pencil' },
                  { color: '#66BB6A', time: 'Wed 2PM', title: 'English Writing', sub: 'My Adventure Story', modal: '✍️ English Writing', body: 'Wednesday · 02:00 PM\nTopic: My Adventure Story\nTeacher: Ms. Kavya Nair\nTask: Bring your story draft!' },
                  { color: '#FF7043', time: 'Thu 4PM', title: 'Art & Creativity', sub: 'Watercolor Painting', modal: '🎨 Art & Creativity', body: 'Thursday · 04:00 PM\nTopic: Watercolor Painting\nTeacher: Mr. Rohan Das\nBring: Watercolor set & brushes' },
                  { color: '#CE93D8', time: 'Fri 10AM', title: 'Quiz Day 🎉', sub: 'All Subjects', modal: '📝 Quiz Day!', body: 'Friday · 10:00 AM\nAll subjects quiz\nRevise: Ch. 1-5 for Math\nGood luck! 🍀' },
                ].map(s => (
                  <div key={s.time} className="srow" onClick={() => showModal(s.modal, s.body)}>
                    <div className="sdot" style={{ background: s.color }}></div>
                    <div className="stime">{s.time}</div>
                    <div><div className="stitle">{s.title}</div><div className="ssub">{s.sub}</div></div>
                  </div>
                ))}
              </div>
              <div className="card"><div className="ctitle">🗓️ March 2025</div><Calendar showToast={showToast} /></div>
            </div>
          </div>
        )}

        {/* BADGES */}
        {tab === 'badges' && (
          <div>
            <div className="topbar"><h1>🏆 My <span>Badges</span></h1></div>
            <div className="card mb"><div className="ctitle">Progress to Next Badge (12/20)</div><div className="pb"><div className="pf pf-a" style={{ width: '60%' }}></div></div></div>
            <div className="card mb">
              <div className="ctitle">🌟 Earned Badges</div>
              <div className="badge-grid">
                {[
                  { icon: '🌟', name: 'Star Learner', modal: '🌟 Star Learner', body: 'Earned: 10 March 2025\nFor completing 5 lessons in a row!' },
                  { icon: '🔥', name: '5-Day Streak', modal: '🔥 5-Day Streak', body: 'Earned: 12 March 2025\nFor studying 5 days in a row!' },
                  { icon: '📚', name: 'Bookworm', modal: '📚 Bookworm', body: 'Earned: 8 March 2025\nFor reading 10 lessons!' },
                  { icon: '🎯', name: 'Focused', modal: '🎯 Focused', body: 'Earned: 5 March 2025\nFor scoring 90%+ on a quiz!' },
                  { icon: '🧮', name: 'Math Wizard', modal: '🧮 Math Wizard', body: 'Earned: 3 March 2025\nFor scoring A in Math!' },
                  { icon: '🔬', name: 'Scientist', modal: '🔬 Scientist', body: 'Earned: 1 March 2025\nFor completing Science Explorer Ch.1!' },
                  { icon: '✍️', name: 'Author', modal: '✍️ Author', body: 'Earned: 28 Feb 2025\nFor finishing your first story!' },
                  { icon: '🎨', name: 'Artist', modal: '🎨 Artist', body: 'Earned: 25 Feb 2025\nFor completing Art Ch.1!' },
                  { icon: '⚡', name: 'Quick Learner' }, { icon: '🌈', name: 'Explorer' },
                  { icon: '💡', name: 'Smart Cookie' }, { icon: '🤝', name: 'Team Player' },
                ].map(b => (
                  <div key={b.name} className="badge-item earned" onClick={() => b.modal && showModal(b.modal, b.body)}>
                    <div className="badge-icon">{b.icon}</div><div className="badge-name">{b.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="ctitle">🔒 Locked Badges</div>
              <div className="badge-grid">
                {[
                  { icon: '🏆', name: 'Champion', modal: '🏆 Champion', body: 'Complete all 6 courses to unlock!\nProgress: 2/6 courses done' },
                  { icon: '👑', name: 'King/Queen', modal: '👑 King/Queen', body: 'Reach top 3 in leaderboard!\nYour rank: #12' },
                  { icon: '🚀', name: 'Rocket', modal: '🚀 Rocket', body: 'Complete 20 lessons in one week!' },
                  { icon: '💎', name: 'Diamond', modal: '💎 Diamond', body: 'Maintain a 30-day learning streak!\nCurrent streak: 5 days' },
                  { icon: '🌙', name: 'Night Owl' }, { icon: '🎓', name: 'Graduate' },
                  { icon: '🌍', name: 'World Class' }, { icon: '🦋', name: 'Transformer' },
                ].map(b => (
                  <div key={b.name} className="badge-item locked" onClick={() => b.modal && showModal(b.modal, b.body)}>
                    <div className="badge-icon">{b.icon}</div><div className="badge-name">{b.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {tab === 'messages' && (
          <div>
            <div className="topbar"><h1>💬 <span>Messages</span></h1></div>
            <div className="card">
              {[
                { init: 'P', name: 'Ms. Priya Sharma · Math', sub: 'You are doing great in fractions! Keep it up 🌟', time: 'Today', grad: 'linear-gradient(135deg,#7B1FA2,#CE93D8)', modal: '💬 Ms. Priya Sharma (Math)', body: 'You are doing great in fractions, keep it up! 🌟\n\nSent: Today · 09:30 AM', border: true },
                { init: 'A', name: 'Mr. Arjun Rao · Science', sub: 'Please submit your Science project by Friday.', time: 'Yesterday', grad: 'linear-gradient(135deg,#1565C0,#64B5F6)', modal: '💬 Mr. Arjun Rao (Science)', body: 'Please submit your Science project by Friday. Let me know if you need help! 🔬\n\nSent: Yesterday · 11:00 AM', border: true },
                { init: 'K', name: 'Ms. Kavya Nair · English', sub: 'Excellent story writing this week!', time: '2 days ago', grad: 'linear-gradient(135deg,#BF360C,#FF8A65)', modal: '💬 Ms. Kavya Nair (English)', body: 'Excellent story writing this week! Your adventure story was amazing! ✍️\n\nSent: 2 days ago · 03:00 PM', border: false },
              ].map(m => (
                <div key={m.init} className="trow" style={{ padding: '12px', borderBottom: m.border ? '1px solid var(--bdl)' : 'none' }} onClick={() => showModal(m.modal, m.body)}>
                  <div className="tav" style={{ background: m.grad, width: '40px', height: '40px', fontSize: '15px' }}>{m.init}</div>
                  <div style={{ flex: 1 }}><div className="t-name">{m.name}</div><div className="t-sub">{m.sub}</div></div>
                  <div style={{ fontSize: '.68rem', color: 'var(--txl)' }}>{m.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── PARENT DASHBOARD ────────────────────────────────────────────────────────
function ParentDashboard({ user, onLogout, showToast, showModal }) {
  const [tab, setTab] = useState('dashboard');
  const [courses, setCourses] = useState([]);
  const [detailId, setDetailId] = useState(null);
  const [children, setChildren] = useState([]);
  const name = cap(user?.name || 'Parent');

  if (detailId) return <CourseDetail courseId={detailId} courses={courses} onBack={() => setDetailId(null)} showToast={showToast} showModal={showModal} />;
  useEffect(() => {
    const token = localStorage.getItem('ls_token');

    fetch('http://localhost:5000/api/courses', {
      headers: {
        'x-auth-token': token
      }
    })
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('ls_token');

    fetch('http://localhost:5000/api/users/children', {
      headers: {
        'x-auth-token': token
      }
    })
      .then(res => res.json())
      .then(data => setChildren(data))
      .catch(err => console.log(err));
  }, []);
  const navItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'children', icon: '👧', label: 'My Children' },
    { id: 'progress', icon: '📈', label: 'Progress' },
    { id: 'courses', icon: '📚', label: 'Browse Courses' },
    { id: 'messages', icon: '💬', label: 'Messages', badge: 3 },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="sidebar">
        <div className="sb-brand"><div className="sb-bmark">🌟</div><div className="sb-bname">Learn<span>Spark</span></div></div>
        <div className="sb-user">
          <div className="av" style={{ width: '38px', height: '38px', fontSize: '15px', background: 'linear-gradient(135deg,#1B5E20,#66BB6A)' }}>{name[0]}</div>
          <div><div className="sb-uname">{name}</div><div className="sb-urole" style={{ color: '#1B5E20', background: 'rgba(76,175,80,.14)' }}>Parent</div></div>
        </div>
        <div className="sb-lbl">Menu</div>
        {navItems.map(n => (
          <div key={n.id} className={`nav-item${tab === n.id ? ' on' : ''}`} onClick={() => setTab(n.id)}>
            <span className="ni">{n.icon}</span>{n.label}
            {n.badge && <span className="nb">{n.badge}</span>}
          </div>
        ))}
        <div className="sb-bottom"><button className="logout-btn" onClick={() => showModal('🚪 Log Out','Are you sure you want to log out?','Yes, Log Out', onLogout)}>🚪 Log Out</button></div>
      </aside>
      <main className="main">

        {tab === 'dashboard' && (
          <div>
            <div className="topbar a1">
              <h1>Parent <span>Overview</span> 👨‍👩‍👧</h1>
              <div className="tbr">
                <div className="searchbar"><span>🔍</span><input placeholder="Search..." /></div>
                <div className="iBtn" onClick={() => showToast('🔔 3 new notifications!')}><span>🔔</span><div className="ndot"></div></div>
                <div className="iBtn" onClick={() => setTab('messages')}><span>💬</span></div>
              </div>
            </div>
            <div className="g4 mb a2">
              <div className="sc s-g"><div className="s-icon">👧</div><div className="s-val">2</div><div className="s-lbl">Children</div></div>
              <div className="sc s-a"><div className="s-icon">📚</div><div className="s-val">8</div><div className="s-lbl">Total Courses</div></div>
              <div className="sc s-c"><div className="s-icon">🏆</div><div className="s-val">24</div><div className="s-lbl">Badges Earned</div></div>
              <div className="sc s-b"><div className="s-icon">⭐</div><div className="s-val">88%</div><div className="s-lbl">Avg. Score</div></div>
            </div>
            <div className="g2 mb a3">
              <div className="card">
                <div className="ctitle">👧 Children's Progress <span className="see-more" onClick={() => setTab('children')}>See more →</span></div>
                {[
                  { init: 'S', name: 'Sophia · Age 9 · Grade 3', pct: 75, tagCls: 't-a', tagLabel: '75% avg', pfCls: 'pf-a', grad: 'linear-gradient(135deg,#7B1FA2,#CE93D8)' },
                  { init: 'L', name: 'Leo · Age 7 · Grade 1', pct: 82, tagCls: 't-g', tagLabel: '82% avg', pfCls: 'pf-g', grad: 'linear-gradient(135deg,#1565C0,#64B5F6)' },
                ].map(c => (
                  <div key={c.init} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '8px' }}>
                      <div className="av" style={{ width: '32px', height: '32px', fontSize: '12px', background: c.grad }}>{c.init}</div>
                      <div><div style={{ fontWeight: 700, fontSize: '.8rem' }}>{c.name}</div></div>
                      <span className={`tag ${c.tagCls}`} style={{ marginLeft: 'auto' }}>{c.tagLabel}</span>
                    </div>
                    <div className="pb"><div className={`pf ${c.pfCls}`} style={{ width: `${c.pct}%` }}></div></div>
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="ctitle">🕐 Recent Activity</div>
                {[
                  { color: '#F5C842', time: 'Today', title: 'Sophia completed Math Ch.5', sub: 'Score: 92/100 🎉', modal: '✅ Math Ch.5 Completed', body: 'Child: Sophia\nScore: 92/100 🎉\nDate: Today\nTeacher: Ms. Priya Sharma' },
                  { color: '#66BB6A', time: 'Yest.', title: 'Leo earned Star Learner badge', sub: 'Science Explorer', modal: '🏆 Badge Earned', body: 'Child: Leo\nBadge: Star Learner ⭐\nSubject: Science Explorer\nDate: Yesterday' },
                  { color: '#FF7043', time: '2d ago', title: 'Sophia started Story Writing', sub: 'Chapter 1 – Introduction', modal: '📖 New Course Started', body: 'Child: Sophia\nCourse: Story Writing\nChapter 1 – Introduction\nDate: 2 days ago' },
                  { color: '#CE93D8', time: '3d ago', title: 'Leo completed Art & Creativity', sub: 'Final project submitted', modal: '🎨 Course Completed', body: 'Child: Leo\nCourse: Art & Creativity\nFinal project submitted\nDate: 3 days ago' },
                ].map(a => (
                  <div key={a.time+a.title} className="srow" onClick={() => showModal(a.modal, a.body)}>
                    <div className="sdot" style={{ background: a.color }}></div>
                    <div className="stime">{a.time}</div>
                    <div><div className="stitle">{a.title}</div><div className="ssub">{a.sub}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card a4">
              <div className="ctitle">📚 Courses Overview <span className="see-more" onClick={() => setTab('courses')}>See all →</span></div>
              <table className="dtable">
                <thead><tr><th>Course</th><th>Child</th><th>Progress</th><th>Score</th><th>Status</th></tr></thead>
                <tbody>
                  {[
                    { emoji: '🧮', name: 'Math for Kids', child: 'Sophia', pct: 75, pfCls: 'pf-a', score: '85/100', status: 'active', modal: '🧮 Math for Kids', body: 'Child: Sophia\nProgress: 75%\nScore: 85/100\nTeacher: Ms. Priya Sharma' },
                    { emoji: '🔬', name: 'Science Explorer', child: 'Sophia', pct: 60, pfCls: 'pf-b', score: '72/100', status: 'active', modal: '🔬 Science Explorer', body: 'Child: Sophia\nProgress: 60%\nScore: 72/100\nTeacher: Mr. Arjun Rao' },
                    { emoji: '🧮', name: 'Math Basics', child: 'Leo', pct: 90, pfCls: 'pf-g', score: '95/100', status: 'done', modal: '🧮 Math Basics', body: 'Child: Leo\nProgress: 90%\nScore: 95/100\nTeacher: Ms. Priya Sharma' },
                    { emoji: '🎨', name: 'Art & Creativity', child: 'Leo', pct: 100, pfCls: 'pf-c', score: '88/100', status: 'done', modal: '🎨 Art & Creativity', body: 'Child: Leo\nProgress: 100%\nScore: 88/100\nTeacher: Mr. Rohan Das' },
                  ].map(r => (
                    <tr key={r.name+r.child} onClick={() => showModal(r.modal, r.body)}>
                      <td>{r.emoji} {r.name}</td><td>{r.child}</td>
                      <td><div className="pb" style={{ width: '110px' }}><div className={`pf ${r.pfCls}`} style={{ width: `${r.pct}%` }}></div></div></td>
                      <td>{r.score}</td>
                      <td><span className={`stag ${r.status}`}>{r.status === 'active' ? 'In Progress' : 'Completed'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'children' && (
          <div>
            <div className="topbar"><h1>👧 My <span>Children</span></h1></div>
            <div className="g2">
              {[
                { init: 'S', name: 'Sophia', info: 'Age 9 · Grade 3', tags: [['t-a','4 Courses'],['t-c','12 Badges'],['t-g','5-Day Streak']], pct: 75, pfCls: 'pf-a', grad: 'linear-gradient(135deg,#7B1FA2,#CE93D8)', toast: "📊 Loading Sophia's full report..." },
                { init: 'L', name: 'Leo', info: 'Age 7 · Grade 1', tags: [['t-g','4 Courses'],['t-a','10 Badges'],['t-b','3-Day Streak']], pct: 82, pfCls: 'pf-g', grad: 'linear-gradient(135deg,#1565C0,#64B5F6)', toast: "📊 Loading Leo's full report..." },
              ].map(c => (
                <div key={c.name} className="card" style={{ textAlign: 'center', padding: '28px' }}>
                  <div className="av" style={{ width: '64px', height: '64px', fontSize: '26px', margin: '0 auto 12px', background: c.grad }}>{c.init}</div>
                  <div style={{ fontFamily: "'Lilita One',sans-serif", fontSize: '1.1rem' }}>{c.name}</div>
                  <div style={{ color: 'var(--txl)', fontSize: '.8rem', marginBottom: '12px' }}>{c.info}</div>
                  <div style={{ display: 'flex', gap: '7px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {c.tags.map(([cls, lbl]) => <span key={lbl} className={`tag ${cls}`}>{lbl}</span>)}
                  </div>
                  <div className="pb-wrap">
                    <div className="pb-row"><span>Overall</span><span>{c.pct}%</span></div>
                    <div className="pb"><div className={`pf ${c.pfCls}`} style={{ width: `${c.pct}%` }}></div></div>
                  </div>
                  <button className="btn-main" style={{ marginTop: '14px' }} onClick={() => showToast(c.toast)}>View Full Report</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'progress' && (
          <div>
            <div className="topbar"><h1>📈 <span>Progress</span> Reports</h1></div>
            <div className="g2">
              <div className="card">
                <div className="ctitle">📊 Sophia's Performance</div>
                {[['Math for Kids','85%','pf-a',85],['Science Explorer','72%','pf-b',72],['English Writing','95%','pf-g',95],['Art & Creativity','68%','pf-c',68]].map(([n,p,c,w]) => (
                  <div key={n} className="pb-wrap"><div className="pb-row"><span>{n}</span><span>{p}</span></div><div className="pb"><div className={`pf ${c}`} style={{ width: `${w}%` }}></div></div></div>
                ))}
              </div>
              <div className="card">
                <div className="ctitle">📊 Leo's Performance</div>
                {[['Math Basics','95%','pf-g',95],['Art & Creativity','88%','pf-a',88],['Reading Basics','70%','pf-c',70],['Science Basics','78%','pf-b',78]].map(([n,p,c,w]) => (
                  <div key={n} className="pb-wrap"><div className="pb-row"><span>{n}</span><span>{p}</span></div><div className="pb"><div className={`pf ${c}`} style={{ width: `${w}%` }}></div></div></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'courses' && (
          <div>
            <div className="topbar"><h1>📚 Browse <span>Courses</span></h1></div>
            <div className="g3">
              {courses.map(c => <CourseCard key={c._id} course={c} onOpen={id => setDetailId(id)} onEnroll={() => showToast('🎉 Enrolled!')} />)}
            </div>
          </div>
        )}

        {tab === 'messages' && (
          <div>
            <div className="topbar"><h1>💬 <span>Messages</span></h1></div>
            <div className="card">
              {[
                { init: 'P', name: 'Ms. Priya Sharma · Math', sub: "Sophia is doing great in fractions! Keep encouraging her at home.", time: 'Today', grad: 'linear-gradient(135deg,#7B1FA2,#CE93D8)', modal: '💬 Ms. Priya Sharma (Math)', body: 'Sophia is doing great in fractions! Keep encouraging her at home. 🌟\n\nSent: Today · 10:00 AM', border: true },
                { init: 'A', name: 'Mr. Arjun Rao · Science', sub: 'Leo has submitted all assignments this week. Wonderful!', time: 'Yesterday', grad: 'linear-gradient(135deg,#1565C0,#64B5F6)', modal: '💬 Mr. Arjun Rao (Science)', body: 'Leo has submitted all assignments this week. Wonderful! 🔬\n\nSent: Yesterday · 11:00 AM', border: true },
                { init: 'R', name: 'Mr. Rohan Das · Art', sub: "Sophia's artwork was selected for the school display!", time: '2 days ago', grad: 'linear-gradient(135deg,#BF360C,#FF8A65)', modal: '💬 Mr. Rohan Das (Art)', body: "Sophia's artwork was selected for the school display! Please attend the exhibition on 25 March. 🎨\n\nSent: 2 days ago", border: false },
              ].map(m => (
                <div key={m.init} className="trow" style={{ padding: '12px', borderBottom: m.border ? '1px solid var(--bdl)' : 'none' }} onClick={() => showModal(m.modal, m.body)}>
                  <div className="tav" style={{ background: m.grad, width: '40px', height: '40px', fontSize: '15px' }}>{m.init}</div>
                  <div style={{ flex: 1 }}><div className="t-name">{m.name}</div><div className="t-sub">{m.sub}</div></div>
                  <div style={{ fontSize: '.68rem', color: 'var(--txl)' }}>{m.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── AUTH PAGES ──────────────────────────────────────────────────────────────
function LoginPage({ onLogin, onGoRegister, showToast }) {
  const [role, setRole] = useState('kid');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    setErr('');
    if (!email || !pass) { setErr('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('ls_token', data.token);
        localStorage.setItem('ls_email', email);
        localStorage.setItem('ls_role', role);
        onLogin({ name: email.split('@')[0], role, email });
        showToast(`Welcome back, ${cap(email.split('@')[0])}! 🎉`);
      } else { setErr(data.msg || 'Invalid email or password.'); }
    } catch {
      localStorage.setItem('ls_token', 'demo');
      localStorage.setItem('ls_email', email);
      localStorage.setItem('ls_role', role);
      onLogin({ name: email.split('@')[0], role, email });
      showToast('Welcome! (Start your backend for real login) 🎉');
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="deco d1"></div><div className="deco d2"></div><div className="deco d3"></div>
      <div className="auth-card">
        <div className="brand"><div className="bmark">🌟</div><div className="bname">Learn<span>Spark</span></div></div>
        <div className="auth-title">Welcome Back! 👋</div>
        <div className="auth-sub">Sign in to continue your learning journey</div>
        <div className="role-row">
          {[['kid','🧒 Kid'],['parent','👨‍👩‍👧 Parent'],['teacher','👨‍🏫 Teacher']].map(([r,l]) => (
            <button key={r} className={`rbtn${role === r ? ' on' : ''}`} onClick={() => setRole(r)}>{l}</button>
          ))}
        </div>
        {err && <div className="err">{err}</div>}
        <div className="fg"><label>Email Address</label><input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && doLogin()} /></div>
        <div className="fg"><label>Password</label><input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && doLogin()} /></div>
        <button className="btn-main" disabled={loading} onClick={doLogin}>
          {loading ? <><span className="spinner"></span>Signing in...</> : 'Sign In ✨'}
        </button>
        <div className="auth-foot">Don't have an account? <a onClick={onGoRegister}>Register here</a></div>
      </div>
    </div>
  );
}

function RegisterPage({ onGoLogin, showToast }) {
  const [role, setRole] = useState('kid');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [suc, setSuc] = useState('');
  const [loading, setLoading] = useState(false);

  const doRegister = async () => {
    setErr(''); setSuc('');
    if (!name || !email || !pass) { setErr('Please fill in all fields.'); return; }
    if (pass.length < 6) { setErr('Password must be at least 6 characters.'); return; }
    if (!email.includes('@')) { setErr('Enter a valid email address.'); return; }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pass, role })
      });
      const data = await res.json();
      if (res.ok) { setSuc('✅ Account created! Redirecting to sign in...'); setTimeout(onGoLogin, 1600); }
      else { setErr(data.msg || 'Registration failed. Try again.'); }
    } catch {
      setSuc('✅ Account created! (Demo mode) Redirecting...');
      setTimeout(onGoLogin, 1600);
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="deco d1"></div><div className="deco d2"></div><div className="deco d3"></div>
      <div className="auth-card">
        <div className="brand"><div className="bmark">🌟</div><div className="bname">Learn<span>Spark</span></div></div>
        <div className="auth-title">Join LearnSpark! 🚀</div>
        <div className="auth-sub">Create your account and start learning today</div>
        <div className="role-row">
          {[['kid','🧒 Kid'],['parent','👨‍👩‍👧 Parent'],['teacher','👨‍🏫 Teacher']].map(([r,l]) => (
            <button key={r} className={`rbtn${role === r ? ' on' : ''}`} onClick={() => setRole(r)}>{l}</button>
          ))}
        </div>
        {err && <div className="err">{err}</div>}
        {suc && <div className="suc">{suc}</div>}
        <div className="fg"><label>Full Name</label><input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} /></div>
        <div className="fg"><label>Email Address</label><input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></div>
        <div className="fg"><label>Password</label><input type="password" placeholder="Min. 6 characters" value={pass} onChange={e => setPass(e.target.value)} /></div>
        <button className="btn-main" disabled={loading} onClick={doRegister}>
          {loading ? <><span className="spinner"></span>Creating account...</> : 'Create Account 🎉'}
        </button>
        <div className="auth-foot">Already have an account? <a onClick={onGoLogin}>Sign in</a></div>
      </div>
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState('login'); // login | register | kid | parent
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState(null); // { title, body, okTxt, okFn }
  const toastKey = useState(0)[0];
  const [toastId, setToastId] = useState(0);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setToastId(id => id + 1);
  }, []);

  const showModal = useCallback((title, body, okTxt, okFn) => {
    setModal({ title, body, okTxt, okFn });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  // Auto-login
  useEffect(() => {
    const tok = localStorage.getItem('ls_token');
    const em = localStorage.getItem('ls_email');
    const r = localStorage.getItem('ls_role') || 'kid';
    if (tok && em) {
      const u = { name: em.split('@')[0], role: r, email: em };
      setUser(u);
      setPage(r === 'parent' ? 'parent' : 'kid');
    }
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    setPage(u.role === 'parent' ? 'parent' : 'kid');
  };

  const handleLogout = () => {
    localStorage.removeItem('ls_token');
    localStorage.removeItem('ls_email');
    localStorage.removeItem('ls_role');
    setUser(null);
    setPage('login');
    showToast('Logged out. See you soon! 👋');
    closeModal();
  };

  return (
    <>
      <style>{css}</style>
      {page === 'login' && <LoginPage onLogin={handleLogin} onGoRegister={() => setPage('register')} showToast={showToast} />}
      {page === 'register' && <RegisterPage onGoLogin={() => setPage('login')} showToast={showToast} />}
      {page === 'kid' && <KidDashboard user={user} onLogout={handleLogout} showToast={showToast} showModal={showModal} />}
      {page === 'parent' && <ParentDashboard user={user} onLogout={handleLogout} showToast={showToast} showModal={showModal} />}
      {toast && <Toast key={toastId} msg={toast} onDone={() => setToast('')} />}
      {modal && <Modal {...modal} onClose={closeModal} />}
    </>
  );
}