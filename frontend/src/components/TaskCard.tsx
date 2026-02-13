import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  isAdmin: boolean;
}

const TaskCard = ({ task, onEdit, onDelete, isAdmin }: TaskCardProps) => {
  const priorityColors = {
    LOW: 'bg-green-100 text-green-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    PENDING: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white border border-gray-200 rounded p-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3">{task.description}</p>

      <div className="flex gap-2 mb-3">
        <span className={`px-2 py-1 text-xs rounded ${statusColors[task.status]}`}>
          {task.status}
        </span>
        <span className={`px-2 py-1 text-xs rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {isAdmin && task.user && (
        <div className="pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Created by: <span className="font-medium">{task.user.name}</span> ({task.user.email})
          </p>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-2">
        Updated: {new Date(task.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TaskCard;