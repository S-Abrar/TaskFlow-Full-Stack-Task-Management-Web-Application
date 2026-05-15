'use client';

import { Task } from '@/lib/storage';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string, completed: boolean) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onUpdate: (id: string, title: string) => Promise<void>;
}

export default function TaskList({ tasks, onToggle, onDelete, onUpdate }: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <p>No tasks found. Start by adding one!</p>
            </div>
        );
    }

    return (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}
