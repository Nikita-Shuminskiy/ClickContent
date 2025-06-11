// vite.config.ts
import react from "file:///C:/Users/veexy/Desktop/projects/donates-ui/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/veexy/Desktop/projects/donates-ui/node_modules/vite/dist/node/index.js";

// generate-sitemap.ts
import { SitemapStream } from "file:///C:/Users/veexy/Desktop/projects/donates-ui/node_modules/sitemap/dist/index.js";
import { createWriteStream } from "fs";
import { resolve } from "path";
import { pipeline } from "stream";
import { promisify } from "util";
var __vite_injected_original_dirname = "C:\\Users\\veexy\\Desktop\\projects\\donates-ui";
var links = [
  { url: "/", changefreq: "monthly", priority: 0.8 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/receipt", changefreq: "monthly", priority: 0.8 },
  { url: "/policy", changefreq: "monthly", priority: 0.7 },
  { url: "/terms", changefreq: "monthly", priority: 0.7 },
  { url: "/tips/:subjectMatter", changefreq: "monthly", priority: 0.7 },
  { url: "/blog", changefreq: "monthly", priority: 0.5 },
  { url: "/blog/:id", changefreq: "daily", priority: 1 }
];
var generateSitemap = () => {
  const sitemap = new SitemapStream({ hostname: "https://clickcontent.svctools.ru" });
  const writeStream = createWriteStream(resolve(__vite_injected_original_dirname, "public", "sitemap.xml"));
  const pipe = promisify(pipeline);
  pipe(sitemap, writeStream).then(() => console.log("Sitemap \u0441\u043E\u0437\u0434\u0430\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E")).catch((err) => console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 sitemap", err));
  links.forEach((link) => sitemap.write(link));
  sitemap.end();
};

// vite.config.ts
import cssnano from "file:///C:/Users/veexy/Desktop/projects/donates-ui/node_modules/cssnano/src/index.js";
import tailwindcss from "file:///C:/Users/veexy/Desktop/projects/donates-ui/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_dirname2 = "C:\\Users\\veexy\\Desktop\\projects\\donates-ui";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname2, "./src"),
      "@assets": path.resolve(__vite_injected_original_dirname2, "./src/assets"),
      "@components": path.resolve(__vite_injected_original_dirname2, "./src/components")
    }
  },
  plugins: [
    react(),
    {
      name: "vite-plugin-sitemap",
      apply: "build",
      closeBundle: generateSitemap
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        cssnano({
          preset: "default"
        })
      ]
    }
  },
  preview: {
    host: true,
    port: 8080
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiZ2VuZXJhdGUtc2l0ZW1hcC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHZlZXh5XFxcXERlc2t0b3BcXFxccHJvamVjdHNcXFxcZG9uYXRlcy11aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdmVleHlcXFxcRGVza3RvcFxcXFxwcm9qZWN0c1xcXFxkb25hdGVzLXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy92ZWV4eS9EZXNrdG9wL3Byb2plY3RzL2RvbmF0ZXMtdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCJcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXHJcbmltcG9ydCB7IGdlbmVyYXRlU2l0ZW1hcCB9IGZyb20gJy4vZ2VuZXJhdGUtc2l0ZW1hcCdcclxuaW1wb3J0IGNzc25hbm8gZnJvbSAnY3NzbmFubydcclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJ1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgICAgICAgIFwiQGFzc2V0c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2Fzc2V0c1wiKSxcclxuICAgICAgICAgICAgXCJAY29tcG9uZW50c1wiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2NvbXBvbmVudHNcIiksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgcmVhY3QoKSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd2aXRlLXBsdWdpbi1zaXRlbWFwJyxcclxuICAgICAgICAgICAgYXBwbHk6ICdidWlsZCcsXHJcbiAgICAgICAgICAgIGNsb3NlQnVuZGxlOiBnZW5lcmF0ZVNpdGVtYXAsXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICAgIHBvc3Rjc3M6IHtcclxuICAgICAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICAgICAgdGFpbHdpbmRjc3MoKSxcclxuICAgICAgICAgICAgICAgIGNzc25hbm8oe1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldDogJ2RlZmF1bHQnLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcHJldmlldzoge1xyXG4gICAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgICAgcG9ydDogODA4MCxcclxuICAgIH0sXHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcdmVleHlcXFxcRGVza3RvcFxcXFxwcm9qZWN0c1xcXFxkb25hdGVzLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx2ZWV4eVxcXFxEZXNrdG9wXFxcXHByb2plY3RzXFxcXGRvbmF0ZXMtdWlcXFxcZ2VuZXJhdGUtc2l0ZW1hcC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdmVleHkvRGVza3RvcC9wcm9qZWN0cy9kb25hdGVzLXVpL2dlbmVyYXRlLXNpdGVtYXAudHNcIjtpbXBvcnQgeyBTaXRlbWFwU3RyZWFtIH0gZnJvbSAnc2l0ZW1hcCdcclxuaW1wb3J0IHsgY3JlYXRlV3JpdGVTdHJlYW0gfSBmcm9tICdmcydcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IHBpcGVsaW5lIH0gZnJvbSAnc3RyZWFtJ1xyXG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tICd1dGlsJ1xyXG5cclxuY29uc3QgbGlua3MgPSBbXHJcbiAgICB7IHVybDogJy8nLCBjaGFuZ2VmcmVxOiAnbW9udGhseScsIHByaW9yaXR5OiAwLjggfSxcclxuICAgIHsgdXJsOiAnL2Fib3V0JywgY2hhbmdlZnJlcTogJ21vbnRobHknLCBwcmlvcml0eTogMC44IH0sXHJcbiAgICB7IHVybDogJy9yZWNlaXB0JywgY2hhbmdlZnJlcTogJ21vbnRobHknLCBwcmlvcml0eTogMC44IH0sXHJcbiAgICB7IHVybDogJy9wb2xpY3knLCBjaGFuZ2VmcmVxOiAnbW9udGhseScsIHByaW9yaXR5OiAwLjcgfSxcclxuICAgIHsgdXJsOiAnL3Rlcm1zJywgY2hhbmdlZnJlcTogJ21vbnRobHknLCBwcmlvcml0eTogMC43IH0sXHJcbiAgICB7IHVybDogJy90aXBzLzpzdWJqZWN0TWF0dGVyJywgY2hhbmdlZnJlcTogJ21vbnRobHknLCBwcmlvcml0eTogMC43IH0sXHJcbiAgICB7IHVybDogJy9ibG9nJywgY2hhbmdlZnJlcTogJ21vbnRobHknLCBwcmlvcml0eTogMC41IH0sXHJcbiAgICB7IHVybDogJy9ibG9nLzppZCcsIGNoYW5nZWZyZXE6ICdkYWlseScsIHByaW9yaXR5OiAxIH0sXHJcbl1cclxuXHJcbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVNpdGVtYXAgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3Qgc2l0ZW1hcCA9IG5ldyBTaXRlbWFwU3RyZWFtKHsgaG9zdG5hbWU6ICdodHRwczovL2NsaWNrY29udGVudC5zdmN0b29scy5ydScgfSlcclxuICAgIGNvbnN0IHdyaXRlU3RyZWFtID0gY3JlYXRlV3JpdGVTdHJlYW0ocmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnLCAnc2l0ZW1hcC54bWwnKSlcclxuICAgIGNvbnN0IHBpcGUgPSBwcm9taXNpZnkocGlwZWxpbmUpXHJcblxyXG4gICAgcGlwZShzaXRlbWFwLCB3cml0ZVN0cmVhbSlcclxuICAgICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnU2l0ZW1hcCBcdTA0NDFcdTA0M0VcdTA0MzdcdTA0MzRcdTA0MzBcdTA0M0QgXHUwNDQzXHUwNDQxXHUwNDNGXHUwNDM1XHUwNDQ4XHUwNDNEXHUwNDNFJykpXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoJ1x1MDQxRVx1MDQ0OFx1MDQzOFx1MDQzMVx1MDQzQVx1MDQzMCBcdTA0M0ZcdTA0NDBcdTA0MzggXHUwNDQxXHUwNDNFXHUwNDM3XHUwNDM0XHUwNDMwXHUwNDNEXHUwNDM4XHUwNDM4IHNpdGVtYXAnLCBlcnIpKVxyXG5cclxuICAgIGxpbmtzLmZvckVhY2gobGluayA9PiBzaXRlbWFwLndyaXRlKGxpbmspKVxyXG4gICAgc2l0ZW1hcC5lbmQoKVxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VCxPQUFPLFdBQVc7QUFDOVUsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9COzs7QUNGeVMsU0FBUyxxQkFBcUI7QUFDcFcsU0FBUyx5QkFBeUI7QUFDbEMsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVMsaUJBQWlCO0FBSjFCLElBQU0sbUNBQW1DO0FBTXpDLElBQU0sUUFBUTtBQUFBLEVBQ1YsRUFBRSxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsSUFBSTtBQUFBLEVBQ2pELEVBQUUsS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLElBQUk7QUFBQSxFQUN0RCxFQUFFLEtBQUssWUFBWSxZQUFZLFdBQVcsVUFBVSxJQUFJO0FBQUEsRUFDeEQsRUFBRSxLQUFLLFdBQVcsWUFBWSxXQUFXLFVBQVUsSUFBSTtBQUFBLEVBQ3ZELEVBQUUsS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLElBQUk7QUFBQSxFQUN0RCxFQUFFLEtBQUssd0JBQXdCLFlBQVksV0FBVyxVQUFVLElBQUk7QUFBQSxFQUNwRSxFQUFFLEtBQUssU0FBUyxZQUFZLFdBQVcsVUFBVSxJQUFJO0FBQUEsRUFDckQsRUFBRSxLQUFLLGFBQWEsWUFBWSxTQUFTLFVBQVUsRUFBRTtBQUN6RDtBQUVPLElBQU0sa0JBQWtCLE1BQU07QUFFakMsUUFBTSxVQUFVLElBQUksY0FBYyxFQUFFLFVBQVUsbUNBQW1DLENBQUM7QUFDbEYsUUFBTSxjQUFjLGtCQUFrQixRQUFRLGtDQUFXLFVBQVUsYUFBYSxDQUFDO0FBQ2pGLFFBQU0sT0FBTyxVQUFVLFFBQVE7QUFFL0IsT0FBSyxTQUFTLFdBQVcsRUFDcEIsS0FBSyxNQUFNLFFBQVEsSUFBSSx5RkFBd0IsQ0FBQyxFQUNoRCxNQUFNLENBQUMsUUFBUSxRQUFRLE1BQU0sb0hBQStCLEdBQUcsQ0FBQztBQUVyRSxRQUFNLFFBQVEsVUFBUSxRQUFRLE1BQU0sSUFBSSxDQUFDO0FBQ3pDLFVBQVEsSUFBSTtBQUNoQjs7O0FEekJBLE9BQU8sYUFBYTtBQUNwQixPQUFPLGlCQUFpQjtBQUx4QixJQUFNQSxvQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxLQUFLLFFBQVFDLG1DQUFXLE9BQU87QUFBQSxNQUNwQyxXQUFXLEtBQUssUUFBUUEsbUNBQVcsY0FBYztBQUFBLE1BQ2pELGVBQWUsS0FBSyxRQUFRQSxtQ0FBVyxrQkFBa0I7QUFBQSxJQUM3RDtBQUFBLEVBQ0o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsSUFDakI7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxlQUNJO0FBQUEsTUFDSSxRQUFRO0FBQUEsUUFDSixjQUFjLENBQUMsT0FBTztBQUNsQixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDN0IsbUJBQU8sR0FBRyxTQUFTLEVBQUUsTUFBTSxlQUFlLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTO0FBQUEsVUFDMUU7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNSO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxTQUFTO0FBQUEsTUFDTCxTQUFTO0FBQUEsUUFDTCxZQUFZO0FBQUEsUUFDWixRQUFRO0FBQUEsVUFDSixRQUFRO0FBQUEsUUFDWixDQUFDO0FBQUEsTUFDTDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDVjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIl0KfQo=
