import * as chai from 'chai';
import { updateTaskInList, deleteTaskFromList, toggleTaskCompletion } from '../src/utils/taskUtils.mjs';  // Ensure the correct path and .js extension

chai.should(); // Enable should assertions

describe('Task Utility Functions', () => {

  const tasks = [
    { id: 1, title: 'Test Task 1', status: 'incomplete', priority: 'secondary' },
    { id: 2, title: 'Test Task 2', status: 'complete', priority: 'immediate' }
  ];

  it('should update a task in the list', () => {
    const updatedTask = { id: 1, title: 'Updated Task', status: 'complete', priority: 'secondary' };
    const updatedTasks = updateTaskInList(tasks, updatedTask);

    updatedTasks.should.have.lengthOf(2);
    updatedTasks[0].should.deep.equal(updatedTask);
  });

  it('should delete a task from the list', () => {
    const updatedTasks = deleteTaskFromList(tasks, 1);

    updatedTasks.should.have.lengthOf(1);
    updatedTasks[0].id.should.equal(2);
  });

  it('should toggle the task completion status', () => {
    const task = { id: 1, title: 'Test Task', status: 'incomplete' };
    const toggledTask = toggleTaskCompletion(task);

    toggledTask.status.should.equal('complete');
  });

});
