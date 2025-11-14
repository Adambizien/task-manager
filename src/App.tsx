import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import type { Task, FilterType } from './types/task';
import {
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Trash2,
  Globe,
  Briefcase,
  User,
  AlertTriangle,
  Circle
} from 'lucide-react';

const FilterButton: React.FC<{
  filter: FilterType;
  currentFilter: FilterType;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: (filter: FilterType) => void;
}> = ({ filter, currentFilter, label, icon, color, onClick }) => {
  const isActive = currentFilter === filter;
  
  const getStyles = () => {
    const baseStyles = "flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300";
    
    if (isActive) {
      const activeStyles = {
        slate: "bg-slate-500 text-white shadow-lg shadow-slate-500/25 transform scale-105",
        blue: "bg-blue-500 text-white shadow-lg shadow-blue-500/25 transform scale-105",
        emerald: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 transform scale-105",
        purple: "bg-purple-500 text-white shadow-lg shadow-purple-500/25 transform scale-105",
        pink: "bg-pink-500 text-white shadow-lg shadow-pink-500/25 transform scale-105",
        red: "bg-red-500 text-white shadow-lg shadow-red-500/25 transform scale-105"
      };
      return `${baseStyles} ${activeStyles[color as keyof typeof activeStyles]}`;
    } else {
      return `${baseStyles} bg-white/80 text-slate-700 hover:bg-white hover:shadow-lg border border-slate-200/60 hover:border-slate-300`;
    }
  };

  return (
    <button
      onClick={() => onClick(filter)}
      className={getStyles()}
    >
      {icon}
      {label}
    </button>
  );
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { 
              ...task, 
              ...taskData,
              updatedAt: new Date().toISOString()
            }
          : task
      ));
      setEditingTask(null);
    } else {
      const newTask: Task = {
        id: Date.now(),
        ...taskData,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
    }
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { 
            ...task, 
            completed: !task.completed,
            updatedAt: new Date().toISOString()
          }
        : task
    ));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'active':
        return !task.completed;
      case 'work':
        return task.category === 'work';
      case 'personal':
        return task.category === 'personal';
      case 'urgent':
        return task.category === 'urgent';
      default:
        return true;
    }
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const filters = [
    { 
      key: 'all' as FilterType, 
      label: 'Toutes', 
      icon: <Globe className="w-4 h-4" />, 
      color: 'slate' 
    },
    { 
      key: 'active' as FilterType, 
      label: 'En cours', 
      icon: <Circle className="w-4 h-4" />, 
      color: 'blue' 
    },
    { 
      key: 'completed' as FilterType, 
      label: 'Terminées', 
      icon: <CheckCircle2 className="w-4 h-4" />, 
      color: 'emerald' 
    },
    { 
      key: 'work' as FilterType, 
      label: 'Travail', 
      icon: <Briefcase className="w-4 h-4" />, 
      color: 'purple' 
    },
    { 
      key: 'personal' as FilterType, 
      label: 'Personnel', 
      icon: <User className="w-4 h-4" />, 
      color: 'pink' 
    },
    { 
      key: 'urgent' as FilterType, 
      label: 'Urgent', 
      icon: <AlertTriangle className="w-4 h-4" />, 
      color: 'red' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header avec glass morphism */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
            TaskFlow
          </h1>
          <p className="text-slate-600 text-lg">Organisez votre vie en un seul endroit</p>
        </div>

        {/* Statistiques modernes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-800">{totalTasks}</div>
                <div className="text-slate-600 text-sm">Total</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-emerald-600">{activeTasks}</div>
                <div className="text-slate-600 text-sm">En cours</div>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-slate-400">{completedTasks}</div>
                <div className="text-slate-600 text-sm">Terminées</div>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Formulaire */}
          <div className="xl:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/70 sticky top-8">
              <TaskForm 
                onSubmit={addTask}
                editingTask={editingTask}
                onCancel={() => setEditingTask(null)}
              />
            </div>
          </div>

          {/* Liste des tâches */}
          <div className="xl:col-span-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/70">
              <div className="flex flex-wrap gap-3 mb-8">
                {filters.map((filterConfig) => (
                  <FilterButton
                    key={filterConfig.key}
                    filter={filterConfig.key}
                    currentFilter={filter}
                    label={filterConfig.label}
                    icon={filterConfig.icon}
                    color={filterConfig.color}
                    onClick={setFilter}
                  />
                ))}
              </div>

              {/* En-tête de liste */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Mes Tâches
                  </h2>
                  <p className="text-slate-600 mt-1">
                    {filteredTasks.length} tâche(s) {filter !== 'all' && `• ${filters.find(f => f.key === filter)?.label}`}
                  </p>
                </div>
                {completedTasks > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    Nettoyer
                  </button>
                )}
              </div>

              {/* Liste */}
              <TaskList
                tasks={filteredTasks}
                onEdit={editTask}
                onDelete={deleteTask}
                onToggleComplete={toggleTaskCompletion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;