function renderIntegrations() {
  App.qs('#pageContent').innerHTML = `
    <div class="card p-6">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex items-start gap-4">
          <div class="grid h-14 w-14 place-items-center rounded-lg bg-brand-50 text-2xl text-brand-600">
            <i class="fa-brands fa-jira"></i>
          </div>
          <div>
            <h2 class="text-xl font-extrabold text-ink">Jira</h2>
            <p class="mt-2 max-w-2xl leading-6 text-slate-500">Connect Jira to import projects, requirements, and issues into your default workspace.</p>
          </div>
        </div>
        <button data-action="connect-jira" class="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
          <i class="fa-solid fa-link"></i> Connect Jira
        </button>
      </div>
    </div>
  `;
}

Layout.renderShell('integrations');
App.bindGlobalActions();
renderIntegrations();
