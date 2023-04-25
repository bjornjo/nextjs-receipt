import { GetServerSideProps } from 'next';
import bwipjs from 'bwip-js';
import { Receipt } from '@/utils/types/receipt';
import logo from "../../public/zeipt.png";
import regnskogfondet from "../../public/regnskogfondet.png";
import QRCode from "react-qr-code";
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const Home = (props: any) => {

  const [popupOpen, showPopup] = useState({ type: "", index: -1 })
  const [isLoading, setIsLoading] = useState(false);
  const receiptExample: Receipt = {
    "total": {
      "additions": {
        "total_vat": 0,
      },
      "final_price": 0,
      "total_currency": "",
      "total_moneyback": false,
      "extra_sum_values": {
        "final_price_rounded": 0
      },

      "payment_method_array": [
        {
          "amount": 0,
          "method": "",
          "currency": ""
        }
      ]
    },
    "version": "",
    "merchant": {
      "org_number": "",
      "merchant_number": "",
      "merchant_country_code": "EN",
      "purchase_location": {
        "purchase_country_code": "",
        "city": "",
        "zip_code": "",
        "address": "",
        "store_name": "",
      }
    },
    "payments": [
      {
        "currency": "",
        "moneyback": false,
        "timestamp": "",
        "payment_method": ""
      }
    ],
    "timestamp": "",
    "receipt_type": "",
    "receipt_number": "",
    "receipt_producer_certificate": ""
  }
  const [receipt, setReceipt] = useState(props.preview ? receiptExample as Receipt : props.receipt[0] as Receipt)
  console.log(props.preview, "props.preview");


  let discounts = props.discounts as any,
    bar_code = props.bar_code as any,
    tickets = props.tickets as any,
    lang = props.lang as any,
    template = props.template as any,
    pdf = props.pdf as boolean,
    preview = props.preview as boolean

  console.log(receipt);
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      setReceipt(event.data);
      console.log(event.data);
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const openPopup = (type: any, index?: number) => {
    showPopup({ type: type, index: index !== undefined ? index : -1 })
  };
  const handleClick = async () => {
    setIsLoading(true);

    try {
      const url = `${window.location.href}`.replace("pdf=false", "pdf=true");
      const response = await fetch(`/api/pdf?url=${encodeURIComponent(url)}`);
      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = pdfUrl;
      const date =
        new Date(
          receipt.timestamp.substring(0, 19)
        ).toLocaleDateString(receipt.merchant.merchant_country_code, { year: "numeric", month: "numeric", day: "numeric" })

      link.download = `${date}-${receipt.merchant.purchase_location?.store_name}-${receipt.receipt_number}.pdf`;
      link.click();
    } catch (error) {
      console.error(error);
      alert('An error occurred while generating the PDF');
    }

    setIsLoading(false);
  };

  return (

    <div className={"template template-" + template} >

      <div className="wrapper" >
        <div className="receipt-wrapper">
          <div className="receipt">


            {/* Merchant logo */}
            <div className="receipt-header split" style={{ alignItems: "center" }}>
              <img className='merchant-logo' src={logo.src} alt="Merchant logo" />
              {(!pdf && !preview) &&
                <button className='tag button' disabled={isLoading} onClick={handleClick} style={{
                  padding: 5,
                  margin: '0px !important'
                }}>
                  {lang == "no" ?
                    isLoading ? 'Laster ned...' : 'Last ned PDF'
                    :
                    isLoading ? 'Downloading...' : 'Download PDF'
                  }
                </button>
              }
            </div>

            {/* Merchant name */}
            <div className="box head" >
              <h2 style={{ margin: 0 }}>{receipt.merchant.purchase_location?.store_name}</h2>
            </div>

            {/* Receipt info header */}
            <div className="box">

              <div className="flex">
                <div className="text-group">
                  <h5>{lang == "no" ? "Organisasjonsnr" : "Organization nr"}</h5>
                  <p>{receipt.merchant.org_number}</p>
                </div>
                <div className="text-grou">
                  <h5>{lang == "no" ? "Kvitteringsnr" : "Receipt nr"}</h5>

                  <p>{receipt.receipt_number}</p>
                </div>
              </div>

              <div className="flex">
                <div className="text-group">
                  <h5>{lang == "no" ? "Adresse" : "Address"}</h5>
                  <p>{receipt.merchant.purchase_location?.address},</p>
                  <p>{receipt.merchant.purchase_location?.zip_code &&
                    receipt.merchant.purchase_location?.zip_code +
                    ", "}
                    {receipt.merchant.purchase_location?.city}, {receipt.merchant.purchase_location?.purchase_country_code}</p>
                </div>
                <div className="text-group">
                  <h5>{lang == "no" ? "Dato" : "Date"}</h5>
                  <p>
                    {new Date(
                      receipt.timestamp.substring(0, 19)
                    ).toLocaleDateString(receipt.merchant.merchant_country_code, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })}
                  </p>
                </div>
              </div>

              {(receipt.merchant.telephone || receipt.merchant.email) &&
                <div className='flex'>
                  {receipt.merchant.email &&
                    <div className='text-group'>
                      <h5>{lang == "no" ? "Epost" : "Email"}</h5>
                      <p>{receipt.merchant.email}</p>
                    </div>
                  }
                  {receipt.merchant.telephone &&
                    <div className='text-group'>
                      <h5>{lang == "no" ? "Telefon" : "Phone"}</h5>
                      <p>{receipt.merchant.telephone.country_calling_code +
                        " " +
                        receipt.merchant.telephone?.number}</p>
                    </div>
                  }
                </div>
              }

              <div className='flex'>
                {receipt.merchant.website &&
                  <div className='text-group'>
                    <h5>{lang == "no" ? "Nettside" : "Website"}</h5>
                    <a target={"_blank"} href={"https://" + receipt.merchant.website}>
                      <p>{receipt.merchant.website}</p>
                    </a>
                  </div>

                }

                {receipt.relate_order_numbers && receipt.relate_order_numbers.length > 0 &&
                  <div className='text-group'>
                    <h5>{lang == "no" ? "Ordrenr" : "Order nr"}</h5>
                    {receipt.relate_order_numbers.map(function (ordernr, index) {
                      return (
                        <p key={"ordernr-" + index}>{ordernr} </p>
                      )
                    })}
                  </div>
                }
              </div>

            </div>

            {/* Article header */}
            {receipt.articles &&
              <div className="box head">
                <div className="split">
                  <h5><span>{lang == "no" ? "Artikkel" : "Article"}</span></h5>
                  <h5><span>{lang == "no" ? "Beløp" : "Sum"}</span></h5>
                </div>
              </div>
            }

            {/* Articles */}
            {receipt.articles && receipt.articles.map((article, index) => {
              return <Article key={"article-" + index} index={index} article={article} lang={lang} receipt={receipt} pdf={pdf} openPopup={openPopup} />
            })}



            {/* Total */}
            <div className="box head">

              <div className="split">
                <p>{lang == "no" ? "Totalsum" : "Total sum"}</p>
                <p className="amount">
                  {parseFloat(receipt.total.final_price.toString()).toLocaleString(receipt.merchant.merchant_country_code, {
                    useGrouping: true,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              {/* Show discounts */}
              {(!pdf && receipt.extended_receipt_logic?.discounts) &&
                <div className='tag button' onClick={() => openPopup("discounts")}>
                  {lang == "no" ? "Vis rabatter" : "Show discounts"}</div>
              }


            </div>

            {/* MVA */}
            <div className="box">

              <div className="split">
                <p>{receipt.total.total_vat_name ? receipt.total.total_vat_name : "VAT"}</p>
                <p className="amount">
                  {parseFloat(receipt.total.additions.total_vat.toString()).toLocaleString(receipt.merchant.merchant_country_code, {
                    useGrouping: true,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              {receipt.total.art_vat_amount_array &&
                <div className='split' style={{ marginTop: '10px' }}>
                  <h5>{receipt.total.total_vat_name} %</h5>
                  <h5>{lang == "no" ? "Grunnlag" : "Base"}</h5>
                  <h5>{lang == "no" ? "Totalt" : "Total"}</h5>
                </div>}
              {receipt.total.art_vat_amount_array && receipt.total.art_vat_amount_array.map((vat, index) => {
                return (
                  <div className='split' key={"mvagroup-" + index}>
                    {/* Percentage */}
                    <p className="amount small">{
                      parseFloat((vat.percentage || 0).toString())
                        .toLocaleString(receipt.merchant.merchant_country_code, {
                          useGrouping: true,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                    </p>
                    {/* Base */}
                    <p className="amount small">{
                      parseFloat((vat.base_amount || 0).toString())
                        .toLocaleString(receipt.merchant.merchant_country_code, {
                          useGrouping: true,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}</p>
                    {/* Total */}
                    <p className="amount small">{
                      parseFloat((vat.amount || 0).toString())
                        .toLocaleString(receipt.merchant.merchant_country_code, {
                          useGrouping: true,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}</p>
                  </div>
                )
              })}
            </div>

            {/* Payments */}
            {receipt.payments.map((payment, index) => {
              return (

                <div className="box" key={"payment-" + index}>
                  <div className='split'>
                    <div>
                      <p>{lang == "no" ? "Betaling" : "Payment"}</p>
                    </div>
                    <div>
                      <p className="amount">
                        {payment.moneyback === true && "-"}
                        {parseFloat((payment.payment_amount || 0).toString()).toLocaleString(receipt.merchant.merchant_country_code, {
                          useGrouping: true,
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}</p>
                    </div>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    {!!payment.payment_method && <p className="amount small">{payment.payment_method}</p>}
                    {!!payment.timestamp && <p className="amount small">{new Date(payment.timestamp).toLocaleDateString(receipt.merchant.merchant_country_code, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })}</p>}
                    {!!(payment.national_merchant_number && payment.national_merchant_number) && <p className="amount small">Bax: {payment.national_merchant_number} -{" "}{payment.bank_terminal_id}</p>}
                    {!!payment.payment_method_type && <p className="amount small">{payment.payment_method_type}</p>}
                    {!!payment.payment_method_owner && <p className="amount small">{payment.payment_method_owner}</p>}
                    {!!payment.masked_pan && <p className="amount small">{payment.masked_pan}</p>}
                    {!!payment.aid_nr && <p className="amount small">AID: {payment.aid_nr}</p>}
                    {!!payment.tvr_nr && <p className="amount small">TVR: {payment.tvr_nr}</p>}
                    {!!payment.tsi_nr && <p className="amount small">TSI: {payment.tsi_nr}</p>}
                    {!!payment.ref_nr && <p className="amount small">Ref.: {payment.ref_nr}</p>}
                    {!!payment.response_code && <p className="amount small">{lang == "no" ? "Respons: " : "Response: "}{payment.response_code}</p>}
                    {!!payment.currency && <p className="amount small">{payment.currency}</p>}
                    {!!payment.payment_amount && <p className="amount small">{payment.payment_amount}</p>}
                    {!!payment.tip_amount && <p className="amount small">+ {payment.tip_amount} tips</p>}
                  </div>
                </div>
              )
            })}

            {/* Goodbye message */}
            {(receipt.extra_receipt_view?.cashier_goodbye_message || receipt.extra_receipt_view?.opening_hours) &&
              <div className="box white">
                {receipt.extra_receipt_view?.cashier_goodbye_message && <h5>{receipt.extra_receipt_view?.cashier_goodbye_message}<br /><br /></h5>}
                {receipt.extra_receipt_view?.opening_hours && <h5>{lang == "no" ? "Åpningstider: " : "Opening hours: "}<br></br>
                  {receipt.extra_receipt_view?.opening_hours}</h5>}
              </div>
            }

            {/* Regnskogfondet */}
            <div className="box" style={{ background: 'none' }}>

              <img className='merchant-logo' src={regnskogfondet.src} alt="Regnskogsfondet logo" />

              <h5>{lang == "no" ? "Ingen trær ble skadet med denne kvitteringen" : "No trees were harmed with this receipt"}</h5>
            </div>

            {/* Return / bar code */}
            {((receipt.extra_receipt_view?.return_policy?.policy_description ||
              receipt.extra_receipt_view?.return_policy?.policy_end_date ||
              receipt.extra_receipt_view?.bar_code?.value)) ?
              <div className="box">

                {receipt.extra_receipt_view?.return_policy?.policy_description &&
                  <div style={{ marginBottom: 10 }}>
                    <h5>{lang == "no" ? "Returpolicy" : "Return policy"}</h5>
                    <p>{receipt.extra_receipt_view?.return_policy?.policy_description}</p>
                  </div>
                }
                {/* Policy end date */}
                {receipt.extra_receipt_view?.return_policy?.policy_end_date &&
                  <div style={{ marginBottom: 10 }}>
                    <h5>
                      {lang == "no" ? "Siste dag for retur: " : "Last day of return: "}
                    </h5>
                    <p style={{ fontSize: '12px' }}>

                      {new Date(
                        receipt.extra_receipt_view?.return_policy?.policy_end_date
                      ).toLocaleDateString("no-NO", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}</p>
                  </div>
                }
                <h5 style={{ marginBottom: 5 }}>
                  {lang == "no" ? "Returner artikkel: " : "Return article: "}
                </h5>
                {receipt.extra_receipt_view?.bar_code?.value && receipt.extra_receipt_view.bar_code.encoding != "qr" ?
                  <div>
                    <img style={{ width: "100%" }} src={bar_code} alt="Barcode" />
                    <p className="amount" style={{ textAlign: 'center' }}>{receipt.extra_receipt_view?.bar_code.display_value && receipt.extra_receipt_view?.bar_code.display_value}</p>
                  </div>
                  : receipt.extra_receipt_view?.bar_code?.value && receipt.extra_receipt_view.bar_code.encoding == "qr" ?
                    <div>
                      <QRCode style={{
                        height: 100,
                        width: 100
                      }} value={bar_code.value} />
                      <p className="amount" style={{ textAlign: 'center' }}>{receipt.extra_receipt_view?.bar_code.display_value && receipt.extra_receipt_view?.bar_code.display_value}</p>
                    </div>
                    : null
                }
              </div>
              : null}

            {(pdf || popupOpen.type !== "") &&
              <div className={!pdf ? "popup" : ""}>
                <div className={!pdf ? "popup-wrapper" : ""} >
                  {!pdf && <div className="hide"><span onClick={() => showPopup({ type: "", index: -1 })} className='button'>✕</span></div>}
                  <div className={!pdf ? "popup-body" : ""}>


                    {/* Discounts */}
                    {((pdf || popupOpen.type == "discounts") && receipt.extended_receipt_logic?.discounts) && receipt.extended_receipt_logic?.discounts.map((discount, index) => {
                      return (
                        <div key={"discounts" + index}>
                          <div className="box head">
                            <h5><span>{lang == "no" ? "Rabatt" : "Discount"}</span></h5>
                          </div>
                          <div className="box">

                            <div style={{ marginBottom: 10 }}>
                              <h5>{lang == "no" ? "Rabatt på artikkel: " : "Discount on article: "}</h5>

                              {discount.art_numbers?.map((discount_art_nr, index) => {
                                return <p key={"discount_art_nr" + index}>{discount_art_nr}</p>
                              })}

                            </div>

                            <div style={{ marginBottom: 10 }}>
                              <h5>{lang == "no" ? "Rabattsum" : "Discount amount: "}</h5>
                              <p style={{ fontSize: '12px' }}>{discount.amount}</p>
                            </div>

                            <div style={{ marginBottom: 10 }}>
                              <h5>{lang == "no" ? "Rabattprosent " : "Discount percentage: "}</h5>
                              <p style={{ fontSize: '12px' }}>{discount.percentage}</p>
                            </div>

                            {discount.expiration_date &&
                              <div style={{ marginBottom: 10 }}>
                                <h5>{lang == "no" ? "Utløpsdato" : "Expiration date: "}</h5>
                                <p style={{ fontSize: '12px' }}>

                                  {new Date(
                                    discount.expiration_date
                                  ).toLocaleDateString("no-NO", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                  })}
                                </p>
                              </div>
                            }

                            {/* Bar / QR code */}
                            <div>
                              {discount.bar_code?.value && discount.bar_code.encoding != "qr" ?
                                <div>
                                  <img key={"discount-" + index} style={{ width: "100%" }} src={discounts[index].url} alt="Barcode" />
                                  <p className="amount" style={{ textAlign: 'center' }}>{discount.bar_code.display_value && discount.bar_code.display_value}</p>
                                </div>
                                : discount.bar_code?.value && discount.bar_code.encoding == "qr" ?
                                  <div>
                                    <QRCode style={{
                                      height: 100,
                                      width: 100
                                    }} value={discount.bar_code.value} />
                                    <p className="amount" style={{ textAlign: 'center' }}>{discount.bar_code.display_value && discount.bar_code.display_value}</p>
                                  </div>
                                  : null
                              }
                            </div>

                          </div>
                        </div>
                      )
                    })}

                    {/* Tickets */}
                    {receipt.articles?.map((article, index) => {
                      if ((pdf || (popupOpen.type === article.type && index === popupOpen.index)) && (article.bar_codes?.length && article.bar_codes?.length > 0)) return (
                        <div key={"article-ticket" + index} id={"index-" + index}>
                          <div className="box head">
                            <h5><span>{article.type === 'ticket' ? "Ticket" : article.type === 'credit' ? "Credit" : article.type}</span></h5>
                          </div>
                          <div className='box'>



                            {article.art_name && <p style={{ marginBottom: 10 }}>{article.art_name}</p>}

                            {/* Specified info */}
                            {article.specified &&
                              <>
                                {article.specified.floor_number &&
                                  <div style={{ marginBottom: 10 }}>
                                    <h5>
                                      {lang == "no" ? "Etasjenummer" : "Floor number"}
                                    </h5>
                                    <p>{article.specified.floor_number}</p>
                                  </div>
                                }
                                {article.specified.room_number &&
                                  <div style={{ marginBottom: 10 }}>
                                    <h5>
                                      {lang == "no" ? "Romnummer" : "Room number"}
                                    </h5>
                                    <p>{article.specified.room_number}</p>
                                  </div>
                                }
                                {article.specified.entrance &&
                                  <div style={{ marginBottom: 10 }}>
                                    <h5>
                                      {lang == "no" ? "Inngang" : "Entrance"}
                                    </h5>
                                    <p>{article.specified.entrance}</p>
                                  </div>
                                }
                                {article.specified.row_number &&
                                  <div style={{ marginBottom: 10 }}>
                                    <h5>
                                      {lang == "no" ? "Radnummer" : "Row number"}
                                    </h5>
                                    <p>{article.specified.row_number}</p>
                                  </div>
                                }
                                {article.specified.seat_number &&
                                  <div style={{ marginBottom: 10 }}>
                                    <h5>
                                      {lang == "no" ? "Setenummer" : "Seat number"}
                                    </h5>
                                    <p>{article.specified.seat_number}</p>
                                  </div>
                                }
                                {article.specified.event_start &&
                                  <div style={{ marginBottom: 10 }}>
                                    <h5>
                                      {lang == "no" ? "Arrangement starter" : "Event start"}
                                    </h5>
                                    <p>{
                                      new Date(
                                        article.specified.event_start.substring(0, 19)
                                      ).toLocaleDateString(receipt.merchant.merchant_country_code, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })
                                    }
                                    </p>
                                  </div>
                                }
                                {article.specified.event_ending &&
                                  <div style={{ marginBottom: 10 }}>
                                    <h5>
                                      {lang == "no" ? "Arrangement avslutter" : "Event end"}
                                    </h5>
                                    <p>
                                      {
                                        new Date(
                                          article.specified.event_ending.substring(0, 19)
                                        ).toLocaleDateString(receipt.merchant.merchant_country_code, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })
                                      }
                                    </p>
                                  </div>
                                }
                                {article.specified.expiration_date &&
                                  <div style={{ marginBottom: 10 }}>
                                    <h5>
                                      {lang == "no" ? "Utløpsdato" : "Expiration date"}
                                    </h5>

                                    <p>{
                                      new Date(
                                        article.specified.expiration_date.substring(0, 19)
                                      ).toLocaleDateString(receipt.merchant.merchant_country_code, { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" })

                                    }</p>
                                  </div>
                                }
                              </>
                            }
                            {/* Bar / QR code */}
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              {article.bar_codes[0].encoding != "qr" ?
                                <div>
                                  <img key={"discount-" + index} style={{ width: "100%" }} src={tickets[index].url} alt="Barcode" />
                                  <p className="amount" style={{ textAlign: 'center' }}>{article.bar_codes[0].display_value && article.bar_codes[0].display_value}</p>
                                </div>

                                : article.bar_codes[0].encoding == "qr" ?
                                  <div>
                                    <QRCode style={{
                                      height: 100,
                                      width: 100
                                    }} value={article.bar_codes[0].value} />
                                    <p className="amount" style={{ textAlign: 'center' }}>{article.bar_codes[0].display_value && article.bar_codes[0].display_value}</p>
                                  </div>
                                  :
                                  null
                              }
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                {!pdf && <div className="popup-bg" onClick={() => showPopup({ type: "", index: -1 })}></div>}
              </div>
            }

          </div>
        </div>
      </div>


    </div >

  )
}
export default Home;

const Article = ({ index, article, lang, receipt, pdf, openPopup }: { index: number, article: any, lang: any, receipt: Receipt, pdf: boolean, openPopup: (article: any, index: any) => void }) => {

  const [expanded, setExpanded] = useState(pdf)
  let hasExpand = !pdf && (article.art_description || article.art_number || article.reference_of_origin?.reason_for_return)

  return (<div className="article">
    <div className="split">

      <div>
        {/* Title */}
        <p className='article-divider' onClick={() => hasExpand && setExpanded(!expanded)}>
          {hasExpand && <span className='expand' style={{ cursor: "pointer" }}>{expanded ? '-' : '+'}</span>}
          {article.art_name}
        </p>
        {/* Tag */}
        {article.return &&
          <div className='tag'>
            {lang == "no" ? "Returnert" : "Returned"}
          </div>
        }
        {/* Ticket */}
        {(article.bar_codes?.length && article.bar_codes?.length > 0 && !pdf) &&
          <div className='tag button' onClick={() => openPopup(article.type, index)}>
            {lang == "no" ? "Vis " + (article.type === "ticket" ? "billett" : article.type ? "kreditt" : article.type) : "Show " + article.type}

          </div>
        }
        {/* Quantity */}
        {article.quantity &&
          <h5>
            {article.quantity} {article.quantity_type}
          </h5>
        }
        {/* Discounts */}
        {article.subtractions?.discounts && article.subtractions.discounts.length > 0 &&
          article.subtractions.discounts.map((discount: any, i: any) => (
            <h5 key={"discount" + i}>

              {discount.description ? (discount.description + ": ") : null}
              -{discount.per_quantity ? parseFloat(((discount?.amount || 0) * (article.quantity || 0)).toString()).toLocaleString(receipt.merchant.merchant_country_code, {
                useGrouping: true,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) : parseFloat((discount?.amount || 0).toString()).toLocaleString(receipt.merchant.merchant_country_code, {
                useGrouping: true,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h5>

          ))
        }
        {/* Recycling */}
        {article.additions?.art_recycling_fee || article.additions?.quantity_recycling_fee ?
          <h5>
            {lang == "no" ? "Pant: " : "Recycling: "}
            {parseFloat((article.additions.art_recycling_fee || (article.additions.quantity_recycling_fee! * article.quantity!)).toString())
              .toLocaleString(receipt.merchant.merchant_country_code, {
                useGrouping: true,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}

          </h5> : null
        }
        {/* Extra info */}
        {(expanded && article.reference_of_origin?.reason_for_return) && <h5>{lang == "no" ? "Årsak for retur: " : "Reason for return: "}{article.reference_of_origin?.reason_for_return}</h5>}
        {(expanded && article.art_number) && <h5>{lang == "no" ? "Artikkelnr: " : "Article number: "}{article.art_number}</h5>}
        {(expanded && article.art_description) && <h5>{lang == "no" ? "Beskrivelse: " : "Description: "}{article.art_description}</h5>}
      </div>

      {/* Sum */}
      <div>
        <p className='amount article-divider'> {article.return === true && "-"}
          {
            parseFloat((article.art_final_price || 0).toString())
              .toLocaleString(
                receipt.merchant.merchant_country_code, {
                useGrouping: true,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </p>
        {article.additions?.vat_groups ?
          article.additions.vat_groups.map((group: any, index: any) => {
            return (
              <div key={"vat" + index}>
                <p className="small amount" style={{ textAlign: "right" }} >{group.percentage}% {group.name}</p>
                <p className="small amount" style={{ textAlign: "right" }} >({parseFloat((group.amount || 0).toString())
                  .toLocaleString(
                    receipt.merchant.merchant_country_code, {
                    useGrouping: true,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })})</p>
              </div>
            )
          }) : null}
      </div>

    </div>
  </div>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  let lang: any = "",
    template: any = "",
    preview: boolean = false,
    pdf: boolean = false;


  if (query.lang) lang = query?.lang
  if (query.template) template = query?.template
  if (query.preview) preview = query?.preview === "true"
  if (query.pdf) pdf = query?.pdf === "true"
  let fetchAuth = await fetch("https://staging.api.zeipt.io/auth/public", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: "6405ff6a-f4d2-451a-9ed2-7173aede9e45",
      provider_gcid: query?.gcid
    }),
  })
    .then((res) => res.json())

  let receipt = query.preview ? [{}] : await fetch("https://staging.api.zeipt.io/app/user/receipt/fetch/transnr", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + fetchAuth
    },
    body: JSON.stringify({
      provider_gcid: query?.gcid,
      zeipt_receipt_transnrs: [query?.transnr],
    }),
  })
    .then((response) => {

      if (response.status === 200) {
        return response.json();
      }
      throw new Error(response.status + ": " + response.statusText);
    })

    .catch((err) => {
      console.log('Can\'t fetch receipt;', err);
    });

  /* Receipt bar code */
  let bar_code: any = "";
  if (receipt[0].extra_receipt_view?.bar_code.value && receipt[0].extra_receipt_view.bar_code.encoding != "qr") {
    let options = {
      bcid: receipt[0].extra_receipt_view.bar_code.encoding == "code_39" ? "code39"
        : receipt[0].extra_receipt_view.bar_code.encoding == "ean_13" ? "ean13"
          : receipt[0].extra_receipt_view.bar_code.encoding == "ean_8" ? "ean8"
            : receipt[0].extra_receipt_view.bar_code.encoding == "interleaved_2_of_5" ? "itf14"
              : "code128",
      text: receipt[0].extra_receipt_view.bar_code.value,
      scale: 3,
      height: 10,
      includetext: false,
    };
    let buffer = await bwipjs.toBuffer(options);
    let imagePath = `data:image/png;base64,${buffer.toString('base64')}`;
    bar_code = imagePath
  }
  /* Discount bar codes */
  let discounts: any = [];
  if (receipt[0].extended_receipt_logic?.discounts) {
    for (const discount of receipt[0].extended_receipt_logic?.discounts) {
      if (discount.bar_code?.value && discount.bar_code.encoding != "qr") {
        let options = {
          bcid: discount.bar_code.encoding == "code_39" ? "code39"
            : discount.bar_code.encoding == "ean_13" ? "ean13"
              : discount.bar_code.encoding == "ean_8" ? "ean8"
                : discount.bar_code.encoding == "interleaved_2_of_5" ? "itf14"
                  : "code128",
          text: discount.bar_code.value,
          scale: 3,
          height: 10,
          includetext: false,
        };
        let buffer = await bwipjs.toBuffer(options);
        let imagePath = `data:image/png;base64,${buffer.toString('base64')}`;
        discounts.push({ "url": imagePath })
      } else {
        discounts.push({ "url": "" })
      }
    }
  }
  /* Ticket bar codes */
  let tickets: any = [];
  if (receipt[0].extended_receipt_logic?.discounts) {
    for (const ticket of receipt[0].articles) {
      if (ticket.bar_codes?.length && ticket.bar_codes?.length > 0) {
        if (ticket.bar_codes[0]?.value && ticket.bar_codes[0].encoding != "qr") {
          let options = {
            bcid: ticket.bar_codes[0].encoding == "code_39" ? "code39"
              : ticket.bar_codes[0].encoding == "ean_13" ? "ean13"
                : ticket.bar_codes[0].encoding == "ean_8" ? "ean8"
                  : ticket.bar_codes[0].encoding == "interleaved_2_of_5" ? "itf14"
                    : "code128",
            text: ticket.bar_codes[0].value,
            scale: 3,
            height: 10,
            includetext: false,
          };
          let buffer = await bwipjs.toBuffer(options);
          let imagePath = `data:image/png;base64,${buffer.toString('base64')}`;
          tickets.push({ "url": imagePath })
        } else {
          tickets.push({ "url": "" })
        }
      }
    }
  }

  return {
    props: {
      preview,
      receipt,
      discounts,
      bar_code,
      tickets,
      lang,
      template,
      pdf
    },
  };
}