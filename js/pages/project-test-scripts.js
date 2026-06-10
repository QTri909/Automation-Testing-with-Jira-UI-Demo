const projectScripts = [
  { id: 'TS-001', file: 'login-valid.spec.js', framework: 'Playwright', status: 'Draft', active: true },
  { id: 'TS-002', file: 'login-invalid.spec.js', framework: 'Playwright', status: 'Ready' },
  { id: 'TS-003', file: 'account-lock.spec.js', framework: 'Playwright', status: 'Draft' },
  { id: 'TS-004', file: 'remember-me.spec.js', framework: 'Playwright', status: 'Ready' }
];

const codeLines = [
  '<span class="text-sky-400">const</span> { test, expect } = require(<span class="text-orange-300">\'@playwright/test\'</span>);',
  '',
  '<span class="text-sky-400">test</span>(<span class="text-orange-300">\'login with valid credentials\'</span>, <span class="text-sky-400">async</span> ({ page, context }) => {',
  '  <span class="text-sky-400">const</span> testData = context.testData;',
  '',
  '  <span class="text-violet-300">await</span> page.goto(process.env.BASE_URL + <span class="text-orange-300">\'/login\'</span>);',
  '',
  '  <span class="text-green-400">// Enter email</span>',
  '  <span class="text-violet-300">await</span> page.fill(<span class="text-orange-300">\'input[name="email"]\'</span>, testData.INPUT_EMAIL);',
  '',
  '  <span class="text-green-400">// Enter password</span>',
  '  <span class="text-violet-300">await</span> page.fill(<span class="text-orange-300">\'input[name="password"]\'</span>, testData.INPUT_PASSWORD);',
  '',
  '  <span class="text-green-400">// Submit the form</span>',
  '  <span class="text-violet-300">await</span> page.click(<span class="text-orange-300">\'button[type="submit"]\'</span>);',
  '',
  '  <span class="text-green-400">// Verify successful login</span>',
  '  <span class="text-violet-300">await</span> expect(page).toHaveURL(<span class="text-orange-300">/dashboard/</span>);',
  '});',
  ''
];

function scriptStatus(status) {
  const tone = status === 'Ready'
    ? 'bg-emerald-50 text-emerald-700'
    : 'bg-blue-50 text-indigo-600';
  return `<span class="rounded-md px-3 py-1 text-xs font-extrabold ${tone}">${status}</span>`;
}

function scriptListItem(script) {
  return `
    <article onclick="window.switchScriptTab('script-details', document.querySelector('.tab-btn[data-target=\\'script-details\\']'))" class="cursor-pointer rounded-xl border bg-white p-4 transition-colors hover:border-indigo-300 ${script.active ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200'}">
      <div class="flex items-start gap-3">
        <div class="pt-1">
          <span class="grid h-4 w-4 place-items-center rounded-full border-2 ${script.active ? 'border-indigo-600' : 'border-slate-300'}">
            ${script.active ? '<span class="h-2 w-2 rounded-full bg-indigo-600"></span>' : ''}
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <h2 class="truncate text-sm font-extrabold text-ink">${script.id} <span class="ml-1 text-slate-500">${script.file}</span></h2>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="rounded bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">${script.framework}</span>
            ${scriptStatus(script.status)}
          </div>
        </div>
      </div>
    </article>
  `;
}

function editorLine(line, index) {
  return `
    <div class="grid grid-cols-[42px_minmax(0,1fr)] gap-4">
      <span class="select-none text-right text-slate-500">${index + 1}</span>
      <code class="min-w-0 whitespace-pre">${line || ' '}</code>
    </div>
  `;
}

function detailRow(label, value) {
  return `
    <div class="grid gap-2 border-b border-slate-100 py-3 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-center">
      <p class="text-sm font-semibold text-slate-500">${label}</p>
      <div class="min-w-0 text-sm font-bold text-ink">${value}</div>
    </div>
  `;
}

function mappingRow(variable, mappedTo) {
  return `
    <tr class="border-t border-slate-200">
      <td class="px-5 py-3 text-sm font-bold text-ink">${variable}</td>
      <td class="px-5 py-2">
        <button class="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm font-bold text-ink hover:border-indigo-300">
          ${mappedTo}
          <i class="fa-solid fa-chevron-down text-xs text-slate-500"></i>
        </button>
      </td>
    </tr>
  `;
}

window.switchScriptTab = function(targetId, btnElement) {
  // Reset all tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active', 'border-indigo-600', 'font-extrabold', 'text-indigo-600');
    btn.classList.add('border-transparent', 'font-semibold', 'text-slate-500');
  });
  
  // Highlight clicked tab
  if (btnElement) {
    btnElement.classList.remove('border-transparent', 'font-semibold', 'text-slate-500');
    btnElement.classList.add('active', 'border-indigo-600', 'font-extrabold', 'text-indigo-600');
  }

  // Hide all panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.style.display = 'none';
    pane.classList.remove('active');
  });
  
  // Show target pane
  const targetPane = document.getElementById(targetId);
  if (targetPane) {
    targetPane.style.display = targetId === 'code-editor' ? 'flex' : 'block';
    targetPane.classList.add('active');
  }
};

function renderProjectTestScripts() {
  App.qs('#pageContent').innerHTML = `
    <section style="display: flex; gap: 24px; height: calc(100vh - 120px); overflow: hidden;">
      
      <!-- Cột 1: Danh sách Scripts -->
      <aside class="card p-5" style="width: 320px; flex-shrink: 0; display: flex; flex-direction: column; overflow: hidden;">
        <h1 class="text-2xl font-extrabold text-ink shrink-0">Test Scripts</h1>

        <div class="mt-6 flex gap-3 shrink-0">
          <button data-action="generate-script" class="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-500 bg-white px-2 py-2.5 font-bold text-indigo-600 hover:bg-violet-50 text-sm">
            <i class="fa-solid fa-wand-magic-sparkles"></i> AI Gen
          </button>
          <button data-action="new-script" class="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-2 py-2.5 font-bold text-white shadow-sm hover:bg-indigo-700 text-sm">
            <i class="fa-solid fa-plus"></i> New
          </button>
        </div>

        <div class="mt-5 flex gap-3 shrink-0">
          <label class="relative block min-w-0 flex-1">
            <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input class="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold outline-none focus:border-brand-500" placeholder="Search scripts...">
          </label>
        </div>

        <div class="mt-5 flex-1 overflow-y-auto hide-scrollbar space-y-3 pb-4">
          ${projectScripts.map(scriptListItem).join('')}
        </div>
      </aside>

      <!-- Cột 2: Main Workspace (Tabs) -->
      <article style="flex: 1; min-width: 0; display: flex; flex-direction: column; background: #ffffff; border-radius: 12px; box-shadow: 0 10px 30px rgba(31, 45, 74, 0.06); border: 1px solid #e2e8f0; overflow: hidden;">
        
        <!-- Header & Tabs -->
        <div class="flex items-center justify-between border-b border-slate-200 px-6 pt-5 bg-slate-50 shrink-0">
          <div class="flex gap-8" id="scriptTabs">
            <button class="tab-btn active border-b-2 border-indigo-600 pb-4 text-[15px] font-extrabold text-indigo-600 outline-none" data-target="script-details" onclick="window.switchScriptTab('script-details', this)">
              ⚙️ Script Details
            </button>
            <button class="tab-btn border-b-2 border-transparent pb-4 text-[15px] font-semibold text-slate-500 hover:text-indigo-600 outline-none" data-target="code-editor" onclick="window.switchScriptTab('code-editor', this)">
              💻 Code Editor
            </button>
          </div>
          
          <div class="flex gap-3 pb-4">
            <button data-action="save-script" class="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-extrabold text-indigo-600 hover:border-indigo-300">
              <i class="fa-regular fa-floppy-disk"></i> Save
            </button>
            <button data-action="run-script" class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm hover:bg-indigo-700">
              <i class="fa-solid fa-play"></i> Run
            </button>
          </div>
        </div>

        <!-- Tab Content Area -->
        <div class="tab-content-area" style="flex: 1; overflow: hidden; position: relative;">
          
          <!-- PANE 1: Script Details -->
          <div id="script-details" class="tab-pane active h-full w-full overflow-y-auto p-6 lg:p-8" style="display: block;">
            
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-extrabold text-ink">
                <i class="fa-regular fa-file-lines mr-3 text-slate-400"></i>
                TS-001 <span class="text-slate-500 ml-2 text-xl">login-valid.spec.js</span>
              </h2>
              <button data-action="open-linked-test-case" class="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-indigo-600 hover:border-indigo-300">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Test Case
              </button>
            </div>

            <div class="grid 2xl:grid-cols-2 gap-8">
              <!-- Left Col: Details -->
              <div>
                <h3 class="text-lg font-extrabold text-ink mb-4">Configuration</h3>
                <div class="rounded-xl border border-slate-200 bg-white p-5">
                  ${detailRow('Linked Test Case', '<a class="text-indigo-600" href="project-test-cases.html">TC-001 Verify login with valid credentials</a>')}
                  ${detailRow('Linked Requirement', '<a class="text-indigo-600" href="project-requirements.html">ATP-12 - Login with email and password</a>')}
                  ${detailRow('Framework', '<span class="inline-flex items-center gap-2 font-bold"><i class="fa-solid fa-masks-theater text-slate-400"></i> Playwright</span>')}
                  ${detailRow('Language', '<span class="inline-flex items-center gap-2 font-bold"><span class="rounded bg-yellow-300 px-1.5 py-0.5 text-[10px] font-black text-ink uppercase">JS</span> JavaScript</span>')}
                  ${detailRow('Status', scriptStatus('Draft'))}
                </div>

                <div class="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm font-semibold leading-6 text-amber-900">
                  <i class="fa-solid fa-triangle-exclamation mr-3 text-amber-500 text-lg"></i>
                  This script is generated as draft.<br>
                  <span class="ml-8 text-amber-700">Review locators and mappings before execution.</span>
                </div>
              </div>

              <!-- Right Col: Data Mapping -->
              <div>
                <h3 class="text-lg font-extrabold text-ink mb-4">Data Mapping</h3>
                <div class="overflow-hidden rounded-xl border border-slate-200">
                  <table class="min-w-full text-left">
                    <thead class="bg-slate-50">
                      <tr>
                        <th class="px-5 py-3.5 text-sm font-extrabold text-ink">Script Variable</th>
                        <th class="px-5 py-3.5 text-sm font-extrabold text-ink">Map to Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${mappingRow('INPUT_EMAIL', 'email')}
                      ${mappingRow('INPUT_PASSWORD', 'password')}
                      ${mappingRow('EXPECTED_STATUS', 'expected_status')}
                    </tbody>
                  </table>
                </div>
                
                <div class="mt-5 flex items-center justify-between">
                  <p class="flex items-center gap-2 text-sm font-bold text-emerald-600">
                    <i class="fa-regular fa-circle-check text-lg"></i>
                    3 of 3 variables mapped
                  </p>
                  <button data-action="save-mapping" class="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200">
                    Save Mapping
                  </button>
                </div>
              </div>
            </div>

          </div>
          
          <!-- PANE 2: Code Editor -->
          <div id="code-editor" class="tab-pane h-full w-full flex flex-col" style="display: none;">
            <div class="code-editor flex-1 overflow-auto bg-[#151c20] p-6 text-[15px] font-mono leading-relaxed tracking-wide">
              <div class="min-w-[680px]">
                ${codeLines.map(editorLine).join('')}
              </div>
            </div>
            <div class="flex items-center justify-between gap-3 bg-[#20272c] px-6 py-3 text-[13px] font-semibold text-slate-400 shrink-0">
              <span class="flex items-center gap-2"><i class="fa-solid fa-code"></i> JavaScript</span>
              <span class="flex gap-8"><span>Ln 1, Col 1</span><span>Spaces: 2</span><span>UTF-8</span></span>
            </div>
          </div>

        </div>
      </article>

    </section>
  `;
}

ProjectLayout.render('project-test-scripts');
App.bindGlobalActions();
renderProjectTestScripts();
