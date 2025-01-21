import {computed, nextTick} from 'vue';
import {useTaskStore} from '@/store';
export default function useSwitcher() {
  const taskStore = useTaskStore();
  const isDoneExcludes = computed(() => taskStore.isDoneExcludes);
  async function onSwitch() {
    taskStore.setIsDoneExcludes(!taskStore.isDoneExcludes);
    await nextTick();
  }
  return {isDoneExcludes, onSwitch};
}
