import {computed} from 'vue';
import {useTaskStore} from '@/store';
export default function useCounter() {
  const taskStore = useTaskStore();
  const tasksCount = computed(() => taskStore.tasks.length || 0);
  const doneTasksCount = computed(() => taskStore.tasks.filter((t) => t.isDone).length || 0);
  return {tasksCount, doneTasksCount};
}
