import {saveBlob} from '@/utils/BytesConverter';
import {uid} from 'uid';
import {computed, ref, onMounted} from 'vue';
import {useTaskStore, useFileStore} from '@/store';
export default function useFileArea(task) {
  const taskStore = useTaskStore();
  const fileStore = useFileStore();
  const files = computed(() => task.documents.map((doc) => getContent(doc)));
  const selectedFile = ref(null);
  function addFiles(event) {
    if (!event.target.files) return;
    Array.from(event.target.files).forEach((file) => {
      const id = uid();
      fileStore.addFile({id: id, content: file, name: file.name, type: file.type});
      taskStore.addTaskFile(task, id);
    });
  }
  function getContent(doc) {
    return fileStore.files.find((f) => f.id === doc);
  }
  function deleteFile(fileId) {
    taskStore.removeTaskFile(task.id, fileId);
    fileStore.removeFile(fileId);
  }
  function saveFile(file) {
    saveBlob(file.name, file.content);
  }
  function getImageUrl(file) {
    if (file.type.includes('image')) {
      return URL.createObjectURL(file.content);
    }
    return '/file-icon.svg';
  }
  function openImg(file) {
    if (file.type.includes('image')) {
      selectedFile.value = file;
    }
  }
  function closeImg() {
    selectedFile.value = null;
  }
  return {files, selectedFile, saveFile, addFiles, deleteFile, getImageUrl, openImg, closeImg};
}
