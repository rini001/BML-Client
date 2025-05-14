// src/components/BookCard.tsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';

interface Book {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  availability: boolean;
}

const BookCard = ({ book }: { book: Book }) => {
  const { user } = useContext(AuthContext);

  const handleAddToMyBooks = async () => {
    if (!user) {
      alert('Please log in to add books to your list.');
      return;
    }

    try {
      await axios.post(`/api/mybooks/${book._id}`);
    //   alert('Book added to your list!');
    } catch {
      alert('Failed to add book.');
    }
  };

  return (
    <div className="border rounded p-4 shadow bg-white">
      <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover rounded mb-3" />
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-700 mb-2">by {book.author}</p>
      <button
        onClick={handleAddToMyBooks}
        className="bg-blue-600 text-white px-3 py-1 rounded mt-2 w-full"
      >
        Want to Read
      </button>
      
    </div>
  );
};

export default BookCard;
