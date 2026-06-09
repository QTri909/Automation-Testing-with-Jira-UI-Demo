function jiraCard() {
  return `
    <div class="glass-card w-56 p-5">
      <div class="mb-4 flex items-center gap-2 border-b border-slate-200 pb-4 font-bold text-ink">
        <i class="fa-brands fa-jira text-brand-600"></i> Jira Issues
      </div>
      ${['PROJ-101', 'PAY-043', 'OPS-012'].map((item, index) => `
        <div class="mb-4 flex items-center gap-3">
          <span class="h-5 w-5 rounded ${['bg-blue-500', 'bg-emerald-500', 'bg-violet-500'][index]}"></span>
          <div class="min-w-0 flex-1">
            <p class="text-xs font-bold text-slate-700">${item}</p>
            <div class="mt-2 h-1.5 rounded-full bg-slate-200"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function testsCard() {
  return `
    <div class="glass-card w-56 p-5">
      <div class="mb-4 flex items-center gap-2 border-b border-slate-200 pb-4 font-bold text-ink">
        <i class="fa-regular fa-circle-check text-brand-600"></i> Generated Tests
      </div>
      ${Array.from({ length: 5 }).map(() => `
        <div class="mb-4 flex items-center gap-3">
          <i class="fa-regular fa-circle-check text-emerald-500"></i>
          <div class="h-1.5 flex-1 rounded-full bg-brand-100"></div>
        </div>
      `).join('')}
    </div>
  `;
}

function stepCard(number, icon, title, text) {
  return `
    <div class="flex gap-4">
      <div class="grid h-16 w-16 shrink-0 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-2xl text-brand-600">
        <i class="${icon}"></i>
      </div>
      <div>
        <div class="flex items-center gap-3">
          <span class="grid h-7 w-7 place-items-center rounded-full bg-brand-50 text-sm font-extrabold text-brand-700">${number}</span>
          <h4 class="font-extrabold text-ink">${title}</h4>
        </div>
        <p class="mt-2 leading-6 text-slate-500">${text}</p>
      </div>
    </div>
  `;
}

function renderDashboard() {
  const connected = MockData.workspace.jiraConnected;
  App.qs('#pageContent').innerHTML = `
    <div class="hero-panel p-6 sm:p-8 lg:p-12">
      <div class="relative z-10 grid gap-8 xl:grid-cols-[1fr_1.12fr] xl:items-center">
        <div>
          <span class="badge mb-4 bg-brand-50 text-brand-700">
            <i class="fa-solid fa-wand-magic-sparkles"></i> ${connected ? 'Jira connected' : 'First workspace ready'}
          </span>
          <h2 class="max-w-xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Welcome to TestFlow AI</h2>
          <p class="mt-4 max-w-xl leading-7 text-slate-600">
            Your default workspace is ready, but there is no project data yet. Connect Jira to import projects, requirements, and issues.
          </p>

          <div class="mt-7 flex flex-col gap-3 sm:flex-row">
            <button data-action="connect-jira" class="inline-flex items-center justify-center gap-3 rounded-lg bg-brand-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
              <i class="fa-brands fa-jira"></i> Connect to Jira
            </button>
          </div>

          <div class="mt-5 flex max-w-md items-center gap-3 text-sm text-slate-400">
            <span class="h-px flex-1 bg-slate-200"></span>
            <span>or</span>
            <span class="h-px flex-1 bg-slate-200"></span>
          </div>

          <button data-action="create-project" class="mt-5 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 font-bold text-ink hover:border-brand-200 hover:text-brand-600">
            Create Project
          </button>
        </div>

        <div class="hidden min-h-[260px] items-center justify-center gap-8 xl:flex">
          ${jiraCard()}
          <div class="flex items-center">
            <div class="h-20 w-24 integration-line"></div>
            <div class="grid h-32 w-32 place-items-center rounded-full border-[14px] border-brand-100 bg-white shadow-soft">
              <div class="logo-mark">T</div>
            </div>
            <div class="h-20 w-24 integration-line"></div>
          </div>
          ${testsCard()}
        </div>
      </div>
    </div>

    <div class="card p-5 sm:p-6">
      <h3 class="text-lg font-extrabold text-ink">Get started in 3 simple steps</h3>
      <div class="mt-6 grid gap-5 lg:grid-cols-3">
        ${stepCard(1, 'fa-brands fa-jira', 'Connect Jira', 'Securely connect your Jira account in a few clicks.')}
        ${stepCard(2, 'fa-regular fa-folder-open', 'Select Jira Projects', 'Choose the Jira projects you want to import.')}
        ${stepCard(3, 'fa-solid fa-wand-magic-sparkles', 'Generate Tests', 'Let TestFlow AI analyze and generate tests for you.')}
      </div>
    </div>
  `;
}

Layout.renderShell('dashboard');
App.bindGlobalActions();
renderDashboard();
