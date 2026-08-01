const agencies = [
  { name: "USDA", full: "U.S. Department of Agriculture" },
  { name: "FDA", full: "Food & Drug Administration" },
  { name: "CDC", full: "Centers for Disease Control" },
  { name: "FoodKeeper", full: "USDA food-storage app" },
];

export function TrustBar() {
  return (
    <section data-pin-ready="true" className="border-b border-brand-line bg-brand-paper-soft">
      <div className="container-site py-6 lg:py-7">
        <p className="text-center text-small font-medium text-brand-ink-500">
          Our guidance references trusted public food safety organizations.
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {agencies.map((a) => (
            <li key={a.name} className="flex flex-col items-center text-center">
              <span className="font-display text-h3 font-extrabold tracking-tight text-brand-ink-300">{a.name}</span>
              <span className="text-micro text-brand-ink-300">{a.full}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
