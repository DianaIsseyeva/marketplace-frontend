import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import type { ProductType } from '../../types/Product-type';

const SellerPage = () => {
  const user = useSelector((state: RootState) => state.users.user);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [form, setForm] = useState({
    title: '',
    price: '',
    image: null as File | null,
  });

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get('/products/my-products', {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setProducts(res.data);
    } catch (error) {
      console.error('Ошибка при получении товаров', error);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchMyProducts();
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setForm(prev => ({ ...prev, image: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddProduct = async () => {
    if (!form.title || !form.price || !form.image) {
      alert('Заполните все поля');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('price', form.price);
    formData.append('image', form.image);

    try {
      await axios.post('/products', formData, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setForm({ title: '', price: '', image: null });
      fetchMyProducts();
    } catch (error) {
      console.error('Ошибка при создании товара', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Мои товары</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            {p.title} — ${p.price}
            <img
              src={p.image ? `http://localhost:8000/uploads/${p.image}` : '/placeholder.png'}
              alt={p.title}
              style={{ width: 100 }}
            />
          </li>
        ))}
      </ul>

      <h3>Создать товар</h3>
      <input name='title' placeholder='Название' value={form.title} onChange={handleInputChange} />
      <input
        name='price'
        type='number'
        placeholder='Цена'
        value={form.price}
        onChange={handleInputChange}
      />
      <input type='file' name='image' accept='image/*' onChange={handleInputChange} />
      <button onClick={handleAddProduct}>Добавить</button>
    </div>
  );
};

export default SellerPage;
