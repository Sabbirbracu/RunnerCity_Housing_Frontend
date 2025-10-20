import { IoIosMegaphone } from 'react-icons/io';
import Button from '../../../components/ui/button';

export const DynamicAnnouncementBar = ({ message, ctaText, ctaLink }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-6 rounded-xl bg-gray-900 shadow-xl transition-all duration-300 transform hover:shadow-2xl">
      <div className="flex items-center flex-grow min-w-0">
        <IoIosMegaphone className="w-5 h-5 text-green-400 flex-shrink-0 mr-3" />
        <p className="font-semibold text-white text-sm sm:text-base truncate">
          {message}
        </p>
      </div>

      <Button variant="hero" size='sm' href={ctaLink}>
        {ctaText} →
      </Button>
    </div>
  );
};