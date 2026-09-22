(() => {
  const id = 'G-BQGF026X72';
  const key = 'blog.analytics-consent.v1';
  if (location.hostname !== 'blog.paymond.me') return;
  let enabled = false;
  let loaded = false;
  const status = document.getElementById('analytics-status');
  const clean = value => { try { const u = new URL(value); return u.origin + u.pathname; } catch { return ''; } };
  function start() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('consent', 'default', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    gtag('set', 'linker', {domains:['sequre.paymond.me'], accept_incoming:true});
    gtag('js', new Date());
    gtag('config', id, {send_page_view:false, cookie_domain:'paymond.me', allow_google_signals:false, allow_ad_personalization_signals:false, page_location:clean(location.href), page_referrer:clean(document.referrer)});
    gtag('event', 'page_view', {page_location:clean(location.href), page_referrer:clean(document.referrer)});
    const s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(s);
  }
  function choose(value) {
    enabled = value === 'granted';
    try { localStorage.setItem(key,value); } catch {}
    window['ga-disable-' + id] = !enabled;
    status.textContent = enabled ? ' 已同意 / Enabled' : ' 已拒绝 / Disabled';
    if (enabled) { start(); gtag('consent','update',{analytics_storage:'granted'}); }
    else if (loaded) gtag('consent','update',{analytics_storage:'denied'});
  }
  document.getElementById('analytics-accept').addEventListener('click',()=>choose('granted'));
  document.getElementById('analytics-reject').addEventListener('click',()=>choose('denied'));
  document.addEventListener('click',e=>{
    const a = e.target.closest('a[href]');
    if (!enabled || !a) return;
    const u = new URL(a.href);
    if (['sequre.paymond.me','wiki.sequre.paymond.me'].includes(u.hostname))
      gtag('event','sequre_link_click',{link_url:clean(u.href), destination_host:u.hostname, page_location:clean(location.href), transport_type:'beacon'});
  });
  try { const saved=localStorage.getItem(key); if (['granted','denied'].includes(saved)) choose(saved); } catch {}
})();
