function renderTestRuns() {
  App.qs('#pageContent').innerHTML = `
    <div class="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <div class="card p-6">
        <h2 class="text-xl font-extrabold text-ink">Recent Test Runs</h2>
        <div class="mt-5 space-y-4">
          ${MockData.testRuns.map(run => `
            <div class="flex items-center justify-between rounded-lg border border-slate-100 p-4">
              <div>
                <p class="font-bold text-ink">${run.name}</p>
                <p class="mt-1 text-sm text-slate-500">${run.time}</p>
              </div>
              ${App.badge(run.status, run.status === 'Failed' ? 'red' : run.status === 'Queued' ? 'amber' : 'emerald')}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="card p-6">
        <h2 class="text-xl font-extrabold text-ink">Run Summary</h2>
        <div class="mt-6 grid grid-cols-3 gap-3 text-center">
          <div class="rounded-lg bg-emerald-50 p-4"><p class="text-2xl font-extrabold text-emerald-600">124</p><p class="text-xs font-bold text-slate-500">Passed</p></div>
          <div class="rounded-lg bg-red-50 p-4"><p class="text-2xl font-extrabold text-red-600">9</p><p class="text-xs font-bold text-slate-500">Failed</p></div>
          <div class="rounded-lg bg-amber-50 p-4"><p class="text-2xl font-extrabold text-amber-600">17</p><p class="text-xs font-bold text-slate-500">Queued</p></div>
        </div>
      </div>
    </div>
  `;
}

Layout.renderShell('test-runs');
App.bindGlobalActions();
renderTestRuns();
