import { create } from 'zustand';

interface Filters {
  minPrice: number;
  maxPrice: number;
  minSqft: string;
  maxSqft: string;
  propertyTypes: string[];
  amenities: string[];
  possession: string;
  locality: string;
  schools: string;
  transit: string;
  parks: string;
}

const defaultFilters: Filters = {
  minPrice: 0,
  maxPrice: 100000000,
  minSqft: '',
  maxSqft: '',
  propertyTypes: [],
  amenities: [],
  possession: 'All',
  locality: 'All',
  schools: 'Within 2 miles',
  transit: 'Walking distance (<0.5mi)',
  parks: 'Within 1 mile',
};

interface FilterStore {
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: defaultFilters,
  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
