import React from 'react';

const FileManager = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">File Manager</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* File upload area */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold">Upload Files</h2>
          <div className="border-dashed border-2 border-gray-300 p-8 text-center rounded-lg">
            <p>Drag & drop files here or click to browse</p>
            <input type="file" className="hidden" multiple />
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Choose Files
            </button>
          </div>
        </section>

        {/* File browser */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold">File Browser</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* File items will be rendered here */}
            <div className="border rounded-lg p-4 text-center">
              <div className="h-16 w-16 mx-auto mb-2 bg-gray-200 rounded flex items-center justify-center">
                📁
              </div>
              <p className="text-sm">Sample Folder</p>
            </div>
            <div className="border rounded-lg p-4 text-center">
              <div className="h-16 w-16 mx-auto mb-2 bg-gray-200 rounded flex items-center justify-center">
                📄
              </div>
              <p className="text-sm">document.pdf</p>
            </div>
          </div>
        </section>

        {/* File management tools */}
        <section>
          <h2 className="text-lg font-semibold">Management Tools</h2>
          <div className="flex gap-2 mt-2">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              New Folder
            </button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Delete Selected
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Rename
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FileManager;
