import { GetServerSideProps } from "next";
import bwipjs from "bwip-js";
import { Receipt } from "@/utils/types/receipt";
import logo from "../../../../../../../public/zeipt.png";
import regnskogfondet from "../../../../../../../public/regnskogfondet.png";
import plus from "../../../../../../../public/plus.svg";
import cross from "../../../../../../../public/cross.svg";
import minus from "../../../../../../../public/minus.svg";
import QRCode from "react-qr-code";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Home = (props: any) => {
  const [popupOpen, showPopup] = useState({ type: "", index: -1 });
  const [isLoading, setIsLoading] = useState(false);

  const receiptExample: Receipt = {
    total: {
      additions: {
        total_vat: 0,
      },
      final_price: 0,
      total_currency: "",
      total_moneyback: false,
      extra_sum_values: {
        final_price_rounded: 0,
      },

      payment_method_array: [
        {
          amount: 0,
          method: "",
          currency: "",
        },
      ],
    },
    version: "",
    merchant: {
      org_number: "",
      merchant_number: "",
      merchant_country_code: "EN",
      purchase_location: {
        purchase_country_code: "",
        city: "",
        zip_code: "",
        address: "",
        store_name: "",
      },
    },
    payments: [
      {
        currency: "",
        moneyback: false,
        timestamp: "",
        payment_method: "",
      },
    ],
    timestamp: "",
    receipt_type: "",
    receipt_number: "",
    receipt_producer_certificate: "",
  };

  const [receipt, setReceipt] = useState(
    props.preview ? (receiptExample as Receipt) : (props.receipt as Receipt)
  );
  console.log(props.receipt);
  const [lang, setLang] = useState(
    props.preview ? "en" : (props.lang as string).toLocaleLowerCase()
  );


  const linkRef = useRef<HTMLAnchorElement | null>(null);

  let discounts = props.discounts as any,
    bar_code = props.bar_code as any,
    tickets = props.tickets as any,
    template = props.template as any,
    pdf = props.pdf as boolean,
    preview = props.preview as boolean,
    view = props.view as any,
    token = props.token as any,
    user_id = props.user_id as any,
    zeipt_receipt_transnr = props.zeipt_receipt_transnr as any,
    link = "" as any;

  const downloadPdf = async () => {
    setIsLoading(true);
    try {
      let response;
      if (view == "embedded") {
        response = await fetch(
          "https://receipt.staging.api.zeipt.io/v3.0/pdf/users/" + user_id + "/receipts/" + zeipt_receipt_transnr, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
      } else {
        response = await fetch(
          "https://receipt.staging.api.zeipt.io/v3.0/pdf/users/" + user_id + "/receipts/" + zeipt_receipt_transnr + "?public_view=true", {
          headers: {
            Authorization: 'Bearer public'
          }
        });
      }

      const pdfBlob = await response.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      link = document.createElement("a");
      link.href = pdfUrl;
      const date = new Date(
        receipt.timestamp.substring(0, 19)
      ).toLocaleDateString(receipt.merchant.merchant_country_code, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      link.download = `${date}-${receipt.merchant.purchase_location?.store_name}-${receipt.receipt_number}.pdf`;
      linkRef.current = link

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating the PDF");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      setReceipt(event.data);
      console.log(event.data);
    };

    downloadPdf()

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const openPopup = (type: any, index?: number) => {
    showPopup({ type: type, index: index !== undefined ? index : -1 });
  };

  const handleClick = async () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  };

  return (
    <div className={"template template-" + template}>
      <div className="wrapper">
        <div className="receipt-wrapper">
          <div className="receipt">
            {/* Merchant logo */}
            <div
              className="receipt-header split"
              style={{ alignItems: "center" }}
            >
              <div style={{ position: "relative", width: 100, height: 40 }}>
                <Image
                  className="merchant-logo"
                  id="merchant-logo"
                  src={logo.src}
                  fill
                  style={{ objectFit: 'contain' }}
                  alt="Merchant logo"
                />
              </div>
              {!pdf && !preview && (
                <div>
                  <select id="language" name="language" onChange={e => setLang(e.target.value)}>
                    <option selected={lang == "no" && true} value="no">NO</option>
                    <option selected={lang == "en" && true} value="en">EN</option>
                  </select>
                  <button
                    className="tag button"
                    disabled={isLoading}
                    onClick={handleClick}
                    style={{
                      margin: "0px !important",
                    }}
                  >
                    {lang == "no"
                      ? isLoading
                        ? "Laster ned..."
                        : "Last ned PDF"
                      : isLoading
                        ? "Downloading..."
                        : "Download PDF"}
                  </button>
                </div>
              )}
            </div>

            {/* Merchant name */}
            <div className="box head">
              <h2 style={{ margin: 0 }}>
                {receipt.merchant.purchase_location?.store_name}
              </h2>
            </div>

            {/* Receipt info header */}
            <div className="box">
              <div className="flex">
                <div className="text-group">
                  <h5>
                    {lang == "no" ? "Organisasjonsnr" : "Organization nr"}
                  </h5>
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
                  <p>
                    {receipt.merchant.purchase_location?.zip_code &&
                      receipt.merchant.purchase_location?.zip_code + ", "}
                    {receipt.merchant.purchase_location?.city},{" "}
                    {receipt.merchant.purchase_location?.purchase_country_code}
                  </p>
                </div>
                <div className="text-group">
                  <h5>{lang == "no" ? "Dato" : "Date"}</h5>
                  <p>
                    {new Date(
                      receipt.timestamp.substring(0, 19)
                    ).toLocaleDateString(
                      receipt.merchant.merchant_country_code,
                      {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>

              {(receipt.merchant.telephone || receipt.merchant.email) && (
                <div className="flex">
                  {receipt.merchant.email && (
                    <div className="text-group">
                      <h5>{lang == "no" ? "Epost" : "Email"}</h5>
                      <p>{receipt.merchant.email}</p>
                    </div>
                  )}
                  {receipt.merchant.telephone && (
                    <div className="text-group">
                      <h5>{lang == "no" ? "Telefon" : "Phone"}</h5>
                      <p>
                        {receipt.merchant.telephone.country_calling_code +
                          " " +
                          receipt.merchant.telephone?.number}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex">
                {receipt.merchant.website && (
                  <div className="text-group">
                    <h5>{lang == "no" ? "Nettside" : "Website"}</h5>
                    <a
                      target={"_blank"}
                      href={"https://" + receipt.merchant.website}
                    >
                      <p>{receipt.merchant.website}</p>
                    </a>
                  </div>
                )}

                {receipt.relate_order_numbers &&
                  receipt.relate_order_numbers.length > 0 && (
                    <div className="text-group">
                      <h5>{lang == "no" ? "Ordrenr" : "Order nr"}</h5>
                      {receipt.relate_order_numbers.map(function (
                        ordernr,
                        index
                      ) {
                        return <p key={"ordernr-" + index}>{ordernr} </p>;
                      })}
                    </div>
                  )}
              </div>
            </div>

            {/* Article header */}
            {receipt.articles && (
              <div className="box head">
                <div className="split">
                  <h5>
                    <span>{lang == "no" ? "Artikkel" : "Article"}</span>
                  </h5>
                  <h5>
                    <span>{lang == "no" ? "Beløp" : "Sum"}</span>
                  </h5>
                </div>
              </div>
            )}

            {/* Articles */}
            {receipt.articles &&
              receipt.articles.map((article, index) => {
                return (
                  <Article
                    key={"article-" + index}
                    index={index}
                    article={article}
                    lang={lang}
                    receipt={receipt}
                    pdf={pdf}
                    openPopup={openPopup}
                  />
                );
              })}

            {/* Total */}
            <div className="box head">
              <div className="split">
                <p>{lang == "no" ? "Totalsum" : "Total sum"}</p>
                <p className="amount">
                  {parseFloat(
                    receipt.total.final_price.toString()
                  ).toLocaleString(receipt.merchant.merchant_country_code, {
                    useGrouping: true,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            {/* MVA */}
            <div className="box">
              <div className="split">
                <p>
                  {receipt.total.total_vat_name
                    ? receipt.total.total_vat_name
                    : "VAT"}
                </p>
                <p className="amount">
                  {parseFloat(
                    receipt.total.additions.total_vat.toString()
                  ).toLocaleString(receipt.merchant.merchant_country_code, {
                    useGrouping: true,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              {receipt.total.art_vat_amount_array && (
                <div className="split" style={{ marginTop: "10px" }}>
                  <h5>{receipt.total.total_vat_name} %</h5>
                  <h5>{lang == "no" ? "Grunnlag" : "Base"}</h5>
                  <h5>{lang == "no" ? "Totalt" : "Total"}</h5>
                </div>
              )}
              {receipt.total.art_vat_amount_array &&
                receipt.total.art_vat_amount_array.map((vat, index) => {
                  return (
                    <div className="split" key={"mvagroup-" + index}>
                      {/* Percentage */}
                      <p className="amount small">
                        {parseFloat(
                          (vat.percentage || 0).toString()
                        ).toLocaleString(
                          receipt.merchant.merchant_country_code,
                          {
                            useGrouping: true,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </p>
                      {/* Base */}
                      <p className="amount small">
                        {parseFloat(
                          (vat.base_amount || 0).toString()
                        ).toLocaleString(
                          receipt.merchant.merchant_country_code,
                          {
                            useGrouping: true,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </p>
                      {/* Total */}
                      <p className="amount small">
                        {parseFloat(
                          (vat.amount || 0).toString()
                        ).toLocaleString(
                          receipt.merchant.merchant_country_code,
                          {
                            useGrouping: true,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </p>
                    </div>
                  );
                })}
            </div>

            {/* Payments */}

            {receipt.payments?.map((payment, index) => {
              return (
                <Payment
                  key={"payment-" + index}
                  index={index}
                  payment={payment}
                  lang={lang}
                  receipt={receipt}
                  pdf={pdf}
                />
              );
            })}

            {/* Goodbye message */}
            {(receipt.extra_receipt_view?.cashier_goodbye_message ||
              receipt.extra_receipt_view?.opening_hours) && (
                <div className="box white">
                  {receipt.extra_receipt_view?.cashier_goodbye_message && (
                    <h5>
                      {receipt.extra_receipt_view?.cashier_goodbye_message}
                      <br />
                      <br />
                    </h5>
                  )}
                  {receipt.extra_receipt_view?.opening_hours && (
                    <h5>
                      {lang == "no" ? "Åpningstider: " : "Opening hours: "}
                      <br></br>
                      {receipt.extra_receipt_view?.opening_hours}
                    </h5>
                  )}
                </div>
              )}

            {/* Regnskogfondet */}
            <div className="box" style={{ background: "none" }}>
              <a href="https://www.regnskog.no/no/" target="_blank" rel="noopener noreferrer">
                <img
                  className="merchant-logo"
                  src={regnskogfondet.src}
                  alt="Regnskogsfondet logo"
                />
              </a>

              <h5>
                {lang == "no"
                  ? "Ingen trær ble skadet med denne kvitteringen"
                  : "No trees were harmed with this receipt"}
              </h5>
            </div>

            {/* Show discounts */}
            {!pdf && receipt.extended_receipt_logic?.discounts && (
              <div className="sticky-bottom">
                <div
                  className="tag button"
                  style={{
                    margin: "0 !important",
                    marginRight: "10px !important",
                  }}
                  onClick={() => openPopup("discounts")}
                >
                  {lang == "no" ? "Vis kuponger" : "Show coupons"}
                </div>

                <div
                  className="tag button"
                  style={{ margin: "0 !important" }}
                  onClick={() => openPopup("return")}
                >
                  {lang == "no" ? "Returner" : "Return"}
                </div>
              </div>
            )}
            {(pdf || popupOpen.type !== "") && (
              <div className={!pdf ? "popup" : ""}>
                <div className={!pdf ? "popup-wrapper" : ""}>
                  {!pdf && (
                    <div className="hide">
                      <span
                        onClick={() => showPopup({ type: "", index: -1 })}
                        className="expand"
                      >
                        <img src={cross.src} alt="Collapse" />
                      </span>
                    </div>
                  )}
                  <div className={!pdf ? "popup-body" : ""}>
                    {/* Return / bar code */}
                    {(pdf || popupOpen.type == "return") &&
                      (receipt.extra_receipt_view?.return_policy
                        ?.policy_description ||
                        receipt.extra_receipt_view?.return_policy
                          ?.policy_end_date ||
                        receipt.extra_receipt_view?.bar_code?.value) && (
                        <div>
                          <div className="box head">
                            <h5>
                              <span>{lang == "no" ? "Retur" : "Return"}</span>
                            </h5>
                          </div>
                          <div className="box">
                            {receipt.extra_receipt_view?.return_policy
                              ?.policy_description && (
                                <div style={{ marginBottom: 10 }}>
                                  <h5>
                                    {lang == "no"
                                      ? "Returpolicy"
                                      : "Return policy"}
                                  </h5>
                                  <p>
                                    {
                                      receipt.extra_receipt_view?.return_policy
                                        ?.policy_description
                                    }
                                  </p>
                                </div>
                              )}
                            {/* Policy end date */}
                            {receipt.extra_receipt_view?.return_policy
                              ?.policy_end_date && (
                                <div style={{ marginBottom: 10 }}>
                                  <h5>
                                    {lang == "no"
                                      ? "Siste dag for retur: "
                                      : "Last day of return: "}
                                  </h5>
                                  <p style={{ fontSize: "12px" }}>
                                    {new Date(
                                      receipt.extra_receipt_view?.return_policy?.policy_end_date
                                    ).toLocaleDateString("no-NO", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                    })}
                                  </p>
                                </div>
                              )}
                            <h5 style={{ marginBottom: 5 }}>
                              {lang == "no"
                                ? "Returner artikkel: "
                                : "Return article: "}
                            </h5>
                            {receipt.extra_receipt_view?.bar_code?.value &&
                              receipt.extra_receipt_view.bar_code.encoding !=
                              "qr" ? (
                              <div>
                                <img
                                  style={{ width: "100%" }}
                                  src={bar_code}
                                  alt="Barcode"
                                />
                                <p
                                  className="amount"
                                  style={{ textAlign: "center" }}
                                >
                                  {receipt.extra_receipt_view?.bar_code
                                    .display_value &&
                                    receipt.extra_receipt_view?.bar_code
                                      .display_value}
                                </p>
                              </div>
                            ) : receipt.extra_receipt_view?.bar_code?.value &&
                              receipt.extra_receipt_view.bar_code.encoding ==
                              "qr" ? (
                              <div>
                                <QRCode
                                  style={{
                                    height: 100,
                                    width: 100,
                                  }}
                                  value={bar_code.value}
                                />
                                <p
                                  className="amount"
                                  style={{ textAlign: "center" }}
                                >
                                  {receipt.extra_receipt_view?.bar_code
                                    .display_value &&
                                    receipt.extra_receipt_view?.bar_code
                                      .display_value}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}
                    {/* Discounts */}
                    {(pdf || popupOpen.type == "discounts") &&
                      receipt.extended_receipt_logic?.discounts &&
                      receipt.extended_receipt_logic?.discounts.map(
                        (discount, index) => {
                          return (
                            <div key={"discounts" + index}>
                              <div className="box head">
                                <h5>
                                  <span>
                                    {lang == "no" ? "Kupong" : "Coupons"}
                                  </span>
                                </h5>
                              </div>
                              <div className="box">
                                <div style={{ marginBottom: 10 }}>
                                  <h5>
                                    {lang == "no"
                                      ? "Kupong på artikkel: "
                                      : "Coupon on article: "}
                                  </h5>

                                  {discount.art_numbers?.map(
                                    (discount_art_nr, index) => {
                                      return (
                                        <p key={"discount_art_nr" + index}>
                                          {discount_art_nr}
                                        </p>
                                      );
                                    }
                                  )}
                                </div>

                                <div style={{ marginBottom: 10 }}>
                                  <h5>
                                    {lang == "no"
                                      ? "Rabattsum"
                                      : "Discount amount: "}
                                  </h5>
                                  <p style={{ fontSize: "12px" }}>
                                    {discount.amount}
                                  </p>
                                </div>

                                <div style={{ marginBottom: 10 }}>
                                  <h5>
                                    {lang == "no"
                                      ? "Rabattprosent "
                                      : "Discount percentage: "}
                                  </h5>
                                  <p style={{ fontSize: "12px" }}>
                                    {discount.percentage}
                                  </p>
                                </div>

                                {discount.expiration_date && (
                                  <div style={{ marginBottom: 10 }}>
                                    <h5>
                                      {lang == "no"
                                        ? "Utløpsdato"
                                        : "Expiration date: "}
                                    </h5>
                                    <p style={{ fontSize: "12px" }}>
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
                                )}

                                {/* Bar / QR code */}
                                <div>
                                  {discount.bar_code?.value &&
                                    discount.bar_code.encoding != "qr" ? (
                                    <div>
                                      <img
                                        key={"discount-" + index}
                                        style={{ width: "100%" }}
                                        src={discounts[index].url}
                                        alt="Barcode"
                                      />
                                      <p
                                        className="amount"
                                        style={{ textAlign: "center" }}
                                      >
                                        {discount.bar_code.display_value &&
                                          discount.bar_code.display_value}
                                      </p>
                                    </div>
                                  ) : discount.bar_code?.value &&
                                    discount.bar_code.encoding == "qr" ? (
                                    <div>
                                      <QRCode
                                        style={{
                                          height: 100,
                                          width: 100,
                                        }}
                                        value={discount.bar_code.value}
                                      />
                                      <p
                                        className="amount"
                                        style={{ textAlign: "center" }}
                                      >
                                        {discount.bar_code.display_value &&
                                          discount.bar_code.display_value}
                                      </p>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}

                    {/* Tickets */}
                    {receipt.articles?.map((article, index) => {
                      if (
                        (pdf ||
                          (popupOpen.type === article.type &&
                            index === popupOpen.index)) &&
                        article.bar_codes?.length &&
                        article.bar_codes?.length > 0
                      )
                        return (
                          <div
                            key={"article-ticket" + index}
                            id={"index-" + index}
                          >
                            <div className="box head">
                              <h5>
                                <span>
                                  {lang == "no"
                                    ? article.type === "ticket"
                                      ? "Billett"
                                      : article.type
                                        ? "Gavekort"
                                        : article.type
                                    : article.type === "Credit"
                                      ? "Gift card"
                                      : article.type}
                                </span>
                              </h5>
                            </div>
                            <div className="box">
                              {article.art_name && (
                                <p style={{ marginBottom: 10 }}>
                                  {article.art_name}
                                </p>
                              )}

                              {/* Specified info */}
                              {article.specified && (
                                <>
                                  {article.specified.floor_number && (
                                    <div style={{ marginBottom: 10 }}>
                                      <h5>
                                        {lang == "no"
                                          ? "Etasjenummer"
                                          : "Floor number"}
                                      </h5>
                                      <p>{article.specified.floor_number}</p>
                                    </div>
                                  )}
                                  {article.specified.room_number && (
                                    <div style={{ marginBottom: 10 }}>
                                      <h5>
                                        {lang == "no"
                                          ? "Romnummer"
                                          : "Room number"}
                                      </h5>
                                      <p>{article.specified.room_number}</p>
                                    </div>
                                  )}
                                  {article.specified.entrance && (
                                    <div style={{ marginBottom: 10 }}>
                                      <h5>
                                        {lang == "no" ? "Inngang" : "Entrance"}
                                      </h5>
                                      <p>{article.specified.entrance}</p>
                                    </div>
                                  )}
                                  {article.specified.row_number && (
                                    <div style={{ marginBottom: 10 }}>
                                      <h5>
                                        {lang == "no"
                                          ? "Radnummer"
                                          : "Row number"}
                                      </h5>
                                      <p>{article.specified.row_number}</p>
                                    </div>
                                  )}
                                  {article.specified.seat_number && (
                                    <div style={{ marginBottom: 10 }}>
                                      <h5>
                                        {lang == "no"
                                          ? "Setenummer"
                                          : "Seat number"}
                                      </h5>
                                      <p>{article.specified.seat_number}</p>
                                    </div>
                                  )}
                                  {article.specified.event_start && (
                                    <div style={{ marginBottom: 10 }}>
                                      <h5>
                                        {lang == "no"
                                          ? "Arrangement starter"
                                          : "Event start"}
                                      </h5>
                                      <p>
                                        {new Date(
                                          article.specified.event_start.substring(
                                            0,
                                            19
                                          )
                                        ).toLocaleDateString(
                                          receipt.merchant
                                            .merchant_country_code,
                                          {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric",
                                          }
                                        )}
                                      </p>
                                    </div>
                                  )}
                                  {article.specified.event_ending && (
                                    <div style={{ marginBottom: 10 }}>
                                      <h5>
                                        {lang == "no"
                                          ? "Arrangement avslutter"
                                          : "Event end"}
                                      </h5>
                                      <p>
                                        {new Date(
                                          article.specified.event_ending.substring(
                                            0,
                                            19
                                          )
                                        ).toLocaleDateString(
                                          receipt.merchant
                                            .merchant_country_code,
                                          {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric",
                                          }
                                        )}
                                      </p>
                                    </div>
                                  )}
                                  {article.specified.expiration_date && (
                                    <div style={{ marginBottom: 10 }}>
                                      <h5>
                                        {lang == "no"
                                          ? "Utløpsdato"
                                          : "Expiration date"}
                                      </h5>

                                      <p>
                                        {new Date(
                                          article.specified.expiration_date.substring(
                                            0,
                                            19
                                          )
                                        ).toLocaleDateString(
                                          receipt.merchant
                                            .merchant_country_code,
                                          {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric",
                                          }
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </>
                              )}
                              {/* Bar / QR code */}
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                {article.bar_codes[0].encoding != "qr" ? (
                                  <div>
                                    <img
                                      key={"discount-" + index}
                                      style={{ width: "100%" }}
                                      src={tickets[index].url}
                                      alt="Barcode"
                                    />
                                    <p
                                      className="amount"
                                      style={{ textAlign: "center" }}
                                    >
                                      {article.bar_codes[0].display_value &&
                                        article.bar_codes[0].display_value}
                                    </p>
                                  </div>
                                ) : article.bar_codes[0].encoding == "qr" ? (
                                  <div>
                                    <QRCode
                                      style={{
                                        height: 100,
                                        width: 100,
                                      }}
                                      value={article.bar_codes[0].value}
                                    />
                                    <p
                                      className="amount"
                                      style={{ textAlign: "center" }}
                                    >
                                      {article.bar_codes[0].display_value &&
                                        article.bar_codes[0].display_value}
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        );
                    })}
                  </div>
                </div>
                {!pdf && (
                  <div
                    className="popup-bg"
                    onClick={() => showPopup({ type: "", index: -1 })}
                  ></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;

const Article = ({
  index,
  article,
  lang,
  receipt,
  pdf,
  openPopup,
}: {
  index: number;
  article: any;
  lang: any;
  receipt: Receipt;
  pdf: boolean;
  openPopup: (article: any, index: any) => void;
}) => {
  const [expanded, setExpanded] = useState(pdf);
  let hasExpand =
    !pdf &&
    (article.art_description ||
      article.art_number ||
      article.reference_of_origin?.reason_for_return);

  return (
    <div className="article">
      <div className="split">
        <div>
          {/* Title */}
          <p
            className="article-divider"
            onClick={() => hasExpand && setExpanded(!expanded)}
          >
            {hasExpand && (
              <span className="expand" style={{ cursor: "pointer" }}>
                {expanded ? (
                  <img src={minus.src} alt="Collapse" />
                ) : (
                  <img src={plus.src} alt="Expand" />
                )}
              </span>
            )}
            {article.art_name}
          </p>

          {/* Ticket */}
          {article.bar_codes?.length &&
            article.bar_codes?.length > 0 &&
            !pdf && (
              <div
                className="tag button"
                onClick={() => openPopup(article.type, index)}
              >
                {lang == "no"
                  ? "Vis " +
                  (article.type === "ticket"
                    ? "billett"
                    : article.type
                      ? "gavekort"
                      : article.type)
                  : "Show " +
                  (article.type === "credit" ? "Gift card" : article.type)}
              </div>
            )}
          {/* Quantity */}
          {article.quantity && (
            <h5>
              {article.quantity} {article.quantity_type}
            </h5>
          )}
          {/* Discounts */}
          {article.subtractions?.discounts &&
            article.subtractions.discounts.length > 0 &&
            article.subtractions.discounts.map((discount: any, i: any) => (
              <h5 key={"discount" + i}>
                {discount.description ? discount.description + ": " : null}-
                {discount.per_quantity
                  ? parseFloat(
                    (
                      (discount?.amount || 0) * (article.quantity || 0)
                    ).toString()
                  ).toLocaleString(receipt.merchant.merchant_country_code, {
                    useGrouping: true,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  : parseFloat(
                    (discount?.amount || 0).toString()
                  ).toLocaleString(receipt.merchant.merchant_country_code, {
                    useGrouping: true,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </h5>
            ))}
          {/* Recycling */}
          {article.additions?.art_recycling_fee ||
            article.additions?.quantity_recycling_fee ? (
            <h5>
              {lang == "no" ? "Pant: " : "Recycling: "}
              {parseFloat(
                (
                  article.additions.art_recycling_fee ||
                  article.additions.quantity_recycling_fee! * article.quantity!
                ).toString()
              ).toLocaleString(receipt.merchant.merchant_country_code, {
                useGrouping: true,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h5>
          ) : null}
          {/* Extra info */}
          {expanded && article.reference_of_origin?.reason_for_return && (
            <h5>
              {lang == "no" ? "Årsak for retur: " : "Reason for return: "}
              {article.reference_of_origin?.reason_for_return}
            </h5>
          )}
          {expanded && article.art_number && (
            <h5>
              {lang == "no" ? "Artikkelnr: " : "Article number: "}
              {article.art_number}
            </h5>
          )}
          {expanded && article.art_description && (
            <h5>
              {lang == "no" ? "Beskrivelse: " : "Description: "}
              {article.art_description}
            </h5>
          )}
        </div>

        {/* Sum */}
        <div style={{ textAlign: "right" }}>
          <p className="amount article-divider">
            {" "}
            {article.return === true && "-"}
            {parseFloat(
              (article.art_final_price || 0).toString()
            ).toLocaleString(receipt.merchant.merchant_country_code, {
              useGrouping: true,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          {/* Returned */}
          {article.return && (
            <div className="tag" style={{ marginRight: 0 }}>
              {lang == "no" ? "Returnert" : "Returned"}
            </div>
          )}
          {article.additions?.vat_groups
            ? article.additions.vat_groups.map((group: any, index: any) => {
              return (
                <div key={"vat" + index}>
                  <p className="small amount" style={{ textAlign: "right" }}>
                    {group.percentage}% {group.name}
                  </p>
                  <p className="small amount" style={{ textAlign: "right" }}>
                    (
                    {parseFloat(
                      (group.amount || 0).toString()
                    ).toLocaleString(receipt.merchant.merchant_country_code, {
                      useGrouping: true,
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    )
                  </p>
                </div>
              );
            })
            : null}
        </div>
      </div>
    </div>
  );
};
const Payment = ({
  index,
  payment,
  lang,
  receipt,
  pdf,
}: {
  index: number;
  payment: any;
  lang: any;
  receipt: Receipt;
  pdf: boolean;
}) => {
  const [expanded, setExpanded] = useState(pdf);
  let hasExpand =
    !pdf &&
    (!!payment.payment_method ||
      !!payment.timestamp ||
      !!payment.national_merchant_number ||
      !!payment.payment_method_type ||
      !!payment.payment_method_owner ||
      !!payment.masked_pan ||
      !!payment.aid_nr ||
      !!payment.tvr_nr ||
      !!payment.tsi_nr ||
      !!payment.ref_nr ||
      !!payment.response_code ||
      !!payment.currency ||
      !!payment.payment_amount ||
      !!payment.tip_amount);

  return (
    <div className="box head" key={"payment-" + index}>
      <div className="split">
        <div>
          <p
            className="article-divider"
            onClick={() => hasExpand && setExpanded(!expanded)}
          >
            {hasExpand && (
              <span className="expand" style={{ cursor: "pointer" }}>
                {expanded ? (
                  <img src={minus.src} alt="Collapse" />
                ) : (
                  <img src={plus.src} alt="Expand" />
                )}
              </span>
            )}
            {lang == "no" ? "Betaling" : "Payment"}
          </p>
        </div>
        <div>
          <p className="amount article-divider">
            {payment.moneyback === true && "-"}
            {parseFloat(
              (payment.payment_amount || 0).toString()
            ).toLocaleString(receipt.merchant.merchant_country_code, {
              useGrouping: true,
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
      <div>
        {!!payment.payment_method && (
          <p className="amount small">{payment.payment_method}</p>
        )}
        {!!payment.timestamp && (
          <p className="amount small">
            {new Date(payment.timestamp).toLocaleDateString(
              receipt.merchant.merchant_country_code,
              {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              }
            )}
          </p>
        )}

        {!!payment.payment_method_type && (
          <p className="amount small">{payment.payment_method_type}</p>
        )}
        {!!payment.payment_method_owner && (
          <p className="amount small">{payment.payment_method_owner}</p>
        )}
        {expanded && !!payment.national_merchant_number && (
          <p className="amount small">
            Bax: {payment.national_merchant_number} - {payment.bank_terminal_id}
          </p>
        )}
        {expanded && !!payment.masked_pan && (
          <p className="amount small">{payment.masked_pan}</p>
        )}
        {expanded && !!payment.aid_nr && (
          <p className="amount small">AID: {payment.aid_nr}</p>
        )}
        {expanded && !!payment.tvr_nr && (
          <p className="amount small">TVR: {payment.tvr_nr}</p>
        )}
        {expanded && !!payment.tsi_nr && (
          <p className="amount small">TSI: {payment.tsi_nr}</p>
        )}
        {expanded && !!payment.ref_nr && (
          <p className="amount small">Ref.: {payment.ref_nr}</p>
        )}
        {expanded && !!payment.response_code && (
          <p className="amount small">
            {lang == "no" ? "Respons: " : "Response: "}
            {payment.response_code}
          </p>
        )}
        {expanded && !!payment.currency && (
          <p className="amount small">{payment.currency}</p>
        )}
        {expanded && !!payment.payment_amount && (
          <p className="amount small">{payment.payment_amount}</p>
        )}
        {expanded && !!payment.tip_amount && (
          <p className="amount small">+ {payment.tip_amount} tips</p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  let fetchAuth: string | string[] = "",
    lang: string | string[] = "",
    template: string | string[] = "",
    view: string | string[] = "",
    token: string | string[] = "",
    user_id: string | string[] = "",
    zeipt_receipt_transnr: string | string[] = "",
    preview: boolean = false,
    pdf: boolean = false;


  if (query.preview) preview = query?.preview === "true";
  if (query.pdf) pdf = query?.pdf === "true";
  if (query.view) view = query?.view;
  if (query.token) token = query?.token;
  if (query.user_id) user_id = query?.user_id;
  if (query.zeipt_receipt_transnr) zeipt_receipt_transnr = query?.zeipt_receipt_transnr;

  if (view == "embedded") {
    fetchAuth = token;
  } else {
    fetchAuth = await fetch("https://staging.api.zeipt.io/auth/public", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: "6405ff6a-f4d2-451a-9ed2-7173aede9e45",
        provider_gcid: user_id,
      }),
    }).then((res) => res.json());
  }

  let receipt = preview
    ? [{}]
    : await fetch(
      "https://staging.api.zeipt.io/v3.0/app/users/" +
      user_id +
      "/receipts/" +
      zeipt_receipt_transnr,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + fetchAuth,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log("Can't fetch receipt;", err);
      });

  console.log("Merchant number:", receipt.merchant.merchant_number);

  let clientTemplate = await fetch(
    "https://staging.api.zeipt.io/v3.0/clients/" +
    receipt.merchant.merchant_number +
    "/setting/receipt/template",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + fetchAuth,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log("Can't fetch template;", err);
    });

  lang = clientTemplate.language.toLowerCase();
  template = clientTemplate.id;
  /* Receipt bar code */
  let bar_code: any = "";
  if (
    receipt.extra_receipt_view?.bar_code?.value &&
    receipt.extra_receipt_view?.bar_code?.encoding != "qr"
  ) {
    let options = {
      bcid:
        receipt.extra_receipt_view.bar_code.encoding == "code_39"
          ? "code39"
          : receipt.extra_receipt_view.bar_code.encoding == "ean_13"
            ? "ean13"
            : receipt.extra_receipt_view.bar_code.encoding == "ean_8"
              ? "ean8"
              : receipt.extra_receipt_view.bar_code.encoding == "interleaved_2_of_5"
                ? "itf14"
                : "code128",
      text: receipt.extra_receipt_view.bar_code.value,
      scale: 3,
      height: 10,
      includetext: false,
    };
    let buffer = await bwipjs.toBuffer(options);
    let imagePath = `data:image/png;base64,${buffer.toString("base64")}`;
    bar_code = imagePath;
  }
  /* Discount bar codes */
  let discounts: any = [];
  if (receipt.extended_receipt_logic?.discounts) {
    for (const discount of receipt.extended_receipt_logic?.discounts) {
      if (discount.bar_code?.value && discount.bar_code.encoding != "qr") {
        let options = {
          bcid:
            discount.bar_code.encoding == "code_39"
              ? "code39"
              : discount.bar_code.encoding == "ean_13"
                ? "ean13"
                : discount.bar_code.encoding == "ean_8"
                  ? "ean8"
                  : discount.bar_code.encoding == "interleaved_2_of_5"
                    ? "itf14"
                    : "code128",
          text: discount.bar_code.value,
          scale: 3,
          height: 10,
          includetext: false,
        };
        let buffer = await bwipjs.toBuffer(options);
        let imagePath = `data:image/png;base64,${buffer.toString("base64")}`;
        discounts.push({ url: imagePath });
      } else {
        discounts.push({ url: "" });
      }
    }
  }
  /* Ticket bar codes */
  let tickets: any = [];
  if (receipt.extended_receipt_logic?.discounts) {
    for (const ticket of receipt.articles) {
      if (ticket.bar_codes?.length && ticket.bar_codes?.length > 0) {
        if (
          ticket.bar_codes[0]?.value &&
          ticket.bar_codes[0].encoding != "qr"
        ) {
          let options = {
            bcid:
              ticket.bar_codes[0].encoding == "code_39"
                ? "code39"
                : ticket.bar_codes[0].encoding == "ean_13"
                  ? "ean13"
                  : ticket.bar_codes[0].encoding == "ean_8"
                    ? "ean8"
                    : ticket.bar_codes[0].encoding == "interleaved_2_of_5"
                      ? "itf14"
                      : "code128",
            text: ticket.bar_codes[0].value,
            scale: 3,
            height: 10,
            includetext: false,
          };
          let buffer = await bwipjs.toBuffer(options);
          let imagePath = `data:image/png;base64,${buffer.toString("base64")}`;
          tickets.push({ url: imagePath });
        } else {
          tickets.push({ url: "" });
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
      pdf,
      view,
      token,
      user_id,
      zeipt_receipt_transnr
    },
  };
};
