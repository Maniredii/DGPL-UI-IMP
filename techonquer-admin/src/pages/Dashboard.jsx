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
import { Card, Button, Badge } from '../components/ui';

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
      <div className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/50 rounded-xl p-4 shadow-2xl animate-scale-in">
        <p className="text-slate-900 dark:text-white font-semibold mb-3 text-sm">{label}</p>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                  {entry.name}
                </span>
              </div>
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          ))}
        </div>
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
    <Card
      className={`transform transition-all duration-500 hover:scale-105 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      hover
      variant="elevated"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} shadow-sm`}>
          <Icon className="text-2xl text-white" />
        </div>
        <Badge
          variant={changeType === 'increase' ? 'success' : 'danger'}
          className="flex items-center gap-1"
        >
          {changeType === 'increase' ? <BsArrowUpRight /> : <BsArrowDownRight />}
          {change}
        </Badge>
      </div>
      <div>
        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
    </Card>
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
        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
          <div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2 flex items-center gap-2">
            <BsCalendar3 className="text-sm" />
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
            {['1W', '1M', '3M', '6M', '1Y'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedPeriod === period
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
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
          color="bg-blue-600"
          subtitle="Active this month"
        />
        <StatsCard
          icon={BsFillBellFill}
          title="Active Alerts"
          value="36"
          change="8%"
          changeType="increase"
          color="bg-purple-600"
          subtitle="Requires attention"
        />
        <StatsCard
          icon={BsBookFill}
          title="Total Courses"
          value="73"
          change="15%"
          changeType="increase"
          color="bg-green-600"
          subtitle="Published courses"
        />
        <StatsCard
          icon={BsGraphUpArrow}
          title="Revenue"
          value="$35,000"
          change="23%"
          changeType="increase"
          color="bg-orange-600"
          subtitle="This month"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card variant="elevated">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title>User Growth</Card.Title>
                <Card.Description>Monthly active users trend</Card.Description>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success" className="flex items-center gap-1">
                  <BsArrowUpRight className="text-xs" />
                  Growing
                </Badge>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
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
          </Card.Content>
        </Card>

        {/* Course Distribution */}
        <Card variant="elevated">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title>Course Distribution</Card.Title>
                <Card.Description>Students per course category</Card.Description>
              </div>
              <div className="flex items-center gap-2">
                <BsEyeFill className="text-slate-400 dark:text-slate-500" />
                <span className="text-sm text-slate-500 dark:text-slate-400">1,570 total</span>
              </div>
            </div>
          </Card.Header>
          <Card.Content>
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
                    <p className="text-slate-900 dark:text-white text-sm font-medium">{course.name}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{course.students} students</p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2" variant="elevated">
          <Card.Header>
            <div className="flex items-center justify-between">
              <div>
                <Card.Title>Recent Activity</Card.Title>
                <Card.Description>Latest user interactions</Card.Description>
              </div>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'enrollment' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                    activity.type === 'completion' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                    activity.type === 'review' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                    'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  }`}>
                    {activity.type === 'enrollment' ? <BsBookFill /> :
                     activity.type === 'completion' ? <BsGraphUpArrow /> :
                     activity.type === 'review' ? <BsEyeFill /> :
                     <BsFileTextFill />}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 dark:text-white text-sm">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center gap-1">
                      <BsClockHistory />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card variant="elevated">
            <Card.Header>
              <Card.Title>Quick Actions</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <Button variant="primary" className="w-full justify-start gap-3">
                  <BsBookFill />
                  Add New Course
                </Button>
                <Button variant="secondary" className="w-full justify-start gap-3">
                  <BsPeopleFill />
                  Manage Users
                </Button>
                <Button variant="secondary" className="w-full justify-start gap-3">
                  <BsFileTextFill />
                  Generate Report
                </Button>
              </div>
            </Card.Content>
          </Card>

          {/* System Status */}
          <Card variant="elevated">
            <Card.Header>
              <Card.Title>System Status</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Server Status</span>
                  <Badge variant="success">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Database</span>
                  <Badge variant="success">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">API Status</span>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Last Backup</span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">2 hours ago</span>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-600 dark:text-slate-400 text-sm">Storage Used</span>
                    <span className="text-slate-900 dark:text-white text-sm font-semibold">68%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: '68%' }}></div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
}
