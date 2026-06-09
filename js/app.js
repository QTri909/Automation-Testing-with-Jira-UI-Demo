window.App = (() => {
  const qs = selector => document.querySelector(selector);

  function table(headers, rows) {
    return `
      <div class="overflow-hidden rounded-lg border border-slate-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead class="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>${headers.map(header => `<th class="px-4 py-3 font-extrabold">${header}</th>`).join('')}</tr>
            </thead>
            <tbody class="divide-y divide-slate-100 bg-white">
              ${rows.map(row => `<tr class="hover:bg-slate-50">${row.map(cell => `<td class="px-4 py-4">${cell}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function emptyState(title, text, actionLabel, icon) {
    return `
      <div class="card p-10 text-center">
        <div class="mx-auto grid h-16 w-16 place-items-center rounded-xl bg-brand-50 text-3xl text-brand-600">
          <i class="${icon}"></i>
        </div>
        <h2 class="mt-5 text-xl font-extrabold text-ink">${title}</h2>
        <p class="mx-auto mt-2 max-w-md leading-6 text-slate-500">${text}</p>
        <button data-action="connect-jira" class="mt-6 rounded-lg bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700">${actionLabel}</button>
      </div>
    `;
  }

  function badge(label, tone = 'emerald') {
    return `<span class="badge bg-${tone}-50 text-${tone}-700">${label}</span>`;
  }

  function openModal(content) {
    const backdrop = qs('#modalBackdrop');
    const panel = qs('#modalPanel');
    if (!backdrop || !panel) return;
    panel.innerHTML = content;
    panel.classList.add('modal-enter');
    backdrop.classList.remove('hidden');
    backdrop.classList.add('flex');
    panel.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', closeModal));
  }

  function closeModal() {
    qs('#modalBackdrop')?.classList.add('hidden');
    qs('#modalBackdrop')?.classList.remove('flex');
  }

  function showToast(message) {
    const toast = qs('#toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2400);
  }

  function fakeLoading(done) {
    openModal(`
      <div class="p-6">
        <h2 class="text-xl font-extrabold text-ink">Syncing workspace</h2>
        <p class="mt-1 text-sm text-slate-500">Rendering a short loading state for the prototype.</p>
        <div class="mt-6 space-y-3">
          <div class="skeleton h-4 rounded"></div>
          <div class="skeleton h-4 w-5/6 rounded"></div>
          <div class="skeleton h-4 w-2/3 rounded"></div>
        </div>
      </div>
    `);
    setTimeout(() => {
      closeModal();
      if (done) done();
    }, 850);
  }

  function openJiraModal() {
    openModal(`
      <div class="border-b border-slate-200 p-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-xl font-extrabold text-ink">Connect to Jira</h2>
            <p class="mt-1 text-sm text-slate-500">Choose a Jira site and projects to import into this workspace.</p>
          </div>
          <button data-close-modal class="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
      <div class="p-6">
        <div class="mb-5 rounded-lg border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700">
          <i class="fa-brands fa-jira mr-2"></i> Demo connection only. No real Atlassian API call will be made.
        </div>
        <label class="mb-4 block">
          <span class="text-sm font-bold text-slate-700">Jira site</span>
          <select class="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3">
            <option>testflow-demo.atlassian.net</option>
            <option>quality-lab.atlassian.net</option>
          </select>
        </label>
        <div class="space-y-3">
          ${MockData.projects.map(project => `
            <label class="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-4 hover:border-brand-200">
              <span>
                <span class="block font-bold text-ink">${project.name}</span>
                <span class="text-sm text-slate-500">${project.key} - ${project.issues} issues</span>
              </span>
              <input type="checkbox" class="h-5 w-5 accent-blue-600" checked>
            </label>
          `).join('')}
        </div>
      </div>
      <div class="flex flex-col-reverse gap-3 border-t border-slate-200 p-6 sm:flex-row sm:justify-end">
        <button data-close-modal class="rounded-lg border border-slate-200 px-5 py-3 font-bold text-ink hover:bg-slate-50">Cancel</button>
        <button id="confirmJiraBtn" class="rounded-lg bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700">Connect and Import</button>
      </div>
    `);

    qs('#confirmJiraBtn')?.addEventListener('click', () => {
      closeModal();
      fakeLoading(() => showToast('Jira connected. Projects imported.'));
    });
  }

  function openJiraAuthPopup() {
    const currentPath = window.location.pathname;
    const basePath = currentPath.includes('/pages/') ? '' : 'pages/';
    const authUrl = `${basePath}jira-connect.html`;
    const width = 500;
    const height = 690;
    const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
    const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2));
    const features = [
      `width=${width}`,
      `height=${height}`,
      `left=${left}`,
      `top=${top}`,
      'resizable=yes',
      'scrollbars=yes',
      'noopener=no'
    ].join(',');

    const popup = window.open(authUrl, 'testflowAtlassianOAuth', features);
    if (!popup) {
      showToast('Popup was blocked. Please allow popups for this demo.');
      return;
    }
    popup.focus();
  }

  function openWorkspaceModal() {
    openModal(`
      <div class="border-b border-slate-200 p-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-xl font-extrabold text-ink">Create Workspace</h2>
            <p class="mt-1 text-sm text-slate-500">Create another mock workspace for the demo.</p>
          </div>
          <button data-close-modal class="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
      <div class="p-6">
        <label class="block">
          <span class="text-sm font-bold text-slate-700">Workspace name</span>
          <input class="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value="Mobile QA Workspace">
        </label>
      </div>
      <div class="flex justify-end gap-3 border-t border-slate-200 p-6">
        <button data-close-modal class="rounded-lg border border-slate-200 px-5 py-3 font-bold text-ink hover:bg-slate-50">Cancel</button>
        <button id="confirmWorkspaceBtn" class="rounded-lg bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700">Create Workspace</button>
      </div>
    `);
    qs('#confirmWorkspaceBtn')?.addEventListener('click', () => {
      closeModal();
      showToast('New workspace created for demo.');
    });
  }

  function openProjectModal() {
    openModal(`
      <div class="border-b border-slate-200 p-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-xl font-extrabold text-ink">Create Project</h2>
            <p class="mt-1 text-sm text-slate-500">Create a manual project before connecting Jira.</p>
          </div>
          <button data-close-modal class="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
      <div class="space-y-4 p-6">
        <label class="block">
          <span class="text-sm font-bold text-slate-700">Project name</span>
          <input class="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value="Customer Portal">
        </label>
        <label class="block">
          <span class="text-sm font-bold text-slate-700">Project key</span>
          <input class="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value="CP">
        </label>
      </div>
      <div class="flex justify-end gap-3 border-t border-slate-200 p-6">
        <button data-close-modal class="rounded-lg border border-slate-200 px-5 py-3 font-bold text-ink hover:bg-slate-50">Cancel</button>
        <button id="confirmProjectBtn" class="rounded-lg bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700">Create Project</button>
      </div>
    `);
    qs('#confirmProjectBtn')?.addEventListener('click', () => {
      closeModal();
      showToast('Project created for demo.');
    });
  }

  function bindGlobalActions() {
    window.addEventListener('message', event => {
      if (event.data?.type === 'testflow:jira-authorized') {
        showToast('Jira authorization completed.');
      }
    });

    document.addEventListener('click', event => {
      const action = event.target.closest('[data-action]')?.dataset.action;
      if (action === 'connect-jira') openJiraAuthPopup();
      if (action === 'create-workspace') openWorkspaceModal();
      if (action === 'create-project') openProjectModal();
      if (action === 'sync') fakeLoading(() => showToast('Mock sync completed.'));
      if (action === 'import-spec') showToast('API spec imported for demo.');
    });

    qs('#modalBackdrop')?.addEventListener('click', event => {
      if (event.target.id === 'modalBackdrop') closeModal();
    });
  }

  return {
    qs,
    table,
    emptyState,
    badge,
    openJiraModal,
    openJiraAuthPopup,
    showToast,
    fakeLoading,
    bindGlobalActions
  };
})();
