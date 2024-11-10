<script lang="ts">
import { defineComponent, ref } from "vue";
import type { PropType } from "vue"; // Use 'type' for PropType
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, PhoneCall, Trash2 } from "lucide-vue-next";
import { Separator } from "@/components/ui/separator";
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
    Popover, PopoverContent, PopoverTrigger,
  },
  props: {
    handleApply: {
      type: Function as PropType<(index: number, newOption: string) => void>,
      required: true,
    },
    options: {
      type: Array,
      default: () => [], // Default empty array if not passed
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const newOption = ref(""); // Reactive variable for the input value
    const isInputFocused = ref(false);

    // Handle focus and blur events
    const onFocus = () => {
      isInputFocused.value = true;
    };

    const onBlur = () => {
      isInputFocused.value = false;
    };

    // The onApply method should now be in setup and use props.handleApply
    const onApply = () => {
    //     console.log('AAAAA', newOption.value)
    //     console.log('BBBBB',props.index )
    //     console.log('handleApply',props.handleApply )
    //   if (props.handleApply) {
    //     console.log('CCCCCc',props.index )

    //     props.handleApply(props.index, newOption.value);
    //   }
    [...props.options, newOption.value];
    };

    return {
      newOption,
      isInputFocused,
      onFocus,
      onBlur,
      onApply,
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
            <p style="color: white">Add channels</p>
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
        <Button @click="onApply">Apply</Button>
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
  background-color: #f3f4f6; /* Light gray background */
  border: 1px solid #d1d5db; /* Gray border */
  transition: all 0.3s ease;
}

.input-style:focus {
  background-color: #e5e7eb; /* Light blue on focus */
  border-color: #3b82f6; /* Blue border on focus */
  outline: none;
}

.input-style::placeholder {
  color: #9ca3af; /* Placeholder color */
}

.input-style:focus::placeholder {
  color: #6b7280; /* Darker placeholder color when focused */
}
</style>
