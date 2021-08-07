import type { DragEndEvent } from "@dnd-kit/core";
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

export const DndKit = () => {
  const [items, setItems] = useState(["1", "2", "3", "4", "5"]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!active || !over || active.id === over.id) return;
    setItems((items) => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="flex flex-wrap gap-2">
          {items.map((id) => {
            return <SortableItem key={id} id={id} />;
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

const SortableItem = (props: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id });

  return (
    <div
      ref={setNodeRef}
      className={`w-20 h-20 ${getColor(Number(props.id))} ${isDragging ? "z-10" : ""}`}
      style={{ transform: CSS.Transform.toString(transform), transition: transition ?? undefined }}
      {...attributes}
      {...listeners}
    >
      {props.id}
    </div>
  );
};

const getColor = (item: number) => {
  switch (item) {
    case 1:
      return "bg-red-400";
    case 2:
      return "bg-blue-400";
    case 3:
      return "bg-pink-400";
    case 4:
      return "bg-yellow-400";
    case 5:
      return "bg-purple-400";
    default:
      return "bg-black";
  }
};
