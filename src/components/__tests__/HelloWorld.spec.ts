import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { mount } from "@vue/test-utils";
import DummyComponent from "@/components/DummyComponent.vue";
import { useChannelsStore, ChannelTypes } from "@/stores/channels"; // Adjust according to your actual store
import { nextTick } from "vue";

// Mock the store module, including ChannelTypes enum
vi.mock("@/stores/counter", () => ({
  useChannelsStore: vi.fn(),
  ChannelTypes: {
    Phone: "phone",
    Email: "email",
    WhatsApp: "WhatsApp",
    Random: "random",
  },
}));

describe("YourComponent", () => {
  let mockUpdateChannelsOptions: Mock<any, any>;
  let mockChannelsItem: { options: any };

  beforeEach(() => {
    // Initialize the mock functions
    mockUpdateChannelsOptions = vi.fn();
    mockChannelsItem = {
      options: [
        { title: "Project Alpha", type: ChannelTypes.Email },
        { title: "Project Beta", type: ChannelTypes.Phone },
      ],
    };

    // Return the mocked store from the Pinia store
    useChannelsStore.mockReturnValue({
      updateChannelsOptions: mockUpdateChannelsOptions,
      channelsItem: mockChannelsItem,
    });
  });

  it("should update global channels when apply is clicked", async () => {
    // Mount the component
    const wrapper = mount(DummyComponent, {
      // Add any props or other necessary options here
    });

    // Directly modify localChannels in the component, since it's a ref
    await wrapper.vm.localChannels.push({
      title: "New Channel",
      type: ChannelTypes.WhatsApp,
    });
    await wrapper.vm.localChannels.push({
      title: "Another Channel",
      type: ChannelTypes.Phone,
    });

    // Log mock calls before trigger
    console.log("Before trigger:", mockUpdateChannelsOptions.mock.calls);

    // Trigger the Apply button click
    await wrapper.find("[type=\"button\"]").trigger("click");

    // Log mock calls after trigger
    console.log("After trigger:", mockUpdateChannelsOptions.mock.calls);

    // Wait for the DOM to update
    await nextTick();

    // Check if the spy was called with the expected arguments
    expect(mockUpdateChannelsOptions).toHaveBeenCalledWith([
      { title: "New Channel", type: ChannelTypes.WhatsApp },
      { title: "Another Channel", type: ChannelTypes.Phone },
    ]);

    // Optionally verify that it was called exactly once
    expect(mockUpdateChannelsOptions).toHaveBeenCalledTimes(1);
  });
});
