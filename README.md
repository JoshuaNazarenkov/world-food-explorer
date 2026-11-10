# World Food Explorer

A responsive, interactive food-discovery website built with HTML, CSS, and vanilla JavaScript.

## Features
- Browse 12 dishes from different regions of the world.
- Search by dish, country, cuisine, or description.
- Filter by region and dietary preference.
- Open a dish to view its description, common ingredients, and a food fact.
- Generate a random recommendation that respects the selected filters.
- Save and remove favorites; favorites persist in the browser with localStorage.
- Responsive layout for desktop, tablet, and mobile.

## Run locally
1. Download or clone this project.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the Live Server extension in VS Code.
4. No build step or package installation is required.

## Deploy free with GitHub Pages
1. Create a GitHub repository named `world-food-explorer`.
2. Upload `index.html`, `style.css`, and `script.js` to the repository's root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for GitHub Pages to publish. Your live URL will look like:
   `https://YOUR-GITHUB-USERNAME.github.io/world-food-explorer/`

## Suggested GitHub Copilot prompts
Use these in Visual Studio Code's GitHub Copilot Chat while improving the project. Review and test the suggestions rather than accepting code blindly.

1. "Review this food explorer website and suggest three improvements to accessibility and responsive design. Explain the changes before editing."
2. "Improve the dish search so it matches dish names, countries, cuisine types, and descriptions. Keep the existing HTML, CSS, and JavaScript structure."
3. "Review the favorites feature for bugs. Make sure favorites persist after refreshing the page and that the displayed counts stay accurate."
4. "Add keyboard accessibility to the dish cards and explain how a keyboard-only user can open a dish and save it."
5. "Review the CSS breakpoints and improve the layout for phones that are 375 pixels wide without changing the desktop design."

## Brief reflection (edit to reflect your actual experience)
I created World Food Explorer to help users discover popular foods from different countries. The app lets users search and filter dishes, view details, get a random recommendation, and save favorites. I used HTML to structure the page, CSS to create the responsive design, and JavaScript to make the features interactive. I used GitHub Copilot in Visual Studio Code to help review and improve the code, then tested the features and fixed issues. One challenge was keeping the favorites list and its count updated whenever a dish was saved or removed. This project helped me better understand how JavaScript connects user actions to changes on a webpage. I also learned how a static website can be published for free with GitHub Pages.

**Important:** Update this reflection so it accurately describes the Copilot prompts you actually used, the changes you made, and the testing you completed.
