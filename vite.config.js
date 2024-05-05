import { defineConfig } from "vite";
import typeComposerPlugin from "typecomposer-plugin";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts(), typeComposerPlugin()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: process.env.npm_package_name,
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["typecomposer"],
      output: {
        format: "es",
      },
    },
  },
});
