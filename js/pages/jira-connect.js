function renderAtlassianAuthorization() {
  App.qs('#pageContent').innerHTML = `
    <div class="min-h-screen bg-white px-5 py-8 text-slate-700 sm:px-8">
      <div class="mx-auto max-w-[430px]">
        <div class="mb-5 flex justify-center">
          <div class="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-blue-600">
            <i class="fa-brands fa-atlassian"></i>
            <span>ATLASSIAN</span>
          </div>
        </div>

        <section class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex gap-4">
            <div class="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-blue-50 text-3xl text-blue-600">
              <i class="fa-solid fa-gear"></i>
            </div>
            <div>
              <h1 class="text-xl font-extrabold leading-tight text-slate-900">Automation System wants to</h1>
              <p class="text-xl leading-tight text-slate-700">access your Atlassian account</p>
            </div>
          </div>

          <div class="mt-5 rounded-md border border-slate-200 bg-slate-50 p-3">
            <div class="flex items-center gap-3">
              <img class="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80" alt="Arjun Singh avatar">
              <div class="min-w-0 flex-1">
                <p class="text-xs font-semibold text-slate-500">Signed in as</p>
                <p class="truncate text-sm font-extrabold text-slate-900">Arjun Singh</p>
                <p class="truncate text-xs text-slate-500">arjun.singh@example.com</p>
              </div>
              <button class="shrink-0 text-xs font-extrabold text-blue-600 hover:text-blue-700">
                Switch account
              </button>
            </div>
          </div>

          <label class="mt-5 block">
            <span class="text-xs font-extrabold text-slate-700">Authorize for site</span>
            <select class="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500">
              <option>testflow-ai.atlassian.net</option>
              <option>quality-lab.atlassian.net</option>
            </select>
          </label>

          <div class="mt-5">
            <p class="text-xs font-extrabold text-slate-700">This will allow Automation System to:</p>
            <div class="mt-4 space-y-4">
              ${permissionRow('fa-brands fa-jira', 'View Jira work and issues', 'read:jira-work')}
              ${permissionRow('fa-solid fa-user', 'View user profiles', 'read:me')}
              ${permissionRow('fa-solid fa-clock-rotate-left', 'Manage webhooks', 'write:webhook:jira')}
              ${permissionRow('fa-solid fa-magnifying-glass-chart', 'View project and issue data', 'read:project:jira')}
            </div>
          </div>

          <p class="mt-6 text-xs leading-5 text-slate-500">
            By accepting, you agree to Automation System's
            <a href="#" class="font-bold text-blue-600">privacy policy</a>
            and
            <a href="#" class="font-bold text-blue-600">terms of use</a>.
          </p>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button id="cancelAuthBtn" class="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button id="acceptAuthBtn" class="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700">
              Accept
            </button>
          </div>
        </section>
      </div>
    </div>
  `;

  App.qs('#cancelAuthBtn')?.addEventListener('click', () => {
    window.close();
  });

  App.qs('#acceptAuthBtn')?.addEventListener('click', () => {
    App.fakeLoading(() => {
      if (window.opener && !window.opener.closed) {
        window.opener.postMessage({ type: 'testflow:jira-authorized' }, '*');
      }
      window.close();
      App.showToast('Atlassian authorization accepted for demo.');
    });
  });
}

function permissionRow(icon, title, scope) {
  return `
    <div class="flex gap-3">
      <span class="mt-0.5 w-5 shrink-0 text-center text-blue-600">
        <i class="${icon}"></i>
      </span>
      <span>
        <span class="block text-sm font-extrabold leading-5 text-slate-700">${title}</span>
        <span class="block text-xs text-slate-500">${scope}</span>
      </span>
    </div>
  `;
}

renderAtlassianAuthorization();
