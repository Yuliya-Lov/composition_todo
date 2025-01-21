import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useFileStore = defineStore('files', () => {
  const files = ref([]);

  function addFile(file) {
    files.value.push(file);
  }

  function removeFile(fileId) {
    files.value = files.value.filter((f) => f.id !== fileId);
  }

  return {files, addFile, removeFile};
});
