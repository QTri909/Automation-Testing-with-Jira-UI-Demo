const projects = [
  { name: 'AI Testing Platform', key: 'ATP', source: 'Jira', issues: 48, lastSync: 'Just now' },
  { name: 'Capstone Project', key: 'CAP', source: 'Jira', issues: 36, lastSync: '8 min ago' },
  { name: 'Mobile App', key: 'MOB', source: 'Jira', issues: 19, lastSync: '1 hour ago' },
  { name: 'Internal QA Project', key: 'IQA', source: 'Manual', issues: 0, lastSync: '-' },
  { name: 'Customer Portal', key: 'CPT', source: 'Jira', issues: 62, lastSync: '12 min ago' },
  { name: 'Automation Core', key: 'ATC', source: 'Manual', issues: 0, lastSync: '-' }
];

function sourceBadge(source) {
  const isJira = source === 'Jira';
  return `
    <span class="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${isJira ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}">
      ${source}
    </span>
  `;
}

function projectCard(project) {
  const isJira = project.source === 'Jira';
  return `
    <article class="card p-5">
      <div class="mb-5 flex items-start justify-between gap-4">
        <div class="flex items-center gap-5">
          <div class="grid h-14 w-14 place-items-center rounded-lg ${isJira ? 'bg-blue-50 text-brand-600' : 'bg-emerald-50 text-emerald-600'} text-3xl">
            <i class="${isJira ? 'fa-brands fa-jira' : 'fa-regular fa-folder-open'}"></i>
          </div>
          <h3 class="text-lg font-extrabold text-ink">${project.name}</h3>
        </div>
        <button class="grid h-9 w-9 place-items-center rounded-lg text-ink hover:bg-slate-50" aria-label="Project menu">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </div>

      <dl class="space-y-4 text-slate-500">
        <div class="flex items-center gap-4">
          <dt class="flex w-28 items-center gap-3">
            <i class="fa-regular fa-calendar text-slate-500"></i>
            <span>Project Key:</span>
          </dt>
          <dd class="font-semibold text-slate-600">${project.key}</dd>
        </div>
        <div class="flex items-center gap-4">
          <dt class="flex w-28 items-center gap-3">
            <i class="fa-regular fa-circle-user text-slate-500"></i>
            <span>Source:</span>
          </dt>
          <dd>${sourceBadge(project.source)}</dd>
        </div>
        <div class="flex items-center gap-4">
          <dt class="flex w-28 items-center gap-3">
            <i class="fa-regular fa-calendar-days text-slate-500"></i>
            <span>Issues:</span>
          </dt>
          <dd class="font-semibold text-slate-600">${project.issues}</dd>
        </div>
        <div class="flex items-center gap-4">
          <dt class="flex w-28 items-center gap-3">
            <i class="fa-regular fa-clock text-slate-500"></i>
            <span>Last Sync:</span>
          </dt>
          <dd class="font-semibold text-slate-600">${project.lastSync}</dd>
        </div>
      </dl>

      <div class="mt-7 grid grid-cols-[1fr_auto] gap-3">
        <a href="project-dashboard.html" class="rounded-lg border border-slate-200 bg-white px-4 py-3 text-center font-bold text-brand-600 hover:border-brand-200 hover:bg-brand-50">
          Open Project
        </a>
        <button class="grid h-12 w-14 place-items-center rounded-lg border border-slate-200 text-ink hover:border-brand-200 hover:bg-brand-50" aria-label="Project actions">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </div>
    </article>
  `;
}

function renderWorkspaces() {
  App.qs('#pageContent').innerHTML = `
    <section class="card p-6 lg:p-8">
      <div>
        <h2 class="text-2xl font-extrabold text-ink">Projects</h2>
        <p class="mt-3 text-slate-500">Manage Jira and manual projects in this workspace.</p>
      </div>

      <div class="mt-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label class="relative block w-full lg:w-80">
            <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input class="w-full rounded-lg border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none focus:border-brand-500" placeholder="Search projects...">
          </label>
          <div class="flex gap-3">
            <button class="rounded-lg border border-brand-500 bg-white px-5 py-3 font-bold text-brand-600">All</button>
            <button class="rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-ink hover:border-brand-200">Jira</button>
            <button class="rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-ink hover:border-brand-200">Manual</button>
          </div>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <button data-action="create-project" class="inline-flex items-center justify-center gap-3 rounded-lg bg-brand-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
            <i class="fa-solid fa-plus"></i> Create Project
          </button>
          <button data-action="sync" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-6 py-3.5 font-bold text-ink hover:border-brand-200 hover:text-brand-600">
            <i class="fa-solid fa-arrows-rotate"></i> Sync Projects
          </button>
        </div>
      </div>

      <div class="mt-8 grid gap-7 xl:grid-cols-3">
        ${projects.map(projectCard).join('')}
      </div>
    </section>
  `;
}

Layout.renderShell('workspaces');
App.bindGlobalActions();
renderWorkspaces();
