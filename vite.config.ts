import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts(),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "Raycaster",
			fileName: "react-raycaster",
		},
		rollupOptions: {
			external: ["react"],
			output: {
				globals: {
					react: "React",
				},
			},
		},
	},
})
