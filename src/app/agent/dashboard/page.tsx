'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Home, LayoutDashboard, List, MessageSquare, BarChart2, Settings, Plus, Bell,
  Search, TrendingUp, Eye, Users, Pencil
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import propertiesData from '@/app/data/mumbaiProperties.json';

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
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'My Listings', icon: List, active: false },
  { label: 'Inquiries', icon: MessageSquare, active: false },
  { label: 'Performance', icon: BarChart2, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

export default function AgentDashboardPage() {
  const listings = propertiesData.slice(0, 3);

  return (
    <div className="flex h-screen bg-background font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-border flex flex-col h-full">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-foreground leading-tight">Realta</p>
              <p className="text-[10px] font-bold text-primary tracking-widest uppercase">Elite Agent</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                active ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted/10 hover:text-foreground'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-primary' : ''}`} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-4 border-t border-border">
          <Link
            href="/agent/new-listing"
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Property
          </Link>
          <div className="flex items-center gap-3 px-1">
            <Image
              src="https://ui-avatars.com/api/?name=Marcus+Sterling&background=1C2B3A&color=fff&size=36"
              alt="Marcus" width={36} height={36} className="rounded-full flex-shrink-0"
            />
            <div>
              <p className="font-semibold text-sm text-foreground">Marcus Sterling</p>
              <p className="text-xs text-muted">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto bg-background">
        {/* TOP BAR */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-2xl text-foreground">Agent Dashboard</h1>
            <p className="text-muted text-sm">Welcome back, Marcus. Here&apos;s your portfolio performance.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-muted" />
              <input type="text" placeholder="Search properties..." className="bg-transparent outline-none text-sm w-40 text-foreground placeholder:text-muted" />
            </div>
            <div className="relative">
              <button className="p-2.5 rounded-full border border-border hover:border-primary/40 transition-colors">
                <Bell className="w-5 h-5 text-foreground/70" />
              </button>
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Home, iconBg: 'bg-green-100', iconColor: 'text-green-600', change: '+2%', label: 'Active Listings', value: '24' },
              { icon: Eye, iconBg: 'bg-blue-100', iconColor: 'text-blue-600', change: '+15%', label: 'Total Views', value: '12,840' },
              { icon: Users, iconBg: 'bg-orange-100', iconColor: 'text-orange-600', change: '+8%', label: 'Leads This Week', value: '42' },
            ].map(({ icon: Icon, iconBg, iconColor, change, label, value }) => (
              <div key={label} className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                  </div>
                  <span className="flex items-center gap-1 text-green-600 text-sm font-bold">
                    <TrendingUp className="w-3.5 h-3.5" /> {change}
                  </span>
                </div>
                <p className="text-muted text-sm">{label}</p>
                <p className="font-heading font-bold text-3xl text-foreground mt-1">{value}</p>
              </div>
            ))}
          </div>

          {/* CHART */}
          <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-heading font-bold text-lg text-foreground">Property Views Performance</h2>
                <p className="text-muted text-sm">Weekly engagement metrics for all active listings</p>
              </div>
              <select className="border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary/50 bg-background">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E8622A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#E8622A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E5E0D8', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 700, color: '#1A1A1A' }}
                />
                <Area
                  type="monotone" dataKey="views" stroke="#E8622A" strokeWidth={2.5}
                  fill="url(#viewsGradient)" dot={false} activeDot={{ r: 5, fill: '#E8622A' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* MY LISTINGS TABLE */}
          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-heading font-bold text-lg text-foreground">My Listings</h2>
              <Link href="#" className="text-primary font-semibold text-sm hover:underline">View All Listings</Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-muted/5">
                  {['PROPERTY', 'ADDRESS', 'PRICE', 'STATUS', 'PERFORMANCE', 'ACTIONS'].map((col) => (
                    <th key={col} className="text-left py-3 px-4 text-xs font-bold text-muted uppercase tracking-wide">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listings.map((prop, i) => (
                  <tr key={prop.propertyId} className="border-t border-border/50 hover:bg-muted/5 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0">
                          <Image
                            src={prop.images[0]?.url || ''}
                            alt={prop.title} fill className="object-cover"
                            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100'; }}
                          />
                        </div>
                        <span className="font-semibold text-sm text-foreground truncate max-w-[120px]">{prop.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted">{prop.location.locality}, {prop.location.city}</td>
                    <td className="py-4 px-4 font-bold text-sm text-foreground">{prop.price.range}</td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${listingMeta[i].statusColor}`}>
                        {listingMeta[i].status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-muted/20 rounded-full h-1.5 max-w-[80px]">
                          <div className="h-1.5 bg-primary rounded-full" style={{ width: `${listingMeta[i].perf}%` }} />
                        </div>
                        <span className="text-xs text-muted whitespace-nowrap">{listingMeta[i].views}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="p-1.5 rounded-lg hover:bg-muted/10 text-muted hover:text-foreground transition-colors">
                        <Pencil className="w-4 h-4" />
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
