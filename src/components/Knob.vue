<template>
  <div class="knob-container">
    <div class="optionsLabels" />
    <div class="knob">
      <div class="pointer" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Knob",
};
</script>

<style>
.knob {
  width: 60px;
  height: 60px;
  clip-path: circle();
  background-color: black;
}

.pointer {
  width: 0px;
  height: 50%;
  border-right: 1px solid white;
  margin: 0 auto;
}
</style>
