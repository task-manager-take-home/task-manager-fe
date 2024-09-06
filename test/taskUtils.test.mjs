import * as chai from 'chai';
import { updateTaskInList, deleteTaskFromList, toggleTaskCompletion } from '../src/utils/taskUtils.mjs';  // Ensure the correct path and .js extension
import { sortTasks } from '../src/utils/taskSorting.mjs';

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


describe('Task Sorting Function', () => {
  const tasks = [
    { id: 1, title: 'Task 1', status: 'incomplete', priority: 'secondary' },
    { id: 2, title: 'Task 2', status: 'complete', priority: 'immediate' },
    { id: 3, title: 'Task 3', status: 'incomplete', priority: 'immediate' }
  ];

  it('should sort tasks by completed status', () => {
    const sortedTasks = sortTasks(tasks, 'completed');

    sortedTasks.should.have.lengthOf(1);  // Only 1 task should be complete
    sortedTasks[0].status.should.equal('complete');
  });

  it('should sort tasks by incomplete status', () => {
    const sortedTasks = sortTasks(tasks, 'incomplete');

    sortedTasks.should.have.lengthOf(2);  // 2 tasks should be incomplete
    sortedTasks[0].status.should.equal('incomplete');
    sortedTasks[1].status.should.equal('incomplete');
  });

  it('should sort tasks by priority', () => {
    const sortedTasks = sortTasks(tasks, 'priority');

    sortedTasks.should.have.lengthOf(3);  // All tasks should be present
    sortedTasks[0].priority.should.equal('immediate');  // Immediate priority first
    sortedTasks[1].priority.should.equal('immediate');
    sortedTasks[2].priority.should.equal('secondary');  // Secondary priority last
  });
});