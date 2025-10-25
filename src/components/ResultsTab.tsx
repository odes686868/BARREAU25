import { categories } from '../data/categories';

export default function ResultsTab() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Statistiques globales</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-2xl">-</p>
            <p className="text-gray-600">Questions totales</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-medium text-2xl text-green-700">-</p>
            <p className="text-green-600">Correctes</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="font-medium text-2xl text-red-700">-</p>
            <p className="text-red-600">Incorrectes</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium text-2xl text-gray-700">-</p>
            <p className="text-gray-600">Sans réponse</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Résultats par catégorie</h2>
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-lg">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Fonctionnalité en développement
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}