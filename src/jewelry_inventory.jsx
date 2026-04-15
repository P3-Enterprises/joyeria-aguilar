import { useState, useEffect, useRef } from "react";
import { Search, Plus, X, Settings, Download, Upload, Camera, QrCode, Edit2, Trash2, Package, ChevronLeft, ChevronRight, RefreshCw, Users, DollarSign, CreditCard, ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";

// ============================================================================
// APP VERSION — bump this every time you deploy, and match it in version.json
// ============================================================================
const APP_VERSION = "1.2.0";

// ============================================================================
// i18n — English is default, Spanish is one-tap toggle
// ============================================================================
const TRANSLATIONS = {
  en: {
    appSubtitle: "Inventory",
    pieces: "pieces",
    piece: "piece",
    loading: "Loading…",
    // Nav
    inventory: "Inventory",
    credit: "Credit",
    settings: "Settings",
    scanQR: "Scan QR",
    // List
    searchPlaceholder: "Search all fields...",
    allCategories: "All categories",
    allStatuses: "All statuses",
    add: "Add",
    noItems: "No items yet.",
    noItemsHint: "Tap Add to create your first piece.",
    unnamed: "Unnamed",
    photos: "photos",
    // Form
    newItem: "New Item",
    editItem: "Edit Item",
    photosLabel: "Photos (first photo is the main thumbnail)",
    mainPhoto: "Main",
    addPhoto: "Add",
    processing: "Processing...",
    photoHint: "Photos auto-compressed to 1200px max.",
    save: "Save",
    cancel: "Cancel",
    required: "SKU and Name are required.",
    removePhotoConfirm: "Remove this photo? (Not saved until you tap Save.)",
    // Detail
    back: "Back",
    scanSKU: "Scan for SKU",
    deleteConfirm: "Delete this item? This cannot be undone.",
    // Credit
    creditTitle: "Credit Accounts",
    customers: "Customers",
    totalOwed: "Total Owed",
    newCustomer: "New Customer",
    customerName: "Customer Name",
    customerPhone: "Phone",
    customerNotes: "Notes",
    noCustomers: "No credit accounts yet.",
    noCustomersHint: "Add a customer to start tracking credit sales.",
    addCustomer: "Add Customer",
    owes: "owes",
    paid: "paid",
    balance: "Balance",
    purchases: "Purchases",
    payments: "Payments",
    recordPayment: "Record Payment",
    paymentAmount: "Amount",
    paymentDate: "Date",
    paymentMethod: "Method",
    paymentNote: "Note (optional)",
    cash: "Cash",
    card: "Card",
    transfer: "Transfer",
    other: "Other",
    recordSale: "Record Sale",
    selectItem: "Select item",
    salePrice: "Sale Price",
    saleDate: "Sale Date",
    saleNote: "Note (optional)",
    deleteCustomerConfirm: "Delete this customer and all their records? This cannot be undone.",
    deletePaymentConfirm: "Delete this payment?",
    deleteSaleConfirm: "Delete this sale?",
    noPurchases: "No purchases recorded.",
    noPayments: "No payments recorded.",
    paidInFull: "Paid in full",
    // Settings
    settingsTitle: "Settings",
    language: "Language",
    english: "English",
    spanish: "Español",
    data: "Data",
    exportJSON: "Export JSON",
    importJSON: "Import JSON",
    items: "items",
    used: "used",
    exportHint: "Export regularly to back up.",
    lastBackup: "Last backup:",
    daysAgo: "days ago",
    noBackups: "No backups yet",
    customFields: "Custom Fields",
    builtin: "built-in",
    addNewField: "Add new field",
    fieldName: "Field name (e.g. Certification)",
    text: "Text",
    longText: "Long text",
    number: "Number",
    date: "Date",
    dropdown: "Dropdown",
    addField: "Add field",
    dropdownOptions: "Dropdown options, comma separated",
    removeFieldConfirm: "Remove this field? Existing data in this field will remain in items but won't display.",
    // Banners
    noBackupYet: "You haven't backed up your data yet.",
    daysSinceBackup: (n) => `It's been ${n} days since your last backup.`,
    backupHint: "Export a JSON file to keep your inventory safe.",
    exportNow: "Export now",
    newVersionAvailable: "New version available",
    update: "Update",
    importConfirm: "Importing will REPLACE all current items, customers, and fields with the contents of this file.\n\nIf you haven't exported a backup, cancel now and export first.\n\nContinue with import?",
    importSuccess: "Import successful!",
    invalidFile: "Invalid file.",
    storageFull: "Storage full. Export your data and remove old items, or reduce photo count.",
    // Point camera
    pointCamera: "Point camera at a QR code or barcode",
    noItemFound: (sku) => `No item with SKU "${sku}". You can create one now.`,
    // Customer view mode
    customerMode: "Customer View",
    privateMode: "Private View",
    enterCustomerMode: "Switch to Customer View",
    exitCustomerMode: "Exit Customer View",
    customerModeActive: "Customer View — private info hidden",
    exitCustomerModeConfirm: "Exit Customer View and show private info?",
    insiderOnly: "Private",
    profit: "Profit",
    margin: "Margin",
  },
  es: {
    appSubtitle: "Inventario",
    pieces: "piezas",
    piece: "pieza",
    loading: "Cargando…",
    inventory: "Inventario",
    credit: "Crédito",
    settings: "Configuración",
    scanQR: "Escanear QR",
    searchPlaceholder: "Buscar en todos los campos...",
    allCategories: "Todas las categorías",
    allStatuses: "Todos los estados",
    add: "Agregar",
    noItems: "Aún no hay piezas.",
    noItemsHint: "Toca Agregar para crear tu primera pieza.",
    unnamed: "Sin nombre",
    photos: "fotos",
    newItem: "Nueva Pieza",
    editItem: "Editar Pieza",
    photosLabel: "Fotos (la primera es la principal)",
    mainPhoto: "Principal",
    addPhoto: "Agregar",
    processing: "Procesando...",
    photoHint: "Fotos comprimidas automáticamente a 1200px máx.",
    save: "Guardar",
    cancel: "Cancelar",
    required: "SKU y Nombre son obligatorios.",
    removePhotoConfirm: "¿Eliminar esta foto? (No se guarda hasta que toques Guardar.)",
    back: "Volver",
    scanSKU: "Escanear SKU",
    deleteConfirm: "¿Eliminar esta pieza? No se puede deshacer.",
    creditTitle: "Cuentas de Crédito",
    customers: "Clientes",
    totalOwed: "Total Adeudado",
    newCustomer: "Nuevo Cliente",
    customerName: "Nombre del Cliente",
    customerPhone: "Teléfono",
    customerNotes: "Notas",
    noCustomers: "No hay cuentas de crédito aún.",
    noCustomersHint: "Agrega un cliente para empezar a registrar ventas a crédito.",
    addCustomer: "Agregar Cliente",
    owes: "debe",
    paid: "pagado",
    balance: "Saldo",
    purchases: "Compras",
    payments: "Pagos",
    recordPayment: "Registrar Pago",
    paymentAmount: "Monto",
    paymentDate: "Fecha",
    paymentMethod: "Método",
    paymentNote: "Nota (opcional)",
    cash: "Efectivo",
    card: "Tarjeta",
    transfer: "Transferencia",
    other: "Otro",
    recordSale: "Registrar Venta",
    selectItem: "Seleccionar pieza",
    salePrice: "Precio de Venta",
    saleDate: "Fecha de Venta",
    saleNote: "Nota (opcional)",
    deleteCustomerConfirm: "¿Eliminar este cliente y todos sus registros? No se puede deshacer.",
    deletePaymentConfirm: "¿Eliminar este pago?",
    deleteSaleConfirm: "¿Eliminar esta venta?",
    noPurchases: "No hay compras registradas.",
    noPayments: "No hay pagos registrados.",
    paidInFull: "Pagado en su totalidad",
    settingsTitle: "Configuración",
    language: "Idioma",
    english: "English",
    spanish: "Español",
    data: "Datos",
    exportJSON: "Exportar JSON",
    importJSON: "Importar JSON",
    items: "piezas",
    used: "usados",
    exportHint: "Exporta regularmente para respaldar.",
    lastBackup: "Último respaldo:",
    daysAgo: "días atrás",
    noBackups: "Sin respaldos aún",
    customFields: "Campos Personalizados",
    builtin: "integrado",
    addNewField: "Agregar nuevo campo",
    fieldName: "Nombre del campo (ej. Certificación)",
    text: "Texto",
    longText: "Texto largo",
    number: "Número",
    date: "Fecha",
    dropdown: "Lista desplegable",
    addField: "Agregar campo",
    dropdownOptions: "Opciones separadas por comas",
    removeFieldConfirm: "¿Eliminar este campo? Los datos existentes permanecerán en las piezas pero no se mostrarán.",
    noBackupYet: "Aún no has hecho respaldo.",
    daysSinceBackup: (n) => `Han pasado ${n} días desde el último respaldo.`,
    backupHint: "Exporta un archivo JSON para mantener tu inventario seguro.",
    exportNow: "Exportar ahora",
    newVersionAvailable: "Nueva versión disponible",
    update: "Actualizar",
    importConfirm: "La importación REEMPLAZARÁ todas las piezas, clientes y campos actuales con el contenido de este archivo.\n\nSi no has exportado un respaldo, cancela ahora y exporta primero.\n\n¿Continuar con la importación?",
    importSuccess: "¡Importación exitosa!",
    invalidFile: "Archivo inválido.",
    storageFull: "Almacenamiento lleno. Exporta tus datos y elimina piezas viejas, o reduce el número de fotos.",
    pointCamera: "Apunta la cámara a un código QR o de barras",
    noItemFound: (sku) => `No hay pieza con SKU "${sku}". Puedes crear una ahora.`,
    customerMode: "Vista Cliente",
    privateMode: "Vista Privada",
    enterCustomerMode: "Cambiar a Vista Cliente",
    exitCustomerMode: "Salir de Vista Cliente",
    customerModeActive: "Vista Cliente — información privada oculta",
    exitCustomerModeConfirm: "¿Salir de Vista Cliente y mostrar información privada?",
    insiderOnly: "Privado",
    profit: "Ganancia",
    margin: "Margen",
  },
};

const DEFAULT_FIELDS = [
  { id: "sku", label: "SKU", type: "text", required: true, builtin: true },
  { id: "name", label: "Name", type: "text", required: true, builtin: true },
  { id: "category", label: "Category", type: "select", options: ["Ring", "Necklace", "Bracelet", "Earrings", "Pendant", "Brooch", "Anklet", "Other"], builtin: true },
  { id: "description", label: "Description", type: "textarea", builtin: true },
  { id: "metal", label: "Metal", type: "select", options: ["Gold", "Silver", "Platinum", "Rose Gold", "White Gold", "Stainless Steel", "Other"], builtin: true },
  { id: "purity", label: "Purity / Karat", type: "text", builtin: true, placeholder: "e.g. 14k, 925" },
  { id: "weight", label: "Weight (g)", type: "number", builtin: true },
  { id: "gemstone", label: "Gemstone", type: "text", builtin: true },
  { id: "size", label: "Size", type: "text", builtin: true, placeholder: "Ring size, length, etc." },
  { id: "quantity", label: "Quantity", type: "number", builtin: true },
  { id: "cost", label: "Cost ($)", type: "number", builtin: true, insider: true },
  { id: "price", label: "Retail Price ($)", type: "number", builtin: true },
  { id: "supplier", label: "Supplier", type: "text", builtin: true, insider: true },
  { id: "dateAcquired", label: "Date Acquired", type: "date", builtin: true, insider: true },
  { id: "location", label: "Location", type: "text", builtin: true, placeholder: "Case, safe, shelf", insider: true },
  { id: "status", label: "Status", type: "select", options: ["In Stock", "Sold", "Sold on Credit", "On Hold", "Repair", "Consignment"], builtin: true, insider: true },
  { id: "notes", label: "Notes", type: "textarea", builtin: true, insider: true },
];

const LS_ITEMS = "ja_items_v2";
const LS_FIELDS = "ja_fields_v2";
const LS_CUSTOMERS = "ja_customers_v1";
const LS_LAST_EXPORT = "ja_last_export_v2";
const LS_LANG = "ja_lang_v1";
const LS_CUSTOMER_MODE = "ja_customer_mode_v1";
const EXPORT_REMINDER_DAYS = 7;

const BRAND = {
  rose: "#B76E79",
  roseDark: "#8B4A54",
  roseLight: "#D4A5AC",
  roseBg: "#FAF0F1",
  cream: "#FAF7F5",
  charcoal: "#1A1A1A",
  stone: "#6B6560",
  success: "#2D5F2D",
  successBg: "#E8F3E8",
  danger: "#B42823",
};

function compressImage(file, maxDim = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Calculate balance for a customer
function customerBalance(customer) {
  const owed = (customer.sales || []).reduce((sum, s) => sum + Number(s.amount || 0), 0);
  const paid = (customer.payments || []).reduce((sum, p) => sum + Number(p.amount || 0), 0);
  return { owed, paid, balance: owed - paid };
}

function formatCurrency(n) {
  const num = Number(n) || 0;
  return `$${num.toFixed(2)}`;
}

function BrandLogo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4A5AC" />
          <stop offset="50%" stopColor="#B76E79" />
          <stop offset="100%" stopColor="#8B4A54" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="#1A1A1A" stroke="url(#roseGold)" strokeWidth="2" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="url(#roseGold)" strokeWidth="0.5" opacity="0.6" />
      <text x="50" y="62" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontSize="42" fontWeight="500" fontStyle="italic" fill="url(#roseGold)">
        JA
      </text>
    </svg>
  );
}

function useVersionCheck() {
  const [newVersion, setNewVersion] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.version && data.version !== APP_VERSION) {
          setNewVersion(data.version);
        }
      } catch {}
    };
    check();
    const interval = setInterval(check, 60_000);
    return () => { cancelled = true; clearInterval(interval); };
  }, []);
  return newVersion;
}

export default function JewelryInventory() {
  const [items, setItems] = useState([]);
  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [viewingCustomer, setViewingCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [lastExport, setLastExport] = useState(null);
  const [reminderDismissed, setReminderDismissed] = useState(false);
  const [lang, setLang] = useState("en");
  const [customerMode, setCustomerMode] = useState(false);
  const newVersion = useVersionCheck();
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LS_LANG);
      if (savedLang && TRANSLATIONS[savedLang]) setLang(savedLang);
      const savedMode = localStorage.getItem(LS_CUSTOMER_MODE);
      if (savedMode === "1") setCustomerMode(true);
      const i = localStorage.getItem(LS_ITEMS);
      if (i) {
        const parsed = JSON.parse(i);
        setItems(parsed.map(item => {
          if (item.photo && !item.photos) {
            return { ...item, photos: [item.photo], photo: undefined };
          }
          return { ...item, photos: item.photos || [] };
        }));
      }
      const f = localStorage.getItem(LS_FIELDS);
      if (f) setFields(JSON.parse(f));
      const c = localStorage.getItem(LS_CUSTOMERS);
      if (c) setCustomers(JSON.parse(c));
      const le = localStorage.getItem(LS_LAST_EXPORT);
      if (le) setLastExport(le);
    } catch (e) {
      console.error("Load error:", e);
    }
    setLoading(false);
  }, []);

  const setLanguage = (newLang) => {
    setLang(newLang);
    try { localStorage.setItem(LS_LANG, newLang); } catch {}
  };

  const toggleCustomerMode = () => {
    if (customerMode) {
      // Require confirmation to exit — prevents accidental reveal
      if (!confirm(t.exitCustomerModeConfirm)) return;
      setCustomerMode(false);
      try { localStorage.setItem(LS_CUSTOMER_MODE, "0"); } catch {}
      // If she was in credit or settings, those are hidden in customer mode anyway
    } else {
      setCustomerMode(true);
      try { localStorage.setItem(LS_CUSTOMER_MODE, "1"); } catch {}
      // Force navigate to inventory — credit/settings hidden in customer mode
      if (view === "credit" || view === "customerDetail" || view === "customerForm" || view === "settings") {
        setView("list");
        setViewingCustomer(null);
        setEditingCustomer(null);
      }
    }
  };

  const saveItems = (next) => {
    setItems(next);
    try { localStorage.setItem(LS_ITEMS, JSON.stringify(next)); }
    catch { alert(t.storageFull); }
  };

  const saveFields = (next) => {
    setFields(next);
    try { localStorage.setItem(LS_FIELDS, JSON.stringify(next)); } catch {}
  };

  const saveCustomers = (next) => {
    setCustomers(next);
    try { localStorage.setItem(LS_CUSTOMERS, JSON.stringify(next)); }
    catch { alert(t.storageFull); }
  };

  const upsertItem = (item) => {
    if (item.id) {
      saveItems(items.map(i => i.id === item.id ? item : i));
    } else {
      saveItems([...items, { ...item, id: Date.now().toString() }]);
    }
    setView("list");
    setEditing(null);
  };

  const deleteItem = (id) => {
    if (confirm(t.deleteConfirm)) {
      saveItems(items.filter(i => i.id !== id));
      setView("list");
      setViewing(null);
    }
  };

  const upsertCustomer = (customer) => {
    if (customer.id) {
      const next = customers.map(c => c.id === customer.id ? customer : c);
      saveCustomers(next);
      setViewingCustomer(customer);
    } else {
      const newCust = { ...customer, id: Date.now().toString(), sales: [], payments: [] };
      saveCustomers([...customers, newCust]);
      setViewingCustomer(newCust);
    }
    setEditingCustomer(null);
    setView("customerDetail");
  };

  const deleteCustomer = (id) => {
    if (confirm(t.deleteCustomerConfirm)) {
      saveCustomers(customers.filter(c => c.id !== id));
      setView("credit");
      setViewingCustomer(null);
    }
  };

  const addSaleToCustomer = (customerId, sale) => {
    const next = customers.map(c => {
      if (c.id !== customerId) return c;
      return { ...c, sales: [...(c.sales || []), { ...sale, id: Date.now().toString() }] };
    });
    saveCustomers(next);
    setViewingCustomer(next.find(c => c.id === customerId));
    // If this sale references an inventory item, mark it Sold on Credit
    if (sale.itemId) {
      const updatedItems = items.map(it =>
        it.id === sale.itemId ? { ...it, status: "Sold on Credit" } : it
      );
      saveItems(updatedItems);
    }
  };

  const removeSaleFromCustomer = (customerId, saleId) => {
    if (!confirm(t.deleteSaleConfirm)) return;
    // Find the sale first so we know if it references an item
    const customer = customers.find(c => c.id === customerId);
    const sale = (customer?.sales || []).find(s => s.id === saleId);
    const next = customers.map(c => {
      if (c.id !== customerId) return c;
      return { ...c, sales: (c.sales || []).filter(s => s.id !== saleId) };
    });
    saveCustomers(next);
    setViewingCustomer(next.find(c => c.id === customerId));
    // Revert item status to In Stock if this sale referenced an item
    if (sale?.itemId) {
      const updatedItems = items.map(it =>
        it.id === sale.itemId ? { ...it, status: "In Stock" } : it
      );
      saveItems(updatedItems);
    }
  };

  const addPaymentToCustomer = (customerId, payment) => {
    const next = customers.map(c => {
      if (c.id !== customerId) return c;
      return { ...c, payments: [...(c.payments || []), { ...payment, id: Date.now().toString() }] };
    });
    saveCustomers(next);
    setViewingCustomer(next.find(c => c.id === customerId));
  };

  const removePaymentFromCustomer = (customerId, paymentId) => {
    if (!confirm(t.deletePaymentConfirm)) return;
    const next = customers.map(c => {
      if (c.id !== customerId) return c;
      return { ...c, payments: (c.payments || []).filter(p => p.id !== paymentId) };
    });
    saveCustomers(next);
    setViewingCustomer(next.find(c => c.id === customerId));
  };

  const filtered = items.filter(item => {
    const q = search.toLowerCase();
    const matchesSearch = !q || Object.entries(item).some(([k, v]) => {
      if (k === "photos" || Array.isArray(v)) return false;
      return String(v ?? "").toLowerCase().includes(q);
    });
    const matchesCat = !filterCat || item.category === filterCat;
    const matchesStatus = !filterStatus || item.status === filterStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  const exportData = () => {
    const data = { items, fields, customers, exportedAt: new Date().toISOString(), version: 2, brand: "Joyeria Aguilar" };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `joyeria-aguilar-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    const now = new Date().toISOString();
    try { localStorage.setItem(LS_LAST_EXPORT, now); } catch {}
    setLastExport(now);
    setReminderDismissed(false);
  };

  const importData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!confirm(t.importConfirm)) {
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.items) {
          const migrated = data.items.map(item => ({
            ...item,
            photos: item.photos || (item.photo ? [item.photo] : []),
          }));
          saveItems(migrated);
        }
        if (data.fields) saveFields(data.fields);
        if (data.customers) saveCustomers(data.customers);
        alert(t.importSuccess);
      } catch {
        alert(t.invalidFile);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BRAND.cream }}>
        <div className="text-center">
          <BrandLogo size={64} />
          <p className="mt-3 text-sm font-serif italic" style={{ color: BRAND.stone }}>{t.loading}</p>
        </div>
      </div>
    );
  }

  const totalOwed = customers.reduce((sum, c) => sum + customerBalance(c).balance, 0);

  return (
    <div className="min-h-screen" style={{ background: BRAND.cream, color: BRAND.charcoal, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

      {customerMode && (
        <div className="sticky top-0 z-30 px-4 py-2 flex items-center justify-between gap-3" style={{ background: BRAND.rose, color: "white" }}>
          <div className="flex items-center gap-2 text-sm font-medium">
            <Eye className="w-4 h-4" />
            <span>{t.customerModeActive}</span>
          </div>
          <button onClick={toggleCustomerMode} className="px-3 py-1 text-xs rounded font-medium flex items-center gap-1" style={{ background: "white", color: BRAND.roseDark }}>
            <Lock className="w-3 h-3" /> {t.exitCustomerMode}
          </button>
        </div>
      )}

      {newVersion && (
        <div className="sticky z-20 px-4 py-2 flex items-center justify-between gap-3" style={{ background: BRAND.charcoal, color: BRAND.roseLight, top: customerMode ? "36px" : "0" }}>
          <div className="flex items-center gap-2 text-sm">
            <RefreshCw className="w-4 h-4" />
            <span>{t.newVersionAvailable} ({newVersion})</span>
          </div>
          <button onClick={() => window.location.reload()} className="px-3 py-1 text-xs rounded font-medium" style={{ background: BRAND.rose, color: "white" }}>
            {t.update}
          </button>
        </div>
      )}

      <header className="border-b sticky z-10" style={{ background: BRAND.charcoal, borderColor: BRAND.roseDark, top: (customerMode ? 36 : 0) + (newVersion ? 36 : 0) + "px" }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size={44} />
            <div>
              <h1 className="font-serif text-xl leading-none" style={{ color: BRAND.roseLight, letterSpacing: "0.02em" }}>Joyería Aguilar</h1>
              <p className="text-xs mt-0.5 font-serif italic" style={{ color: BRAND.roseLight, opacity: 0.7 }}>
                {t.appSubtitle} · {items.length} {items.length === 1 ? t.piece : t.pieces}
              </p>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            {!customerMode && (
              <button
                onClick={() => setLanguage(lang === "en" ? "es" : "en")}
                className="px-2 py-1 text-xs rounded font-medium mr-1"
                style={{ background: BRAND.rose, color: "white" }}
                title={lang === "en" ? "Español" : "English"}
              >
                {lang === "en" ? "ES" : "EN"}
              </button>
            )}
            <button onClick={() => setScannerOpen(true)} className="p-2 rounded-md" style={{ color: BRAND.roseLight }} title={t.scanQR}>
              <QrCode className="w-5 h-5" />
            </button>
            <button
              onClick={toggleCustomerMode}
              className="p-2 rounded-md"
              style={{ color: customerMode ? BRAND.rose : BRAND.roseLight }}
              title={customerMode ? t.exitCustomerMode : t.enterCustomerMode}
            >
              {customerMode ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {!customerMode && (
              <button onClick={() => setView("settings")} className="p-2 rounded-md" style={{ color: BRAND.roseLight }} title={t.settings}>
                <Settings className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        {/* Sub-nav tabs — hidden in customer mode */}
        {!customerMode && (
          <div className="max-w-5xl mx-auto px-4 flex gap-1">
            <TabButton active={view === "list"} onClick={() => setView("list")} icon={<Package className="w-4 h-4" />} label={t.inventory} />
            <TabButton active={view === "credit" || view === "customerDetail" || view === "customerForm"} onClick={() => setView("credit")} icon={<CreditCard className="w-4 h-4" />} label={`${t.credit}${totalOwed > 0 ? ` · ${formatCurrency(totalOwed)}` : ""}`} />
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {(() => {
          if (reminderDismissed || (items.length === 0 && customers.length === 0)) return null;
          const daysSince = lastExport ? Math.floor((Date.now() - new Date(lastExport).getTime()) / (1000 * 60 * 60 * 24)) : null;
          const shouldShow = lastExport === null || daysSince >= EXPORT_REMINDER_DAYS;
          if (!shouldShow) return null;
          return (
            <div className="mb-4 rounded-lg p-3 flex items-start gap-3 border" style={{ background: BRAND.roseBg, borderColor: BRAND.roseLight }}>
              <Download className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: BRAND.roseDark }} />
              <div className="flex-1 text-sm">
                <p className="font-medium" style={{ color: BRAND.roseDark }}>
                  {lastExport === null ? t.noBackupYet : t.daysSinceBackup(daysSince)}
                </p>
                <p className="text-xs mt-0.5" style={{ color: BRAND.roseDark, opacity: 0.8 }}>{t.backupHint}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={exportData} className="px-3 py-1 text-xs rounded font-medium text-white" style={{ background: BRAND.rose }}>
                  {t.exportNow}
                </button>
                <button onClick={() => setReminderDismissed(true)} className="p-1 rounded">
                  <X className="w-3.5 h-3.5" style={{ color: BRAND.roseDark }} />
                </button>
              </div>
            </div>
          );
        })()}

        {view === "list" && (
          <ListView t={t} customerMode={customerMode} items={filtered} fields={fields} search={search} setSearch={setSearch} filterCat={filterCat} setFilterCat={setFilterCat} filterStatus={filterStatus} setFilterStatus={setFilterStatus} onAdd={() => { setEditing(null); setView("form"); }} onView={(item) => { setViewing(item); setView("detail"); }} />
        )}
        {view === "form" && !customerMode && (
          <ItemForm t={t} item={editing} fields={fields} onSave={upsertItem} onCancel={() => { setView("list"); setEditing(null); }} />
        )}
        {view === "detail" && viewing && (
          <ItemDetail t={t} customerMode={customerMode} item={viewing} fields={fields} onEdit={() => { setEditing(viewing); setView("form"); }} onDelete={() => deleteItem(viewing.id)} onBack={() => { setView("list"); setViewing(null); }} />
        )}
        {view === "credit" && !customerMode && (
          <CreditView t={t} customers={customers} totalOwed={totalOwed} onAdd={() => { setEditingCustomer(null); setView("customerForm"); }} onView={(c) => { setViewingCustomer(c); setView("customerDetail"); }} />
        )}
        {view === "customerForm" && !customerMode && (
          <CustomerForm t={t} customer={editingCustomer} onSave={upsertCustomer} onCancel={() => { setView(editingCustomer ? "customerDetail" : "credit"); setEditingCustomer(null); }} />
        )}
        {view === "customerDetail" && viewingCustomer && !customerMode && (
          <CustomerDetail
            t={t}
            customer={viewingCustomer}
            items={items}
            onEdit={() => { setEditingCustomer(viewingCustomer); setView("customerForm"); }}
            onDelete={() => deleteCustomer(viewingCustomer.id)}
            onBack={() => { setView("credit"); setViewingCustomer(null); }}
            onAddSale={(sale) => addSaleToCustomer(viewingCustomer.id, sale)}
            onRemoveSale={(saleId) => removeSaleFromCustomer(viewingCustomer.id, saleId)}
            onAddPayment={(payment) => addPaymentToCustomer(viewingCustomer.id, payment)}
            onRemovePayment={(paymentId) => removePaymentFromCustomer(viewingCustomer.id, paymentId)}
          />
        )}
        {view === "settings" && !customerMode && (
          <SettingsView t={t} lang={lang} setLanguage={setLanguage} fields={fields} setFields={saveFields} onBack={() => setView("list")} onExport={exportData} onImport={importData} itemCount={items.length} lastExport={lastExport} />
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-6 text-center">
        <p className="text-xs font-serif italic" style={{ color: BRAND.stone }}>Joyería Aguilar · v{APP_VERSION}</p>
      </footer>

      {scannerOpen && (
        <QRScanner
          t={t}
          onClose={() => setScannerOpen(false)}
          onScan={(code) => {
            setScannerOpen(false);
            const found = items.find(i => i.sku === code);
            if (found) {
              setViewing(found);
              setView("detail");
            } else {
              alert(t.noItemFound(code));
              setEditing({ sku: code, photos: [] });
              setView("form");
            }
          }}
        />
      )}
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 text-sm flex items-center gap-1.5 font-medium transition border-b-2"
      style={{
        color: active ? BRAND.roseLight : "rgba(212, 165, 172, 0.5)",
        borderColor: active ? BRAND.rose : "transparent",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

const btnPrimary = { background: BRAND.rose, color: "white", border: "none" };
const btnPrimaryHover = (e, enter) => { e.currentTarget.style.background = enter ? BRAND.roseDark : BRAND.rose; };

function PhotoCarousel({ photos, className = "" }) {
  const [idx, setIdx] = useState(0);
  if (!photos || photos.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ background: BRAND.roseBg }}>
        <Package className="w-12 h-12" style={{ color: BRAND.roseLight }} />
      </div>
    );
  }
  return (
    <div className={`relative ${className}`} style={{ background: BRAND.roseBg }}>
      <img src={photos[idx]} alt="" className="w-full h-full object-cover" />
      {photos.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + photos.length) % photos.length); }} className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow">
            <ChevronLeft className="w-4 h-4" style={{ color: BRAND.charcoal }} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % photos.length); }} className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow">
            <ChevronRight className="w-4 h-4" style={{ color: BRAND.charcoal }} />
          </button>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white text-xs px-2 py-0.5 rounded" style={{ background: "rgba(26,26,26,0.75)" }}>
            {idx + 1}/{photos.length}
          </div>
        </>
      )}
    </div>
  );
}

function ListView({ t, customerMode, items, fields, search, setSearch, filterCat, setFilterCat, filterStatus, setFilterStatus, onAdd, onView }) {
  const catField = fields.find(f => f.id === "category");
  const statusField = fields.find(f => f.id === "status");
  const inputStyle = { background: "white", borderColor: BRAND.roseLight };
  // In customer mode, only show items that are In Stock (not sold, on hold, etc.)
  const visibleItems = customerMode ? items.filter(i => i.status === "In Stock" || !i.status) : items;
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: BRAND.stone }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.searchPlaceholder} className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none" style={inputStyle} />
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="px-3 py-2 text-sm border rounded-md" style={inputStyle}>
          <option value="">{t.allCategories}</option>
          {catField?.options?.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        {!customerMode && (
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 text-sm border rounded-md" style={inputStyle}>
            <option value="">{t.allStatuses}</option>
            {statusField?.options?.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        )}
        {!customerMode && (
          <button onClick={onAdd} className="px-4 py-2 text-sm rounded-md flex items-center gap-1 justify-center font-medium" style={btnPrimary} onMouseEnter={(e) => btnPrimaryHover(e, true)} onMouseLeave={(e) => btnPrimaryHover(e, false)}>
            <Plus className="w-4 h-4" /> {t.add}
          </button>
        )}
      </div>

      {visibleItems.length === 0 ? (
        <div className="border rounded-lg p-12 text-center" style={{ background: "white", borderColor: BRAND.roseLight }}>
          <BrandLogo size={56} />
          <p className="mt-3 font-serif italic text-base" style={{ color: BRAND.stone }}>{t.noItems}</p>
          {!customerMode && <p className="text-xs mt-1" style={{ color: BRAND.stone }}>{t.noItemsHint}</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {visibleItems.map(item => (
            <button key={item.id} onClick={() => onView(item)} className="border rounded-lg p-4 text-left transition" style={{ background: "white", borderColor: BRAND.roseLight }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = BRAND.rose}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = BRAND.roseLight}>
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0" style={{ background: BRAND.roseBg }}>
                  {item.photos && item.photos.length > 0 ? (
                    <img src={item.photos[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-6 h-6" style={{ color: BRAND.roseLight }} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-base leading-tight truncate" style={{ color: BRAND.charcoal }}>{item.name || t.unnamed}</p>
                  {!customerMode && <p className="text-xs truncate font-mono" style={{ color: BRAND.stone }}>{item.sku}</p>}
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {item.category && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: BRAND.roseBg, color: BRAND.roseDark }}>{item.category}</span>}
                    {!customerMode && item.status && (
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{
                        background: item.status === "In Stock" ? BRAND.successBg : item.status === "Sold" ? "#F0F0F0" : BRAND.roseBg,
                        color: item.status === "In Stock" ? BRAND.success : item.status === "Sold" ? BRAND.stone : BRAND.roseDark,
                      }}>{item.status}</span>
                    )}
                    {item.photos && item.photos.length > 1 && (
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: BRAND.roseBg, color: BRAND.roseDark }}>{item.photos.length} {t.photos}</span>
                    )}
                  </div>
                  {item.price && <p className="text-sm font-medium mt-1 font-serif" style={{ color: BRAND.roseDark }}>${item.price}</p>}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ItemForm({ t, item, fields, onSave, onCancel }) {
  const [data, setData] = useState(() => item ? { ...item, photos: item.photos || [] } : { photos: [] });
  const [compressing, setCompressing] = useState(false);
  const fileRef = useRef(null);
  const inputStyle = { background: "white", borderColor: BRAND.roseLight };

  const update = (id, val) => setData(d => ({ ...d, [id]: val }));

  const handlePhotos = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setCompressing(true);
    try {
      const compressed = await Promise.all(files.map(f => compressImage(f)));
      setData(d => ({ ...d, photos: [...(d.photos || []), ...compressed] }));
    } catch (err) {
      alert("Error: " + err);
    }
    setCompressing(false);
    e.target.value = "";
  };

  const removePhoto = (idx) => {
    if (!confirm(t.removePhotoConfirm)) return;
    setData(d => ({ ...d, photos: d.photos.filter((_, i) => i !== idx) }));
  };

  const movePhoto = (idx, dir) => {
    setData(d => {
      const photos = [...d.photos];
      const ni = idx + dir;
      if (ni < 0 || ni >= photos.length) return d;
      [photos[idx], photos[ni]] = [photos[ni], photos[idx]];
      return { ...d, photos };
    });
  };

  const submit = () => {
    if (!data.sku || !data.name) {
      alert(t.required);
      return;
    }
    onSave(data);
  };

  return (
    <div className="border rounded-lg p-5" style={{ background: "white", borderColor: BRAND.roseLight }}>
      <div className="flex justify-between items-center mb-4 pb-3 border-b" style={{ borderColor: BRAND.roseBg }}>
        <h2 className="font-serif text-2xl" style={{ color: BRAND.charcoal }}>{item?.id ? t.editItem : t.newItem}</h2>
        <button onClick={onCancel} className="p-1 rounded"><X className="w-5 h-5" /></button>
      </div>

      <div className="mb-4">
        <label className="text-xs block mb-1 font-medium" style={{ color: BRAND.stone }}>{t.photosLabel}</label>
        <div className="flex flex-wrap gap-2">
          {data.photos?.map((photo, i) => (
            <div key={i} className="relative">
              <img src={photo} alt="" className="w-24 h-24 rounded-md object-cover border" style={{ borderColor: BRAND.roseLight }} />
              <button type="button" onClick={() => removePhoto(i)} className="absolute -top-2 -right-2 bg-white border rounded-full p-1" style={{ borderColor: BRAND.roseLight }}>
                <X className="w-3 h-3" />
              </button>
              {i > 0 && (
                <button type="button" onClick={() => movePhoto(i, -1)} className="absolute bottom-1 left-1 bg-white/90 border rounded p-0.5" style={{ borderColor: BRAND.roseLight }}>
                  <ChevronLeft className="w-3 h-3" />
                </button>
              )}
              {i < data.photos.length - 1 && (
                <button type="button" onClick={() => movePhoto(i, 1)} className="absolute bottom-1 right-1 bg-white/90 border rounded p-0.5" style={{ borderColor: BRAND.roseLight }}>
                  <ChevronRight className="w-3 h-3" />
                </button>
              )}
              {i === 0 && (
                <div className="absolute top-1 left-1 text-white text-xs px-1 rounded" style={{ background: BRAND.rose }}>{t.mainPhoto}</div>
              )}
            </div>
          ))}
          <button type="button" onClick={() => fileRef.current?.click()} disabled={compressing} className="w-24 h-24 border-2 border-dashed rounded-md flex flex-col items-center justify-center disabled:opacity-50" style={{ borderColor: BRAND.roseLight, color: BRAND.stone }}>
            <Camera className="w-5 h-5 mb-1" />
            <span className="text-xs">{compressing ? t.processing : t.addPhoto}</span>
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple capture="environment" onChange={handlePhotos} className="hidden" />
        <p className="text-xs mt-1" style={{ color: BRAND.stone }}>{t.photoHint}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(f => (
          <div key={f.id} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
            <label className="text-xs block mb-1 font-medium flex items-center gap-1" style={{ color: BRAND.stone }}>
              {f.label}
              {f.required && <span style={{ color: BRAND.rose }}>*</span>}
              {f.insider && (
                <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded normal-case" style={{ background: BRAND.successBg, color: BRAND.success, fontSize: "10px" }}>
                  <Lock className="w-2.5 h-2.5" /> {t.insiderOnly}
                </span>
              )}
            </label>
            {f.type === "textarea" ? (
              <textarea value={data[f.id] || ""} onChange={(e) => update(f.id, e.target.value)} rows={2} className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none" style={inputStyle} />
            ) : f.type === "select" ? (
              <select value={data[f.id] || ""} onChange={(e) => update(f.id, e.target.value)} className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none" style={inputStyle}>
                <option value="">—</option>
                {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input type={f.type} value={data[f.id] || ""} onChange={(e) => update(f.id, e.target.value)} placeholder={f.placeholder || ""} className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none" style={inputStyle} />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={submit} className="flex-1 px-4 py-2 text-sm rounded-md font-medium" style={btnPrimary} onMouseEnter={(e) => btnPrimaryHover(e, true)} onMouseLeave={(e) => btnPrimaryHover(e, false)}>{t.save}</button>
        <button onClick={onCancel} className="px-4 py-2 text-sm border rounded-md" style={{ borderColor: BRAND.roseLight, color: BRAND.charcoal, background: "white" }}>{t.cancel}</button>
      </div>
    </div>
  );
}

function ItemDetail({ t, customerMode, item, fields, onEdit, onDelete, onBack }) {
  const qrRef = useRef(null);

  useEffect(() => {
    if (customerMode) return; // no QR in customer view
    if (!qrRef.current || !item.sku) return;
    const render = () => {
      if (!window.QRCode || !qrRef.current) return;
      qrRef.current.innerHTML = "";
      new window.QRCode(qrRef.current, { text: item.sku, width: 120, height: 120, colorDark: BRAND.charcoal, colorLight: "#ffffff" });
    };
    if (window.QRCode) { render(); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    script.onload = render;
    document.body.appendChild(script);
  }, [item.sku, customerMode]);

  // Profit calculation (insider only)
  const cost = Number(item.cost) || 0;
  const price = Number(item.price) || 0;
  const profit = price - cost;
  const margin = price > 0 ? ((profit / price) * 100).toFixed(1) : null;
  const showProfit = !customerMode && cost > 0 && price > 0;

  // Filter fields based on mode
  const visibleFields = fields.filter(f => {
    if (["sku", "name"].includes(f.id)) return false;
    if (!item[f.id]) return false;
    if (customerMode && f.insider) return false;
    return true;
  });

  return (
    <div className="border rounded-lg p-5" style={{ background: "white", borderColor: BRAND.roseLight }}>
      <div className="flex justify-between items-center mb-4 pb-3 border-b" style={{ borderColor: BRAND.roseBg }}>
        <button onClick={onBack} className="text-sm font-medium flex items-center gap-1" style={{ color: BRAND.roseDark }}>
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </button>
        {!customerMode && (
          <div className="flex gap-1">
            <button onClick={onEdit} className="p-2 rounded-md"><Edit2 className="w-4 h-4" /></button>
            <button onClick={onDelete} className="p-2 rounded-md" style={{ color: BRAND.danger }}><Trash2 className="w-4 h-4" /></button>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-5 mb-5">
        <PhotoCarousel photos={item.photos} className="w-full sm:w-64 h-64 rounded-md overflow-hidden" />
        <div className="flex-1">
          <h2 className="font-serif text-3xl leading-tight" style={{ color: BRAND.charcoal }}>{item.name || t.unnamed}</h2>
          {!customerMode && <p className="text-sm mt-1 font-mono" style={{ color: BRAND.stone }}>{item.sku}</p>}
          {item.price && <p className="font-serif text-3xl mt-3" style={{ color: BRAND.roseDark }}>${item.price}</p>}
          {showProfit && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border" style={{ background: BRAND.successBg, borderColor: "#B8D4B8" }}>
              <Lock className="w-3 h-3" style={{ color: BRAND.success }} />
              <span className="text-xs font-medium" style={{ color: BRAND.success }}>
                {t.profit}: {formatCurrency(profit)} · {t.margin}: {margin}%
              </span>
            </div>
          )}
        </div>
        {!customerMode && (
          <div className="flex flex-col items-center">
            <div ref={qrRef} className="p-2 border rounded-md" style={{ background: "white", borderColor: BRAND.roseLight }} />
            <p className="text-xs mt-1" style={{ color: BRAND.stone }}>{t.scanSKU}</p>
          </div>
        )}
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        {visibleFields.map(f => (
          <div key={f.id} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
            <dt className="text-xs uppercase tracking-wide flex items-center gap-1" style={{ color: BRAND.stone, letterSpacing: "0.05em" }}>
              {f.label}
              {f.insider && !customerMode && (
                <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-xs normal-case" style={{ background: BRAND.successBg, color: BRAND.success, letterSpacing: 0 }}>
                  <Lock className="w-2.5 h-2.5" /> {t.insiderOnly}
                </span>
              )}
            </dt>
            <dd className="mt-0.5 whitespace-pre-wrap font-serif text-base" style={{ color: BRAND.charcoal }}>{item[f.id]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// ============================================================================
// CREDIT VIEWS
// ============================================================================
function CreditView({ t, customers, totalOwed, onAdd, onView }) {
  // Sort by balance descending
  const sorted = [...customers].sort((a, b) => customerBalance(b).balance - customerBalance(a).balance);

  return (
    <div>
      <div className="flex justify-between items-start mb-4 gap-3 flex-wrap">
        <div>
          <h2 className="font-serif text-2xl" style={{ color: BRAND.charcoal }}>{t.creditTitle}</h2>
          <p className="text-sm mt-1" style={{ color: BRAND.stone }}>
            {customers.length} {t.customers.toLowerCase()} · <strong style={{ color: BRAND.roseDark }}>{t.totalOwed}: {formatCurrency(totalOwed)}</strong>
          </p>
        </div>
        <button onClick={onAdd} className="px-4 py-2 text-sm rounded-md flex items-center gap-1 font-medium" style={btnPrimary} onMouseEnter={(e) => btnPrimaryHover(e, true)} onMouseLeave={(e) => btnPrimaryHover(e, false)}>
          <Plus className="w-4 h-4" /> {t.addCustomer}
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="border rounded-lg p-12 text-center" style={{ background: "white", borderColor: BRAND.roseLight }}>
          <Users className="w-12 h-12 mx-auto" style={{ color: BRAND.roseLight }} />
          <p className="mt-3 font-serif italic text-base" style={{ color: BRAND.stone }}>{t.noCustomers}</p>
          <p className="text-xs mt-1" style={{ color: BRAND.stone }}>{t.noCustomersHint}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map(c => {
            const { owed, paid, balance } = customerBalance(c);
            const paidOff = balance <= 0 && owed > 0;
            return (
              <button key={c.id} onClick={() => onView(c)} className="w-full border rounded-lg p-4 text-left flex items-center justify-between gap-3" style={{ background: "white", borderColor: BRAND.roseLight }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = BRAND.rose}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = BRAND.roseLight}>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-lg truncate" style={{ color: BRAND.charcoal }}>{c.name}</p>
                  {c.phone && <p className="text-xs" style={{ color: BRAND.stone }}>{c.phone}</p>}
                  <p className="text-xs mt-1" style={{ color: BRAND.stone }}>
                    {(c.sales || []).length} {t.purchases.toLowerCase()} · {(c.payments || []).length} {t.payments.toLowerCase()}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  {paidOff ? (
                    <div className="text-xs px-2 py-1 rounded font-medium" style={{ background: BRAND.successBg, color: BRAND.success }}>
                      {t.paidInFull}
                    </div>
                  ) : (
                    <>
                      <p className="font-serif text-xl font-medium" style={{ color: balance > 0 ? BRAND.danger : BRAND.stone }}>
                        {formatCurrency(balance)}
                      </p>
                      <p className="text-xs" style={{ color: BRAND.stone }}>
                        {formatCurrency(paid)} / {formatCurrency(owed)}
                      </p>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CustomerForm({ t, customer, onSave, onCancel }) {
  const [data, setData] = useState(customer || { name: "", phone: "", notes: "" });
  const inputStyle = { background: "white", borderColor: BRAND.roseLight };

  const submit = () => {
    if (!data.name?.trim()) {
      alert(t.customerName);
      return;
    }
    onSave(data);
  };

  return (
    <div className="border rounded-lg p-5" style={{ background: "white", borderColor: BRAND.roseLight }}>
      <div className="flex justify-between items-center mb-4 pb-3 border-b" style={{ borderColor: BRAND.roseBg }}>
        <h2 className="font-serif text-2xl" style={{ color: BRAND.charcoal }}>{customer?.id ? t.customerName : t.newCustomer}</h2>
        <button onClick={onCancel} className="p-1 rounded"><X className="w-5 h-5" /></button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs block mb-1 font-medium" style={{ color: BRAND.stone }}>{t.customerName} <span style={{ color: BRAND.rose }}>*</span></label>
          <input value={data.name || ""} onChange={(e) => setData({ ...data, name: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle} autoFocus />
        </div>
        <div>
          <label className="text-xs block mb-1 font-medium" style={{ color: BRAND.stone }}>{t.customerPhone}</label>
          <input type="tel" value={data.phone || ""} onChange={(e) => setData({ ...data, phone: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs block mb-1 font-medium" style={{ color: BRAND.stone }}>{t.customerNotes}</label>
          <textarea value={data.notes || ""} onChange={(e) => setData({ ...data, notes: e.target.value })} rows={3} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle} />
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={submit} className="flex-1 px-4 py-2 text-sm rounded-md font-medium" style={btnPrimary} onMouseEnter={(e) => btnPrimaryHover(e, true)} onMouseLeave={(e) => btnPrimaryHover(e, false)}>{t.save}</button>
        <button onClick={onCancel} className="px-4 py-2 text-sm border rounded-md" style={{ borderColor: BRAND.roseLight, color: BRAND.charcoal, background: "white" }}>{t.cancel}</button>
      </div>
    </div>
  );
}

function CustomerDetail({ t, customer, items, onEdit, onDelete, onBack, onAddSale, onRemoveSale, onAddPayment, onRemovePayment }) {
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { owed, paid, balance } = customerBalance(customer);
  const sales = customer.sales || [];
  const payments = customer.payments || [];
  const paidOff = balance <= 0 && owed > 0;

  // Combine sales + payments into a single timeline sorted by date desc
  const timeline = [
    ...sales.map(s => ({ ...s, _type: "sale" })),
    ...payments.map(p => ({ ...p, _type: "payment" })),
  ].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  return (
    <div className="border rounded-lg p-5" style={{ background: "white", borderColor: BRAND.roseLight }}>
      <div className="flex justify-between items-center mb-4 pb-3 border-b" style={{ borderColor: BRAND.roseBg }}>
        <button onClick={onBack} className="text-sm font-medium flex items-center gap-1" style={{ color: BRAND.roseDark }}>
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </button>
        <div className="flex gap-1">
          <button onClick={onEdit} className="p-2 rounded-md"><Edit2 className="w-4 h-4" /></button>
          <button onClick={onDelete} className="p-2 rounded-md" style={{ color: BRAND.danger }}><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="mb-5">
        <h2 className="font-serif text-3xl leading-tight" style={{ color: BRAND.charcoal }}>{customer.name}</h2>
        {customer.phone && <p className="text-sm mt-1" style={{ color: BRAND.stone }}>{customer.phone}</p>}
        {customer.notes && <p className="text-sm mt-2 font-serif italic" style={{ color: BRAND.stone }}>{customer.notes}</p>}
      </div>

      {/* Balance summary */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        <div className="rounded-md p-3 text-center" style={{ background: BRAND.roseBg }}>
          <p className="text-xs uppercase tracking-wide" style={{ color: BRAND.stone }}>{t.owes}</p>
          <p className="font-serif text-xl mt-1" style={{ color: BRAND.charcoal }}>{formatCurrency(owed)}</p>
        </div>
        <div className="rounded-md p-3 text-center" style={{ background: BRAND.successBg }}>
          <p className="text-xs uppercase tracking-wide" style={{ color: BRAND.stone }}>{t.paid}</p>
          <p className="font-serif text-xl mt-1" style={{ color: BRAND.success }}>{formatCurrency(paid)}</p>
        </div>
        <div className="rounded-md p-3 text-center" style={{ background: paidOff ? BRAND.successBg : "#FFF0F0" }}>
          <p className="text-xs uppercase tracking-wide" style={{ color: BRAND.stone }}>{t.balance}</p>
          <p className="font-serif text-xl mt-1" style={{ color: paidOff ? BRAND.success : BRAND.danger }}>
            {paidOff ? "✓" : formatCurrency(balance)}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-5">
        <button onClick={() => { setShowSaleForm(true); setShowPaymentForm(false); }} className="flex-1 px-3 py-2 text-sm rounded-md flex items-center justify-center gap-1 font-medium border" style={{ borderColor: BRAND.roseLight, color: BRAND.charcoal, background: "white" }}>
          <Plus className="w-4 h-4" /> {t.recordSale}
        </button>
        <button onClick={() => { setShowPaymentForm(true); setShowSaleForm(false); }} className="flex-1 px-3 py-2 text-sm rounded-md flex items-center justify-center gap-1 font-medium" style={btnPrimary} onMouseEnter={(e) => btnPrimaryHover(e, true)} onMouseLeave={(e) => btnPrimaryHover(e, false)}>
          <DollarSign className="w-4 h-4" /> {t.recordPayment}
        </button>
      </div>

      {showSaleForm && (
        <SaleForm t={t} items={items} onSave={(sale) => { onAddSale(sale); setShowSaleForm(false); }} onCancel={() => setShowSaleForm(false)} />
      )}
      {showPaymentForm && (
        <PaymentForm t={t} onSave={(payment) => { onAddPayment(payment); setShowPaymentForm(false); }} onCancel={() => setShowPaymentForm(false)} />
      )}

      {/* Timeline */}
      <div>
        <h3 className="font-serif text-lg mb-2" style={{ color: BRAND.charcoal }}>Timeline</h3>
        {timeline.length === 0 ? (
          <p className="text-sm italic" style={{ color: BRAND.stone }}>{t.noPurchases}</p>
        ) : (
          <div className="space-y-2">
            {timeline.map(entry => (
              <div key={entry.id} className="flex items-center justify-between gap-3 p-3 rounded-md border" style={{ background: entry._type === "payment" ? BRAND.successBg : BRAND.roseBg, borderColor: entry._type === "payment" ? "#B8D4B8" : BRAND.roseLight }}>
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  {entry._type === "payment" ? (
                    <DollarSign className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: BRAND.success }} />
                  ) : (
                    <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: BRAND.roseDark }} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: BRAND.charcoal }}>
                      {entry._type === "payment" ? `${t.recordPayment} · ${entry.method || ""}` : (entry.itemName || t.recordSale)}
                    </p>
                    <p className="text-xs" style={{ color: BRAND.stone }}>
                      {entry.date ? new Date(entry.date).toLocaleDateString() : ""}
                      {entry.note && ` · ${entry.note}`}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2 flex-shrink-0">
                  <p className="font-serif text-lg font-medium" style={{ color: entry._type === "payment" ? BRAND.success : BRAND.charcoal }}>
                    {entry._type === "payment" ? "−" : "+"}{formatCurrency(entry.amount)}
                  </p>
                  <button
                    onClick={() => entry._type === "payment" ? onRemovePayment(entry.id) : onRemoveSale(entry.id)}
                    className="p-1 rounded"
                    style={{ color: BRAND.danger }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SaleForm({ t, items, onSave, onCancel }) {
  const [data, setData] = useState({
    itemId: "",
    itemName: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    note: "",
  });
  const inputStyle = { background: "white", borderColor: BRAND.roseLight };

  const pickItem = (itemId) => {
    const item = items.find(i => i.id === itemId);
    setData({
      ...data,
      itemId,
      itemName: item ? `${item.name} (${item.sku})` : "",
      amount: item?.price || data.amount,
    });
  };

  const submit = () => {
    if (!data.amount || isNaN(Number(data.amount))) {
      alert(t.salePrice);
      return;
    }
    onSave(data);
  };

  return (
    <div className="rounded-md p-3 mb-4 border" style={{ background: BRAND.roseBg, borderColor: BRAND.roseLight }}>
      <p className="font-serif text-base mb-3" style={{ color: BRAND.charcoal }}>{t.recordSale}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="sm:col-span-2">
          <label className="text-xs block mb-1" style={{ color: BRAND.stone }}>{t.selectItem}</label>
          <select value={data.itemId} onChange={(e) => pickItem(e.target.value)} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle}>
            <option value="">— {t.other} —</option>
            {items.map(i => <option key={i.id} value={i.id}>{i.name} ({i.sku}) {i.price ? `· $${i.price}` : ""}</option>)}
          </select>
        </div>
        {!data.itemId && (
          <div className="sm:col-span-2">
            <label className="text-xs block mb-1" style={{ color: BRAND.stone }}>Description</label>
            <input value={data.itemName} onChange={(e) => setData({ ...data, itemName: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle} />
          </div>
        )}
        <div>
          <label className="text-xs block mb-1" style={{ color: BRAND.stone }}>{t.salePrice} <span style={{ color: BRAND.rose }}>*</span></label>
          <input type="number" step="0.01" value={data.amount} onChange={(e) => setData({ ...data, amount: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs block mb-1" style={{ color: BRAND.stone }}>{t.saleDate}</label>
          <input type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs block mb-1" style={{ color: BRAND.stone }}>{t.saleNote}</label>
          <input value={data.note} onChange={(e) => setData({ ...data, note: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle} />
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={submit} className="flex-1 px-3 py-2 text-sm rounded-md font-medium" style={btnPrimary} onMouseEnter={(e) => btnPrimaryHover(e, true)} onMouseLeave={(e) => btnPrimaryHover(e, false)}>{t.save}</button>
        <button onClick={onCancel} className="px-3 py-2 text-sm border rounded-md" style={{ borderColor: BRAND.roseLight, background: "white" }}>{t.cancel}</button>
      </div>
    </div>
  );
}

function PaymentForm({ t, onSave, onCancel }) {
  const [data, setData] = useState({
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    method: "Cash",
    note: "",
  });
  const inputStyle = { background: "white", borderColor: BRAND.roseLight };

  const submit = () => {
    if (!data.amount || isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
      alert(t.paymentAmount);
      return;
    }
    onSave(data);
  };

  return (
    <div className="rounded-md p-3 mb-4 border" style={{ background: BRAND.successBg, borderColor: "#B8D4B8" }}>
      <p className="font-serif text-base mb-3" style={{ color: BRAND.charcoal }}>{t.recordPayment}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <label className="text-xs block mb-1" style={{ color: BRAND.stone }}>{t.paymentAmount} <span style={{ color: BRAND.rose }}>*</span></label>
          <input type="number" step="0.01" value={data.amount} onChange={(e) => setData({ ...data, amount: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle} autoFocus />
        </div>
        <div>
          <label className="text-xs block mb-1" style={{ color: BRAND.stone }}>{t.paymentDate}</label>
          <input type="date" value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle} />
        </div>
        <div>
          <label className="text-xs block mb-1" style={{ color: BRAND.stone }}>{t.paymentMethod}</label>
          <select value={data.method} onChange={(e) => setData({ ...data, method: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle}>
            <option value="Cash">{t.cash}</option>
            <option value="Card">{t.card}</option>
            <option value="Transfer">{t.transfer}</option>
            <option value="Other">{t.other}</option>
          </select>
        </div>
        <div>
          <label className="text-xs block mb-1" style={{ color: BRAND.stone }}>{t.paymentNote}</label>
          <input value={data.note} onChange={(e) => setData({ ...data, note: e.target.value })} className="w-full px-3 py-2 text-sm border rounded-md" style={inputStyle} />
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={submit} className="flex-1 px-3 py-2 text-sm rounded-md font-medium" style={btnPrimary} onMouseEnter={(e) => btnPrimaryHover(e, true)} onMouseLeave={(e) => btnPrimaryHover(e, false)}>{t.save}</button>
        <button onClick={onCancel} className="px-3 py-2 text-sm border rounded-md" style={{ borderColor: BRAND.roseLight, background: "white" }}>{t.cancel}</button>
      </div>
    </div>
  );
}

function SettingsView({ t, lang, setLanguage, fields, setFields, onBack, onExport, onImport, itemCount, lastExport }) {
  const [newField, setNewField] = useState({ label: "", type: "text", options: "" });
  const inputStyle = { background: "white", borderColor: BRAND.roseLight };

  const storageUsed = (() => {
    try {
      const i = localStorage.getItem(LS_ITEMS) || "";
      const f = localStorage.getItem(LS_FIELDS) || "";
      const c = localStorage.getItem(LS_CUSTOMERS) || "";
      const bytes = new Blob([i + f + c]).size;
      return (bytes / 1024 / 1024).toFixed(2);
    } catch { return "?"; }
  })();

  const lastExportText = lastExport
    ? `${t.lastBackup} ${new Date(lastExport).toLocaleDateString()} (${Math.floor((Date.now() - new Date(lastExport).getTime()) / (1000 * 60 * 60 * 24))} ${t.daysAgo})`
    : t.noBackups;

  const addField = () => {
    if (!newField.label.trim()) return;
    const id = newField.label.toLowerCase().replace(/[^a-z0-9]/g, "_") + "_" + Date.now();
    const field = { id, label: newField.label, type: newField.type, builtin: false };
    if (newField.type === "select") {
      field.options = newField.options.split(",").map(s => s.trim()).filter(Boolean);
    }
    setFields([...fields, field]);
    setNewField({ label: "", type: "text", options: "" });
  };

  const removeField = (id) => {
    if (confirm(t.removeFieldConfirm)) {
      setFields(fields.filter(f => f.id !== id));
    }
  };

  return (
    <div className="border rounded-lg p-5" style={{ background: "white", borderColor: BRAND.roseLight }}>
      <div className="flex justify-between items-center mb-5 pb-3 border-b" style={{ borderColor: BRAND.roseBg }}>
        <h2 className="font-serif text-2xl" style={{ color: BRAND.charcoal }}>{t.settingsTitle}</h2>
        <button onClick={onBack} className="text-sm font-medium flex items-center gap-1" style={{ color: BRAND.roseDark }}>
          <ArrowLeft className="w-4 h-4" /> {t.back}
        </button>
      </div>

      <section className="mb-6">
        <h3 className="font-serif text-lg mb-2" style={{ color: BRAND.charcoal }}>{t.language}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage("en")}
            className="px-4 py-2 text-sm rounded-md border font-medium"
            style={{
              background: lang === "en" ? BRAND.rose : "white",
              color: lang === "en" ? "white" : BRAND.charcoal,
              borderColor: lang === "en" ? BRAND.rose : BRAND.roseLight,
            }}
          >
            {t.english}
          </button>
          <button
            onClick={() => setLanguage("es")}
            className="px-4 py-2 text-sm rounded-md border font-medium"
            style={{
              background: lang === "es" ? BRAND.rose : "white",
              color: lang === "es" ? "white" : BRAND.charcoal,
              borderColor: lang === "es" ? BRAND.rose : BRAND.roseLight,
            }}
          >
            {t.spanish}
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-serif text-lg mb-2" style={{ color: BRAND.charcoal }}>{t.data}</h3>
        <div className="flex gap-2 flex-wrap">
          <button onClick={onExport} className="px-3 py-2 text-sm rounded-md flex items-center gap-1 font-medium" style={btnPrimary} onMouseEnter={(e) => btnPrimaryHover(e, true)} onMouseLeave={(e) => btnPrimaryHover(e, false)}>
            <Download className="w-4 h-4" /> {t.exportJSON}
          </button>
          <label className="px-3 py-2 text-sm border rounded-md flex items-center gap-1 cursor-pointer" style={{ borderColor: BRAND.roseLight, color: BRAND.charcoal }}>
            <Upload className="w-4 h-4" /> {t.importJSON}
            <input type="file" accept="application/json" onChange={onImport} className="hidden" />
          </label>
        </div>
        <p className="text-xs mt-2" style={{ color: BRAND.stone }}>
          {itemCount} {t.items} · ~{storageUsed} MB {t.used} · {t.exportHint}
        </p>
        <p className="text-xs mt-1" style={{ color: BRAND.stone }}>{lastExportText}</p>
      </section>

      <section>
        <h3 className="font-serif text-lg mb-2" style={{ color: BRAND.charcoal }}>{t.customFields}</h3>
        <div className="space-y-1 mb-4">
          {fields.map(f => (
            <div key={f.id} className="flex items-center justify-between px-3 py-2 rounded-md text-sm" style={{ background: BRAND.roseBg }}>
              <div>
                <span className="font-medium" style={{ color: BRAND.charcoal }}>{f.label}</span>
                <span className="ml-2 text-xs" style={{ color: BRAND.stone }}>{f.type}{f.builtin && ` • ${t.builtin}`}</span>
              </div>
              {!f.builtin && (
                <button onClick={() => removeField(f.id)} className="p-1 rounded" style={{ color: BRAND.danger }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="border rounded-md p-3" style={{ background: BRAND.roseBg, borderColor: BRAND.roseLight }}>
          <p className="text-xs font-medium mb-2" style={{ color: BRAND.roseDark }}>{t.addNewField}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input placeholder={t.fieldName} value={newField.label} onChange={(e) => setNewField({ ...newField, label: e.target.value })} className="px-3 py-2 text-sm border rounded-md" style={inputStyle} />
            <select value={newField.type} onChange={(e) => setNewField({ ...newField, type: e.target.value })} className="px-3 py-2 text-sm border rounded-md" style={inputStyle}>
              <option value="text">{t.text}</option>
              <option value="textarea">{t.longText}</option>
              <option value="number">{t.number}</option>
              <option value="date">{t.date}</option>
              <option value="select">{t.dropdown}</option>
            </select>
            <button onClick={addField} className="px-3 py-2 text-sm rounded-md font-medium" style={btnPrimary} onMouseEnter={(e) => btnPrimaryHover(e, true)} onMouseLeave={(e) => btnPrimaryHover(e, false)}>{t.addField}</button>
          </div>
          {newField.type === "select" && (
            <input placeholder={t.dropdownOptions} value={newField.options} onChange={(e) => setNewField({ ...newField, options: e.target.value })} className="w-full mt-2 px-3 py-2 text-sm border rounded-md" style={inputStyle} />
          )}
        </div>
      </section>
    </div>
  );
}

function QRScanner({ t, onClose, onScan }) {
  const containerId = "qr-reader-el";
  const scannerRef = useRef(null);

  useEffect(() => {
    const start = () => {
      const Html5Qrcode = window.Html5Qrcode;
      if (!Html5Qrcode) return;
      const scanner = new Html5Qrcode(containerId);
      scannerRef.current = scanner;
      scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          scanner.stop().then(() => onScan(decodedText)).catch(() => onScan(decodedText));
        },
        () => {}
      ).catch((err) => {
        alert("Camera error: " + err);
        onClose();
      });
    };
    if (window.Html5Qrcode) { start(); return; }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js";
    script.onload = start;
    document.body.appendChild(script);
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(26,26,26,0.75)" }}>
      <div className="rounded-lg p-4 max-w-sm w-full" style={{ background: "white" }}>
        <div className="flex justify-between items-center mb-3 pb-2 border-b" style={{ borderColor: BRAND.roseBg }}>
          <h3 className="font-serif text-lg" style={{ color: BRAND.charcoal }}>{t.scanQR}</h3>
          <button onClick={onClose} className="p-1 rounded"><X className="w-4 h-4" /></button>
        </div>
        <div id={containerId} className="w-full rounded overflow-hidden" />
        <p className="text-xs mt-2 text-center" style={{ color: BRAND.stone }}>{t.pointCamera}</p>
      </div>
    </div>
  );
}
