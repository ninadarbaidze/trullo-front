import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ColumnType, TaskType } from 'types/global';
import { Task, TaskList } from 'components';

const Column: React.FC<{
  tasks: TaskType[];
  column: ColumnType;
  index: number;
  addMoreTasks: (arg1: string) => void;
  key: string;
}> = (props) => {
  // console.log(Object.keys(props.placeholderProps).length === 0);
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
                  {/* <TaskList tasks={props.tasks} /> */}
                  <ul className={` flex flex-col `}>
                    {props.tasks.map((task, index: number) => (
                      // <Task
                      //   key={task.id as string}
                      //   task={task}
                      //   index={index}
                      //   isDragging={props.isDragging}
                      // />
                      <Draggable
                        draggableId={task.id as string}
                        index={index}
                        key={task.id}
                      >
                        {(provided, snapshot) => (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={`${
                              snapshot.isDragging ? 'bg-white' : 'bg-white'
                            } pb-16 rounded-xl shadow-sm mb-4`}
                          >
                            <div>{task.content}</div>
                          </li>
                        )}
                        {}
                      </Draggable>
                    ))}
                  </ul>
                  {provided.placeholder}
                  {Object.keys(props.placeholderProps).length > 0 &&
                    snapshot.isDraggingOver && (
                      <div
                        style={{
                          position: 'absolute',
                          top: props.placeholderProps.clientY,
                          left: props.placeholderProps.clientX,
                          height: props.placeholderProps.clientHeight,
                          // background: 'tomato',
                          width: props.placeholderProps.clientWidth,
                        }}
                        className={`bg-blue-100 border border-dashed border-blue-400 rounded-xl`}
                      />
                    )}
                </div>
              )}
            </Droppable>
            <p onClick={() => props.addMoreTasks(props.column.id)}>+add more</p>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Column;
