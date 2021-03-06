/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface ISettlementContract
  extends Truffle.Contract<ISettlementInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<ISettlementInstance>;
}

export interface PaymentReceived {
  name: "PaymentReceived";
  args: {
    settlementTransactionId: BN;
    settlementTransactionOperationType: BN;
    0: BN;
    1: BN;
  };
}

export interface PaymentTransferred {
  name: "PaymentTransferred";
  args: {
    settlementTransactionId: BN;
    settlementTransactionOperationType: BN;
    0: BN;
    1: BN;
  };
}

export interface RedemptionInitiated {
  name: "RedemptionInitiated";
  args: {
    settlementTransactionIds: BN[];
    0: BN[];
  };
}

export interface SettlementTransactionCanceled {
  name: "SettlementTransactionCanceled";
  args: {
    settlementTransactionId: BN;
    0: BN;
  };
}

export interface SubscriptionInitiated {
  name: "SubscriptionInitiated";
  args: {
    settlementTransactionId: BN;
    0: BN;
  };
}

export interface TradeInitiated {
  name: "TradeInitiated";
  args: {
    settlementTransactionId: BN;
    0: BN;
  };
}

type AllEvents =
  | PaymentReceived
  | PaymentTransferred
  | RedemptionInitiated
  | SettlementTransactionCanceled
  | SubscriptionInitiated
  | TradeInitiated;

export interface ISettlementInstance extends Truffle.ContractInstance {
  initiateSubscription: {
    (
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  initiateTrade: {
    (
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  initiateRedemption: {
    (
      settlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      settlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      settlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      settlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  cancelSettlementTransaction: {
    (
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      partialSettlementTransaction: {
        txId: number | BN | string;
        operationId: number | BN | string;
        deliverySenderAccountNumber: string;
        deliveryReceiverAccountNumber: string;
        deliveryQuantity: number | BN | string;
        txHash: string;
      },
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  confirmPaymentReceived: {
    (
      settlementTransactionId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      settlementTransactionId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      settlementTransactionId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      settlementTransactionId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  confirmPaymentTransferred: {
    (
      settlementTransactionId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      settlementTransactionId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      settlementTransactionId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      settlementTransactionId: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    initiateSubscription: {
      (
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    initiateTrade: {
      (
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    initiateRedemption: {
      (
        settlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        settlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        settlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        settlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    cancelSettlementTransaction: {
      (
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        partialSettlementTransaction: {
          txId: number | BN | string;
          operationId: number | BN | string;
          deliverySenderAccountNumber: string;
          deliveryReceiverAccountNumber: string;
          deliveryQuantity: number | BN | string;
          txHash: string;
        },
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    confirmPaymentReceived: {
      (
        settlementTransactionId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        settlementTransactionId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        settlementTransactionId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        settlementTransactionId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    confirmPaymentTransferred: {
      (
        settlementTransactionId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        settlementTransactionId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        settlementTransactionId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        settlementTransactionId: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
