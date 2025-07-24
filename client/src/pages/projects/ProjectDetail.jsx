import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../../services/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import MainLayout from '../../layouts/MainLayout';
import { ThumbsUp, ExternalLink, Github, Edit, Trash2 } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [liking, setLiking] = useState(false);

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`/projects/${id}`);
      setProject(data.project);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch project');
    }
  };

  const handleLikeToggle = async () => {
    if (!user) return;
    setLiking(true);
    try {
      const res = await axios.patch(`/projects/${id}/like`);
      setProject((prev) => ({
        ...prev,
        likes: res.data.isLiked
          ? [...prev.likes, { user: user._id }]
          : prev.likes.filter((l) => l.user !== user._id),
      }));
    } catch (err) {
      console.error('Like failed');
    } finally {
      setLiking(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const { data } = await axios.patch(`/projects/${id}/status`, { status: newStatus });
      setProject((prev) => ({ ...prev, status: data.status }));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (!confirmed) return;

    try {
      await axios.delete(`/projects/${id}`);
      alert('Project deleted successfully');
      navigate('/');
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-600 dark:text-red-400">{error}</p>
      </MainLayout>
    );
  }

  if (!project) {
    return (
      <MainLayout>
        <p className="text-center text-gray-600 dark:text-gray-300">Loading project...</p>
      </MainLayout>
    );
  }

  const isLiked = user && project.likes.some((l) => l.user === user._id);
  const isOwner = user && user._id === project.author._id;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 dark:text-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          {isOwner && (
            <div className="flex gap-3">
              <Link to={`/projects/${id}/edit`} className="text-blue-600 flex items-center gap-1 hover:underline">
                <Edit size={16} /> Edit
              </Link>
              <button
                onClick={handleDelete}
                className="text-red-600 flex items-center gap-1 hover:underline"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          )}
        </div>

        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-4">
          <span>Category: {project.category}</span>
          {isOwner ? (
            <select
              value={project.status}
              onChange={handleStatusChange}
              className="text-sm border p-1 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          ) : (
            <span>Status: {project.status}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="bg-gray-200 dark:bg-gray-700 dark:text-gray-100 px-2 py-0.5 rounded text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {project.images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={`Project Image ${idx + 1}`}
                className="rounded shadow border dark:border-gray-700"
              />
            ))}
          </div>
        )}

        <p className="mb-4 whitespace-pre-wrap">{project.description}</p>

        <div className="flex gap-4 mb-6">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 flex items-center gap-1 hover:underline"
            >
              <ExternalLink size={16} /> Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 flex items-center gap-1 hover:underline"
            >
              <Github size={16} /> GitHub
            </a>
          )}
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <button
              onClick={handleLikeToggle}
              disabled={!user || liking}
              className={`flex items-center gap-1 transition ${
                isLiked ? 'text-blue-600' : ''
              } hover:text-blue-600`}
            >
              <ThumbsUp size={16} />
              {project.likes.length}
            </button>
            <span>Views: {project.views}</span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={project.author.avatar?.url || '/default-avatar.png'}
              alt="avatar"
              className="w-6 h-6 rounded-full"
            />
            <span>{project.author.username}</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetail;
