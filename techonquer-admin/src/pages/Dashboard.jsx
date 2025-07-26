import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BsPeopleFill, 
  BsFillBellFill, 
  BsBookFill, 
  BsFileTextFill, 
  BsArrowUpRight, 
  BsArrowDownRight, 
  BsThreeDots,
  BsGraphUp,
  BsClock,
  BsStar,
  BsEye,
  BsDownload
} from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const data = [
  { name: 'Jan', users: 200, alerts: 5, courses: 12, revenue: 15000 },
  { name: 'Feb', users: 400, alerts: 7, courses: 15, revenue: 22000 },
  { name: 'Mar', users: 350, alerts: 3, courses: 18, revenue: 18000 },
  { name: 'Apr', users: 500, alerts: 9, courses: 22, revenue: 28000 },
  { name: 'May', users: 600, alerts: 8, courses: 25, revenue: 35000 },
  { name: 'Jun', users: 750, alerts: 11, courses: 28, revenue: 42000 },
];

const pieData = [
  { name: 'Active Users', value: 750, color: '#8b5cf6' },
  { name: 'Inactive Users', value: 200, color: '#6b7280' },
  { name: 'Premium Users', value: 254, color: '#f59e0b' },
];

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Enrolled in React Course', time: '2 minutes ago', type: 'enrollment', avatar: '👨‍💻' },
  { id: 2, user: 'Jane Smith', action: 'Completed JavaScript Basics', time: '5 minutes ago', type: 'completion', avatar: '👩‍💻' },
  { id: 3, user: 'Mike Johnson', action: 'Uploaded new course material', time: '10 minutes ago', type: 'upload', avatar: '👨‍🎓' },
  { id: 4, user: 'Sarah Wilson', action: 'Generated monthly report', time: '15 minutes ago', type: 'report', avatar: '👩‍🎓' },
  { id: 5, user: 'Alex Brown', action: 'Updated course content', time: '20 minutes ago', type: 'update', avatar: '👨‍🏫' },
];

const quickStats = [
  { title: 'Total Revenue', value: '$156,420', change: '+12.5%', icon: BsGraphUp, color: 'from-emerald-500 to-teal-500' },
  { title: 'Active Sessions', value: '1,847', change: '+8.2%', icon: BsEye, color: 'from-blue-500 to-indigo-500' },
  { title: 'Course Completion', value: '94.2%', change: '+2.1%', icon: BsStar, color: 'from-yellow-500 to-orange-500' },
  { title: 'Avg. Session Time', value: '24m 32s', change: '+5.3%', icon: BsClock, color: 'from-purple-500 to-pink-500' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const hour = currentTime.getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    return () => clearInterval(timer);
  }, [currentTime]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'enrollment': return '📚';
      case 'completion': return '✅';
      case 'upload': return '📤';
      case 'report': return '📊';
      case 'update': return '🔄';
      default: return '📝';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'enrollment': return 'text-blue-400';
      case 'completion': return 'text-green-400';
      case 'upload': return 'text-purple-400';
      case 'report': return 'text-yellow-400';
      case 'update': return 'text-indigo-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            {greeting}, Admin!
          </h1>
          <p className="text-gray-400 text-lg">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} • {currentTime.toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Period Selector */}
          <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
            {['day', 'week', 'month', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedPeriod === period
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 border border-white/20">
              <BsFillBellFill className="text-xl" />
            </button>
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              3
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="text-white text-xl" />
                </div>
                <BsThreeDots className="text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
                <div className="flex items-center text-green-400 text-sm">
                  <BsArrowUpRight className="mr-1" />
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium mb-1">Total Users</p>
              <span className="text-3xl font-bold text-white">1,204</span>
              <div className="flex items-center mt-2">
                <BsArrowUpRight className="text-green-400 mr-1" />
                <span className="text-sm text-green-400">+12% this month</span>
              </div>
            </div>
            <div className="bg-purple-500/30 p-4 rounded-xl">
              <BsPeopleFill className="text-purple-300 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-xl border border-pink-500/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-200 text-sm font-medium mb-1">Active Alerts</p>
              <span className="text-3xl font-bold text-white">36</span>
              <div className="flex items-center mt-2">
                <BsArrowUpRight className="text-red-400 mr-1" />
                <span className="text-sm text-red-400">+8% this week</span>
              </div>
            </div>
            <div className="bg-pink-500/30 p-4 rounded-xl">
              <BsFillBellFill className="text-pink-300 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-1">Total Courses</p>
              <span className="text-3xl font-bold text-white">58</span>
              <div className="flex items-center mt-2">
                <BsArrowUpRight className="text-green-400 mr-1" />
                <span className="text-sm text-green-400">+4 new this month</span>
              </div>
            </div>
            <div className="bg-blue-500/30 p-4 rounded-xl">
              <BsBookFill className="text-blue-300 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-200 text-sm font-medium mb-1">Reports Generated</p>
              <span className="text-3xl font-bold text-white">14</span>
              <div className="flex items-center mt-2">
                <BsArrowDownRight className="text-gray-400 mr-1" />
                <span className="text-sm text-gray-300">Last 7 days</span>
              </div>
            </div>
            <div className="bg-yellow-500/30 p-4 rounded-xl">
              <BsFileTextFill className="text-yellow-300 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Revenue Analytics</h3>
              <p className="text-gray-400 text-sm">Monthly revenue and user growth</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white transition-colors">
                <BsDownload className="text-lg" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <BsThreeDots className="text-lg" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(147, 51, 234, 0.3)',
                  borderRadius: '12px',
                  color: '#fff',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#8b5cf6" 
                fillOpacity={1}
                fill="url(#colorUsers)"
                strokeWidth={3}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#ec4899" 
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">User Distribution</h3>
              <p className="text-gray-400 text-sm">Active vs inactive users</p>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <BsThreeDots className="text-lg" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(147, 51, 234, 0.3)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-300 text-sm">{item.name}</span>
                </div>
                <span className="text-white font-semibold text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Recent Activities</h3>
            <p className="text-gray-400 text-sm">Latest user and system activities</p>
          </div>
          <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors bg-purple-500/20 px-4 py-2 rounded-lg hover:bg-purple-500/30">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200 group">
              <div className="text-3xl mr-4">{activity.avatar}</div>
              <div className="flex-1">
                <p className="text-white font-semibold">{activity.user}</p>
                <p className={`text-sm ${getActivityColor(activity.type)}`}>{activity.action}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">{activity.time}</span>
                <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {getActivityIcon(activity.type)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
