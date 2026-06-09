function renderTestCases() {
  App.qs('#pageContent').innerHTML = `
    <div class="card p-5 sm:p-6">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 class="text-xl font-extrabold text-ink">Generated Test Cases</h2>
          <p class="mt-1 text-sm text-slate-500">Review AI-generated test cases before adding them to a test run.</p>
        </div>
        <button data-action="sync" class="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-700">
          <i class="fa-solid fa-wand-magic-sparkles mr-2"></i> Generate Tests
        </button>
      </div>
      ${App.table(['ID', 'Title', 'Type', 'Confidence'], MockData.testCases.map(item => [
        item.id,
        item.title,
        item.type,
        `<span class="font-bold text-emerald-600">${item.confidence}%</span>`
      ]))}
    </div>
  `;
}

Layout.renderShell('test-cases');
App.bindGlobalActions();
renderTestCases();
