import * as CryptoJS from "crypto-js";

class Block {

    // static을 선언하면 클래스 선언 없이 메소드 사용 가능
    static calculateBlockHash = (
        index:number, 
        previousHash:string, 
        data:string, 
        timestamp:number)
    : string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock: Block): boolean => 
    typeof aBlock.index === "number" && 
    typeof aBlock.hash === "string" && 
    typeof aBlock.previousHash === "string" && 
    typeof aBlock.timestamp === "number" && 
    typeof aBlock.data === "string" 


    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;


    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, '202020202020', '', 'hello', 123456);

console.log(Block.calculateBlockHash(0, '', 'hello', 123456));

let blockChain: [Block] = [genesisBlock]; // Block만 들어오게 체크!

const getBlockChain = (): Block[] => blockChain;
const getLatestBlock = (): Block => blockChain[blockChain.length -1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string): Block => {

    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimestamp);

    const newBlock: Block = new Block(
        newIndex, 
        newHash, 
        previousBlock.hash, 
        data,
        newTimestamp
    );
    
    addBlock(newBlock);

    return newBlock;
};


const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp);


const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if(!Block.validateStructure(candidateBlock)) {
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if(getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
}


const addBlock = (candidateBlock: Block): void => {
    if(isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(getBlockChain());

export {};