import {defineStore} from 'pinia';
import {defaultTask} from '../utils/constants';
import {ref, computed} from 'vue';
import {uid} from 'uid';
import {cloneDeep} from 'lodash';

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([]);
  const isDoneExcludes = ref(false);
  const searchString = ref('');
  const filteredTasks = computed(() => {
    const currentTasks = cloneDeep(tasks.value);
    return currentTasks.filter((t) => isRelevantTask(t));
  });
  function addTask(tilte) {
    const lastIndex = tasks.value[tasks.value.length - 1]?.index || 0;
    const defTask = cloneDeep(defaultTask);
    const task = {...defTask, title: tilte, id: uid(), index: lastIndex + 1};
    tasks.value.push(task);
  }
  function updateTask(task) {
    tasks.value = tasks.value.map((t) => {
      if (t.id === task.id) {
        t = task;
      }
      return t;
    });
  }
  function isRelevantTask(task) {
    const isSearchString = searchString.value
      ? task.title.toLowerCase().includes(searchString.value.toLowerCase())
      : true;
    return isDoneExcludes.value ? task.isDone === false && isSearchString : isSearchString;
  }
  function removeTask(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }
  function toggleCompleteTask(task) {
    tasks.value = tasks.value.map((t) => {
      if (t.id === task.id) {
        t.isDone = !task.isDone;
      }
      return t;
    });
  }
  function setIndexTask(id, index) {
    tasks.value = tasks.value.map((t) => {
      if (t.id === id) {
        t.index = index;
      }
      return t;
    });
  }
  function setIsDoneExcludes(value) {
    isDoneExcludes.value = value;
  }
  function addTaskFile(task, fileId) {
    tasks.value = tasks.value.map((t) => {
      if (t.id === task.id) {
        t.documents.push(fileId);
      }
      return t;
    });
  }
  function removeTaskFile(taskId, fileId) {
    tasks.value = tasks.value.map((t) => {
      if (t.id === taskId) {
        t.documents = t.documents.filter((d) => d !== fileId);
      }
      return t;
    });
  }

  function setSearchString(value) {
    searchString.value = value;
  }

  return {
    tasks,
    filteredTasks,
    isDoneExcludes,
    addTask,
    updateTask,
    removeTask,
    toggleCompleteTask,
    setIndexTask,
    addTaskFile,
    setIsDoneExcludes,
    removeTaskFile,
    setSearchString,
  };
});
