import { useState } from 'react';

export const DataGridNode = ({ node, renderHeader, renderChildren }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = node.children !== null && node.children !== undefined;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div onClick={handleToggle}>
        {renderHeader(node.header, isOpen, hasChildren)}
        {hasChildren && (isOpen ? ' ' : ' ')}
      </div>
      {isOpen && hasChildren && (
        <div style={{ marginLeft: 20 }}>{renderChildren(node.children)}</div>
      )}
    </div>
  );
};

export const DataGrid = ({ tree, renderHeader, renderChildren }) => {
  return (
    <DataGridNode
      node={tree}
      renderHeader={renderHeader}
      renderChildren={(children) => (
        <div>
          {children.map((child, index) => (
            <DataGridNode
              key={index}
              node={child}
              renderHeader={renderHeader}
              renderChildren={renderChildren}
            />
          ))}
        </div>
      )}
    />
  );
};
