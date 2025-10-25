import { BarChart as ChartBar, BookOpen, CheckCircle } from 'lucide-react';

type Tab = 'tests' | 'resultats' | 'progression';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const tabs = [
    { id: 'tests', label: 'Tests', icon: BookOpen },
    { id: 'resultats', label: 'Résultats', icon: CheckCircle },
    { id: 'progression', label: 'Progression', icon: ChartBar },
  ] as const;

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg p-6">
      <div className="space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1e2c4f] text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={22} />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}