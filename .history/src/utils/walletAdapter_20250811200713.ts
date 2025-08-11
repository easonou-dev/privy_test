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
export class PrivyWalletAdapter implements WalletInfo {
  private wallet: any;
  private publicKey: PublicKey;
  private isGasless: boolean;
  private isPhantom: boolean;

  constructor(privyWallet: any, publicKey: PublicKey, isGasless: boolean = false) {
    this.wallet = privyWallet;
    this.publicKey = publicKey;
    this.isGasless = isGasless;
    // 检查是否为Phantom钱包
    this.isPhantom = privyWallet && privyWallet.isPhantom === true;
    
    console.log('PrivyWalletAdapter 构造函数被调用');
    console.log('钱包对象:', this.wallet);
    console.log('是否为Phantom钱包:', this.isPhantom);
    console.log('是否为Gasless模式:', this.isGasless);
    
    // 如果是Phantom钱包，检查可用方法
    if (this.isPhantom) {
      const methods = Object.getOwnPropertyNames(this.wallet);
      console.log('Phantom钱包可用方法:', methods);
      
      // 检查是否有必要的方法
      if (!this.wallet.signTransaction && !this.wallet.signAllTransactions) {
        console.warn('警告: Phantom钱包缺少标准签名方法，将尝试使用替代方法');
      }
    }
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
    console.log('是否为Phantom钱包:', this.isPhantom);
    
    // 检查钱包对象的可用方法
    const methods = Object.getOwnPropertyNames(this.wallet);
    console.log('钱包可用方法:', methods);
    
    // 如果钱包支持signTransaction方法
    if (this.wallet.signTransaction) {
      console.log('使用钱包原生的signTransaction方法');
      try {
        return await this.wallet.signTransaction(transaction);
      } catch (error) {
        console.error('使用原生signTransaction方法失败:', error);
        // 如果失败，继续尝试其他方法
      }
    }
    
    // 特殊处理Phantom钱包
    if (this.isPhantom) {
      console.log('检测到Phantom钱包，使用特殊处理');
      try {
        return await this.tryPhantomSpecificSigning(transaction);
      } catch (error) {
        console.error('Phantom钱包特殊处理失败:', error);
        throw new Error('Phantom钱包签名失败: ' + error.message);
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
   * 尝试使用Phantom钱包的特殊方法签名交易
   * Phantom钱包可能有不同的API结构
   */
  private async tryPhantomSpecificSigning(transaction: Transaction): Promise<Transaction> {
    console.log('尝试使用Phantom特定方法签名交易');
    
    // 检查是否有connect方法（Phantom钱包通常有这个方法）
    if (this.wallet.connect) {
      try {
        // 确保连接
        await this.wallet.connect();
      } catch (error) {
        console.log('连接Phantom钱包失败，可能已经连接:', error);
        // 忽略错误，继续尝试签名
      }
    }
    
    // 尝试不同的可能方法
    const possibleMethods = [
      // 标准方法
      'signTransaction',
      // 可能的替代方法
      'sign',
      'signMessage',
      'signAndSendTransaction',
      '_signTransaction'
    ];
    
    for (const method of possibleMethods) {
      if (typeof this.wallet[method] === 'function') {
        console.log(`尝试使用Phantom钱包的${method}方法`);
        try {
          // 对于signAndSendTransaction，我们只需要签名部分
          if (method === 'signAndSendTransaction') {
            // 这是一个特殊情况，因为这个方法通常会直接发送交易
            // 我们尝试提取签名后的交易，但这可能不适用于所有钱包
            console.log('警告: 使用signAndSendTransaction可能会直接发送交易');
            const result = await this.wallet[method](transaction, { skipPreflight: true });
            if (result && result.transaction) {
              return result.transaction;
            }
            throw new Error('无法从signAndSendTransaction结果中提取签名后的交易');
          }
          
          // 对于其他方法，直接调用
          return await this.wallet[method](transaction);
        } catch (error) {
          console.error(`使用${method}方法签名失败:`, error);
          // 继续尝试下一个方法
        }
      }
    }
    
    // 如果所有方法都失败，抛出错误
    throw new Error('无法使用任何已知的Phantom钱包方法签名交易');
  }

  /**
   * 签名多个交易
   */
  async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    console.log('PrivyWalletAdapter.signAllTransactions 被调用');
    console.log('钱包对象:', this.wallet);
    console.log('钱包类型:', this.getType());
    console.log('是否为Phantom钱包:', this.isPhantom);
    
    // 检查钱包对象的可用方法
    const methods = Object.getOwnPropertyNames(this.wallet);
    console.log('钱包可用方法:', methods);
    
    // 如果钱包原生支持signAllTransactions方法，则使用它
    if (this.wallet.signAllTransactions) {
      console.log('使用钱包原生的signAllTransactions方法');
      try {
        return await this.wallet.signAllTransactions(transactions);
      } catch (error) {
        console.error('使用原生signAllTransactions方法失败:', error);
        // 如果失败，继续尝试其他方法
      }
    }
    
    // 特殊处理Phantom钱包
    if (this.isPhantom) {
      console.log('检测到Phantom钱包，使用特殊处理');
      try {
        // 逐个签名每个交易，使用特殊的Phantom签名方法
        const signedTransactions: Transaction[] = [];
        for (const transaction of transactions) {
          try {
            const signedTx = await this.tryPhantomSpecificSigning(transaction);
            signedTransactions.push(signedTx);
          } catch (error) {
            console.error('使用Phantom特殊方法签名失败:', error);
            throw error; // 重新抛出错误
          }
        }
        return signedTransactions;
      } catch (error) {
        console.error('Phantom钱包特殊处理失败:', error);
        throw new Error('Phantom钱包签名失败: ' + error.message);
      }
    }
    
    // 尝试使用signTransaction方法逐个签名
    if (this.wallet.signTransaction) {
      console.log('使用钱包的signTransaction方法逐个签名');
      try {
        const signedTransactions: Transaction[] = [];
        for (const transaction of transactions) {
          const signedTx = await this.wallet.signTransaction(transaction);
          signedTransactions.push(signedTx);
        }
        return signedTransactions;
      } catch (error) {
        console.error('使用signTransaction方法逐个签名失败:', error);
        // 如果失败，继续尝试其他方法
      }
    }
    
    // 检查是否有sign方法（一些钱包可能使用不同的命名）
    if (this.wallet.sign) {
      console.log('使用钱包的sign方法');
      try {
        const signedTransactions: Transaction[] = [];
        for (const transaction of transactions) {
          const signedTx = await this.wallet.sign(transaction);
          signedTransactions.push(signedTx);
        }
        return signedTransactions;
      } catch (error) {
        console.error('使用sign方法签名失败:', error);
        // 如果失败，继续尝试其他方法
      }
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