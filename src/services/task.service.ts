// Generated automatically by CMMV

import { Task } from '../models/task.model';

export class TaskService {
    private items: Task[] = [];

    async getAll(): Promise<Task[]> {
        return this.items;
    }

    async add(item: Task): Promise<Task> {
        item['id'] = this.items.length + 1;
        this.items.push(item);
        return item;
    }

    async update(id: string, item: Task): Promise<Task> {
        const index = this.items.findIndex(i => i.id === parseInt(id));
        if (index !== -1) {
            this.items[index] = { ...this.items[index], ...item };
            return this.items[index];
        }
        throw new Error('Item not found');
    }

    async delete(id: string): Promise<{ success: boolean }> {
        const index = this.items.findIndex(i => i.id === parseInt(id));
        if (index !== -1) {
            this.items.splice(index, 1);
            return { success: true };
        }
        throw new Error('Item not found');
    }
}
