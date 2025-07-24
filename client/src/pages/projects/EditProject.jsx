import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/axiosInstance';
import MainLayout from '../../layouts/MainLayout';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'Web Development',
    status: 'In Progress',
    liveUrl: '',
    githubUrl: '',
    isPublic: true,
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`/projects/${id}`);
      const proj = data.project;
      setForm({
        title: proj.title,
        description: proj.description,
        technologies: proj.technologies.join(', '),
        category: proj.category,
        status: proj.status,
        liveUrl: proj.liveUrl,
        githubUrl: proj.githubUrl,
        isPublic: proj.isPublic,
      });
      setExistingImages(proj.images);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const techArray = form.technologies.split(',').map((t) => t.trim()).filter(Boolean);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('status', form.status);
    formData.append('liveUrl', form.liveUrl);
    formData.append('githubUrl', form.githubUrl);
    formData.append('isPublic', form.isPublic);
    techArray.forEach((tech) => formData.append('technologies', tech));
    images.forEach((img) => formData.append('images', img));

    try {
      setSubmitting(true);
      const res = await axios.put(`/projects/${id}`, formData);
      navigate(`/projects/${res.data.project._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update project');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center text-gray-600 dark:text-gray-300">Loading project...</p>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <p className="text-center text-red-600 dark:text-red-400">{error}</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 dark:text-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            required
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <textarea
            name="description"
            placeholder="Project Description"
            required
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <input
            type="text"
            name="technologies"
            placeholder="Technologies (comma-separated)"
            value={form.technologies}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <div className="flex gap-4">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option>Web Development</option>
              <option>Mobile App</option>
              <option>Desktop App</option>
              <option>AI/ML</option>
              <option>Game Development</option>
              <option>Other</option>
            </select>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
          </div>
          <input
            type="url"
            name="liveUrl"
            placeholder="Live URL"
            value={form.liveUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <input
            type="url"
            name="githubUrl"
            placeholder="GitHub Repo"
            value={form.githubUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <label className="block text-sm font-medium mb-1">
            Upload Additional Images
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm border rounded p-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />

          {existingImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {existingImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`Existing ${idx + 1}`}
                  className="rounded shadow border dark:border-gray-700"
                />
              ))}
            </div>
          )}

          <label className="inline-flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
              className="form-checkbox accent-blue-600"
            />
            Public project
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {submitting ? 'Updating...' : 'Update Project'}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditProject;
