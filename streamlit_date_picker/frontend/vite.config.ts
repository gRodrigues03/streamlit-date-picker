import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
    base: "./",
    plugins: [react()],
    define: {
        "process.env.NODE_ENV": '"production"',
    },
    build: {
        outDir: "dist",
        target: "chrome109",
        minify: "terser",
        sourcemap: false,
        lib: {
            entry: "./src/index.tsx",
            name: "MyComponent",
            formats: ["es"],
            fileName: "index",
        },
    },
});