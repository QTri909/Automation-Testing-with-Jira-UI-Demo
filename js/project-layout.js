window.ProjectLayout = (() => {
  const navItems = [
    { id: 'project-dashboard', label: 'Project Dashboard', href: 'project-dashboard.html', icon: 'fa-solid fa-table-cells-large' },
    { id: 'project-requirements', label: 'Requirements', href: 'project-requirements.html', icon: 'fa-regular fa-file-lines' },
    { id: 'project-test-cases', label: 'Test Cases', href: 'project-test-cases.html', icon: 'fa-regular fa-square-check' },
    { id: 'project-test-suites', label: 'Test Suites', href: 'project-test-suites.html', icon: 'fa-solid fa-layer-group' },
    { id: 'project-test-data', label: 'Test Data', href: 'project-test-data.html', icon: 'fa-solid fa-database' },
    { id: 'project-test-scripts', label: 'Test Scripts', href: 'project-test-scripts.html', icon: 'fa-solid fa-code' },
    { id: 'project-test-runs', label: 'Test Runs', href: 'project-test-runs.html', icon: 'fa-regular fa-circle-play' },
    { id: 'project-reports', label: 'Reports', href: 'project-reports.html', icon: 'fa-regular fa-chart-bar' },
    { id: 'project-settings', label: 'Settings', href: 'project-settings.html', icon: 'fa-solid fa-gear' }
  ];

  function render(activePage) {
    const sidebar = document.querySelector('#sidebar');
    const topbar = document.querySelector('#topbar');

    sidebar.innerHTML = `
      <div class="flex h-full flex-col px-4 py-5">
        <div class="mb-7 flex items-center justify-between gap-3 px-2">
          <div class="flex items-center gap-4">
            <div class="logo-mark sidebar-logo">T</div>
            <div>
              <p class="text-xl font-extrabold text-ink">TestFlow AI</p>
              <p class="text-sm font-medium text-slate-500">Default Workspace</p>
            </div>
          </div>
          <i class="fa-solid fa-chevron-down text-xs text-slate-500"></i>
        </div>

        <a href="workspaces.html" class="mb-5 flex items-center gap-4 rounded-lg px-3 py-3 font-bold text-ink hover:bg-brand-50 hover:text-brand-600">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Back to Workspace</span>
        </a>

        <nav class="space-y-2">
          ${navItems.map(item => `
            <a class="project-nav-item ${item.id === activePage ? 'active' : ''}" href="${item.href}">
              <i class="${item.icon}"></i>
              <span>${item.label}</span>
            </a>
          `).join('')}
        </nav>

        <div class="mt-auto space-y-4">
          <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="mb-3 flex items-center justify-between text-sm">
              <span class="font-bold text-ink">AI Credits</span>
              <span class="text-slate-500">2,340 / 5,000 used</span>
            </div>
            <div class="h-2 overflow-hidden rounded-full bg-slate-100">
              <div class="h-full w-[47%] rounded-full bg-brand-600"></div>
            </div>
            <p class="mt-3 text-sm text-slate-500">Resets in 15 days</p>
          </div>
          <div class="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="flex items-center gap-3">
              <div class="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600">
                <i class="fa-regular fa-circle-question"></i>
              </div>
              <div>
                <p class="text-sm font-bold text-ink">Need help?</p>
                <p class="text-sm text-slate-500">Visit our docs</p>
              </div>
            </div>
            <i class="fa-solid fa-arrow-up-right-from-square text-slate-500"></i>
          </div>
        </div>
      </div>
    `;

    topbar.innerHTML = `
      <div class="flex items-center justify-end gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button data-action="create-workspace" class="hidden items-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700 sm:flex">
          <i class="fa-solid fa-plus"></i> Create Workspace
        </button>
        <button class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <img class="h-9 w-9 rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80" alt="User avatar">
          <span class="hidden text-sm font-semibold text-ink sm:inline">Arjun Singh</span>
          <i class="fa-solid fa-chevron-down text-xs text-slate-500"></i>
        </button>
      </div>
    `;
  }

  return { render };
})();
