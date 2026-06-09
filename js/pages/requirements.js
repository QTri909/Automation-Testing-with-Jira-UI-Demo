function renderRequirements() {
  App.qs('#pageContent').innerHTML = `
    <div class="card p-5 sm:p-6">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-xl font-extrabold text-ink">Requirements</h2>
          <p class="mt-1 text-sm text-slate-500">AI extracted requirements from Jira issues.</p>
        </div>
        <button data-action="sync" class="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700">
          <i class="fa-solid fa-rotate mr-2"></i> Sync Jira
        </button>
      </div>
      ${App.table(['ID', 'Requirement', 'Source', 'Priority'], MockData.requirements.map(item => [
        item.id,
        item.title,
        item.source,
        App.badge(item.priority, item.priority === 'High' ? 'red' : 'amber')
      ]))}
    </div>
  `;
}

Layout.renderShell('requirements');
App.bindGlobalActions();
renderRequirements();
