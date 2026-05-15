'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/lib/storage';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Loader2 } from 'lucide-react';

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/tasks');
            if (!res.ok) throw new Error('Failed to fetch tasks');
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            setError('Could not load tasks. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (title: string) => {
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });
            if (!res.ok) throw new Error('Failed to add task');
            const newTask = await res.json();
            setTasks([newTask, ...tasks]);
        } catch (err) {
            setError('Failed to add task.');
        }
    };

    const toggleTask = async (id: string, completed: boolean) => {
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed }),
            });
            if (!res.ok) throw new Error('Failed to update task');
            setTasks(tasks.map(t => t.id === id ? { ...t, completed } : t));
        } catch (err) {
            setError('Failed to update task.');
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete task');
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            setError('Failed to delete task.');
        }
    };

    const updateTaskTitle = async (id: string, title: string) => {
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title }),
            });
            if (!res.ok) throw new Error('Failed to update task');
            setTasks(tasks.map(t => t.id === id ? { ...t, title } : t));
        } catch (err) {
            setError('Failed to update task.');
        }
    };

    const filteredTasks = tasks.filter(t => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    return (
        <main>
            <h1>TaskFlow</h1>

            <div className="card">
                <TaskForm onAdd={addTask} />
            </div>

            <div className="filters">
                {(['all', 'active', 'completed'] as const).map((f) => (
                    <button
                        key={f}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {error && (
                <div className="card" style={{ color: 'var(--danger)', textAlign: 'center' }}>
                    {error}
                    <button onClick={() => setError(null)} style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Dismiss</button>
                </div>
            )}

            {loading ? (
                <div className="loading-spinner" />
            ) : (
                <TaskList
                    tasks={filteredTasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onUpdate={updateTaskTitle}
                />
            )}
        </main>
    );
}
