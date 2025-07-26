import React, { useState, useMemo } from 'react';
import { 
  BsChevronUp, 
  BsChevronDown, 
  BsSearch, 
  BsThreeDotsVertical,
  BsEyeFill,
  BsPencilFill,
  BsTrashFill
} from 'react-icons/bs';

const DataTable = ({ 
  data = [], 
  columns = [], 
  searchable = true,
  sortable = true,
  pagination = true,
  pageSize = 10,
  actions = [],
  loading = false,
  emptyMessage = "No data available"
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(row =>
      columns.some(column => {
        const value = row[column.key];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(row => row.id)));
    }
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'asc' ? <BsChevronUp size={14} /> : <BsChevronDown size={14} />;
  };

  if (loading) {
    return (
      <div className="data-table-container">
        <div className="data-table-loading">
          <div className="loading-skeleton skeleton-table"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      {searchable && (
        <div className="data-table-header">
          <div className="data-table-search">
            <div className="search-input-wrapper">
              <BsSearch className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          {selectedRows.size > 0 && (
            <div className="data-table-actions">
              <span className="selected-count">
                {selectedRows.size} selected
              </span>
              <button className="btn btn-danger btn-sm">
                <BsTrashFill size={14} />
                Delete Selected
              </button>
            </div>
          )}
        </div>
      )}

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead className="data-table-head">
            <tr>
              <th className="data-table-checkbox">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  className="form-checkbox"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`data-table-header-cell ${sortable && column.sortable !== false ? 'sortable' : ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="header-cell-content">
                    <span>{column.label}</span>
                    {sortable && column.sortable !== false && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="data-table-header-cell actions-column">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="data-table-body">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1 + (actions.length > 0 ? 1 : 0)} className="data-table-empty">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr key={row.id || index} className="data-table-row">
                  <td className="data-table-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      className="form-checkbox"
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={column.key} className="data-table-cell">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="data-table-cell actions-cell">
                      <div className="action-buttons">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(row)}
                            className={`action-btn ${action.className || ''}`}
                            title={action.label}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="data-table-pagination">
          <div className="pagination-info">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                page === 1 || 
                page === totalPages || 
                Math.abs(page - currentPage) <= 1
              )
              .map((page, index, array) => (
                <React.Fragment key={page}>
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="pagination-ellipsis">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
