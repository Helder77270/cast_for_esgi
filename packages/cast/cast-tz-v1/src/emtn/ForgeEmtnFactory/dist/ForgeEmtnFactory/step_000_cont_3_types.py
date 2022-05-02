import smartpy as sp

tstorage = sp.TRecord(admin = sp.TAddress, entrypointsBigMap = sp.TBigMap(sp.TBytes, sp.TBytes), eventSinkContractAddress = sp.TAddress, registrarAddress = sp.TAddress).layout((("admin", "entrypointsBigMap"), ("eventSinkContractAddress", "registrarAddress")))
tparameter = sp.TVariant(createForgeEmtn = sp.TRecord(currency = sp.TString, initialSupply = sp.TNat, isinCode = sp.TString, name = sp.TString, owner = sp.TAddress, registrar = sp.TAddress, registryAddress = sp.TAddress, settler = sp.TAddress, symbol = sp.TString).layout(((("currency", "initialSupply"), ("isinCode", "name")), (("owner", "registrar"), ("registryAddress", ("settler", "symbol"))))), upgrade = sp.TMap(sp.TBytes, sp.TBytes)).layout(("createForgeEmtn", "upgrade"))
tglobals = { }
tviews = { }
