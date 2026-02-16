export const applyAnswers = ({ tasks, lineItems, answers }) => {
  const answerMap = new Map();
  answers.forEach((answer) => {
    if (!answer?.field_key || !answer?.target_id) return;
    answerMap.set(`${answer.field_key}:${answer.target_id}`, answer.value);
  });

  const updatedTasks = tasks.map((task) => {
    const roomAnswer = answerMap.get(`room:${task.id}`);
    const missing = Array.isArray(task.missing_fields)
      ? task.missing_fields
      : [];
    const updatedMissing = missing.filter(
      (field) => !answerMap.has(`${field}:${task.id}`),
    );
    return {
      ...task,
      room: roomAnswer || task.room,
      missing_fields: updatedMissing,
    };
  });

  const updatedLineItems = lineItems.map((item) => {
    const quantityAnswer = answerMap.get(`quantity:${item.task_id}`);
    const unitAnswer = answerMap.get(`unit:${item.task_id}`);
    const itemKeyAnswer = answerMap.get(`item_key:${item.task_id}`);
    const descriptionAnswer = answerMap.get(`description:${item.task_id}`);

    return {
      ...item,
      quantity: quantityAnswer ? Number(quantityAnswer) : item.quantity,
      unit: unitAnswer || item.unit,
      item_key: itemKeyAnswer || item.item_key,
      description: descriptionAnswer || item.description,
    };
  });

  return { updatedTasks, updatedLineItems, answerMap };
};
