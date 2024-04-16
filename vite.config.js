import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build:{
        lib:{
            entry: resolve(__dirname, "js/main.js"),
            name: "Themtfy",
            fileName: "themtfy.min"
        }
    }
})