/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from "react";
import type { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ITEMS = [
  { id: "1", url: "https://placehold.jp/150x150.png" },
  { id: "2", url: "https://placehold.jp/200x200.png" },
  { id: "3", url: "https://placehold.jp/250x250.png" },
  { id: "4", url: "https://placehold.jp/300x300.png" },
];

export const DnD = () => {
  const [items, setItems] = useState(ITEMS);

  const handleOnDragEnd = useCallback((result: DropResult, _provided: ResponderProvided) => {
    setItems((prevItems) => {
      if (!result.destination) return prevItems;
      const newItems = Array.from(prevItems);
      const [reorderedItem] = newItems.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, reorderedItem);
      return newItems;
    });
  }, []);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="images" direction="horizontal">
        {(provided) => {
          return (
            <ul {...provided.droppableProps} ref={provided.innerRef} className="flex bg-green-400">
              {items.map((item, index) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => {
                      return (
                        <li
                          className="mr-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img src={item.url} alt="" width={100} height={100} />
                        </li>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};
