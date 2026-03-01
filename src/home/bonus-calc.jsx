import { useState, useCallback, useEffect } from "react";
import { Calculator, TrendingUp, Zap, DollarSign, Percent } from "lucide-react";
import "../styles/home/bonus-calc.css";
import { usePresaleContext } from "../metawalletprovider/presale_provider";

const BonusCalculator = ({ scrollToPresale }) => {
  const [amount, setAmount] = useState("");
  const [animateResults, setAnimateResults] = useState(false);
  const { currentStage, stagePrice: pricePerToken, bonusPercent: bonusPercentage } = usePresaleContext();

  const handleAmountChange = useCallback((e) => {
    const value = e.target.value;
    if (Number(value) < 0) return;
    setAmount(value);
    setAnimateResults(true);
    setTimeout(() => setAnimateResults(false), 600);
  }, []);

  const numAmount = parseFloat(amount) || 0;
  const baseTokens = pricePerToken > 0 ? numAmount / pricePerToken : 0;
  const bonusTokens = baseTokens * (bonusPercentage / 100);
  const totalTokens = baseTokens + bonusTokens;

  // Calculate potential value at listing price ($0.068)
  const listingValue = totalTokens * 0.068;
  const roi = numAmount > 0 ? ((listingValue - numAmount) / numAmount * 100) : 0;

  // Investment examples
  const examples = [
    { amount: 100, label: "$100" },
    { amount: 500, label: "$500" },
    { amount: 1000, label: "$1K" },
    { amount: 5000, label: "$5K" }
  ];

  return (
    <section className="mmv-calc-section">
      {/* Background effects */}
      <div className="mmv-calc-bg-pattern"></div>
      <div className="mmv-calc-orb mmv-calc-orb-1"></div>
      <div className="mmv-calc-orb mmv-calc-orb-2"></div>

      <div className="mmv-calc-container">
        {/* Header */}
        <div className="mmv-calc-header">
          <div className="mmv-calc-badge">
            <Calculator size={14} />
            <span>INVESTMENT CALCULATOR</span>
          </div>
          <h2 className="mmv-calc-title">
            Calculate Your <span className="mmv-calc-gradient">Gains</span>
          </h2>
          <p className="mmv-calc-subtitle">
            Stage {currentStage} is live with {bonusPercentage}% bonus. See what your investment could be worth.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mmv-calc-grid">
          {/* Left Card - Info */}
          <div className="mmv-calc-info-card">
            <div className="mmv-calc-info-glow"></div>
            <div className="mmv-calc-info-content">
              <div className="mmv-calc-stage-indicator">
                <Zap size={20} />
                <span>Stage {currentStage} Live</span>
              </div>

              <h3>Why Buy Now?</h3>
              <ul className="mmv-calc-benefits">
                <li>
                  <span className="mmv-calc-check">✓</span>
                  {bonusPercentage}% bonus on every purchase
                </li>
                <li>
                  <span className="mmv-calc-check">✓</span>
                  Price increases {((0.068 - pricePerToken) / pricePerToken * 100).toFixed(0)}% at listing
                </li>
                <li>
                  <span className="mmv-calc-check">✓</span>
                  Earn passive income in 4 memecoins
                </li>
                <li>
                  <span className="mmv-calc-check">✓</span>
                  Next stage = less bonus, higher price
                </li>
              </ul>

              <div className="mmv-calc-urgency">
                <TrendingUp size={16} />
                <p>Stage {currentStage + 1} starts at ${(pricePerToken * 1.5).toFixed(3)}</p>
              </div>

              <button onClick={scrollToPresale} className="mmv-calc-cta-button">
                Buy $MMV Now
                <span className="mmv-calc-button-glow"></span>
              </button>
            </div>
          </div>

          {/* Right Card - Calculator */}
          <div className="mmv-calc-main-card">
            <div className="mmv-calc-card-header">
              <h3>Investment Calculator</h3>
              <div className="mmv-calc-bonus-badge">
                <Percent size={14} />
                {bonusPercentage}% Bonus
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="mmv-calc-quick-amounts">
              {examples.map((example) => (
                <button
                  key={example.amount}
                  className={`mmv-calc-quick-btn ${amount == example.amount ? 'active' : ''}`}
                  onClick={() => {
                    setAmount(example.amount.toString());
                    setAnimateResults(true);
                    setTimeout(() => setAnimateResults(false), 600);
                  }}
                >
                  {example.label}
                </button>
              ))}
            </div>

            {/* Input Field */}
            <div className="mmv-calc-input-group">
              <label>Investment Amount (USDT)</label>
              <div className="mmv-calc-input-wrapper">
                <span className="mmv-calc-input-prefix">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  min="0"
                  className="mmv-calc-input"
                />
              </div>
            </div>

            {/* Results */}
            <div className={`mmv-calc-results ${animateResults ? 'animate' : ''}`}>
              <div className="mmv-calc-result-row">
                <span className="mmv-calc-result-label">Base Tokens:</span>
                <span className="mmv-calc-result-value">
                  {baseTokens.toLocaleString(undefined, { maximumFractionDigits: 0 })} MMV
                </span>
              </div>

              <div className="mmv-calc-result-row mmv-highlight">
                <span className="mmv-calc-result-label">
                  <Zap size={14} /> Bonus Tokens:
                </span>
                <span className="mmv-calc-result-value">
                  +{bonusTokens.toLocaleString(undefined, { maximumFractionDigits: 0 })} MMV
                </span>
              </div>

              <div className="mmv-calc-result-divider"></div>

              <div className="mmv-calc-result-row mmv-total">
                <span className="mmv-calc-result-label">Total Tokens:</span>
                <span className="mmv-calc-result-value">
                  {totalTokens.toLocaleString(undefined, { maximumFractionDigits: 0 })} MMV
                </span>
              </div>

              <div className="mmv-calc-projection">
                <div className="mmv-calc-projection-header">
                  <TrendingUp size={16} />
                  <span>At Listing Price ($0.068)</span>
                </div>
                <div className="mmv-calc-projection-value">
                  ${listingValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                {numAmount > 0 && (
                  <div className="mmv-calc-roi">
                    +{roi.toFixed(0)}% ROI
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mmv-calc-note">
              <p>Price per token: ${pricePerToken.toFixed(4)}</p>
              <p>Not financial advice. Do your own research.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BonusCalculator;