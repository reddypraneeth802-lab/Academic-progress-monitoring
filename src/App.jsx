```react
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  GraduationCap, Users, BookOpen, Building2, ClipboardCheck, Award,
  BarChart3, Bell, LogOut, Search, Plus, Edit2, Trash2, Eye,
  AlertTriangle, CheckCircle2, UserCheck, FileText, Printer,
  RefreshCw, ChevronRight, Menu, X, Lock, Mail, ArrowRight, Sparkles,
  TrendingUp, TrendingDown, Info, Send, KeyRound, LayoutDashboard,
  QrCode, Upload, History, Sliders, HeartHandshake, Clock,
  Calendar, Video, MapPin, Star, MessageSquare, Palette, ShieldCheck,
  BookMarked, Layers, FolderKanban, Settings as SettingsIcon, UserCog, Phone,
  Camera, ScanLine, ShieldAlert, Radio, CheckCircle, StopCircle, Smartphone, Copy
} from 'lucide-react';

// ============================================================================
// 1. ENTERPRISE THEME TOKENS & INSTITUTIONAL IDENTITY (JOY UNIVERSITY)
// ============================================================================
const UNIVERSITY_INFO = {
  name: 'Joy University',
  tagline: 'Smart Academic Progress Monitoring & Student Performance Analytics System',
  address: 'Raja Nagar, Vadakangulam, Tirunelveli District, Tamil Nadu - 627116, India',
  website: 'https://joyuniversity.edu.in/',
  email: 'registrar@joyuniversity.edu.in',
  phone: '+91 4637 220 100',
  academicYear: '2026-2027'
};

const THEMES = {
  sapphire: {
    id: 'sapphire',
    name: 'Sapphire Slate',
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    primaryLight: '#EFF6FF',
    primaryBorder: '#BFDBFE',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    btnClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/20',
    ringClass: 'focus:ring-blue-500/20 focus:border-blue-600',
    textAccent: 'text-blue-600',
    bgAccentSoft: 'bg-blue-50',
    barFill: '#2563EB'
  },
  emerald: {
    id: 'emerald',
    name: 'Midnight Emerald',
    primary: '#059669',
    primaryHover: '#047857',
    primaryLight: '#ECFDF5',
    primaryBorder: '#A7F3D0',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20',
    ringClass: 'focus:ring-emerald-500/20 focus:border-emerald-600',
    textAccent: 'text-emerald-600',
    bgAccentSoft: 'bg-emerald-50',
    barFill: '#059669'
  }
};

// ============================================================================
// 2. INITIAL RELATIONAL DATABASE (JOY UNIVERSITY DEMO RECORDS)
// ============================================================================
const INITIAL_DATA = {
  departments: [
    { id: 'DEP-CSE', code: 'CSE', name: 'School of Computing & Engineering', hod: 'Dr. R. Subramanian', programs: 'B.Tech CSE, AI & Data Science' },
    { id: 'DEP-ECE', code: 'ECE', name: 'Electronics & Communication Engineering', hod: 'Dr. K. Meenakshi', programs: 'B.Tech ECE, Embedded Systems' },
    { id: 'DEP-MGT', code: 'MGT', name: 'School of Management Studies', hod: 'Dr. S. Aravindhan', programs: 'BBA, MBA Analytics' }
  ],
  courses: [
    { id: 'CRS-01', code: 'BTECH-CSE', name: 'B.Tech Computer Science & Engineering', deptId: 'DEP-CSE', duration: '4 Years', semesters: 8 },
    { id: 'CRS-02', code: 'BTECH-AIDS', name: 'B.Tech Artificial Intelligence & Data Science', deptId: 'DEP-CSE', duration: '4 Years', semesters: 8 },
    { id: 'CRS-03', code: 'BTECH-ECE', name: 'B.Tech Electronics & Communication', deptId: 'DEP-ECE', duration: '4 Years', semesters: 8 },
    { id: 'CRS-04', code: 'BBA-GEN', name: 'Bachelor of Business Administration', deptId: 'DEP-MGT', duration: '3 Years', semesters: 6 }
  ],
  subjects: [
    { id: 'SUB-101', code: 'JUCS501', name: 'Machine Learning & Neural Networks', deptId: 'DEP-CSE', semester: 5, credits: 4, facultyId: 'FAC-01' },
    { id: 'SUB-102', code: 'JUCS502', name: 'Cloud Computing & Distributed Systems', deptId: 'DEP-CSE', semester: 5, credits: 4, facultyId: 'FAC-02' },
    { id: 'SUB-103', code: 'JUCS503', name: 'Database Management Systems Lab', deptId: 'DEP-CSE', semester: 5, credits: 2, facultyId: 'FAC-01' },
    { id: 'SUB-104', code: 'JUEC501', name: 'VLSI Design & Digital Signal Processing', deptId: 'DEP-ECE', semester: 5, credits: 4, facultyId: 'FAC-03' },
    { id: 'SUB-105', code: 'JUMG301', name: 'Financial Analytics & Corporate Strategy', deptId: 'DEP-MGT', semester: 3, credits: 3, facultyId: 'FAC-04' }
  ],
  faculty: [
    { id: 'FAC-01', name: 'Dr. Priya Sundaram', email: 'faculty1@joyuniversity.edu.in', phone: '+91 98421 11001', deptId: 'DEP-CSE', designation: 'Associate Professor', specialization: 'Artificial Intelligence & ML' },
    { id: 'FAC-02', name: 'Prof. Karthik Narayanan', email: 'faculty2@joyuniversity.edu.in', phone: '+91 98421 11002', deptId: 'DEP-CSE', designation: 'Assistant Professor', specialization: 'Cloud & Distributed Systems' },
    { id: 'FAC-03', name: 'Dr. Anitha Rajendran', email: 'faculty3@joyuniversity.edu.in', phone: '+91 98421 11003', deptId: 'DEP-ECE', designation: 'Professor', specialization: 'VLSI & Embedded Systems' },
    { id: 'FAC-04', name: 'Prof. Venkatesh Iyer', email: 'faculty4@joyuniversity.edu.in', phone: '+91 98421 11004', deptId: 'DEP-MGT', designation: 'Associate Professor', specialization: 'Corporate Finance' }
  ],
  students: [
    {
      id: 'STU-01', rollNo: 'JU24CSE001', prn: '202401001', name: 'Aarav Krishnan',
      email: 'student1@joyuniversity.edu.in', phone: '+91 94431 20001',
      deptId: 'DEP-CSE', courseId: 'CRS-01', semester: 5, section: 'A',
      guardianName: 'Mr. R. Krishnan', guardianPhone: '+91 94431 90001', status: 'Active'
    },
    {
      id: 'STU-02', rollNo: 'JU24CSE002', prn: '202401002', name: 'Divya Bharathi',
      email: 'student2@joyuniversity.edu.in', phone: '+91 94431 20002',
      deptId: 'DEP-CSE', courseId: 'CRS-01', semester: 5, section: 'A',
      guardianName: 'Mrs. S. Bharathi', guardianPhone: '+91 94431 90002', status: 'Active'
    },
    {
      id: 'STU-03', rollNo: 'JU24CSE003', prn: '202401003', name: 'Rohan Selvam',
      email: 'student3@joyuniversity.edu.in', phone: '+91 94431 20003',
      deptId: 'DEP-CSE', courseId: 'CRS-01', semester: 5, section: 'A',
      guardianName: 'Mr. M. Selvam', guardianPhone: '+91 94431 90003', status: 'At Risk'
    },
    {
      id: 'STU-04', rollNo: 'JU24CSE004', prn: '202401004', name: 'Meera Nair',
      email: 'student4@joyuniversity.edu.in', phone: '+91 94431 20004',
      deptId: 'DEP-CSE', courseId: 'CRS-02', semester: 5, section: 'B',
      guardianName: 'Dr. V. Nair', guardianPhone: '+91 94431 90004', status: 'Active'
    },
    {
      id: 'STU-05', rollNo: 'JU24ECE005', prn: '202401005', name: 'Sanjay Murugan',
      email: 'student5@joyuniversity.edu.in', phone: '+91 94431 20005',
      deptId: 'DEP-ECE', courseId: 'CRS-03', semester: 5, section: 'A',
      guardianName: 'Mr. P. Murugan', guardianPhone: '+91 94431 90005', status: 'Active'
    },
    {
      id: 'STU-06', rollNo: 'JU24MGT006', prn: '202401006', name: 'Nandini Sharma',
      email: 'student6@joyuniversity.edu.in', phone: '+91 94431 20006',
      deptId: 'DEP-MGT', courseId: 'CRS-04', semester: 3, section: 'A',
      guardianName: 'Mrs. K. Sharma', guardianPhone: '+91 94431 90006', status: 'Active'
    }
  ],
  attendance: [
    // STU-01 (High attendance ~90%)
    { id: 'ATT-1', studentId: 'STU-01', subjectId: 'SUB-101', date: '2026-11-10', status: 'Present', method: 'QR Scan' },
    { id: 'ATT-2', studentId: 'STU-01', subjectId: 'SUB-101', date: '2026-11-11', status: 'Present', method: 'QR Scan' },
    { id: 'ATT-3', studentId: 'STU-01', subjectId: 'SUB-101', date: '2026-11-12', status: 'Present', method: 'Manual' },
    { id: 'ATT-4', studentId: 'STU-01', subjectId: 'SUB-102', date: '2026-11-10', status: 'Present', method: 'QR Scan' },
    { id: 'ATT-5', studentId: 'STU-01', subjectId: 'SUB-102', date: '2026-11-12', status: 'Absent', method: 'Manual' },
    { id: 'ATT-6', studentId: 'STU-01', subjectId: 'SUB-103', date: '2026-11-13', status: 'Present', method: 'QR Scan' },
    // STU-02 (100%)
    { id: 'ATT-7', studentId: 'STU-02', subjectId: 'SUB-101', date: '2026-11-10', status: 'Present', method: 'QR Scan' },
    { id: 'ATT-8', studentId: 'STU-02', subjectId: 'SUB-101', date: '2026-11-11', status: 'Present', method: 'QR Scan' },
    { id: 'ATT-9', studentId: 'STU-02', subjectId: 'SUB-102', date: '2026-11-10', status: 'Present', method: 'QR Scan' },
    // STU-03 (At Risk - Low Attendance < 75%)
    { id: 'ATT-10', studentId: 'STU-03', subjectId: 'SUB-101', date: '2026-11-10', status: 'Absent', method: 'Manual' },
    { id: 'ATT-11', studentId: 'STU-03', subjectId: 'SUB-101', date: '2026-11-11', status: 'Absent', method: 'Manual' },
    { id: 'ATT-12', studentId: 'STU-03', subjectId: 'SUB-101', date: '2026-11-12', status: 'Present', method: 'QR Scan' },
    { id: 'ATT-13', studentId: 'STU-03', subjectId: 'SUB-102', date: '2026-11-10', status: 'Absent', method: 'Manual' },
    // STU-04, STU-05, STU-06
    { id: 'ATT-14', studentId: 'STU-04', subjectId: 'SUB-101', date: '2026-11-10', status: 'Present', method: 'QR Scan' },
    { id: 'ATT-15', studentId: 'STU-04', subjectId: 'SUB-102', date: '2026-11-10', status: 'Present', method: 'QR Scan' },
    { id: 'ATT-16', studentId: 'STU-05', subjectId: 'SUB-104', date: '2026-11-10', status: 'Present', method: 'QR Scan' },
    { id: 'ATT-17', studentId: 'STU-06', subjectId: 'SUB-105', date: '2026-11-10', status: 'Present', method: 'QR Scan' }
  ],
  marks: [
    // Max: IA1 (20), IA2 (20), Assignment (10), Practical (25), Semester (75) -> Total = 150
    { id: 'MRK-1', studentId: 'STU-01', subjectId: 'SUB-101', ia1: 18, ia2: 19, assignment: 9, practical: 23, semesterExam: 66 },
    { id: 'MRK-2', studentId: 'STU-01', subjectId: 'SUB-102', ia1: 16, ia2: 17, assignment: 9, practical: 22, semesterExam: 61 },
    { id: 'MRK-3', studentId: 'STU-01', subjectId: 'SUB-103', ia1: 19, ia2: 18, assignment: 10, practical: 24, semesterExam: 68 },
    { id: 'MRK-4', studentId: 'STU-02', subjectId: 'SUB-101', ia1: 19, ia2: 20, assignment: 10, practical: 24, semesterExam: 71 },
    { id: 'MRK-5', studentId: 'STU-02', subjectId: 'SUB-102', ia1: 18, ia2: 19, assignment: 9, practical: 23, semesterExam: 67 },
    { id: 'MRK-6', studentId: 'STU-03', subjectId: 'SUB-101', ia1: 7, ia2: 6, assignment: 4, practical: 11, semesterExam: 28 },
    { id: 'MRK-7', studentId: 'STU-03', subjectId: 'SUB-102', ia1: 8, ia2: 7, assignment: 5, practical: 12, semesterExam: 30 },
    { id: 'MRK-8', studentId: 'STU-04', subjectId: 'SUB-101', ia1: 17, ia2: 18, assignment: 9, practical: 22, semesterExam: 63 },
    { id: 'MRK-9', studentId: 'STU-05', subjectId: 'SUB-104', ia1: 16, ia2: 17, assignment: 8, practical: 21, semesterExam: 60 },
    { id: 'MRK-10', studentId: 'STU-06', subjectId: 'SUB-105', ia1: 18, ia2: 18, assignment: 9, practical: 22, semesterExam: 65 }
  ],
  ptmMeetings: [
    {
      id: 'PTM-101',
      studentId: 'STU-03',
      facultyId: 'FAC-01',
      guardianName: 'Mr. M. Selvam',
      date: '2026-11-18',
      time: '11:00 AM',
      mode: 'In-Person (Block A, Room 204)',
      meetingLink: '',
      agenda: 'Low Attendance (25%) & Internal Exam 1/2 Performance Review',
      status: 'Scheduled',
      minutes: 'Pending session. Remedial peer-mentoring plan prepared by Dr. Priya Sundaram.'
    },
    {
      id: 'PTM-102',
      studentId: 'STU-01',
      facultyId: 'FAC-01',
      guardianName: 'Mr. R. Krishnan',
      date: '2026-11-12',
      time: '03:30 PM',
      mode: 'Virtual Video Call',
      meetingLink: 'https://meet.joyuniversity.edu.in/ptm-ju24cse001',
      agenda: 'Honors Research Track & Final Semester Project Guidance',
      status: 'Completed',
      minutes: 'Parent apprised of Aarav’s 90% aggregate. Recommended applying for Joy University AI Research Fellowship.'
    }
  ],
  feedbacks: [
    {
      id: 'FB-01',
      studentId: 'STU-01',
      facultyId: 'FAC-01',
      subjectId: 'SUB-101',
      clarity: 5,
      punctuality: 5,
      mentorship: 5,
      practicals: 5,
      materials: 4,
      comment: 'Exceptional real-world intuition in Machine Learning labs and very approachable during doubt-clearing hours.',
      anonymous: false,
      date: '2026-11-10'
    },
    {
      id: 'FB-02',
      studentId: 'STU-02',
      facultyId: 'FAC-01',
      subjectId: 'SUB-101',
      clarity: 5,
      punctuality: 5,
      mentorship: 4,
      practicals: 5,
      materials: 5,
      comment: 'Structured lecture notes and hands-on Python notebooks make complex neural network concepts easy to grasp.',
      anonymous: true,
      date: '2026-11-11'
    },
    {
      id: 'FB-03',
      studentId: 'STU-01',
      facultyId: 'FAC-02',
      subjectId: 'SUB-102',
      clarity: 4,
      punctuality: 5,
      mentorship: 4,
      practicals: 5,
      materials: 4,
      comment: 'Great Kubernetes and cloud architecture demonstrations.',
      anonymous: false,
      date: '2026-11-12'
    }
  ],
  assignments: [
    { id: 'ASN-01', title: 'Backpropagation & Gradient Descent Implementation', subjectId: 'SUB-101', dueDate: '2026-11-22', maxMarks: 10, status: 'Open' },
    { id: 'ASN-02', title: 'Docker Microservices Deployment Report', subjectId: 'SUB-102', dueDate: '2026-11-25', maxMarks: 10, status: 'Open' },
    { id: 'ASN-03', title: 'Normalized University Schema & Indexing', subjectId: 'SUB-103', dueDate: '2026-11-14', maxMarks: 10, status: 'Graded' }
  ],
  notifications: [
    { id: 'NOT-1', title: 'Live QR Attendance Enabled', message: 'Faculty can now project time-bound QR codes in classrooms for instant contactless student check-in.', type: 'info', date: 'Today, 08:15 AM' },
    { id: 'NOT-2', title: 'At-Risk Attendance Warning', message: 'Rohan Selvam (JU24CSE003) has dropped to 25% attendance in JUCS501. PTM scheduled for Nov 18.', type: 'danger', date: 'Yesterday' },
    { id: 'NOT-3', title: 'Internal Examination 2 Marks Published', message: 'All Semester 5 IA-2 scores have been verified and uploaded to the student portal.', type: 'success', date: 'Nov 13, 2026' }
  ],
  counselingLogs: [
    { id: 'CNS-1', studentId: 'STU-03', facultyId: 'FAC-01', date: '2026-11-14', status: 'In Progress', note: 'Conducted 1-on-1 mentoring session. Student had medical absence; assigned peer study partner and extra lab hours.' }
  ]
};

// ============================================================================
// 3. DETERMINISTIC CRISP SVG QR CODE MATRIX GENERATOR
// ============================================================================
function QrMatrixSvg({ value, size = 210, fgColor = '#0B1120' }) {
  // Generates a deterministic, realistic 25x25 QR matrix with 3 finder patterns
  const gridSize = 25;
  const cells = useMemo(() => {
    const matrix = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
    const placeFinder = (r0, c0) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
          const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          matrix[r0 + r][c0 + c] = isOuter || isInner;
        }
      }
    };
    placeFinder(0, 0);
    placeFinder(0, gridSize - 7);
    placeFinder(gridSize - 7, 0);

    // Timing patterns
    for (let i = 8; i < gridSize - 8; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
    }

    // Deterministic hash fill for payload
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const inTopLeft = r < 8 && c < 8;
        const inTopRight = r < 8 && c >= gridSize - 8;
        const inBottomLeft = r >= gridSize - 8 && c < 8;
        if (inTopLeft || inTopRight || inBottomLeft || r === 6 || c === 6) continue;
        const bit = ((hash >>> ((r * 7 + c * 13) % 24)) ^ (r * 31 + c * 17 + value.length)) & 1;
        matrix[r][c] = bit === 1;
      }
    }
    return matrix;
  }, [value]);

  const cellPx = size / (gridSize + 2);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="bg-white rounded-xl p-2 shadow-inner border border-slate-200 mx-auto"
      aria-label={`QR Code for ${value}`}
    >
      <rect width={size} height={size} fill="#FFFFFF" />
      {cells.map((row, r) =>
        row.map((active, c) =>
          active ? (
            <rect
              key={`${r}-${c}`}
              x={(c + 1) * cellPx}
              y={(r + 1) * cellPx}
              width={cellPx}
              height={cellPx}
              fill={fgColor}
              rx={cellPx * 0.15}
            />
          ) : null
        )
      )}
    </svg>
  );
}

// ============================================================================
// 4. HELPER CALCULATIONS (ATTENDANCE, GRADES, SGPA/CGPA, RISK AI)
// ============================================================================
function calculateGrade(pct) {
  if (pct >= 90) return { grade: 'O', points: 10, label: 'Outstanding' };
  if (pct >= 80) return { grade: 'A+', points: 9, label: 'Excellent' };
  if (pct >= 70) return { grade: 'A', points: 8, label: 'Very Good' };
  if (pct >= 60) return { grade: 'B+', points: 7, label: 'Good' };
  if (pct >= 50) return { grade: 'B', points: 6, label: 'Average' };
  if (pct >= 40) return { grade: 'C', points: 5, label: 'Pass' };
  return { grade: 'F', points: 0, label: 'Fail / Reappear' };
}

// ============================================================================
// 5. MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Persistent State
  const [db, setDb] = useState(() => {
    try {
      const saved = localStorage.getItem('joy_university_apms_v2');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('joy_university_apms_v2', JSON.stringify(db));
    } catch {
      // Ignore storage quota errors
    }
  }, [db]);

  // Theme & Auth State
  const [themeKey, setThemeKey] = useState('sapphire');
  const theme = THEMES[themeKey];
  const [currentUser, setCurrentUser] = useState(null); // { role: 'admin'|'faculty'|'student', id, name, email }
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('admin@joyuniversity.edu.in');
  const [loginPass, setLoginPass] = useState('joy@2026');
  const [loginError, setLoginError] = useState('');

  // Live QR Attendance Session State (Shared between Faculty Projector & Student Scanner)
  const [activeQrSession, setActiveQrSession] = useState(() => ({
    token: 'JOY-QR-JUCS501-20261116-8492',
    subjectId: 'SUB-101',
    facultyId: 'FAC-01',
    date: '2026-11-16',
    room: 'Block A - Smart Hall 102',
    expiresAt: Date.now() + 5 * 60 * 1000,
    active: true
  }));
  const [qrSecondsLeft, setQrSecondsLeft] = useState(300);

  // Countdown Timer for Active QR Session
  useEffect(() => {
    const timer = setInterval(() => {
      if (activeQrSession && activeQrSession.active) {
        const diff = Math.max(0, Math.floor((activeQrSession.expiresAt - Date.now()) / 1000));
        setQrSecondsLeft(diff);
        if (diff === 0) {
          setActiveQrSession(prev => ({ ...prev, active: false }));
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [activeQrSession]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ==========================================================================
  // DERIVED ANALYTICS & RISK ENGINE
  // ==========================================================================
  const studentAnalytics = useMemo(() => {
    return db.students.map(stu => {
      const stuAtt = db.attendance.filter(a => a.studentId === stu.id);
      const presentCount = stuAtt.filter(a => a.status === 'Present').length;
      const attendancePct = stuAtt.length > 0 ? Math.round((presentCount / stuAtt.length) * 100) : 100;

      const stuMarks = db.marks.filter(m => m.studentId === stu.id);
      let totalObtained = 0;
      let totalMax = 0;
      let weightedPoints = 0;
      let totalCredits = 0;

      stuMarks.forEach(m => {
        const sub = db.subjects.find(s => s.id === m.subjectId);
        const credits = sub ? sub.credits : 3;
        const obtained = m.ia1 + m.ia2 + m.assignment + m.practical + m.semesterExam;
        const pct = (obtained / 150) * 100;
        const { points } = calculateGrade(pct);
        totalObtained += obtained;
        totalMax += 150;
        weightedPoints += points * credits;
        totalCredits += credits;
      });

      const overallPct = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;
      const sgpa = totalCredits > 0 ? (weightedPoints / totalCredits).toFixed(2) : '0.00';

      // Explainable Risk Classification
      const riskReasons = [];
      if (attendancePct < 75) riskReasons.push(`Low Attendance (${attendancePct}% < 75% threshold)`);
      if (overallPct > 0 && overallPct < 45) riskReasons.push(`Low Aggregate Marks (${overallPct}% < 45%)`);
      const lowInternal = stuMarks.some(m => ((m.ia1 + m.ia2) / 40) * 100 < 40);
      if (lowInternal) riskReasons.push('Internal Assessment score below 40%');

      let standing = 'Excellent Performance';
      if (riskReasons.length > 0) standing = 'At Risk';
      else if (overallPct >= 85 && attendancePct >= 85) standing = 'Excellent Performance';
      else if (overallPct >= 70) standing = 'Good Performance';
      else standing = 'Average Performance';

      return {
        ...stu,
        attendancePct,
        presentCount,
        totalClasses: stuAtt.length,
        overallPct,
        sgpa,
        standing,
        riskReasons
      };
    });
  }, [db]);

  // ==========================================================================
  // AUTHENTICATION HANDLERS
  // ==========================================================================
  const handleQuickLogin = (role) => {
    if (role === 'admin') {
      setCurrentUser({ role: 'admin', id: 'ADM-01', name: 'Dr. M. Balasubramanian (Controller)', email: 'admin@joyuniversity.edu.in' });
      setActiveTab('dashboard');
      showToast('Authenticated as University Administrator');
    } else if (role === 'faculty') {
      const fac = db.faculty[0];
      setCurrentUser({ role: 'faculty', id: fac.id, name: fac.name, email: fac.email });
      setActiveTab('dashboard');
      showToast(`Welcome back, ${fac.name}`);
    } else if (role === 'student') {
      const stu = db.students[0];
      setCurrentUser({ role: 'student', id: stu.id, name: stu.name, email: stu.email });
      setActiveTab('dashboard');
      showToast(`Welcome, ${stu.name} (${stu.rollNo})`);
    } else if (role === 'student_risk') {
      const stu = db.students[2]; // STU-03 Rohan Selvam
      setCurrentUser({ role: 'student', id: stu.id, name: stu.name, email: stu.email });
      setActiveTab('dashboard');
      showToast(`Logged in as ${stu.name} (At-Risk Demo Profile)`, 'warning');
    }
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const cleanEmail = loginEmail.trim().toLowerCase();
    if (cleanEmail === 'admin@joyuniversity.edu.in') {
      handleQuickLogin('admin');
      return;
    }
    const fac = db.faculty.find(f => f.email.toLowerCase() === cleanEmail);
    if (fac) {
      setCurrentUser({ role: 'faculty', id: fac.id, name: fac.name, email: fac.email });
      setActiveTab('dashboard');
      showToast(`Welcome back, ${fac.name}`);
      return;
    }
    const stu = db.students.find(s => s.email.toLowerCase() === cleanEmail);
    if (stu) {
      setCurrentUser({ role: 'student', id: stu.id, name: stu.name, email: stu.email });
      setActiveTab('dashboard');
      showToast(`Welcome, ${stu.name}`);
      return;
    }
    setLoginError('Invalid Joy University credentials. Use one of the quick role sign-in buttons below.');
  };

  // ==========================================================================
  // QR ATTENDANCE RECORDING ACTION (SHARED BY CAMERA SCANNER & MANUAL CODE)
  // ==========================================================================
  const processQrAttendanceScan = (scannedToken, studentIdOverride = null) => {
    const targetStudentId = studentIdOverride || (currentUser?.role === 'student' ? currentUser.id : 'STU-01');
    const student = db.students.find(s => s.id === targetStudentId);

    if (!student) {
      return { ok: false, message: 'Student profile not found in Joy University registry.' };
    }

    if (!activeQrSession || !activeQrSession.active || qrSecondsLeft <= 0) {
      return { ok: false, message: 'This QR Attendance Session has expired. Ask faculty to refresh the QR projector.' };
    }

    if (scannedToken.trim() !== activeQrSession.token) {
      return { ok: false, message: 'Invalid or mismatched QR token. Please scan the live classroom QR code.' };
    }

    // Duplicate check
    const alreadyMarked = db.attendance.some(
      a => a.studentId === targetStudentId && a.subjectId === activeQrSession.subjectId && a.date === activeQrSession.date
    );

    if (alreadyMarked) {
      return {
        ok: false,
        duplicate: true,
        message: `Attendance already recorded for ${student.name} (${student.rollNo}) on ${activeQrSession.date}.`
      };
    }

    const newRecord = {
      id: `ATT-${Date.now()}-${Math.floor(Math.random() * 999)}`,
      studentId: targetStudentId,
      subjectId: activeQrSession.subjectId,
      date: activeQrSession.date,
      status: 'Present',
      method: 'QR Scan',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setDb(prev => ({
      ...prev,
      attendance: [newRecord, ...prev.attendance]
    }));

    const subj = db.subjects.find(s => s.id === activeQrSession.subjectId);
    showToast(`Verified QR Check-in: ${student.name} marked Present for ${subj?.code || 'Class'}`);
    return {
      ok: true,
      record: newRecord,
      student,
      subject: subj,
      message: `Attendance verified and recorded for ${student.name} (${student.rollNo})!`
    };
  };

  // ==========================================================================
  // NAVIGATION MENU CONFIGURATION BY ROLE
  // ==========================================================================
  const navItems = useMemo(() => {
    if (!currentUser) return [];
    const role = currentUser.role;
    const all = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'faculty', 'student'] },
      { id: 'qr-attendance', label: role === 'student' ? 'Scan Attendance QR' : 'Live QR Projector', icon: QrCode, roles: ['admin', 'faculty', 'student'], highlight: true },
      { id: 'attendance', label: 'Attendance Register', icon: ClipboardCheck, roles: ['admin', 'faculty', 'student'] },
      { id: 'students', label: 'Student Management', icon: Users, roles: ['admin', 'faculty'] },
      { id: 'faculty', label: 'Faculty Management', icon: UserCheck, roles: ['admin'] },
      { id: 'departments', label: 'Departments & Courses', icon: Building2, roles: ['admin'] },
      { id: 'subjects', label: 'Subjects & Credits', icon: BookOpen, roles: ['admin', 'faculty'] },
      { id: 'marks', label: 'Marks & Examinations', icon: Award, roles: ['admin', 'faculty', 'student'] },
      { id: 'analytics', label: 'Academic Analytics', icon: BarChart3, roles: ['admin', 'faculty', 'student'] },
      { id: 'at-risk', label: 'At-Risk & Counseling', icon: AlertTriangle, roles: ['admin', 'faculty'] },
      { id: 'ptm', label: 'Parent-Faculty Meetings', icon: HeartHandshake, roles: ['admin', 'faculty', 'student'] },
      { id: 'feedback', label: role === 'student' ? 'Faculty Feedback' : 'Course Evaluations', icon: Star, roles: ['admin', 'faculty', 'student'] },
      { id: 'assignments', label: 'Assignments', icon: FolderKanban, roles: ['admin', 'faculty', 'student'] },
      { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['admin', 'faculty', 'student'] },
      { id: 'reports', label: 'Reports & Transcripts', icon: FileText, roles: ['admin', 'faculty', 'student'] },
      { id: 'settings', label: 'Settings & Theme', icon: SettingsIcon, roles: ['admin', 'faculty', 'student'] }
    ];
    return all.filter(item => item.roles.includes(role));
  }, [currentUser]);

  // ==========================================================================
  // RENDER LOGIN PORTAL IF NOT AUTHENTICATED
  // ==========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans text-slate-800">
        {/* Top Institutional Banner */}
        <header className="bg-[#0B1120] text-white border-b border-slate-800 px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold tracking-tight text-white">JOY UNIVERSITY</h1>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    ERP Portal
                  </span>
                </div>
                <p className="text-xs text-slate-400">Raja Nagar, Vadakangulam, Tirunelveli District, Tamil Nadu</p>
              </div>
            </div>
            <a
              href={UNIVERSITY_INFO.website}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-2 rounded-lg border border-slate-700 transition"
            >
              <span>joyuniversity.edu.in</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Main Login Split Container */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 bg-white rounded-2xl shadow-xl shadow-slate-200/70 border border-slate-200 overflow-hidden">
            {/* Left Institutional Showcase Panel */}
            <div className="lg:col-span-5 bg-[#0B1120] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-blue-600/20 blur-2xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 bg-blue-950/80 border border-blue-800/70 px-3 py-1 rounded-full mb-5">
                  <Sparkles className="w-3.5 h-3.5" /> Academic Year {UNIVERSITY_INFO.academicYear}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-4">
                  Smart Academic Progress &amp; Performance Analytics
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Unified university platform for real-time QR classroom attendance, continuous internal evaluation, SGPA/CGPA analytics, Parent-Faculty coordination, and AI-assisted student mentorship.
                </p>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <QrCode className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Live Classroom QR Projector &amp; Instant Mobile Check-in</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Parent-Faculty Meeting (PTM) Scheduler &amp; Minutes</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <Star className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>360° Course &amp; Faculty Evaluation Analytics</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8 mt-8 border-t border-slate-800 text-[11px] text-slate-400">
                <p className="font-medium text-slate-300">Demonstration Environment Notice</p>
                <p className="mt-0.5">Sample student, faculty, and course datasets are preloaded for evaluation.</p>
              </div>
            </div>

            {/* Right Login & Quick Role Selector */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">Sign in to University Portal</h3>
                <p className="text-sm text-slate-500 mt-1">Enter your institutional email or select a verified role below.</p>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleFormLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Institutional Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      placeholder="name@joyuniversity.edu.in"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={loginPass}
                      onChange={e => setLoginPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-2"
                >
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* One-Click Demo Role Access */}
              <div className="mt-7 pt-6 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Instant One-Click Role Access (Demo)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('admin')}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Admin Portal</div>
                      <div className="text-[11px] text-slate-500">Controller &amp; Full ERP</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('faculty')}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-left transition group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Faculty Portal</div>
                      <div className="text-[11px] text-slate-500">QR Projector, Marks &amp; PTM</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('student')}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-left transition group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Student (Aarav)</div>
                      <div className="text-[11px] text-slate-500">QR Scanner &amp; SGPA 9.1</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('student_risk')}
                    className="flex items-center gap-3 p-3 rounded-xl border border-amber-200 bg-amber-50/40 hover:border-amber-400 text-left transition group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Student (At-Risk)</div>
                      <div className="text-[11px] text-amber-700">Rohan • Low Attendance Demo</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-200 bg-white">
          © {new Date().getFullYear()} Joy University, Vadakangulam, Tirunelveli District, Tamil Nadu. All Rights Reserved.
        </footer>
      </div>
    );
  }

  // ==========================================================================
  // AUTHENTICATED SHELL (DEEP SLATE NAVY SIDEBAR + COOL ALABASTER WORKSPACE)
  // ==========================================================================
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-[#0B1120] text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          {toast.type === 'danger' ? (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="text-xs font-medium leading-snug">{toast.message}</span>
        </div>
      )}

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 z-30 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-68 bg-[#0B1120] text-slate-300 flex flex-col border-r border-slate-800/90 transition-transform duration-200 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* University Header in Sidebar */}
        <div className="p-5 border-b border-slate-800/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"
              style={{ backgroundColor: theme.primary }}
            >
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-wide">JOY UNIVERSITY</div>
              <div className="text-[11px] text-slate-400">Vadakangulam • ERP</div>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
                style={isActive ? { backgroundColor: theme.primary } : undefined}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </span>
                {item.highlight && !isActive && (
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-slate-800/90 bg-slate-950/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">{currentUser.role}</div>
            </div>
          </div>
          <button
            onClick={() => setCurrentUser(null)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800/90 hover:bg-red-600/90 text-slate-200 hover:text-white text-xs font-medium transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 capitalize">
                {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Joy University • Raja Nagar, Vadakangulam, Tirunelveli
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Quick QR Action Button */}
            <button
              onClick={() => setActiveTab('qr-attendance')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${theme.btnClass}`}
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">
                {currentUser.role === 'student' ? 'Scan Class QR' : 'Project Attendance QR'}
              </span>
            </button>

            {/* Theme Switcher Pill */}
            <button
              onClick={() => setThemeKey(prev => (prev === 'sapphire' ? 'emerald' : 'sapphire'))}
              title="Switch Enterprise Accent Theme"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: theme.primary }} />
              <span className="hidden md:inline">{theme.name}</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        {/* Dynamic Module View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'dashboard' && (
            <DashboardView
              currentUser={currentUser}
              db={db}
              studentAnalytics={studentAnalytics}
              theme={theme}
              setActiveTab={setActiveTab}
              activeQrSession={activeQrSession}
              qrSecondsLeft={qrSecondsLeft}
            />
          )}

          {activeTab === 'qr-attendance' && (
            <QrAttendanceModule
              currentUser={currentUser}
              db={db}
              theme={theme}
              activeQrSession={activeQrSession}
              setActiveQrSession={setActiveQrSession}
              qrSecondsLeft={qrSecondsLeft}
              processQrAttendanceScan={processQrAttendanceScan}
              showToast={showToast}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceRegisterModule
              currentUser={currentUser}
              db={db}
              setDb={setDb}
              studentAnalytics={studentAnalytics}
              theme={theme}
              showToast={showToast}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'students' && (
            <StudentManagementModule
              db={db}
              setDb={setDb}
              studentAnalytics={studentAnalytics}
              theme={theme}
              showToast={showToast}
              isAdmin={currentUser.role === 'admin'}
            />
          )}

          {activeTab === 'faculty' && (
            <FacultyManagementModule
              db={db}
              setDb={setDb}
              theme={theme}
              showToast={showToast}
            />
          )}

          {activeTab === 'departments' && (
            <DepartmentsCoursesModule
              db={db}
              setDb={setDb}
              theme={theme}
              showToast={showToast}
            />
          )}

          {activeTab === 'subjects' && (
            <SubjectsModule
              db={db}
              setDb={setDb}
              theme={theme}
              showToast={showToast}
              isAdmin={currentUser.role === 'admin'}
            />
          )}

          {activeTab === 'marks' && (
            <MarksManagementModule
              currentUser={currentUser}
              db={db}
              setDb={setDb}
              theme={theme}
              showToast={showToast}
            />
          )}

          {activeTab === 'analytics' && (
            <AcademicAnalyticsModule
              currentUser={currentUser}
              db={db}
              studentAnalytics={studentAnalytics}
              theme={theme}
            />
          )}

          {activeTab === 'at-risk' && (
            <AtRiskCounselingModule
              currentUser={currentUser}
              db={db}
              setDb={setDb}
              studentAnalytics={studentAnalytics}
              theme={theme}
              showToast={showToast}
            />
          )}

          {activeTab === 'ptm' && (
            <ParentFacultyMeetingModule
              currentUser={currentUser}
              db={db}
              setDb={setDb}
              theme={theme}
              showToast={showToast}
            />
          )}

          {activeTab === 'feedback' && (
            <FacultyFeedbackModule
              currentUser={currentUser}
              db={db}
              setDb={setDb}
              theme={theme}
              showToast={showToast}
            />
          )}

          {activeTab === 'assignments' && (
            <AssignmentsModule
              currentUser={currentUser}
              db={db}
              setDb={setDb}
              theme={theme}
              showToast={showToast}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsModule
              currentUser={currentUser}
              db={db}
              setDb={setDb}
              theme={theme}
              showToast={showToast}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsTranscriptModule
              currentUser={currentUser}
              db={db}
              studentAnalytics={studentAnalytics}
              theme={theme}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsModule
              themeKey={themeKey}
              setThemeKey={setThemeKey}
              theme={theme}
              onResetDemo={() => {
                setDb(INITIAL_DATA);
                localStorage.removeItem('joy_university_apms_v2');
                showToast('Joy University demonstration database restored to defaults.');
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// 6. MODULE 1: ROLE-BASED ENTERPRISE DASHBOARD
// ============================================================================
function DashboardView({ currentUser, db, studentAnalytics, theme, setActiveTab, activeQrSession, qrSecondsLeft }) {
  const avgAttendance = useMemo(() => {
    if (!studentAnalytics.length) return 0;
    return Math.round(studentAnalytics.reduce((acc, s) => acc + s.attendancePct, 0) / studentAnalytics.length);
  }, [studentAnalytics]);

  const avgMarks = useMemo(() => {
    if (!studentAnalytics.length) return 0;
    return Math.round(studentAnalytics.reduce((acc, s) => acc + s.overallPct, 0) / studentAnalytics.length);
  }, [studentAnalytics]);

  const atRiskStudents = studentAnalytics.filter(s => s.standing === 'At Risk');

  if (currentUser.role === 'student') {
    const me = studentAnalytics.find(s => s.id === currentUser.id) || studentAnalytics[0];
    const myMarks = db.marks.filter(m => m.studentId === me.id);
    const myPtms = db.ptmMeetings.filter(p => p.studentId === me.id);

    return (
      <div className="space-y-6">
        {/* Welcome Hero Banner */}
        <div className="bg-[#0B1120] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-blue-200">
                {me.rollNo} • Semester {me.semester}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  me.standing === 'At Risk' ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {me.standing}
              </span>
            </div>
            <h1 className="text-2xl font-bold">Welcome back, {me.name}</h1>
            <p className="text-sm text-slate-300 mt-1">
              {db.departments.find(d => d.id === me.deptId)?.name} • Joy University
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('qr-attendance')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${theme.btnClass}`}
            >
              <Camera className="w-4 h-4" />
              <span>Scan Classroom QR</span>
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white flex items-center gap-2 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Download Transcript</span>
            </button>
          </div>
        </div>

        {/* Risk Alert Banner if flagged */}
        {me.riskReasons.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-red-900">Academic Support Alert</h4>
              <p className="text-xs text-red-700 mt-0.5">
                Flagged reasons: {me.riskReasons.join(' • ')}. Please review your Parent-Faculty Meeting schedule and attend remedial hours.
              </p>
            </div>
          </div>
        )}

        {/* Student KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Attendance Rate" value={`${me.attendancePct}%`} subtitle={`${me.presentCount}/${me.totalClasses} classes attended`} icon={ClipboardCheck} color={me.attendancePct < 75 ? '#DC2626' : theme.primary} />
          <StatCard title="Current SGPA" value={me.sgpa} subtitle="10-Point Credit Scale" icon={Award} color={theme.primary} />
          <StatCard title="Overall Aggregate" value={`${me.overallPct}%`} subtitle={`${myMarks.length} Evaluated Subjects`} icon={TrendingUp} color="#059669" />
          <StatCard title="Upcoming PTMs" value={myPtms.length} subtitle="Guardian Consultations" icon={HeartHandshake} color="#7C3AED" />
        </div>

        {/* Subject Performance Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900">Subject-Wise Academic Progress</h3>
            <button onClick={() => setActiveTab('marks')} className={`text-xs font-semibold ${theme.textAccent} hover:underline`}>
              View Full Marksheet →
            </button>
          </div>
          <div className="space-y-4">
            {myMarks.map(m => {
              const sub = db.subjects.find(s => s.id === m.subjectId);
              const total = m.ia1 + m.ia2 + m.assignment + m.practical + m.semesterExam;
              const pct = Math.round((total / 150) * 100);
              const { grade } = calculateGrade(pct);
              return (
                <div key={m.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-bold text-slate-900">{sub?.code} — {sub?.name}</span>
                      <span className="ml-2 text-[11px] text-slate-500">({sub?.credits} Credits)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{total}/150 ({pct}%)</span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-white border border-slate-200 text-slate-900">
                        Grade {grade}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: pct < 45 ? '#DC2626' : theme.primary }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ADMIN & FACULTY ENTERPRISE DASHBOARD
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Enrolled Students" value={db.students.length} subtitle="Across 3 University Schools" icon={Users} color={theme.primary} />
        <StatCard title="Faculty Members" value={db.faculty.length} subtitle={`${db.subjects.length} Active Subjects`} icon={UserCheck} color="#4F46E5" />
        <StatCard title="Avg. Attendance" value={`${avgAttendance}%`} subtitle="QR + Manual Registers" icon={ClipboardCheck} color="#059669" />
        <StatCard title="Students At Risk" value={atRiskStudents.length} subtitle="Below 75% Att. or 45% Marks" icon={AlertTriangle} color="#DC2626" />
      </div>

      {/* Live QR Status & Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active QR Classroom Projector Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                {activeQrSession?.active ? 'QR Session Live' : 'QR Standby'}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-500">
                {Math.floor(qrSecondsLeft / 60)}:{String(qrSecondsLeft % 60).padStart(2, '0')} left
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Classroom QR Attendance</h3>
            <p className="text-xs text-slate-500 mt-1">
              {db.subjects.find(s => s.id === activeQrSession?.subjectId)?.name} • {activeQrSession?.room}
            </p>
            <div className="my-4">
              <QrMatrixSvg value={activeQrSession?.token || 'JOY-QR'} size={150} fgColor="#0B1120" />
            </div>
          </div>
          <button
            onClick={() => setActiveTab('qr-attendance')}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 ${theme.btnClass}`}
          >
            <QrCode className="w-4 h-4" />
            <span>Open Full-Screen QR Projector</span>
          </button>
        </div>

        {/* Department Performance & At-Risk Overview */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Academic Standing &amp; Risk Monitor</h3>
                <p className="text-xs text-slate-500">Real-time student cohort classification ({avgMarks}% university average)</p>
              </div>
              <button
                onClick={() => setActiveTab('at-risk')}
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Manage Interventions →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                    <th className="py-2.5 pr-3">Student</th>
                    <th className="py-2.5 px-3">Attendance</th>
                    <th className="py-2.5 px-3">Aggregate</th>
                    <th className="py-2.5 pl-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {studentAnalytics.map(stu => (
                    <tr key={stu.id} className="hover:bg-slate-50/80">
                      <td className="py-3 pr-3">
                        <div className="font-semibold text-slate-900">{stu.name}</div>
                        <div className="text-[11px] text-slate-500">{stu.rollNo}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${stu.attendancePct}%`,
                                backgroundColor: stu.attendancePct < 75 ? '#DC2626' : '#059669'
                              }}
                            />
                          </div>
                          <span className={`font-semibold ${stu.attendancePct < 75 ? 'text-red-600' : 'text-slate-700'}`}>
                            {stu.attendancePct}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{stu.overallPct}% (SGPA {stu.sgpa})</td>
                      <td className="py-3 pl-3 text-right">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            stu.standing === 'At Risk'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : stu.standing === 'Excellent Performance'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          