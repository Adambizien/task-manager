import { useState, useEffect } from 'react';
import type { Task, TaskCategory, TaskPriority } from '../types/task';
import { Briefcase, User, AlertTriangle, Flag, Calendar, Sparkles } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void;
  editingTask: Task | null;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, editingTask, onCancel }) => {
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<TaskCategory>('personal');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  useEffect(() => {
    if (editingTask) {
      setDescription(editingTask.description);
      setCategory(editingTask.category);
      setDueDate(editingTask.dueDate || '');
      setPriority(editingTask.priority || 'medium');
    } else {
      setDescription('');
      setCategory('personal');
      setDueDate('');
      setPriority('medium');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const taskData: Omit<Task, 'id' | 'completed' | 'createdAt'> = {
      description: description.trim(),
      category,
      dueDate: dueDate || undefined,
      priority,
    };

    onSubmit(taskData);

    if (!editingTask) {
      setDescription('');
      setCategory('personal');
      setDueDate('');
      setPriority('medium');
    }
  };

  const getCategoryColor = (cat: TaskCategory): string => {
    const colors: Record<TaskCategory, string> = {
      work: 'from-purple-500 to-purple-600',
      personal: 'from-pink-500 to-rose-500',
      urgent: 'from-red-500 to-orange-500'
    };
    return colors[cat];
  };

  const getPriorityColor = (prio: TaskPriority): string => {
    const colors: Record<TaskPriority, string> = {
      low: 'from-emerald-400 to-green-500',
      medium: 'from-amber-400 to-yellow-500',
      high: 'from-rose-400 to-red-500'
    };
    return colors[prio];
  };

  const getCategoryIcon = (cat: TaskCategory) => {
    const icons = {
      work: <Briefcase className="w-4 h-4" />,
      personal: <User className="w-4 h-4" />,
      urgent: <AlertTriangle className="w-4 h-4" />
    };
    return icons[cat];
  };

  const getPriorityIcon = (prio: TaskPriority) => {
    const icons = {
      low: <Flag className="w-3 h-3" />,
      medium: <Flag className="w-3 h-3" />,
      high: <Flag className="w-3 h-3" />
    };
    return icons[prio];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {editingTask ? 'Modifier la tâche' : 'Nouvelle Tâche'}
        </h2>
        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}></div>
      </div>

      {/* Description */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          placeholder="Qu'est-ce qui doit être fait ?"
          className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none placeholder-slate-400"
          rows={3}
          required
        />
      </div>

      {/* Catégorie */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Catégorie
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['work', 'personal', 'urgent'] as TaskCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                category === cat
                  ? `border-transparent bg-gradient-to-r ${getCategoryColor(cat)} text-white shadow-lg scale-105`
                  : 'border-slate-200 bg-white/80 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                {getCategoryIcon(cat)}
                <span className="text-xs font-medium">
                  {cat === 'work' && 'Travail'}
                  {cat === 'personal' && 'Perso'}
                  {cat === 'urgent' && 'Urgent'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Date limite */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Date limite
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
        />
      </div>

      {/* Priorité */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Flag className="w-4 h-4" />
          Priorité
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['low', 'medium', 'high'] as TaskPriority[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setPriority(level)}
              className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                priority === level
                  ? `border-transparent bg-gradient-to-r ${getPriorityColor(level)} text-white shadow-lg scale-105`
                  : 'border-slate-200 bg-white/80 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                {getPriorityIcon(level)}
                <span className="text-xs font-medium">
                  {level === 'low' && 'Basse'}
                  {level === 'medium' && 'Moyenne'}
                  {level === 'high' && 'Haute'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex items-center justify-center gap-2 flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-2xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-semibold"
        >
          <Sparkles className="w-4 h-4" />
          {editingTask ? 'Modifier' : 'Ajouter'}
        </button>
        
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 font-medium"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;