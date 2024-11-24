<script lang="ts">
import { defineComponent } from "vue";
import { Button as UiButton } from "@/components/ui/Button";
import { FilePenLine } from "lucide-vue-next";

export default defineComponent({
  components: {
    UiButton,
    FilePenLine,
  },
});
</script>

<template>
  <div class="container">
    <UiButton variant="outline" type="button">
      <FilePenLine />
      <span class="bold">Create Conversation</span>
    </UiButton>
  </div>
</template>

<style>
.container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  font-weight: 700;
}
</style>
