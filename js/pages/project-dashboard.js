function projectInfoChip(icon, label, value, extra = '') {
  return `
    <span class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600">
      <i class="${icon} text-brand-600"></i>
      <span>${label}:</span>
      <span class="font-extrabold text-ink">${value}</span>
      ${extra}
    </span>
  `;
}

function metricCard(icon, bgClass, textClass, label, value, delta, negative = false) {
  return `
    <article class="card p-5">
      <div class="flex items-center gap-5">
        <div class="grid h-14 w-14 place-items-center rounded-lg ${bgClass} text-2xl ${textClass}">
          <i class="${icon}"></i>
        </div>
        <div>
          <p class="text-sm font-extrabold text-slate-600">${label}</p>
          <p class="mt-1 text-2xl font-extrabold text-ink">${value}</p>
        </div>
      </div>
      <p class="mt-4 text-sm font-bold ${negative ? 'text-red-500' : 'text-emerald-600'}">
        <i class="fa-solid fa-triangle"></i> ${delta}
      </p>
    </article>
  `;
}

function miniAction(icon, title, text, action = 'sync') {
  return `
    <button data-action="${action}" class="card flex items-center gap-4 p-4 text-left hover:border-brand-200 hover:text-brand-600">
      <div class="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-xl text-brand-600">
        <i class="${icon}"></i>
      </div>
      <span>
        <span class="block font-extrabold text-brand-600">${title}</span>
        <span class="mt-1 block text-sm text-slate-500">${text}</span>
      </span>
    </button>
  `;
}

function activityRow(icon, bgClass, textClass, title, text, time, failed = false) {
  return `
    <div class="grid gap-4 border-t border-slate-200 py-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
      <div class="flex items-center gap-4">
        <div class="grid h-10 w-10 place-items-center rounded-lg ${bgClass} ${textClass}">
          <i class="${icon}"></i>
        </div>
        <div>
          <p class="font-extrabold text-ink">${title}</p>
          <p class="mt-1 text-sm text-slate-500">${text}</p>
        </div>
      </div>
      <div class="flex items-center gap-3 text-sm text-slate-500">
        <span class="grid h-8 w-8 place-items-center rounded-full bg-brand-50 font-extrabold text-brand-600">AS</span>
        <span>Arjun Singh</span>
      </div>
      <div class="flex items-center gap-3 text-sm text-slate-500">
        <span>${time}</span>
        ${failed ? '<span class="rounded-full border border-red-200 bg-red-50 px-3 py-1 font-bold text-red-600">Failed</span>' : ''}
      </div>
    </div>
  `;
}

function renderProjectDashboard() {
  App.qs('#pageContent').innerHTML = `
    <section class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-ink">AI Testing Platform</h1>
        <div class="mt-4 flex flex-wrap gap-3">
          ${projectInfoChip('fa-brands fa-jira', 'Source', 'Jira')}
          ${projectInfoChip('fa-solid fa-key', 'Project Key', 'ATP')}
          ${projectInfoChip('fa-solid fa-link', 'Jira Site', 'testflow-ai.atlassian.net', '<i class="fa-solid fa-arrow-up-right-from-square text-brand-600"></i>')}
          ${projectInfoChip('fa-regular fa-clock', 'Last Sync', '<span class="text-emerald-600">Just now</span>')}
        </div>
      </div>
      <button class="inline-flex items-center justify-center gap-4 rounded-lg border border-slate-200 bg-white px-5 py-3.5 font-bold text-ink shadow-sm hover:border-brand-200">
        Project Actions <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>
    </section>

    <section class="grid gap-5" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
      ${metricCard('fa-regular fa-file-lines', 'bg-blue-50', 'text-blue-600', 'Requirements', '126', '8 new')}
      ${metricCard('fa-regular fa-square-check', 'bg-emerald-50', 'text-emerald-600', 'Test Cases', '248', '24 new')}
      ${metricCard('fa-solid fa-code', 'bg-violet-50', 'text-violet-600', 'Automation Scripts', '184', '18 new')}
      ${metricCard('fa-solid fa-play', 'bg-blue-50', 'text-blue-600', 'Test Runs', '56', '6 new')}
      ${metricCard('fa-solid fa-bug', 'bg-red-50', 'text-red-600', 'Defects', '18', '3 new', true)}
    </section>

    <section class="grid gap-5 lg:grid-cols-2">
      <article class="card overflow-hidden">
        <div class="p-5">
          <h2 class="font-extrabold text-ink">Requirement Coverage <i class="fa-regular fa-circle-question text-slate-400"></i></h2>
          <div class="mt-7 flex items-center gap-8">
            <div class="grid h-32 w-32 place-items-center rounded-full" style="background: conic-gradient(#2357df 82.5%, #e8edf5 0);">
              <div class="grid h-24 w-24 place-items-center rounded-full bg-white text-2xl font-extrabold text-ink">82.5%</div>
            </div>
            <div class="min-w-0">
              <p class="text-slate-500">AC Covered</p>
              <p class="mt-2 text-2xl font-extrabold text-brand-600">104 <span class="text-ink">/ 126</span></p>
              <p class="mt-4 text-sm text-slate-500">22 AC remaining</p>
              <div class="mt-3 h-2 w-28 rounded-full bg-slate-100"><div class="h-full w-4/5 rounded-full bg-brand-600"></div></div>
            </div>
          </div>
        </div>
        <button class="flex w-full items-center justify-between border-t border-slate-200 px-5 py-4 font-bold text-brand-600">
          View Coverage Details <i class="fa-solid fa-chevron-right"></i>
        </button>
      </article>

      <article class="card p-5">
        <div class="flex items-center justify-between">
          <h2 class="font-extrabold text-ink">Pass / Fail Trend <i class="fa-regular fa-circle-question text-slate-400"></i></h2>
          <button class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-ink">Last 14 Days <i class="fa-solid fa-chevron-down text-xs"></i></button>
        </div>
        <div class="mt-6 h-40 rounded-lg border border-slate-100 bg-gradient-to-b from-emerald-50 to-white p-4">
          <div class="flex h-full items-end gap-3">
            ${[58, 70, 64, 63, 78, 86, 79, 84, 80, 79, 70, 86, 96].map((height, index) => `
              <div class="flex flex-1 flex-col items-center gap-2">
                <span class="w-full rounded-t bg-emerald-500" style="height:${height}%"></span>
                <span class="w-full rounded-t bg-red-400" style="height:${Math.max(16, 56 - height / 2)}%"></span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mt-4 flex justify-center gap-8 text-sm">
          <span><i class="fa-solid fa-circle text-emerald-500"></i> Passed 118</span>
          <span><i class="fa-solid fa-circle text-red-500"></i> Failed 27</span>
        </div>
      </article>

      <article class="card overflow-hidden">
        <div class="p-5 text-center">
          <h2 class="text-left font-extrabold text-ink">Automation Rate <i class="fa-regular fa-circle-question text-slate-400"></i></h2>
          <div class="mx-auto mt-7 h-28 w-44 rounded-t-full border-[18px] border-b-0 border-violet-500 border-r-slate-100"></div>
          <p class="-mt-9 text-4xl font-extrabold text-ink">74%</p>
          <p class="mt-3 text-xl font-extrabold text-ink">184 / 248</p>
          <p class="mt-1 text-slate-500">Test Cases Automated</p>
        </div>
        <button class="flex w-full items-center justify-between border-t border-slate-200 px-5 py-4 font-bold text-brand-600">
          View Automation Details <i class="fa-solid fa-chevron-right"></i>
        </button>
      </article>

      <article class="card overflow-hidden">
        <div class="p-5">
          <h2 class="font-extrabold text-ink">Test Case Generation Progress <i class="fa-regular fa-circle-question text-slate-400"></i></h2>
          <div class="mt-8 flex items-center gap-5">
            <div class="h-3 flex-1 rounded-full bg-slate-100"><div class="h-full w-[68%] rounded-full bg-brand-600"></div></div>
            <span class="text-2xl font-extrabold text-ink">68%</span>
          </div>
          <div class="mt-7 space-y-5 text-sm">
            <p class="flex items-center justify-between"><span><i class="fa-solid fa-circle text-emerald-500"></i> Generated</span><strong>168</strong></p>
            <p class="flex items-center justify-between"><span><i class="fa-solid fa-circle text-brand-600"></i> In Progress</span><strong>38</strong></p>
            <p class="flex items-center justify-between"><span><i class="fa-solid fa-circle text-slate-300"></i> Pending</span><strong>42</strong></p>
          </div>
        </div>
        <button class="flex w-full items-center justify-between border-t border-slate-200 px-5 py-4 font-bold text-brand-600">
          View Generation Details <i class="fa-solid fa-chevron-right"></i>
        </button>
      </article>
    </section>

    <section class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      ${miniAction('fa-solid fa-arrows-rotate', 'Sync Requirements', 'Pull latest issues from Jira')}
      ${miniAction('fa-solid fa-wand-magic-sparkles', 'Generate Test Cases', 'AI-powered test case creation')}
      ${miniAction('fa-solid fa-cloud-arrow-up', 'Import API Spec', 'Import OpenAPI / Swagger', 'import-spec')}
      ${miniAction('fa-solid fa-play', 'Create Test Run', 'Execute your test suites')}
    </section>

    <section class="card p-5">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="text-lg font-extrabold text-ink">Recent Project Activity</h2>
        <button class="font-bold text-brand-600">View All Activity</button>
      </div>
      ${activityRow('fa-solid fa-arrows-rotate', 'bg-blue-50', 'text-blue-600', 'Synced 12 issues from Jira', 'Added 8 new requirements and 10 acceptance criteria', 'Just now')}
      ${activityRow('fa-solid fa-wand-magic-sparkles', 'bg-violet-50', 'text-violet-600', 'Generated 24 test cases', 'For 8 acceptance criteria using AI', '3 minutes ago')}
      ${activityRow('fa-solid fa-bug', 'bg-red-50', 'text-red-600', 'Test Suite "Authentication Flow" failed', '2 tests failed out of 15 in Run #56', '18 minutes ago', true)}
    </section>
  `;
}

ProjectLayout.render('project-dashboard');
App.bindGlobalActions();
renderProjectDashboard();
