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
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses?page=1`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setCourses(data.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/testimonials?page=1&limit=10&isActive=true`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchCourses();
    fetchTestimonials();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(search.toLowerCase())
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
          <Button variant="primary" size="md" className="gap-2">
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

      {/* Courses Table */}
      <Card variant="elevated">
        <Card.Header>
          <Card.Title>Course Management</Card.Title>
          <Card.Description>Manage course details and pricing</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '2px solid #374151' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>S.No</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Course</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Instructor</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Level</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <tr key={course._id} style={{ borderBottom: '1px solid #374151' }}>
                    <td style={{ padding: '12px' }}>{index + 1}</td>
                    <td style={{ padding: '12px' }}>
                      <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-gray-400">
                          {course.shortDescription || course.description?.substring(0, 50) + '...'}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>{course.instructor || 'N/A'}</td>
                    <td style={{ padding: '12px' }}>{course.category || 'N/A'}</td>
                    <td style={{ padding: '12px' }}>
                      <span className={`px-2 py-1 rounded text-xs ${
                        course.level === 'Beginner' ? 'bg-green-600' :
                        course.level === 'Intermediate' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`}>
                        {course.level || 'N/A'}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div>
                        <div className="font-medium">₹{course.price}</div>
                        {course.originalPrice && course.originalPrice > course.price && (
                          <div className="text-sm text-gray-400 line-through">
                            ₹{course.originalPrice}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded">
                          View
                        </button>
                        <button className="px-3 py-1 text-sm bg-yellow-600 hover:bg-yellow-700 text-white rounded">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>

      {/* Testimonials Table */}
      <h2 className="text-2xl font-bold mb-4 mt-12">Testimonials</h2>
      <Card variant="elevated">
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '2px solid #374151' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>S.No.</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Company</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Rating</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Message</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.length > 0 ? testimonials.map((testimonial, index) => (
                  <tr key={testimonial._id} style={{ borderBottom: '1px solid #374151' }}>
                    <td style={{ padding: '12px' }}>{index + 1}</td>
                    <td style={{ padding: '12px' }}>
                      <div className="flex items-center space-x-3">
                        {testimonial.profilePicture && (
                          <img 
                            src={testimonial.profilePicture} 
                            alt="profile" 
                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name || 'User')}&background=6366f1&color=fff`;
                            }}
                          />
                        )}
                        <span className="font-medium">{testimonial.name || 'N/A'}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>{testimonial.company || 'N/A'}</td>
                    <td style={{ padding: '12px' }}>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-lg ${i < (testimonial.rating || 0) ? 'text-yellow-400' : 'text-gray-600'}`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="ml-2 text-sm text-gray-400">({testimonial.rating || 0}/5)</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px', maxWidth: '300px' }}>
                      <div className="text-sm text-gray-300 line-clamp-2">
                        {testimonial.message ? (
                          testimonial.message.length > 100 
                            ? testimonial.message.substring(0, 100) + '...' 
                            : testimonial.message
                        ) : 'No message'}
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded">
                          View
                        </button>
                        <button className="px-3 py-1 text-sm bg-yellow-600 hover:bg-yellow-700 text-white rounded">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>
                      No testimonials found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Enrollment Overview</Card.Title>
          </Card.Header>
          <Card.Content>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#38bdf8" />
              </BarChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Completion Rate</Card.Title>
          </Card.Header>
          <Card.Content>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={courseStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completion" stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
