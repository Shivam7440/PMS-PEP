import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';

import {
  updateTaskStatusAsync,
  fetchTasks,
  fetchAllTasks,
  clearSelectedTask
} from '../../store/slices/taskSlice';

import MainLayout from '../../layouts/MainLayout';
import TaskColumn from '../../components/TaskColumn';
import TaskDetailDrawer from '../../components/TaskDetailDrawer';
import AddTaskModal from '../../components/AddTaskModal';
import { useState } from 'react';

import {
  Search,
  Filter,
  Circle,
  Loader2,
  Eye,
  CheckCircle2,
  Plus
} from 'lucide-react';

const TaskBoard = () => {
  const { id: projectId } = useParams();
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [initialModalStatus, setInitialModalStatus] = useState('To Do');

  const {
    tasks: allTasks,
    columns,
    columnOrder,
    selectedTaskId,
    loading
  } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (projectId) dispatch(fetchTasks(projectId));
    else dispatch(fetchAllTasks());
  }, [dispatch, projectId]);

  const selectedTask = selectedTaskId ? allTasks[selectedTaskId] : null;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const newStatus = columns[destination.droppableId].title;

    dispatch(
      updateTaskStatusAsync({
        taskId: draggableId,
        status: newStatus,
        columnId: destination.droppableId
      })
    );
  };

  const handleOpenAddModal = (status = 'To Do') => {
    setInitialModalStatus(status);
    setIsAddModalOpen(true);
  };

  /* STATUS ICON MAP */
  const getStatusMeta = (title) => {
    const map = {
      'To Do': { icon: Circle, color: 'text-slate-400' },
      'In Progress': { icon: Loader2, color: 'text-blue-500' },
      'Review': { icon: Eye, color: 'text-purple-500' },
      'Done': { icon: CheckCircle2, color: 'text-emerald-500' }
    };
    return map[title] || { icon: Circle, color: 'text-slate-400' };
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* HEADER */}
        <div className="p-8 pb-0 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Workflow Board</h1>
            <div className="flex items-center gap-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {Object.keys(allTasks || {}).length} Objectives
              </span>
              <button
                onClick={() => handleOpenAddModal('To Do')}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest ai-glow transition-all active:scale-95 flex items-center gap-2"
              >
                <Plus size={16} />
                Deploy Objective
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1 p-8 overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-600 border-t-transparent ai-glow"></div>
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-8 h-full items-start">
                {columnOrder.map((columnId) => (
                  <TaskColumn
                    key={columnId}
                    column={columns[columnId]}
                    onAddTask={handleOpenAddModal}
                  />
                ))}
              </div>
            </DragDropContext>
          )}
        </main>

      </div>

      <TaskDetailDrawer
        task={selectedTask}
        isOpen={Boolean(selectedTaskId)}
        onClose={() => dispatch(clearSelectedTask())}
      />

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        projectId={projectId}
        initialStatus={initialModalStatus}
      />
    </MainLayout>
  );
};

export default TaskBoard;