import React, { useState, useEffect } from "react";

// Full sample dataset extracted from the original dataset for demonstration
const data = {
  APAC: {
    Australia: {
      currency: "USD",
      yearlyRates: {
        L1: { withBackfill: 48000, withoutBackfill: 52000 },
        L2: { withBackfill: 52000, withoutBackfill: 57000 },
        L3: { withBackfill: 58000, withoutBackfill: 66000 },
        L4: { withBackfill: 68000, withoutBackfill: 76000 },
        L5: { withBackfill: 78000, withoutBackfill: 84000 },
      },
      monthlyShortTermProject: { L1: 6400, L2: 6933.33, L3: 7733.33, L4: 8500, L5: 9750 },
      monthlyLongTermProject: { L1: 6000, L2: 6500, L3: 7250, L4: 8500, L5: 9750 },
    },
    India: {
      currency: "USD",
      yearlyRates: {
        L1: { withBackfill: 5995, withoutBackfill: 6744.38 },
        L2: { withBackfill: 6594.5, withoutBackfill: 7418.81 },
        L3: { withBackfill: 7253.95, withoutBackfill: 8160.69 },
        L4: { withBackfill: 8160.69, withoutBackfill: 9180.78 },
        L5: { withBackfill: 9180.78, withoutBackfill: 10328.38 },
      },
      monthlyShortTermProject: { L1: 799.33, L2: 879.27, L3: 967.19, L4: 1020.09, L5: 1147.6 },
      monthlyLongTermProject: { L1: 749.38, L2: 824.31, L3: 906.74, L4: 1020.09, L5: 1147.6 },
    },
  },
  Europe: {
    Austria: {
      currency: "Euro",
      yearlyRates: {
        L1: { withBackfill: 38995, withoutBackfill: 43869.38 },
        L2: { withBackfill: 44844.25, withoutBackfill: 50449.78 },
        L3: { withBackfill: 51570.89, withoutBackfill: 58017.25 },
        L4: { withBackfill: 58017.25, withoutBackfill: 66719.84 },
        L5: { withBackfill: 66719.84, withoutBackfill: 76727.81 },
      },
      monthlyShortTermProject: { L1: 5199.33, L2: 5979.23, L3: 6876.12, L4: 7252.16, L5: 8339.98 },
      monthlyLongTermProject: { L1: 4874.38, L2: 5605.53, L3: 6446.36, L4: 7252.16, L5: 8339.98 },
    },
    Belgium: {
      currency: "Euro",
      yearlyRates: {
        L1: { withBackfill: 65000, withoutBackfill: 73125 },
        L2: { withBackfill: 74750, withoutBackfill: 84093.75 },
        L3: { withBackfill: 85962.5, withoutBackfill: 96707.81 },
        L4: { withBackfill: 96707.81, withoutBackfill: 111214 },
        L5: { withBackfill: 111214, withoutBackfill: 127896 },
      },
      monthlyShortTermProject: { L1: 8666.67, L2: 9966.67, L3: 11461.67, L4: 12088.48, L5: 13901.75 },
      monthlyLongTermProject: { L1: 8125, L2: 9343.75, L3: 10745.31, L4: 12088.48, L5: 13901.75 },
    },
  },
};

const serviceLevels = ["L1", "L2", "L3", "L4", "L5"];
const projectTypes = ["Yearly Rate", "Short Term Project", "Long Term Project"];
const backfillOptions = ["With Backfill", "Without Backfill"];

export default function PricingCalculator() {
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [serviceLevel, setServiceLevel] = useState("L1");
  const [projectType, setProjectType] = useState("Yearly Rate");
  const [backfill, setBackfill] = useState("With Backfill");
  const [price, setPrice] = useState(null);
  const [currency, setCurrency] = useState("");

  const countries = region ? Object.keys(data[region]) : [];

  useEffect(() => {
    if (region && country && serviceLevel && projectType) {
      const countryData = data[region][country];
      setCurrency(countryData.currency);

      if (projectType === "Yearly Rate") {
        const rates = countryData.yearlyRates[serviceLevel];
        setPrice(backfill === "With Backfill" ? rates.withBackfill : rates.withoutBackfill);
      } else if (projectType === "Short Term Project") {
        setPrice(countryData.monthlyShortTermProject[serviceLevel]);
      } else if (projectType === "Long Term Project") {
        setPrice(countryData.monthlyLongTermProject[serviceLevel]);
      } else {
        setPrice(null);
      }
    } else {
      setPrice(null);
      setCurrency("");
    }
  }, [region, country, serviceLevel, projectType, backfill]);

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "Arial, sans-serif", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Pricing Calculator</h2>
      <div style={{ marginBottom: 15 }}>
        <label>
          Region:<br />
          <select value={region} onChange={(e) => { setRegion(e.target.value); setCountry(""); }}>
            <option value="">Select Region</option>
            {Object.keys(data).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: 15 }}>
        <label>
          Country:<br />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={!region}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: 15 }}>
        <label>
          Service Level:<br />
          <select value={serviceLevel} onChange={(e) => setServiceLevel(e.target.value)}>
            {serviceLevels.map((sl) => (
              <option key={sl} value={sl}>{sl}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: 15 }}>
        <label>
          Project Type:<br />
          <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
            {projectTypes.map((pt) => (
              <option key={pt} value={pt}>{pt}</option>
            ))}
          </select>
        </label>
      </div>
      {projectType === "Yearly Rate" && (
        <div style={{ marginBottom: 15 }}>
          <label>
            Backfill Option:<br />
            <select value={backfill} onChange={(e) => setBackfill(e.target.value)}>
              {backfillOptions.map((bf) => (
                <option key={bf} value={bf}>{bf}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div style={{ marginTop: 30, textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
        {price !== null ? (
          <div>
            Price: {price.toLocaleString(undefined, { maximumFractionDigits: 2 })} {currency}
          </div>
        ) : (
          <div style={{ color: "#666" }}>Please select all options to see the price</div>
        )}
      </div>
    </div>
  );
}
