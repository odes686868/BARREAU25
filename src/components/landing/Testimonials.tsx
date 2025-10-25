export default function Testimonials() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-[#1e2c4f]">Témoignages</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ce que disent nos utilisateurs
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {[
            {
              content: "La plateforme m'a permis de structurer ma préparation et d'identifier mes points faibles. J'ai réussi l'examen du premier coup !",
              author: "Marie Tremblay",
              role: "Avocate depuis 2024"
            },
            {
              content: "Les explications détaillées après chaque question m'ont vraiment aidé à comprendre mes erreurs et à progresser rapidement.",
              author: "Jean-Philippe Dubois",
              role: "Étudiant en droit"
            },
            {
              content: "Le suivi de progression est excellent. J'ai pu me concentrer sur les domaines où j'avais le plus de difficultés.",
              author: "Sophie Bergeron",
              role: "Avocate depuis 2024"
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
            >
              <blockquote className="text-lg leading-8 text-gray-700">
                "{testimonial.content}"
              </blockquote>
              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="text-base font-semibold text-gray-900">{testimonial.author}</div>
                <div className="mt-1 text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}