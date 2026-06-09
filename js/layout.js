window.Layout = (() => {
  function renderShell(activePage) {
    const active = MockData.navItems.find(item => item.id === activePage) || MockData.navItems[0];
    const topbarTitle = ['dashboard', 'workspaces', 'integrations', 'settings'].includes(activePage)
      ? MockData.workspace.name
      : active.label;
    const activeSubtitle = activePage === 'dashboard' && App.isJiraConnected()
      ? 'Workspace overview'
      : activePage === 'workspaces'
        ? 'Projects'
      : ['integrations', 'settings'].includes(activePage)
        ? active.label
      : active.subtitle;
    const sidebar = document.querySelector('#sidebar');
    const topbar = document.querySelector('#topbar');

    sidebar.innerHTML = `
      <div class="flex h-full flex-col px-5 py-7">
        <div class="mb-10 flex items-center gap-4 px-1">
          <div class="logo-mark sidebar-logo">T</div>
          <span class="text-xl font-extrabold text-ink">TestFlow AI</span>
        </div>

        <button class="mb-8 flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-4 text-left shadow-sm hover:border-brand-200">
          <span class="flex items-center gap-3">
            <i class="fa-solid fa-users text-ink"></i>
            <span class="block font-semibold text-ink">${MockData.workspace.name}</span>
          </span>
          <i class="fa-solid fa-chevron-down text-xs text-slate-500"></i>
        </button>

        <nav class="space-y-4">
          ${MockData.navItems.map(item => `
            <a class="nav-item ${item.id === activePage ? 'active' : ''}" href="${item.href}">
              <i class="${item.icon}"></i>
              <span>${item.label}</span>
            </a>
          `).join('')}
        </nav>

        <div class="mt-auto space-y-4">
          <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div class="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-bold text-ink">Need help?</p>
                <p class="mt-1 text-sm text-slate-500">View docs & support</p>
              </div>
              <i class="fa-solid fa-arrow-right text-brand-600"></i>
            </div>
          </div>
        </div>
      </div>
    `;

    topbar.innerHTML = `
      <div class="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex min-w-0 items-center gap-3">
          <button id="mobileMenuBtn" class="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 text-slate-600 lg:hidden">
            <i class="fa-solid fa-bars"></i>
          </button>
          <div class="min-w-0">
            <h1 class="truncate text-2xl font-extrabold text-ink">${topbarTitle}</h1>
            <p class="truncate text-sm text-slate-500">${activeSubtitle}</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button data-action="create-workspace" class="hidden items-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700 sm:flex">
            <i class="fa-solid fa-plus"></i> Create Workspace
          </button>
          <button class="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <img class="h-9 w-9 rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80" alt="User avatar">
            <span class="hidden text-sm font-semibold text-ink sm:inline">Arjun Singh</span>
            <i class="fa-solid fa-chevron-down text-xs text-slate-500"></i>
          </button>
        </div>
      </div>
    `;

    document.querySelector('#mobileMenuBtn')?.addEventListener('click', () => {
      document.querySelector('#sidebar').classList.remove('-translate-x-full');
      document.querySelector('#sidebarOverlay').classList.remove('hidden');
    });

    document.querySelector('#sidebarOverlay')?.addEventListener('click', () => {
      document.querySelector('#sidebar').classList.add('-translate-x-full');
      document.querySelector('#sidebarOverlay').classList.add('hidden');
    });
  }

  return { renderShell };
})();
