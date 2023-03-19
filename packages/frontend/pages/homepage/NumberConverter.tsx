import { useState } from 'react';
import { ethers } from 'ethers';
import * as web3 from 'web3'
import ConvertToHash from '../../../backend/artifacts-zk/contracts/ConvertToHash.sol/ConvertToHash.json'
import { Contract, Web3Provider, Provider, utils } from "zksync-web3";


const counterAddress = "0xafA08Ee6C287619eCd3969eFEB7b7BFbA6eA8b23";
console.log(ConvertToHash, "Converter ABI: ", ConvertToHash.abi);

export interface ConvertToHashPageProps {
  hashValue: string; 
}

let hashValue: string = '';

export default function ConvertToHashPage(props: ConvertToHashPageProps) {
    const [numToChange, setNumToChange] = useState('');
    const [hashValue, setHashValue] = useState(props.hashValue || '');
    // const [num, setNum] = useState<number>(0)

    async function handleClick() {
      try {
          const provider = new Provider('https://zksync2-testnet.zksync.dev');
          const signer = new Web3Provider((window as any).ethereum).getSigner();
          const contract = new Contract(
              counterAddress,
              ConvertToHash.abi,
              signer
          );
        const hash = await contract.hash(numToChange);
        setHashValue(hash);

        const converter = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(hash));
        console.log(converter)
        
         
      } catch (err) {
        console.error(err);
      }
    }
  
    return (
      <div>
        <input
          type="number"
          value={numToChange}
          onChange={(e) => setNumToChange(e.target.value)}
        />
        <button onClick={handleClick}>Convert to Hash</button>
        <p>Hash value: {hashValue}</p>
      </div>
    );
  }
