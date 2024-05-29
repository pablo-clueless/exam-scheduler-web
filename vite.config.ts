import tsconfigpaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { defineConfig } from "vite"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr(), tsconfigpaths()],
	server: {
		hmr: {
			overlay: false,
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})
