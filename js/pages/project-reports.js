const coverageRows = [
  ['REQ-001', 'User Authentication', 12, 24, 5, '+2', 92],
  ['REQ-002', 'Project Management', 15, 36, 4, '+3', 80],
  ['REQ-003', 'Test Case Management', 18, 42, 5, '+4', 78],
  ['REQ-004', 'Reporting & Analytics', 8, 16, 5, '+1', 87],
  ['REQ-005', 'Integrations', 7, 14, 3, '', 64]
];

const exportsList = [
  ['pdf', 'Test Execution Report', 'PDF', 'Just now'],
  ['excel', 'Requirement Coverage Report', 'Excel', '3 minutes ago'],
  ['pdf', 'Defect Summary Report', 'PDF', '8 minutes ago'],
  ['excel', 'Automation Progress Report', 'Excel', '18 minutes ago'],
  ['pdf', 'Full Test Summary Report', 'PDF', '32 minutes ago']
];

function reportMetric(icon, bgClass, textClass, title, value, delta, down = false) {
  return `
    <article class="card p-5">
      <div class="flex items-center gap-5">
        <div class="grid h-16 w-16 place-items-center rounded-xl ${bgClass} text-3xl ${textClass}">
          <i class="${icon}"></i>
        </div>
        <div>
          <p class="font-extrabold text-slate-600">${title}</p>
          <p class="mt-1 text-3xl font-extrabold text-ink">${value}</p>
          <p class="mt-2 text-sm font-bold text-emerald-600">
            <i class="fa-solid ${down ? 'fa-caret-down' : 'fa-caret-up'}"></i> ${delta} <span class="font-semibold text-slate-500">vs last 14 days</span>
          </p>
        </div>
      </div>
    </article>
  `;
}

function legendRow(color, label, value, valueClass = 'text-ink') {
  return `
    <p class="flex items-center justify-between gap-4">
      <span class="flex items-center gap-3 font-semibold text-slate-600"><i class="fa-solid fa-circle text-[0.65rem] ${color}"></i>${label}</span>
      <strong class="${valueClass}">${value}</strong>
    </p>
  `;
}

function donutPanel(title, center, sub, legend, gradient) {
  return `
    <article class="card p-5">
      <h2 class="font-extrabold text-ink">${title} <i class="fa-regular fa-circle-question text-slate-400"></i></h2>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-6">
        <div class="grid shrink-0 place-items-center rounded-full" style="background:${gradient}; width: 140px; height: 140px; aspect-ratio: 1 / 1;">
          <div class="grid h-[100px] w-[100px] place-items-center rounded-full bg-white text-center">
            <p class="text-3xl font-extrabold text-ink">${center}</p>
            <p class="text-sm font-semibold text-slate-500">${sub}</p>
          </div>
        </div>
        <div class="min-w-[130px] space-y-4 text-sm">${legend}</div>
      </div>
      <div class="mt-5 flex justify-end text-brand-600"><i class="fa-solid fa-chevron-right"></i></div>
    </article>
  `;
}

function gaugePanel(title, value, detail) {
  return `
    <article class="card p-5">
      <h2 class="font-extrabold text-ink">${title} <i class="fa-regular fa-circle-question text-slate-400"></i></h2>
      <div class="mt-8 text-center">
        <div class="mx-auto h-28 w-48 rounded-t-full border-[18px] border-b-0 border-indigo-600 border-r-slate-100"></div>
        <p class="-mt-12 text-4xl font-extrabold text-ink">${value}</p>
        <p class="mt-5 text-2xl font-extrabold text-ink">${detail}</p>
        <p class="mt-1 font-semibold text-slate-500">Test Cases Automated</p>
      </div>
      <div class="mt-3 flex justify-end text-brand-600"><i class="fa-solid fa-chevron-right"></i></div>
    </article>
  `;
}

function requirementCoveragePanel() {
  return `
    <article class="card p-5">
      <h2 class="font-extrabold text-ink">Requirement Coverage <i class="fa-regular fa-circle-question text-slate-400"></i></h2>
      <div class="mt-7 space-y-5">
        ${legendRow('text-brand-600', 'Requirements', '48')}
        ${legendRow('text-emerald-500', 'Acceptance Criteria', '126')}
        ${legendRow('text-indigo-600', 'Covered', '104', 'text-brand-600')}
        ${legendRow('text-rose-500', 'Missing', '22', 'text-rose-500')}
      </div>
      <div class="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
        <span class="font-semibold text-slate-600">Coverage</span>
        <strong class="text-xl text-brand-600">82.5% <i class="fa-solid fa-chevron-right ml-3 text-sm"></i></strong>
      </div>
    </article>
  `;
}

function coverageDots(count) {
  return Array.from({ length: 5 }, (_, index) => {
    const covered = index < count;
    return `<span class="grid h-5 w-5 place-items-center rounded-full border ${covered ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-400 bg-white'}">${covered ? '<i class="fa-solid fa-check text-[0.6rem]"></i>' : ''}</span>`;
  }).join('');
}

function coverageRow(row) {
  const low = row[6] < 70;
  return `
    <tr class="border-t border-slate-200">
      <td class="px-4 py-4"><a class="font-extrabold text-brand-600" href="project-requirements.html">${row[0]}</a></td>
      <td class="px-4 py-4 font-semibold text-slate-600">${row[1]}</td>
      <td class="px-4 py-4 text-center font-bold text-ink">${row[2]}</td>
      <td class="px-4 py-4 text-center font-bold text-ink">${row[3]}</td>
      <td class="px-4 py-4">
        <div class="flex items-center gap-2">${coverageDots(row[4])}${row[5] ? `<span class="ml-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">${row[5]}</span>` : ''}</div>
      </td>
      <td class="px-4 py-4">
        <div class="flex items-center gap-3">
          <div class="min-w-[42px] font-extrabold text-ink">${row[6]}%</div>
          <div class="h-2 w-20 rounded-full bg-slate-100"><div class="h-full rounded-full ${low ? 'bg-amber-500' : 'bg-emerald-500'}" style="width:${row[6]}%"></div></div>
        </div>
      </td>
      <td class="px-4 py-4 text-right text-slate-500"><i class="fa-solid fa-chevron-right"></i></td>
    </tr>
  `;
}

function exportItem(item) {
  const isExcel = item[0] === 'excel';
  return `
    <div class="flex items-center justify-between gap-4 border-b border-slate-100 py-3">
      <div class="flex min-w-0 items-center gap-4">
        <div class="grid h-10 w-10 place-items-center rounded-lg ${isExcel ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}">
          <i class="fa-solid ${isExcel ? 'fa-file-excel' : 'fa-file-pdf'}"></i>
        </div>
        <div class="min-w-0">
          <p class="truncate font-extrabold text-ink">${item[1]}</p>
          <p class="text-sm font-semibold text-slate-500">${item[2]} <span class="mx-2">•</span> Generated by Arjun Singh</p>
        </div>
      </div>
      <span class="whitespace-nowrap text-sm font-semibold text-slate-500">${item[3]}</span>
      <button data-action="download-report" class="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-brand-600 hover:bg-brand-50">
        <i class="fa-solid fa-download"></i>
      </button>
    </div>
  `;
}

function renderProjectReports() {
  App.qs('#pageContent').innerHTML = `
    <section class="space-y-5 overflow-x-hidden">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h1 class="text-4xl font-extrabold text-ink">Reports</h1>
        <div class="flex flex-col gap-3 sm:flex-row">
          <button data-action="export-pdf" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-6 py-3 font-extrabold text-ink hover:border-brand-200">
            <i class="fa-regular fa-file-pdf text-slate-600"></i> Export PDF
          </button>
          <button data-action="export-excel" class="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-6 py-3 font-extrabold text-ink hover:border-brand-200">
            <i class="fa-solid fa-file-excel text-emerald-600"></i> Export Excel
          </button>
        </div>
      </div>

      <div class="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        ${reportMetric('fa-solid fa-chart-pie', 'bg-blue-50', 'text-brand-600', 'Requirement Coverage', '82.5%', '6.2%')}
        ${reportMetric('fa-regular fa-circle-play', 'bg-violet-100', 'text-indigo-600', 'Test Execution Summary', '84%', '5.1%')}
        ${reportMetric('fa-solid fa-bug', 'bg-red-50', 'text-red-600', 'Defect Summary', '19', '3', true)}
        ${reportMetric('fa-solid fa-code', 'bg-emerald-50', 'text-emerald-600', 'Automation Progress', '74%', '7.3%')}
      </div>

      <div class="grid gap-5" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
        ${requirementCoveragePanel()}
        ${donutPanel('Test Execution Pass Rate', '84%', 'Pass Rate', `
          ${legendRow('text-emerald-500', 'Passed', '210')}
          ${legendRow('text-rose-500', 'Failed', '40')}
          ${legendRow('text-slate-400', 'Skipped', '24')}
        `, 'conic-gradient(#2357df 0 84%, #e8edf5 84% 100%)')}
        ${donutPanel('Defect Summary', '19', 'Total', `
          ${legendRow('text-rose-500', 'Open', '5')}
          ${legendRow('text-brand-600', 'Resolved', '12')}
          ${legendRow('text-indigo-600', 'Critical', '2')}
        `, 'conic-gradient(#2357df 0 52%, #16a05d 52% 78%, #f43f5e 78% 100%)')}
      </div>

      <div class="flex flex-wrap gap-6 w-full box-border">
        <article class="card p-5" style="flex: 2; min-width: 0; overflow-x: auto;">
          <h2 class="text-lg font-extrabold text-ink">Requirement &rarr; AC &rarr; Test Case Coverage <i class="fa-regular fa-circle-question text-slate-400"></i></h2>
          <div class="mt-5 overflow-hidden rounded-xl border border-slate-200">
            <div class="overflow-x-auto">
              <table class="min-w-full text-left text-sm">
                <thead class="bg-white text-slate-600">
                  <tr>
                    <th class="px-4 py-4 font-extrabold">Requirement</th>
                    <th class="px-4 py-4 font-extrabold"></th>
                    <th class="px-4 py-4 text-center font-extrabold">Acceptance Criteria</th>
                    <th class="px-4 py-4 text-center font-extrabold">Test Cases</th>
                    <th class="px-4 py-4 font-extrabold">Covered</th>
                    <th class="px-4 py-4 font-extrabold">Coverage</th>
                    <th class="px-4 py-4"></th>
                  </tr>
                </thead>
                <tbody>${coverageRows.map(coverageRow).join('')}</tbody>
              </table>
            </div>
          </div>
          <button class="mt-5 flex w-full items-center justify-center gap-3 font-extrabold text-brand-600">View Full Coverage Matrix <i class="fa-solid fa-chevron-right"></i></button>
        </article>

        <article class="card p-5" style="flex: 1; min-width: 300px;">
          <div class="flex items-center justify-between gap-4">
            <h2 class="text-lg font-extrabold text-ink">Recent Exports <i class="fa-regular fa-circle-question text-slate-400"></i></h2>
            <button class="font-extrabold text-brand-600">View All Exports</button>
          </div>
          <div class="mt-4">${exportsList.map(exportItem).join('')}</div>
          <button class="mt-4 flex w-full items-center justify-center gap-3 font-extrabold text-brand-600">View All Activity <i class="fa-solid fa-chevron-right"></i></button>
        </article>
      </div>
    </section>
  `;
}

ProjectLayout.render('project-reports');
App.bindGlobalActions();
renderProjectReports();
