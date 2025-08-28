// Load sketch after p5 is available; fallback to alternate CDN if needed
(function () {
  function injectSketch() {
    // Try production build path first (Live Server), then dev-server path
    function loadBundle(src, onFail) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { /* ok */ };
      s.onerror = function () { if (onFail) onFail(); else showError(); };
      document.body.appendChild(s);
    }
    // 1) Live Server / static: JS/dist/bundle.js (after `npm run build`)
    // 2) Webpack dev server: /bundle.js (served from memory at root)
    loadBundle('./dist/bundle.js', function () {
      loadBundle('./bundle.js', function () {
        showError();
      });
    });
  }

  function showError() {
    var msg = document.createElement('div');
    msg.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#000;color:#f66;font:14px/1.4 system-ui;padding:24px;text-align:center;';
    msg.textContent = 'Failed to load dependencies. Ensure p5 is available (vendor or CDN) and the bundle is built (npm run build) or use `npm run dev`. We attempted local vendor p5, cdnjs, unpkg, and both /dist/bundle.js and /bundle.js.';
    document.body.appendChild(msg);
  }

  function tryUnpkg() {
    var s = document.createElement('script');
    s.src = 'https://unpkg.com/p5@1.9.0/lib/p5.min.js';
    s.onload = injectSketch;
    s.onerror = showError;
    document.head.appendChild(s);
  }

  function tryCdnjs() {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js';
    s.onload = injectSketch;
    s.onerror = tryUnpkg;
    document.head.appendChild(s);
  }

  function tryLocalVendorFirst() {
    var s = document.createElement('script');
    s.src = './vendor/p5.min.js';
    s.onload = injectSketch;
    s.onerror = tryCdnjs; // fallback chain: cdnjs -> unpkg -> error banner
    document.head.appendChild(s);
  }

  if (window.p5) {
    injectSketch();
  } else {
    // Try local vendor, then cdnjs, then unpkg
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tryLocalVendorFirst);
    } else {
      tryLocalVendorFirst();
    }
  }
})();
