import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { 
  BsPlus, 
  BsSearch, 
  BsEye, 
  BsPencil, 
  BsTrash, 
  BsBookFill, 
  BsPeopleFill, 
  BsGraphUpArrow,
  BsFilter,
  BsDownload,
  BsUpload
} from 'react-icons/bs';
import { Card, Button, Input, Badge } from '../components/ui';

const courseStats = [
  { name: 'React', enrolled: 120, completion: 80 },
  { name: 'Node.js', enrolled: 95, completion: 60 },
  { name: 'Python', enrolled: 150, completion: 110 },
  { name: 'AI/ML', enrolled: 70, completion: 40 },
];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Simulate loading courses
    setCourses([
      { id: 1, title: 'React Fundamentals', instructor: 'John Doe', category: 'Programming', level: 'Beginner', price: 2999, students: 120 },
      { id: 2, title: 'Node.js Backend', instructor: 'Jane Smith', category: 'Programming', level: 'Intermediate', price: 3999, students: 95 },
      { id: 3, title: 'Python for AI', instructor: 'Bob Johnson', category: 'AI/ML', level: 'Advanced', price: 4999, students: 150 },
    ]);
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.instructor.toLowerCase().includes(search.toLowerCase()) ||
    course.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Courses</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Create, edit, and manage your course catalog</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" className="gap-2">
            <BsDownload />
            Export
          </Button>
          <Button variant="primary" size="md" className="gap-2" onClick={() => setShowForm(!showForm)}>
            <BsPlus />
            Add Course
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1">
            <Input
              icon={BsSearch}
              placeholder="Search courses by title, instructor, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md" className="gap-2">
              <BsFilter />
              Filter
            </Button>
            <select className="px-4 py-2.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="programming">Programming</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="elevated" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Total Courses</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{courses.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <BsBookFill className="text-white text-xl" />
            </div>
          </div>
        </Card>

        <Card variant="elevated" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Total Students</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {courses.reduce((sum, course) => sum + course.students, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <BsPeopleFill className="text-white text-xl" />
            </div>
          </div>
        </Card>

        <Card variant="elevated" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Avg. Price</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                ₹{Math.round(courses.reduce((sum, course) => sum + course.price, 0) / courses.length || 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BsGraphUpArrow className="text-white text-xl" />
            </div>
          </div>
        </Card>

        <Card variant="elevated" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Categories</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {new Set(courses.map(course => course.category)).size}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <BsFilter className="text-white text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Courses Table */}
      <Card variant="elevated">
        <Card.Header>
          <Card.Title>All Courses</Card.Title>
        </Card.Header>
        <Card.Content padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Instructor</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Level</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold">
                          {course.title.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900 dark:text-white">{course.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {course.instructor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary">{course.category}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={course.level === 'Beginner' ? 'success' : course.level === 'Intermediate' ? 'warning' : 'danger'}>
                        {course.level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      ₹{course.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {course.students}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <BsEye />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BsPencil />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BsTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="elevated">
          <Card.Header>
            <Card.Title>Enrollment Overview</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrolled" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Content>
        </Card>

        <Card variant="elevated">
          <Card.Header>
            <Card.Title>Completion Rate</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courseStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completion" stroke="#22c55e" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
