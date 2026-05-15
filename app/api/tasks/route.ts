import { NextResponse } from 'next/server';
import { getTasks, saveTasks, Task } from '@/lib/storage';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    const tasks = await getTasks();
    return NextResponse.json(tasks);
}

export async function POST(request: Request) {
    try {
        const { title } = await request.json();

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const tasks = await getTasks();
        const newTask: Task = {
            id: uuidv4(),
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
        };

        tasks.push(newTask);
        await saveTasks(tasks);

        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
}
