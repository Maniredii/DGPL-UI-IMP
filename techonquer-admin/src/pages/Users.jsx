import React, { useState, useEffect } from 'react';
import {
  BsPeopleFill,
  BsPersonPlusFill,
  BsEyeFill,
  BsPencilFill,
  BsTrashFill,
  BsDownload,
  BsUpload,
  BsFilterLeft,
  BsSearch,
  BsPlus,
  BsThreeDotsVertical,
  BsCheckCircle,
  BsXCircle,
  BsClock,
  BsExclamationTriangle
} from 'react-icons/bs';
import { Card, Button, Input, Badge } from '../components/ui';

// Enhanced dummy data
const generateUsers = () => {
  const roles = ['Student', 'Instructor', 'Admin', 'Moderator'];
  const statuses = ['Active', 'Inactive', 'Pending', 'Suspended'];
  const names = [
    'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Edward Norton',
    'Fiona Apple', 'George Lucas', 'Helen Mirren', 'Ian McKellen', 'Julia Roberts',
    'Kevin Spacey', 'Laura Croft', 'Michael Jordan', 'Nancy Drew', 'Oscar Wilde',
    'Patricia Hill', 'Quincy Jones', 'Rachel Green', 'Samuel Jackson', 'Tina Turner'
  ];

  return names.map((name, index) => ({
    id: index + 1,
    name,
    email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    joinDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    lastActive: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    coursesEnrolled: Math.floor(Math.random() * 10) + 1
  }));
};

// Users Table Component
const UsersTable = ({ users }) => {
  const getStatusBadge = (status) => {
    const variants = {
      'Active': 'success',
      'Inactive': 'secondary',
      'Pending': 'warning',
      'Suspended': 'danger'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getRoleBadge = (role) => {
    const variants = {
      'Admin': 'danger',
      'Instructor': 'primary',
      'Student': 'secondary',
      'Moderator': 'info'
    };
    return <Badge variant={variants[role] || 'secondary'}>{role}</Badge>;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-800/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Join Date</th>
            <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Courses</th>
            <th className="px-6 py-4 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getRoleBadge(user.role)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(user.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {user.joinDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                {user.coursesEnrolled}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <BsEyeFill />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <BsPencilFill />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <BsTrashFill />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create'
  const toast = useToast();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUsers(generateUsers());
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {value.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-white">{value}</div>
            <div className="text-xs text-gray-400">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className={`badge ${
          value === 'Admin' ? 'badge-danger' :
          value === 'Instructor' ? 'badge-primary' :
          value === 'Moderator' ? 'badge-warning' :
          'badge-secondary'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <div className={`status-indicator ${
          value === 'Active' ? 'status-success' :
          value === 'Inactive' ? 'status-error' :
          value === 'Pending' ? 'status-warning' :
          'status-error'
        }`}>
          {value}
        </div>
      )
    },
    {
      key: 'coursesEnrolled',
      label: 'Courses',
      render: (value) => (
        <span className="text-white font-medium">{value}</span>
      )
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      render: (value) => (
        <span className="text-gray-300">{value}</span>
      )
    },
    {
      key: 'lastActive',
      label: 'Last Active',
      render: (value) => (
        <span className="text-gray-300">{value}</span>
      )
    }
  ];

  const actions = [
    {
      label: 'View',
      icon: <BsEyeFill size={14} />,
      onClick: (user) => {
        setSelectedUser(user);
        setModalMode('view');
        setShowUserModal(true);
      },
      className: 'view'
    },
    {
      label: 'Edit',
      icon: <BsPencilFill size={14} />,
      onClick: (user) => {
        setSelectedUser(user);
        setModalMode('edit');
        setShowUserModal(true);
      },
      className: 'edit'
    },
    {
      label: 'Delete',
      icon: <BsTrashFill size={14} />,
      onClick: (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
          setUsers(prev => prev.filter(u => u.id !== user.id));
          toast.success(`${user.name} has been deleted successfully`);
        }
      },
      className: 'delete'
    }
  ];

  const handleCreateUser = () => {
    setSelectedUser(null);
    setModalMode('create');
    setShowUserModal(true);
  };

  const handleExportUsers = () => {
    toast.info('Exporting users data...');
    // Simulate export
    setTimeout(() => {
      toast.success('Users data exported successfully');
    }, 2000);
  };

  const handleImportUsers = () => {
    toast.info('Import functionality would open file picker');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-2">
            <BsPeopleFill className="text-sm" />
            Manage and monitor all platform users
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" className="gap-2" onClick={handleExportUsers}>
            <BsDownload />
            Export
          </Button>
          <Button variant="secondary" size="md" className="gap-2" onClick={handleImportUsers}>
            <BsUpload />
            Import
          </Button>
          <Button
            variant="primary"
            size="md"
            className="gap-2"
            onClick={handleCreateUser}
          >
            <BsPlus />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="elevated" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <BsPeopleFill className="text-white text-xl" />
            </div>
          </div>
        </Card>

        <Card variant="elevated" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {users.filter(u => u.status === 'Active').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <BsCheckCircle className="text-white text-xl" />
            </div>
          </div>
        </Card>

        <Card variant="elevated" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Instructors</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {users.filter(u => u.role === 'Instructor').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BsPencilFill className="text-white text-xl" />
            </div>
          </div>
        </Card>

        <Card variant="elevated" hover>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {users.filter(u => u.status === 'Pending').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <BsClock className="text-white text-xl" />
            </div>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card variant="elevated">
        <Card.Header>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Card.Title>All Users</Card.Title>
            <div className="flex items-center gap-3">
              <Input
                icon={BsSearch}
                placeholder="Search users..."
                className="w-64"
              />
              <Button variant="secondary" size="sm" className="gap-2">
                <BsFilterLeft />
                Filter
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Content padding="none">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Loading users...</p>
            </div>
          ) : (
            <UsersTable users={users} />
          )}
        </Card.Content>
      </Card>

      {/* User Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title={
          modalMode === 'create' ? 'Add New User' :
          modalMode === 'edit' ? 'Edit User' :
          'User Details'
        }
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                <p className="text-gray-400">{selectedUser.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Role</label>
                <div className="text-white">{selectedUser.role}</div>
              </div>
              <div>
                <label className="form-label">Status</label>
                <div className={`status-indicator ${
                  selectedUser.status === 'Active' ? 'status-success' :
                  selectedUser.status === 'Inactive' ? 'status-error' :
                  selectedUser.status === 'Pending' ? 'status-warning' :
                  'status-error'
                }`}>
                  {selectedUser.status}
                </div>
              </div>
              <div>
                <label className="form-label">Join Date</label>
                <div className="text-white">{selectedUser.joinDate}</div>
              </div>
              <div>
                <label className="form-label">Last Active</label>
                <div className="text-white">{selectedUser.lastActive}</div>
              </div>
              <div>
                <label className="form-label">Courses Enrolled</label>
                <div className="text-white">{selectedUser.coursesEnrolled}</div>
              </div>
            </div>

            {modalMode !== 'view' && (
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast.success(`User ${modalMode === 'create' ? 'created' : 'updated'} successfully`);
                    setShowUserModal(false);
                  }}
                  className="btn btn-primary"
                >
                  {modalMode === 'create' ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        )}

        {modalMode === 'create' && (
          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="Enter full name" />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="Enter email address" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Role</label>
                <select className="form-select">
                  <option>Student</option>
                  <option>Instructor</option>
                  <option>Moderator</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setShowUserModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.success('User created successfully');
                  setShowUserModal(false);
                }}
                className="btn btn-primary"
              >
                Create User
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
