import smartpy as sp

class Contract(sp.Contract):
  def __init__(self):
    self.init_type(sp.TRecord(administrator = sp.TAddress, bytesScripts = sp.TBigMap(sp.TBytes, sp.TBytes)).layout(("administrator", "bytesScripts")))
    self.init(administrator = sp.address('tz1@ADMIN@'),
              bytesScripts = {})

  @sp.entry_point
  def buildCreateAndPlay(self):
    def f_x0(_x0):
      sp.set_type(_x0, sp.TRecord(balances = sp.TMap(sp.TAddress, sp.TRecord(balance = sp.TNat, locked = sp.TNat).layout(("balance", "locked"))), newSettlementTransaction = sp.TRecord(deliveryQuantity = sp.TNat, deliveryReceiverAccountNumber = sp.TAddress, deliverySenderAccountNumber = sp.TAddress, operationId = sp.TNat, txHash = sp.TString, txId = sp.TNat).layout((("deliveryQuantity", ("deliveryReceiverAccountNumber", "deliverySenderAccountNumber")), ("operationId", ("txHash", "txId")))), operatorsAuthorizations = sp.TMap(sp.TAddress, sp.TSet(sp.TNat)), sender = sp.TAddress, settlementTransactionRepository = sp.TRecord(operationTypeByOperationId = sp.TMap(sp.TNat, sp.TNat), settlementTransactionById = sp.TMap(sp.TNat, sp.TRecord(deliveryQuantity = sp.TNat, deliveryReceiverAccountNumber = sp.TAddress, deliverySenderAccountNumber = sp.TAddress, operationId = sp.TNat, status = sp.TNat, txHash = sp.TString, txId = sp.TNat).layout((("deliveryQuantity", ("deliveryReceiverAccountNumber", "deliverySenderAccountNumber")), (("operationId", "status"), ("txHash", "txId")))))).layout(("operationTypeByOperationId", "settlementTransactionById"))).layout((("balances", "newSettlementTransaction"), ("operatorsAuthorizations", ("sender", "settlementTransactionRepository")))))
      sp.verify(_x0.operatorsAuthorizations.contains(_x0.sender), 'undefined operator')
      sp.if 1 == 1:
        sp.verify(_x0.operatorsAuthorizations[_x0.sender].contains(1), 'only operator with registrar role can lock token')
      sp.if 1 == 2:
        sp.verify(_x0.operatorsAuthorizations[_x0.sender].contains(2), 'only operator with settler role can settle token')
      settlementRepositoryTransaction = sp.local("settlementRepositoryTransaction", _x0.settlementTransactionRepository)
      balances = sp.local("balances", _x0.balances)
      sp.verify(balances.value.contains(_x0.newSettlementTransaction.deliverySenderAccountNumber), 'Attempt to lock empty balances')
      sp.verify((balances.value[_x0.newSettlementTransaction.deliverySenderAccountNumber].balance - balances.value[_x0.newSettlementTransaction.deliverySenderAccountNumber].locked) >= sp.to_int(_x0.newSettlementTransaction.deliveryQuantity), 'Can not lock value : insufficient disposable balance')
      balancesInLock = sp.local("balancesInLock", balances.value)
      balancesInLock.value[_x0.newSettlementTransaction.deliverySenderAccountNumber].locked = balances.value[_x0.newSettlementTransaction.deliverySenderAccountNumber].locked + _x0.newSettlementTransaction.deliveryQuantity
      settlementRepositoryTransaction.value.settlementTransactionById[_x0.newSettlementTransaction.txId] = sp.record(deliveryQuantity = _x0.newSettlementTransaction.deliveryQuantity, deliveryReceiverAccountNumber = _x0.newSettlementTransaction.deliveryReceiverAccountNumber, deliverySenderAccountNumber = _x0.newSettlementTransaction.deliverySenderAccountNumber, operationId = _x0.newSettlementTransaction.operationId, status = 2, txHash = _x0.newSettlementTransaction.txHash, txId = _x0.newSettlementTransaction.txId)
      settlementRepositoryTransaction.value.operationTypeByOperationId[_x0.newSettlementTransaction.operationId] = 1
      sp.set_type(sp.record(newBalances = balancesInLock.value, newSettlementRepository = settlementRepositoryTransaction.value), sp.TRecord(newBalances = sp.TMap(sp.TAddress, sp.TRecord(balance = sp.TNat, locked = sp.TNat).layout(("balance", "locked"))), newSettlementRepository = sp.TRecord(operationTypeByOperationId = sp.TMap(sp.TNat, sp.TNat), settlementTransactionById = sp.TMap(sp.TNat, sp.TRecord(deliveryQuantity = sp.TNat, deliveryReceiverAccountNumber = sp.TAddress, deliverySenderAccountNumber = sp.TAddress, operationId = sp.TNat, status = sp.TNat, txHash = sp.TString, txId = sp.TNat).layout((("deliveryQuantity", ("deliveryReceiverAccountNumber", "deliverySenderAccountNumber")), (("operationId", "status"), ("txHash", "txId")))))).layout(("operationTypeByOperationId", "settlementTransactionById"))).layout(("newBalances", "newSettlementRepository")))
      sp.result(sp.record(newBalances = balancesInLock.value, newSettlementRepository = settlementRepositoryTransaction.value))
    self.data.bytesScripts[sp.pack('callInitiateSubscription')] = sp.pack(sp.some(sp.build_lambda(f_x0)).open_some())
    def f_x1(_x1):
      sp.set_type(_x1, sp.TRecord(balances = sp.TMap(sp.TAddress, sp.TRecord(balance = sp.TNat, locked = sp.TNat).layout(("balance", "locked"))), operatorsAuthorizations = sp.TMap(sp.TAddress, sp.TSet(sp.TNat)), owner = sp.TAddress, sender = sp.TAddress, settlementTransactionRepository = sp.TRecord(operationTypeByOperationId = sp.TMap(sp.TNat, sp.TNat), settlementTransactionById = sp.TMap(sp.TNat, sp.TRecord(deliveryQuantity = sp.TNat, deliveryReceiverAccountNumber = sp.TAddress, deliverySenderAccountNumber = sp.TAddress, operationId = sp.TNat, status = sp.TNat, txHash = sp.TString, txId = sp.TNat).layout((("deliveryQuantity", ("deliveryReceiverAccountNumber", "deliverySenderAccountNumber")), (("operationId", "status"), ("txHash", "txId")))))).layout(("operationTypeByOperationId", "settlementTransactionById")), txId = sp.TNat).layout((("balances", ("operatorsAuthorizations", "owner")), ("sender", ("settlementTransactionRepository", "txId")))))
      sp.verify(_x1.operatorsAuthorizations.contains(_x1.sender), 'undefined operator')
      sp.if 2 == 1:
        sp.verify(_x1.operatorsAuthorizations[_x1.sender].contains(1), 'only operator with registrar role can lock token')
      sp.if 2 == 2:
        sp.verify(_x1.operatorsAuthorizations[_x1.sender].contains(2), 'only operator with settler role can settle token')
      settlementTransactionRepository = sp.local("settlementTransactionRepository", _x1.settlementTransactionRepository)
      balances = sp.local("balances", _x1.balances)
      sp.if ~ (balances.value.contains(settlementTransactionRepository.value.settlementTransactionById[_x1.txId].deliveryReceiverAccountNumber)):
        balances.value[settlementTransactionRepository.value.settlementTransactionById[_x1.txId].deliveryReceiverAccountNumber] = sp.record(balance = 0, locked = 0)
      balances.value[settlementTransactionRepository.value.settlementTransactionById[_x1.txId].deliveryReceiverAccountNumber].balance += settlementTransactionRepository.value.settlementTransactionById[_x1.txId].deliveryQuantity
      balances.value[_x1.owner].balance = sp.as_nat(balances.value[_x1.owner].balance - settlementTransactionRepository.value.settlementTransactionById[_x1.txId].deliveryQuantity)
      balances.value[_x1.owner].locked = sp.as_nat(balances.value[_x1.owner].locked - settlementTransactionRepository.value.settlementTransactionById[_x1.txId].deliveryQuantity)
      settlementTransactionRepository.value.settlementTransactionById[_x1.txId].status = 3
      sp.set_type(sp.record(newBalances = balances.value, newSettlementTransactionRepository = settlementTransactionRepository.value), sp.TRecord(newBalances = sp.TMap(sp.TAddress, sp.TRecord(balance = sp.TNat, locked = sp.TNat).layout(("balance", "locked"))), newSettlementTransactionRepository = sp.TRecord(operationTypeByOperationId = sp.TMap(sp.TNat, sp.TNat), settlementTransactionById = sp.TMap(sp.TNat, sp.TRecord(deliveryQuantity = sp.TNat, deliveryReceiverAccountNumber = sp.TAddress, deliverySenderAccountNumber = sp.TAddress, operationId = sp.TNat, status = sp.TNat, txHash = sp.TString, txId = sp.TNat).layout((("deliveryQuantity", ("deliveryReceiverAccountNumber", "deliverySenderAccountNumber")), (("operationId", "status"), ("txHash", "txId")))))).layout(("operationTypeByOperationId", "settlementTransactionById"))).layout(("newBalances", "newSettlementTransactionRepository")))
      sp.result(sp.record(newBalances = balances.value, newSettlementTransactionRepository = settlementTransactionRepository.value))
    self.data.bytesScripts[sp.pack('callConfirmPaymentReceived')] = sp.pack(sp.some(sp.build_lambda(f_x1)).open_some())
    def f_x2(_x2):
      sp.set_type(_x2, sp.TRecord(operatorsAuthorizations = sp.TMap(sp.TAddress, sp.TSet(sp.TNat)), owner = sp.TAddress, sender = sp.TAddress, settlementTransactionRepository = sp.TRecord(operationTypeByOperationId = sp.TMap(sp.TNat, sp.TNat), settlementTransactionById = sp.TMap(sp.TNat, sp.TRecord(deliveryQuantity = sp.TNat, deliveryReceiverAccountNumber = sp.TAddress, deliverySenderAccountNumber = sp.TAddress, operationId = sp.TNat, status = sp.TNat, txHash = sp.TString, txId = sp.TNat).layout((("deliveryQuantity", ("deliveryReceiverAccountNumber", "deliverySenderAccountNumber")), (("operationId", "status"), ("txHash", "txId")))))).layout(("operationTypeByOperationId", "settlementTransactionById")), txId = sp.TNat).layout((("operatorsAuthorizations", "owner"), ("sender", ("settlementTransactionRepository", "txId")))))
      sp.verify(_x2.operatorsAuthorizations.contains(_x2.sender), 'undefined operator')
      sp.if 2 == 1:
        sp.verify(_x2.operatorsAuthorizations[_x2.sender].contains(1), 'only operator with registrar role can lock token')
      sp.if 2 == 2:
        sp.verify(_x2.operatorsAuthorizations[_x2.sender].contains(2), 'only operator with settler role can settle token')
      settlementTransactionRepository = sp.local("settlementTransactionRepository", _x2.settlementTransactionRepository)
      sp.if 3 == 2:
        sp.verify(settlementTransactionRepository.value.settlementTransactionById[_x2.txId].status == 2, 'subscription ticket not locked')
      sp.if 3 == 3:
        sp.verify(settlementTransactionRepository.value.settlementTransactionById[_x2.txId].status == 3, 'Cash Not received')
      settlementTransactionRepository.value.settlementTransactionById[_x2.txId].status = 4
      sp.set_type(settlementTransactionRepository.value, sp.TRecord(operationTypeByOperationId = sp.TMap(sp.TNat, sp.TNat), settlementTransactionById = sp.TMap(sp.TNat, sp.TRecord(deliveryQuantity = sp.TNat, deliveryReceiverAccountNumber = sp.TAddress, deliverySenderAccountNumber = sp.TAddress, operationId = sp.TNat, status = sp.TNat, txHash = sp.TString, txId = sp.TNat).layout((("deliveryQuantity", ("deliveryReceiverAccountNumber", "deliverySenderAccountNumber")), (("operationId", "status"), ("txHash", "txId")))))).layout(("operationTypeByOperationId", "settlementTransactionById")))
      sp.result(settlementTransactionRepository.value)
    self.data.bytesScripts[sp.pack('callConfirmPaymentTransferred')] = sp.pack(sp.some(sp.build_lambda(f_x2)).open_some())
    def f_x3(_x3):
      sp.set_type(_x3, sp.TRecord(_operator = sp.TAddress, _operatorRole = sp.TNat, _operatorsAuthorizations = sp.TMap(sp.TAddress, sp.TSet(sp.TNat)), _owner = sp.TAddress, _sender = sp.TAddress).layout((("_operator", "_operatorRole"), ("_operatorsAuthorizations", ("_owner", "_sender")))))
      sp.verify(_x3._operatorsAuthorizations.contains(_x3._sender), 'undefined operator')
      sp.if 1 == 1:
        sp.verify(_x3._operatorsAuthorizations[_x3._sender].contains(1), 'only operator with registrar role can lock token')
      sp.if 1 == 2:
        sp.verify(_x3._operatorsAuthorizations[_x3._sender].contains(2), 'only operator with settler role can settle token')
      operatorsAuthorizations = sp.local("operatorsAuthorizations", _x3._operatorsAuthorizations)
      sp.if ~ (operatorsAuthorizations.value.contains(_x3._operator)):
        operatorsAuthorizations.value[_x3._operator] = sp.set_type_expr(sp.set([]), sp.TSet(sp.TNat))
      sp.verify(operatorsAuthorizations.value[_x3._operator].contains(_x3._operatorRole), 'already authorized')
      operatorsAuthorizations.value[_x3._operator].add(_x3._operatorRole)
      sp.set_type(operatorsAuthorizations.value, sp.TMap(sp.TAddress, sp.TSet(sp.TNat)))
      sp.result(operatorsAuthorizations.value)
    self.data.bytesScripts[sp.pack('callAuthorizeOperator')] = sp.pack(sp.some(sp.build_lambda(f_x3)).open_some())
    def f_x4(_x4):
      sp.set_type(_x4, sp.TRecord(_operator = sp.TAddress, _operatorRole = sp.TNat, _operatorsAuthorizations = sp.TMap(sp.TAddress, sp.TSet(sp.TNat)), _owner = sp.TAddress, _sender = sp.TAddress).layout((("_operator", "_operatorRole"), ("_operatorsAuthorizations", ("_owner", "_sender")))))
      sp.verify(_x4._operatorsAuthorizations.contains(_x4._sender), 'undefined operator')
      sp.if 1 == 1:
        sp.verify(_x4._operatorsAuthorizations[_x4._sender].contains(1), 'only operator with registrar role can lock token')
      sp.if 1 == 2:
        sp.verify(_x4._operatorsAuthorizations[_x4._sender].contains(2), 'only operator with settler role can settle token')
      operatorsAuthorizations = sp.local("operatorsAuthorizations", _x4._operatorsAuthorizations)
      sp.verify(operatorsAuthorizations.value.contains(_x4._operator), 'undefined operator')
      sp.verify(operatorsAuthorizations.value[_x4._operator].contains(_x4._operatorRole), 'undefined operator role')
      operatorsAuthorizations.value[_x4._operator].remove(_x4._operatorRole)
      sp.set_type(operatorsAuthorizations.value, sp.TMap(sp.TAddress, sp.TSet(sp.TNat)))
      sp.result(operatorsAuthorizations.value)
    self.data.bytesScripts[sp.pack('callRevokeOperatorAuthorization')] = sp.pack(sp.some(sp.build_lambda(f_x4)).open_some())

  @sp.entry_point
  def sendCreateAndPlay(self, params):
    sp.transfer({sp.pack('callInitiateSubscription') : self.data.bytesScripts[sp.pack('callInitiateSubscription')], sp.pack('callConfirmPaymentReceived') : self.data.bytesScripts[sp.pack('callConfirmPaymentReceived')], sp.pack('callConfirmPaymentTransferred') : self.data.bytesScripts[sp.pack('callConfirmPaymentTransferred')], sp.pack('callAuthorizeOperator') : self.data.bytesScripts[sp.pack('callAuthorizeOperator')], sp.pack('callRevokeOperatorAuthorization') : self.data.bytesScripts[sp.pack('callRevokeOperatorAuthorization')]}, sp.tez(0), sp.contract(sp.TMap(sp.TBytes, sp.TBytes), params, entry_point='upgrade').open_some())

sp.add_compilation_target("test", Contract())