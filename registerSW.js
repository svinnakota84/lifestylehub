// Only migrate existing workers. New visitors do not need a repair worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      const root = registrations.find(registration => new URL(registration.scope).pathname === '/');
      if (!root) return;
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/', updateViaCache: 'none' });
      await registration.update();
    } catch { /* The website also works without a service worker. */ }
  });
}
