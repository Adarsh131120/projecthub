import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/axiosInstance';
import MainLayout from '../../layouts/MainLayout';

const CreateProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    technologies: '',
    category: 'web',
    status: 'planning',
    liveUrl: '',
    githubUrl: '',
    isPublic: true
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const techArray = form.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

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
      const res = await axios.post('/projects', formData);
      navigate(`/projects/${res.data.project._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create project');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 dark:text-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-4"
        >
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
            minLength={10}
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
              <option value= "web"  >Web Development</option>
              <option value= "mobile">Mobile App</option>
              <option value= "desktop">Desktop App</option>
              <option value= "ai">AI/ML</option>
              <option value= "game">Game Development</option>
              <option value= "other">Other</option>
            </select>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              {/* <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option> */}
                    <option value="planning">Planning</option>
                    <option value="development">Development</option>
                      <option value="testing">Testing</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
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
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Images
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-sm border rounded p-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="isPublic"
              checked={form.isPublic}
              onChange={handleChange}
              className="form-checkbox accent-green-600"
            />
            Public project
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {submitting ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateProject;
