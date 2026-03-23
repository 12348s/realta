'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SavedStore {
  savedIds: string[];
  toggle: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set, get) => ({
      savedIds: [],
      toggle: (id) => {
        const current = get().savedIds;
        const isCurrentlySaved = current.includes(id);
        set({ savedIds: isCurrentlySaved ? current.filter((s) => s !== id) : [...current, id] });
        import('@/components/ui/use-toast').then(({ toast }) => {
          toast({ description: isCurrentlySaved ? "Removed from wishlist" : "Added to wishlist ❤️" });
        });
      },
      isSaved: (id) => get().savedIds.includes(id),
    }),
    { name: 'realta-saved' }
  )
);
