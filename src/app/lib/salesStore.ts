// src/lib/salesStore.ts

const TOTAL_CAPACITY = 6791;

export interface SalesData {
  ticketsByCategory: {
    standard: number;
    premium: number;
    vip: number;
    'carre-or': number;
  };
  totalSold: number;
  grossRevenue: number;
  netRevenue: number;
  totalOrders: number;
  discounts: number;
  salesHistory: number[];
}

const INITIAL_DATA: SalesData = {
  ticketsByCategory: {
    standard: 0,
    premium: 0,
    vip: 0,
    'carre-or': 0,
  },
  totalSold: 0,
  grossRevenue: 0,
  netRevenue: 0,
  totalOrders: 0,
  discounts: 0,
  salesHistory: [],
};

// Validation stricte
const isValidSalesData = (data: any): data is SalesData => {
  return (
    data &&
    typeof data === 'object' &&
    data.ticketsByCategory &&
    typeof data.ticketsByCategory.standard === 'number' &&
    typeof data.ticketsByCategory.premium === 'number' &&
    typeof data.ticketsByCategory.vip === 'number' &&
    typeof data.ticketsByCategory['carre-or'] === 'number' &&
    typeof data.totalSold === 'number' &&
    typeof data.grossRevenue === 'number' &&
    typeof data.netRevenue === 'number' &&
    typeof data.totalOrders === 'number' &&
    Array.isArray(data.salesHistory)      // <-- vérifie que c'est un tableau
  );
};

export const getSalesData = (): SalesData => {
  const stored = localStorage.getItem('salesData');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Migration : ajoute salesHistory s'il manque
      if (!parsed.salesHistory) parsed.salesHistory = [];
      if (isValidSalesData(parsed)) return parsed;
    } catch (e) {
      console.warn('Erreur de parsing, réinitialisation...');
    }
  }
  return { ...INITIAL_DATA };
};

export const setSalesData = (data: SalesData) => {
  localStorage.setItem('salesData', JSON.stringify(data));
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('sales-update'));
};

export const addSale = (items: { category: string; quantity: number; price: number }[]) => {
  const current = getSalesData();

  const newCategoryCounts = { ...current.ticketsByCategory };
  let newTotalSold = current.totalSold;
  let newGrossRevenue = current.grossRevenue;

  for (const item of items) {
    const cat = item.category as keyof typeof newCategoryCounts;
    if (newCategoryCounts[cat] !== undefined) {
      newCategoryCounts[cat] += item.quantity;
      newTotalSold += item.quantity;
      newGrossRevenue += item.price * item.quantity;
    } else {
      console.warn(`Catégorie inconnue : ${item.category}`);
    }
  }

  const newNetRevenue = newGrossRevenue * 0.9;
  const newTotalOrders = current.totalOrders + 1;
  const newHistory = [...current.salesHistory, newTotalSold];
  const trimmedHistory = newHistory.slice(-30);

  setSalesData({
    ...current,
    ticketsByCategory: newCategoryCounts,
    totalSold: newTotalSold,
    grossRevenue: newGrossRevenue,
    netRevenue: newNetRevenue,
    totalOrders: newTotalOrders,
    salesHistory: trimmedHistory,
  });
};

export const resetSalesData = () => {
  localStorage.setItem('salesData', JSON.stringify(INITIAL_DATA));
  window.dispatchEvent(new Event('storage'));
  window.dispatchEvent(new Event('sales-update'));
};

export const onSalesUpdate = (callback: (data: SalesData) => void) => {
  const handler = () => callback(getSalesData());
  window.addEventListener('storage', handler);
  window.addEventListener('sales-update', handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener('sales-update', handler);
  };
};