import React from 'react';
import { getFirestore, collection, doc, updateDoc } from 'firebase/firestore';
import { List } from 'react-native-paper';

function TodoComponent({ id, title, complete }) {
  const firestore = getFirestore();

  // async function toggleComplete() {
  //   await firestore()
  //     .collection('todos')
  //     .update({
  //       complete: !complete,
  //   });
  async function toggleComplete() {
    const todoDoc = doc(firestore, 'todos', id);
    await updateDoc(todoDoc, {
      complete: !complete,
    });
}

return (
  <List.Item
    title={title}
    onPress={() => toggleComplete()}
    left={props => (
      <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
    )}
  />
);
}

export default TodoComponent;
