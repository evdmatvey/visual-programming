import { DataGrid, DataGridNode } from './components/DataGrid';

function App() {
  const data = {
    header: 'Корень',
    children: [
      { header: 'Лист 1' },
      {
        header: 'Ветка 1',
        children: [
          { header: 'Ветка 2.1', children: [{ header: 'Лист 2.1.1' }] },
          { header: 'Лист 2.2' },
        ],
      },
      {
        header: 'Ветка 2',
        children: [
          { header: 'Ветка 3.1', children: [{ header: 'Лист 3.1.1' }, { header: 'Лист 3.1.2' }] },
          { header: 'Ветка 3.2', children: [{ header: 'Лист 3.2.1' }, { header: 'Лист 3.2.2' }] },
        ],
      },
    ],
  };

  const data2 = {
    header: 'Корень 2',
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

  const data3 = {
    header: 'Корень 3',
    children: [
      { header: 'Лист 1' },
      {
        header: 'Лист 1',
      },
      {
        header: 'Лист 2',
      },
    ],
  };

  const renderHeader = (header, isOpen, hasChildren) => (
    <div className="root">
      {hasChildren ? <>{isOpen ? 'ᨈ' : 'ᨆ'}</> : ''} {header}
    </div>
  );

  const renderChildren = (children) => {
    return (
      <div className="child">
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
