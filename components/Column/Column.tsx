import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ColumnType, Placeholder, TaskType } from 'types/global';
import { TaskList } from 'components';
import { useColumn } from './useColumn';

const Column: React.FC<{
  tasks: TaskType[];
  column: ColumnType;
  index: number;
  addMoreTasks: (arg1: string, arg2: string) => void;
  key: string;
  placeholderProps: Placeholder;
}> = (props) => {
  const { inputValue, taskInputIsOpen, setTaskInputIsOpen } = useColumn();

  return (
    <Draggable
      draggableId={props.column.id}
      index={props.index}
      key={props.key}
    >
      {(provided) => (
        <li
          className='flex flex-col gap-2 p-5 '
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h2
            className='bg-babyBlue text-sm font-semibold'
            {...provided.dragHandleProps}
          >
            {props.column.title}
          </h2>

          <div className='flex flex-col w-44'>
            <Droppable droppableId={props.column.id} type='task'>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`${
                    snapshot.isDraggingOver ? ' relative' : 'bg-babyBlue'
                  } flex flex-col  flex-grow min-h-[100px]`}
                >
                  <ul className={` flex flex-col `}>
                    <TaskList tasks={props.tasks} />
                  </ul>
                  {provided.placeholder}
                  {Object.keys(props.placeholderProps).length > 0 &&
                    snapshot.isDraggingOver && (
                      <div
                        style={{
                          position: 'absolute',
                          top: props.placeholderProps.clientY as number,
                          left: props.placeholderProps.clientX as number,
                          height: props.placeholderProps.clientHeight as number,
                          width: props.placeholderProps.clientWidth as number,
                        }}
                        className={`bg-blue-100 border border-dashed border-blue-400 rounded-xl`}
                      />
                    )}
                </div>
              )}
            </Droppable>

            <form
              action=''
              onSubmit={(e) => {
                e.preventDefault();
                props.addMoreTasks(props.column.id, inputValue.current!.value);
                inputValue.current!.value = '';
              }}
            >
              <p onClick={() => setTaskInputIsOpen(true)}>+add more</p>
              {taskInputIsOpen && (
                <input type='text' ref={inputValue} name='new-task' />
              )}
            </form>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Column;
