window.MockData = {
  workspace: {
    name: 'Default Workspace',
    status: 'Auto-created',
    jiraConnected: false
  },
  navItems: [
    { id: 'dashboard', label: 'Overview', href: 'dashboard.html', icon: 'fa-solid fa-table-cells-large', subtitle: 'Workspace setup' },
    { id: 'workspaces', label: 'Projects', href: 'workspaces.html', icon: 'fa-regular fa-folder-open', subtitle: 'Workspace projects' },
    { id: 'integrations', label: 'Integrations', href: 'integrations.html', icon: 'fa-solid fa-link', subtitle: 'Integration setup' },
    { id: 'settings', label: 'Settings', href: 'settings.html', icon: 'fa-solid fa-gear', subtitle: 'Workspace preferences' }
  ],
  projects: [
    { key: 'PROJ', name: 'Customer Portal', issues: 42, status: 'Ready', owner: 'Priya Chen' },
    { key: 'PAY', name: 'Payments API', issues: 31, status: 'Synced', owner: 'Mateo Rossi' },
    { key: 'OPS', name: 'Operations Console', issues: 18, status: 'Ready', owner: 'Arjun Singh' }
  ],
  requirements: [
    { id: 'REQ-104', title: 'User can reset password through verified email', source: 'PROJ-101', priority: 'High' },
    { id: 'REQ-118', title: 'Payment webhook retries failed callbacks', source: 'PAY-43', priority: 'Medium' },
    { id: 'REQ-133', title: 'Admin can approve customer account upgrades', source: 'OPS-12', priority: 'High' }
  ],
  testCases: [
    { id: 'TC-001', title: 'Reset password with valid email token', type: 'E2E', confidence: 94 },
    { id: 'TC-002', title: 'Retry webhook after provider timeout', type: 'API', confidence: 89 },
    { id: 'TC-003', title: 'Block approval when account documents are missing', type: 'Functional', confidence: 91 }
  ],
  testScripts: [
    { id: 'SCR-001', name: 'password-reset.spec.ts', framework: 'Playwright', status: 'Draft' },
    { id: 'SCR-002', name: 'payment-webhook.test.js', framework: 'Postman', status: 'Ready' },
    { id: 'SCR-003', name: 'approval-flow.cy.js', framework: 'Cypress', status: 'Needs review' }
  ],
  testRuns: [
    { name: 'Regression pack passed', time: '2 hours ago', status: 'Passed' },
    { name: 'Payments API smoke test queued', time: '3 hours ago', status: 'Queued' },
    { name: 'Admin approval flow failed', time: '5 hours ago', status: 'Failed' }
  ]
};
