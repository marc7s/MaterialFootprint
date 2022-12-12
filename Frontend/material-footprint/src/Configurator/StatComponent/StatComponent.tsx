import './StatComponent.sass';

/* Components */

/* Utilities */

/* Shared */

interface StatProp {
  amount: number;
  minAmount: number;
  maxAmount: number;
  unit: string;
}

function getEmissionStyle(amount: number, minAmount: number, maxAmount: number): React.CSSProperties {
  enum colors {
    BAD = '#F72E41', // Rapid Red 01
    OK = '#FFAB5C', // Rapid Orange
    GOOD = '#45CB5E' // Rapid Green
  };
  const percentage: number = 100 * (amount - minAmount) / (maxAmount - minAmount);
  return  {
      color:  percentage < 33 ? colors.GOOD 
                      : percentage < 66 ? colors.OK
                      : colors.BAD
  }
}

function formatAmount(amount: number) {
  return amount.toLocaleString('sv-SE', { maximumFractionDigits: 1 });
}

function StatComponent({ amount, minAmount, maxAmount, unit }: StatProp) {
  // Render an EmissionComponent for each part in the model
  return (
    <div className="Stat-container" style={getEmissionStyle(amount, minAmount, maxAmount)} title={ 'The color denotes how well you minimized your emissions given your possible decisions.\n\nGreen: Good\nOrange: OK\nRed: Bad' }>
        <span className="Stat-amount">{ formatAmount(amount) }</span>
        <span className="Stat-unit">{ unit }</span>
    </div>
  );
}

export default StatComponent;
