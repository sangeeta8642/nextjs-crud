export default function ItemList({ items, onDelete, onEdit }) {
    return (
      <ul>
        {items.map((item) => (
          <li key={item._id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p>{item.description}</p>
              </div>
              <div>
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  