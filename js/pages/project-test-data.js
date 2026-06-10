const testDataSets = [
  {
    name: 'Login Valid Users',
    format: 'Table',
    count: '12 rows',
    usage: '5 test cases',
    icon: 'fa-solid fa-table-cells-large',
    active: true
  },
  {
    name: 'Invalid Login Edge Cases',
    format: 'Table',
    count: '20 rows',
    usage: '8 test cases',
    icon: 'fa-solid fa-table-cells-large'
  },
  {
    name: 'Profile Update Payloads',
    format: 'JSON',
    count: '6 objects',
    usage: '2 test cases',
    icon: 'fa-solid fa-braces'
  },
  {
    name: 'Security Negative Inputs',
    format: 'AI Generated',
    count: '15 rows',
    usage: '4 test cases',
    icon: 'fa-solid fa-wand-magic-sparkles'
  }
];

const loginRows = [
  ['1', 'jane.doe@example.com', 'ValidPass@123', 'success', 'user'],
  ['2', 'admin@example.com', 'AdminPass@456', 'success', 'admin'],
  ['3', 'john.smith@example.com', 'UserPass@789', 'success', 'user'],
  ['4', 'sarah.connor@example.com', 'S@rahP@ss!2024', 'success', 'user'],
  ['5', 'test.user+alias@example.com', 'ValidPass@123', 'success', 'user'],
  ['6', 'user.name@example.com', 'ValidPass@123', 'success', 'user']
];

function dataFilter(label, active = false) {
  return `
    <button class="rounded-lg border px-4 py-2.5 text-sm font-bold ${active ? 'border-violet-100 bg-violet-50 text-indigo-600' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-200'}">
      ${label}
    </button>
  `;
}

function dataSetCard(dataSet) {
  return `
    <article class="rounded-xl border bg-white p-5 ${dataSet.active ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-200'}">
      <div class="flex items-center gap-4">
        <div class="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-violet-50 text-xl text-indigo-600">
          <i class="${dataSet.icon}"></i>
        </div>
        <div class="min-w-0 flex-1">
          <h2 class="truncate font-extrabold ${dataSet.active ? 'text-indigo-600' : 'text-ink'}">${dataSet.name}</h2>
          <p class="mt-2 truncate text-sm font-semibold text-slate-600">
            ${dataSet.format} <span class="mx-2 text-slate-400">•</span> ${dataSet.count} <span class="mx-2 text-slate-400">•</span> ${dataSet.usage}
          </p>
        </div>
        ${dataSet.active
          ? '<div class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-indigo-600 text-white"><i class="fa-solid fa-check"></i></div>'
          : '<button class="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink hover:bg-slate-100"><i class="fa-solid fa-ellipsis-vertical"></i></button>'
        }
      </div>
    </article>
  `;
}

function dataTableRow(row) {
  return `
    <tr class="border-t border-slate-200">
      <td class="w-12 px-4 py-5 text-center">
        <input type="checkbox" class="h-5 w-5 rounded border-slate-300 accent-indigo-600">
      </td>
      <td class="w-16 px-4 py-5 text-center font-bold text-ink">${row[0]}</td>
      <td class="min-w-[240px] px-5 py-5 font-semibold text-ink">${row[1]}</td>
      <td class="min-w-[210px] px-5 py-5 font-semibold text-ink">${row[2]}</td>
      <td class="min-w-[190px] px-5 py-5">
        <span class="rounded-md bg-emerald-50 px-4 py-2 text-sm font-extrabold text-emerald-700">${row[3]}</span>
      </td>
      <td class="min-w-[160px] px-5 py-5 font-semibold text-ink">${row[4]}</td>
    </tr>
  `;
}

function renderProjectTestData() {
  App.qs('#pageContent').innerHTML = `
    <section class="grid gap-5 xl:grid-cols-[430px_minmax(0,1fr)]">
      <aside class="card p-5">
        <h1 class="text-2xl font-extrabold text-ink">Test Data</h1>

        <div class="mt-7 flex gap-3">
          <label class="relative block min-w-0 flex-1">
            <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input class="w-full rounded-lg border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm font-semibold outline-none focus:border-brand-500" placeholder="Search data sets...">
          </label>
          <button class="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-brand-200">
            <i class="fa-solid fa-filter"></i>
          </button>
        </div>

        <div class="mt-5 flex flex-wrap gap-3">
          ${dataFilter('All', true)}
          ${dataFilter('CSV')}
          ${dataFilter('JSON')}
          ${dataFilter('AI Generated')}
        </div>

        <div class="mt-7 space-y-5">
          ${testDataSets.map(dataSetCard).join('')}
        </div>

        <div class="mt-28 flex items-center justify-between text-sm font-semibold text-slate-600">
          <p>Showing 1 - 4 of 4</p>
          <div class="flex items-center gap-3">
            <button class="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="grid h-11 w-11 place-items-center rounded-lg bg-indigo-600 font-extrabold text-white shadow-lg shadow-indigo-600/20">1</button>
            <button class="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500"><i class="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </aside>

      <article class="card overflow-hidden">
        <div class="flex flex-col gap-5 border-b border-slate-200 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex items-center gap-5">
            <div class="grid h-16 w-16 place-items-center rounded-xl bg-violet-50 text-3xl text-indigo-600">
              <i class="fa-solid fa-table-cells-large"></i>
            </div>
            <div>
              <h2 class="text-3xl font-extrabold text-ink">Login Valid Users</h2>
              <p class="mt-2 text-lg font-semibold text-slate-600">Used by 5 test cases</p>
            </div>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row">
            <button data-action="add-data-row" class="inline-flex items-center justify-center gap-3 rounded-lg border border-indigo-200 bg-white px-5 py-3 font-extrabold text-indigo-600 hover:bg-violet-50">
              <i class="fa-solid fa-plus"></i> Add Row
            </button>
            <button data-action="import-csv" class="inline-flex items-center justify-center gap-3 rounded-lg border border-indigo-200 bg-white px-5 py-3 font-extrabold text-indigo-600 hover:bg-violet-50">
              <i class="fa-solid fa-arrow-up-from-bracket"></i> Import CSV
            </button>
            <button data-action="generate-data" class="inline-flex items-center justify-center gap-3 rounded-lg bg-indigo-600 px-5 py-3 font-extrabold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Auto-Generate Data with AI
            </button>
          </div>
        </div>

        <div class="p-6">
          <div class="grid gap-5 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-start">
            <div class="rounded-lg border border-indigo-200 bg-violet-50/40 px-5 py-4 text-sm font-semibold text-slate-600">
              <i class="fa-solid fa-circle-info mr-3 text-indigo-600"></i>
              Structured test data for login flows and suite execution.
            </div>
            <div class="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-3">
              <button class="rounded-lg bg-violet-50 px-4 py-3 font-extrabold text-indigo-600">Table View</button>
              <button class="rounded-lg bg-slate-50 px-4 py-3 font-extrabold text-slate-600">JSON View</button>
            </div>
          </div>

          <p class="mt-7 flex items-start gap-4 text-sm font-semibold leading-6 text-slate-600">
            <i class="fa-solid fa-wand-magic-sparkles mt-1 text-indigo-500"></i>
            <span>AI can generate happy paths, edge cases, negative cases, and security-focused rows based on this schema.</span>
          </p>

          <div class="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <div class="overflow-x-auto">
              <table class="min-w-full text-left">
                <thead class="bg-white">
                  <tr>
                    <th class="w-12 px-4 py-5 text-center">
                      <input type="checkbox" class="h-5 w-5 rounded border-slate-300 accent-indigo-600">
                    </th>
                    <th class="w-16 px-4 py-5 text-center font-extrabold text-ink">#</th>
                    <th class="min-w-[240px] px-5 py-5 font-extrabold text-ink">email</th>
                    <th class="min-w-[210px] px-5 py-5 font-extrabold text-ink">password</th>
                    <th class="min-w-[190px] px-5 py-5 font-extrabold text-ink">expected_status</th>
                    <th class="min-w-[160px] px-5 py-5 font-extrabold text-ink">role</th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  ${loginRows.map(dataTableRow).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="mt-7 border-t border-slate-200 pt-6">
            <p class="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <i class="fa-regular fa-circle-check text-lg text-emerald-600"></i>
              Last updated 5 minutes ago
              <span class="text-slate-400">•</span>
              Autosaved
            </p>
          </div>
        </div>
      </article>
    </section>
  `;
}

ProjectLayout.render('project-test-data');
App.bindGlobalActions();
renderProjectTestData();
