function stat(icon, bgClass, textClass, label, value) {
  return `
    <article class="card flex items-center gap-4 p-4">
      <div class="grid h-12 w-12 place-items-center rounded-lg ${bgClass} text-xl ${textClass}">
        <i class="${icon}"></i>
      </div>
      <div>
        <p class="text-sm font-semibold text-slate-500">${label}</p>
        <p class="text-2xl font-extrabold text-ink">${value}</p>
      </div>
    </article>
  `;
}

function filter(label, active = false) {
  return `<button class="rounded-lg border ${active ? 'border-brand-500 bg-brand-50 text-brand-600' : 'border-slate-200 bg-white text-slate-600'} px-4 py-2.5 text-sm font-semibold hover:border-brand-200">${label}</button>`;
}

function testCaseItem(id, title, status, active = false) {
  const tone = status === 'Draft' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600';
  return `
    <button class="w-full rounded-lg border ${active ? 'border-brand-500 bg-brand-50 shadow-sm' : 'border-slate-200 bg-white'} p-4 text-left hover:border-brand-200">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="font-extrabold text-brand-600">${id}</p>
          <p class="mt-2 font-semibold text-ink">${title}</p>
        </div>
        <span class="rounded-lg px-3 py-2 text-sm font-bold ${tone}">${status}</span>
        ${active ? '<i class="fa-solid fa-chevron-right text-ink"></i>' : ''}
      </div>
    </button>
  `;
}

function metaItem(icon, label, value, tone = 'text-brand-600') {
  return `
    <div class="flex items-start gap-3 border-slate-200 lg:border-l lg:pl-6 first:border-l-0 first:pl-0">
      <div class="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 text-brand-600">
        <i class="${icon}"></i>
      </div>
      <div>
        <p class="text-sm font-semibold text-slate-500">${label}</p>
        <p class="mt-1 font-extrabold ${tone}">${value}</p>
      </div>
    </div>
  `;
}

function stepRow(step, action, expected) {
  return `
    <tr class="border-t border-slate-200">
      <td class="w-24 px-5 py-3 text-center">${step}</td>
      <td class="px-5 py-3">${action}</td>
      <td class="px-5 py-3">${expected}</td>
    </tr>
  `;
}

function dataRow(name, value) {
  return `
    <tr class="border-t border-slate-200">
      <td class="px-5 py-3 font-semibold text-ink">${name}</td>
      <td class="px-5 py-3">${value}</td>
    </tr>
  `;
}

function renderProjectTestCases() {
  App.qs('#pageContent').innerHTML = `
    <section class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-ink">Test Cases</h1>
        <div class="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          ${stat('fa-regular fa-file-lines', 'bg-violet-50', 'text-violet-600', 'Total', '248')}
          ${stat('fa-regular fa-square-check', 'bg-emerald-50', 'text-emerald-600', 'Approved', '164')}
          ${stat('fa-regular fa-clock', 'bg-blue-50', 'text-blue-600', 'Ready', '52')}
          ${stat('fa-solid fa-pencil', 'bg-orange-50', 'text-orange-600', 'Draft', '32')}
        </div>
      </div>
      <div class="flex flex-col gap-3 sm:flex-row">
        <button data-action="create-test-case" class="inline-flex items-center justify-center gap-3 rounded-lg bg-brand-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-brand-700">
          <i class="fa-solid fa-plus"></i> Create Test Case
        </button>
        <button data-action="generate-tests" class="inline-flex items-center justify-center gap-3 rounded-lg border border-brand-500 bg-white px-6 py-3.5 font-bold text-brand-600 hover:bg-brand-50">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Generate from Requirements
        </button>
      </div>
    </section>

    <section style="display: flex; gap: 24px; align-items: flex-start;" class="flex-col xl:flex-row">
      <aside class="card p-4 w-full xl:w-auto" style="width: 320px; flex-shrink: 0;">
        <div class="flex gap-3">
          <label class="relative block flex-1">
            <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input class="w-full rounded-lg border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none focus:border-brand-500" placeholder="Search test cases...">
          </label>
          <button class="grid h-12 w-12 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:border-brand-200">
            <i class="fa-solid fa-sliders"></i>
          </button>
        </div>
        <div class="mt-4 flex flex-wrap gap-3">
          ${filter('All', true)}
          ${filter('Draft')}
          ${filter('Ready')}
          ${filter('Approved')}
          ${filter('Missing Script')}
        </div>
        <div class="mt-5 space-y-3">
          ${testCaseItem('TC-001', 'Verify login with valid credentials', 'Ready', true)}
          ${testCaseItem('TC-002', 'Verify login with wrong password', 'Draft')}
          ${testCaseItem('TC-003', 'Verify account lock after 5 failed attempts', 'Ready')}
          ${testCaseItem('TC-004', 'Verify reset password email sent', 'Approved')}
          ${testCaseItem('TC-005', 'Verify session timeout redirect', 'Ready')}
        </div>
        <div class="mt-6 flex items-center justify-between text-slate-500">
          <span>1 - 5 of 248</span>
          <div class="flex items-center gap-3">
            <button class="grid h-9 w-9 place-items-center rounded-lg border border-slate-200"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="grid h-9 w-9 place-items-center rounded-lg border border-brand-500 text-brand-600">1</button>
            <span>2</span><span>3</span><span>...</span><span>50</span>
            <button class="grid h-9 w-9 place-items-center rounded-lg border border-slate-200"><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </aside>

      <article class="card p-6" style="flex: 1; min-width: 0;">
        <div class="border-b border-slate-200 pb-5">
          <h2 class="text-xl font-extrabold text-ink"><span class="text-brand-600">TC-001</span> <span class="ml-4">Verify login with valid credentials</span></h2>
        </div>
        <div class="mt-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 16px; align-items: start;">
          ${metaItem('fa-regular fa-file-lines', 'Linked Requirement', 'ATP-12 - Login with email and password')}
          ${metaItem('fa-solid fa-list-check', 'Covered AC', 'AC-1')}
          ${metaItem('fa-solid fa-arrow-up', 'Priority', 'High', 'text-ink')}
          ${metaItem('fa-solid fa-layer-group', 'Status', '<span class="text-emerald-600"><i class="fa-solid fa-circle text-[0.45rem]"></i></span> Ready', 'text-ink')}
          ${metaItem('fa-solid fa-wand-magic-sparkles', 'Generated By', 'AI', 'text-ink')}
        </div>

        <div class="mt-7">
          <h3 class="font-extrabold text-ink">Preconditions</h3>
          <div class="mt-3 rounded-lg border border-slate-200 px-4 py-4">User is registered and has an active account in the system.</div>
        </div>

        <div class="mt-7">
          <h3 class="font-extrabold text-ink">Steps</h3>
          <div class="mt-3 overflow-hidden rounded-lg border border-slate-200">
            <table class="min-w-full text-left text-sm">
              <thead class="bg-slate-50">
                <tr>
                  <th class="w-24 px-5 py-3 text-center font-extrabold">Step</th>
                  <th class="px-5 py-3 font-extrabold">Action</th>
                  <th class="px-5 py-3 font-extrabold">Expected Result</th>
                </tr>
              </thead>
              <tbody>
                ${stepRow(1, 'Navigate to the login page.', 'Login page is displayed successfully.')}
                ${stepRow(2, 'Enter valid email and password.', 'Credentials are accepted.')}
                ${stepRow(3, 'Click on the "Login" button.', 'User is authenticated.')}
                ${stepRow(4, 'Verify successful login and dashboard.', 'User is redirected to the dashboard.')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="mt-7">
          <h3 class="font-extrabold text-ink">Test Data</h3>
          <div class="mt-3 overflow-hidden rounded-lg border border-slate-200">
            <table class="min-w-full text-left text-sm">
              <tbody>
                ${dataRow('valid_user_email', 'john.doe@example.com')}
                ${dataRow('valid_user_password', 'SecurePass@123')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <button data-action="edit-test-case" class="rounded-lg border border-slate-300 bg-white px-5 py-4 font-extrabold text-ink hover:border-brand-200"><i class="fa-solid fa-pencil mr-2"></i> Edit</button>
          <button data-action="approve-test-case" class="rounded-lg border border-emerald-300 bg-white px-5 py-4 font-extrabold text-emerald-600 hover:bg-emerald-50"><i class="fa-regular fa-circle-check mr-2"></i> Approve</button>
          <button data-action="generate-script" class="rounded-lg border border-brand-500 bg-white px-5 py-4 font-extrabold text-brand-600 hover:bg-brand-50"><i class="fa-solid fa-code mr-2"></i> Generate Script</button>
          <button data-action="add-to-suite" class="rounded-lg border border-brand-500 bg-white px-5 py-4 font-extrabold text-brand-600 hover:bg-brand-50"><i class="fa-solid fa-layer-group mr-2"></i> Add to Suite</button>
        </div>
      </article>
    </section>
  `;
}

ProjectLayout.render('project-test-cases');
App.bindGlobalActions();
renderProjectTestCases();
