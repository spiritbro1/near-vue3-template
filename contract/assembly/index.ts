
import { u128,ContractPromise } from "near-sdk-as";

export function grant_minter(account_id:string):void{


  let nftArgs:Minter = {account_id};
  let promise = ContractPromise.create(
    "storespiritbro.mintspace2.testnet", // your store name
    "grant_minter", // contract method name
    nftArgs.encode(), // serialized contract method arguments encoded as Uint8Array
    20e12,
    u128.fromString("1")
  );
  promise.returnAsResult()
 
}
@nearBindgen
class Minter{
  account_id:string;
}