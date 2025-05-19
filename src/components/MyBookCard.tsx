// src/components/MyBookCard.tsx
import axios from '../api/axios';
import { useState } from 'react';

interface MyBook {
  _id: string; // mybooks document ID
  bookId: {
    _id: string;
    title: string;
    author: string;
    coverImage: string;
  };
  status: string;
  rating: number;
}

const MyBookCard = ({ book}: { book: MyBook; refresh: () => void }) => {
  const [status, setStatus] = useState(book.status);
  const [rating, setRating] = useState(book.rating);

  const handleStatusChange = async (newStatus: string) => {
    try {
      await axios.patch(`/api/mybooks/${book.bookId._id}/status`, { status: newStatus });
      setStatus(newStatus);
    } catch {
      alert('Failed to update status');
    }
  };

  const handleRatingChange = async (newRating: number) => {
    try {
      await axios.patch(`/api/mybooks/${book.bookId._id}/rating`, { rating: newRating });
      setRating(newRating);
    } catch {
      alert('Failed to update rating');
    }
  };

  return (
    <div className="border rounded p-4 shadow bg-white">
      <img src={book.bookId.coverImage} alt={book.bookId.title} className="w-full h-48 object-cover rounded mb-3" />
      <h3 className="text-lg font-semibold">{book.bookId.title}</h3>
      <p className="text-sm text-gray-700 mb-2">by {book.bookId.author}</p>

      <div className="mb-2 bg-black">
        <label className="block mb-1 font-medium">Reading Status:</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full border rounded p-1 bg-black text-white "
        >
          <option  value="Want to Read">Want to Read</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Read">Read</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block mb-1 font-medium">Rating:</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`text-xl ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookCard;
