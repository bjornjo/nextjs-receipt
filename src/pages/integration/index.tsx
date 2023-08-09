import { useEffect } from "react";
import { SendReceipt } from "@/utils/types/sendReceipt";

const bohusReceipt = {

    "TransactionID": "100001000000297", //receipt_number
    // Timestamp?
    "BeginDateTimestamp": "2021-08-16T10:30:57.907Z",
    "EndDateTimestamp": "2021-08-31T18:36:55.050Z",
    /* Is zeipt? */
    "CancelledFlag": false,
    "VoidedFlag": false,
    "SuspendedFlag": false,
    "TrainingFlag": false,

    "OperatorID": "kristian", //operator_id
    "CustomerID": "0006190450", //What's this ID?

    "TransactionSum": 4,

    "retailTransaction": {
        "RetailTransactionTypeCode": "SL", //Sale/return
        "UnitCount": 4, //Units?
        "ISOCurrencyCode": "NOK", //Currency
        // Total / Sums
        "retailTransactionTotal": [
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionGrandAmount",
                "Amount": 4,
                "UnitCount": 4,
                "Visible": true,
                "Name": "Totalt",
                "Emphasized": false,
                "TextDesign": "None",
                "Subtotals": [
                    {
                        "SaleReturnItemType": "8510010",
                        "Amount": 4
                    }
                ]
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionDiscountEligible",
                "Amount": 4,
                "UnitCount": 4,
                "Visible": false,
                "Name": "Totalt beløp kvalifisert for rabatt",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionRounding",
                "Amount": 0,
                "UnitCount": 0,
                "Visible": false,
                "Name": "Avrunding",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionTaxAmount",
                "Amount": 0.8,
                "UnitCount": 4,
                "Visible": true,
                "Name": "        Inklusiv MVA",
                "Emphasized": false,
                "TextDesign": "None",
                "Subtotals": [
                    {
                        "TaxPercent": 25,
                        "TaxAmount": 0.8,
                        "AmountInclTax": 4
                    }
                ]
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionTenderAmount",
                "Amount": 4,
                "UnitCount": 1,
                "Visible": true,
                "Name": "Betalt",
                "Emphasized": false,
                "TextDesign": "None",
                "Subtotals": [
                    {
                        "TenderTypeCode": "BHSK",
                        "Amount": 4,
                        "CashBackAmount": 0,
                        "ZtenderDescription": "Express Bank",
                        "TenderClass": "RETAIL_FINANCE",
                        "ForeignCurrencyID": "",
                        "ForeignCurrencyAmount": 0,
                        "ExchangeRate": 0
                    }
                ]
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionRemaining",
                "Amount": 0,
                "UnitCount": 0,
                "Visible": true,
                "Name": "Å betale",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionReturns",
                "Amount": 0,
                "UnitCount": 0,
                "Visible": false,
                "Name": "Totalt returer",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionSale",
                "Amount": 4,
                "UnitCount": 4,
                "Visible": false,
                "Name": "TransactionSale",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionCashback",
                "Amount": 0,
                "UnitCount": 1,
                "Visible": true,
                "Name": "Veksel",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionNetAmount",
                "Amount": 3.2,
                "UnitCount": 0,
                "Visible": false,
                "Name": "TransactionNetAmount",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionDiscount",
                "Amount": 0,
                "UnitCount": 0,
                "Visible": false,
                "Name": "TransactionDiscountAmount",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionPriceIncrease",
                "Amount": 0,
                "UnitCount": 0,
                "Visible": false,
                "Name": "TransactionPriceIncreaseAmount",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionPaymentOnAccountZtoPay",
                "Amount": 0,
                "UnitCount": 0,
                "Visible": false,
                "Name": "TransactionPaymentOnAccountZtoPay",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionDeposit",
                "Amount": 0,
                "UnitCount": 0,
                "Visible": false,
                "Name": "TransactionDeposit",
                "Emphasized": false,
                "TextDesign": "None"
            },
            {
                "TransactionID": "100001000000297",
                "TransactionTotalTypeCode": "TransactionRedemption",
                "Amount": 0,
                "UnitCount": 0,
                "Visible": false,
                "Name": "TransactionRedemption",
                "Emphasized": false,
                "TextDesign": "None"
            }
        ],
        "retailTransactionLineItem": [
            {
                "TransactionID": "100001000000297",
                "RetailTransactionLineItemSequenceNumber": 1,
                "CustomerOrderID": "",
                "CustomerOrderLineItemSequenceNumber": "",
                "BeginDateTimestamp": "2021-08-16T10:30:57.908Z",
                "VoidFlag": false,
                "EndDateTimestamp": "2021-08-16T10:30:57.908Z",
                "EntryMethodCode": "Manu",
                "RetailTransactionLineItemTypeCode": "CUSTOMER_INFORMATION",
                "RetailTransactionLineItemEntryModeCode": "NORMAL",
                "ZfreeText": "",
                "customerInformationLineItem": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 1,
                    "TypeCode": "INFO",
                    "customerInformationLineModifier": [
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 1,
                            "DataElementID": "id",
                            "DataElementValue": "0006190450",
                            "DataElementFormatCode": "string"
                        },
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 2,
                            "DataElementID": "city",
                            "DataElementValue": "Fjellhamar",
                            "DataElementFormatCode": "string"
                        },
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 3,
                            "DataElementID": "country",
                            "DataElementValue": "NO",
                            "DataElementFormatCode": "string"
                        },
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 4,
                            "DataElementID": "creditAmount",
                            "DataElementValue": 0.4,
                            "DataElementFormatCode": "number"
                        },
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 5,
                            "DataElementID": "email",
                            "DataElementValue": "eise@bohus.no",
                            "DataElementFormatCode": "string"
                        },
                        {
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 6,
                            "DataElementID": "image",
                            "DataElementValue": "sap-icon://customer",
                            "DataElementFormatCode": "string"
                        },
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 7,
                            "DataElementID": "name",
                            "DataElementValue": "Solan og Ludvig",
                            "DataElementFormatCode": "string"
                        },
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 8,
                            "DataElementID": "phoneNumber",
                            "DataElementValue": "95213521",
                            "DataElementFormatCode": "string"
                        },
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 9,
                            "DataElementID": "postCode",
                            "DataElementValue": "1463",
                            "DataElementFormatCode": "string"
                        },
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 10,
                            "DataElementID": "street",
                            "DataElementValue": "Roald Amundsens vei 31",
                            "DataElementFormatCode": "string"
                        },
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 11,
                            "DataElementID": "customerClub",
                            "DataElementValue": false,
                            "DataElementFormatCode": "bool"
                        },
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 1,
                            "CustomerInformationModifierSequenceNumber": 12,
                            "DataElementID": "discountReasonCodes",
                            "DataElementValue": [],
                            "DataElementFormatCode": "array"
                        }
                    ]
                }
            },
            {
                "TransactionID": "100001000000297",
                "RetailTransactionLineItemSequenceNumber": 2,
                "CustomerOrderID": "0003348559",
                "CustomerOrderLineItemSequenceNumber": "000060",
                "BeginDateTimestamp": "2021-08-16T10:31:06.965Z",
                "VoidFlag": true,
                "EndDateTimestamp": "2021-08-16T10:31:10.877Z",
                "EntryMethodCode": "COrd",
                "RetailTransactionLineItemTypeCode": "PAYMENT_ON_ACCOUNT",
                "RetailTransactionLineItemEntryModeCode": "NORMAL",
                "ZfreeText": "",
                "paymentOnAccountLineItem": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 2,
                    "customerAccountID": "",
                    "CustomerAccountCardID": "",
                    "AmountReceived": 10,
                    "CustomerAccountInvoiceID": "",
                    "BalanceDue": 388,
                    "GiftReceiptFlag": false,
                    "RefundFlag": false,
                    "PaymentOnAccountTypeCode": "",
                    "ZcustomerOrder": {
                        "vis": true,
                        "CustomerId": "0006190450",
                        "CustomerOrderID": "0003348559",
                        "IsoCurrencyCode": "NOK",
                        "CustomerOrderTypeCode": "ZOR",
                        "selected": true,
                        "CustomerOrderLineItemSequenceNumber": "000060",
                        "CustomerOrderLineItemTypeCode": "ZTAN",
                        "ItemID": "000000000000221303",
                        "Description": "SARA Tall 2 pk LED Kronelys hvit",
                        "OrderedItemQuantity": 2,
                        "SaleUnitRetailPriceAmount": 199,
                        "TotalRetailPriceAmount": 398,
                        "Zpaid": 10,
                        "Zimage": "https://www.bohus.no/api/product/221303/thumb",
                        "ZgroupHeader": "Ordre 3348559",
                        "Zremaining": 388,
                        "ZpayProposal": "20",
                        "ZtoPay": 20,
                        "ZminPay": 0,
                        "ZtoPayPercent": 5
                    }
                },
                "displayFields": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 2,
                    "selected": false,
                    "visible": true,
                    "blocked": false,
                    "isDirty": false,
                    "customerOrder": true,
                    "headerLevel": false,
                    "itemID": "221303",
                    "description": "SARA Tall 2 pk LED Kronelys hvit",
                    "receiptText": "SARA Tall 2 pk LED Kronelys hvit",
                    "SaleUnitRetailPriceAmount": "199.00",
                    "customerOrderInfo": "3348559 - 60",
                    "imageThumb": "https://www.bohus.no/api/product/221303/thumb",
                    "ZminPay": 0,
                    "Zremaining": "388.00",
                    "Zpaid": "10.00",
                    "TotalRetailPriceAmount": "398.00",
                    "OrderedItemQuantity": "2",
                    "Znet": "NaN",
                    "ZfreeText": "",
                    "VoidFlag": true,
                    "ZtoPayPercent": 5,
                    "ZtoPay": 20,
                    "total": "20.00"
                }
            },
            {
                "TransactionID": "100001000000297",
                "RetailTransactionLineItemSequenceNumber": 3,
                "CustomerOrderID": "",
                "CustomerOrderLineItemSequenceNumber": "",
                "BeginDateTimestamp": "2021-08-16T10:31:10.878Z",
                "VoidFlag": false,
                "EndDateTimestamp": "2021-08-16T10:31:10.878Z",
                "EntryMethodCode": "",
                "RetailTransactionLineItemTypeCode": "VOID",
                "RetailTransactionLineItemEntryModeCode": "NORMAL",
                "ZfreeText": "",
                "voidsLineItem": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 3,
                    "VoidsLineItemSequenceNumber": 2,
                    "ReasonCode": "01",
                    "ZreasonCodeText": "Defekt vare",
                    "UnitOfMeasureCode": "",
                    "VoidQuantity": 2,
                    "VoidUnits": "NA",
                    "VoidAmount": 20
                }
            },
            {
                "TransactionID": "100001000000297",
                "RetailTransactionLineItemSequenceNumber": 4,
                "CustomerOrderID": "0003348559",
                "CustomerOrderLineItemSequenceNumber": "000060",
                "BeginDateTimestamp": "2021-08-16T10:32:03.180Z",
                "VoidFlag": true,
                "EndDateTimestamp": "2021-08-16T10:32:15.684Z",
                "EntryMethodCode": "COrd",
                "RetailTransactionLineItemTypeCode": "PAYMENT_ON_ACCOUNT",
                "RetailTransactionLineItemEntryModeCode": "NORMAL",
                "ZfreeText": "",
                "paymentOnAccountLineItem": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 4,
                    "customerAccountID": "",
                    "CustomerAccountCardID": "",
                    "AmountReceived": 10,
                    "CustomerAccountInvoiceID": "",
                    "BalanceDue": 388,
                    "GiftReceiptFlag": false,
                    "RefundFlag": false,
                    "PaymentOnAccountTypeCode": "",
                    "ZcustomerOrder": {
                        "vis": true,
                        "CustomerId": "0006190450",
                        "CustomerOrderID": "0003348559",
                        "IsoCurrencyCode": "NOK",
                        "CustomerOrderTypeCode": "ZOR",
                        "selected": true,
                        "CustomerOrderLineItemSequenceNumber": "000060",
                        "CustomerOrderLineItemTypeCode": "ZTAN",
                        "ItemID": "000000000000221303",
                        "Description": "SARA Tall 2 pk LED Kronelys hvit",
                        "OrderedItemQuantity": 2,
                        "SaleUnitRetailPriceAmount": 199,
                        "TotalRetailPriceAmount": 398,
                        "Zpaid": 10,
                        "Zimage": "https://www.bohus.no/api/product/221303/thumb",
                        "ZgroupHeader": "Ordre 3348559",
                        "Zremaining": 388,
                        "ZpayProposal": "20",
                        "ZtoPay": 20,
                        "ZminPay": 0,
                        "ZtoPayPercent": 5
                    }
                },
                "displayFields": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 4,
                    "selected": false,
                    "visible": true,
                    "blocked": false,
                    "isDirty": false,
                    "customerOrder": true,
                    "headerLevel": false,
                    "itemID": "221303",
                    "description": "SARA Tall 2 pk LED Kronelys hvit",
                    "receiptText": "SARA Tall 2 pk LED Kronelys hvit",
                    "SaleUnitRetailPriceAmount": "199.00",
                    "customerOrderInfo": "3348559 - 60",
                    "imageThumb": "https://www.bohus.no/api/product/221303/thumb",
                    "ZminPay": 0,
                    "Zremaining": "388.00",
                    "Zpaid": "10.00",
                    "TotalRetailPriceAmount": "398.00",
                    "OrderedItemQuantity": "2",
                    "Znet": "NaN",
                    "ZfreeText": "",
                    "VoidFlag": true,
                    "ZtoPayPercent": 5,
                    "ZtoPay": 20,
                    "total": "20.00"
                }
            },
            {
                "TransactionID": "100001000000297",
                "RetailTransactionLineItemSequenceNumber": 5,
                "CustomerOrderID": "",
                "CustomerOrderLineItemSequenceNumber": "",
                "BeginDateTimestamp": "2021-08-16T10:32:15.684Z",
                "VoidFlag": false,
                "EndDateTimestamp": "2021-08-16T10:32:15.684Z",
                "EntryMethodCode": "",
                "RetailTransactionLineItemTypeCode": "VOID",
                "RetailTransactionLineItemEntryModeCode": "NORMAL",
                "ZfreeText": "",
                "voidsLineItem": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 5,
                    "VoidsLineItemSequenceNumber": 4,
                    "ReasonCode": "01",
                    "ZreasonCodeText": "Defekt vare",
                    "UnitOfMeasureCode": "",
                    "VoidQuantity": 2,
                    "VoidUnits": "NA",
                    "VoidAmount": 20
                }
            },
            {
                "TransactionID": "100001000000297",
                "RetailTransactionLineItemSequenceNumber": 6,
                "CustomerOrderID": "",
                "CustomerOrderLineItemSequenceNumber": "",
                "BeginDateTimestamp": "2021-08-31T18:36:50.586Z",
                "VoidFlag": false,
                "EndDateTimestamp": "2021-08-31T18:36:50.586Z",
                "EntryMethodCode": "QA",
                "RetailTransactionLineItemTypeCode": "SALERETURN",
                "RetailTransactionLineItemEntryModeCode": "NORMAL",
                "ZfreeText": "",
                "saleReturnLineItem": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 6,
                    "InventoryControlFulfillment": "",
                    "SellingLocationID": "",
                    "BusinessUnitGroupID": "",
                    "ItemIDEntryMethodCode": "QA",
                    "ItemLookupMethodCode": "",
                    "POSItemID": "000000000000183037",
                    "POSItemIDQualifier": "",
                    "ItemID": "000000000000183037",
                    "POSDepartmentID": "8510010",
                    "UnitOfMeasureCode": "STK",
                    "SaleReturnItemType": "Stock",
                    "SubItemType": "8510010",
                    "SellUnitRetailPriceEntryMethodCode": "AUTO",
                    "GiftReceiptFlag": false,
                    "ItemTraceableUnitID": "",
                    "ActionCode": "SL",
                    "Quantity": 1,
                    "ReasonCode": "",
                    "FulfillmentAcknowledgementLineItemSequenceNumber": 0,
                    "ZdiscountAllowed": true,
                    "Zbrand": null,
                    "saleReturnTaxLineItem": [
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 6,
                            "SalesTaxSequenceNumber": 1,
                            "TaxGroupRuleID": "U1",
                            "UsageCode": "NA",
                            "ReasonCode": "VAT",
                            "TaxIncludedInPricesFlag": true,
                            "TaxAtSourceFlag": false,
                            "TaxableAmount": 0.8,
                            "TaxablePercent": 100,
                            "TaxPercent": 25,
                            "TaxAmount": 0.2
                        }
                    ],
                    "lineItemChecks": {
                        "giftcard": {
                            "relevant": false,
                            "processStatus": "",
                            "signaturePrint": "",
                            "normalPrint": ""
                        },
                        "serialNumber": {
                            "serialNumberReq": false
                        },
                        "digitalArticle": {
                            "relevant": false,
                            "processStatus": "",
                            "receiptText": "",
                            "digitalArticleReference": ""
                        },
                        "posa": {
                            "relevant": false,
                            "processStatus": "",
                            "receiptText": "",
                            "POSAReference": ""
                        },
                        "valueCodes": {
                            "relevant": null,
                            "processStatus": "",
                            "receiptText": []
                        },
                        "eatInside": {
                            "relevant": false
                        }
                    },
                    "RegularUnitPrice": 1,
                    "ActualUnitPrice": 1,
                    "ActualUnitPriceQuantity": "NA",
                    "ZposPrice": 1,
                    "SellUnitRetailPriceDerivationMethodCode": "NA",
                    "BulkUnitCount": "NA",
                    "ExtendedAmount": 1,
                    "UnitDiscountAmount": 0,
                    "ExtendedDiscountAmount": 0,
                    "UnitCostPrice": "NA",
                    "UnitCostPriceQuantity": "NA",
                    "UnitListPrice": "NA",
                    "UnitListPriceQuantity": "NA",
                    "InventoryValuePrice": "NA",
                    "InventoryValuePriceQuantity": "NA",
                    "UnitPriceIncreaseAmount": 0,
                    "ExtendedPriceIncreaseAmount": 0
                },
                "displayFields": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 6,
                    "selected": false,
                    "visible": true,
                    "blocked": false,
                    "isDirty": false,
                    "customerOrder": false,
                    "ActionCode": "SL",
                    "valueCodes": false,
                    "itemID": "183037",
                    "gtin": "7030261160154",
                    "description": "Handleposer store",
                    "receiptText": "Handleposer store",
                    "imageThumb": "https://www.bohus.no/api/product/183037/thumb",
                    "serialNumberReq": false,
                    "insuranceProposal": false,
                    "ZdiscountAllowed": true,
                    "ZfreeText": "",
                    "VoidFlag": false,
                    "ItemTraceableUnitID": "",
                    "GiftReceiptFlag": false,
                    "RegularUnitPrice": "1.00",
                    "ActualUnitPrice": "1.00",
                    "Quantity": "1",
                    "UnitOfMeasureCode": "STK",
                    "Tax": "Inkl. 25% mva",
                    "discountText": false,
                    "discountType": "None",
                    "total": "1.00"
                }
            },
            {
                "TransactionID": "100001000000297",
                "RetailTransactionLineItemSequenceNumber": 7,
                "CustomerOrderID": "",
                "CustomerOrderLineItemSequenceNumber": "",
                "BeginDateTimestamp": "2021-08-31T18:36:51.001Z",
                "VoidFlag": false,
                "EndDateTimestamp": "2021-08-31T18:36:51.001Z",
                "EntryMethodCode": "QA",
                "RetailTransactionLineItemTypeCode": "SALERETURN",
                "RetailTransactionLineItemEntryModeCode": "NORMAL",
                "ZfreeText": "",
                "saleReturnLineItem": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 7,
                    "InventoryControlFulfillment": "",
                    "SellingLocationID": "",
                    "BusinessUnitGroupID": "",
                    "ItemIDEntryMethodCode": "QA",
                    "ItemLookupMethodCode": "",
                    "POSItemID": "000000000000183037",
                    "POSItemIDQualifier": "",
                    "ItemID": "000000000000183037",
                    "POSDepartmentID": "8510010",
                    "UnitOfMeasureCode": "STK",
                    "SaleReturnItemType": "Stock",
                    "SubItemType": "8510010",
                    "SellUnitRetailPriceEntryMethodCode": "AUTO",
                    "GiftReceiptFlag": false,
                    "ItemTraceableUnitID": "",
                    "ActionCode": "SL",
                    "Quantity": 1,
                    "ReasonCode": "",
                    "FulfillmentAcknowledgementLineItemSequenceNumber": 0,
                    "ZdiscountAllowed": true,
                    "Zbrand": null,
                    "saleReturnTaxLineItem": [
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 7,
                            "SalesTaxSequenceNumber": 1,
                            "TaxGroupRuleID": "U1",
                            "UsageCode": "NA",
                            "ReasonCode": "VAT",
                            "TaxIncludedInPricesFlag": true,
                            "TaxAtSourceFlag": false,
                            "TaxableAmount": 0.8,
                            "TaxablePercent": 100,
                            "TaxPercent": 25,
                            "TaxAmount": 0.2
                        }
                    ],
                    "lineItemChecks": {
                        "giftcard": {
                            "relevant": false,
                            "processStatus": "",
                            "signaturePrint": "",
                            "normalPrint": ""
                        },
                        "serialNumber": {
                            "serialNumberReq": false
                        },
                        "digitalArticle": {
                            "relevant": false,
                            "processStatus": "",
                            "receiptText": "",
                            "digitalArticleReference": ""
                        },
                        "posa": {
                            "relevant": false,
                            "processStatus": "",
                            "receiptText": "",
                            "POSAReference": ""
                        },
                        "valueCodes": {
                            "relevant": null,
                            "processStatus": "",
                            "receiptText": []
                        },
                        "eatInside": {
                            "relevant": false
                        }
                    },
                    "RegularUnitPrice": 1,
                    "ActualUnitPrice": 1,
                    "ActualUnitPriceQuantity": "NA",
                    "ZposPrice": 1,
                    "SellUnitRetailPriceDerivationMethodCode": "NA",
                    "BulkUnitCount": "NA",
                    "ExtendedAmount": 1,
                    "UnitDiscountAmount": 0,
                    "ExtendedDiscountAmount": 0,
                    "UnitCostPrice": "NA",
                    "UnitCostPriceQuantity": "NA",
                    "UnitListPrice": "NA",
                    "UnitListPriceQuantity": "NA",
                    "InventoryValuePrice": "NA",
                    "InventoryValuePriceQuantity": "NA",
                    "UnitPriceIncreaseAmount": 0,
                    "ExtendedPriceIncreaseAmount": 0
                },
                "displayFields": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 7,
                    "selected": false,
                    "visible": true,
                    "blocked": false,
                    "isDirty": false,
                    "customerOrder": false,
                    "ActionCode": "SL",
                    "valueCodes": false,
                    "itemID": "183037",
                    "gtin": "7030261160154",
                    "description": "Handleposer store",
                    "receiptText": "Handleposer store",
                    "imageThumb": "https://www.bohus.no/api/product/183037/thumb",
                    "serialNumberReq": false,
                    "insuranceProposal": false,
                    "ZdiscountAllowed": true,
                    "ZfreeText": "",
                    "VoidFlag": false,
                    "ItemTraceableUnitID": "",
                    "GiftReceiptFlag": false,
                    "RegularUnitPrice": "1.00",
                    "ActualUnitPrice": "1.00",
                    "Quantity": "1",
                    "UnitOfMeasureCode": "STK",
                    "Tax": "Inkl. 25% mva",
                    "discountText": false,
                    "discountType": "None",
                    "total": "1.00"
                }
            },
            {
                "TransactionID": "100001000000297",
                "RetailTransactionLineItemSequenceNumber": 8,
                "CustomerOrderID": "",
                "CustomerOrderLineItemSequenceNumber": "",
                "BeginDateTimestamp": "2021-08-31T18:36:51.156Z",
                "VoidFlag": false,
                "EndDateTimestamp": "2021-08-31T18:36:51.156Z",
                "EntryMethodCode": "QA",
                "RetailTransactionLineItemTypeCode": "SALERETURN",
                "RetailTransactionLineItemEntryModeCode": "NORMAL",
                "ZfreeText": "",
                "saleReturnLineItem": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 8,
                    "InventoryControlFulfillment": "",
                    "SellingLocationID": "",
                    "BusinessUnitGroupID": "",
                    "ItemIDEntryMethodCode": "QA",
                    "ItemLookupMethodCode": "",
                    "POSItemID": "000000000000183037",
                    "POSItemIDQualifier": "",
                    "ItemID": "000000000000183037",
                    "POSDepartmentID": "8510010",
                    "UnitOfMeasureCode": "STK",
                    "SaleReturnItemType": "Stock",
                    "SubItemType": "8510010",
                    "SellUnitRetailPriceEntryMethodCode": "AUTO",
                    "GiftReceiptFlag": false,
                    "ItemTraceableUnitID": "",
                    "ActionCode": "SL",
                    "Quantity": 1,
                    "ReasonCode": "",
                    "FulfillmentAcknowledgementLineItemSequenceNumber": 0,
                    "ZdiscountAllowed": true,
                    "Zbrand": null,
                    "saleReturnTaxLineItem": [
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 8,
                            "SalesTaxSequenceNumber": 1,
                            "TaxGroupRuleID": "U1",
                            "UsageCode": "NA",
                            "ReasonCode": "VAT",
                            "TaxIncludedInPricesFlag": true,
                            "TaxAtSourceFlag": false,
                            "TaxableAmount": 0.8,
                            "TaxablePercent": 100,
                            "TaxPercent": 25,
                            "TaxAmount": 0.2
                        }
                    ],
                    "lineItemChecks": {
                        "giftcard": {
                            "relevant": false,
                            "processStatus": "",
                            "signaturePrint": "",
                            "normalPrint": ""
                        },
                        "serialNumber": {
                            "serialNumberReq": false
                        },
                        "digitalArticle": {
                            "relevant": false,
                            "processStatus": "",
                            "receiptText": "",
                            "digitalArticleReference": ""
                        },
                        "posa": {
                            "relevant": false,
                            "processStatus": "",
                            "receiptText": "",
                            "POSAReference": ""
                        },
                        "valueCodes": {
                            "relevant": null,
                            "processStatus": "",
                            "receiptText": []
                        },
                        "eatInside": {
                            "relevant": false
                        }
                    },
                    "RegularUnitPrice": 1,
                    "ActualUnitPrice": 1,
                    "ActualUnitPriceQuantity": "NA",
                    "ZposPrice": 1,
                    "SellUnitRetailPriceDerivationMethodCode": "NA",
                    "BulkUnitCount": "NA",
                    "ExtendedAmount": 1,
                    "UnitDiscountAmount": 0,
                    "ExtendedDiscountAmount": 0,
                    "UnitCostPrice": "NA",
                    "UnitCostPriceQuantity": "NA",
                    "UnitListPrice": "NA",
                    "UnitListPriceQuantity": "NA",
                    "InventoryValuePrice": "NA",
                    "InventoryValuePriceQuantity": "NA",
                    "UnitPriceIncreaseAmount": 0,
                    "ExtendedPriceIncreaseAmount": 0
                },
                "displayFields": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 8,
                    "selected": false,
                    "visible": true,
                    "blocked": false,
                    "isDirty": false,
                    "customerOrder": false,
                    "ActionCode": "SL",
                    "valueCodes": false,
                    "itemID": "183037",
                    "gtin": "7030261160154",
                    "description": "Handleposer store",
                    "receiptText": "Handleposer store",
                    "imageThumb": "https://www.bohus.no/api/product/183037/thumb",
                    "serialNumberReq": false,
                    "insuranceProposal": false,
                    "ZdiscountAllowed": true,
                    "ZfreeText": "",
                    "VoidFlag": false,
                    "ItemTraceableUnitID": "",
                    "GiftReceiptFlag": false,
                    "RegularUnitPrice": "1.00",
                    "ActualUnitPrice": "1.00",
                    "Quantity": "1",
                    "UnitOfMeasureCode": "STK",
                    "Tax": "Inkl. 25% mva",
                    "discountText": false,
                    "discountType": "None",
                    "total": "1.00"
                }
            },
            {
                "TransactionID": "100001000000297",
                "RetailTransactionLineItemSequenceNumber": 9,
                "CustomerOrderID": "",
                "CustomerOrderLineItemSequenceNumber": "",
                "BeginDateTimestamp": "2021-08-31T18:36:51.514Z",
                "VoidFlag": false,
                "EndDateTimestamp": "2021-08-31T18:36:51.514Z",
                "EntryMethodCode": "QA",
                "RetailTransactionLineItemTypeCode": "SALERETURN",
                "RetailTransactionLineItemEntryModeCode": "NORMAL",
                "ZfreeText": "",
                "saleReturnLineItem": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 9,
                    "InventoryControlFulfillment": "",
                    "SellingLocationID": "",
                    "BusinessUnitGroupID": "",
                    "ItemIDEntryMethodCode": "QA",
                    "ItemLookupMethodCode": "",
                    "POSItemID": "000000000000183037",
                    "POSItemIDQualifier": "",
                    "ItemID": "000000000000183037",
                    "POSDepartmentID": "8510010",
                    "UnitOfMeasureCode": "STK",
                    "SaleReturnItemType": "Stock",
                    "SubItemType": "8510010",
                    "SellUnitRetailPriceEntryMethodCode": "AUTO",
                    "GiftReceiptFlag": false,
                    "ItemTraceableUnitID": "",
                    "ActionCode": "SL",
                    "Quantity": 1,
                    "ReasonCode": "",
                    "FulfillmentAcknowledgementLineItemSequenceNumber": 0,
                    "ZdiscountAllowed": true,
                    "Zbrand": null,
                    "saleReturnTaxLineItem": [
                        {
                            "TransactionID": "100001000000297",
                            "RetailTransactionLineItemSequenceNumber": 9,
                            "SalesTaxSequenceNumber": 1,
                            "TaxGroupRuleID": "U1",
                            "UsageCode": "NA",
                            "ReasonCode": "VAT",
                            "TaxIncludedInPricesFlag": true,
                            "TaxAtSourceFlag": false,
                            "TaxableAmount": 0.8,
                            "TaxablePercent": 100,
                            "TaxPercent": 25,
                            "TaxAmount": 0.2
                        }
                    ],
                    "lineItemChecks": {
                        "giftcard": {
                            "relevant": false,
                            "processStatus": "",
                            "signaturePrint": "",
                            "normalPrint": ""
                        },
                        "serialNumber": {
                            "serialNumberReq": false
                        },
                        "digitalArticle": {
                            "relevant": false,
                            "processStatus": "",
                            "receiptText": "",
                            "digitalArticleReference": ""
                        },
                        "posa": {
                            "relevant": false,
                            "processStatus": "",
                            "receiptText": "",
                            "POSAReference": ""
                        },
                        "valueCodes": {
                            "relevant": null,
                            "processStatus": "",
                            "receiptText": []
                        },
                        "eatInside": {
                            "relevant": false
                        }
                    },
                    "RegularUnitPrice": 1,
                    "ActualUnitPrice": 1,
                    "ActualUnitPriceQuantity": "NA",
                    "ZposPrice": 1,
                    "SellUnitRetailPriceDerivationMethodCode": "NA",
                    "BulkUnitCount": "NA",
                    "ExtendedAmount": 1,
                    "UnitDiscountAmount": 0,
                    "ExtendedDiscountAmount": 0,
                    "UnitCostPrice": "NA",
                    "UnitCostPriceQuantity": "NA",
                    "UnitListPrice": "NA",
                    "UnitListPriceQuantity": "NA",
                    "InventoryValuePrice": "NA",
                    "InventoryValuePriceQuantity": "NA",
                    "UnitPriceIncreaseAmount": 0,
                    "ExtendedPriceIncreaseAmount": 0
                },
                "displayFields": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 9,
                    "selected": false,
                    "visible": true,
                    "blocked": false,
                    "isDirty": false,
                    "customerOrder": false,
                    "ActionCode": "SL",
                    "valueCodes": false,
                    "itemID": "183037",
                    "gtin": "7030261160154",
                    "description": "Handleposer store",
                    "receiptText": "Handleposer store",
                    "imageThumb": "https://www.bohus.no/api/product/183037/thumb",
                    "serialNumberReq": false,
                    "insuranceProposal": false,
                    "ZdiscountAllowed": true,
                    "ZfreeText": "",
                    "VoidFlag": false,
                    "ItemTraceableUnitID": "",
                    "GiftReceiptFlag": false,
                    "RegularUnitPrice": "1.00",
                    "ActualUnitPrice": "1.00",
                    "Quantity": "1",
                    "UnitOfMeasureCode": "STK",
                    "Tax": "Inkl. 25% mva",
                    "discountText": false,
                    "discountType": "None",
                    "total": "1.00"
                }
            },
            {
                "TransactionID": "100001000000297",
                "RetailTransactionLineItemSequenceNumber": 10,
                "CustomerOrderID": "",
                "CustomerOrderLineItemSequenceNumber": "",
                "BeginDateTimestamp": "2021-08-31T18:36:55.045Z",
                "VoidFlag": false,
                "EndDateTimestamp": "2021-08-31T18:36:55.045Z",
                "EntryMethodCode": "Standard",
                "RetailTransactionLineItemTypeCode": "TENDER",
                "RetailTransactionLineItemEntryModeCode": "NORMAL",
                "ZfreeText": "",
                "tenderLineItem": {
                    "TransactionID": "100001000000297",
                    "RetailTransactionLineItemSequenceNumber": 10,
                    "TenderTypeCode": "RETAIL_FINANCE",
                    "ZtenderDescription": "Express Bank",
                    "TenderAccountNumber": "",
                    "zRetailFinanceTenderLineItem": {
                        "ReferenceNumber": ""
                    },
                    "TenderAmount": 4,
                    "TenderSubTypeCode": "BHSK",
                    "ReasonCode": "",
                    "AccountNumber": "NA",
                    "CoPayFlag": "NA",
                    "ForeignCurrencyAmount": 0,
                    "ForeignCurrencyID": "",
                    "ExchangeRate": 0,
                    "TipAmount": 0,
                    "TipForeignCurrencyAmount": 0,
                    "CashbackForeignCurrencyAmount": 0,
                    "AddressVerificationCode": "",
                    "TenderMediaBrandID": 0,
                    "IsChangeFlag": false,
                    "CashbackAmount": 0,
                    "AmountAppliedToTransaction": 4
                }
            }
        ]
    }
}
const bohusStore = {
    id: '1b6a9ada-eeee-42db-9e93-a67dd91317ed',
    createdAt: '1567678795893',
    updatedAt: '1687296705133',
    createdBy: 'admin',
    updatedBy: 'posbe',
    store: '0000003002',
    name: 'Alna',
    salesOrg: '3002',
    city: 'Oslo',
    district: '44076',
    postCode: '1081',
    street: 'Tevlingveien 23',
    country: 'NO',
    language: 'NO',
    currency: 'NOK',
    vatNumber: 'NO985741026MVA',
    phoneNumber: '22905480',
    faxNumber: '22905499',
    email: 'alna@bohus.no',
    companyName: 'Bohus Alna AS',
    fiscalYearStart: '01',
    fiscalYearEnd: '12',
    chain: 'Bohus Logistikk',
    merchantId: null,
    companyAddress: 'Tevlingveien, 1081 Oslo'
}
const payment = {
    payment_method: 'Express Bank',
    payment_method_type: undefined,
    currency: 'NOK',
    exchange_rate: '',
    moneyback: false,
    masked_pan: undefined,
    gift_number: '',
    timestamp: '2021-08-31T18:36:55.045Z',
    bank_terminal_id: undefined,
    national_merchant_number: undefined,
    ref_nr: undefined,
    aid_nr: undefined,
    tvr_nr: undefined,
    tsi_nr: undefined,
    response_code: undefined,
    tip_amount: '0',
    payment_vat_amount: '0',
    payment_amount: '4'
}

const Hey = (props: any) => {


    useEffect(() => {
        translateObject(bohusReceipt, bohusStore)
    }, []);

    return (<p>hei</p>)
}
export default Hey;

function translateObject(bohusReceipt: any, bohusStore: any): SendReceipt {
    const {
        //receipt_number
        TransactionID,

        // Timestamp?
        BeginDateTimestamp,
        EndDateTimestamp,

        /* Is zeipt? */
        CancelledFlag,
        VoidedFlag,
        SuspendedFlag,
        TrainingFlag,

        //operator_id
        OperatorID,

        //What's this ID?
        CustomerID,

        retailTransaction: {
            RetailTransactionTypeCode, //Sale/return
            UnitCount, //Units?
            ISOCurrencyCode, //Currency
            retailTransactionTotal,
            retailTransactionLineItem
            //Array of transaction info:
            // TransactionGrandAmount (Totalt)
            // TransactionDiscountEligible (Totalt beløp kvalifisert for rabatt)
            // TransactionRounding (Avrunding)
            // TransactionTaxAmount (Inklusiv MVA)
            // TransactionTenderAmount (Betalt)
            // TransactionRemaining (Å betale)
            // TransactionReturns (Totalt returer)
            // TransactionSale (TransactionSale)
            // TransactionCashback (Veksel)
            // TransactionNetAmount (TransactionNetAmount)
            // TransactionDiscount (TransactionDiscountAmount)
            // TransactionPriceIncrease (TransactionPriceIncreaseAmount)
            // TransactionPaymentOnAccountZtoPay (TransactionPaymentOnAccountZtoPay)
            // TransactionDeposit (TransactionDeposit)
            // TransactionRedemption (TransactionRedemption)
        },
    } = bohusReceipt;

    // Valid zeipt?: {
    if (bohusReceipt.CancelledFlag || bohusReceipt.VoidedFlag || bohusReceipt.SuspendedFlag || bohusReceipt.TrainingFlag) {
        console.log("Not valid as a Zeipt");
        /* complete();
        return; */
    }
    // }

    const receipt: SendReceipt = {
        version: "2.1.0",
        timestamp: bohusReceipt.EndDateTimestamp,
        receipt_number: bohusReceipt.EndDateTimestamp,
        receipt_type: "elektronisk salgskvittering",
        merchant: {
            merchant_gcid: "bohus-123",
            org_number: bohusStore.vatNumber,
            merchant_country_code: bohusStore.country,
            purchase_location: {
                purchase_country_code: bohusStore.country,
                address: bohusStore.street,
                city: bohusStore.city,
                store_name: bohusStore.companyName,
                zip_code: bohusStore.postCode,
            },
            telephone: bohusStore.phoneNumber,
            email: bohusStore.email,
            website: "https://www.bohus.no/"
        },
        total: {
            total_moneyback: undefined,
            total_currency: bohusReceipt.retailTransaction.ISOCurrencyCode,
            total_vat_name: "MVA",
            additions: {
                total_vat: 0,
            },
            total_price_with_vat: undefined,
            final_price: 0,
            extra_sum_values: undefined
        }
    }


    // Sums of receipt: {
    if (bohusReceipt.retailTransaction.RetailTransactionTypeCode === "SL") {
        retailTransactionTotal.forEach((transaction: { TransactionTotalTypeCode: any; Amount: any; Subtotals: { TenderTypeCode: any; }[]; }) => {
            switch (transaction.TransactionTotalTypeCode) {
                case 'TransactionGrandAmount':
                    receipt.total.final_price = transaction.Amount;
                    break;
                case 'TransactionTaxAmount':
                    receipt.total.additions.total_vat = transaction.Amount;
                    break;
                case 'TransactionDiscountEligible':
                    receipt.total.total_art_price_with_vat = transaction.Amount;
                    break;
                case 'TransactionDiscount':
                    receipt.total.subtractions?.discounts?.push({ amount: transaction.Amount });
                    break;
                case 'TransactionNetAmount':
                    receipt.total.total_price_without_vat = transaction.Amount;
                    break;
                default:
                    break;
            }
        });
    } else {
        console.log("RETURN: Need to handle this");
        /* complete();
        return; */

    }
    // }

    // Articles and payments: {
    retailTransactionLineItem.forEach((transaction: { RetailTransactionLineItemTypeCode: any; Amount: any; Subtotals: { TenderTypeCode: any; }[]; }) => {


        switch (transaction.RetailTransactionLineItemTypeCode) {
            case "SALERETURN":
                let vat_groups: any = [];
                if (retailTransactionLineItem.saleReturnLineItem.saleReturnTaxLineItem.length > 1) {
                    // !! Handle one tax group untill next zeipt update
                    console.log("Handle one tax group untill next zeipt update");
                    for (let j = 0; j < retailTransactionLineItem.saleReturnLineItem.saleReturnTaxLineItem.length; j++) {

                    }
                } else {

                }
                receipt.articles?.push({
                    art_number: retailTransactionLineItem.saleReturnLineItem.ItemID,
                    art_name: retailTransactionLineItem.displayFields.description,
                    quantity: Math.abs(retailTransactionLineItem.saleReturnLineItem.Quantity),
                    quantity_type: retailTransactionLineItem.saleReturnLineItem.UnitOfMeasureCode,
                    return: (retailTransactionLineItem.saleReturnLineItem.ActionCode === "RT"),
                    additions: {
                        vat_groups: vat_groups
                    }
                })
                break;
            default:
                break;
        }

    })
    // }

    console.log(receipt);
    return receipt
}

