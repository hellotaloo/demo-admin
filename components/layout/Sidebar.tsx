'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Briefcase, 
  MessageSquare, 
  Settings,
  Bot
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Vacancies', href: '/vacancies', icon: Briefcase },
  { name: 'Agents', href: '/agents', icon: Bot },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[var(--border)] flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/taloo-icon-big.svg" 
            alt="Taloo" 
            width={32} 
            height={32}
            className="w-8 h-8"
          />
          <span className="text-xl font-semibold text-[var(--text-primary)]">
            Taloo
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                    transition-colors duration-150
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-[var(--text-secondary)] hover:bg-gray-50 hover:text-[var(--text-primary)]'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-[var(--border)]">
        <div className="flex items-center gap-3">
          <Image 
            src="/dummy-profile-ld.png" 
            alt="LD" 
            width={32} 
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[var(--text-primary)] truncate">
              Lunar D.
            </p>
            <p className="text-xs text-[var(--text-secondary)] truncate">
              laurijn@taloo.be
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
