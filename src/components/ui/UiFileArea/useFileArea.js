import {saveBlob} from '@/utils/BytesConverter';
import {ref} from 'vue';
export default function useFileArea(task) {
  const selectedFile = ref(null);
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
  return {selectedFile, saveFile, getImageUrl, openImg, closeImg};
}
