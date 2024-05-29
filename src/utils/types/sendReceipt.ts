export interface SendReceipt {
  /**
   * @description The version of this Zeipt receipt format. This defines how Zeipt should parse the current receipt.
   * @example 2.1.0
   * @enum {string}
   */
  version: "2.1.0";
  /**
   * Format: date-time
   * @description <code>YYYY-MM-DDThh:mm:ss±hh:mm</code> <a href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6"><b>RFC 3339</b></a> format
   * @example 2020-09-15T15:53:00+01:00
   */
  timestamp: string;
  /**
   * Format: id
   * @description Your own defined receipt number for the receipt.
   * @example 123i92301
   */
  receipt_number: string;
  /**
   * @description The annotation on what type of receipt this is.
   * @example elektronisk salgskvittering
   * @enum {string}
   */
  receipt_type:
    | "elektronisk salgskvittering"
    | "elektronisk returkvittering"
    | "elektronisk proforma-kvittering"
    | "elektronisk treningskvittering"
    | "elektronisk utleveringsseddel";
  /**
   * @description Free text "Header" field about the receipt or order object
   * @example Something free text decription
   */
  receipt_description?: string;
  /**
   * @description Hash certificate used by the cashier to validate receipt offline with its private key
   * @example 96b26f6cc52edd91cd52ac5baa1a802f4ff04daab07a308f0b2e897cc807e4bb
   */
  receipt_producer_certificate?: string;
  /**
   * @description The merchant or zeipt defined order numbers for future reference
   * @example [
   *   "Order_2135po3"
   * ]
   */
  relate_order_numbers?: string[];
  /** @description Fill in atleast one customer identification, <code>optional</code> send on email/sms directly with the help of setting the related boolean to true */
  customer_deliveries?: {
    /**
     * Format: uuid
     * @description The customers application reference number in Zeipt systems, when using this objects identifications you use this key to do an conditional lookup, allowing only users belonging to this applications to be linked to the receipt with the identifications in this object
     * @example 70bf66b9-1b65-4e07-ad7b-a8fcd77fcb44
     */
    application_number?: string;
    /** @description Input the customers payment mediums reference value here provided by the <b>PSP</b> (Payment Service Provider) */
    payment_medium_reference?: {
      /**
       * @description The <b>PSP</b> (Payment Service Provider) providing the token from its payment terminal/e-commerce checkout
       * @example verifone
       * @enum {string}
       */
      token_provider?: "verifone" | "nets";
      /**
       * Format: id
       * @description The reference value in Zeipt's system for the customer's payment medium, received from the <b>PSP</b> (Payment Service Provider).
       * @example 4Z07BY79KA1307SR9X
       */
      zeipt_card_token?: string;
    };
    /**
     * Format: id
     * @description A custom reference value, it can be any kind of identification such as QR/bar-code user id, car license plate, social security number etc...
     * @example PFsK#!dl?&!Q17LOsN02ad=
     */
    custom_customer_reference?: string;
    /** @description The customer's email */
    email?: {
      /**
       * Format: email
       * @description <a href="https://en.wikipedia.org/wiki/Email_address"><b>Email</b></a> format
       * @example customer@example.com
       */
      email_address?: string;
      /**
       * @description If true, deliver the receipt directly to the customer's email as well.
       * @default false
       * @example false
       */
      email_delivery?: boolean;
    };
    /** @description The customer's phone number. */
    telephone?: {
      /**
       * Format: calling_code
       * @description The phone number country code <a href="https://en.wikipedia.org/wiki/E.123"><b>E.123</b></a> format
       * @example +47
       */
      country_calling_code: string;
      /**
       * Format: tele_number
       * @description The phone number, <a href="https://en.wikipedia.org/wiki/E.123"><b>E.123</b></a> format
       * @example 97419601
       */
      number: string;
      /**
       * @description If true, deliver the receipt as sms directly to the customer's phone as well.
       * @default false
       * @example false
       */
      sms_delivery?: boolean;
    };
  }[];
  /** @description Description of the store where the purchase was made. */
  merchant: {
    /**
     * Format: id
     * @description Your merchant type customer client id, Has to be a unique ID defined by you
     * @example merchant_1
     */
    merchant_gcid: string;
    /**
     * @description The organization / VAT identification number of the merchant, <a href="https://en.wikipedia.org/wiki/VAT_identification_number"><b>VAT ID</b></a>
     * @example 916809026MVA
     */
    org_number: string;
    /**
     * Format: country_code
     * @description <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"><b>ISO 3166-1 alpha 2</b></a> format
     * @example NO
     */
    merchant_country_code: string;
    /** @description The store where the purchase was made and its location. */
    purchase_location?: {
      /**
       * Format: country_code
       * @description <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"><b>ISO 3166-1 alpha 2</b></a> format
       * @example NO
       */
      purchase_country_code: string;
      /**
       * @description The city of the purchase location.
       * @example Oslo
       */
      city: string;
      /**
       * @description The zip code of the purchase location.
       * @example 0254
       */
      zip_code: string;
      /**
       * @description The address of the purchase location.
       * @example Veien 23
       */
      address: string;
      /**
       * @description The name of the store.
       * @example Shop&Go
       */
      store_name: string;
      /**
       * @description The identifier of the cashier.
       * @example 543
       */
      cashier_number?: string;
      /**
       * @description The identifier of the store.
       * @example 22
       */
      store_number?: string;
    };
    /** @description The store's phone number. */
    telephone?: {
      /**
       * Format: calling_code
       * @description The phone number country code <a href="https://en.wikipedia.org/wiki/E.123"><b>E.123</b></a> format
       * @example +47
       */
      country_calling_code: string;
      /**
       * Format: tele_number
       * @description The phone number, <a href="https://en.wikipedia.org/wiki/E.123"><b>E.123</b></a> format
       * @example 97419601
       */
      number: string;
    };
    /**
     * Format: email
     * @description The store's email address, <a href="https://en.wikipedia.org/wiki/Email_address"><b>Email</b></a> format
     * @example store@example.com
     */
    email?: string;
    /**
     * Format: url
     * @description The store's website.
     * @example https://www.example.com
     */
    website?: string;
    /** @description The purchase location references in case its not a standard physical location eg. taxi. */
    travel_reference?: {
      /**
       * @description ID of the driver. Required if "travel_reference" object are to be used instead of "purchase_location" object
       * @example 653
       */
      travel_driver_id: string;
      /**
       * @description Name of the driver. Required if "travel_reference" object are to be used instead of "purchase_location" object
       * @example Jeppe Skaar
       */
      travel_driver_name: string;
      /**
       * @description The national vehicle certification number for the driver.
       * @example ABF035JS46KA
       */
      travel_driver_certification?: string;
      /**
       * @description The national certification number for the company.
       * @example ABF035JS46KA
       */
      travel_company_certification?: string;
      /**
       * @description The license plate of the vehicle. Required if "travel_reference" object are to be used instead of "purchase_location" object
       * @example AF46035
       */
      car_license_plate: string;
    };
  };
  /** @description The final totals of the receipt. Includes discounts, recycling fees, taxes and tip. May also be money back. */
  total: {
    /**
     * @description If true, the amounts in total seen as beeing money paid back to the customer, resulting in a negative sum on the representation of receipt.
     * @default false
     * @example false
     */
    total_moneyback?: boolean;
    /**
     * Format: currency
     * @description <a href="https://en.wikipedia.org/wiki/ISO_4217"><b>ISO 4217</b></a> format, The currency set by the seller
     * @example NOK
     */
    total_currency: string;
    /**
     * @description The name of the vat, set by the seller
     * @example MVA
     */
    total_vat_name?: string;
    /**
     * @description Total sum of all article objects "art_price_with_vat" but before discounts in total object, Without article fee (Recycling)
     * @example 24640
     */
    total_art_price_with_vat?: number;
    /** @description The substractions to the total price */
    subtractions?: {
      /** @description Array of discounts for the total purchase amounts. */
      discounts?: {
        /**
         * @description The index value for grouping discount objects to a merchant defined sorting
         * @example JH1YA48MFM7SQPT5
         */
        merchant_sorting?: string;
        /**
         * @description The reference value defined by the merchant for the discount object
         * @example PHFUIOLK
         */
        merchant_reference?: string;
        /**
         * @description The free text description of the discount
         * @example 10% above 10000 NOK
         */
        description?: string;
        /**
         * @description The discount effect as described in amount
         * @example 2464
         */
        amount?: number;
        /**
         * Format: percentage_form
         * @description <code>PERCENTAGE FORM</code> The discount effect as described in percentage, we expect it to be a fraction of 100 eg. 0,15 = 0,15% & 15 = 15%
         * @example 10
         */
        percentage?: number;
      }[];
    };
    /**
     * @description The total price after global discounts before VAT, eg the base amount for VAT, Without fee (Recycling & tip)
     * @example 17740.8
     */
    total_price_without_vat?: number;
    /** @description The additions to total price to get Final price */
    additions: {
      /**
       * @description Total vat amount after global discount
       * @example 4435.2
       */
      total_vat: number;
      /**
       * @description Total tip amount from the payment objects
       * @example 100
       */
      total_tip?: number;
      /**
       * @description Total amount of recycling fee from the article objects
       * @example 200
       */
      total_recycling?: number;
    };
    /**
     * @description Total price after global discount, Without fee (Recycling & tip)
     * @example 22176
     */
    total_price_with_vat?: number;
    /**
     * @description The grand total, including fee (Recycling & tip)
     * @example 22476
     */
    final_price: number;
    /** @description Summarized extra values, For enhanced view representation */
    extra_sum_values?: {
      /**
       * @description The grand total amount after rounding, including fee (Recycling & tip)
       * @example 22476
       */
      final_price_rounded?: number;
      /**
       * @description The total amount of discount (total and articles)
       * @example 8624
       */
      total_discount?: number;
      /**
       * @description The total amount of return from the article objects
       * @example 0
       */
      total_return?: number;
    };
  };
  /** @description Each article in the receipt. Either a sale or return. */
  articles?: {
    /** @description In case of return, point to the zeipt receipt nr with the originaly purchased article that should be returned. */
    reference_of_origin?: {
      /**
       * Format: ulid
       * @description Reference to the receipt (zeipt_receipt_transnr) where the article was purchased.
       * @example 01FPNEJ5C5TGKHZMK4JG82AS76
       */
      reference_of_origin_receipt?: string;
      /**
       * @description The short freetext about the reason for return of article
       * @example Stain on left pillow
       */
      reason_for_return?: string;
    };
    /**
     * @description Set this to true if the article is a return.
     * @default false
     * @example false
     */
    return?: boolean;
    /**
     * @description Set the enum type of this article, this field directly effects the view of the article
     * @example credit
     * @enum {string}
     */
    type?: "credit" | "ticket";
    /**
     * @description The index value for grouping credit/ticket objects to a merchant defined sorting
     * @example JH1YA48MFM7SQPT5
     */
    merchant_sorting?: string;
    /**
     * @description The reference value defined by the merchant for the ticket/credit object
     * @example PHFUIOLK
     */
    merchant_reference?: string;
    /**
     * @description The identifier of this article as set by the merchant.
     * @example 230027A
     */
    art_number?: string;
    /**
     * @description The article group in SAFT format.
     * @example 11
     */
    art_saft_articlegroup_id?: string;
    /**
     * @description The name of the article in free text
     * @example Beige Arnt Sofa
     */
    art_name?: string;
    /**
     * @description Description of the article object in free text
     * @example I tyg
     */
    art_description?: string;
    /** @description Specified info about the article object, used for more specific use cases */
    specified?: {
      /**
       * @description The floor number of the event/room
       * @example 3
       */
      floor_number?: string;
      /**
       * @description The room number of the event/room
       * @example 305
       */
      room_number?: string;
      /**
       * @description The entrence reference of the event/room
       * @example 3A
       */
      entrance?: string;
      /**
       * @description The row number of the event
       * @example 6
       */
      row_number?: string;
      /**
       * @description The seat number of the event
       * @example 22
       */
      seat_number?: string;
      /**
       * Format: date-time
       * @description When the event starts (Taxi, Flight, Hotel stay, Movies, Sports, etc...) (<code>YYYY-MM-DDThh:mm:ss±hh:mm</code> <a href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6"><b>RFC 3339</b></a> format
       * @example 2020-09-15T15:53:00+01:00
       */
      event_start?: string;
      /**
       * Format: date-time
       * @description When the event ends (Taxi, Flight, Movies, Hotel stay, Sports etc...) <code>YYYY-MM-DDThh:mm:ss±hh:mm</code> <a href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6"><b>RFC 3339</b></a> format
       * @example 2020-09-15T15:53:00+01:00
       */
      event_ending?: string;
      /**
       * Format: date-time
       * @description The expiration date of the article, following the <code>YYYY-MM-DDThh:mm:ss±hh:mm</code> <a href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6"><b>RFC 3339</b></a> format
       * @example 2020-09-15T15:53:00+01:00
       */
      expiration_date?: string;
    };
    /** @description Used if geographic description of article event is suitable */
    geographic?: {
      /**
       * @description Suitable reference of departure location if applicable
       * @example OSL
       */
      departure_reference?: string;
      /**
       * @description Suitable reference of arrival location if applicable
       * @example FRA
       */
      arrival_reference?: string;
      /** @description The start location the event (Taxi, Flight, Hotel stay, Movies, Sports etc...) */
      start_location?: {
        /**
         * @description <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"><b>SO 3166-1 alpha 2</b></a> format
         * @example NO
         */
        country_code?: string;
        /**
         * @description The city of the start location of the event.
         * @example Oslo
         */
        city?: string;
        /**
         * @description The zip code of the start location of the event
         * @example 0158
         */
        zip_code?: string;
        /**
         * @description The address of the start location of the event.
         * @example Nedre Vollgate 3
         */
        address?: string;
      };
      /** @description The end location of the event (Taxi, Flight, Hotel stay, Movies, Sports etc...) */
      end_location?: {
        /**
         * @description <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"><b>SO 3166-1 alpha 2</b></a> format
         * @example NO
         */
        country_code?: string;
        /**
         * @description The city of the end location of the event.
         * @example Oslo
         */
        city?: string;
        /**
         * @description The zip code of the end location event.
         * @example 0552
         */
        zip_code?: string;
        /**
         * @description The address of the end location event.
         * @example Olaf Ryes plass
         */
        address?: string;
      };
      /**
       * @description Distance of journey (Taxi, Flight)
       * @example 7
       */
      distance_value?: number;
      /**
       * Format: distance_definition
       * @description Metric or imperial system, The definition of the distance value.
       * @example km
       * @enum {string}
       */
      distance_value_definition?: "km" | "mi";
    };
    /** @description Barcode object, If article object are expected to be able to be used as a ticket/credit object without zeipt system processing */
    bar_codes?: {
      /**
       * Format: scanner_encoding
       * @description The encoding format of the barcode
       * @example code_128
       * @enum {string}
       */
      encoding:
        | "code_128"
        | "code_39"
        | "ean_13"
        | "ean_8"
        | "interleaved_2_of_5"
        | "qr";
      /**
       * Format: id
       * @description The barcode value as read by the barcode reader
       * @example GH7T1Y2H3LKA577HF
       */
      value: string;
      /**
       * @description The barcode value to be visible in your view
       * @example 12848939182
       */
      display_value?: string;
    }[];
    /** @description The original prices before discounts and fees */
    art_original_values?: {
      /**
       * @description Original price per quantity before additions and substractions
       * @example 15400
       */
      quantity_original_price?: number;
      /**
       * @description Total original price for article before additions and substractions
       * @example 30800
       */
      art_original_price?: number;
    };
    /**
     * @description Metric or imperial system, Defines the type of quantity
     * @example stk
     */
    quantity_type?: string;
    /**
     * @description The quantity of the article
     * @example 2
     */
    quantity?: number;
    /** @description The substractions to the article price */
    subtractions?: {
      /** @description Discounts on the article */
      discounts?: {
        /**
         * @description The index value for grouping discount objects to a merchant defined sorting
         * @example JH1YA48MFM7SQPT5
         */
        merchant_sorting?: string;
        /**
         * @description The reference value defined by the merchant for the discount object
         * @example PHFUIOLK
         */
        merchant_reference?: string;
        /**
         * @description The free text description of the discount
         * @example 20 % off på soffa
         */
        description?: string;
        /**
         * @description Set to true if the discount description is on per quantity level
         * @default false
         * @example false
         */
        per_quantity?: boolean;
        /**
         * @description The discount as described in amount
         * @example 3080
         */
        amount?: number;
        /**
         * Format: percentage_form
         * @description <code>PERCENTAGE FORM</code> The discount effect as described in percentage, we expect it to be a fraction of 100 eg. 0,15 = 0,15% & 15 = 15%
         * @example 20
         */
        percentage?: number;
      }[];
    };
    /**
     * @description Price per article, including substractions.
     * @example 9856
     */
    quantity_price_without_vat?: number;
    /**
     * @description The amount after discounts before VAT, eg the base amount for VAT, Without fee (Recycling & tip)
     * @example 19712
     */
    art_price_without_vat?: number;
    /** @description The additions to article price to get Final price */
    additions?: {
      /** @description Article’s VAT. The objects should be grouped by percentage. */
      vat_groups?: {
        /**
         * @description The VAT code as set by the cashier solution
         * @example 1
         */
        code?: string;
        /**
         * @description The national name of the VAT
         * @example MVA
         */
        name?: string;
        /**
         * Format: percentage_form
         * @description <code>PERCENTAGE FORM</code> The VAT as described in percentage, we expect it to be a fraction of 100 eg. 0,15 = 0,15% & 15 = 15%
         * @example 25
         */
        percentage?: number;
        /**
         * @description The base amount the VAT percentage is calculated from
         * @example 19712
         */
        base_amount?: number;
        /**
         * @description The VAT as described in amount
         * @example 4928
         */
        amount?: number;
      }[];
      /**
       * @description Recycling fee per quantity.
       * @example 100
       */
      quantity_recycling_fee?: number;
      /**
       * @description Recycling for the full article object.
       * @example 200
       */
      art_recycling_fee?: number;
    };
    /**
     * @description Price per article, including VAT and substractions.
     * @example 12320
     */
    quantity_price_with_vat?: number;
    /**
     * @description The grand total of the quantity sum with recycling fee included
     * @example 12420
     */
    quantity_final_price?: number;
    /**
     * @description The amount after discounts including vat, Without fee (Recycling & tip)
     * @example 24640
     */
    art_price_with_vat?: number;
    /**
     * @description The grand total of the article sum with recycling fee included
     * @example 24840
     */
    art_final_price?: number;
  }[];
  /** @description Payment methods and their related event description. */
  payments?: {
    /**
     * @description Set to true if this payment object is to be used as identification of the customer. If true the "payment_method_type", "masked_pan", "bank_terminal_id" and "ref_nr" is also required values in the payment object and the receipt will always be saved a minimum of 72h
     * @default false
     * @example false
     */
    identification?: boolean;
    /**
     * @description Set to true to inform that this payment object is an e-commerce checkout, vipps, order application or other types of digital checkouts. And when used together with the "identification" set to true the requirement of the "bank_terminal_id" key is instead ignored
     * @default false
     * @example false
     */
    online?: boolean;
    /**
     * @description The customers application reference numbers in Zeipt systems, when using this payment object as identification you use this array to do an conditional lookup, allowing only users belonging to these applications to be linked to the receipt during this lookup with this identification
     * @example [
     *   "70bf66b9-1b65-4e07-ad7b-a8fcd77fcb44"
     * ]
     */
    application_ownerships?: string[];
    /**
     * Format: payment_method
     * @description Type of payment
     * @example credit_card
     * @enum {string}
     */
    payment_method:
      | "credit_card"
      | "debit_card"
      | "cash"
      | "credit_bank"
      | "debit_bank"
      | "own_defined"
      | string;
    /** @description If you want the Zeipt system to parse the raw data you get in return from the payment service provider, you add it here <code>Note:</code> That the service provider needs to also be stated */
    service_provider?: {
      /**
       * @description The "terminal text", "bax data", "terminal string", "EMV data" or other names for the return string of data from the psp
       * @example something "terminal text"
       */
      terminal_data: string;
      /**
       * @description The payment processor used for this payment object. <code>Note:</code> This defines what parser we user
       * @example verifone
       * @enum {string}
       */
      type: "verifone" | "nets";
    };
    /**
     * Format: payment_type
     * @description The payment scheme
     * @example bankaxept
     * @enum {string}
     */
    payment_method_type?:
      | "bankaxept"
      | "visa"
      | "mastercard"
      | "amex"
      | "point_scheme"
      | "gift_card"
      | "other"
      | string;
    /**
     * @description The issuer of the payment scheme
     * @example Bank Norwegian
     */
    payment_method_owner?: string;
    /**
     * Format: currency
     * @description <a href="https://en.wikipedia.org/wiki/ISO_4217"><b>ISO 4217</b></a> format, The currency used in this payment transaction.
     * @example NOK
     */
    currency: string;
    /**
     * @description Exchange rate at the time of the transaction between total_currency and currency.
     * @example 1
     */
    exchange_rate?: number;
    /**
     * @description If true, the payment object is seen as beeing a payment back to the customer with the associated payment method.
     * @default false
     * @example false
     */
    moneyback?: boolean;
    /**
     * @description First 6 or 8 digits of the card number "The issuer number"
     * @example 492586
     */
    issuer?: string;
    /**
     * Format: masked-pan
     * @description The last four or six digits of the customer's card or bank account. Depending on the type of payment process
     * @example 1234
     */
    masked_pan?: string;
    /** @description To define details around the gift credits used as a payment medium during this transaction */
    credit?: {
      /**
       * @description The index value for grouping credit/ticket objects to a merchant defined sorting
       * @example JH1YA48MFM7SQPT5
       */
      merchant_sorting?: string;
      /**
       * @description The reference value defined by the merchant for the ticket/credit object
       * @example PHFUIOLK
       */
      merchant_reference?: string;
    };
    /** @description Use to define what point object to withdraw points from when processing the receipt */
    point_scheme?: {
      /**
       * @description The index value for grouping point objects to a merchant defined sorting
       * @example JH1YA48MFM7SQPT5
       */
      merchant_sorting?: string;
      /**
       * @description The reference passed in by the merchant for a point object that has been created
       * @example 01FPNEDK7CYG9KDZSWAH71JGFP
       */
      merchant_reference?: string;
      /**
       * @description The points to be withdrawn from the point_object_reference
       * @example 0
       */
      points?: number;
      /**
       * @description The name of the points defined by the scheme owner
       * @example cups
       */
      points_name?: string;
    };
    /**
     * Format: date-time-payment
     * @description Follows at minimum this format '<code>YYYY-MM-DDThh:mm</code> and it is expected that if no timezone is stated that time is UTC <a href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6"><b>RFC 3339</b></a> format'
     * @example 2020-09-15T15:53:00+01:00
     */
    timestamp: string;
    /**
     * @description The unique identifier of the bank terminal for the payment service provider used.
     * @example 12329911
     */
    bank_terminal_id?: string;
    /**
     * @description The unique identifier of the merchant for the service provider used.
     * @example 324295
     */
    national_merchant_number?: string;
    /**
     * Format: authorization_payment
     * @description Unique authorization code from the payment scheme indicating that the payment has been approved by the issuing bank (Visa, Mastercard, Amex etc.). When the "payment_scheme" is "visa","mastercard" or "amex" this field is expected to follow the <a href="https://en.wikipedia.org/wiki/ISO_8583"><b>ISO 8583</b></a> data field 38 format as a 6 alphanumeric value
     * @example 447247
     */
    auth_code?: string;
    /**
     * Format: rrn_payment
     * @description The unique retrieval reference number of the transaction from the payment scheme (Visa, Mastercard, Amex etc.) also called RRN number. When the "payment_method_type" is "visa","mastercard" or "amex" this field is validated to follow the <a href="https://en.wikipedia.org/wiki/ISO_8583"><b>ISO 8583</b></a> data field 37 format as a 12 alphanumeric value
     * @example 567734443372
     */
    ref_nr?: string;
    /**
     * @description The AID number of the payment scheme (Visa, Mastercard, Amex etc.)
     * @example D5780000021010
     */
    aid_nr?: string;
    /**
     * @description Unique response code defining in what way the payment was accepted or declined from the payment service provider (Checkout provider)
     * @example 8000048000
     */
    tvr_nr?: string;
    /**
     * @description Unique response code defining at what stage the payment process was accepted or declined from the payment service provider (Checkout provider)
     * @example 6800
     */
    tsi_nr?: string;
    /**
     * @description Unique response code defining if the payment was accepted or declined from the payment scheme (Visa, Mastercard, Amex etc.)
     * @example 00
     */
    response_code?: string;
    /**
     * @description Amount of tip in this payment.
     * @example 100
     */
    tip_amount?: number;
    /**
     * @description The total amount paid in this transaction, including VAT and rounded (if applicable)
     * @example 22476
     */
    payment_amount: number;
  }[];
  /** @description The invoice object if suitable to be passed to users interface */
  invoices?: {
    /**
     * @description The internal reference number of a specific application in Zeipt system to be the only one to receive these invoice objects
     * @example [
     *   "70bf66b9-1b65-4e07-ad7b-a8fcd77fcb44"
     * ]
     */
    application_ownerships?: string[];
    /**
     * @description The invoice number as set by the seller.
     * @example IN212390
     */
    invoice_number: string;
    /**
     * @description The account number as set by the seller.
     * @example 8601 1117 947
     */
    account_number: string;
    /**
     * @description The national invoice number if used by the seller
     * @example 788694079543
     */
    national_customer_invoice_number?: string;
    /**
     * Format: date-time
     * @description Due date of the invoice, following the <code>YYYY-MM-DDThh:mm:ss±hh:mm</code> <a href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6"><b>RFC 3339</b></a> format.
     * @example 2020-09-15T15:53:00+01:00
     */
    due_date: string;
    /**
     * Format: currency
     * @description Currency set by the seller <a href="https://en.wikipedia.org/wiki/ISO_4217"><b>ISO 4217</b></a> format.
     * @example NOK
     */
    currency: string;
    /**
     * @description The vat amount as set by the seller.
     * @example 0
     */
    vat_amount: number;
    /**
     * Format: percentage_form
     * @description <code>PERCENTAGE FORM</code> The vat percentage as set by the seller, we expect it to be a fraction of 100 eg. 0,15 = 0,15% & 15 = 15%
     * @example 0
     */
    vat_percentage?: number;
    /**
     * @description The total payment amount as set by the seller.
     * @example 0
     */
    payment_amount: number;
    /** @description If the seller is someone else than stated in the merchant object, overide in the creation of the invoice object with these values */
    seller?: {
      /**
       * @description The organization / VAT identification number of the seller, <a href="https://en.wikipedia.org/wiki/VAT_identification_number"><b>VAT ID</b></a>
       * @example 916809026MVA
       */
      org_number?: string;
      /**
       * @description <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"><b>SO 3166-1 alpha 2</b></a> format
       * @example NO
       */
      country_code?: string;
      contact_info?: {
        /**
         * @description <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"><b>SO 3166-1 alpha 2</b></a> format
         * @example NO
         */
        country_code?: string;
        /**
         * @description The city of the purchase location.
         * @example Oslo
         */
        city?: string;
        /**
         * @description The zip code of the purchase location.
         * @example 0254
         */
        zip_code?: string;
        /**
         * @description The address of the purchase location.
         * @example Veien 23
         */
        address?: string;
        /**
         * @description Name of the purchase location
         * @example Shop&Go
         */
        name?: string;
        /**
         * Format: email
         * @description The store's email address, <a href="https://en.wikipedia.org/wiki/Email_address"><b>Email</b></a> format
         * @example store@example.com
         */
        email?: string;
        /** @description The store's phone number. */
        telephone?: {
          /**
           * Format: calling_code
           * @description The phone number country code <a href="https://en.wikipedia.org/wiki/E.123"><b>E.123</b></a> format
           * @example +47
           */
          country_calling_code?: string;
          /**
           * Format: tele_number
           * @description The phone number, <a href="https://en.wikipedia.org/wiki/E.123"><b>E.123</b></a> format
           * @example 97419601
           */
          number?: string;
        };
        /**
         * Format: url
         * @description The store's website.
         * @example https://www.example.com
         */
        website?: string;
      };
    };
  }[];
  /** @description Extra values that can benefit the user experience of the receipt, often found at the bottom of the receipt. */
  extra_receipt_view?: {
    /** @description The bar and/or qr code for relating to the receipt object. */
    bar_code?: {
      /**
       * Format: bar_code_encoding
       * @description The encoding standard you want the application to use when building the barcode view
       * @example code_128
       * @enum {string}
       */
      encoding:
        | "code_128"
        | "code_39"
        | "ean_13"
        | "ean_8"
        | "interleaved_2_of_5"
        | "qr";
      /**
       * Format: id
       * @description Data of the barcode when read
       * @example Z1n0flmEOO
       */
      value: string;
      /**
       * @description The text to be shown for barcode value
       * @example SG15623489202
       */
      display_value?: string;
    };
    return_policy?: {
      /**
       * Format: date-time
       * @description <code>YYYY-MM-DDThh:mm:ss±hh:mm</code> <a href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6"><b>RFC 3339</b></a> format
       * @example 2020-09-15T15:53:00+01:00
       */
      policy_end_date?: string;
      /**
       * @description Text describing the return policy to be shown on the receipt.
       * @example 30 days return
       */
      policy_description?: string;
    };
    /** @description The description of customer buyer if suitable to use, Some edge cases require it as per tax authority policy */
    customer_buyers?: {
      /**
       * @description First name of customer
       * @example John
       */
      customer_first_name?: string;
      /**
       * @description Surname of customer
       * @example Oliverson
       */
      customer_surname?: string;
      customer_telephone?: {
        /**
         * Format: calling_code
         * @description The phone number country code <a href="https://en.wikipedia.org/wiki/E.123"><b>E.123</b></a> format
         * @example +47
         */
        country_calling_code?: string;
        /**
         * Format: tele_number
         * @description The phone number, <a href="https://en.wikipedia.org/wiki/E.123"><b>E.123</b></a> format
         * @example 97419601
         */
        number?: string;
      };
    }[];
    /** @description The description of company buyer if suitable */
    company_buyers?: {
      /**
       * @description The organization / VAT identification number of the seller, <a href="https://en.wikipedia.org/wiki/VAT_identification_number"><b>VAT ID</b></a>
       * @example 9895852299
       */
      company_number?: string;
      /**
       * @description <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"><b>SO 3166-1 alpha 2</b></a> format
       * @example NO
       */
      company_country_code?: string;
      /**
       * @description The legal company name of company
       * @example Snabb Snickare
       */
      company_name?: string;
      /**
       * @description The Suffix of company name eg AS, AB, limited etc...
       * @example AS
       */
      company_suffix?: string;
      /**
       * @description The common name of company if applicable
       * @example Snickare Andersson
       */
      company_common_name?: string;
    }[];
    /**
     * @description The ID of the seller.
     * @example 444
     */
    seller_id?: string;
    /**
     * @description The name of the seller.
     * @example Sibban
     */
    seller_name?: string;
    /**
     * @description The ID of the operator.
     * @example 432
     */
    operator_id?: string;
    /**
     * @description The name of the operator.
     * @example Sebastian
     */
    operator_name?: string;
    /**
     * @description Operator's message to be displayed on the receipt.
     * @example You have been serviced by Lennart
     */
    operator_text?: string;
    /**
     * @description Message to be displayed at the bottom of receipt. The only line allowed to be longer than 60 characters.
     * @example Thank you, come again
     */
    cashier_goodbye_message?: string;
    /**
     * @description Opening hours of associated store.
     * @example Man-Fri: 07.00-24.00 Sat-Sun: 08.00-24.00
     */
    opening_hours?: string;
  };
  /** @description Extra values to initiate the Zeipt system logic that can extend the user experience of the receipt. */
  extended_receipt_logic?: {
    /** @description Use to generate a discount for the purchase that all receivers of the receipt can use in store. */
    discounts?: {
      /**
       * @description The index value for grouping discount objects to a merchant defined sorting
       * @example JH1YA48MFM7SQPT5
       */
      merchant_sorting?: string;
      /**
       * @description The reference passed in by the merchant for the discount object
       * @example 01FPNEDK7CYG9KDZSWAH71JGFP
       */
      merchant_reference?: string;
      /**
       * @description The internal reference number of a specific application in Zeipt system to be the only one to receive these discount objects
       * @example [
       *   "70bf66b9-1b65-4e07-ad7b-a8fcd77fcb44"
       * ]
       */
      application_ownerships?: string[];
      /**
       * Format: date-time
       * @description The expiration date set by the seller, follows the <code>YYYY-MM-DDThh:mm:ss±hh:mm</code> <a href="https://datatracker.ietf.org/doc/html/rfc3339#section-5.6"><b>RFC 3339</b></a> format
       * @example 2020-09-15T15:53:00+01:00
       */
      expiration_date?: string;
      /**
       * @description To create a discount object
       * @example 0
       */
      amount?: number;
      /**
       * Format: percentage_form
       * @description <code>PERCENTAGE FORM</code> The discount effect as described in percentage, we expect it to be a fraction of 100 eg. 0,15 = 0,15% & 15 = 15%
       * @example 0
       */
      percentage?: number;
      /**
       * @description The art_number values this object is discounting for
       * @example [
       *   "230027A",
       *   "260142V",
       *   "etc..."
       * ]
       */
      art_numbers?: string[];
      /** @description The bar and/or qr code to be visible for the discount object in view. */
      bar_code?: {
        /**
         * Format: scanner_encoding
         * @description The encoding standard you want the application to use when building the barcode view
         * @example code_128
         * @enum {string}
         */
        encoding:
          | "code_128"
          | "code_39"
          | "ean_13"
          | "ean_8"
          | "interleaved_2_of_5"
          | "qr";
        /**
         * Format: id
         * @description Value of the barcode when read
         * @example 678JABCDEFG90123JAB4
         */
        value: string;
        /**
         * @description The text to be shown for barcode value
         * @example 123585939
         */
        display_value?: string;
      };
    }[];
    /** @description Used for creating a point object for the receiver of the receipt for example a coffe card, <code>note</code> the requesting merchant needs to be own or be assigned to the point scheme */
    create_point_scheme?: {
      /**
       * @description The index value for grouping point objects to a merchant defined sorting
       * @example JH1YA48MFM7SQPT5
       */
      merchant_sorting?: string;
      /**
       * @description The reference passed in by the merchant for a point object that has been created
       * @example 01FPNEDK7CYG9KDZSWAH71JGFP
       */
      merchant_reference?: string;
      /**
       * @description The points to be added, when creating the point object "point_object_reference" for this point_scheme
       * @example 0
       */
      points?: number;
      /**
       * @description The name of the points defined by the scheme owner
       * @example cups
       */
      points_name?: string;
      /**
       * @description The internal reference number of a specific application in Zeipt system to be the only one to receive the point object created for this point scheme
       * @example [
       *   "70bf66b9-1b65-4e07-ad7b-a8fcd77fcb44"
       * ]
       */
      application_ownerships?: string[];
    }[];
    /** @description Used for adding points to a point object "point_object_reference" for the receiver of the receipt for example a coffe card, <code>note</code> the requesting merchant needs to be own or be assigned to the point scheme */
    add_scheme_points?: {
      /**
       * @description The index value for grouping point objects to a merchant defined sorting
       * @example JH1YA48MFM7SQPT5
       */
      merchant_sorting?: string;
      /**
       * @description The reference passed in by the merchant for a point object that it controls that is targeted for this addition
       * @example 01FPNEDK7CYG9KDZSWAH71JGFP
       */
      merchant_reference?: string;
      /**
       * @description The points to be added, to the point object "point_object_reference" for this point_scheme
       * @example 0
       */
      points?: number;
      /**
       * @description The name of the points defined by the scheme owner
       * @example cups
       */
      points_name?: string;
      /**
       * @description The internal reference number of a specific application in Zeipt system to be the only one to receive the point object created for this point scheme
       * @example [
       *   "70bf66b9-1b65-4e07-ad7b-a8fcd77fcb44"
       * ]
       */
      application_ownerships?: string[];
    }[];
    /** @description The created external url address customer flows, the generated OTK is found after the ? character, follows our <b>OTK<b> (One Time Key) format */
    external_view_logics?: {
      /**
       * Format: ulid
       * @description Reference to a thirdparty logic object created for this merchant, when filled in the external view created will follow that objects setup.
       * @example 01FPNEEAXA8HHEZQQ8CFMXYZKS
       */
      logic: string;
    }[];
  };
}
