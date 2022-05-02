import smartpy as sp

class Contract(sp.Contract):
  def __init__(self):
    self.init_type(sp.TRecord(eventSinkContractAddress = sp.TAddress, factories = sp.TMap(sp.TString, sp.TAddress), registrarAddress = sp.TAddress, tokensByIsinCode = sp.TMap(sp.TString, sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name")))), tokensByName = sp.TMap(sp.TString, sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))))).layout((("eventSinkContractAddress", "factories"), ("registrarAddress", ("tokensByIsinCode", "tokensByName")))))
    self.init(eventSinkContractAddress = sp.address('tz1@SINK@'),
              factories = {},
              registrarAddress = sp.address('tz1@REGISTRAR@'),
              tokensByIsinCode = {},
              tokensByName = {})

  @sp.entry_point
  def authorizeFactory(self, params):
    sp.set_type(params, sp.TRecord(factoryAddress = sp.TAddress, factoryType = sp.TString).layout(("factoryType", "factoryAddress")))
    sp.verify(self.data.registrarAddress == sp.sender, 'Sender is not the registry owner')
    self.data.factories[params.factoryType] = params.factoryAddress

  @sp.entry_point
  def listInstrument(self, params):
    present = sp.local("present", False)
    sp.for x in self.data.factories.items():
      sp.if x.value == sp.sender:
        present.value = True
    sp.verify(present.value, 'Sender is not an authorized factory')
    sp.verify(~ (self.data.tokensByName.contains(params.name)), 'Token with this name already exists')
    sp.verify(~ (self.data.tokensByIsinCode.contains(params.isin)), 'Token with this isin already exists')
    self.data.tokensByIsinCode[params.isin] = params
    self.data.tokensByName[params.name] = params
    sp.verify(sp.contract(sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))), self.data.eventSinkContractAddress, entry_point='InstrumentListed').is_some(), 'test error')
    sp.transfer(params, sp.tez(0), sp.contract(sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))), self.data.eventSinkContractAddress, entry_point='InstrumentListed').open_some())

  @sp.entry_point
  def unAuthorizeFactory(self, params):
    sp.verify(self.data.registrarAddress == sp.sender, 'Sender is not the registry owner')
    sp.for x in self.data.factories.items():
      sp.if x.value == params:
        del self.data.factories[x.key]

  @sp.entry_point
  def unlistInstrument(self, params):
    present = sp.local("present", False)
    sp.for x in self.data.factories.items():
      sp.if x.value == sp.sender:
        present.value = True
    sp.verify(present.value, 'Sender is not an authorized factory')
    sp.verify(self.data.tokensByIsinCode.contains(params), 'No Token with this isin exists')
    sp.verify(sp.contract(sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))), self.data.eventSinkContractAddress, entry_point='InstrumentUnlisted').is_some(), 'test error')
    sp.transfer(self.data.tokensByIsinCode[params], sp.tez(0), sp.contract(sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))), self.data.eventSinkContractAddress, entry_point='InstrumentUnlisted').open_some())
    del self.data.tokensByName[self.data.tokensByIsinCode[params].name]
    del self.data.tokensByIsinCode[params]

sp.add_compilation_target("test", Contract())