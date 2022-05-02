import smartpy as sp

tstorage = sp.TRecord(eventSinkContractAddress = sp.TAddress, factories = sp.TMap(sp.TString, sp.TAddress), registrarAddress = sp.TAddress, tokensByIsinCode = sp.TMap(sp.TString, sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name")))), tokensByName = sp.TMap(sp.TString, sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))))).layout((("eventSinkContractAddress", "factories"), ("registrarAddress", ("tokensByIsinCode", "tokensByName"))))
tparameter = sp.TVariant(authorizeFactory = sp.TRecord(factoryAddress = sp.TAddress, factoryType = sp.TString).layout(("factoryType", "factoryAddress")), listInstrument = sp.TRecord(address = sp.TAddress, isin = sp.TString, name = sp.TString).layout(("address", ("isin", "name"))), unAuthorizeFactory = sp.TAddress, unlistInstrument = sp.TString).layout((("authorizeFactory", "listInstrument"), ("unAuthorizeFactory", "unlistInstrument")))
tglobals = { }
tviews = { }
