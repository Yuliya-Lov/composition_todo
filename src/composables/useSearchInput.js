import {useTaskStore} from '@/store';
import {debounce} from 'lodash';

export default function useSearchInput() {
  const taskStore = useTaskStore();
  function focusInput(input) {
    input.focus();
  }

  const setSearchString = debounce((searchString) => {
    taskStore.setSearchString(searchString.trim());
  }, 1000);

  return {
    focusInput,
    setSearchString,
  };
}
