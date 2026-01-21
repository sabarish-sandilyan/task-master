import React, { useState, useEffect } from 'react';
import { Check, X, Plus, Filter, Trash2, Edit2, Save, Calendar, Flag, CheckCircle2, Circle, Sparkles, Moon, Sun, Zap, Target, TrendingUp } from 'lucide-react';

// Types
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
  dueDate?: string;
}

type FilterType = 'all' | 'active' | 'completed';

const TodoRunner = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    const darkModeStored = localStorage.getItem('darkMode');
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse todos');
      }
    }
    if (darkModeStored !== null) {
      setDarkMode(darkModeStored === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false,
      priority,
      createdAt: Date.now(),
      dueDate: dueDate || undefined,
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
    setDueDate('');
    setPriority('medium');
  };

  const toggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id: string) => {
    if (editText.trim() === '') return;
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ));
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const priorityConfig = {
    low: {
      bg: 'from-blue-500 to-blue-600',
      glow: 'shadow-blue-500/30',
      border: darkMode ? 'border-blue-500/30' : 'border-blue-100',
      dot: 'bg-blue-400',
      text: 'text-blue-700'
    },
    medium: {
      bg: 'from-amber-500 to-orange-500',
      glow: 'shadow-amber-500/30',
      border: darkMode ? 'border-amber-500/30' : 'border-amber-100',
      dot: 'bg-amber-400',
      text: 'text-amber-700'
    },
    high: {
      bg: 'from-red-500 to-rose-600',
      glow: 'shadow-red-500/30',
      border: darkMode ? 'border-red-500/30' : 'border-red-100',
      dot: 'bg-red-400',
      text: 'text-red-700'
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 transition-colors duration-500 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs */}
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-float-complex ${
          darkMode ? 'bg-purple-500/20' : 'bg-purple-400/40'
        }`} style={{ animationDelay: '0s' }}></div>
        <div className={`absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl animate-float-complex ${
          darkMode ? 'bg-pink-500/20' : 'bg-pink-400/40'
        }`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-20 left-1/3 w-80 h-80 rounded-full blur-3xl animate-float-complex ${
          darkMode ? 'bg-indigo-500/20' : 'bg-indigo-400/40'
        }`} style={{ animationDelay: '4s' }}></div>
        <div className={`absolute top-1/3 left-1/2 w-72 h-72 rounded-full blur-3xl animate-float-complex ${
          darkMode ? 'bg-cyan-500/15' : 'bg-cyan-400/35'
        }`} style={{ animationDelay: '6s' }}></div>
        <div className={`absolute bottom-40 right-1/3 w-64 h-64 rounded-full blur-3xl animate-float-complex ${
          darkMode ? 'bg-rose-500/15' : 'bg-rose-400/35'
        }`} style={{ animationDelay: '8s' }}></div>
        
        {/* Medium floating orbs */}
        <div className={`absolute top-1/2 right-1/4 w-64 h-64 rounded-full blur-2xl animate-float-reverse ${
          darkMode ? 'bg-violet-500/15' : 'bg-violet-400/30'
        }`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-1/3 right-10 w-56 h-56 rounded-full blur-2xl animate-float-reverse ${
          darkMode ? 'bg-fuchsia-500/15' : 'bg-fuchsia-400/30'
        }`} style={{ animationDelay: '3s' }}></div>
        <div className={`absolute top-1/4 left-1/4 w-48 h-48 rounded-full blur-2xl animate-float-reverse ${
          darkMode ? 'bg-blue-500/15' : 'bg-blue-400/30'
        }`} style={{ animationDelay: '5s' }}></div>
        <div className={`absolute bottom-1/2 left-1/6 w-52 h-52 rounded-full blur-2xl animate-float-reverse ${
          darkMode ? 'bg-purple-500/15' : 'bg-purple-400/30'
        }`} style={{ animationDelay: '7s' }}></div>
        
        {/* Small animated particles */}
        {[...Array(40)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute rounded-full animate-particle ${
              i % 4 === 0 ? 'w-4 h-4' : i % 3 === 0 ? 'w-3 h-3' : 'w-2 h-2'
            } ${
              darkMode ? 'bg-purple-400/40' : 'bg-purple-500/60'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          ></div>
        ))}
        
        {/* Floating stars */}
        {[...Array(25)].map((_, i) => (
          <div
            key={`star-${i}`}
            className={`absolute animate-twinkle ${
              darkMode ? 'text-purple-300/60' : 'text-purple-400/40'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              fontSize: `${8 + Math.random() * 8}px`
            }}
          >✨</div>
        ))}
        
        {/* Circling dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className={`absolute w-2 h-2 rounded-full animate-orbit ${
              darkMode ? 'bg-pink-400/50' : 'bg-pink-500/70'
            }`}
            style={{
              left: '50%',
              top: '50%',
              animationDelay: `${i * 0.5}s`,
              animationDuration: '12s'
            }}
          ></div>
        ))}
        
        {/* Diagonal moving lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`line-${i}`}
            className={`absolute h-px animate-diagonal-move ${
              darkMode ? 'bg-gradient-to-r from-transparent via-purple-400/20 to-transparent' : 'bg-gradient-to-r from-transparent via-purple-500/30 to-transparent'
            }`}
            style={{
              width: '200%',
              top: `${i * 20}%`,
              left: '-50%',
              animationDelay: `${i * 2}s`,
              animationDuration: '15s'
            }}
          ></div>
        ))}
        
        {/* Bubbles rising */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`bubble-${i}`}
            className={`absolute rounded-full animate-bubble ${
              darkMode ? 'bg-indigo-400/20 border border-indigo-400/30' : 'bg-indigo-300/30 border border-indigo-500/40'
            }`}
            style={{
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-50px',
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          ></div>
        ))}
        
        {/* Shooting stars */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className={`absolute w-1 h-1 rounded-full animate-shooting-star ${
              darkMode ? 'bg-yellow-300' : 'bg-yellow-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: '2s'
            }}
          ></div>
        ))}
        
        {/* Animated gradient waves */}
        <div className={`absolute inset-0 opacity-30 animate-wave ${
          darkMode 
            ? 'bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10' 
            : 'bg-gradient-to-br from-purple-300/20 via-transparent to-pink-300/20'
        }`}></div>
        
        {/* Grid pattern overlay */}
        <div className={`absolute inset-0 opacity-5 animate-grid-move ${
          darkMode ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'
        }`}></div>
        
        {/* Pulsing rings */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`ring-${i}`}
            className={`absolute rounded-full animate-pulse-ring border-2 ${
              darkMode ? 'border-purple-500/20' : 'border-purple-400/30'
            }`}
            style={{
              width: `${100 + i * 100}px`,
              height: `${100 + i * 100}px`,
              left: '50%',
              top: '50%',
              marginLeft: `-${50 + i * 50}px`,
              marginTop: `-${50 + i * 50}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          ></div>
        ))}
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#f43f5e', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              darkMode
                ? 'bg-gray-800/50 text-amber-400 hover:bg-gray-800/70 border border-gray-700/50'
                : 'bg-white/80 text-purple-600 hover:bg-white border border-gray-200'
            } backdrop-blur-sm shadow-lg hover:scale-105 animate-slideDown`}
          >
            {darkMode ? <Sun size={20} className="animate-spin-slow" /> : <Moon size={20} className="animate-bounce-slow" />}
            {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {/* Header with gradient text */}
        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-2xl shadow-lg transition-all duration-300 animate-bounce-slow ${
              darkMode
                ? 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-purple-500/50'
                : 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-purple-500/30'
            }`}>
              <Sparkles className="text-white animate-pulse" size={32} />
            </div>
            <h1 className={`text-6xl font-black bg-gradient-to-r bg-clip-text text-transparent animate-gradient ${
              darkMode
                ? 'from-purple-400 via-pink-400 to-indigo-400'
                : 'from-purple-600 via-pink-600 to-indigo-600'
            }`}>
              Task Master
            </h1>
          </div>
          <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your productivity companion
          </p>
        </div>

        {/* Enhanced Stats Cards with Progress */}
        <div className="grid grid-cols-3 gap-5 mb-8">
          <div className={`group rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 animate-slideUp ${
            darkMode
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-gray-900/50'
              : 'bg-white/80 backdrop-blur-sm shadow-gray-200/50 border border-gray-100'
          }`} style={{ animationDelay: '0.1s' }}>
            <Target className={`mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={24} />
            <div className={`text-3xl font-bold bg-gradient-to-br bg-clip-text text-transparent ${
              darkMode ? 'from-gray-300 to-gray-100' : 'from-gray-700 to-gray-900'
            }`}>{stats.total}</div>
            <div className={`text-sm font-semibold uppercase tracking-wider mt-1 ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>Total Tasks</div>
          </div>
          
          <div className={`group rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 animate-slideUp ${
            darkMode
              ? 'bg-gray-800/50 backdrop-blur-sm border border-blue-500/20 shadow-blue-900/50'
              : 'bg-white/80 backdrop-blur-sm shadow-blue-200/50 border border-blue-100'
          }`} style={{ animationDelay: '0.2s' }}>
            <Zap className={`mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-500'} animate-pulse`} size={24} />
            <div className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-indigo-500 bg-clip-text text-transparent">{stats.active}</div>
            <div className={`text-sm font-semibold uppercase tracking-wider mt-1 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>In Progress</div>
          </div>
          
          <div className={`group rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 animate-slideUp ${
            darkMode
              ? 'bg-gray-800/50 backdrop-blur-sm border border-green-500/20 shadow-green-900/50'
              : 'bg-white/80 backdrop-blur-sm shadow-green-200/50 border border-green-100'
          }`} style={{ animationDelay: '0.3s' }}>
            <TrendingUp className={`mx-auto mb-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`} size={24} />
            <div className="text-3xl font-bold bg-gradient-to-br from-green-500 to-emerald-500 bg-clip-text text-transparent">{stats.completed}</div>
            <div className={`text-sm font-semibold uppercase tracking-wider mt-1 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`}>Completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        {stats.total > 0 && (
          <div className={`rounded-2xl p-6 mb-8 animate-slideUp ${
            darkMode
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'
              : 'bg-white/80 backdrop-blur-sm border border-gray-100'
          }`} style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Overall Progress
              </span>
              <span className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {completionRate}%
              </span>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 transition-all duration-1000 ease-out animate-shimmer"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        )}

        {/* Enhanced Input Section */}
        <div className={`rounded-3xl shadow-2xl p-8 mb-8 transition-all duration-300 animate-slideUp ${
          darkMode
            ? 'bg-gray-800/50 backdrop-blur-md border border-gray-700/50 shadow-purple-900/50'
            : 'bg-white/90 backdrop-blur-md shadow-purple-200/50 border border-white/50'
        }`} style={{ animationDelay: '0.5s' }}>
          <div className="space-y-5">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="What's on your mind today?"
                className={`w-full px-6 py-4 text-lg border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:ring-purple-500/20 focus:border-purple-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-purple-500/20 focus:border-purple-500'
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30">
                <Circle size={24} className={`${darkMode ? 'text-purple-400' : 'text-purple-500'} animate-spin-slow`} />
              </div>
            </div>
            
            <div className="flex gap-4 flex-wrap items-center">
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-gray-900/50 border-gray-700'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <Flag size={20} className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} animate-bounce-slow`} />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className={`bg-transparent font-semibold focus:outline-none cursor-pointer ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-gray-900/50 border-gray-700'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <Calendar size={20} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={`bg-transparent font-semibold focus:outline-none cursor-pointer ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                />
              </div>
              
              <button
                onClick={addTodo}
                className="ml-auto flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 animate-pulse-glow"
              >
                <Plus size={22} strokeWidth={3} className="animate-spin-on-hover" />
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Buttons */}
        <div className="flex gap-3 mb-8 animate-slideUp" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => setFilter('all')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105 animate-pulse-subtle' 
                : darkMode
                  ? 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-800/70 border border-gray-700/50 hover:scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200 hover:scale-105'
            }`}
          >
            <Filter size={20} />
            All <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-sm">{stats.total}</span>
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              filter === 'active' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105 animate-pulse-subtle' 
                : darkMode
                  ? 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-800/70 border border-gray-700/50 hover:scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200 hover:scale-105'
            }`}
          >
            Active <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-sm">{stats.active}</span>
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              filter === 'completed' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105 animate-pulse-subtle' 
                : darkMode
                  ? 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-800/70 border border-gray-700/50 hover:scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200 hover:scale-105'
            }`}
          >
            Done <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-sm">{stats.completed}</span>
          </button>
        </div>

        {/* Enhanced Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className={`rounded-2xl shadow-lg p-16 text-center border transition-all duration-300 animate-fadeIn ${
              darkMode
                ? 'bg-gray-800/30 backdrop-blur-sm border-gray-700/50'
                : 'bg-white/60 backdrop-blur-sm border-gray-100'
            }`}>
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 animate-bounce-slow ${
                darkMode
                  ? 'bg-gradient-to-br from-gray-800 to-gray-700'
                  : 'bg-gradient-to-br from-gray-100 to-gray-200'
              }`}>
                <CheckCircle2 size={40} className={`${darkMode ? 'text-gray-600' : 'text-gray-400'} animate-pulse`} />
              </div>
              <div className={`text-xl font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {filter === 'completed' ? 'No completed tasks yet' : 'Your canvas awaits...'}
              </div>
              <div className={`text-sm mt-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                {filter === 'completed' ? 'Complete some tasks to see them here' : 'Add your first task above to get started'}
              </div>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`group rounded-2xl shadow-lg hover:shadow-2xl p-5 border-l-4 ${priorityConfig[todo.priority].border} transition-all duration-300 hover:scale-[1.02] animate-slideUp ${
                  darkMode
                    ? 'bg-gray-800/50 backdrop-blur-sm'
                    : 'bg-white/90 backdrop-blur-sm'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`mt-1 flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      todo.completed
                        ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-500 shadow-lg shadow-green-500/30 scale-110 animate-success-bounce'
                        : darkMode
                          ? 'border-gray-600 hover:border-purple-500 hover:scale-110 hover:shadow-md hover:rotate-12'
                          : 'border-gray-300 hover:border-purple-500 hover:scale-110 hover:shadow-md hover:rotate-12'
                    }`}
                  >
                    {todo.completed && <Check size={18} className="text-white animate-checkmark" strokeWidth={3} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                        className={`w-full px-4 py-2 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 animate-fadeIn ${
                          darkMode
                            ? 'bg-gray-900/50 border-purple-500/50 text-white'
                            : 'bg-white border-purple-300 text-gray-900'
                        }`}
                        autoFocus
                      />
                    ) : (
                      <div>
                        <div className={`text-lg font-medium transition-all duration-300 ${
                          todo.completed 
                            ? darkMode ? 'line-through text-gray-600' : 'line-through text-gray-400'
                            : darkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                          {todo.text}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${priorityConfig[todo.priority].bg} text-white text-xs font-bold uppercase tracking-wide shadow-md ${priorityConfig[todo.priority].glow} animate-shimmer`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${priorityConfig[todo.priority].dot} animate-pulse`}></div>
                            {todo.priority}
                          </span>
                          {todo.dueDate && (
                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold animate-slideIn ${
                              darkMode
                                ? 'bg-gray-700 text-gray-300'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              <Calendar size={12} />
                              {new Date(todo.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {editingId === todo.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(todo.id)}
                          className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                            darkMode
                              ? 'text-green-400 hover:bg-green-900/30'
                              : 'text-green-600 hover:bg-green-50'
                          }`}
                        >
                          <Save size={20} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                            darkMode
                              ? 'text-gray-400 hover:bg-gray-700'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <X size={20} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(todo)}
                          className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                            darkMode
                              ? 'text-blue-400 hover:bg-blue-900/30'
                              : 'text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                            darkMode
                              ? 'text-red-400 hover:bg-red-900/30'
                              : 'text-red-600 hover:bg-red-50'
                          }`}
                        >
                          <Trash2 size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Footer */}
        {todos.length > 0 && (
          <div className="mt-12 text-center animate-fadeIn">
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full shadow-lg border ${
              darkMode
                ? 'bg-gray-800/50 backdrop-blur-sm border-gray-700/50'
                : 'bg-white/60 backdrop-blur-sm border-gray-100'
            }`}>
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
              <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {stats.active === 0 ? (
                  <span className={darkMode ? 'text-green-400' : 'text-green-600'}>All done! 🎉</span>
                ) : (
                  <span>{stats.active} {stats.active === 1 ? 'task' : 'tasks'} remaining</span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Developer Credit */}
        <div className="mt-16 text-center animate-fadeIn">
          <div className={`inline-flex flex-col items-center gap-4 px-8 py-6 rounded-2xl shadow-xl backdrop-blur-md border transition-all duration-300 ${
            darkMode
              ? 'bg-gradient-to-r from-gray-800/60 to-gray-900/60 border-gray-700/50 shadow-purple-900/30'
              : 'bg-gradient-to-r from-white/70 to-gray-50/70 border-gray-200 shadow-purple-300/30'
          }`}>
            <div className="inline-flex items-center gap-3">
              <Sparkles size={20} className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} animate-pulse`} />
              <p className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Developed by{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent font-black text-lg animate-gradient">
                  Sabarish
                </span>
              </p>
              <Sparkles size={20} className={`${darkMode ? 'text-pink-400' : 'text-pink-600'} animate-pulse`} />
            </div>
            
            <a
              href="https://github.com/sabarish-sandilyan/task-master.git"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-gray-900 hover:bg-gray-800 text-white border border-gray-700'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              } shadow-lg hover:shadow-xl`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        
        @keyframes float-complex {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          25% { transform: translate(30px, -30px) scale(1.1) rotate(5deg); }
          50% { transform: translate(-20px, -50px) scale(1.15) rotate(-5deg); }
          75% { transform: translate(-40px, -20px) scale(1.05) rotate(3deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
        
        @keyframes float-reverse {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-25px, 25px) scale(0.95); }
          50% { transform: translate(15px, 45px) scale(1.08); }
          75% { transform: translate(35px, 15px) scale(0.98); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes particle {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(var(--tx, 100px), var(--ty, 100px)) scale(1.5); opacity: 0; }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(20px) translateY(-20px); }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes aurora {
          0%, 100% { opacity: 0.3; transform: rotate(0deg) scale(1); }
          33% { opacity: 0.6; transform: rotate(5deg) scale(1.1); }
          66% { opacity: 0.4; transform: rotate(-5deg) scale(0.95); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes orbit {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg); }
        }
        
        @keyframes diagonal-move {
          0% { transform: translateX(-100%) translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%) translateY(100%); opacity: 0; }
        }
        
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }
        
        @keyframes shooting-star {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          100% { transform: translateX(-300px) translateY(300px); opacity: 0; }
        }
        
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.6); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.08); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes success-bounce {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes checkmark {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
        .animate-slideDown { animation: slideDown 0.4s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.3s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-complex { animation: float-complex 20s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 18s ease-in-out infinite; }
        .animate-particle { 
          animation: particle 25s ease-in-out infinite;
          --tx: calc((var(--random, 0.5) - 0.5) * 200px);
          --ty: calc((var(--random, 0.5) - 0.5) * 200px);
        }
        .animate-wave { animation: wave 15s ease-in-out infinite; }
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        .animate-shimmer { 
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-pulse-subtle { animation: pulse-subtle 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-success-bounce { animation: success-bounce 0.6s ease-out; }
        .animate-checkmark { animation: checkmark 0.4s ease-out; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-orbit { animation: orbit 12s linear infinite; }
        .animate-diagonal-move { animation: diagonal-move 15s linear infinite; }
        .animate-bubble { animation: bubble 20s ease-in infinite; }
        .animate-shooting-star { animation: shooting-star 2s ease-out infinite; }
        .animate-pulse-ring { animation: pulse-ring 3s ease-out infinite; }
        
        .bg-grid-pattern-dark {
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .bg-grid-pattern-light {
          background-image: 
            linear-gradient(rgba(168, 85, 247, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.15) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall 3s linear forwards;
        }
        
        button:hover .animate-spin-on-hover {
          animation: spin-slow 0.5s linear;
        }
      `}</style>
    </div>
  );
};

export default TodoRunner;