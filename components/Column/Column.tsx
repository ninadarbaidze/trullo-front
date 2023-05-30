'use client';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ActionDialog, TaskList, ThreeDots, X } from 'components';
import { useColumn } from './useColumn';
import { submitOnEnterHandler } from 'helpers';
import { PropsTypes } from './types';

const Column: React.FC<PropsTypes> = (props) => {
  const {
    inputValue,
    taskInputIsOpen,
    setTaskInputIsOpen,
    submitTaskHandler,
    dropdownRef,
    triggerRef,
    columnDialogIsOpen,
    dropdownToggler,
    deleteColumn,
  } = useColumn(props.addMoreTasks, props.column.id, props.deleteColumnHandler);

  return (
    <Draggable
      draggableId={props.column.id}
      index={props.index}
      key={props.key}
    >
      {(provided) => (
        <li
          className='flex flex-col gap-2 p-5 relative'
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h2
            className='bg-babyBlue text-sm font-semibold'
            {...provided.dragHandleProps}
          >
            {columnDialogIsOpen && (
              <div className='absolute top-10 right-4 z-50' ref={dropdownRef}>
                <ActionDialog deleteHandler={deleteColumn} />
              </div>
            )}
            <section className='flex items-start justify-between py-2'>
              <div className='pr-1'> {props.column.title}</div>
              <button
                ref={triggerRef}
                className='pt-1'
                onClick={() => dropdownToggler()}
              >
                <ThreeDots color='#828282' />
              </button>
            </section>
          </h2>

          <div className='flex flex-col w-60'>
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
                    <TaskList
                      tasks={props.tasks}
                      deleteTaskHandler={props.deleteTaskHandler}
                    />
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
              className=''
            >
              {taskInputIsOpen ? (
                <div className='flex flex-col gap-2'>
                  <textarea
                    ref={inputValue}
                    name='new-task'
                    className='bg-white w-full p-2 h-20 break-all text-xs shadow-md align-top rounded-xl -sm resize-none'
                    placeholder='Enter a title for this task..'
                    onKeyDown={(e) =>
                      submitOnEnterHandler(e, submitTaskHandler)
                    }
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
                  className='flex items-center justify-between bg-blue200 rounded-lg text-xs text-blue500 px-2 cursor-pointer'
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
