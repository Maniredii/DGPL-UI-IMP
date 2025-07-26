import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPeopleFill, BsFillBellFill, BsBookFill, BsFileTextFill, BsArrowUpRight, BsArrowDownRight, BsThreeDots } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Jan', users: 200, alerts: 5, courses: 12 },
  { name: 'Feb', users: 400, alerts: 7, courses: 15 },
  { name: 'Mar', users: 350, alerts: 3, courses: 18 },
  { name: 'Apr', users: 500, alerts: 9, courses: 22 },
  { name: 'May', users: 600, alerts: 8, courses: 25 },
  { name: 'Jun', users: 750, alerts: 11, courses: 28 },
];

const pieData = [
  { name: 'Active Users', value: 750, color: '#8b5cf6' },
  { name: 'Inactive Users', value: 200, color: '#6b7280' },
  { name: 'Premium Users', value: 254, color: '#f59e0b' },
];

const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Enrolled in React Course', time: '2 minutes ago', type: 'enrollment' },
  { id: 2, user: 'Jane Smith', action: 'Completed JavaScript Basics', time: '5 minutes ago', type: 'completion' },
  { id: 3, user: 'Mike Johnson', action: 'Uploaded new course material', time: '10 minutes ago', type: 'upload' },
  { id: 4, user: 'Sarah Wilson', action: 'Generated monthly report', time: '15 minutes ago', type: 'report' },
  { id: 5, user: 'Alex Brown', action: 'Updated course content', time: '20 minutes ago', type: 'update' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

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
    <div className="p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">{greeting}, Admin!</h1>
          <p className="text-gray-300">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} • {currentTime.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-105">
              <BsFillBellFill className="text-xl" />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/20 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm font-medium">Total Users</p>
              <span className="text-3xl font-bold text-white">1,204</span>
              <div className="flex items-center mt-2">
                <BsArrowUpRight className="text-green-400 mr-1" />
                <span className="text-sm text-green-400">+12% this month</span>
              </div>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-full">
              <BsPeopleFill className="text-purple-400 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-900/50 to-pink-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-pink-500/20 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-200 text-sm font-medium">Active Alerts</p>
              <span className="text-3xl font-bold text-white">36</span>
              <div className="flex items-center mt-2">
                <BsArrowUpRight className="text-red-400 mr-1" />
                <span className="text-sm text-red-400">+8% this week</span>
              </div>
            </div>
            <div className="bg-pink-500/20 p-3 rounded-full">
              <BsFillBellFill className="text-pink-400 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-500/20 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium">Total Courses</p>
              <span className="text-3xl font-bold text-white">58</span>
              <div className="flex items-center mt-2">
                <BsArrowUpRight className="text-green-400 mr-1" />
                <span className="text-sm text-green-400">+4 new this month</span>
              </div>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <BsBookFill className="text-blue-400 text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-yellow-500/20 transform hover:scale-105 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-200 text-sm font-medium">Reports Generated</p>
              <span className="text-3xl font-bold text-white">14</span>
              <div className="flex items-center mt-2">
                <BsArrowDownRight className="text-gray-400 mr-1" />
                <span className="text-sm text-gray-300">Last 7 days</span>
              </div>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-full">
              <BsFileTextFill className="text-yellow-400 text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">User Growth & Alerts</h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <BsThreeDots className="text-xl" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.9)',
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

        {/* Pie Chart */}
        <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">User Distribution</h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <BsThreeDots className="text-xl" />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
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
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-500/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Activities</h3>
          <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200">
              <div className="text-2xl mr-4">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.user}</p>
                <p className={`text-sm ${getActivityColor(activity.type)}`}>{activity.action}</p>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
