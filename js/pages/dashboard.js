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

function statCard(icon, bgClass, textClass, label, value, delta) {
  return `
    <div class="card p-6">
      <div class="flex items-start gap-5">
        <div class="grid h-14 w-14 shrink-0 place-items-center rounded-lg ${bgClass} text-2xl ${textClass}">
          <i class="${icon}"></i>
        </div>
        <div>
          <p class="text-sm font-semibold text-slate-500">${label}</p>
          <p class="mt-2 text-3xl font-extrabold text-ink">${value}</p>
        </div>
      </div>
      <p class="mt-6 text-sm text-slate-500">
        <span class="font-bold text-emerald-500"><i class="fa-solid fa-arrow-up"></i> ${delta}</span> from last 7 days
      </p>
    </div>
  `;
}

function activityRow(icon, bgClass, textClass, title, subtitle, project, user, avatar, time) {
  return `
    <tr class="border-t border-slate-200">
      <td class="px-6 py-4">
        <div class="flex items-center gap-4">
          <div class="grid h-10 w-10 place-items-center rounded-lg ${bgClass} ${textClass}">
            <i class="${icon}"></i>
          </div>
          <div>
            <p class="font-extrabold text-ink">${title}</p>
            <p class="mt-1 text-sm text-slate-500">${subtitle}</p>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 text-slate-600">
        <span class="inline-flex items-center gap-3">
          ${project === '-' ? '<span>-</span>' : `<i class="fa-regular fa-folder text-brand-600"></i> ${project}`}
        </span>
      </td>
      <td class="px-6 py-4">
        <span class="inline-flex items-center gap-3">
          <img class="h-8 w-8 rounded-full object-cover" src="${avatar}" alt="${user} avatar">
          <span class="font-medium text-slate-600">${user}</span>
        </span>
      </td>
      <td class="px-6 py-4 text-slate-500">${time}</td>
    </tr>
  `;
}

function connectedOverview() {
  const arjunAvatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80';
  const priyaAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80';
  const nehaAvatar = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=96&q=80';

  return `
    <section class="card p-6 lg:p-8">
      <div class="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-4">
            <i class="fa-brands fa-jira text-4xl text-brand-600"></i>
            <h2 class="text-xl font-extrabold text-ink">Jira</h2>
            <p class="text-lg font-extrabold text-ink">Connected to testflow-ai.atlassian.net</p>
            <span class="badge bg-emerald-50 text-emerald-700">
              <i class="fa-solid fa-circle text-[0.45rem]"></i> Connected
            </span>
          </div>
          <div class="mt-8 grid gap-5 text-sm md:grid-cols-3">
            <div class="flex items-center gap-4">
              <div class="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 text-xl text-ink">
                <i class="fa-regular fa-envelope"></i>
              </div>
              <div>
                <p class="font-extrabold text-ink">arjun.singh@testflowai.com</p>
                <p class="mt-1 text-slate-500">Connected account</p>
              </div>
            </div>
            <div class="flex items-center gap-4 border-slate-200 md:border-l md:pl-8">
              <div class="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 text-xl text-ink">
                <i class="fa-regular fa-clock"></i>
              </div>
              <div>
                <p class="font-extrabold text-ink">Just now</p>
                <p class="mt-1 text-slate-500">Last sync</p>
              </div>
            </div>
            <div class="flex items-center gap-4 border-slate-200 md:border-l md:pl-8">
              <div class="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 text-xl text-ink">
                <i class="fa-solid fa-rotate"></i>
              </div>
              <div>
                <p class="font-extrabold text-ink">Every 15 minutes</p>
                <p class="mt-1 text-slate-500">Sync frequency</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex shrink-0 flex-col gap-3 sm:flex-row xl:flex-col">
          <button data-action="sync" class="inline-flex items-center justify-center gap-3 rounded-lg bg-brand-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
            <i class="fa-solid fa-arrows-rotate"></i> Sync Projects
          </button>
          <button data-action="manage-connection" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-6 py-3.5 font-bold text-ink hover:border-brand-200 hover:text-brand-600">
            <i class="fa-solid fa-gear"></i> Manage Connection
          </button>
        </div>
      </div>
    </section>

    <section class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      ${statCard('fa-regular fa-folder-open', 'bg-blue-50', 'text-blue-600', 'Total Projects', '18', '2')}
      ${statCard('fa-solid fa-link', 'bg-emerald-50', 'text-emerald-600', 'Synced Jira Issues', '1,248', '8.4%')}
      ${statCard('fa-solid fa-wand-magic-sparkles', 'bg-violet-50', 'text-violet-600', 'Generated Test Cases', '3,672', '12.7%')}
      ${statCard('fa-regular fa-circle-play', 'bg-orange-50', 'text-orange-600', 'Recent Test Runs', '245', '15.3%')}
    </section>

    <section class="card overflow-hidden">
      <div class="flex flex-col gap-4 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-lg font-extrabold text-ink">Recent Activity</h2>
          <p class="mt-1 text-slate-500">A global view of what's happening across your workspace.</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <button class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-ink hover:border-brand-200">
            <i class="fa-solid fa-filter"></i> All Projects <i class="fa-solid fa-chevron-down text-xs text-slate-500"></i>
          </button>
          <button class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-ink hover:border-brand-200">
            <i class="fa-regular fa-calendar"></i> All Events <i class="fa-solid fa-chevron-down text-xs text-slate-500"></i>
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-left text-sm">
          <thead class="bg-white text-xs uppercase text-slate-500">
            <tr>
              <th class="px-6 py-4 font-extrabold">Event</th>
              <th class="px-6 py-4 font-extrabold">Project</th>
              <th class="px-6 py-4 font-extrabold">User</th>
              <th class="px-6 py-4 font-extrabold">Time</th>
            </tr>
          </thead>
          <tbody>
            ${activityRow('fa-solid fa-arrows-rotate', 'bg-blue-50', 'text-blue-600', 'Project sync completed', 'Synced 128 issues from Jira', 'Web Application', 'Arjun Singh', arjunAvatar, 'Just now')}
            ${activityRow('fa-solid fa-wand-magic-sparkles', 'bg-violet-50', 'text-violet-600', 'Generated test cases', 'Generated 24 test cases using TestFlow AI', 'Mobile App', 'Priya Sharma', priyaAvatar, '8 minutes ago')}
            ${activityRow('fa-solid fa-link', 'bg-emerald-50', 'text-emerald-600', 'Jira connection updated', 'Connection settings were updated', '-', 'Arjun Singh', arjunAvatar, '32 minutes ago')}
            ${activityRow('fa-regular fa-circle-play', 'bg-orange-50', 'text-orange-600', 'Test run completed', 'Executed 48 test cases', 'Customer Portal', 'Neha Verma', nehaAvatar, '1 hour ago')}
            ${activityRow('fa-regular fa-folder-open', 'bg-blue-50', 'text-blue-600', 'Project created', 'Manual project created', 'Internal Tools', 'Arjun Singh', arjunAvatar, '2 hours ago')}
          </tbody>
        </table>
      </div>
      <div class="border-t border-slate-200 py-4 text-center">
        <button class="font-extrabold text-brand-600 hover:text-brand-700">View all activity</button>
      </div>
    </section>
  `;
}

function renderDashboard() {
  const connected = App.isJiraConnected();
  if (connected) {
    App.qs('#pageContent').innerHTML = connectedOverview();
    return;
  }

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
