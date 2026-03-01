import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, CheckCircle2, AlertCircle, Shield } from "lucide-react";
import "../styles/home/transaction-modal.css";

const TransactionModal = ({ isOpen, onClose, status, errorMessage, currentStep, totalSteps }) => {
  const [canClose, setCanClose] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollPositionRef = useRef(0);
  const portalRootRef = useRef(null);

  // Ensure portal root exists
  useEffect(() => {
    const modalRoot = document.getElementById('mmv-modal-root');
    if (!modalRoot) {
      const newRoot = document.createElement('div');
      newRoot.id = 'mmv-modal-root';
      document.body.appendChild(newRoot);
    }
    portalRootRef.current = modalRoot;
    setMounted(true);

  }, []);

  useEffect(() => {
    setCanClose(status === "success" || status === "error");
  }, [status]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen || !mounted) return;

    scrollPositionRef.current = window.scrollY || 0;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    requestAnimationFrame(() => {
      document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${scrollPositionRef.current}px;
        width: 100%;
        padding-right: ${scrollbarWidth}px;
      `;
    });

    return () => {
      requestAnimationFrame(() => {
        document.body.style.cssText = '';
        window.scrollTo(0, scrollPositionRef.current);
      });
    };
  }, [isOpen, mounted]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !canClose) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, canClose, onClose]);

  if (!isOpen || !mounted || !portalRootRef.current) return null;

  const progressPercent = totalSteps ? (currentStep / totalSteps) * 100 : 0;

  const handleOverlayClick = () => {
    if (canClose) onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const modalContent = (
    <div
      className="mmv-tx-modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mmv-modal-title">

      <div className="mmv-tx-modal" onClick={handleModalClick}>
        <div className="mmv-tx-modal-content">
          {canClose && (
            <button
              className="mmv-tx-modal-close"
              onClick={onClose}
              aria-label="Close modal">
              <X size={24} />
            </button>
          )}

          <div className="mmv-tx-modal-body">
            {/* Step Indicator */}
            {totalSteps > 1 && (status === "approving" || status === "processing") && (
              <div className="mmv-step-indicator">
                <span className="mmv-step-text">
                  Step {currentStep} of {totalSteps}
                </span>
                <div className="mmv-step-progress-bar">
                  <div
                    className="mmv-step-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            )}

            {status === "approving" && (
              <>
                <div className="mmv-tx-modal-icon mmv-tx-approving">
                  <Shield size={64} className="mmv-tx-pulse" />
                </div>
                <h3 id="mmv-modal-title" className="mmv-tx-modal-title">
                  Approving USDT
                </h3>
                <p className="mmv-tx-modal-message">
                  Please confirm the approval transaction in your wallet to allow the presale contract to use your USDT.
                </p>
                <p className="mmv-tx-modal-submessage">
                  This is a one-time approval. After this, your purchase will process automatically.
                </p>
              </>
            )}

            {status === "processing" && (
              <>
                <div className="mmv-tx-modal-icon mmv-tx-processing">
                  <Loader2 size={64} className="mmv-tx-spin" />
                </div>
                <h3 id="mmv-modal-title" className="mmv-tx-modal-title">
                  {totalSteps > 1 ? "Processing Purchase" : "Transaction Processing"}
                </h3>
                <p className="mmv-tx-modal-message">
                  {totalSteps > 1
                    ? "Your USDT has been approved! Now processing your $MMV token purchase..."
                    : "Please don't reload the page while the $MMV token purchase is in progress..."}
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="mmv-tx-modal-icon mmv-tx-success">
                  <CheckCircle2 size={64} />
                </div>
                <h3 id="mmv-modal-title" className="mmv-tx-modal-title">
                  Purchase Successful!
                </h3>
                <p className="mmv-tx-modal-message">
                  Your $MMV tokens have been successfully purchased. You can now lock them in the MemeTreasury to start earning rewards!
                </p>
                <button
                  className="mmv-tx-modal-button mmv-tx-success-btn"
                  onClick={onClose}>
                  Close
                </button>
              </>
            )}

            {status === "error" && (
              <>
                <div className="mmv-tx-modal-icon mmv-tx-error">
                  <AlertCircle size={64} />
                </div>
                <h3 id="mmv-modal-title" className="mmv-tx-modal-title">
                  Transaction Failed
                </h3>
                <p className="mmv-tx-modal-message">
                  Something went wrong while processing your transaction
                </p>
                {errorMessage && (
                  <div className="mmv-tx-modal-error">{errorMessage}</div>
                )}
                <button
                  className="mmv-tx-modal-button mmv-tx-error-btn"
                  onClick={onClose}>
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, portalRootRef.current);
};

export default TransactionModal;