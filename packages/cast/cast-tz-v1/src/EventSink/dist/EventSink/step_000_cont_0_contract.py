import smartpy as sp

class Contract(sp.Contract):
  def __init__(self):
    self.init_type(sp.TUnit)
    self.init()

  @sp.entry_point
  def InstrumentListed(self, params):
    sp.set_type(params, sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))))

  @sp.entry_point
  def InstrumentUnlisted(self, params):
    sp.set_type(params, sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))))

  @sp.entry_point
  def PaymentReceived(self, params):
    sp.set_type(params, sp.TRecord(settlementId = sp.TNat, settlementTransactionOperationType = sp.TNat).layout(("settlementId", "settlementTransactionOperationType")))

  @sp.entry_point
  def PaymentTransferred(self, params):
    sp.set_type(params, sp.TRecord(settlementId = sp.TNat, settlementTransactionOperationType = sp.TNat).layout(("settlementId", "settlementTransactionOperationType")))

  @sp.entry_point
  def SubscriptionInitiated(self, params):
    sp.set_type(params, sp.TRecord(settlementId = sp.TNat).layout("settlementId"))

  @sp.entry_point
  def Transfer(self, params):
    sp.set_type(params, sp.TRecord(_from = sp.TAddress, _to = sp.TAddress, _value = sp.TNat).layout(("_from", ("_to", "_value"))))

  @sp.entry_point
  def forgeBondCreated(self, params):
    sp.set_type(params, sp.TRecord(owner = sp.TAddress, registrar = sp.TAddress, settler = sp.TAddress, tokenAddress = sp.TAddress, tokenMetadata = sp.TRecord(initialSupply = sp.TNat, isinCode = sp.TString, name = sp.TString, symbol = sp.TString).layout((("initialSupply", "isinCode"), ("name", "symbol")))).layout((("owner", "registrar"), ("settler", ("tokenAddress", "tokenMetadata")))))

  @sp.entry_point
  def forgeStructuredProductCreated(self, params):
    sp.set_type(params, sp.TRecord(owner = sp.TAddress, registrar = sp.TAddress, settler = sp.TAddress, tokenAddress = sp.TAddress, tokenMetadata = sp.TRecord(initialSupply = sp.TNat, isinCode = sp.TString, name = sp.TString, symbol = sp.TString).layout((("initialSupply", "isinCode"), ("name", "symbol")))).layout((("owner", "registrar"), ("settler", ("tokenAddress", "tokenMetadata")))))

  @sp.entry_point
  def newOperator(self, params):
    sp.set_type(params, sp.TRecord(by = sp.TAddress, operator = sp.TAddress, operatorRole = sp.TNat).layout(("by", ("operator", "operatorRole"))))

  @sp.entry_point
  def revokeOperator(self, params):
    sp.set_type(params, sp.TRecord(by = sp.TAddress, operator = sp.TAddress, operatorRole = sp.TNat).layout(("by", ("operator", "operatorRole"))))

sp.add_compilation_target("test", Contract())