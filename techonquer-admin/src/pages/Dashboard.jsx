import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  FiUsers, 
  FiBookOpen, 
  FiTrendingUp, 
  FiDollarSign,
  FiEye,
  FiDownload,
  FiPlus,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      id: 1,
      title: 'Total Users',
      value: '12,543',
      change: '+12.5%',
      trend: 'up',
      icon: FiUsers,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 2,
      title: 'Active Courses',
      value: '248',
      change: '+8.2%',
      trend: 'up',
      icon: FiBookOpen,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 3,
      title: 'Revenue',
      value: '$45,678',
      change: '+15.3%',
      trend: 'up',
      icon: FiDollarSign,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 4,
      title: 'Completion Rate',
      value: '78.9%',
      change: '-2.1%',
      trend: 'down',
      icon: FiTrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'New user registration',
      user: 'John Doe',
      time: '2 minutes ago',
      icon: FiUsers,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 2,
      type: 'course',
      message: 'Course completed',
      user: 'Sarah Smith',
      time: '5 minutes ago',
      icon: FiBookOpen,
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 3,
      type: 'payment',
      message: 'Payment received',
      user: 'Mike Johnson',
      time: '10 minutes ago',
      icon: FiDollarSign,
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 4,
      type: 'course',
      message: 'New course published',
      user: 'Admin',
      time: '1 hour ago',
      icon: FiPlus,
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const topCourses = [
    {
      id: 1,
      name: 'React Fundamentals',
      students: 1234,
      rating: 4.8,
      revenue: '$12,450'
    },
    {
      id: 2,
      name: 'Node.js Masterclass',
      students: 987,
      rating: 4.9,
      revenue: '$9,870'
    },
    {
      id: 3,
      name: 'Python for Beginners',
      students: 756,
      rating: 4.7,
      revenue: '$7,560'
    },
    {
      id: 4,
      name: 'JavaScript Advanced',
      students: 543,
      rating: 4.6,
      revenue: '$5,430'
    }
  ];

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Welcome back! Here's what's happening.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <Button variant="outline" size="sm">
            <FiDownload className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? FiArrowUp : FiArrowDown;
          
          return (
            <Card key={stat.id} className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {stat.value}
                  </p>
                  <div className={`flex items-center text-sm ${
                    stat.trend === 'up' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    <TrendIcon className="w-4 h-4 mr-1" />
                    {stat.change}
                  </div>
                </div>
                
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="p-6">
          <Card.Header className="pb-4">
            <Card.Title className="flex items-center justify-between">
              <span>Recent Activities</span>
              <Button variant="ghost" size="sm">
                <FiEye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </Card.Title>
          </Card.Header>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className={`p-2 rounded-lg ${activity.iconBg}`}>
                    <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      by {activity.user}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Top Courses */}
        <Card className="p-6">
          <Card.Header className="pb-4">
            <Card.Title className="flex items-center justify-between">
              <span>Top Performing Courses</span>
              <Button variant="ghost" size="sm">
                <FiEye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </Card.Title>
          </Card.Header>
          
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={course.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {course.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {course.students} students • ⭐ {course.rating}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {course.revenue}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-6">
          <Card.Header className="pb-4">
            <Card.Title>Revenue Overview</Card.Title>
          </Card.Header>
          
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="w-8 h-8 text-white" />
              </div>
              <p className="text-slate-600 dark:text-slate-400">Chart component would go here</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">Integration with Chart.js or similar</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <Card.Header className="pb-4">
            <Card.Title>Quick Actions</Card.Title>
          </Card.Header>
          
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FiPlus className="w-4 h-4 mr-3" />
              Add New Course
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <FiUsers className="w-4 h-4 mr-3" />
              Manage Users
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <FiTrendingUp className="w-4 h-4 mr-3" />
              View Reports
            </Button>
            
            <Button className="w-full justify-start" variant="primary">
              <FiDownload className="w-4 h-4 mr-3" />
              Generate Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
