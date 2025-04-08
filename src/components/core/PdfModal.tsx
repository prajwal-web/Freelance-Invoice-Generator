import Modal from "@mui/material/Modal";
import { useAppSelector } from "../../redux/hooks";
import { PDFViewer } from "@react-pdf/renderer";
import { InvoicePdf } from "./InvoicePdf";
import { Box } from "@mui/material";

type TPdfModal = {
  handleClose: () => void;
  selectedId: string;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PdfModal({ handleClose, selectedId }: TPdfModal) {
  const pdfmodal = useAppSelector((state) => state.appUI.pdfModal);
  const invoice = useAppSelector((state) =>
    state.invoices.invoice.find((inv) => inv.id === selectedId)
  );

  return (
    <div>
      <Modal
        open={pdfmodal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PDFViewer width="600px" height="620px">
            <InvoicePdf invoiceData={invoice} />
          </PDFViewer>
        </Box>
      </Modal>
    </div>
  );
}
