import type { ShortlistCar } from "../api/chat";

type RecommendationProps = {
  cars?: ShortlistCar[];
};

export default function Recommendation({ cars = [] }: RecommendationProps) {
  if (!cars.length) {
    return (
      <article className="flex flex-col justify-center items-center h-full text-center px-6">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-3">
          <span className="text-gray-400 text-sm">✦</span>
        </div>
        <h2 className="text-sm font-medium text-gray-700 mb-1">
          No Recommendations Yet
        </h2>
        <p className="text-xs text-gray-400 max-w-xs">
          Start a conversation and recommendations will appear here.
        </p>
      </article>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {cars.map((car) => (
        <article
          key={car.name}
          className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {car.name}
              </h3>
              <p className="text-[11px] text-gray-500">{car.price_range}</p>
            </div>
            <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-700">
              {car.match_score}% match
            </span>
          </div>

          <p className="text-xs text-gray-600 mb-3">{car.why_this_fits_you}</p>

          <div className="grid gap-2 text-xs">
            <div>
              <p className="font-semibold text-gray-800">Pros</p>
              <ul className="list-disc list-inside text-gray-600 mt-1">
                {car.pros.map((pro) => (
                  <li key={pro}>{pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Cons</p>
              <ul className="list-disc list-inside text-gray-600 mt-1">
                {car.cons.map((con) => (
                  <li key={con}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
