<template>
  <div class="files-area">
    <div class="files-area__container" :class="!files.length ? 'centered' : ''">
      <div v-if="files" v-for="file in files" class="files-area__file" @click="openImg(file)">
        <img class="files-area__img" :src="getImageUrl(file)" />
        <p class="files-area__name">{{ file.name }}</p>
        <button v-if="!task.isDone" type="button" class="files-area__button delete" @click.stop="deleteFile(file.id)" />
        <button type="button" class="files-area__button save" @click.stop="saveFile(file)" />
      </div>
      <input
        type="file"
        class="files-area__input"
        multiple
        @change="addFiles"
        ref="fileInput"
        :disabled="task.isDone"
      />
      <span v-if="!files.length" class="files-area__text"
        >{{ task.isDone ? 'нет файлов' : 'можешь добавить сюда файлы' }}
      </span>
      <span v-if="files.length && !task.isDone" class="files-area__text plus">+</span>
      <div v-if="selectedFile">
        <Teleport to="body">
          <div class="files-area__open-img" @click="closeImg">
            <img :src="getImageUrl(selectedFile)" />
          </div>
        </Teleport>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, ref, onMounted} from 'vue';
import {useFileArea} from '@/composables';
const {task} = defineProps(['task']);
const {files, saveFile, selectedFile, addFiles, deleteFile, getImageUrl, openImg, closeImg} = useFileArea(task);
const fileInput = ref(null);
onMounted(() => {
  fileInput.value.focus();
});
</script>

<style lang="scss" scoped>
@use '@/scss' as styles;

.files-area {
  margin-top: 23px;
  border: 2px dashed styles.$green;
  border-radius: 10px;
  padding: 5px;
  min-height: 100px;
  width: 100%;
  @include styles.flex(row, center);
  &__container {
    position: relative;
    width: 100%;
    min-height: 100px;
    @include styles.flex(row, flex-start, center);
    flex-wrap: wrap;
    gap: 10px;
    &.centered {
      @include styles.flex(column, center, center);
    }
  }

  &__text {
    @include styles.mainText(12px);
    color: #72833c;
    &.plus {
      height: 90px;
      max-height: 90px;
      max-width: 90px;
      min-width: 90px;
      border-radius: 10px;
      border: 1px solid styles.$green;
      @include styles.flex(column, center, center);
      @include styles.mainText(30px);
    }
  }
  &__input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &:disabled {
      cursor: default;
    }
  }
  &__file {
    position: relative;
    height: 90px;
    max-height: 90px;
    max-width: 90px;
    min-width: 90px;
    border-radius: 10px;
    border: 2px solid styles.$green;
    z-index: 1;
    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
    &:hover > .files-area__button {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    }
    &.deleted {
      opacity: 0.5;
      filter: grayscale(100%);
    }
  }
  &__name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    @include styles.mainText(12px);
    width: calc(100% - 10px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin: 5px;
  }
  &__button {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    padding: 3px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.4);
    top: 5px;
    min-width: 20px;
    height: 20px;
    cursor: pointer;
    background-repeat: no-repeat;
    cursor: pointer;
    background-size: 90%;
    background-position: center;
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
    &.delete {
      right: 5px;
      background-image: url('./close-icon-red.svg');
      background-size: 70%;
    }
    &.save {
      left: 5px;
      background-image: url('./download-icon.svg');
    }
  }
  &__open-img {
    position: fixed;
    backdrop-filter: blur(4px);
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 52;
    @include styles.flex(column, center, center);
    img {
      max-width: 95vw;
      max-height: 95vh;
      width: fit-content;
      height: fit-content;
      border-radius: 10px;
      object-fit: contain;
    }
  }
}
.loader {
  min-height: 100px;
}
</style>
