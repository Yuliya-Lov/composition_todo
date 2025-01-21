import {computed} from 'vue';
import {useTaskStore} from '@/store';
export default function useTaskList() {
  const taskStore = useTaskStore();
  const tasks = computed(() => taskStore.filteredTasks);
  return {tasks};
}
