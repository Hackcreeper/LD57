<template>
  <TresCanvas window-size clear-color="gray">
    <TresPerspectiveCamera />
    <TresMesh>
      <TresTorusGeometry :args="[2.4, 0.1, 60, 6]" />
      <TresMeshBasicMaterial color="black" />
    </TresMesh>
    <TresMesh>
      <TresTorusGeometry :args="[1.5, 0.1, 60, 6]" />
      <TresMeshBasicMaterial color="blue" />
    </TresMesh>
    <TresMesh>
      <TresTorusGeometry :args="[.5, 0.1, 60, 6]" />
      <TresMeshBasicMaterial color="pink" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>

  <div class="fixed bottom-0 left-0 right-0 h-64 bg-red-300">UI</div>
</template>
