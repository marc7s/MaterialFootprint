import './StatComponent.sass';

/* Components */

/* Utilities */

/* Shared */

interface StatProp {
  amount: number;
  unit: string;
  style?: React.CSSProperties;
}

function formatAmount(amount: number) {
  return amount.toLocaleString('sv-SE', { maximumFractionDigits: 1 });
}

function StatComponent({ amount, unit, style }: StatProp) {
  // Render an EmissionComponent for each part in the model
  return (
    <div className="Stat-container" style={style}>
        <span className="Stat-amount">{ formatAmount(amount) }</span>
        <span className="Stat-unit">{ unit }</span>
    </div>
  );
}

export default StatComponent;
