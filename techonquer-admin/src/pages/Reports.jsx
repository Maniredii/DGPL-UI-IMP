import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const reportData = [
  { name: 'Bugs', count: 23 },
  { name: 'Logins', count: 150 },
  { name: 'Course Views', count: 320 },
];

export default function Reports() {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Reports</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={reportData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
