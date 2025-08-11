import { PublicKey, Transaction } from '@solana/web3.js';

// 由于我们无法直接访问solconsdk的类型定义，我们需要自己定义WalletInfo接口
interface WalletInfo {
  getPublicKey(): PublicKey;
  signTransaction(transaction: Transaction): Promise<Transaction>;
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
  getType(): string;
}

/**
 * 自定义的Privy钱包适配器，用于解决signAllTransactions方法不存在的问题
 */
export class PrivyWalletAdapter {
  private wallet: any;
  private publicKey: PublicKey;
  private isGasless: boolean;

  constructor(privyWallet: any, publicKey: PublicKey, isGasless: boolean = false) {
    this.wallet = privyWallet;
    this.publicKey = publicKey;
    this.isGasless = isGasless;
  }

  /**
   * 获取钱包公钥
   */
  getPublicKey(): PublicKey {
    return this.publicKey;
  }

  /**
   * 签名单个交易
   */
  async signTransaction(transaction: Transaction): Promise<Transaction> {
    if (!this.wallet.signTransaction) {
      throw new Error('钱包不支持signTransaction方法');
    }
    return await this.wallet.signTransaction(transaction);
  }

  /**
   * 签名多个交易
   */
  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    // 如果钱包原生支持signAllTransactions方法，则使用它
    if (this.wallet.signAllTransactions) {
      return await this.wallet.signAllTransactions(transactions);
    }
    
    // 否则，使用signTransaction方法逐个签名
    if (!this.wallet.signTransaction) {
      throw new Error('钱包不支持signTransaction方法');
    }
    
    // 逐个签名每个交易
    const signedTransactions: Transaction[] = [];
    for (const transaction of transactions) {
      const signedTx = await this.wallet.signTransaction(transaction);
      signedTransactions.push(signedTx);
    }
    
    return signedTransactions;
  }

  /**
   * 获取钱包类型
   */
  getType(): string {
    return this.isGasless ? 'privy-gasless' : 'privy';
  }
}