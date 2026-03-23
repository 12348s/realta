import { create } from 'zustand';

interface NewListing {
  propertyId: string;
  title: string;
  price: { range: string };
  location: { locality: string; city: string };
  configurations: string;
  propertyType: string;
  images: { url: string }[];
  isNew?: boolean;
}

interface ListingStore {
  newListings: NewListing[];
  addListing: (listing: NewListing) => void;
}

export const useListingStore = create<ListingStore>((set) => ({
  newListings: [],
  addListing: (listing) =>
    set((state) => ({ newListings: [listing, ...state.newListings] })),
}));
