export interface Receipt {
	version: string
	timestamp: string
	receipt_number: string
	receipt_type: string
	zeipt_receipt_transnr?: string
	receipt_description?: string
	receipt_producer_certificate?: string
	relate_order_numbers?: string[]
	merchant: Merchant
	total: Total
	articles?: Article[]
	payments: Payment[]
	invoices?: Invoice[]
	extra_receipt_view?: ExtraReceiptView
	extended_receipt_logic?: ExtendedReceiptLogic
}

export interface Merchant {
	merchant_number: string
	org_number: string
	merchant_country_code: string
	purchase_location: PurchaseLocation
	travel_reference?: TravelReference
	telephone?: Telephone
	email?: string
	website?: string
}

export interface PurchaseLocation {
	purchase_country_code: string
	city: string
	zip_code: string
	address: string
	store_name: string
	cashier_number?: string
	store_number?: string
}

export interface Telephone {
	country_calling_code: string
	number: string
}

export interface TravelReference {
	travel_driver_id: string
	travel_driver_name: string
	car_license_plate: string
	travel_driver_certification?: string
	travel_company_certification?: string
}

export interface Total {
	total_moneyback: boolean
	total_currency: string
	additions: Additions
	final_price: number
	extra_sum_values: ExtraSumValues
	payment_method_array: PaymentMethodArray[]
	total_vat_name?: string
	total_art_price_with_vat?: number
	subtractions?: Subtractions
	total_price_without_vat?: number
	total_price_with_vat?: number
	total_vat_amount_array?: TotalVatAmountArray[]
	art_vat_amount_array?: ArtVatAmountArray[]
	art_return_vat_amount_array?: ArtReturnVatAmountArray[]
	payment_moneyback_method_array?: PaymentMoneybackMethodArray[]
}

export interface Subtractions {
	discounts?: Discount[]
}

export interface Discount {
	merchant_sorting?: string
	merchant_reference?: string
	description?: string
	amount?: number
	percentage?: number
}

export interface Additions {
	total_vat: number
	total_tip?: number
	total_recycling?: number
}

export interface ExtraSumValues {
	final_price_rounded: number
	total_discount?: number
	total_return?: number
}

export interface TotalVatAmountArray {
	percentage?: number
	base_amount?: number
	amount?: number
}

export interface ArtVatAmountArray {
	percentage?: number
	base_amount?: number
	amount?: number
}

export interface ArtReturnVatAmountArray {
	percentage?: number
	base_amount?: number
	amount?: number
}

export interface PaymentMethodArray {
	method: string
	currency: string
	amount: number
}

export interface PaymentMoneybackMethodArray {
	method: string
	currency: string
	amount: number
}

export interface Article {
	reference_of_origin?: ReferenceOfOrigin
	return?: boolean
	type?: string
	merchant_sorting?: string
	merchant_reference?: string
	art_number?: string
	art_saft_articlegroup_id?: string
	art_name?: string
	art_description?: string
	specified?: Specified
	geographic?: Geographic
	bar_codes?: BarCode[]
	art_original_values?: ArtOriginalValues
	quantity_type?: string
	quantity?: number
	subtractions?: Subtractions2
	quantity_price_without_vat?: number
	art_price_without_vat?: number
	additions?: Additions2
	quantity_price_with_vat?: number
	quantity_final_price?: number
	art_price_with_vat?: number
	art_final_price?: number
}

export interface ReferenceOfOrigin {
	reference_of_origin_receipt?: string
	reason_for_return?: string
}

export interface Specified {
	floor_number?: string
	room_number?: string
	entrance?: string
	row_number?: string
	seat_number?: string
	event_start?: string
	event_ending?: string
	expiration_date?: string
}

export interface Geographic {
	departure_reference?: string
	arrival_reference?: string
	start_location?: StartLocation
	end_location?: EndLocation
	distance_value?: number
	distance_value_definition?: string
}

export interface StartLocation {
	country_code?: string
	city?: string
	zip_code?: string
	address?: string
}

export interface EndLocation {
	country_code?: string
	city?: string
	zip_code?: string
	address?: string
}

export interface BarCode {
	encoding: string
	value: string
	display_value?: string
}

export interface ArtOriginalValues {
	quantity_original_price?: number
	art_original_price?: number
}

export interface Subtractions2 {
	discounts?: Discount2[]
}

export interface Discount2 {
	merchant_sorting?: string
	merchant_reference?: string
	description?: string
	per_quantity?: boolean
	amount?: number
	percentage?: number
}

export interface Additions2 {
	vat_groups?: VatGroup[]
	quantity_recycling_fee?: number
	art_recycling_fee?: number
}

export interface VatGroup {
	code?: string
	name?: string
	percentage?: number
	base_amount?: number
	amount?: number
}

export interface Payment {
	payment_method: string
	currency: string
	moneyback: boolean
	timestamp: string
	payment_amount?: number
	payment_method_type?: string
	payment_method_owner?: string
	exchange_rate?: number
	masked_pan?: string
	credit?: Credit
	point_scheme?: PointScheme
	bank_terminal_id?: string
	national_merchant_number?: string
	ref_nr?: string
	aid_nr?: string
	tvr_nr?: string
	tsi_nr?: string
	response_code?: string
	tip_amount?: number	
}

export interface Credit {
	merchant_sorting?: string
	merchant_reference?: string
}

export interface PointScheme {
	merchant_reference?: string
	merchant_sorting?: string
	points?: number
	points_name?: string
}

export interface Invoice {
	invoice_number: string
	account_number: string
	national_customer_invoice_number: string
	due_date: string
	currency: string
	vat_amount: number
	vat_percentage?: number
	payment_amount: number
	seller?: Seller
}

export interface Seller {
	org_number?: string
	country_code?: string
	contact_info?: ContactInfo
}

export interface ContactInfo {
	country_code?: string
	city?: string
	zip_code?: string
	address?: string
	name?: string
	email?: string
	telephone?: Telephone2
	website?: string
}

export interface Telephone2 {
	country_calling_code?: string
	number?: string
}

export interface ExtraReceiptView {
	bar_code?: BarCode2
	merchant_logo_uri?: string
	merchant_thumbnail_uri?: string
	return_policy?: ReturnPolicy
	customer_buyers?: CustomerBuyer[]
	company_buyers?: CompanyBuyer[]
	seller_id?: string
	seller_name?: string
	operator_id?: string
	operator_name?: string
	operator_text?: string
	cashier_goodbye_message?: string
	opening_hours?: string
}

export interface BarCode2 {
	encoding: string
	value: string
	display_value?: string
}

export interface ReturnPolicy {
	policy_end_date?: string
	policy_description?: string
}

export interface CustomerBuyer {
	customer_first_name?: string
	customer_surname?: string
	customer_telephone?: CustomerTelephone
}

export interface CustomerTelephone {
	country_calling_code?: string
	number?: string
}

export interface CompanyBuyer {
	company_number?: string
	company_country_code?: string
	company_name?: string
	company_suffix?: string
	company_common_name?: string
}

export interface ExtendedReceiptLogic {
	discounts?: Discount3[]
	create_point_scheme?: CreatePointScheme[]
	add_scheme_points?: AddSchemePoint[]
	external_view_logics?: ExternalViewLogic[]
}

export interface Discount3 {
	merchant_sorting?: string
	merchant_reference?: string
	expiration_date?: string
	amount?: number
	percentage?: number
	art_numbers?: string[]
	bar_code?: BarCode3
}

export interface BarCode3 {
	encoding: string
	value: string
	display_value?: string
}

export interface CreatePointScheme {
	merchant_sorting?: string
	merchant_reference?: string
	points?: number
	points_name?: string
}

export interface AddSchemePoint {
	merchant_sorting?: string
	merchant_reference?: string
	points?: number
	points_name?: string
}

export interface ExternalViewLogic {
	external_url_address?: string
	external_url_type?: string
	logic: string
	expiration_date?: string
}
