<template>
  <Popover>
    <PopoverTrigger>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button>
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
      <form class="" @submit.prevent="onSubmit">
        <div class="w-full flex items-center">
          <Field name="newOption" v-slot="{ field }">
            <Input
              v-bind="field"
              type="text"
              placeholder="Type to add channel..."
              class="input-style pl-10 pr-10 w-full focus:text-gray-500 focus:bg-blue-100"
              @focus="isInputFocused = true"
              @blur="isInputFocused = false"
            />
            <Plus
              :class="{
                'bg-blue-100': isInputFocused,
                'text-gray-500': !isInputFocused,
              }"
              class="absolute right-3 cursor-pointer rounded"
            />
          </Field>
        </div>
        <!-- <div class="w-full bg-red"> -->
        <draggable class="dragArea list-group w-full" :list="localChannels" @change="log">
          <div class="text-sm text-gray-700" v-for="element in localChannels" :key="element.title">
            <div class="w-full flex items-center justify-between mt-5 mb-5">
              <Button @change="log">
                <GripVertical class="text-muted-foreground" />
              </Button>
              <IconComponent :type="element.type" />

              {{ element.title }}
              <Button @click="removeOptionToChannels(index)">
                <Trash2 class="text-muted-foreground" />
              </Button>
            </div>
          </div>
        </draggable>
        <Separator />

        <div class="w-full flex justify-end gap-3 mt-3">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="button" @click="applyChanges">Apply</Button>
        </div>
        <!-- </div> -->
      </form>
    </PopoverContent>
  </Popover>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
import { Plus, Trash2, GripVertical } from "lucide-vue-next";
import IconComponent from "@/components/IconComponent.vue";
import { useChannelsStore, ChannelTypes, type ChannelOption } from "@/stores/counter";
import { useForm, Field } from "vee-validate";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  setup() {
    const isInputFocused = ref(false);

    const { removeOptionToChannels, addOptionToChannels, updateChannelsOptions, channelsItem } = useChannelsStore();
    console.log("channelsItem", channelsItem.options);
    const localChannels = ref([...(channelsItem.options || [])]);
    console.log("localChannels", localChannels);

    watch(
      () => channelsItem.value?.options,
      (newOptions) => {
        localChannels.value = [...(newOptions || [])];
      },
      { deep: true },
    );

    const { handleSubmit, resetForm } = useForm({
      initialValues: {
        newOption: "",
      },
    });
    const onSubmit = handleSubmit((values) => {
      const newOption = {
        title: values.newOption,
        type: ChannelTypes.Phone,
      };
      localChannels.value = [...localChannels.value, newOption];

      // addOptionToChannels(newOption);
      resetForm();
    });
    const applyChanges = () => {
      updateChannelsOptions(localChannels.value); // Update store
    };
    return {
      removeOptionToChannels,
      onSubmit,
      isInputFocused,
      onFocus: () => (isInputFocused.value = true),
      onBlur: () => (isInputFocused.value = false),
      localChannels,
      applyChanges,
    };
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      list: this.localChannels,
    };
  },
  methods: {
    log(event) {
      const { updateChannelsOptions } = useChannelsStore();
      console.log("this.list useChannelsStore", this.list);

      updateChannelsOptions(this.list);

      console.log("Drag event:", event);
      console.log("Updated channelsItem options:", this.list);
    },
  },
});
</script>
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
