function integrationMetric(icon, label, value) {
  return `
    <div class="flex items-center gap-4 border-slate-200 xl:border-l xl:pl-8 first:border-l-0 first:pl-0">
      <div class="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 text-xl text-ink">
        <i class="${icon}"></i>
      </div>
      <div>
        <p class="text-sm font-semibold text-slate-500">${label}</p>
        <p class="mt-1 font-extrabold text-ink">${value}</p>
      </div>
    </div>
  `;
}

function healthRow(title, detail) {
  return `
    <div class="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 last:border-b-0">
      <div class="flex items-center gap-4">
        <i class="fa-regular fa-circle-check text-xl text-emerald-500"></i>
        <div>
          <p class="font-extrabold text-ink">${title}</p>
          <p class="mt-1 text-sm text-slate-500">${detail}</p>
        </div>
      </div>
      <i class="fa-solid fa-chevron-right text-slate-400"></i>
    </div>
  `;
}

function syncRow(time) {
  return `
    <div class="flex items-center justify-between gap-4 border-b border-slate-200 py-4 last:border-b-0">
      <div class="flex items-center gap-4">
        <i class="fa-regular fa-circle-check text-xl text-emerald-500"></i>
        <div>
          <p class="font-extrabold text-ink">Sync completed successfully</p>
          <p class="mt-1 text-sm text-slate-500">Projects, issues, and updates synchronized</p>
        </div>
      </div>
      <span class="shrink-0 text-sm text-slate-500">${time}</span>
    </div>
  `;
}

function availableIntegration(icon, iconClass, title, text) {
  return `
    <article class="card p-6">
      <div class="flex items-start gap-5">
        <div class="grid h-14 w-14 shrink-0 place-items-center rounded-lg text-4xl ${iconClass}">
          <i class="${icon}"></i>
        </div>
        <div>
          <h3 class="font-extrabold text-ink">${title}</h3>
          <p class="mt-2 max-w-xs text-sm leading-6 text-slate-500">${text}</p>
          <span class="mt-5 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500">
            <i class="fa-regular fa-clock"></i> Coming soon
          </span>
        </div>
      </div>
    </article>
  `;
}

function renderIntegrations() {
  App.qs('#pageContent').innerHTML = `
    <section>
      <h2 class="text-2xl font-extrabold text-ink">Integrations</h2>
      <p class="mt-3 text-slate-500">Manage workspace-level connections and sync settings.</p>
    </section>

    <section class="card p-6">
      <div class="flex flex-col gap-8">
        <div class="flex flex-wrap items-center gap-5">
          <i class="fa-brands fa-jira text-5xl text-brand-600"></i>
          <h2 class="text-3xl font-extrabold text-ink">Jira</h2>
          <span class="badge bg-emerald-50 text-emerald-700">
            <i class="fa-solid fa-circle text-[0.45rem]"></i> Connected
          </span>
        </div>

        <div class="grid gap-6 xl:grid-cols-4">
          ${integrationMetric('fa-solid fa-globe', 'Site', 'testflow-ai.atlassian.net')}
          ${integrationMetric('fa-regular fa-envelope', 'Connected account', 'arjun.singh@testflowai.com')}
          ${integrationMetric('fa-regular fa-clock', 'Last sync', 'Just now')}
          ${integrationMetric('fa-solid fa-arrows-rotate', 'Sync frequency', 'Every 15 minutes')}
        </div>

        <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
          <button data-action="manage-connection" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-6 py-3.5 font-bold text-ink hover:border-brand-200 hover:text-brand-600">
            <i class="fa-solid fa-gear"></i> Manage Connection
          </button>
          <button data-action="sync" class="inline-flex items-center justify-center gap-3 rounded-lg bg-brand-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
            <i class="fa-solid fa-arrows-rotate"></i> Sync Now
          </button>
          <button data-action="disconnect" class="inline-flex items-center justify-center gap-3 rounded-lg border border-red-300 bg-white px-6 py-3.5 font-bold text-red-600 hover:bg-red-50 lg:ml-auto">
            <i class="fa-regular fa-trash-can"></i> Disconnect
          </button>
        </div>
      </div>
    </section>

    <section class="grid gap-6 xl:grid-cols-[0.95fr_1.55fr]">
      <div class="card p-6">
        <h2 class="flex items-center gap-3 font-extrabold text-ink">
          <i class="fa-solid fa-shield-halved text-emerald-500"></i> Connection Health
        </h2>
        <div class="mt-4 overflow-hidden rounded-lg border border-slate-200">
          ${healthRow('OAuth token valid', 'Token expires in 89 days')}
          ${healthRow('Last successful sync', 'Just now')}
          ${healthRow('Projects discovered', '6')}
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between gap-4">
          <h2 class="flex items-center gap-3 font-extrabold text-ink">
            <i class="fa-solid fa-clock-rotate-left text-violet-600"></i> Sync History
          </h2>
          <button class="font-extrabold text-brand-600 hover:text-brand-700">View all</button>
        </div>
        <div class="mt-4">
          ${syncRow('Just now')}
          ${syncRow('15 minutes ago')}
          ${syncRow('30 minutes ago')}
          ${syncRow('45 minutes ago')}
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-extrabold text-ink">Available Integrations</h2>
      <p class="mt-2 text-slate-500">More connections to supercharge your test workflow.</p>
      <div class="mt-5 grid gap-6 xl:grid-cols-3">
        ${availableIntegration('fa-brands fa-github', 'text-slate-950', 'GitHub', 'Link repositories and pull requests to your test cases.')}
        ${availableIntegration('fa-solid fa-pen-nib', 'text-orange-500', 'Postman', 'Import collections and sync API tests effortlessly.')}
        ${availableIntegration('fa-brands fa-slack', 'text-emerald-500', 'Slack', 'Get notifications and updates in your Slack channels.')}
      </div>
    </section>
  `;
}

Layout.renderShell('integrations');
App.bindGlobalActions();
renderIntegrations();
