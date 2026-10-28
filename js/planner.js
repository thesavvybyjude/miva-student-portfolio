/**
 * MIVA OPEN UNIVERSITY - STUDENT PORTFOLIO & ACADEMIC MANAGEMENT
 * Academic Planner Interactive Module (Task Management System)
 * Implements CRUD, Arrays, Filtering, Dynamic DOM updates, and LocalStorage
 */

const STORAGE_KEY = 'miva_academic_planner_tasks';

// Default tasks for first-time visitors
const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Submit CSC 301 Web Technology Assignment 2',
    course: 'CSC 301',
    dueDate: '2026-11-05',
    priority: 'high',
    completed: false,
    createdAt: Date.now() - 86400000
  },
  {
    id: 'task-2',
    title: 'Review Discrete Mathematics Lecture 6 on Graph Theory',
    course: 'MTH 202',
    dueDate: '2026-11-08',
    priority: 'medium',
    completed: true,
    createdAt: Date.now() - 172800000
  },
  {
    id: 'task-3',
    title: 'Prepare Project Milestone Slides for Software Engineering',
    course: 'CSC 305',
    dueDate: '2026-11-12',
    priority: 'high',
    completed: false,
    createdAt: Date.now() - 43200000
  },
  {
    id: 'task-4',
    title: 'Complete MIVA E-Library Literature Review on Distributed Systems',
    course: 'CSC 312',
    dueDate: '2026-11-15',
    priority: 'low',
    completed: false,
    createdAt: Date.now() - 10000000
  }
];

class AcademicPlanner {
  constructor() {
    this.tasks = this.loadTasks();
    this.currentFilter = 'all';

    // DOM Elements
    this.form = document.getElementById('taskForm');
    this.titleInput = document.getElementById('taskTitle');
    this.courseInput = document.getElementById('taskCourse');
    this.dueDateInput = document.getElementById('taskDueDate');
    this.priorityInput = document.getElementById('taskPriority');
    this.taskList = document.getElementById('taskList');
    this.emptyState = document.getElementById('emptyState');
    
    // Counter elements
    this.totalCountElem = document.getElementById('totalTasksCount');
    this.pendingCountElem = document.getElementById('pendingTasksCount');
    this.completedCountElem = document.getElementById('completedTasksCount');
    this.progressBar = document.getElementById('plannerProgressBar');
    this.progressLabel = document.getElementById('plannerProgressLabel');

    // Filter buttons
    this.filterButtons = document.querySelectorAll('.task-filter-btn');
    this.clearCompletedBtn = document.getElementById('clearCompletedBtn');

    this.init();
  }

  init() {
    if (!this.form || !this.taskList) return;

    // Attach Event Listeners
    this.form.addEventListener('submit', (e) => this.handleAddTask(e));
    
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.render();
      });
    });

    if (this.clearCompletedBtn) {
      this.clearCompletedBtn.addEventListener('click', () => this.clearCompletedTasks());
    }

    // Initial render
    this.render();
  }

  loadTasks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('Could not read from localStorage, using defaults.', err);
    }
    return [...INITIAL_TASKS];
  }

  saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage', err);
    }
  }

  handleAddTask(e) {
    e.preventDefault();

    const title = this.titleInput.value.trim();
    const course = this.courseInput.value.trim();
    const dueDate = this.dueDateInput.value;
    const priority = this.priorityInput.value || 'medium';

    // Simple validation
    let hasError = false;

    if (!title) {
      this.titleInput.classList.add('is-invalid');
      hasError = true;
    } else {
      this.titleInput.classList.remove('is-invalid');
    }

    if (!course) {
      this.courseInput.classList.add('is-invalid');
      hasError = true;
    } else {
      this.courseInput.classList.remove('is-invalid');
    }

    if (hasError) {
      if (typeof showToast === 'function') {
        showToast('Please fill in required fields.', 'danger');
      }
      return;
    }

    const newTask = {
      id: 'task-' + Date.now(),
      title,
      course,
      dueDate: dueDate || 'No deadline',
      priority,
      completed: false,
      createdAt: Date.now()
    };

    // Add to tasks array (functional unshift)
    this.tasks = [newTask, ...this.tasks];
    this.saveTasks();
    this.render();

    // Reset form
    this.form.reset();
    this.titleInput.focus();

    if (typeof showToast === 'function') {
      showToast('New academic task added successfully!', 'success');
    }
  }

  toggleTaskStatus(taskId) {
    this.tasks = this.tasks.map(task => {
      if (task.id === taskId) {
        const nextState = !task.completed;
        if (typeof showToast === 'function') {
          showToast(nextState ? `Completed: "${task.title}"` : `Reopened: "${task.title}"`, nextState ? 'success' : 'info');
        }
        return { ...task, completed: nextState };
      }
      return task;
    });

    this.saveTasks();
    this.render();
  }

  deleteTask(taskId) {
    const taskToDelete = this.tasks.find(t => t.id === taskId);
    if (!taskToDelete) return;

    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
    this.render();

    if (typeof showToast === 'function') {
      showToast(`Removed task: "${taskToDelete.title}"`, 'danger');
    }
  }

  clearCompletedTasks() {
    const completedCount = this.tasks.filter(t => t.completed).length;
    if (completedCount === 0) {
      if (typeof showToast === 'function') {
        showToast('No completed tasks to clear.', 'info');
      }
      return;
    }

    this.tasks = this.tasks.filter(t => !t.completed);
    this.saveTasks();
    this.render();

    if (typeof showToast === 'function') {
      showToast(`Cleared ${completedCount} completed task(s).`, 'success');
    }
  }

  getFilteredTasks() {
    switch (this.currentFilter) {
      case 'pending':
        return this.tasks.filter(task => !task.completed);
      case 'completed':
        return this.tasks.filter(task => task.completed);
      case 'all':
      default:
        return this.tasks;
    }
  }

  updateStatistics() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    if (this.totalCountElem) this.totalCountElem.textContent = total;
    if (this.pendingCountElem) this.pendingCountElem.textContent = pending;
    if (this.completedCountElem) this.completedCountElem.textContent = completed;
    if (this.progressBar) this.progressBar.style.width = `${percent}%`;
    if (this.progressLabel) this.progressLabel.textContent = `${percent}% Completed`;
  }

  formatDate(dateStr) {
    if (!dateStr || dateStr === 'No deadline') return 'No deadline';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }

  render() {
    this.updateStatistics();
    const filteredTasks = this.getFilteredTasks();

    if (filteredTasks.length === 0) {
      this.taskList.innerHTML = '';
      if (this.emptyState) this.emptyState.style.display = 'block';
      return;
    }

    if (this.emptyState) this.emptyState.style.display = 'none';

    // Generate list items dynamically using map & join
    this.taskList.innerHTML = filteredTasks.map(task => {
      const priorityClass = `priority-${task.priority}`;
      const completedClass = task.completed ? 'completed' : '';
      const formattedDate = this.formatDate(task.dueDate);

      return `
        <li class="task-item ${priorityClass} ${completedClass}" data-id="${task.id}">
          <div class="task-left">
            <input 
              type="checkbox" 
              class="task-checkbox" 
              aria-label="Mark task as complete"
              ${task.completed ? 'checked' : ''} 
              onchange="window.academicPlanner.toggleTaskStatus('${task.id}')"
            />
            <div class="task-details">
              <span class="task-title">${escapeHTML(task.title)}</span>
              <div class="task-meta">
                <span class="task-badge badge-course">${escapeHTML(task.course)}</span>
                <span>📅 ${formattedDate}</span>
                <span class="task-badge" style="background: rgba(0,0,0,0.06); text-transform: capitalize;">${task.priority} Priority</span>
              </div>
            </div>
          </div>
          <button 
            type="button" 
            class="task-delete-btn" 
            title="Delete Task" 
            aria-label="Delete Task"
            onclick="window.academicPlanner.deleteTask('${task.id}')"
          >
            &#128465;
          </button>
        </li>
      `;
    }).join('');
  }
}

// Utility function to escape HTML and prevent XSS
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  window.academicPlanner = new AcademicPlanner();
});
