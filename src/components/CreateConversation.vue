<script lang="ts">
import { defineComponent } from "vue";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-vue-next";

export default defineComponent({
  components: {
    Button,
    FilePenLine,
  },
});
</script>

<template>
  <div class="container">
    <Button variant="outline" type="button">
      <FilePenLine />
      <span class="bold">Create Conversation</span>
    </Button>
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
.bold {
  font-weight: 700;
}
</style>
