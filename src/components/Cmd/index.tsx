import React from 'react';

const Cmd: React.FC<any> = (props) => {

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      // add form -c
      // run e.target.value
    }
  }
  
  return (
    <div>
      {/* cmd history */}
      <input onKeyPress={handleKeyPress} type="text"/>
    </div>
  );
};

export default Cmd;