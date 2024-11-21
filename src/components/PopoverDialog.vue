<script lang="ts">
import { defineComponent, ref } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { Plus, Trash2, GripVertical } from "lucide-vue-next";
import IconComponent from "@/components/IconComponent.vue";
import { useChannelsStore, ChannelTypes } from "@/stores/channels";
import { useForm, Field } from "vee-validate";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button as UiButton } from "@/components/ui/Button";
import { PopoverClose } from "radix-vue";

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    GripVertical,
    Trash2,
    IconComponent,
    Field,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Separator,
    Plus,
    PopoverClose,
    UiButton,
  },

  setup() {
    const isInputFocused = ref(false);

    const { updateChannelsOptions, channelsItem } = useChannelsStore();
    const localChannels = ref([...(channelsItem.options || [])]);

    const getRandomChannelType = (): ChannelTypes => {
      const channelTypes = Object.values(ChannelTypes);
      const randomIndex = Math.floor(Math.random() * channelTypes.length);
      return channelTypes[randomIndex];
    };

    const { handleSubmit, resetForm, values } = useForm({
      initialValues: {
        newOption: "",
      },
    });

    const onSubmit = handleSubmit(() => {
      if (!values.newOption.trim()) {
        return;
      }

      const newOption = {
        title: values.newOption.trim(),
        type: getRandomChannelType(),
      };

      localChannels.value = [...localChannels.value, newOption];
      resetForm();
    });

    const applyChanges = () => {
      updateChannelsOptions(localChannels.value);
    };

    const removeLocalChannel = (index: number) => {
      const updatedChannels = localChannels.value.filter((_, idx) => idx !== index);
      localChannels.value = updatedChannels;
    };
    return {
      onSubmit,
      isInputFocused,
      onFocus: () => (isInputFocused.value = true),
      onBlur: () => (isInputFocused.value = false),
      localChannels,
      applyChanges,
      removeLocalChannel,
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
            <Button class="add-button">
              <Plus />
            </Button>
          </TooltipTrigger>

          <TooltipContent class="bg-black">
            <span class="colour-white">Add channels</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </PopoverTrigger>

    <PopoverContent class="ml-40">
      <form @submit.prevent="onSubmit">
        <div class="w-full flex items-center">
          <Field name="newOption" v-slot="{ field }">
            <Input
              v-bind="field"
              type="text"
              placeholder="Type to add channel..."
              class="input-style focus:text-gray-500 focus:bg-blue-100"
              @focus="isInputFocused = true"
              @blur="isInputFocused = false"
              @keydown.enter="onSubmit"
            />
            <Plus
              :class="{
                'text-gray-500': !isInputFocused,
              }"
              class="absolute right-8 rounded"
            />
          </Field>
        </div>

        <draggable :list="localChannels">
          <div class="text-sm text-gray-700" v-for="(element, index) in localChannels" :key="element.title">
            <div class="channel-row">
              <GripVertical />

              <div class="flex w-full gap-5">
                <IconComponent :type="element.type" class="text-muted-foreground" />
                {{ element.title }}
              </div>

              <Button @click="removeLocalChannel(index)">
                <Trash2 class="text-muted-foreground" />
              </Button>
            </div>
          </div>
        </draggable>

        <Separator />
        <PopoverClose class="w-full flex justify-end gap-3 mt-3">
          <UiButton variant="outline" type="button">Cancel</UiButton>
          <UiButton @click="applyChanges">Apply</UiButton>
        </PopoverClose>
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
  padding: 10px 5px 10px 5px;
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

.colour-white {
  color: white;
}
.channel-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0;
  padding: 7px;
  background-color: #ffffff;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  gap: 5px;
}

.channel-row:hover {
  background-color: #f9fafb;
}
</style>
