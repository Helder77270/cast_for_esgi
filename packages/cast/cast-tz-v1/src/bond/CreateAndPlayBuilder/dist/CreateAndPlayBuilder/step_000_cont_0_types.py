import smartpy as sp

tstorage = sp.TRecord(administrator = sp.TAddress, bytesScripts = sp.TBigMap(sp.TBytes, sp.TBytes)).layout(("administrator", "bytesScripts"))
tparameter = sp.TVariant(buildCreateAndPlay = sp.TUnit, sendCreateAndPlay = sp.TAddress).layout(("buildCreateAndPlay", "sendCreateAndPlay"))
tglobals = { }
tviews = { }
