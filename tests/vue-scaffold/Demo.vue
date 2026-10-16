<script setup lang="ts">
import { ref } from 'vue';
import Accordion from '@/components/rizzo/Accordion.vue';
import Alert from '@/components/rizzo/Alert.vue';
import AlertDialog from '@/components/rizzo/AlertDialog.vue';
import AspectRatio from '@/components/rizzo/AspectRatio.vue';
import Avatar from '@/components/rizzo/Avatar.vue';
import BackToTop from '@/components/rizzo/BackToTop.vue';
import Breadcrumb from '@/components/rizzo/Breadcrumb.vue';
import ButtonGroup from '@/components/rizzo/ButtonGroup.vue';
import Button from '@/components/rizzo/Button.vue';
import Collapsible from '@/components/rizzo/Collapsible.vue';
import ContextMenu from '@/components/rizzo/ContextMenu.vue';
import CopyToClipboard from '@/components/rizzo/CopyToClipboard.vue';
import Dashboard from '@/components/rizzo/Dashboard.vue';
import Dropdown from '@/components/rizzo/Dropdown.vue';
import type { MenuItem } from '@/components/rizzo/Dropdown.vue';
import Empty from '@/components/rizzo/Empty.vue';
import FontSwitcher from '@/components/rizzo/FontSwitcher.vue';
import HoverCard from '@/components/rizzo/HoverCard.vue';
import Kbd from '@/components/rizzo/Kbd.vue';
import Modal from '@/components/rizzo/Modal.vue';
import Navbar from '@/components/rizzo/Navbar.vue';
import Pagination from '@/components/rizzo/Pagination.vue';
import Popover from '@/components/rizzo/Popover.vue';
import ProgressBar from '@/components/rizzo/ProgressBar.vue';
import ResizableHandle from '@/components/rizzo/ResizableHandle.vue';
import ResizablePane from '@/components/rizzo/ResizablePane.vue';
import ResizablePaneGroup from '@/components/rizzo/ResizablePaneGroup.vue';
import ScrollArea from '@/components/rizzo/ScrollArea.vue';
import Separator from '@/components/rizzo/Separator.vue';
import Settings from '@/components/rizzo/Settings.vue';
import Sheet from '@/components/rizzo/Sheet.vue';
import Skeleton from '@/components/rizzo/Skeleton.vue';
import Slider from '@/components/rizzo/Slider.vue';
import SoundEffects from '@/components/rizzo/SoundEffects.vue';
import Switch from '@/components/rizzo/Switch.vue';
import Table from '@/components/rizzo/Table.vue';
import Tabs from '@/components/rizzo/Tabs.vue';
import ThemeSwitcher from '@/components/rizzo/ThemeSwitcher.vue';
import Toast from '@/components/rizzo/Toast.vue';
import Toggle from '@/components/rizzo/Toggle.vue';
import ToggleGroup from '@/components/rizzo/ToggleGroup.vue';
import Tooltip from '@/components/rizzo/Tooltip.vue';

const modalOpen = ref(false);
const dialogOpen = ref(false);
const sheetOpen = ref(false);
const popOpen = ref(false);
const switchOn = ref(false);
const sliderVal = ref(30);
const pressed = ref(false);
const selected = ref('');
const dismissed = ref(0);
const tabChange = ref('');

const menu: MenuItem[] = [
  { label: 'Edit', value: 'edit' },
  { label: 'Disabled', value: 'dis', disabled: true },
  { separator: true, label: '' },
  { label: 'More', submenu: [{ label: 'Sub one', value: 'sub1' }, { label: 'Sub two', value: 'sub2' }] },
  { label: 'Docs', href: '#docs' },
];
const items = [
  { id: 'a', title: 'First', content: '<b>first body</b>' },
  { id: 'b', title: 'Second', content: 'second body' },
  { id: 'c', title: 'Third', content: 'third body' },
];
const tabs = [
  { id: 'one', label: 'One', content: 'panel one' },
  { id: 'two', label: 'Two', content: 'panel two' },
  { id: 'three', label: 'Three', content: 'panel three' },
];
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'qty', label: 'Qty', type: 'number' as const },
];
const rows = [
  { name: 'Banana', qty: 12 },
  { name: 'Apple', qty: 3 },
  { name: 'Cherry', qty: 30 },
];
</script>

<template>
  <div>
    <Navbar site-name="Demo" />
    <main id="demo-main" style="padding: 1rem; display: grid; gap: 2rem">
      <section id="s-modal">
        <Button id="open-modal" @click="modalOpen = true">Open modal</Button>
        <Modal v-model:open="modalOpen" title="Demo modal">
          <p>Modal body</p>
          <input id="modal-input" aria-label="Modal input" />
          <template #footer><button class="btn" id="modal-ok" @click="modalOpen = false">OK</button></template>
        </Modal>
        <span id="modal-state">{{ modalOpen }}</span>
      </section>

      <section id="s-dialog">
        <button class="btn" id="open-dialog" @click="dialogOpen = true">Open dialog</button>
        <AlertDialog v-model:open="dialogOpen" title="Delete?" description="This cannot be undone">
          <template #actions>
            <button class="btn" id="dialog-cancel" @click="dialogOpen = false">Cancel</button>
          </template>
        </AlertDialog>
      </section>

      <section id="s-sheet">
        <button class="btn" id="open-sheet" @click="sheetOpen = true">Open sheet</button>
        <Sheet v-model:open="sheetOpen" title="Demo sheet" side="left"><p>Sheet body</p></Sheet>
      </section>

      <section id="s-popover">
        <Popover v-model:open="popOpen">
          <template #trigger>Pop trigger</template>
          <p id="pop-body">Popover body</p>
        </Popover>
      </section>

      <section id="s-hover">
        <HoverCard :open-delay="10" :close-delay="10">
          <template #trigger><a href="#hover" id="hover-trigger">Hover me</a></template>
          <p id="hover-body">Hover body</p>
        </HoverCard>
      </section>

      <section id="s-context">
        <ContextMenu>
          <template #trigger><div id="ctx-area" style="padding: 2rem; border: 1px dashed">Right-click here</div></template>
          <div role="menuitem" id="ctx-item">Context item</div>
        </ContextMenu>
      </section>

      <section id="s-tabs">
        <Tabs :tabs="tabs" @change="tabChange = $event" />
        <span id="tab-change">{{ tabChange }}</span>
      </section>

      <section id="s-accordion">
        <Accordion :items="items" />
      </section>

      <section id="s-collapsible">
        <Collapsible trigger-label="More info"><p id="coll-body">Collapsed body</p></Collapsible>
      </section>

      <section id="s-dropdown">
        <Dropdown trigger="Actions" :items="menu" @select="selected = $event" />
        <span id="dd-selected">{{ selected }}</span>
      </section>

      <section id="s-form">
        <Switch id="sw" v-model:checked="switchOn" label="Enable" />
        <span id="sw-state">{{ switchOn }}</span>
        <Slider v-model:value="sliderVal" aria-label="Volume" />
        <span id="slider-state">{{ sliderVal }}</span>
        <Toggle v-model:pressed="pressed">Bold</Toggle>
        <span id="toggle-state">{{ pressed }}</span>
        <ToggleGroup><Toggle>A</Toggle><Toggle>B</Toggle></ToggleGroup>
      </section>

      <section id="s-feedback">
        <Alert variant="success" dismissible @dismiss="dismissed++">Saved</Alert>
        <span id="alert-dismissed">{{ dismissed }}</span>
        <Toast :auto-dismiss="300" variant="info">Temp toast</Toast>
        <ProgressBar :value="40" show-label />
        <ProgressBar indeterminate />
        <Skeleton variant="text" />
        <Empty title="Nothing" description="No items"><template #action><button class="btn">Add</button></template></Empty>
      </section>

      <section id="s-display">
        <Avatar name="Ada Lovelace" />
        <Avatar initials="XY" size="lg" shape="square" />
        <Breadcrumb :items="[{ label: 'Home', href: '/' }, { label: 'Docs', href: '/docs' }, { label: 'Page' }]" />
        <ButtonGroup><Button>One</Button><Button>Two</Button></ButtonGroup>
        <Pagination :current-page="3" :total-pages="9" />
        <Table :columns="columns" :data="rows" filterable caption="Fruit" />
        <Separator />
        <Kbd>⌘K</Kbd>
        <Tooltip text="Tip text" />
        <AspectRatio :ratio="2"><div style="background: gray; height: 100%">ratio</div></AspectRatio>
        <ScrollArea><div style="height: 300px">tall</div></ScrollArea>
      </section>

      <section id="s-misc">
        <CopyToClipboard value="npm i rizzo-css" />
        <CopyToClipboard value="hello" icon-only button-label="Copy code" />
        <Collapsible><template #default>x</template></Collapsible>
        <ThemeSwitcher id-prefix="demo" />
        <FontSwitcher id-prefix="demo" />
        <SoundEffects />
      </section>

      <section id="s-resize" style="height: 160px">
        <ResizablePaneGroup>
          <ResizablePane :default-size="50"><div id="pane-a">A</div></ResizablePane>
          <ResizableHandle with-handle />
          <ResizablePane :default-size="50"><div id="pane-b">B</div></ResizablePane>
        </ResizablePaneGroup>
      </section>

      <section id="s-dash" style="height: 200px; overflow: auto">
        <Dashboard><p>Dash main</p></Dashboard>
      </section>
    </main>
    <BackToTop />
    <!-- Uncontrolled, exactly as the Full template uses it; opened from the Navbar button -->
    <Settings />
  </div>
</template>
