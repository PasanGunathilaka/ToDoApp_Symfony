import React, { Fragment, useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContexts';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteDialog from './DeleteDialog';

function TodoTable() {

    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editTodo, setEditTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDeleted, setTodoToBeDeleted] = useState(null);


    return (
        <Fragment>


            <form onSubmit={(event) => { context.createTodo(event, { name: addTodo }) }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow>
                            <TableCell>
                                <TextField value={addTodo} onChange={(event) => { setAddTodo(event.target.value) }} label="New Task" fullWidth={true} />
                            </TableCell>
                            <TableCell align="right">
                                <IconButton type="submit">
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={index}>


                                <TableCell>
                                    {
                                        editIsShown === todo.id ?
                                            <TextField
                                                value={editTodo}
                                                onChange={(event) => {
                                                    setEditTodo(event.target.value)
                                                }}
                                                fullWidth={true}
                                                InputProps={{
                                                    endAdornment: <Fragment>
                                                        <IconButton onClick={() => {
                                                            setEditIsShown(false);
                                                        }}
                                                        ><CloseIcon /> </IconButton>

                                                        <IconButton onClick={() => {
                                                            context.updateTodo({ id: todo.id, name: editTodo });
                                                            setEditIsShown(false);
                                                        }}>
                                                            <DoneIcon /> </IconButton>
                                                    </Fragment>,

                                                }}
                                            />
                                            :
                                            todo.name
                                    }



                                </TableCell>

                                <TableCell align="right">

                                    <IconButton onClick={() => (setEditIsShown(todo.id), setEditTodo(todo.name))}>
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton onClick={() => { setDeleteConfirmationIsShown(true), setTodoToBeDeleted(todo) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))

                        }
                    </TableBody>

                </Table>
            </form>

            {deleteConfirmationIsShown && (
                <DeleteDialog
                    todo={todoToBeDeleted}
                    open={deleteConfirmationIsShown}
                    setDeleteConfirmationIsShown={setDeleteConfirmationIsShown} />


            )}
        </Fragment>
    );
}

export default TodoTable;