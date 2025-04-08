import { DataGrid, DataGridNode } from './components/DataGrid';

function App() {
  const data = {
    header: 'Корень',
    children: [
      { header: 'Лист 1' },
      {
        header: 'Ветка 1',
        children: [{ header: 'Лист 2.1' }, { header: 'Лист 2.2' }],
      },
      {
        header: 'Ветка 2',
        children: [{ header: 'Лист 3.1' }, { header: 'Лист 3.2' }],
      },
    ],
  };

  const renderHeader = (header) => <strong>{header}</strong>;

  const renderChildren = (children) => {
    return (
      <div className>
        {children.map((child, index) => (
          <DataGridNode
            key={index}
            node={child}
            renderHeader={renderHeader}
            renderChildren={renderChildren}
          />
        ))}
      </div>
    );
  };

  return <DataGrid tree={data} renderHeader={renderHeader} renderChildren={renderChildren} />;
}

export default App;
