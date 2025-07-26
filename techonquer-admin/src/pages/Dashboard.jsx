import React, { useState, useEffect } from 'react';
import {
  BsPeopleFill,
  BsFillBellFill,
  BsBookFill,
  BsFileTextFill,
  BsArrowUpRight,
  BsArrowDownRight,
  BsEyeFill,
  BsGraphUpArrow,
  BsCalendar3,
  BsClockHistory
} from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { name: 'Jan', users: 200, alerts: 5, revenue: 12000, courses: 45 },
  { name: 'Feb', users: 400, alerts: 7, revenue: 18000, courses: 52 },
  { name: 'Mar', users: 350, alerts: 3, revenue: 15000, courses: 48 },
  { name: 'Apr', users: 500, alerts: 9, revenue: 22000, courses: 61 },
  { name: 'May', users: 600, alerts: 8, revenue: 28000, courses: 67 },
  { name: 'Jun', users: 750, alerts: 11, revenue: 35000, courses: 73 },
];

const courseData = [
  { name: 'React', students: 450, color: '#0ea5e9' },
  { name: 'Node.js', students: 320, color: '#d946ef' },
  { name: 'Python', students: 280, color: '#22c55e' },
  { name: 'JavaScript', students: 520, color: '#f59e0b' },
];

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'enrolled in React Course', time: '2 minutes ago', type: 'enrollment' },
  { id: 2, user: 'Jane Smith', action: 'completed JavaScript Module', time: '5 minutes ago', type: 'completion' },
  { id: 3, user: 'Mike Johnson', action: 'left a 5-star review', time: '10 minutes ago', type: 'review' },
  { id: 4, user: 'Sarah Wilson', action: 'started Python Course', time: '15 minutes ago', type: 'enrollment' },
  { id: 5, user: 'David Brown', action: 'submitted assignment', time: '20 minutes ago', type: 'submission' },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 border border-white/20">
        <p className="text-white font-semibold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, change, changeType, color, subtitle }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`card transform transition-all duration-500 hover:scale-105 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-br ${color}`}>
            <Icon className="text-2xl text-white" />
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
            changeType === 'increase'
              ? 'bg-green-500/20 text-green-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {changeType === 'increase' ? <BsArrowUpRight /> : <BsArrowDownRight />}
            {change}
          </div>
        </div>
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
          <p className="text-3xl font-bold text-white mb-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('6M');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="loading-skeleton skeleton-title"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="loading-skeleton skeleton-card"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="loading-skeleton skeleton-card"></div>
          <div className="loading-skeleton skeleton-card"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gradient font-display">Dashboard Overview</h1>
          <p className="text-gray-400 mt-2 flex items-center gap-2">
            <BsCalendar3 className="text-sm" />
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
            {['1W', '1M', '3M', '6M', '1Y'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={BsPeopleFill}
          title="Total Users"
          value="1,204"
          change="12%"
          changeType="increase"
          color="from-blue-500 to-blue-600"
          subtitle="Active this month"
        />
        <StatsCard
          icon={BsFillBellFill}
          title="Active Alerts"
          value="36"
          change="8%"
          changeType="increase"
          color="from-purple-500 to-purple-600"
          subtitle="Requires attention"
        />
        <StatsCard
          icon={BsBookFill}
          title="Total Courses"
          value="73"
          change="15%"
          changeType="increase"
          color="from-green-500 to-green-600"
          subtitle="Published courses"
        />
        <StatsCard
          icon={BsGraphUpArrow}
          title="Revenue"
          value="$35,000"
          change="23%"
          changeType="increase"
          color="from-orange-500 to-orange-600"
          subtitle="This month"
        />

          <div className="w-80 bg-gradient-to-r from-pink-900/50 to-pink-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-pink-500/20 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3">
              <BsFillBellFill className="text-pink-400 text-4xl" />
              <div className="flex-1">
                <p className="text-pink-200 text-lg font-semibold">Active Alerts</p>
                <span className="text-4xl font-bold text-white">36</span>
                <p className="text-sm text-red-400 flex items-center mt-1">
                  <span className="mr-1">↑</span> 8% this week
                </p>
              </div>
            </div>
          </div>

          <div className="w-80 bg-gradient-to-r from-blue-900/50 to-blue-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-500/20 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3">
              <BsBookFill className="text-blue-400 text-4xl" />
              <div className="flex-1">
                <p className="text-blue-200 text-lg font-semibold">Total Courses</p>
                <span className="text-4xl font-bold text-white">58</span>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <span className="mr-1">↑</span> 4 new this month
                </p>
              </div>
            </div>
          </div>

          <div className="w-80 bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-yellow-500/20 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center gap-3">
              <BsFileTextFill className="text-yellow-400 text-4xl" />
              <div className="flex-1">
                <p className="text-yellow-200 text-lg font-semibold">Reports Generated</p>
                <span className="text-4xl font-bold text-white">14</span>
                <p className="text-sm text-gray-300 mt-1">Last 7 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section - Full width below */}
      <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/20">
        <h3 className="text-xl font-semibold mb-4 text-white">User Growth & Alerts</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(147, 51, 234, 0.3)',
                borderRadius: '8px',
                color: '#fff',
                backdropFilter: 'blur(4px)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="alerts" 
              stroke="#ec4899" 
              strokeWidth={3}
              dot={{ fill: '#ec4899', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
