// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import BookCard from '../components/BookCard';

interface Book {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
  availability: boolean;
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/books')
      .then((res) => setBooks(res.data.books))
      .catch(() => alert('Failed to load books'))
      .finally(() => setLoading(false));
  }, []);
console.log(books);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📚 All Books</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
