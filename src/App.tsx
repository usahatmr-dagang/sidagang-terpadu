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
const RouteIcon = ({className}) => <i className={`fa-solid fa-route ${className}`}></i>;
const PersonWalking = ({className}) => <i className={`fa-solid fa-person-walking ${className}`}></i>;
const ChevronDown = ({className}) => <i className={`fa-solid fa-chevron-down ${className}`}></i>;
const ChevronUp = ({className}) => <i className={`fa-solid fa-chevron-up ${className}`}></i>;
const ExternalLink = ({className}) => <i className={`fa-solid fa-arrow-up-right-from-square ${className}`}></i>;

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

// Inisialisasi App Utama
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Inisialisasi App Kedua
const secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
const secondaryAuth = getAuth(secondaryApp);

const appId = typeof __app_id !== 'undefined' ? __app_id : 'ragunan-autodebet-app';

const defaultHolidays = {
  "2026-01-01": { type: "LIBUR", name: "Tahun Baru Masehi" }, "2026-03-19": { type: "LIBUR", name: "Hari Suci Nyepi" },
  "2026-03-20": { type: "LIBUR", name: "Idul Fitri" }, "2026-03-21": { type: "LIBUR", name: "Idul Fitri" },
  "2026-04-03": { type: "LIBUR", name: "Wafat Yesus Kristus" }, "2026-05-01": { type: "LIBUR", name: "Hari Buruh" },
  "2026-05-14": { type: "LIBUR", name: "Kenaikan Yesus Kristus" }, "2026-05-27": { type: "LIBUR", name: "Idul Adha" },
  "2026-08-17": { type: "LIBUR", name: "HUT RI" }, "2026-12-25": { type: "LIBUR", name: "Natal" }
};

export default function App() {

  useEffect(() => {
    document.title = "SiDagangTerpadu";
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect x="8" y="28" width="48" height="22" fill="#0f172a" rx="4"/>
        <rect x="12" y="10" width="40" height="18" fill="#3b82f6" rx="2"/>
        <circle cx="20" cy="56" r="6" fill="#334155"/>
        <circle cx="44" cy="56" r="6" fill="#334155"/>
        <circle cx="20" cy="56" r="2" fill="#cbd5e1"/>
        <circle cx="44" cy="56" r="2" fill="#cbd5e1"/>
        <text x="32" y="44" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#f8fafc" text-anchor="middle">TMR</text>
        <path d="M 6 28 L 12 10" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
        <path d="M 58 28 L 52 10" stroke="#0f172a" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `;
    const iconUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgIcon)}`;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link'); link.rel = 'icon'; document.getElementsByTagName('head')[0].appendChild(link);
    }
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
    setToast({ show: true, message, type }); setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 4000);
  };

  const requestConfirm = (message, actionFn) => {
    setConfirmDialog({ show: true, message, onConfirm: () => { actionFn(); setConfirmDialog({show:false}); } });
  };

  // === FITUR AUTO LOGOUT JIKA TIDAK ADA AKTIVITAS (10 MENIT) ===
  useEffect(() => {
    let timeoutId;
    const INACTIVITY_TIME = 10 * 60 * 1000;

    const handleInactivityLogout = async () => {
      if (auth.currentUser) {
        await signOut(auth);
        setToast({ show: true, message: 'Sesi Anda telah berakhir secara otomatis karena tidak ada aktivitas selama 10 menit.', type: 'info' });
        setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 6000);
      }
    };

    const resetInactivityTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleInactivityLogout, INACTIVITY_TIME);
    };

    if (appUser) {
      resetInactivityTimeout();
      const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart'];
      events.forEach(event => window.addEventListener(event, resetInactivityTimeout));
      return () => {
        clearTimeout(timeoutId);
        events.forEach(event => window.removeEventListener(event, resetInactivityTimeout));
      };
    }
  }, [appUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setFirebaseUser(currentUser);
      if (currentUser && currentUser.email) {
        try {
          const roleDocRef = doc(db, 'artifacts', appId, 'public', 'data', 'user_roles', currentUser.email.toLowerCase());
          const roleSnap = await getDoc(roleDocRef);
          let determinedRole = 'petugas';
          
          if (roleSnap.exists()) {
             determinedRole = roleSnap.data().role;
          } else {
             if (currentUser.email.toLowerCase().includes('admin')) {
                determinedRole = 'admin';
                await setDoc(roleDocRef, { email: currentUser.email.toLowerCase(), role: 'admin', createdAt: new Date().toISOString() });
             } else {
                await setDoc(roleDocRef, { email: currentUser.email.toLowerCase(), role: 'petugas', createdAt: new Date().toISOString() });
             }
          }
          
          setAppUser({ email: currentUser.email, role: determinedRole });
          setUserRole(determinedRole);
          if (determinedRole === 'admin') setActiveMenu('dashboard'); else setActiveMenu('peta');

        } catch (error) { showToast("Terjadi kesalahan saat memuat hak akses.", "error"); }
      } else {
        setAppUser(null); setUserRole(null);
      }
      setIsAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return showToast("Email dan Password wajib diisi.", "error");
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      showToast("Berhasil masuk ke sistem!", "success"); setLoginPassword('');
    } catch (error) {
      let errMsg = "Email atau password salah.";
      if (error.code === 'auth/user-not-found') errMsg = "Akun tidak ditemukan.";
      if (error.code === 'auth/wrong-password') errMsg = "Password yang Anda masukkan salah.";
      if (error.code === 'auth/invalid-credential') errMsg = "Email atau Password tidak valid.";
      if (error.code === 'auth/too-many-requests') errMsg = "Terlalu banyak percobaan. Coba lagi nanti.";
      showToast(errMsg, "error");
    } finally { setIsLoggingIn(false); }
  };

  const handleLogout = async () => {
    requestConfirm("Anda yakin ingin keluar dari sistem aplikasi?", async () => {
      await signOut(auth); showToast("Sesi telah diakhiri. Berhasil keluar.", "info");
    });
  };

  useEffect(() => {
    if (!firebaseUser || !appUser) { setMerchants([]); setSystemUsers([]); return; }
    setIsDbLoading(true);
    
    const merchantsRef = collection(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan');
    const unsubMerchants = onSnapshot(merchantsRef, (snapshot) => {
      const data = []; snapshot.forEach(doc => data.push(doc.data()));
      setMerchants(data); setIsDbLoading(false);
    }, (error) => { showToast("Gagal memuat data pedagang.", "error"); setIsDbLoading(false); });

    let unsubUsers = () => {};
    if (appUser.role === 'admin') {
       const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'user_roles');
       unsubUsers = onSnapshot(usersRef, (snapshot) => {
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
  const [selectedMerchant, setSelectedMerchant] = useState(null);
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
  const routeLayerRef = useRef(null); 
  
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const [isFetchingGps, setIsFetchingGps] = useState(false);
  const [selectedMapMerchant, setSelectedMapMerchant] = useState(null);
  const [isMapPopupMinimized, setIsMapPopupMinimized] = useState(false); // State untuk fitur minimize popup peta
  
  const [routeInfo, setRouteInfo] = useState(null); 
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);

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
          const canvas = document.createElement('canvas'); const MAX_WIDTH = 600; const MAX_HEIGHT = 600;
          let width = img.width; let height = img.height;
          if (width > height) { if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; } } else { if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; } }
          canvas.width = width; canvas.height = height; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0, width, height); resolve(canvas.toDataURL('image/jpeg', 0.6));
        };
      }; reader.onerror = (error) => reject(error);
    });
  };

  const handlePhotoUpload = async (e, mode) => {
    const file = e.target.files[0]; if (!file) return;
    if (file.size > 5 * 1024 * 1024) { showToast("Peringatan: Ukuran file terlalu besar, kompresi memakan waktu.", "info"); }
    try {
      setIsCompressing(true); const compressedBase64 = await compressImage(file);
      if (mode === 'ADD') setNewMerchant(prev => ({ ...prev, fotoLapak: compressedBase64 }));
      else setEditModal(prev => ({ ...prev, data: { ...prev.data, fotoLapak: compressedBase64 } }));
    } catch (err) { showToast("Gagal memproses foto.", "error"); } finally { setIsCompressing(false); }
  };

  const hapusFoto = (mode) => {
    if (mode === 'ADD') setNewMerchant(prev => ({ ...prev, fotoLapak: '' }));
    else setEditModal(prev => ({ ...prev, data: { ...prev.data, fotoLapak: '' } }));
  };

  useEffect(() => {
    if (!document.getElementById('fa-cdn')) { const linkFA = document.createElement('link'); linkFA.id = 'fa-cdn'; linkFA.rel = 'stylesheet'; linkFA.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'; document.head.appendChild(linkFA); }
    if (window.XLSX) { setIsXlsxLoaded(true); } else { const scriptXlsx = document.createElement('script'); scriptXlsx.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'; scriptXlsx.onload = () => setIsXlsxLoaded(true); document.body.appendChild(scriptXlsx); }
    if (window.L) { setIsLeafletLoaded(true); } else { const linkLeaflet = document.createElement('link'); linkLeaflet.rel = 'stylesheet'; linkLeaflet.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(linkLeaflet); const scriptLeaflet = document.createElement('script'); scriptLeaflet.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; scriptLeaflet.onload = () => setIsLeafletLoaded(true); document.body.appendChild(scriptLeaflet); }
  }, []);

  // INIT LEAFLET MAP
  useEffect(() => {
    if (activeMenu === 'peta' && isLeafletLoaded) {
      const initTimeout = setTimeout(() => {
        if (!mapRef.current && document.getElementById('ragunan-map')) {
           const ragunanBounds = window.L.latLngBounds([ [-6.325000, 106.810000], [-6.295000, 106.835000] ]);
           mapRef.current = window.L.map('ragunan-map', { zoomControl: false, maxBounds: ragunanBounds, maxBoundsViscosity: 1.0, minZoom: 15 }).setView([-6.311545, 106.820067], 16);
           window.L.control.zoom({ position: 'bottomleft' }).addTo(mapRef.current);
           const tileOptions = { maxZoom: 21, minZoom: 15, keepBuffer: 4, updateWhenIdle: true, updateWhenZooming: false };
           const mapStandard = window.L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { ...tileOptions, attribution: '© Google Maps' });
           const mapSatelit = window.L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', { ...tileOptions, attribution: '© Google Maps (Satelit)' });
           mapStandard.addTo(mapRef.current);
           window.L.control.layers({ "🗺️ Peta Standar": mapStandard, "🌍 Satelit": mapSatelit }, null, { position: 'bottomright' }).addTo(mapRef.current);
           setTimeout(() => { if(mapRef.current) mapRef.current.invalidateSize(); }, 400);
        }
      }, 100);
      return () => clearTimeout(initTimeout);
    } else {
      if (mapRef.current) {
         if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
         setIsTrackingLocation(false); mapRef.current.remove(); mapRef.current = null; userMarkerRef.current = null; setSelectedMapMerchant(null); routeLayerRef.current = null; setRouteInfo(null);
      }
    }
  }, [activeMenu, isLeafletLoaded]);

  // Hapus rute jika popup diclose dan reset status minimize
  useEffect(() => {
    if (!selectedMapMerchant) {
        if (routeLayerRef.current && mapRef.current) {
            mapRef.current.removeLayer(routeLayerRef.current);
            routeLayerRef.current = null;
        }
        setRouteInfo(null);
        setIsMapPopupMinimized(false);
    } else {
        // Reset minimize saat pilih pedagang baru
        setIsMapPopupMinimized(false);
    }
  }, [selectedMapMerchant]);

  // RENDER PINS KE PETA (DENGAN ANIMASI BIP-BIP)
  useEffect(() => {
    if (activeMenu !== 'peta' || !mapRef.current || !isLeafletLoaded) return;
    
    const renderTimeout = setTimeout(() => {
      Object.values(markersRef.current).forEach(m => m.remove());
      markersRef.current = {};

      merchants.forEach(m => {
        if (m.lat && m.lng && (selectedZone === 'SEMUA AREA' || String(m.keterangan).toUpperCase().includes(selectedZone.replace('PINTU ', '').replace('AREA ', '')))) {
          const isNunggak = m.totalTunggakan > 0;
          const isSelected = selectedMapMerchant?.uid === m.uid;
          
          let iconHtml = '';
          if (isSelected) {
              iconHtml = `<div class="relative flex items-center justify-center w-5 h-5 rounded-full ${isNunggak ? 'bg-red-500' : 'bg-emerald-500'} border-2 border-white shadow-lg"><span class="absolute inset-0 rounded-full border-2 ${isNunggak ? 'border-red-400' : 'border-emerald-400'} animate-ping"></span></div>`;
          } else {
              iconHtml = `<div style="width:14px; height:14px; border-radius:50%; background-color:${isNunggak ? '#ef4444' : '#10b981'}; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.4);"></div>`;
          }

          const customIcon = window.L.divIcon({ html: iconHtml, className: '', iconSize: isSelected ? [20, 20] : [14, 14], iconAnchor: isSelected ? [10, 10] : [7, 7] });
          const marker = window.L.marker([m.lat, m.lng], { icon: customIcon }).addTo(mapRef.current);
          
          marker.isNunggak = isNunggak;
          marker.merchantUid = m.uid;
          marker.isCurrentlySelected = isSelected;

          marker.on('click', () => {
            setSelectedMapMerchant(m);
            mapRef.current.setView([m.lat, m.lng], mapRef.current.getZoom(), { animate: true, duration: 0.5 });
          });

          markersRef.current[m.uid] = marker;
        }
      });
    }, 150);

    return () => clearTimeout(renderTimeout);
  }, [merchants, activeMenu, isLeafletLoaded, selectedZone]);

  // EFFECT UNTUK UPDATE PIN "BIP-BIP" KETIKA DIPILIH
  useEffect(() => {
     if (activeMenu !== 'peta' || !mapRef.current || !isLeafletLoaded) return;

     Object.values(markersRef.current).forEach(marker => {
         const mUid = marker.merchantUid;
         const isNunggak = marker.isNunggak;
         const isSelected = selectedMapMerchant && selectedMapMerchant.uid === mUid;

         if (isSelected && !marker.isCurrentlySelected) {
             const selectedIcon = window.L.divIcon({ 
                html: `<div class="relative flex items-center justify-center w-5 h-5 rounded-full ${isNunggak ? 'bg-red-500' : 'bg-emerald-500'} border-2 border-white shadow-lg"><span class="absolute inset-0 rounded-full border-2 ${isNunggak ? 'border-red-400' : 'border-emerald-400'} animate-ping" style="animation-duration: 1s;"></span></div>`, 
                className: '', iconSize: [20, 20], iconAnchor: [10, 10] 
             });
             marker.setIcon(selectedIcon);
             marker.setZIndexOffset(1000);
             marker.isCurrentlySelected = true;
         } else if (!isSelected && marker.isCurrentlySelected) {
             const normalIcon = window.L.divIcon({ 
                html: `<div style="width:14px; height:14px; border-radius:50%; background-color:${isNunggak ? '#ef4444' : '#10b981'}; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.4);"></div>`, 
                className: '', iconSize: [14, 14], iconAnchor: [7, 7] 
             });
             marker.setIcon(normalIcon);
             marker.setZIndexOffset(0);
             marker.isCurrentlySelected = false;
         }
     });
  }, [selectedMapMerchant, activeMenu, isLeafletLoaded]);

  const toggleUserLocation = () => {
    if (!isLeafletLoaded || !mapRef.current) return;
    if (isTrackingLocation) {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      if (userMarkerRef.current) { userMarkerRef.current.remove(); userMarkerRef.current = null; }
      if (routeLayerRef.current) { mapRef.current.removeLayer(routeLayerRef.current); routeLayerRef.current = null; setRouteInfo(null); }
      setIsTrackingLocation(false);
    } else {
      if (!navigator.geolocation) return showToast("Perangkat Anda tidak mendukung GPS.", "error");
      setIsTrackingLocation(true);
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (userMarkerRef.current) { userMarkerRef.current.setLatLng([latitude, longitude]); } else {
            const userIcon = window.L.divIcon({ html: `<div class="relative flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-lg"><span class="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping"></span></div>`, className: '', iconSize: [20, 20], iconAnchor: [10, 10] });
            userMarkerRef.current = window.L.marker([latitude, longitude], { icon: userIcon, zIndexOffset: 1000 }).addTo(mapRef.current);
            mapRef.current.flyTo([latitude, longitude], 18, { animate: true, duration: 1.5 });
          }
        },
        (err) => { showToast("Gagal mengambil lokasi GPS. Pastikan izin lokasi diberikan.", "error"); setIsTrackingLocation(false); }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  const captureCurrentLocation = (mode) => {
     if (!navigator.geolocation) return showToast("Perangkat Anda tidak mendukung GPS.", "error");
     setIsFetchingGps(true);
     navigator.geolocation.getCurrentPosition(
        (pos) => {
           const { latitude, longitude } = pos.coords;
           if (mode === 'ADD') setNewMerchant(prev => ({ ...prev, lat: latitude, lng: longitude }));
           else if (mode === 'EDIT') setEditModal(prev => ({ ...prev, data: { ...prev.data, lat: latitude, lng: longitude } }));
           setIsFetchingGps(false); showToast("Koordinat berhasil didapatkan!", "success");
        },
        (err) => { showToast("Gagal mendapat sinyal GPS.", "error"); setIsFetchingGps(false); }, { enableHighAccuracy: true }
     );
  };

  const flyToMerchantOnMap = (m) => {
     if (mapRef.current && m.lat && m.lng) {
        mapRef.current.flyTo([m.lat, m.lng], 19, { animate: true, duration: 1.5 });
        setSelectedMapMerchant(m);
        setIsMapPopupMinimized(false);
        if (window.innerWidth < 1024) { const mc = document.getElementById('main-scroll-area'); if(mc) mc.scrollTo({ top: 0, behavior: 'smooth' }); }
     }
  };

  // === FITUR RUTE JALAN KAKI OSRM & GOOGLE MAPS ===
  const handleCalculateRoute = async () => {
     if (!selectedMapMerchant || !selectedMapMerchant.lat || !selectedMapMerchant.lng) return;
     if (!userMarkerRef.current) {
        showToast("Mohon aktifkan Lokasi GPS Anda terlebih dahulu (tombol Target di kanan bawah) untuk membuat rute.", "error");
        return;
     }

     setIsCalculatingRoute(true);
     const startLatLng = userMarkerRef.current.getLatLng();
     const destLat = selectedMapMerchant.lat;
     const destLng = selectedMapMerchant.lng;

     try {
         const response = await fetch(`https://router.project-osrm.org/route/v1/foot/${startLatLng.lng},${startLatLng.lat};${destLng},${destLat}?overview=full&geometries=geojson`);
         const data = await response.json();

         if (data.routes && data.routes.length > 0) {
             const route = data.routes[0];
             const latLngs = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);

             if (routeLayerRef.current) {
                 mapRef.current.removeLayer(routeLayerRef.current);
             }

             routeLayerRef.current = window.L.polyline(latLngs, {
                 color: '#3b82f6', // blue-500
                 weight: 6,
                 opacity: 0.8,
                 dashArray: '10, 10', 
                 lineJoin: 'round'
             }).addTo(mapRef.current);

             mapRef.current.fitBounds(routeLayerRef.current.getBounds(), { padding: [50, 50] });

             const distanceInMeters = route.distance;
             const durationInSeconds = route.duration;
             
             const distStr = distanceInMeters > 1000 ? (distanceInMeters / 1000).toFixed(2) + " km" : Math.round(distanceInMeters) + " m";
             const durStr = Math.round(durationInSeconds / 60) + " mnt";

             setRouteInfo({ distance: distStr, duration: durStr });
             showToast(`Rute peta berhasil dibuat.`, "success");
             
             // UX: Otomatis mengecilkan popup agar petugas bisa melihat map dengan jelas
             setIsMapPopupMinimized(true);
         } else {
             showToast("Tidak dapat menemukan rute ke lokasi tersebut di peta internal.", "error");
         }
     } catch (err) {
         showToast("Gagal mengambil data rute dari server peta.", "error");
     } finally {
         setIsCalculatingRoute(false);
     }
  };

  const handleOpenGoogleMapsRoute = () => {
      if (!selectedMapMerchant || !selectedMapMerchant.lat || !selectedMapMerchant.lng) return;
      if (!userMarkerRef.current) {
         showToast("Mohon aktifkan Lokasi GPS Anda terlebih dahulu untuk menggunakan navigasi Google Maps.", "error");
         return;
      }
      const startLatLng = userMarkerRef.current.getLatLng();
      const destLat = selectedMapMerchant.lat;
      const destLng = selectedMapMerchant.lng;
      
      // Buka URL Deep Link Google Maps rute jalan kaki
      const url = `https://www.google.com/maps/dir/?api=1&origin=${startLatLng.lat},${startLatLng.lng}&destination=${destLat},${destLng}&travelmode=walking`;
      window.open(url, '_blank');
  };

  const handleDayClick = (day) => {
    if (userRole !== 'admin') return showToast("Hanya Admin yang dapat mengubah kalender.", "error");
    const dateStr = `${calYear}-${String(calMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const existing = specialDates[dateStr] || { type: 'NORMAL', name: '' };
    setCalendarModal({ isOpen: true, dateStr, day, type: existing.type, name: existing.name || '' });
  };

  const saveCalendarDate = (e) => {
    e.preventDefault();
    if (calendarModal.type !== 'NORMAL' && !calendarModal.name) { return showToast("Nama event wajib diisi untuk hari khusus!", "error"); }
    const newDates = { ...specialDates };
    if (calendarModal.type === 'NORMAL') { delete newDates[calendarModal.dateStr]; } else { newDates[calendarModal.dateStr] = { type: calendarModal.type, name: calendarModal.name }; }
    setSpecialDates(newDates); 
    setCalendarModal({ isOpen: false, dateStr: '', day: '', type: 'NORMAL', name: '' }); 
    showToast("Jadwal kalender berhasil diperbarui.", "success");
  };

  const handleSyncHolidays = async () => {
    if (userRole !== 'admin') return;
    setIsSyncing(true);
    try {
      let data = null;
      
      let response = await fetch(`https://dayoffapi.vercel.app/api?year=${calYear}`).catch(() => null);
      if (response && response.ok) data = await response.json();

      if (!data || data.length === 0) {
        response = await fetch(`https://api-harilibur.vercel.app/api?year=${calYear}`).catch(() => null);
        if (response && response.ok) data = await response.json();
      }

      if (data && Array.isArray(data) && data.length > 0) {
         const newSpecialDates = { ...specialDates };
         let added = 0;
         
         data.forEach(item => { 
           const tgl = item.tanggal || item.holiday_date;
           const ket = item.keterangan || item.holiday_name;
           const isCuti = item.is_cuti === true || String(ket).toLowerCase().includes('cuti bersama');
           
           if (tgl && ket && String(tgl).startsWith(String(calYear))) { 
               const finalName = isCuti ? `Cuti Bersama: ${ket.replace(/Cuti Bersama/i, '').trim()}` : ket;
               newSpecialDates[tgl] = { type: 'LIBUR', name: finalName }; 
               added++; 
           } 
         });
         
         if (added > 0) {
             setSpecialDates(newSpecialDates); 
             const today = new Date();
             const tzOffset = today.getTimezoneOffset() * 60000;
             const localISOTime = (new Date(today - tzOffset)).toISOString().slice(0, -1);
             const todayStr = localISOTime.split('T')[0];
             
             if (newSpecialDates[todayStr]) {
                 setTimeout(() => {
                     showToast(`Pemberitahuan SKB: Hari ini (${todayStr}) tercatat sebagai ${newSpecialDates[todayStr].name}. Tarif tagihan disesuaikan.`, "info");
                 }, 4500);
             }

             showToast(`Sinkronisasi sukses! ${added} Hari Libur & Cuti Bersama dari SKB ditarik.`, "success");
         } else {
             throw new Error('Data API tidak memuat tahun yang dipilih.');
         }
      } else {
         throw new Error('Semua jalur API kosong/gagal.');
      }
    } catch (error) { 
      const fallback2026 = {
         "2026-01-01": { type: "LIBUR", name: "Tahun Baru Masehi" },
         "2026-02-17": { type: "LIBUR", name: "Isra Mikraj" },
         "2026-03-03": { type: "LIBUR", name: "Hari Raya Nyepi" },
         "2026-03-20": { type: "LIBUR", name: "Cuti Bersama Idul Fitri" },
         "2026-03-21": { type: "LIBUR", name: "Idul Fitri" },
         "2026-04-03": { type: "LIBUR", name: "Wafat Isa Al Masih" },
         "2026-05-01": { type: "LIBUR", name: "Hari Buruh Internasional" },
         "2026-05-14": { type: "LIBUR", name: "Kenaikan Isa Al Masih" },
         "2026-05-15": { type: "LIBUR", name: "Cuti Bersama Kenaikan Isa Al Masih" }, 
         "2026-05-26": { type: "LIBUR", name: "Hari Raya Waisak" },
         "2026-05-27": { type: "LIBUR", name: "Idul Adha" },
         "2026-07-16": { type: "LIBUR", name: "Tahun Baru Islam" },
         "2026-08-17": { type: "LIBUR", name: "Hari Kemerdekaan RI" },
         "2026-09-27": { type: "LIBUR", name: "Maulid Nabi Muhammad" },
         "2026-12-25": { type: "LIBUR", name: "Hari Raya Natal" }
      };
      const merged = {...specialDates, ...fallback2026};
      setSpecialDates(merged);

      const todayStr = new Date().toISOString().split('T')[0];
      if (merged[todayStr]) {
          setTimeout(() => { showToast(`Info: Hari ini (${todayStr}) adalah ${merged[todayStr].name}`, "info"); }, 4500);
      }

      showToast(`API Publik bermasalah. Menggunakan Data SKB Offline ${calYear}.`, "success"); 
    }
    setIsSyncing(false);
  };

  const getKalkulasiBulan = (bulan, tahun) => {
    const daysInMonth = new Date(tahun, bulan, 0).getDate(); let hariBiasa = 0, hariRamai = 0, tutupOperasional = 0;
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(tahun, bulan - 1, i); const dayOfWeek = date.getDay(); const dateStr = `${tahun}-${String(bulan).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const statusSpesial = specialDates[dateStr]?.type;
      if (statusSpesial === 'LIBUR' || statusSpesial === 'PEAK') hariRamai++; else if (statusSpesial === 'TUTUP') tutupOperasional++; else if (statusSpesial === 'BUKA') hariBiasa++; else if (dayOfWeek === 1) tutupOperasional++; else if (dayOfWeek === 0 || dayOfWeek === 6) hariRamai++; else hariBiasa++; 
    }
    return { hariBiasa, hariRamai, tutupOperasional, tarifHarianFull: (hariBiasa * 10000) + (hariRamai * 15000), tarifHarianNonstop: (hariBiasa * 10000) + (tutupOperasional * 10000) + (hariRamai * 15000), tarifWeekendSaja: (hariRamai * 15000) };
  };
  const calStats = useMemo(() => getKalkulasiBulan(calMonth, calYear), [calMonth, calYear, specialDates]);

  const getNominal = (val) => {
    if (!val) return 0;
    if (typeof val === 'number') { let num = val < 1000 ? val * 1000 : val; return Math.round(num); }
    let str = String(val).trim(); if (str.match(/,\d{2}$/)) str = str.replace(/,\d{2}$/, ''); else if (str.match(/\.\d{2}$/)) str = str.replace(/\.\d{2}$/, '');
    let result = parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
    if (result > 0 && result < 1000) result *= 1000;
    return result;
  };

  const parseExcelSafely = (worksheet, requiredKeywords) => {
    const rows = window.XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
    let headerRowIndex = -1, headers = [];
    for (let i = 0; i < Math.min(rows.length, 20); i++) { const rowStrings = rows[i].map(c => String(c).trim().toUpperCase()); if (requiredKeywords.some(req => rowStrings.includes(req.toUpperCase()))) { headerRowIndex = i; headers = rowStrings; break; } }
    if (headerRowIndex === -1) return null; const data = [];
    for (let i = headerRowIndex + 1; i < rows.length; i++) {
      const row = rows[i]; if (row.length === 0 || !row.some(cell => cell !== "")) continue; const obj = {}; headers.forEach((h, idx) => { if (h) obj[h] = row[idx]; }); data.push(obj);
    }
    return data;
  };

  const handleImportMaster = (e) => {
    if (userRole !== 'admin') return; const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      showToast("Sedang memproses Excel dan sinkronisasi ke Cloud...", "info");
      try {
        const data = new Uint8Array(event.target.result); const workbook = window.XLSX.read(data, { type: 'array' }); let foundData = null;
        for (const sheetName of workbook.SheetNames) { const parsed = parseExcelSafely(workbook.Sheets[sheetName], ['ACCOUNT ID', 'ID', 'NO LOKSEM', 'NAMA', 'NAMA NASABAH']); if (parsed && parsed.length > 0) { foundData = parsed; break; } }
        if (!foundData) return showToast("Struktur tabel ID/Nama tidak ditemukan di Excel.", "error");

        const batchPromises = []; let addedCount = 0; let updatedCount = 0;
        foundData.forEach(row => {
          const rawId = row['ACCOUNT ID'] || row['ID'] || row['ID TAGIHAN'] || row['NO LOKSEM']; if (!rawId || rawId === 'undefined') return;
          const nama = row['NAMA NASABAH'] || row['NAMA '] || row['NAMA'] || row['NAMA PEDAGANG'] || '-';
          const allText = Object.values(row).join(' ').toUpperCase();
          const lokasiDetail = row['KETERANGAN 1'] || row['LOKASI'] || row['ALAMAT'] || '-';
          const jenisUsaha = row['JENIS USAHA'] || row['USAHA'] || row['JENIS PRODUK'] || row['PRODUK'] || row['KETERANGAN 3'] || '-';
          const safeRawId = String(rawId).replace(/\//g, '-').trim(); const safeLokasi = String(lokasiDetail).replace(/\//g, '-').trim(); const uid = safeRawId + '_' + safeLokasi;
          const existingIdx = merchants.findIndex(ex => ex.uid === uid);

          if (existingIdx === -1) {
            let latVal = row['LATITUDE'] || row['LAT'] || ''; let lngVal = row['LONGITUDE'] || row['LNG'] || row['LON'] || '';
            if (!latVal || !lngVal) {
               const locUp = String(lokasiDetail).toUpperCase(); let baseLat = -6.311545, baseLng = 106.820067;
               if (locUp.includes('UTARA') || locUp.includes('UTM')) { baseLat = -6.305602; baseLng = 106.820120; } else if (locUp.includes('SELATAN')) { baseLat = -6.317586; baseLng = 106.820258; } else if (locUp.includes('BARAT') || locUp.includes('PRIMATA')) { baseLat = -6.311354; baseLng = 106.815555; } else if (locUp.includes('TIMUR') || locUp.includes('BURUNG')) { baseLat = -6.311456; baseLng = 106.824701; } else if (locUp.includes('DANAU') || locUp.includes('RAKIT')) { baseLat = -6.313583; baseLng = 106.822084; } else if (locUp.includes('GAJAH') || locUp.includes('KOMODO')) { baseLat = -6.308709; baseLng = 106.822867; }
               latVal = baseLat + (Math.random() - 0.5) * 0.003; lngVal = baseLng + (Math.random() - 0.5) * 0.003;
            }
            let tipeTarif = 'TETAP'; 
            if (importKategori === 'LISTRIK') tipeTarif = 'TETAP'; else if (allText.includes('SABTU') || allText.includes('MINGGU') || allText.includes('BESAR')) tipeTarif = 'HARIAN_WEEKEND'; else if (allText.includes('SETIAP HARI') || importKategori === 'LOKSEM') tipeTarif = importKategori === 'LOKSEM' ? 'HARIAN_FULL_NONSTOP' : 'HARIAN_FULL'; else if (importKategori === 'TIKAR') tipeTarif = 'HARIAN_WEEKEND'; else if (importKategori === 'PKL' || importKategori === 'JURU FOTO') tipeTarif = 'HARIAN_FULL';

            let tagihan = getNominal(row['JUMLAH TAGIHAN'] || row['JUMLAH BAYAR'] || row['TAGIHAN'] || 0);
            if (tagihan === 0 && importKategori !== 'LISTRIK') { tagihan = parseInt(defaultTagihanInput, 10) || 285000; }
            const newM = { uid, accountId: String(rawId).trim(), nama, keterangan: lokasiDetail, jenisUsaha, nik: row['NIK'] || row['NO KTP'] || '-', alamatRumah: row['ALAMAT RUMAH'] || '-', noHp: row['NO HP'] || row['HP'] || '-', fotoLapak: '', lat: latVal, lng: lngVal, rekeningSumber: row['REKENING SUMBER'] || row['NO REKENING'] || '', tagihanTetapBulanan: tagihan, tipeTarif, totalTunggakan: 0, bulanMenunggak: [], bulanLunas: [], riwayatTagihan: [], statusTerakhir: 'Aktif - Menunggu', kategori: importKategori };
            batchPromises.push(setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan', uid), newM)); addedCount++;
          } else {
             const ex = merchants[existingIdx];
             if (importKategori === 'LISTRIK' || ex.tagihanTetapBulanan > 0) {
                const updatedM = { ...ex, tagihanTetapBulanan: ex.tagihanTetapBulanan, tipeTarif: importKategori === 'LISTRIK' ? 'TETAP' : ex.tipeTarif };
                batchPromises.push(setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan', uid), updatedM)); updatedCount++;
             }
          }
        });
        await Promise.all(batchPromises); showToast(`Import Selesai! ${addedCount} Baru, ${updatedCount} Diperbarui ke Cloud.`, "success");
      } catch (err) { showToast("Gagal membaca Excel/Upload ke Cloud.", "error"); }
    }; reader.readAsArrayBuffer(file); e.target.value = null;
  };

  const handleClearCache = () => {
    if (userRole !== 'admin') return;
    requestConfirm("PERINGATAN: Anda akan menghapus SELURUH data pedagang dari Cloud Database. Lanjutkan?", async () => {
       showToast("Sedang menghapus data dari Cloud...", "info");
       try { const deletePromises = merchants.map(m => deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan', m.uid))); await Promise.all(deletePromises); showToast("Database Cloud berhasil dikosongkan!", "success"); } catch (err) { showToast("Terjadi kesalahan saat menghapus data.", "error"); }
    });
  };

  const handleAddMerchantManual = async (e) => {
    e.preventDefault(); if (userRole !== 'admin') return;
    if(!newMerchant.accountId || !newMerchant.nama) return showToast('ID dan Nama wajib diisi!', "error");
    const safeRawId = String(newMerchant.accountId).replace(/\//g, '-').trim(); const safeLokasi = String(newMerchant.keterangan).replace(/\//g, '-').trim(); const newUid = safeRawId + '_' + safeLokasi;
    if(merchants.find(m => m.uid === newUid)) return showToast('ID dengan lokasi tersebut sudah terdaftar!', "error");
    const finalData = { ...newMerchant, uid: newUid, jenisUsaha: newMerchant.jenisUsaha || '-', nik: newMerchant.nik || '-', alamatRumah: newMerchant.alamatRumah || '-', noHp: newMerchant.noHp || '-', lat: newMerchant.lat || (-6.311545 + (Math.random() - 0.5) * 0.003), lng: newMerchant.lng || (106.820067 + (Math.random() - 0.5) * 0.003), tagihanTetapBulanan: newMerchant.kategori === 'TIKAR' ? 115000 : newMerchant.kategori === 'JURU FOTO' ? 390000 : 285000, totalTunggakan: 0, bulanMenunggak: [], bulanLunas: [], riwayatTagihan: [], statusTerakhir: 'Aktif - Baru' };
    try { await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan', newUid), finalData); setShowAddModal(false); setNewMerchant({ accountId: '', nama: '', keterangan: '', jenisUsaha: '', kategori: 'PKL', tipeTarif: 'HARIAN_FULL', rekeningSumber: '', nik: '', alamatRumah: '', noHp: '', lat: '', lng: '', fotoLapak: '' }); showToast('Data & Foto berhasil disimpan ke Cloud!', "success"); } catch(err) { showToast('Gagal menyimpan ke Cloud.', "error"); }
  };

  const handleEditSave = async (e) => {
    e.preventDefault(); if (!userRole) return;
    if (!editModal.data.accountId || !editModal.data.nama) return showToast('ID dan Nama wajib diisi!', "error");
    try { await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan', editModal.data.uid), editModal.data); setEditModal({ isOpen: false, data: null }); showToast('Perubahan berhasil disimpan ke Cloud.', "success"); } catch (err) { showToast('Gagal update ke Cloud.', "error"); }
  };

  const gantiTipeTarif = async (merchant, newTipe) => {
    if (userRole !== 'admin') return showToast("Hanya admin yang dapat merubah tarif.", "error");
    try { await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan', merchant.uid), { ...merchant, tipeTarif: newTipe }); } catch(err) { showToast('Gagal mengganti tarif.', "error"); }
  };

  const handleDeleteSatuan = (merchant) => {
    if (userRole !== 'admin') return;
    requestConfirm(`Hapus pedagang ${merchant.nama} dari Cloud Database?`, async () => { try { await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan', merchant.uid)); showToast("Data berhasil dihapus.", "success"); } catch(err) { showToast("Gagal menghapus data.", "error"); } });
  }

  const handleGenerateExcel = () => {
    if (userRole !== 'admin') return; let targetMerchants = formGenerate.kategoriExport !== 'Semua' ? merchants.filter(m => m.kategori === formGenerate.kategoriExport) : merchants;
    if (targetMerchants.length === 0) return showToast(`Tidak ada data untuk kategori ini.`, "error");
    const [mmStr, yyyyStr] = formGenerate.periode.split('/'); const targetBulan = parseInt(mmStr, 10) || calMonth; const targetTahun = parseInt(yyyyStr, 10) || calYear; const calc = getKalkulasiBulan(targetBulan, targetTahun);
    const idCountMap = {}; targetMerchants.forEach(m => { idCountMap[m.accountId] = (idCountMap[m.accountId] || 0) + 1; }); const currentIdCount = {};
    const dataToExport = targetMerchants.map(m => {
      let t = m.tagihanTetapBulanan; if (m.tipeTarif === 'HARIAN_FULL') t = calc.tarifHarianFull; else if (m.tipeTarif === 'HARIAN_FULL_NONSTOP') t = calc.tarifHarianNonstop; else if (m.tipeTarif === 'HARIAN_WEEKEND') t = calc.tarifWeekendSaja;
      currentIdCount[m.accountId] = (currentIdCount[m.accountId] || 0) + 1; let periodeFinal = formGenerate.periode; if (idCountMap[m.accountId] > 1) { periodeFinal = `${formGenerate.periode}  ${currentIdCount[m.accountId]}`; }
      return { "ACCOUNT ID": m.accountId, "NAMA NASABAH": m.nama, "KETERANGAN 1": m.keterangan, "KETERANGAN 2": periodeFinal, "KETERANGAN 3": (m.jenisUsaha && m.jenisUsaha !== '-') ? m.jenisUsaha : formGenerate.keterangan3, "JENIS TAGIHAN": formGenerate.jenisTagihan, "DESKRIPSI": formGenerate.deskripsi, "NO URUT BAYAR": "1", "METODE BAYAR": "AUTODEBET", "JUMLAH TAGIHAN": t + m.totalTunggakan, "TANGGAL MULAI BAYAR": formGenerate.tglMulaiBayar, "TANGGAL JATUH TEMPO": formGenerate.tglJatuhTempo, "JENIS REKENING SUMBER": m.rekeningSumber ? 'KONVEN' : '', "REKENING SUMBER": m.rekeningSumber, "JENIS REKENING TUJUAN": formGenerate.jenisRekTujuan, "REKENING TUJUAN": formGenerate.rekTujuan, "KODE PLAN": formGenerate.kodePlan, "NO HP": (m.noHp && m.noHp !== '-') ? m.noHp : '', "EMAIL": formGenerate.defaultEmail, "LATITUDE": m.lat, "LONGITUDE": m.lng };
    });
    const ws = window.XLSX.utils.json_to_sheet(dataToExport); const wb = window.XLSX.utils.book_new(); window.XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); window.XLSX.writeFile(wb, `UPLOAD_JAKONE_${formGenerate.jenisTagihan.replace(/\s+/g, '')}_${formGenerate.periode.replace('/', '_')}.xlsx`);
  };

  const handleUploadReport = (e) => {
    if (userRole !== 'admin') return; const file = e.target.files[0]; if (!file) return;
    if (merchants.length === 0) { e.target.value = null; return showToast("Database kosong.", "error"); }
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target.result); const workbook = window.XLSX.read(data, { type: 'array' }); let reportData = null;
        for (const sheetName of workbook.SheetNames) { const parsed = parseExcelSafely(workbook.Sheets[sheetName], ['RESPONSE CODE', 'RESPONSE DESCRIPTION', 'JUMLAH BAYAR']); if (parsed && parsed.length > 0) { reportData = parsed; break; } }
        if (!reportData) return showToast("Gagal: Kolom RESPONSE CODE tidak ada.", "error");

        let logs = { sukses: 0, gagal: 0, uangMasuk: 0, uangGagal: 0 }; const batchPromises = [];
        merchants.forEach(merchant => {
          const transaksiPedagang = reportData.filter(r => {
            const matchId = String(r['ACCOUNT ID']).trim() === String(merchant.accountId).trim() || String(r['ID TAGIHAN']).trim() === String(merchant.accountId).trim();
            if (!matchId) return false; if (!r['KETERANGAN 1']) return true; 
            let locBank = String(r['KETERANGAN 1']).replace(/\s+/g, ' ').trim().toUpperCase(); let locMaster = String(merchant.keterangan).replace(/\s+/g, ' ').trim().toUpperCase();
            locBank = locBank.replace(/^P\.\s*/, 'PINTU ').replace(/\bP\.\s*/, 'PINTU '); locMaster = locMaster.replace(/^P\.\s*/, 'PINTU ').replace(/\bP\.\s*/, 'PINTU ');
            if (locBank === locMaster || locBank.includes(locMaster) || locMaster.includes(locBank)) return true; 
            if (merchant.kategori === 'JURU FOTO' || merchant.kategori === 'TIKAR' || merchant.kategori === 'LISTRIK') return true;
            return false;
          });
          
          if (transaksiPedagang.length === 0) return;
          let newRiwayat = [...(merchant.riwayatTagihan || [])]; let updated = false;

          transaksiPedagang.forEach(hasilBank => {
            let periodeLaporan = String(hasilBank['PERIODE'] || hasilBank['KETERANGAN 2'] || formGenerate.periode).trim().replace(/\s+\d+$/, '');
            const nomTagihanLaporan = getNominal(hasilBank['JUMLAH TAGIHAN']); const nomBayarLaporan = getNominal(hasilBank['JUMLAH BAYAR']);
            const resCode = String(hasilBank['RESPONSE CODE']).trim(); const descBank = String(hasilBank['RESPONSE DESCRIPTION'] || '').toUpperCase();
            const isLunas = resCode === '00' || resCode === '0' || descBank.includes('SUKSES');
            const tglTransaksi = hasilBank['TANGGAL TRANSAKSI'] || new Date().toLocaleDateString('id-ID');
            const existingIdx = newRiwayat.findIndex(r => r.periode === periodeLaporan);

            const record = { periode: periodeLaporan, nominalTagihan: nomTagihanLaporan, nominalBayar: isLunas ? (nomBayarLaporan || nomTagihanLaporan) : 0, status: isLunas ? 'LUNAS' : 'MENUNGGAK', tglUpdate: tglTransaksi, keterangan: isLunas ? '✓ Lunas Autodebet' : `✗ ${hasilBank['RESPONSE DESCRIPTION'] || 'Gagal Debet'}` };

            if (isLunas) { logs.sukses++; logs.uangMasuk += record.nominalBayar; } else { logs.gagal++; logs.uangGagal += record.nominalTagihan; }
            if(existingIdx >= 0) { if (newRiwayat[existingIdx].status !== 'LUNAS' || isLunas) { newRiwayat[existingIdx] = record; updated = true; } } else { newRiwayat.push(record); updated = true; }
          });

          if (updated) {
            const newBulanMenunggak = [...new Set(newRiwayat.filter(r => r.status === 'MENUNGGAK').map(r => r.periode))].sort((a,b) => b.localeCompare(a));
            const newBulanLunas = [...new Set(newRiwayat.filter(r => r.status === 'LUNAS').map(r => r.periode))].sort((a,b) => b.localeCompare(a));
            const newTotalTunggakan = newRiwayat.filter(r => r.status === 'MENUNGGAK').reduce((sum, r) => sum + r.nominalTagihan, 0);
            let statusTerakhirStr = newTotalTunggakan === 0 ? 'Lunas Semua' : `Hutang ${newBulanMenunggak.length} Bulan`;
            batchPromises.push(setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'merchants_ragunan', merchant.uid), { ...merchant, riwayatTagihan: newRiwayat, statusTerakhir: statusTerakhirStr, totalTunggakan: newTotalTunggakan, bulanMenunggak: newBulanMenunggak, bulanLunas: newBulanLunas }));
          }
        });

        if (batchPromises.length > 0) {
           showToast("Sedang sinkronisasi hasil rekon ke Cloud...", "info"); await Promise.all(batchPromises); setLastRekonReport(logs); setActiveMenu('dashboard'); showToast(`Rekon Cloud Selesai! Berhasil: ${logs.sukses}, Gagal: ${logs.gagal}`, "success");
        } else { showToast("Tidak ada data baru yang perlu diupdate.", "info"); }
      } catch (err) { showToast("Gagal memproses file rekon.", "error"); }
    }; reader.readAsArrayBuffer(file); e.target.value = null;
  };

  const handleRegisterUser = async (e) => {
     e.preventDefault(); if (userRole !== 'admin') return;
     if (!newUserReg.email || !newUserReg.password) return showToast("Email dan password wajib diisi.", "error");
     if (newUserReg.password.length < 6) return showToast("Password minimal 6 karakter.", "error");

     setIsCreatingUser(true);
     try {
       await createUserWithEmailAndPassword(secondaryAuth, newUserReg.email, newUserReg.password);
       await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'user_roles', newUserReg.email.toLowerCase()), { email: newUserReg.email.toLowerCase(), role: newUserReg.role, createdAt: new Date().toISOString(), createdBy: appUser.email });
       await signOut(secondaryAuth);
       showToast(`Akun ${newUserReg.email} berhasil didaftarkan sebagai ${newUserReg.role}!`, "success"); setNewUserReg({ email: '', password: '', role: 'petugas' });
     } catch (error) {
       if (error.code === 'auth/email-already-in-use') showToast("Email tersebut sudah terdaftar.", "error"); else showToast("Gagal membuat akun. Pastikan koneksi stabil.", "error");
     } finally { setIsCreatingUser(false); }
  };

  const handleDeleteUser = (emailTarget) => {
     if (userRole !== 'admin') return; if (emailTarget === appUser.email) return showToast("Anda tidak bisa menghapus akun Anda sendiri.", "error");
     requestConfirm(`Anda yakin ingin mencabut hak akses akun ${emailTarget}? (Akun tidak bisa login ke app ini lagi)`, async () => {
        try { await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'user_roles', emailTarget)); showToast("Hak akses akun berhasil dicabut.", "success"); } catch (error) { showToast("Gagal menghapus akun.", "error"); }
     });
  };

  const mapZonesData = [
    { id: 'SEMUA AREA', name: 'Tampilkan Semua' }, { id: 'UTARA', name: 'Pintu Utara & Utama' }, { id: 'SELATAN', name: 'Area Pintu Selatan' },
    { id: 'BARAT', name: 'Pintu Barat / Schmutzer' }, { id: 'TIMUR', name: 'Pintu Timur / Burung' }, { id: 'INFORMASI', name: 'Pusat Informasi & Plaza' },
    { id: 'DANAU', name: 'Danau & Rakit' }, { id: 'GAJAH', name: 'Area Gajah & Komodo' },
  ];

  const uniqueLokasi = useMemo(() => { return [...new Set(merchants.map(m => m.keterangan).filter(k => k && k !== '-'))].sort(); }, [merchants]);
  const uniqueJenisUsaha = useMemo(() => { return [...new Set(merchants.map(m => m.jenisUsaha).filter(u => u && u !== '-'))].sort(); }, [merchants]);

  const filteredDashboardMerchants = useMemo(() => {
    let filtered = merchants.filter(m => {
      const matchSearch = m.nama.toLowerCase().includes(searchTerm.toLowerCase()) || m.accountId.toLowerCase().includes(searchTerm.toLowerCase()) || (m.nik && m.nik.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchKat = filterKategoriDashboard === 'Semua' || m.kategori === filterKategoriDashboard;
      const matchLok = filterLokasi === 'Semua' || m.keterangan === filterLokasi;
      const sanitizedUsaha = (m.jenisUsaha && m.jenisUsaha !== '-') ? m.jenisUsaha.toUpperCase().replace(/\s+/g, ' ').trim() : 'BELUM ADA DATA';
      const matchUsh = filterJenisUsaha === 'Semua' || m.jenisUsaha === filterJenisUsaha || sanitizedUsaha === filterJenisUsaha;
      const matchTunggakan = showOnlyArrears ? m.totalTunggakan > 0 : true;
      return matchSearch && matchKat && matchLok && matchUsh && matchTunggakan;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const valA = String(a[sortConfig.key] || '').toLowerCase(); const valB = String(b[sortConfig.key] || '').toLowerCase();
        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1; if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1; return 0;
      });
    }
    return filtered;
  }, [merchants, searchTerm, filterKategoriDashboard, showOnlyArrears, sortConfig, filterLokasi, filterJenisUsaha]);

  const dashboardStats = useMemo(() => {
    const targetData = filterKategoriDashboard === 'Semua' ? merchants : merchants.filter(m => m.kategori === filterKategoriDashboard);
    const menunggakData = targetData.filter(m => m.totalTunggakan > 0);
    const categoryBreakdown = { 'PKL': { count: 0, hutang: 0 }, 'LOKSEM': { count: 0, hutang: 0 }, 'TIKAR': { count: 0, hutang: 0 }, 'JURU FOTO': { count: 0, hutang: 0 }, 'LISTRIK': { count: 0, hutang: 0 } };
    merchants.forEach(m => { if (categoryBreakdown[m.kategori]) { categoryBreakdown[m.kategori].count += 1; categoryBreakdown[m.kategori].hutang += m.totalTunggakan; } });

    return { totalUang: menunggakData.reduce((sum, m) => sum + m.totalTunggakan, 0), totalOrang: menunggakData.length, totalSemua: targetData.length, breakdown: categoryBreakdown };
  }, [merchants, filterKategoriDashboard]);

  const masterDataStats = useMemo(() => {
    const kategoriCount = { 'PKL': 0, 'LOKSEM': 0, 'TIKAR': 0, 'JURU FOTO': 0, 'LISTRIK': 0 };
    merchants.forEach(m => { if (kategoriCount[m.kategori] !== undefined) kategoriCount[m.kategori]++; });
    return { total: merchants.length, kategori: kategoriCount };
  }, [merchants]);

  const handleMenuClick = (menu) => { setActiveMenu(menu); setIsMobileMenuOpen(false); };

  return (
    <>
      {toast.show && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl animate-in fade-in slide-in-from-top-4 ${toast.type === 'error' ? 'bg-red-600 text-white' : toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'}`}>
           {toast.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
           <span className="text-sm font-bold tracking-wide">{toast.message}</span>
        </div>
      )}

      {confirmDialog.show && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
           <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-in zoom-in-95">
              <div className="flex items-center gap-3 mb-4 text-amber-600">
                 <div className="bg-amber-100 p-2 rounded-full"><AlertTriangle className="w-6 h-6"/></div>
                 <h3 className="text-lg font-bold">Konfirmasi</h3>
              </div>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{confirmDialog.message}</p>
              <div className="flex gap-3 justify-end">
                 <button onClick={() => setConfirmDialog({show: false, message: '', onConfirm: null})} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold rounded-lg transition-colors">Batal</button>
                 <button onClick={confirmDialog.onConfirm} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-md">Ya, Lanjutkan</button>
              </div>
           </div>
         </div>
      )}

      {(() => {
        if (isAuthChecking) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 flex-col gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
              <p className="text-sm font-bold text-slate-500 animate-pulse">Menghubungkan ke Cloud...</p>
            </div>
          );
        }

        if (!appUser) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 relative overflow-hidden">
               <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
               <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
               
               <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/50 relative z-10">
                   <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 transform hover:scale-105 transition-transform">
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-full h-full drop-shadow-xl">
                           <rect x="8" y="28" width="48" height="22" fill="#0f172a" rx="4"/>
                           <rect x="12" y="10" width="40" height="18" fill="#3b82f6" rx="2"/>
                           <circle cx="20" cy="56" r="6" fill="#334155"/>
                           <circle cx="44" cy="56" r="6" fill="#334155"/>
                           <circle cx="20" cy="56" r="2" fill="#cbd5e1"/>
                           <circle cx="44" cy="56" r="2" fill="#cbd5e1"/>
                           <text x="32" y="44" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="900" fill="#f8fafc" textAnchor="middle">TMR</text>
                           <path d="M 6 28 L 12 10" stroke="#0f172a" strokeWidth="3" strokeLinecap="round"/>
                           <path d="M 58 28 L 52 10" stroke="#0f172a" strokeWidth="3" strokeLinecap="round"/>
                         </svg>
                      </div>
                   </div>
                   
                   <div className="text-center mb-8">
                      <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-tight">Aplikasi Data Pelaku Usaha Terpadu</h1>
                      <p className="text-sm font-bold text-blue-600 mt-2 uppercase tracking-widest">UP TM Ragunan</p>
                   </div>

                   <form onSubmit={handleLogin} className="space-y-5">
                      <div>
                         <label className="block text-[11px] font-extrabold text-slate-500 mb-1.5 uppercase tracking-wider">Alamat Email Terdaftar</label>
                         <div className="relative">
                            <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold text-slate-700 text-sm" placeholder="Ketik email..." />
                         </div>
                      </div>
                      <div>
                         <label className="block text-[11px] font-extrabold text-slate-500 mb-1.5 uppercase tracking-wider">Kata Sandi (Password)</label>
                         <div className="relative">
                            <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-semibold text-slate-700 text-sm" placeholder="••••••••" />
                         </div>
                      </div>
                      <button type="submit" disabled={isLoggingIn} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed">
                         {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk ke Sistem Terpadu"}
                      </button>
                   </form>

                   <div className="mt-8 text-center border-t border-slate-100 pt-6">
                      <p className="text-[10px] text-slate-500 font-bold flex items-center justify-center gap-1.5">
                         <ShieldAlert className="w-3 h-3 text-emerald-500" /> Tersambung aman ke Firebase Auth
                      </p>
                   </div>
               </div>
            </div>
          );
        }

        if (!isXlsxLoaded) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 flex-col gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
              <p className="text-sm font-bold text-slate-500 animate-pulse">Menyiapkan Mesin Pengolah Excel...</p>
            </div>
          );
        }

        return (
          <div className="min-h-screen flex bg-slate-50 font-sans text-slate-800 overflow-hidden relative">
            {isMobileMenuOpen && <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />}

            <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="p-6 border-b border-slate-800 flex justify-between items-center shrink-0">
                <div>
                  <h1 className="text-xl font-extrabold flex items-center gap-2"><Database className="w-6 h-6 text-blue-400" /> SIM AutoDebet</h1>
                  <p className="text-slate-400 text-[10px] truncate uppercase tracking-wider font-semibold mt-1.5 flex items-center gap-1">
                     <span title={appUser.email}>{appUser.email.split('@')[0]}</span> ({userRole === 'admin' ? 'Admin' : 'Petugas'}) <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" title="Cloud Active"></span>
                  </p>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
                {userRole === 'admin' && (
                   <button onClick={() => handleMenuClick('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeMenu === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}><LayoutDashboard className="w-5 h-5" /> Dashboard Tagihan</button>
                )}
                
                <button onClick={() => handleMenuClick('peta')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeMenu === 'peta' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}><MapIcon className="w-5 h-5" /> Peta Sebaran Real-Time</button>
                
                <button onClick={() => handleMenuClick('kelola-data')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeMenu === 'kelola-data' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}><Contact className="w-5 h-5" /> Kelola Master Data</button>
                
                {userRole === 'admin' && (
                   <>
                      <button onClick={() => handleMenuClick('kalender')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeMenu === 'kalender' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}><CalendarIcon className="w-5 h-5" /> Kalender & Tarif</button>
                      <div className="my-4 border-t border-slate-800"></div>
                      <button onClick={() => handleMenuClick('generate')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeMenu === 'generate' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}><Download className="w-5 h-5" /> Generate Target Bank</button>
                      <button onClick={() => handleMenuClick('rekon')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeMenu === 'rekon' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}><RefreshCw className="w-5 h-5" /> Rekonsiliasi Laporan</button>
                      
                      <div className="my-4 border-t border-slate-800"></div>
                      <button onClick={() => handleMenuClick('manajemen-akun')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeMenu === 'manajemen-akun' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}><UserCog className="w-5 h-5" /> Manajemen Akun</button>
                   </>
                )}
              </nav>

              <div className="p-4 border-t border-slate-800 mt-auto shrink-0">
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl text-sm font-bold transition-all border border-transparent hover:border-red-500/30">
                  <LogOut className="w-4 h-4" /> Keluar Sistem (Logout)
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
              <header className="bg-white p-4 lg:p-6 shadow-sm border-b border-slate-200 shrink-0 flex items-center justify-between gap-4 z-10 relative">
                <div className="flex items-center gap-4">
                   <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2.5 text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-sm"><Menu className="w-5 h-5" /></button>
                   <div>
                     <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                       {activeMenu === 'dashboard' ? 'Dashboard Pemantauan Tagihan' : activeMenu === 'peta' ? 'Pemetaan Lokasi Pedagang Berbasis Google Maps' : activeMenu === 'kelola-data' ? 'Pengelolaan Master Data Pedagang' : activeMenu === 'kalender' ? 'Pengaturan Kalender & Tarif' : activeMenu === 'generate' ? 'Pembuatan File Target Bank' : activeMenu === 'manajemen-akun' ? 'Manajemen Akun Firebase' : 'Rekonsiliasi Laporan Bank'}
                     </h2>
                     <p className="text-xs font-medium text-slate-500 mt-1 hidden sm:block">
                       {activeMenu === 'kelola-data' ? 'Kelola identitas, titik GPS, dan potret foto lapak pedagang untuk validasi lapangan.' : 'Terkoneksi langsung ke Cloud Database Firebase.'}
                     </p>
                   </div>
                </div>
                
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                   {isDbLoading ? <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin"/> : <CloudDownload className="w-3.5 h-3.5 text-blue-500"/>}
                   <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">{isDbLoading ? 'Menyinkronkan...' : 'Cloud Aktif'}</span>
                </div>
              </header>

              <main id="main-scroll-area" className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50/50 scroll-smooth relative">
                
                {/* 1. KONTEN DASHBOARD ADMIN */}
                {userRole === 'admin' && activeMenu === 'dashboard' && (
                  <div className="max-w-7xl mx-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-red-500">
                        <p className="text-sm font-semibold text-slate-500 flex items-center gap-2"><Wallet className="w-4 h-4 text-slate-400"/> Total Nilai Tunggakan</p>
                        <p className="text-3xl font-extrabold text-slate-800 mt-2">{formatRp(dashboardStats.totalUang)}</p>
                      </div>
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-orange-500">
                        <p className="text-sm font-semibold text-slate-500 flex items-center gap-2"><AlertOctagon className="w-4 h-4 text-slate-400"/> Sedang Menunggak</p>
                        <p className="text-3xl font-extrabold text-slate-800 mt-2">{dashboardStats.totalOrang} <span className="text-sm font-medium text-slate-500">Tagihan</span></p>
                      </div>
                      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-blue-500">
                        <p className="text-sm font-semibold text-slate-500 flex items-center gap-2"><Users className="w-4 h-4 text-slate-400"/> Total Item Ditagihkan</p>
                        <p className="text-3xl font-extrabold text-slate-800 mt-2">{merchants.length} <span className="text-sm font-medium text-slate-500">Entri</span></p>
                      </div>
                    </div>

                    <div className="bg-slate-800 rounded-xl shadow-sm p-5 text-white">
                      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 border-b border-slate-600 pb-2">Rincian Tunggakan Per Kategori Dagang</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {Object.entries(dashboardStats.breakdown).map(([kat, data]) => (
                          <div key={kat} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <p className={`text-xs font-bold mb-1 ${kat === 'LISTRIK' ? 'text-amber-400' : 'text-blue-400'}`}>{kat}</p>
                            <p className="text-xl font-bold text-white mb-0.5">{formatRp(data.hutang)}</p>
                            <p className="text-[10px] text-slate-400">Total Item: {data.count}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4">
                       <div className="flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                         <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
                            <div className="relative flex-grow sm:flex-grow-0">
                              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                              <input type="text" placeholder="Cari Nama / KTP / ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full sm:w-56 pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"/>
                            </div>
                            <div className="relative flex items-center">
                              <select value={`${sortConfig.key}-${sortConfig.direction}`} onChange={(e) => { if (!e.target.value || e.target.value === '-') { setSortConfig({ key: '', direction: 'asc' }); return; } const [key, direction] = e.target.value.split('-'); setSortConfig({ key, direction }); }} className="pl-8 pr-8 py-2.5 border border-slate-300 rounded-lg outline-none text-sm bg-slate-50 font-bold appearance-none cursor-pointer">
                                <option value="-">Urutkan Data</option>
                                <option value="keterangan-asc">Lokasi (A-Z)</option>
                                <option value="keterangan-desc">Lokasi (Z-A)</option>
                                <option value="jenisUsaha-asc">Jenis Usaha (A-Z)</option>
                                <option value="jenisUsaha-desc">Jenis Usaha (Z-A)</option>
                                <option value="nama-asc">Nama Pedagang (A-Z)</option>
                              </select>
                              <ArrowUpDown className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                            </div>
                         </div>
                       </div>

                       <div className="flex flex-wrap gap-3 items-center border-t border-slate-100 pt-4">
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mr-2"><Filter className="w-4 h-4" /> Filter:</div>
                          <select value={filterKategoriDashboard} onChange={(e) => setFilterKategoriDashboard(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm bg-white font-semibold cursor-pointer">
                            <option value="Semua">Semua Kategori</option>
                            <option value="PKL">PKL Umum</option>
                            <option value="LOKSEM">Loksem</option>
                            <option value="TIKAR">Tikar</option>
                            <option value="JURU FOTO">Juru Foto</option>
                            <option value="LISTRIK">Tagihan Listrik</option>
                          </select>
                          <div className="relative flex items-center"><MapPin className="w-4 h-4 text-blue-600 absolute left-3 pointer-events-none" />
                            <select value={filterLokasi} onChange={(e) => setFilterLokasi(e.target.value)} className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg outline-none text-sm bg-white font-semibold max-w-[200px] lg:max-w-[250px] truncate cursor-pointer"><option value="Semua">Semua Lokasi</option>{uniqueLokasi.map((loc, i) => <option key={i} value={loc}>{loc}</option>)}</select>
                          </div>
                          <div className="relative flex items-center"><Store className="w-4 h-4 text-blue-600 absolute left-3 pointer-events-none" />
                            <select value={filterJenisUsaha} onChange={(e) => setFilterJenisUsaha(e.target.value)} className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg outline-none text-sm bg-white font-semibold max-w-[200px] lg:max-w-[250px] truncate cursor-pointer"><option value="Semua">Semua Jenis Dagang</option>{uniqueJenisUsaha.map((ush, i) => <option key={i} value={ush}>{ush}</option>)}</select>
                          </div>
                          <label className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg border border-red-200 cursor-pointer text-red-700 lg:ml-auto">
                            <input type="checkbox" checked={showOnlyArrears} onChange={e => setShowOnlyArrears(e.target.checked)} className="rounded" />
                            <span className="text-sm font-bold">Hanya Tampilkan Menunggak</span>
                          </label>
                       </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                          <thead className="bg-slate-50 text-slate-700 uppercase text-[11px] font-bold border-b border-slate-200 tracking-wider">
                            <tr>
                              <th className="px-4 py-4 w-12 text-center">No</th>
                              <th className="px-4 py-4">Kategori & ID</th>
                              <th className="px-4 py-4">Nama & Lokasi</th>
                              <th className="px-4 py-4 w-48">Tipe Tarif (Ubah)</th>
                              <th className="px-4 py-4">Status & Tunggakan</th>
                              <th className="px-4 py-4 text-center">Aksi / Riwayat</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {isDbLoading && merchants.length === 0 ? (
                              <tr><td colSpan="6" className="px-6 py-12 text-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2"/> Memuat Data dari Cloud...</td></tr>
                            ) : filteredDashboardMerchants.map((row, idx) => {
                              let tagihanAktual = row.tagihanTetapBulanan;
                              if (row.tipeTarif === 'HARIAN_FULL') tagihanAktual = calStats.tarifHarianFull;
                              if (row.tipeTarif === 'HARIAN_FULL_NONSTOP') tagihanAktual = calStats.tarifHarianNonstop;
                              if (row.tipeTarif === 'HARIAN_WEEKEND') tagihanAktual = calStats.tarifWeekendSaja;

                              return (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                  <td className="px-4 py-4 align-top text-center text-slate-400 font-medium">{idx+1}</td>
                                  <td className="px-4 py-4 align-top">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border mb-1 ${row.kategori==='LOKSEM'?'bg-purple-100 text-purple-800':row.kategori==='TIKAR'?'bg-orange-100 text-orange-800':row.kategori==='LISTRIK'?'bg-amber-100 text-amber-800 border-amber-200':'bg-blue-100 text-blue-800'}`}>{row.kategori}</span>
                                    <div className="font-mono text-xs font-bold text-slate-900 flex items-center gap-1.5">
                                      {row.accountId} 
                                      {row.fotoLapak && <ImageIcon className="w-3.5 h-3.5 text-blue-500" title="Ada Foto Lapak"/>}
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 align-top">
                                    <div className="font-bold text-slate-800 uppercase leading-tight">{row.nama}</div>
                                    {row.jenisUsaha && row.jenisUsaha !== '-' && (<div className="text-[10px] font-extrabold text-blue-600 mt-1 tracking-wide uppercase">{row.jenisUsaha}</div>)}
                                    <div className="text-[11px] text-slate-500 mt-1 max-w-[220px] leading-snug line-clamp-2">{row.keterangan}</div>
                                  </td>
                                  <td className="px-4 py-4 align-top">
                                    <select value={row.tipeTarif} onChange={(e) => gantiTipeTarif(row, e.target.value)} className="text-[10px] font-bold px-2 py-1.5 border rounded outline-none w-full bg-slate-50 text-slate-700 cursor-pointer">
                                      <option value="HARIAN_FULL">Harian - Senin Tutup</option>
                                      <option value="HARIAN_FULL_NONSTOP">Harian - Nonstop</option>
                                      <option value="HARIAN_WEEKEND">Harian - Weekend Saja</option>
                                      <option value="TETAP">Bulanan Tetap / Dinamis</option>
                                    </select>
                                    <div className="text-[10px] text-slate-400 mt-1.5">Tagihan Tercatat: <b className="text-slate-600">{formatRp(tagihanAktual)}</b></div>
                                  </td>
                                  <td className="px-4 py-4 align-top">
                                    <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold inline-block mb-1.5 border ${row.totalTunggakan === 0 && (row.riwayatTagihan && row.riwayatTagihan.length > 0) ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : row.totalTunggakan > 0 ? 'bg-red-100 text-red-800 border-red-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                      {row.statusTerakhir}
                                    </span>
                                    {(!row.riwayatTagihan || row.riwayatTagihan.length === 0) ? (<div className="text-[10px] text-slate-400 italic">Belum direkon.</div>) : (
                                      <div className="space-y-1.5 mt-1">
                                        {row.bulanLunas && row.bulanLunas.length > 0 && (<div className="flex flex-col gap-0.5"><span className="text-[9px] font-bold text-emerald-600 uppercase">✓ Lunas:</span><div className="flex flex-wrap gap-1">{row.bulanLunas.map((bln, i) => <span key={i} className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">{bln}</span>)}</div></div>)}
                                        {row.bulanMenunggak && row.bulanMenunggak.length > 0 && (<div className="flex flex-col gap-0.5 mt-1"><span className="text-[9px] font-bold text-red-600 uppercase">✗ Nunggak:</span><div className="flex flex-wrap gap-1">{row.bulanMenunggak.map((bln, i) => <span key={i} className="bg-red-50 text-red-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-red-200">{bln}</span>)}</div></div>)}
                                      </div>
                                    )}
                                    {row.totalTunggakan > 0 && <div className="mt-2 font-bold text-red-700 text-[10px] bg-red-50 px-2 py-1 rounded border border-red-200 inline-block">Total Hutang: {formatRp(row.totalTunggakan)}</div>}
                                  </td>
                                  <td className="px-4 py-4 align-top">
                                    <button onClick={() => setSelectedMerchant(row)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[11px] font-bold transition-colors w-full justify-center"><Eye className="w-3.5 h-3.5"/> Histori</button>
                                  </td>
                                </tr>
                              );
                            })}
                            {!isDbLoading && filteredDashboardMerchants.length === 0 && <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400">Tidak ada data ditemukan. Silakan tambahkan data.</td></tr>}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. KONTEN PETA (DENGAN ANIMASI & RUTE) */}
                {activeMenu === 'peta' && (
                  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6 lg:h-[calc(100vh-8rem)] animate-in fade-in relative">
                    <div className="w-full h-[55vh] lg:h-auto lg:flex-1 bg-slate-200 rounded-2xl relative overflow-hidden shadow-xl border border-slate-300 flex flex-col z-0 shrink-0">
                       <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 flex justify-between items-start z-[1000] pointer-events-none gap-2">
                          <div className="bg-white/90 backdrop-blur px-3 py-2 sm:px-4 sm:py-3 rounded-xl shadow-lg border border-slate-200 pointer-events-auto max-w-[60%] sm:max-w-none">
                            <h3 className="font-extrabold flex items-center gap-1.5 text-slate-800 text-xs sm:text-sm"><MapIcon className="w-4 h-4 text-blue-600 shrink-0"/> <span className="truncate">Satelit TM Ragunan</span></h3>
                            <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 sm:mt-1 max-w-[280px] leading-snug hidden sm:block">
                               Data pin diambil Real-Time dari Firebase Cloud. Klik pada pin untuk melihat foto lapak & buat rute jalan kaki.
                            </p>
                          </div>
                          <div className="bg-white/90 backdrop-blur p-2 sm:p-3 rounded-xl shadow-lg border border-slate-200 flex flex-col gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
                             <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[11px] font-bold text-slate-700">
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border border-emerald-600 shadow-sm shrink-0"></span> <span className="hidden sm:inline">Pembayaran Lancar</span><span className="sm:hidden">Lancar</span>
                             </div>
                             <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[11px] font-bold text-slate-700">
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 border border-red-600 shadow-sm shrink-0"></span> <span className="hidden sm:inline">Ada Tunggakan</span><span className="sm:hidden">Nunggak</span>
                             </div>
                          </div>
                       </div>

                       <button onClick={toggleUserLocation} className={`absolute bottom-6 right-2 sm:bottom-6 sm:right-4 z-[1000] p-3 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-2 transition-all flex items-center justify-center ${isTrackingLocation ? 'bg-blue-600 text-white border-blue-400' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`} title="Lacak Lokasi Saya">
                          {isTrackingLocation ? <MapPinOff className="w-6 h-6" /> : <Crosshair className="w-6 h-6" />}
                       </button>

                       {/* KARTU DETAIL PETA MELAYANG SAAT MARKER DIKLIK */}
                       {selectedMapMerchant && (
                          <div className={`absolute bottom-4 left-4 right-16 sm:left-auto sm:right-20 ${isMapPopupMinimized ? 'w-auto max-w-[80%]' : 'sm:w-80'} bg-white rounded-2xl shadow-2xl border border-slate-200 z-[2000] transition-all duration-300 ${isMapPopupMinimized ? 'p-3' : 'p-4'}`}>
                             {/* Minimize Toggle Button */}
                             <button onClick={() => setIsMapPopupMinimized(!isMapPopupMinimized)} className="absolute top-3 right-10 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full z-10 transition-colors" title={isMapPopupMinimized ? "Perbesar" : "Kecilkan"}>
                                {isMapPopupMinimized ? <ChevronUp className="w-4 h-4 text-slate-600"/> : <ChevronDown className="w-4 h-4 text-slate-600"/>}
                             </button>
                             {/* Close Button */}
                             <button onClick={() => setSelectedMapMerchant(null)} className="absolute top-3 right-3 p-1.5 bg-red-50 hover:bg-red-100 rounded-full z-10 transition-colors" title="Tutup">
                                <X className="w-4 h-4 text-red-500"/>
                             </button>

                             {isMapPopupMinimized ? (
                                /* TAMPILAN KETIKA DI-MINIMIZE (KECIL) */
                                <div className="flex items-center gap-3 pr-14 cursor-pointer" onClick={() => setIsMapPopupMinimized(false)}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${selectedMapMerchant.totalTunggakan > 0 ? 'bg-red-100 border-red-300' : 'bg-emerald-100 border-emerald-300'}`}>
                                        <Store className={`w-4 h-4 ${selectedMapMerchant.totalTunggakan > 0 ? 'text-red-600' : 'text-emerald-600'}`}/>
                                    </div>
                                    <div className="truncate">
                                        <h4 className="font-bold text-slate-800 text-sm truncate pr-2">{selectedMapMerchant.nama}</h4>
                                        {routeInfo ? (
                                           <p className="text-[10px] text-blue-600 font-bold truncate flex items-center gap-1"><PersonWalking className="w-3 h-3"/> {routeInfo.distance} • {routeInfo.duration}</p>
                                        ) : (
                                           <p className="text-[10px] text-slate-500 truncate">{selectedMapMerchant.keterangan}</p>
                                        )}
                                    </div>
                                </div>
                             ) : (
                                /* TAMPILAN NORMAL (BESAR) */
                                <div className="animate-in fade-in zoom-in-95 duration-200">
                                   {selectedMapMerchant.fotoLapak && (
                                      <div className="h-32 w-full rounded-xl overflow-hidden mb-3 bg-slate-100 mt-7 sm:mt-0">
                                         <img src={selectedMapMerchant.fotoLapak} className="w-full h-full object-cover" alt="Foto Lapak" />
                                      </div>
                                   )}
                                   
                                   <div className={`flex gap-2 items-center mb-1.5 ${!selectedMapMerchant.fotoLapak ? 'mt-8 sm:mt-0' : ''}`}>
                                      <span className="bg-blue-100 text-blue-800 text-[9px] font-extrabold px-2 py-0.5 rounded tracking-wide border border-blue-200">{selectedMapMerchant.kategori}</span>
                                      <span className="font-mono text-[10px] font-bold text-slate-500">{selectedMapMerchant.accountId}</span>
                                   </div>
                                   
                                   <h4 className="font-bold text-slate-800 leading-tight mb-1 text-base pr-8">{selectedMapMerchant.nama}</h4>
                                   <p className="text-xs text-slate-500 flex items-start gap-1"><MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-500"/> <span className="line-clamp-2">{selectedMapMerchant.keterangan}</span></p>
                                   
                                   <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center bg-slate-50 rounded-lg p-2 mb-3">
                                      {selectedMapMerchant.totalTunggakan > 0 ? (
                                         <div>
                                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wide">Tunggakan Terdata</p>
                                            <p className="text-sm font-black text-red-600">{formatRp(selectedMapMerchant.totalTunggakan)}</p>
                                         </div>
                                      ) : (
                                         <div className="flex items-center gap-1.5 text-emerald-700">
                                            <CheckCircle className="w-5 h-5"/>
                                            <div>
                                               <p className="text-xs font-bold">Lunas / Aman</p>
                                               <p className="text-[9px] font-medium opacity-80">Tidak ada tunggakan</p>
                                            </div>
                                         </div>
                                      )}
                                      <button onClick={() => flyToMerchantOnMap(selectedMapMerchant)} className="p-2.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 shadow-sm transition-colors" title="Pusatkan Peta"><Crosshair className="w-4 h-4"/></button>
                                   </div>

                                   {/* FITUR TOMBOL RUTE JALAN KAKI */}
                                   <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 mt-1">
                                      <p className="text-[10px] font-bold text-slate-500 text-center mb-1">Pilih metode panduan arah:</p>
                                      
                                      <div className="grid grid-cols-2 gap-2">
                                          <button 
                                             onClick={handleCalculateRoute} 
                                             disabled={isCalculatingRoute || !isTrackingLocation}
                                             className={`w-full py-2.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors ${!isTrackingLocation ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'}`}
                                             title="Gambar rute garis di peta aplikasi"
                                          >
                                             {isCalculatingRoute ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <RouteIcon className="w-3.5 h-3.5"/>} 
                                             Rute Peta
                                          </button>
                                          
                                          <button 
                                             onClick={handleOpenGoogleMapsRoute} 
                                             disabled={!isTrackingLocation}
                                             className={`w-full py-2.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors ${!isTrackingLocation ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'}`}
                                             title="Buka rute akurat via Google Maps"
                                          >
                                             <ExternalLink className="w-3.5 h-3.5"/> 
                                             Google Maps
                                          </button>
                                      </div>
                                      
                                      {routeInfo && (
                                         <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg flex items-center justify-between text-emerald-800 mt-1">
                                            <div className="flex items-center gap-2">
                                               <PersonWalking className="w-4 h-4"/>
                                               <div className="text-[10px] font-bold leading-tight">
                                                  <p>Estimasi Tiba:</p>
                                                  <p className="text-xs font-black">{routeInfo.duration}</p>
                                               </div>
                                            </div>
                                            <div className="text-right text-[10px] font-bold">
                                               <p>Jarak Tempuh:</p>
                                               <p className="text-xs">{routeInfo.distance}</p>
                                            </div>
                                         </div>
                                      )}
                                      {!isTrackingLocation && (
                                         <p className="text-[9px] text-red-500 font-bold text-center mt-1">⚠️ Aktifkan GPS lokasi Anda terlebih dahulu.</p>
                                      )}
                                   </div>
                                </div>
                             )}
                          </div>
                       )}

                       <div id="ragunan-map" className="w-full h-full z-0"></div>
                       
                       {!isLeafletLoaded && (
                         <div className="absolute inset-0 bg-slate-100 flex items-center justify-center flex-col z-10">
                           <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-blue-500 mb-2" />
                           <p className="text-xs sm:text-sm font-bold text-slate-500">Memuat Engine Peta...</p>
                         </div>
                       )}
                    </div>

                    <div className="w-full h-[60vh] lg:h-auto lg:w-[380px] bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden shrink-0 z-10 relative">
                       <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 shrink-0">
                          <label className="block text-[10px] sm:text-xs font-bold text-slate-500 mb-1.5 sm:mb-2 uppercase tracking-widest"><Filter className="w-3.5 h-3.5 inline mb-0.5"/> Filter Zonasi Peta</label>
                          <select value={selectedZone} onChange={e => { setSelectedZone(e.target.value); setSelectedMapMerchant(null); }} className="w-full px-3 py-2 sm:py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm font-bold text-slate-700 shadow-sm outline-none cursor-pointer focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                            {mapZonesData.map((z, i) => <option key={i} value={z.id}>{z.name}</option>)}
                          </select>
                       </div>

                       {(() => {
                         const merchantsInZone = merchants.filter(m => selectedZone === 'SEMUA AREA' || String(m.keterangan).toUpperCase().includes(selectedZone.replace('PINTU ', '').replace('AREA ', '')));
                         const nunggakCount = merchantsInZone.filter(m => m.totalTunggakan > 0).length;
                         const totalUangNunggak = merchantsInZone.reduce((sum, m) => sum + m.totalTunggakan, 0);

                         return (
                           <>
                             <div className="p-4 sm:p-5 bg-slate-800 text-white shrink-0">
                               <div className="flex justify-between items-start mb-3 sm:mb-4">
                                 <div>
                                   <h4 className="text-[9px] sm:text-[10px] font-extrabold text-blue-400 uppercase tracking-widest mb-0.5 sm:mb-1">Rangkuman Area</h4>
                                   <h3 className="text-base sm:text-lg font-black tracking-tight leading-none">{mapZonesData.find(z => z.id === selectedZone)?.name || selectedZone}</h3>
                                 </div>
                                 <div className="bg-slate-700 p-1.5 sm:p-2 rounded-lg text-center min-w-[40px] sm:min-w-[50px]">
                                   <p className="text-[8px] sm:text-[9px] font-bold text-slate-300">ENTRI</p>
                                   <p className="text-base sm:text-lg font-bold">{merchantsInZone.length}</p>
                                 </div>
                               </div>
                               <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-1 sm:mt-2">
                                 <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-2 sm:p-2.5">
                                   <p className="text-[8px] sm:text-[9px] font-bold text-red-400 uppercase">Perlu Ditagih</p>
                                   <p className="text-sm sm:text-base font-bold text-red-300">{nunggakCount} <span className="text-[9px] sm:text-[10px]">Orang</span></p>
                                 </div>
                                 <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-2 sm:p-2.5">
                                   <p className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase">Potensi Kas</p>
                                   <p className="text-[11px] sm:text-xs font-bold text-white mt-0.5 sm:mt-1">{formatRp(totalUangNunggak)}</p>
                                 </div>
                               </div>
                             </div>
                             
                             <div className="p-2.5 sm:p-3 border-b border-slate-100 bg-blue-50/50 flex items-center gap-1.5 sm:gap-2 shrink-0 text-blue-700">
                                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                                <p className="text-[9px] sm:text-[10px] font-bold leading-tight">Klik pada salah satu nama di bawah untuk memunculkan radar lokasi di peta.</p>
                             </div>

                             <div className="flex-1 overflow-y-auto p-2 bg-slate-50/50">
                               {merchantsInZone.length === 0 ? (
                                 <div className="p-6 sm:p-8 text-center text-slate-400 text-xs sm:text-sm">Tidak ada entri terdeteksi di area ini.</div>
                               ) : (
                                 <ul className="space-y-2">
                                   {merchantsInZone.sort((a,b) => b.totalTunggakan - a.totalTunggakan).map((m, idx) => (
                                     <li key={idx} onClick={() => flyToMerchantOnMap(m)} className={`p-2.5 sm:p-3 bg-white border ${selectedMapMerchant?.uid === m.uid ? 'border-blue-400 ring-1 ring-blue-300 shadow-md' : 'border-slate-200 shadow-sm'} rounded-xl hover:bg-blue-50 transition-all flex flex-col gap-1.5 sm:gap-2 cursor-pointer group`}>
                                       <div className="flex justify-between items-start gap-2">
                                         <div className="truncate">
                                           <h5 className="font-bold text-xs sm:text-sm text-slate-800 truncate group-hover:text-blue-600 transition-colors flex items-center gap-1">{m.nama} {m.fotoLapak && <ImageIcon className="w-3 h-3 text-emerald-500" />}</h5>
                                           <p className="text-[9px] sm:text-[10px] text-slate-500 font-mono truncate">{m.accountId} • {m.kategori}</p>
                                         </div>
                                         {m.totalTunggakan > 0 ? (
                                            <span className="shrink-0 bg-red-100 text-red-700 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-extrabold border border-red-200">HUTANG</span>
                                         ) : (
                                            <span className="shrink-0 bg-emerald-100 text-emerald-700 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-extrabold border border-emerald-200">LUNAS</span>
                                         )}
                                       </div>
                                       <div className="flex justify-between items-end">
                                          <p className="text-[9px] sm:text-[10px] text-slate-500 max-w-[150px] sm:max-w-[180px] truncate"><MapPin className="inline w-2.5 h-2.5 sm:w-3 sm:h-3 mb-0.5 text-slate-400"/> {m.keterangan}</p>
                                          {m.totalTunggakan > 0 && <p className="text-[10px] sm:text-[11px] font-bold text-red-600">{formatRp(m.totalTunggakan)}</p>}
                                       </div>
                                     </li>
                                   ))}
                                 </ul>
                               )}
                             </div>
                           </>
                         );
                       })()}
                    </div>
                  </div>
                )}

                {/* 3. KELOLA DATA MASTERS */}
                {activeMenu === 'kelola-data' && (
                  <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between gap-6 items-center">
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2"><Contact className="w-5 h-5 text-blue-600"/> Manajemen Data Pedagang</h3>
                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">Sistem tersinkronisasi dengan <CloudDownload className="w-3.5 h-3.5 text-blue-500"/> Firebase Cloud.</p>
                      </div>
                      
                      {userRole === 'admin' && (
                        <div className="flex flex-wrap gap-2 items-center">
                            <select value={importKategori} onChange={(e) => setImportKategori(e.target.value)} className="px-3 py-2.5 border border-slate-300 rounded-lg outline-none text-sm font-medium bg-slate-50 cursor-pointer">
                              <option value="PKL">Import: PKL</option>
                              <option value="LOKSEM">Import: Loksem</option>
                              <option value="TIKAR">Import: Tikar</option>
                              <option value="JURU FOTO">Import: Foto</option>
                              <option value="LISTRIK">Import: Listrik</option>
                            </select>
                            <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg cursor-pointer transition-colors text-sm font-semibold shadow-sm">
                              <Upload className="w-4 h-4" /> Import Excel Master
                              <input type="file" accept=".xlsx, .xls, .csv" className="hidden" onChange={handleImportMaster} />
                            </label>
                            <button onClick={() => setShowAddModal(true)} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm">
                              <PlusCircle className="w-4 h-4" /> Entri Baru
                            </button>
                            {merchants.length > 0 && (
                              <button onClick={handleClearCache} className="flex items-center justify-center gap-1 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ml-auto" title="Hapus semua data dari Cloud">
                                <Trash2 className="w-4 h-4" /> Kosongkan DB
                              </button>
                            )}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm flex flex-col justify-center">
                         <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">Total Entri</p>
                         <p className="text-3xl font-black text-blue-800 mt-1">{masterDataStats.total}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                         <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">PKL Umum</p>
                         <p className="text-3xl font-black text-slate-800 mt-1">{masterDataStats.kategori['PKL']}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200 shadow-sm flex flex-col justify-center">
                         <p className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider">Lapak Loksem</p>
                         <p className="text-3xl font-black text-purple-800 mt-1">{masterDataStats.kategori['LOKSEM']}</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 shadow-sm flex flex-col justify-center">
                         <p className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider">Sewa Tikar</p>
                         <p className="text-3xl font-black text-orange-800 mt-1">{masterDataStats.kategori['TIKAR']}</p>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 shadow-sm flex flex-col justify-center">
                         <p className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider">Juru Foto</p>
                         <p className="text-3xl font-black text-indigo-800 mt-1">{masterDataStats.kategori['JURU FOTO']}</p>
                      </div>
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm flex flex-col justify-center">
                         <p className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider">Tagihan Listrik</p>
                         <p className="text-3xl font-black text-amber-800 mt-1">{masterDataStats.kategori['LISTRIK']}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-4">
                        <div className="relative flex-grow max-w-sm">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input type="text" placeholder="Cari Nama / NIK / ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"/>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                          <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200 tracking-wider">
                            <tr>
                              <th className="px-4 py-3">ID & Kategori</th>
                              <th className="px-4 py-3">Nama & Keterangan</th>
                              <th className="px-4 py-3">Titik Koordinat (Map)</th>
                              <th className="px-4 py-3">Kontak & Rekening</th>
                              <th className="px-4 py-3 w-64">Alamat Rumah</th>
                              <th className="px-4 py-3 text-center">Aksi (Cloud)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {isDbLoading && merchants.length === 0 ? (
                               <tr><td colSpan="6" className="px-6 py-12 text-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2"/> Memuat Data dari Cloud...</td></tr>
                            ) : filteredDashboardMerchants.map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3 align-top">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold border mb-1 ${row.kategori==='LOKSEM'?'bg-purple-100 text-purple-800':row.kategori==='TIKAR'?'bg-orange-100 text-orange-800':row.kategori==='LISTRIK'?'bg-amber-100 text-amber-800 border-amber-200':'bg-blue-100 text-blue-800'}`}>{row.kategori}</span>
                                  <div className="font-mono text-xs font-bold text-slate-900">{row.accountId}</div>
                                  {row.fotoLapak && (
                                    <div className="mt-1 flex items-center gap-1 text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded w-fit border border-emerald-100"><Camera className="w-3 h-3"/> Ada Foto</div>
                                  )}
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <div className="font-bold text-slate-800">{row.nama}</div>
                                  <div className="text-[10px] text-blue-600 mt-0.5">{row.jenisUsaha}</div>
                                  <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3"/> {row.keterangan}</div>
                                </td>
                                <td className="px-4 py-3 align-top font-mono text-xs text-slate-700">
                                  {row.lat && row.lng ? (
                                     <div>
                                        <div className="flex items-center gap-1 text-emerald-600 font-bold mb-0.5"><CheckCircle className="w-3 h-3"/> Terpetakan</div>
                                        <div className="text-[10px] text-slate-500">{Number(row.lat).toFixed(5)}, {Number(row.lng).toFixed(5)}</div>
                                     </div>
                                  ) : (
                                     <div className="flex items-center gap-1 text-red-500 font-bold text-[10px]"><AlertTriangle className="w-3 h-3"/> Belum Ada Titik</div>
                                  )}
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <div className="flex items-center gap-1.5 text-xs text-slate-700 mb-1"><Phone className="w-3.5 h-3.5 text-slate-400"/> {row.noHp}</div>
                                  <div className="flex items-center gap-1.5 text-xs text-slate-700"><CreditCard className="w-3.5 h-3.5 text-slate-400"/> {row.rekeningSumber || '-'}</div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                  <div className="flex items-start gap-1.5 text-[11px] text-slate-600 leading-snug"><Home className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5"/> {row.alamatRumah}</div>
                                </td>
                                <td className="px-4 py-3 align-top text-center">
                                  <div className="flex flex-col gap-1.5">
                                    <button onClick={() => setEditModal({ isOpen: true, data: row })} className="p-1.5 flex items-center justify-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-colors text-[10px] font-bold"><Pencil className="w-3.5 h-3.5"/> Edit Data</button>
                                    
                                    {userRole === 'admin' && (
                                      <button onClick={() => handleDeleteSatuan(row)} className="p-1.5 flex items-center justify-center gap-1.5 bg-red-50 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors text-[10px] font-bold"><XCircle className="w-3.5 h-3.5"/> Hapus</button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. SETTING KALENDER (TERMASUK SKB) */}
                {userRole === 'admin' && activeMenu === 'kalender' && (
                  <div className="max-w-6xl mx-auto space-y-6">
                    <div className="flex flex-col xl:flex-row gap-6">
                      <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-100 pb-4 gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-blue-600"/> Kalender Penagihan & SKB</h3>
                            <p className="text-xs text-slate-500 mt-1">Sinkronisasikan SKB atau klik tanggal untuk menetapkan manual.</p>
                          </div>
                          <div className="flex flex-wrap gap-2 items-center">
                            <select value={calMonth} onChange={e => setCalMonth(parseInt(e.target.value))} className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                              {['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'].map((m, i) => <option key={i} value={i+1}>{m}</option>)}
                            </select>
                            <input type="number" value={calYear} onChange={e => setCalYear(parseInt(e.target.value))} className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-slate-50 outline-none text-center focus:ring-2 focus:ring-blue-500"/>
                            <button onClick={handleSyncHolidays} disabled={isSyncing} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 shadow-sm" title="Tarik data Libur & Cuti Bersama SKB">
                              {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CloudDownload className="w-4 h-4" />} Sinkronisasi SKB
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                          <div>Min</div><div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {(() => {
                            const daysInMonth = new Date(calYear, calMonth, 0).getDate();
                            const firstDayIndex = new Date(calYear, calMonth - 1, 1).getDay();
                            const days = [];
                            
                            const today = new Date();
                            const tzOffset = today.getTimezoneOffset() * 60000;
                            const todayStr = (new Date(today - tzOffset)).toISOString().split('T')[0];
                            
                            for (let i = 0; i < firstDayIndex; i++) days.push(<div key={`blank-${i}`} className="p-4 border border-transparent"></div>);
                            
                            for (let i = 1; i <= daysInMonth; i++) {
                              const dateStr = `${calYear}-${String(calMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                              const isSpecial = specialDates[dateStr]?.type;
                              const dayOfWeek = new Date(calYear, calMonth - 1, i).getDay();
                              const isToday = dateStr === todayStr;
                              
                              let baseColor = "bg-white border-slate-200 hover:bg-slate-50", label = "Hari Biasa";
                              let showPrice = "Rp 10k", priceColor = "bg-emerald-100/70 text-emerald-700";

                              if (isSpecial === 'LIBUR') { 
                                baseColor = "bg-red-100 border-red-300 text-red-900 shadow-sm ring-1 ring-red-400"; label = specialDates[dateStr]?.name || "Libur Nasional"; 
                                showPrice = "Rp 15k"; priceColor = "bg-white/50 text-red-700";
                              } 
                              else if (isSpecial === 'PEAK') { 
                                baseColor = "bg-amber-100 border-amber-300 text-amber-900 shadow-sm ring-1 ring-amber-400"; label = specialDates[dateStr]?.name || "Peak Season"; 
                                showPrice = "Rp 15k"; priceColor = "bg-white/50 text-red-700";
                              }
                              else if (isSpecial === 'TUTUP') { 
                                baseColor = "bg-slate-200 border-slate-400 text-slate-700 shadow-sm ring-1 ring-slate-400"; label = specialDates[dateStr]?.name || "Hari Tutup (Ganti)"; 
                                showPrice = "Loksem Buka 10k"; priceColor = "opacity-60 text-slate-800";
                              }
                              else if (isSpecial === 'BUKA') {
                                baseColor = "bg-blue-50 border-blue-300 text-blue-900 shadow-sm ring-1 ring-blue-400"; label = specialDates[dateStr]?.name || "Buka Pengganti";
                                showPrice = "Rp 10k"; priceColor = "bg-emerald-100/70 text-emerald-700";
                              }
                              else if (dayOfWeek === 1) { 
                                baseColor = "bg-slate-100 border-slate-200 text-slate-400"; label = "Senin (PKL Tutup)"; 
                                showPrice = "Loksem Buka 10k"; priceColor = "opacity-60 text-slate-800";
                              } 
                              else if (dayOfWeek === 0 || dayOfWeek === 6) { 
                                baseColor = "bg-blue-50 border-blue-200 text-blue-900"; label = "Weekend"; 
                                showPrice = "Rp 15k"; priceColor = "bg-white/50 text-red-700";
                              } 
                              else { 
                                baseColor = "bg-emerald-50 border-emerald-200 text-emerald-900"; 
                              }

                              days.push(
                                <div key={i} onClick={() => handleDayClick(i)} className={`p-2 border rounded-xl flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95 min-h-[90px] relative group overflow-hidden ${baseColor} ${isToday ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
                                  {isToday && <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>}
                                  <span className="text-xl font-bold">{i}</span>
                                  <span className="text-[10px] font-medium text-center leading-tight mt-1 px-1 line-clamp-2">{label}</span>
                                  <span className={`text-[10px] font-bold mt-1 px-1.5 rounded ${priceColor}`}>{showPrice}</span>
                                </div>
                              );
                            }
                            return days;
                          })()}
                        </div>
                      </div>
                      <div className="w-full xl:w-80 space-y-4">
                        <div className="bg-slate-800 p-6 rounded-xl shadow-md text-white">
                          <h4 className="font-bold mb-4 border-b border-slate-600 pb-2 flex items-center gap-2"><DollarSign className="w-5 h-5"/> Simulasi Tagihan Bulan Ini</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center"><span className="text-slate-300">Hari Biasa (Rp 10k)</span><span className="font-bold">{calStats.hariBiasa} Hari</span></div>
                            <div className="flex justify-between items-center"><span className="text-amber-300">Peak / Weekend / Cuti (Rp 15k)</span><span className="font-bold">{calStats.hariRamai} Hari</span></div>
                            <div className="flex justify-between items-center opacity-70"><span className="text-slate-300">Tutup Operasional</span><span className="font-bold">{calStats.tutupOperasional} Hari</span></div>
                          </div>
                          <div className="mt-6 pt-4 border-t border-slate-600 space-y-4">
                            <div className="bg-emerald-900/50 p-3 rounded-lg border border-emerald-800/50">
                              <p className="text-[11px] text-emerald-200 uppercase font-bold tracking-wide">1. Loksem (Nonstop Buka)</p>
                              <p className="text-2xl font-bold text-emerald-400">{formatRp(calStats.tarifHarianNonstop)}</p>
                            </div>
                            <div>
                              <p className="text-[11px] text-slate-300 uppercase font-bold tracking-wide">2. PKL / Foto (Senin Libur)</p>
                              <p className="text-xl font-bold text-white">{formatRp(calStats.tarifHarianFull)}</p>
                            </div>
                            <div>
                              <p className="text-[11px] text-slate-300 uppercase font-bold tracking-wide">3. Tikar (Weekend Saja)</p>
                              <p className="text-xl font-bold text-white">{formatRp(calStats.tarifWeekendSaja)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. GENERATE EXCEL */}
                {userRole === 'admin' && activeMenu === 'generate' && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
                      <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0"><FileSpreadsheet className="w-6 h-6 text-blue-600" /></div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-800">Generate Target JakOne Bill</h2>
                          <p className="text-slate-500 text-sm mt-1">Sistem akan menyusun tagihan otomatis menyesuaikan target pedagang/listrik.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
                            <label className="block text-sm font-bold text-blue-800 mb-1">Kategori Export</label>
                            <select value={formGenerate.kategoriExport} onChange={(e) => setFormGenerate({...formGenerate, kategoriExport: e.target.value})} className="w-full px-3 py-2 border border-blue-200 rounded text-sm font-bold bg-white outline-none cursor-pointer">
                              <option value="Semua">Semua Kategori</option>
                              <option value="PKL">PKL Umum Saja</option>
                              <option value="LOKSEM">Loksem Saja</option>
                              <option value="TIKAR">Tikar Saja</option>
                              <option value="JURU FOTO">Juru Foto Saja</option>
                              <option value="LISTRIK">Tagihan Listrik Saja</option>
                            </select>
                          </div>
                          <div><label className="block text-sm font-semibold text-slate-700 mb-1">Periode (Bulan/Tahun)</label><input name="periode" value={formGenerate.periode} onChange={(e) => setFormGenerate({...formGenerate, periode: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500"/></div>
                          <div><label className="block text-sm font-semibold text-slate-700 mb-1">Jenis Tagihan (Bank DKI)</label><input name="jenisTagihan" value={formGenerate.jenisTagihan} onChange={(e) => setFormGenerate({...formGenerate, jenisTagihan: e.target.value})} className="w-full px-3 py-2 border border-blue-300 rounded text-sm font-bold text-blue-800 bg-blue-50 outline-none"/></div>
                          <div><label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi</label><input name="deskripsi" value={formGenerate.deskripsi} onChange={(e) => setFormGenerate({...formGenerate, deskripsi: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500"/></div>
                        </div>
                        <div className="space-y-4">
                           <div><label className="block text-sm font-semibold text-slate-700 mb-1">Default Keterangan 3</label><input name="keterangan3" value={formGenerate.keterangan3} onChange={(e) => setFormGenerate({...formGenerate, keterangan3: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500"/></div>
                          <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm font-semibold text-slate-700 mb-1">Mulai Bayar</label><input name="tglMulaiBayar" value={formGenerate.tglMulaiBayar} onChange={(e) => setFormGenerate({...formGenerate, tglMulaiBayar: e.target.value})} type="date" className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500"/></div>
                            <div><label className="block text-sm font-semibold text-slate-700 mb-1">Jatuh Tempo</label><input name="tglJatuhTempo" value={formGenerate.tglJatuhTempo} onChange={(e) => setFormGenerate({...formGenerate, tglJatuhTempo: e.target.value})} type="number" className="w-full px-3 py-2 border border-slate-300 rounded text-sm outline-none focus:border-blue-500"/></div>
                          </div>
                          <div><label className="block text-sm font-semibold text-slate-700 mb-1">Rekening Tujuan</label><input name="rekTujuan" value={formGenerate.rekTujuan} onChange={(e) => setFormGenerate({...formGenerate, rekTujuan: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-slate-50 outline-none focus:border-blue-500"/></div>
                          
                          <div><label className="block text-sm font-bold text-blue-700 mb-1">Email PIC / Default</label><input name="defaultEmail" value={formGenerate.defaultEmail} onChange={(e) => setFormGenerate({...formGenerate, defaultEmail: e.target.value})} className="w-full px-3 py-2 border border-blue-300 rounded text-sm bg-blue-50 outline-none focus:border-blue-500"/></div>
                        </div>
                      </div>

                      <button onClick={handleGenerateExcel} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md flex justify-center items-center gap-2 mx-auto transition-colors"><Download className="w-5 h-5" /> Download File UPLOAD Bank</button>
                    </div>
                  </div>
                )}

                {/* 6. REKON LAPORAN */}
                {userRole === 'admin' && activeMenu === 'rekon' && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
                      <div className="flex items-start gap-4 mb-6 border-b border-slate-100 pb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0"><Settings className="w-6 h-6 text-blue-600" /></div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-800 mb-1">Rekonsiliasi Laporan Bank (Auto-Cloud)</h2>
                          <p className="text-slate-500 text-sm">Upload file <b>REPORT TRANSAKSI</b> Bank. Sistem akan otomatis menyinkronkan status Lunas/Hutang ke Firebase Cloud.</p>
                        </div>
                      </div>

                      <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-blue-200 border-dashed rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors mb-6">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <FileText className="w-10 h-10 text-blue-500 mb-3" />
                          <p className="text-lg text-blue-700 font-semibold mb-1">Pilih File Report (Excel/CSV)</p>
                        </div>
                        <input type="file" accept=".xlsx, .xls, .csv" className="hidden" onChange={handleUploadReport} />
                      </label>

                      {lastRekonReport && (
                        <div className="mt-8 pt-6 border-t border-slate-200 animate-in fade-in">
                          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Hasil Eksekusi Sinkronisasi Terakhir</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100"><p className="text-xs text-emerald-600 font-bold uppercase">Berhasil Terdebet</p><p className="text-2xl font-bold text-emerald-700 mt-1">{lastRekonReport.sukses} <span className="text-sm">Data</span></p></div>
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100"><p className="text-xs text-red-600 font-bold uppercase">Gagal Saldo / Rek</p><p className="text-2xl font-bold text-red-700 mt-1">{lastRekonReport.gagal} <span className="text-sm">Data</span></p></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 7. MANAJEMEN AKUN ADMIN */}
                {userRole === 'admin' && activeMenu === 'manajemen-akun' && (
                   <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in">
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                         <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0"><UserCog className="w-6 h-6 text-blue-600" /></div>
                            <div>
                              <h2 className="text-xl font-bold text-slate-800">Manajemen Akun Sistem</h2>
                              <p className="text-slate-500 text-sm mt-1">Daftarkan akun email petugas baru atau cabut akses akun lama secara langsung ke Firebase Auth.</p>
                            </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            
                            <div className="md:col-span-1 bg-slate-50 p-5 rounded-xl border border-slate-200 h-fit">
                               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><UserPlus className="w-4 h-4 text-emerald-600"/> Daftarkan Akun Baru</h3>
                               <form onSubmit={handleRegisterUser} className="space-y-4">
                                  <div>
                                     <label className="block text-xs font-bold text-slate-600 mb-1">Email Pendaftaran</label>
                                     <input type="email" required value={newUserReg.email} onChange={e => setNewUserReg({...newUserReg, email: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white" placeholder="petugas@ragunan.com"/>
                                  </div>
                                  <div>
                                     <label className="block text-xs font-bold text-slate-600 mb-1">Password Awal (Min 6 Karakter)</label>
                                     <input type="password" required value={newUserReg.password} onChange={e => setNewUserReg({...newUserReg, password: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white" placeholder="••••••••"/>
                                  </div>
                                  <div>
                                     <label className="block text-xs font-bold text-slate-600 mb-1">Pilih Hak Akses (Role)</label>
                                     <select value={newUserReg.role} onChange={e => setNewUserReg({...newUserReg, role: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm bg-white cursor-pointer font-bold text-slate-700">
                                        <option value="petugas">Petugas Lapangan</option>
                                        <option value="admin">Admin (Akses Penuh)</option>
                                     </select>
                                  </div>
                                  <button type="submit" disabled={isCreatingUser} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-md transition-colors flex justify-center items-center gap-2 mt-2 disabled:opacity-70">
                                     {isCreatingUser ? <Loader2 className="w-4 h-4 animate-spin"/> : "Daftarkan Akun"}
                                  </button>
                               </form>
                            </div>

                            <div className="md:col-span-2">
                               <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                                  <table className="w-full text-left text-sm text-slate-600">
                                     <thead className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-200 tracking-wider">
                                        <tr>
                                           <th className="px-5 py-3">Alamat Email</th>
                                           <th className="px-5 py-3">Hak Akses (Role)</th>
                                           <th className="px-5 py-3">Tanggal Dibuat</th>
                                           <th className="px-5 py-3 text-center">Aksi</th>
                                        </tr>
                                     </thead>
                                     <tbody className="divide-y divide-slate-100">
                                        {systemUsers.length === 0 ? (
                                           <tr><td colSpan="4" className="px-5 py-8 text-center text-slate-400 italic">Memuat daftar akun terdaftar...</td></tr>
                                        ) : systemUsers.map((usr, i) => (
                                           <tr key={i} className="hover:bg-slate-50 transition-colors">
                                              <td className="px-5 py-4 font-bold text-slate-800 flex items-center gap-2">
                                                 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white ${usr.role === 'admin' ? 'bg-purple-600' : 'bg-slate-500'}`}>{usr.email.charAt(0).toUpperCase()}</div>
                                                 {usr.email}
                                                 {usr.email === appUser.email && <span className="ml-2 text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-extrabold border border-blue-200">ANDA</span>}
                                              </td>
                                              <td className="px-5 py-4">
                                                 <span className={`px-2 py-1 rounded text-[10px] font-extrabold tracking-wider ${usr.role === 'admin' ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>{usr.role.toUpperCase()}</span>
                                              </td>
                                              <td className="px-5 py-4 text-xs text-slate-500 font-mono">
                                                 {usr.createdAt ? new Date(usr.createdAt).toLocaleDateString('id-ID', {day:'2-digit', month:'short', year:'numeric'}) : 'Akun Lama'}
                                              </td>
                                              <td className="px-5 py-4 text-center">
                                                 {usr.email !== appUser.email ? (
                                                    <button onClick={() => handleDeleteUser(usr.email)} className="text-[10px] bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold border border-red-200 transition-colors shadow-sm">Cabut Akses</button>
                                                 ) : (
                                                    <span className="text-[10px] text-slate-400 italic">Tidak bisa hapus diri</span>
                                                 )}
                                              </td>
                                           </tr>
                                        ))}
                                     </tbody>
                                  </table>
                               </div>
                            </div>

                         </div>
                      </div>
                   </div>
                )}

              </main>
            </div>

            {/* === SEMUA MODAL-MODAL === */}

            {/* MODAL HISTORI TAGIHAN */}
            {selectedMerchant && (
               <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
                  <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl flex flex-col max-h-[85vh] animate-in zoom-in-95">
                     <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-2xl shrink-0">
                        <div>
                           <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><RefreshCw className="w-5 h-5 text-blue-600"/> Histori Pembayaran</h3>
                           <p className="text-xs text-slate-500 mt-1">{selectedMerchant.nama} <span className="font-mono bg-white border border-slate-200 px-1 py-0.5 rounded ml-1">{selectedMerchant.accountId}</span></p>
                        </div>
                        <button onClick={() => setSelectedMerchant(null)} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
                     </div>
                     <div className="p-0 overflow-y-auto">
                        {(!selectedMerchant.riwayatTagihan || selectedMerchant.riwayatTagihan.length === 0) ? (
                           <div className="p-10 flex flex-col items-center justify-center text-center">
                              <Database className="w-12 h-12 text-slate-300 mb-3" />
                              <p className="text-slate-500 font-semibold">Belum ada riwayat pembayaran.</p>
                              <p className="text-xs text-slate-400 mt-1">Data akan muncul setelah Anda melakukan Rekonsiliasi file Excel dari Bank.</p>
                           </div>
                        ) : (
                           <table className="w-full text-left text-sm">
                              <thead className="bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-600 sticky top-0">
                                 <tr>
                                    <th className="px-5 py-4 border-b border-slate-200">Periode</th>
                                    <th className="px-5 py-4 border-b border-slate-200">Nominal</th>
                                    <th className="px-5 py-4 border-b border-slate-200">Status</th>
                                    <th className="px-5 py-4 border-b border-slate-200">Terakhir Update</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                 {selectedMerchant.riwayatTagihan.map((riwayat, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                       <td className="px-5 py-3 font-bold text-slate-700">{riwayat.periode}</td>
                                       <td className="px-5 py-3 font-mono font-bold text-slate-800">{formatRp(riwayat.nominalBayar || riwayat.nominalTagihan)}</td>
                                       <td className="px-5 py-3">
                                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border inline-flex items-center gap-1 ${riwayat.status === 'LUNAS' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                             {riwayat.status === 'LUNAS' ? <CheckCircle className="w-3 h-3"/> : <AlertTriangle className="w-3 h-3"/>}
                                             {riwayat.status}
                                          </span>
                                       </td>
                                       <td className="px-5 py-3 text-xs text-slate-500">
                                          {riwayat.tglUpdate}
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        )}
                     </div>
                     <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0 rounded-b-2xl">
                        <button onClick={() => setSelectedMerchant(null)} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-bold transition-colors shadow-sm">Tutup Histori</button>
                     </div>
                  </div>
               </div>
            )}

            {/* MODAL EDIT DATA (TERBUKA UNTUK ADMIN DAN PETUGAS) */}
            {editModal.isOpen && editModal.data && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh] animate-in zoom-in-95">
                  <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-2xl shrink-0">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Pencil className="w-5 h-5 text-amber-500"/> Edit Data {userRole === 'petugas' && '(Mode Petugas)'}</h3>
                    <button onClick={() => setEditModal({ isOpen: false, data: null })} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><XCircle className="w-5 h-5 text-slate-400" /></button>
                  </div>
                  <form onSubmit={handleEditSave} className="p-6 overflow-y-auto space-y-4">
                    
                    {userRole === 'petugas' && (
                       <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-xl text-xs font-bold flex items-center gap-2 mb-2">
                          <Info className="w-4 h-4 shrink-0" />
                          Akses Petugas: Kolom ID dan Tarif dikunci. Anda diperbolehkan memperbarui Foto Lapak, Titik Map, dan Detail Kontak.
                       </div>
                    )}

                    <div className={`p-4 rounded-xl border space-y-4 ${userRole === 'admin' ? 'bg-amber-50/50 border-amber-100' : 'bg-slate-50 border-slate-200'}`}>
                      <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${userRole === 'admin' ? 'text-amber-800' : 'text-slate-500'}`}>Informasi Utama & Penagihan</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">ID Tagihan (Account ID) *</label>
                          <input required type="text" value={editModal.data.accountId} disabled={userRole !== 'admin'} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, accountId: e.target.value } })} className={`w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm ${userRole !== 'admin' ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'focus:ring-2 focus:ring-amber-500 bg-white'}`}/>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Nama Pemilik / Pedagang *</label>
                          <input required type="text" value={editModal.data.nama} disabled={userRole !== 'admin'} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, nama: e.target.value } })} className={`w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm ${userRole !== 'admin' ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'focus:ring-2 focus:ring-amber-500 bg-white'}`}/>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Kategori Sistem</label>
                          <select value={editModal.data.kategori} disabled={userRole !== 'admin'} onChange={e => {
                              const kat = e.target.value; let tarif = 'HARIAN_FULL';
                              if(kat === 'LOKSEM') tarif = 'HARIAN_FULL_NONSTOP'; if(kat === 'TIKAR') tarif = 'HARIAN_WEEKEND'; if(kat === 'LISTRIK') tarif = 'TETAP';
                              setEditModal({ ...editModal, data: { ...editModal.data, kategori: kat, tipeTarif: tarif } });
                            }} className={`w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm ${userRole !== 'admin' ? 'bg-slate-100 text-slate-500 cursor-not-allowed appearance-none' : 'bg-white cursor-pointer'}`}>
                            <option value="PKL">PKL Umum</option><option value="LOKSEM">Loksem</option>
                            <option value="TIKAR">Tikar</option><option value="JURU FOTO">Juru Foto</option>
                            <option value="LISTRIK">Tagihan Listrik</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Tipe Tarif Awal</label>
                          <select value={editModal.data.tipeTarif} disabled={userRole !== 'admin'} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, tipeTarif: e.target.value } })} className={`w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm ${userRole !== 'admin' ? 'bg-slate-100 text-slate-500 cursor-not-allowed appearance-none' : 'bg-white cursor-pointer'}`}>
                            <option value="HARIAN_FULL">Harian - Senin Tutup</option><option value="HARIAN_FULL_NONSTOP">Harian - Nonstop</option>
                            <option value="HARIAN_WEEKEND">Weekend / Libur Saja</option><option value="TETAP">Bulanan Tetap / Listrik</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                      <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Profil & Identitas</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Nomor KTP (NIK)</label>
                          <input type="text" value={editModal.data.nik} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, nik: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white" placeholder="16 Digit NIK"/>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">No. HP / WhatsApp</label>
                          <input type="text" value={editModal.data.noHp} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, noHp: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white" placeholder="0812..."/>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Alamat Rumah Tinggal</label>
                        <textarea value={editModal.data.alamatRumah} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, alamatRumah: e.target.value } })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Alamat lengkap sesuai KTP..."></textarea>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Keterangan / Lokasi</label>
                        <input type="text" value={editModal.data.keterangan} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, keterangan: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Detail Tambahan</label>
                        <input type="text" placeholder="Cth: Makanan..." value={editModal.data.jenisUsaha} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, jenisUsaha: e.target.value } })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">No. Rekening Bank DKI</label>
                        <input type="text" value={editModal.data.rekeningSumber} disabled={userRole !== 'admin'} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, rekeningSumber: e.target.value } })} className={`w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm ${userRole !== 'admin' ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : 'focus:ring-2 focus:ring-amber-500 bg-white'}`}/>
                      </div>
                    </div>

                    {/* UPLOAD FOTO & MAPS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                         <div className="flex justify-between items-center mb-3">
                           <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2"><Camera className="w-4 h-4"/> Update Foto</h4>
                         </div>
                         
                         {!editModal.data.fotoLapak ? (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-slate-50 transition-colors">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                 {isCompressing ? <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" /> : <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />}
                                 <p className="text-xs text-slate-500 font-semibold">{isCompressing ? 'Mengkompres...' : 'Ketuk untuk Ubah Foto'}</p>
                              </div>
                              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handlePhotoUpload(e, 'EDIT')} disabled={isCompressing} />
                            </label>
                         ) : (
                            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-300 shadow-sm group">
                               <img src={editModal.data.fotoLapak} alt="Preview" className="w-full h-full object-cover" />
                               <button type="button" onClick={() => hapusFoto('EDIT')} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow hover:bg-red-600"><X className="w-4 h-4"/></button>
                            </div>
                         )}
                      </div>

                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col justify-between">
                        <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2 mb-2"><MapIcon className="w-4 h-4"/> Koordinat Map</h4>
                        <button type="button" onClick={() => captureCurrentLocation('EDIT')} disabled={isFetchingGps} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm mb-3">
                          {isFetchingGps ? <Loader2 className="w-4 h-4 animate-spin"/> : <Crosshair className="w-4 h-4"/>} Lacak Live GPS
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <input type="number" step="any" placeholder="Lat" value={editModal.data.lat} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, lat: e.target.value } })} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs outline-none bg-white focus:ring-1 focus:ring-blue-500"/>
                          </div>
                          <div>
                            <input type="number" step="any" placeholder="Lng" value={editModal.data.lng} onChange={e => setEditModal({ ...editModal, data: { ...editModal.data, lng: e.target.value } })} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs outline-none bg-white focus:ring-1 focus:ring-blue-500"/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 flex justify-end gap-3 border-t border-slate-200">
                      <button type="button" onClick={() => setEditModal({ isOpen: false, data: null })} className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Batal</button>
                      <button type="submit" className="px-5 py-2 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-md flex items-center gap-2"><CloudDownload className="w-4 h-4"/> Update ke Cloud</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* MODAL TAMBAH DATA BARU */}
            {showAddModal && (
              <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
                <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh] animate-in zoom-in-95">
                  <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-2xl shrink-0">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><PlusCircle className="w-5 h-5 text-blue-600"/> Tambah Data Baru</h3>
                    <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><XCircle className="w-5 h-5 text-slate-400" /></button>
                  </div>
                  <form onSubmit={handleAddMerchantManual} className="p-6 overflow-y-auto space-y-4">
                    <div className="p-4 rounded-xl border bg-blue-50/50 border-blue-100 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">ID Tagihan (Account ID) *</label>
                          <input required type="text" value={newMerchant.accountId} onChange={e => setNewMerchant({ ...newMerchant, accountId: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white"/>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Nama Pemilik / Pedagang *</label>
                          <input required type="text" value={newMerchant.nama} onChange={e => setNewMerchant({ ...newMerchant, nama: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white"/>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Kategori Sistem</label>
                          <select value={newMerchant.kategori} onChange={e => {
                              const kat = e.target.value; let tarif = 'HARIAN_FULL';
                              if(kat === 'LOKSEM') tarif = 'HARIAN_FULL_NONSTOP'; if(kat === 'TIKAR') tarif = 'HARIAN_WEEKEND'; if(kat === 'LISTRIK') tarif = 'TETAP';
                              setNewMerchant({ ...newMerchant, kategori: kat, tipeTarif: tarif });
                            }} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm bg-white cursor-pointer">
                            <option value="PKL">PKL Umum</option><option value="LOKSEM">Loksem</option>
                            <option value="TIKAR">Tikar</option><option value="JURU FOTO">Juru Foto</option>
                            <option value="LISTRIK">Tagihan Listrik</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Tipe Tarif Awal</label>
                          <select value={newMerchant.tipeTarif} onChange={e => setNewMerchant({ ...newMerchant, tipeTarif: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm bg-white cursor-pointer">
                            <option value="HARIAN_FULL">Harian - Senin Tutup</option><option value="HARIAN_FULL_NONSTOP">Harian - Nonstop</option>
                            <option value="HARIAN_WEEKEND">Weekend / Libur Saja</option><option value="TETAP">Bulanan Tetap / Listrik</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">Nomor KTP (NIK)</label>
                          <input type="text" value={newMerchant.nik} onChange={e => setNewMerchant({ ...newMerchant, nik: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white" placeholder="16 Digit NIK"/>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">No. HP / WhatsApp</label>
                          <input type="text" value={newMerchant.noHp} onChange={e => setNewMerchant({ ...newMerchant, noHp: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white" placeholder="0812..."/>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Alamat Rumah Tinggal</label>
                        <textarea value={newMerchant.alamatRumah} onChange={e => setNewMerchant({ ...newMerchant, alamatRumah: e.target.value })} rows="2" className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Alamat lengkap..."></textarea>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Lokasi Lapak</label>
                        <input type="text" value={newMerchant.keterangan} onChange={e => setNewMerchant({ ...newMerchant, keterangan: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Jenis Dagangan</label>
                        <input type="text" value={newMerchant.jenisUsaha} onChange={e => setNewMerchant({ ...newMerchant, jenisUsaha: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white"/>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">No. Rekening DKI</label>
                        <input type="text" value={newMerchant.rekeningSumber} onChange={e => setNewMerchant({ ...newMerchant, rekeningSumber: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-blue-500 bg-white"/>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-100 p-4 rounded-xl border border-slate-200">
                         <div className="flex justify-between items-center mb-3">
                           <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2"><Camera className="w-4 h-4"/> Foto Lapak</h4>
                         </div>
                         {!newMerchant.fotoLapak ? (
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-slate-50 transition-colors">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                 {isCompressing ? <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" /> : <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />}
                                 <p className="text-xs text-slate-500 font-semibold">{isCompressing ? 'Mengkompres...' : 'Ketuk untuk Tambah Foto'}</p>
                              </div>
                              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handlePhotoUpload(e, 'ADD')} disabled={isCompressing} />
                            </label>
                         ) : (
                            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-300 shadow-sm group">
                               <img src={newMerchant.fotoLapak} alt="Preview" className="w-full h-full object-cover" />
                               <button type="button" onClick={() => hapusFoto('ADD')} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow hover:bg-red-600"><X className="w-4 h-4"/></button>
                            </div>
                         )}
                      </div>

                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex flex-col justify-between">
                        <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider flex items-center gap-2 mb-2"><MapIcon className="w-4 h-4"/> Koordinat Map</h4>
                        <button type="button" onClick={() => captureCurrentLocation('ADD')} disabled={isFetchingGps} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm mb-3">
                          {isFetchingGps ? <Loader2 className="w-4 h-4 animate-spin"/> : <Crosshair className="w-4 h-4"/>} Lacak Live GPS
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <input type="number" step="any" placeholder="Lat" value={newMerchant.lat} onChange={e => setNewMerchant({ ...newMerchant, lat: e.target.value })} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs outline-none bg-white focus:ring-1 focus:ring-blue-500"/>
                          </div>
                          <div>
                            <input type="number" step="any" placeholder="Lng" value={newMerchant.lng} onChange={e => setNewMerchant({ ...newMerchant, lng: e.target.value })} className="w-full px-2 py-1.5 border border-slate-300 rounded text-xs outline-none bg-white focus:ring-1 focus:ring-blue-500"/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 flex justify-end gap-3 border-t border-slate-200">
                      <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Batal</button>
                      <button type="submit" className="px-5 py-2 rounded-lg text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md flex items-center gap-2"><CloudDownload className="w-4 h-4"/> Simpan ke Cloud</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* MODAL KALENDER (TAMPIL SAAT TANGGAL DIKLIK) */}
            {calendarModal.isOpen && (
               <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
                  <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl flex flex-col animate-in zoom-in-95">
                     <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                        <h3 className="text-lg font-bold text-slate-800">Atur Hari Khusus</h3>
                        <button onClick={() => setCalendarModal({ isOpen: false, dateStr: '', day: '', type: 'NORMAL', name: '' })} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
                     </div>
                     <form onSubmit={saveCalendarDate} className="p-6 space-y-4">
                        <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm font-bold border border-blue-200 flex items-center gap-2">
                           <CalendarDays className="w-5 h-5"/> Tanggal: {calendarModal.day} / {calMonth} / {calYear}
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-slate-600 mb-1">Status Hari Ini</label>
                           <select value={calendarModal.type} onChange={e => setCalendarModal({ ...calendarModal, type: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm bg-white cursor-pointer focus:ring-2 focus:ring-blue-500">
                              <option value="NORMAL">Hari Biasa / Normal</option>
                              <option value="LIBUR">Libur Nasional / Cuti</option>
                              <option value="PEAK">Peak Season / Ramai</option>
                              <option value="TUTUP">Tutup Operasional / Tutup</option>
                              <option value="BUKA">Buka Pengganti (Khusus Senin)</option>
                           </select>
                        </div>
                        {calendarModal.type !== 'NORMAL' && (
                           <div>
                              <label className="block text-xs font-bold text-slate-600 mb-1">Nama Keterangan (Opsional)</label>
                              <input type="text" value={calendarModal.name} onChange={e => setCalendarModal({ ...calendarModal, name: e.target.value })} placeholder="Cth: Libur Idul Fitri" className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none text-sm bg-white focus:ring-2 focus:ring-blue-500"/>
                           </div>
                        )}
                        <div className="pt-2 flex justify-end gap-3">
                           <button type="submit" className="w-full px-4 py-2.5 rounded-lg text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md">Simpan Perubahan</button>
                        </div>
                     </form>
                  </div>
               </div>
            )}
          </div>
        );
      })()}
    </>
  );
}
