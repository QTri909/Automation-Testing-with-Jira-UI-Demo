function field(label, control, help = '') {
  return `
    <label class="block">
      <span class="text-sm font-extrabold text-slate-600">${label}</span>
      ${control}
      ${help ? `<span class="mt-2 block text-sm text-slate-500">${help}</span>` : ''}
    </label>
  `;
}

function sectionHeader(icon, colorClass, title, text) {
  return `
    <div class="mb-8 flex items-start gap-5">
      <div class="grid h-14 w-14 place-items-center rounded-lg ${colorClass} text-2xl">
        <i class="${icon}"></i>
      </div>
      <div>
        <h2 class="text-xl font-extrabold text-ink">${title}</h2>
        <p class="mt-2 text-slate-500">${text}</p>
      </div>
    </div>
  `;
}

function selectControl(value) {
  return `
    <div class="relative mt-3">
      <select class="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3.5 font-medium text-ink outline-none focus:border-brand-500">
        <option>${value}</option>
      </select>
      <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500"></i>
    </div>
  `;
}

function toggleRow(title, text) {
  return `
    <div class="flex items-start justify-between gap-5 border-slate-200 xl:border-l xl:pl-8 first:border-l-0 first:pl-0">
      <div>
        <p class="font-extrabold text-ink">${title}</p>
        <p class="mt-1 max-w-xs text-sm leading-6 text-slate-500">${text}</p>
      </div>
      <button class="relative h-7 w-12 shrink-0 rounded-full bg-brand-600 shadow-inner" aria-label="${title}">
        <span class="absolute right-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm"></span>
      </button>
    </div>
  `;
}

function renderSettings() {
  App.qs('#pageContent').innerHTML = `
    <section class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 class="text-2xl font-extrabold text-ink">Settings</h2>
        <p class="mt-3 text-slate-500">Configure general workspace preferences.</p>
      </div>
      <div class="flex gap-3">
        <button class="rounded-lg border border-slate-200 bg-white px-6 py-3.5 font-bold text-ink hover:border-brand-200">Cancel</button>
        <button data-action="save-settings" class="rounded-lg bg-brand-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">Save Changes</button>
      </div>
    </section>

    <section class="card p-6">
      ${sectionHeader('fa-solid fa-user-group', 'bg-blue-50 text-blue-600', 'Workspace Information', 'Update your workspace details.')}
      <div class="grid gap-6 xl:grid-cols-3">
        ${field('Workspace Name', '<input class="mt-3 w-full rounded-lg border border-slate-200 px-4 py-3.5 font-medium text-ink outline-none focus:border-brand-500" value="Default Workspace">')}
        ${field('Workspace Slug', '<input class="mt-3 w-full rounded-lg border border-slate-200 px-4 py-3.5 font-medium text-ink outline-none focus:border-brand-500" value="default-workspace">', 'Used in URLs and workspace links.')}
        ${field('Description', '<textarea class="mt-3 min-h-24 w-full resize-y rounded-lg border border-slate-200 px-4 py-3.5 font-medium text-ink outline-none focus:border-brand-500">This is the default workspace for TestFlow AI.</textarea>')}
      </div>
    </section>

    <section class="card p-6">
      ${sectionHeader('fa-solid fa-sliders', 'bg-violet-50 text-violet-600', 'Preferences', 'Set your workspace preferences.')}
      <div class="grid gap-6 xl:grid-cols-3">
        ${field('Time Zone', selectControl('(GMT+05:30) Asia/Kolkata'))}
        ${field('Date Format', selectControl('DD MMM YYYY (31 May 2024)'))}
        ${field('Default Landing Page', selectControl('Overview'))}
      </div>
    </section>

    <section class="card p-6">
      ${sectionHeader('fa-regular fa-bell', 'bg-emerald-50 text-emerald-600', 'Notifications', 'Choose what updates you want to receive.')}
      <div class="grid gap-6 xl:grid-cols-3">
        ${toggleRow('Sync failure alerts', 'Get notified when a project sync fails or has issues.')}
        ${toggleRow('Weekly activity summary', 'Receive a weekly summary of workspace activity.')}
        ${toggleRow('Product updates', 'Receive updates about new features and improvements.')}
      </div>
    </section>

    <section class="rounded-lg border border-red-300 bg-red-50/40 p-6">
      <div class="grid gap-6 xl:grid-cols-[0.9fr_1fr_1fr]">
        <div class="flex items-start gap-5">
          <div class="grid h-14 w-14 place-items-center rounded-lg bg-red-100 text-2xl text-red-600">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div>
            <h2 class="text-xl font-extrabold text-ink">Danger Zone</h2>
            <p class="mt-2 leading-6 text-slate-500">Irreversible and destructive actions.</p>
          </div>
        </div>
        <div class="border-slate-200 xl:border-l xl:pl-8">
          <h3 class="font-extrabold text-ink">Archive Workspace</h3>
          <p class="mt-3 text-sm leading-6 text-slate-500">Archive this workspace. You can restore it at any time.</p>
          <button data-action="archive-workspace" class="mt-5 rounded-lg border border-red-300 bg-white px-5 py-3 font-bold text-red-600 hover:bg-red-50">Archive Workspace</button>
        </div>
        <div class="border-slate-200 xl:border-l xl:pl-8">
          <h3 class="font-extrabold text-ink">Delete Workspace</h3>
          <p class="mt-3 text-sm leading-6 text-slate-500">Permanently delete this workspace. This action cannot be undone.</p>
          <button data-action="delete-workspace" class="mt-5 rounded-lg bg-red-600 px-5 py-3 font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-700">Delete Workspace</button>
        </div>
      </div>
    </section>
  `;
}

Layout.renderShell('settings');
App.bindGlobalActions();
renderSettings();
