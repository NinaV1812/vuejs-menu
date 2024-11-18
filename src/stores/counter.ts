import { reactive, computed } from "vue";
import { defineStore } from "pinia";

export enum ChannelTypes {
  Phone = "phone",
  Email = "email",
  WhatsApp = "WhatsApp",
  Random = "random",
}

export type ChannelOption = {
  title: string;
  type: ChannelTypes;
};

const dummyChannelsOptions: ChannelOption[] = [
  { title: "Project Alpha", type: ChannelTypes.Email },
  { title: "Project Beta", type: ChannelTypes.Phone },
  { title: "Project Gamma", type: ChannelTypes.WhatsApp },
];

export const sideMenuItems = [
  { title: "Inbox", options: [] },
  { title: "Personal", options: [] },
  { title: "Teams", options: [] },
  { title: "Channels", options: dummyChannelsOptions, isEditable: true },
  { title: "Views", options: [] },
  { title: "Labels", options: [] },
  { title: "Users", options: [] },
];

export const useChannelsStore = defineStore("channels", () => {
  const menuItems = reactive(sideMenuItems);
  const channelsItem = computed(() => menuItems.find((item) => item.title === "Channels"));

  const addOptionToChannels = (newOption: ChannelOption) => {
    if (channelsItem.value?.options) {
      channelsItem.value.options = [...channelsItem.value.options, newOption];
    }
  };

  const removeOptionToChannels = (index: number) => {
    if (channelsItem.value?.options) {
      channelsItem.value.options = channelsItem.value.options.filter((_, i) => i !== index);
    }
  };

  const updateChannelsOptions = (updatedList: ChannelOption[]) => {
    if (channelsItem.value) {
      channelsItem.value.options = [...updatedList];
    }
  };

  return { menuItems, addOptionToChannels, removeOptionToChannels, channelsItem, updateChannelsOptions };
});
