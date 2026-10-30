// TODO: Replace demo@example.com with the real demo inbox before showing this site to buyers.
const CONTACT_EMAIL = 'demo@example.com';

function contactMailto(subject) {
  const email = String(CONTACT_EMAIL || '').trim();
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  const query = params.toString();
  return 'mailto:' + email + (query ? '?' + query : '');
}

function bindContactLinks(root) {
  const scope = root && root.querySelectorAll ? root : document;
  scope.querySelectorAll('[data-contact]').forEach((el) => {
    const subject = el.getAttribute('data-subject') || 'Triton demo request';
    if (el.tagName === 'FORM') {
      el.action = contactMailto(subject);
      el.method = 'POST';
      el.setAttribute('enctype', 'text/plain');
    } else {
      el.href = contactMailto(subject);
    }
    if (el.hasAttribute('data-contact-label')) el.textContent = CONTACT_EMAIL;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => bindContactLinks());
} else {
  bindContactLinks();
}
