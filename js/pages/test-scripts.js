function renderTestScripts() {
  App.qs('#pageContent').innerHTML = `
    <div class="card p-5 sm:p-6">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-xl font-extrabold text-ink">Test Scripts</h2>
          <p class="mt-1 text-sm text-slate-500">Generated script drafts mapped from approved test cases.</p>
        </div>
        <button data-action="sync" class="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700">
          <i class="fa-solid fa-code mr-2"></i> Generate Scripts
        </button>
      </div>
      ${App.table(['ID', 'File', 'Framework', 'Status'], MockData.testScripts.map(item => [
        item.id,
        `<span class="font-mono text-sm">${item.name}</span>`,
        item.framework,
        App.badge(item.status, item.status === 'Ready' ? 'emerald' : item.status === 'Draft' ? 'blue' : 'amber')
      ]))}
    </div>
  `;
}

Layout.renderShell('test-scripts');
App.bindGlobalActions();
renderTestScripts();
