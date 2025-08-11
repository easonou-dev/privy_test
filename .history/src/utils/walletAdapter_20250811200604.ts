import { PublicKey, Transaction } from '@solana/web3.js';

// 由于我们无法直接访问solconsdk的类型定义，我们需要自己定义WalletInfo接口
export interface WalletInfo {
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
    console.log('PrivyWalletAdapter.signTransaction 被调用');
    console.log('钱包对象:', this.wallet);
    console.log('钱包类型:', this.getType());
    
    // 检查钱包对象的可用方法
    const methods = Object.getOwnPropertyNames(this.wallet);
    console.log('钱包可用方法:', methods);
    
    // 如果钱包支持signTransaction方法
    if (this.wallet.signTransaction) {
      console.log('使用钱包原生的signTransaction方法');
      return await this.wallet.signTransaction(transaction);
    }
    
    // 检查是否为Phantom钱包
    if (this.wallet.isPhantom) {
      console.log('检测到Phantom钱包');
      // Phantom钱包可能有不同的签名方法
      if (this.wallet.signAndSendTransaction) {
        console.log('Phantom钱包只支持signAndSendTransaction方法，无法单独签名');
        throw new Error('Phantom钱包不支持单独签名交易，请使用其他钱包');
      }
    }
    
    // 检查是否有sign方法（一些钱包可能使用不同的命名）
    if (this.wallet.sign) {
      console.log('使用钱包的sign方法');
      try {
        return await this.wallet.sign(transaction);
      } catch (error) {
        console.error('使用sign方法签名失败:', error);
        throw new Error('使用sign方法签名失败: ' + error.message);
      }
    }
    
    // 如果没有找到任何可用的签名方法
    console.error('钱包不支持任何已知的签名方法');
    throw new Error('钱包不支持任何已知的签名方法，请使用支持signTransaction的钱包');
  }

  /**
   * 签名多个交易
   */
  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    console.log('PrivyWalletAdapter.signAllTransactions 被调用');
    console.log('钱包对象:', this.wallet);
    console.log('钱包类型:', this.getType());
    
    // 检查钱包对象的可用方法
    const methods = Object.getOwnPropertyNames(this.wallet);
    console.log('钱包可用方法:', methods);
    
    // 如果钱包原生支持signAllTransactions方法，则使用它
    if (this.wallet.signAllTransactions) {
      console.log('使用钱包原生的signAllTransactions方法');
      return await this.wallet.signAllTransactions(transactions);
    }
    
    // 检查是否为Phantom钱包
    if (this.wallet.isPhantom) {
      console.log('检测到Phantom钱包，使用特殊处理');
      // Phantom钱包可能有不同的签名方法
      if (this.wallet.signTransaction) {
        console.log('使用Phantom钱包的signTransaction方法');
        // 逐个签名每个交易
        const signedTransactions: Transaction[] = [];
        for (const transaction of transactions) {
          const signedTx = await this.wallet.signTransaction(transaction);
          signedTransactions.push(signedTx);
        }
        return signedTransactions;
      } else if (this.wallet.signAndSendTransaction) {
        console.log('Phantom钱包只支持signAndSendTransaction方法，无法单独签名');
        throw new Error('Phantom钱包不支持单独签名交易，请使用其他钱包');
      }
    }
    
    // 检查是否有sign方法（一些钱包可能使用不同的命名）
    if (this.wallet.sign) {
      console.log('使用钱包的sign方法');
      // 尝试使用sign方法
      const signedTransactions: Transaction[] = [];
      for (const transaction of transactions) {
        try {
          const signedTx = await this.wallet.sign(transaction);
          signedTransactions.push(signedTx);
        } catch (error) {
          console.error('使用sign方法签名失败:', error);
          throw new Error('使用sign方法签名失败: ' + error.message);
        }
      }
      return signedTransactions;
    }
    
    // 如果没有找到任何可用的签名方法
    console.error('钱包不支持任何已知的签名方法');
    throw new Error('钱包不支持任何已知的签名方法，请使用支持signTransaction或signAllTransactions的钱包');
  }

  /**
   * 获取钱包类型
   */
  getType(): string {
    return this.isGasless ? 'privy-gasless' : 'privy';
  }
}