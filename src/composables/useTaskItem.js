import {ref, watch} from 'vue';
import {useTaskStore} from '@/store';
import {debounce} from 'lodash';

export default function useTaskItem(task) {
  const taskStore = useTaskStore();
  const isTaskPopupOpen = ref(false);
  const taskTitle = ref(task.title);

  const debounceTaskTitle = debounce(() => {
    taskStore.updateTask({...task, title: taskTitle.value});
  }, 1000);

  function toggleCompleteTask(task) {
    taskStore.toggleCompleteTask(task);
  }
  function deleteTask() {
    taskStore.removeTask(task.id);
  }
  function openTaskPopup() {
    isTaskPopupOpen.value = true;
  }
  function closeTaskPopup() {
    isTaskPopupOpen.value = false;
  }

  return {
    toggleCompleteTask,
    deleteTask,
    openTaskPopup,
    closeTaskPopup,
    isTaskPopupOpen,
    taskTitle,
    debounceTaskTitle,
  };
}
