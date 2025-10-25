import { categories } from '../data/categories';

export default function ProgressTab() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Progression par catégorie</h2>
        <div className="grid gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-lg">{category.name}</h3>
                <span className="text-sm text-gray-500">
                  Fonctionnalité en développement
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}