import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationState {
  location: string;
  setLocation: (location: string) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      location: "Cairo",
      setLocation: (location: string) => set({ location }),
    }),
    {
      name: "weather-location-storage",
    }
  )
);
