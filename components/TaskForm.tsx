'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface TaskFormProps {
    onAdd: (title: string) => Promise<void>;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || isSubmitting) return;

        setIsSubmitting(true);
        await onAdd(title);
        setTitle('');
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
            <input
                type="text"
                placeholder="Add a new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
            />
            <button type="submit" className="primary" disabled={isSubmitting || !title.trim()}>
                <Plus size={20} />
                <span>Add</span>
            </button>
        </form>
    );
}
