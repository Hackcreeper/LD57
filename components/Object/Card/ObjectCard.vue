<script lang="ts" setup>
import { Html } from '@tresjs/cientos'
import { DragControls } from 'three/addons/controls/DragControls.js'
import * as THREE from 'three'
import type { BoardCard } from '~/types/Board'

defineProps<{
  card: BoardCard
}>()

const boardStore = useBoardStore()

// This `shallowRef` returns an instance of the underlying mesh object of THREE
// which is required to work with internals that are not (yet) available as
// Vue Components
const cardRef = shallowRef()
const { camera } = useTresContext()

// For performance reasons we initialize a vector here, so that we don't need to
// recreate a new vector each frame that a card is dragged. The content of the vector
// will be overridden by the `onDrag` event listener. Please don't use it anywhere
const worldPosition = new THREE.Vector3()

// We need to wait for the mounting to happen, so that the `cardRef` is actually set
onMounted(() => {
  // The `transformGroup` is required, because otherwise we could drag all blender sub-objects
  // instead of the whole model. 😅
  const controls = new DragControls([cardRef.value], camera.value!, document.body)
  controls.transformGroup = true

  controls.addEventListener('drag', (event) => {
    // Make sure the cards are not changing their "height"
    event.object.position.y = 0

    // TODO: Actually do something with the information
    boardStore.getIntersectingCards(worldPosition.x, worldPosition.z)
  })
})
</script>

<template>
  <TresGroup
    ref="cardRef"
    :position="[card.x, 0, card.z]"
  >
    <TresMesh ref="cardRef">
      <GLTFModel path="/models/Card.glb" />
      <Html
        transform
        :position="[-.8, .5, 0]"
        :scale="[0.75, 0.75, 0.75]"
        :rotation="[1.5708, 0, 1.5708]"
      >
        <ObjectCardContent :card="card.card" />
      </Html>
    </TresMesh>
  </TresGroup>
</template>
