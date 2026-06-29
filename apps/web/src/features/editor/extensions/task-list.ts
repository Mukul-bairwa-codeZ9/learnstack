import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

export const taskListExtensions = [
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
];