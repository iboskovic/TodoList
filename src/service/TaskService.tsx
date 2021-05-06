import { BaseService } from "./BaseService";
import ITask from '../types/ITask';

export default class TaskService extends BaseService
{
    async get(): Promise<ITask[]> {
        const res = await this.instance.get("tasks")
        return res.data;
    }

    async post(data: ITask){
        const res = await this.instance.post("tasks", data);
        return res;
    }

    async put(id: string, data: ITask){
        const res = await this.instance.put("tasks/" + id , data);
        return res;
    }

    async delete(taskId: number) {
        const res = await this.instance.delete("tasks/" + taskId);
        return res;
    }

    //get default values from id
    async getId(id: string) {
        const res = await this.instance.get<ITask>("tasks/" + id)
        return res;
    }
}
