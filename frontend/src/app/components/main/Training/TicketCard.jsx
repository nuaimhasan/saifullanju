"use client";
import { useEffect, useRef, useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import moment from "moment";
import Head from "next/head";

// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

export default function TicketCard({ trainingOrder }) {
  const ticketRef = useRef(null);
  const [qrCode, setQrCode] = useState("");
  const ticketNumber = trainingOrder?.ticketNumber;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const ticketUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/training/${trainingOrder?.training?.slug}`;
        const qr = await QRCode.toDataURL(ticketUrl, {
          type: "image/png",
          color: {
            dark: "#fff",
            light: "#0000",
          },
        });
        setQrCode(qr);
      } catch (error) {
        console.error("Failed to generate QR Code:", error);
      }
    };

    generateQRCode();
  }, [ticketNumber]);

  const downloadTicketAsPDF = () => {
    if (ticketRef.current) {
      // Open the print dialog with the content inside ticketRef
      const printWindow = window.open("", "", "width=1000,height=700");
      printWindow.document.write(
        "<html><head><title>Ticket</title><style></style></head><body>"
      );
      printWindow.document.write(ticketRef.current.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div>
        <button onClick={downloadTicketAsPDF} className="primary_btn mb-2">
          Download Your Ticket
        </button>

        <div
          ref={ticketRef}
          style={{
            width: "900px",
            height: "300px",
            backgroundColor: "#fff",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "300px",
              overflow: "hidden",
              width: "900px",
            }}
          >
            <div
              style={{
                height: "300px",
                width: "600px",
              }}
            >
              <div
                style={{
                  backgroundImage: `linear-gradient(120deg, #0b504f5e, #10625f8a), url("/saifullanzuBanner.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <h2
                  style={{
                    margin: "0",
                    fontSize: "30px",
                    fontWeight: "600",
                    fontFamily: "Poppins, sans-serif",
                    textAlign: "center",
                    display: "inline-block",
                  }}
                >
                  {trainingOrder?.training?.title}
                </h2>
                <p
                  style={{
                    margin: "0",
                    marginTop: "10px",
                    fontSize: "14px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  By Saiful Lanju
                </p>

                <div style={{ marginTop: "20px" }}>
                  {qrCode && (
                    <img src={qrCode} alt="QR Code" style={{ width: "85px" }} />
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(120deg, #0f9b8e, #1a7f78)",
                padding: "15px",
                color: "#fff",
                position: "relative",
                width: "300px",
              }}
            >
              <div
                style={{
                  transform: "rotate(45deg)",
                  position: "absolute",
                  left: "-13px",
                  top: "-14px",
                  width: "26px",
                  height: "26px",
                  background: "#fff",
                }}
              ></div>
              <div
                style={{
                  transform: "rotate(45deg)",
                  position: "absolute",
                  left: "-13px",
                  bottom: "-14px",
                  width: "26px",
                  height: "26px",
                  background: "#fff",
                }}
              ></div>

              <h2
                style={{
                  margin: "0",
                  fontSize: "20px",
                  fontWeight: "600",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {trainingOrder?.user?.name}
              </h2>
              <p
                style={{
                  margin: "0",
                  marginTop: "6px",
                  fontSize: "15px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {trainingOrder?.user?.phone}
              </p>
              <p
                style={{
                  margin: "0",
                  marginTop: "4px",
                  fontSize: "15px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {trainingOrder?.user?.email}
              </p>
              <p
                style={{
                  margin: "0",
                  marginTop: "6px",
                  fontSize: "15px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Ticket Number: {trainingOrder?.ticketNumber}
              </p>

              <div style={{ marginTop: "15px", fontSize: "14px" }}>
                <p
                  style={{
                    margin: "0",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "6px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <BsCalendarDate
                    style={{ marginTop: "-2px", marginRight: "5px" }}
                  />{" "}
                  {moment(trainingOrder?.training?.startDate).format(
                    "DD MMM YYYY"
                  )}
                </p>
                <p
                  style={{
                    margin: "0",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <AiOutlineClockCircle
                    style={{ marginTop: "-2px", marginRight: "5px" }}
                  />{" "}
                  {moment(trainingOrder?.training?.time, "HH:mm").format(
                    "h:mm A"
                  )}
                </p>
                <p
                  style={{
                    margin: "0",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  <HiOutlineLocationMarker
                    style={{ marginTop: "-2px", marginRight: "5px" }}
                  />{" "}
                  {trainingOrder?.training?.address}
                </p>
              </div>

              <div style={{ marginTop: "70px" }}>
                <p
                  style={{
                    textAlign: "center",
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {trainingOrder?.ticketNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
