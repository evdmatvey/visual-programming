import React, { useState, useEffect } from 'react';
import './App.css'; // подключаем стили

function App() {
  const [logs, setLogs] = useState([]);
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  const fetchLogs = () => {
    const params = new URLSearchParams();
    if (level) params.append('level', level);
    if (category) params.append('category', category);
    if (search) params.append('search', search);

    fetch(`http://localhost:5241/logs?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setLogs(data));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Логи приложения</h1>
      <div className="filters">
        <label className="label">
          Уровень:
          <select className="select" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">Все</option>
            <option value="Trace">Trace</option>
            <option value="Debug">Debug</option>
            <option value="Information">Information</option>
            <option value="Warning">Warning</option>
            <option value="Error">Error</option>
            <option value="Critical">Critical</option>
          </select>
        </label>

        <label className="label">
          Категория:
          <input
            className="input"
            type="text"
            placeholder="Введите категорию"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label className="label">
          Поиск:
          <input
            className="input"
            type="text"
            placeholder="Введите текст для поиска"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <button className="button" onClick={fetchLogs}>
          Поиск
        </button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Время</th>
              <th>Уровень</th>
              <th>Категория</th>
              <th>Сообщение</th>
              <th>Исключение</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  Нет логов для отображения
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className={
                    log.logLevel === 'Error' || log.logLevel === 'Critical' ? 'error-row' : ''
                  }
                  title={log.exception ? `Исключение: ${log.exception}` : ''}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{log.logLevel}</td>
                  <td>{log.category}</td>
                  <td>{log.message}</td>
                  <td>
                    {log.exception ? (
                      <details>
                        <summary>Показать</summary>
                        <pre>{log.exception}</pre>
                      </details>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
