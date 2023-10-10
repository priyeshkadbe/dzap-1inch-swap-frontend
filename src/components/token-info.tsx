import { Token } from "@/types";

interface TokenInfoProps {
  token: Token | null;
  amount: number;
  price: number;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ token, amount, price }) => {
  return (
    <div className="flex justify-between">
      {token && (
        <h4 className="text-sm text-gray-500 capitalize">{token.name}</h4>
      )}
      <h4 className="text-sm text-gray-500 capitalize">~{amount * price}</h4>
    </div>
  );
};
export default TokenInfo