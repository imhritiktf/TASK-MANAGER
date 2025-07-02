import { useEffect, useState } from 'react';
import { fetchTasks, updateTaskStatus, fetchUsers } from '../api/tasks';
import TaskList from '../components/TaskList';
import TaskModal from '../components/TaskModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoadingUsers(true);
        const usersResponse = await fetchUsers();
        setUsers(usersResponse.data);
        
        const tasksResponse = await fetchTasks(filters);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoadingUsers(false);
      }
    };
    loadInitialData();
  }, [filters]);

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsModalOpen(false);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value === '' ? undefined : value
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Dashboard</h1>
        <div className="flex space-x-2">
         {
          user?.role !== "user" && (
             <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Create Task
          </button>
          )
         }
          <button 
            onClick={handleLogout}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              onChange={(e) => handleFilterChange('status', e.target.value)}
              value={filters.status || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
            <select 
              onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
              value={filters.assignedTo || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={loadingUsers}
            >
              <option value="">All Assignees</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <TaskList tasks={tasks} onStatusUpdate={handleStatusUpdate} />
      </div>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};

export default Dashboard;