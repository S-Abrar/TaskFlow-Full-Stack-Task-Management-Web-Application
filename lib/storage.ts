import fs from 'fs/promises';
import path from 'path';

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}

const STORAGE_FILE = path.join(process.cwd(), 'tasks.json');

export async function getTasks(): Promise<Task[]> {
    try {
        const data = await fs.readFile(STORAGE_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
    await fs.writeFile(STORAGE_FILE, JSON.stringify(tasks, null, 2));
}
