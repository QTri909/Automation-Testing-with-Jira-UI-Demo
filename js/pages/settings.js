function renderSettings() {
  App.qs('#pageContent').innerHTML = `
    <div class="card max-w-3xl p-6">
      <h2 class="text-xl font-extrabold text-ink">Workspace Settings</h2>
      <div class="mt-6 space-y-5">
        <label class="block">
          <span class="text-sm font-bold text-slate-700">Workspace name</span>
          <input class="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-brand-500" value="${MockData.workspace.name}">
        </label>
        <div class="flex items-center justify-between rounded-lg border border-slate-100 p-4">
          <div>
            <p class="font-bold text-ink">Auto-generate tests after sync</p>
            <p class="text-sm text-slate-500">Mock preference for the prototype.</p>
          </div>
          <button class="rounded-full bg-brand-600 p-1">
            <span class="block h-6 w-6 translate-x-6 rounded-full bg-white transition"></span>
          </button>
        </div>
        <button data-action="sync" class="rounded-lg bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700">Save Settings</button>
      </div>
    </div>
  `;
}

Layout.renderShell('settings');
App.bindGlobalActions();
renderSettings();
