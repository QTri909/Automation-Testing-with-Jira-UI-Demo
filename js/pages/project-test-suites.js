const testSuites = [
  {
    name: 'Smoke Suite',
    type: 'Smoke',
    icon: 'fa-regular fa-cloud',
    iconTone: 'bg-violet-100 text-violet-600',
    cases: 36,
    environment: 'Staging',
    lastRun: 'Just now',
    status: 'Passed',
    passed: 32,
    failed: 2,
    notRun: 2,
    active: true
  },
  {
    name: 'Regression Suite',
    type: 'Regression',
    icon: 'fa-solid fa-arrows-rotate',
    iconTone: 'bg-cyan-100 text-cyan-600',
    cases: 128,
    environment: 'Staging',
    lastRun: '2 hours ago',
    status: 'Passed',
    passed: 104,
    failed: 12,
    notRun: 12
  },
  {
    name: 'Login Module Suite',
    type: 'UI',
    icon: 'fa-solid fa-lock',
    iconTone: 'bg-violet-100 text-violet-600',
    cases: 24,
    environment: 'Staging',
    lastRun: '1 hour ago',
    status: 'Failed',
    passed: 18,
    failed: 4,
    notRun: 2
  },
  {
    name: 'API Auth Suite',
    type: 'API',
    icon: 'fa-solid fa-code',
    iconTone: 'bg-emerald-100 text-emerald-600',
    cases: 45,
    environment: 'Staging',
    lastRun: '3 hours ago',
    status: 'Passed',
    passed: 40,
    failed: 2,
    notRun: 3
  },
  {
    name: 'Checkout Flow Suite',
    type: 'Regression',
    icon: 'fa-solid fa-cart-shopping',
    iconTone: 'bg-orange-100 text-orange-600',
    cases: 52,
    environment: 'Staging',
    lastRun: '5 hours ago',
    status: 'Not Run',
    passed: 0,
    failed: 0,
    notRun: 52
  },
  {
    name: 'Session Management Suite',
    type: 'Smoke',
    icon: 'fa-regular fa-user',
    iconTone: 'bg-blue-100 text-blue-600',
    cases: 30,
    environment: 'Staging',
    lastRun: 'Yesterday',
    status: 'Passed',
    passed: 28,
    failed: 1,
    notRun: 1
  }
];

const includedCases = [
  { id: 'TC-101', title: 'User can login with valid credentials', status: 'passed', checked: true },
  { id: 'TC-102', title: 'User can view dashboard', status: 'passed', checked: true },
  { id: 'TC-103', title: 'User can create new project', status: 'passed', checked: true },
  { id: 'TC-104', title: 'User can invite team member', status: 'failed', checked: false },
  { id: 'TC-105', title: 'User can reset password', status: 'not-run', checked: false }
];

function statusBadge(status) {
  const tones = {
    Passed: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    Failed: 'border-red-200 bg-red-50 text-red-600',
    'Not Run': 'border-orange-200 bg-orange-50 text-orange-600'
  };

  return `<span class="rounded-md border px-3 py-1 text-sm font-extrabold ${tones[status]}">${status}</span>`;
}

function filterButton(label, active = false) {
  return `
    <button class="rounded-xl border px-5 py-3 text-sm font-bold ${active ? 'border-brand-500 bg-white text-brand-600 shadow-sm shadow-blue-600/10' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200'}">
      ${label}
    </button>
  `;
}

function suiteMetric(colorClass, label, value) {
  return `
    <div>
      <p class="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <i class="fa-solid fa-circle text-[0.55rem] ${colorClass}"></i>
        ${label}
      </p>
      <p class="mt-2 pl-6 text-lg font-extrabold text-ink">${value}</p>
    </div>
  `;
}

function suiteCard(suite) {
  return `
    <article class="rounded-xl border bg-white p-5 shadow-card ${suite.active ? 'border-brand-500 ring-1 ring-brand-500' : 'border-slate-200'}">
      <div class="flex items-start justify-between gap-4">
        <div class="flex min-w-0 items-start gap-4">
          <div class="grid h-14 w-14 shrink-0 place-items-center rounded-xl text-2xl ${suite.iconTone}">
            <i class="${suite.icon}"></i>
          </div>
          <div class="min-w-0">
            <h2 class="truncate text-lg font-extrabold text-ink">${suite.name}</h2>
            <p class="mt-2 text-sm font-semibold text-slate-600">${suite.cases} Test Cases</p>
            <p class="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
              <i class="fa-solid fa-desktop text-slate-500"></i> ${suite.environment}
            </p>
          </div>
        </div>
        <button class="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink hover:bg-slate-100">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <div class="mt-7 flex items-center justify-between gap-3">
        <p class="text-sm font-semibold text-slate-600">Last run: <span class="ml-1">${suite.lastRun}</span></p>
        ${statusBadge(suite.status)}
      </div>

      <div class="mt-5 grid grid-cols-3 gap-3 border-y border-slate-200 py-4">
        ${suiteMetric('text-emerald-500', 'Passed', suite.passed)}
        ${suiteMetric('text-red-500', 'Failed', suite.failed)}
        ${suiteMetric(suite.status === 'Not Run' ? 'text-emerald-300' : 'text-slate-300', 'Not Run', suite.notRun)}
      </div>

      <div class="mt-5 grid grid-cols-2 gap-4">
        <button data-action="run-suite" class="inline-flex items-center justify-center gap-3 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-extrabold text-brand-600 hover:bg-brand-100">
          <i class="fa-solid fa-play"></i> Run Suite
        </button>
        <button data-action="edit-suite" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-ink hover:border-brand-200">
          <i class="fa-solid fa-pencil"></i> Edit
        </button>
      </div>
    </article>
  `;
}

function includedCaseRow(testCase) {
  const statusColor = {
    passed: 'text-emerald-500',
    failed: 'text-red-500',
    'not-run': 'text-slate-300'
  }[testCase.status];

  return `
    <label class="grid cursor-pointer grid-cols-[24px_minmax(64px,auto)_1fr_14px] items-center gap-3 border-b border-slate-100 px-6 py-4 hover:bg-slate-50">
      <input type="checkbox" class="h-4 w-4 rounded border-slate-300 accent-blue-600" ${testCase.checked ? 'checked' : ''}>
      <span class="rounded-lg bg-slate-100 px-3 py-1 text-sm font-extrabold text-slate-600">${testCase.id}</span>
      <span class="min-w-0 truncate text-sm font-semibold text-slate-600">${testCase.title}</span>
      <i class="fa-solid fa-circle text-[0.6rem] ${statusColor}"></i>
    </label>
  `;
}

function selectField(label, icon, value, iconExtra = '') {
  return `
    <label class="block">
      <span class="text-xs font-bold text-slate-500">${label}</span>
      <button class="mt-2 flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left font-bold text-slate-700 hover:border-brand-200">
        <span class="flex min-w-0 items-center gap-3">
          <i class="${icon} ${iconExtra || 'text-slate-500'}"></i>
          <span class="truncate">${value}</span>
        </span>
        <i class="fa-solid fa-chevron-down text-xs text-slate-500"></i>
      </button>
    </label>
  `;
}

function renderTestSuites() {
  App.qs('#pageContent').innerHTML = `
    <div class="grid min-h-[calc(100vh-73px)] bg-white xl:grid-cols-[minmax(0,1fr)_430px]">
      <section class="min-w-0 border-r border-slate-200 bg-white px-4 py-6 sm:px-6 lg:px-10">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 class="text-3xl font-extrabold text-ink">Test Suites</h1>
          <button data-action="create-suite" class="inline-flex items-center justify-center gap-3 rounded-lg bg-brand-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
            <i class="fa-solid fa-plus"></i> Create Suite
          </button>
        </div>

        <div class="mt-6 flex flex-col gap-4 xl:flex-row xl:items-center">
          <label class="relative block w-full xl:max-w-[300px]">
            <i class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input class="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm font-semibold outline-none focus:border-brand-500" placeholder="Search suites...">
          </label>
          <div class="flex flex-wrap gap-3">
            ${filterButton('All', true)}
            ${filterButton('Smoke')}
            ${filterButton('Regression')}
            ${filterButton('API')}
            ${filterButton('UI')}
          </div>
        </div>

        <div class="mt-7 grid gap-5 2xl:grid-cols-3 lg:grid-cols-2">
          ${testSuites.map(suiteCard).join('')}
        </div>

        <div class="mt-8 flex flex-col gap-4 text-sm font-semibold text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Showing 1 to 6 of 6 suites</p>
          <div class="flex items-center gap-3">
            <button class="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="grid h-10 w-10 place-items-center rounded-lg border border-brand-500 bg-white font-extrabold text-brand-600">1</button>
            <button class="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500"><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </section>

      <aside class="bg-white">
        <div class="border-b border-slate-200 p-6">
          <div class="flex items-start justify-between gap-4">
            <div class="flex min-w-0 items-center gap-5">
              <div class="grid h-14 w-14 place-items-center rounded-xl bg-violet-100 text-2xl text-violet-600">
                <i class="fa-regular fa-cloud"></i>
              </div>
              <div>
                <h2 class="text-xl font-extrabold text-ink">Smoke Suite</h2>
                <p class="mt-2 text-sm font-semibold text-slate-600">
                  36 Test Cases <span class="mx-2 text-slate-300">|</span> ${statusBadge('Passed')}
                </p>
              </div>
            </div>
            <button class="grid h-9 w-9 place-items-center rounded-lg text-ink hover:bg-slate-100">
              <i class="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
        </div>

        <div class="border-b border-slate-200 py-5">
          <div class="mb-3 flex items-center justify-between px-6">
            <h3 class="font-extrabold text-ink">Included Test Cases</h3>
            <label class="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600">
              <input type="checkbox" class="h-4 w-4 rounded border-slate-300 accent-blue-600">
              Select all
            </label>
          </div>
          <div>
            ${includedCases.map(includedCaseRow).join('')}
          </div>
        </div>

        <div class="space-y-5 p-6">
          <h3 class="font-extrabold text-ink">Run Configuration</h3>
          ${selectField('Environment', 'fa-solid fa-server', 'Staging')}
          ${selectField('Browser', 'fa-brands fa-chrome', 'Chrome', 'text-red-500')}
          ${selectField('Data Set', 'fa-solid fa-database', 'default-login-data')}
          <button data-action="run-suite" class="mt-3 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-brand-600 px-6 py-4 font-extrabold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
            <i class="fa-solid fa-play"></i> Run Suite
          </button>
        </div>
      </aside>
    </div>
  `;
}

ProjectLayout.render('project-test-suites');
App.bindGlobalActions();
renderTestSuites();
