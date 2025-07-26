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
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">User Growth</h3>
                <p className="text-gray-400 text-sm">Monthly active users trend</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="status-indicator status-success">
                  <BsArrowUpRight className="text-xs" />
                  Growing
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    fill="url(#userGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Course Distribution */}
        <div className="card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Course Distribution</h3>
                <p className="text-gray-400 text-sm">Students per course category</p>
              </div>
              <div className="flex items-center gap-2">
                <BsEyeFill className="text-gray-400" />
                <span className="text-sm text-gray-400">1,570 total</span>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="students"
                  >
                    {courseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {courseData.map((course, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: course.color }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{course.name}</p>
                    <p className="text-gray-400 text-xs">{course.students} students</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 card">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                <p className="text-gray-400 text-sm">Latest user interactions</p>
              </div>
              <button className="btn btn-secondary text-xs">
                View All
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'enrollment' ? 'bg-blue-500/20 text-blue-400' :
                    activity.type === 'completion' ? 'bg-green-500/20 text-green-400' :
                    activity.type === 'review' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {activity.type === 'enrollment' ? <BsBookFill /> :
                     activity.type === 'completion' ? <BsGraphUpArrow /> :
                     activity.type === 'review' ? <BsEyeFill /> :
                     <BsFileTextFill />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-gray-400 text-xs flex items-center gap-1">
                      <BsClockHistory />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-bold text-white">Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <button className="btn btn-primary w-full justify-start">
                  <BsBookFill />
                  Add New Course
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <BsPeopleFill />
                  Manage Users
                </button>
                <button className="btn btn-secondary w-full justify-start">
                  <BsFileTextFill />
                  Generate Report
                </button>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-bold text-white">System Status</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Server Status</span>
                  <div className="status-indicator status-success">Online</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Database</span>
                  <div className="status-indicator status-success">Connected</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">API Status</span>
                  <div className="status-indicator status-success">Active</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Last Backup</span>
                  <span className="text-gray-400 text-sm">2 hours ago</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 text-sm">Storage Used</span>
                    <span className="text-white text-sm font-semibold">68%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
