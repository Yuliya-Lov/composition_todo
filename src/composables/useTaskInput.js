import {ref} from 'vue';
import {useTaskStore} from '@/store';

export default function useTaskInput() {
  const taskStore = useTaskStore();
  const text = ref('');

  const addNewTask = (event) => {
    event.preventDefault();
    if (!text.value.trim()) return;
    taskStore.addTask(text.value.trim());
    text.value = '';
  };

  return {
    text,
    addNewTask,
  };
}
