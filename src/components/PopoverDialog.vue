<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue"; // Use 'type' for PropType
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, PhoneCall, Trash2 } from "lucide-vue-next";
import { Separator } from "@/components/ui/separator";
import { useChannelsStore } from "@/stores/counter";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default defineComponent({
  components: {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Separator,
    Plus,
    PhoneCall,
    Trash2,
    Popover,
    PopoverContent,
    PopoverTrigger,
    },

  props: {
    handleApply: {
      type: Function as PropType<(index: number, newOption: string) => void>,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const newOption = ref("");
    const isInputFocused = ref(false);

    const onFocus = () => {
      isInputFocused.value = true;
    };

    const onBlur = () => {
      isInputFocused.value = false;
    };
    const { addOptionToChannels } = useChannelsStore();

    return {
      newOption,
      isInputFocused,
      onFocus,
      onBlur,
      addOptionToChannels,
    };
  },
});
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Plus class="add-button" />
          </TooltipTrigger>
          <TooltipContent bg="black">
            <span>Add channels</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </PopoverTrigger>

    <PopoverContent class="ml-40">
      <div class="w-full flex items-center relative">
        <Input
          type="text"
          v-model="newOption"
          placeholder="Type to add channel..."
          class="input-style pl-10 pr-10 w-full focus:text-gray-500 focus:bg-blue-100"
          @focus="onFocus"
          @blur="onBlur"
        />
        <Plus
          :class="{
            'bg-blue-100': isInputFocused,
            'text-gray-500': !isInputFocused,
          }"
          class="absolute right-3 cursor-pointer rounded"
        />
      </div>

      <div v-for="(option, index) in options" :key="index" class="text-sm text-gray-700">
        <div class="w-full flex items-center justify-between mt-3 mb-3">
          <PhoneCall class="text-muted-foreground" />
          <Label for="email" class="flex-1 ml-3 mr-3">{{ option }}</Label>
          <Trash2 class="text-muted-foreground" />
        </div>
      </div>

      <Separator />

      <div class="w-full flex justify-end gap-3 mt-3">
        <Button variant="outline">Cancel</Button>
        <Button @click="addOptionToChannels">Apply</Button>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style scoped>
.focus-text-gray-500 {
  background-color: red;
  border-radius: 4px;
}

.add-button {
  padding: 3px;
  color: #6c757d;
  cursor: pointer;
  border-radius: 4px;
}

.input-style {
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  font-size: 14px;
  border-radius: 4px;
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  transition: all 0.3s ease;
}

.input-style:focus {
  background-color: #e5e7eb;
  border-color: #3b82f6;
  outline: none;
}

.input-style::placeholder {
  color: #9ca3af;
}

.input-style:focus::placeholder {
  color: #6b7280;
}
</style>
