<template>
  <div class="knob-container">
    <div class="optionsLabels"></div>
    <div class="knob">
      <div class="pointer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "knob",
  props: ["options"],
};
</script>

<style>
.knob {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: black;
}

.pointer {
  width: 0px;
  height: 50%;
  border-right: 1px solid white;
  margin: 0 auto;
}
</style>
