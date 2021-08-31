import React, { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContexts';

 function TodoTable() {

    const context = useContext(TodoContext);

    return (
        <div>
            {context.todos.map(todo =>(
                <div>{todo.name}</div>
            )) }
        </div>
    );
}

export default TodoTable;