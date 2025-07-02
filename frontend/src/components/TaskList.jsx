const TaskList = ({ tasks, onStatusUpdate }) => {
  console.log(tasks)
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        tasks.map(task => (
          <div key={task._id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between">
              <h3 className="font-semibold">{task.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                task.status === 'Done' ? 'bg-green-100 text-green-800' :
                task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {task.status}
              </span>
            </div>
            <p className="text-gray-600 my-2">{task.description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-gray-500">
                Assigned to: {task.assignedTo?.map((user,id)=> user.name).join(', ')}
              </span>
              <select
                value={task.status}
                onChange={(e) => onStatusUpdate(task._id, e.target.value)}
                className="text-sm p-1 border rounded"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;