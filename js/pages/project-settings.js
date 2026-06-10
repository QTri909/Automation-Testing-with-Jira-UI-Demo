const jiraMappings = [
  ['fa-regular fa-bookmark', 'text-emerald-600 bg-emerald-50', 'Story', 'Requirement'],
  ['fa-solid fa-square-check', 'text-brand-600 bg-blue-50', 'Task', 'Requirement'],
  ['fa-solid fa-bug', 'text-red-600 bg-red-50', 'Bug', 'Defect'],
  ['fa-solid fa-bolt', 'text-violet-600 bg-violet-50', 'Epic', 'Feature'],
  ['fa-regular fa-square', 'text-indigo-600 bg-indigo-50', 'Sub-task', 'Ignore']
];

function settingsTab(icon, label, active = false) {
  return `
    <button class="inline-flex items-center gap-3 border-b-2 px-5 py-4 font-extrabold ${active ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-600 hover:text-brand-600'}">
      <i class="${icon} text-lg"></i>
      ${label}
    </button>
  `;
}

function projectInfo(icon, bgClass, textClass, label, value) {
  return `
    <div class="flex items-center gap-5 border-slate-200 py-2 lg:border-l lg:pl-12 first:border-l-0 first:pl-0">
      <div class="grid h-12 w-12 place-items-center rounded-xl ${bgClass} text-xl ${textClass}">
        <i class="${icon}"></i>
      </div>
      <div>
        <p class="text-sm font-semibold text-slate-500">${label}</p>
        <p class="mt-1 text-lg font-extrabold text-ink">${value}</p>
      </div>
    </div>
  `;
}

function selectBox(value, icon = '', tone = '') {
  return `
    <button class="flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 text-left font-semibold text-slate-700 hover:border-brand-200">
      <span class="flex min-w-0 items-center gap-3">
        ${icon ? `<span class="grid h-6 w-6 place-items-center rounded ${tone}"><i class="${icon} text-sm"></i></span>` : ''}
        <span class="truncate">${value}</span>
      </span>
      <i class="fa-solid fa-chevron-down text-xs text-slate-500"></i>
    </button>
  `;
}

function mappingRow(row) {
  return `
    <div class="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_28px_minmax(0,1fr)]">
      ${selectBox(row[2], row[0], row[1])}
      <span class="hidden text-center text-xl text-slate-400 sm:block"><i class="fa-solid fa-arrow-right"></i></span>
      ${selectBox(row[3])}
    </div>
  `;
}

function toggleRow(title, text) {
  return `
    <div class="flex items-center justify-between gap-5 py-3">
      <div>
        <p class="font-extrabold text-ink">${title}</p>
        <p class="mt-1 text-sm font-semibold text-slate-500">${text}</p>
      </div>
      <button class="relative h-7 w-12 shrink-0 rounded-full bg-brand-600 shadow-inner">
        <span class="absolute right-1 top-1 h-5 w-5 rounded-full bg-white shadow"></span>
      </button>
    </div>
  `;
}

function radioOption(label, text, checked = false, withSelect = false) {
  return `
    <label class="grid cursor-pointer gap-3 sm:grid-cols-[22px_minmax(0,1fr)]">
      <span class="mt-1 grid h-5 w-5 place-items-center rounded-full border ${checked ? 'border-brand-600' : 'border-slate-400'}">
        ${checked ? '<span class="h-2.5 w-2.5 rounded-full bg-brand-600"></span>' : ''}
      </span>
      <span class="min-w-0">
        <span class="block font-extrabold text-ink">${label}</span>
        ${withSelect ? `
          <span class="mt-2 block">${selectBox('Acceptance Criteria')}</span>
        ` : ''}
        <span class="mt-1 block text-sm font-semibold text-slate-500">${text}</span>
      </span>
    </label>
  `;
}

function renderProjectSettings() {
  App.qs('#pageContent').innerHTML = `
    <section class="space-y-6">
      <h1 class="text-4xl font-extrabold text-ink">Project Settings</h1>

      <div class="flex flex-wrap gap-2 border-b border-slate-200">
        ${settingsTab('fa-solid fa-gear', 'General')}
        ${settingsTab('fa-brands fa-jira', 'Jira Mapping', true)}
        ${settingsTab('fa-solid fa-arrows-rotate', 'Sync Settings')}
        ${settingsTab('fa-solid fa-wand-magic-sparkles', 'AI Settings')}
        ${settingsTab('fa-solid fa-desktop', 'Environment')}
      </div>

      <article class="card p-6">
        <h2 class="text-lg font-extrabold text-ink">General</h2>
        <div class="mt-5 grid gap-5 lg:grid-cols-3">
          ${projectInfo('fa-regular fa-folder', 'bg-blue-50', 'text-brand-600', 'Project Name', 'AI Testing Platform')}
          ${projectInfo('fa-solid fa-code', 'bg-violet-50', 'text-violet-600', 'Project Key', 'ATP')}
          ${projectInfo('fa-brands fa-jira', 'bg-emerald-50', 'text-brand-600', 'Source', 'Jira')}
        </div>
      </article>

      <div class="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article class="card p-6">
          <h2 class="text-lg font-extrabold text-ink">Jira Mapping Setup</h2>
          <h3 class="mt-7 font-bold text-ink">Map Jira Issue Types</h3>
          <div class="mt-4 space-y-3">
            ${jiraMappings.map(mappingRow).join('')}
          </div>

          <div class="mt-8">
            <h3 class="font-bold text-ink">Acceptance Criteria Source <i class="fa-regular fa-circle-question text-slate-400"></i></h3>
            <div class="mt-5 space-y-5">
              ${radioOption('Auto-detect from Description', 'Extract acceptance criteria from issue description automatically', true)}
              ${radioOption('Custom field', 'Use a custom field to extract acceptance criteria', false, true)}
            </div>
          </div>
        </article>

        <div class="space-y-6">
          <article class="card p-6">
            <h2 class="text-lg font-extrabold text-ink">Sync Settings</h2>
            <div class="mt-5 divide-y divide-slate-100">
              ${toggleRow('Sync requirements from Jira', 'Automatically import new and updated requirements')}
              ${toggleRow('Sync test results back to Jira', 'Update Jira issues with test results and status')}
              ${toggleRow('Create Jira bug on failed test', 'Automatically create a bug in Jira for failed tests')}
            </div>
          </article>

          <article class="card p-6">
            <h2 class="text-lg font-extrabold text-ink">AI Settings</h2>
            <div class="mt-5 divide-y divide-slate-100">
              ${toggleRow('Generate edge cases', 'AI will generate edge cases for each requirement')}
              ${toggleRow('Generate negative cases', 'AI will generate negative test cases')}
              <div class="grid gap-4 py-4 lg:grid-cols-[1fr_300px] lg:items-center">
                <div>
                  <p class="font-extrabold text-ink">Default generation style</p>
                  <p class="mt-1 text-sm font-semibold text-slate-500">Choose the preferred style for AI generated test cases</p>
                </div>
                ${selectBox('Balanced (Recommended)')}
              </div>
            </div>
          </article>
        </div>
      </div>

      <div class="flex flex-col gap-4 sm:flex-row sm:justify-end">
        <button data-action="sync-project-settings" class="inline-flex items-center justify-center gap-3 rounded-lg border border-brand-500 bg-white px-8 py-3.5 text-lg font-extrabold text-brand-600 hover:bg-brand-50">
          <i class="fa-solid fa-arrows-rotate"></i> Sync Now
        </button>
        <button data-action="save-settings" class="inline-flex items-center justify-center gap-3 rounded-lg bg-brand-600 px-8 py-3.5 text-lg font-extrabold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
          <i class="fa-regular fa-floppy-disk"></i> Save Changes
        </button>
      </div>
    </section>
  `;
}

ProjectLayout.render('project-settings');
App.bindGlobalActions();
renderProjectSettings();
