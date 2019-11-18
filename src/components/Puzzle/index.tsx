import React from 'react';

// 递归去展示
const Puzzle: React.FC<any> = (props) => {
  const { data } = props;

  return (
    <div>
      Puzzle
      {data.children && data.children.map((d: any) => (
        <Puzzle key={d.key} data={d} />
      ))}
    </div>
  );
}

export default Puzzle;