import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TemperatureUnit = "C" | "F";
export type WindUnit = "kph" | "mph";
export type PressureUnit = "mb" | "in";
export type VisibilityUnit = "km" | "miles";
export type PrecipitationUnit = "mm" | "in";
export type TimeFormat = "12h" | "24h";

export interface SettingsState {
  temperature: TemperatureUnit;
  wind: WindUnit;
  pressure: PressureUnit;
  visibility: VisibilityUnit;
  precipitation: PrecipitationUnit;
  timeFormat: TimeFormat;

  hasChanged: boolean;

  setSetting: <K extends keyof Omit<SettingsState, "setSetting" | "resetToDefault" | "hasChanged">>(
    key: K,
    value: SettingsState[K]
  ) => void;

  resetToDefault: () => void;
}

const defaultSettings = {
  temperature: "C",
  wind: "kph",
  pressure: "mb",
  visibility: "km",
  precipitation: "mm",
  timeFormat: "12h",
} as const;

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      hasChanged: false,

      setSetting: (key, value) =>
        set((state) => ({
          ...state,
          [key]: value,
          hasChanged: true,
        })),

      resetToDefault: () =>
        set({
          ...defaultSettings,
          hasChanged: false,
        }),
    }),
    {
      name: "weather-settings-storage",

      partialize: (state) => ({
        temperature: state.temperature,
        wind: state.wind,
        pressure: state.pressure,
        visibility: state.visibility,
        precipitation: state.precipitation,
        timeFormat: state.timeFormat,
      }),
    }
  )
);
