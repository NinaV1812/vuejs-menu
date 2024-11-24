<script setup lang="ts">
import { onMounted } from "vue";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PopoverDialog from "@/components/PopoverDialog.vue";
import CreateConversation from "@/components/CreateConversation.vue";
import { ChannelTypes, ChannelOption } from "@/stores/channels";
import { useChannelsStore } from "@/stores/channels";
import IconLabel from "@/components/IconLabel.vue";

const defaultValue = "item-5";

const dummyChannelsOptions: ChannelOption[] = [
  { title: "Project Alpha", type: ChannelTypes.Email },
  { title: "Project Beta", type: ChannelTypes.Phone },
  { title: "Project Gamma", type: ChannelTypes.WhatsApp },
];

const fetchChannelsOptions = (): Promise<ChannelOption[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyChannelsOptions);
    }, 1000);
  });
};

const { menuItems, updateChannelsOptions } = useChannelsStore();

onMounted(async () => {
  const channelsOptions = await fetchChannelsOptions();
  updateChannelsOptions(channelsOptions);
});
</script>

<template>
  <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
    <AccordionItem v-for="item in menuItems" :key="item.value" :value="item.value">
      <AccordionTrigger>
        <span class="bold">{{ item.title }}</span>
        <div class="ml-auto">
          <PopoverDialog v-if="!!item?.content?.length" />
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div v-for="(option, optIndex) in item.content" :key="optIndex" class="dropdown-item">
          <IconLabel :type="option?.type" :title="option?.title" />
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  <CreateConversation />
</template>
<style>
.dropdown-item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #e9ecef;
}
</style>
