import styles from "./table.module.css";

const render = {
  columns: (columns) => {
    return (
      <div className={styles.columnRow}>
        {columns.map((col, colIndex) => (
          <div key={colIndex} className={styles.column} style={{ flex: col.size || 1 }}>
            <strong>{col.title}</strong>
          </div>
        ))}
      </div>
    );
  },

  data: (columns, data) => {
    return (
      <>
        {data.map((item, itemIndex) => (
          <div key={itemIndex} className={styles.dataRow}>
            {columns.map((col, colIndex) => (
              <div key={colIndex} className={styles.column} style={{ flex: col.size || 1 }}>
                {item[col.dataIndex]}
              </div>
            ))}
          </div>
        ))}
      </>
    );
  },
};

export const Table = ({ columns, dataSource: data }) => {
  return (
    <>
      {render.columns(columns)}
      {render.data(columns, data)}
    </>
  );
};
