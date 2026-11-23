/* Yara Kids: renders the page from data.json. Shared by index.html and admin.html */
(function () {
  const S = 'fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
  const ICON = {
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V6.8c0-.8.5-1.3 1.3-1.3H17V2.2h-2.6C11.7 2.2 10.4 4 10.4 6.4v2.1H8v3.4h2.4V22H14v-10.1h2.6l.5-3.4z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.1-2.8V9a6.2 6.2 0 1 0 5.4 6.2V8.6a7.6 7.6 0 0 0 4.2 1.3V6.6a4.3 4.3 0 0 1-4.2-4.6z"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" ${S}><path d="M3.5 20.5l1.3-4A8.5 8.5 0 1 1 8 19.6z"/><path d="M9 8.5c.3 2.6 2.4 5 5.5 6l1.2-1.4-1.8-1-1 .8c-1-.5-1.8-1.3-2.3-2.3l.8-1-1-1.8z" fill="currentColor" stroke="none"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" ${S}><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>`,
    snapchat: `<svg viewBox="0 0 24 24" ${S}><path d="M12 3c3 0 5 2.2 5 5.2v2.3l1.8-.4c.6.9-.5 1.4-1.6 1.8.6 1.8 2 3.1 3.3 3.5-.6 1-2 1-2.6 1.4-.2.6-.3 1.2-1 1.1-1.3-.2-2.2.2-3.2 1-.9.7-2.5.7-3.4 0-1-.8-1.9-1.2-3.2-1-.7.1-.8-.5-1-1.1-.6-.4-2-.4-2.6-1.4 1.3-.4 2.7-1.7 3.3-3.5-1.1-.4-2.2-.9-1.6-1.8l1.8.4V8.2C7 5.2 9 3 12 3z"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24" ${S}><path d="M21 4 3 11l6 2 2 6 3-4 5 4z"/><path d="M9 13l12-9"/></svg>`,
    website: `<svg viewBox="0 0 24 24" ${S}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z"/></svg>`,
    location: `<svg viewBox="0 0 24 24" ${S}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" ${S}><path d="M5 3h3.5l1.5 5-2.2 1.4a11 11 0 0 0 6.8 6.8L16 14l5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>`,
    link: `<svg viewBox="0 0 24 24" ${S}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" ${S}><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>`,
    wallet: `<svg viewBox="0 0 24 24" ${S}><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M16 14.5h2"/></svg>`,
    bank: `<svg viewBox="0 0 24 24" ${S}><path d="M3 9.5 12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/></svg>`,
    go: `<svg viewBox="0 0 24 24" width="16" height="16" ${S}><path d="M15 6l-6 6 6 6"/></svg>`
  };
  const SOCIAL = {
    instagram: {label: 'إنستجرام', bg: 'linear-gradient(45deg,#f58529,#dd2a7b 55%,#8134af)'},
    facebook: {label: 'فيسبوك', bg: '#1877f2'},
    tiktok: {label: 'تيك توك', bg: '#000'},
    whatsapp: {label: 'واتساب', bg: '#25d366'},
    youtube: {label: 'يوتيوب', bg: '#ff0000'},
    snapchat: {label: 'سناب شات', bg: '#fffc00', fg: '#111'},
    telegram: {label: 'تيليجرام', bg: '#29a9eb'},
    website: {label: 'موقع', bg: '#2f8cff'},
    location: {label: 'العنوان / الخريطة', bg: '#ff3d9a'},
    phone: {label: 'رقم تليفون', bg: '#3ecf4a'},
    link: {label: 'لينك تاني', bg: '#6b5a80'}
  };
  const PAY = {
    instapay: {label: 'إنستاباي', bg: '#6c2bd9', icon: 'bolt'},
    vodafone: {label: 'فودافون كاش', bg: '#e60000', icon: 'wallet', wallet: true},
    etisalat: {label: 'اتصالات كاش', bg: '#5b9a1a', icon: 'wallet', wallet: true},
    orange: {label: 'أورنج كاش', bg: '#ff7900', icon: 'wallet', wallet: true},
    we: {label: 'WE Pay', bg: '#5c2d91', icon: 'wallet', wallet: true},
    bank: {label: 'حساب بنكي', bg: '#0f5c46', icon: 'bank'},
    other: {label: 'طريقة دفع تانية', bg: '#2a1840', icon: 'wallet'}
  };
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const safeUrl = u => { u = String(u || '').trim(); if (!u) return ''; if (/^(https?:|tel:|mailto:)/i.test(u)) return u; if (/^www\./i.test(u)) return 'https://' + u; return ''; };
  const CONF = `<svg class="conf" aria-hidden="true" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice"><circle cx="30" cy="110" r="5" fill="#3ecf4a"/><circle cx="372" cy="80" r="7" fill="#ff3d9a"/><circle cx="380" cy="300" r="4" fill="#ffd23f"/><circle cx="18" cy="380" r="5" fill="#2f8cff"/><circle cx="388" cy="520" r="5" fill="#3ecf4a"/><circle cx="22" cy="640" r="4" fill="#ffd23f"/><path d="M352 200 q8 -10 16 0 t16 0" fill="none" stroke="#2f8cff" stroke-width="3" stroke-linecap="round"/><path d="M14 230 q8 -10 16 0 t16 0" fill="none" stroke="#ff3d9a" stroke-width="3" stroke-linecap="round"/><path d="M40 520 l7 -12 l7 12 z" fill="#ffd23f"/><rect x="356" y="700" width="12" height="12" rx="3" transform="rotate(20 362 706)" fill="#ff3d9a"/></svg>`;

  function html(d) {
    const social = (d.social || []).map(s => {
      const t = SOCIAL[s.type] || SOCIAL.link;
      let url = s.type === 'phone' && s.url && !/^tel:/.test(s.url) ? 'tel:' + s.url.replace(/\s/g, '') : safeUrl(s.url);
      if (!url) return '';
      return `<a class="btn" href="${esc(url)}" target="_blank" rel="noopener"><span class="ic" style="background:${t.bg};color:${t.fg || '#fff'}">${ICON[s.type] || ICON.link}</span><span>${esc(s.title || t.label)}${s.sub ? `<small>${esc(s.sub)}</small>` : ''}</span><span class="go">${ICON.go}</span></a>`;
    }).join('');
    const pays = (d.payments || []).map((p, i) => {
      const t = PAY[p.type] || PAY.other;
      const link = safeUrl(p.link);
      const acts = [];
      if (p.number) acts.push(`<button class="primary" type="button" data-copy="${esc(p.number)}">انسخ الرقم</button>`);
      if (link) acts.push(`<a class="${acts.length ? 'ghost' : 'primary'}" href="${esc(link)}" target="_blank" rel="noopener">${p.type === 'instapay' ? 'افتح إنستاباي' : 'افتح اللينك'}</a>`);
      if (t.wallet && p.number) acts.push(`<a class="ghost" href="tel:${esc(p.number.replace(/\s/g, ''))}">اتصال</a>`);
      return `<div class="pay" style="--dot:${t.bg}"><div class="row"><span class="ic" style="background:${t.bg}">${ICON[t.icon]}</span><div><div class="lbl">${esc(p.title || t.label)}</div>${p.note || p.number ? `<div class="small">${esc(p.note || 'حوّل على الرقم ده')}</div>` : ''}</div></div>${p.number ? `<div class="num">${esc(p.number)}</div>` : ''}${acts.length ? `<div class="acts">${acts.join('')}</div>` : ''}</div>`;
    }).join('');
    const mark = esc(d.name || '').split('').map(c => c === ' ' ? '<i></i>' : `<span>${c}</span>`).join('');
    return `${CONF}<main class="wrap"><header>${d.logo ? `<img class="logo" src="${esc(d.logo)}" alt="${esc(d.name)}">` : ''}<h1 class="mark" aria-label="${esc(d.name)}">${mark}</h1>${d.tagline ? `<p class="tag">${esc(d.tagline)}</p>` : ''}</header>${social ? `<h2>${esc(d.socialTitle || 'تابعنا')}</h2><nav>${social}</nav>` : ''}${pays ? `<h2>${esc(d.paymentTitle || 'الدفع والتحويل')}</h2><div>${pays}</div>` : ''}${d.footer ? `<footer>${esc(d.footer)}</footer>` : ''}</main><div class="toast" role="status"></div>`;
  }

  function render(d, root) {
    root.innerHTML = html(d);
    const toast = root.querySelector('.toast'); let tm;
    root.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
      const v = b.dataset.copy;
      try { await navigator.clipboard.writeText(v); toast.textContent = 'اتنسخ ✓ ' + v; }
      catch (e) { toast.textContent = v; }
      toast.classList.add('on'); clearTimeout(tm); tm = setTimeout(() => toast.classList.remove('on'), 1600);
    }));
  }

  window.YK = {render, SOCIAL, PAY, asset: u => u || ''};
})();
