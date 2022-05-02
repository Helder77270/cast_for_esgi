/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface ForgeInstrumentRegistryContract
  extends Truffle.Contract<ForgeInstrumentRegistryInstance> {
  "new"(
    _owner: string,
    meta?: Truffle.TransactionDetails
  ): Promise<ForgeInstrumentRegistryInstance>;
}

export interface InstrumentListed {
  name: "InstrumentListed";
  args: {
    name: string;
    isin: string;
    instrumentAddress: string;
    0: string;
    1: string;
    2: string;
  };
}

export interface InstrumentUnlisted {
  name: "InstrumentUnlisted";
  args: {
    name: string;
    isin: string;
    instrumentAddress: string;
    0: string;
    1: string;
    2: string;
  };
}

type AllEvents = InstrumentListed | InstrumentUnlisted;

export interface ForgeInstrumentRegistryInstance
  extends Truffle.ContractInstance {
  factories(
    arg0: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getAllFactoryTypes(txDetails?: Truffle.TransactionDetails): Promise<string[]>;

  getFactory(
    factoryType: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  authorizeFactory: {
    (
      factoryType: string,
      factoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      factoryType: string,
      factoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      factoryType: string,
      factoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      factoryType: string,
      factoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  unAuthorizeFactory: {
    (factoryAddress: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      factoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      factoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      factoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  isFactoryAuthorized(
    factoryAddress: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  listInstrument: {
    (
      name: string,
      isinCode: string,
      instrumentAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      name: string,
      isinCode: string,
      instrumentAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      name: string,
      isinCode: string,
      instrumentAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      name: string,
      isinCode: string,
      instrumentAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  unListInstrument: {
    (isin: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(isin: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      isin: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      isin: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getInstrumentByName(
    name: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getInstrumentByIsinCode(
    isinCode: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  getAllInstruments(txDetails?: Truffle.TransactionDetails): Promise<string[]>;

  methods: {
    factories(
      arg0: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getAllFactoryTypes(
      txDetails?: Truffle.TransactionDetails
    ): Promise<string[]>;

    getFactory(
      factoryType: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    authorizeFactory: {
      (
        factoryType: string,
        factoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        factoryType: string,
        factoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        factoryType: string,
        factoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        factoryType: string,
        factoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    unAuthorizeFactory: {
      (factoryAddress: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        factoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        factoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        factoryAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    isFactoryAuthorized(
      factoryAddress: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    listInstrument: {
      (
        name: string,
        isinCode: string,
        instrumentAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        name: string,
        isinCode: string,
        instrumentAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        name: string,
        isinCode: string,
        instrumentAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        name: string,
        isinCode: string,
        instrumentAddress: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    unListInstrument: {
      (isin: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(isin: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(
        isin: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        isin: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getInstrumentByName(
      name: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getInstrumentByIsinCode(
      isinCode: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    getAllInstruments(
      txDetails?: Truffle.TransactionDetails
    ): Promise<string[]>;
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
