import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',  // <- Esto asegura que los paths de los assets se carguen relativos
  plugins: [react()],
});
