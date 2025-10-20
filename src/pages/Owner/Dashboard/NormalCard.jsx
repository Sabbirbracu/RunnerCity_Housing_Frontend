import Button from "../../../components/ui/button";
export const NormalCard = ({ title, content, subContent, button_txt, icon: Icon, iconBgColor = 'bg-teal-100', iconTextColor = 'text-teal-600' }) => {
  let shadowColor = 'shadow-teal-500/20'; 
  if (iconBgColor.includes('yellow')) shadowColor = 'shadow-yellow-500/20';
  if (iconBgColor.includes('red')) shadowColor = 'shadow-red-500/20';

  return (
    <div className={`bg-white p-5 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:${shadowColor}`}>
      
      <div className="flex flex-row no-wrap  items-center gap-2">
        {/* Icon/Badge - Top Left */}
        {Icon && (
          <div className={`p-3 rounded-xl ${iconBgColor} ${iconTextColor}`}>
            <Icon className="w-4 h-4" /> 
          </div>
        )}
        {/* Title */}
        <h3 className="text-black text-xl font-extrabold mt-1">{title}</h3>
      </div>

      {/* Content */}
      <div className="mt-3">
        <h3 className="text-gray-500 text-sm mt-1">{content}</h3>
      </div>
      
      {/* Sub-Content (Secondary Info) */}
      {subContent && (
        <p className="text-xs text-emerald-700 font-bold mt-2 border-t border-gray-100 pt-2">{subContent}</p>
      )}
      <div className="flex justify-start">
        {button_txt=== "Donate Now"?( 
          <Button variant="destructive" size="sm" className="mt-4">
            {button_txt ? button_txt : "View Details"}
          </Button>): button_txt=== "View Reports"?(<Button variant="default" size="sm" className="mt-4 bg-blue-600 hover:bg-blue-700">
            {button_txt ? button_txt : "View Details"}
          </Button>):(
        
        <Button variant="cta" size="sm" className="mt-4">
            {button_txt ? button_txt : "View Details"}
        </Button>)}
      </div>
    </div>
  );
};
