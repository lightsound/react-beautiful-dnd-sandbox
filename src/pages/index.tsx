import type { NextPage } from "next";
import dynamic from "next/dynamic";

const DnD = dynamic(
  async () => {
    const { DnD } = await import("src/components/DnD");
    return DnD;
  },
  { ssr: false }
);

const Index: NextPage = () => {
  return (
    <>
      <h1>react-beautiful-dnd</h1>
      <DnD />
    </>
  );
};

export default Index;
