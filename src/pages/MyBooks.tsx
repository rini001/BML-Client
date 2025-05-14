// src/pages/MyBooks.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import MyBookCard from '../components/MyBookCard';

interface MyBook {
  _id: string;
  bookId: {
    _id: string;
    title: string;
    author: string;
    coverImage: string;
  };
  status: string;
  rating: number;
}

const MyBooks = () => {
  const [myBooks, setMyBooks] = useState<MyBook[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBooks = async () => {
    try {
      const res = await axios.get('/api/mybooks');
      setMyBooks(res.data.myBooks);
    } catch {
      alert('Failed to fetch your books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📖 My Books</h2>
      {loading ? (
        <p>Loading your books...</p>
      ) : myBooks.length === 0 ? (
        <p>You haven't added any books yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myBooks.map((book) => (
            <MyBookCard key={book._id} book={book} refresh={fetchMyBooks} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
