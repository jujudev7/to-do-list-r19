https://vite.dev/guide/  
pnpm create vite  
React > JavaScript + SWC

https://react.dev/blog/2024/04/25/react-19-upgrade-guide  
pnpm i react@rc react-dom@rc  
package.json -> devDependencies :  
"@types/react": "npm:types-react@rc",  
"@types/react-dom": "npm:types-react-dom@rc",

pnpm run dev  
clear App.jsx  
delete App.css  
clear index.css  
delete public/vite.svg  
delete assets/react.svg

https://tailwindcss.com/docs/guides/vite  
pnpm install -D tailwindcss postcss autoprefixer  
pnpm dlx tailwindcss init -p  
tailwind.config.js :  
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
],  
index.css :  
@tailwind base;  
@tailwind components;  
@tailwind utilities;

https://tailwindcss.com/blog/automatic-class-sorting-with-prettier  
pnpm install -D prettier prettier-plugin-tailwindcss  
create .prettierrc :  
{  
"plugins": [
"prettier-plugin-tailwindcss"
]  
}
