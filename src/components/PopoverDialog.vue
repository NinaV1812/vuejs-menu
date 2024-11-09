<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, PhoneCall, Trash2 } from "lucide-vue-next";
import { Separator } from "@/components/ui/separator";
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        <!-- <Plus class="add-button" @click="addItem()"/> -->
        Open popover
      </Button>
    </PopoverTrigger>
    <PopoverContent class="ml-40">
      <div class="w-full flex items-center relative">
        <Input id="search" type="text" placeholder="Search..." class="pl-10 pr-10 w-full" />
        <Plus class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
      </div>

      <div class="w-full flex items-center justify-between mt-3 mb-3">
        <PhoneCall class="text-muted-foreground" />
        <Label for="email" class="flex-1 text-center">Your email address</Label>
        <Trash2 class="text-muted-foreground" />
      </div>
      <Separator />
      <div class="w-full flex">
        <Button variant="outline">
          Cancel
        </Button>
        <Button variant="outline">
          Apply
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style>
.text-gray-500:hover {
  color: #0056b3; 
}
</style>
