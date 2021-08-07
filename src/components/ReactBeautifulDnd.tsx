import { useCallback, useState } from "react";
import type { DropResult, ResponderProvided } from "react-beautiful-dnd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const ReactBeautifulDnd = () => {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

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
            <ul {...provided.droppableProps} ref={provided.innerRef} className="flex flex-wrap gap-2">
              {items.map((item, index) => {
                return (
                  <Draggable key={item} draggableId={item.toString()} index={index}>
                    {(provided) => {
                      return (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className={`w-20 h-20 ${getColor(item)}`}>{item}</div>
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
