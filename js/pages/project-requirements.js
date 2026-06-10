function chip(icon, label, value, extra = '') {
  return `
    <span class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600">
      <i class="${icon} text-brand-600"></i>
      <span>${label}:</span>
      <span class="font-extrabold text-ink">${value}</span>
      ${extra}
    </span>
  `;
}

function filterButton(label, active = false) {
  return `
    <button class="rounded-lg border ${active ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-slate-200 bg-white text-ink'} px-5 py-3 font-semibold hover:border-brand-200">
      ${label}
    </button>
  `;
}

function requirementRow(req) {
  const statusTone = req.status === 'Synced' ? 'text-emerald-600' : req.status === 'Warning' ? 'text-amber-500' : 'text-brand-600';
  const coverageTone = req.coverageTone || 'bg-emerald-500';
  return `
    <tr class="${req.active ? 'rounded-lg outline outline-1 outline-brand-200' : 'border-t border-slate-200'}">
      <td class="px-5 py-5 font-medium text-slate-600">${req.id}</td>
      <td class="px-5 py-5 font-extrabold text-brand-600">${req.issue} <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i></td>
      <td class="px-5 py-5 font-medium text-ink">${req.title}</td>
      <td class="px-5 py-5"><span class="rounded-lg ${req.type === 'Task' ? 'bg-blue-50 text-blue-600' : 'bg-violet-50 text-violet-600'} px-3 py-2 font-bold">${req.type}</span></td>
      <td class="px-5 py-5 font-semibold text-ink">${req.ac}</td>
      <td class="px-5 py-5">
        <div class="h-2 w-28 rounded-full bg-slate-100">
          <div class="h-full rounded-full ${coverageTone}" style="width:${req.width}%"></div>
        </div>
        <p class="mt-2 text-sm ${req.missing ? 'text-red-500' : 'text-slate-600'}">${req.coverage}</p>
      </td>
      <td class="px-5 py-5"><span class="${statusTone}"><i class="fa-solid fa-circle text-[0.55rem]"></i></span> ${req.status}</td>
      <td class="px-5 py-5 text-right text-slate-500"><i class="fa-solid fa-chevron-right"></i></td>
    </tr>
  `;
}

function acItem(id, text, done = true) {
  return `
    <li class="flex items-center gap-3">
      <i class="${done ? 'fa-regular fa-circle-check text-emerald-500' : 'fa-regular fa-circle text-slate-400'}"></i>
      <span class="font-extrabold text-ink">${id}</span>
      <span class="text-slate-600">${text}</span>
    </li>
  `;
}

function linkedCase(id, text) {
  return `
    <div class="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
      <span><strong class="text-brand-600">${id}</strong> <span class="text-slate-600">${text}</span></span>
      <i class="fa-solid fa-arrow-up-right-from-square text-brand-600"></i>
    </div>
  `;
}

function renderProjectRequirements() {
  const requirements = [
    { id: 'REQ-001', issue: 'ATP-12', title: 'Login with email and password', type: 'Story', ac: 4, width: 75, coverage: '3 of 4 covered', status: 'Synced', active: true },
    { id: 'REQ-002', issue: 'ATP-13', title: 'Reset password flow', type: 'Story', ac: 0, width: 0, coverage: 'Missing AC', status: 'Warning', missing: true },
    { id: 'REQ-003', issue: 'ATP-14', title: 'Login error handling', type: 'Story', ac: 3, width: 100, coverage: '3 of 3 covered', status: 'Synced' },
    { id: 'REQ-004', issue: 'ATP-18', title: 'Session timeout', type: 'Task', ac: 2, width: 50, coverage: '1 of 2 covered', status: 'In Review', coverageTone: 'bg-amber-500' }
  ];

  App.qs('#pageContent').innerHTML = `
    <div class="grid gap-6 xl:grid-cols-[1fr_400px]">
      <section class="min-w-0 space-y-6">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 class="text-3xl font-extrabold text-ink">Requirements</h1>
            <div class="mt-4 flex flex-wrap gap-3">
              ${chip('fa-brands fa-jira', 'Source', 'Jira')}
              ${chip('fa-solid fa-key', 'Project Key', 'ATP')}
              ${chip('fa-solid fa-link', 'Jira Site', 'testflow-ai.atlassian.net', '<i class="fa-solid fa-arrow-up-right-from-square text-brand-600"></i>')}
              ${chip('fa-regular fa-clock', 'Last Sync', '<span class="text-emerald-600">Just now</span>')}
            </div>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row">
            <button data-action="sync" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 font-bold text-brand-600 hover:border-brand-200">
              <i class="fa-solid fa-arrows-rotate"></i> Sync from Jira
            </button>
            <button data-action="generate-tests" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 font-bold text-brand-600 hover:border-brand-200">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Generate Tests
            </button>
            <button data-action="mapping-settings" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 font-bold text-brand-600 hover:border-brand-200">
              <i class="fa-solid fa-gear"></i> Mapping Settings
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label class="relative block flex-1">
            <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input class="w-full rounded-lg border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none focus:border-brand-500" placeholder="Search requirements...">
          </label>
          <div class="flex flex-wrap gap-3">
            ${filterButton('All', true)}
            ${filterButton('Missing AC')}
            ${filterButton('Missing Coverage')}
            ${filterButton('Synced')}
          </div>
        </div>

        <div class="card overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full text-left text-sm">
              <thead class="text-xs uppercase text-slate-500">
                <tr>
                  <th class="px-5 py-4 font-extrabold">Requirement ID <i class="fa-solid fa-sort"></i></th>
                  <th class="px-5 py-4 font-extrabold">Jira Issue <i class="fa-solid fa-sort"></i></th>
                  <th class="px-5 py-4 font-extrabold">Title <i class="fa-solid fa-sort"></i></th>
                  <th class="px-5 py-4 font-extrabold">Type <i class="fa-solid fa-sort"></i></th>
                  <th class="px-5 py-4 font-extrabold">AC</th>
                  <th class="px-5 py-4 font-extrabold">Test Coverage <i class="fa-solid fa-sort"></i></th>
                  <th class="px-5 py-4 font-extrabold">Status</th>
                  <th class="px-5 py-4"></th>
                </tr>
              </thead>
              <tbody>
                ${requirements.map(requirementRow).join('')}
              </tbody>
            </table>
          </div>
          <div class="flex items-center justify-between border-t border-slate-200 px-5 py-4">
            <p class="text-slate-500">Showing 1 to 4 of 4 requirements</p>
            <div class="flex gap-3">
              <button class="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-400"><i class="fa-solid fa-chevron-left"></i></button>
              <button class="grid h-10 w-10 place-items-center rounded-lg border border-brand-500 text-brand-600">1</button>
              <button class="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-400"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
          </div>
        </div>
      </section>

      <aside class="card h-fit p-6">
        <div class="flex items-start justify-between gap-4">
          <div class="flex gap-4">
            <div class="grid h-14 w-14 place-items-center rounded-lg bg-blue-50 text-2xl text-brand-600">
              <i class="fa-regular fa-file-lines"></i>
            </div>
            <div>
              <h2 class="text-lg font-extrabold text-ink">Login with email and password</h2>
              <p class="mt-2 text-sm text-slate-500">Jira Issue: <strong class="text-brand-600">ATP-12</strong> <i class="fa-solid fa-arrow-up-right-from-square text-brand-600"></i></p>
            </div>
          </div>
          <button class="text-2xl text-slate-500"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <p class="mt-6 border-b border-slate-200 pb-6 leading-7 text-slate-600">Users should be able to log in to the system using a valid email address and password to access their account.</p>

        <div class="border-b border-slate-200 py-6">
          <h3 class="mb-4 font-extrabold text-ink"><i class="fa-regular fa-clipboard mr-2"></i> Acceptance Criteria</h3>
          <ul class="space-y-4 text-sm">
            ${acItem('AC-1', 'User can enter a valid email address')}
            ${acItem('AC-2', 'User can enter a valid password')}
            ${acItem('AC-3', 'System validates credentials')}
            ${acItem('AC-4', 'User is redirected to the dashboard', false)}
          </ul>
        </div>

        <div class="border-b border-slate-200 py-6">
          <h3 class="mb-4 font-extrabold text-ink"><i class="fa-solid fa-link mr-2"></i> Linked Test Cases</h3>
          <div class="space-y-3 text-sm">
            ${linkedCase('TC-001', 'Verify login with valid credentials')}
            ${linkedCase('TC-002', 'Verify redirect to dashboard')}
          </div>
        </div>

        <div class="py-6">
          <div class="mb-3 flex items-center justify-between">
            <h3 class="font-extrabold text-ink">Test Coverage</h3>
            <span class="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-extrabold text-emerald-600">3 / 4 AC covered</span>
          </div>
          <div class="h-2 rounded-full bg-slate-100"><div class="h-full w-3/4 rounded-full bg-emerald-500"></div></div>
        </div>

        <div class="space-y-3">
          <button data-action="generate-coverage" class="w-full rounded-lg bg-brand-600 px-5 py-4 font-extrabold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
            <i class="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate Missing Coverage
          </button>
          <button data-action="edit-ac" class="w-full rounded-lg border border-brand-500 bg-white px-5 py-4 font-extrabold text-brand-600 hover:bg-brand-50">
            <i class="fa-solid fa-pencil mr-2"></i> Edit AC
          </button>
        </div>
      </aside>
    </div>
  `;
}

ProjectLayout.render('project-requirements');
App.bindGlobalActions();
renderProjectRequirements();
