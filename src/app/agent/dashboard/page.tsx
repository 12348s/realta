'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Home, Plus, Bell,
  Search, TrendingUp, Eye, Users, Pencil, ShoppingCart, Tag, ChevronDown
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import propertiesData from '@/app/data/mumbaiProperties.json';
import { useListingStore } from '@/store/useListingStore';

const chartData = [
  { day: 'Mon', views: 1200 },
  { day: 'Tue', views: 1800 },
  { day: 'Wed', views: 1600 },
  { day: 'Thu', views: 2800 },
  { day: 'Fri', views: 2400 },
  { day: 'Sat', views: 1900 },
  { day: 'Sun', views: 2200 },
];

const listingMeta = [
  { status: 'ACTIVE', statusColor: 'bg-green-100 text-green-700', perf: 70, views: '1.2k views' },
  { status: 'PENDING', statusColor: 'bg-orange-100 text-orange-700', perf: 45, views: '840 views' },
  { status: 'ACTIVE', statusColor: 'bg-green-100 text-green-700', perf: 85, views: '2.1k views' },
];

const navItems = [
  { label: 'Buy', icon: ShoppingCart, active: true },
  { label: 'Sell', icon: Tag, active: false },
];

export default function AgentDashboardPage() {
  const { newListings } = useListingStore();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listings: any[] = [...newListings, ...propertiesData.slice(0, 3)];

  return (
    <div className="flex h-screen bg-[#F9F9F9] font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-full shadow-sm">
        <div className="p-8 pb-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d45622] rounded-xl flex items-center justify-center shadow-sm">
              <Home className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-[20px] text-gray-900 leading-none mb-0.5">Realta</p>
              <p className="text-[10px] font-black text-[#d45622] tracking-widest uppercase">Elite Agent</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-4 px-6 py-3.5 rounded-full text-[14px] font-bold transition-all text-left ${
                active ? 'bg-[#fae2d6]/80 text-[#d45622]' : 'text-[#64748b] hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-[18px] h-[18px] ${active ? 'text-[#d45622]' : 'text-[#8094a8]'}`} strokeWidth={active ? 2.5 : 2} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-8">
          <Link
            href="/agent/new-listing"
            className="w-full flex items-center justify-center gap-2 bg-[#d45622] hover:bg-[#c04b1c] text-white font-bold py-3.5 rounded-full transition-colors shadow-sm text-[14px]"
          >
            <Plus className="w-5 h-5" /> Add New Property
          </Link>
          <div className="flex items-center gap-4 px-2">
            <Image
              src="https://ui-avatars.com/api/?name=Marcus+Sterling&background=F5F0EB&color=000&size=44"
              alt="Marcus" width={44} height={44} className="rounded-full flex-shrink-0 border border-gray-200"
            />
            <div>
              <p className="font-bold text-[14px] text-gray-900 leading-tight">Marcus Sterling</p>
              <p className="text-[12px] font-medium text-[#8094a8]">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto bg-[#F9F9F9]">
        <div className="p-10 max-w-[1200px] mx-auto space-y-10">
          
          {/* HEADER */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-heading font-extrabold text-[32px] text-gray-900 mb-1 leading-tight tracking-tight">Agent Dashboard</h1>
              <p className="text-[#64748b] text-[15px] font-medium">Welcome back, Marcus. Here&apos;s your portfolio performance.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white shadow-sm border border-gray-100 rounded-full px-5 py-2.5">
                <Search className="w-[18px] h-[18px] text-[#a0afbe]" />
                <input type="text" placeholder="Search properties..." className="bg-transparent outline-none text-[14px] font-semibold w-48 text-gray-900 placeholder:text-[#a0afbe]" />
              </div>
              <div className="relative">
                <button className="w-11 h-11 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Bell className="w-5 h-5 text-[#64748b] fill-[#64748b]" />
                </button>
                <span className="absolute top-[10px] right-[12px] w-[8px] h-[8px] bg-[#d45622] border-2 border-white rounded-full" />
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Home, iconBg: 'bg-[#eefcf2]', iconColor: 'text-[#2dbe6c]', change: '+2%', label: 'Active Listings', value: '24' },
              { icon: Eye, iconBg: 'bg-[#eef2fe]', iconColor: 'text-[#4c6bf4]', change: '+15%', label: 'Total Views', value: '12,840' },
              { icon: Users, iconBg: 'bg-[#fff4e5]', iconColor: 'text-[#f98b18]', change: '+8%', label: 'Leads This Week', value: '42' },
            ].map(({ icon: Icon, iconBg, iconColor, change, label, value }) => (
              <div key={label} className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <span className="flex items-center gap-1 text-[#2dbe6c] text-[13px] font-bold">
                    <TrendingUp className="w-3.5 h-3.5" strokeWidth={3} /> {change}
                  </span>
                </div>
                <p className="text-[#8094a8] text-[13px] font-bold mb-1">{label}</p>
                <p className="font-heading font-extrabold text-[32px] text-gray-900 leading-none">{value}</p>
              </div>
            ))}
          </div>

          {/* CHART */}
          <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-heading font-extrabold text-[18px] text-gray-900 mb-1">Property Views Performance</h2>
                <p className="text-[#8094a8] text-[13px] font-semibold">Weekly engagement metrics for all active listings</p>
              </div>
              <div className="relative">
                <select className="appearance-none bg-[#f1f5f9] border border-gray-100 rounded-full px-5 py-2.5 pr-10 text-[13px] font-bold text-gray-900 outline-none cursor-pointer">
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 90 Days</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b] pointer-events-none" />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d45622" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#d45622" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#a0afbe', fontSize: 11, fontWeight: 'bold' }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  labelStyle={{ fontWeight: 800, color: '#111827' }}
                  itemStyle={{ fontWeight: 600, color: '#d45622' }}
                />
                <Area
                  type="monotone" dataKey="views" stroke="#d45622" strokeWidth={3}
                  fill="url(#viewsGradient)" dot={false} activeDot={{ r: 6, fill: '#d45622', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* MY LISTINGS TABLE */}
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden mb-12">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <h2 className="font-heading font-extrabold text-[18px] text-gray-900">My Listings</h2>
              <Link href="#" className="text-[#d45622] font-bold text-[13px] hover:underline">View All Listings</Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['PROPERTY', 'ADDRESS', 'PRICE', 'STATUS', 'PERFORMANCE', 'ACTIONS'].map((col) => (
                    <th key={col} className="text-left py-4 px-8 text-[11px] font-black text-[#a0afbe] uppercase tracking-widest">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listings.map((prop, i) => (
                  <tr key={prop.propertyId} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-[14px] overflow-hidden relative flex-shrink-0 shadow-sm">
                          <Image
                            src={prop.images[0]?.url || ''}
                            alt={prop.title} fill className="object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100'; }}
                          />
                        </div>
                        <span className="font-extrabold text-[14px] text-gray-900 truncate max-w-[140px] tracking-tight">{prop.title}</span>
                      </div>
                    </td>
                    <td className="py-5 px-8 text-[13px] font-semibold text-[#8094a8] max-w-[180px] break-words">
                      {prop.location.locality}, {prop.location.city}
                    </td>
                    <td className="py-5 px-8 font-extrabold text-[14px] text-gray-900">{prop.price.range}</td>
                    <td className="py-5 px-8">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-[6px] uppercase tracking-wide ${listingMeta[i % 3].status === 'ACTIVE' ? 'bg-[#eefcf2] text-[#2dbe6c]' : 'bg-[#fff4e5] text-[#f98b18]'}`}>
                        {prop.isNew ? 'PENDING' : listingMeta[i % 3].status}
                      </span>
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 text-[#475569] text-[13px] font-bold whitespace-nowrap">{prop.isNew ? 'New' : listingMeta[i % 3].views}</div>
                        <div className="w-[60px] bg-[#f1f5f9] rounded-full h-1.5 overflow-hidden">
                          <div className="h-1.5 bg-[#d45622] rounded-full" style={{ width: `${prop.isNew ? 0 : listingMeta[i % 3].perf}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <button className="p-2 rounded-[10px] bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#d45622] transition-colors shadow-sm">
                        <Pencil className="w-4 h-4 fill-current" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
