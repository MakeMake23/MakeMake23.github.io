import Link from 'next/link';
import { FaFilePdf } from 'react-icons/fa';

interface CVCardProps {
  href: string;
  title: string;
  action: string;
}

const CVCard: React.FC<CVCardProps> = ({ href, title, action }) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <FaFilePdf className="text-4xl text-red-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{action}</p>
    </Link>
  );
};

export default CVCard;
