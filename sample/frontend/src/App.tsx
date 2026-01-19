import { useEffect, useState } from 'react';

// Define the type for an item
interface Item {
  id: number;
  name: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]); // <- use Item[] type
  const [newItem, setNewItem] = useState<string>(''); // <- explicit string type

  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/items');
    const data: Item[] = await res.json(); // <- tell TS this is an array of Item
    setItems(data);
  };

  const addItem = async () => {
    await fetch('http://localhost:5000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem })
    });
    setNewItem('');
    fetchItems();
  };

  useEffect(() => { fetchItems(); }, []);

  return (
    <div>
      <h1>Sample Items</h1>
      <input 
        value={newItem} 
        onChange={e => setNewItem(e.target.value)} 
        placeholder="New item"
      />
      <button onClick={addItem}>Add</button>
      <ul>
        {items.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
