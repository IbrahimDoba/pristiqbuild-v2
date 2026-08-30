import { User } from 'lucide-react';

interface AuthorBioProps {
  author: string;
  bio?: string;
}

export default function AuthorBio({ author, bio }: AuthorBioProps) {
  const defaultBio = `${author} - Construction industry professional with extensive experience in Nigerian building projects, specializing in modern construction methods and materials.`;

  return (
    <div className="mt-16 p-6 md:p-8 bg-linear-to-r from-primary-50 via-gray-50 to-primary-50/30 rounded-2xl border border-primary-100 shadow-sm">
      <div className="flex items-start gap-5">
        <div className="w-20 h-20 bg-linear-to-br from-primary-600 to-primary-700 rounded-full flex items-center justify-center shrink-0 shadow-lg ring-4 ring-primary-100">
          <User className="w-10 h-10 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-steel-900">
            About the Author
          </h3>
          <p className="text-base md:text-lg text-steel-700 leading-relaxed italic">
            {bio || defaultBio}
          </p>
        </div>
      </div>
    </div>
  );
}
