
import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env, set_safe_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n\t<meta charset=\"utf-8\" />\r\n\t<link rel=\"icon\" href=\"" + assets + "/favicon.svg\" />\r\n\r\n\t<link rel=\"stylesheet\" href=\"/src/lib/css/reset.css\">\r\n\t<link rel=\"stylesheet\" href=\"/src/lib/css/global.css\">\r\n\r\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\r\n\r\n\t<title>Gamer-Challenges - Accueil</title>\r\n\t" + head + "\r\n</head>\r\n\r\n<body data-sveltekit-preload-data=\"hover\">\r\n\t<div style=\"display: contents\">" + body + "</div>\r\n\r\n\t<script>\r\n\t\tdocument.addEventListener('DOMContentLoaded', function () {\r\n\t\t// === BURGER MENU (Mobile) ===\r\n\t\tconst burger = document.getElementById('burger');\r\n\t\tconst mobileMenu = document.getElementById('mobileMenu');\r\n\t\tconst closeMenu = document.getElementById('closeMenu');\r\n\r\n\t\tif (burger && mobileMenu && closeMenu) {\r\n\t\t\t// Ouvrir le menu mobile\r\n\t\t\tburger.addEventListener('click', (e) => {\r\n\t\t\t\te.stopPropagation();\r\n\t\t\t\tmobileMenu.classList.toggle('show');\r\n\t\t\t});\r\n\r\n\t\t\t// Fermer le menu avec la croix\r\n\t\t\tcloseMenu.addEventListener('click', (e) => {\r\n\t\t\t\te.stopPropagation();\r\n\t\t\t\tmobileMenu.classList.remove('show');\r\n\t\t\t});\r\n\r\n\t\t\t// Empêcher la fermeture en cliquant dans le menu\r\n\t\t\tmobileMenu.addEventListener('click', (e) => {\r\n\t\t\t\te.stopPropagation();\r\n\t\t\t});\r\n\r\n\t\t\t// Fermer le menu si clic en dehors\r\n\t\t\tdocument.addEventListener('click', () => {\r\n\t\t\t\tmobileMenu.classList.remove('show');\r\n\t\t\t});\r\n\t\t}\r\n\r\n\t\t// === SLIDER ===\r\n\t\tconst slides = document.querySelectorAll('.slide');\r\n\t\tconst prevBtn = document.querySelector('.popular-games__arrow.prev');\r\n\t\tconst nextBtn = document.querySelector('.popular-games__arrow.next');\r\n\t\tconst pagination = document.querySelector('.popular-games__pagination');\r\n\t\tconst progressCircle = document.querySelector('.circle-fill');\r\n\r\n\t\tlet currentIndex = 0;\r\n\t\tlet autoSlideInterval = null;\r\n\t\tconst slideDuration = 5000; // 5s\r\n\r\n\t\tfunction animateProgressCircle() {\r\n\t\t\tif (!progressCircle) return;\r\n\r\n\t\t\t// Calculer le périmètre du cercle dynamiquement\r\n\t\t\tconst radius = progressCircle.r.baseVal.value;\r\n\t\t\tconst circumference = 2 * Math.PI * radius;\r\n\r\n\t\t\tprogressCircle.style.strokeDasharray = `${circumference}`;\r\n\t\t\tprogressCircle.style.strokeDashoffset = `${circumference}`;\r\n\t\t\tprogressCircle.style.transition = 'none';\r\n\r\n\t\t\t// Force reflow\r\n\t\t\tvoid progressCircle.getBoundingClientRect();\r\n\r\n\t\t\tprogressCircle.style.transition = `stroke-dashoffset ${slideDuration}ms linear`;\r\n\t\t\tprogressCircle.style.strokeDashoffset = '0';\r\n\t\t}\r\n\r\n\t\tfunction updateSlide(index) {\r\n\t\t\tslides.forEach((slide, i) => {\r\n\t\t\t\tif (i === index) {\r\n\t\t\t\t\tslide.classList.add('active');\r\n\t\t\t\t} else {\r\n\t\t\t\t\tslide.classList.remove('active');\r\n\t\t\t\t}\r\n\t\t\t});\r\n\r\n\t\t\tif (pagination) {\r\n\t\t\t\tpagination.textContent = `${index + 1} / ${slides.length}`;\r\n\t\t\t}\r\n\r\n\t\t\tanimateProgressCircle();\r\n\t\t}\r\n\r\n\r\n\r\n\t\tfunction nextSlide() {\r\n\t\t\tcurrentIndex = (currentIndex + 1) % slides.length;\r\n\t\t\tupdateSlide(currentIndex);\r\n\t\t\tresetAutoSlide();\r\n\t\t}\r\n\r\n\t\tfunction prevSlide() {\r\n\t\t\tcurrentIndex = (currentIndex - 1 + slides.length) % slides.length;\r\n\t\t\tupdateSlide(currentIndex);\r\n\t\t\tresetAutoSlide();\r\n\t\t}\r\n\r\n\t\tfunction startAutoSlide() {\r\n\t\t\tautoSlideInterval = setInterval(nextSlide, slideDuration);\r\n\t\t}\r\n\r\n\t\tfunction resetAutoSlide() {\r\n\t\t\tclearInterval(autoSlideInterval);\r\n\t\t\tstartAutoSlide();\r\n\t\t}\r\n\r\n\t\tfunction initSlider() {\r\n\t\t\tif (!slides.length || !prevBtn || !nextBtn || !pagination || !progressCircle) {\r\n\t\t\t\tconsole.warn('Slider: One or more required elements are missing in the DOM.');\r\n\t\t\t\treturn;\r\n\t\t\t}\r\n\t\t\tslides[0].classList.add('active');\r\n\t\t\tupdateSlide(currentIndex);\r\n\t\t\tstartAutoSlide();\r\n\r\n\t\t\tnextBtn.addEventListener('click', nextSlide);\r\n\t\t\tprevBtn.addEventListener('click', prevSlide);\r\n\t\t}\r\n\r\n\r\n\t\tinitSlider();\r\n\t});\r\n\t</script>\r\n</body>\r\n</html>",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "5jn4nm"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let init;
	

	let reroute;
	let transport;
	

	return {
		handle,
		handleFetch,
		handleError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation, set_safe_public_env };
