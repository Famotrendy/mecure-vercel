import { useState, useEffect } from "react";

// ─── ICONS (inline SVG helpers) ──────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor", ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d={d} />
  </svg>
);
const icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  flask: "M9 3h6M5 21h14M4 21L8 9M16 9l4 12M8 9h8",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  chart: "M18 20V10M12 20V4M6 20v-6",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  plus: "M12 5v14M5 12h14",
  arrow: "M5 12h14M12 5l7 7-7 7",
  search: "M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z",
  doc: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6M16 13H8M16 17H8M10 9H8",
  clock: "M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  pill: "M10.5 20H4a2 2 0 01-2-2v-1a2 2 0 012-2h16.5M20 16a2 2 0 002-2v-1a2 2 0 00-2-2H3.5M3.5 11V4a2 2 0 012-2h13a2 2 0 012 2v7",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockPatients = [
  { id: "MCR-001", name: "Aisha Nwosu", age: 34, condition: "Hypertension", status: "Active", next: "May 8", avatar: "AN" },
  { id: "MCR-002", name: "Emeka Obi", age: 51, condition: "Diabetes T2", status: "Pending", next: "May 10", avatar: "EO" },
  { id: "MCR-003", name: "Fatima Bello", age: 28, condition: "Anemia", status: "Results Ready", next: "May 12", avatar: "FB" },
  { id: "MCR-004", name: "Chukwudi Eze", age: 45, condition: "Asthma", status: "Active", next: "May 15", avatar: "CE" },
  { id: "MCR-005", name: "Ngozi Adeyemi", age: 62, condition: "Arthritis", status: "Critical", next: "May 7", avatar: "NA" },
];
const mockAppointments = [
  { time: "09:00 AM", patient: "Aisha Nwosu", type: "Follow-up", doc: "Dr. Okafor", status: "confirmed" },
  { time: "10:30 AM", patient: "Emeka Obi", type: "Lab Review", doc: "Dr. Sule", status: "pending" },
  { time: "12:00 PM", patient: "Fatima Bello", type: "New Consult", doc: "Dr. Okafor", status: "confirmed" },
  { time: "02:15 PM", patient: "Chukwudi Eze", type: "Prescription", doc: "Dr. Adamu", status: "confirmed" },
  { time: "04:00 PM", patient: "Ngozi Adeyemi", type: "Urgent Review", doc: "Dr. Sule", status: "urgent" },
];
const mockResults = [
  { id: "RES-2041", patient: "Aisha Nwosu", test: "CBC Panel", date: "Apr 30", status: "ready", flag: false },
  { id: "RES-2042", patient: "Emeka Obi", test: "HbA1c", date: "May 1", status: "processing", flag: false },
  { id: "RES-2043", patient: "Fatima Bello", test: "Iron Studies", date: "May 2", status: "ready", flag: true },
  { id: "RES-2044", patient: "Ngozi Adeyemi", test: "CRP + ESR", date: "May 2", status: "ready", flag: true },
];
const doctors = ["Dr. Okafor", "Dr. Sule", "Dr. Adamu", "Dr. Ibrahim"];
const services = ["General Consultation", "Lab Test", "Follow-up Visit", "Prescription Review", "Specialist Referral", "Health Screening"];

// ─── COLOR / STYLE CONSTANTS ──────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --teal: #0a9e8e;
    --teal-light: #12c5b2;
    --teal-dim: #063d38;
    --navy: #07111f;
    --navy2: #0d1f33;
    --navy3: #102742;
    --slate: #1a3350;
    --card: #0f2035;
    --border: rgba(10,158,142,0.18);
    --text: #e8f4f2;
    --muted: #7fa3a0;
    --red: #e05252;
    --amber: #e8a948;
    --green: #3dba7e;
    --font: 'Sora', sans-serif;
    --serif: 'Crimson Pro', serif;
  }

  body { font-family: var(--font); background: var(--navy); color: var(--text); overflow-x: hidden; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--navy2); }
  ::-webkit-scrollbar-thumb { background: var(--teal-dim); border-radius: 10px; }

  .app { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar {
    width: 230px; min-height: 100vh; background: var(--navy2);
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; z-index: 100;
    transition: width 0.3s ease;
  }
  .sidebar-logo {
    padding: 24px 20px 20px;
    border-bottom: 1px solid var(--border);
  }
  .logo-mark {
    display: flex; align-items: center; gap: 10px;
  }
  .logo-circle {
    width: 36px; height: 36px; border-radius: 10px;
    background: linear-gradient(135deg, var(--teal), #066b5f);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700; color: white;
    font-family: var(--serif);
    box-shadow: 0 0 20px rgba(10,158,142,0.4);
  }
  .logo-text { font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
  .logo-text span { color: var(--teal-light); }
  .logo-sub { font-size: 10px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }

  .sidebar-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; }
  .nav-section-label {
    font-size: 9px; color: var(--muted); letter-spacing: 2px; text-transform: uppercase;
    padding: 12px 8px 6px; margin-top: 8px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: 10px; cursor: pointer;
    color: var(--muted); font-size: 13.5px; font-weight: 500;
    transition: all 0.2s; border: 1px solid transparent;
    user-select: none;
  }
  .nav-item:hover { background: rgba(10,158,142,0.08); color: var(--text); }
  .nav-item.active {
    background: linear-gradient(135deg, rgba(10,158,142,0.2), rgba(10,158,142,0.08));
    color: var(--teal-light); border-color: var(--border);
    box-shadow: inset 0 0 0 1px rgba(10,158,142,0.15);
  }
  .nav-badge {
    margin-left: auto; background: var(--teal); color: white;
    font-size: 10px; font-weight: 700; border-radius: 20px;
    padding: 1px 7px; min-width: 20px; text-align: center;
  }
  .nav-badge.red { background: var(--red); }

  .sidebar-footer {
    padding: 16px; border-top: 1px solid var(--border);
  }
  .user-card {
    display: flex; align-items: center; gap: 10px;
    padding: 10px; border-radius: 10px; cursor: pointer;
    transition: background 0.2s;
  }
  .user-card:hover { background: rgba(255,255,255,0.04); }
  .user-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, var(--teal), #066b5f);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: white; flex-shrink: 0;
  }
  .user-name { font-size: 13px; font-weight: 600; }
  .user-role { font-size: 11px; color: var(--muted); }

  /* MAIN */
  .main { margin-left: 230px; flex: 1; display: flex; flex-direction: column; }
  
  .topbar {
    background: var(--navy2); border-bottom: 1px solid var(--border);
    padding: 16px 28px; display: flex; align-items: center;
    justify-content: space-between; position: sticky; top: 0; z-index: 50;
  }
  .topbar-left { display: flex; flex-direction: column; }
  .topbar-title { font-size: 18px; font-weight: 700; }
  .topbar-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .icon-btn {
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--muted); transition: all 0.2s;
    position: relative;
  }
  .icon-btn:hover { background: rgba(10,158,142,0.1); color: var(--teal-light); border-color: var(--teal); }
  .notif-dot {
    width: 8px; height: 8px; background: var(--red);
    border-radius: 50%; position: absolute; top: 6px; right: 6px;
    border: 2px solid var(--navy2);
  }
  .view-toggle {
    display: flex; border: 1px solid var(--border); border-radius: 10px; overflow: hidden;
  }
  .view-btn {
    padding: 8px 16px; font-size: 12px; font-weight: 600; cursor: pointer;
    border: none; background: transparent; color: var(--muted);
    transition: all 0.2s; font-family: var(--font);
  }
  .view-btn.active { background: var(--teal); color: white; }

  /* CONTENT */
  .content { padding: 28px; flex: 1; }

  /* CARDS */
  .card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 20px;
  }
  .card-sm { border-radius: 12px; padding: 16px; }

  /* STATS ROW */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .stat-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 20px;
    display: flex; flex-direction: column;
    position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  }
  .stat-card.teal::before { background: linear-gradient(90deg, var(--teal), var(--teal-light)); }
  .stat-card.green::before { background: linear-gradient(90deg, var(--green), #5de0a0); }
  .stat-card.amber::before { background: linear-gradient(90deg, var(--amber), #f0c060); }
  .stat-card.red::before { background: linear-gradient(90deg, var(--red), #f07070); }
  .stat-icon {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
  }
  .stat-icon.teal { background: rgba(10,158,142,0.15); color: var(--teal-light); }
  .stat-icon.green { background: rgba(61,186,126,0.15); color: var(--green); }
  .stat-icon.amber { background: rgba(232,169,72,0.15); color: var(--amber); }
  .stat-icon.red { background: rgba(224,82,82,0.15); color: var(--red); }
  .stat-val { font-size: 32px; font-weight: 700; line-height: 1; }
  .stat-label { font-size: 12px; color: var(--muted); margin-top: 4px; }
  .stat-delta { font-size: 11px; margin-top: 12px; display: flex; align-items: center; gap: 4px; }
  .stat-delta.up { color: var(--green); }
  .stat-delta.down { color: var(--red); }

  /* GRID LAYOUTS */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .three-two { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; margin-bottom: 20px; }
  .section-title { font-size: 14px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
  .section-title span { font-size: 11px; color: var(--teal-light); cursor: pointer; font-weight: 500; }

  /* TABLE */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); font-weight: 600; padding: 10px 12px; text-align: left; border-bottom: 1px solid var(--border); }
  td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.04); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.02); }

  /* BADGES */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
  }
  .badge.confirmed { background: rgba(61,186,126,0.15); color: var(--green); }
  .badge.pending { background: rgba(232,169,72,0.15); color: var(--amber); }
  .badge.urgent { background: rgba(224,82,82,0.15); color: var(--red); }
  .badge.ready { background: rgba(10,158,142,0.15); color: var(--teal-light); }
  .badge.processing { background: rgba(120,120,180,0.15); color: #aac; }
  .badge.active { background: rgba(61,186,126,0.15); color: var(--green); }
  .badge.critical { background: rgba(224,82,82,0.15); color: var(--red); }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  /* AVATAR */
  .avatar {
    width: 34px; height: 34px; border-radius: 10px;
    background: linear-gradient(135deg, var(--teal-dim), var(--slate));
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: var(--teal-light);
    flex-shrink: 0;
  }

  /* APPT LIST */
  .appt-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .appt-item:last-child { border-bottom: none; }
  .appt-time { font-size: 11px; color: var(--muted); width: 72px; flex-shrink: 0; }
  .appt-info { flex: 1; min-width: 0; }
  .appt-name { font-size: 13px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .appt-type { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* MINI CHART */
  .mini-chart { display: flex; align-items: flex-end; gap: 5px; height: 60px; margin-top: 16px; }
  .bar { flex: 1; border-radius: 4px 4px 0 0; background: rgba(10,158,142,0.3); transition: background 0.2s; }
  .bar:hover { background: var(--teal); }
  .bar.active { background: var(--teal-light); }

  /* ── PATIENT / USER SIDE ── */
  .patient-app { display: flex; flex-direction: column; min-height: 100vh; background: var(--navy); }

  .patient-header {
    background: linear-gradient(180deg, var(--navy2) 0%, transparent 100%);
    padding: 20px 28px; display: flex; align-items: center;
    justify-content: space-between; border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 50; backdrop-filter: blur(20px);
  }
  .patient-nav { display: flex; gap: 4px; }
  .patient-nav-item {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding: 10px 18px; border-radius: 12px; cursor: pointer;
    color: var(--muted); font-size: 11px; transition: all 0.2s;
    border: 1px solid transparent;
  }
  .patient-nav-item.active { background: rgba(10,158,142,0.12); color: var(--teal-light); border-color: var(--border); }
  .patient-nav-item:hover:not(.active) { background: rgba(255,255,255,0.04); color: var(--text); }

  .patient-content { flex: 1; padding: 32px 28px; max-width: 900px; margin: 0 auto; width: 100%; }

  /* HERO CARD */
  .hero-card {
    background: linear-gradient(135deg, var(--teal-dim) 0%, var(--slate) 60%, var(--navy3) 100%);
    border: 1px solid var(--border); border-radius: 20px;
    padding: 28px 32px; margin-bottom: 24px;
    position: relative; overflow: hidden;
  }
  .hero-card::before {
    content: '+'; position: absolute; right: -20px; top: -30px;
    font-size: 200px; font-weight: 700; color: rgba(10,158,142,0.06);
    line-height: 1; font-family: var(--serif);
    pointer-events: none;
  }
  .hero-greeting { font-family: var(--serif); font-size: 13px; color: var(--teal-light); margin-bottom: 6px; font-style: italic; }
  .hero-name { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 8px; }
  .hero-id { font-size: 12px; color: var(--muted); }
  .hero-stats { display: flex; gap: 28px; margin-top: 20px; }
  .hero-stat { display: flex; flex-direction: column; gap: 2px; }
  .hero-stat-val { font-size: 22px; font-weight: 700; color: var(--teal-light); }
  .hero-stat-label { font-size: 11px; color: var(--muted); }

  /* QUICK ACTIONS */
  .quick-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
  .qa-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 16px; padding: 18px 14px;
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    cursor: pointer; transition: all 0.25s; text-align: center;
  }
  .qa-card:hover { border-color: var(--teal); background: rgba(10,158,142,0.08); transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.25); }
  .qa-icon {
    width: 48px; height: 48px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
  }
  .qa-label { font-size: 12px; font-weight: 600; }
  .qa-sub { font-size: 10px; color: var(--muted); }

  /* BOOK FORM */
  .book-section { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .form-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
  .form-label { font-size: 11px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }
  .form-input, .form-select {
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    border-radius: 10px; padding: 12px 14px; color: var(--text);
    font-family: var(--font); font-size: 13px; outline: none;
    transition: border-color 0.2s, background 0.2s;
    width: 100%;
  }
  .form-input:focus, .form-select:focus { border-color: var(--teal); background: rgba(10,158,142,0.06); }
  .form-select option { background: var(--navy2); }
  .btn-primary {
    background: linear-gradient(135deg, var(--teal), #067b6e);
    border: none; border-radius: 10px; padding: 13px 24px;
    color: white; font-family: var(--font); font-size: 13px; font-weight: 700;
    cursor: pointer; display: flex; align-items: center; gap: 8px;
    transition: all 0.2s; letter-spacing: 0.3px;
    box-shadow: 0 4px 16px rgba(10,158,142,0.3);
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(10,158,142,0.4); }
  .btn-ghost {
    background: transparent; border: 1px solid var(--border);
    border-radius: 10px; padding: 11px 20px;
    color: var(--muted); font-family: var(--font); font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: var(--teal); color: var(--teal-light); }

  /* RESULTS LIST */
  .result-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 18px 20px;
    margin-bottom: 12px; display: flex; align-items: center; gap: 16px;
    cursor: pointer; transition: all 0.2s;
  }
  .result-card:hover { border-color: var(--teal); }
  .result-icon {
    width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .result-info { flex: 1; }
  .result-name { font-size: 14px; font-weight: 700; }
  .result-meta { font-size: 11px; color: var(--muted); margin-top: 3px; }
  .flag-badge { font-size: 10px; background: rgba(224,82,82,0.15); color: var(--red); border-radius: 6px; padding: 2px 7px; margin-left: 8px; }

  /* NOTIFICATION */
  .notif-toast {
    position: fixed; bottom: 28px; right: 28px; z-index: 999;
    background: var(--card); border: 1px solid var(--teal);
    border-radius: 14px; padding: 16px 20px;
    display: flex; align-items: center; gap: 12px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
    animation: slideUp 0.4s ease;
    max-width: 320px;
  }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .notif-text { font-size: 13px; font-weight: 500; }
  .notif-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }

  /* SEARCH BAR */
  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.04); border: 1px solid var(--border);
    border-radius: 10px; padding: 10px 14px; margin-bottom: 16px;
    transition: border-color 0.2s;
  }
  .search-bar:focus-within { border-color: var(--teal); }
  .search-bar input {
    background: none; border: none; outline: none; color: var(--text);
    font-family: var(--font); font-size: 13px; flex: 1;
  }
  .search-bar input::placeholder { color: var(--muted); }

  /* RECOMMENDATION CARDS */
  .rec-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 14px; padding: 18px; margin-bottom: 12px;
    border-left: 3px solid var(--teal);
  }
  .rec-title { font-size: 13px; font-weight: 700; margin-bottom: 6px; }
  .rec-body { font-size: 12px; color: var(--muted); line-height: 1.6; }
  .rec-meta { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
  .rec-doc { font-size: 11px; color: var(--teal-light); }
  .rec-date { font-size: 11px; color: var(--muted); }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(7,17,31,0.85);
    display: flex; align-items: center; justify-content: center;
    z-index: 200; backdrop-filter: blur(8px);
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: var(--navy2); border: 1px solid var(--border);
    border-radius: 20px; padding: 28px; width: 480px; max-width: 95vw;
    max-height: 90vh; overflow-y: auto;
    animation: scaleIn 0.25s ease;
  }
  @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .modal-title { font-size: 18px; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }

  /* PULSE ANIM */
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
  .pulse { animation: pulse 2s infinite; }

  /* LOADING SPINNER */
  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner { width: 20px; height: 20px; border: 2px solid var(--border); border-top-color: var(--teal); border-radius: 50%; animation: spin 0.7s linear infinite; }

  /* CALENDAR GRID */
  .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); gap: 6px; }
  .cal-day {
    aspect-ratio: 1; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    font-size: 12px; cursor: pointer; transition: all 0.2s;
    border: 1px solid transparent;
  }
  .cal-day:hover { background: rgba(10,158,142,0.1); color: var(--teal-light); }
  .cal-day.today { background: var(--teal); color: white; font-weight: 700; }
  .cal-day.has-appt { border-color: var(--teal); color: var(--teal-light); }
  .cal-day.selected { background: rgba(10,158,142,0.2); border-color: var(--teal); }
  .cal-header { font-size: 10px; color: var(--muted); text-align: center; padding-bottom: 4px; font-weight: 600; }

  /* TIMELINE */
  .timeline { display: flex; flex-direction: column; gap: 0; }
  .tl-item { display: flex; gap: 16px; padding-bottom: 20px; position: relative; }
  .tl-item::before { content: ''; position: absolute; left: 15px; top: 30px; bottom: 0; width: 1px; background: var(--border); }
  .tl-item:last-child::before { display: none; }
  .tl-dot { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .tl-dot.green { background: rgba(61,186,126,0.2); color: var(--green); }
  .tl-dot.teal { background: rgba(10,158,142,0.2); color: var(--teal-light); }
  .tl-dot.muted { background: rgba(127,163,160,0.15); color: var(--muted); }
  .tl-text { flex: 1; }
  .tl-title { font-size: 13px; font-weight: 600; margin-bottom: 2px; }
  .tl-sub { font-size: 11px; color: var(--muted); }

  /* ══════════════════════════════════════════
     RESPONSIVE — TABLET (≤ 1024px)
  ══════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .three-two  { grid-template-columns: 1fr; }
  }

  /* ══════════════════════════════════════════
     RESPONSIVE — MOBILE (≤ 768px)
  ══════════════════════════════════════════ */
  @media (max-width: 768px) {
    /* ── ADMIN SIDEBAR → bottom tab bar ── */
    .sidebar {
      width: 100% !important;
      height: 64px; min-height: unset;
      top: auto; bottom: 0; left: 0; right: 0;
      flex-direction: row;
      border-right: none; border-top: 1px solid var(--border);
      z-index: 200;
    }
    .sidebar-logo  { display: none; }
    .sidebar-footer { display: none; }
    .sidebar-nav {
      flex-direction: row; padding: 0; gap: 0;
      align-items: stretch; justify-content: space-around;
      width: 100%;
    }
    .nav-section-label { display: none; }
    .nav-item {
      flex-direction: column; gap: 3px; padding: 8px 6px;
      border-radius: 0; border: none; font-size: 10px;
      flex: 1; justify-content: center; align-items: center;
    }
    .nav-item span { display: flex !important; font-size: 9px; }
    .nav-item.active { background: rgba(10,158,142,0.12); border-radius: 0; border: none; }
    .nav-badge { display: none; }

    /* ── ADMIN MAIN ── */
    .main { margin-left: 0 !important; padding-bottom: 72px; }
    .topbar { padding: 12px 16px; }
    .topbar-right .search-bar { display: none; }
    .content { padding: 16px; }

    /* ── GRIDS ── */
    .stats-grid        { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .two-col           { grid-template-columns: 1fr; gap: 14px; }
    .three-two         { grid-template-columns: 1fr; gap: 14px; }
    .book-section      { grid-template-columns: 1fr; gap: 14px; }
    .quick-actions     { grid-template-columns: repeat(2, 1fr); gap: 10px; }

    /* ── STAT CARDS ── */
    .stat-card { padding: 14px; }
    .stat-val  { font-size: 24px; }
    .stat-icon { width: 34px; height: 34px; margin-bottom: 10px; }

    /* ── TABLE → card stack ── */
    table, thead, tbody, th, td, tr { display: block; }
    thead { display: none; }
    tr {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 12px; margin-bottom: 10px; padding: 12px 14px;
      display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
    }
    td {
      border: none; padding: 4px 0; font-size: 12px;
      display: flex; align-items: center; gap: 6px;
    }
    td:first-child { grid-column: 1 / -1; font-size: 13px; }

    /* ── PATIENT HEADER ── */
    .patient-header { padding: 12px 16px; flex-wrap: wrap; gap: 10px; }
    .patient-nav { gap: 2px; order: 3; width: 100%; justify-content: space-around; }
    .patient-nav-item { flex: 1; padding: 8px 4px; font-size: 10px; }

    /* ── PATIENT CONTENT ── */
    .patient-content { padding: 16px; padding-bottom: 24px; }

    /* ── HERO CARD ── */
    .hero-card  { padding: 20px; }
    .hero-name  { font-size: 22px; }
    .hero-stats { gap: 20px; flex-wrap: wrap; }
    .hero-stat-val { font-size: 18px; }

    /* ── QA CARDS ── */
    .qa-card { padding: 14px 10px; }
    .qa-icon  { width: 42px; height: 42px; border-radius: 12px; }
    .qa-label { font-size: 11px; }
    .qa-sub   { display: none; }

    /* ── FORM ── */
    .form-input, .form-select { padding: 11px 12px; font-size: 13px; }
    .btn-primary, .btn-ghost  { padding: 12px 16px; }

    /* ── MODAL ── */
    .modal { padding: 20px 16px; border-radius: 16px; }

    /* ── LOGIN ── */
    .login-left  { display: none; }
    .login-right { width: 100%; padding: 20px 16px; min-height: 100vh; align-items: flex-start; padding-top: 40px; }
    .login-card  { border-radius: 20px; padding: 28px 20px; }
    .login-tab   { font-size: 12px; padding: 10px 6px; }
    .login-demo-grid { grid-template-columns: 1fr 1fr; }

    /* ── MISC ── */
    .card  { padding: 16px; border-radius: 14px; }
    .topbar-title { font-size: 15px; }
    .section-title { font-size: 13px; }
    .mini-chart { height: 48px; }
  }

  /* ══════════════════════════════════════════
     RESPONSIVE — SMALL PHONES (≤ 400px)
  ══════════════════════════════════════════ */
  @media (max-width: 400px) {
    .stats-grid    { grid-template-columns: 1fr 1fr; gap: 8px; }
    .quick-actions { grid-template-columns: 1fr 1fr; gap: 8px; }
    .stat-val      { font-size: 20px; }
    .hero-name     { font-size: 19px; }
    .login-card    { padding: 22px 16px; }
    .login-headline { font-size: 32px; }
    .patient-nav-item span { font-size: 9px; }
    .content { padding: 12px; }
    .patient-content { padding: 12px; }
  }

  /* ══════════════════════════════════════════
     LOGIN PAGE
  ══════════════════════════════════════════ */
  .login-root {
    min-height: 100vh; display: flex;
    background: var(--navy);
    position: relative; overflow: hidden;
  }

  /* animated mesh background */
  .login-bg {
    position: absolute; inset: 0; z-index: 0;
    background:
      radial-gradient(ellipse 60% 50% at 15% 30%, rgba(10,158,142,0.18) 0%, transparent 60%),
      radial-gradient(ellipse 50% 60% at 85% 70%, rgba(6,61,56,0.35) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 50% 10%, rgba(18,197,178,0.06) 0%, transparent 50%);
  }
  .login-grid-lines {
    position: absolute; inset: 0; z-index: 0;
    background-image:
      linear-gradient(rgba(10,158,142,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(10,158,142,0.06) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
  }

  /* floating orbs */
  .orb {
    position: absolute; border-radius: 50%; filter: blur(60px);
    animation: float 8s ease-in-out infinite;
    pointer-events: none; z-index: 0;
  }
  .orb-1 { width: 320px; height: 320px; background: rgba(10,158,142,0.12); top: -80px; left: -80px; animation-delay: 0s; }
  .orb-2 { width: 240px; height: 240px; background: rgba(18,197,178,0.08); bottom: 60px; right: -60px; animation-delay: -3s; }
  .orb-3 { width: 180px; height: 180px; background: rgba(6,61,56,0.25); top: 40%; left: 35%; animation-delay: -5s; }
  @keyframes float {
    0%,100% { transform: translate(0,0) scale(1); }
    33% { transform: translate(20px,-15px) scale(1.05); }
    66% { transform: translate(-10px,10px) scale(0.97); }
  }

  /* split layout */
  .login-left {
    flex: 1; display: flex; flex-direction: column; justify-content: center;
    padding: 60px; position: relative; z-index: 1;
  }
  .login-right {
    width: 480px; flex-shrink: 0; display: flex; align-items: center;
    justify-content: center; padding: 40px; position: relative; z-index: 1;
  }

  /* left panel content */
  .login-brand { display: flex; align-items: center; gap: 14px; margin-bottom: 60px; }
  .login-logo-circle {
    width: 52px; height: 52px; border-radius: 16px;
    background: linear-gradient(135deg, var(--teal), #055e54);
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; font-weight: 700; color: white; font-family: var(--serif);
    box-shadow: 0 0 40px rgba(10,158,142,0.5), 0 0 0 1px rgba(10,158,142,0.3);
  }
  .login-brand-text { font-size: 28px; font-weight: 800; letter-spacing: -1px; }
  .login-brand-text em { color: var(--teal-light); font-style: normal; }
  .login-brand-tag { font-size: 11px; color: var(--muted); letter-spacing: 2.5px; text-transform: uppercase; margin-top: 2px; }

  .login-headline {
    font-family: var(--serif); font-size: 48px; font-weight: 300;
    line-height: 1.2; color: var(--text); margin-bottom: 20px;
  }
  .login-headline strong { font-weight: 400; color: var(--teal-light); display: block; }
  .login-subline { font-size: 15px; color: var(--muted); line-height: 1.7; max-width: 400px; margin-bottom: 48px; }

  .login-features { display: flex; flex-direction: column; gap: 16px; }
  .login-feat {
    display: flex; align-items: center; gap: 14px;
    animation: fadeSlide 0.6s ease both;
  }
  .login-feat:nth-child(1) { animation-delay: 0.1s; }
  .login-feat:nth-child(2) { animation-delay: 0.2s; }
  .login-feat:nth-child(3) { animation-delay: 0.3s; }
  @keyframes fadeSlide { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
  .login-feat-icon {
    width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
    background: rgba(10,158,142,0.12); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--teal-light);
  }
  .login-feat-text { font-size: 13px; color: var(--muted); }
  .login-feat-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 2px; }

  /* right panel — form card */
  .login-card {
    width: 100%; background: rgba(13,31,51,0.85);
    border: 1px solid var(--border); border-radius: 24px;
    padding: 40px 36px;
    backdrop-filter: blur(24px);
    box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(10,158,142,0.08);
    animation: cardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes cardIn { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

  .login-tab-row {
    display: flex; background: rgba(255,255,255,0.04);
    border: 1px solid var(--border); border-radius: 12px;
    overflow: hidden; margin-bottom: 32px;
  }
  .login-tab {
    flex: 1; padding: 11px; text-align: center; cursor: pointer;
    font-size: 13px; font-weight: 600; color: var(--muted);
    transition: all 0.25s; border: none; background: none; font-family: var(--font);
  }
  .login-tab.active {
    background: linear-gradient(135deg, var(--teal), #067b6e);
    color: white; border-radius: 10px;
    box-shadow: 0 4px 16px rgba(10,158,142,0.35);
  }

  .login-title { font-size: 22px; font-weight: 700; margin-bottom: 6px; }
  .login-sub { font-size: 13px; color: var(--muted); margin-bottom: 28px; }

  .login-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
  .login-label { font-size: 11px; font-weight: 600; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
  .login-input-wrap { position: relative; }
  .login-input {
    width: 100%; background: rgba(255,255,255,0.05);
    border: 1px solid var(--border); border-radius: 12px;
    padding: 13px 44px 13px 16px; color: var(--text);
    font-family: var(--font); font-size: 13.5px; outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .login-input:focus {
    border-color: var(--teal); background: rgba(10,158,142,0.06);
    box-shadow: 0 0 0 3px rgba(10,158,142,0.12);
  }
  .login-input::placeholder { color: rgba(127,163,160,0.5); }
  .login-input-icon {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    color: var(--muted); pointer-events: none;
  }
  .login-input-icon.clickable { pointer-events: all; cursor: pointer; }
  .login-input-icon.clickable:hover { color: var(--teal-light); }

  .login-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; margin-top: -4px; }
  .login-remember { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); cursor: pointer; }
  .login-remember input { accent-color: var(--teal); }
  .login-forgot { font-size: 12px; color: var(--teal-light); cursor: pointer; font-weight: 500; }
  .login-forgot:hover { text-decoration: underline; }

  .login-btn {
    width: 100%; padding: 14px; border: none; border-radius: 12px; cursor: pointer;
    font-family: var(--font); font-size: 14px; font-weight: 700;
    background: linear-gradient(135deg, var(--teal), #055e54);
    color: white; transition: all 0.2s; letter-spacing: 0.3px;
    box-shadow: 0 6px 20px rgba(10,158,142,0.35);
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .login-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(10,158,142,0.45); }
  .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .login-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 20px 0; color: var(--muted); font-size: 11px;
  }
  .login-divider::before, .login-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }

  .login-demo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .demo-pill {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 12px; border-radius: 10px; cursor: pointer;
    border: 1px solid var(--border); background: rgba(255,255,255,0.03);
    transition: all 0.2s; font-size: 12px;
  }
  .demo-pill:hover { border-color: var(--teal); background: rgba(10,158,142,0.08); }
  .demo-pill-icon { font-size: 16px; }
  .demo-pill-label { font-weight: 600; color: var(--text); line-height: 1.2; }
  .demo-pill-sub { font-size: 10px; color: var(--muted); }

  .login-error {
    background: rgba(224,82,82,0.1); border: 1px solid rgba(224,82,82,0.3);
    border-radius: 10px; padding: 10px 14px; font-size: 12px; color: var(--red);
    margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
  }
  .login-success {
    background: rgba(61,186,126,0.1); border: 1px solid rgba(61,186,126,0.3);
    border-radius: 10px; padding: 10px 14px; font-size: 12px; color: var(--green);
    margin-bottom: 16px; display: flex; align-items: center; gap: 8px;
  }

  .login-footer { text-align: center; margin-top: 24px; font-size: 11px; color: var(--muted); }
  .login-footer a { color: var(--teal-light); cursor: pointer; }

  /* step indicator */
  .step-dots { display: flex; gap: 6px; justify-content: center; margin-bottom: 24px; }
  .step-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); transition: all 0.3s; }
  .step-dot.active { background: var(--teal-light); width: 24px; border-radius: 4px; }

  /* shake animation for wrong password */
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
  }
  .shake { animation: shake 0.4s ease; }

  /* login mobile handled by main responsive block below */
`;

// ─── MOCK CREDENTIALS ─────────────────────────────────────────────────────────
const ACCOUNTS = {
  admin: [
    { email: "admin@mecure.health", password: "admin123", name: "Dr. Okafor", role: "Chief Medical Officer", avatar: "DO" },
    { email: "dr.sule@mecure.health", password: "sule2026", name: "Dr. Sule", role: "Senior Physician", avatar: "DS" },
  ],
  patient: [
    { email: "aisha@gmail.com", password: "patient123", name: "Aisha Nwosu", role: "Patient · MCR-001", avatar: "AN" },
    { email: "emeka@gmail.com", password: "emeka2026", name: "Emeka Obi", role: "Patient · MCR-002", avatar: "EO" },
  ],
};

// ─── LOGIN PAGE ────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [tab, setTab] = useState("patient"); // "patient" | "admin"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [step, setStep] = useState(1); // 1=email, 2=password

  const handleNext = () => {
    if (!email.trim()) { setError("Please enter your email address."); return; }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) { setError("Enter a valid email address."); return; }
    setError(""); setStep(2);
  };

  const handleBack = () => { setStep(1); setError(""); setPassword(""); };

  const handleLogin = async () => {
    if (!password) { setError("Please enter your password."); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 900));
    const list = ACCOUNTS[tab];
    const found = list.find(a => a.email === email && a.password === password);
    setLoading(false);
    if (found) {
      onLogin({ ...found, type: tab });
    } else {
      setError("Incorrect email or password. Please try again.");
      setShake(true); setTimeout(() => setShake(false), 500);
    }
  };

  const fillDemo = (acc) => {
    setEmail(acc.email); setPassword(acc.password);
    setStep(2); setError("");
  };

  const switchTab = (t) => { setTab(t); setEmail(""); setPassword(""); setStep(1); setError(""); };

  const features = [
    { icon: icons.calendar, title: "Smart Scheduling", text: "Book appointments with your preferred doctors in seconds." },
    { icon: icons.flask, title: "Instant Lab Results", text: "Access your test results securely, notified the moment they're ready." },
    { icon: icons.shield, title: "Private & Encrypted", text: "Your health data is protected with end-to-end encryption." },
  ];

  return (
    <div className="login-root">
      <div className="login-bg" />
      <div className="login-grid-lines" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* LEFT PANEL */}
      <div className="login-left">
        <div className="login-brand">
          <div className="login-logo-circle">M</div>
          <div>
            <div className="login-brand-text">Me<em>cure</em></div>
            <div className="login-brand-tag">Health Management System</div>
          </div>
        </div>

        <div className="login-headline">
          Your health,<strong>intelligently managed.</strong>
        </div>
        <div className="login-subline">
          Mecure brings together patients, doctors, and lab results in one seamless platform — built for modern African healthcare.
        </div>

        <div className="login-features">
          {features.map((f, i) => (
            <div key={i} className="login-feat">
              <div className="login-feat-icon"><Icon d={f.icon} size={18} /></div>
              <div>
                <div className="login-feat-title">{f.title}</div>
                <div className="login-feat-text">{f.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className={`login-card${shake ? " shake" : ""}`}>
          {/* Tab toggle */}
          <div className="login-tab-row">
            <button className={`login-tab${tab === "patient" ? " active" : ""}`} onClick={() => switchTab("patient")}>👤 Patient</button>
            <button className={`login-tab${tab === "admin" ? " active" : ""}`} onClick={() => switchTab("admin")}>⚕ Admin / Doctor</button>
          </div>

          {/* Step dots */}
          <div className="step-dots">
            <div className={`step-dot${step === 1 ? " active" : ""}`} />
            <div className={`step-dot${step === 2 ? " active" : ""}`} />
          </div>

          {step === 1 ? (
            <>
              <div className="login-title">{tab === "patient" ? "Welcome back" : "Staff Portal"}</div>
              <div className="login-sub">{tab === "patient" ? "Sign in to access your health records." : "Authorised personnel only."}</div>

              {error && <div className="login-error">⚠ {error}</div>}

              <div className="login-field">
                <div className="login-label">Email Address</div>
                <div className="login-input-wrap">
                  <input className="login-input"
                    type="email" placeholder={tab === "patient" ? "you@email.com" : "staff@mecure.health"}
                    value={email} onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleNext()}
                    autoFocus />
                  <div className="login-input-icon"><Icon d={icons.users} size={16} /></div>
                </div>
              </div>

              <button className="login-btn" onClick={handleNext}>
                Continue <Icon d={icons.arrow} size={16} />
              </button>

              <div className="login-divider">Quick demo access</div>
              <div className="login-demo-grid">
                {ACCOUNTS[tab].map((a, i) => (
                  <div key={i} className="demo-pill" onClick={() => fillDemo(a)}>
                    <div className="demo-pill-icon">{tab === "admin" ? "👨‍⚕️" : "🧑"}</div>
                    <div>
                      <div className="demo-pill-label">{a.name.split(" ")[0]}</div>
                      <div className="demo-pill-sub">Tap to fill</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(10,158,142,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "var(--teal-light)", flexShrink: 0 }}>
                  {email[0]?.toUpperCase()}
                </div>
                <div>
                  <div className="login-title" style={{ fontSize: 18, marginBottom: 0 }}>Enter password</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{email}</div>
                </div>
              </div>
              <div style={{ marginBottom: 20 }} />

              {error && <div className="login-error">⚠ {error}</div>}

              <div className="login-field">
                <div className="login-label">Password</div>
                <div className="login-input-wrap">
                  <input className="login-input"
                    type={showPw ? "text" : "password"} placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleLogin()}
                    autoFocus />
                  <div className="login-input-icon clickable" onClick={() => setShowPw(!showPw)}>
                    <Icon d={showPw ? "M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" : "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z"} size={16} />
                  </div>
                </div>
              </div>

              <div className="login-row">
                <label className="login-remember">
                  <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
                  Remember me
                </label>
                <div className="login-forgot">Forgot password?</div>
              </div>

              <button className="login-btn" onClick={handleLogin} disabled={loading}>
                {loading ? <><div className="spinner" style={{ borderTopColor: "white" }} /> Signing in...</> : <>Sign In <Icon d={icons.arrow} size={16} /></>}
              </button>

              <div style={{ marginTop: 16, textAlign: "center" }}>
                <span style={{ fontSize: 12, color: "var(--muted)", cursor: "pointer" }} onClick={handleBack}>
                  ← Use a different account
                </span>
              </div>
            </>
          )}

          <div className="login-footer">
            By signing in you agree to Mecure's{" "}
            <a>Terms of Service</a> and <a>Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [auth, setAuth] = useState(null); // null = not logged in
  const [adminPage, setAdminPage] = useState("dashboard");
  const [patientPage, setPatientPage] = useState("home");
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);

  const showToast = (msg, sub) => {
    setToast({ msg, sub });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = (user) => {
    setAuth(user);
    showToast(`Welcome, ${user.name}`, user.role);
  };

  const handleLogout = () => {
    setAuth(null);
    setAdminPage("dashboard");
    setPatientPage("home");
  };

  // Inject viewport meta once
  useEffect(() => {
    if (!document.querySelector('meta[name="viewport"]')) {
      const m = document.createElement("meta");
      m.name = "viewport";
      m.content = "width=device-width, initial-scale=1, viewport-fit=cover";
      document.head.appendChild(m);
    }
  }, []);

  if (!auth) {
    return (
      <>
        <style>{css}</style>
        <LoginPage onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <style>{css}</style>

      {auth.type === "admin"
        ? <AdminApp
            page={adminPage} setPage={setAdminPage}
            showToast={showToast} modal={modal} setModal={setModal}
            user={auth} onLogout={handleLogout}
          />
        : <PatientApp
            page={patientPage} setPage={setPatientPage}
            showToast={showToast} modal={modal} setModal={setModal}
            user={auth} onLogout={handleLogout}
          />}

      {toast && (
        <div className="notif-toast">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(10,158,142,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal-light)", flexShrink: 0 }}>
            <Icon d={icons.check} size={18} />
          </div>
          <div>
            <div className="notif-text">{toast.msg}</div>
            {toast.sub && <div className="notif-sub">{toast.sub}</div>}
          </div>
        </div>
      )}

      {modal && <Modal modal={modal} setModal={setModal} showToast={showToast} />}
    </>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ modal, setModal, showToast }) {
  if (modal.type === "result") {
    const r = modal.data;
    return (
      <div className="modal-overlay" onClick={() => setModal(null)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-title">
            <span>Lab Result — {r.test}</span>
            <div className="icon-btn" onClick={() => setModal(null)}><Icon d={icons.x} size={16} /></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "rgba(10,158,142,0.08)", border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>PATIENT</div>
              <div style={{ fontWeight: 700 }}>{r.patient}</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Result ID: {r.id} • Date: {r.date}</div>
            </div>
            {r.flag && <div style={{ background: "rgba(224,82,82,0.1)", border: "1px solid rgba(224,82,82,0.3)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "var(--red)", display: "flex", alignItems: "center", gap: 8 }}>⚠ Abnormal values detected — physician review required</div>}
            <div className="card card-sm" style={{ background: "var(--navy3)" }}>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>RESULT SUMMARY</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Haemoglobin", "WBC Count", "Platelet Count", "Neutrophils"].map((t, i) => {
                  const vals = ["9.1 g/dL", "7.2 ×10⁹/L", "310 ×10⁹/L", "65%"];
                  const refs = ["12–16", "4–11", "150–400", "40–75"];
                  const flags = [true, false, false, false];
                  return (
                    <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, borderBottom: i < 3 ? "1px solid var(--border)" : "none", paddingBottom: i < 3 ? 8 : 0 }}>
                      <span>{t}</span>
                      <span style={{ color: flags[i] ? "var(--red)" : "var(--green)", fontWeight: 700 }}>{vals[i]} {flags[i] ? "↓" : ""}</span>
                      <span style={{ color: "var(--muted)", fontSize: 11 }}>Ref: {refs[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={() => { setModal(null); showToast("Result released to patient", "Notification sent"); }}>
                <Icon d={icons.check} size={16} /> Release to Patient
              </button>
              <button className="btn-ghost" onClick={() => setModal(null)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (modal.type === "book") {
    return (
      <div className="modal-overlay" onClick={() => setModal(null)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-title">
            <span>Book Appointment</span>
            <div className="icon-btn" onClick={() => setModal(null)}><Icon d={icons.x} size={16} /></div>
          </div>
          <PatientBookForm onClose={() => setModal(null)} showToast={showToast} />
        </div>
      </div>
    );
  }
  return null;
}

// ─── ADMIN APP ────────────────────────────────────────────────────────────────
function AdminApp({ page, setPage, showToast, setModal, user, onLogout }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: icons.home },
    { id: "appointments", label: "Appointments", icon: icons.calendar, badge: 5 },
    { id: "patients", label: "Patients", icon: icons.users },
    { id: "results", label: "Lab Results", icon: icons.flask, badge: 2, badgeType: "red" },
    { id: "analytics", label: "Analytics", icon: icons.chart },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <div className="logo-circle">M</div>
            <div>
              <div className="logo-text">Me<span>cure</span></div>
              <div className="logo-sub">Admin Portal</div>
            </div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">Main</div>
          {navItems.map(n => (
            <div key={n.id} className={`nav-item${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
              <Icon d={n.icon} size={18} />
              <span>{n.label}</span>
              {n.badge && <span className={`nav-badge${n.badgeType ? " " + n.badgeType : ""}`}>{n.badge}</span>}
            </div>
          ))}
          <div className="nav-section-label">System</div>
          <div className="nav-item"><Icon d={icons.bell} size={18} /><span>Notifications</span></div>
          <div className="nav-item"><Icon d={icons.settings} size={18} /><span>Settings</span></div>
        </nav>
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar">{user.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
            <div title="Sign out" onClick={onLogout} style={{ cursor: "pointer", color: "var(--muted)", flexShrink: 0 }}>
              <Icon d={icons.logout} size={16} />
            </div>
          </div>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div className="topbar-title">
              {page === "dashboard" && "Operations Dashboard"}
              {page === "appointments" && "Appointment Manager"}
              {page === "patients" && "Patient Registry"}
              {page === "results" && "Lab Results"}
              {page === "analytics" && "Analytics & Insights"}
            </div>
            <div className="topbar-sub">Saturday, 2 May 2026 · Mecure Health System</div>
          </div>
          <div className="topbar-right">
            <div className="search-bar" style={{ marginBottom: 0, width: 220 }}>
              <Icon d={icons.search} size={16} color="var(--muted)" />
              <input placeholder="Search patients, results..." />
            </div>
            <div className="icon-btn"><Icon d={icons.bell} size={18} /><div className="notif-dot" /></div>
            <div className="icon-btn" onClick={() => showToast("Settings coming soon", "Feature in development")}><Icon d={icons.settings} size={18} /></div>
          </div>
        </div>

        <div className="content">
          {page === "dashboard" && <AdminDashboard showToast={showToast} setModal={setModal} />}
          {page === "appointments" && <AdminAppointments showToast={showToast} />}
          {page === "patients" && <AdminPatients showToast={showToast} />}
          {page === "results" && <AdminResults showToast={showToast} setModal={setModal} />}
          {page === "analytics" && <AdminAnalytics />}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminDashboard({ showToast, setModal }) {
  const bars = [40, 65, 55, 80, 72, 90, 68, 85, 60, 75, 95, 88];
  const today = 6;
  return (
    <>
      <div className="stats-grid">
        {[
          { val: "247", label: "Active Patients", delta: "+12 this week", up: true, color: "teal", icon: icons.users },
          { val: "18", label: "Today's Appointments", delta: "3 pending", up: null, color: "green", icon: icons.calendar },
          { val: "41", label: "Results Pending", delta: "2 flagged", up: null, color: "amber", icon: icons.flask },
          { val: "5", label: "Critical Cases", delta: "+2 since yesterday", up: false, color: "red", icon: icons.heart },
        ].map((s, i) => (
          <div key={i} className={`stat-card ${s.color}`}>
            <div className={`stat-icon ${s.color}`}><Icon d={s.icon} size={20} /></div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-delta${s.up === true ? " up" : s.up === false ? " down" : ""}`}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="three-two">
        <div className="card">
          <div className="section-title">Today's Schedule <span onClick={() => showToast("Full schedule view", "Opening...")}>View All →</span></div>
          {mockAppointments.map((a, i) => (
            <div key={i} className="appt-item">
              <div className="appt-time">{a.time}</div>
              <div className="avatar">{a.patient.split(" ").map(x => x[0]).join("")}</div>
              <div className="appt-info">
                <div className="appt-name">{a.patient}</div>
                <div className="appt-type">{a.type} · {a.doc}</div>
              </div>
              <span className={`badge ${a.status}`}><span className="badge-dot" />{a.status}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="section-title">Patient Activity</div>
            <div className="mini-chart">
              {bars.map((h, i) => (
                <div key={i} className={`bar${i === today ? " active" : ""}`} style={{ height: `${h}%` }} title={`Day ${i + 1}`} />
              ))}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8, textAlign: "center" }}>Last 12 days · visits per day</div>
          </div>
          <div className="card">
            <div className="section-title">Quick Actions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Add New Patient", icon: icons.plus, color: "var(--teal)" },
                { label: "Process Result", icon: icons.flask, color: "var(--amber)" },
                { label: "Schedule Appointment", icon: icons.calendar, color: "var(--green)" },
              ].map((a, i) => (
                <button key={i} className="btn-ghost" style={{ justifyContent: "flex-start", gap: 10, padding: "10px 12px" }}
                  onClick={() => showToast(`${a.label}`, "Action initiated")}>
                  <span style={{ color: a.color }}><Icon d={a.icon} size={16} /></span> {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="section-title">Recent Results <span style={{ color: "var(--red)", fontSize: 11 }}>2 flagged</span></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Patient</th><th>Test</th><th>Date</th><th>Status</th></tr></thead>
              <tbody>
                {mockResults.map((r, i) => (
                  <tr key={i} style={{ cursor: "pointer" }} onClick={() => setModal({ type: "result", data: r })}>
                    <td style={{ fontWeight: 600 }}>{r.patient}</td>
                    <td style={{ color: "var(--muted)" }}>{r.test}</td>
                    <td style={{ color: "var(--muted)" }}>{r.date}</td>
                    <td>
                      <span className={`badge ${r.status}`}>{r.status}</span>
                      {r.flag && <span className="flag-badge">⚠ Flag</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="section-title">Critical Patients</div>
          {mockPatients.filter(p => p.status === "Critical" || p.status === "Pending").map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="avatar">{p.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.condition} · Next: {p.next}</div>
              </div>
              <span className={`badge ${p.status.toLowerCase()}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── ADMIN APPOINTMENTS ───────────────────────────────────────────────────────
function AdminAppointments({ showToast }) {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const [sel, setSel] = useState(2);
  const hasAppt = [3, 7, 8, 10, 14, 15, 17, 22];
  return (
    <div className="two-col">
      <div>
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="section-title">May 2026</div>
          <div className="cal-grid">
            {days.map(d => <div key={d} className="cal-header">{d}</div>)}
            {Array(2).fill(null).map((_, i) => <div key={"e" + i} />)}
            {dates.map(d => (
              <div key={d} className={`cal-day${d === 2 ? " today" : ""}${hasAppt.includes(d) ? " has-appt" : ""}${d === sel ? " selected" : ""}`}
                onClick={() => { setSel(d); showToast(`May ${d} selected`, `${hasAppt.includes(d) ? "Appointments found" : "No appointments"}`); }}>
                {d}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="section-title">Filters</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["All", "Confirmed", "Pending", "Urgent"].map(f => (
              <button key={f} className="btn-ghost" style={{ justifyContent: "flex-start" }}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-title">Appointments — May {sel} <span onClick={() => showToast("Add appointment", "Form opening")}>+ Add New</span></div>
        {mockAppointments.map((a, i) => (
          <div key={i} className="appt-item" style={{ cursor: "pointer" }} onClick={() => showToast(`${a.patient}`, `${a.type} · ${a.time}`)}>
            <div className="appt-time">{a.time}</div>
            <div className="avatar">{a.patient.split(" ").map(x => x[0]).join("")}</div>
            <div className="appt-info">
              <div className="appt-name">{a.patient}</div>
              <div className="appt-type">{a.type} · {a.doc}</div>
            </div>
            <span className={`badge ${a.status}`}><span className="badge-dot" />{a.status}</span>
          </div>
        ))}
        <div style={{ marginTop: 16 }}>
          <button className="btn-primary" style={{ width: "100%" }} onClick={() => showToast("Appointment added", "Notification sent to patient")}>
            <Icon d={icons.plus} size={16} /> Schedule New Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PATIENTS ───────────────────────────────────────────────────────────
function AdminPatients({ showToast }) {
  const [q, setQ] = useState("");
  const filtered = mockPatients.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.condition.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="search-bar">
        <Icon d={icons.search} size={16} color="var(--muted)" />
        <input placeholder="Search by name, condition, ID..." value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Patient</th><th>ID</th><th>Age</th><th>Condition</th><th>Status</th><th>Next Visit</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar">{p.avatar}</div>
                      <span style={{ fontWeight: 600 }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--muted)", fontSize: 12 }}>{p.id}</td>
                  <td style={{ color: "var(--muted)" }}>{p.age}</td>
                  <td>{p.condition}</td>
                  <td><span className={`badge ${p.status.toLowerCase().replace(" ", "-")}`}>{p.status}</span></td>
                  <td style={{ color: "var(--muted)" }}>{p.next}</td>
                  <td>
                    <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => showToast(`${p.name}`, "Profile loaded")}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ─── ADMIN RESULTS ────────────────────────────────────────────────────────────
function AdminResults({ showToast, setModal }) {
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        {[{ label: "All Results", count: 41 }, { label: "Ready", count: 24 }, { label: "Processing", count: 15 }, { label: "Flagged", count: 2 }].map((t, i) => (
          <div key={i} className="card card-sm" style={{ flex: 1, textAlign: "center", cursor: "pointer", border: i === 0 ? "1px solid var(--teal)" : undefined }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: i === 3 ? "var(--red)" : "var(--teal-light)" }}>{t.count}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{t.label}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="section-title">Lab Results Queue</div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Result ID</th><th>Patient</th><th>Test</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {mockResults.map((r, i) => (
                <tr key={i}>
                  <td style={{ fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>{r.id}</td>
                  <td style={{ fontWeight: 600 }}>{r.patient}</td>
                  <td>{r.test}</td>
                  <td style={{ color: "var(--muted)" }}>{r.date}</td>
                  <td>
                    <span className={`badge ${r.status}`}>{r.status}</span>
                    {r.flag && <span className="flag-badge">⚠ Flag</span>}
                  </td>
                  <td>
                    <button className="btn-primary" style={{ padding: "6px 14px", fontSize: 12, boxShadow: "none" }}
                      onClick={() => setModal({ type: "result", data: r })}>Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN ANALYTICS ─────────────────────────────────────────────────────────
function AdminAnalytics() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = [120, 145, 132, 160, 178, 195, 188, 210, 198, 225, 240, 247];
  const max = Math.max(...data);
  return (
    <>
      <div className="stats-grid">
        {[
          { label: "Avg. Consultation Time", val: "18 min", sub: "-2 min vs last month" },
          { label: "Patient Satisfaction", val: "94%", sub: "+3% vs last month" },
          { label: "Result Turnaround", val: "4.2 hrs", sub: "Industry avg: 6 hrs" },
          { label: "Appointments Fulfilled", val: "96%", sub: "4% cancellation rate" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--teal-light)", marginBottom: 4 }}>{s.val}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "var(--green)" }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="section-title">Patient Growth — 2026</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140, marginTop: 16 }}>
          {data.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 9, color: "var(--muted)" }}>{v}</div>
              <div style={{ width: "100%", height: `${(v / max) * 110}px`, background: i === 4 ? "var(--teal-light)" : "rgba(10,158,142,0.3)", borderRadius: "6px 6px 0 0", transition: "height 0.3s" }} />
              <div style={{ fontSize: 9, color: "var(--muted)" }}>{months[i]}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="two-col" style={{ marginTop: 20 }}>
        <div className="card">
          <div className="section-title">Top Services</div>
          {[["Lab Tests", 38], ["Consultations", 29], ["Follow-ups", 21], ["Screenings", 12]].map(([s, p], i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span>{s}</span><span style={{ color: "var(--teal-light)", fontWeight: 600 }}>{p}%</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${p}%`, background: "linear-gradient(90deg, var(--teal), var(--teal-light))", borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">Doctor Performance</div>
          {doctors.map((d, i) => {
            const scores = [96, 93, 91, 88];
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                <div className="avatar" style={{ background: "linear-gradient(135deg, var(--teal-dim), var(--slate))" }}>{d.split(" ")[1][0]}{d.split(" ")[2]?.[0] || ""}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{d}</div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, marginTop: 6 }}>
                    <div style={{ height: "100%", width: `${scores[i]}%`, background: "var(--teal)", borderRadius: 2 }} />
                  </div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--teal-light)" }}>{scores[i]}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── PATIENT APP ──────────────────────────────────────────────────────────────
function PatientApp({ page, setPage, showToast, setModal, user, onLogout }) {
  const navItems = [
    { id: "home", label: "Home", icon: icons.home },
    { id: "book", label: "Book", icon: icons.calendar },
    { id: "results", label: "Results", icon: icons.flask },
    { id: "recommend", label: "Advice", icon: icons.star },
  ];
  return (
    <div className="patient-app">
      <div className="patient-header" style={{ flexWrap: "wrap", gap: 8 }}>
        {/* top row: logo + actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
          <div className="logo-mark">
            <div className="logo-circle" style={{ width: 32, height: 32, fontSize: 16 }}>M</div>
            <div>
              <div className="logo-text" style={{ fontSize: 15 }}>Me<span style={{ color: "var(--teal-light)" }}>cure</span></div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div className="icon-btn"><Icon d={icons.bell} size={18} /><div className="notif-dot" /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px 6px 8px", borderRadius: 10, border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", cursor: "pointer" }} onClick={onLogout} title="Sign out">
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,var(--teal),#066b5f)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0 }}>{user.avatar}</div>
            <span style={{ fontSize: 12, color: "var(--muted)" }}><Icon d={icons.logout} size={14} /></span>
          </div>
        </div>
        {/* nav row — always full width so it wraps cleanly on mobile */}
        <div className="patient-nav" style={{ width: "100%", justifyContent: "space-around" }}>
          {navItems.map(n => (
            <div key={n.id} className={`patient-nav-item${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
              <Icon d={n.icon} size={20} />
              <span>{n.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="patient-content">
        {page === "home" && <PatientHome setPage={setPage} setModal={setModal} showToast={showToast} />}
        {page === "book" && <PatientBook showToast={showToast} />}
        {page === "results" && <PatientResults setModal={setModal} showToast={showToast} />}
        {page === "recommend" && <PatientRecommend showToast={showToast} />}
      </div>
    </div>
  );
}

// ─── PATIENT HOME ─────────────────────────────────────────────────────────────
function PatientHome({ setPage, setModal, showToast }) {
  return (
    <>
      <div className="hero-card">
        <div className="hero-greeting">Good morning,</div>
        <div className="hero-name">Aisha Nwosu</div>
        <div className="hero-id" style={{ color: "var(--muted)", fontSize: 12 }}>Patient ID: MCR-001 · Blood Type: O+</div>
        <div className="hero-stats">
          <div className="hero-stat"><div className="hero-stat-val">3</div><div className="hero-stat-label">Upcoming Visits</div></div>
          <div className="hero-stat"><div className="hero-stat-val">1</div><div className="hero-stat-label">Result Ready</div></div>
          <div className="hero-stat"><div className="hero-stat-val">2</div><div className="hero-stat-label">Prescriptions</div></div>
        </div>
      </div>

      <div className="quick-actions">
        {[
          { icon: icons.calendar, label: "Book Appointment", sub: "Schedule a visit", color: "var(--teal)", bg: "rgba(10,158,142,0.15)", action: () => setPage("book") },
          { icon: icons.flask, label: "View Results", sub: "1 result ready", color: "var(--green)", bg: "rgba(61,186,126,0.15)", action: () => setPage("results") },
          { icon: icons.doc, label: "Request Records", sub: "Medical history", color: "var(--amber)", bg: "rgba(232,169,72,0.15)", action: () => showToast("Records requested", "We'll prepare them within 24 hrs") },
          { icon: icons.star, label: "Get Advice", sub: "Doctor recommendations", color: "#c084fc", bg: "rgba(192,132,252,0.15)", action: () => setPage("recommend") },
        ].map((qa, i) => (
          <div key={i} className="qa-card" onClick={qa.action}>
            <div className="qa-icon" style={{ background: qa.bg, color: qa.color }}>
              <Icon d={qa.icon} size={22} color={qa.color} />
            </div>
            <div className="qa-label">{qa.label}</div>
            <div className="qa-sub">{qa.sub}</div>
          </div>
        ))}
      </div>

      <div className="two-col">
        <div className="card">
          <div className="section-title">Upcoming Appointments</div>
          <div className="timeline">
            {[
              { title: "Follow-up with Dr. Okafor", sub: "May 8 · 09:00 AM · General", dot: "teal" },
              { title: "CBC Panel Lab Test", sub: "May 10 · 11:30 AM · Lab", dot: "green" },
              { title: "Prescription Review", sub: "May 15 · 02:00 PM · General", dot: "muted" },
            ].map((t, i) => (
              <div key={i} className="tl-item">
                <div className={`tl-dot ${t.dot}`}><Icon d={icons.clock} size={14} /></div>
                <div className="tl-text">
                  <div className="tl-title">{t.title}</div>
                  <div className="tl-sub">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={() => setPage("book")}>
            <Icon d={icons.plus} size={16} /> Book New Appointment
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div className="section-title">Health Summary</div>
            {[
              { label: "Blood Pressure", val: "128/82 mmHg", status: "Elevated", color: "var(--amber)" },
              { label: "Blood Glucose", val: "95 mg/dL", status: "Normal", color: "var(--green)" },
              { label: "BMI", val: "24.1", status: "Normal", color: "var(--green)" },
            ].map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{h.label}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{h.val}</div>
                </div>
                <span style={{ fontSize: 11, color: h.color, fontWeight: 600 }}>{h.status}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ background: "linear-gradient(135deg, var(--teal-dim), var(--slate))", borderColor: "var(--teal)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Icon d={icons.shield} size={20} color="var(--teal-light)" />
              <div style={{ fontSize: 13, fontWeight: 700 }}>Privacy Shield</div>
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>Your health data is encrypted and fully private. Only authorised personnel can access your records.</div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── PATIENT BOOK ─────────────────────────────────────────────────────────────
function PatientBook({ showToast }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 13, color: "var(--teal-light)", fontStyle: "italic", marginBottom: 4 }}>Schedule a visit</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>Book an Appointment</div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Choose your preferred doctor, service, and time slot.</div>
      </div>
      <div className="book-section">
        <div className="card">
          <div className="section-title">Appointment Details</div>
          <PatientBookForm showToast={showToast} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card">
            <div className="section-title">Available Doctors</div>
            {doctors.map((d, i) => {
              const specs = ["General Medicine", "Endocrinology", "Cardiology", "Paediatrics"];
              const avail = ["Today, 3 slots", "Tomorrow, 5 slots", "May 8, 4 slots", "May 9, 2 slots"];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none", cursor: "pointer" }}
                  onClick={() => showToast(`${d} selected`, avail[i])}>
                  <div className="avatar">{d.split(" ")[1][0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{d}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{specs[i]}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--green)" }}>{avail[i]}</span>
                </div>
              );
            })}
          </div>
          <div className="card" style={{ background: "rgba(10,158,142,0.06)", borderColor: "var(--teal)" }}>
            <div style={{ fontSize: 12, color: "var(--teal-light)", fontWeight: 600, marginBottom: 6 }}>💡 Tip</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>Book at least 24 hours in advance. For urgent matters, use the emergency line: <strong style={{ color: "var(--text)" }}>+234 123 45678</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientBookForm({ onClose, showToast }) {
  const [form, setForm] = useState({ name: "Aisha Nwosu", service: "", doctor: "", date: "", time: "", notes: "" });
  const times = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const handleSubmit = () => {
    if (!form.service || !form.doctor || !form.date) { showToast("Please fill required fields", "Service, doctor & date needed"); return; }
    showToast("Appointment booked!", `${form.service} with ${form.doctor} on ${form.date}`);
    onClose?.();
  };

  return (
    <>
      <div className="form-group">
        <div className="form-label">Full Name *</div>
        <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="form-group">
        <div className="form-label">Service Type *</div>
        <select className="form-select" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
          <option value="">Select service...</option>
          {services.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-group">
        <div className="form-label">Preferred Doctor *</div>
        <select className="form-select" value={form.doctor} onChange={e => setForm({ ...form, doctor: e.target.value })}>
          <option value="">Select doctor...</option>
          {doctors.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="form-group">
          <div className="form-label">Date *</div>
          <input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
        <div className="form-group">
          <div className="form-label">Time</div>
          <select className="form-select" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}>
            <option value="">Any time</option>
            {times.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <div className="form-label">Symptoms / Notes</div>
        <textarea className="form-input" rows={3} style={{ resize: "vertical" }} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Describe your symptoms or reason for visit..." />
      </div>
      <button className="btn-primary" style={{ width: "100%" }} onClick={handleSubmit}>
        <Icon d={icons.check} size={16} /> Confirm Appointment
      </button>
    </>
  );
}

// ─── PATIENT RESULTS ──────────────────────────────────────────────────────────
function PatientResults({ setModal, showToast }) {
  const myResults = [
    { id: "RES-2041", test: "CBC Panel", date: "Apr 30, 2026", status: "ready", flag: false, desc: "Complete blood count analysis" },
    { id: "RES-2039", test: "Lipid Profile", date: "Apr 15, 2026", status: "ready", flag: false, desc: "Cholesterol & triglycerides" },
    { id: "RES-2035", test: "Urinalysis", date: "Mar 28, 2026", status: "ready", flag: false, desc: "Urine composition analysis" },
  ];
  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 13, color: "var(--teal-light)", fontStyle: "italic", marginBottom: 4 }}>Your laboratory reports</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>Lab Results</div>
      </div>
      <div className="card" style={{ marginBottom: 16, display: "flex", gap: 16, alignItems: "center", background: "linear-gradient(135deg, rgba(10,158,142,0.1), rgba(6,61,56,0.2))", borderColor: "var(--teal)" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(10,158,142,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--teal-light)", flexShrink: 0 }}>
          <Icon d={icons.bell} size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>CBC Panel — Result Available</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Your result from Apr 30 is ready to view. Tap to access.</div>
        </div>
        <button className="btn-primary" style={{ flexShrink: 0 }} onClick={() => setModal({ type: "result", data: mockResults[0] })}>View</button>
      </div>
      {myResults.map((r, i) => (
        <div key={i} className="result-card" onClick={() => setModal({ type: "result", data: { ...r, patient: "Aisha Nwosu" } })}>
          <div className="result-icon" style={{ background: r.status === "ready" ? "rgba(10,158,142,0.15)" : "rgba(120,120,180,0.15)", color: r.status === "ready" ? "var(--teal-light)" : "#aac" }}>
            <Icon d={icons.flask} size={20} />
          </div>
          <div className="result-info">
            <div className="result-name">{r.test} {r.flag && <span className="flag-badge">⚠ Abnormal</span>}</div>
            <div className="result-meta">{r.desc} · {r.date}</div>
          </div>
          <span className={`badge ${r.status}`}><span className="badge-dot" />{r.status}</span>
        </div>
      ))}
      <div style={{ marginTop: 20 }}>
        <button className="btn-ghost" style={{ width: "100%" }} onClick={() => showToast("Request submitted", "Your doctor will prepare the requested records")}>
          <Icon d={icons.doc} size={16} /> Request Additional Records
        </button>
      </div>
    </>
  );
}

// ─── PATIENT RECOMMEND ────────────────────────────────────────────────────────
function PatientRecommend({ showToast }) {
  const recs = [
    { title: "Increase Iron-Rich Food Intake", body: "Based on your recent CBC results, your haemoglobin levels are slightly below the normal range. Include more leafy greens, lean red meat, and beans in your daily diet.", doc: "Dr. Okafor", date: "May 1, 2026", color: "var(--green)" },
    { title: "Blood Pressure Monitoring", body: "Your last reading of 128/82 mmHg is mildly elevated. Monitor your BP twice daily and reduce sodium intake. Avoid caffeine in the evenings.", doc: "Dr. Sule", date: "Apr 28, 2026", color: "var(--amber)" },
    { title: "Continue Antihypertensive Medication", body: "Maintain your current Amlodipine 5mg dose. Do not miss doses. Return in 2 weeks if symptoms worsen.", doc: "Dr. Okafor", date: "Apr 20, 2026", color: "var(--teal-light)" },
  ];
  const [asking, setAsking] = useState(false);
  const [q, setQ] = useState("");
  const [aiResp, setAiResp] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!q.trim()) return;
    setLoading(true); setAiResp("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are a compassionate medical assistant for Mecure Health. Answer patient health questions concisely and clearly. Always advise consulting a doctor for serious concerns. The patient is Aisha Nwosu, a 34-year-old with hypertension and mild anaemia.",
          messages: [{ role: "user", content: q }]
        })
      });
      const data = await res.json();
      setAiResp(data.content?.[0]?.text || "Sorry, I couldn't process that. Please try again.");
    } catch {
      setAiResp("Connection error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 13, color: "var(--teal-light)", fontStyle: "italic", marginBottom: 4 }}>Personalised health guidance</div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>Doctor Recommendations</div>
      </div>

      {/* AI Health Assistant */}
      <div className="card" style={{ marginBottom: 20, border: "1px solid rgba(192,132,252,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(192,132,252,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c084fc" }}>
            <Icon d={icons.star} size={18} color="#c084fc" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>AI Health Assistant</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Ask about your health, medications, or results</div>
          </div>
          <button className="btn-ghost" style={{ marginLeft: "auto", padding: "6px 14px", fontSize: 12, borderColor: "rgba(192,132,252,0.3)", color: "#c084fc" }} onClick={() => setAsking(!asking)}>
            {asking ? "Close" : "Ask a Question"}
          </button>
        </div>
        {asking && (
          <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
            <div className="search-bar" style={{ marginBottom: 0 }}>
              <Icon d={icons.search} size={16} color="var(--muted)" />
              <input placeholder="e.g. What foods help with anaemia?" value={q} onChange={e => setQ(e.target.value)}
                onKeyDown={e => e.key === "Enter" && askAI()} />
            </div>
            <button className="btn-primary" style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }} onClick={askAI} disabled={loading}>
              {loading ? <div className="spinner" /> : <Icon d={icons.arrow} size={16} />}
              {loading ? "Thinking..." : "Get AI Health Advice"}
            </button>
            {aiResp && (
              <div style={{ background: "rgba(192,132,252,0.06)", border: "1px solid rgba(192,132,252,0.2)", borderRadius: 12, padding: 16, fontSize: 13, lineHeight: 1.7, color: "var(--text)", marginTop: 4 }}>
                <div style={{ fontSize: 10, color: "#c084fc", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>AI RESPONSE · FOR GUIDANCE ONLY</div>
                {aiResp}
              </div>
            )}
          </div>
        )}
      </div>

      {recs.map((r, i) => (
        <div key={i} className="rec-card" style={{ borderLeftColor: r.color }}>
          <div className="rec-title">{r.title}</div>
          <div className="rec-body">{r.body}</div>
          <div className="rec-meta">
            <span className="rec-doc">● {r.doc}</span>
            <span className="rec-date">{r.date}</span>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 8, textAlign: "center" }}>
        <button className="btn-ghost" onClick={() => showToast("Appointment booked", "Follow-up with Dr. Okafor on May 8")}>
          Book Follow-up to Discuss Recommendations
        </button>
      </div>
    </>
  );
}
