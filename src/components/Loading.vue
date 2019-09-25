<template>
  <div class="loading_layout">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.loading_layout{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 85%;
  background-color: #fff;
  z-index: 100;
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -2.5rem;
  margin-left: -1.25rem;
  width: 5rem;
  height: 2.5rem;
  /* margin-top: 100px; */
}
.loading span {
  display: inline-block;
  width: 0.5rem;
  height: 100%;
  border-radius: 0.25rem;
  background: lightgreen;
  animation: load 1s ease infinite;
}
@keyframes load {
  0%,
  100% {
    height: 2.5rem;
    background: lightgreen;
  }
  50% {
    height: 4.375rem;
    margin: -0.9375rem 0;
    background: lightblue;
  }
}
.loading span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  animation-delay: 0.4s;
}
.loading span:nth-child(4) {
  animation-delay: 0.6s;
}
.loading span:nth-child(5) {
  animation-delay: 0.8s;
}
</style>