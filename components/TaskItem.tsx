'use client';

import { useState } from 'react';
import { Task } from '@/lib/storage';
import { Trash2, Check, Edit2, X, Save } from 'lucide-react';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string, completed: boolean) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onUpdate: (id: string, title: string) => Promise<void>;
}

export default function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!editTitle.trim() || editTitle === task.title) {
            setIsEditing(false);
            setEditTitle(task.title);
            return;
        }
        setIsSaving(true);
        await onUpdate(task.id, editTitle);
        setIsSaving(false);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditTitle(task.title);
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div
                className={`checkbox ${task.completed ? 'checked' : ''}`}
                onClick={() => onToggle(task.id, !task.completed)}
            >
                {task.completed && <Check size={14} color="white" />}
            </div>

            {isEditing ? (
                <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                        disabled={isSaving}
                        style={{ padding: '0.4rem 0.8rem' }}
                    />
                    <button className="icon" onClick={handleSave} disabled={isSaving}>
                        <Save size={18} />
                    </button>
                    <button className="icon" onClick={handleCancel} disabled={isSaving}>
                        <X size={18} />
                    </button>
                </div>
            ) : (
                <>
                    <span className="task-title" onClick={() => onToggle(task.id, !task.completed)}>
                        {task.title}
                    </span>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="icon" onClick={() => setIsEditing(true)}>
                            <Edit2 size={18} />
                        </button>
                        <button className="icon danger" onClick={() => onDelete(task.id)}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
