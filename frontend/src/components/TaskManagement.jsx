import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import TaskToolbar from './TaskToolbar';
import TaskColumn from './TaskColumn';
import TaskDetailDrawer from './TaskDetailDrawer';

const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Design high-fidelity mockups for landing page',
      priority: 'High',
      status: 'To Do',
      dueDateLabel: 'Tomorrow',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      commentsCount: 12,
      assignees: [{ initials: 'JD', name: 'John Doe', color: 'bg-indigo-500' }],
      totalSubtasks: 8,
      completedSubtasks: 3,
      description: 'Create detailed designs for the landing page including mobile and tablet views. Focus on the hero section and features grid.'
    },
    'task-2': {
      id: 'task-2',
      title: 'Finalize project technical requirements',
      priority: 'Medium',
      status: 'To Do',
      dueDateLabel: 'Yesterday',
      dueDate: new Date(Date.now() - 86400000).toISOString(),
      commentsCount: 5,
      assignees: [{ initials: 'SC', name: 'Sarah Chen', color: 'bg-emerald-500' }],
      totalSubtasks: 5,
      completedSubtasks: 5,
      description: 'Document all API endpoints and database schemas required for the MVP phase.'
    },
    'task-3': {
      id: 'task-3',
      title: 'Integrate authentication flow with Firebase',
      priority: 'High',
      status: 'In Progress',
      dueDateLabel: 'Feb 15',
      dueDate: '2026-02-15T12:00:00Z',
      commentsCount: 24,
      assignees: [
        { initials: 'AR', name: 'Alex Rivera', color: 'bg-rose-500' },
        { initials: 'MK', name: 'Mike Kelly', color: 'bg-purple-500' }
      ],
      totalSubtasks: 12,
      completedSubtasks: 6,
      description: 'Implement login, signup, and password recovery using Firebase Auth. Ensure JWT tokens are correctly handled.'
    },
    'task-4': {
      id: 'task-4',
      title: 'Optimize performance for mobile devices',
      priority: 'Low',
      status: 'Review',
      dueDateLabel: 'Mar 12',
      dueDate: '2026-03-12T12:00:00Z',
      commentsCount: 2,
      assignees: [{ initials: 'JS', name: 'Jess Smith', color: 'bg-blue-500' }],
      description: 'Reduce LCP and total blocking time on mobile lighthouse audits.'
    },
  },
  columns: {
    'todo': { id: 'todo', title: 'To Do', taskIds: ['task-1', 'task-2'] },
    'inprogress': { id: 'inprogress', title: 'In Progress', taskIds: ['task-3'] },
    'review': { id: 'review', title: 'Review', taskIds: ['task-4'] },
    'done': { id: 'done', title: 'Done', taskIds: [] },
  },
  columnOrder: ['todo', 'inprogress', 'review', 'done'],
};

const TaskManagement = () => {
  const [data, setData] = useState(initialData);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, taskIds: newTaskIds };
      setData({
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn }
      });
      return;
    }

    // Moving between different columns
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = { ...finishColumn, taskIds: finishTaskIds };

    // Update task status based on column title
    const updatedTasks = { ...data.tasks };
    updatedTasks[draggableId] = { ...updatedTasks[draggableId], status: newFinishColumn.title };

    setData({
      ...data,
      tasks: updatedTasks,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-900 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <div className="flex-1 flex flex-col min-h-0">
          <TaskToolbar
            onSearch={() => { }}
            onFilter={() => { }}
            onSort={() => { }}
          />

          <main className="flex-1 p-6 overflow-x-auto">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-6 h-full items-start">
                {data.columnOrder.map((columnId) => {
                  const column = data.columns[columnId];
                  const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                  return (
                    <TaskColumn
                      key={column.id}
                      column={column}
                      tasks={tasks}
                      onTaskClick={handleTaskClick}
                    />
                  );
                })}
              </div>
            </DragDropContext>
          </main>
        </div>
      </div>

      <TaskDetailDrawer
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default TaskManagement;
