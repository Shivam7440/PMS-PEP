import { useSelector, useDispatch } from 'react-redux';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { MoreHorizontal, Plus, Sparkles, Circle, Loader2, Eye, CheckCircle2 } from 'lucide-react';
import { selectTask } from '../store/slices/taskSlice';

const getStatusMeta = (title) => {
  const map = {
    'To Do': { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-400/10' },
    'In Progress': { icon: Loader2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    'Review': { icon: Eye, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    'Done': { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
  };
  return map[title] || { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-400/10' };
};

const TaskColumn = ({ column, onAddTask }) => {
  const dispatch = useDispatch();
  const { tasks: allTasks } = useSelector((state) => state.tasks);
  const tasks = (column?.taskIds || [])
    .map(id => allTasks[id])
    .filter(task => !!task);

  const meta = getStatusMeta(column?.title);
  const Icon = meta.icon;

  return (
    <div className="flex flex-col w-80 min-w-[340px] glass-card rounded-[2.5rem] p-3 max-h-full group/column">
      <div className="flex items-center justify-between px-4 py-5 mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${meta.bg} ${meta.color} rounded-xl flex items-center justify-center ai-glow`}>
            <Icon size={16} />
          </div>
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">{column?.title}</h3>
          <span className="bg-white/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[10px] font-black px-2.5 py-1 rounded-xl border border-white/10">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onAddTask && onAddTask(column.title)}
            className="p-2 text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all opacity-0 group-hover/column:opacity-100"
          >
            <Plus size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-1 px-2 pb-4 overflow-y-auto custom-scrollbar min-h-[200px] transition-all rounded-3xl ${snapshot.isDraggingOver ? 'bg-brand-500/5' : ''
              }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task._id || task.id} draggableId={task._id || task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-all ${snapshot.isDragging ? 'rotate-2 z-50' : ''}`}
                  >
                    <TaskCard task={task} onClick={() => dispatch(selectTask(task._id || task.id))} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {/* QUICK ADD AT BOTTOM */}
            <button
              onClick={() => onAddTask && onAddTask(column.title)}
              className="w-full mt-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-dashed border-white/10 rounded-2xl py-3 hover:bg-brand-500/5 hover:border-brand-500/20 hover:text-brand-500 transition-all active:scale-[0.98]"
            >
              <Plus size={14} />
              Add task
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
