// @ts-nocheck
import React, { useState, useMemo, useEffect, useRef } from 'react';

// === ZERO-INSTALL ICONS (MOCK LUCIDE WITH FONTAWESOME) ===
const Upload = ({className}) => <i className={`fa-solid fa-upload ${className}`}></i>;
const FileSpreadsheet = ({className}) => <i className={`fa-solid fa-file-excel ${className}`}></i>;
const CheckCircle = ({className}) => <i className={`fa-solid fa-circle-check ${className}`}></i>;
const XCircle = ({className}) => <i className={`fa-solid fa-circle-xmark ${className}`}></i>;
const AlertTriangle = ({className}) => <i className={`fa-solid fa-triangle-exclamation ${className}`}></i>;
const Search = ({className}) => <i className={`fa-solid fa-magnifying-glass ${className}`}></i>;
const DollarSign = ({className}) => <i className={`fa-solid fa-dollar-sign ${className}`}></i>;
const Users = ({className}) => <i className={`fa-solid fa-users ${className}`}></i>;
const Loader2 = ({className}) => <i className={`fa-solid fa-spinner fa-spin ${className}`}></i>;
const Database = ({className}) => <i className={`fa-solid fa-database ${className}`}></i>;
const Download = ({className}) => <i className={`fa-solid fa-download ${className}`}></i>;
const RefreshCw = ({className}) => <i className={`fa-solid fa-arrows-rotate ${className}`}></i>;
const FileText = ({className}) => <i className={`fa-solid fa-file-lines ${className}`}></i>;
const Settings = ({className}) => <i className={`fa-solid fa-gear ${className}`}></i>;
const Filter = ({className}) => <i className={`fa-solid fa-filter ${className}`}></i>;
const CalendarIcon = ({className}) => <i className={`fa-solid fa-calendar ${className}`}></i>;
const CalendarDays = ({className}) => <i className={`fa-solid fa-calendar-days ${className}`}></i>;
const CloudDownload = ({className}) => <i className={`fa-solid fa-cloud-arrow-down ${className}`}></i>;
const LayoutDashboard = ({className}) => <i className={`fa-solid fa-chart-pie ${className}`}></i>;
const AlertOctagon = ({className}) => <i className={`fa-solid fa-circle-exclamation ${className}`}></i>;
const Wallet = ({className}) => <i className={`fa-solid fa-wallet ${className}`}></i>;
const PlusCircle = ({className}) => <i className={`fa-solid fa-circle-plus ${className}`}></i>;
const Eye = ({className}) => <i className={`fa-solid fa-eye ${className}`}></i>;
const Menu = ({className}) => <i className={`fa-solid fa-bars ${className}`}></i>;
const X = ({className}) => <i className={`fa-solid fa-xmark ${className}`}></i>;
const ArrowUpDown = ({className}) => <i className={`fa-solid fa-arrows-up-down ${className}`}></i>;
const MapPin = ({className}) => <i className={`fa-solid fa-location-dot ${className}`}></i>;
const Store = ({className}) => <i className={`fa-solid fa-store ${className}`}></i>;
const CreditCard = ({className}) => <i className={`fa-solid fa-credit-card ${className}`}></i>;
const Phone = ({className}) => <i className={`fa-solid fa-phone ${className}`}></i>;
const Home = ({className}) => <i className={`fa-solid fa-house ${className}`}></i>;
const Contact = ({className}) => <i className={`fa-solid fa-address-book ${className}`}></i>;
const Pencil = ({className}) => <i className={`fa-solid fa-pen ${className}`}></i>;
const MapIcon = ({className}) => <i className={`fa-solid fa-map ${className}`}></i>;
const Navigation = ({className}) => <i className={`fa-solid fa-location-arrow ${className}`}></i>;
const Crosshair = ({className}) => <i className={`fa-solid fa-crosshairs ${className}`}></i>;
const MapPinOff = ({className}) => <i className={`fa-solid fa-location-dot opacity-50 ${className}`}></i>;
const Trash2 = ({className}) => <i className={`fa-solid fa-trash ${className}`}></i>;
const Camera = ({className}) => <i className={`fa-solid fa-camera ${className}`}></i>;
const ImageIcon = ({className}) => <i className={`fa-solid fa-image ${className}`}></i>;
const Info = ({className}) => <i className={`fa-solid fa-circle-info ${className}`}></i>;
const Lock = ({className}) => <i className={`fa-solid fa-lock ${className}`}></i>;
const Mail = ({className}) => <i className={`fa-solid fa-envelope ${className}`}></i>;
const LogOut = ({className}) => <i className={`fa-solid fa-right-from-bracket ${className}`}></i>;
const ShieldAlert = ({className}) => <i className={`fa-solid fa-shield-halved ${className}`}></i>;
const UserCog = ({className}) => <i className={`fa-solid fa-users-gear ${className}`}></i>;
const UserPlus = ({className}) => <i className={`fa-solid fa-user-plus ${className}`}></i>;

// === FIREBASE IMPORTS ===
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, getDoc, onSnapshot } from 'firebase/firestore';

// === FIREBASE CONFIGURATION ===
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
  apiKey: "AIzaSyAs-wRAoCydkFYSvv9h6MrTXcl7o2gisJY",
  authDomain: "pelaku-usaha.firebaseapp.com",
  projectId: "pelaku-usaha",
  storageBucket: "pelaku-usaha.firebasestorage.app",
  messagingSenderId: "1065543308691",
  appId: "1:1065543308691:web:46ae59e9dd9f92a3f60466"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
const secondaryAuth = getAuth(secondaryApp);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'ragunan-autodebet-app';

const defaultHolidays = {
  "2026-01-01": { type: "LIBUR", name: "Tahun Baru 2026" }, "2026-03-19": { type: "LIBUR", name: "Hari Suci Nyepi" },
  "2026-03-21": { type: "LIBUR", name: "Idul Fitri" }, "2026-03-22": { type: "LIBUR", name: "Idul Fitri" },
  "2026-04-03": { type: "LIBUR", name: "Wafat Yesus Kristus" }, "2026-05-01": { type: "LIBUR", name: "Hari Buruh" },
  "2026-05-14": { type: "LIBUR", name: "Kenaikan Yesus Kristus" }, "2026-05-27": { type: "LIBUR", name: "Idul Adha" },
  "2026-08-17": { type: "LIBUR", name: "HUT RI" }, "2026-12-25": { type: "LIBUR", name: "Natal" }
};

export default function App() {

  // === FUNGSI UBAH TITLE & FAVICON OTOMATIS ===
  useEffect(() => {
    document.title = "SiDagangTerpadu";
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect x="8" y="28" width="48" height="22" fill="#0f172a" rx="4"/>
        <rect x="12" y="10" width="40" height="18" fill="#3b82f6" rx="2"/>
        <circle cx="20" cy="56" r="6" fill="#334155"/>
        <circle cx="44" cy="56" r="6" fill="#334155"/>
        <text x="32" y="44" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#f8fafc" text-anchor="middle">TMR</text>
        <path d="M 6 28 L 12 10" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
        <path d="M 58 28 L 52 10" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
    const iconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgIcon)}`;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.getElementsByTagName('head')[0].appendChild(link); }
    link.href = iconUrl;
  }, []);

  const [firebaseUser, setFirebaseUser] = useState(null); 
  const [appUser, setAppUser] = useState(null); 
  const [userRole, setUserRole] = useState(null); 
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [merchants, setMerchants] = useState([]);
  const [systemUsers, setSystemUsers] = useState([]); 
  const [isDbLoading, setIsDbLoading] = useState(true);

  const formatRp = (angka) => {
    if (angka === undefined || angka === null || isNaN(angka)) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, message: '', onConfirm: null });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 4000);
  };

  const requestConfirm = (message, actionFn) => {
    setConfirmDialog({ show: true, message, onConfirm: () => { actionFn(); setConfirmDialog({show:false}); } });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser);
      if (currentUser && currentUser.email) {
        try {
          const roleDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'user_roles', currentUser.email.toLowerCase());
          const roleSnap = await getDoc(roleDocRef);
          let determinedRole = 'petugas';
          if (roleSnap.exists()) determinedRole = roleSnap.data().role;
          else if (currentUser.email.toLowerCase().includes('admin')) {
             determinedRole = 'admin';
             await setDoc(roleDocRef, { email: currentUser.email.toLowerCase(), role: 'admin', createdAt: new Date().toISOString() });
          }
          setAppUser({ email: currentUser.email, role: determinedRole });
          setUserRole(determinedRole);
          setActiveMenu(determinedRole === 'admin' ? 'dashboard' : 'peta');
        } catch (error) { console.error(error); }
      } else { setAppUser(null); setUserRole(null); }
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      showToast("Berhasil masuk!", "success");
    } catch (error) { showToast("Email atau password salah.", "error"); }
    finally { setIsLoggingIn(false); }
  };

  const handleLogout = () => requestConfirm("Anda yakin ingin keluar?", async () => { await signOut(auth); });

  useEffect(() => {
    if (!firebaseUser || !appUser) return;
    setIsDbLoading(true);
    const unsubMerchants = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan'), (snapshot) => {
      const data = []; snapshot.forEach(doc => data.push(doc.data()));
      setMerchants(data); setIsDbLoading(false);
    });
    let unsubUsers = () => {};
    if (appUser.role === 'admin') {
       unsubUsers = onSnapshot(collection(db, 'artifacts', appId, 'public', 'data', 'user_roles'), (snapshot) => {
          const uData = []; snapshot.forEach(doc => uData.push(doc.data())); setSystemUsers(uData);
       });
    }
    return () => { unsubMerchants(); unsubUsers(); };
  }, [firebaseUser, appUser]);

  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKategoriDashboard, setFilterKategoriDashboard] = useState('Semua');
  const [filterLokasi, setFilterLokasi] = useState('Semua');
  const [filterJenisUsaha, setFilterJenisUsaha] = useState('Semua');
  const [showOnlyArrears, setShowOnlyArrears] = useState(false);
  const [importKategori, setImportKategori] = useState('PKL');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMerchant, setNewMerchant] = useState({ accountId: '', nama: '', keterangan: '', jenisUsaha: '', kategori: 'PKL', tipeTarif: 'HARIAN_FULL', rekeningSumber: '', nik: '', alamatRumah: '', noHp: '', lat: '', lng: '', fotoLapak: '' });
  const [selectedMerchant, setSelectedMerchant] = useState(null); // UNTUK MODAL HISTORI
  const [editModal, setEditModal] = useState({ isOpen: false, data: null });
  const [isCompressing, setIsCompressing] = useState(false);
  const [newUserReg, setNewUserReg] = useState({ email: '', password: '', role: 'petugas' });
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [specialDates, setSpecialDates] = useState(defaultHolidays);
  const [calMonth, setCalMonth] = useState(new Date().getMonth() + 1); 
  const [calYear, setCalYear] = useState(new Date().getFullYear()); 
  const [isSyncing, setIsSyncing] = useState(false);
  const [calendarModal, setCalendarModal] = useState({ isOpen: false, dateStr: '', day: '', type: 'NORMAL', name: '' });
  const [selectedZone, setSelectedZone] = useState('SEMUA AREA');
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const userMarkerRef = useRef(null);
  const watchIdRef = useRef(null);
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const [isFetchingGps, setIsFetchingGps] = useState(false);

  const [formGenerate, setFormGenerate] = useState({
    kategoriExport: 'Semua', periode: `${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`, keterangan3: 'MAKANAN/MINUMAN',
    jenisTagihan: 'TAG PED', deskripsi: 'TAGIHAN PEDAGANG', tglMulaiBayar: new Date().toISOString().split('T')[0],
    tglJatuhTempo: '20', jenisRekTujuan: 'GIRO KONVEN', rekTujuan: '40142900127', kodePlan: 'TMR01', defaultEmail: 'ebahislamiyah05@gmail.com'
  });
  const [defaultTagihanInput, setDefaultTagihanInput] = useState(285000);
  const [lastRekonReport, setLastRekonReport] = useState(null);
  const [isXlsxLoaded, setIsXlsxLoaded] = useState(false);

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image(); img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas'); const MAX = 600; let w = img.width, h = img.height;
          if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } } else { if (h > MAX) { w *= MAX / h; h = MAX; } }
          canvas.width = w; canvas.height = h; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.6));
        };
      };
      reader.onerror = (e) => reject(e);
    });
  };

  const handlePhotoUpload = async (e, mode) => {
    const file = e.target.files[0]; if (!file) return; setIsCompressing(true);
    try {
      const res = await compressImage(file);
      if (mode === 'ADD') setNewMerchant(p => ({ ...p, fotoLapak: res }));
      else setEditModal(p => ({ ...p, data: { ...p.data, fotoLapak: res } }));
    } catch (err) { showToast("Gagal memproses foto.", "error"); }
    finally { setIsCompressing(false); }
  };

  useEffect(() => {
    if (!document.getElementById('fa-cdn')) {
      const l = document.createElement('link'); l.id = 'fa-cdn'; l.rel = 'stylesheet'; l.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'; document.head.appendChild(l);
    }
    if (!window.XLSX) {
      const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'; s.onload = () => setIsXlsxLoaded(true); document.body.appendChild(s);
    } else setIsXlsxLoaded(true);
    if (!window.L) {
      const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(l);
      const s = document.createElement('script'); s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; s.onload = () => setIsLeafletLoaded(true); document.body.appendChild(s);
    } else setIsLeafletLoaded(true);
  }, []);

  useEffect(() => {
    if (activeMenu === 'peta' && isLeafletLoaded) {
      if (!mapRef.current) {
         mapRef.current = window.L.map('ragunan-map', { zoomControl: false, minZoom: 15 }).setView([-6.311545, 106.820067], 16);
         window.L.control.zoom({ position: 'bottomleft' }).addTo(mapRef.current);
         window.L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 21, attribution: '© Google Maps' }).addTo(mapRef.current);
      }
    } else if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }
  }, [activeMenu, isLeafletLoaded]);

  // === FIX: MAP POPUP DENGAN FOTO & DATA RINGKAS ===
  useEffect(() => {
    if (activeMenu !== 'peta' || !mapRef.current || !isLeafletLoaded) return;
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    merchants.forEach(m => {
      if (m.lat && m.lng && (selectedZone === 'SEMUA AREA' || String(m.keterangan).toUpperCase().includes(selectedZone.replace('PINTU ', '').replace('AREA ', '')))) {
        const isNunggak = m.totalTunggakan > 0;
        const iconHtml = `<div class="w-6 h-6 rounded-full shadow-lg border-2 border-white flex items-center justify-center ${isNunggak ? 'bg-red-500' : 'bg-emerald-500'} transition-all hover:scale-125"></div>`;
        const marker = window.L.marker([m.lat, m.lng], { icon: window.L.divIcon({ html: iconHtml, className: '', iconSize: [24, 24] }) }).addTo(mapRef.current);
        
        const content = `
          <div style="font-family: sans-serif; width: 180px;">
            ${m.fotoLapak ? `<img src="${m.fotoLapak}" style="width:100%; height:100px; object-fit:cover; border-radius:8px; margin-bottom:8px;"/>` : `<div style="height:60px; background:#f1f5f9; border-radius:8px; display:flex; align-items:center; justify-center; font-size:10px; color:#94a3b8; margin-bottom:8px; text-align:center;">Foto Lapak Belum Ada</div>`}
            <h4 style="margin:0; font-weight:800; font-size:13px; color:#1e293b;">${m.nama}</h4>
            <p style="margin:2px 0; font-size:10px; font-weight:bold; color:#3b82f6;">${m.accountId}</p>
            <p style="margin:2px 0; font-size:10px; color:#64748b;">${m.keterangan}</p>
            <div style="margin-top:8px; padding:6px; border-radius:6px; background:${isNunggak ? '#fef2f2' : '#ecfdf5'}; border:1px solid ${isNunggak ? '#fecaca' : '#a7f3d0'};">
               <p style="margin:0; font-size:10px; font-weight:bold; color:${isNunggak ? '#dc2626' : '#059669'};">
                 ${isNunggak ? `Hutang: ${formatRp(m.totalTunggakan)}` : '✓ Lunas'}
               </p>
            </div>
          </div>
        `;
        marker.bindPopup(content);
        markersRef.current[m.uid] = marker;
      }
    });
  }, [merchants, activeMenu, isLeafletLoaded, selectedZone]);

  const flyToMerchantOnMap = (m) => {
    if (mapRef.current && m.lat && m.lng) {
       mapRef.current.flyTo([m.lat, m.lng], 19, { animate: true });
       if (markersRef.current[m.uid]) setTimeout(() => markersRef.current[m.uid].openPopup(), 1000);
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan', editModal.data.uid), editModal.data);
      setEditModal({ isOpen: false, data: null });
      showToast("Data berhasil diperbarui ke Cloud.", "success");
    } catch (e) { showToast("Gagal update.", "error"); }
  };

  const dashboardStats = useMemo(() => {
    const target = filterKategoriDashboard === 'Semua' ? merchants : merchants.filter(m => m.kategori === filterKategoriDashboard);
    const nunggak = target.filter(m => m.totalTunggakan > 0);
    return { totalUang: nunggak.reduce((s, m) => s + m.totalTunggakan, 0), totalOrang: nunggak.length };
  }, [merchants, filterKategoriDashboard]);

  const filteredMerchants = useMemo(() => {
    return merchants.filter(m => {
      const matchSearch = m.nama.toLowerCase().includes(searchTerm.toLowerCase()) || m.accountId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchKat = filterKategoriDashboard === 'Semua' || m.kategori === filterKategoriDashboard;
      return matchSearch && matchKat;
    });
  }, [merchants, searchTerm, filterKategoriDashboard]);

  return (
    <>
      {toast.show && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 ${toast.type==='error'?'bg-red-600':'bg-emerald-600'} text-white font-bold text-sm`}>
          {toast.message}
        </div>
      )}

      {confirmDialog.show && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
           <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4">Konfirmasi</h3>
              <p className="text-slate-600 text-sm mb-6">{confirmDialog.message}</p>
              <div className="flex gap-3 justify-end">
                 <button onClick={() => setConfirmDialog({show: false})} className="px-4 py-2 bg-slate-100 rounded-lg font-bold">Batal</button>
                 <button onClick={confirmDialog.onConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold">Ya</button>
              </div>
           </div>
         </div>
      )}

      {!appUser ? (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
           <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
              <h1 className="text-2xl font-black text-center mb-6">SiDagangTerpadu Login</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                 <input type="email" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Email"/>
                 <input type="password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full p-3 border rounded-xl" placeholder="Password"/>
                 <button type="submit" disabled={isLoggingIn} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl">{isLoggingIn ? "Masuk..." : "Login"}</button>
              </form>
           </div>
        </div>
      ) : (
        <div className="min-h-screen flex bg-slate-50 font-sans">
            {/* SIDEBAR */}
            <div className="w-72 bg-slate-900 text-white flex flex-col p-6 space-y-6">
               <h1 className="text-xl font-black flex items-center gap-2"><Database className="text-blue-400"/> SIM-TMR</h1>
               <nav className="flex-1 space-y-2">
                 <button onClick={() => setActiveMenu('dashboard')} className={`w-full text-left px-4 py-3 rounded-xl font-bold ${activeMenu==='dashboard'?'bg-blue-600':'hover:bg-slate-800'}`}>Dashboard</button>
                 <button onClick={() => setActiveMenu('peta')} className={`w-full text-left px-4 py-3 rounded-xl font-bold ${activeMenu==='peta'?'bg-blue-600':'hover:bg-slate-800'}`}>Peta Sebaran</button>
                 <button onClick={() => setActiveMenu('kelola-data')} className={`w-full text-left px-4 py-3 rounded-xl font-bold ${activeMenu==='kelola-data'?'bg-blue-600':'hover:bg-slate-800'}`}>Master Data</button>
               </nav>
               <button onClick={handleLogout} className="bg-red-500/10 text-red-400 p-3 rounded-xl font-bold border border-red-500/20">Keluar</button>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
               <header className="bg-white p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-black uppercase">{activeMenu.replace('-', ' ')}</h2>
                  <div className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-widest">{appUser.email}</div>
               </header>

               <main className="flex-1 overflow-y-auto p-8">
                  {activeMenu === 'dashboard' && (
                    <div className="space-y-6">
                       <div className="grid grid-cols-3 gap-6">
                          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-red-500">
                             <p className="text-xs font-bold text-slate-400 uppercase">Total Hutang</p>
                             <p className="text-2xl font-black">{formatRp(dashboardStats.totalUang)}</p>
                          </div>
                          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-blue-500">
                             <p className="text-xs font-bold text-slate-400 uppercase">Pencarian</p>
                             <input type="text" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} className="w-full mt-2 p-2 border rounded-lg text-sm" placeholder="Cari..."/>
                          </div>
                       </div>

                       <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                          <table className="w-full text-sm">
                             <thead className="bg-slate-50 border-b">
                                <tr>
                                   <th className="p-4 text-left">Nama Pedagang</th>
                                   <th className="p-4 text-left">Lokasi</th>
                                   <th className="p-4 text-left">Total Hutang</th>
                                   <th className="p-4 text-center">Aksi</th>
                                </tr>
                             </thead>
                             <tbody>
                                {filteredMerchants.map((m, i) => (
                                   <tr key={i} className="border-b hover:bg-slate-50">
                                      <td className="p-4 font-bold">{m.nama}</td>
                                      <td className="p-4 text-slate-500">{m.keterangan}</td>
                                      <td className="p-4 font-black text-red-600">{formatRp(m.totalTunggakan)}</td>
                                      <td className="p-4 text-center">
                                         <button onClick={() => setSelectedMerchant(m)} className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold text-xs">Histori</button>
                                      </td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>
                    </div>
                  )}

                  {activeMenu === 'peta' && (
                    <div className="h-full flex flex-col gap-4">
                       <div className="flex gap-4">
                          <select value={selectedZone} onChange={e=>setSelectedZone(e.target.value)} className="p-2 border rounded-lg font-bold text-sm bg-white outline-none">
                             <option value="SEMUA AREA">Semua Area</option>
                             <option value="UTARA">Pintu Utara</option>
                             <option value="SELATAN">Pintu Selatan</option>
                          </select>
                       </div>
                       <div id="ragunan-map" className="flex-1 rounded-3xl border shadow-lg overflow-hidden"></div>
                    </div>
                  )}

                  {activeMenu === 'kelola-data' && (
                    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                       <table className="w-full text-sm">
                          <thead className="bg-slate-50 border-b">
                             <tr>
                                <th className="p-4 text-left">Pedagang</th>
                                <th className="p-4 text-left">Kontak</th>
                                <th className="p-4 text-center">Aksi</th>
                             </tr>
                          </thead>
                          <tbody>
                             {filteredMerchants.map((m, i) => (
                                <tr key={i} className="border-b">
                                   <td className="p-4">
                                      <div className="font-bold">{m.nama}</div>
                                      <div className="text-[10px] text-slate-400">{m.accountId}</div>
                                   </td>
                                   <td className="p-4 text-slate-500">{m.noHp}</td>
                                   <td className="p-4 text-center">
                                      <button onClick={() => setEditModal({ isOpen: true, data: m })} className="text-blue-600 font-bold">Edit</button>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                  )}
               </main>
            </div>

            {/* FIX: MODAL HISTORI (DIBUAT BERFUNGSI) */}
            {selectedMerchant && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[80vh]">
                   <div className="p-6 border-b flex justify-between items-center bg-slate-50 rounded-t-3xl">
                      <div>
                         <h3 className="text-xl font-black text-slate-800">Detail Histori Tagihan</h3>
                         <p className="text-xs text-slate-500 font-bold">{selectedMerchant.nama} (${selectedMerchant.accountId})</p>
                      </div>
                      <button onClick={() => setSelectedMerchant(null)} className="text-slate-400 hover:text-slate-600"><XCircle/></button>
                   </div>
                   <div className="p-6 overflow-y-auto">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                         <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                            <p className="text-[10px] font-bold text-emerald-600 uppercase">Status Terakhir</p>
                            <p className="text-lg font-black text-emerald-800">{selectedMerchant.statusTerakhir || 'Aktif'}</p>
                         </div>
                         <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                            <p className="text-[10px] font-bold text-red-600 uppercase">Tunggakan Saat Ini</p>
                            <p className="text-lg font-black text-red-800">{formatRp(selectedMerchant.totalTunggakan)}</p>
                         </div>
                      </div>

                      <div className="border rounded-2xl overflow-hidden">
                         <table className="w-full text-xs">
                            <thead className="bg-slate-100 text-slate-600 font-bold">
                               <tr>
                                  <th className="p-3 text-left">Periode</th>
                                  <th className="p-3 text-left">Tagihan</th>
                                  <th className="p-3 text-left">Bayar</th>
                                  <th className="p-3 text-center">Status</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y">
                               {(!selectedMerchant.riwayatTagihan || selectedMerchant.riwayatTagihan.length === 0) ? (
                                  <tr><td colSpan="4" className="p-10 text-center text-slate-400 italic">Belum ada catatan transaksi.</td></tr>
                               ) : (
                                  selectedMerchant.riwayatTagihan.map((r, i) => (
                                     <tr key={i} className="hover:bg-slate-50">
                                        <td className="p-3 font-bold">{r.periode}</td>
                                        <td className="p-3 font-bold">{formatRp(r.nominalTagihan)}</td>
                                        <td className="p-3 font-bold text-emerald-600">{formatRp(r.nominalBayar)}</td>
                                        <td className="p-3 text-center">
                                           <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${r.status==='LUNAS'?'bg-emerald-100 text-emerald-700':'bg-red-100 text-red-700'}`}>{r.status}</span>
                                        </td>
                                     </tr>
                                  ))
                               )}
                            </tbody>
                         </table>
                      </div>
                   </div>
                   <div className="p-4 bg-slate-50 text-center rounded-b-3xl">
                      <button onClick={() => setSelectedMerchant(null)} className="px-8 py-2 bg-slate-800 text-white rounded-xl font-bold text-sm">Tutup Histori</button>
                   </div>
                </div>
              </div>
            )}

            {/* MODAL EDIT DATA */}
            {editModal.isOpen && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                 <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl">
                    <form onSubmit={handleEditSave} className="p-6 space-y-4">
                       <h3 className="text-xl font-black">Edit Profil Pedagang</h3>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="text-xs font-bold text-slate-500">Nama</label>
                             <input type="text" value={editModal.data.nama} disabled={userRole==='petugas'} onChange={e=>setEditModal({isOpen:true, data:{...editModal.data, nama:e.target.value}})} className="w-full p-2 border rounded-lg text-sm"/>
                          </div>
                          <div>
                             <label className="text-xs font-bold text-slate-500">ID Account</label>
                             <input type="text" value={editModal.data.accountId} disabled className="w-full p-2 border rounded-lg text-sm bg-slate-50"/>
                          </div>
                       </div>
                       <div>
                          <label className="text-xs font-bold text-slate-500">Update Foto Lapak</label>
                          <input type="file" accept="image/*" capture="environment" onChange={e=>handlePhotoUpload(e, 'EDIT')} className="w-full p-2 border rounded-lg text-sm"/>
                          {editModal.data.fotoLapak && <img src={editModal.data.fotoLapak} className="mt-2 h-24 rounded-lg border"/>}
                       </div>
                       <div className="flex gap-2 pt-4">
                          <button type="button" onClick={()=>setEditModal({isOpen:false})} className="flex-1 bg-slate-100 py-3 rounded-xl font-bold">Batal</button>
                          <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold">Simpan Perubahan</button>
                       </div>
                    </form>
                 </div>
              </div>
            )}
        </div>
      )}
    </>
  );
}
