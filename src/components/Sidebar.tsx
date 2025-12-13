import { BarChart as ChartBar, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

type Tab = 'tests' | 'resultats' | 'progression' | 'questions' | 'avertissement';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const mainTabs = [
    { id: 'tests', label: 'Tests', icon: BookOpen },
    { id: 'resultats', label: 'Résultats', icon: CheckCircle },
    { id: 'progression', label: 'Progression', icon: ChartBar },
  ] as const;

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg p-6 flex flex-col">
      <div className="space-y-2 flex-1">
        {mainTabs.map((tab) => {
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

      <div className="pt-4 border-t border-gray-100">
        <button
          onClick={() => onTabChange('avertissement')}
          className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md transition-colors text-sm ${
            activeTab === 'avertissement'
              ? 'bg-gray-100 text-gray-700'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
        >
          <AlertTriangle size={16} />
          <span>Avertissement</span>
        </button>
      </div>
    </div>
  );
}