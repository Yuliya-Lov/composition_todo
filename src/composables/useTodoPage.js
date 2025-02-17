import {computed} from 'vue';
import {useTaskStore} from '@/store';

export default function useTaskInput() {
  const taskStore = useTaskStore();
  const tasks = computed(() => taskStore.filteredTasks);

  const addNewTask = (newName) => {
    taskStore.addTask(newName);
  };

  return {
    tasks,
    addNewTask,
  };
}
