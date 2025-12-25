import { create } from 'zustand';

export const useServiceStore = create((set) => ({
  services: [],
  loading: false,
  error: null,

  fetchServices: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        'https://shazmlc.cloud/webhook/service'
      );

      if (!res.ok) {
        throw new Error('Failed to fetch services');
      }

      const data = await res.json();

       set({ services: [data], loading: false });

       // set({ services: data, loading: false });

    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
