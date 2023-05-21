import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ColumnType, Placeholder, TaskType } from 'types/global';
import { TaskList, X } from 'components';
import { useColumn } from './useColumn';

const Column: React.FC<{
  tasks: TaskType[];
  column: ColumnType;
  index: number;
  addMoreTasks: (arg1: string, arg2: string) => void;
  key: string;
  placeholderProps: Placeholder;
}> = (props) => {
  const {
    inputValue,
    taskInputIsOpen,
    setTaskInputIsOpen,
    submitTaskHandler,
    submitOnEnterHandler,
  } = useColumn(props.addMoreTasks, props.column.id);

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
                        className={`bg-blue100 border border-dashed border-blue-400 rounded-xl`}
                      />
                    )}
                </div>
              )}
            </Droppable>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitTaskHandler();
              }}
            >
              {taskInputIsOpen ? (
                <div className='flex flex-col gap-2'>
                  <textarea
                    ref={inputValue}
                    name='new-task'
                    className='bg-white w-full p-2 h-20 break-all text-xs shadow-md align-top rounded-xl -sm resize-none'
                    placeholder='Enter a title for this task..'
                    onKeyDown={submitOnEnterHandler}
                  />
                  <nav className='flex gap-1'>
                    <button
                      className='bg-blue500 text-white px-2 py-1 text-xs rounded-md'
                      type='submit'
                    >
                      Add task
                    </button>
                    <button
                      className='hover:opacity-40'
                      onClick={() => setTaskInputIsOpen(false)}
                    >
                      <X pathClassName='fill-gray-500' />
                    </button>
                  </nav>
                </div>
              ) : (
                <div
                  className='flex items-center justify-between bg-blue200 rounded-lg text-xs text-blue500  px-2 cursor-pointer'
                  onClick={() => setTaskInputIsOpen(true)}
                >
                  <p className='cursor-pointer'>Add another card</p>
                  <button type='button' className='text-lg'>
                    +
                  </button>
                </div>
              )}
            </form>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Column;
