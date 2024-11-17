<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Trash2, GripVertical } from "lucide-vue-next";
import { Separator } from "@/components/ui/separator";
import { useChannelsStore, ChannelTypes, type ChannelOption } from "@/stores/counter";
import { useForm, Field } from "vee-validate";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import IconComponent from "@/components/IconComponent.vue";
import { VueDraggableNext } from 'vue-draggable-next'

export default defineComponent({
  components: {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Separator,
    Plus,
    Trash2,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Field,
    IconComponent,
    // draggable,
    GripVertical,
  },
  props: {
    options: {
      type: Array as () => ChannelOption[],
      default: () => [],
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const isInputFocused = ref(false);
    const popoverVisible = ref(false);
    const dragEnabled = ref(false); // Add this reactive flag for drag enable state
    const drag = ref(false);
    const localOptions = ref<ChannelOption[]>([...props.options]);

    const { addOptionToChannels, removeOptionToChannels } = useChannelsStore();

    const { handleSubmit, resetForm, values } = useForm({
      initialValues: {
        newOption: "",
      },
    });

    const onSubmit = handleSubmit((values) => {
      const newOption = {
        title: values.newOption, // Set the title to the value of newOption
        type: ChannelTypes.Phone, // Default type is 'phone'
      };

      addOptionToChannels(newOption); // Pass the new option to the function
      resetForm(); // Reset the form after submission
      popoverVisible.value = false; // Close the popover
    });

    const onCancel = () => {
      resetForm(); // Clear the input field
      popoverVisible.value = false; // Hide the popover
    };

    // Watch for changes to the localOptions and emit changes back to the parent
    watch(localOptions, (newOptions) => {
      console.log("Updated options:", newOptions);
    });

    // Enable drag functionality
    const enableDrag = () => {
      dragEnabled.value = true;
    };

    // Check if move is allowed (could be extended with custom logic)
    const checkMove = (e) => {
      // Log the index and decide if move should happen
      console.log("Future index: " + e.draggedContext.futureIndex);
      return true; // Allow all moves (could add conditions)
    };

    return {
      isInputFocused,
      onFocus: () => (isInputFocused.value = true),
      onBlur: () => (isInputFocused.value = false),
      popoverVisible,
      onSubmit,
      onCancel,
      values,
      removeOptionToChannels,
      dragEnabled, // Return the drag state
      enableDrag, // Return the function to enable drag
      localOptions,
      drag,
      checkMove,
    };
  },
});
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger >
            <Button >
              <Plus class="add-button" />
            </Button>
          </TooltipTrigger>
          <TooltipContent bg="black">
            <span>Add channels</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </PopoverTrigger>

    <PopoverContent class="popover-content ml-40">
      <form class="w-2/3 space-y-6" @submit.prevent="onSubmit">
        <div class="w-full flex items-center relative">
          <Field name="newOption" v-slot="{ field }">
            <Input
              v-bind="field"
              type="text"
              placeholder="Type to add channel..."
              class="input-style pl-10 pr-10 w-full focus:text-gray-500 focus:bg-blue-100"
              @focus="isInputFocused = true"
              @blur="isInputFocused = false"
            />
          </Field>
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
            <Button @click="removeOptionToChannels(index)">
              <GripVertical class="text-muted-foreground" />
            </Button>
            <IconComponent :type="option.type" />
            <Label for="email" class="flex-1 ml-3 mr-3">{{ option.title }}</Label>
            <Button @click="removeOptionToChannels(index)">
              <Trash2 class="text-muted-foreground" />
            </Button>
          </div>
        </div>

        <Separator />

        <div class="w-full flex justify-end gap-3 mt-3">
          <Button variant="outline" type="button" @click="onCancel">Cancel</Button>
          <Button type="submit">Apply</Button>
        </div>
      </form>
    </PopoverContent>
  </Popover>
</template>

<style scoped>
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

.popover-content {
  z-index: 1050;
}
.list-group {
  overflow: visible !important;
}
</style>
