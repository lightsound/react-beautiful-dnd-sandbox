import { Tab } from "@headlessui/react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { DndKit } from "src/components/DndKit";

const ReactBeautifulDnd = dynamic(
  async () => {
    const { ReactBeautifulDnd } = await import("src/components/ReactBeautifulDnd");
    return ReactBeautifulDnd;
  },
  { ssr: false }
);

const Index: NextPage = () => {
  return (
    <Tab.Group defaultIndex={0}>
      <Tab.List>
        {({ selectedIndex }) => {
          return (
            <>
              <Tab className={`p-4 ${selectedIndex === 0 ? "bg-red-300" : ""}`}>dnd-kit</Tab>
              <Tab className={`p-4 ${selectedIndex === 1 ? "bg-red-300" : ""}`}>react-beautiful-dnd</Tab>
            </>
          );
        }}
      </Tab.List>
      <Tab.Panels className="p-4 bg-green-300">
        <Tab.Panel>
          <DndKit />
        </Tab.Panel>
        <Tab.Panel>
          <ReactBeautifulDnd />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Index;
