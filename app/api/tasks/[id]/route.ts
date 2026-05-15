import { NextResponse } from 'next/server';
import { getTasks, saveTasks } from '@/lib/storage';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { title, completed } = await request.json();
        const tasks = await getTasks();
        const taskIndex = tasks.findIndex((t) => t.id === id);

        if (taskIndex === -1) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }

        if (title !== undefined) {
            if (typeof title !== 'string' || title.trim() === '') {
                return NextResponse.json({ error: 'Title cannot be empty' }, { status: 400 });
            }
            tasks[taskIndex].title = title.trim();
        }

        if (completed !== undefined) {
            if (typeof completed !== 'boolean') {
                return NextResponse.json({ error: 'Completed must be a boolean' }, { status: 400 });
            }
            tasks[taskIndex].completed = completed;
        }

        await saveTasks(tasks);
        return NextResponse.json(tasks[taskIndex]);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const tasks = await getTasks();
    const newTasks = tasks.filter((t) => t.id !== id);

    if (tasks.length === newTasks.length) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    await saveTasks(newTasks);
    return new Response(null, { status: 204 });
}
