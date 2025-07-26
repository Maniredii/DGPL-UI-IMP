import React from 'react';

const dummyUsers = [
  { id: 1, name: 'Alice', role: 'Student' },
  { id: 2, name: 'Bob', role: 'Instructor' },
  { id: 3, name: 'Charlie', role: 'Student' },
];

export default function Users() {
  return (
    <div className="p-6 text-white" style={{ backgroundColor: '#1a202c', minHeight: '100vh' }}>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full bg-gray-800 rounded">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
            <th className="p-2">Name</th>
            <th className="p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user) => (
            <tr key={user.id} className="border-b border-gray-700">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
