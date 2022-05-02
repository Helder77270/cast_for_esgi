import smartpy as sp

class Contract(sp.Contract):
  def __init__(self):
    self.init_type(sp.TRecord(admin = sp.TAddress, entrypointsBigMap = sp.TBigMap(sp.TBytes, sp.TBytes), eventSinkContractAddress = sp.TAddress, registrarAddress = sp.TAddress).layout((("admin", "entrypointsBigMap"), ("eventSinkContractAddress", "registrarAddress"))))
    self.init(admin = sp.address('tz1@ADMIN@'),
              entrypointsBigMap = {},
              eventSinkContractAddress = sp.address('tz1@SINK@'),
              registrarAddress = sp.address('tz1@REGISTRAR@'))

  @sp.entry_point
  def createForgeEmtn(self, params):
    sp.verify(sp.sender == self.data.registrarAddress, 'Calling address should match factory registrar agent')
    sp.verify(sp.sender == params.registrar, 'Calling address should match emtn registrar agent')
    create_contract_ForgeEmtnFactory_contract_37 = sp.local("create_contract_ForgeEmtnFactory_contract_37", create contract ...)
    sp.operations().push(create_contract_ForgeEmtnFactory_contract_37.value.operation)
    sp.set_type(create_contract_ForgeEmtnFactory_contract_37.value.address, sp.TAddress)
    sp.verify(sp.contract(sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))), params.registryAddress, entry_point='listInstrument').is_some(), 'Bad instrument registry address')
    sp.transfer(sp.record(address = create_contract_ForgeEmtnFactory_contract_37.value.address, isin = params.isinCode, name = params.name), sp.tez(0), sp.contract(sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))), params.registryAddress, entry_point='listInstrument').open_some())

  @sp.entry_point
  def upgrade(self, params):
    sp.set_type(params, sp.TMap(sp.TBytes, sp.TBytes))
    sp.verify((sp.sender == self.data.admin) | (sp.source == self.data.admin), 'only admin can upgrade')
    sp.for x in params.items():
      self.data.entrypointsBigMap[x.key] = x.value

sp.add_compilation_target("test", Contract())