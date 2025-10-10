// main.js - tiny helper + fetch wrapper for JSON-driven onboarding + simple router
(function(){
  window.app = window.app || {};

  // helper: fetch JSON
  app.fetchJSON = async function(path){
    try {
      const r = await fetch(path + '?t=' + Date.now());
      return await r.json();
    } catch(e){
      console.error('fetchJSON', e);
      return null;
    }
  };

  // tiny log
  app.log = function(...args){ console.log('[BB]', ...args) };

  // on document ready (simple)
  document.addEventListener('DOMContentLoaded', ()=>{
    app.log('main ready');
  });

})();
