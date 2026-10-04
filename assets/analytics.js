(() => {
  const id = 'G-BQGF026X72';
  const key = 'blog.analytics-consent.v1';
  if (location.hostname !== 'blog.paymond.me') return;
  let enabled = false;
  let loaded = false;
  const panel = document.getElementById('analytics-choice');
  const details = document.getElementById('analytics-details');
  const settingsLabel = document.getElementById('analytics-settings-label');
  const description = document.getElementById('analytics-description');
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
  function clearAnalyticsCookies() {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (name !== '_ga' && !name.startsWith('_ga_')) continue;
      for (const domain of ['', '; Domain=blog.paymond.me', '; Domain=.paymond.me'])
        document.cookie = `${name}=; Max-Age=0; Path=/${domain}; SameSite=Lax`;
    }
  }
  function syncDisclosure() {
    const open = details.open;
    document.getElementById('analytics-settings').setAttribute('aria-expanded', String(open));
    description.hidden = !open;
  }
  function syncChoice(value) {
    panel.dataset.consent = value;
    document.querySelector('.analytics-label').hidden = value !== 'unset';
    document.getElementById('analytics-initial-actions').hidden = value !== 'unset';
    settingsLabel.textContent = value === 'unset' ? '说明' : '访问统计';
  }
  function choose(value, restoreFocus = true) {
    enabled = value === 'granted';
    try { localStorage.setItem(key,value); } catch {}
    window['ga-disable-' + id] = !enabled;
    syncChoice(value);
    details.open = false;
    syncDisclosure();
    if (restoreFocus) document.getElementById('analytics-settings').focus();
    status.textContent = enabled ? '已允许' : '已拒绝';
    if (enabled) { start(); gtag('consent','update',{analytics_storage:'granted'}); }
    else {
      if (loaded) gtag('consent','update',{analytics_storage:'denied'});
      clearAnalyticsCookies();
    }
  }
  details.addEventListener('toggle', syncDisclosure);
  document.getElementById('analytics-settings').addEventListener('click', () => setTimeout(syncDisclosure, 0));
  for (const button of document.querySelectorAll('[data-analytics-consent]'))
    button.addEventListener('click', () => choose(button.dataset.analyticsConsent));
  syncDisclosure();
  try {
    const saved=localStorage.getItem(key);
    if (['granted','denied'].includes(saved)) choose(saved, false);
    else syncChoice('unset');
  } catch { syncChoice('unset'); }
  document.addEventListener('click',e=>{
    const a = e.target.closest('a[href]');
    if (!enabled || !a) return;
    const u = new URL(a.href);
    if (['sequre.paymond.me','wiki.sequre.paymond.me'].includes(u.hostname))
      gtag('event','sequre_link_click',{link_url:clean(u.href), destination_host:u.hostname, page_location:clean(location.href), transport_type:'beacon'});
  });
})();
