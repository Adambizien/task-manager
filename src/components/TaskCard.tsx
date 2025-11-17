import type { Task, TaskCategory, TaskPriority } from '../types/task';
import { Briefcase, User, AlertTriangle, Flag, Calendar, Clock, Edit, Trash2, Check } from 'lucide-react';
import '../styles/taskcard.css';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onToggleComplete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const getCategoryGradient = (category: TaskCategory): string => {
    const gradients: Record<TaskCategory, string> = {
      work: 'from-purple-500 to-purple-600',
      personal: 'from-pink-500 to-rose-500',
      urgent: 'from-red-500 to-orange-500'
    };
    return gradients[category];
  };

  const getPriorityColor = (priority: TaskPriority): string => {
    const colors: Record<TaskPriority, string> = {
      low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      medium: 'bg-amber-100 text-amber-700 border-amber-200',
      high: 'bg-rose-100 text-rose-700 border-rose-200'
    };
    return colors[priority];
  };

  const getCategoryIcon = (category: TaskCategory) => {
    const icons = {
      work: <Briefcase className="w-3 h-3" />,
      personal: <User className="w-3 h-3" />,
      urgent: <AlertTriangle className="w-3 h-3" />
    };
    return icons[category];
  };

  const getPriorityIcon = (priority: TaskPriority) => {
    const icons = {
      low: <Flag className="w-3 h-3" />,
      medium: <Flag className="w-3 h-3" />,
      high: <Flag className="w-3 h-3" />
    };
    return icons[priority];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-card group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
      task.completed 
        ? 'border-emerald-200/60 bg-emerald-50/50' 
        : 'border-slate-200/60 hover:border-slate-300'
    } ${isOverdue ? 'border-l-4 border-l-rose-400' : ''}`}>

      {/* Indicateur de catégorie */}
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${getCategoryGradient(task.category)} rounded-l-2xl`}></div>

      <div className="flex items-start justify-between ml-3">
        <div className="flex items-start space-x-4 flex-1">
      
          {/* checkbox */}
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`mt-1 w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
              task.completed
                ? 'bg-gradient-to-r from-emerald-400 to-green-500 border-transparent text-white shadow-lg shadow-emerald-500/25'
                : 'border-slate-300 bg-white hover:border-slate-400 hover:shadow-md'
            }`}
          >
            {task.completed && <Check className="w-3 h-3" />}
          </button>

          {/* === CONTENU AVEC CLASSES CSS LightningCSS === */}
          <div className="flex-1 min-w-0 task-content">
            <div className="flex items-center flex-wrap gap-2 mb-3">
              {/* Badge catégorie */}
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getCategoryGradient(task.category)} text-white shadow-md`}>
                {getCategoryIcon(task.category)}
                {task.category === 'work' && 'Travail'}
                {task.category === 'personal' && 'Personnel'}
                {task.category === 'urgent' && 'Urgent'}
              </span>

              {/* Badge priorité */}
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                {getPriorityIcon(task.priority)}
                {task.priority === 'low' && 'Basse'}
                {task.priority === 'medium' && 'Moyenne'}
                {task.priority === 'high' && 'Haute'}
              </span>

              {/* Badge retard */}
              {isOverdue && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 border border-rose-200">
                  <Clock className="w-3 h-3" />
                  En retard
                </span>
              )}
            </div>

            {/* Description + classe LightningCSS */}
            <p className={`task-title text-slate-800 break-words leading-relaxed ${
              task.completed ? 'line-through text-slate-400' : ''
            }`}>
              {task.description}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
              {task.dueDate && (
                <span className={`task-date flex items-center gap-1 ${
                  isOverdue ? 'text-rose-600 font-semibold' : ''
                }`}>
                  <Calendar className="w-3 h-3" />
                  {formatDate(task.dueDate)}
                </span>
              )}
              <span className="task-date flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(task.createdAt)}
              </span>
              {task.updatedAt && task.updatedAt !== task.createdAt && (
                <span className="flex items-center gap-1 text-blue-600">
                  <Edit className="w-3 h-3" />
                  Modifié
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200"
            title="Modifier"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-slate-600 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all duration-200"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;