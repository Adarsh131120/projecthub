import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosInstance';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../layouts/MainLayout';
import { PlusCircle, Eye, ThumbsUp, Layers } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sortBy: 'createdAt',
    page: 1,
    limit: 6
  });
  const [pagination, setPagination] = useState(null);

  const fetchProjects = async () => {
    try {
      const params = {
        ...filters,
        page: filters.page,
        limit: filters.limit,
      };
      const { data } = await axios.get('/projects', { params });
      setProjects(data.projects);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error loading projects', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Explore Projects</h2>
        <Link
          to="/projects/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <PlusCircle size={18} /> New Project
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by title or tech..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="all">All Categories</option>
          <option value="Web Development">Web</option>
          <option value="Mobile App">Mobile</option>
          <option value="Desktop App">Desktop</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Game Development">Game</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Projects */}
      {projects.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">No projects found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj) => (
            <Link
              key={proj._id}
              to={`/projects/${proj._id}`}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg text-black dark:text-white">{proj.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{proj.category}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {proj.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 dark:bg-gray-700 dark:text-white text-sm px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span className="flex items-center gap-1">
                  <Eye size={14} /> {proj.views}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp size={14} /> {proj.likes.length}
                </span>
                <span className="flex items-center gap-1">
                  <Layers size={14} /> {proj.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={!pagination.hasPrev}
            onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm mt-1 text-gray-700 dark:text-gray-300">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            disabled={!pagination.hasNext}
            onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </MainLayout>
  );
};

export default Dashboard;
