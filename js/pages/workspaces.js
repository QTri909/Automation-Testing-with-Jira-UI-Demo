function renderWorkspaces() {
  App.qs('#pageContent').innerHTML = `
    <div class="grid gap-5 lg:grid-cols-3">
      <div class="card border-brand-200 p-6">
        <div class="mb-4 flex items-center justify-between">
          <div class="logo-mark">T</div>
          ${App.badge('Active', 'emerald')}
        </div>
        <h2 class="text-xl font-extrabold text-ink">Default Workspace</h2>
        <p class="mt-2 text-sm leading-6 text-slate-500">Auto-created on first login. No Jira data imported yet.</p>
      </div>
      <button data-action="create-workspace" class="card flex min-h-48 flex-col items-center justify-center border-dashed p-6 text-center hover:border-brand-200 hover:text-brand-600">
        <i class="fa-solid fa-plus mb-4 text-3xl"></i>
        <span class="font-extrabold">Create Workspace</span>
        <span class="mt-2 text-sm text-slate-500">Mock creation flow for the prototype.</span>
      </button>
    </div>
  `;
}

Layout.renderShell('workspaces');
App.bindGlobalActions();
renderWorkspaces();
