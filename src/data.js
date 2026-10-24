/* ============ EDIT ME ============ */
export const C={
 email:'tiewithtechie@gmail.com', phone:'+91 78927 68583', wa:'917892768583',
 linkedin:'https://www.linkedin.com/in/tiewithtechh', instagram:'https://www.instagram.com/tiewithtech',
 location:'Bengaluru', available:true,
 formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || 'https://script.google.com/macros/s/AKfycbx14izSdKZsSwCc6Uye2WlycyPhfGmei_aa9UWlh7UEZu71eBoUD2hNg9Gb0S0gG0QC/exec',   // Google Apps Script Web App URL (writes to your Sheet)
 price:{site:'₹15,000',care:'₹2,000 / month',grow:'₹8,000 / month'},   // PLACEHOLDER prices: set your own
 timing:{site:'about 1 week',ecom:'3–4 weeks'},
 slots:['10:00','11:30','15:00','16:30','18:00'], days:[1,2,3,4,5,6], horizonDays:21   // call slots (Mon–Sat)
};
export const SERVICES={BUILD:[
 ['Website Development','Custom, responsive business websites that are clear to use and easy to update.'],
 ['E-commerce Development','Online stores with product pages, cart and checkout integration, and simple product management.'],
 ['Web Application Development','Interactive tools and custom web apps shaped around how your business works.']],
 GROW:[
 ['Social Media Marketing','Strategy, content planning and account management to build your brand presence.'],
 ['Meta Ads Management','Facebook and Instagram campaigns: setup, audiences, creative testing and monitoring.'],
 ['SEO','Technical and on-page improvements to help the right people find your site.'],
 ['Video Editing & Content Creation','Reels, short-form and promotional video made for your channels.']]};
export const FORM_SERVICES=[...SERVICES.BUILD,...SERVICES.GROW].map(s=>s[0]).concat('Other');
export const BUDGETS=['Not sure yet','Under ₹25,000','₹25,000 – ₹75,000','₹75,000 – ₹2,00,000','₹2,00,000+'];
export const TIMELINES=['Flexible','Within 1 month','1–3 months','3+ months'];
export const NEEDS=[
 ['I need a website for my business','site',['Website Development']],
 ['I want to sell online','site',['E-commerce Development']],
 ['People can’t find us on Google','grow',['SEO']],
 ['I want more enquiries from Instagram','grow',['Social Media Marketing','Meta Ads Management']]];
export const CARDS=[
 {id:'site',t:'Websites & Online Stores',d:'Business sites, menus and online shops that work on any phone',svc:['Website Development']},
 {id:'grow',t:'Social, Ads & SEO',d:'Content, Meta ads and search fixes that bring people in',svc:['Social Media Marketing','Meta Ads Management']}];
export const VIS={w1:`<svg viewBox="0 0 220 140" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="34" width="68" height="88" rx="10" opacity=".55"/><rect x="14" y="42" width="52" height="42" rx="6" fill="rgba(180,83,58,.10)" stroke="none"/><path d="M14 98h38M14 108h24" opacity=".6"/><rect x="166" y="50" width="50" height="76" rx="10" opacity=".55"/><rect x="173" y="57" width="36" height="34" rx="6" fill="rgba(180,83,58,.10)" stroke="none"/><path d="M173 104h24M173 114h14" opacity=".6"/><rect x="82" y="6" width="76" height="108" rx="11" fill="#FAF7F0"/><rect x="90" y="14" width="60" height="58" rx="7" fill="rgba(242,201,176,.55)" stroke="none"/><path d="M114 32l16 11-16 11z" fill="#B4533A" stroke="none"/><path d="M98 96c-6-4.500-9-7.500-9-10.500a4.500 4.500 0 0 1 9-1.200 4.500 4.500 0 0 1 9 1.200c0 3-3 6-9 10.500z" stroke="#B4533A"/><path d="M118 88h24M118 98h16" opacity=".6"/><circle cx="104" cy="126" r="1.600" fill="#B4533A" stroke="none"/><circle cx="116" cy="126" r="1.600" fill="currentColor" stroke="none" opacity=".4"/><circle cx="128" cy="126" r="1.600" fill="currentColor" stroke="none" opacity=".4"/></svg>`,w2:`<svg viewBox="0 0 220 140" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="14" width="124" height="94" rx="9" fill="#FAF7F0"/><path d="M4 32h124"/><circle cx="16" cy="23" r="2.200" fill="#B4533A" stroke="none"/><circle cx="25" cy="23" r="2.200" fill="currentColor" stroke="none" opacity=".4"/><circle cx="34" cy="23" r="2.200" fill="currentColor" stroke="none" opacity=".4"/><path d="M16 46h30M52 46h44" opacity=".6"/><path d="M26 58h38" stroke="#B4533A"/><path d="M70 58h28M26 70h24M56 70h40M16 82h36" opacity=".6"/><path d="M58 82h22" stroke="#B4533A"/><path d="M16 94h20" opacity=".6"/><circle cx="168" cy="26" r="10" fill="#FAF7F0"/><circle cx="168" cy="26" r="3" fill="#B4533A" stroke="none"/><circle cx="200" cy="72" r="10" fill="#FAF7F0"/><circle cx="200" cy="72" r="3" fill="currentColor" stroke="none" opacity=".5"/><rect x="152" y="104" width="32" height="22" rx="6" fill="rgba(180,83,58,.10)" stroke="#B4533A"/><path d="M128 52h22V26h8M178 26h22v36M200 82v32h-16" stroke-dasharray="3 4"/></svg>`};
export const PROJECTS=[
 {n:'01',cls:'w1',t:'Amarra’s Boutique',c:'Content Creation · Social Media Management',d:'Content creation and social media management for a designer fashion boutique in Bengaluru.',svc:['Social Media Marketing','Video Editing & Content Creation']},
 {n:'02',cls:'w2',t:'Arun Automation',c:'AI Automation · Website Developed by Me',d:'I designed and developed the website for this AI automation studio, presenting its services through a professional digital presence.',svc:['Website Development'],url:'https://arunautomations.com'}];
export const STEPS=[['Discover','Understand the business, requirements, audience and goals.','<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>'],
 ['Plan','Define scope, structure, design direction and functionality.','<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="m14 7 3 3"/>'],
 ['Build','Develop the website or digital solution and implement the features.','<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14"/>'],
 ['Refine & Launch','Test functionality, responsiveness, accessibility and performance before launch.','<path d="M12 3 5 6v6c0 4.500 3 7.500 7 9 4-1.500 7-4.500 7-9V6z"/><path d="m9 12 2 2 4-4"/>'],
 ['Support & Improve','Agreed maintenance, optimisation and continued support.','<path d="M7 11v9H4v-9zM7 11l4-8c2 0 3 1.500 2.500 3.500L13 9h6a2 2 0 0 1 2 2.300l-1.200 7A2 2 0 0 1 17.800 20H7"/>']];
export const FAQ=[
 [/price|cost|charge|budget|rate|fee|how much/,()=>`Starter websites begin around ${C.price.site}, depending on pages and features. Tell me what you need and I’ll quote a fixed price.`],
 [/long|time|days|week|deadline|quick|fast|when/,()=>`A typical business website takes ${C.timing.site} to a couple of weeks once I have your menu, photos and details. Online stores take ${C.timing.ecom}.`],
 [/host|maintain|maintenance|update|edit|change|care/,()=>`I host the site and handle edits and fixes on a simple monthly care plan (from ${C.price.care}), so you never have to touch code.`],
 [/mobile|phone|responsive/,()=>'Every site is built mobile-first and tested on real phones, because most of your visitors will be on one.'],
 [/shop|store|sell|ecommerce|e-commerce|payment|razorpay|cart/,()=>'Yes. I build online stores with product pages, cart and checkout, including payment integrations such as Razorpay.'],
 [/ads|instagram|meta|social|seo|google|reel|market/,()=>'I can set up Meta ads, plan Instagram content and fix on-page SEO. Most clients start with the website and add this next.'],
 [/who|about|you |location|where|bangalore|bengaluru|koramangala/,()=>'I’m Sangamesh, a freelancer in Bengaluru, helping local restaurants, cafés and small businesses with websites, digital marketing and content.']];

