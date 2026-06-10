const projectRuns = [
  { id: 'RUN-001', suite: 'Smoke Suite', env: 'Staging', total: 12, passed: 10, failed: 2, status: 'Failed', started: '10:00', active: true },
  { id: 'RUN-002', suite: 'Login Suite', env: 'Staging', total: 9, passed: 9, failed: 0, status: 'Passed', started: 'Yesterday' },
  { id: 'RUN-003', suite: 'Regression Suite', env: 'QA', total: 86, passed: 80, failed: 6, status: 'Failed', started: 'May 15' }
];

const runCases = [
  { id: 'TC-001', title: 'Verify user can login with valid credentials', status: 'Passed', duration: '00:00:45' },
  { id: 'TC-002', title: 'Verify error on invalid password', status: 'Failed', duration: '00:00:30', active: true },
  { id: 'TC-003', title: 'Verify remember me functionality', status: 'Passed', duration: '00:00:28' },
  { id: 'TC-004', title: 'Verify logout functionality', status: 'Passed', duration: '00:00:20' },
  { id: 'TC-005', title: 'Verify password reset email', status: 'Passed', duration: '00:00:42' }
];

function runStatus(status) {
  const failed = status === 'Failed';
  return `
    <span class="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-extrabold ${failed ? 'border-red-200 bg-red-50 text-red-600' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}">
      <i class="fa-solid ${failed ? 'fa-circle-xmark' : 'fa-circle-check'}"></i>
      ${status}
    </span>
  `;
}

function envBadge(env) {
  return `
    <span class="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-1.5 font-extrabold text-indigo-600">
      <i class="fa-regular fa-cloud"></i>
      ${env}
    </span>
  `;
}

function sortIcon() {
  return '<i class="fa-solid fa-sort ml-2 text-xs text-slate-400"></i>';
}

function runRow(run) {
  return `
    <tr class="border-t border-slate-200 ${run.active ? 'bg-indigo-50/30 shadow-inner' : 'bg-white'}">
      <td class="px-8 py-5 font-extrabold text-brand-600">${run.id}</td>
      <td class="px-6 py-5 font-semibold text-slate-600">${run.suite}</td>
      <td class="px-6 py-5">${envBadge(run.env)}</td>
      <td class="px-6 py-5 text-center font-bold text-ink">${run.total}</td>
      <td class="px-6 py-5 text-center font-extrabold text-emerald-600">${run.passed}</td>
      <td class="px-6 py-5 text-center font-extrabold text-red-600">${run.failed}</td>
      <td class="px-6 py-5">${runStatus(run.status)}</td>
      <td class="px-6 py-5 font-semibold text-slate-600">${run.started}</td>
      <td class="px-6 py-5 text-right text-brand-600"><i class="fa-solid fa-chevron-right"></i></td>
    </tr>
  `;
}

function summaryCard(icon, bgClass, textClass, label, value) {
  return `
    <article class="rounded-xl border border-slate-200 bg-white p-4">
      <div class="flex items-center gap-4">
        <div class="grid h-14 w-14 place-items-center rounded-xl ${bgClass} text-2xl ${textClass}">
          <i class="${icon}"></i>
        </div>
        <div>
          <p class="font-bold text-slate-600">${label}</p>
          <p class="mt-1 text-2xl font-extrabold text-ink">${value}</p>
        </div>
      </div>
    </article>
  `;
}

function caseStatusIcon(status) {
  const failed = status === 'Failed';
  return `
    <span class="grid h-6 w-6 place-items-center rounded-full ${failed ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}">
      <i class="fa-solid ${failed ? 'fa-circle-xmark' : 'fa-circle-check'} text-sm"></i>
    </span>
  `;
}

function testCaseRow(testCase) {
  const failed = testCase.status === 'Failed';
  return `
    <div class="grid grid-cols-[24px_70px_minmax(0,1fr)_70px_76px] items-center gap-3 border-l-4 px-4 py-3 text-sm ${failed ? 'border-red-500 bg-red-50/60' : 'border-emerald-500'}">
      ${caseStatusIcon(testCase.status)}
      <span class="font-extrabold text-ink">${testCase.id}</span>
      <span class="truncate font-semibold text-slate-600">${testCase.title}</span>
      <span class="font-bold ${failed ? 'text-red-600' : 'text-emerald-600'}">${testCase.status}</span>
      <span class="text-right font-semibold text-slate-600">${testCase.duration}</span>
    </div>
  `;
}

function detailItem(icon, bgClass, textClass, label, value) {
  return `
    <div class="grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)]">
      <p class="flex items-center gap-3 font-extrabold text-ink">
        <span class="grid h-8 w-8 place-items-center rounded-lg ${bgClass} ${textClass}">
          <i class="${icon}"></i>
        </span>
        ${label}
      </p>
      <div class="font-semibold leading-6 text-slate-600">${value}</div>
    </div>
  `;
}

function renderProjectTestRuns() {
  App.qs('#pageContent').innerHTML = `
    <section class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 class="text-3xl font-extrabold text-ink">Test Runs</h1>
        <button data-action="create-test-run" class="inline-flex items-center justify-center gap-3 rounded-lg bg-brand-600 px-6 py-3 font-extrabold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
          <i class="fa-solid fa-play"></i> Create Test Run
        </button>
      </div>

      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full text-left">
            <thead class="bg-white text-sm font-extrabold text-slate-600">
              <tr>
                <th class="px-8 py-5">Run ID ${sortIcon()}</th>
                <th class="px-6 py-5">Suite ${sortIcon()}</th>
                <th class="px-6 py-5">Environment ${sortIcon()}</th>
                <th class="px-6 py-5 text-center">Total ${sortIcon()}</th>
                <th class="px-6 py-5 text-center">Passed ${sortIcon()}</th>
                <th class="px-6 py-5 text-center">Failed ${sortIcon()}</th>
                <th class="px-6 py-5">Status ${sortIcon()}</th>
                <th class="px-6 py-5">Started At ${sortIcon()}</th>
                <th class="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody>
              ${projectRuns.map(runRow).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <article class="card p-6">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h2 class="text-xl font-extrabold text-ink">RUN-001 <span class="mx-2">•</span> Smoke Suite <span class="ml-3 align-middle">${runStatus('Failed')}</span></h2>
            <div class="mt-4 flex flex-wrap gap-5 text-sm font-semibold text-slate-600">
              <span><i class="fa-regular fa-cloud mr-2"></i>Environment: <strong>Staging</strong></span>
              <span class="hidden text-slate-300 sm:inline">|</span>
              <span><i class="fa-regular fa-clock mr-2"></i>Started at: <strong>May 17, 2025 10:00</strong></span>
              <span class="hidden text-slate-300 sm:inline">|</span>
              <span><i class="fa-regular fa-clock mr-2"></i>Duration: <strong>00:12:34</strong></span>
            </div>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row">
            <button data-action="create-jira-bug" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 font-extrabold text-brand-600 hover:border-brand-200">
              <i class="fa-brands fa-jira"></i> Create Jira Bug
            </button>
            <button data-action="sync-results-jira" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 font-extrabold text-brand-600 hover:border-brand-200">
              <i class="fa-solid fa-arrows-rotate"></i> Sync Results to Jira
            </button>
            <button data-action="download-report" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 font-extrabold text-brand-600 hover:border-brand-200">
              <i class="fa-solid fa-download"></i> Download Report <i class="fa-solid fa-chevron-down text-xs"></i>
            </button>
          </div>
        </div>

        <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          ${summaryCard('fa-regular fa-file-lines', 'bg-blue-50', 'text-brand-600', 'Total', '12')}
          ${summaryCard('fa-solid fa-check', 'bg-emerald-50', 'text-emerald-600', 'Passed', '10')}
          ${summaryCard('fa-solid fa-xmark', 'bg-red-50', 'text-red-600', 'Failed', '2')}
          ${summaryCard('fa-solid fa-minus', 'bg-slate-100', 'text-slate-500', 'Skipped', '0')}
        </div>

        <div class="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.5fr]">
          <section class="rounded-xl border border-slate-200 bg-white p-4">
            <h3 class="font-extrabold text-ink">Test Cases <span class="ml-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">12</span></h3>
            <div class="mt-4 overflow-hidden rounded-lg">
              ${runCases.map(testCaseRow).join('')}
            </div>
            <button class="mt-4 font-extrabold text-brand-600">View all test cases</button>
          </section>

          <section class="rounded-xl border border-slate-200 bg-white p-5">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="font-extrabold text-ink">TC-002 <span class="ml-3">Verify error on invalid password</span> <span class="ml-3 align-middle">${runStatus('Failed')}</span></h3>
              <p class="text-sm font-semibold text-slate-600">Duration: 00:00:30</p>
            </div>
            <div class="mt-6 space-y-6">
              ${detailItem('fa-solid fa-circle-exclamation', 'bg-red-100', 'text-red-600', 'Failed Step', '2. Click on Login button')}
              ${detailItem('fa-solid fa-bullseye', 'bg-blue-100', 'text-brand-600', 'Expected Result', "An error message 'Invalid password' should be displayed.")}
              ${detailItem('fa-regular fa-square', 'bg-orange-100', 'text-orange-600', 'Actual Result', 'User is logged in successfully and redirected to dashboard.')}
              ${detailItem('fa-solid fa-code', 'bg-red-100', 'text-red-600', 'Error Log', `
                <pre class="overflow-x-auto rounded-lg bg-red-50 p-4 text-sm leading-6 text-red-900">AssertionError: expected error message 'Invalid password' but
user was redirected to /dashboard
at LoginPage.verifyInvalidPassword(LoginPage.ts:87)
at TestLogin.test.ts:45:13</pre>
              `)}
            </div>
          </section>
        </div>
      </article>
    </section>
  `;
}

ProjectLayout.render('project-test-runs');
App.bindGlobalActions();
renderProjectTestRuns();
