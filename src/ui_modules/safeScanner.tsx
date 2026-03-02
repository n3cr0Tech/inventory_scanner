import React from "react";
import BarcodeScanner from "react-qr-barcode-scanner";

class ScannerErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <p style={{color:"#ef4444",fontSize:"0.85rem"}}>Camera unavailable.</p>;
    return this.props.children;
  }
}

export const SafeScanner: React.FC<{ onUpdate: (e: unknown, r: { text?: string } | undefined) => void }> = ({ onUpdate }) => (
  <ScannerErrorBoundary>
    <BarcodeScanner width={350} height={350} onUpdate={onUpdate} />
  </ScannerErrorBoundary>
);
