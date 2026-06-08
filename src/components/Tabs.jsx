const tabs = [
  { id: 'schedule', label: 'Schedule', icon: '📝' },
  { id: 'cancel', label: 'Cancel', icon: '❌' },
  { id: 'list', label: 'List', icon: '📅' },
  { id: 'search', label: 'Search', icon: '🔎' }
]

export default function Tabs({ activeTab, onChange }) {
  return (
    <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="grid gap-2 sm:grid-cols-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : 'tab-button-idle'}`}
            onClick={() => onChange(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
