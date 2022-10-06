import { createRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ToDoStore from '../../store/ToDoStore';
import ToDo from '../ToDo';
import FormInput from '../FormInput';
import './ToDoList.css';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { VerticalDirection, VerticalPosition } from '../../types/enums';

interface Props {
  store: ToDoStore;
  onAdd: (newValue: string) => void;
  onEdit: (id: string, data: Partial<ToDoModel>) => void;
  onDelete: (id: string) => void;
  onChangeOrder: (id: string, newPlace: number) => void;
}

const ID_Tables: {
  [id: string]: string;
} = {};

const ToDoList = observer(({ store, onAdd, onEdit, onDelete, onChangeOrder }: Props) => {
  const refsById = Object.fromEntries(
    store.ToDos.map(todo => [todo.id, createRef<HTMLDivElement>()])
  );

  const [grabableElements, setGrabableElements] = useState<GrabableElementSet>();
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [draggingData, setDraggingData] = useState<GrabbingData>({ target: null });

  useEffect(() => {
    if (!grabableElements && Object.keys(refsById).length === store.ToDos.length) {
      const grabables: GrabableElementSet = {};

      // We've grabbed all the refs
      for (const [id, ref] of Object.entries(refsById)) {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return console.error("Couldn't find client rect for => ", id, ref);

        // rect.y equals the element horizontal top line (most superior line), the head (vertically speaking)
        // rect.bottom equals the element most bottom line, the foot (vertically speaking)
        grabables[id] = {
          id,
          x: Math.floor(rect.x),
          y: Math.floor(rect.y),
          middle: Math.ceil(rect.top + Math.abs(rect.bottom - rect.top) / 2),
        };
      }

      setGrabableElements(grabables);
    }
  }, [refsById, store.ToDos, grabableElements, setGrabableElements]);

  useEffect(() => {
    store.ToDos.forEach(todo => {
      ID_Tables[todo.id] = todo.description;
    });
  }, [store.ToDos]);
  const handleStartDragging = (id: string) => {
    setIsGrabbing(true);
    if (grabableElements) {
      setDraggingData({
        target: grabableElements[id],
      });
    }
  };

  const handleDrag = (evt: DraggableEvent, data: DraggableData) => {
    if (!grabableElements || !draggingData.target) return;

    const { assumedDirection } = draggingData;

    if (assumedDirection === undefined || assumedDirection === null) {
      if (data.y > 10) {
        // Up direction
        return setDraggingData(data => ({
          ...data,
          assumedDirection: VerticalDirection.Down,
        }));
      } else if (data.y < -10) {
        // Going down
        return setDraggingData(data => ({
          ...data,
          assumedDirection: VerticalDirection.Up,
        }));
      } else {
        // Not decided yet
        return;
      }
    }

    // We need first to assume the direction

    if (evt instanceof MouseEvent) {
      const { y: currentY } = evt;

      let lastPassedElement: PassingElement | undefined;

      for (const element of Object.values(grabableElements)) {
        if (assumedDirection === VerticalDirection.Up) {
          if (element.middle >= currentY) {
            lastPassedElement = {
              element,
              from: VerticalPosition.Below,
            };
            break;
          }
        } else if (assumedDirection === VerticalDirection.Down) {
          console.log(`Middle: ${element.middle} | CurrentY: ${currentY}`);
          if (element.middle <= currentY) {
            console.log(`New passed element => `, ID_Tables[element.id]);
            lastPassedElement = {
              element,
              from: VerticalPosition.Above,
            };
          }
        }
      }

      if (lastPassedElement) {
        console.warn('New element => ', lastPassedElement.element.id);

        setDraggingData(data => ({ ...data, lastPassingElement: lastPassedElement }));
      }
    }
  };

  const handleStopDragging = () => {
    const { target, lastPassingElement } = draggingData;

    setIsGrabbing(false);

    if (!target || !lastPassingElement) return;
    if (target.id === lastPassingElement.element.id) return;

    const { id: passingElementId } = lastPassingElement.element;

    const passingElementData = store.ToDos.find(todo => todo.id === passingElementId);
    if (!passingElementData)
      return console.error("Couldn't find todo with id => ", passingElementId);

    onChangeOrder(target.id, passingElementData.place);
  };

  const getPassingClass = (data: PassingElement | undefined, elementId: String) => {
    if (!data || data.element.id !== elementId) return '';

    if (data.from === VerticalPosition.Above) {
      return 'passing-todo__from-above';
    } else {
      return 'passing-todo__from-below';
    }
  };

  const orderedTodos = [...store.ToDos].sort((a, b) => a.place - b.place);

  return (
    <div className={`todo-list ${(isGrabbing && 'grabbing') || ''}`}>
      <FormInput title='Add' onSubmit={onAdd} />

      <div className='todo-list__header'>
        <h3>Description</h3>
        <h3>Completed</h3>
        <h3>Action</h3>
      </div>

      {orderedTodos.map(todo => (
        <div
          key={todo.id}
          className={`todo-container ${
            (isGrabbing && getPassingClass(draggingData.lastPassingElement, todo.id)) ||
            ''
          }`}
        >
          <Draggable
            onStart={() => handleStartDragging(todo.id)}
            onStop={handleStopDragging}
            onDrag={(evt, data) => handleDrag(evt, data)}
            axis='y'
            defaultClassNameDragging='whiteBackground'
          >
            <div className={`grabbable ${(isGrabbing && 'grabbing') || ''}`}>
              <ToDo
                refObj={refsById[todo.id]}
                {...todo}
                onDescriptionChange={(description: string) =>
                  onEdit(todo.id, { description })
                }
                onCheckClick={() => onEdit(todo.id, { isCompleted: !todo.isCompleted })}
                onDelete={() => onDelete(todo.id)}
              />
            </div>
          </Draggable>
        </div>
      ))}
    </div>
  );
});

export default ToDoList;
