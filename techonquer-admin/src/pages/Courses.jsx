import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiFilter,
  FiUsers,
  FiStar,
  FiDollarSign,
  FiClock,
  FiBookOpen,
  FiEye,
  FiMoreVertical
} from 'react-icons/fi';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in real app this would come from an API
  const mockCourses = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Learn the basics of React including components, state, and props.',
      instructor: 'John Smith',
      price: 99.99,
      originalPrice: 149.99,
      students: 1234,
      rating: 4.8,
      reviews: 156,
      duration: '8 weeks',
      lessons: 24,
      level: 'Beginner',
      status: 'published',
      category: 'Web Development',
      thumbnail: 'https://via.placeholder.com/300x200',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      title: 'Advanced Node.js',
      description: 'Master backend development with Node.js and Express.',
      instructor: 'Sarah Johnson',
      price: 149.99,
      originalPrice: 199.99,
      students: 987,
      rating: 4.9,
      reviews: 98,
      duration: '12 weeks',
      lessons: 36,
      level: 'Advanced',
      status: 'published',
      category: 'Backend Development',
      thumbnail: 'https://via.placeholder.com/300x200',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      title: 'Python for Data Science',
      description: 'Complete guide to data analysis and machine learning with Python.',
      instructor: 'Dr. Michael Chen',
      price: 199.99,
      originalPrice: 299.99,
      students: 756,
      rating: 4.7,
      reviews: 234,
      duration: '16 weeks',
      lessons: 48,
      level: 'Intermediate',
      status: 'draft',
      category: 'Data Science',
      thumbnail: 'https://via.placeholder.com/300x200',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-22'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(course => course.status === filterStatus);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, filterStatus, courses]);

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Intermediate':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-48"></div>
          <div className="flex gap-4">
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-64"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-32"></div>
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-lg w-32"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-80 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
            ))}
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Courses</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your course catalog and content
          </p>
        </div>
        
        <Button onClick={handleAddCourse} className="sm:w-auto">
          <FiPlus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search courses, instructors, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              icon={FiSearch}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            
            <Button variant="outline" size="sm">
              <FiFilter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Course Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Courses</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{courses.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FiBookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Published</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {courses.filter(c => c.status === 'published').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <FiEye className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {courses.reduce((total, course) => total + course.students, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <FiUsers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                ${courses.reduce((total, course) => total + (course.price * course.students), 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <FiDollarSign className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBookOpen className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No courses found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first course'
            }
          </p>
          {!searchTerm && filterStatus === 'all' && (
            <Button onClick={handleAddCourse}>
              <FiPlus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              {/* Course Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                      onClick={() => handleEditCourse(course)}
                    >
                      <FiEdit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-white/80 text-sm">by {course.instructor}</p>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{course.category}</span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <FiUsers className="w-4 h-4 mr-1" />
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <FiClock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <FiStar className="w-4 h-4 mr-1 text-yellow-500" />
                    {course.rating} ({course.reviews})
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <FiBookOpen className="w-4 h-4 mr-1" />
                    {course.lessons} lessons
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      ${course.price}
                    </span>
                    {course.originalPrice > course.price && (
                      <span className="text-sm text-slate-500 dark:text-slate-400 line-through">
                        ${course.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Revenue: ${(course.price * course.students).toLocaleString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEditCourse(course)}
                  >
                    <FiEdit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                  >
                    <FiEye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedCourse ? 'Edit Course' : 'Add New Course'}
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Course Title
            </label>
            <Input
              type="text"
              placeholder="Enter course title"
              defaultValue={selectedCourse?.title || ''}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:text-white"
              rows={3}
              placeholder="Enter course description"
              defaultValue={selectedCourse?.description || ''}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Price
              </label>
              <Input
                type="number"
                placeholder="0.00"
                defaultValue={selectedCourse?.price || ''}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Level
              </label>
              <select
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:text-white"
                defaultValue={selectedCourse?.level || 'Beginner'}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              {selectedCourse ? 'Update Course' : 'Create Course'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Courses;
