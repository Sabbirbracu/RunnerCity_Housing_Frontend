// --- Utility Component for the Sparkline Dots ---
export const Dots = ({ colors, dotsData }) => {
  return (
    <div className="flex items-end space-x-0.5 h-6">
      {dotsData.map((colorKey, index) => {
        const color = colorKey === 1 ? colors.dot1 : colors.dot2;
        const baseHeight = 4;
        const maxIncrement = 22;
        let heightValue = baseHeight + (index * 1.5) % maxIncrement;
        heightValue = heightValue * (colorKey === 1 ? 1.2 : 0.8);

        return (
          <div
            key={index}
            className="w-1 rounded-full transition-all duration-200"
            style={{ 
                backgroundColor: color, 
                height: `${Math.max(4, heightValue)}px`
            }}
          />
        );
      })}
    </div>
  );
};
