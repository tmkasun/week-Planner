import React, { useState } from 'react';

import { TaskItem } from './TaskItem';
import refreshButton from '../../images/refresh-button.svg';
import { IconButton } from '../IconButton';
import { Droppable } from 'react-beautiful-dnd';
import '../../styles/Tasks/TasksList.css';
import { getActiveTasks } from '../../data/utils/tasks';

const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? '#d4dbe7a1' : 'white',
    borderRadius: '1rem',
    boxShadow: isDraggingOver
        ? 'rgb(204 219 232) 3px 3px 6px 0px inset, rgb(255 255 255 / 50%) -3px -3px 6px 1px inset'
        : 'none',
});

const TasksList = (props) => {
    const { tasks, onDelete, onUpdate, groupId, movingTasks } = props;
    const [showActive, setShowActive] = useState(false);
    const sortedByStatus = tasks.sort((a, b) =>
        b.status.localeCompare(a.status)
    );
    const visibleTasks = getActiveTasks(sortedByStatus, showActive);
    const inputID = `show-only-active-todos-${groupId}`;
    return (
        <div className="todo-list">
            <div className="todo-actions">
                <div className="active-selector">
                    <input
                        id={inputID}
                        type="checkbox"
                        className="show-only-active"
                        checked={showActive}
                        onChange={(e) => setShowActive(e.target.checked)}
                    />
                    <label htmlFor={inputID}>Show only active tasks</label>
                </div>
                {/* <IconButton onClick={onRefresh} iconImage={refreshButton} /> */}
            </div>
            <Droppable droppableId={`${groupId}`}>
                {(provided, snapshot) => (
                    <ul
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                        className="task-list-ul"
                    >
                        {visibleTasks.map((task, index) => (
                            <TaskItem
                                isMoving={movingTasks[task.id]}
                                index={index}
                                onUpdate={onUpdate}
                                groupId={groupId}
                                onDelete={onDelete}
                                key={task.id}
                                task={task}
                            />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
            {tasks.length === 0 && 'No tasks available.'}
        </div>
    );
};

export default TasksList;
