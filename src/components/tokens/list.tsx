import React, { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Token } from '@/types';
import TokenItem from './item';

interface ListProps {
  filteredTokens: Token[];
  handleTokenSelection: (token: Token) => void;
}

const List: React.FC<ListProps> = ({
  filteredTokens,
  handleTokenSelection,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filteredTokens && filteredTokens.length > 0) {
      setLoading(false);
    }
  }, [filteredTokens]);

  return (
    <div className="mt-2 border-t-2 p-2 h-96 overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        filteredTokens?.map((token, index) => (
          <TokenItem
            index={index}
            key={index}
            token={token}
            handleTokenSelection={handleTokenSelection}
          />
        ))
      )}
    </div>
  );
};

export default List;
